
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, XCircle, Sparkles, Zap } from "lucide-react";

interface SubscriptionBannerProps {
  onSubscribe: () => void;
}

const SubscriptionBanner = ({ onSubscribe }: SubscriptionBannerProps) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  if (!isBannerVisible) return null;
  
  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Crown className="h-5 w-5 text-amber-500 mr-2" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Upgrade to Premium for advanced AI writing tools, collaboration features, and more!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant="ghost"
            className="h-8 p-0 w-8 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900"
            onClick={() => setIsBannerVisible(false)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="gap-1 h-8 bg-amber-600 hover:bg-amber-700 text-white border-0"
            onClick={onSubscribe}
          >
            <Sparkles className="h-3 w-3" />
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
