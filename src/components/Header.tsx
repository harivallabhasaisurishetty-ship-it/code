"use client"

import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"
import { useUserStore } from "@/store/useUserStore"
import { Button } from "@/components/ui/button"
import { Sun, Moon, LogOut, LayoutDashboard, Wand2, Megaphone } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { user, logout } = useUserStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-headline text-lg font-bold text-white">D</span>
            </div>
            <span className="font-headline text-xl font-bold tracking-tight">Digital Ally</span>
          </Link>

          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/generator" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <Wand2 className="h-4 w-4" />
                Website Gen
              </Link>
              <Link href="/marketing" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <Megaphone className="h-4 w-4" />
                Marketing
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm font-medium">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}