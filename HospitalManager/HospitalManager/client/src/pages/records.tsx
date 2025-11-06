import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Appointment } from "@shared/schema";

export default function Records() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const completedAppointments = appointments.filter(apt => apt.status === "completed");

  const filteredRecords = completedAppointments.filter(record =>
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Medical Records</h1>
        <p className="text-muted-foreground">Patient visit history and medical records</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search records..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-records"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading records...</div>
      ) : filteredRecords.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No medical records found</div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const initials = record.patientName.split(' ').map(n => n[0]).join('').toUpperCase();
            
            return (
              <Card key={record.id} className="hover-elevate" data-testid={`card-record-${record.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg" data-testid={`text-record-patient-${record.id}`}>
                          {record.patientName}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {record.date} at {record.time}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Dr. {record.doctorName}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reason for Visit</p>
                    <p className="text-sm mt-1">{record.reason}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" data-testid={`button-view-record-${record.id}`}>
                      <FileText className="h-4 w-4" />
                      View Full Record
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-download-record-${record.id}`}>
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
