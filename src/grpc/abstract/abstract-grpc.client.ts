import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

type UnwrapObservable<U> = U extends Observable<infer R> ? R : U;

export abstract class AbstractGrpcClient<T extends Record<string, any>> {
  private _service?: T;

  protected constructor(
    private readonly client: ClientGrpc,
    private readonly serviceName: string,
  ) {}

  private get service(): T {
    if (!this._service) {
      this._service = this.client.getService<T>(this.serviceName);
    }
    return this._service;
  }

  public async call<K extends keyof T>(
    method: K,
    payload: Parameters<T[K]>[0],
  ): Promise<UnwrapObservable<ReturnType<T[K]>>> {
    const observable = this.service[method](payload);
    const result = await lastValueFrom(observable);
    return result as UnwrapObservable<ReturnType<T[K]>>;
  }
}
