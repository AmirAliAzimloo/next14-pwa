import type { LoadComponentsReturnType } from '../load-components'
import type { ServerRuntime, SizeLimit } from '../../../types'
import type { NextConfigComplete } from '../../server/config-shared'
import type { ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin'
import type { NextFontManifest } from '../../build/webpack/plugins/next-font-manifest-plugin'
import type { ParsedUrlQuery } from 'querystring'
import type { AppPageModule } from '../future/route-modules/app-page/module'

import s from 'next/dist/compiled/superstruct'

export type DynamicParamTypes = 'catchall' | 'optional-catchall' | 'dynamic'

const dynamicParamTypesSchema = s.enums(['c', 'oc', 'd'])

export type DynamicParamTypesShort = s.Infer<typeof dynamicParamTypesSchema>

const segmentSchema = s.union([
  s.string(),
  s.tuple([s.string(), s.string(), dynamicParamTypesSchema]),
])

export type Segment = s.Infer<typeof segmentSchema>

// unfortunately the tuple is not understood well by Describe so we have to
// use any here. This does not have any impact on the runtime type since the validation
// does work correctly.
export const flightRouterStateSchema: s.Describe<any> = s.tuple([
  segmentSchema,
  s.record(
    s.string(),
    s.lazy(() => flightRouterStateSchema)
  ),
  s.optional(s.nullable(s.string())),
  s.optional(s.nullable(s.literal('refetch'))),
  s.optional(s.boolean()),
])

/**
 * Router state
 */
export type FlightRouterState = [
  segment: Segment,
  parallelRoutes: { [parallelRouterKey: string]: FlightRouterState },
  url?: string | null,
  refresh?: 'refetch' | null,
  isRootLayout?: boolean
]

/**
 * Individual Flight response path
 */
export type FlightSegmentPath =
  // Uses `any` as repeating pattern can't be typed.
  | any[]
  // Looks somewhat like this
  | [
      segment: Segment,
      parallelRouterKey: string,
      segment: Segment,
      parallelRouterKey: string,
      segment: Segment,
      parallelRouterKey: string
    ]

/**
 * Represents a tree of segments and the Flight data (i.e. React nodes) that
 * correspond to each one. The tree is isomorphic to the FlightRouterState;
 * however in the future we want to be able to fetch arbitrary partial segments
 * without having to fetch all its children. So this response format will
 * likely change.
 */
export type CacheNodeSeedData = [
  segment: Segment,
  parallelRoutes: {
    [parallelRouterKey: string]: CacheNodeSeedData | null
  },
  node: React.ReactNode | null
]

export type FlightDataPath =
  // Uses `any` as repeating pattern can't be typed.
  | any[]
  // Looks somewhat like this
  | [
      // Holds full path to the segment.
      ...FlightSegmentPath[],
      /* segment of the rendered slice: */ Segment,
      /* treePatch */ FlightRouterState,
      /* cacheNodeSeedData */ CacheNodeSeedData, // Can be null during prefetch if there's no loading component
      /* head */ React.ReactNode | null
    ]

/**
 * The Flight response data
 */
export type FlightData = Array<FlightDataPath> | string

export type ActionResult = Promise<any>

// Response from `createFromFetch` for normal rendering
export type NextFlightResponse = [buildId: string, flightData: FlightData]

// Response from `createFromFetch` for server actions. Action's flight data can be null
export type ActionFlightResponse =
  | [ActionResult, [buildId: string, flightData: FlightData | null]]
  // This case happens when `redirect()` is called in a server action.
  | NextFlightResponse

export interface RenderOptsPartial {
  err?: Error | null
  dev?: boolean
  buildId: string
  basePath: string
  clientReferenceManifest?: ClientReferenceManifest
  supportsDynamicHTML: boolean
  runtime?: ServerRuntime
  serverComponents?: boolean
  enableTainting?: boolean
  assetPrefix?: string
  crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined
  nextFontManifest?: NextFontManifest
  isBot?: boolean
  incrementalCache?: import('../lib/incremental-cache').IncrementalCache
  isRevalidate?: boolean
  nextExport?: boolean
  nextConfigOutput?: 'standalone' | 'export'
  appDirDevErrorLogger?: (err: any) => Promise<void>
  originalPathname?: string
  isDraftMode?: boolean
  deploymentId?: string
  onUpdateCookies?: (cookies: string[]) => void
  loadConfig?: (
    phase: string,
    dir: string,
    customConfig?: object | null,
    rawConfig?: boolean,
    silent?: boolean
  ) => Promise<NextConfigComplete>
  serverActions?: {
    bodySizeLimit?: SizeLimit
    allowedOrigins?: string[]
  }
  params?: ParsedUrlQuery
  isPrefetch?: boolean
  experimental: { ppr: boolean }
  postponed?: string
}

export type RenderOpts = LoadComponentsReturnType<AppPageModule> &
  RenderOptsPartial
