import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home,
  User, 
  Settings,
  Calendar
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/"
  },
  {
    title: "Students",
    icon: User,
    href: "/students"
  },
  {
    title: "Courses",
    icon: Calendar,
    href: "/courses"
  },
  {
    title: "Faculty",
    icon: User,
    href: "/faculty"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings"
  }
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  
  return (
    <aside className={cn(
      "fixed md:relative bg-sidebar h-full border-r transition-all duration-300 ease-in-out overflow-hidden z-20",
      isOpen ? "w-64 translate-x-0" : "w-0 md:w-16 -translate-x-full md:translate-x-0"
    )}>
      <div className="h-14 flex items-center justify-center border-b">
        {isOpen ? (
          <h2 className="font-bold text-xl text-primary">ERP System</h2>
        ) : (
          <h2 className="sr-only">ERP System</h2>
        )}
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-muted-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isOpen ? "" : "mx-auto")} />
                {isOpen && <span className="truncate">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
