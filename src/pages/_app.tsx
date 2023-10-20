import GlobalLayout from '@/layouts/GlobalLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  const isAbsolutePage = useMemo(() => {
    return (
      router.route === '/survey/[surveyIdOrSlug]'
    )
  }, [router.route])
  

  if (isAbsolutePage) {
    return <Component {...pageProps}/>
  }
  
  return <GlobalLayout>
    <Component {...pageProps} />
  </GlobalLayout>
}
