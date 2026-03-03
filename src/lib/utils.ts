import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K";
  return n.toString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export const statusColors: Record<string, string> = {
  invited: "bg-blue-100 text-blue-700",
  negotiating: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  delivered: "bg-purple-100 text-purple-700",
  paid: "bg-emerald-100 text-emerald-700",
  draft: "bg-gray-100 text-gray-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export const nicheColors: Record<string, string> = {
  Fitness: "bg-orange-100 text-orange-700",
  Tech: "bg-blue-100 text-blue-700",
  Skincare: "bg-pink-100 text-pink-700",
  Beauty: "bg-pink-100 text-pink-700",
  Food: "bg-amber-100 text-amber-700",
  Fashion: "bg-violet-100 text-violet-700",
  Finance: "bg-emerald-100 text-emerald-700",
  Travel: "bg-cyan-100 text-cyan-700",
  Wellness: "bg-lime-100 text-lime-700",
  Gaming: "bg-indigo-100 text-indigo-700",
  Education: "bg-teal-100 text-teal-700",
  Health: "bg-red-100 text-red-700",
  Lifestyle: "bg-rose-100 text-rose-700",
  Photography: "bg-slate-100 text-slate-700",
  Art: "bg-fuchsia-100 text-fuchsia-700",
  Home: "bg-stone-100 text-stone-700",
  Design: "bg-sky-100 text-sky-700",
  Sustainability: "bg-green-100 text-green-700",
  Outdoors: "bg-emerald-100 text-emerald-700",
  Gadgets: "bg-cyan-100 text-cyan-700",
  Nutrition: "bg-orange-100 text-orange-700",
  Entertainment: "bg-purple-100 text-purple-700",
};
