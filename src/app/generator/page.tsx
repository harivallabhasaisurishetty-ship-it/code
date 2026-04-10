"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateWebsiteDraft } from "@/ai/flows/generate-website-draft"
import { useProjectStore } from "@/store/useProjectStore"
import { ThemeInitializer } from "@/components/ThemeInitializer"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Wand2, Sparkles } from "lucide-react"

export default function GeneratorPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    preferredStyle: "modern"
  })
  
  const { addProject, setCurrentProject } = useProjectStore()
  const router = useRouter()
  const { toast } = useToast()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.businessName || !formData.businessDescription) {
      toast({ title: "Oops!", description: "Please provide a name and description for your business.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const result = await generateWebsiteDraft({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        preferredStyle: formData.preferredStyle
      })

      const newProject = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        style: formData.preferredStyle,
        htmlContent: result.htmlContent,
        createdAt: Date.now()
      }

      addProject(newProject)
      setCurrentProject(newProject)
      toast({ title: "Success!", description: "Your website draft is ready." })
      router.push("/editor")
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate website. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col">
      <ThemeInitializer />
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Tell us about your <span className="text-primary">Vision</span>.</h1>
            <p className="text-muted-foreground leading-relaxed">
              Our AI co-founder will design a high-converting website tailored to your business goals. 
              Just give us the basics, and we'll handle the code.
            </p>
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <Sparkles className="h-6 w-6 text-primary shrink-0" />
              <p className="text-xs font-medium">Uses Gemini 2.5 Flash for high-speed, professional results.</p>
            </div>
          </div>

          <Card className="md:col-span-3 shadow-2xl border-none ring-1 ring-border">
            <CardHeader>
              <CardTitle className="font-headline">Website Generator</CardTitle>
              <CardDescription>Craft your online presence in seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName" 
                    placeholder="e.g. Acme Studio" 
                    value={formData.businessName} 
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Description</Label>
                  <Textarea 
                    id="businessDescription" 
                    placeholder="Tell us what you do, your target audience, and key services..." 
                    className="min-h-[120px]"
                    value={formData.businessDescription} 
                    onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="style">Preferred Style</Label>
                  <Select 
                    value={formData.preferredStyle} 
                    onValueChange={(val) => setFormData({...formData, preferredStyle: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern & Clean</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="corporate">Professional Corporate</SelectItem>
                      <SelectItem value="vibrant">Vibrant & Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold gap-2" disabled={loading}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                  {loading ? "Generating Draft..." : "Generate My Website"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}