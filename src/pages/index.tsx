import { useState, useEffect } from 'react'
import { Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'


export default function SplashScreen() {
  const [loading, setLoading] = useState(true)
  const router=useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-900">
        <Car className="w-20 h-20 text-white animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-8">My Drivers</h1>
      <div className="space-x-4">
        <Button variant="secondary" onClick={() => router.push("/login")}>Kirish</Button>
        <Button variant="destructive" onClick={() => router.push('/register')}>Ro'yxatdan o'tish</Button>
      </div>
    </div>
  )
}