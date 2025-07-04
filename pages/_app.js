import Script from 'next/script';
import '../styles/globals.css';

// Fungsi untuk log call stack dan kedalamannya
const logCallStack = function(context) {
  try {
    var stack = new Error().stack ? new Error().stack.split('\n').slice(1) : [];
    window._callStackDepths = window._callStackDepths || [];
    window._callStackDepths.push(stack.length);
    console.log('[CallStack][Main][' + context + '] Kedalaman: ' + stack.length);
    // console.trace(); // Uncomment jika ingin melihat trace detail
  } catch (e) {
    console.error('[CallStack][Main thread][' + context + '] Error logging call stack:', e);
  }
};

function MyApp({ Component, pageProps }) {
  // Log the call stack to measure main thread stack
  logCallStack('Main thread');
  
  return (
    <>
      {/* Jika Web Worker aktif, ubah type script menjadi "text/toolwebworker" */}
      <script
        async
        type="text/toolwebworker"
        src="https://platform.twitter.com/widgets.js"
      />

      <Script
        id="gtm"
        type={"text/toolwebworker"} 
        // strategy="afterInteractive"
      >
        {`
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-WRNP3NZ');
        `}
      </Script>

      <Script 
        id="facebook-pixel"
        type={"text/toolwebworker"} 
        // strategy="afterInteractive"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '987747585216906');
          fbq('track', 'PageView');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
