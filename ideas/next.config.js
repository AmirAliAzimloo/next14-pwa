/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav:true,
    aggressiveFrontEndNavCaching:true,
    reloadOnOnline:true,
    swcMinify:true,
    disable:false,
    workboxOptions:{
        disableDevLogs: true
    }
});


const nextConfig = {
    images: {
        // remotePatterns: [
        //     "panel.posplus.app",
        //     "avatars.dicebear.com",
        // ]
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'panel.posplus.app',
            },
            {
              protocol: 'https',
              hostname: 'avatars.dicebear',
            },
          ],
      }
}

module.exports = withPWA(nextConfig);
