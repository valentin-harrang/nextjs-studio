"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "@ai-sdk/react";
import { MessageItem } from "./message-item";
import { Card } from "@/components/ui/card";

interface MessageListProps {
  messages: UIMessage[];
  isStreaming?: boolean;
}

export function MessageList({ messages, isStreaming = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <Card className="h-80 overflow-y-auto mb-4 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Aucun message. Posez votre première question !
        </p>
      </Card>
    );
  }

  return (
    <Card className="h-80 overflow-y-auto mb-4 p-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isStreaming={isStreaming}
        />
      ))}
      {/* Élément invisible pour l'auto-scroll avec un peu d'espace */}
      <div ref={messagesEndRef} className="h-2" />
    </Card>
  );
}
