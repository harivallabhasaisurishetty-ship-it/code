"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useUserStore"
import { useProjectStore } from "@/store/useProjectStore"
import { Header } from "@/components/Header"
import { ThemeInitializer } from "@/components/ThemeInitializer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, MousePointer2, TrendingUp, History, ExternalLink, Trash2, Wand2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useUserStore()
  const { projects, setCurrentProject } = useProjectStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) router.push("/auth")
  }, [user, router])

  if (!mounted || !user) return null

  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <ThemeInitializer />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold">Founder Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.displayName}. Here's your business at a glance.</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/generator">
              <Wand2 className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,482</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clicks</CardTitle>
              <MousePointer2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+0.6% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Tokens Used</CardTitle>
              <History className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">Monthly plan usage</p>
              <Progress value={82} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Your Projects</CardTitle>
                <CardDescription>Manage and edit your generated websites</CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-12 bg-secondary/5 border-2 border-dashed rounded-xl">
                    <p className="text-muted-foreground mb-4">No projects yet. Let's build your first website!</p>
                    <Button variant="outline" asChild>
                      <Link href="/generator">Start Generator</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors">
                        <div>
                          <h4 className="font-bold">{project.businessName}</h4>
                          <p className="text-xs text-muted-foreground">{new Date(project.createdAt).toLocaleDateString()} • {project.style}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setCurrentProject(project);
                            router.push("/editor");
                          }}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Sentiment Analysis</CardTitle>
                <CardDescription>AI-generated feedback overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Positive</span>
                    <span className="text-muted-foreground">{sentimentData.positive}%</span>
                  </div>
                  <Progress value={sentimentData.positive} className="bg-emerald-500/10 h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Neutral</span>
                    <span className="text-muted-foreground">{sentimentData.neutral}%</span>
                  </div>
                  <Progress value={sentimentData.neutral} className="bg-amber-500/10 h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Negative</span>
                    <span className="text-muted-foreground">{sentimentData.negative}%</span>
                  </div>
                  <Progress value={sentimentData.negative} className="bg-rose-500/10 h-2" />
                </div>
                <p className="text-xs text-muted-foreground pt-4 border-t">
                  AI Insight: Your customers love the "Modern Minimalist" branding. Consider doubling down on clean visuals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}