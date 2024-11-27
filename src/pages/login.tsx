import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthButtons from '@/components/auth/AuthButtons';
import BackButton from '@/components/BackButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Login logic here
    if (userRole === 'taxi') {
      router.push('/taxi-dashboard');
    }
    if (userRole === 'user') {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kirish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingiz"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Foydalanuvchi turi</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Foydalanuvchi turini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Foydalanuvchi</SelectItem>
                  <SelectItem value="taxi">Taksi haydovchisi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Kirish
            </Button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Parolni unutdingizmi?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
      <AuthButtons />
        <div className="mt-2">
        <BackButton />
        </div>
        
       
        </div>
        
        
      
    </div>
  );
}
