import { Disc3, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Disc3 className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold">
                Vinyl<span className="text-gradient">Groove</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Магазин винтажных виниловых пластинок. Окунитесь в эпоху аналогового звука.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Магазин
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="font-display font-semibold mb-4">Жанры</h4>
            <ul className="space-y-2">
              {['Rock', 'Jazz', 'Soul', 'Electronic', 'Classical', 'Blues'].map((genre) => (
                <li key={genre}>
                  <Link 
                    to={`/shop?genre=${genre}`} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold mb-4">Социальные сети</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 VinylGroove. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
