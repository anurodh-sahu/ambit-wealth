'use client'

import { useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function enableMocking() {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('../mocks/browser')
        await worker.start()
      }
    }

    enableMocking()
  }, [])

  return <>{children}</>
}