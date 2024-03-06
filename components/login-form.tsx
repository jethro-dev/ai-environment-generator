"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function LoginForm() {
  const { data: session } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="glassify max-w-[350px] w-full mx-auto rounded-md p-6 flex flex-col items-center"
      >
        <Image
          src={"/logo.png"}
          alt="LIVR Studios"
          width={134}
          height={40}
          className="ml-2 w-[60px] md:w-[100px]"
          priority={true}
        />
        <div className="mt-10 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-light">Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="text-xs font-light">Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-10">
            Sign in
          </Button>
        </div>
        <Separator className="my-10" />
        <Button
          type="button"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
      </form>
    </Form>
  );
}
