
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const stats = [
    { title: "Total Students", value: "2,856", trend: "↑", trendValue: "12%", trendColor: "text-green-500" },
    { title: "Total Courses", value: "186", trend: "↑", trendValue: "4%", trendColor: "text-green-500" },
    { title: "Faculty Members", value: "95", trend: "→", trendValue: "0%", trendColor: "text-gray-500" },
    { title: "Average GPA", value: "3.42", trend: "↑", trendValue: "2%", trendColor: "text-green-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className={`text-sm font-medium ${stat.trendColor}`}>
                  {stat.trend} {stat.trendValue}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from across the campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Course Registration Open", time: "2 hours ago" },
                { title: "New Faculty Onboarded", time: "Yesterday" },
                { title: "Library System Maintenance", time: "2 days ago" },
                { title: "Exam Schedule Published", time: "4 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center pb-2 last:pb-0 border-b last:border-0">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Important Announcements</CardTitle>
            <CardDescription>College-wide notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Mid-Term Exam Schedule", category: "Academic", date: "May 15, 2025" },
                { title: "Campus Renovation Project", category: "Administrative", date: "May 20, 2025" },
                { title: "Alumni Meet", category: "Event", date: "May 25, 2025" },
                { title: "Scholarship Applications", category: "Financial Aid", date: "June 1, 2025" },
              ].map((announcement, index) => (
                <div key={index} className="space-y-1 pb-2 last:pb-0 border-b last:border-0">
                  <div className="font-medium">{announcement.title}</div>
                  <div className="flex justify-between">
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{announcement.category}</span>
                    <span className="text-sm text-muted-foreground">{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
