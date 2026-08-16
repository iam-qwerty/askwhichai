// ============================================================
// AskWhichAI — TanStack Query Devtools integration
// ============================================================
// Exports a panel config for the TanStack Query Devtools
// that's shown alongside the Router Devtools in the app shell.
// Only visible during development.
// ============================================================

import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export default {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
}
