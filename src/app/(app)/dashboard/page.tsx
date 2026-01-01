'use client';

import Link from 'next/link';
import React from 'react';
import {
  Users,
  TrendingUp,
  Eye,
  Megaphone,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Link2,
} from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from 'date-fns';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { socialIcons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

const chartData = [
  { date: "2024-07-01", engagement: 250, impressions: 15000 },
  { date: "2024-07-02", engagement: 300, impressions: 18000 },
  { date: "2024-07-03", engagement: 200, impressions: 12000 },
  { date: "2024-07-04", engagement: 450, impressions: 25000 },
  { date: "2024-07-05", engagement: 350, impressions: 22000 },
  { date: "2024-07-06", engagement: 600, impressions: 30000 },
  { date: "2024-07-07", engagement: 400, impressions: 26000 },
];

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-2))",
  },
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
};

const recentPosts = [
    {
        id: "1",
        platform: "X",
        ago: "2h ago",
        content: "We're excited to announce our new sustainable banking initiative! 🌿 #GreenFinance #FutureFinance"
    },
    {
        id: "2",
        platform: "Instagram",
        ago: "8h ago",
        content: "Our team had a great time volunteering at the local food bank this weekend. #CommunityFirst"
    }
]

export default function DashboardPage() {
    const { user } = useUser();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">Here's what's happening with your social channels today. Engagement is up 12% from last week.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Overview Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124.5K</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" /> +2.5%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" /> +0.8%
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground flex items-center text-red-600">
                <ArrowDown className="h-3 w-3 mr-1" /> -1.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ending in 4 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Audience Growth</CardTitle>
                        <CardDescription>Engagement vs Impressions over the last 7 days</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm">Week</Button>
                        <Button variant="ghost" size="sm">Month</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-engagement)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--color-engagement)" stopOpacity={0.1}/>
                                    </linearGradient>
                                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-impressions)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--color-impressions)" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="date"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  tickFormatter={(value) => format(new Date(value), "E")}
                                />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="impressions" stroke="var(--color-impressions)" fillOpacity={1} fill="url(#colorImpressions)" strokeWidth={2} />
                                <Area type="monotone" dataKey="engagement" stroke="var(--color-engagement)" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>Latest activity across channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentPosts.map((post) => {
                        const PlatformIcon = socialIcons[post.platform as keyof typeof socialIcons];
                        return (
                            <div key={post.id} className="p-3 rounded-lg border bg-muted/50">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <PlatformIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{post.platform}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{post.ago}</span>
                                </div>
                                <p className="text-sm">{post.content}</p>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
