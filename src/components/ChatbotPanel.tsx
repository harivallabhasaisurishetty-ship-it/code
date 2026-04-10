"use client"

import { useState, useRef, useEffect } from "react"
import { refineWebsiteWithChatbot } from "@/ai/flows/refine-website-with-chatbot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, X, Loader2, Sparkles, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatbotPanel({ onModification }: { onModification: (mod: any) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Digital Ally assistant. How can I help you refine your website design?" }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await refineWebsiteWithChatbot({
        userCommand: userMessage,
        currentWebsiteContext: "HTML & Tailwind CSS business landing page"
      })

      setMessages(prev => [...prev, { role: 'assistant', content: response.responseForUser }])
      
      if (response.suggestedModification && response.suggestedModification.action !== 'no_change') {
        onModification(response.suggestedModification)
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I ran into an error processing that request." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-80 sm:w-96 shadow-2xl border-primary/20 animate-in slide-in-from-bottom-2">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold">Design Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                    m.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-muted rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex gap-2">
              <Input 
                placeholder="Make the header blue..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button 
        size="lg" 
        className={cn(
          "rounded-full h-14 w-14 shadow-xl border-2 border-white/10 p-0",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  )
}