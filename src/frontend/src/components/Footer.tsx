import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 glass-card-elevated border-t border-primary/20 py-12 md:py-16 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <img 
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
              alt="Quantumoney" 
              className="w-16 h-16 mb-4 mx-auto md:mx-0 opacity-90"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Quantum universe Web3 application on Internet Computer.
            </p>
            <p className="text-primary text-xs font-semibold">
              On-chain na Internet Computer (ICP)
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/qmy-token" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  QMY Token
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/central-bank" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Central Bank
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Public Chat
                </Link>
              </li>
              <li>
                <Link to="/presale" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Presale
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Governance</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/dao" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  DAO
                </Link>
              </li>
              <li>
                <Link to="/pre-proposals" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Pre-Proposals
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/gold-paper" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Gold Paper
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1">
                  Documentation Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-6 md:pt-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Quantumoney
            </p>
            <p className="text-muted-foreground/70 text-xs leading-relaxed">
              by HTgamers | 
              <a href="mailto:helpdesk@quantumoney.net" className="text-primary hover:underline ml-1 mr-1">
                helpdesk@quantumoney.net
              </a> | 
              <a href="https://www.quantumoney.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                www.quantumoney.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
