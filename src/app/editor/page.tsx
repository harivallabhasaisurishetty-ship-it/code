"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useProjectStore } from "@/store/useProjectStore"
import { ThemeInitializer } from "@/components/ThemeInitializer"
import { Header } from "@/components/Header"
import { ChatbotPanel } from "@/components/ChatbotPanel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Save, ChevronLeft, Layout, MousePointer, Info, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EditorPage() {
  const { currentProject, updateProjectContent } = useProjectStore()
  const [content, setContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentProject) {
      router.push("/dashboard")
      return
    }
    setContent(currentProject.htmlContent)
  }, [currentProject, router])

  const handleSave = () => {
    if (currentProject && editorRef.current) {
      const newHtml = editorRef.current.innerHTML
      updateProjectContent(currentProject.id, newHtml)
      toast({ title: "Project Saved", description: "Changes have been successfully updated." })
    }
  }

  const handleAIModification = (mod: any) => {
    if (mod.action === 'style' && mod.targetSelector && mod.cssProperties) {
      toast({ title: "AI Modifying Styles", description: `Updating ${mod.targetSelector}...` })
      const elements = editorRef.current?.querySelectorAll(mod.targetSelector)
      elements?.forEach((el: any) => {
        Object.entries(mod.cssProperties).forEach(([prop, value]: [any, any]) => {
          el.style[prop] = value
        })
      })
    } else if (mod.action === 'content' && mod.targetSelector && mod.newTextContent) {
      toast({ title: "AI Modifying Content", description: `Updating text in ${mod.targetSelector}...` })
      const elements = editorRef.current?.querySelectorAll(mod.targetSelector)
      elements?.forEach((el: any) => {
        el.innerText = mod.newTextContent
      })
    }
  }

  if (!currentProject) return null

  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <ThemeInitializer />
      <Header />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-background border-b px-6 py-3 flex items-center justify-between sticky top-16 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
            <h2 className="font-headline font-bold">{currentProject.businessName}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Alert className="py-2 px-4 h-9 w-auto hidden md:flex items-center gap-2 bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-xs font-medium">Click any text element to edit it directly</AlertDescription>
            </Alert>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className={isEditing ? "bg-primary/10 text-primary border-primary/30" : ""}>
              <MousePointer className="h-4 w-4 mr-2" />
              {isEditing ? "Exit Visual Editor" : "Visual Editor"}
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 flex justify-center bg-secondary/20">
          <div className="max-w-6xl w-full">
            <Card className="shadow-2xl overflow-hidden border-none min-h-[800px] bg-white text-black p-0">
              {/* This is the preview area where the generated HTML is rendered */}
              <div 
                ref={editorRef}
                className="w-full h-full preview-container"
                dangerouslySetInnerHTML={{ __html: content }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
              />
            </Card>
          </div>
        </div>
      </div>

      <ChatbotPanel onModification={handleAIModification} />
    </div>
  )
}
