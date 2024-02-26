import { init } from "@paralleldrive/cuid2";

import { environment } from "@/environment.mjs";

export const generateId = init({
  length: environment.NEXT_PUBLIC_ID_LENGTH,
});
