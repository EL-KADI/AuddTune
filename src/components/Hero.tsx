
import { useState, useRef } from "react";
import { Music, Search, Mic, Link, StopCircle, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HeroProps {
  onRecognize: (urlOrFile: string | File) => void;
  isLoading: boolean;
}

const Hero = ({ onRecognize, isLoading }: HeroProps) => {
  const [inputUrl, setInputUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"url" | "file" | "record">("url");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);
    
    if (activeTab === "url" && inputUrl) {
      // Check if URL is likely valid
      try {
        new URL(inputUrl);
        onRecognize(inputUrl);
      } catch (error) {
        setUrlError("Please enter a valid URL");
      }
    } else if (activeTab === "file" && file) {
      onRecognize(file);
    } else if (activeTab === "record" && audioBlob) {
      const recordedFile = new File([audioBlob], "recorded-audio.wav", {
        type: "audio/wav",
      });
      setFile(recordedFile);
      onRecognize(recordedFile);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    setUrlError(null); // Clear error when input changes
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setActiveTab("file");
    }
  };

  const startRecording = async () => {
    try {
      setRecordingError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setRecordingError("Could not access the microphone. Please ensure you've granted permission.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center music-gradient py-16 px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20" />
      
      <div className="text-center mb-12 animate-fade-in z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">Discover Music Around You</h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Recognize any song you hear by uploading an audio file, entering a URL, or recording directly from your device
        </p>
      </div>
      
      <div className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 animate-scale-in z-10">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "url" | "file" | "record")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black/30">
            
            <TabsTrigger value="file" className="data-[state=active]:bg-music-primary/30">
              <Mic className="mr-2 h-4 w-4" />
              <span>Upload Audio</span>
            </TabsTrigger>
            <TabsTrigger value="record" className="data-[state=active]:bg-music-primary/30">
              <AudioLines className="mr-2 h-4 w-4" />
              <span>Record Audio</span>
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">

            
            <TabsContent value="file" className="mt-0">
              <div className="space-y-4">
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-8 hover:border-music-primary/50 transition-colors">
                  <input
                    type="file"
                    id="audio-file"
                    onChange={handleFileChange}
                    accept="audio/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Mic className="h-12 w-12 text-white/50 mb-2" />
                  <p className="text-white text-center">
                    Click here to select an audio file<br />
                    <span className="text-sm text-white/50">or drag and drop a file here</span>
                  </p>
                  {file && (
                    <div className="mt-4 text-music-secondary text-sm bg-music-primary/10 p-2 rounded w-full text-center">
                      Selected: {file.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/50">
                  Supported formats: MP3, WAV, M4A, AAC (max 10MB)
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="record" className="mt-0">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-8 hover:border-music-primary/50 transition-colors">
                  {recordingError && (
                    <Alert variant="destructive" className="mb-4 bg-red-500/20 border-red-500/30">
                      <AlertDescription>{recordingError}</AlertDescription>
                    </Alert>
                  )}
                  
                  {!isRecording ? (
                    <Button 
                      type="button"
                      onClick={startRecording}
                      className="bg-music-primary hover:bg-music-primary/90 text-white rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300"
                      disabled={isLoading}
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                  ) : (
                    <Button 
                      type="button"
                      onClick={stopRecording}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full h-20 w-20 flex items-center justify-center animate-pulse transition-all duration-300"
                    >
                      <StopCircle className="h-8 w-8" />
                    </Button>
                  )}
                  
                  <p className="text-white mt-4 text-center">
                    {isRecording ? (
                      "Recording... Click stop when finished"
                    ) : audioBlob ? (
                      "Recording complete! Click 'Recognize Music' below"
                    ) : (
                      "Click the microphone to start recording"
                    )}
                  </p>
                  
                  {audioBlob && !isRecording && (
                    <div className="mt-4 w-full">
                      <p className="text-sm text-white/70 mb-2">Preview your recording:</p>
                      <audio 
                        src={URL.createObjectURL(audioBlob)} 
                        controls 
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/50">
                  For best results, record 5-10 seconds of clear audio
                </p>
              </div>
            </TabsContent>
            
            <Button
              type="submit"
              disabled={
                isLoading || 
                (activeTab === "url" && !inputUrl) || 
                (activeTab === "file" && !file) || 
                (activeTab === "record" && (!audioBlob || isRecording))
              }
              className="w-full bg-music-primary hover:bg-music-primary/90 text-white rounded-lg h-12 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-music-primary/20"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></div>
                  <span>Recognizing...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Recognize Music</span>
                </>
              )}
            </Button>
          </form>
        </Tabs>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <Music className="h-24 w-24 text-music-primary/10 animate-bounce mb-[-12px] animate-pulse-slow" />
      </div>
    </section>
  );
};

export default Hero;
