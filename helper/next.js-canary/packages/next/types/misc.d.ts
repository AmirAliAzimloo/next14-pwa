/* eslint-disable import/no-extraneous-dependencies */
declare module 'next/package.json'
declare module 'next/dist/compiled/@napi-rs/triples'
declare module 'next/dist/compiled/postcss-value-parser'
declare module 'next/dist/compiled/icss-utils'
declare module 'next/dist/compiled/postcss-modules-values'
declare module 'next/dist/compiled/postcss-modules-local-by-default'
declare module 'next/dist/compiled/postcss-modules-extract-imports'
declare module 'next/dist/compiled/postcss-modules-scope'
declare module 'next/dist/compiled/babel/plugin-transform-modules-commonjs'
declare module 'next/dist/compiled/babel/plugin-syntax-jsx'
declare module 'next/dist/compiled/loader-utils2'
declare module 'next/dist/compiled/react-server-dom-webpack/client'
declare module 'next/dist/compiled/react-server-dom-webpack/client.edge'
declare module 'next/dist/compiled/react-server-dom-webpack/client.browser'
declare module 'next/dist/compiled/react-server-dom-webpack/server.browser'
declare module 'next/dist/compiled/react-server-dom-webpack/server.edge'
declare module 'next/dist/compiled/react-server-dom-turbopack/client'
declare module 'next/dist/compiled/react-server-dom-turbopack/client.edge'
declare module 'next/dist/compiled/react-server-dom-turbopack/client.browser'
declare module 'next/dist/compiled/react-server-dom-turbopack/server.browser'
declare module 'next/dist/compiled/react-server-dom-turbopack/server.edge'
declare module 'next/dist/client/app-call-server'
declare module 'next/dist/compiled/react-dom/server'
declare module 'next/dist/compiled/react-dom/server.edge'
declare module 'next/dist/compiled/react-dom/server.browser'
declare module 'next/dist/compiled/browserslist'

declare module 'react-server-dom-webpack/client'
declare module 'react-server-dom-webpack/server.edge'
declare module 'react-server-dom-webpack/server.node'
declare module 'react-server-dom-webpack/client.edge'

declare module 'VAR_MODULE_GLOBAL_ERROR'
declare module 'VAR_USERLAND'
declare module 'VAR_MODULE_DOCUMENT'
declare module 'VAR_MODULE_APP'

declare module 'next/dist/compiled/@next/react-dev-overlay/dist/client' {
  export * from '@next/react-dev-overlay/dist/client'
}

declare module 'next/dist/compiled/@next/react-dev-overlay/dist/middleware' {
  export * from '@next/react-dev-overlay/dist/middleware'
}

declare module 'next/dist/compiled/@next/react-dev-overlay/dist/middleware-turbopack' {
  export * from '@next/react-dev-overlay/dist/middleware-turbopack'
}

declare module 'next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshWebpackPlugin' {
  import m from '@next/react-refresh-utils/ReactRefreshWebpackPlugin'
  export = m
}

declare module 'next/dist/compiled/node-fetch' {
  import fetch from 'node-fetch'
  export * from 'node-fetch'
  export default fetch
}

declare module 'next/dist/compiled/node-html-parser' {
  export * from 'node-html-parser'
}

declare module 'next/dist/compiled/@mswjs/interceptors/ClientRequest' {
  export * from '@mswjs/interceptors/ClientRequest'
}

declare module 'next/dist/compiled/jest-worker' {
  export * from 'jest-worker'
}

declare module 'next/dist/compiled/react-is' {
  export * from 'react-is'
}

declare module 'next/dist/compiled/cssnano-simple' {
  const cssnanoSimple: any
  export = cssnanoSimple
}

declare module 'next/dist/compiled/p-limit' {
  import m from 'p-limit'
  export = m
}

declare module 'next/dist/compiled/raw-body' {
  import m from 'raw-body'
  export = m
}

declare module 'next/dist/compiled/image-size' {
  import m from 'image-size'
  export = m
}

declare module 'next/dist/compiled/@hapi/accept' {
  import m from '@hapi/accept'
  export = m
}

declare module 'next/dist/compiled/get-orientation' {
  import m from 'get-orientation'
  export = m
}

declare module 'next/dist/compiled/acorn' {
  import m from 'acorn'
  export = m
}
declare module 'next/dist/compiled/amphtml-validator' {
  import m from 'amphtml-validator'
  export = m
}

declare module 'next/dist/compiled/superstruct' {
  import m from 'superstruct'
  export = m
}
declare module 'next/dist/compiled/async-retry'
declare module 'next/dist/compiled/async-sema' {
  import m from 'async-sema'
  export = m
}
declare module 'next/dist/compiled/arg/index.js' {
  function arg<T extends arg.Spec>(
    spec: T,
    options?: { argv?: string[]; permissive?: boolean }
  ): arg.Result<T>

  namespace arg {
    export type Handler = (value: string) => any

    export interface Spec {
      [key: string]: string | Handler | [Handler]
    }

    export type Result<T extends Spec> = { _: string[] } & {
      [K in keyof T]: T[K] extends string
        ? never
        : T[K] extends Handler
        ? ReturnType<T[K]>
        : T[K] extends [Handler]
        ? Array<ReturnType<T[K][0]>>
        : never
    }
  }

  export = arg
}

declare module 'next/dist/compiled/babel/code-frame' {
  export * from '@babel/code-frame'
}

declare module 'next/dist/compiled/@next/font/dist/google' {
  export * from '@next/font/google'
}
declare module 'next/dist/compiled/@next/font/dist/local' {
  export * from '@next/font/local'
}
declare module 'next/dist/compiled/babel/traverse' {
  import traverse from '@babel/traverse'
  export default traverse
  export * from '@babel/traverse'
}
declare module 'next/dist/compiled/babel/generator' {
  import generate from '@babel/generator'
  export default generate
  export * from '@babel/generator'
}
declare module 'next/dist/compiled/babel/preset-env' {
  const anyType: any
  export default anyType
}
declare module 'watchpack' {
  const anyType: any
  export default anyType
}
declare module 'next/dist/compiled/babel/core' {
  export * from '@babel/core'
}

declare module 'next/dist/compiled/babel/core-lib-config'
declare module 'next/dist/compiled/babel/core-lib-normalize-file'
declare module 'next/dist/compiled/babel/core-lib-normalize-opts'
declare module 'next/dist/compiled/babel/core-lib-block-hoist-plugin'
declare module 'next/dist/compiled/babel/core-lib-plugin-pass'

declare module 'next/dist/compiled/bytes' {
  import m from 'bytes'
  export = m
}
declare module 'next/dist/compiled/ci-info' {
  import m from 'ci-info'
  export = m
}
declare module 'next/dist/compiled/cli-select' {
  import m from 'cli-select'
  export = m
}
declare module 'next/dist/compiled/compression' {
  import m from 'compression'
  export = m
}
declare module 'next/dist/compiled/conf' {
  import m from 'conf'
  export = m
}
declare module 'next/dist/compiled/content-disposition' {
  import m from 'content-disposition'
  export = m
}
declare module 'next/dist/compiled/content-type' {
  import m from 'content-type'
  export = m
}
declare module 'next/dist/compiled/cookie' {
  import m from 'cookie'
  export = m
}
declare module 'next/dist/compiled/cross-spawn' {
  import m from 'cross-spawn'
  export = m
}
declare module 'next/dist/compiled/debug' {
  import m from 'debug'
  export = m
}
declare module 'next/dist/compiled/devalue' {
  import m from 'devalue'
  export = m
}
declare module 'next/dist/compiled/find-up' {
  import m from 'find-up'
  export = m
}
declare module 'next/dist/compiled/fresh' {
  import m from 'fresh'
  export = m
}
declare module 'next/dist/compiled/glob' {
  import m from 'glob'
  export = m
}
declare module 'next/dist/compiled/gzip-size' {
  import m from 'gzip-size'
  export = m
}
declare module 'next/dist/compiled/http-proxy' {
  import m from 'http-proxy'
  export = m
}
declare module 'next/dist/compiled/is-docker' {
  import m from 'is-docker'
  export = m
}
declare module 'next/dist/compiled/is-wsl' {
  import m from 'is-wsl'
  export = m
}
declare module 'next/dist/compiled/json5' {
  import m from 'json5'
  export = m
}
declare module 'next/dist/compiled/jsonwebtoken' {
  import m from 'jsonwebtoken'
  export = m
}
declare module 'next/dist/compiled/lodash.curry' {
  import m from 'lodash.curry'
  export = m
}
declare module 'next/dist/compiled/lru-cache' {
  import m from 'lru-cache'
  export = m
}
declare module 'next/dist/compiled/micromatch' {
  import m from 'micromatch'
  export = m
}
declare module 'next/dist/compiled/nanoid/index.cjs' {
  import m from 'nanoid'
  export = m
}
declare module 'next/dist/compiled/ora' {
  import m from 'ora'
  export = m
}
declare module 'next/dist/compiled/path-to-regexp' {
  import m from 'path-to-regexp'
  export = m
}
declare module 'next/dist/compiled/send' {
  import m from 'send'
  export = m
}
declare module 'next/dist/compiled/source-map' {
  import m from 'source-map'
  export = m
}
declare module 'next/dist/compiled/string-hash' {
  import m from 'string-hash'
  export = m
}
declare module 'next/dist/compiled/ua-parser-js' {
  import m from 'ua-parser-js'
  export = m
}
declare module 'next/dist/compiled/strip-ansi' {
  import m from 'strip-ansi'
  export = m
}
declare module 'next/dist/compiled/@vercel/nft' {
  import m from '@vercel/nft'
  export = m
}

declare module 'next/dist/compiled/tar' {
  import m from 'tar'
  export = m
}

declare module 'next/dist/compiled/terser' {
  import m from 'terser'
  export = m
}
declare module 'next/dist/compiled/semver' {
  import m from 'semver'
  export = m
}
declare module 'next/dist/compiled/postcss-scss' {
  import m from 'postcss-scss'
  export = m
}

declare module 'next/dist/compiled/text-table' {
  function textTable(
    rows: Array<Array<{}>>,
    opts?: {
      hsep?: string
      align?: Array<'l' | 'r' | 'c' | '.'>
      stringLength?(str: string): number
    }
  ): string

  export = textTable
}
declare module 'next/dist/compiled/unistore' {
  import m from 'unistore'
  export = m
}
declare module 'next/dist/compiled/web-vitals' {
  import m from 'web-vitals'
  export = m
}
declare module 'next/dist/compiled/web-vitals-attribution' {}

declare module 'next/dist/compiled/ws' {
  import m from 'ws'
  export = m
}

declare module 'next/dist/compiled/comment-json' {
  import m from 'comment-json'
  export = m
}

declare module 'next/dist/compiled/process' {
  import m from 'process'
  export = m
}

declare module 'next/dist/compiled/edge-runtime' {
  import m from 'edge-runtime'
  export = m
}

declare module 'next/dist/compiled/@edge-runtime/cookies' {
  export * from '@edge-runtime/cookies'
}

declare module 'next/dist/compiled/@edge-runtime/primitives' {
  import * as m from '@edge-runtime/primitives'
  export = m
}

declare module 'next/dist/compiled/react' {
  import * as m from 'react'
  export = m
}
declare module 'next/dist/compiled/react-dom' {
  import * as m from 'react-dom'
  export = m
}

declare module 'next/dist/compiled/stacktrace-parser' {
  import * as m from 'stacktrace-parser'
  export = m
}

declare module 'next/dist/compiled/anser' {
  import * as m from 'anser'
  export = m
}

declare module 'next/dist/compiled/platform' {
  import * as m from 'platform'
  export = m
}

declare module 'next/dist/compiled/css.escape' {
  export = CSS.escape
}

declare module 'next/dist/compiled/data-uri-to-buffer' {
  import * as m from 'data-uri-to-buffer'
  export = m
}

declare module 'next/dist/compiled/shell-quote' {
  import * as m from 'shell-quote'
  export = m
}

declare module 'next/dist/compiled/@vercel/og/satori-types' {
  export * from 'satori'
}
declare module 'next/dist/compiled/@vercel/og' {
  export * from '@vercel/og'
}
declare module 'next/dist/compiled/@vercel/og/index.node'
declare module 'next/dist/compiled/@vercel/og/index.edge'

declare namespace NodeJS {
  interface ProcessVersions {
    pnp?: string
  }
  interface Process {
    crossOrigin?: string
  }
}

declare module 'next/dist/compiled/watchpack' {
  import { EventEmitter } from 'events'

  class Watchpack extends EventEmitter {
    constructor(options?: any)
    watch(params: {
      files?: string[]
      directories?: string[]
      startTime?: number
      missing?: string[]
    }): void
    watch(files: string[], directories: string[], startTime?: number): void
    close(): void

    getTimeInfoEntries(): Map<
      string,
      { safeTime: number; timestamp: number; accuracy?: number }
    >
  }

  export default Watchpack
}

declare module 'next/dist/compiled/is-animated' {
  export default function isAnimated(buffer: Buffer): boolean
}

declare module 'next/dist/compiled/@opentelemetry/api' {
  import * as m from '@opentelemetry/api'
  export = m
}

declare module 'next/dist/compiled/zod' {
  import * as m from 'zod'
  export = m
}
