import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

type UnwrapObservable<U> = U extends Observable<infer R> ? R : U;

export abstract class AbstractGrpcClient<
  T extends Record<string, any>,
> implements OnModuleInit {
  protected service: T;

  protected constructor(
    private readonly client: ClientGrpc,
    private readonly serviceName: string,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<T>(this.serviceName);
  }

  public async call<K extends keyof T>(
    method: K,
    payload: Parameters<T[K]>[0],
  ): Promise<UnwrapObservable<ReturnType<T[K]>>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const observable = this.service[method](payload);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await lastValueFrom(observable);

    return result as UnwrapObservable<ReturnType<T[K]>>;
  }
}
