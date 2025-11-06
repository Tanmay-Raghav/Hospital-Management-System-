import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Briefcase } from "lucide-react";
import type { Doctor } from "@shared/schema";

interface DoctorCardProps {
  doctor: Doctor;
  onViewDetails?: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onViewDetails }: DoctorCardProps) {
  const initials = doctor.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="hover-elevate" data-testid={`card-doctor-${doctor.id}`}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold" data-testid={`text-doctor-name-${doctor.id}`}>Dr. {doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{doctor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{doctor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{doctor.experience} years experience</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{doctor.department}</Badge>
          <Badge variant="outline">{doctor.availability}</Badge>
        </div>
        <Button 
          className="w-full" 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails?.(doctor)}
          data-testid={`button-view-doctor-${doctor.id}`}
        >
          View Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
