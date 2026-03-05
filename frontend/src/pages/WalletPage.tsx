import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import { Link } from '@tanstack/react-router';
import VestingBreakdown from '../components/wallet/VestingBreakdown';
import { Skeleton } from '@/components/ui/skeleton';

function formatE8s(val: bigint | undefined | null): string {
  if (val === undefined || val === null) return '—';
  const n = Number(val) / 1e8;
  return n.toLocaleString('pt-PT', { maximumFractionDigits: 4 });
}

function formatBalance(val: bigint | undefined | null): string {
  if (val === undefined || val === null) return '—';
  const n = Number(val) / 1e8;
  return n.toLocaleString('pt-PT', { maximumFractionDigits: 4 });
}

export default function WalletPage() {
  const { identity } = useInternetIdentity();
  const principalId = identity?.getPrincipal().toString();

  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: icpBalance, isLoading: icpLoading } = useICPLedger(principalId);
  const { data: qmyBalance, isLoading: qmyLoading } = useQMYLedger(principalId);
  const { data: transactions } = useQMYTransactions(principalId);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="luxury-glass-card p-10 text-center max-w-md">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="font-cinzel text-qmy-gold text-2xl font-bold mb-3">Acesso Restrito</h2>
          <p className="text-qmy-gold/70 font-rajdhani mb-6">Faz login para aceder à tua carteira.</p>
          <Link to="/profile" className="luxury-cta-btn px-6 py-3 text-sm">
            Ir para Perfil & Carteira
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-qmy-gold text-3xl font-bold luxury-title-glow mb-2">
            Carteira QMY
          </h1>
          <p className="text-qmy-gold/60 font-rajdhani">
            Para funcionalidades completas, visita o teu{' '}
            <Link to="/profile" className="text-qmy-gold underline hover:text-qmy-gold/80">
              Perfil & Carteira
            </Link>
          </p>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="luxury-glass-card p-6 text-center">
            <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-1">Saldo ICP</div>
            <div className="text-qmy-gold font-cinzel font-bold text-3xl">
              {icpLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : formatE8s(icpBalance)}
            </div>
          </div>
          <div className="luxury-glass-card p-6 text-center">
            <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-1">Saldo QMY</div>
            <div className="text-qmy-gold font-cinzel font-bold text-3xl">
              {qmyLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : formatBalance(qmyBalance)}
            </div>
          </div>
        </div>

        {/* Vesting */}
        <div className="mb-6">
          <VestingBreakdown
            available={profile ? profile.availableTokens : undefined}
            locked={profile ? profile.plantedTokens : undefined}
          />
        </div>

        {/* Transactions */}
        <div className="luxury-glass-card p-6">
          <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📋 Transações Recentes</h3>
          {profileLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((tx, i) => (
                <div key={i} className="border border-qmy-gold/20 p-3 flex justify-between items-center">
                  <div>
                    <div className="text-qmy-gold font-rajdhani text-sm capitalize">{tx.kind}</div>
                    <div className="text-qmy-gold/50 text-xs font-mono">
                      {new Date(Number(tx.timestamp) / 1_000_000).toLocaleString('pt-PT')}
                    </div>
                  </div>
                  <div className="text-qmy-gold font-cinzel font-bold">
                    {(Number(tx.amount) / 1e8).toFixed(4)} QMY
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-qmy-gold/60 font-rajdhani">Nenhuma transação encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
