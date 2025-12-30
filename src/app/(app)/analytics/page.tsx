"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Users, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Header } from "@/components/layout/header";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const chartData = [
  { date: "2024-07-01", posts: 2 },
  { date: "2024-07-02", posts: 3 },
  { date: "2024-07-03", posts: 1 },
  { date: "2024-07-04", posts: 4 },
  { date: "2024-07-05", posts: 2 },
  { date: "2024-07-06", posts: 5 },
  { date: "2024-07-07", posts: 3 },
];

const chartConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--primary))",
  },
};

export default function AnalyticsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <>
      <Header title="Analytics & Reports">
        <div className="hidden sm:block">
          <DateRangePicker date={date} onDateChange={setDate} />
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </Header>
      <div className="sm:hidden mb-4">
        <DateRangePicker date={date} onDateChange={setDate} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Followers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125,430</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,231</div>
            <p className="text-xs text-muted-foreground">
              +10.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88,345</div>
            <p className="text-xs text-muted-foreground">
              +15.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>
              A summary of posts published in the selected date range.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => format(new Date(value), "MMM d")}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="posts" fill="var(--color-posts)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
