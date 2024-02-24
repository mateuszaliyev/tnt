import nextAuth from "next-auth";

import { configuration } from "./configuration";

const handler = nextAuth(configuration) as (
  request: Request,
) => Response | Promise<Response>;

export { handler as GET, handler as POST };
