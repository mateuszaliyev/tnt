import type { PluginOptions } from "prettier-plugin-tailwindcss";

declare module "prettier" {
  interface Config extends PluginOptions {
    importOrder?: string[];
    importOrderParserPlugins?: string[];
    importOrderTypeScriptVersion: "5.3.3";
  }
}

export {};
