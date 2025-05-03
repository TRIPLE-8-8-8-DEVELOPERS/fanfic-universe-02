
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, User, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

// Form schema for profile editing
const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only include letters, numbers, and underscores",
    })
    .optional(),
  display_name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  bio: z.string().max(300, { message: "Bio cannot exceed 300 characters" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileForm({ open, onOpenChange }: EditProfileFormProps) {
  const { profile, updateProfile, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username || "",
      display_name: profile?.display_name || "",
      bio: profile?.bio || "",
      website: profile?.website || "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    try {
      setIsSubmitting(true);
      
      // Get values that actually changed
      const updates: Partial<ProfileFormValues> = {};
      for (const [key, value] of Object.entries(values)) {
        if (value !== profile?.[key as keyof typeof profile]) {
          updates[key as keyof ProfileFormValues] = value;
        }
      }

      // If avatar was changed, upload it
      let avatar_url = profile?.avatar_url;
      if (avatarFile) {
        setIsUploading(true);
        
        // Upload to storage
        const fileName = `${Date.now()}-${avatarFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL
        const { data: publicUrl } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatar_url = publicUrl.publicUrl;
        setIsUploading(false);
      }

      // Only update if there are changes
      if (Object.keys(updates).length > 0 || avatar_url !== profile?.avatar_url) {
        await updateProfile({
          ...updates,
          ...(avatar_url !== profile?.avatar_url ? { avatar_url } : {})
        });
      }

      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }
    
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
      toast.error("Only image files are allowed");
      return;
    }
    
    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const resetAvatarPreview = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar upload section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview || profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-white">
                    {profile?.display_name?.charAt(0) || profile?.username?.charAt(0) || <User />}
                  </AvatarFallback>
                </Avatar>
                {avatarPreview && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border"
                    onClick={resetAvatarPreview}
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
              <div>
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium">
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Change avatar"
                    )}
                  </div>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: 2MB. Formats: JPEG, PNG, GIF
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.value?.length || 0}/300 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
