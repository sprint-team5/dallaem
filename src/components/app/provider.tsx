"use client"

import { ReactNode } from "react"

import getQueryClient from "@/components/app/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"

const QueryProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProviders
