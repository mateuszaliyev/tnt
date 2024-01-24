/** @type {import("prettier").Config} */
const prettierConfig = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  importOrder: [
    "<BUILTIN_MODULES>",
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^(@/app)(.*|$)",
    "^(@/client)(.*|$)",
    "^(@/components)(.*|$)",
    "^(@/environment)(.*|$)",
    "^(@/hooks)(.*|$)",
    "^(@/server)(.*|$)",
    "^(@/types)(.*|$)",
    "^(@/utilities)(.*|$)",
    "^[.]",
  ].reduce((result, element, index) => {
    if (index) result.push("", element);
    else result.push(element);
    return result;
  }, /** @type {string[]} */ ([])),
  importOrderTypeScriptVersion: "5.3.3",
  jsxSingleQuote: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindAttributes: [
    "enter",
    "enterFrom",
    "enterTo",
    "leave",
    "leaveFrom",
    "leaveTo",
  ],
  tailwindFunctions: ["cva", "cx"],
  trailingComma: "all",
  useTabs: false,
};

export default prettierConfig;
