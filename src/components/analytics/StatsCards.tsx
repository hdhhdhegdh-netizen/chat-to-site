import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Eye, TrendingUp, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsProps {
  totalProjects: number;
  publishedProjects: number;
  totalVisits: number;
  todayVisits: number;
  loading?: boolean;
}

export function StatsCards({ 
  totalProjects, 
  publishedProjects, 
  totalVisits, 
  todayVisits,
  loading 
}: StatsCardsProps) {
  const stats = [
    {
      label: "إجمالي المشاريع",
      value: totalProjects,
      icon: FolderOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "المشاريع المنشورة",
      value: publishedProjects,
      icon: Globe,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "إجمالي الزيارات",
      value: totalVisits,
      icon: Eye,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "زيارات اليوم",
      value: todayVisits,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-lg mb-3" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
