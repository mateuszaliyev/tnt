import { customAlphabet } from "nanoid";

import { environment } from "@/environment.mjs";

const DIGITS = "0123456789";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

const lowercase = customAlphabet(LOWERCASE, 1);

const lowercaseAlphanumeric = customAlphabet(
  `${DIGITS}${LOWERCASE}`,
  environment.NEXT_PUBLIC_ID_LENGTH - 1,
);

export const generateId = () => `${lowercase()}${lowercaseAlphanumeric()}`;
