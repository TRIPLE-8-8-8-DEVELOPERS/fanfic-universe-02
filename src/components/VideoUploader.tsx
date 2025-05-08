import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Upload, X, Play, CheckCircle, AlertCircle } from "lucide-react";

interface VideoUploaderProps {
  onVideoUploaded?: (videoUrl: string) => void;
}

const VideoUploader = ({ onVideoUploaded }: VideoUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError("");
    
    // Check if file is a video
    if (!file.type.includes("video/")) {
      setError("Please upload a valid video file.");
      return;
    }
    
    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video size exceeds 100MB limit.");
      return;
    }
    
    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);
  };

  const handleUpload = () => {
    if (!videoFile) return;
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress(100);
        
        // Simulate completion after a short delay
        setTimeout(() => {
          setUploading(false);
          
          // Notify parent component
          if (onVideoUploaded) {
            onVideoUploaded(videoPreview);
          }
          
          toast({
            title: "Video uploaded successfully",
            description: `${videoFile.name} has been uploaded.`,
          });
        }, 500);
      }
      setUploadProgress(progress);
    }, 300);
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {!videoPreview ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="mb-2 text-sm font-semibold">
              Drag and drop your video here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports MP4, WebM, MOV (max 100MB)
            </p>
            <Button onClick={() => inputRef.current?.click()}>
              Select Video
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="relative">
            <video
              src={videoPreview}
              controls
              className="w-full h-auto max-h-[300px]"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={clearVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm truncate max-w-[200px]">
                  {videoFile?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {videoFile && (videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              
              {!uploading && uploadProgress !== 100 ? (
                <Button onClick={handleUpload} size="sm" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              ) : uploadProgress === 100 ? (
                <Button variant="outline" size="sm" className="gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Uploaded
                </Button>
              ) : null}
            </div>
            
            {uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-sm flex items-center gap-1 mt-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
