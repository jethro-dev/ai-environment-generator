import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchStyles(): Promise<Style[]> {
  const response = await fetch(
    "https://backend.blockadelabs.com/api/v1/skybox/styles",
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_BLOCKADE_API_KEY as string,
      },
    }
  );
  const data = await response.json();
  return data;
}
