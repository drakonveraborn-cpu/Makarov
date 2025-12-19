import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VinylCard } from '@/components/VinylCard';
import { MusicPlayer } from '@/components/MusicPlayer';
import { vinylRecords } from '@/data/vinyls';
import { VinylRecord, Genre } from '@/types/vinyl';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const genres: Genre[] = ['All', 'Rock', 'Jazz', 'Soul', 'Electronic', 'Classical', 'Blues'];

const Shop = () => {
  const [currentTrack, setCurrentTrack] = useState<VinylRecord | null>(null);
  const [cartItems, setCartItems] = useState<VinylRecord[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'year' | 'name'>('name');

  const filteredRecords = useMemo(() => {
    let filtered = vinylRecords;

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(record => record.genre === selectedGenre);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        record =>
          record.title.toLowerCase().includes(query) ||
          record.artist.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'year':
        filtered = [...filtered].sort((a, b) => b.year - a.year);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [selectedGenre, searchQuery, sortBy]);

  const handlePlay = (record: VinylRecord) => {
    setCurrentTrack(record);
    toast({
      title: "Сейчас играет",
      description: `${record.artist} - ${record.title}`,
    });
  };

  const handleAddToCart = (record: VinylRecord) => {
    setCartItems([...cartItems, record]);
    toast({
      title: "Добавлено в корзину",
      description: `${record.title} добавлен в корзину`,
    });
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = filteredRecords.findIndex(r => r.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % filteredRecords.length;
      setCurrentTrack(filteredRecords[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = filteredRecords.findIndex(r => r.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? filteredRecords.length - 1 : currentIndex - 1;
      setCurrentTrack(filteredRecords[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-up">
              Каталог пластинок
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-up animation-delay-100">
              Найдите свой идеальный винил среди {vinylRecords.length} уникальных пластинок
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или артисту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            {/* Genre filters */}
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? 'warm' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    'transition-all',
                    selectedGenre === genre && 'shadow-warm'
                  )}
                >
                  {genre === 'All' ? 'Все' : genre}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">По названию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="year">По году</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 pb-40">
        <div className="container mx-auto px-4">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                По вашему запросу ничего не найдено
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('All');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Найдено: {filteredRecords.length} пластинок
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecords.map((record, index) => (
                  <VinylCard
                    key={record.id}
                    record={record}
                    onPlay={handlePlay}
                    onAddToCart={handleAddToCart}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />

      <MusicPlayer
        currentTrack={currentTrack}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Shop;
