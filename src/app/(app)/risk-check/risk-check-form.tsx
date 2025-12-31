"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  analyzeContentRiskAndRewrite,
  type AnalyzeContentRiskAndRewriteInput,
  type AnalyzeContentRiskAndRewriteOutput,
} from "@/ai/flows/analyze-content-risk-and-rewrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  contentGoal: z.string(),
  platform: z.string(),
});

type RiskScore = "Low" | "Medium" | "High";

const riskConfig: Record<RiskScore, { icon: React.ElementType, color: string, label: string }> = {
    Low: { icon: ShieldCheck, color: "text-green-500", label: "Low Risk" },
    Medium: { icon: ShieldAlert, color: "text-yellow-500", label: "Medium Risk" },
    High: { icon: ShieldAlert, color: "text-red-500", label: "High Risk" },
};

const RiskAnalysisResult = ({ result, loading }: { result: AnalyzeContentRiskAndRewriteOutput | null; loading: boolean; }) => {
    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-16 w-full" />
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full min-h-[300px]">
                <ShieldQuestion className="h-12 w-12 mb-4" />
                <p>Your content analysis will appear here.</p>
            </div>
        );
    }
    
    const config = riskConfig[result.riskScore];
    const Icon = config.icon;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Analysis Complete</CardTitle>
                        <CardDescription>Review the AI-powered risk assessment.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon className={cn("h-6 w-6", config.color)} />
                        <span className={cn("text-lg font-bold", config.color)}>{config.label}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Risk Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.riskCategories.map(category => (
                            <Badge key={category} variant="secondary">{category}</Badge>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">AI Explanation</h4>
                    <p className="text-sm text-muted-foreground">{result.riskAnalysis}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Recommended Safe Rewrite</h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{result.safeRewriteRecommendation}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Approval Status</h4>
                    <Badge variant={result.requiresApproval ? "destructive" : "default"}>
                        {result.requiresApproval ? "Requires Manual Approval" : "Approved for Publishing"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};


export function RiskCheckForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeContentRiskAndRewriteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      contentGoal: "awareness",
      platform: "Instagram",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await analyzeContentRiskAndRewrite(values as AnalyzeContentRiskAndRewriteInput);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze content. Please try again.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Content to Analyze</CardTitle>
          <CardDescription>
            Enter the content you want to check for potential risks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Don't miss our flash sale! 50% off everything, today only!'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="X">X (Twitter)</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="awareness">Awareness</SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <RiskAnalysisResult result={result} loading={loading} />
    </div>
  );
}
