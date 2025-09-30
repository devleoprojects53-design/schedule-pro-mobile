import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timeSlots = [
  "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Mock schedule data
const mockSchedule = [
  {
    day: "Monday",
    startTime: "8:00",
    duration: 90,
    subject: "Mathematics",
    teacher: "Dr. Smith",
    room: "Room 101"
  },
  {
    day: "Monday",
    startTime: "10:00",
    duration: 60,
    subject: "Physics",
    teacher: "Prof. Johnson",
    room: "Lab 201"
  },
  {
    day: "Tuesday",
    startTime: "9:00",
    duration: 90,
    subject: "English",
    teacher: "Ms. Davis",
    room: "Room 105"
  },
];

export const ScheduleGrid = () => {
  return (
    <div className="overflow-x-auto">
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {days.map((day) => (
          <Card key={day} className="p-4">
            <h3 className="font-semibold text-lg mb-3">{day}</h3>
            <div className="space-y-2">
              {mockSchedule
                .filter((item) => item.day === day)
                .map((item, idx) => (
                  <div key={idx} className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.startTime}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.duration} min</span>
                    </div>
                    <h4 className="font-semibold text-sm">{item.subject}</h4>
                    <p className="text-xs text-muted-foreground">{item.teacher}</p>
                    <p className="text-xs text-muted-foreground">{item.room}</p>
                  </div>
                ))}
              {mockSchedule.filter((item) => item.day === day).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No classes scheduled</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-2 min-w-[800px]">
          {/* Header */}
          <div className="font-semibold text-sm"></div>
          {days.map((day) => (
            <div key={day} className="font-semibold text-sm text-center p-2 bg-muted rounded-lg">
              {day}
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((time) => (
            <>
              <div key={`time-${time}`} className="text-xs text-muted-foreground text-right pr-2 py-1">
                {time}
              </div>
              {days.map((day) => {
                const classItem = mockSchedule.find(
                  (item) => item.day === day && item.startTime === time
                );
                return (
                  <div
                    key={`${day}-${time}`}
                    className="border border-border rounded-lg min-h-[40px] hover:bg-muted/50 transition-colors"
                  >
                    {classItem && (
                      <div className="p-2 bg-primary/10 rounded-lg h-full border border-primary/20">
                        <h4 className="font-semibold text-xs">{classItem.subject}</h4>
                        <p className="text-xs text-muted-foreground">{classItem.teacher}</p>
                        <p className="text-xs text-muted-foreground">{classItem.room}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
