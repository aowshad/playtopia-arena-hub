
import { Link } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-playtopia-light to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-playtopia-dark mb-4">
                Your Game, <span className="text-playtopia-field">Your Way</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Book sports facilities, manage teams, and join tournaments all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/fields">Explore Fields</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559579313-021b6ec9f6d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Sports field" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-playtopia-dark/70 to-transparent text-white p-4">
                  <p className="text-lg font-semibold">Multiple Sports Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-playtopia-field/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-playtopia-field" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Field Booking</h3>
              <p className="text-gray-600">
                Browse and book sports facilities for football, cricket, badminton and more.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-playtopia-team/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-playtopia-team" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Create teams, invite players, and organize your sports groups with ease.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-playtopia-energy/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-playtopia-energy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tournaments</h3>
              <p className="text-gray-600">
                Participate in tournaments, track schedules, and compete with other teams.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-playtopia-team text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Step Up Your Game?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of players and teams already using Playtopia Arena Hub.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-playtopia-team hover:bg-gray-100">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
