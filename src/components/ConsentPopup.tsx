
import { useState, useEffect } from 'react';
import { AlertTriangle, Info, Check } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ConsentPopup = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if the user has already agreed
    const hasAgreed = localStorage.getItem('survivalist-consent');
    
    if (!hasAgreed) {
      // Show the dialog if no consent has been given yet
      setOpen(true);
    }
  }, []);

  const handleAgree = () => {
    // Save consent to localStorage
    localStorage.setItem('survivalist-consent', 'true');
    
    // Close the dialog
    setOpen(false);
    
    // Show a success toast
    toast({
      title: "Agreement Accepted",
      description: "Thank you for agreeing to use Survivalist GPT responsibly.",
      variant: "default",
      duration: 2000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md glass-panel border-survival-accent/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-survival-danger" />
            Important Disclaimer
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Please review and acknowledge the following before using Survivalist GPT.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-3 text-sm text-gray-200">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-survival-accent flex-shrink-0 mt-0.5" />
            <p>
              I understand this tool is for research and informational educational purposes only.
            </p>
          </div>
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-survival-accent flex-shrink-0 mt-0.5" />
            <p>
              I agree to use this AI Tool ethically and responsibly.
            </p>
          </div>
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-survival-accent flex-shrink-0 mt-0.5" />
            <p>
              I will double check and verify AI generated responses for accuracy.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={handleAgree} 
            className="w-full sm:w-auto bg-survival-accent hover:bg-survival-brightAccent text-white"
          >
            <Check className="mr-2 h-4 w-4" /> I AGREE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentPopup;
