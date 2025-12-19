import { useState } from 'react';
import { Play, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VinylDisc } from './VinylDisc';
import { VinylRecord } from '@/types/vinyl';
import { cn } from '@/lib/utils';

interface VinylCardProps {
  record: VinylRecord;
  onPlay: (record: VinylRecord) => void;
  onAddToCart: (record: VinylRecord) => void;
  index: number;
}

export const VinylCard = ({ record, onPlay, onAddToCart, index }: VinylCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        'group relative bg-card rounded-xl p-4 hover-lift cursor-pointer',
        'opacity-0 animate-fade-up',
        'border border-border/50 hover:border-primary/30'
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vinyl container */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        {/* Album cover */}
        <img 
          src={record.coverImage} 
          alt={record.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500',
            isHovered ? 'scale-110' : 'scale-100'
          )}
        />
        
        {/* Vinyl peeking out */}
        <div 
          className={cn(
            'absolute top-1/2 -translate-y-1/2 transition-all duration-500',
            isHovered ? 'right-[-20%]' : 'right-0'
          )}
        >
          <VinylDisc 
            coverImage={record.coverImage}
            isPlaying={isHovered}
            size="lg"
          />
        </div>

        {/* Play overlay */}
        <div 
          className={cn(
            'absolute inset-0 bg-background/60 flex items-center justify-center',
            'transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Button
            variant="warm"
            size="lg"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(record);
            }}
          >
            <Play className="w-6 h-6" />
            Слушать
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground truncate">
              {record.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {record.artist}
            </p>
          </div>
          <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground shrink-0">
            {record.year}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary font-display text-xl font-bold">
              ${record.price}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {record.condition}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(record);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Genre badge */}
      <div className="absolute top-6 left-6">
        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
          {record.genre}
        </span>
      </div>
    </div>
  );
};
