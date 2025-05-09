
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    sport: string;
    members: number;
    role?: string;
    avatar?: string;
  };
  type: "my-team" | "available-team" | "invite";
  invitedBy?: string;
  onAcceptInvite?: (teamId: number) => void;
  onDeclineInvite?: (teamId: number) => void;
  onJoinTeam?: (teamId: number) => void;
  onManageTeam?: (teamId: number) => void;
  onSendInvite?: (teamId: number) => void;
}

export function TeamCard({
  team,
  type,
  invitedBy,
  onAcceptInvite,
  onDeclineInvite,
  onJoinTeam,
  onManageTeam,
  onSendInvite
}: TeamCardProps) {
  const { toast } = useToast();

  const handleSendInvite = () => {
    if (onSendInvite) {
      onSendInvite(team.id);
    } else {
      toast({
        title: "Invite Management",
        description: "This functionality would send invites to new members.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        {type === "my-team" ? (
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{team.name}</CardTitle>
            {team.role && (
              <div className="px-3 py-1 text-xs font-medium rounded-full bg-playtopia-field/10 text-playtopia-field">
                {team.role}
              </div>
            )}
          </div>
        ) : (
          <CardTitle className="text-lg">{team.name}</CardTitle>
        )}
        <CardDescription>{team.sport}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {type === "invite" ? (
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>Invited by {invitedBy}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{team.members} members</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {type === "my-team" && (
          <>
            <Button variant="outline" size="sm" onClick={() => onManageTeam && onManageTeam(team.id)}>
              <Settings className="h-4 w-4 mr-1" />
              Manage
            </Button>
            {team.role === "Captain" && (
              <Button variant="outline" size="sm" onClick={handleSendInvite}>
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            )}
          </>
        )}
        
        {type === "available-team" && (
          <Button className="w-full" size="sm" onClick={() => onJoinTeam && onJoinTeam(team.id)}>
            Join Team
          </Button>
        )}
        
        {type === "invite" && (
          <>
            <Button variant="outline" size="sm" onClick={() => onDeclineInvite && onDeclineInvite(team.id)}>
              Decline
            </Button>
            <Button size="sm" onClick={() => onAcceptInvite && onAcceptInvite(team.id)}>
              Accept
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
