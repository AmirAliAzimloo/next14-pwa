if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),d={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts("/fallback-382b0be8edf4f83a.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/409-247dd5d05e449245.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/435-294f695bba9e2e16.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/515-d4bd114a3f4c7d42.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/546-a52de80ad076fa0d.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/69.dbd11259be504824.js",revision:"dbd11259be504824"},{url:"/_next/static/chunks/809-b5e7c196fad8ec4d.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/814-a8a6eadb1abefa49.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/829-281c31f3bd3ea0ef.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/849-70b6067238e8faa7.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/927-a2fbb41b7d4c55b4.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/(auth)/login/page-a3718be3c7daa33c.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/(form)/form/page-27a368ca238d02f0.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/(root)/map/page-511ebf80d2f5f0fc.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/(root)/page-ddebcc9109b30491.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/auth/checkotp/page-dd013917ae29744f.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/auth/login/page-e5bb414a7877b7bf.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/auth/register/page-0d3b32ca60d3ae59.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-a5bb44b425d02af8.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/_not-found-5c02f87cdf428b43.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/offline/layout-739c38c8137c9a52.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/app/offline/page-3729256dc66dd899.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/d0deef33.8d729acf280b6cf0.js",revision:"8d729acf280b6cf0"},{url:"/_next/static/chunks/fd9d1056-db63e0e15e2ec3fc.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/main-627f0c7c3295c73e.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/main-app-2ec1e131b64b5b27.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-aec2768387a6b6bf.js",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/_next/static/css/2ae74595ed02c3c0.css",revision:"2ae74595ed02c3c0"},{url:"/_next/static/css/63516b7b0d9e3452.css",revision:"63516b7b0d9e3452"},{url:"/_next/static/css/bad9bce0e453cdea.css",revision:"bad9bce0e453cdea"},{url:"/_next/static/k0wXf_yINMR-B5C5PNudN/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/k0wXf_yINMR-B5C5PNudN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/3a82f999783f83e7-s.p.woff",revision:"4bf4a7786ffb07da23441a4703c24ac5"},{url:"/_next/static/media/custom-icon-font.3a82f999.woff",revision:"3a82f999"},{url:"/_next/static/media/custom-icon-font.87188abf.ttf",revision:"87188abf"},{url:"/_next/static/media/custom-icon-font.97327557.eot",revision:"97327557"},{url:"/_next/static/media/custom-icon-font.b712cd41.svg",revision:"b712cd41"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon-2x.93fdb12c.png",revision:"93fdb12c"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/media/marker-shadow.612e3b52.png",revision:"612e3b52"},{url:"/fallback-382b0be8edf4f83a.js",revision:"a5281aa1504c5d6bcd7ba1097870376a"},{url:"/offline",revision:"k0wXf_yINMR-B5C5PNudN"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
