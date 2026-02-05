import { Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Canister configuration
const DOCS_CANISTER_ID = 'whu4t-kiaaa-aaaah-qsc5q-cai';
const DOCS_BASE_URL = `https://${DOCS_CANISTER_ID}.icp0.io`;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-16 px-6 bg-black border-t border-amber-600/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center gap-4">
            <img
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png"
              alt="Quantumoney AR"
              className="w-16 h-16 object-contain"
            />
            <span className="text-3xl font-serif font-bold text-amber-500">Quantumoney AR</span>
          </div>

          <div className="space-y-4">
            <p className="text-amber-500 font-semibold text-lg">
              {t.footer.builtBy} | {t.footer.year}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-400">
              <a href="mailto:helpdesk@quantumoney.net" className="hover:text-amber-400 transition-colors">
                helpdesk@quantumoney.net
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="https://www.quantumoney.net" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                www.quantumoney.net
              </a>
              <span className="hidden sm:inline">|</span>
              <a 
                href={DOCS_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                Documentation
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              {t.footer.compliance}
            </p>
            <p className="text-gray-500 text-xs italic">
              {t.footer.informationalOnly}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
