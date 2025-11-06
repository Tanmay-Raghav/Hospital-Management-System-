import { AppointmentCard } from "@/components/appointment-card";
import { StatCard } from "@/components/stat-card";
import { Users, UserRound, Calendar, Building2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Appointment } from "@shared/schema";

interface Stats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
  totalDepartments: number;
}

export default function Dashboard() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
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

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Hospital Management System</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={stats?.totalPatients || 0}
          icon={Users}
          description="Active patients"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Doctors"
          value={stats?.totalDoctors || 0}
          icon={UserRound}
          description="Medical staff"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Appointments Today"
          value={stats?.todayAppointments || 0}
          icon={Calendar}
          description="Scheduled for today"
        />
        <StatCard
          title="Departments"
          value={stats?.totalDepartments || 0}
          icon={Building2}
          description="Active departments"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
        {isLoading ? (
          <div className="text-center text-muted-foreground py-8">Loading appointments...</div>
        ) : todayAppointments.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">No appointments scheduled for today</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
