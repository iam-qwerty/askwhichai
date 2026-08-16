// ============================================================
// AskWhichAI — Site header / navigation bar
// ============================================================
// Renders the sticky top bar with the "AskWhichAI" branding and
// tagline. Links back to the home page (clears any search).
// Shown on every page (included in the root layout).
// ============================================================

import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Clicking the logo goes home and clears the search */}
            <Link to="/" search={{ query: undefined }} className="no-underline rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <h1 className="text-2xl font-bold text-primary">AskWhichAI</h1>
            </Link>
            <p className="text-sm text-muted-foreground font-sans">
              The AI tool directory, searchable by task
            </p>
          </div>
          {/* TODO: Add user auth menu, settings, etc. here */}
        </div>
      </div>
    </header>
  )
}
