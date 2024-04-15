"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { cn, fetchStyles } from "@/lib/utils";
import { generate } from "@/actions/generate";
import { StyleSelector } from "./style-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useSkybox } from "@/hooks/use-skybox";
import { Loader2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";

type Prop = {};

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  skybox_style_id: z.string(),
  is_remix: z.boolean(),
});

const DEFAULT_STATUS = "SceneAI is ready";

export function InputForm({}: Prop) {
  const { setSkybox, skybox } = useSkybox((state) => state);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(DEFAULT_STATUS);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);
  const [styles, setStyles] = useState<Style[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      skybox_style_id: "9",
      is_remix: false,
    },
  });

  const pusherEventHandler = (data: Skybox) => {
    console.log("PUSHER_EVENT_HANDLER");
    console.log(data);
    console.log(`Status: ${data.status}`);
    setStatus(data.status);

    // if status is pending, set process to 25%
    if (data.status === "pending") {
      setStatus("SceneAI is warming up...");
      setProgress(25);
    }

    // if status is dispatched, set process to 25%
    if (data.status === "dispatched") {
      setStatus("SceneAI is reading your prompts...");
      setProgress(50);
    }

    // if status is processing, set process to 25%
    if (data.status === "processing") {
      setStatus("SceneAI is generating...");
      setProgress(75);
    }

    // if status is complete, set process to 100%
    if (data.status === "complete") {
      setStatus(DEFAULT_STATUS);
      setProgress(100);
      setLoading(false);
      setSkybox(data);
      setTimeout(() => setProgress(0), 1000);

      if (channel) {
        pusherClient.unsubscribe(channel);
        pusherClient.unbind("status_update", pusherEventHandler);
        setChannel(null);
      }
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    setStatus("Queueing...");
    const { prompt, skybox_style_id, is_remix } = data;
    const result = await generate({
      prompt,
      skybox_style_id: parseInt(skybox_style_id),
      remix_imagine_id: is_remix ? skybox.id : undefined,
    });
    setChannel(result.pusher_channel);
    pusherClient.subscribe(result.pusher_channel);
    pusherClient.bind("status_update", pusherEventHandler);
  }

  useEffect(() => {
    let isActive = true; // flag to handle component unmount

    fetchStyles()
      .then((fetchedData) => {
        if (isActive) {
          setStyles(fetchedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 rounded-2xl bg-black/20 border border-white/10 p-6 backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-light text-sm text-neutral-300">
            <b className="text-lg font-semibold text-white">SceneAI</b> -
            Bringing Imagination to Life.
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                `h-2 w-2  rounded-full border border-white/10 blink`,
                loading ? "bg-orange-500" : "bg-green-500"
              )}
            ></span>
            <span className="font-light text-sm text-neutral-300">
              {status}
            </span>
          </div>
        </div>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-normal font-light text-neutral-300">
                Step 1. Enter your prompt
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Share your creative thoughts"
                  {...field}
                  className="transition-all duration-300 rounded-md border border-white/10 bg-black/20 backdrop-blur font-light placeholder:text-neutral-400 resize-none min-h-0"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end justify-between gap-4">
          <FormField
            control={form.control}
            name="skybox_style_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-normal font-light text-neutral-300">
                  Step 2. Select a style
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black/20 backdrop-blur border-white/20 max-w-xs rounded-md px-5 font-light">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-white/10 bg-black/20 backdrop-blur font-light">
                    {styles.map((style) => (
                      <SelectItem key={style.id} value={style.id.toString()}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <p className="text-neutral-300 font-light text-sm">Step 3.</p>
              <FormField
                control={form.control}
                name="is_remix"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0 border-white/10 border px-6 h-12 rounded-md bg-black/20 backdrop-blur">
                    <FormControl>
                      <Checkbox
                        className="border-white/20"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-light">
                      Base on this scene
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              size={"lg"}
              className="px-6 h-12 border border-white/10 bg-black/20 backdrop-blur rounded-md font-light text-sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Start SceneAI"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
