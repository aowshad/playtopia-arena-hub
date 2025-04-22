
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  BarChart, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Trophy, 
  Users
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-playtopia-dark text-white fixed h-full">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-playtopia-field flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-bold">
              Admin Panel
            </span>
          </div>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Main</div>
          <Link to="/admin" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <BarChart size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/users') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link to="/admin/fields" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/fields') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <Calendar size={20} />
            <span>Fields</span>
          </Link>
          <Link to="/admin/tournaments" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/tournaments') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <Trophy size={20} />
            <span>Tournaments</span>
          </Link>
          <Link to="/admin/game-requests" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/game-requests') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <MessageSquare size={20} />
            <span>Game Requests</span>
          </Link>
          
          <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">System</div>
          <Link to="/admin/payments" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/payments') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <Activity size={20} />
            <span>Payments</span>
          </Link>
          <Link to="/admin/settings" className={`flex items-center space-x-2 px-4 py-3 ${isActive('/admin/settings') ? 'bg-gray-800 border-l-4 border-playtopia-field text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}`}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Back to Site</span>
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 w-full">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin User
              </div>
              <div className="h-8 w-8 rounded-full bg-playtopia-team flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
