import { PatientCard } from '../patient-card';

export default function PatientCardExample() {
  const mockPatient = {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234-567-8900",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    address: "123 Main St, City",
    bloodType: "O+",
    allergies: "Penicillin",
    medicalHistory: "Hypertension",
  };

  return (
    <div className="p-6 max-w-md">
      <PatientCard 
        patient={mockPatient} 
        onViewDetails={(patient) => console.log('View details for:', patient.name)}
      />
    </div>
  );
}
