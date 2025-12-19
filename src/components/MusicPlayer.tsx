import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { VinylDisc } from './VinylDisc';
import { VinylRecord } from '@/types/vinyl';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  currentTrack: VinylRecord | null;
  onNext?: () => void;
  onPrevious?: () => void;
  isMinimized?: boolean;
}

export const MusicPlayer = ({ currentTrack, onNext, onPrevious, isMinimized = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioPreview;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div 
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50',
        'transition-all duration-500',
        isMinimized ? 'h-20' : 'h-28'
      )}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          onNext?.();
        }}
      />
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <Slider
          value={[progress]}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="h-1 cursor-pointer"
        />
      </div>

      <div className="container mx-auto h-full flex items-center justify-between px-4 pt-2">
        {/* Track info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <VinylDisc 
              coverImage={currentTrack.coverImage} 
              isPlaying={isPlaying}
              size="sm"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-semibold text-foreground truncate">
              {currentTrack.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevious}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="warm" 
            size="icon" 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full animate-pulse-glow"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={(v) => {
              setVolume(v[0]);
              setIsMuted(false);
            }}
            max={100}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};
