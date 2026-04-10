import Link from "next/link"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Wand2, Rocket, LineChart, BrainCircuit } from "lucide-react"
import { ThemeInitializer } from "@/components/ThemeInitializer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeInitializer />
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <BrainCircuit className="h-4 w-4" />
                Your AI-Powered Technical Co-Founder
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Launch your business <span className="text-primary">overnight</span> with Digital Ally.
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                The all-in-one SaaS toolkit for non-technical entrepreneurs. Generate websites, 
                marketing campaigns, and track growth with our advanced AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                  <Link href="/generator">Start Building Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-xl" asChild>
                  <Link href="/auth">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Wand2 className="h-6 w-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Instant Websites</h3>
                <p className="text-muted-foreground">Describe your business and get a high-converting website in seconds, complete with a visual editor.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border shadow-sm">
                <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">AI Marketing</h3>
                <p className="text-muted-foreground">Generate ad copy, newsletters, and social posts that resonate with your target audience perfectly.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Smart Analytics</h3>
                <p className="text-muted-foreground">Understand your performance with sentiment analysis and behavioral insights from day one.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Digital Ally. Built for entrepreneurs.</p>
        </div>
      </footer>
    </div>
  )
}