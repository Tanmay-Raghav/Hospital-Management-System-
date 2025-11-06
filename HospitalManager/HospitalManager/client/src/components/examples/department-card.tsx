import { DepartmentCard } from '../department-card';

export default function DepartmentCardExample() {
  const mockDepartment = {
    id: "1",
    name: "Cardiology",
    description: "Specialized in heart and cardiovascular diseases",
    headDoctor: "Michael Chen",
    staffCount: 25,
    bedCount: 40,
    availableBeds: 12,
  };

  return (
    <div className="p-6 max-w-md">
      <DepartmentCard 
        department={mockDepartment}
        onViewDetails={(dept) => console.log('View details for:', dept.name)}
      />
    </div>
  );
}
