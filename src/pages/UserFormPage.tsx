"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "@/types/schemas";
import type { AddUserInput } from "@/types/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCreateUser } from "@/features/users/hooks/UseCreateUser";

export default function UserFormPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema) as any,
  });

  const { mutateAsync: createUser, isPending } = useCreateUser();

  const onSubmit = async (data: AddUserInput) => {
  try {
    await createUser(data);
    reset();
    navigate("/users"); 
  } catch (err: any) {
    
    const message =
      err?.message || "An unexpected error occurred while creating the user.";

    setError("root", { type: "server", message });
  }
};

  return (
    <div className="min-h-screen bg-muted/40 py-12 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Add New User
          </h1>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate("/users")}
          >
            <ArrowLeft className="size-4" />
            Back to Users
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6">User Information</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label>First Name</Label>
              <Input {...register("firstName")} placeholder="John" className=" mt-2" />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Last Name</Label>
              <Input {...register("lastName")} placeholder="Doe" className=" mt-2" />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="john@example.com"  className=" mt-2" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Age (optional)</Label>
              <Input
                {...register("age", { valueAsNumber: true })}
                placeholder="30"
                type="number"
                 className=" mt-2"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full font-medium"
            >
              {isPending ? "Creating..." : "Create User"}
            </Button>
          </form>
        </div>

        {/* Side Info Panel */}
        <div className="hidden md:block bg-card p-8 rounded-2xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Tips for Adding Users</h2>
          <ul className="text-sm text-muted-foreground space-y-3">
            <li>• Use real names and emails for tracking purposes.</li>
            <li>• The age field is optional — leave it blank if unknown.</li>
            <li>
              • After creating a user, you’ll be redirected to the users list.
            </li>
          </ul>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              You can always edit or delete a user later from the users
              management page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
