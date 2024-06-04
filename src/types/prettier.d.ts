import type { PluginOptions } from "prettier-plugin-tailwindcss";

declare module "prettier" {
  interface Config extends PluginOptions {
    importOrder?: string[];
    importOrderParserPlugins?: string[];
    importOrderTypeScriptVersion: string;
  }
}

export {};
