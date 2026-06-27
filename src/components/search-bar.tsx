'use client'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, Loader2 } from 'lucide-react'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function SearchBar() {
  const search = useSearch({ strict: false }) as { query?: string }
  const [query, setQuery] = useState(search?.query || '')
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const handleSearch = () => {
    startTransition(() => {
      if (query.trim()) {
        navigate({ to: '/', search: { query: encodeURIComponent(query) } })
      } else {
        navigate({ to: '/', search: { query: undefined } })
      }
    })
  }

  return (
    <div className="relative max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Type in what you want to do.."
        className="pl-12 py-6 text-sm md:text-lg border-border/50 focus:border-accent focus:ring-accent/20 bg-card backdrop-blur-sm font-sans transition-all duration-200 shadow-sm"
      />
      <Button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        onClick={handleSearch}
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
      </Button>
    </div>
  )
}
