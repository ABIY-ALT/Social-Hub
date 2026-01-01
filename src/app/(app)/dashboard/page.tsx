'use client';

import Link from 'next/link';
import React from 'react';
import {
  Users,
  CalendarClock,
  MessageSquareWarning,
  ThumbsUp,
  MessageCircle,
  Share2,
  PlusCircle,
  Link2,
  Check,
  X,
  FilePlus,
  UserPlus,
  MessageSquare as MessageSquareIcon,
} from 'lucide-react';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { socialIcons } from '@/components/icons';
import type { SocialAccount, InboxMessage } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const connectedAccounts: SocialAccount[] = [
    { id: "ig", platform: "Instagram", username: "@socialcentral", avatar: "", isConnected: true, Icon: socialIcons.Instagram },
    { id: "x", platform: "X", username: "@Social_Central", avatar: "", isConnected: true, Icon: socialIcons.X },
    { id: "fb", platform: "Facebook", username: "Not Connected", avatar: "", isConnected: false, Icon: socialIcons.Facebook },
    { id: "li", platform: "LinkedIn", username: "Not Connected", avatar: "", isConnected: false, Icon: socialIcons.LinkedIn },
    { id: "yt", platform: "YouTube", username: "Social Central", avatar: "", isConnected: true, Icon: socialIcons.YouTube },
];

const recentActivities = [
    { id: 1, icon: FilePlus, text: "You scheduled a new post for Instagram.", time: "2m ago" },
    { id: 2, icon: UserPlus, text: "Bob Williams was added to the team as an Editor.", time: "1h ago" },
    { id: 3, icon: MessageSquareIcon, text: "New comment on your Facebook post 'Summer Sale'.", time: "3h ago" },
    { id: 4, icon: FilePlus, text: "You scheduled a new post for X.", time: "8h ago" },
];

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
];

const pendingApprovalsCount = 3;
const unreadMessagesCount = mockMessages.filter(m => m.unread).length;


export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard">
        <Button asChild>
          <Link href="/content-creation">
            <PlusCircle />
            <span>Create Post</span>
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/settings/accounts">
            <Link2 />
            <span>Connect Account</span>
          </Link>
        </Button>
      </Header>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">in the next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovalsCount}</div>
            <p className="text-xs text-muted-foreground">posts awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessagesCount}</div>
            <p className="text-xs text-muted-foreground">in your inbox</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 grid gap-6">
            {/* Engagement Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>Your social performance over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                            <ThumbsUp className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Total Likes</p>
                                <p className="text-2xl font-bold">12.8k</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                            <MessageCircle className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Total Comments</p>
                                <p className="text-2xl font-bold">1.2k</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                            <Share2 className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Total Shares</p>
                                <p className="text-2xl font-bold">876</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>
                                        <activity.icon className="h-4 w-4 text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm">{activity.text}</p>
                                </div>
                                <time className="text-xs text-muted-foreground self-start">{activity.time}</time>
                            </div>
                            {index < recentActivities.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-2">
            {/* Connected Platforms */}
            <Card>
                <CardHeader>
                    <CardTitle>Connected Platforms</CardTitle>
                    <CardDescription>Manage your social media accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {connectedAccounts.map(account => {
                        const PlatformIcon = account.Icon;
                        return (
                            <div key={account.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <PlatformIcon className="w-6 h-6"/>
                                    <div>
                                        <p className="font-medium">{account.platform}</p>
                                        <p className="text-xs text-muted-foreground">{account.username}</p>
                                    </div>
                                </div>
                                <Badge variant={account.isConnected ? "default" : "secondary"} className="text-xs">
                                    {account.isConnected ? <Check className="mr-1 h-3 w-3"/> : <X className="mr-1 h-3 w-3"/>}
                                    {account.isConnected ? "Connected" : "Disconnected"}
                                </Badge>
                            </div>
                        )
                    })}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/settings/accounts">Manage Accounts</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </>
  );
}
