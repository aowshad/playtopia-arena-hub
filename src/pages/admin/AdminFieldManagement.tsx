
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash2 } from "lucide-react";

// Mock field data
const mockFields = [
  {
    id: 1,
    name: "Football Field A",
    type: "Football",
    location: "North Complex",
    capacity: 22,
    hourlyRate: 1500,
    availability: "Available",
    status: "Active"
  },
  {
    id: 2,
    name: "Cricket Ground 1",
    type: "Cricket",
    location: "East Wing",
    capacity: 30,
    hourlyRate: 2500,
    availability: "Booked",
    status: "Active"
  },
  {
    id: 3,
    name: "Basketball Court B",
    type: "Basketball",
    location: "Indoor Arena",
    capacity: 12,
    hourlyRate: 1200,
    availability: "Available",
    status: "Active"
  },
  {
    id: 4,
    name: "Tennis Court 2",
    type: "Tennis",
    location: "South Complex",
    capacity: 4,
    hourlyRate: 800,
    availability: "Maintenance",
    status: "Inactive"
  },
  {
    id: 5,
    name: "Badminton Court 3",
    type: "Badminton",
    location: "Indoor Arena",
    capacity: 4,
    hourlyRate: 600,
    availability: "Available",
    status: "Active"
  },
];

const AdminFieldManagement = () => {
  const [fields, setFields] = useState(mockFields);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<any>(null);
  const [newField, setNewField] = useState({
    name: "",
    type: "",
    location: "",
    capacity: 0,
    hourlyRate: 0,
    availability: "Available",
    status: "Active"
  });

  const handleAddField = () => {
    const fieldToAdd = {
      ...newField,
      id: fields.length + 1
    };
    setFields([...fields, fieldToAdd]);
    setNewField({
      name: "",
      type: "",
      location: "",
      capacity: 0,
      hourlyRate: 0,
      availability: "Available",
      status: "Active"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditField = () => {
    if (!currentField) return;
    
    const updatedFields = fields.map(field => 
      field.id === currentField.id ? currentField : field
    );
    
    setFields(updatedFields);
    setIsEditDialogOpen(false);
  };

  const handleDeleteField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleEditClick = (field: any) => {
    setCurrentField(field);
    setIsEditDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Field Management</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Field
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Field</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Field Name</Label>
                    <Input 
                      id="name" 
                      value={newField.name} 
                      onChange={(e) => setNewField({...newField, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Sport Type</Label>
                    <Input 
                      id="type" 
                      value={newField.type} 
                      onChange={(e) => setNewField({...newField, type: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={newField.location} 
                      onChange={(e) => setNewField({...newField, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      value={newField.capacity.toString()} 
                      onChange={(e) => setNewField({...newField, capacity: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (BDT)</Label>
                    <Input 
                      id="hourlyRate" 
                      type="number" 
                      value={newField.hourlyRate.toString()} 
                      onChange={(e) => setNewField({...newField, hourlyRate: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input 
                      id="availability" 
                      value={newField.availability} 
                      onChange={(e) => setNewField({...newField, availability: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddField}>Add Field</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Fields Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Rate (BDT)</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">{field.name}</TableCell>
                    <TableCell>{field.type}</TableCell>
                    <TableCell>{field.location}</TableCell>
                    <TableCell>{field.capacity}</TableCell>
                    <TableCell>{field.hourlyRate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full 
                        ${field.availability === 'Available' ? 'bg-green-100 text-green-800' : 
                          field.availability === 'Booked' ? 'bg-orange-100 text-orange-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {field.availability}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full 
                        ${field.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                        {field.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleEditClick(field)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleDeleteField(field.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Field Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
          </DialogHeader>
          {currentField && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Field Name</Label>
                  <Input 
                    id="edit-name" 
                    value={currentField.name} 
                    onChange={(e) => setCurrentField({...currentField, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Sport Type</Label>
                  <Input 
                    id="edit-type" 
                    value={currentField.type} 
                    onChange={(e) => setCurrentField({...currentField, type: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input 
                    id="edit-location" 
                    value={currentField.location} 
                    onChange={(e) => setCurrentField({...currentField, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input 
                    id="edit-capacity" 
                    type="number" 
                    value={currentField.capacity.toString()} 
                    onChange={(e) => setCurrentField({...currentField, capacity: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-hourlyRate">Hourly Rate (BDT)</Label>
                  <Input 
                    id="edit-hourlyRate" 
                    type="number" 
                    value={currentField.hourlyRate.toString()} 
                    onChange={(e) => setCurrentField({...currentField, hourlyRate: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-availability">Availability</Label>
                  <Input 
                    id="edit-availability" 
                    value={currentField.availability} 
                    onChange={(e) => setCurrentField({...currentField, availability: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Input 
                    id="edit-status" 
                    value={currentField.status} 
                    onChange={(e) => setCurrentField({...currentField, status: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditField}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminFieldManagement;
