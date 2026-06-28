import { Injectable } from "@nestjs/common";
import {
  ClientGrpc,
  ClientProxyFactory,
  GrpcOptions,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class GrpcClientFactory {
  private _clients = new Map<string, ClientGrpc>();

  public createClient(options: GrpcOptions["options"]) {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options,
    }) as ClientGrpc;
  }

  public register(token: string, client: ClientGrpc) {
    this._clients.set(token, client);
  }

  public getClient<T extends ClientGrpc = ClientGrpc>(token: string): T {
    const client = this._clients.get(token);

    if (!client) {
      throw new Error(`GrpcClient "${token}" not found`);
    }

    return client as T;
  }
}
