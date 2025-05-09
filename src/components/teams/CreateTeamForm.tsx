
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CreateTeamFormProps {
  onTeamCreated: (team: any) => void;
}

export function CreateTeamForm({ onTeamCreated }: CreateTeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [sportType, setSportType] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName || !sportType) {
      toast({
        title: "Missing information",
        description: "Please fill out the required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create a new team object
    const newTeam = {
      id: Date.now(),
      name: teamName,
      sport: sportType,
      members: 1,
      role: "Captain",
      avatar: ""
    };

    // Pass the new team to the parent component
    onTeamCreated(newTeam);
    
    // Reset the form
    setTeamName("");
    setSportType("");
    setDescription("");
    
    toast({
      title: "Team created!",
      description: `You have successfully created the team "${teamName}".`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name*</Label>
            <Input 
              id="team-name" 
              placeholder="Enter team name" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sport-type">Sport Type*</Label>
            <Select value={sportType} onValueChange={setSportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team-description">Team Description (Optional)</Label>
            <Input 
              id="team-description" 
              placeholder="Brief description of your team" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4 flex items-end">
          <Button type="submit" className="w-full md:mt-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </div>
      </div>
    </form>
  );
}
