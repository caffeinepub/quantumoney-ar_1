import { useState, useEffect } from 'react';
import { Download, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const showText = () => {
      setIsTextVisible(true);
      setTimeout(() => {
        setIsTextVisible(false);
      }, 3000);
    };

    showText();
    const interval = setInterval(() => {
      showText();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleInstallClick = () => {
    window.location.href = 'https://quantumoneyar.app';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const animatedText = {
    pt: 'Quantumoney: em desenvolvimento ativo para promover prosperidade coletiva e inovação blockchain🌐🌐🌐',
    en: 'Quantumoney: in development to promote collective prosperity and blockchain innovation🌐🌐🌐',
  };

  const ctaText = language === 'pt' ? 'Instalar Aplicativo' : 'Install App';

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/world-class-hero-quantum-galaxy.dim_1920x1080.png"
          alt="Quantum Galaxy"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />

        {/* Quantum Nebula Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-accent/15 via-primary/5 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Language Toggle Button - Top Right Corner */}
      <div className="absolute top-28 right-6 z-20 animate-fade-in">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="lg"
          className="group glass-card border-primary/40 hover:bg-primary/10 hover:border-primary/60 text-primary transition-all duration-300 px-6 py-3 rounded-full shadow-gold-subtle hover:shadow-gold"
        >
          <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-lg">{language === 'pt' ? 'EN' : 'PT'}</span>
        </Button>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center space-y-10">
        {/* Logo with Gold Glow */}
        <div className="relative animate-fade-in">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
          <img
            src="/assets/generated/qmy-luxury-pro-logo-transparent.dim_200x200.png"
            alt="QMY Luxury Pro"
            className="relative w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-[0_0_40px_rgba(217,165,32,0.9)]"
          />
        </div>

        {/* Branding */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary drop-shadow-[0_0_30px_rgba(217,165,32,0.7)]">
            Quantumoney
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light max-w-4xl mx-auto">
            {language === 'pt' ? 'Documentação Institucional' : 'Institutional Documentation'}
          </p>
        </div>

        {/* Animated Text - Appears every 4 seconds, visible for 3 seconds, bilingual */}
        <div className="h-32 flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p
            className={`text-xl md:text-2xl lg:text-3xl font-serif text-primary/90 transition-opacity duration-700 max-w-5xl px-4 ${
              isTextVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {animatedText[language]}
          </p>
        </div>

        {/* Install Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleInstallClick}
            size="lg"
            className="group px-12 py-8 text-xl md:text-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-500 hover:scale-110 shadow-gold hover:shadow-gold-lg"
          >
            <span className="flex items-center gap-4">
              <Download className="w-7 h-7" />
              {ctaText}
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
