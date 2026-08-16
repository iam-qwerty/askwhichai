// ============================================================
// AskWhichAI — TanStack Query provider setup
// ============================================================
// Creates a QueryClient instance used for server-side data
// fetching with TanStack Query. Currently the app uses server
// functions instead of TanStack Query for data fetching, so
// this file may be unused.
//
// TODO: Either integrate TanStack Query or clean up this file.
// ============================================================

import { QueryClient } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient()

  return {
    queryClient,
  }
}
export default function TanstackQueryProvider() {}
