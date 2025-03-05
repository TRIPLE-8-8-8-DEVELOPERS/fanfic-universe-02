
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
}

const DashboardStatsCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
}: DashboardStatsCardProps) => {
  // Determine if the change is positive or negative
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="dashboard-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="p-1.5 rounded-full bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} from last month
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
