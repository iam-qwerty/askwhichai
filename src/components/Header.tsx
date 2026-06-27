import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50 animate-slide-up shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" search={{ query: undefined }} className="no-underline">
              <h1 className="text-2xl font-black text-primary">Which AI</h1>
            </Link>
            <p className="text-sm text-muted-foreground font-sans">
              Discover the perfect AI tools for your needs
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
