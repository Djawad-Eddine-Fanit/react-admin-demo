"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "@/schemas"; // adjust path
import type { AddUserInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
export default function UserFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema) as any, // fix TS mismatch
  });

  const onSubmit = async (data: AddUserInput) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: "User created",
        description: `${data.firstName} ${data.lastName} was successfully created.`,
      });

      reset(); // reset form
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create user.",
      });
    }
  };

  return (
    <div className="p-6 mt-16 max-w-md mx-auto space-y-6 bg-card text-card-foreground rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold">Add New User</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <Label>First Name</Label>
          <Input {...register("firstName")} placeholder="John" />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label>Last Name</Label>
          <Input {...register("lastName")} placeholder="Doe" />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label>Email</Label>
          <Input {...register("email")} placeholder="john@example.com" />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label>Age (optional)</Label>
          <Input
            {...register("age", { valueAsNumber: true })}
            placeholder="30"
            type="number"
          />
          {errors.age && (
            <span className="text-red-500 text-sm mt-1">
              {errors.age.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
}