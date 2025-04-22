
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Edit, Search, UserCheck, UserX } from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    joinDate: "2025-02-15",
    status: "Active",
    type: "Player",
    lastLogin: "2025-04-20"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+8801812345678",
    joinDate: "2025-03-01",
    status: "Active",
    type: "Team Manager",
    lastLogin: "2025-04-21"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+8801912345678",
    joinDate: "2025-03-10",
    status: "Inactive",
    type: "Player",
    lastLogin: "2025-04-10"
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.d@example.com",
    phone: "+8801612345678",
    joinDate: "2025-03-15",
    status: "Pending",
    type: "Player",
    lastLogin: "N/A"
  },
  {
    id: 5,
    name: "Ryan Wilson",
    email: "ryan.w@example.com",
    phone: "+8801512345678",
    joinDate: "2025-03-22",
    status: "Active",
    type: "Team Manager",
    lastLogin: "2025-04-19"
  },
];

// Mock pending user registration data
const mockPendingUsers = [
  {
    id: 101,
    name: "Ariful Islam",
    email: "arif.islam@example.com",
    phone: "+8801712345679",
    registrationDate: "2025-04-20",
    type: "Player"
  },
  {
    id: 102,
    name: "Nasrin Akter",
    email: "nasrin.a@example.com",
    phone: "+8801812345679",
    registrationDate: "2025-04-21",
    type: "Team Manager"
  },
];

const AdminUserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUserDetails = (user: any) => {
    setSelectedUser(user);
    setUserDetailsDialogOpen(true);
  };

  const handleApproveUser = (id: number) => {
    const userToApprove = pendingUsers.find(user => user.id === id);
    if (!userToApprove) return;
    
    // Remove from pending and add to active
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
    
    const newUser = {
      ...userToApprove,
      status: "Active",
      joinDate: new Date().toISOString().slice(0, 10),
      lastLogin: "N/A"
    };
    
    setUsers([...users, newUser]);
  };

  const handleRejectUser = (id: number) => {
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === "Active" ? "Inactive" : "Active";
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Tabs defaultValue="all-users">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all-users">All Users</TabsTrigger>
              <TabsTrigger value="pending-approval">
                Pending Approval
                {pendingUsers.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-playtopia-energy text-white">
                    {pendingUsers.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-8"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all-users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 text-xs font-medium rounded-full 
                              ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleViewUserDetails(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant={user.status === "Active" ? "outline" : "default"} 
                              size="sm"
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.status === "Active" ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending-approval">
            <Card>
              <CardHeader>
                <CardTitle>Pending User Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No pending user approvals
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.registrationDate}</TableCell>
                          <TableCell>{user.type}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-green-500"
                                onClick={() => handleApproveUser(user.id)}
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleRejectUser(user.id)}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={userDetailsDialogOpen} onOpenChange={setUserDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-playtopia-dark text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">
                  {selectedUser.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-gray-500">{selectedUser.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Phone</h4>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">User Type</h4>
                  <p>{selectedUser.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Join Date</h4>
                  <p>{selectedUser.joinDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Status</h4>
                  <span 
                    className={`px-2 py-0.5 text-xs font-medium rounded-full 
                      ${selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        selectedUser.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Last Login</h4>
                  <p>{selectedUser.lastLogin}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setUserDetailsDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  variant={selectedUser.status === "Active" ? "destructive" : "default"}
                  onClick={() => {
                    handleToggleUserStatus(selectedUser.id);
                    setUserDetailsDialogOpen(false);
                  }}
                >
                  {selectedUser.status === "Active" ? "Deactivate User" : "Activate User"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminUserManagement;
