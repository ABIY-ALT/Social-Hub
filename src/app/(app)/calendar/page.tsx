
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
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { socialIcons } from "@/components/icons";
import type { SocialPlatform } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


type PostStatus = "Draft" | "Scheduled" | "Published" | "Failed";
type Post = {
    id: string;
    title: string;
    platform: keyof typeof socialIcons;
    status: PostStatus;
    content: string;
    scheduledAt: Date;
}

const initialMockPosts: Post[] = [
  { id: "1", title: "New Product Launch", platform: "Instagram", status: "Scheduled", content: "Our new product is launching soon!", scheduledAt: new Date("2024-08-05T10:00:00") },
  { id: "2", title: "Weekly Q&A", platform: "X", status: "Published", content: "Join us for our weekly Q&A session.", scheduledAt: new Date("2024-08-12T14:00:00") },
  { id: "3", title: "Blog Post Promo", platform: "LinkedIn", status: "Scheduled", content: "Check out our latest blog post on industry trends.", scheduledAt: new Date("2024-08-12T16:00:00") },
  { id: "4", title: "Behind the Scenes", platform: "TikTok", status: "Published", content: "A quick look behind the scenes of our office.", scheduledAt: new Date("2024-08-21T11:00:00") },
  { id: "5", title: "Flash Sale Alert", platform: "Facebook", status: "Draft", content: "Draft for our upcoming flash sale.", scheduledAt: new Date("2024-08-15T09:00:00") },
  { id: "6", title: "Tech Talk Highlights", platform: "YouTube", status: "Failed", content: "Video upload failed. Please re-check.", scheduledAt: new Date("2024-08-20T18:00:00") },
];


const statusColors: Record<PostStatus, string> = {
  Draft: "bg-gray-400",
  Scheduled: "bg-blue-500",
  Published: "bg-green-500",
  Failed: "bg-red-500",
};


const PostItem = ({ post }: { post: Post }) => {
    const PlatformIcon = socialIcons[post.platform];
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-secondary p-1.5 rounded-md text-xs text-secondary-foreground truncate cursor-pointer hover:bg-secondary/80">
                    <div className="flex items-center gap-1.5">
                        <span className={cn("w-2 h-2 rounded-full", statusColors[post.status])} />
                        <PlatformIcon className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium flex-1 truncate">{post.title}</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogDescription>
                        Update the details for your social media post.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" defaultValue={post.title} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">Content</Label>
                        <Textarea id="content" defaultValue={post.content} className="col-span-3 min-h-[100px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Status</Label>
                         <Badge variant={post.status === "Failed" ? "destructive" : "secondary"}>
                            <span className={cn("w-2 h-2 rounded-full mr-2", statusColors[post.status])} />
                            {post.status}
                        </Badge>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Delete</Button>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const Day = ({ day, isCurrentMonth, isToday, posts }: { day: Date, isCurrentMonth: boolean, isToday: boolean, posts: Post[] }) => (
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
        {posts.map((post) => (
            <PostItem key={post.id} post={post} />
        ))}
    </div>
  </div>
);

const schedulePostSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  platform: z.enum(["Facebook", "Instagram", "X", "LinkedIn", "TikTok", "YouTube"]),
  scheduledAt: z.date({ required_error: "A date is required." }),
});

const SchedulePostForm = ({ onPostCreate, onDone }: { onPostCreate: (post: Omit<Post, 'id' | 'status'>) => void; onDone: () => void; }) => {
  const form = useForm<z.infer<typeof schedulePostSchema>>({
    resolver: zodResolver(schedulePostSchema),
    defaultValues: {
      platform: "Instagram",
    },
  });

  function onSubmit(values: z.infer<typeof schedulePostSchema>) {
    onPostCreate(values);
    form.reset();
    onDone();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New Product Launch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your post content here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(socialIcons).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Schedule Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit">Schedule</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default function ContentPlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date("2024-08-01"));
  const [view, setView] = useState<"Monthly" | "Weekly" | "Daily">("Monthly");
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [isScheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCreatePost = (newPostData: Omit<Post, 'id' | 'status'>) => {
    const newPost: Post = {
        ...newPostData,
        id: crypto.randomUUID(),
        status: "Scheduled",
    };
    setPosts(prev => [...prev, newPost]);
  }

  return (
    <>
      <Header title="Content Planner">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold w-32 text-center">{format(currentDate, "MMMM yyyy")}</span>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
        <div className="hidden md:flex items-center border rounded-md p-1">
            <Button variant={view === "Monthly" ? "secondary" : "ghost"} size="sm" onClick={() => setView("Monthly")}>Monthly</Button>
            <Button variant={view === "Weekly" ? "secondary" : "ghost"} size="sm" onClick={() => setView("Weekly")}>Weekly</Button>
            <Button variant={view === "Daily" ? "secondary" : "ghost"} size="sm" onClick={() => setView("Daily")}>Daily</Button>
        </div>
        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{view} <MoreHorizontal className="ml-2 h-4 w-4"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setView("Monthly")}>Monthly</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setView("Weekly")}>Weekly</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setView("Daily")}>Daily</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
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
            <SchedulePostForm onPostCreate={handleCreatePost} onDone={() => setScheduleDialogOpen(false)} />
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
            const todaysPosts = posts.filter(p => isSameDay(p.scheduledAt, day));
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
