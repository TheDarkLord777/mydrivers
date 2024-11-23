import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Users, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Trip {
  id: number;
  fromCity: string;
  toCity: string;
  departureTime: string;
  availableSeats: number;
}

const cities: string[] = [
  "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona", "Namangan",
  "Qashqadaryo", "Surxondaryo", "Xorazm", "Navoiy", "Jizzax", "Sirdaryo"
];

export default function TaxiDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [departureTime, setDepartureTime] = useState<string>('');
  const [availableSeats, setAvailableSeats] = useState<string>('4');

  const handleAddTrip = () => {
    if (fromCity && toCity && departureTime) {
      const newTrip: Trip = {
        id: Date.now(),
        fromCity,
        toCity,
        departureTime,
        availableSeats: parseInt(availableSeats),
      };
      setTrips([...trips, newTrip]);
      // Reset form
      setFromCity('');
      setToCity('');
      setDepartureTime('');
      setAvailableSeats('4');
    }
  };

  const handleUpdateSeats = (tripId: number, newSeats: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, availableSeats: parseInt(newSeats) } : trip
    ));
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Taksi Haydovchisi Boshqaruv Paneli</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Trip Creation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Yangi Yo'nalish Qo'shish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromCity">Qayerdan</Label>
                  <Select value={fromCity} onValueChange={setFromCity}>
                    <SelectTrigger id="fromCity">
                      <SelectValue placeholder="Shahar tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toCity">Qayerga</Label>
                  <Select value={toCity} onValueChange={setToCity}>
                    <SelectTrigger id="toCity">
                      <SelectValue placeholder="Shahar tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureTime">Jo'nash vaqti</Label>
                  <Input
                    id="departureTime"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSeats">Bo'sh o'rinlar</Label>
                  <Select value={availableSeats} onValueChange={setAvailableSeats}>
                    <SelectTrigger id="availableSeats">
                      <SelectValue placeholder="O'rinlar soni" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddTrip} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Yo'nalish qo'shish
                </Button>
              </CardContent>
            </Card>

            {/* Trip List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Mening Yo'nalishlarim</h2>
              {trips.map(trip => (
                <Card key={trip.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{trip.fromCity} - {trip.toCity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Jo'nash vaqti: {trip.departureTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Bo'sh o'rinlar:</span>
                        <Select 
                          value={trip.availableSeats.toString()} 
                          onValueChange={(value) => handleUpdateSeats(trip.id, value)}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {trips.length === 0 && (
                <p className="text-center text-gray-500">Hozircha yo'nalishlar yo'q</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}