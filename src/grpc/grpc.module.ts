import { type DynamicModule, Module } from "@nestjs/common";
import { GRPC_CLIENTS } from "./registry/grpc.registry";
import { GrpcClientFactory } from "./factory/grpc-client.factory";
import { GRPC_CLIENT_PREFIX } from "./constants/grpc.constants";

@Module({})
export class GrpcModule {
  public static register(
    clients: Array<keyof typeof GRPC_CLIENTS>,
  ): DynamicModule {
    return {
      module: GrpcModule,
      providers: [
        GrpcClientFactory,
        ...clients.map((token) => {
          const cfg = GRPC_CLIENTS[token];

          return {
            provide: `${GRPC_CLIENT_PREFIX}_${token}`,
            useFactory: (factory: GrpcClientFactory) => {
              const client = factory.createClient({
                package: cfg.package,
                protoPath: cfg.protoPath,
                url: cfg.url,
              });

              factory.register(token, client);

              return client;
            },
            inject: [GrpcClientFactory],
          };
        }),
      ],
      exports: [
        GrpcClientFactory,
        ...clients.map((token) => `${GRPC_CLIENT_PREFIX}_${token}`),
      ],
    };
  }
}
