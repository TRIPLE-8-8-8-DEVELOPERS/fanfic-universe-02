
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, XCircle, Sparkles, Zap, FileText, Users, Globe, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SubscriptionBannerProps {
  onSubscribe: () => void;
}

const SubscriptionBanner = ({ onSubscribe }: SubscriptionBannerProps) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  if (!isBannerVisible) return null;
  
  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/50 p-1.5 mr-3 shrink-0">
            <Crown className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Upgrade to Premium for advanced AI writing tools and exclusive features
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                AI Assistant
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Collaboration
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Professional Exports
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                size="sm"
                variant="outline"
                className="h-8 px-2 text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/50"
              >
                <FileText className="h-3 w-3 mr-1" />
                Learn More
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Crown className="h-4 w-4 text-amber-500" />
                  Premium Features
                </h4>
                <p className="text-sm mt-1 text-muted-foreground">
                  Everything you need to take your writing to the next level
                </p>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex gap-3">
                  <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-1.5 h-6 w-6 flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3 text-violet-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">AI-Powered Writing Tools</h5>
                    <p className="text-xs text-muted-foreground">Get intelligent suggestions and overcome writer's block</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-1.5 h-6 w-6 flex items-center justify-center shrink-0">
                    <Users className="h-3 w-3 text-indigo-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Collaboration Features</h5>
                    <p className="text-xs text-muted-foreground">Work with co-authors in real-time with comments and feedback</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1.5 h-6 w-6 flex items-center justify-center shrink-0">
                    <FileText className="h-3 w-3 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Professional Exports</h5>
                    <p className="text-xs text-muted-foreground">Export your stories as PDF, DOCX, and other formats</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 p-1.5 h-6 w-6 flex items-center justify-center shrink-0">
                    <Globe className="h-3 w-3 text-cyan-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Ad-Free Experience</h5>
                    <p className="text-xs text-muted-foreground">Enjoy distraction-free writing and reading</p>
                  </div>
                </div>
              </div>
              <div className="border-t p-3 flex justify-end">
                <Button 
                  size="sm"
                  className="gap-1 h-8 bg-amber-600 hover:bg-amber-700 text-white border-0"
                  onClick={onSubscribe}
                >
                  <Zap className="h-3 w-3" />
                  Get Premium
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            className="gap-1 h-8 bg-amber-600 hover:bg-amber-700 text-white border-0"
            onClick={onSubscribe}
          >
            <Sparkles className="h-3 w-3" />
            Upgrade
          </Button>
          <Button 
            size="sm"
            variant="ghost"
            className="h-8 p-0 w-8 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900"
            onClick={() => setIsBannerVisible(false)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
