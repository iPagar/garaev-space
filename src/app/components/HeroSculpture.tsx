"use client";

import { useEffect, useRef, useState } from "react";
import type { SculptureScene } from "../lib/sculpture-scene";

export default function HeroSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let scene: SculptureScene | undefined;

    async function initialize() {
      try {
        const { createSculptureScene } = await import("../lib/sculpture-scene");
        if (cancelled || !host) return;
        scene = createSculptureScene(host);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);

  return (
    <figure className="relative aspect-square w-[min(100%,28svh)] justify-self-center md:w-full">
      <div ref={hostRef} className="absolute inset-0" />
      {status !== "ready" ? (
        <output className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500">
          {status === "loading"
            ? "Loading sculpture…"
            : "3D preview unavailable"}
        </output>
      ) : null}
      <figcaption className="sr-only">
        Silver sculpture with three interlocking rounded frames.
      </figcaption>
    </figure>
  );
}
