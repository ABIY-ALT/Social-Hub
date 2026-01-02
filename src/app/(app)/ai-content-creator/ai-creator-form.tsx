"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateSocialMediaContent,
  type GenerateSocialMediaContentInput,
  type GenerateSocialMediaContentOutput,
} from "@/ai/flows/generate-social-media-content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Copy, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  topic: z.string().min(3, {
    message: "Topic must be at least 3 characters.",
  }),
  contentType: z.string(),
  tone: z.string(),
  additionalInfo: z.string().optional(),
});

export function AICreatorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSocialMediaContentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      contentType: "social_media",
      tone: "professional",
      additionalInfo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await generateSocialMediaContent(values as GenerateSocialMediaContentInput);
      setResult(output);
      toast({
        title: "Content Generated",
        description: "Your new content is ready.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Content",
        description: "There was an issue with the AI. Please try again.",
      });
    }
    setLoading(false);
  }
  
  const handleCopy = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
      toast({ title: "Copied to clipboard!" });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Content Generator</CardTitle>
          <CardDescription>
            Fill out the details below to generate content with AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a content type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="blog_post">Blog Post</SelectItem>
                          <SelectItem value="social_media">Social Media Post</SelectItem>
                          <SelectItem value="ad_copy">Ad Copy</SelectItem>
                          <SelectItem value="email">Email Newsletter</SelectItem>
                          <SelectItem value="product_description">Product Description</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="script">Video Script</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="persuasive">Persuasive</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic / Keyword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Benefits of AI in Marketing'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements, target audience, key points, or style guidelines..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
          <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>Review, edit, and use the AI-generated content below.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <Textarea
                className="min-h-[300px] text-base bg-muted/30 h-full"
                value={result?.content || "Your generated content will appear here..."}
                readOnly={!result}
              />
            )}
          </CardContent>
          {result && (
            <>
                <Separator />
                <CardFooter className="justify-end gap-2 pt-6">
                    <Button variant="outline" onClick={handleCopy}>
                        <Copy className="mr-2"/>
                        Copy
                    </Button>
                    <Button>
                        <Save className="mr-2"/>
                        Save to Library
                    </Button>
                </CardFooter>
            </>
          )}
        </Card>
    </div>
  );
}
