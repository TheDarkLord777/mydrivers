import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang='uz'>
      <Head>
        <title>My Drivers</title>
        <meta name="description" content="My Drivers" />
        <link rel="shortcut icon" href="vite.svg" type="image/x-icon" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}