
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Check, Sparkles, Zap, ArrowRight, Keyboard, Clock, Users, FileText, Headphones, Palette } from "lucide-react";

interface PremiumFeatureAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const PremiumFeatureAlert = ({ isOpen, onClose, onSubscribe }: PremiumFeatureAlertProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Crown className="h-5 w-5 text-amber-500 mr-2" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Unlock advanced features to enhance your writing experience.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Standard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced AI writing assistant
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Export to PDF & DOCX
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Remove ads
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Premium writing tools
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={onSubscribe}>
                    Start Standard
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  POPULAR
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Standard
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Collaboration features
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced AI controls
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited AI generations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default" onClick={onSubscribe}>
                    Start Premium
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="annual">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Standard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$95.88<span className="text-sm font-normal text-muted-foreground">/year</span></div>
                  <div className="text-sm text-green-600 font-medium">Save $24 per year</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced AI writing assistant
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Export to PDF & DOCX
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Remove ads
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Premium writing tools
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={onSubscribe}>
                    Start Standard
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  BEST VALUE
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$191.88<span className="text-sm font-normal text-muted-foreground">/year</span></div>
                  <div className="text-sm text-green-600 font-medium">Save $48 per year</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Standard
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Collaboration features
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced AI controls
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited AI generations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default" onClick={onSubscribe}>
                    Start Premium
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <h3 className="font-medium text-center mb-4">Premium features include:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="border rounded-lg p-3 text-center">
              <Sparkles className="h-5 w-5 mx-auto mb-1 text-purple-500" />
              <p className="text-xs font-medium">Advanced AI</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <FileText className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <p className="text-xs font-medium">Export Options</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-xs font-medium">Collaboration</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-xs font-medium">Writing Timers</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <Headphones className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-xs font-medium">Audio Features</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <Palette className="h-5 w-5 mx-auto mb-1 text-amber-500" />
              <p className="text-xs font-medium">Custom Themes</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button className="gap-2" onClick={onSubscribe}>
            <Zap className="h-4 w-4" />
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeatureAlert;
