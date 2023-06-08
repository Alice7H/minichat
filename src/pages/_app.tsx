import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/globals.css'

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mini Chat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
