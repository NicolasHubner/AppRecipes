import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import Provider from '../context/ProviderContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Head>
          <title>App Receitas Nicolas</title>
          <link
            rel="icon"
            href="https://img.icons8.com/color/48/000000/cookbook.png"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
