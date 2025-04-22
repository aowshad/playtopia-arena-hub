
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-playtopia-dark text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Playtopia Arena Hub</h3>
            <p className="text-sm text-gray-300">
              The ultimate platform for sports facility management, team organization, and tournament hosting.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/fields" className="hover:text-playtopia-field transition-colors">
                  Field Booking
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-playtopia-team transition-colors">
                  Team Management
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="hover:text-playtopia-energy transition-colors">
                  Tournaments
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Playtopia Arena Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
