/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pazrin-proxy-api.deno.dev https://platform.twitter.com https://connect.facebook.net https://www.googletagmanager.com;
  style-src 'self' fonts.googleapis.com 'unsafe-inline';
  font-src 'self' fonts.gstatic.com;
  connect-src 'self' https://pazrin-proxy-api.deno.dev https://www.google-analytics.com https://platform.twitter.com https://syndication.twitter.com https://cdn.builder.io https://cdn.builder.codes https://pbs.twimg.com https://cdn.syndication.twimg.com https://www.facebook.com https://www.googletagmanager.com;
  frame-src 'self' https://pazrin-proxy-api.deno.dev https://platform.twitter.com;  
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  },
}

module.exports = nextConfig