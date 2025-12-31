
"use client";

import {
  MoreHorizontal,
  PlusCircle,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import React from "react";

type CampaignStatus = "Active" | "Planned" | "Completed" | "Paused";

type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  posts: number;
  impressions: string;
  engagement: string;
};

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer 2024 Collection Launch",
    status: "Active",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    posts: 25,
    impressions: "1.2M",
    engagement: "5.8%",
  },
  {
    id: "2",
    name: "Black Friday Sale",
    status: "Planned",
    startDate: "2024-11-20",
    endDate: "2024-11-29",
    posts: 0,
    impressions: "N/A",
    engagement: "N/A",
  },
  {
    id: "3",
    name: "Q2 Brand Awareness Push",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    posts: 42,
    impressions: "3.5M",
    engagement: "4.2%",
  },
  {
    id: "4",
    name: "Eco-Friendly Initiative",
    status: "Paused",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    posts: 5,
    impressions: "150K",
    engagement: "3.1%",
  },
];

const statusColors: Record<CampaignStatus, "default" | "secondary" | "outline" | "destructive"> = {
  Active: "default",
  Planned: "secondary",
  Completed: "outline",
  Paused: "destructive",
};

export default function CampaignsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <>
      <Header title="Campaigns">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new campaign</DialogTitle>
              <DialogDescription>
                Fill in the details to set up your new campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Summer Sale"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date-range" className="text-right">
                  Date Range
                </Label>
                <div className="col-span-3">
                  <DateRangePicker date={date} onDateChange={setDate} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Header>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>
            Manage and track the performance of your marketing campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead className="text-center">Performance</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[campaign.status]}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.startDate} - {campaign.endDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{campaign.posts} Posts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{campaign.impressions} Impr.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{campaign.engagement} Eng.</span>
                      </div>
                    </div>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Posts</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

    