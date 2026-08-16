// ============================================================
// AskWhichAI — Search bar component
// ============================================================
// The main search input on the home page. As the user types and
// presses Enter (or clicks Search), it navigates to the same
// page with ?query=URL_ENCODED_TEXT in the URL. This triggers
// the route loader to run semantic search.
//
// Key behaviors:
//   - Reads initial query from URL (for page refresh)
//   - Uses React useTransition for non-blocking navigation
//   - Shows a loading spinner on the button while navigating
// ============================================================

'use client'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, Loader2 } from 'lucide-react'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function SearchBar() {
  // Read the initial query from the URL (e.g. when coming back from a detail page)
  const search = useSearch({ strict: false }) as { query?: string }
  const [query, setQuery] = useState(search?.query || '')
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const handleSearch = () => {
    startTransition(() => {
      if (query.trim()) {
        // Navigate to home with the search query in the URL
        navigate({ to: '/', search: { query: encodeURIComponent(query) } })
      } else {
        // Clear the search
        navigate({ to: '/', search: { query: undefined } })
      }
    })
  }

  return (
    <form
      role="search"
      className="relative max-w-2xl mx-auto mb-8 animate-slide-up"
      style={{ animationDelay: '0.1s' }}
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
    >
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" aria-hidden="true" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Describe what you want to do…"
        aria-label="Describe the task you want an AI tool for"
        className="pl-12 pr-28 py-6 text-sm md:text-lg border-border/50 focus:border-ring bg-card font-sans shadow-sm"
      />
      <Button
        type="submit"
        disabled={isPending}
        aria-label={isPending ? 'Searching…' : 'Search'}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : 'Search'}
      </Button>
    </form>
  )
}
