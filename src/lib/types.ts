
import type { LucideIcon } from "lucide-react";

export type SocialPlatform = "Facebook" | "Instagram" | "X" | "LinkedIn" | "TikTok" | "YouTube";

export type SocialAccount = {
  id: string;
  platform: SocialPlatform;
  username: string;
  avatar: string;
  isConnected: boolean;
  Icon: React.ElementType;
  authUrl?: string;
};

export type InboxMessage = {
  id: string;
  platform: SocialPlatform;
  type: "message" | "comment";
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Admin" | "Editor" | "Viewer";
};

export type UserRole = 'Admin' | 'Manager' | 'Editor';

export type User = {
  name: string;
  role: UserRole;
}
