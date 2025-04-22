
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for tournaments
const upcomingTournaments = [
  { 
    id: 1, 
    name: "Summer Football Championship", 
    sport: "Football",
    startDate: "2025-05-15", 
    endDate: "2025-05-30", 
    location: "City Sports Complex",
    teams: 16, 
    registrationOpen: true,
    prize: "$1,000",
    entryFee: "$100 per team",
    status: "Open for Registration"
  },
  { 
    id: 2, 
    name: "Badminton League", 
    sport: "Badminton",
    startDate: "2025-06-01", 
    endDate: "2025-06-15", 
    location: "Indoor Sports Arena",
    teams: 24, 
    registrationOpen: true,
    prize: "$750",
    entryFee: "$75 per team",
    status: "Open for Registration"
  },
  { 
    id: 3, 
    name: "Cricket Tournament", 
    sport: "Cricket",
    startDate: "2025-05-20", 
    endDate: "2025-06-10", 
    location: "National Cricket Stadium",
    teams: 8, 
    registrationOpen: true,
    prize: "$1,500",
    entryFee: "$150 per team",
    status: "Open for Registration"
  },
];

const ongoingTournaments = [
  { 
    id: 4, 
    name: "Spring Basketball Tournament", 
    sport: "Basketball",
    startDate: "2025-04-10", 
    endDate: "2025-05-10", 
    location: "Downtown Arena",
    teams: 12, 
    registrationOpen: false,
    prize: "$800",
    entryFee: "$80 per team",
    status: "In Progress"
  },
];

const pastTournaments = [
  { 
    id: 5, 
    name: "Winter Football Cup", 
    sport: "Football",
    startDate: "2025-01-15", 
    endDate: "2025-02-15", 
    location: "City Sports Complex",
    teams: 16, 
    registrationOpen: false,
    prize: "$1,200",
    entryFee: "$120 per team",
    status: "Completed",
    winner: "Red Dragons FC"
  },
  { 
    id: 6, 
    name: "Tennis Open", 
    sport: "Tennis",
    startDate: "2025-03-01", 
    endDate: "2025-03-15", 
    location: "Tennis Center",
    teams: 32, 
    registrationOpen: false,
    prize: "$2,000",
    entryFee: "$50 per player",
    status: "Completed",
    winner: "James Wilson"
  },
];

const Tournaments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tournaments</h1>
            <p className="text-gray-600">Register your team and compete in exciting sports tournaments</p>
          </div>
          
          <Tabs defaultValue="upcoming" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Tournaments Tab */}
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingTournaments.map(tournament => (
                  <Card key={tournament.id} className="overflow-hidden">
                    <div className="h-3 bg-playtopia-energy w-full"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <CardDescription>{tournament.sport}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-playtopia-energy border-playtopia-energy">
                          {tournament.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {tournament.startDate} to {tournament.endDate}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{tournament.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{tournament.teams} teams</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>Prize: {tournament.prize}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600">
                            Entry Fee: {tournament.entryFee}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                      </Button>
                      {tournament.registrationOpen && (
                        <Button asChild>
                          <Link to={`/tournaments/${tournament.id}/register`}>Register Team</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Ongoing Tournaments Tab */}
            <TabsContent value="ongoing">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {ongoingTournaments.map(tournament => (
                  <Card key={tournament.id} className="overflow-hidden">
                    <div className="h-3 bg-playtopia-team w-full"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <CardDescription>{tournament.sport}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-playtopia-team border-playtopia-team">
                          {tournament.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {tournament.startDate} to {tournament.endDate}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{tournament.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{tournament.teams} teams</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>Prize: {tournament.prize}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/tournaments/${tournament.id}/schedule`}>View Schedule</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {ongoingTournaments.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No ongoing tournaments at the moment</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Past Tournaments Tab */}
            <TabsContent value="past">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pastTournaments.map(tournament => (
                  <Card key={tournament.id} className="overflow-hidden">
                    <div className="h-3 bg-gray-400 w-full"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <CardDescription>{tournament.sport}</CardDescription>
                        </div>
                        <Badge variant="outline">
                          {tournament.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {tournament.startDate} to {tournament.endDate}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{tournament.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{tournament.teams} teams</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>Winner: {tournament.winner}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/tournaments/${tournament.id}`}>View Results</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* How It Works Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-center">How Tournaments Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-playtopia-field/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-playtopia-field">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Register Your Team</h3>
                <p className="text-gray-600">
                  Choose a tournament, select your team, and complete the registration process.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-playtopia-team/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-playtopia-team">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Play Your Matches</h3>
                <p className="text-gray-600">
                  Show up at the scheduled time, play your matches, and record the results.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-playtopia-energy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-playtopia-energy">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Win Prizes</h3>
                <p className="text-gray-600">
                  Advance through the tournament brackets and compete for prizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
