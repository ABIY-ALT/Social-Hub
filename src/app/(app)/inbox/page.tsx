"use client";

import { useState } from "react";
import {
  Archive,
  Filter,
  Reply,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { socialIcons } from "@/components/icons";
import type { InboxMessage } from "@/lib/types";

const mockMessages: InboxMessage[] = [
  {
    id: "1", platform: "Instagram", type: "comment",
    sender: { name: "alex_design", avatar: "https://picsum.photos/seed/101/40/40" },
    content: "This looks amazing! Can't wait to try it out. 🔥",
    timestamp: "2 hours ago",
  },
  {
    id: "2", platform: "X", type: "message",
    sender: { name: "MarketingMaven", avatar: "https://picsum.photos/seed/102/40/40" },
    content: "Hi, I'm interested in a collaboration. Could you please share your media kit?",
    timestamp: "5 hours ago",
  },
  {
    id: "3", platform: "Facebook", type: "comment",
    sender: { name: "John Smith", avatar: "https://picsum.photos/seed/103/40/40" },
    content: "What is the price for the premium plan?",
    timestamp: "1 day ago",
  },
  {
    id: "4", platform: "LinkedIn", type: "message",
    sender: { name: "Jane Doe, CEO at Innovate Inc.", avatar: "https://picsum.photos/seed/104/40/40" },
    content: "Great work on your recent launch. I'd love to connect and discuss potential synergies.",
    timestamp: "2 days ago",
  },
  {
    id: "5", platform: "TikTok", type: "comment",
    sender: { name: "user12345678", avatar: "https://picsum.photos/seed/105/40/40" },
    content: "this is sickkkk 🤘",
    timestamp: "3 days ago",
  },
];


const MessageItem = ({ message }: { message: InboxMessage }) => {
  const PlatformIcon = socialIcons[message.platform];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={message.sender.avatar} alt={message.sender.name} data-ai-hint="person" />
            <AvatarFallback>{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{message.sender.name}</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <PlatformIcon className="h-4 w-4" />
                <span className="text-xs">{message.timestamp}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{message.content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-end gap-2">
        <Button variant="ghost" size="sm"><Reply className="mr-2 h-4 w-4" /> Reply</Button>
        <Button variant="ghost" size="sm"><Archive className="mr-2 h-4 w-4" /> Archive</Button>
      </CardFooter>
    </Card>
  );
};


export default function InboxPage() {
  const [filter, setFilter] = useState<"all" | "message" | "comment">("all");

  const filteredMessages = mockMessages.filter(msg => {
    if (filter === "all") return true;
    return msg.type === filter;
  });

  return (
    <>
      <Header title="Inbox">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </Header>
      
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={filter === 'all' ? 'default' : 'secondary'} onClick={() => setFilter('all')} className="cursor-pointer">All</Badge>
        <Badge variant={filter === 'message' ? 'default' : 'secondary'} onClick={() => setFilter('message')} className="cursor-pointer">Messages</Badge>
        <Badge variant={filter === 'comment' ? 'default' : 'secondary'} onClick={() => setFilter('comment')} className="cursor-pointer">Comments</Badge>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
    </>
  );
}
