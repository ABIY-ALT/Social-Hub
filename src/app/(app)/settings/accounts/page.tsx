"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { socialIcons } from "@/components/icons";
import type { SocialAccount } from "@/lib/types";

const initialAccounts: SocialAccount[] = [
    { id: "fb", platform: "Facebook", username: "Not Connected", avatar: "", isConnected: false, Icon: socialIcons.Facebook },
    { id: "ig", platform: "Instagram", username: "@socialcentral", avatar: "", isConnected: true, Icon: socialIcons.Instagram },
    { id: "x", platform: "X", username: "@Social_Central", avatar: "", isConnected: true, Icon: socialIcons.X },
    { id: "li", platform: "LinkedIn", username: "Not Connected", avatar: "", isConnected: false, Icon: socialIcons.LinkedIn },
    { id: "tt", platform: "TikTok", username: "Not Connected", avatar: "", isConnected: false, Icon: socialIcons.TikTok },
    { id: "yt", platform: "YouTube", username: "Social Central", avatar: "", isConnected: true, Icon: socialIcons.YouTube },
]

export default function SocialAccountsPage() {
    const [accounts, setAccounts] = useState(initialAccounts);

    const toggleConnection = (id: string) => {
        setAccounts(prev => prev.map(acc => 
            acc.id === id ? { ...acc, isConnected: !acc.isConnected, username: !acc.isConnected ? `@${'social_user'}` : 'Not Connected' } : acc
        ));
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map(account => {
                 const PlatformIcon = socialIcons[account.platform];
                 return (
                    <Card key={account.id}>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <PlatformIcon className="w-8 h-8"/>
                            <CardTitle>{account.platform}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{account.isConnected ? account.username : "Not Connected"}</p>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full"
                                variant={account.isConnected ? "destructive" : "default"}
                                onClick={() => toggleConnection(account.id)}
                            >
                                {account.isConnected ? "Disconnect" : "Connect"}
                            </Button>
                        </CardFooter>
                    </Card>
                 )
            })}
        </div>
    )
}
