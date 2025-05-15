
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Bell, Lock, PaintBucket, User } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";

// Mock user data
const user = {
  id: "user_1",
  email: "user@example.com",
  createdAt: "2023-01-15",
  verifiedEmail: true,
  profile: {
    username: "storyteller",
    fullName: "Alex Johnson",
    bio: "Writer of fantasy and sci-fi. Coffee enthusiast.",
    avatar: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  }
};

const Settings = () => {
  const [accountSettings, setAccountSettings] = useState({
    username: user.profile.username,
    fullName: user.profile.fullName,
    email: user.email,
    bio: user.profile.bio,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    commentNotifications: true,
    followNotifications: true,
    messageNotifications: true,
    storyUpdates: true,
    marketingEmails: false,
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    activityVisibility: "followers",
    allowComments: true,
    allowMessages: true,
    showReadingHistory: true,
  });
  
  const handleAccountUpdate = () => {
    toast.success("Account settings updated successfully");
  };
  
  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated");
  };
  
  const handleAppearanceUpdate = () => {
    toast.success("Appearance settings updated");
  };
  
  const handlePrivacyUpdate = () => {
    toast.success("Privacy settings updated");
  };
  
  return (
    <PageLayout currentPath="/settings">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <PaintBucket className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Update your personal information and how others see you on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={accountSettings.username} 
                        onChange={(e) => setAccountSettings({...accountSettings, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={accountSettings.fullName} 
                        onChange={(e) => setAccountSettings({...accountSettings, fullName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={accountSettings.email} 
                      onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={accountSettings.bio} 
                      onChange={(e) => setAccountSettings({...accountSettings, bio: e.target.value})}
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleAccountUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings and connected services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="secondary">Set Up Two-Factor Authentication</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Connected Accounts</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect your account to other services.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline">Connect Google</Button>
                      <Button variant="outline">Connect Facebook</Button>
                      <Button variant="outline">Connect Twitter</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                  <CardDescription>
                    Actions here can't be undone. Please proceed with caution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all your data.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what types of updates you receive via email.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                    <Switch 
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive occasional emails about new features and promotions.
                      </p>
                    </div>
                    <Switch 
                      id="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Notifications</CardTitle>
                  <CardDescription>
                    Configure what activities trigger notifications within the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="commentNotifications">Comments on your stories</Label>
                    <Switch 
                      id="commentNotifications"
                      checked={notificationSettings.commentNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, commentNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="followNotifications">New followers</Label>
                    <Switch 
                      id="followNotifications"
                      checked={notificationSettings.followNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, followNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="messageNotifications">Direct messages</Label>
                    <Switch 
                      id="messageNotifications"
                      checked={notificationSettings.messageNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, messageNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="storyUpdates">Story updates from authors you follow</Label>
                    <Switch 
                      id="storyUpdates"
                      checked={notificationSettings.storyUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, storyUpdates: checked})}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNotificationUpdate} className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Choose how the application looks to you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={appearanceSettings.theme}
                    onValueChange={(value) => setAppearanceSettings({...appearanceSettings, theme: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reading Experience</CardTitle>
                  <CardDescription>
                    Customize how you read content on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Font Size</h3>
                    <RadioGroup 
                      value={appearanceSettings.fontSize}
                      onValueChange={(value) => setAppearanceSettings({...appearanceSettings, fontSize: value})}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small" className="text-sm">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-base">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large" className="text-lg">Large</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Accessibility</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reducedMotion">Reduced Motion</Label>
                      <Switch 
                        id="reducedMotion"
                        checked={appearanceSettings.reducedMotion}
                        onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, reducedMotion: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="highContrast">High Contrast</Label>
                      <Switch 
                        id="highContrast"
                        checked={appearanceSettings.highContrast}
                        onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, highContrast: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAppearanceUpdate} className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                  <CardDescription>
                    Control who can see your profile and activity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Who can see your profile</Label>
                    <RadioGroup 
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => setPrivacySettings({...privacySettings, profileVisibility: value})}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Everyone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="followers" id="followers" />
                        <Label htmlFor="followers">Followers Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Only Me</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="activityVisibility">Who can see your activity</Label>
                    <RadioGroup 
                      value={privacySettings.activityVisibility}
                      onValueChange={(value) => setPrivacySettings({...privacySettings, activityVisibility: value})}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="activity-public" />
                        <Label htmlFor="activity-public">Everyone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="followers" id="activity-followers" />
                        <Label htmlFor="activity-followers">Followers Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="activity-private" />
                        <Label htmlFor="activity-private">Only Me</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Interactions</CardTitle>
                  <CardDescription>
                    Control how others can interact with your content.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowComments">Allow Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Let others comment on your stories and posts.
                      </p>
                    </div>
                    <Switch 
                      id="allowComments"
                      checked={privacySettings.allowComments}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowComments: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowMessages">Allow Direct Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Let others send you private messages.
                      </p>
                    </div>
                    <Switch 
                      id="allowMessages"
                      checked={privacySettings.allowMessages}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowMessages: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showReadingHistory">Show Reading History</Label>
                      <p className="text-sm text-muted-foreground">
                        Show what you're reading in your public activity.
                      </p>
                    </div>
                    <Switch 
                      id="showReadingHistory"
                      checked={privacySettings.showReadingHistory}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showReadingHistory: checked})}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePrivacyUpdate} className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Data</CardTitle>
                  <CardDescription>
                    Manage your personal data and download a copy of your information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline">Download Your Data</Button>
                  <Button variant="secondary">Manage Cookies</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
