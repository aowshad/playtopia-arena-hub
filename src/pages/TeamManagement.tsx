import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, PlusCircle, User, UserPlus } from "lucide-react";

// Mock data for teams
const myTeams = [
  { id: 1, name: "City Strikers", sport: "Football", members: 14, role: "Captain", avatar: "" },
  { id: 2, name: "Shuttle Stars", sport: "Badminton", members: 8, role: "Member", avatar: "" },
];

const availableTeams = [
  { id: 3, name: "Cricket Kings", sport: "Cricket", members: 11, avatar: "" },
  { id: 4, name: "Football United", sport: "Football", members: 17, avatar: "" },
  { id: 5, name: "Racket Masters", sport: "Badminton", members: 6, avatar: "" },
];

const invites = [
  { id: 1, teamName: "Bowling Legends", sport: "Bowling", invitedBy: "Sarah Johnson" },
];

const TeamManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Team Management</h1>
              <p className="text-gray-600">Create, join, and manage your sports teams</p>
            </div>
            <Button className="mt-4 md:mt-0" asChild>
              <div>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Team
              </div>
            </Button>
          </div>
          
          <Tabs defaultValue="myTeams" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="myTeams">My Teams</TabsTrigger>
              <TabsTrigger value="joinTeam">Join Team</TabsTrigger>
              <TabsTrigger value="invites">Invites</TabsTrigger>
            </TabsList>
            
            {/* My Teams Tab */}
            <TabsContent value="myTeams">
              {myTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myTeams.map(team => (
                    <Card key={team.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <div className="px-3 py-1 text-xs font-medium rounded-full bg-playtopia-field/10 text-playtopia-field">
                            {team.role}
                          </div>
                        </div>
                        <CardDescription>{team.sport}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{team.members} members</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Manage</Button>
                        <Button variant="outline" size="sm">
                          <UserPlus className="h-4 w-4 mr-1" />
                          Invite
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">You haven't joined any teams yet</p>
                    <Button>Create Your First Team</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Join Team Tab */}
            <TabsContent value="joinTeam">
              <div className="mb-6">
                <div className="max-w-md mx-auto mb-6">
                  <div className="relative">
                    <Input
                      placeholder="Search for teams..."
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-gray-500"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTeams.map(team => (
                    <Card key={team.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription>{team.sport}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{team.members} members</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" size="sm">Join Team</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Invites Tab */}
            <TabsContent value="invites">
              {invites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {invites.map(invite => (
                    <Card key={invite.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{invite.teamName}</CardTitle>
                        <CardDescription>{invite.sport}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Invited by {invite.invitedBy}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Decline</Button>
                        <Button size="sm">Accept</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No pending invites</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Create Team Form Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Create New Team</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input id="team-name" placeholder="Enter team name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sport-type">Sport Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="cricket">Cricket</SelectItem>
                        <SelectItem value="badminton">Badminton</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team-description">Team Description (Optional)</Label>
                    <Input id="team-description" placeholder="Brief description of your team" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamManagement;
