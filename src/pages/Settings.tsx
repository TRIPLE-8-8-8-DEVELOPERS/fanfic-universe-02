import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainSidebar from "../components/MainSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bell,
  User,
  Shield,
  Palette,
  Eye,
  MessageSquare,
  Mail,
  FileText,
  Trash2,
  Globe,
  Mail as MailIcon,
  Bell as BellIcon,
  Lock,
  BookOpen
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  
  // Account settings - now using profile object instead of user
  const [username, setUsername] = useState(profile?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(profile?.bio || "");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [followNotifications, setFollowNotifications] = useState(true);
  const [storyUpdates, setStoryUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  
  // Appearance settings
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState("medium");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [showReadingActivity, setShowReadingActivity] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  
  const handleSaveAccount = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account settings updated",
        description: "Your account settings have been saved successfully.",
      });
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account deletion requested",
        description: "We've sent an email to confirm your account deletion request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar currentPath="/settings" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 container max-w-6xl py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-card text-card-foreground border">
              <TabsTrigger value="account" className="data-[state=active]:bg-primary/10 gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/10 gap-2">
                <Palette size={16} />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/10 gap-2">
                <Shield size={16} />
                <span className="hidden sm:inline">Privacy & Security</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information and manage your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself..." 
                      className="h-24"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div></div>
                  <Button onClick={handleSaveAccount} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Permanent actions that cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deleting your account will remove all your data, including your profile, stories, and comments.
                    This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Configure how and when you receive email notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of activity
                      </p>
                    </div>
                    <Switch 
                      checked={weeklyDigest} 
                      onCheckedChange={setWeeklyDigest}
                      disabled={!emailNotifications}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Configure push notifications for the app and browser.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        When someone comments on your stories
                      </p>
                    </div>
                    <Switch 
                      checked={commentNotifications} 
                      onCheckedChange={setCommentNotifications}
                      disabled={!pushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Followers</Label>
                      <p className="text-sm text-muted-foreground">
                        When someone follows you
                      </p>
                    </div>
                    <Switch 
                      checked={followNotifications} 
                      onCheckedChange={setFollowNotifications}
                      disabled={!pushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Story Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        When stories you follow are updated
                      </p>
                    </div>
                    <Switch 
                      checked={storyUpdates} 
                      onCheckedChange={setStoryUpdates}
                      disabled={!pushNotifications}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Customize how FanVerse looks for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Mode</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch 
                      checked={reducedMotion} 
                      onCheckedChange={setReducedMotion} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High Contrast</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better readability
                      </p>
                    </div>
                    <Switch 
                      checked={highContrast} 
                      onCheckedChange={setHighContrast} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reading Experience</CardTitle>
                  <CardDescription>
                    Customize your reading experience on FanVerse.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Reading Font</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System Default</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Line Spacing</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue placeholder="Select line spacing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="relaxed">Relaxed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your privacy and visibility on FanVerse.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Everyone can see)</SelectItem>
                        <SelectItem value="followers">Followers Only</SelectItem>
                        <SelectItem value="private">Private (Only you)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reading Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Show others what you're reading
                      </p>
                    </div>
                    <Switch 
                      checked={showReadingActivity} 
                      onCheckedChange={setShowReadingActivity} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Tagging</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to tag you in comments and stories
                      </p>
                    </div>
                    <Switch 
                      checked={allowTagging} 
                      onCheckedChange={setAllowTagging} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Online Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Show when you're active on FanVerse
                      </p>
                    </div>
                    <Switch 
                      checked={showOnlineStatus} 
                      onCheckedChange={setShowOnlineStatus} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your account password
                      </p>
                    </div>
                    <Button variant="outline">
                      <Lock className="mr-2 h-4 w-4" /> Change
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage devices where you're logged in
                      </p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>
                    Manage your data and download your information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Download Your Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Get a copy of all your FanVerse data
                      </p>
                    </div>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
