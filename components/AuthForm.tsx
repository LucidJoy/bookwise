"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  UseFormReturn,
  DefaultValues,
  SubmitHandler,
  FieldValues,
  Path,
} from "react-hook-form";
import { TypeOf, z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast("Success", {
        description: isSignIn ? "Sign In Success." : "Sign Up Success",
      });

      router.push("/");
    } else {
      toast("Error", {
        description: isSignIn ? "Sign In Error." : "Sign Up Error",
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>

      <p className='text-light-100'>
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-8 w-full'
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        onFileChange={field.onChange}
                        type='image'
                        accept='image/*'
                        placeholder='Upload your ID'
                        folder='ids'
                        variant='dark'
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_NAMES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className='form-input'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type='submit' className='form-btn'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className='text-center text-base font-medium'>
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className='font-bold text-primary'
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
