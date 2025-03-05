
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-survival-dark p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center",
            "bg-survival-danger/20 border border-survival-danger/40"
          )}>
            <AlertTriangle className="w-12 h-12 text-survival-danger" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-gray-300 mb-8">This location is uncharted territory</p>
        <a 
          href="/" 
          className="btn-primary inline-flex"
        >
          Return to Base Camp
        </a>
      </div>
    </div>
  );
};

export default NotFound;
