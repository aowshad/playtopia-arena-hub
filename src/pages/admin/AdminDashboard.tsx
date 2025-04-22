
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Trophy, BarChart, Activity, Settings } from "lucide-react";

// Mock admin statistics data
const adminStats = {
  totalUsers: 256,
  activeUsers: 187,
  totalBookings: 432,
  upcomingBookings: 54,
  totalTeams: 48,
  activeTournaments: 3,
  revenue: "$8,750",
  pendingPayments: "$1,250",
  pendingRequests: 8
};

const AdminDashboard = () => {
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
          <Link to="/admin" className="flex items-center space-x-2 px-4 py-3 bg-gray-800 border-l-4 border-playtopia-field text-white">
            <BarChart size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link to="/admin/fields" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Calendar size={20} />
            <span>Fields</span>
          </Link>
          <Link to="/admin/teams" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Users size={20} />
            <span>Teams</span>
          </Link>
          <Link to="/admin/tournaments" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Trophy size={20} />
            <span>Tournaments</span>
          </Link>
          
          <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">System</div>
          <Link to="/admin/payments" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Activity size={20} />
            <span>Payments</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-playtopia-field/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-playtopia-field" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                    <p className="text-3xl font-bold">{adminStats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-playtopia-team/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-playtopia-team" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <span>+8% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Tournaments</p>
                    <p className="text-3xl font-bold">{adminStats.activeTournaments}</p>
                  </div>
                  <div className="w-12 h-12 bg-playtopia-energy/10 rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-playtopia-energy" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-yellow-600">
                  <span>Same as last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <p className="text-3xl font-bold">{adminStats.revenue}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <span>+15% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Admin Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 max-w-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>User registrations and activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">User activity chart would display here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Statistics</CardTitle>
                    <CardDescription>Field bookings by sport type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Booking statistics chart would display here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest platform activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="h-9 w-9 rounded-full bg-playtopia-field/10 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-playtopia-field" />
                        </div>
                        <div>
                          <p className="font-medium">New user registered</p>
                          <p className="text-sm text-gray-500">Sarah Johnson registered an account</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-9 w-9 rounded-full bg-playtopia-team/10 flex items-center justify-center mr-3">
                          <Calendar className="h-5 w-5 text-playtopia-team" />
                        </div>
                        <div>
                          <p className="font-medium">Field booking confirmed</p>
                          <p className="text-sm text-gray-500">Football Field A booked for 18:00 - 19:30</p>
                          <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-9 w-9 rounded-full bg-playtopia-energy/10 flex items-center justify-center mr-3">
                          <Trophy className="h-5 w-5 text-playtopia-energy" />
                        </div>
                        <div>
                          <p className="font-medium">New tournament registration</p>
                          <p className="text-sm text-gray-500">City Strikers registered for Summer Football Championship</p>
                          <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Payment received</p>
                          <p className="text-sm text-gray-500">$75 payment received for tournament registration</p>
                          <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest field bookings across all facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">User</th>
                          <th scope="col" className="px-6 py-3">Field</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Time</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
                          <td className="px-6 py-4">Football Field A</td>
                          <td className="px-6 py-4">2025-05-01</td>
                          <td className="px-6 py-4">18:00 - 19:30</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">Sarah Johnson</td>
                          <td className="px-6 py-4">Badminton Court 3</td>
                          <td className="px-6 py-4">2025-05-03</td>
                          <td className="px-6 py-4">10:00 - 12:00</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">Michael Brown</td>
                          <td className="px-6 py-4">Cricket Ground 1</td>
                          <td className="px-6 py-4">2025-05-05</td>
                          <td className="px-6 py-4">15:00 - 17:00</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Verification</CardTitle>
                  <CardDescription>Pending payment verifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">User</th>
                          <th scope="col" className="px-6 py-3">Amount</th>
                          <th scope="col" className="px-6 py-3">Transaction ID</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Type</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">Emma Davis</td>
                          <td className="px-6 py-4">$75</td>
                          <td className="px-6 py-4">TRX89012345</td>
                          <td className="px-6 py-4">2025-04-22</td>
                          <td className="px-6 py-4">
                            Tournament Registration
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                              Reject
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">Ryan Wilson</td>
                          <td className="px-6 py-4">$40</td>
                          <td className="px-6 py-4">TRX78901234</td>
                          <td className="px-6 py-4">2025-04-21</td>
                          <td className="px-6 py-4">
                            Field Booking
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                              Reject
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Requests Tab */}
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Game Requests</CardTitle>
                  <CardDescription>Pending game and match requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Requesting Team</th>
                          <th scope="col" className="px-6 py-3">Opponent Team</th>
                          <th scope="col" className="px-6 py-3">Sport</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Venue</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">City Strikers</td>
                          <td className="px-6 py-4">Football United</td>
                          <td className="px-6 py-4">Football</td>
                          <td className="px-6 py-4">2025-05-10</td>
                          <td className="px-6 py-4">Football Field A</td>
                          <td className="px-6 py-4 space-x-2">
                            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                              Reject
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">Shuttle Stars</td>
                          <td className="px-6 py-4">Racket Masters</td>
                          <td className="px-6 py-4">Badminton</td>
                          <td className="px-6 py-4">2025-05-08</td>
                          <td className="px-6 py-4">Badminton Court 1</td>
                          <td className="px-6 py-4 space-x-2">
                            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                              Reject
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
