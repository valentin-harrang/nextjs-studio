import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

// Types
export interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  isAI?: boolean;
}

export interface User {
  id: string;
  username: string;
}

interface UseCollaborativeChatOptions {
  socketUrl: string;
  onError?: (error: string) => void;
}

export function useCollaborativeChat({ socketUrl, onError }: UseCollaborativeChatOptions) {
  // State
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Refs
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(socketUrl, {
      autoConnect: true,
    });

    // Connection events
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnected(false);
      onError?.('Impossible de se connecter au serveur. Assurez-vous que le serveur Socket.IO est démarré (npm run socket).');
    });

    socketInstance.on('error', (errorMessage: string) => {
      onError?.(errorMessage);
    });

    // Message events
    socketInstance.on('message:history', (history: Message[]) => {
      setMessages(history);
    });

    socketInstance.on('message:new', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // User events
    socketInstance.on('users:list', (usersList: User[]) => {
      setUsers(usersList);
    });

    socketInstance.on('user:joined', (username: string) => {
      console.log(`${username} joined the chat`);
    });

    socketInstance.on('user:left', (username: string) => {
      console.log(`${username} left the chat`);
    });

    // Typing events
    socketInstance.on('user:typing', (username: string) => {
      setTypingUsers((prev) => {
        if (!prev.includes(username)) {
          return [...prev, username];
        }
        return prev;
      });
    });

    socketInstance.on('user:stop-typing', (username: string) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    socketRef.current = socketInstance;

    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [socketUrl, onError]);

  // Join chat with username
  const joinChat = useCallback((username: string) => {
    if (!socketRef.current || !connected) {
      onError?.('Non connecté au serveur');
      return false;
    }

    if (!username.trim()) {
      onError?.('Le pseudo ne peut pas être vide');
      return false;
    }

    if (username.length > 20) {
      onError?.('Le pseudo est trop long (max 20 caractères)');
      return false;
    }

    socketRef.current.emit('user:join', username.trim());
    return true;
  }, [connected, onError]);

  // Send message
  const sendMessage = useCallback((message: string) => {
    if (!socketRef.current || !message.trim()) {
      return false;
    }

    socketRef.current.emit('message:send', message.trim());

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    socketRef.current.emit('user:stop-typing');

    return true;
  }, []);

  // Emit typing event
  const emitTyping = useCallback(() => {
    if (!socketRef.current) return;

    socketRef.current.emit('user:typing');

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.emit('user:stop-typing');
      }
    }, 2000);
  }, []);

  return {
    // State
    connected,
    messages,
    users,
    typingUsers,

    // Actions
    joinChat,
    sendMessage,
    emitTyping,
  };
}
