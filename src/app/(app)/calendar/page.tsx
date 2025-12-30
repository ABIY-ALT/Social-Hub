"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockPosts = {
  "2024-08-05": [{ title: "New Product Launch", platform: "Instagram" }],
  "2024-08-12": [{ title: "Weekly Q&A", platform: "X" }, { title: "Blog Post Promo", platform: "LinkedIn" }],
  "2024-08-21": [{ title: "Behind the Scenes", platform: "TikTok" }],
};

const Day = ({ day, isCurrentMonth, isToday, posts }: { day: Date, isCurrentMonth: boolean, isToday: boolean, posts: any[] }) => (
  <div
    className={cn(
      "border-t border-r border-border p-2 min-h-[120px] flex flex-col",
      isCurrentMonth ? "bg-card" : "bg-muted/50",
      "relative"
    )}
  >
    <time
      dateTime={format(day, "yyyy-MM-dd")}
      className={cn(
        "text-sm font-medium",
        isToday ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center" : "",
        isCurrentMonth ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {format(day, "d")}
    </time>
    <div className="flex-grow mt-2 space-y-1">
        {posts.map((post, i) => (
            <div key={i} className="bg-secondary p-1.5 rounded-md text-xs text-secondary-foreground truncate">
                <Badge variant="outline" className="mr-1">{post.platform}</Badge>
                {post.title}
            </div>
        ))}
    </div>
  </div>
);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <Header title="Content Calendar">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold w-32 text-center">{format(currentDate, "MMMM yyyy")}</span>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a new post</DialogTitle>
              <DialogDescription>
                Fill in the details for your new social media post.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" placeholder="e.g. New Product Launch" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">Content</Label>
                    <Textarea id="content" placeholder="Write your post content here..." className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Header>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="grid grid-cols-7">
          {weekdays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-b">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const todaysPosts = mockPosts[dayKey as keyof typeof mockPosts] || [];
            return (
                <Day
                key={day.toString()}
                day={day}
                isCurrentMonth={isSameMonth(day, currentDate)}
                isToday={isToday(day)}
                posts={todaysPosts}
                />
            )
          })}
        </div>
      </div>
    </>
  );
}
