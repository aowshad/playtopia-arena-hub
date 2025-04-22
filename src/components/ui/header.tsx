import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-playtopia-field flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-playtopia-dark hidden sm:inline-block">MatthPeriye</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/fields" className="text-gray-600 hover:text-playtopia-field transition-colors">
              Fields
            </Link>
            <Link to="/teams" className="text-gray-600 hover:text-playtopia-team transition-colors">
              Teams
            </Link>
            <Link to="/tournaments" className="text-gray-600 hover:text-playtopia-energy transition-colors">
              Tournaments
            </Link>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/fields" className="block py-2 text-gray-600 hover:text-playtopia-field transition-colors">
              Fields
            </Link>
            <Link to="/teams" className="block py-2 text-gray-600 hover:text-playtopia-team transition-colors">
              Teams
            </Link>
            <Link to="/tournaments" className="block py-2 text-gray-600 hover:text-playtopia-energy transition-colors">
              Tournaments
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>}
    </header>;
}