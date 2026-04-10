"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useUserStore"
import { ThemeInitializer } from "@/components/ThemeInitializer"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useUserStore()
  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (type: 'login' | 'signup') => {
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" })
      return
    }

    setIsLoading(true)
    // Simulate Firebase Auth
    setTimeout(() => {
      setUser({
        uid: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        displayName: email.split("@")[0],
      })
      setIsLoading(false)
      toast({ title: "Success", description: `Welcome back, ${email}!` })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col">
      <ThemeInitializer />
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold">Welcome to Digital Ally</CardTitle>
            <CardDescription>Enter your credentials to access your co-founder suite</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" placeholder="name@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Password</Label>
                    <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button className="w-full h-11" onClick={() => handleAuth('login')} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" placeholder="name@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button className="w-full h-11" onClick={() => handleAuth('signup')} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col text-center border-t pt-6 gap-2">
            <p className="text-xs text-muted-foreground">By continuing, you agree to our Terms of Service.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}