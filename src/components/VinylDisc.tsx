import { cn } from '@/lib/utils';

interface VinylDiscProps {
  coverImage: string;
  isPlaying?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-40 h-40',
  lg: 'w-56 h-56',
  xl: 'w-72 h-72'
};

const labelSizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24'
};

export const VinylDisc = ({ coverImage, isPlaying = false, size = 'md', className }: VinylDiscProps) => {
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Vinyl record */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full vinyl-grooves shadow-vinyl',
          isPlaying ? 'animate-spin-vinyl' : ''
        )}
      >
        {/* Grooves effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-90" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        
        {/* Center label */}
        <div 
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden',
            labelSizeClasses[size]
          )}
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-vinyl-black" />
        </div>
      </div>
    </div>
  );
};
