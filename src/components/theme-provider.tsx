"use client";

import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  forcedTheme?: string;
  [key: string]: any;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // কোনো ইনলাইন স্ক্রিপ্ট ট্যাগ ছাড়াই সরাসরি চিলড্রেন রেন্ডার করবে
  return <>{children}</>;
}