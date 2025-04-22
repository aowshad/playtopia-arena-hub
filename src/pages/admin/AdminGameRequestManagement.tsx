
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, MessageSquare, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock game request data
const mockPendingRequests = [
  {
    id: 1,
    requestingTeam: "City Strikers",
    opponentTeam: "Football United",
    sport: "Football",
    date: "2025-05-10",
    time: "16:00 - 18:00",
    venue: "Football Field A",
    requestedBy: "Ahmed Hasan",
    requestedDate: "2025-04-20",
    message: "We would like to challenge your team to a friendly match.",
    status: "Pending"
  },
  {
    id: 2,
    requestingTeam: "Shuttle Stars",
    opponentTeam: "Racket Masters",
    sport: "Badminton",
    date: "2025-05-08",
    time: "14:00 - 16:00",
    venue: "Badminton Court 1",
    requestedBy: "Nasir Uddin",
    requestedDate: "2025-04-21",
    message: "Let's have a competitive badminton match.",
    status: "Pending"
  },
  {
    id: 3,
    requestingTeam: "Royal Tigers",
    opponentTeam: "Cricket Kings",
    sport: "Cricket",
    date: "2025-05-15",
    time: "09:00 - 14:00",
    venue: "Cricket Ground 1",
    requestedBy: "Mashrafe Murtaza",
    requestedDate: "2025-04-22",
    message: "We challenge you to a T20 match.",
    status: "Pending"
  },
];

const mockApprovedRequests = [
  {
    id: 101,
    requestingTeam: "Basketball Legends",
    opponentTeam: "Hoop Heroes",
    sport: "Basketball",
    date: "2025-05-05",
    time: "18:00 - 20:00",
    venue: "Basketball Court B",
    requestedBy: "Rakibul Islam",
    requestedDate: "2025-04-15",
    message: "Let's have a friendly basketball match.",
    status: "Approved",
    approvedBy: "Admin",
    approvedDate: "2025-04-16"
  },
];

const mockRejectedRequests = [
  {
    id: 201,
    requestingTeam: "Tennis Pros",
    opponentTeam: "Racket Aces",
    sport: "Tennis",
    date: "2025-05-01",
    time: "10:00 - 12:00",
    venue: "Tennis Court 2",
    requestedBy: "Karim Ahmed",
    requestedDate: "2025-04-14",
    message: "Would like to have a friendly tennis match.",
    status: "Rejected",
    rejectedBy: "Admin",
    rejectedDate: "2025-04-15",
    rejectionReason: "Venue not available on requested date"
  },
];

const AdminGameRequestManagement = () => {
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [approvedRequests, setApprovedRequests] = useState(mockApprovedRequests);
  const [rejectedRequests, setRejectedRequests] = useState(mockRejectedRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredPendingRequests = pendingRequests.filter(request => 
    request.requestingTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
    request.opponentTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproveRequest = (id: number) => {
    const requestToApprove = pendingRequests.find(request => request.id === id);
    if (!requestToApprove) return;
    
    // Remove from pending
    setPendingRequests(pendingRequests.filter(request => request.id !== id));
    
    // Add to approved
    const approvedRequest = {
      ...requestToApprove,
      status: "Approved",
      approvedBy: "Admin",
      approvedDate: new Date().toISOString().slice(0, 10)
    };
    
    setApprovedRequests([approvedRequest, ...approvedRequests]);
  };

  const handleRejectRequest = () => {
    if (!selectedRequest || !rejectionReason) return;
    
    // Remove from pending
    setPendingRequests(pendingRequests.filter(request => request.id !== selectedRequest.id));
    
    // Add to rejected
    const rejectedRequest = {
      ...selectedRequest,
      status: "Rejected",
      rejectedBy: "Admin",
      rejectedDate: new Date().toISOString().slice(0, 10),
      rejectionReason: rejectionReason
    };
    
    setRejectedRequests([rejectedRequest, ...rejectedRequests]);
    setRejectionReason("");
    setIsRejectDialogOpen(false);
  };

  const handleDetailsClick = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsDialogOpen(true);
  };

  const handleRejectClick = (request: any) => {
    setSelectedRequest(request);
    setIsRejectDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Tabs defaultValue="pending">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="pending">
                Pending
                {pendingRequests.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-playtopia-energy text-white">
                    {pendingRequests.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-8"
                placeholder="Search game requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Game Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPendingRequests.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No pending game requests
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requesting Team</TableHead>
                        <TableHead>Opponent Team</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Requested On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestingTeam}</TableCell>
                          <TableCell>{request.opponentTeam}</TableCell>
                          <TableCell>{request.sport}</TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>{request.time}</TableCell>
                          <TableCell>{request.venue}</TableCell>
                          <TableCell>{request.requestedDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-green-500"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleRejectClick(request)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDetailsClick(request)}
                              >
                                <MessageSquare className="h-4 w-4" />
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
          
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Game Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {approvedRequests.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No approved game requests
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requesting Team</TableHead>
                        <TableHead>Opponent Team</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Approved On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestingTeam}</TableCell>
                          <TableCell>{request.opponentTeam}</TableCell>
                          <TableCell>{request.sport}</TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>{request.time}</TableCell>
                          <TableCell>{request.venue}</TableCell>
                          <TableCell>{request.approvedDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDetailsClick(request)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Game Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {rejectedRequests.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No rejected game requests
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requesting Team</TableHead>
                        <TableHead>Opponent Team</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Rejection Reason</TableHead>
                        <TableHead>Rejected On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestingTeam}</TableCell>
                          <TableCell>{request.opponentTeam}</TableCell>
                          <TableCell>{request.sport}</TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>{request.rejectionReason}</TableCell>
                          <TableCell>{request.rejectedDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDetailsClick(request)}
                            >
                              View Details
                            </Button>
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

      {/* Request Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Game Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedRequest.sport} Match Request</h3>
                <span 
                  className={`px-2 py-1 text-xs font-medium rounded-full 
                    ${selectedRequest.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      selectedRequest.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                >
                  {selectedRequest.status}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <h4 className="font-semibold">Match Information</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Requesting Team</p>
                    <p>{selectedRequest.requestingTeam}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Opponent Team</p>
                    <p>{selectedRequest.opponentTeam}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Date</p>
                    <p>{selectedRequest.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Time</p>
                    <p>{selectedRequest.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Venue</p>
                    <p>{selectedRequest.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Requested By</p>
                    <p>{selectedRequest.requestedBy}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-semibold mb-2">Message</h4>
                <p className="text-gray-700">{selectedRequest.message}</p>
              </div>
              
              {selectedRequest.status === "Approved" && (
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Approval Information</h4>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Approved By</p>
                      <p>{selectedRequest.approvedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Approved On</p>
                      <p>{selectedRequest.approvedDate}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRequest.status === "Rejected" && (
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Rejection Information</h4>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-500">Reason</p>
                      <p>{selectedRequest.rejectionReason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Rejected By</p>
                      <p>{selectedRequest.rejectedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Rejected On</p>
                      <p>{selectedRequest.rejectedDate}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                {selectedRequest.status === "Pending" && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsDetailsDialogOpen(false);
                        handleRejectClick(selectedRequest);
                      }}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="default"
                      onClick={() => {
                        handleApproveRequest(selectedRequest.id);
                        setIsDetailsDialogOpen(false);
                      }}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {selectedRequest.status !== "Pending" && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDetailsDialogOpen(false)}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Request Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reject Game Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-semibold mb-2">Match Details</h4>
                <p>
                  <span className="font-medium">{selectedRequest.requestingTeam}</span> vs <span className="font-medium">{selectedRequest.opponentTeam}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {selectedRequest.date} at {selectedRequest.time} • {selectedRequest.venue}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Reason for Rejection</Label>
                <Input 
                  id="rejectionReason" 
                  placeholder="Enter reason for rejection" 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleRejectRequest}
                  disabled={!rejectionReason}
                >
                  Reject Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminGameRequestManagement;
