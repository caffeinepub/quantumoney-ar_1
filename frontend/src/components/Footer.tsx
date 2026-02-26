import { SiWhatsapp, SiTelegram, SiInstagram } from 'react-icons/si';
import { XIcon } from 'lucide-react';

export default function Footer() {
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://quantumoney.app';
  const shareText = encodeURIComponent('Quantumoney – O futuro das moedas digitais AR!');
  const shareUrl = encodeURIComponent(appUrl);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    instagram: `https://www.instagram.com/`,
  };

  return (
    <footer className="w-full border-t border-yellow-500/30 bg-black/60 backdrop-blur-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
        {/* Share buttons */}
        <div className="flex items-center gap-3">
          <span className="text-yellow-400/70 text-xs">Partilhar:</span>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partilhar no WhatsApp"
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            <SiWhatsapp size={16} />
          </a>
          <a
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partilhar no X"
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            <XIcon size={16} />
          </a>
          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partilhar no Telegram"
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            <SiTelegram size={16} />
          </a>
          <a
            href={shareLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partilhar no Instagram"
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            <SiInstagram size={16} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-yellow-400/60 text-xs">
            © 2026 Quantumoney. Todos os direitos reservados.
          </p>
          <p className="text-yellow-400/50 text-xs">By HTgamers</p>
        </div>
      </div>
    </footer>
  );
}
