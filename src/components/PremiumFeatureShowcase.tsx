
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Zap, ArrowRight, FileText, Clock, Users, Brain, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface PremiumFeatureShowcaseProps {
  onSubscribe: () => void;
}

const PremiumFeatureShowcase = ({ onSubscribe }: PremiumFeatureShowcaseProps) => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "AI-Powered Writing Assistant",
      description: "Get intelligent suggestions, plot ideas, and help overcoming writer's block",
      icon: <Brain className="h-6 w-6 text-violet-500" />,
      color: "bg-violet-100 dark:bg-violet-900/30",
      highlight: "violet"
    },
    {
      title: "Advanced Collaboration Tools",
      description: "Invite friends to co-write stories with real-time editing and comments",
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      highlight: "indigo"
    },
    {
      title: "Professional Export Options",
      description: "Export your stories in multiple formats including PDF, DOCX, and ePub",
      icon: <Download className="h-6 w-6 text-emerald-500" />,
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      highlight: "emerald"
    },
    {
      title: "Writing Analytics Dashboard",
      description: "Track your writing habits, productivity metrics, and goal progress",
      icon: <Clock className="h-6 w-6 text-cyan-500" />,
      color: "bg-cyan-100 dark:bg-cyan-900/30",
      highlight: "cyan"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Auto-rotate features every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  });
  
  const handleTryPremium = () => {
    onSubscribe();
    toast.success("Let's upgrade your writing experience!");
  };
  
  const activeFeatureData = features[activeFeature];
  
  return (
    <Card className="border-amber-200 dark:border-amber-800 overflow-hidden">
      <CardHeader className="pb-0">
        <Badge className="w-fit mb-2 bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700 gap-1">
          <Crown className="h-3 w-3" />
          Premium
        </Badge>
        <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
          Elevate Your Writing Experience
          <Sparkles className="h-5 w-5 text-amber-500" />
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Unlock powerful tools and features to take your writing to the next level
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Feature Tabs */}
          <div className="md:w-1/3">
            <motion.div 
              className="flex flex-col gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  onClick={() => setActiveFeature(index)}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-all
                    ${index === activeFeature ? 
                      `${feature.color} border border-${feature.highlight}-200 dark:border-${feature.highlight}-800` : 
                      'hover:bg-muted'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${index === activeFeature ? `bg-${feature.highlight}-200 dark:bg-${feature.highlight}-800/50` : 'bg-muted'}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Feature Showcase */}
          <div className="md:w-2/3">
            <motion.div 
              className={`rounded-xl p-6 h-full ${activeFeatureData.color} border border-${activeFeatureData.highlight}-200 dark:border-${activeFeatureData.highlight}-800`}
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`rounded-full p-3 bg-${activeFeatureData.highlight}-200 dark:bg-${activeFeatureData.highlight}-800/50`}>
                      {activeFeatureData.icon}
                    </div>
                    <h3 className="text-xl font-bold">{activeFeatureData.title}</h3>
                  </div>
                  
                  <p className="text-lg mb-6">{activeFeatureData.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 text-${activeFeatureData.highlight}-500`} />
                      <span>Unlimited access to premium tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 text-${activeFeatureData.highlight}-500`} />
                      <span>Ad-free writing environment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 text-${activeFeatureData.highlight}-500`} />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 text-${activeFeatureData.highlight}-500`} />
                      <span>Early access to new features</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleTryPremium}
                  size="lg" 
                  className={`w-full md:w-auto gap-2 bg-${activeFeatureData.highlight}-500 hover:bg-${activeFeatureData.highlight}-600 text-white border-0`}
                >
                  <Zap className="h-4 w-4" />
                  Try Premium Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center bg-amber-50/50 dark:bg-amber-950/20 border-t border-amber-100 dark:border-amber-900 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Starting at just $9.99/month. Cancel anytime.
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-amber-700">
          <FileText className="h-4 w-4" />
          View all features
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumFeatureShowcase;
