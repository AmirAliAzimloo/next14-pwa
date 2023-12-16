import type {
  AssetBinding,
  EdgeMiddlewareMeta,
} from '../loaders/get-module-build-info'
import type { EdgeSSRMeta } from '../loaders/get-module-build-info'
import type { MiddlewareMatcher } from '../../analysis/get-page-static-info'
import { getNamedMiddlewareRegex } from '../../../shared/lib/router/utils/route-regex'
import { getModuleBuildInfo } from '../loaders/get-module-build-info'
import { getSortedRoutes } from '../../../shared/lib/router/utils'
import { webpack, sources } from 'next/dist/compiled/webpack/webpack'
import { isMatch } from 'next/dist/compiled/micromatch'
import path from 'path'
import {
  EDGE_RUNTIME_WEBPACK,
  EDGE_UNSUPPORTED_NODE_APIS,
  MIDDLEWARE_BUILD_MANIFEST,
  CLIENT_REFERENCE_MANIFEST,
  MIDDLEWARE_MANIFEST,
  MIDDLEWARE_REACT_LOADABLE_MANIFEST,
  SUBRESOURCE_INTEGRITY_MANIFEST,
  NEXT_FONT_MANIFEST,
  SERVER_REFERENCE_MANIFEST,
  PRERENDER_MANIFEST,
} from '../../../shared/lib/constants'
import type { MiddlewareConfig } from '../../analysis/get-page-static-info'
import type { Telemetry } from '../../../telemetry/storage'
import { traceGlobals } from '../../../trace/shared'
import { EVENT_BUILD_FEATURE_USAGE } from '../../../telemetry/events'
import { normalizeAppPath } from '../../../shared/lib/router/utils/app-paths'
import { INSTRUMENTATION_HOOK_FILENAME } from '../../../lib/constants'
import { NextBuildContext } from '../../build-context'

const KNOWN_SAFE_DYNAMIC_PACKAGES =
  require('../../../lib/known-edge-safe-packages.json') as string[]

export interface EdgeFunctionDefinition {
  files: string[]
  name: string
  page: string
  matchers: MiddlewareMatcher[]
  wasm?: AssetBinding[]
  assets?: AssetBinding[]
  regions?: string[] | string
}

export interface MiddlewareManifest {
  version: 2
  sortedMiddleware: string[]
  middleware: { [page: string]: EdgeFunctionDefinition }
  functions: { [page: string]: EdgeFunctionDefinition }
}

interface EntryMetadata {
  edgeMiddleware?: EdgeMiddlewareMeta
  edgeApiFunction?: EdgeMiddlewareMeta
  edgeSSR?: EdgeSSRMeta
  wasmBindings: Map<string, string>
  assetBindings: Map<string, string>
  regions?: string[] | string
}

const NAME = 'MiddlewarePlugin'

/**
 * Checks the value of usingIndirectEval and when it is a set of modules it
 * check if any of the modules is actually being used. If the value is
 * simply truthy it will return true.
 */
function isUsingIndirectEvalAndUsedByExports(args: {
  module: webpack.Module
  moduleGraph: webpack.ModuleGraph
  runtime: any
  usingIndirectEval: true | Set<string>
  wp: typeof webpack
}): boolean {
  const { moduleGraph, runtime, module, usingIndirectEval, wp } = args
  if (typeof usingIndirectEval === 'boolean') {
    return usingIndirectEval
  }

  const exportsInfo = moduleGraph.getExportsInfo(module)
  for (const exportName of usingIndirectEval) {
    if (exportsInfo.getUsed(exportName, runtime) !== wp.UsageState.Unused) {
      return true
    }
  }

  return false
}

function getEntryFiles(
  entryFiles: string[],
  meta: EntryMetadata,
  opts: {
    sriEnabled: boolean
  }
) {
  const files: string[] = []
  if (meta.edgeSSR) {
    if (meta.edgeSSR.isServerComponent) {
      files.push(`server/${SERVER_REFERENCE_MANIFEST}.js`)
      if (opts.sriEnabled) {
        files.push(`server/${SUBRESOURCE_INTEGRITY_MANIFEST}.js`)
      }
      files.push(
        ...entryFiles
          .filter(
            (file) =>
              file.startsWith('app/') && !file.endsWith('.hot-update.js')
          )
          .map(
            (file) =>
              'server/' +
              file.replace('.js', '_' + CLIENT_REFERENCE_MANIFEST + '.js')
          )
      )
    }

    files.push(
      `server/${MIDDLEWARE_BUILD_MANIFEST}.js`,
      `server/${MIDDLEWARE_REACT_LOADABLE_MANIFEST}.js`
    )

    files.push(`server/${NEXT_FONT_MANIFEST}.js`)
  }

  if (NextBuildContext!.hasInstrumentationHook) {
    files.push(`server/edge-${INSTRUMENTATION_HOOK_FILENAME}.js`)
  }

  if (process.env.NODE_ENV === 'production') {
    files.push(PRERENDER_MANIFEST.replace('json', 'js'))
  }

  files.push(
    ...entryFiles
      .filter((file) => !file.endsWith('.hot-update.js'))
      .map((file) => 'server/' + file)
  )

  return files
}

function getCreateAssets(params: {
  compilation: webpack.Compilation
  metadataByEntry: Map<string, EntryMetadata>
  opts: {
    sriEnabled: boolean
  }
}) {
  const { compilation, metadataByEntry, opts } = params
  return (assets: any) => {
    const middlewareManifest: MiddlewareManifest = {
      sortedMiddleware: [],
      middleware: {},
      functions: {},
      version: 2,
    }
    for (const entrypoint of compilation.entrypoints.values()) {
      if (!entrypoint.name) {
        continue
      }

      // There should always be metadata for the entrypoint.
      const metadata = metadataByEntry.get(entrypoint.name)
      const page =
        metadata?.edgeMiddleware?.page ||
        metadata?.edgeSSR?.page ||
        metadata?.edgeApiFunction?.page
      if (!page) {
        continue
      }

      const matcherSource = metadata.edgeSSR?.isAppDir
        ? normalizeAppPath(page)
        : page

      const catchAll = !metadata.edgeSSR && !metadata.edgeApiFunction

      const { namedRegex } = getNamedMiddlewareRegex(matcherSource, {
        catchAll,
      })
      const matchers = metadata?.edgeMiddleware?.matchers ?? [
        {
          regexp: namedRegex,
          originalSource: page === '/' && catchAll ? '/:path*' : matcherSource,
        },
      ]

      const edgeFunctionDefinition: EdgeFunctionDefinition = {
        files: getEntryFiles(entrypoint.getFiles(), metadata, opts),
        name: entrypoint.name,
        page: page,
        matchers,
        wasm: Array.from(metadata.wasmBindings, ([name, filePath]) => ({
          name,
          filePath,
        })),
        assets: Array.from(metadata.assetBindings, ([name, filePath]) => ({
          name,
          filePath,
        })),
        ...(metadata.regions && { regions: metadata.regions }),
      }

      if (metadata.edgeApiFunction || metadata.edgeSSR) {
        middlewareManifest.functions[page] = edgeFunctionDefinition
      } else {
        middlewareManifest.middleware[page] = edgeFunctionDefinition
      }
    }

    middlewareManifest.sortedMiddleware = getSortedRoutes(
      Object.keys(middlewareManifest.middleware)
    )

    assets[MIDDLEWARE_MANIFEST] = new sources.RawSource(
      JSON.stringify(middlewareManifest, null, 2)
    )
  }
}

function buildWebpackError({
  message,
  loc,
  compilation,
  entryModule,
  parser,
}: {
  message: string
  loc?: any
  compilation: webpack.Compilation
  entryModule?: webpack.Module
  parser?: webpack.javascript.JavascriptParser
}) {
  const error = new compilation.compiler.webpack.WebpackError(message)
  error.name = NAME
  const module = entryModule ?? parser?.state.current
  if (module) {
    error.module = module
  }
  error.loc = loc
  return error
}

function isInMiddlewareLayer(parser: webpack.javascript.JavascriptParser) {
  return parser.state.module?.layer === 'middleware'
}

function isNodeJsModule(moduleName: string) {
  return require('module').builtinModules.includes(moduleName)
}

function isDynamicCodeEvaluationAllowed(
  fileName: string,
  middlewareConfig?: MiddlewareConfig,
  rootDir?: string
) {
  // Some packages are known to use `eval` but are safe to use in the Edge
  // Runtime because the dynamic code will never be executed.
  if (
    KNOWN_SAFE_DYNAMIC_PACKAGES.some((pkg) =>
      fileName.includes(`/node_modules/${pkg}/`.replace(/\//g, path.sep))
    )
  ) {
    return true
  }

  const name = fileName.replace(rootDir ?? '', '')
  return isMatch(name, middlewareConfig?.unstable_allowDynamicGlobs ?? [])
}

function buildUnsupportedApiError({
  apiName,
  loc,
  ...rest
}: {
  apiName: string
  loc: any
  compilation: webpack.Compilation
  parser: webpack.javascript.JavascriptParser
}) {
  return buildWebpackError({
    message: `A Node.js API is used (${apiName} at line: ${loc.start.line}) which is not supported in the Edge Runtime.
Learn more: https://nextjs.org/docs/api-reference/edge-runtime`,
    loc,
    ...rest,
  })
}

function registerUnsupportedApiHooks(
  parser: webpack.javascript.JavascriptParser,
  compilation: webpack.Compilation
) {
  for (const expression of EDGE_UNSUPPORTED_NODE_APIS) {
    const warnForUnsupportedApi = (node: any) => {
      if (!isInMiddlewareLayer(parser)) {
        return
      }
      compilation.warnings.push(
        buildUnsupportedApiError({
          compilation,
          parser,
          apiName: expression,
          ...node,
        })
      )
      return true
    }
    parser.hooks.call.for(expression).tap(NAME, warnForUnsupportedApi)
    parser.hooks.expression.for(expression).tap(NAME, warnForUnsupportedApi)
    parser.hooks.callMemberChain
      .for(expression)
      .tap(NAME, warnForUnsupportedApi)
    parser.hooks.expressionMemberChain
      .for(expression)
      .tap(NAME, warnForUnsupportedApi)
  }

  const warnForUnsupportedProcessApi = (node: any, [callee]: string[]) => {
    if (!isInMiddlewareLayer(parser) || callee === 'env') {
      return
    }
    compilation.warnings.push(
      buildUnsupportedApiError({
        compilation,
        parser,
        apiName: `process.${callee}`,
        ...node,
      })
    )
    return true
  }

  parser.hooks.callMemberChain
    .for('process')
    .tap(NAME, warnForUnsupportedProcessApi)
  parser.hooks.expressionMemberChain
    .for('process')
    .tap(NAME, warnForUnsupportedProcessApi)
}

function getCodeAnalyzer(params: {
  dev: boolean
  compiler: webpack.Compiler
  compilation: webpack.Compilation
}) {
  return (parser: webpack.javascript.JavascriptParser) => {
    const {
      dev,
      compiler: { webpack: wp },
      compilation,
    } = params
    const { hooks } = parser

    /**
     * For an expression this will check the graph to ensure it is being used
     * by exports. Then it will store in the module buildInfo a boolean to
     * express that it contains dynamic code and, if it is available, the
     * module path that is using it.
     */
    const handleExpression = () => {
      if (!isInMiddlewareLayer(parser)) {
        return
      }

      wp.optimize.InnerGraph.onUsage(parser.state, (used = true) => {
        const buildInfo = getModuleBuildInfo(parser.state.module)
        if (buildInfo.usingIndirectEval === true || used === false) {
          return
        }

        if (!buildInfo.usingIndirectEval || used === true) {
          buildInfo.usingIndirectEval = used
          return
        }

        buildInfo.usingIndirectEval = new Set([
          ...Array.from(buildInfo.usingIndirectEval),
          ...Array.from(used),
        ])
      })
    }

    /**
     * This expression handler allows to wrap a dynamic code expression with a
     * function call where we can warn about dynamic code not being allowed
     * but actually execute the expression.
     */
    const handleWrapExpression = (expr: any) => {
      if (!isInMiddlewareLayer(parser)) {
        return
      }

      const { ConstDependency } = wp.dependencies
      const dep1 = new ConstDependency(
        '__next_eval__(function() { return ',
        expr.range[0]
      )
      dep1.loc = expr.loc
      parser.state.module.addPresentationalDependency(dep1)
      const dep2 = new ConstDependency('})', expr.range[1])
      dep2.loc = expr.loc
      parser.state.module.addPresentationalDependency(dep2)

      handleExpression()
      return true
    }

    /**
     * This expression handler allows to wrap a WebAssembly.compile invocation with a
     * function call where we can warn about WASM code generation not being allowed
     * but actually execute the expression.
     */
    const handleWrapWasmCompileExpression = (expr: any) => {
      if (!isInMiddlewareLayer(parser)) {
        return
      }

      const { ConstDependency } = wp.dependencies
      const dep1 = new ConstDependency(
        '__next_webassembly_compile__(function() { return ',
        expr.range[0]
      )
      dep1.loc = expr.loc
      parser.state.module.addPresentationalDependency(dep1)
      const dep2 = new ConstDependency('})', expr.range[1])
      dep2.loc = expr.loc
      parser.state.module.addPresentationalDependency(dep2)

      handleExpression()
    }

    /**
     * This expression handler allows to wrap a WebAssembly.instatiate invocation with a
     * function call where we can warn about WASM code generation not being allowed
     * but actually execute the expression.
     *
     * Note that we don't update `usingIndirectEval`, i.e. we don't abort a production build
     * since we can't determine statically if the first parameter is a module (legit use) or
     * a buffer (dynamic code generation).
     */
    const handleWrapWasmInstantiateExpression = (expr: any) => {
      if (!isInMiddlewareLayer(parser)) {
        return
      }

      if (dev) {
        const { ConstDependency } = wp.dependencies
        const dep1 = new ConstDependency(
          '__next_webassembly_instantiate__(function() { return ',
          expr.range[0]
        )
        dep1.loc = expr.loc
        parser.state.module.addPresentationalDependency(dep1)
        const dep2 = new ConstDependency('})', expr.range[1])
        dep2.loc = expr.loc
        parser.state.module.addPresentationalDependency(dep2)
      }
    }

    /**
     * Handler to store original source location of static and dynamic imports into module's buildInfo.
     */
    const handleImport = (node: any) => {
      if (isInMiddlewareLayer(parser) && node.source?.value && node?.loc) {
        const { module, source } = parser.state
        const buildInfo = getModuleBuildInfo(module)
        if (!buildInfo.importLocByPath) {
          buildInfo.importLocByPath = new Map()
        }

        const importedModule = node.source.value?.toString()
        buildInfo.importLocByPath.set(importedModule, {
          sourcePosition: {
            ...node.loc.start,
            source: module.identifier(),
          },
          sourceContent: source.toString(),
        })

        if (!dev && isNodeJsModule(importedModule)) {
          compilation.warnings.push(
            buildWebpackError({
              message: `A Node.js module is loaded ('${importedModule}' at line ${node.loc.start.line}) which is not supported in the Edge Runtime.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`,
              compilation,
              parser,
              ...node,
            })
          )
        }
      }
    }

    /**
     * A noop handler to skip analyzing some cases.
     * Order matters: for it to work, it must be registered first
     */
    const skip = () => (isInMiddlewareLayer(parser) ? true : undefined)

    for (const prefix of ['', 'global.']) {
      hooks.expression.for(`${prefix}Function.prototype`).tap(NAME, skip)
      hooks.expression.for(`${prefix}Function.bind`).tap(NAME, skip)
      hooks.call.for(`${prefix}eval`).tap(NAME, handleWrapExpression)
      hooks.call.for(`${prefix}Function`).tap(NAME, handleWrapExpression)
      hooks.new.for(`${prefix}Function`).tap(NAME, handleWrapExpression)
      hooks.call
        .for(`${prefix}WebAssembly.compile`)
        .tap(NAME, handleWrapWasmCompileExpression)
      hooks.call
        .for(`${prefix}WebAssembly.instantiate`)
        .tap(NAME, handleWrapWasmInstantiateExpression)
    }

    hooks.importCall.tap(NAME, handleImport)
    hooks.import.tap(NAME, handleImport)

    if (!dev) {
      // do not issue compilation warning on dev: invoking code will provide details
      registerUnsupportedApiHooks(parser, compilation)
    }
  }
}

function getExtractMetadata(params: {
  compilation: webpack.Compilation
  compiler: webpack.Compiler
  dev: boolean
  metadataByEntry: Map<string, EntryMetadata>
}): () => Promise<void> {
  const { dev, compilation, metadataByEntry, compiler } = params
  const { webpack: wp } = compiler
  return async () => {
    metadataByEntry.clear()
    const telemetry: Telemetry | undefined = traceGlobals.get('telemetry')

    for (const [entryName, entry] of compilation.entries) {
      if (entry.options.runtime !== EDGE_RUNTIME_WEBPACK) {
        // Only process edge runtime entries
        continue
      }
      const entryDependency = entry.dependencies?.[0]
      const { rootDir, route } = getModuleBuildInfo(
        compilation.moduleGraph.getResolvedModule(entryDependency)
      )

      const { moduleGraph } = compilation
      const modules = new Set<webpack.NormalModule>()
      const addEntriesFromDependency = (dependency: any) => {
        const module = moduleGraph.getModule(dependency)
        if (module) {
          modules.add(module as webpack.NormalModule)
        }
      }

      entry.dependencies.forEach(addEntriesFromDependency)
      entry.includeDependencies.forEach(addEntriesFromDependency)

      const entryMetadata: EntryMetadata = {
        wasmBindings: new Map(),
        assetBindings: new Map(),
      }

      if (route?.middlewareConfig?.regions) {
        entryMetadata.regions = route.middlewareConfig.regions
      }

      if (route?.preferredRegion) {
        const preferredRegion = route.preferredRegion
        entryMetadata.regions =
          // Ensures preferredRegion is always an array in the manifest.
          typeof preferredRegion === 'string'
            ? [preferredRegion]
            : preferredRegion
      }

      let ogImageGenerationCount = 0

      for (const module of modules) {
        const buildInfo = getModuleBuildInfo(module)

        /**
         * Check if it uses the image generation feature.
         */
        if (!dev) {
          const resource = module.resource
          const hasOGImageGeneration =
            resource &&
            /[\\/]node_modules[\\/]@vercel[\\/]og[\\/]dist[\\/]index\.(edge|node)\.js$|[\\/]next[\\/]dist[\\/](esm[\\/])?server[\\/]og[\\/]image-response\.js$/.test(
              resource
            )

          if (hasOGImageGeneration) {
            ogImageGenerationCount++
          }
        }

        /**
         * When building for production checks if the module is using `eval`
         * and in such case produces a compilation error. The module has to
         * be in use.
         */
        if (
          !dev &&
          buildInfo.usingIndirectEval &&
          isUsingIndirectEvalAndUsedByExports({
            module,
            moduleGraph,
            runtime: wp.util.runtime.getEntryRuntime(compilation, entryName),
            usingIndirectEval: buildInfo.usingIndirectEval,
            wp,
          })
        ) {
          const id = module.identifier()
          if (/node_modules[\\/]regenerator-runtime[\\/]runtime\.js/.test(id)) {
            continue
          }
          if (route?.middlewareConfig?.unstable_allowDynamicGlobs) {
            telemetry?.record({
              eventName: 'NEXT_EDGE_ALLOW_DYNAMIC_USED',
              payload: {
                file: route?.absolutePagePath.replace(rootDir ?? '', ''),
                config: route?.middlewareConfig,
                fileWithDynamicCode: module.userRequest.replace(
                  rootDir ?? '',
                  ''
                ),
              },
            })
          }
          if (
            !isDynamicCodeEvaluationAllowed(
              module.userRequest,
              route?.middlewareConfig,
              rootDir
            )
          ) {
            compilation.errors.push(
              buildWebpackError({
                message: `Dynamic Code Evaluation (e. g. 'eval', 'new Function', 'WebAssembly.compile') not allowed in Edge Runtime ${
                  typeof buildInfo.usingIndirectEval !== 'boolean'
                    ? `\nUsed by ${Array.from(buildInfo.usingIndirectEval).join(
                        ', '
                      )}`
                    : ''
                }\nLearn More: https://nextjs.org/docs/messages/edge-dynamic-code-evaluation`,
                entryModule: module,
                compilation,
              })
            )
          }
        }

        /**
         * The entry module has to be either a page or a middleware and hold
         * the corresponding metadata.
         */
        if (buildInfo?.nextEdgeSSR) {
          entryMetadata.edgeSSR = buildInfo.nextEdgeSSR
        } else if (buildInfo?.nextEdgeMiddleware) {
          entryMetadata.edgeMiddleware = buildInfo.nextEdgeMiddleware
        } else if (buildInfo?.nextEdgeApiFunction) {
          entryMetadata.edgeApiFunction = buildInfo.nextEdgeApiFunction
        }

        /**
         * If the module is a WASM module we read the binding information and
         * append it to the entry wasm bindings.
         */
        if (buildInfo?.nextWasmMiddlewareBinding) {
          entryMetadata.wasmBindings.set(
            buildInfo.nextWasmMiddlewareBinding.name,
            buildInfo.nextWasmMiddlewareBinding.filePath
          )
        }

        if (buildInfo?.nextAssetMiddlewareBinding) {
          entryMetadata.assetBindings.set(
            buildInfo.nextAssetMiddlewareBinding.name,
            buildInfo.nextAssetMiddlewareBinding.filePath
          )
        }

        /**
         * Append to the list of modules to process outgoingConnections from
         * the module that is being processed.
         */
        for (const conn of moduleGraph.getOutgoingConnections(module)) {
          if (conn.module) {
            modules.add(conn.module as webpack.NormalModule)
          }
        }
      }

      telemetry?.record({
        eventName: EVENT_BUILD_FEATURE_USAGE,
        payload: {
          featureName: 'vercelImageGeneration',
          invocationCount: ogImageGenerationCount,
        },
      })
      metadataByEntry.set(entryName, entryMetadata)
    }
  }
}
export default class MiddlewarePlugin {
  private readonly dev: boolean
  private readonly sriEnabled: boolean

  constructor({ dev, sriEnabled }: { dev: boolean; sriEnabled: boolean }) {
    this.dev = dev
    this.sriEnabled = sriEnabled
  }

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(NAME, (compilation, params) => {
      const { hooks } = params.normalModuleFactory
      /**
       * This is the static code analysis phase.
       */
      const codeAnalyzer = getCodeAnalyzer({
        dev: this.dev,
        compiler,
        compilation,
      })
      hooks.parser.for('javascript/auto').tap(NAME, codeAnalyzer)
      hooks.parser.for('javascript/dynamic').tap(NAME, codeAnalyzer)
      hooks.parser.for('javascript/esm').tap(NAME, codeAnalyzer)

      /**
       * Extract all metadata for the entry points in a Map object.
       */
      const metadataByEntry = new Map<string, EntryMetadata>()
      compilation.hooks.finishModules.tapPromise(
        NAME,
        getExtractMetadata({
          compilation,
          compiler,
          dev: this.dev,
          metadataByEntry,
        })
      )

      /**
       * Emit the middleware manifest.
       */
      compilation.hooks.processAssets.tap(
        {
          name: 'NextJsMiddlewareManifest',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        getCreateAssets({
          compilation,
          metadataByEntry,
          opts: {
            sriEnabled: this.sriEnabled,
          },
        })
      )
    })
  }
}

export const SUPPORTED_NATIVE_MODULES = [
  'buffer',
  'events',
  'assert',
  'util',
  'async_hooks',
] as const

const supportedEdgePolyfills = new Set<string>(SUPPORTED_NATIVE_MODULES)

export function getEdgePolyfilledModules() {
  const records: Record<string, string> = {}
  for (const mod of SUPPORTED_NATIVE_MODULES) {
    records[mod] = `commonjs node:${mod}`
    records[`node:${mod}`] = `commonjs node:${mod}`
  }
  return records
}

export async function handleWebpackExternalForEdgeRuntime({
  request,
  context,
  contextInfo,
  getResolve,
}: {
  request: string
  context: string
  contextInfo: any
  getResolve: () => any
}) {
  if (
    contextInfo.issuerLayer === 'middleware' &&
    isNodeJsModule(request) &&
    !supportedEdgePolyfills.has(request)
  ) {
    // allows user to provide and use their polyfills, as we do with buffer.
    try {
      await getResolve()(context, request)
    } catch {
      return `root  globalThis.__import_unsupported('${request}')`
    }
  }
}
