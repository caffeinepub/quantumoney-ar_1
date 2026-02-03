import { Eye, Award, Globe2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      badge: 'Inovação Mundial',
      title: 'Sobre QMY Luxury Pro',
      subtitle: 'O Primeiro Projeto de Metaverso Cripto Baseado em AR do Mundo',
      vision: 'Nossa Visão',
      visionText: 'Quantumoney AR é pioneiro na convergência de realidade aumentada, blockchain e metaverso. Construído na Internet Computer, oferecemos uma experiência imersiva onde o mundo físico e digital se fundem perfeitamente.',
      luxury: 'Marca de Luxo',
      luxuryText: 'QMY Luxury Pro representa excelência premium em tecnologia blockchain. Nossa plataforma combina design sofisticado com funcionalidade de ponta, criando uma experiência única para usuários globais.',
      global: 'Visão Global',
      globalText: 'Com 60.000 AR Spots distribuídos em marcos turísticos mundiais, estamos construindo a maior rede de realidade aumentada blockchain do planeta, conectando milhões de usuários em uma economia descentralizada.',
    },
    en: {
      badge: 'World Innovation',
      title: 'About QMY Luxury Pro',
      subtitle: 'World\'s First AR-Based Crypto Metaverse Project',
      vision: 'Our Vision',
      visionText: 'Quantumoney AR pioneers the convergence of augmented reality, blockchain, and metaverse. Built on the Internet Computer, we offer an immersive experience where the physical and digital worlds merge seamlessly.',
      luxury: 'Luxury Branding',
      luxuryText: 'QMY Luxury Pro represents premium excellence in blockchain technology. Our platform combines sophisticated design with cutting-edge functionality, creating a unique experience for global users.',
      global: 'Global Vision',
      globalText: 'With 60,000 AR Spots distributed across world tourist landmarks, we\'re building the planet\'s largest blockchain augmented reality network, connecting millions of users in a decentralized economy.',
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-10">
        <img
          src="/assets/generated/qmy-metaverse-landscape-atmospheric.dim_1200x600.png"
          alt="Metaverse"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 rounded-full bg-amber-600/20 border border-amber-600/50 mb-6">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">{t.badge}</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-gold">
            <div className="w-20 h-20 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <Eye className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.vision}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.visionText}
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-gold">
            <div className="w-20 h-20 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <Award className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.luxury}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.luxuryText}
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-gold">
            <div className="w-20 h-20 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <Globe2 className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.global}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.globalText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
