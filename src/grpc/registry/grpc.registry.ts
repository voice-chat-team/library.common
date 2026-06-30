import { PROTO_PATHS } from "@voice-chat/contracts";

export const GRPC_CLIENTS = {
  USER_PACKAGE: {
    package: "user.v1",
    protoPath: PROTO_PATHS.USER,
    env: "USER_GRPC_URL",
  },
  AUTH_PACKAGE: {
    package: "auth.v1",
    protoPath: PROTO_PATHS.AUTH,
    env: "AUTH_GRPC_URL",
  },
  GUILD_PACKAGE: {
    package: "guilds.v1",
    protoPath: PROTO_PATHS.GUILDS,
    env: "GUILD_GRPC_URL",
  },
} as const;
