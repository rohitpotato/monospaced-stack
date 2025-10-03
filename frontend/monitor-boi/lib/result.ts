export interface ResultError {
  code: string
  message: string
  httpStatusCode?: number
  meta?: Record<string, any>
  payload?: Record<string, any>
  stack?: string
}
export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error: ResultError
  private _value: T

  public constructor(isSuccess: boolean, error?: ResultError, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      )
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    // @ts-expect-error
    this.error = error
    // @ts-expect-error
    this._value = value

    Object.freeze(this)
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`${this.error.code}:${this.error.message}`)
    }

    return this._value
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null as unknown as ResultError, value)
  }

  public static fail<U>(error: ResultError): Result<U> {
    error.stack = error.stack || new Error('failed').stack
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure)
        return result
    }
    return Result.ok()
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L, A> {
    return true
  }

  isRight(): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  readonly value: A

  constructor(value: A) {
    this.value = value
  }

  isLeft(): this is Left<L, A> {
    return false
  }

  isRight(): this is Right<L, A> {
    return true
  }
}

export function left<L, A>(l: L): Either<L, A> {
  return new Left(l)
}

export function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}
