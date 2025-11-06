import { useState } from "react";
import { AppointmentCard } from "@/components/appointment-card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, Patient, Doctor } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const { data: patients = [] } = useQuery<Patient[]>({
    queryKey: ["/api/patients"],
  });

  const { data: doctors = [] } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Appointment booked successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/appointments/${id}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleUpdateStatus = (appointmentId: string, status: string) => {
    updateStatusMutation.mutate({ id: appointmentId, status });
  };

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const patientId = formData.get("patient") as string;
    const doctorId = formData.get("doctor") as string;
    const patient = patients.find(p => p.id === patientId);
    const doctor = doctors.find(d => d.id === doctorId);

    if (!patient || !doctor) {
      toast({
        title: "Error",
        description: "Please select both patient and doctor",
        variant: "destructive",
      });
      return;
    }

    const data = {
      patientId,
      doctorId,
      patientName: patient.name,
      doctorName: doctor.name,
      date: formData.get("date"),
      time: formData.get("time"),
      reason: formData.get("reason"),
      status: "scheduled",
    };
    createAppointmentMutation.mutate(data);
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scheduledAppointments = filteredAppointments.filter(a => a.status === "scheduled");
  const completedAppointments = filteredAppointments.filter(a => a.status === "completed");
  const cancelledAppointments = filteredAppointments.filter(a => a.status === "cancelled");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Appointments</h1>
          <p className="text-muted-foreground">Manage patient appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-appointment">
              <Plus className="h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>Schedule an appointment for a patient</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select name="patient" required>
                  <SelectTrigger id="patient" data-testid="input-appointment-patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select name="doctor" required>
                  <SelectTrigger id="doctor" data-testid="input-appointment-doctor">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        Dr. {doctor.name} - {doctor.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required data-testid="input-appointment-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required data-testid="input-appointment-time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" name="reason" placeholder="e.g., Routine Checkup" required data-testid="input-appointment-reason" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button type="submit" disabled={createAppointmentMutation.isPending} data-testid="button-submit">
                  {createAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search appointments..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-appointments"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading appointments...</div>
      ) : (
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList>
            <TabsTrigger value="scheduled" data-testid="tab-scheduled">
              Scheduled ({scheduledAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">
              Completed ({completedAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" data-testid="tab-cancelled">
              Cancelled ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scheduled" className="mt-6">
            {scheduledAppointments.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No scheduled appointments</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scheduledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {completedAppointments.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No completed appointments</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            {cancelledAppointments.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No cancelled appointments</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cancelledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
