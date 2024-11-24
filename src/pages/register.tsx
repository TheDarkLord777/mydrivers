import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthButtons from '@/components/AuthButtons'; // Import the AuthButtons component

type UserRole = 'user' | 'taxi';

export default function Register() {
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Registration logic here
    console.log({ ...formData, userRole });
    window.location.href = '/login';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setUserRole(value as UserRole);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h2>
        
        <div className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Ism"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="password"
            name="password"
            placeholder="Parol"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="Telefon raqam"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          
          <Select value={userRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Foydalanuvchi turini tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Foydalanuvchi</SelectItem>
              <SelectItem value="taxi">Taksi haydovchisi</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            Ro'yxatdan o'tish
          </Button>
        </div>
      </form>
      
      {/* Add Google sign-in button */}
      <div className="mt-6">
        <AuthButtons />
      </div>
    </div>
  );
}
