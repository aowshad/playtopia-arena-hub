
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";

// Mock data - replace with actual data fetching later
const tournaments = [
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
    status: "Open for Registration",
    description: "Annual summer football tournament featuring top local teams.",
    rules: [
      "Teams must have at least 12 players",
      "Matches are 90 minutes long",
      "Registration closes one week before the tournament"
    ],
    contactEmail: "football.tournament@example.com"
  },
  // Add more tournaments...
];

const TournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournament = tournaments.find(t => t.id === Number(id));

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{tournament.name}</CardTitle>
                  <p className="text-gray-600 mt-2">{tournament.sport}</p>
                </div>
                <Badge variant="outline" className="text-playtopia-energy border-playtopia-energy">
                  {tournament.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Tournament Details</h2>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>
                        {tournament.startDate} to {tournament.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{tournament.teams} teams</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Trophy className="h-5 w-5 mr-2" />
                      <span>Prize: {tournament.prize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Tournament Rules</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {tournament.rules.map((rule, index) => (
                      <li key={index} className="text-gray-600">{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-600">{tournament.description}</p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline">
                  Download Rules PDF
                </Button>
                <Button>
                  Register Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TournamentDetails;
