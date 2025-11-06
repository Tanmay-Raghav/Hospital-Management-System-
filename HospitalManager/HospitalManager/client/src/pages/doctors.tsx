import { useState } from "react";
import { DoctorCard } from "@/components/doctor-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@shared/schema";

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const createDoctorMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/doctors", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/doctors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Doctor added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add doctor",
        variant: "destructive",
      });
    },
  });

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("doctorName"),
      email: formData.get("doctorEmail"),
      phone: formData.get("doctorPhone"),
      specialization: formData.get("specialization"),
      department: formData.get("department"),
      experience: parseInt(formData.get("experience") as string, 10),
      availability: formData.get("availability"),
    };
    createDoctorMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Doctors</h1>
          <p className="text-muted-foreground">Manage medical staff</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-doctor">
              <Plus className="h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Enter doctor information below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Full Name</Label>
                <Input id="doctorName" name="doctorName" placeholder="Dr. John Doe" required data-testid="input-doctor-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorEmail">Email</Label>
                <Input id="doctorEmail" name="doctorEmail" type="email" placeholder="doctor@hospital.com" required data-testid="input-doctor-email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorPhone">Phone</Label>
                <Input id="doctorPhone" name="doctorPhone" placeholder="+1 234-567-8900" required data-testid="input-doctor-phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" name="specialization" placeholder="e.g., Cardiology" required data-testid="input-doctor-specialization" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select name="department" required>
                  <SelectTrigger id="department" data-testid="select-doctor-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" name="experience" type="number" min="0" placeholder="10" required data-testid="input-doctor-experience" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input id="availability" name="availability" placeholder="Mon-Fri, 9AM-5PM" required data-testid="input-doctor-availability" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button type="submit" disabled={createDoctorMutation.isPending} data-testid="button-submit">
                  {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctors..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-doctors"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading doctors...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No doctors found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewDetails={(doctor) => console.log('View schedule for:', doctor.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
