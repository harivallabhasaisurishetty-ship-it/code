"use client"

import { useState, useEffect } from "react"
import { generateMarketingCopy } from "@/ai/flows/generate-marketing-copy"
import { Header } from "@/components/Header"
import { ThemeInitializer } from "@/components/ThemeInitializer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useProjectStore } from "@/store/useProjectStore"
import { Loader2, Megaphone, Copy, Send, Sparkles, Newspaper, Mail, MessageCircle, ArrowRight, Layout } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarketingPage() {
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const { toast } = useToast()
  const { currentProject } = useProjectStore()

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!prompt.trim()) {
      toast({ title: "Prompt Required", description: "Please enter a topic for your marketing copy.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await generateMarketingCopy({ prompt })
      setResult(response.marketingCopy)
      toast({ title: "Copy Generated!", description: "Your marketing content is ready below." })
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate copy. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    toast({ title: "Copied!", description: "Content copied to clipboard." })
  }

  const handleQuickPrompt = (text: string) => {
    setPrompt(text)
  }

  const handleProjectContext = () => {
    if (currentProject) {
      const projectPrompt = `Create a promotional campaign for my business "${currentProject.businessName}". Here is the business description: ${currentProject.businessDescription}. Create a WhatsApp message, an ad copy, and a social media post.`
      setPrompt(projectPrompt)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col">
      <ThemeInitializer />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20 shadow-inner">
            <Megaphone className="h-8 w-8" />
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight">AI Content Strategist</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Generate high-converting ad copy, viral social media posts, and WhatsApp messages 
            tailored to your business vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {currentProject && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Layout className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Active Project</span>
                  </div>
                  <CardTitle className="text-lg font-headline">{currentProject.businessName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {currentProject.businessDescription}
                  </p>
                  <Button variant="secondary" size="sm" className="w-full gap-2" onClick={handleProjectContext}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Use Project Details
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-primary/5" onClick={() => handleQuickPrompt("Write a persuasive WhatsApp message for a 20% flash sale happening this weekend.")}>
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium">WhatsApp Promo</p>
                    <p className="text-[10px] text-muted-foreground">Concise & high-conversion</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-primary/5" onClick={() => handleQuickPrompt("Create a Facebook ad for my tech consultancy business focusing on local startups.")}>
                  <Newspaper className="h-4 w-4 text-blue-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Ad Campaign</p>
                    <p className="text-[10px] text-muted-foreground">Scroll-stopping copy</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-primary/5" onClick={() => handleQuickPrompt("Write a welcome email for a new SaaS platform subscribers with 3 key tips.")}>
                  <Mail className="h-4 w-4 text-amber-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Newsletter</p>
                    <p className="text-[10px] text-muted-foreground">Engage your audience</p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Campaign Details</CardTitle>
                <CardDescription>Describe your goal and our AI will do the heavy lifting.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="marketing-prompt">Your Instructions</Label>
                    <Textarea 
                      id="marketing-prompt" 
                      placeholder="e.g. A WhatsApp message for my bakery's grand opening..." 
                      className="min-h-[120px] text-base resize-none focus:ring-primary/30"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full font-bold gap-2 shadow-lg shadow-primary/20 h-14" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    {loading ? "Strategizing..." : "Generate Marketing Assets"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {result && (
              <Card className="shadow-2xl border-primary/20 animate-in fade-in-0 slide-in-from-bottom-6 duration-500 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <div>
                    <CardTitle className="font-headline text-xl">Generated Strategy</CardTitle>
                    <CardDescription>Review and refine your content</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-9 w-9">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 text-emerald-500 hover:text-emerald-600">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-background rounded-xl p-6 border shadow-inner whitespace-pre-wrap leading-relaxed text-foreground min-h-[300px] text-lg font-normal">
                    {result}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t py-4 px-6 bg-secondary/5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Sparkles className="h-3 w-3" />
                    Verified by Digital Ally AI
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" onClick={() => setResult("")}>Clear</Button>
                    <Button size="sm" onClick={copyToClipboard} className="gap-2">
                      <Copy className="h-3.5 w-3.5" />
                      Copy Content
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
