import { SiWhatsapp, SiTelegram, SiInstagram, SiX } from 'react-icons/si';

const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://quantumoney.app';
const shareText = 'Descobre o Quantumoney – o jogo AR de criptomoedas! 🚀💰';

const shareLinks = [
  {
    icon: SiWhatsapp,
    label: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    color: 'hover:text-green-400',
  },
  {
    icon: SiX,
    label: 'X',
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    color: 'hover:text-sky-400',
  },
  {
    icon: SiTelegram,
    label: 'Telegram',
    href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    color: 'hover:text-blue-400',
  },
  {
    icon: SiInstagram,
    label: 'Instagram',
    href: `https://www.instagram.com/`,
    color: 'hover:text-pink-400',
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-qmy-gold/30 bg-black/60 backdrop-blur-sm py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-3">
        {/* Social share buttons */}
        <div className="flex items-center gap-4">
          {shareLinks.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Partilhar no ${label}`}
              className={`text-qmy-gold/70 ${color} transition-colors duration-200`}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-qmy-gold/80 text-xs text-center leading-relaxed">
          © 2026 Quantumoney. Todos os direitos reservados.
        </p>
        <p className="text-qmy-gold/60 text-xs text-center">
          By HTgamers
        </p>
      </div>
    </footer>
  );
}
