"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/store/useThemeStore"

export function ThemeInitializer() {
  const { theme, accentColor } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.setProperty("--user-accent", accentColor)
  }, [theme, accentColor])

  return null
}