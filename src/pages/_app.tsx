import GlobalLayout from '@/layouts/GlobalLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { GlobalContextProvider, useGlobalState } from '@/context/global'
import { CssVarsProvider } from '@mui/joy/styles'

const ABSOLUTE_PAGES = [
  '/survey/[surveyIdOrSlug]', 
  '/login',
]

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  const isAbsolutePage = useMemo(() => {
    return ABSOLUTE_PAGES.filter(page => page === router.route).includes(router.route)
  }, [router.route])
  

  if (isAbsolutePage) {
    return <Component {...pageProps}/>
  }

  return <CssVarsProvider 
    defaultMode={'system'}
  >
    <GlobalContextProvider>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </GlobalContextProvider>
  </CssVarsProvider>
}
