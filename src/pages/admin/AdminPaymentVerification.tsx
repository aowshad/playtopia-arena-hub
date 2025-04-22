
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Search, X } from "lucide-react";

// Mock payment data
const mockPendingPayments = [
  {
    id: 1,
    user: "Emma Davis",
    amount: 7500,
    paymentType: "Tournament Registration",
    transactionId: "TRX89012345",
    paymentMethod: "bKash",
    date: "2025-04-22",
    status: "Pending"
  },
  {
    id: 2,
    user: "Ryan Wilson",
    amount: 4000,
    paymentType: "Field Booking",
    transactionId: "TRX78901234",
    paymentMethod: "Nagad",
    date: "2025-04-21",
    status: "Pending"
  },
  {
    id: 3,
    user: "Mohammed Rahman",
    amount: 3000,
    paymentType: "Team Registration",
    transactionId: "TRX67890123",
    paymentMethod: "Rocket",
    date: "2025-04-20",
    status: "Pending"
  },
];

const mockVerifiedPayments = [
  {
    id: 101,
    user: "John Doe",
    amount: 2500,
    paymentType: "Field Booking",
    transactionId: "TRX56789012",
    paymentMethod: "bKash",
    date: "2025-04-19",
    status: "Verified",
    verifiedBy: "Admin",
    verifiedDate: "2025-04-19"
  },
  {
    id: 102,
    user: "Sarah Johnson",
    amount: 5000,
    paymentType: "Tournament Registration",
    transactionId: "TRX45678901",
    paymentMethod: "Nagad",
    date: "2025-04-18",
    status: "Verified",
    verifiedBy: "Admin",
    verifiedDate: "2025-04-18"
  },
];

const mockRejectedPayments = [
  {
    id: 201,
    user: "Ariful Islam",
    amount: 3500,
    paymentType: "Field Booking",
    transactionId: "TRX34567890",
    paymentMethod: "bKash",
    date: "2025-04-17",
    status: "Rejected",
    reason: "Invalid transaction ID",
    rejectedBy: "Admin",
    rejectedDate: "2025-04-17"
  },
];

const AdminPaymentVerification = () => {
  const [pendingPayments, setPendingPayments] = useState(mockPendingPayments);
  const [verifiedPayments, setVerifiedPayments] = useState(mockVerifiedPayments);
  const [rejectedPayments, setRejectedPayments] = useState(mockRejectedPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredPendingPayments = pendingPayments.filter(payment => 
    payment.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerifyPayment = (id: number) => {
    const paymentToVerify = pendingPayments.find(payment => payment.id === id);
    if (!paymentToVerify) return;
    
    // Remove from pending
    setPendingPayments(pendingPayments.filter(payment => payment.id !== id));
    
    // Add to verified
    const verifiedPayment = {
      ...paymentToVerify,
      status: "Verified",
      verifiedBy: "Admin",
      verifiedDate: new Date().toISOString().slice(0, 10)
    };
    
    setVerifiedPayments([verifiedPayment, ...verifiedPayments]);
    setIsVerifyDialogOpen(false);
  };

  const handleRejectPayment = () => {
    if (!selectedPayment || !rejectionReason) return;
    
    // Remove from pending
    setPendingPayments(pendingPayments.filter(payment => payment.id !== selectedPayment.id));
    
    // Add to rejected
    const rejectedPayment = {
      ...selectedPayment,
      status: "Rejected",
      reason: rejectionReason,
      rejectedBy: "Admin",
      rejectedDate: new Date().toISOString().slice(0, 10)
    };
    
    setRejectedPayments([rejectedPayment, ...rejectedPayments]);
    setRejectionReason("");
    setIsRejectDialogOpen(false);
  };

  const handleVerifyClick = (payment: any) => {
    setSelectedPayment(payment);
    setIsVerifyDialogOpen(true);
  };

  const handleRejectClick = (payment: any) => {
    setSelectedPayment(payment);
    setIsRejectDialogOpen(true);
  };

  const handleDetailsClick = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Tabs defaultValue="pending">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="pending">
                Pending
                {pendingPayments.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-playtopia-energy text-white">
                    {pendingPayments.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-8"
                placeholder="Search by user or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payment Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPendingPayments.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No pending payments to verify
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Amount (BDT)</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.user}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.paymentType}</TableCell>
                          <TableCell>{payment.transactionId}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-green-500"
                                onClick={() => handleVerifyClick(payment)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleRejectClick(payment)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDetailsClick(payment)}
                              >
                                Details
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
          
          <TabsContent value="verified">
            <Card>
              <CardHeader>
                <CardTitle>Verified Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {verifiedPayments.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No verified payments
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Amount (BDT)</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Verified Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verifiedPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.user}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.paymentType}</TableCell>
                          <TableCell>{payment.transactionId}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.verifiedDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDetailsClick(payment)}
                            >
                              Details
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
                <CardTitle>Rejected Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {rejectedPayments.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No rejected payments
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Amount (BDT)</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Rejected Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.user}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.paymentType}</TableCell>
                          <TableCell>{payment.transactionId}</TableCell>
                          <TableCell>{payment.reason}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.rejectedDate}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDetailsClick(payment)}
                            >
                              Details
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

      {/* Verify Payment Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Transaction Details</Label>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">User:</p>
                    <p>{selectedPayment.user}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Amount:</p>
                    <p>BDT {selectedPayment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Payment Type:</p>
                    <p>{selectedPayment.paymentType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Transaction ID:</p>
                    <p>{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Method:</p>
                    <p>{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Date:</p>
                    <p>{selectedPayment.date}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="verifyComment">Additional Notes (Optional)</Label>
                <Input id="verifyComment" placeholder="Add any notes or comments..." />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleVerifyPayment(selectedPayment.id)}
                >
                  Verify Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Transaction Details</Label>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">User:</p>
                    <p>{selectedPayment.user}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Amount:</p>
                    <p>BDT {selectedPayment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Transaction ID:</p>
                    <p>{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Date:</p>
                    <p>{selectedPayment.date}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Reason for Rejection</Label>
                <Select 
                  value={rejectionReason}
                  onValueChange={setRejectionReason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Invalid transaction ID">Invalid transaction ID</SelectItem>
                    <SelectItem value="Transaction not found">Transaction not found</SelectItem>
                    <SelectItem value="Amount mismatch">Amount mismatch</SelectItem>
                    <SelectItem value="Duplicate payment">Duplicate payment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                {rejectionReason === "Other" && (
                  <Input 
                    placeholder="Specify reason" 
                    className="mt-2"
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleRejectPayment}
                  disabled={!rejectionReason}
                >
                  Reject Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedPayment.paymentType}</h3>
                <span 
                  className={`px-2 py-1 text-xs font-medium rounded-full 
                    ${selectedPayment.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                      selectedPayment.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                >
                  {selectedPayment.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">User</h4>
                  <p>{selectedPayment.user}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Payment Date</h4>
                  <p>{selectedPayment.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Amount</h4>
                  <p className="font-semibold">BDT {selectedPayment.amount}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Payment Method</h4>
                  <p>{selectedPayment.paymentMethod}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-gray-500">Transaction ID</h4>
                  <p className="font-mono">{selectedPayment.transactionId}</p>
                </div>
                
                {selectedPayment.status === "Verified" && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Verified By</h4>
                      <p>{selectedPayment.verifiedBy}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Verification Date</h4>
                      <p>{selectedPayment.verifiedDate}</p>
                    </div>
                  </>
                )}
                
                {selectedPayment.status === "Rejected" && (
                  <>
                    <div className="col-span-2">
                      <h4 className="text-sm font-semibold text-gray-500">Rejection Reason</h4>
                      <p>{selectedPayment.reason}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Rejected By</h4>
                      <p>{selectedPayment.rejectedBy}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Rejection Date</h4>
                      <p>{selectedPayment.rejectedDate}</p>
                    </div>
                  </>
                )}
              </div>
              
              <Button 
                className="w-full"
                variant="outline" 
                onClick={() => setIsDetailsDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPaymentVerification;
