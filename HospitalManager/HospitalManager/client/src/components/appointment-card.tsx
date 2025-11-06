import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import type { Appointment } from "@shared/schema";

interface AppointmentCardProps {
  appointment: Appointment;
  onUpdateStatus?: (appointmentId: string, status: string) => void;
}

export function AppointmentCard({ appointment, onUpdateStatus }: AppointmentCardProps) {
  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    scheduled: "default",
    completed: "secondary",
    cancelled: "destructive",
  };
  
  return (
    <Card className="hover-elevate" data-testid={`card-appointment-${appointment.id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{appointment.date}</span>
        </div>
        <Badge variant={statusColors[appointment.status]} data-testid={`status-appointment-${appointment.id}`}>
          {appointment.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{appointment.patientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Dr. {appointment.doctorName}</span>
        </div>
        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
        {appointment.status === "scheduled" && (
          <div className="flex gap-2 flex-wrap">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus?.(appointment.id, "completed")}
              data-testid={`button-complete-${appointment.id}`}
            >
              Complete
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onUpdateStatus?.(appointment.id, "cancelled")}
              data-testid={`button-cancel-${appointment.id}`}
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
