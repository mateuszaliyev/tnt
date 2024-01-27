"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { ApiProvider } from "@/api/provider";

export type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => (
  <ApiProvider>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </ApiProvider>
);
