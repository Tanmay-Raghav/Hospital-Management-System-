import { AppointmentCard } from '../appointment-card';

export default function AppointmentCardExample() {
  const mockAppointment = {
    id: "1",
    patientId: "p1",
    doctorId: "d1",
    patientName: "Sarah Johnson",
    doctorName: "Michael Chen",
    date: "2024-01-15",
    time: "10:00 AM",
    reason: "Routine Checkup",
    status: "scheduled",
  };

  return (
    <div className="p-6 max-w-md">
      <AppointmentCard 
        appointment={mockAppointment}
        onUpdateStatus={(id, status) => console.log(`Update appointment ${id} to ${status}`)}
      />
    </div>
  );
}
