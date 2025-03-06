
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, PaintBucket, Volume2, VolumeX, Clock, Target, Users, 
  Save, Music, EyeOff, UserCheck, Keyboard, Cloud, CloudOff, Crown,
  AlertCircle, Check, Palette, Zap
} from "lucide-react";
import { toast } from "sonner";

interface WritingSettingsProps {
  isPremium: boolean;
  onUpgradeRequest: () => void;
}

const WritingSettings = ({ isPremium, onUpgradeRequest }: WritingSettingsProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);
  const [speechRate, setSpeechRate] = useState(100);
  const [speechPitch, setSpeechPitch] = useState(100);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);
  const [targetWordCount, setTargetWordCount] = useState(1000);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [collaborationEnabled, setCollaborationEnabled] = useState(false);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [isSpellCheckEnabled, setIsSpellCheckEnabled] = useState(true);
  const [isGrammarCheckEnabled, setIsGrammarCheckEnabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] = useState(true);

  useEffect(() => {
    // Safely initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const loadVoices = () => {
          const availableVoices = window.speechSynthesis.getVoices();
          if (availableVoices.length > 0) {
            setVoices(availableVoices);
            if (!selectedVoice && availableVoices.length > 0) {
              setSelectedVoice(availableVoices[0].name);
            }
          }
        };

        // Load voices initially
        loadVoices();
        
        // Chrome needs this event to load voices
        window.speechSynthesis.onvoiceschanged = loadVoices;
        
        return () => {
          // Clean up event listener
          window.speechSynthesis.onvoiceschanged = null;
        };
      } catch (error) {
        console.error("Error initializing speech synthesis:", error);
      }
    }
  }, [selectedVoice]);

  const handleCollaboratorAdd = () => {
    if (!newCollaborator.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!isPremium) {
      onUpgradeRequest();
      return;
    }
    
    setCollaborators([...collaborators, newCollaborator]);
    setNewCollaborator("");
    toast.success(`${newCollaborator} added as a collaborator`);
  };

  const handleCollaboratorRemove = (email: string) => {
    setCollaborators(collaborators.filter(c => c !== email));
    toast.success(`${email} removed from collaborators`);
  };

  const handleTestVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && selectedVoice) {
      try {
        const utterance = new SpeechSynthesisUtterance("This is a test of the speech synthesis voice.");
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
          utterance.rate = speechRate / 100;
          utterance.pitch = speechPitch / 100;
          window.speechSynthesis.speak(utterance);
        }
      } catch (error) {
        console.error("Error testing voice:", error);
        toast.error("Could not test voice. Speech synthesis may not be supported in your browser.");
      }
    }
  };

  return (
    <Card className="border-border bg-background text-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Writing Settings
          {!isPremium && (
            <Button 
              size="sm" 
              variant="outline"
              className="ml-auto gap-1 text-xs border-amber-300 text-amber-500"
              onClick={onUpgradeRequest}
            >
              <Crown className="h-3 w-3 text-amber-500" />
              Upgrade for Premium Features
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Customize your writing environment to suit your preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6">
            <TabsTrigger value="appearance" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Volume2 className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Collaboration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="font-size">Font Size ({fontSize}px)</Label>
                <Slider
                  id="font-size"
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="my-4"
                />
                <p className="text-sm text-muted-foreground">
                  Adjust text size for better readability
                </p>
              </div>
              
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select 
                  value={fontFamily} 
                  onValueChange={setFontFamily}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                    <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                    <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose your preferred font for writing
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-shortcuts">Keyboard Shortcuts</Label>
                  <Switch 
                    id="keyboard-shortcuts" 
                    checked={keyboardShortcutsEnabled} 
                    onCheckedChange={setKeyboardShortcutsEnabled}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Enable keyboard shortcuts for faster editing
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto Save</Label>
                  <Switch 
                    id="auto-save" 
                    checked={autoSaveEnabled} 
                    onCheckedChange={setAutoSaveEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically save your work every {autoSaveInterval} minutes
                </p>
                
                {autoSaveEnabled && (
                  <div className="mt-4">
                    <Label htmlFor="auto-save-interval">Auto Save Interval (minutes)</Label>
                    <Slider
                      id="auto-save-interval"
                      value={[autoSaveInterval]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(value) => setAutoSaveInterval(value[0])}
                      className="my-4"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="spell-check">Spell Check</Label>
                  <Switch 
                    id="spell-check" 
                    checked={isSpellCheckEnabled} 
                    onCheckedChange={setIsSpellCheckEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Check spelling while you write
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="grammar-check">Grammar Check</Label>
                  <Switch 
                    id="grammar-check" 
                    checked={isGrammarCheckEnabled} 
                    onCheckedChange={setIsGrammarCheckEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Check grammar while you write
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="timer">Writing Timer</Label>
                  <Switch 
                    id="timer" 
                    checked={timerEnabled} 
                    onCheckedChange={setTimerEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Set a timer for focused writing sessions
                </p>
                
                {timerEnabled && (
                  <div className="mt-4">
                    <Label htmlFor="timer-duration">Timer Duration (minutes)</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        id="timer-duration"
                        type="number"
                        value={timerDuration}
                        onChange={(e) => setTimerDuration(parseInt(e.target.value) || 30)}
                        min={1}
                        max={180}
                      />
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="target-word-count">Target Word Count</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input 
                    id="target-word-count"
                    type="number"
                    value={targetWordCount}
                    onChange={(e) => setTargetWordCount(parseInt(e.target.value) || 1000)}
                    min={100}
                  />
                </div>
                <div className="mt-2">
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0 words</span>
                    <span>450/1000 words (45%)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="offline-mode">Offline Mode</Label>
                  <Switch 
                    id="offline-mode" 
                    checked={isOfflineMode} 
                    onCheckedChange={setIsOfflineMode} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  {isOfflineMode ? <CloudOff className="h-3 w-3" /> : <Cloud className="h-3 w-3" />}
                  {isOfflineMode ? "Working offline - changes saved locally" : "Working online - changes synced to cloud"}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="speech-synthesis">Text-to-Speech</Label>
                  <Switch 
                    id="speech-synthesis" 
                    checked={speechSynthesisEnabled} 
                    onCheckedChange={setSpeechSynthesisEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Read your text aloud using text-to-speech
                </p>
              </div>
              
              {speechSynthesisEnabled && (
                <>
                  <div>
                    <Label htmlFor="voice">Voice</Label>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={selectedVoice} 
                        onValueChange={setSelectedVoice}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.length > 0 ? voices.map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </SelectItem>
                          )) : (
                            <SelectItem value="default">Default Voice</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline" onClick={handleTestVoice} 
                        disabled={!selectedVoice || voices.length === 0}>
                        Test
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="speech-rate">Speech Rate ({speechRate}%)</Label>
                    <Slider
                      id="speech-rate"
                      value={[speechRate]}
                      min={50}
                      max={200}
                      step={5}
                      onValueChange={(value) => setSpeechRate(value[0])}
                      className="my-4"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="speech-pitch">Speech Pitch ({speechPitch}%)</Label>
                    <Slider
                      id="speech-pitch"
                      value={[speechPitch]}
                      min={50}
                      max={200}
                      step={5}
                      onValueChange={(value) => setSpeechPitch(value[0])}
                      className="my-4"
                    />
                  </div>
                </>
              )}
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="background-music">Background Music</Label>
                  <Switch 
                    id="background-music" 
                    checked={musicEnabled} 
                    onCheckedChange={setMusicEnabled} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Play ambient background music while writing
                </p>
                
                {musicEnabled && (
                  <div className="mt-4">
                    <Label htmlFor="music-volume">Volume ({musicVolume}%)</Label>
                    <Slider
                      id="music-volume"
                      value={[musicVolume]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setMusicVolume(value[0])}
                      className="my-4"
                    />
                    <Select defaultValue="ambience">
                      <SelectTrigger>
                        <SelectValue placeholder="Select music type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambience">Ambient</SelectItem>
                        <SelectItem value="classical">Classical</SelectItem>
                        <SelectItem value="lofi">Lo-Fi</SelectItem>
                        <SelectItem value="nature">Nature Sounds</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaboration" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="collaboration-mode">Collaboration Mode</Label>
                  <Switch 
                    id="collaboration-mode" 
                    checked={collaborationEnabled} 
                    onCheckedChange={(checked) => {
                      if (!isPremium && checked) {
                        onUpgradeRequest();
                        return;
                      }
                      setCollaborationEnabled(checked);
                    }} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  {!isPremium && <Crown className="h-3 w-3 text-amber-500" />}
                  Allow others to edit your document in real-time
                  {!isPremium && " (Premium feature)"}
                </p>
              </div>
              
              {collaborationEnabled && isPremium && (
                <>
                  <div>
                    <Label htmlFor="new-collaborator">Add Collaborator</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        id="new-collaborator"
                        type="email"
                        placeholder="Email address"
                        value={newCollaborator}
                        onChange={(e) => setNewCollaborator(e.target.value)}
                      />
                      <Button size="sm" onClick={handleCollaboratorAdd}>Add</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Current Collaborators</Label>
                    <div className="mt-2 space-y-2">
                      {collaborators.length > 0 ? (
                        collaborators.map((email) => (
                          <div key={email} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-green-500" />
                              <span>{email}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleCollaboratorRemove(email)}
                            >
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No collaborators added yet
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              {!isPremium && (
                <div className="border border-amber-200 bg-amber-950/20 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Crown className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-300">Premium Feature</h4>
                      <p className="text-sm text-amber-400 mt-1">
                        Collaboration features are available with a premium subscription.
                      </p>
                      <Button onClick={onUpgradeRequest} className="mt-3 gap-1 bg-amber-600 hover:bg-amber-700">
                        <Zap className="h-4 w-4" />
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WritingSettings;
