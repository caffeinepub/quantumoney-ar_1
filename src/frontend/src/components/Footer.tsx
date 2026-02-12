import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 glass-card-elevated border-t border-primary/20 py-16 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="text-center md:text-left">
            <img 
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
              alt="Quantumoney" 
              className="w-16 h-16 mb-4 mx-auto md:mx-0 opacity-90"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quantum universe Web3 application on Internet Computer.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/qmy-token" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  QMY Token
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/central-bank" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Central Bank
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Public Chat
                </Link>
              </li>
              <li>
                <Link to="/presale" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Presale
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Governance</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dao" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  DAO
                </Link>
              </li>
              <li>
                <Link to="/pre-proposals" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Pre-Proposals
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-primary font-bold mb-4 text-sm uppercase tracking-wider">Documentation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/gold-paper" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Gold Paper
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Documentation Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">
              © {currentYear} Quantumoney
            </p>
            <p className="text-muted-foreground/70 text-xs">
              by HTgamers | 
              <a href="mailto:helpdesk@quantumoney.net" className="text-primary hover:underline ml-1">
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
