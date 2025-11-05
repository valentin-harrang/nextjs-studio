"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface ChatFormProps {
  onSubmit: (text: string) => void;
  status: "ready" | "streaming" | "submitted" | "error";
}

export function ChatForm({ onSubmit, status }: ChatFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  const isDisabled = status !== "ready";

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pose ta question..."
        disabled={isDisabled}
      />
      <Button type="submit" disabled={isDisabled}>
        Envoyer
      </Button>
    </form>
  );
}

