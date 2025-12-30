"use client";

import { useState } from "react";
import {
  Copy,
  PlusCircle,
  Image as ImageIcon,
  Send,
  Save,
  Clock,
  ChevronDown,
  Sparkles,
  Loader2,
  X as XIcon,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { socialIcons } from "@/components/icons";
import type { SocialPlatform } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  generateSocialMediaHashtags,
  type GenerateSocialMediaHashtagsInput,
  type GenerateSocialMediaHashtagsOutput,
} from "@/ai/flows/generate-social-media-hashtags";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

const availablePlatforms: SocialPlatform[] = [
  "Facebook",
  "Instagram",
  "X",
  "LinkedIn",
  "TikTok",
];

export function Composer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(["Instagram"]);
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [generatingHashtags, setGeneratingHashtags] = useState(false);
  const { toast } = useToast();

  const handlePlatformToggle = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleMediaUpload = () => {
    // Placeholder for media upload logic
    const newImage = `https://picsum.photos/seed/${Math.random()}/500/500`;
    setMedia((prev) => [...prev, newImage]);
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  }

  const handleGenerateHashtags = async () => {
    if (!postContent) {
        toast({
            variant: "destructive",
            title: "Content required",
            description: "Please write some content before generating hashtags."
        });
        return;
    }
    setGeneratingHashtags(true);
    try {
        const result = await generateSocialMediaHashtags({
            content: postContent,
            platforms: selectedPlatforms,
        });
        setPostContent(prev => `${prev}\n\n${result.hashtags.join(" ")}`);
    } catch(e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate hashtags. Please try again."
        });
    } finally {
        setGeneratingHashtags(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <CardTitle className="text-lg">Create a post</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((platform) => {
                    const PlatformIcon = socialIcons[platform];
                    const isSelected = selectedPlatforms.includes(platform);
                    return (
                      <button
                        key={platform}
                        onClick={() => handlePlatformToggle(platform)}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors",
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:bg-muted"
                        )}
                      >
                        <PlatformIcon className="h-4 w-4" />
                        {platform}
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center",
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-muted-foreground"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[200px] text-base"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              {media.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {media.map((src, index) => (
                        <div key={index} className="relative group">
                            <Image
                                src={src}
                                alt={`Uploaded media ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-md object-cover aspect-square"
                                data-ai-hint="social media image"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                                onClick={() => removeMedia(index)}
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMediaUpload}>
                <ImageIcon className="mr-2 h-4 w-4" /> Add Media
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateHashtags}
                disabled={generatingHashtags}
              >
                {generatingHashtags ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Hashtags
              </Button>
              <div className="ml-auto text-sm text-muted-foreground">
                {postContent.length} characters
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
             <div className="flex-1 text-sm text-muted-foreground flex items-center gap-2">
                <Badge variant="secondary">Approval: Not Required</Badge>
            </div>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" /> Save as Draft
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Publish <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Send className="mr-2 h-4 w-4" /> Publish Now
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="mr-2 h-4 w-4" /> Schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Platform Previews</CardTitle>
            <CardDescription>
              See how your post will look on each platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedPlatforms.length > 0 ? (
              selectedPlatforms.map((platform) => {
                const PlatformIcon = socialIcons[platform];
                return (
                  <div key={platform}>
                    <div className="flex items-center gap-2 mb-2">
                      <PlatformIcon className="h-5 w-5" />
                      <h3 className="font-semibold">{platform} Preview</h3>
                    </div>
                    <div className="rounded-lg border p-4 bg-muted/50">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                          <div className="font-bold text-sm">Alex</div>
                          <p className="text-sm whitespace-pre-wrap mt-1">
                            {postContent || (
                              <span className="text-muted-foreground">Your content will appear here...</span>
                            )}
                          </p>
                          {media.length > 0 && (
                            <div className="mt-2 relative">
                              <Image
                                src={media[0]}
                                alt="Post media preview"
                                width={400}
                                height={400}
                                className="rounded-md object-cover aspect-video w-full"
                                data-ai-hint="social media image"
                              />
                              {media.length > 1 && (
                                <Badge className="absolute top-2 right-2" variant="secondary">
                                  <Copy className="h-3 w-3 mr-1" />
                                  1/{media.length}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                <PlusCircle className="h-8 w-8 mb-2" />
                <p>Select a platform to see a preview.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
