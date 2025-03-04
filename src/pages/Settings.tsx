
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  User, Settings as SettingsIcon, Bell, Shield, CreditCard, Languages, 
  Palette, BookOpen, LogOut, ArrowRight, Download, CheckCircle, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");

  // Save settings handler
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Card>
              <CardContent className="p-4">
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  orientation="vertical" 
                  className="w-full"
                >
                  <TabsList className="flex flex-col items-stretch space-y-1 bg-transparent">
                    <TabsTrigger 
                      value="account" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preferences" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="privacy" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy & Security
                    </TabsTrigger>
                    <TabsTrigger 
                      value="billing" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </TabsTrigger>
                    <TabsTrigger 
                      value="language" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <Languages className="mr-2 h-4 w-4" />
                      Language
                    </TabsTrigger>
                    <TabsTrigger 
                      value="appearance" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reading" 
                      className="justify-start text-left px-3 py-2"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Reading
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </CardFooter>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="janesmith" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="jane.smith@example.com" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us about yourself"
                          defaultValue="Writer, avid reader, and storyteller. I love creating fantasy worlds and sharing them with others."
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid gap-4 md:grid-cols-2">
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Management</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="py-1 px-2">
                            Basic Account
                          </Badge>
                          <Button size="sm" variant="link" className="h-auto p-0">
                            Upgrade to Premium
                          </Button>
                        </div>
                      </div>
                      <div className="pt-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Deactivate Account</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will deactivate your account. You can reactivate it anytime by logging back in within 30 days. After 30 days, your account and all associated data will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction variant="destructive">
                                Yes, deactivate my account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your experience on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mature-content">Mature Content</Label>
                          <p className="text-sm text-muted-foreground">
                            Show content marked as mature
                          </p>
                        </div>
                        <Switch id="mature-content" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-recommendations">Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Show personalized content recommendations
                          </p>
                        </div>
                        <Switch id="show-recommendations" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Feed Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Feed View</Label>
                        <RadioGroup defaultValue="following">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="following" id="following" />
                            <Label htmlFor="following">Following</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="discover" id="discover" />
                            <Label htmlFor="discover">Discover</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="trending" id="trending" />
                            <Label htmlFor="trending">Trending</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-sort">Default Sort Order</Label>
                        <Select defaultValue="recent">
                          <SelectTrigger id="default-sort">
                            <SelectValue placeholder="Select a sort order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="trending">Trending</SelectItem>
                            <SelectItem value="top-rated">Top Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Writing Experience</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-save">Auto-Save</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically save drafts while writing
                          </p>
                        </div>
                        <Switch id="auto-save" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="spell-check">Spell Check</Label>
                          <p className="text-sm text-muted-foreground">
                            Highlight spelling errors while writing
                          </p>
                        </div>
                        <Switch id="spell-check" defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-editor">Default Editor Mode</Label>
                        <Select defaultValue="rich">
                          <SelectTrigger id="default-editor">
                            <SelectValue placeholder="Select an editor mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rich">Rich Text</SelectItem>
                            <SelectItem value="markdown">Markdown</SelectItem>
                            <SelectItem value="plain">Plain Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-comments">Comments on your stories</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone comments on your stories
                          </p>
                        </div>
                        <Switch id="email-comments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-likes">Likes on your stories</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone likes your stories
                          </p>
                        </div>
                        <Switch id="email-likes" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-followers">New followers</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone follows you
                          </p>
                        </div>
                        <Switch id="email-followers" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-newsletter">Weekly newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive our weekly newsletter with top stories
                          </p>
                        </div>
                        <Switch id="email-newsletter" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="app-comments">Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications for comments on your stories
                          </p>
                        </div>
                        <Switch id="app-comments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="app-likes">Likes</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications when your stories receive likes
                          </p>
                        </div>
                        <Switch id="app-likes" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="app-followers">Followers</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications when someone follows you
                          </p>
                        </div>
                        <Switch id="app-followers" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="app-mentions">Mentions</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications when you're mentioned in comments
                          </p>
                        </div>
                        <Switch id="app-mentions" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mobile Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow push notifications on your mobile device
                          </p>
                        </div>
                        <Switch id="push-enabled" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-comments">Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Send push notifications for comments
                          </p>
                        </div>
                        <Switch id="push-comments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-likes">Likes</Label>
                          <p className="text-sm text-muted-foreground">
                            Send push notifications for likes
                          </p>
                        </div>
                        <Switch id="push-likes" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-followers">Followers</Label>
                          <p className="text-sm text-muted-foreground">
                            Send push notifications for new followers
                          </p>
                        </div>
                        <Switch id="push-followers" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Who can see your profile
                          </p>
                        </div>
                        <Select defaultValue="public">
                          <SelectTrigger id="profile-visibility" className="w-32">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reading-history">Reading History</Label>
                          <p className="text-sm text-muted-foreground">
                            Who can see what you've read
                          </p>
                        </div>
                        <Select defaultValue="private">
                          <SelectTrigger id="reading-history" className="w-32">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="followers">Followers</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="discovery">Discovery</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to find you through search
                          </p>
                        </div>
                        <Switch id="discovery" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Secure your account with 2FA
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                            Not Enabled
                          </Badge>
                          <Button size="sm" variant="outline">
                            Set Up
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-alerts">Login Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified of new logins to your account
                          </p>
                        </div>
                        <Switch id="login-alerts" defaultChecked />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full md:w-auto">
                          View Login History
                        </Button>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full md:w-auto">
                          Manage Connected Devices
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-collection">Data Collection</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect usage data to improve your experience
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="personalized-ads">Personalized Ads</Label>
                          <p className="text-sm text-muted-foreground">
                            Show personalized ads based on your activity
                          </p>
                        </div>
                        <Switch id="personalized-ads" />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Your Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription plan and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">Basic (Free)</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Limited features and story publishing
                          </p>
                        </div>
                        <Badge variant="outline" className="px-2.5 py-0.5">
                          Current Plan
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">3 stories per month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Basic writing tools</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Standard support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Reader stats</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" className="w-full md:w-auto">
                          Upgrade Plan
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Premium Plans</h3>
                    <ScrollArea className="h-[320px] rounded-md border">
                      <div className="p-4 space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium">Premium</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Advanced features for serious writers
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$9.99</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Unlimited stories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Advanced AI writing tools</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Priority support</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Detailed analytics</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button className="w-full md:w-auto">
                              Subscribe
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium">Professional</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Complete toolkit for professional authors
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$19.99</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Everything in Premium</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Early access to new features</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Professional editing tools</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Marketing assistance</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button className="w-full md:w-auto">
                              Subscribe
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium">Enterprise</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                For publishing houses and organizations
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">Custom</p>
                              <p className="text-sm text-muted-foreground">pricing</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Everything in Professional</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Custom features</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Dedicated account manager</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Team collaboration tools</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="w-full md:w-auto">
                              Contact Sales
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">
                      No payment methods added yet
                    </p>
                    <Button variant="outline">
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <p className="text-sm text-muted-foreground">
                      No billing history available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Manage language preferences for the interface and content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Interface Language</h3>
                    <div className="space-y-2">
                      <Label htmlFor="interface-language">Select your preferred interface language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="interface-language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Languages</h3>
                    <div className="space-y-2">
                      <Label>Select languages for content you want to discover</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-en" defaultChecked />
                          <Label htmlFor="lang-en">English</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-es" defaultChecked />
                          <Label htmlFor="lang-es">Español</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-fr" />
                          <Label htmlFor="lang-fr">Français</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-de" />
                          <Label htmlFor="lang-de">Deutsch</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-it" />
                          <Label htmlFor="lang-it">Italiano</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-pt" />
                          <Label htmlFor="lang-pt">Português</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-ru" />
                          <Label htmlFor="lang-ru">Русский</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-ja" />
                          <Label htmlFor="lang-ja">日本語</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lang-zh" />
                          <Label htmlFor="lang-zh">中文</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Translation</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-translate">Auto-Translate</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically translate content not in your preferred languages
                          </p>
                        </div>
                        <Switch id="auto-translate" defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="translation-quality">Translation Quality</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger id="translation-quality">
                            <SelectValue placeholder="Select quality level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fast">Fast (Less accurate)</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="precise">Precise (Slower)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the visual appearance of the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="border rounded-md p-2 hover:border-primary cursor-pointer">
                            <div className="w-full h-24 bg-white rounded-md mb-2"></div>
                            <div className="flex justify-center">
                              <RadioGroup defaultValue="light">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="light" id="theme-light" />
                                  <Label htmlFor="theme-light">Light</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="border rounded-md p-2 hover:border-primary cursor-pointer">
                            <div className="w-full h-24 bg-gray-900 rounded-md mb-2"></div>
                            <div className="flex justify-center">
                              <RadioGroup defaultValue="light">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="dark" id="theme-dark" />
                                  <Label htmlFor="theme-dark">Dark</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="border rounded-md p-2 hover:border-primary cursor-pointer">
                            <div className="w-full h-24 bg-gradient-to-b from-white to-gray-900 rounded-md mb-2"></div>
                            <div className="flex justify-center">
                              <RadioGroup defaultValue="light">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="system" id="theme-system" />
                                  <Label htmlFor="theme-system">System</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Font</h3>
                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select defaultValue="sans">
                        <SelectTrigger id="font-family">
                          <SelectValue placeholder="Select a font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans">Sans Serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select a font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="x-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Layout</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduced-motion">Reduced Motion</Label>
                          <p className="text-sm text-muted-foreground">
                            Minimize animations throughout the interface
                          </p>
                        </div>
                        <Switch id="reduced-motion" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-view">Compact View</Label>
                          <p className="text-sm text-muted-foreground">
                            Show more content with less spacing
                          </p>
                        </div>
                        <Switch id="compact-view" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reading" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reading Experience</CardTitle>
                  <CardDescription>
                    Customize your reading preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Reading View</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="reading-mode">Default Reading Mode</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="reading-mode">
                            <SelectValue placeholder="Select a reading mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="focused">Focused (Minimal UI)</SelectItem>
                            <SelectItem value="night">Night Mode</SelectItem>
                            <SelectItem value="sepia">Sepia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="line-spacing">Line Spacing</Label>
                        </div>
                        <Select defaultValue="normal">
                          <SelectTrigger id="line-spacing" className="w-32">
                            <SelectValue placeholder="Select spacing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="relaxed">Relaxed</SelectItem>
                            <SelectItem value="loose">Loose</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="paragraph-spacing">Paragraph Spacing</Label>
                        </div>
                        <Select defaultValue="normal">
                          <SelectTrigger id="paragraph-spacing" className="w-32">
                            <SelectValue placeholder="Select spacing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tight">Tight</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="relaxed">Relaxed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Text Alignment</h3>
                    <RadioGroup defaultValue="left">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="border rounded-md p-2 w-full h-16 flex items-center">
                            <div className="w-full space-y-2">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="left" id="align-left" />
                            <Label htmlFor="align-left">Left</Label>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2">
                          <div className="border rounded-md p-2 w-full h-16 flex items-center">
                            <div className="w-full space-y-2">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mx-auto"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="center" id="align-center" />
                            <Label htmlFor="align-center">Center</Label>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2">
                          <div className="border rounded-md p-2 w-full h-16 flex items-center">
                            <div className="w-full space-y-2">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ml-auto"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full ml-auto"></div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6 ml-auto"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="right" id="align-right" />
                            <Label htmlFor="align-right">Right</Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Reading Progress</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-progress">Show Reading Progress</Label>
                          <p className="text-sm text-muted-foreground">
                            Display progress indicator while reading
                          </p>
                        </div>
                        <Switch id="show-progress" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="remember-position">Remember Position</Label>
                          <p className="text-sm text-muted-foreground">
                            Return to where you left off when reopening a story
                          </p>
                        </div>
                        <Switch id="remember-position" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
