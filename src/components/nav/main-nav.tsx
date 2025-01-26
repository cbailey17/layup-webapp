import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export default function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/"
        activeProps={{ className: "text-primary" }}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Aircraft Control
      </Link>
      <Link
        to="/layup-sequence"
        activeProps={{ className: "text-primary" }}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Layup Sequence
      </Link>
    </nav>
  );
}

