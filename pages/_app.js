import '@/styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { Provider } from 'react-redux'
import store from "../public/src/app/store"
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
  <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Component key={router.asPath} {...pageProps} />
    </Provider>
  </SessionProvider>
  )
}
