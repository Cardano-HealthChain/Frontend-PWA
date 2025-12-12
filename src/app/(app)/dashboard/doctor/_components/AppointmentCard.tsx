// AppointmentCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

export const AppointmentCard = ({ appointment }: { appointment: any }) => (
  <Card className="border-0 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{appointment.patientName}</p>
            <p className="text-sm text-muted-foreground">{appointment.type}</p>
            <p className="text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3 inline mr-1" />
              {appointment.time}
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="h-8 bg-primary text-white hover:bg-primary/90">
          View
        </Button>
      </div>
    </CardContent>
  </Card>
);
