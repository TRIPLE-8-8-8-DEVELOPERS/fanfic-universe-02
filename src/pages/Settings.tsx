
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  BadgeCheck, Bell, Eye, Lock, Moon, Palette, Shield, Sun, User, 
  LogOut, CreditCard, Gift, Key, Inbox, BookOpen, Users, 
  Laptop, Smartphone, Globe, Github, Twitter, Facebook, 
  LifeBuoy, HelpCircle, Download, Trash2, AlertTriangle, Crown
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "profile");
  const [theme, setTheme] = useState("system");
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    newsletterSubscription: false,
    mentionNotifications: true,
    weeklyDigest: true,
    critiquesAndReviews: true,
    contestUpdates: true,
    systemUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showReadingHistory: true,
    showFollowing: true,
    allowTagging: true,
    allowDirectMessages: true,
    showLastSeen: true,
    shareMyStories: true,
    displayRealName: false
  });
  
  const [bioData, setBioData] = useState({
    displayName: "Jane Doe",
    username: "janedoe",
    bio: "Fantasy writer and avid reader. I love creating worlds where magic and reality blend together.",
    website: "",
    location: "New York, USA",
    authorBio: "I've been writing fantasy fiction since 2015. My work focuses on strong female protagonists and complex magic systems. Winner of the Indie Fantasy Award in 2021.",
    genres: "Fantasy, Urban Fantasy, Young Adult"
  });
  
  const [connected, setConnected] = useState({
    twitter: false,
    facebook: false,
    github: false,
    google: false
  });
  
  const [devices, setDevices] = useState([
    { id: 1, name: "Chrome on Windows", lastActive: "Now", current: true },
    { id: 2, name: "Safari on iPhone", lastActive: "2 hours ago", current: false },
    { id: 3, name: "Firefox on MacBook", lastActive: "Yesterday", current: false }
  ]);
  
  useEffect(() => {
    if (tabParam && ["profile", "account", "notifications", "appearance", "privacy", "billing", "security", "connected", "api"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };
  
  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };
  
  const updateBioData = (field, value) => {
    setBioData({
      ...bioData,
      [field]: value
    });
    toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
  };
  
  const handlePremiumUpgrade = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsPremium(true);
      setLoading(false);
      toast.success("Welcome to Premium! Enjoy all the premium features.");
    }, 1500);
  };
  
  const handleBioSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile information saved successfully!");
  };
  
  const handlePasswordChange = () => {
    // Simulate password change
    toast.success("Password changed successfully!");
  };
  
  const handleConnectService = (service) => {
    setConnected({
      ...connected,
      [service]: !connected[service]
    });
    
    if (!connected[service]) {
      toast.success(`Connected to ${service.charAt(0).toUpperCase() + service.slice(1)}`);
    } else {
      toast.success(`Disconnected from ${service.charAt(0).toUpperCase() + service.slice(1)}`);
    }
  };
  
  const handleRevokeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
    toast.success("Device access revoked successfully");
  };
  
  const handleDataDownload = () => {
    toast.success("Your data export has started. You'll receive an email when it's ready.");
  };
  
  const handleAccountDelete = () => {
    toast.error("Account deletion initiated. We're sorry to see you go.");
  };

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-64 lg:w-80 shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Settings</h1>
              {isPremium && (
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700 gap-1">
                  <Crown className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
            <div className="hidden md:block">
              <SettingsSidebar activeTab={activeTab} setActiveTab={handleTabChange} isPremium={isPremium} />
            </div>
          </div>

          <div className="flex-1 w-full">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="md:hidden grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="connected">Connected</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information visible to others
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleBioSubmit} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex flex-col items-center space-y-3">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="displayName">Display Name</Label>
                              <Input 
                                id="displayName" 
                                value={bioData.displayName}
                                onChange={(e) => setBioData({...bioData, displayName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input 
                                id="username" 
                                value={bioData.username}
                                onChange={(e) => setBioData({...bioData, username: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Biography</Label>
                            <textarea
                              id="bio"
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                              placeholder="Tell us about yourself..."
                              value={bioData.bio}
                              onChange={(e) => setBioData({...bioData, bio: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="website">Website</Label>
                              <Input 
                                id="website" 
                                placeholder="https://yourwebsite.com" 
                                value={bioData.website}
                                onChange={(e) => setBioData({...bioData, website: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input 
                                id="location" 
                                placeholder="City, Country" 
                                value={bioData.location}
                                onChange={(e) => setBioData({...bioData, location: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Writer Profile</CardTitle>
                    <CardDescription>Customize your author presence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="authorBio">Author Bio</Label>
                      <textarea
                        id="authorBio"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                        placeholder="Your biography as an author..."
                        value={bioData.authorBio}
                        onChange={(e) => setBioData({...bioData, authorBio: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genres">Preferred Genres</Label>
                      <Input
                        id="genres"
                        placeholder="Fantasy, Science Fiction, Romance..."
                        value={bioData.genres}
                        onChange={(e) => setBioData({...bioData, genres: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate genres with commas
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Verified Author Status</Label>
                          <p className="text-sm text-muted-foreground">
                            Apply for a verified badge on your profile
                          </p>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <BadgeCheck className="h-4 w-4" />
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      Last updated: May 15, 2023
                    </div>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (optional)</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div></div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <Button variant="outline" onClick={handlePasswordChange}>Change Password</Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button variant="outline" onClick={handleDataDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Download My Data
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleAccountDelete} className="bg-destructive text-destructive-foreground">
                                Yes, delete my account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates via email
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={() => handleNotificationChange("emailNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Comment Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone comments on your stories
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.commentNotifications}
                          onCheckedChange={() => handleNotificationChange("commentNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Like Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone likes your stories
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.likeNotifications}
                          onCheckedChange={() => handleNotificationChange("likeNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Follow Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone follows you
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.followNotifications}
                          onCheckedChange={() => handleNotificationChange("followNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive our monthly newsletter with writing tips and contests
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newsletterSubscription}
                          onCheckedChange={() => handleNotificationChange("newsletterSubscription")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Mention Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone mentions you in a comment or story
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.mentionNotifications}
                          onCheckedChange={() => handleNotificationChange("mentionNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of activities related to your content
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyDigest}
                          onCheckedChange={() => handleNotificationChange("weeklyDigest")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Critiques & Reviews</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone reviews or critiques your work
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.critiquesAndReviews}
                          onCheckedChange={() => handleNotificationChange("critiquesAndReviews")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Contest Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about writing contests and challenges
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.contestUpdates}
                          onCheckedChange={() => handleNotificationChange("contestUpdates")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about platform changes and new features
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={() => handleNotificationChange("systemUpdates")}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t px-6 py-4">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how FanFic Universe looks for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="light"
                            id="theme-light"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-3 h-6 w-6" />
                            Light
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="dark"
                            id="theme-dark"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-3 h-6 w-6" />
                            Dark
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="system"
                            id="theme-system"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                          >
                            <Palette className="mb-3 h-6 w-6" />
                            System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Reading Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="font-size">Font Size</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                              <SelectItem value="x-large">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="line-spacing">Line Spacing</Label>
                          <Select defaultValue="normal">
                            <SelectTrigger>
                              <SelectValue placeholder="Select line spacing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tight">Tight</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="relaxed">Relaxed</SelectItem>
                              <SelectItem value="spacious">Spacious</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Editor Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="editor-theme">Editor Theme</Label>
                          <Select defaultValue="light">
                            <SelectTrigger>
                              <SelectValue placeholder="Select editor theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="sepia">Sepia</SelectItem>
                              <SelectItem value="contrast">High Contrast</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editor-font">Editor Font</Label>
                          <Select defaultValue="sans">
                            <SelectTrigger>
                              <SelectValue placeholder="Select editor font" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sans">Sans-serif</SelectItem>
                              <SelectItem value="serif">Serif</SelectItem>
                              <SelectItem value="mono">Monospace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="autosave">Autosave</Label>
                          <Switch defaultChecked id="autosave" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your work while writing
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="spellcheck">Spell Check</Label>
                          <Switch defaultChecked id="spellcheck" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enable spell checking while typing
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t px-6 py-4">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control your profile visibility and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      <RadioGroup
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="public" id="visibility-public" />
                          <Label htmlFor="visibility-public">Public (everyone can see)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="followers"
                            id="visibility-followers"
                          />
                          <Label htmlFor="visibility-followers">Followers only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="visibility-private" />
                          <Label htmlFor="visibility-private">Private (only you can see)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Show Reading History</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see what stories you've read
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.showReadingHistory}
                          onCheckedChange={(checked) => handlePrivacyChange("showReadingHistory", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Show Following</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see who you follow
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.showFollowing}
                          onCheckedChange={(checked) => handlePrivacyChange("showFollowing", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Allow Tagging</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to tag you in stories and comments
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.allowTagging}
                          onCheckedChange={(checked) => handlePrivacyChange("allowTagging", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Allow Direct Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow other users to send you direct messages
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.allowDirectMessages}
                          onCheckedChange={(checked) => handlePrivacyChange("allowDirectMessages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Show Last Seen</Label>
                          <p className="text-sm text-muted-foreground">
                            Show when you were last active on the platform
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.showLastSeen}
                          onCheckedChange={(checked) => handlePrivacyChange("showLastSeen", checked)}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Usage</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Personalized Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to use your reading history to suggest stories
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Analytics Cookies</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect anonymous usage data to improve the platform
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t px-6 py-4">
                    <Button>Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!isPremium ? (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-6 text-center">
                        <div className="mx-auto w-fit bg-amber-100 dark:bg-amber-900/50 rounded-full p-3 mb-4">
                          <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Upgrade to Premium</h3>
                        <p className="text-amber-700 dark:text-amber-400 mb-6 max-w-md mx-auto">
                          Unlock advanced writing tools, AI assistance, export options, and more with a premium subscription.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto mb-6">
                          <div className="rounded-lg border p-4 bg-background">
                            <Badge className="mb-1">Monthly</Badge>
                            <div className="text-2xl font-bold mb-2">$9.99 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
                            <ul className="space-y-2 mb-4 text-sm">
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Advanced AI writing tools
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Collaborative editing
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Export to PDF, DOCX
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                No ads
                              </li>
                            </ul>
                            <Button 
                              className="w-full" 
                              onClick={handlePremiumUpgrade}
                              disabled={loading}
                            >
                              {loading ? "Processing..." : "Subscribe Monthly"}
                            </Button>
                          </div>
                          <div className="rounded-lg border border-primary p-4 bg-background relative">
                            <Badge className="absolute -top-2 -right-2 bg-primary">Best Value</Badge>
                            <Badge className="mb-1">Annual</Badge>
                            <div className="text-2xl font-bold mb-2">$89.99 <span className="text-sm font-normal text-muted-foreground">/year</span></div>
                            <div className="text-sm text-primary mb-2">Save $29.89 (25%)</div>
                            <ul className="space-y-2 mb-4 text-sm">
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                All monthly features
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Priority customer support
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Early access to new features
                              </li>
                              <li className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                Access to exclusive contests
                              </li>
                            </ul>
                            <Button 
                              variant="default" 
                              className="w-full" 
                              onClick={handlePremiumUpgrade}
                              disabled={loading}
                            >
                              {loading ? "Processing..." : "Subscribe Annually"}
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Cancel anytime. Subscription automatically renews until canceled.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="rounded-lg border bg-background p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Crown className="h-5 w-5 text-amber-500" />
                              <h3 className="text-lg font-medium">Premium Subscription</h3>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                              Active
                            </Badge>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Annual Plan</p>
                                <p className="text-sm text-muted-foreground">Renews on May 15, 2024</p>
                              </div>
                              <span className="font-medium">$89.99/year</span>
                            </div>
                            <Progress value={33} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>4 months used</span>
                              <span>8 months remaining</span>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Cancel Subscription</Button>
                              <Button size="sm">Manage Subscription</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Payment Method</h3>
                          <div className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-8 w-8 text-muted-foreground" />
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Visa - Expires 05/2025</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Billing History</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
                                </tr>
                              </thead>
                              <tbody className="bg-background divide-y">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">May 15, 2023</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">$89.99</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                      Paid
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and connected devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="rounded-lg border p-4 bg-background">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              <Key className="h-4 w-4" />
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="2fa" />
                        </div>
                        <div className="grid gap-2">
                          <Button variant="outline" size="sm" className="justify-start">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Set up with Authenticator App
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            <Inbox className="h-4 w-4 mr-2" />
                            Set up with Email
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Connected Devices</h3>
                      <div className="space-y-3">
                        {devices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              {device.name.includes('Chrome') && <Laptop className="h-5 w-5 text-muted-foreground" />}
                              {device.name.includes('Safari') && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                              {device.name.includes('Firefox') && <Globe className="h-5 w-5 text-muted-foreground" />}
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  {device.name}
                                  {device.current && (
                                    <Badge variant="outline" className="ml-2 text-xs">Current</Badge>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">Last active: {device.lastActive}</p>
                              </div>
                            </div>
                            {!device.current && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                onClick={() => handleRevokeDevice(device.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Activity</h3>
                      <div className="rounded-lg border overflow-hidden">
                        <div className="bg-muted/50 px-4 py-3 text-sm font-medium">Recent Logins</div>
                        <div className="p-0">
                          <div className="border-b last:border-0">
                            <div className="flex justify-between items-center p-4">
                              <div>
                                <p className="font-medium">Chrome on Windows</p>
                                <p className="text-xs text-muted-foreground">Los Angeles, USA • June 15, 2023 at 2:30 PM</p>
                              </div>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                Current
                              </Badge>
                            </div>
                          </div>
                          <div className="border-b last:border-0">
                            <div className="flex justify-between items-center p-4">
                              <div>
                                <p className="font-medium">Safari on iPhone</p>
                                <p className="text-xs text-muted-foreground">Los Angeles, USA • June 14, 2023 at 9:15 AM</p>
                              </div>
                              <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
                                Successful
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connected" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>
                      Connect your accounts for easier login and sharing features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#1DA1F2]/10 rounded-full p-2">
                            <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                          </div>
                          <div>
                            <p className="font-medium">Twitter</p>
                            <p className="text-sm text-muted-foreground">
                              {connected.twitter ? "Connected as @janedoe" : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant={connected.twitter ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => handleConnectService("twitter")}
                        >
                          {connected.twitter ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#4267B2]/10 rounded-full p-2">
                            <Facebook className="h-5 w-5 text-[#4267B2]" />
                          </div>
                          <div>
                            <p className="font-medium">Facebook</p>
                            <p className="text-sm text-muted-foreground">
                              {connected.facebook ? "Connected as Jane Doe" : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant={connected.facebook ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => handleConnectService("facebook")}
                        >
                          {connected.facebook ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#333]/10 rounded-full p-2">
                            <Github className="h-5 w-5 text-[#333] dark:text-white" />
                          </div>
                          <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-sm text-muted-foreground">
                              {connected.github ? "Connected as janedoe" : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant={connected.github ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => handleConnectService("github")}
                        >
                          {connected.github ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cross-posting Settings</CardTitle>
                    <CardDescription>
                      Automatically share your stories to connected platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base flex items-center gap-2">
                            <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                            Auto-post to Twitter
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Share new stories automatically on Twitter
                          </p>
                        </div>
                        <Switch disabled={!connected.twitter} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base flex items-center gap-2">
                            <Facebook className="h-4 w-4 text-[#4267B2]" />
                            Auto-post to Facebook
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Share new stories automatically on Facebook
                          </p>
                        </div>
                        <Switch disabled={!connected.facebook} />
                      </div>
                    </div>
                    
                    {(!connected.twitter && !connected.facebook) && (
                      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
                        <p className="text-sm text-amber-800 dark:text-amber-400 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Connect at least one social account to enable cross-posting
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const SettingsSidebar = ({ activeTab, setActiveTab, isPremium }) => {
  return (
    <div className="sticky top-24 space-y-1">
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("profile"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "profile" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <User className="mr-2 h-4 w-4" />
        Profile
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("account"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "account" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Shield className="mr-2 h-4 w-4" />
        Account
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("notifications"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "notifications" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Bell className="mr-2 h-4 w-4" />
        Notifications
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("appearance"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "appearance" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Eye className="mr-2 h-4 w-4" />
        Appearance
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("privacy"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "privacy" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Lock className="mr-2 h-4 w-4" />
        Privacy
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("billing"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "billing" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Billing
        {!isPremium && <Crown className="ml-auto h-3 w-3 text-amber-500" />}
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("security"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "security" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Key className="mr-2 h-4 w-4" />
        Security
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab("connected"); }}
        className={`flex items-center py-2 px-3 rounded-md ${activeTab === "connected" ? "bg-muted text-primary" : "text-foreground hover:bg-muted"}`}
      >
        <Globe className="mr-2 h-4 w-4" />
        Connected Accounts
      </a>
      <div className="pt-4 mt-4 border-t">
        <a
          href="/support"
          className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted"
        >
          <LifeBuoy className="mr-2 h-4 w-4" />
          Help & Support
        </a>
        <a
          href="#"
          className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Settings;
