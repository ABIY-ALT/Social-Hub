
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

// NOTE: In a real app, this connection state would be fetched from your database.
const initialAccounts: SocialAccount[] = [
  {
    id: "fb",
    platform: "Facebook",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.Facebook,
    authUrl: "/api/auth/facebook/start" // Placeholder for your backend endpoint
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
    authUrl: "/api/auth/twitter/start"
  },
  {
    id: "li",
    platform: "LinkedIn",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.LinkedIn,
    authUrl: "/api/auth/linkedin/start"
  },
  {
    id: "tt",
    platform: "TikTok",
    username: "Not Connected",
    avatar: "",
    isConnected: false,
    Icon: socialIcons.TikTok,
    authUrl: "/api/auth/tiktok/start"
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
}: {
  account: SocialAccount & { authUrl?: string };
}) => {
  const PlatformIcon = socialIcons[account.platform];

  const handleConnect = () => {
    if (account.authUrl) {
      // This redirects the user to your backend to start the OAuth flow.
      window.location.href = account.authUrl;
    }
  };

  const handleDisconnect = () => {
    // In a real app, this would call a backend endpoint to revoke the token.
    alert(`Disconnecting ${account.platform} is not implemented in this prototype.`);
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
  // In a real app, you'd fetch account status from your backend, not use static state.
  const [accounts, setAccounts] = useState(initialAccounts);
  const [filter, setFilter] = useState<"all" | "connected" | "disconnected">(
    "all"
  );
  
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
