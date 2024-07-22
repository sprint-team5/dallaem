"use client"

import Image from "next/image"

import { ReactNode } from "react"

import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Image src="/favicon.ico" width={0} height={0} alt={"test"} />
    </>
  )
}

export default Providers
