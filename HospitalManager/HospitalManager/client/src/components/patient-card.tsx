import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar } from "lucide-react";
import type { Patient } from "@shared/schema";

interface PatientCardProps {
  patient: Patient;
  onViewDetails?: (patient: Patient) => void;
}

export function PatientCard({ patient, onViewDetails }: PatientCardProps) {
  const initials = patient.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="hover-elevate" data-testid={`card-patient-${patient.id}`}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold" data-testid={`text-patient-name-${patient.id}`}>{patient.name}</h3>
          <p className="text-sm text-muted-foreground">Blood Type: {patient.bloodType}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{patient.dateOfBirth}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{patient.gender}</Badge>
          {patient.allergies && <Badge variant="destructive" className="text-xs">Allergies</Badge>}
        </div>
        <Button 
          className="w-full" 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails?.(patient)}
          data-testid={`button-view-patient-${patient.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
