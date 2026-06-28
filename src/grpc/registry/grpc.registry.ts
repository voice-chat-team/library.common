import { PROTO_PATHS } from "@voice-chat/contracts";

export const GRPC_CLIENTS = {
  USER_PACKAGE: {
    package: "user.v1",
    protoPath: PROTO_PATHS.USER,
    url: "localhost:50501",
  },
  AUTH_PACKAGE: {
    package: "auth.v1",
    protoPath: PROTO_PATHS.AUTH,
    url: "localhost:5052",
  },
  GUILD_PACKAGE: {
    package: "guilds.v1",
    protoPath: PROTO_PATHS.GUILDS,
    url: "localhost:5054",
  },
} as const;
