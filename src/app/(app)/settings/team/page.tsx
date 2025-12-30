"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

const mockTeam: TeamMember[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "https://picsum.photos/seed/201/40/40", role: "Admin" },
  { id: "2", name: "Bob Williams", email: "bob@example.com", avatar: "https://picsum.photos/seed/202/40/40", role: "Editor" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatar: "https://picsum.photos/seed/203/40/40", role: "Viewer" },
  { id: "4", name: "Diana Miller", email: "diana@example.com", avatar: "https://picsum.photos/seed/204/40/40", role: "Editor" },
];

export default function TeamPage() {
  return (
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
                    <div className="font-medium">{member.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {member.email}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
