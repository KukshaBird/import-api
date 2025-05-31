export type Payload = object | string[] | string | number | number[] | [];

export interface ClientOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
  data?: Payload;
}

export class Client {
  private readonly _url: string;
  private _options = {
    headers: { 'Content-Type': 'application/json' },
  };

  protected constructor(baseUrl: string) {
    this._url = baseUrl;
  }

  public async madeRequest<ReturnType = unknown>(
    url?: string,
    options: ClientOptions = {},
  ): Promise<ReturnType> {
    const cleanUrl = url ? `${this._url}/${this.trimSlashes(url)}` : this._url;
    const body: string | undefined = options.data
      ? JSON.stringify(options.data)
      : undefined;
    const params = options.params
      ? new URLSearchParams(options.params)
      : undefined;
    const response = await fetch(`${cleanUrl}${params ? `?${params}` : ''}`, {
      ...this._options,
      ...options,
      body: body,
    });
    if (!response.ok) {
      throw new Error('request failed');
    }

    return (await response.json()) as ReturnType;
  }

  private trimSlashes(str: string): string {
    return str.replace(/^\/+|\/+$/g, '');
  }
}
