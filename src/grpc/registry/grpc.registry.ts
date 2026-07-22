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
  INVITATION_PACKAGE: {
    package: "invitation.v1",
    protoPath: PROTO_PATHS.INVITATION,
    env: "INVITATION_GRPC_URL",
  },
  NOTIFICATION_PACKAGE: {
    package: "notification.v1",
    protoPath: PROTO_PATHS.NOTIFICATION,
    env: "NOTIFICATION_GRPC_URL",
  }
} as const;
