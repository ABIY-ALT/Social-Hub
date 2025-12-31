"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, MessageSquare } from "lucide-react";

export default function NotificationSettingsPage() {
  const notificationOptions = [
    { id: "new-mention", label: "New Mention", description: "When your brand is mentioned on any platform." },
    { id: "pending-approval", label: "Post Requires Approval", description: "When a team member submits a post for approval." },
    { id: "post-failed", label: "Scheduled Post Failed", description: "When a post fails to publish to a platform." },
    { id: "new-message", label: "New Inbox Message", description: "When you receive a new direct message." },
    { id: "risk-alert", label: "High-Risk Content Detected", description: "When AI detects high-risk content." },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to be notified about important events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-medium text-muted-foreground text-sm mb-4">
              <div/>
              <div className="flex items-center gap-2 justify-center"><Bell className="h-4 w-4"/> In-App</div>
              <div className="flex items-center gap-2 justify-center"><Mail className="h-4 w-4"/> Email</div>
          </div>
          <div className="space-y-4">
            {notificationOptions.map((option, index) => (
                <>
                    <div key={option.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div>
                            <h4 className="font-medium">{option.label}</h4>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <div className="flex justify-center">
                            <Checkbox defaultChecked id={`${option.id}-app`} />
                        </div>
                        <div className="flex justify-center">
                            <Checkbox id={`${option.id}-email`} />
                        </div>
                    </div>
                    {index < notificationOptions.length - 1 && <Separator />}
                </>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
