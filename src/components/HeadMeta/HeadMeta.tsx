import Head from "next/head";
import Script from "next/script";

const HeadMeta: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://mei.dance/logo.png" />
        <link rel="shortcut icon" href="https://mei.dance/favicon.ico" />
        <link rel="apple-touch-icon" href="https://mei.dance/logo.png" />
        <link rel="canonical" href="https://mei.dance" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="MEI-DANCER" />
        <meta name="description" content="NOT MAIN DANCER" />
        <meta
          name="Keywords"
          content="kpop, 케이팝, 커버댄스, dance, choreography"
        />
        <meta name="author" content="MEI" />
        <meta property="og:image" content="https://mei.dance/ogImage.png" />
        <meta property="og:title" content="MEI-DANCER" />
        <meta property="og:description" content="NOT MAIN DANCER" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://mei.dance/ogImage.png" />
        <meta name="twitter:title" content="MEI-DANCER" />
        <meta name="twitter:description" content="NOT MAIN DANCER" />
        <meta name="twitter:url" content="https://mei.dance/" />
        <meta name="twitter:site" content="@DevDance.Mei" />
        <meta
          name="naver-site-verification"
          content="219172e22eecf7265ffea644799d16afa08b2b38"
        />
      </Head>
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "llmb6h760f");`,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-PYV4V9LQCM`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PYV4V9LQCM');`,
        }}
      />
    </>
  );
};

export default HeadMeta;
