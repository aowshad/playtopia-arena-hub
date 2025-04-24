import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

// Mock data for field options
const fieldTypes = ["Football", "Cricket", "Badminton"];

const availableFields = {
  "Football": [
    { id: 1, name: "Football Field A", location: "City Sports Complex", price: "$40/hour", maxCapacity: 22, available: true },
    { id: 2, name: "Football Field B", location: "North Stadium", price: "$35/hour", maxCapacity: 22, available: false },
    { id: 3, name: "5-a-side Turf", location: "East Sports Club", price: "$25/hour", maxCapacity: 10, available: true },
  ],
  "Cricket": [
    { id: 4, name: "Cricket Ground 1", location: "City Sports Complex", price: "$50/hour", maxCapacity: 30, available: true },
    { id: 5, name: "Cricket Nets", location: "East Sports Club", price: "$15/hour", maxCapacity: 6, available: true },
  ],
  "Badminton": [
    { id: 6, name: "Badminton Court 1", location: "Indoor Arena", price: "$20/hour", maxCapacity: 4, available: true },
    { id: 7, name: "Badminton Court 2", location: "Indoor Arena", price: "$20/hour", maxCapacity: 4, available: false },
    { id: 8, name: "Badminton Court 3", location: "East Sports Club", price: "$18/hour", maxCapacity: 4, available: true },
  ],
};

// Mock time slots
const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const FieldBooking = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<string>("Football");
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Format the current date for display
  const formattedDate = format(selectedDate, "MMMM d, yyyy");
  
  // Handle booking
  const handleBooking = () => {
    if (!selectedField || !selectedTimeSlot) {
      alert("Please select a field and time slot");
      return;
    }
    
    // Here you would connect to backend to create a booking
    console.log({
      fieldType: selectedFieldType,
      fieldId: selectedField,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });
    
    alert("Booking successful! (This is a mock response)");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Book a Field</h1>
            <p className="text-gray-600">Select a sport, choose an available field, and book your slot</p>
          </div>
          
          {/* Field Type Selection */}
          <div className="mb-8">
            <Tabs defaultValue={selectedFieldType} onValueChange={setSelectedFieldType} className="w-full">
              <TabsList className="w-full max-w-md grid grid-cols-3">
                {fieldTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
                ))}
              </TabsList>
              
              {fieldTypes.map((type) => (
                <TabsContent key={type} value={type}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {availableFields[type as keyof typeof availableFields].map((field) => (
                      <Card 
                        key={field.id} 
                        className={`cursor-pointer transition-all ${
                          selectedField === field.id ? 'ring-2 ring-playtopia-field' : 'hover:shadow-md'
                        } ${!field.available ? 'opacity-75' : ''}`}
                        onClick={() => field.available && setSelectedField(field.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{field.name}</CardTitle>
                            <Badge variant={field.available ? "success" : "destructive"}>
                              {field.available ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                          <CardDescription>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{field.location}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="font-semibold text-playtopia-dark">{field.price}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Max Capacity: {field.maxCapacity} players</span>
                            </div>
                            {selectedField === field.id && (
                              <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full inline-block">
                                Selected
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Booking Date and Time */}
          {selectedField && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-md font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </h3>
                  <p className="text-playtopia-dark font-medium">{formattedDate}</p>
                  <p className="text-sm text-gray-500 mt-1">Date selector would be implemented here</p>
                </div>
                
                {/* Time Slot Selection */}
                <div>
                  <h3 className="text-md font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className={`p-2 text-sm rounded-md border transition-colors ${
                          selectedTimeSlot === slot
                            ? 'border-playtopia-field bg-playtopia-field/10 text-playtopia-field'
                            : 'border-gray-200 hover:border-playtopia-field hover:bg-playtopia-field/5'
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Booking Summary and Confirmation */}
          {selectedField && selectedTimeSlot && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Field</p>
                  <p className="font-medium">
                    {availableFields[selectedFieldType as keyof typeof availableFields].find(f => f.id === selectedField)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {availableFields[selectedFieldType as keyof typeof availableFields].find(f => f.id === selectedField)?.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{selectedTimeSlot}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">
                    {availableFields[selectedFieldType as keyof typeof availableFields].find(f => f.id === selectedField)?.price}
                  </p>
                </div>
              </div>
              
              <Button onClick={handleBooking} className="w-full">
                Confirm Booking
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FieldBooking;
