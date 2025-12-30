"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { socialIcons } from "@/components/icons";
import type { SocialAccount, SocialPlatform } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings, Shield } from "lucide-react";

const initialAccounts: SocialAccount[] = [
  {
    id: "fb",
    platform: "Facebook",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.Facebook,
  },
  {
    id: "ig",
    platform: "Instagram",
    username: "@socialcentral",
    avatar: "",
    isConnected: true,
    Icon: socialIcons.Instagram,
  },
  {
    id: "x",
    platform: "X",
    username: "@Social_Central",
    avatar: "",
    isConnected: true,
    Icon: socialIcons.X,
  },
  {
    id: "li",
    platform: "LinkedIn",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.LinkedIn,
  },
  {
    id: "tt",
    platform: "TikTok",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.TikTok,
  },
  {
    id: "yt",
    platform: "YouTube",
    username: "Social Central",
    avatar: "",
    isConnected: true,
    Icon: socialIcons.YouTube,
  },
];

const AccountCard = ({
  account,
  onToggle,
}: {
  account: SocialAccount;
  onToggle: (id: string) => void;
}) => {
  const PlatformIcon = socialIcons[account.platform];

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <PlatformIcon className="w-8 h-8" />
        <CardTitle>{account.platform}</CardTitle>
        <Badge
          variant={account.isConnected ? "default" : "secondary"}
          className="ml-auto"
        >
          {account.isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm font-medium">{account.isConnected ? account.username : "Not Connected"}</p>
        <p className="text-xs text-muted-foreground">
            {account.isConnected ? "Account is active and ready to use." : "Connect this account to start posting."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          className="w-full"
          variant={account.isConnected ? "destructive" : "default"}
          onClick={() => onToggle(account.id)}
        >
          {account.isConnected ? "Disconnect" : "Connect"}
        </Button>
        {account.isConnected && (
            <Button className="w-full" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Manage
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default function SocialAccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [filter, setFilter] = useState<"all" | "connected" | "disconnected">(
    "all"
  );

  const toggleConnection = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              isConnected: !acc.isConnected,
              username: !acc.isConnected
                ? `@${"social_user"}`
                : "Not Connected",
            }
          : acc
      )
    );
  };

  const filteredAccounts = accounts.filter((account) => {
    if (filter === "all") return true;
    if (filter === "connected") return account.isConnected;
    if (filter === "disconnected") return !account.isConnected;
  });

  return (
    <div>
        <div className="flex items-center gap-2 mb-4">
            <Badge
            variant={filter === "all" ? "default" : "secondary"}
            onClick={() => setFilter("all")}
            className="cursor-pointer"
            >
            All
            </Badge>
            <Badge
            variant={filter === "connected" ? "default" : "secondary"}
            onClick={() => setFilter("connected")}
            className="cursor-pointer"
            >
            Connected
            </Badge>
            <Badge
            variant={filter === "disconnected" ? "default" : "secondary"}
            onClick={() => setFilter("disconnected")}
            className="cursor-pointer"
            >
            Disconnected
            </Badge>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAccounts.map((account) => (
            <AccountCard
                key={account.id}
                account={account}
                onToggle={toggleConnection}
            />
            ))}
        </div>
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5"/>
                    <span>Security & Access Control</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Your account security is our top priority. We use industry-standard protocols to ensure your data is safe.
                    You can manage which team members have access to each social account from the Team settings page.
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" asChild>
                    <a href="/settings/team">
                        Manage Team Permissions <ExternalLink className="ml-2 h-4 w-4"/>
                    </a>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}