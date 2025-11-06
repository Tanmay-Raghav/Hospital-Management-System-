import { StatCard } from '../stat-card';
import { Users } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
      <StatCard
        title="Total Patients"
        value={1234}
        icon={Users}
        description="Active patients"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Total Doctors"
        value={89}
        icon={Users}
        description="Medical staff"
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
}
