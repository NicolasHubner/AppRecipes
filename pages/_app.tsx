import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import Provider from '../context/ProviderContext'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // console.log(Component.includes(''))
  const router = useRouter()

  const show = router.pathname === '/' ? false : true
  return (
    <>
      <Provider>
        <Head>
          <title>Recipes App Nicolas</title>
          <link
            rel="icon"
            href="https://img.icons8.com/color/48/000000/cookbook.png"
          />
        </Head>
        {show && <Header />}
        <Component {...pageProps} />
        {show && <Footer />}
      </Provider>
    </>
  )
}

export default MyApp
