'use client'

import { useEffect, useState } from 'react'

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [mockingEnabled, setMockingEnabled] = useState(false)

  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        const { worker } = await import('../mocks/browser')
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        setMockingEnabled(true)
      } else {
        setMockingEnabled(true)
      }
    }

    enableApiMocking()
  }, [])

  if (!mockingEnabled) {
    return null
  }

  return <>{children}</>
}
