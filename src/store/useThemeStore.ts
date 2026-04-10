import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  accentColor: string;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accentColor: '225 87% 63%', // Default Primary Blue HSL
      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === 'light' ? 'dark' : 'light';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', nextTheme === 'dark');
          }
          return { theme: nextTheme };
        }),
      setAccentColor: (color: string) =>
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--user-accent', color);
          }
          return { accentColor: color };
        }),
    }),
    {
      name: 'digital-ally-theme',
    }
  )
);