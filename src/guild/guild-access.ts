import { RpcException } from "@nestjs/microservices";
import { hasPermission } from "@voice-chat/contracts";
import { RpcStatus } from "../enums";

/** Минимум из GuildMember (guilds.proto), нужный для проверок доступа. */
export type GuildMemberAccess = {
  isBanned: boolean;
  /** Эффективные права — битовая маска Permission, считает services.guilds. */
  permissions: number;
};

/** Участник сервера и не забанен — иначе PERMISSION_DENIED. */
export function assertGuildMember<T extends GuildMemberAccess>(
  member: T | null | undefined,
): asserts member is T {
  if (!member || member.isBanned) {
    throw new RpcException({
      code: RpcStatus.PERMISSION_DENIED,
      details: "Вы не являетесь участником сервера",
    });
  }
}

/** Для проверок вида «автор или право»: не бросает, а отвечает. */
export function hasGuildPermission(
  member: GuildMemberAccess | null | undefined,
  permission: number,
): boolean {
  return !!member && !member.isBanned && hasPermission(member.permissions, permission);
}

/** Участник сервера с нужным правом — иначе PERMISSION_DENIED. */
export function assertGuildPermission<T extends GuildMemberAccess>(
  member: T | null | undefined,
  permission: number,
  details = "Недостаточно прав",
): asserts member is T {
  assertGuildMember(member);

  if (!hasPermission(member.permissions, permission)) {
    throw new RpcException({ code: RpcStatus.PERMISSION_DENIED, details });
  }
}
