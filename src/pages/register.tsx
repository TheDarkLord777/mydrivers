import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthButtons from "@/components/auth/AuthButtons"; // Import the AuthButtons component
import BackButton from "@/components/BackButton"; // Import BackButton component

type UserRole = "user" | "taxi";

export default function Register() {
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send the form data to the server
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful registration, redirect to login page
        router.push("/login");
      } else {
        // Handle errors from the server
        alert(data.error || "Xatolik yuz berdi");
      }
    } catch (error) {
      // Handle errors if the fetch fails
      console.error("Error:", error);
      alert("Ro'yxatdan o'tishda xatolik yuz berdi.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Agar +998 dan boshlansa va foydalanuvchi uni o'zgartirmoqchi bo'lsa
      if (value.length < 4) {
        return; // +998 ni o'chirish imkonini bermaymiz
      }
      // Faqat raqamlarni qabul qilamiz
      const numericValue = value.replace(/\D/g, "");

      // Raqamni formatlash
      let formattedValue = "+998";
      if (numericValue.length > 3) {
        formattedValue += " " + numericValue.slice(3, 6);
        if (numericValue.length > 6) {
          formattedValue += " " + numericValue.slice(6, 8);
          if (numericValue.length > 8) {
            formattedValue += " " + numericValue.slice(8, 10);
          }
        }
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhoneFocus = () => {
    if (!formData.phone.startsWith("+998")) {
      setFormData((prev) => ({
        ...prev,
        phone: "+998",
      }));
    }
  };

  const handleRoleChange = (value: string) => {
    setUserRole(value as UserRole);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ro'yxatdan o'tish
        </h2>

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
            onFocus={handlePhoneFocus}
            maxLength={16}
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
      <div className="mt-4">
        <AuthButtons />
        <div className="mt-2">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
