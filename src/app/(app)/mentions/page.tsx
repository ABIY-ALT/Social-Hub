"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Archive,
  Frown,
  Inbox,
  Meh,
  MessageCircle,
  Reply,
  Search,
  Smile,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { socialIcons } from "@/components/icons";
import type { SocialPlatform } from "@/lib/types";
import { Separator }s "@/components/ui/separator";

type Sentiment = "Positive" | "Neutral" | "Negative";

type Mention = {
  id: string;
  platform: SocialPlatform;
  sender: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  sentiment: Sentiment;
  isRisk: boolean;
};

const mockMentions: Mention[] = [
  {
    id: "1",
    platform: "X",
    sender: {
      name: "TechGuru",
      handle: "@techguru",
      avatar: "https://picsum.photos/seed/301/40/40",
    },
    content: "Just tried the new feature from @Social_Central, and it's a game-changer! #socialmedia #awesome",
    timestamp: "15m ago",
    sentiment: "Positive",
    isRisk: false,
  },
  {
    id: "2",
    platform: "Instagram",
    sender: {
      name: "foodie_jane",
      handle: "@foodie_jane",
      avatar: "https://picsum.photos/seed/302/40/40",
    },
    content: "Their customer support is unbelievably slow. Waited 3 days for a simple reply. 😡",
    timestamp: "1h ago",
    sentiment: "Negative",
    isRisk: true,
  },
  {
    id: "3",
    platform: "LinkedIn",
    sender: {
      name: "Mark Johnson",
      handle: "mark-johnson-ceo",
      avatar: "https://picsum.photos/seed/303/40/40",
    },
    content: "Social Central's analytics platform provides some interesting data points for our campaign analysis.",
    timestamp: "3h ago",
    sentiment: "Neutral",
    isRisk: false,
  },
  {
    id: "4",
    platform: "Facebook",
    sender: {
      name: "Sarah Lee",
      handle: "sarah.lee",
      avatar: "https://picsum.photos/seed/304/40/40",
    },
    content: "Is there a way to export reports to PDF? I can't seem to find the option.",
    timestamp: "5h ago",
    sentiment: "Neutral",
    isRisk: false,
  },
  {
    id: "5",
    platform: "X",
    sender: {
      name: "CryptoKing",
      handle: "@cryptoking",
      avatar: "https://picsum.photos/seed/305/40/40",
    },
    content: "The app crashed twice on me today. Fix your bugs, @Social_Central!",
    timestamp: "8h ago",
    sentiment: "Negative",
    isRisk: true,
  },
];

const sentimentConfig: Record<
  Sentiment,
  { icon: React.ElementType; color: string; badgeVariant: "default" | "secondary" | "destructive" }
> = {
  Positive: { icon: Smile, color: "text-green-500", badgeVariant: "default" },
  Neutral: { icon: Meh, color: "text-yellow-500", badgeVariant: "secondary" },
  Negative: { icon: Frown, color: "text-red-500", badgeVariant: "destructive" },
};

const MentionItem = ({ mention }: { mention: Mention }) => {
  const PlatformIcon = socialIcons[mention.platform];
  const SentimentIcon = sentimentConfig[mention.sentiment].icon;

  return (
    <Card className={mention.isRisk ? "border-destructive/50" : ""}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={mention.sender.avatar} data-ai-hint="person" />
            <AvatarFallback>
              {mention.sender.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold">{mention.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{mention.sender.handle}</p>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <PlatformIcon className="h-5 w-5" />
                    <p className="text-sm">{mention.timestamp}</p>
                </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm">{mention.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={sentimentConfig[mention.sentiment].badgeVariant}>
          <SentimentIcon className={`mr-1.5 h-4 w-4 ${sentimentConfig[mention.sentiment].color}`} />
          {mention.sentiment}
        </Badge>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default function MentionsPage() {
  const [filter, setFilter] = useState("all");

  const riskMentions = mockMentions.filter(m => m.isRisk);

  return (
    <>
      <Header title="Mentions & Listening" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Filter by keywords..." className="pl-9" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {mockMentions.map((mention) => (
              <MentionItem key={mention.id} mention={mention} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>AI Insight Summary</span>
              </CardTitle>
              <CardDescription>
                A quick summary of recent mentions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1">✅</span>
                  <span>Overall sentiment is mostly neutral, with a few strong positive and negative outliers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">🔥</span>
                  <span>Trending topic: "customer support" is mentioned in 3 of the last 5 negative comments.</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="mt-1">💡</span>
                  <span>Feature request for PDF exports has appeared.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle />
                <span>Risk Mention Highlights</span>
              </CardTitle>
               <CardDescription>
                Mentions that may require immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskMentions.map((mention) => (
                 <div key={mention.id} className="text-sm p-3 rounded-md border bg-card text-card-foreground">
                     <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">{mention.sender.name}</span>
                        <span className="text-xs text-muted-foreground">{mention.timestamp}</span>
                     </div>
                     <p className="text-muted-foreground line-clamp-2">{mention.content}</p>
                 </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
