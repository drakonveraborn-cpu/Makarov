import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc3, Headphones, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VinylCard } from '@/components/VinylCard';
import { MusicPlayer } from '@/components/MusicPlayer';
import { VinylDisc } from '@/components/VinylDisc';
import { vinylRecords } from '@/data/vinyls';
import { VinylRecord } from '@/types/vinyl';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<VinylRecord | null>(null);
  const [cartItems, setCartItems] = useState<VinylRecord[]>([]);
  
  const featuredRecords = vinylRecords.slice(0, 4);

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
      const currentIndex = vinylRecords.findIndex(r => r.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % vinylRecords.length;
      setCurrentTrack(vinylRecords[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = vinylRecords.findIndex(r => r.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? vinylRecords.length - 1 : currentIndex - 1;
      setCurrentTrack(vinylRecords[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-warm-brown/20" />
        
        {/* Floating vinyl decorations */}
        <div className="absolute top-1/4 left-[10%] opacity-20 animate-float">
          <VinylDisc coverImage={vinylRecords[0].coverImage} size="lg" />
        </div>
        <div className="absolute bottom-1/4 right-[10%] opacity-20 animate-float animation-delay-300">
          <VinylDisc coverImage={vinylRecords[2].coverImage} size="xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8 opacity-0 animate-fade-up">
              <Disc3 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Винтажные пластинки с 1960-х</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0 animate-fade-up animation-delay-100">
              Звук, который
              <br />
              <span className="text-gradient">трогает душу</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up animation-delay-200">
              Откройте для себя коллекцию редких винтажных виниловых пластинок. 
              Погрузитесь в тёплый аналоговый звук эпохи легенд.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up animation-delay-300">
              <Button asChild variant="warm" size="xl">
                <Link to="/shop">
                  Перейти в магазин
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">
                  Узнать больше
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Headphones,
                title: 'Прослушивание онлайн',
                description: 'Слушайте превью любой пластинки перед покупкой'
              },
              {
                icon: Truck,
                title: 'Безопасная доставка',
                description: 'Специальная упаковка для защиты ваших пластинок'
              },
              {
                icon: Shield,
                title: 'Гарантия качества',
                description: 'Каждая пластинка проверена нашими экспертами'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-secondary/30 hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100 + 400}ms`, animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Records */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Избранные пластинки
              </h2>
              <p className="text-muted-foreground">
                Лучшие предложения из нашей коллекции
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/shop">
                Смотреть все
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecords.map((record, index) => (
              <VinylCard
                key={record.id}
                record={record}
                onPlay={handlePlay}
                onAddToCart={handleAddToCart}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-vinyl opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Готовы начать свою коллекцию?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Присоединяйтесь к сообществу ценителей винтажного звука
            </p>
            <Button asChild variant="warm" size="xl">
              <Link to="/shop">
                Исследовать магазин
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
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

export default Index;
