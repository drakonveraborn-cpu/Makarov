export interface VinylRecord {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
  coverImage: string;
  audioPreview: string;
  condition: 'Mint' | 'Excellent' | 'Very Good' | 'Good' | 'Fair';
  description: string;
}

export type Genre = 'All' | 'Rock' | 'Jazz' | 'Soul' | 'Electronic' | 'Classical' | 'Blues';
