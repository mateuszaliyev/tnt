"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcProvider } from "@/client/provider";

export type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => (
  <TrpcProvider>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </TrpcProvider>
);
