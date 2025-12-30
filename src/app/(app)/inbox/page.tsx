"use client";

import { useState } from "react";
import {
  Archive,
  Filter,
  Reply,
  ThumbsUp,
  User,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { socialIcons } from "@/components/icons";
import type { InboxMessage } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const mockMessages: InboxMessage[] = [
  {
    id: "1", platform: "Instagram", type: "comment",
    sender: { name: "alex_design", avatar: "https://picsum.photos/seed/101/40/40" },
    content: "This looks amazing! Can't wait to try it out. 🔥",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "2", platform: "X", type: "message",
    sender: { name: "MarketingMaven", avatar: "https://picsum.photos/seed/102/40/40" },
    content: "Hi, I'm interested in a collaboration. Could you please share your media kit?",
    timestamp: "5 hours ago",
    unread: true,
  },
  {
    id: "3", platform: "Facebook", type: "comment",
    sender: { name: "John Smith", avatar: "https://picsum.photos/seed/103/40/40" },
    content: "What is the price for the premium plan?",
    timestamp: "1 day ago",
    unread: false,
  },
  {
    id: "4", platform: "LinkedIn", type: "message",
    sender: { name: "Jane Doe, CEO at Innovate Inc.", avatar: "https://picsum.photos/seed/104/40/40" },
    content: "Great work on your recent launch. I'd love to connect and discuss potential synergies.",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: "5", platform: "TikTok", type: "comment",
    sender: { name: "user12345678", avatar: "https://picsum.photos/seed/105/40/40" },
    content: "this is sickkkk 🤘",
    timestamp: "3 days ago",
    unread: true,
  },
    {
    id: "6", platform: "YouTube", type: "comment",
    sender: { name: "VideoCreatorPro", avatar: "https://picsum.photos/seed/106/40/40" },
    content: "Awesome content! Your editing is on point. Subscribed!",
    timestamp: "4 days ago",
    unread: false,
  },
];


const MessageItem = ({ message, onSelect, isSelected }: { message: InboxMessage, onSelect: (message: InboxMessage) => void, isSelected: boolean }) => {
  const PlatformIcon = socialIcons[message.platform];

  return (
    <div
      className={`p-4 rounded-lg cursor-pointer ${isSelected ? 'bg-muted' : 'hover:bg-muted/50'} ${message.unread ? 'border-l-4 border-primary' : ''}`}
      onClick={() => onSelect(message)}
    >
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
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{message.content}</p>
            </div>
        </div>
    </div>
  );
};


const ConversationView = ({ message }: { message: InboxMessage | null }) => {
    if (!message) {
        return (
            <Card className="hidden lg:flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                    <Inbox className="h-12 w-12 mx-auto mb-4" />
                    <p>Select a message to view the conversation</p>
                </div>
            </Card>
        );
    }
    
    const PlatformIcon = socialIcons[message.platform];

    return (
        <Card className="hidden lg:flex flex-col h-full">
             <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} data-ai-hint="person" />
                    <AvatarFallback>{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{message.sender.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PlatformIcon className="h-4 w-4" />
                        <span>{message.platform} {message.type}</span>
                    </div>
                </div>
             </CardHeader>
            <CardContent className="flex-grow overflow-auto p-6 space-y-4">
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.avatar} data-ai-hint="person" />
                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                        <p>{message.content}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                     <div className="bg-primary text-primary-foreground p-3 rounded-lg text-sm">
                        <p>Thanks for reaching out! Our premium plan is $49/month. Let me know if you have other questions.</p>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex-col items-stretch gap-4">
                <Textarea placeholder={`Reply to ${message.sender.name}...`} />
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon"><ThumbsUp className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Archive className="h-4 w-4" /></Button>
                         <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><CheckCircle2 className="h-4 w-4 mr-2"/> Mark as Done</Button>
                        <Button><Reply className="h-4 w-4 mr-2"/> Reply</Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default function InboxPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(mockMessages[0]);


  const filteredMessages = mockMessages.filter(msg => {
    if (filter === "unread" && !msg.unread) return false;
    if (filter === "read" && msg.unread) return false;
    if (platformFilter !== "all" && msg.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <Header title="Inbox">
        <div className="flex items-center gap-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by platform" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
        </div>
      </Header>
      
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={filter === 'all' ? 'default' : 'secondary'} onClick={() => setFilter('all')} className="cursor-pointer">All</Badge>
        <Badge variant={filter === 'unread' ? 'default' : 'secondary'} onClick={() => setFilter('unread')} className="cursor-pointer">Unread</Badge>
        <Badge variant={filter === 'read' ? 'default' : 'secondary'} onClick={() => setFilter('read')} className="cursor-pointer">Read</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto">
            {filteredMessages.map((msg) => (
              <MessageItem key={msg.id} message={msg} onSelect={setSelectedMessage} isSelected={selectedMessage?.id === msg.id} />
            ))}
        </div>
        <div className="lg:col-span-2">
            <ConversationView message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
