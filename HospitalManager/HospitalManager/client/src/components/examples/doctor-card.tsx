import { DoctorCard } from '../doctor-card';

export default function DoctorCardExample() {
  const mockDoctor = {
    id: "1",
    name: "Michael Chen",
    email: "m.chen@hospital.com",
    phone: "+1 234-567-8901",
    specialization: "Cardiology",
    department: "Cardiology",
    experience: 15,
    availability: "Mon-Fri, 9AM-5PM",
  };

  return (
    <div className="p-6 max-w-md">
      <DoctorCard 
        doctor={mockDoctor}
        onViewDetails={(doctor) => console.log('View schedule for:', doctor.name)}
      />
    </div>
  );
}
