import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const calculate = (currentProgress: number, step: number, end: number) => {
//   currentProgress += step;

//   let progress =
//     Math.round((Math.atan(currentProgress) / (Math.PI / 2)) * end * 1000) /
//     1000;

//   console.log(progress);
// };

// export const calculateProgress = (end: number) => {
//   let currentProgress = 0;
//   let step = 0.5;

//   let interval = setInterval(() => {
//     calculate(currentProgress, step, end);
//     // if (currentProgress >= end) {
//     //   clearInterval(interval);
//     // } else if (currentProgress >= end * 0.7) {
//     //   step = 0.1;
//     // }
//   }, 1000);
// };

// calculate(0, 0.5, 100);
