
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const upcomingBookings = [
  { id: 1, fieldName: "Football Field A", date: "2025-05-01", time: "18:00 - 19:30", location: "City Sports Complex" },
  { id: 2, fieldName: "Badminton Court 3", date: "2025-05-03", time: "10:00 - 12:00", location: "Indoor Arena" },
];

const teamsJoined = [
  { id: 1, name: "City Strikers", sport: "Football", members: 12, role: "Captain" },
  { id: 2, name: "Shuttle Stars", sport: "Badminton", members: 6, role: "Member" },
];

const upcomingTournaments = [
  { id: 1, name: "Summer Football Championship", date: "2025-05-15", teams: 16, status: "Registered" },
  { id: 2, name: "Badminton League", date: "2025-06-01", teams: 24, status: "Not Registered" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src="" />
                <AvatarFallback className="bg-playtopia-team text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-gray-600">Here's what's happening with your sports activities</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/fields">Book Field</Link>
              </Button>
              <Button asChild>
                <Link to="/tournaments">Join Tournament</Link>
              </Button>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Bookings</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/fields">Book New Field</Link>
                </Button>
              </div>
              
              {upcomingBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.fieldName}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{booking.date}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500 mb-4">You don't have any upcoming bookings</p>
                    <Button asChild>
                      <Link to="/fields">Book a Field</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Teams</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/teams/create">Create Team</Link>
                </Button>
              </div>
              
              {teamsJoined.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamsJoined.map((team) => (
                    <Card key={team.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription>{team.sport}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{team.members} members</span>
                          </div>
                          <div className="px-6 py-1 text-xs font-medium rounded-full bg-playtopia-field/10 text-playtopia-field inline-block mt-1">
                            {team.role}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/teams/${team.id}`}>Manage Team</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500 mb-4">You haven't joined any teams yet</p>
                    <Button asChild>
                      <Link to="/teams">Browse Teams</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tournaments</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tournaments">Browse All</Link>
                </Button>
              </div>
              
              {upcomingTournaments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingTournaments.map((tournament) => (
                    <Card key={tournament.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{tournament.name}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Starting: {tournament.date}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{tournament.teams} teams participating</span>
                          </div>
                          <div className={`px-6 py-1 text-xs font-medium rounded-full inline-block mt-1 ${
                            tournament.status === "Registered" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {tournament.status}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {tournament.status === "Registered" ? (
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                          </Button>
                        ) : (
                          <Button size="sm" className="w-full" asChild>
                            <Link to={`/tournaments/${tournament.id}/register`}>Register Now</Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500 mb-4">No tournaments available</p>
                    <Button asChild>
                      <Link to="/tournaments">Browse Tournaments</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
