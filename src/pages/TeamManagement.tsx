
import React, { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TeamCard } from "@/components/teams/TeamCard";
import { CreateTeamForm } from "@/components/teams/CreateTeamForm";
import { InviteMemberDialog } from "@/components/teams/InviteMemberDialog";

// Initial mock data
const initialMyTeams = [
  { id: 1, name: "City Strikers", sport: "Football", members: 14, role: "Captain", avatar: "" },
  { id: 2, name: "Shuttle Stars", sport: "Badminton", members: 8, role: "Member", avatar: "" },
];

const initialAvailableTeams = [
  { id: 3, name: "Cricket Kings", sport: "Cricket", members: 11, avatar: "" },
  { id: 4, name: "Football United", sport: "Football", members: 17, avatar: "" },
  { id: 5, name: "Racket Masters", sport: "Badminton", members: 6, avatar: "" },
];

const initialInvites = [
  { id: 1, teamName: "Bowling Legends", sport: "Bowling", invitedBy: "Sarah Johnson" },
];

const TeamManagement = () => {
  const [myTeams, setMyTeams] = useState(initialMyTeams);
  const [availableTeams, setAvailableTeams] = useState(initialAvailableTeams);
  const [invites, setInvites] = useState(initialInvites);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  
  const { toast } = useToast();

  // Filter available teams based on search term
  const filteredAvailableTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamCreated = (newTeam: any) => {
    setMyTeams(prev => [...prev, newTeam]);
  };

  const handleJoinTeam = (teamId: number) => {
    const teamToJoin = availableTeams.find(team => team.id === teamId);
    if (teamToJoin) {
      // Add to my teams with role Member
      const joinedTeam = { ...teamToJoin, role: "Member" };
      setMyTeams(prev => [...prev, joinedTeam]);
      
      // Remove from available teams
      setAvailableTeams(prev => prev.filter(team => team.id !== teamId));
      
      toast({
        title: "Team Joined",
        description: `You have successfully joined ${teamToJoin.name}.`,
      });
    }
  };

  const handleAcceptInvite = (inviteId: number) => {
    const invite = invites.find(invite => invite.id === inviteId);
    if (invite) {
      // Add to my teams
      const newTeam = {
        id: Date.now(),
        name: invite.teamName,
        sport: invite.sport,
        members: Math.floor(Math.random() * 10) + 5, // Random number of members
        role: "Member",
        avatar: ""
      };
      
      setMyTeams(prev => [...prev, newTeam]);
      
      // Remove from invites
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
      
      toast({
        title: "Invitation Accepted",
        description: `You are now a member of ${invite.teamName}.`,
      });
    }
  };

  const handleDeclineInvite = (inviteId: number) => {
    setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    toast({
      title: "Invitation Declined",
      description: "You have declined the team invitation.",
    });
  };

  const handleManageTeam = (teamId: number) => {
    toast({
      title: "Team Management",
      description: "This would open team management settings.",
    });
  };

  const handleSendInvite = (teamId: number) => {
    const team = myTeams.find(team => team.id === teamId);
    if (team && team.role === "Captain") {
      setSelectedTeam(team);
      setInviteDialogOpen(true);
    } else {
      toast({
        title: "Permission Denied",
        description: "Only team captains can send invitations.",
        variant: "destructive"
      });
    }
  };

  const handleInviteMember = (email: string) => {
    if (selectedTeam) {
      toast({
        title: "Invitation Sent",
        description: `An invitation to join ${selectedTeam.name} has been sent to ${email}.`,
      });
    }
  };

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
            <Button 
              className="mt-4 md:mt-0" 
              onClick={() => window.scrollTo({
                top: document.getElementById("create-team-section")?.offsetTop || 0 - 100,
                behavior: "smooth"
              })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Team
            </Button>
          </div>
          
          <Tabs defaultValue="myTeams" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="myTeams">My Teams</TabsTrigger>
              <TabsTrigger value="joinTeam">Join Team</TabsTrigger>
              <TabsTrigger value="invites">Invites {invites.length > 0 && `(${invites.length})`}</TabsTrigger>
            </TabsList>
            
            {/* My Teams Tab */}
            <TabsContent value="myTeams">
              {myTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myTeams.map(team => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      type="my-team"
                      onManageTeam={handleManageTeam}
                      onSendInvite={handleSendInvite}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">You haven't joined any teams yet</p>
                    <Button onClick={() => window.scrollTo({
                      top: document.getElementById("create-team-section")?.offsetTop || 0 - 100,
                      behavior: "smooth"
                    })}>
                      Create Your First Team
                    </Button>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                  {filteredAvailableTeams.length > 0 ? (
                    filteredAvailableTeams.map(team => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        type="available-team"
                        onJoinTeam={handleJoinTeam}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 py-8 text-center">
                      <p className="text-gray-600">No teams found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Invites Tab */}
            <TabsContent value="invites">
              {invites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {invites.map(invite => (
                    <TeamCard
                      key={invite.id}
                      team={{ id: invite.id, name: invite.teamName, sport: invite.sport, members: 0 }}
                      type="invite"
                      invitedBy={invite.invitedBy}
                      onAcceptInvite={handleAcceptInvite}
                      onDeclineInvite={handleDeclineInvite}
                    />
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
          <div id="create-team-section" className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Create New Team</h2>
            <CreateTeamForm onTeamCreated={handleTeamCreated} />
          </div>
        </div>
      </main>
      
      {/* Invite Member Dialog */}
      {selectedTeam && (
        <InviteMemberDialog
          isOpen={inviteDialogOpen}
          teamName={selectedTeam.name}
          onClose={() => setInviteDialogOpen(false)}
          onInvite={handleInviteMember}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default TeamManagement;
