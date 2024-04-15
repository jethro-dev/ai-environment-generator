"use client";
import React, { createRef, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSkybox } from "@/hooks/use-skybox";
import {
  AutorotatePlugin,
  MarkersPlugin,
  GyroscopePlugin,
} from "react-photo-sphere-viewer";

const ReactPhotoSphereViewer = dynamic(
  () =>
    import("react-photo-sphere-viewer").then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);

export const PanoramaViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skybox = useSkybox((state) => state.skybox);

  const plugins = [
    [
      AutorotatePlugin,
      {
        // autorotatePitch: "5deg",
        autorotateSpeed: "0.5rpm",
      },
    ],
    /* [FIXME] This will overlay prompt form */
    // [
    //   MarkersPlugin,
    //   {
    //     markers: [
    //       {
    //         id: "new-marker",
    //         position: { yaw: "45deg", pitch: "0deg" },
    //         image: "assets/pin-red.png",
    //         size: { width: 320, height: 320 },
    //       },
    //     ],
    //   },
    // ],
    [GyroscopePlugin],
  ];

  return (
    <div className="h-full w-full relative">
      <ReactPhotoSphereViewer
        key={Math.random()}
        src={skybox.file_url}
        height={"100%"}
        width={"100%"}
        container={containerRef as unknown as HTMLElement}
        loadingTxt=""
        keyboard={false}
        minFov={75}
        maxFov={90}
        defaultYaw={5.3}
        navbar={["fullscreen", "gyroscope"]}
        // @ts-ignore
        plugins={plugins}
      ></ReactPhotoSphereViewer>
    </div>
  );
};

