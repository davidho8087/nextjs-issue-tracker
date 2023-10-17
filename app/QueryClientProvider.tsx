'use client'
import React, { PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'

// This query client contains a cache for storing data
// that we get from the backend.
// We should pass this using this Query client provider to our component tree.
// Now the reason we have to create this component to wrap this React query client
// because this React context share this query client with our component tree.
// So this QueryClientProvider return ReactQueryClientProvider.
// Declare "use client" because react context is only available in client component.
const queryClient = new QueryClient()
function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
