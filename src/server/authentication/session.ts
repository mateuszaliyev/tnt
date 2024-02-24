import { getServerSession } from "next-auth";

import { configuration } from "./configuration";

export const getSession = () => getServerSession(configuration);
