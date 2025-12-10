import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Copy, Download, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalRecords?: number;
  verifiedRecords?: number;
  clinicsVisited?: number;
  notifications?: number;
}

export const ProfileCard = ({ 
  user, 
  stats 
}: { 
  user: any;
  stats?: DashboardStats;
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyDID = () => {
    if (user?.did) {
      navigator.clipboard.writeText(user.did);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "DID code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadDID = () => {
    if (user?.did) {
      const element = document.createElement("a");
      const file = new Blob(
        [`DID: ${user.did}\nName: ${user.name}\nEmail: ${user.email}`], 
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${user.did}-DID.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Downloaded!",
        description: "DID file downloaded successfully",
      });
    }
  };

  return (
    <Card className="bg-white py-6 px-6 max-w-2xl flex flex-col lg:flex-row items-center justify-evenly text-center border-none">
      <div className="rounded-full h-34 w-34 bg-primary/20 flex items-center justify-center">
        <User className="h-24 w-24 text-primary" />
      </div>
      <div>
        <div>
          <h2 className="mt-4 text-xl lg:text-2xl font-bold uppercase">{user?.name || "User"}</h2>
          <p className="text-xs lg:text-sm text-muted-foreground">{user?.region || "Not provided"}</p>
          {user?.verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
              <Check className="h-3 w-3" />
              Verified Account
            </span>
          )}
        </div>
        <div className="ml-6 flex w-full flex-col items-center">
          <div className="mt-4 flex w-full justify-center space-x-2 text-xs lg:text-sm">
            <span className="rounded-full bg-primary/20 px-3 py-2">
              {user?.gender || "N/A"}
            </span>
            <span className="rounded-full bg-primary/20 px-3 py-2">
              {user?.dob || "N/A"}
            </span>
            <span className="rounded-full bg-primary/20 px-3 py-2">
              {user?.region?.split(' / ')[1] || "N/A"}
            </span>
          </div>

          <div className="mt-6 flex w-full flex-row gap-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-1/2 text-xs h-8 border-primary text-primary"
              onClick={handleCopyDID}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-primary" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4 text-primary" /> Copy DID Code
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-1/2 text-xs h-8 border-primary text-primary"
              onClick={handleDownloadDID}
            >
              <Download className="mr-2 h-4 w-4 text-primary" /> Download DID File
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};