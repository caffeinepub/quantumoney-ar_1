import { Globe2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Contato & Suporte',
      subtitle: 'Estamos Aqui Para Ajudar',
      helpdesk: 'Helpdesk',
      website: 'Website',
      email: 'helpdesk@quantumoney.net',
      url: 'www.quantumoney.net',
    },
    en: {
      title: 'Contact & Support',
      subtitle: 'We\'re Here to Help',
      helpdesk: 'Helpdesk',
      website: 'Website',
      email: 'helpdesk@quantumoney.net',
      url: 'www.quantumoney.net',
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 text-center hover:border-amber-500/60 transition-all duration-500">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-600/20 flex items-center justify-center">
              <Globe2 className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4">
              {t.helpdesk}
            </h3>
            <a
              href={`mailto:${t.email}`}
              className="text-xl text-gray-300 hover:text-amber-400 transition-colors"
            >
              {t.email}
            </a>
          </div>

          <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 text-center hover:border-amber-500/60 transition-all duration-500">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-600/20 flex items-center justify-center">
              <Globe2 className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4">
              {t.website}
            </h3>
            <a
              href={`https://${t.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-300 hover:text-amber-400 transition-colors"
            >
              {t.url}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
