"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const auditLog = [
    { id: 1, event: "User Login", user: "Alice Johnson", ip: "192.168.1.1", time: "2024-08-15 10:01 AM", status: "Success" },
    { id: 2, event: "Changed Role", user: "Alice Johnson", ip: "192.168.1.1", time: "2024-08-15 09:45 AM", details: "Bob Williams to Editor", status: "Success" },
    { id: 3, event: "User Login", user: "Bob Williams", ip: "10.0.0.5", time: "2024-08-15 09:30 AM", status: "Success" },
    { id: 4, event: "Failed Login", user: "admin", ip: "203.0.113.25", time: "2024-08-15 09:28 AM", status: "Failure" },
];

export default function SecurityPage() {
    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account's security features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="default">Enabled</Badge>
                            <Button variant="outline">Manage</Button>
                        </div>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-muted-foreground">Last changed on July 20, 2024</p>
                        </div>
                         <Button variant="outline">Change Password</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Audit Log</CardTitle>
                    <CardDescription>
                        A log of important security-related events in your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLog.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.event}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell>{log.time}</TableCell>
                                    <TableCell>
                                        <Badge variant={log.status === "Success" ? "secondary" : "destructive"}>
                                            {log.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">Export Full Audit Log</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
