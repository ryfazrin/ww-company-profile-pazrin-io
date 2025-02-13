import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo:wght@800&family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                fernflow = {
                  resolveUrl(url, location) {
                    if (
                      url.hostname.includes('syndication.twitter.com') ||
                      url.hostname.includes('cdn.syndication.twimg.com') ||
                      url.hostname.includes('connect.facebook.net')
                    ) {
                      const proxyUrl = new URL('https://pazrin-proxy-api.deno.dev/proxy-api');
                      proxyUrl.searchParams.append('url', url);
                      return proxyUrl;
                    }
                  },
                  forward: ["fbq", "dataLayer.push"],
                  logCalls: true,
                  logGetters: true,
                  logSetters: true,
                  logImageRequests: true,
                  logMainAccess: true,
                  logSendBeaconRequests: true,
                  logStackTraces: false,
                  logScriptExecution: true,
                };
              `
            }}
          />
          <script src="/~fernflow/debug/tool-web-worker.js" async />
      </Head>
      <body>
        <Main />
        <NextScript />
        <style jsx global>{`
            #__next {
              width: 100%;
            }
          `}</style>
      </body>
    </Html>
  )
}