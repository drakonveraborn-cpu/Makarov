import { Disc3, Music, Users, Award } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VinylDisc } from '@/components/VinylDisc';
import { vinylRecords } from '@/data/vinyls';

const About = () => {
  const stats = [
    { icon: Disc3, value: '5000+', label: 'Пластинок в коллекции' },
    { icon: Users, value: '10K+', label: 'Довольных клиентов' },
    { icon: Music, value: '50+', label: 'Жанров музыки' },
    { icon: Award, value: '15', label: 'Лет опыта' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-10">
          <VinylDisc coverImage={vinylRecords[0].coverImage} size="xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-up">
              О нашем магазине
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up animation-delay-100">
              VinylGroove — это больше, чем магазин. Это место, где живёт история музыки, 
              где каждая пластинка рассказывает свою уникальную историю, а аналоговый звук 
              переносит вас в золотую эпоху звукозаписи.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-fade-up">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Всё началось в 2009 году, когда основатель VinylGroove Александр Мелодин 
                  унаследовал коллекцию виниловых пластинок от своего деда — легендарного 
                  джазового музыканта.
                </p>
                <p>
                  Что начиналось как хобби, переросло в страсть, а затем — в миссию: 
                  сохранить и передать новому поколению магию аналогового звука.
                </p>
                <p>
                  Сегодня мы работаем с коллекционерами по всему миру, тщательно отбирая 
                  каждую пластинку, проверяя её состояние и подлинность.
                </p>
              </div>
            </div>
            
            <div className="relative opacity-0 animate-slide-in-right animation-delay-200">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&h=600&fit=crop"
                  alt="Vinyl collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32">
                <VinylDisc 
                  coverImage={vinylRecords[1].coverImage}
                  size="lg"
                  className="animate-spin-vinyl-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Наши ценности
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Каждая пластинка в нашем магазине проходит строгий отбор
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Подлинность',
                description: 'Мы гарантируем оригинальность каждой пластинки. Работаем только с проверенными поставщиками и коллекционерами.'
              },
              {
                title: 'Качество звука',
                description: 'Каждая пластинка проверяется на профессиональном оборудовании. Мы не продаём пластинки с дефектами звука.'
              },
              {
                title: 'История',
                description: 'К каждой пластинке прилагается информация о её происхождении, истории записи и интересные факты об артисте.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="p-6 bg-secondary/30 rounded-xl hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100 + 300}ms`, animationFillMode: 'forwards' }}
              >
                <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Свяжитесь с нами
            </h2>
            <p className="text-muted-foreground mb-8">
              Есть вопросы о пластинках? Ищете что-то особенное? 
              Мы всегда рады помочь найти идеальный винил.
            </p>
            <div className="space-y-4 text-lg">
              <p>
                <span className="text-muted-foreground">Email:</span>{' '}
                <a href="mailto:info@vinylgroove.ru" className="text-primary hover:underline">
                  info@vinylgroove.ru
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Телефон:</span>{' '}
                <a href="tel:+74951234567" className="text-primary hover:underline">
                  +7 (495) 123-45-67
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Адрес:</span>{' '}
                <span>Москва, ул. Виниловая, 42</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
