
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { bankLogo } from '@/lib/placeholder-images';

const loginSchema = z.object({
  username: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.username !== '0912345678' || data.password !== 'password123') {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid phone number or password. Please try again.",
        });
        setIsLoading(false);
        return;
    }

    toast({
        title: "Login Successful",
        description: "Welcome back!",
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Image
            src={bankLogo.imageUrl}
            alt="Bank Logo"
            width={100}
            height={100}
            priority
            data-ai-hint="logo"
          />
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Social Hub Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Remember me</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log in
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© Nibinternational Bnk – All Rights Reserved</p>
      </footer>
    </div>
  );
}
