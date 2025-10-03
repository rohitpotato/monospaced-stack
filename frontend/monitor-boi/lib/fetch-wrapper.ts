import type { ResultError } from './result'
// import { ErrorCodes } from './error-codes'
import { Result } from './result'

export interface IHttpClient {
  baseURL: string
  baseParams?: Record<string, string>
  retries?: number
  exponentialDelay?: boolean
}

export interface IFetchClient<T> {
  GET: (url: string, headers?: Record<string, string>) => Promise<Result<T>>
  POST: (url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) => Promise<Result<T>>
  PUT: (url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) => Promise<Result<T>>
  DELETE: (url: string, headers?: Record<string, string>) => Promise<Result<T>>
  PATCH: (url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) => Promise<Result<T>>
}

export class FetchClient<T> implements IFetchClient<T> {
  private readonly httpClient: IHttpClient

  private retries: number = 3
  private exponentialDelay: boolean = true

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
    this.retries = httpClient.retries || this.retries
    this.exponentialDelay = httpClient.exponentialDelay || this.exponentialDelay
  }

  private async retryOperation(operation: () => Promise<T>) {
    let attemptedRetires = 0
    const retry = async (): Promise<Result<T>> => {
      try {
        const result = await operation()
        return Result.ok(result)
      }
      catch (error) {
        attemptedRetires++
        if (this.retries === 0) {
          return Result.fail(error as unknown as ResultError)
        }
        else if (attemptedRetires < this.retries) {
          return this.exponentialDelay
            ? await this.withDelay(retry, 2 ** attemptedRetires * 1000)
            : await this.withDelay(retry, 1000)
        }
        else {
          return Result.fail(error as unknown as ResultError)
        }
      }
    }
    return retry()
  }

  private async withDelay(operation: () => Promise<Result<T>>, delay: number) {
    await new Promise(resolve => setTimeout(resolve, delay))
    const result = await operation()
    return result
  }

  GET(url: string, headers?: Record<string, string>) {
    return this.retryOperation(async () => {
      const result = await fetch(`${this.httpClient.baseURL}${url}`, {
        ...this.httpClient.baseParams,
        method: 'GET',
        headers,
      })
      if (!result.ok) {
        throw new Error(result.statusText)
      }
      return result.json() as T
    })
  }

  POST(url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) {
    return this.retryOperation(async () => {
      const result = await fetch(`${this.httpClient.baseURL}${url}`, {
        ...this.httpClient.baseParams,
        body,
        method: 'POST',
        headers,
      })
      if (!result.ok) {
        throw new Error(result.statusText)
      }
      return result.json() as T
    })
  }

  PUT(url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) {
    return this.retryOperation(async () => {
      const result = await fetch(`${this.httpClient.baseURL}${url}`, {
        ...this.httpClient.baseParams,
        body,
        method: 'PUT',
        headers,
      })
      if (!result.ok) {
        throw new Error(result.statusText)
      }
      return result.json() as T
    })
  }

  DELETE(url: string, headers?: Record<string, string>) {
    return this.retryOperation(async () => {
      const result = await fetch(`${this.httpClient.baseURL}${url}`, {
        ...this.httpClient.baseParams,
        method: 'DELETE',
        headers,
      })
      if (!result.ok) {
        throw new Error(result.statusText)
      }
      return result.json() as T
    })
  }

  PATCH(url: string, body: BodyInit | null | undefined, headers?: Record<string, string>) {
    return this.retryOperation(async () => {
      const result = await fetch(`${this.httpClient.baseURL}${url}`, {
        ...this.httpClient.baseParams,
        body,
        method: 'PATCH',
        headers,
      })
      if (!result.ok) {
        throw new Error(result.statusText)
      }
      return result.json() as T
    })
  }
}
