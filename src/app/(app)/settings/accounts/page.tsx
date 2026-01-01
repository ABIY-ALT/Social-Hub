
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { socialIcons } from "@/components/icons";
import type { SocialAccount, SocialPlatform } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings, Shield, Link as LinkIcon, AlertTriangle } from "lucide-react";
import Link from "next/link";


// NOTE: In a real app, this connection state would be fetched from your database.
const initialAccounts: SocialAccount[] = [
  {
    id: "fb",
    platform: "Facebook",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.Facebook,
    authUrl: "/api/auth/facebook" 
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
    authUrl: "/api/auth/twitter"
  },
  {
    id: "li",
    platform: "LinkedIn",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.LinkedIn,
    authUrl: "/api/auth/linkedin"
  },
  {
    id: "tt",
    platform: "TikTok",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.TikTok,
    authUrl: "/api/auth/tiktok"
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
  onConnect,
  onDisconnect,
}: {
  account: SocialAccount;
  onConnect: (platform: SocialPlatform) => void;
  onDisconnect: (platform: SocialPlatform) => void;
}) => {
  const PlatformIcon = socialIcons[account.platform];

  const handleConnect = () => {
    if (account.authUrl) {
      onConnect(account.platform);
    }
  };

  const handleDisconnect = () => {
    onDisconnect(account.platform);
  };

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
        {account.isConnected ? (
           <Button
              className="w-full"
              variant="destructive"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
        ) : (
            <Button
              className="w-full"
              variant="default"
              onClick={handleConnect}
              disabled={!account.authUrl}
            >
             <LinkIcon className="mr-2 h-4 w-4" />
              Connect
            </Button>
        )}
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
  
  const handleConnect = (platform: SocialPlatform) => {
    setAccounts(prev => prev.map(acc => acc.platform === platform ? { ...acc, isConnected: true, username: `@${platform.toLowerCase()}_user` } : acc));
  };
  
  const handleDisconnect = (platform: SocialPlatform) => {
    setAccounts(prev => prev.map(acc => acc.platform === platform ? { ...acc, isConnected: false, username: 'Not Connected' } : acc));
  };
  
  const filteredAccounts = accounts.filter((account) => {
    if (filter === "all") return true;
    if (filter === "connected") return account.isConnected;
    if (filter === "disconnected") return !account.isConnected;
  });

  return (
    <div>
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary"/>
                    <span>Connected Accounts</span>
                </CardTitle>
                <CardDescription>
                    Manage the social media accounts linked to your workspace.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                          onConnect={handleConnect}
                          onDisconnect={handleDisconnect}
                      />
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card className="mt-6 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1"/>
                <div>
                    <CardTitle className="text-yellow-800 dark:text-yellow-200">
                        Developer Note: Simulated OAuth Flow
                    </CardTitle>
                    <CardDescription className="text-yellow-700 dark:text-yellow-300">
                        The connect/disconnect buttons currently simulate the flow locally. To enable a real OAuth flow, you must implement a backend (e.g., Firebase Functions) and replace the `authUrl` in this component with your function URLs.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    </div>
  );
}
