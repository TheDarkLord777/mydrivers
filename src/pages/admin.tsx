'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, Loader2, MapPin, Clock, Users, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Trip {
  id: number;
  fromCity: string;
  toCity: string;
  departureTime: string;
  availableSeats: number;
  driverId: string;
}

const cities: string[] = [
  "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona", "Namangan",
  "Qashqadaryo", "Surxondaryo", "Xorazm", "Navoiy", "Jizzax", "Sirdaryo"
];

// Fake data
const fakeUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'taxi' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'taxi' },
]

const fakeTrips: Trip[] = [
  { id: 1, fromCity: "Toshkent", toCity: "Samarqand", departureTime: "10:00", availableSeats: 3, driverId: '3' },
  { id: 2, fromCity: "Buxoro", toCity: "Andijon", departureTime: "14:30", availableSeats: 2, driverId: '5' },
]

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('users')
  const { toast } = useToast()

  // New state for trip creation
  const [fromCity, setFromCity] = useState<string>('')
  const [toCity, setToCity] = useState<string>('')
  const [departureTime, setDepartureTime] = useState<string>('')
  const [availableSeats, setAvailableSeats] = useState<string>('4')
  const [selectedDriver, setSelectedDriver] = useState<string>('')

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setUsers(fakeUsers)
      setTrips(fakeTrips)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
    toast({
      title: "Foydalanuvchi o'chirildi",
      description: "Foydalanuvchi muvaffaqiyatli o'chirildi.",
    })
  }

  const handleEdit = (userData: User) => {
    if (!userData.name.trim() || !userData.email.trim() || !userData.role.trim()) {
      setError('Barcha maydonlar to\'ldirilishi shart')
      toast({
        title: "Xatolik",
        description: 'Barcha maydonlar to\'ldirilishi shart',
        variant: "destructive",
      })
      return
    }

    setUsers(users.map(user => 
      user.id === userData.id ? userData : user
    ))
    setIsEditDialogOpen(false)
    setEditingUser(null)
    toast({
      title: "Foydalanuvchi tahrirlandi",
      description: "Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi.",
    })
  }

  const handleAddTrip = () => {
    if (fromCity && toCity && departureTime && selectedDriver) {
      const newTrip: Trip = {
        id: Date.now(),
        fromCity,
        toCity,
        departureTime,
        availableSeats: parseInt(availableSeats),
        driverId: selectedDriver,
      };
      setTrips([...trips, newTrip]);
      // Reset form
      setFromCity('');
      setToCity('');
      setDepartureTime('');
      setAvailableSeats('4');
      setSelectedDriver('');
      toast({
        title: "Yo'nalish qo'shildi",
        description: "Yangi yo'nalish muvaffaqiyatli qo'shildi.",
      })
    } else {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive",
      })
    }
  };

  const handleUpdateSeats = (tripId: number, newSeats: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, availableSeats: parseInt(newSeats) } : trip
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTrips = trips.filter(trip =>
    trip.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.toCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.departureTime.includes(searchTerm)
  )

  const EditUserDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Foydalanuvchini tahrirlash</DialogTitle>
        </DialogHeader>
        {editingUser && (
          <form onSubmit={(e) => {
            e.preventDefault()
            handleEdit(editingUser)
          }} className="space-y-4">
            <Input
              placeholder="Ism"
              value={editingUser.name}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              required
            />
            <Select 
              value={editingUser.role} 
              onValueChange={(value) => setEditingUser({...editingUser, role: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rol tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="taxi">Taksi</SelectItem>
                <SelectItem value="user">Foydalanuvchi</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit">Saqlash</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          
          {error && (
            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Yuklanmoqda...</span>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
                <TabsTrigger value="taxis">Taksilar</TabsTrigger>
                <TabsTrigger value="trips">Yo'nalishlar</TabsTrigger>
              </TabsList>
              <TabsContent value="users">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ism</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.filter(user => user.role === 'user').map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingUser(user)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            Tahrirlash
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            O'chirish
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="taxis">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ism</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.filter(user => user.role === 'taxi').map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingUser(user)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            Tahrirlash
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            O'chirish
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="trips">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Yangi Yo'nalish Qo'shish</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
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
                        <div className="space-y-2">
                          <Label htmlFor="driver">Haydovchi</Label>
                          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                            <SelectTrigger id="driver">
                              <SelectValue placeholder="Haydovchi tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.filter(user => user.role === 'taxi').map(driver => (
                                <SelectItem key={driver.id} value={driver.id}>
                                  {driver.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleAddTrip} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Yo'nalish qo'shish
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Mavjud Yo'nalishlar</h2>
                    {filteredTrips.map(trip => (
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
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Haydovchi:</span>
                              <span>{users.find(user => user.id === trip.driverId)?.name || 'Noma`lum'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredTrips.length === 0 && (
                      <p className="text-center text-gray-500">Hozircha yo'nalishlar yo'q</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      
      <EditUserDialog />
    </div>
  )
}