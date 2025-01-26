import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  title: string;
  message: string;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({ type = "info", title, message, className }) => {
  const colorMap: Record<CalloutType, { icon: string; bg: string; border: string }> = {
    info: {
      icon: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-400",
    },
    warning: {
      icon: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-400",
    },
    success: {
      icon: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-400",
    },
    error: {
      icon: "text-red-600",
      bg: "bg-red-100",
      border: "border-red-400",
    },
  };

  const iconMap: Record<CalloutType, JSX.Element> = {
    info: <Info className={cn("h-5 w-5", colorMap[type].icon, "!text-blue-600")} />,
    warning: <AlertCircle className={cn("h-5 w-5", colorMap[type].icon, "!text-yellow-600")} />,
    success: <CheckCircle className={cn("h-5 w-5", colorMap[type].icon, "!text-green-600")} />,
    error: <XCircle className={cn("h-5 w-5", colorMap[type].icon, "!text-red-600")} />,
  };


  return (
    <Alert
      className={cn(
        "flex items-start space-x-3 mt-2 mb-4 p-4 rounded-md",
        colorMap[type].bg,
        colorMap[type].border,
        "border",
        className
      )}
    >
      {iconMap[type]}
      <div>
        <AlertTitle className="capitalize font-bold text-slate-800">{title}</AlertTitle>
        <AlertDescription className="text-slate-800">{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default Callout;

