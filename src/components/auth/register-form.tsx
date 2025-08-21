"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FullPageLoader from "@/components/ui/FullPageLoader";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export function RegisterForm({ role }: { role: "TALENT" | "HIRER" }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [showFullLoader, setShowFullLoader] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: any) {
    setIsLoading(true);
    setFormError("");
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setFormError(data.error || "Something went wrong");
        toast({ title: "Error", description: data.error || "Something went wrong", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      toast({ title: "Account created!", description: "Welcome to TalentConnect! Redirecting...", variant: "default" });
      setShowFullLoader(true);
      setTimeout(() => {
        let redirectUrl = "/dashboard";
        if (role === "HIRER") redirectUrl = "/dashboard/hirer";
        else if (role === "TALENT") redirectUrl = "/dashboard/talent";
        router.push(redirectUrl);
        router.refresh();
      }, 1200);
    } catch (error) {
      setFormError("Something went wrong. Please try again.");
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      setIsLoading(false);
    }
  }

  return (
    <>
      {showFullLoader && <FullPageLoader />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in" aria-label="Signup form">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" disabled={isLoading} {...field} />
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
                <Input placeholder="Enter your password" type="password" disabled={isLoading} {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Re-enter your password" type="password" disabled={isLoading} {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <div className="text-red-500 text-sm text-center">{formError}</div>}
        <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Creating account..." : `Create account as ${role === "TALENT" ? "Talent" : "Hirer"}`}
        </Button>
      </form>
    </>
  );
} 