import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Clock, Users } from "lucide-react";

// Define interfaces for type safety
interface Taxi {
  id: number;
  number: string;
  phone: string;
  departureTime: string;
}

const cities: string[] = [
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Xorazm",
  "Navoiy",
  "Jizzax",
  "Sirdaryo",
];

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [fromCity, setFromCity] = useState<string>("");
  const [taxis, setTaxis] = useState<Taxi[]>([]);

  const handleCitySelect = (city: string): void => {
    setSelectedCity(city);
    // Mock taxi data
    setTaxis([
      {
        id: 1,
        number: "AA 123 B",
        phone: "+998 90 123 45 67",
        departureTime: "14:00",
      },
      {
        id: 2,
        number: "AA 567 B",
        phone: "+998 90 234 56 78",
        departureTime: "15:30",
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Drivers Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* City Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shaharlar</h2>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </div>

            {/* From City Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Qayerdan</h2>
              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Shahar tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Taxi List */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Taksilar</h2>
            <div className="grid gap-4">
              {taxis.map((taxi) => (
                <Card key={taxi.id}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <div className="inline-flex items-center justify-center border-4 border-black rounded-lg bg-white p-1 w-[220px]">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-6 h-4 flex flex-col">
                                  <div className="h-[33%] bg-[#0099B5]"></div>
                                  <div className="h-[33%] bg-white"></div>
                                  <div className="h-[33%] bg-[#1EB53A]"></div>
                                  {/* Qizil chiziqlar */}
                                  <div className="h-[2px] bg-[#CE1126] absolute mt-[5px] w-6"></div>
                                  <div className="h-[2px] bg-[#CE1126] absolute mt-[9px] w-6"></div>
                                </div>
                                
                              </div>

                              {/* Raqam */}
                              <span className="font-bold text-xl px-2">
                                {taxi.number}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>Telefon: {taxi.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Jo'nash vaqti: {taxi.departureTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Bo'sh o'rinlar:</span>
                          <Select defaultValue="1">
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="0" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
