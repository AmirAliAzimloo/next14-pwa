import { PageSignatureError } from '../error'
import type { NextRequest } from './request'

const responseSymbol = Symbol('response')
const passThroughSymbol = Symbol('passThrough')
export const waitUntilSymbol = Symbol('waitUntil')

class FetchEvent {
  readonly [waitUntilSymbol]: Promise<any>[] = [];
  [responseSymbol]?: Promise<Response>;
  [passThroughSymbol] = false

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(_request: Request) {}

  respondWith(response: Response | Promise<Response>): void {
    if (!this[responseSymbol]) {
      this[responseSymbol] = Promise.resolve(response)
    }
  }

  passThroughOnException(): void {
    this[passThroughSymbol] = true
  }

  waitUntil(promise: Promise<any>): void {
    this[waitUntilSymbol].push(promise)
  }
}

export class NextFetchEvent extends FetchEvent {
  sourcePage: string

  constructor(params: { request: NextRequest; page: string }) {
    super(params.request)
    this.sourcePage = params.page
  }

  /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */
  get request() {
    throw new PageSignatureError({
      page: this.sourcePage,
    })
  }

  /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */
  respondWith() {
    throw new PageSignatureError({
      page: this.sourcePage,
    })
  }
}
