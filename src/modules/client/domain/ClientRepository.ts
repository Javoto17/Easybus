export interface ClientRepository {
  get<T extends Response = Response>(
    url: string,
    options?: RequestInit,
  ): Promise<T>;
  post<T extends Response = Response>(
    url: string,
    data: any,
    options?: RequestInit,
  ): Promise<T>;
}
