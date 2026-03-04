import React from 'react';
import { SiWhatsapp, SiTelegram, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://quantumoney.app';
  const shareText = 'Bem-vindo ao mundo Quantumoney!';

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    instagram: `https://www.instagram.com/`,
  };

  return (
    <footer className="w-full border-t border-yellow-500/30 bg-transparent py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <p className="text-yellow-400 font-semibold text-sm tracking-widest uppercase">
          By HTgamers
        </p>
        <div className="flex items-center gap-4">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <SiWhatsapp size={20} />
          </a>
          <a
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <SiX size={20} />
          </a>
          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Telegram"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <SiTelegram size={20} />
          </a>
          <a
            href={shareLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Instagram"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <SiInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
