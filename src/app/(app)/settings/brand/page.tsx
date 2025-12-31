"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BrandGuidelinesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Voice & Tone</CardTitle>
          <CardDescription>
            Define your brand's personality to ensure consistent AI-generated
            content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="brand-tone">Primary Tone</Label>
            <Select defaultValue="Friendly">
              <SelectTrigger id="brand-tone">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Witty">Witty</SelectItem>
                <SelectItem value="Inspirational">Inspirational</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="brand-guidelines">Key Messaging & Rules</Label>
            <Textarea
              id="brand-guidelines"
              placeholder="e.g., Always use emojis. Never mention our competitors by name. Our core message is 'Simplicity in Social Media'."
              className="min-h-[150px]"
              defaultValue="Our brand is approachable and helpful. We use emojis to add personality but avoid slang. We focus on empowering our users."
            />
          </div>
          <div>
            <Label htmlFor="banned-words">Banned Words or Phrases</Label>
            <Textarea
                id="banned-words"
                placeholder="Enter words or phrases separated by commas. e.g., cheap, ripoff, impossible"
                defaultValue="complicated, hard to use, inferior"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
