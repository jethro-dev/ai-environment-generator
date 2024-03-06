"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { saveAs } from "file-saver";
import {
  Download,
  Eye,
  EyeOff,
  Fullscreen,
  Loader2,
  LogOut,
  Maximize,
  Minimize,
  Rotate3D,
  TrendingUpIcon,
} from "lucide-react";

import { pusherClient } from "@/lib/pusher";
import { useSkybox } from "@/hooks/use-skybox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useInterval } from "@/hooks/use-interval";
import Image from "next/image";
import { isMobile } from "mobile-device-detect";
import screenfull from "screenfull";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  prompt: z.string().min(2).max(100),
  skybox_style_id: z.string(),
  remix_imagine_id: z.number().optional(),
});

type Props = {};

const PromptForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const skybox = useSkybox((state) => state.skybox);
  const setSkybox = useSkybox((state) => state.setSkybox);
  const [channel, setChannel] = useState("");
  const [styles, setStyles] = useState<Style[]>([]);
  const [tab, setTab] = useState<"craft" | "evolve">("craft");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasGyro, setHasGyro] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchStyles() {
      const response = await axios.get(
        "https://backend.blockadelabs.com/api/v1/skybox/styles",
        {
          headers: {
            "x-api-key":
              "2ftlSWB0iDL2ZyUoryGuga74M2cIuppFemRVwyerOeBeHi4Ze681HmdwbNUx",
          },
        }
      );
      return response.data;
    }

    fetchStyles().then((styles) => {
      const filteredStyles = styles.filter((style: any) => style.premium === 0);
      setStyles(filteredStyles);
    });
  }, []);

  useEffect(() => {
    if (!channel) return;
    const pusherEventHandler = (data: Skybox) => {
      console.log("PUSHER_EVENT_HANDLER");
      console.log(data);
      console.log(`Status: ${data.status}`);

      // if status is pending, set process to 25%
      if (data.status === "pending") {
        setProgress(25);
      }

      // if status is dispatched, set process to 25%
      if (data.status === "dispatched") {
        setProgress(50);
      }

      // if status is processing, set process to 25%
      if (data.status === "processing") {
        setProgress(75);
      }

      // if status is complete, set process to 100%
      if (data.status === "complete") {
        setProgress(100);
        setLoading(false);
        setSkybox(data);
        setTimeout(() => setProgress(0), 1000);
      }
    };

    console.log(
      `PUSHER Subscribing and binding...\nChannel: ${channel}\nEvent: status_update`
    );
    pusherClient.subscribe(channel);
    pusherClient.bind("status_update", pusherEventHandler);

    return () => {
      console.log(
        `PUSHER UNSubscribing and UNbinding...\nChannel: ${channel}\nEvent: status_update`
      );
      pusherClient.unsubscribe(channel);
      pusherClient.unbind("status_update", pusherEventHandler);
    };
  }, [channel, setSkybox]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      skybox_style_id: "9",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Start
      setLoading(true);
      console.log("Form onSubmit starts..");

      let submit_data = { ...values };

      if (tab === "craft") {
        const response = await axios.post("/api/generate", {
          ...submit_data,
        });

        const data = response.data;
        setChannel(data.pusher_channel);
      }

      if (tab === "evolve") {
        submit_data.remix_imagine_id = skybox.id;
        const response = await axios.post("/api/evolve", {
          ...submit_data,
        });

        const data = response.data;
        setChannel(data.pusher_channel);
      }
    } catch (error) {
      // Failed
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div
        className={`absolute pb-10 bottom-0 left-[50%] -translate-x-[50%] px-8 w-full transition-all duration-300 ease-out ${
          hideUI ? "translate-y-full" : ""
        }`}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative max-w-5xl mx-auto w-full rounded-[33px] group transition-all duration-200 p-5 glassify"
        >
          <div className="absolute bottom-[100%] right-0 -translate-y-4 glassify rounded-[33px] flex items-center gap-x-3 px-4 py-2">
            {isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={"icon"}
                      type="button"
                      onClick={() => {
                        const gyroBtn = document.querySelector(
                          ".psv-gyroscope-button"
                        ) as HTMLButtonElement;

                        if (gyroBtn.style.display !== "none") {
                          gyroBtn.click();
                        }
                      }}
                    >
                      <Rotate3D className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={30}>
                    <p>Enable Motion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    type="button"
                    onClick={() => {
                      setIsFullscreen((prev) => !prev);
                      screenfull.toggle();
                    }}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={30}>
                  <p>Fullscreen</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    type="button"
                    onClick={() =>
                      saveAs(skybox.file_url, "generated-image.png")
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={30}>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    type="button"
                    onClick={() =>
                      // saveAs(skybox.file_url, "generated-image.png")
                      setHideUI((prev) => !prev)
                    }
                  >
                    {hideUI ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={30}>
                  {hideUI ? <p>Show UI</p> : <p>Hide UI</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    type="button"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={30}>Log out</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Tabs defaultValue={tab} className="w-full space-y-4">
            <div className="flex items-start md:items-center justify-between">
              <div className="flex-1 flex flex-row items-center justify-between md:justify-start md:gap-4">
                <Image
                  src={"/logo.svg"}
                  alt="LIVR Studios"
                  width={134}
                  height={40}
                  className="ml-2 w-[60px] md:w-[100px] order-2 md:order-1"
                  priority={true}
                />
                <TabsList className="grid grid-cols-2 lg:w-[200px] order-1 md:order-2">
                  <TabsTrigger value="craft" onClick={() => setTab("craft")}>
                    Craft
                  </TabsTrigger>
                  <TabsTrigger value="evolve" onClick={() => setTab("evolve")}>
                    Evolve
                  </TabsTrigger>
                </TabsList>

                <FormField
                  control={form.control}
                  name="skybox_style_id"
                  render={({ field }) => (
                    <FormItem className="hidden md:block md:order-3">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"Realism"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full md:w-[250px]">
                            <SelectValue>
                              {
                                styles.find((style) => style.id == field.value)
                                  ?.name
                              }
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {styles.map((style) => (
                            <SelectItem key={style.id} value={style.id}>
                              {style.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <TabsContent value="craft">
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="space-y-0 relative flex-1 overflow-hidden rounded-full">
                      {/* <FormLabel>Username</FormLabel> */}
                      <FormControl className="">
                        <Input
                          disabled={loading}
                          placeholder="Craft your vision"
                          autoComplete="off"
                          {...field}
                        ></Input>
                      </FormControl>
                      <Progress
                        value={progress}
                        className="absolute z-10 top-0 left-0 h-full rounded-none"
                      />
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="skybox_style_id"
                    render={({ field }) => (
                      <FormItem className="flex-1 md:hidden">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={"Realism"}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full lg:w-[250px]">
                              <SelectValue>
                                {
                                  styles.find(
                                    (style) => style.id == field.value
                                  )?.name
                                }
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {styles.map((style) => (
                              <SelectItem key={style.id} value={style.id}>
                                {style.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    className="sm:min-w-[100px]"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Craft"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="evolve">
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="space-y-0 relative flex-1 overflow-hidden rounded-full">
                      {/* <FormLabel>Username</FormLabel> */}
                      <FormControl className="">
                        <Input
                          disabled={loading}
                          placeholder="Evolve your existing vision with a new aesthetic or by describing it"
                          autoComplete="off"
                          {...field}
                        ></Input>
                      </FormControl>
                      <Progress
                        value={progress}
                        className="absolute z-10 top-0 left-0 h-full rounded-none"
                      />
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="skybox_style_id"
                    render={({ field }) => (
                      <FormItem className="flex-1 md:hidden">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={"Realism"}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full lg:w-[250px]">
                              <SelectValue>
                                {
                                  styles.find(
                                    (style) => style.id == field.value
                                  )?.name
                                }
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {styles.map((style) => (
                              <SelectItem key={style.id} value={style.id}>
                                {style.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    className="sm:min-w-[100px]"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Evolve"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </Form>
  );
};

export default PromptForm;
