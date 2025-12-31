"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AiRulesPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI Risk & Compliance</CardTitle>
                    <CardDescription>
                        Set the thresholds for the AI Content Risk Checker. Higher sensitivity means more content will be flagged.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="risk-sensitivity">Risk Sensitivity Threshold</Label>
                        <div className="flex items-center gap-4 mt-2">
                            <span>Low</span>
                            <Slider id="risk-sensitivity" defaultValue={[50]} max={100} step={1} />
                            <span>High</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Current setting: Medium. Content with moderate or high risk scores will require approval.</p>
                    </div>
                    <Separator />
                     <div>
                        <Label>Automatic Actions</Label>
                        <div className="space-y-3 mt-2">
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <p className="text-sm font-medium">Auto-apply Safe Rewrite</p>
                                <Switch />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <p className="text-sm font-medium">Flag Posts with Legal Keywords</p>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <p className="text-sm font-medium">Disable AI for Specific Platforms</p>
                                <Switch />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <div className="flex justify-end">
                <Button>Save AI Settings</Button>
            </div>
        </div>
    )
}
