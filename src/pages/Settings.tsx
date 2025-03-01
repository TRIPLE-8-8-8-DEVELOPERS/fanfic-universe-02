
import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Bell, Eye, Lock, Moon, Palette, Shield, Sun, User } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const [theme, setTheme] = useState("system");
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    newsletterSubscription: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showReadingHistory: true,
    showFollowing: true,
  });

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-64 lg:w-80 shrink-0">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="hidden md:block">
              <SettingsSidebar />
            </div>
          </div>

          <div className="flex-1 w-full">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="md:hidden grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
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
                            <Input id="displayName" defaultValue="Jane Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="janedoe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Biography</Label>
                          <textarea
                            id="bio"
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                            placeholder="Tell us about yourself..."
                            defaultValue="Fantasy writer and avid reader. I love creating worlds where magic and reality blend together."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" placeholder="https://yourwebsite.com" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
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
                        defaultValue="I've been writing fantasy fiction since 2015. My work focuses on strong female protagonists and complex magic systems. Winner of the Indie Fantasy Award in 2021."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genres">Preferred Genres</Label>
                      <Input
                        id="genres"
                        placeholder="Fantasy, Science Fiction, Romance..."
                        defaultValue="Fantasy, Urban Fantasy, Young Adult"
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
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
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
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="destructive">Delete Account</Button>
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
                    </div>
                  </CardContent>
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
                          <select
                            id="font-size"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option>Small</option>
                            <option selected>Medium</option>
                            <option>Large</option>
                            <option>Extra Large</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="line-spacing">Line Spacing</Label>
                          <select
                            id="line-spacing"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option>Tight</option>
                            <option selected>Normal</option>
                            <option>Relaxed</option>
                            <option>Spacious</option>
                          </select>
                        </div>
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
                      Control your profile visibility and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      <RadioGroup
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) =>
                          setPrivacySettings({ ...privacySettings, profileVisibility: value })
                        }
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
                          onCheckedChange={(checked) =>
                            setPrivacySettings({ ...privacySettings, showReadingHistory: checked })
                          }
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
                          onCheckedChange={(checked) =>
                            setPrivacySettings({ ...privacySettings, showFollowing: checked })
                          }
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

const SettingsSidebar = () => {
  return (
    <div className="sticky top-24 space-y-1">
      <Link
        to="/settings"
        className="flex items-center py-2 px-3 rounded-md bg-muted text-primary"
      >
        <User className="mr-2 h-4 w-4" />
        Profile
      </Link>
      <Link
        to="/settings?tab=account"
        className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted"
      >
        <Shield className="mr-2 h-4 w-4" />
        Account
      </Link>
      <Link
        to="/settings?tab=notifications"
        className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted"
      >
        <Bell className="mr-2 h-4 w-4" />
        Notifications
      </Link>
      <Link
        to="/settings?tab=appearance"
        className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted"
      >
        <Eye className="mr-2 h-4 w-4" />
        Appearance
      </Link>
      <Link
        to="/settings?tab=privacy"
        className="flex items-center py-2 px-3 rounded-md text-foreground hover:bg-muted"
      >
        <Lock className="mr-2 h-4 w-4" />
        Privacy
      </Link>
    </div>
  );
};

export default Settings;
