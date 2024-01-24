import { customAlphabet } from "nanoid";

import { environment } from "@/environment.mjs";

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const alphanumericLowerCase = `01234567890${lowerCase}`;

const generateLowerCase = customAlphabet(lowerCase, 1);
const generateAlphanumericLowerCase = customAlphabet(
  alphanumericLowerCase,
  environment.NEXT_PUBLIC_ID_LENGTH - 1,
);

export const generateId = () =>
  `${generateLowerCase()}${generateAlphanumericLowerCase()}`;
