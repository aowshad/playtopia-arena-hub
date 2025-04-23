import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, Trophy, Mail, Phone, Key } from "lucide-react";

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joinedDate: "January 15, 2025",
  avatar: "",
};

const bookingHistory = [
  { id: 1, fieldName: "Football Field A", date: "2025-04-15", time: "18:00 - 19:30", status: "Completed" },
  { id: 2, fieldName: "Badminton Court 3", date: "2025-04-10", time: "10:00 - 12:00", status: "Completed" },
  { id: 3, fieldName: "Cricket Ground 1", date: "2025-03-25", time: "15:00 - 17:00", status: "Cancelled" },
];

const tournamentHistory = [
  { id: 1, name: "Winter Football Cup", date: "February 2025", result: "Quarter-finals", team: "City Strikers" },
  { id: 2, name: "Badminton Tournament", date: "March 2025", result: "Runner-up", team: "Shuttle Stars" },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-gray-600">Manage your personal information and review your activity</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-4 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-playtopia-team text-white text-2xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <CardDescription>Member since {userData.joinedDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{userData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{userData.phone}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <div className="lg:col-span-2">
              {isEditing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <Input
                          id="avatar"
                          name="avatar"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                      
                      <div className="pt-4 space-x-2">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="activity" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="activity">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            Booking History
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {bookingHistory.length > 0 ? (
                            <div className="divide-y">
                              {bookingHistory.map(booking => (
                                <div key={booking.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <p className="font-medium">{booking.fieldName}</p>
                                    <p className="text-sm text-gray-500">{booking.date}, {booking.time}</p>
                                  </div>
                                  <div className={`mt-2 sm:mt-0 px-3 py-1 text-xs font-medium rounded-full inline-block ${
                                    booking.status === 'Completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {booking.status}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">No booking history</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Trophy className="h-5 w-5 mr-2" />
                            Tournament Participation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {tournamentHistory.length > 0 ? (
                            <div className="divide-y">
                              {tournamentHistory.map(tournament => (
                                <div key={tournament.id} className="py-3">
                                  <p className="font-medium">{tournament.name}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1">
                                    <span>{tournament.date}</span>
                                    <span className="hidden sm:inline mx-2">•</span>
                                    <span>Team: {tournament.team}</span>
                                    <span className="hidden sm:inline mx-2">•</span>
                                    <span>Result: {tournament.result}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">No tournament history</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Manage your password and security settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="Enter your current password"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="Enter a new password"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your new password"
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button>Change Password</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
