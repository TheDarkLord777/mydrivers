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
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);  // Error state to manage feedback
  const router = useRouter();

  // Store dan userRole ni olish
  const { userRole, setUserRole } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);  // Clear previous errors
      // Login logikasi
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: userRole }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // User ma'lumotlarini store ga saqlash
      useAuthStore.getState().setUser(data.user);

      // Role ga qarab yo'naltirish
      if (userRole === 'taxi') {
        router.push('/taxi-dashboard');
      } else {
        router.push('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Login xatolik yuz berdi, iltimos qayta urinib ko\'ring'); // Set error message
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
  <Select
    value={userRole || 'user'}
    onValueChange={(value: 'user' | 'taxi' | 'admin') => setUserRole(value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Foydalanuvchi turini tanlang" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="user">Foydalanuvchi</SelectItem>
      <SelectItem value="taxi">Taksi haydovchisi</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
    </SelectContent>
  </Select>
</div>

            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div> // Error message display
            )}

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
