import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Bed, UserRound } from "lucide-react";
import type { Department } from "@shared/schema";

interface DepartmentCardProps {
  department: Department;
  onViewDetails?: (department: Department) => void;
}

export function DepartmentCard({ department, onViewDetails }: DepartmentCardProps) {
  const occupancyRate = ((department.bedCount - department.availableBeds) / department.bedCount * 100).toFixed(0);
  
  return (
    <Card className="hover-elevate" data-testid={`card-department-${department.id}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span data-testid={`text-department-name-${department.id}`}>{department.name}</span>
          <Badge variant="secondary">{occupancyRate}% occupied</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{department.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Head: Dr. {department.headDoctor}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Staff</p>
              <p className="text-lg font-semibold">{department.staffCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Available Beds</p>
              <p className="text-lg font-semibold">{department.availableBeds}/{department.bedCount}</p>
            </div>
          </div>
        </div>
        <Button 
          className="w-full" 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails?.(department)}
          data-testid={`button-view-department-${department.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
