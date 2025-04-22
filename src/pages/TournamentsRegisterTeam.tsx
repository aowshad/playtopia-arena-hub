
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const sportOptions = [
  { label: "Football", value: "football" },
  { label: "Badminton", value: "badminton" },
  { label: "Cricket", value: "cricket" },
  { label: "Basketball", value: "basketball" },
  { label: "Tennis", value: "tennis" },
];

type RegisterTeamFormData = {
  teamName: string;
  captainName: string;
  contactEmail: string;
  contactPhone: string;
  players: string;
  extraNotes: string;
};

export default function TournamentsRegisterTeam() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<RegisterTeamFormData>();

  const onSubmit = (data: RegisterTeamFormData) => {
    // Here you would typically send data to backend or Supabase.
    toast({
      title: "Team Registered!",
      description: "Your team registration was submitted successfully.",
    });
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full max-w-lg mx-auto mt-20 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Register Your Team</CardTitle>
            <CardDescription>
              Register your team for the tournament. Please fill in all required information.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input id="teamName" required {...register("teamName", { required: "Team name is required" })} />
                {errors.teamName && <span className="text-xs text-red-600">{errors.teamName.message}</span>}
              </div>
              <div>
                <Label htmlFor="captainName">Captain's Name</Label>
                <Input id="captainName" required {...register("captainName", { required: "Captain's name is required" })} />
                {errors.captainName && <span className="text-xs text-red-600">{errors.captainName.message}</span>}
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  required
                  {...register("contactEmail", { required: "Email is required" })}
                />
                {errors.contactEmail && <span className="text-xs text-red-600">{errors.contactEmail.message}</span>}
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  required
                  {...register("contactPhone", { required: "Phone number is required" })}
                />
                {errors.contactPhone && <span className="text-xs text-red-600">{errors.contactPhone.message}</span>}
              </div>
              <div>
                <Label htmlFor="players">
                  Player Names <span className="font-normal text-xs text-gray-500">(comma separated)</span>
                </Label>
                <Textarea
                  id="players"
                  placeholder="e.g. John Doe, Jane Smith, ... "
                  rows={3}
                  {...register("players", { required: "Please provide at least one player." })}
                />
                {errors.players && <span className="text-xs text-red-600">{errors.players.message}</span>}
              </div>
              <div>
                <Label htmlFor="extraNotes">Extra Notes <span className="text-xs text-gray-400">(optional)</span></Label>
                <Textarea
                  id="extraNotes"
                  placeholder="Let us know if you have any special requests"
                  rows={2}
                  {...register("extraNotes")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">Register Team</Button>
              <Button variant="outline" type="button" asChild>
                <Link to="/tournaments">Back to Tournaments</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center mt-6 text-gray-500 text-sm">
          By registering, you confirm that all provided information is accurate and you've agreed to the tournament's rules.
        </div>
      </div>
    </div>
  );
}
