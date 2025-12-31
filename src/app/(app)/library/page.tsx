
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Upload,
  Search,
  MoreVertical,
  Info,
  History,
  Tag,
  Copy,
  Download,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { socialIcons } from "@/components/icons";

type AssetType = "Image" | "Video";
type Asset = {
  id: string;
  name: string;
  type: AssetType;
  url: string;
  uploadedAt: string;
  tags: string[];
  usage: {
    postId: string;
    platform: keyof typeof socialIcons;
    date: string;
  }[];
};

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "summer_sunglasses_promo.jpg",
    type: "Image",
    url: "https://picsum.photos/seed/401/500/500",
    uploadedAt: "2024-07-15",
    tags: ["promo", "summer", "product"],
    usage: [
      { postId: "p1", platform: "Instagram", date: "2024-07-16" },
      { postId: "p2", platform: "Facebook", date: "2024-07-18" },
    ],
  },
  {
    id: "2",
    name: "office_tour.mp4",
    type: "Video",
    url: "https://picsum.photos/seed/402/500/500",
    uploadedAt: "2024-07-12",
    tags: ["bts", "team", "culture"],
    usage: [{ postId: "p3", platform: "TikTok", date: "2024-07-13" }],
  },
  {
    id: "3",
    name: "new_logo_reveal.png",
    type: "Image",
    url: "https://picsum.photos/seed/403/500/500",
    uploadedAt: "2024-07-10",
    tags: ["branding", "logo"],
    usage: [],
  },
  {
    id: "4",
    name: "client_testimonial.mp4",
    type: "Video",
    url: "https://picsum.photos/seed/404/500/500",
    uploadedAt: "2024-07-08",
    tags: ["testimonial", "customer"],
    usage: [{ postId: "p4", platform: "LinkedIn", date: "2024-07-09" }],
  },
  {
    id: "5",
    name: "q3_infographic.jpg",
    type: "Image",
    url: "https://picsum.photos/seed/405/500/500",
    uploadedAt: "2024-07-05",
    tags: ["data", "analytics", "report"],
    usage: [{ postId: "p5", platform: "X", date: "2024-07-06" }],
  },
  {
    id: "6",
    name: "happy_customer.jpg",
    type: "Image",
    url: "https://picsum.photos/seed/406/500/500",
    uploadedAt: "2024-07-01",
    tags: ["customer", "UGC"],
    usage: [],
  },
];

const AssetCard = ({ asset }: { asset: Asset }) => {
  return (
    <Dialog>
      <Card className="overflow-hidden">
        <DialogTrigger asChild>
          <CardContent className="p-0 cursor-pointer group">
            <div className="relative aspect-square">
              <Image
                src={asset.url}
                alt={asset.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="media library asset"
              />
              {asset.type === "Video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l8.21-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              )}
            </div>
          </CardContent>
        </DialogTrigger>
        <CardFooter className="p-3 flex justify-between items-center">
          <p className="text-sm truncate font-medium">{asset.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-4xl grid-cols-1 md:grid-cols-2 grid gap-6 p-0">
        <div className="relative aspect-video md:aspect-square">
            <Image src={asset.url} alt={asset.name} fill className="object-cover md:rounded-l-lg" data-ai-hint="media library asset" />
        </div>
        <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
                <DialogTitle>{asset.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span>Type: {asset.type}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Uploaded: {asset.uploadedAt}</span>
                </div>
                <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                        {asset.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <Input readOnly value={asset.url} className="h-8" />
                    <Button size="sm" variant="outline">Copy URL</Button>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="flex-grow space-y-4 overflow-y-auto">
                 <h3 className="font-semibold flex items-center gap-2"><History className="h-4 w-4 text-muted-foreground" /> Usage History</h3>
                 {asset.usage.length > 0 ? (
                    <div className="space-y-3">
                        {asset.usage.map(use => {
                            const PlatformIcon = socialIcons[use.platform];
                            return (
                                <div key={use.postId} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                                    <div className="flex items-center gap-2">
                                        <PlatformIcon className="h-4 w-4" />
                                        <span>Posted to {use.platform}</span>
                                    </div>
                                    <span className="text-muted-foreground">{use.date}</span>
                                </div>
                            )
                        })}
                    </div>
                 ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">This asset has not been used in any posts yet.</p>
                 )}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function MediaLibraryPage() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Header title="Media Library">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assets..." className="pl-9" />
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </Header>

      <div className="flex items-center gap-2 mb-4">
        <Badge
          variant={filter === "all" ? "default" : "secondary"}
          onClick={() => setFilter("all")}
          className="cursor-pointer"
        >
          All
        </Badge>
        <Badge
          variant={filter === "images" ? "default" : "secondary"}
          onClick={() => setFilter("images")}
          className="cursor-pointer"
        >
          Images
        </Badge>
        <Badge
          variant={filter === "videos" ? "default" : "secondary"}
          onClick={() => setFilter("videos")}
          className="cursor-pointer"
        >
          Videos
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mockAssets
          .filter(asset => {
            if (filter === "images") return asset.type === "Image";
            if (filter === "videos") return asset.type === "Video";
            return true;
          })
          .map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
      </div>
    </>
  );
}
