
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Edit, Plus, Trash2 } from "lucide-react";

// Mock tournament data
const mockTournaments = [
  {
    id: 1,
    name: "Summer Football Championship",
    sport: "Football",
    startDate: "2025-06-10",
    endDate: "2025-06-25",
    venue: "North Complex",
    registrationFee: 5000,
    teamsRegistered: 8,
    maxTeams: 16,
    status: "Upcoming"
  },
  {
    id: 2,
    name: "Bangadesh Indoor Badminton League",
    sport: "Badminton",
    startDate: "2025-05-15",
    endDate: "2025-06-05",
    venue: "Indoor Arena",
    registrationFee: 3000,
    teamsRegistered: 12,
    maxTeams: 12,
    status: "Registration Closed"
  },
  {
    id: 3,
    name: "City Cricket Cup",
    sport: "Cricket",
    startDate: "2025-07-01",
    endDate: "2025-07-20",
    venue: "East Wing",
    registrationFee: 7500,
    teamsRegistered: 4,
    maxTeams: 10,
    status: "Open for Registration"
  },
  {
    id: 4,
    name: "School Basketball Tournament",
    sport: "Basketball",
    startDate: "2025-05-02",
    endDate: "2025-05-10",
    venue: "Indoor Arena",
    registrationFee: 2500,
    teamsRegistered: 8,
    maxTeams: 8,
    status: "In Progress"
  },
];

// Mock teams data
const mockTeams = [
  { id: 1, name: "City Strikers", sport: "Football", members: 18, coach: "Ahmed Hasan" },
  { id: 2, name: "Royal Tigers", sport: "Cricket", members: 16, coach: "Mashrafe Murtaza" },
  { id: 3, name: "Shuttle Stars", sport: "Badminton", members: 8, coach: "Nasir Uddin" },
  { id: 4, name: "Hoop Heroes", sport: "Basketball", members: 12, coach: "Rakibul Islam" },
  { id: 5, name: "Football United", sport: "Football", members: 22, coach: "Saiful Islam" },
  { id: 6, name: "Racket Masters", sport: "Badminton", members: 6, coach: "Sana Rahman" },
];

const mockSchedules = [
  {
    id: 1,
    tournamentId: 4,
    match: "City Strikers vs Football United",
    date: "2025-05-02",
    time: "15:00",
    venue: "Football Field A",
    status: "Completed",
    result: "3-1"
  },
  {
    id: 2,
    tournamentId: 4,
    match: "Hoop Heroes vs Phoenix Basketball",
    date: "2025-05-03",
    time: "14:00",
    venue: "Basketball Court B",
    status: "Completed",
    result: "78-65"
  },
  {
    id: 3,
    tournamentId: 4,
    match: "Finals: TBD vs TBD",
    date: "2025-05-10",
    time: "16:00",
    venue: "Indoor Arena",
    status: "Scheduled",
    result: "-"
  },
];

const AdminTournamentManagement = () => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [teams, setTeams] = useState(mockTeams);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [isAddTournamentOpen, setIsAddTournamentOpen] = useState(false);
  const [isEditTournamentOpen, setIsEditTournamentOpen] = useState(false);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [selectedTournamentForSchedule, setSelectedTournamentForSchedule] = useState<any>(null);
  const [newTournament, setNewTournament] = useState({
    name: "",
    sport: "",
    startDate: "",
    endDate: "",
    venue: "",
    registrationFee: 0,
    maxTeams: 0,
    status: "Open for Registration"
  });
  const [newSchedule, setNewSchedule] = useState({
    match: "",
    date: "",
    time: "",
    venue: "",
    status: "Scheduled"
  });

  const handleAddTournament = () => {
    const tournamentToAdd = {
      ...newTournament,
      id: tournaments.length + 1,
      teamsRegistered: 0
    };
    setTournaments([...tournaments, tournamentToAdd]);
    setNewTournament({
      name: "",
      sport: "",
      startDate: "",
      endDate: "",
      venue: "",
      registrationFee: 0,
      maxTeams: 0,
      status: "Open for Registration"
    });
    setIsAddTournamentOpen(false);
  };

  const handleEditTournament = () => {
    if (!selectedTournament) return;
    
    const updatedTournaments = tournaments.map(tournament => 
      tournament.id === selectedTournament.id ? selectedTournament : tournament
    );
    
    setTournaments(updatedTournaments);
    setIsEditTournamentOpen(false);
  };

  const handleDeleteTournament = (id: number) => {
    setTournaments(tournaments.filter(tournament => tournament.id !== id));
    // Also delete related schedules
    setSchedules(schedules.filter(schedule => schedule.tournamentId !== id));
  };

  const handleEditClick = (tournament: any) => {
    setSelectedTournament(tournament);
    setIsEditTournamentOpen(true);
  };

  const handleAddSchedule = () => {
    if (!selectedTournamentForSchedule) return;
    
    const scheduleToAdd = {
      ...newSchedule,
      id: schedules.length + 1,
      tournamentId: selectedTournamentForSchedule.id,
      result: "-"
    };
    
    setSchedules([...schedules, scheduleToAdd]);
    setNewSchedule({
      match: "",
      date: "",
      time: "",
      venue: "",
      status: "Scheduled"
    });
    setIsAddScheduleOpen(false);
  };

  const filteredSchedules = (tournamentId: number) => {
    return schedules.filter(schedule => schedule.tournamentId === tournamentId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Tabs defaultValue="tournaments">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="schedules">Game Schedules</TabsTrigger>
            </TabsList>
            
            <Dialog open={isAddTournamentOpen} onOpenChange={setIsAddTournamentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tournament
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Create New Tournament</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tournament Name</Label>
                      <Input 
                        id="name" 
                        value={newTournament.name} 
                        onChange={(e) => setNewTournament({...newTournament, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sport">Sport</Label>
                      <Input 
                        id="sport" 
                        value={newTournament.sport} 
                        onChange={(e) => setNewTournament({...newTournament, sport: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={newTournament.startDate} 
                        onChange={(e) => setNewTournament({...newTournament, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={newTournament.endDate} 
                        onChange={(e) => setNewTournament({...newTournament, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input 
                        id="venue" 
                        value={newTournament.venue} 
                        onChange={(e) => setNewTournament({...newTournament, venue: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationFee">Registration Fee (BDT)</Label>
                      <Input 
                        id="registrationFee"
                        type="number"
                        value={newTournament.registrationFee.toString()} 
                        onChange={(e) => setNewTournament({...newTournament, registrationFee: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxTeams">Maximum Teams</Label>
                      <Input 
                        id="maxTeams"
                        type="number"
                        value={newTournament.maxTeams.toString()} 
                        onChange={(e) => setNewTournament({...newTournament, maxTeams: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input 
                        id="status" 
                        value={newTournament.status} 
                        onChange={(e) => setNewTournament({...newTournament, status: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" onClick={() => setIsAddTournamentOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddTournament}>Create Tournament</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="tournaments">
            <Card>
              <CardHeader>
                <CardTitle>All Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Fee (BDT)</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournaments.map((tournament) => (
                      <TableRow key={tournament.id}>
                        <TableCell className="font-medium">{tournament.name}</TableCell>
                        <TableCell>{tournament.sport}</TableCell>
                        <TableCell>{tournament.startDate} to {tournament.endDate}</TableCell>
                        <TableCell>{tournament.venue}</TableCell>
                        <TableCell>{tournament.registrationFee}</TableCell>
                        <TableCell>{tournament.teamsRegistered}/{tournament.maxTeams}</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 text-xs font-medium rounded-full 
                              ${tournament.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                tournament.status === 'Open for Registration' ? 'bg-green-100 text-green-800' : 
                                tournament.status === 'Registration Closed' ? 'bg-orange-100 text-orange-800' : 
                                tournament.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            {tournament.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleEditClick(tournament)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 text-red-500"
                              onClick={() => handleDeleteTournament(tournament.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setSelectedTournamentForSchedule(tournament);
                                setIsAddScheduleOpen(true);
                              }}
                            >
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>All Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Coach</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.sport}</TableCell>
                        <TableCell>{team.members}</TableCell>
                        <TableCell>{team.coach}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Schedules</CardTitle>
              </CardHeader>
              <CardContent>
                {tournaments.map((tournament) => {
                  const tournamentSchedules = filteredSchedules(tournament.id);
                  
                  return tournamentSchedules.length > 0 ? (
                    <div key={tournament.id} className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">{tournament.name}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Match</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tournamentSchedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                              <TableCell className="font-medium">{schedule.match}</TableCell>
                              <TableCell>{schedule.date}</TableCell>
                              <TableCell>{schedule.time}</TableCell>
                              <TableCell>{schedule.venue}</TableCell>
                              <TableCell>
                                <span 
                                  className={`px-2 py-1 text-xs font-medium rounded-full 
                                    ${schedule.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                                      schedule.status === 'Live' ? 'bg-green-100 text-green-800' : 
                                      'bg-gray-100 text-gray-800'}`}
                                >
                                  {schedule.status}
                                </span>
                              </TableCell>
                              <TableCell>{schedule.result}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Update</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : null;
                })}

                {schedules.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No schedules added yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Edit Tournament Dialog */}
        <Dialog open={isEditTournamentOpen} onOpenChange={setIsEditTournamentOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Tournament</DialogTitle>
            </DialogHeader>
            {selectedTournament && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Tournament Name</Label>
                    <Input 
                      id="edit-name" 
                      value={selectedTournament.name} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-sport">Sport</Label>
                    <Input 
                      id="edit-sport" 
                      value={selectedTournament.sport} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, sport: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate">Start Date</Label>
                    <Input 
                      id="edit-startDate"
                      type="date"
                      value={selectedTournament.startDate} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-endDate">End Date</Label>
                    <Input 
                      id="edit-endDate"
                      type="date"
                      value={selectedTournament.endDate} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-venue">Venue</Label>
                    <Input 
                      id="edit-venue" 
                      value={selectedTournament.venue} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, venue: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-registrationFee">Registration Fee (BDT)</Label>
                    <Input 
                      id="edit-registrationFee"
                      type="number"
                      value={selectedTournament.registrationFee.toString()} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, registrationFee: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-maxTeams">Maximum Teams</Label>
                    <Input 
                      id="edit-maxTeams"
                      type="number"
                      value={selectedTournament.maxTeams.toString()} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, maxTeams: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Input 
                      id="edit-status" 
                      value={selectedTournament.status} 
                      onChange={(e) => setSelectedTournament({...selectedTournament, status: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" onClick={() => setIsEditTournamentOpen(false)}>Cancel</Button>
                  <Button onClick={handleEditTournament}>Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Add Schedule Dialog */}
        <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>
                Add Game to {selectedTournamentForSchedule?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="match">Match (e.g. Team A vs Team B)</Label>
                <Input 
                  id="match" 
                  value={newSchedule.match} 
                  onChange={(e) => setNewSchedule({...newSchedule, match: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date"
                    type="date"
                    value={newSchedule.date} 
                    onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time"
                    type="time"
                    value={newSchedule.time} 
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input 
                  id="venue" 
                  value={newSchedule.venue} 
                  onChange={(e) => setNewSchedule({...newSchedule, venue: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setIsAddScheduleOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSchedule}>Add Game</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTournamentManagement;
