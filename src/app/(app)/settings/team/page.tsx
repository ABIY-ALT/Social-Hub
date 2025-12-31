

"use client";

import React from "react";
import {
  Plus,
  MoreHorizontal,
  FileCheck,
  FileClock,
  MessageSquare,
  History,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TeamMember } from "@/lib/types";
import { socialIcons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

const mockTeam: TeamMember[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "https://picsum.photos/seed/201/40/40", role: "Admin" },
  { id: "2", name: "Bob Williams", email: "bob@example.com", avatar: "https://picsum.photos/seed/202/40/40", role: "Editor" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatar: "https://picsum.photos/seed/203/40/40", role: "Viewer" },
  { id: "4", name: "Diana Miller", email: "diana@example.com", avatar: "https://picsum.photos/seed/204/40/40", role: "Editor" },
];

const pendingApprovals = [
    { id: "p1", content: "Exciting news! Our new AI-powered analytics feature is now live...", submittedBy: "Bob Williams", platform: "LinkedIn", time: "2h ago" },
    { id: "p2", content: "Get ready for our biggest sale of the year! #BlackFriday...", submittedBy: "Diana Miller", platform: "X", time: "5h ago" },
    { id: "p3", content: "A behind-the-scenes look at our team retreat in the mountains. ⛰️", submittedBy: "Bob Williams", platform: "Instagram", time: "1d ago" },
];

const activityLog = [
    { id: 'a1', actor: 'Alice Johnson', action: 'approved a post for LinkedIn.', time: '15m ago', icon: CheckCircle },
    { id: 'a2', actor: 'Bob Williams', action: 'submitted a new post for approval.', time: '2h ago', icon: FileClock },
    { id: 'a3', actor: 'Alice Johnson', action: 'rejected a post for Instagram and left a comment.', time: '4h ago', icon: XCircle },
    { id: 'a4', actor: 'Diana Miller', action: 'commented on the "Black Friday" post.', time: '4h ago', icon: MessageSquare },
    { id: 'a5', actor: 'Diana Miller', action: 'submitted a new post for approval.', time: '5h ago', icon: FileClock },
];

export default function TeamAndApprovalsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2"><FileClock className="h-5 w-5 text-primary" /> Pending Approvals</CardTitle>
                            <CardDescription>
                            Review posts that are waiting for your approval.
                            </CardDescription>
                        </div>
                        <Badge variant="default">{pendingApprovals.length}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {pendingApprovals.map(post => {
                            const PlatformIcon = socialIcons[post.platform as keyof typeof socialIcons];
                            return (
                                <div key={post.id}>
                                    <div className="flex items-start gap-4">
                                        <PlatformIcon className="h-5 w-5 mt-1 text-muted-foreground" />
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-foreground">{post.submittedBy}</span> submitted a post for approval <span className="text-xs">({post.time})</span>
                                            </p>
                                            <p className="text-sm mt-1 p-2 bg-muted/50 rounded-md line-clamp-2">{post.content}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button variant="outline" size="sm">View & Comment</Button>
                                        <Button variant="destructive" size="sm">Reject</Button>
                                        <Button size="sm">Approve</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>
                            Manage your team and their roles.
                            </CardDescription>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Invite Member
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTeam.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person" />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{member.name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                    {member.email}
                                    </div>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell>
                            <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                                {member.role}
                            </Badge>
                            </TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-primary" /> Activity Log</CardTitle>
                    <CardDescription>A log of recent team activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activityLog.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <div className="flex items-start gap-3">
                                    <activity.icon className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-semibold">{activity.actor}</span> {activity.action}
                                        </p>
                                        <time className="text-xs text-muted-foreground">{activity.time}</time>
                                    </div>
                                </div>
                                {index < activityLog.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">View all activity</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
