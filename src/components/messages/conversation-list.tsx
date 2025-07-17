"use client";
import * as React from "react";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

let socket: any;

export function ConversationList({ conversations = [], userId, activeConversation: propActiveConversation, setActiveConversation: propSetActiveConversation }: {
  conversations?: any[];
  userId?: string;
  activeConversation?: any;
  setActiveConversation?: (conv: any) => void;
}) {
  const [internalActiveConversation, internalSetActiveConversation] = useState<any>(conversations && conversations.length > 0 ? conversations[0] : null);
  const activeConversation = propActiveConversation !== undefined ? propActiveConversation : internalActiveConversation;
  const setActiveConversation = propSetActiveConversation !== undefined ? propSetActiveConversation : internalSetActiveConversation;
  const [messages, setMessages] = useState<any[]>(activeConversation ? activeConversation.messages : []);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io({ path: "/api/socket" });
    if (activeConversation) {
      socket.emit("join-conversation", activeConversation.id);
    }
    socket.on("new-message", (msg: any) => {
      if (msg.conversationId === activeConversation?.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [activeConversation]);

  useEffect(() => {
    setMessages(activeConversation ? activeConversation.messages : []);
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConversation) return;
    socket.emit("send-message", {
      conversationId: activeConversation.id,
      senderId: userId,
      content: input,
    });
    setInput("");
  };

  if (!Array.isArray(conversations) || conversations.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <img src="/images/empty-messages.svg" alt="No messages" className="w-32 h-32 mb-4 opacity-80" />
        <h3 className="mt-4 text-lg font-semibold">No conversations yet</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">Start a conversation to connect with others!</p>
        {/* Optionally, add a button to start a new chat */}
      </div>
    );
  }

  return (
    <div className="flex border rounded-lg overflow-hidden h-[500px] bg-white dark:bg-neutral-900 shadow">
      <div className="w-1/3 border-r overflow-y-auto bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <ul>
          {conversations.map((conv) => {
            const other = conv.participants.filter((p: any) => p.id !== userId)[0];
            return (
              <li
                key={conv.id}
                className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 ${activeConversation?.id === conv.id ? "bg-gray-100 dark:bg-neutral-800" : ""}`}
                onClick={() => setActiveConversation(conv)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={other?.image || ""} alt={other?.name || "U"} />
                    <AvatarFallback>{other?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{other?.name || "Conversation"}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {conv.messages[0]?.content || "No messages yet."}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <img src="/images/empty-messages.svg" alt="No messages" className="w-24 h-24 mb-2 opacity-80" />
              <div>No messages yet</div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.senderId === userId;
              const sender = (activeConversation?.participants || []).find((p: any) => p.id === msg.senderId);
              return (
                <div
                  key={msg.id || i}
                  className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-end gap-2">
                    {!isMe && (
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={sender?.image || ""} alt={sender?.name || "U"} />
                        <AvatarFallback>{sender?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded px-3 py-2 max-w-xs ${isMe ? "bg-primary text-white animate-fade-in" : "bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 animate-fade-in"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex p-2 border-t gap-2 animate-fade-in" aria-label="Send message">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 focus:ring-2 focus:ring-brand transition"
            autoComplete="off"
            aria-label="Message input"
            aria-required="true"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSend(e);
              }
            }}
          />
          <Button type="submit" disabled={!input.trim()} className="transition-transform duration-200 hover:scale-105" aria-busy={false}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
} 