import { DepartmentCard } from "@/components/department-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Department } from "@shared/schema";

export default function Departments() {
  const { data: departments = [], isLoading } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Departments</h1>
          <p className="text-muted-foreground">Manage hospital departments</p>
        </div>
        <Button data-testid="button-add-department">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading departments...</div>
      ) : departments.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No departments found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onViewDetails={(dept) => console.log('View details for:', dept.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
