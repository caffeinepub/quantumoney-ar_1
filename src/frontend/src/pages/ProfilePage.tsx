import { Suspense, lazy } from 'react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { User, Loader2, Trophy, Coins as CoinsIcon } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useARGameData } from '@/hooks/useARGameData';
import ARPlayerStats from '@/components/profile/ARPlayerStats';
import ARCoinBalance from '@/components/profile/ARCoinBalance';
import ARMonsterCollection from '@/components/profile/ARMonsterCollection';
import { Button } from '@/components/ui/button';

const QuantumUniverseScene = lazy(() => import('@/components/quantum/QuantumUniverseScene'));

export default function ProfilePage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: arData, isLoading: arLoading, error: arError } = useARGameData();

  const isAuthenticated = !!identity;

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <PageShell>
        <div className="fixed inset-0 -z-10">
          <Suspense fallback={null}>
            <QuantumUniverseScene />
          </Suspense>
        </div>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12 text-yellow-400" />} className="justify-center">
                <span className="text-yellow-400">AR Profile</span>
              </PageTitle>
              <BodyText className="max-w-2xl mx-auto text-center text-yellow-400">
                Conecte-se para ver seu perfil sincronizado com QuantumoneyAR.app
              </BodyText>
            </div>

            <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-16 text-center space-y-6">
              <User className="w-24 h-24 text-yellow-400/50 mx-auto" />
              <p className="text-yellow-400 text-lg">Autenticação necessária</p>
              <Button
                onClick={login}
                disabled={loginStatus === 'logging-in'}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
              >
                {loginStatus === 'logging-in' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  'Conectar'
                )}
              </Button>
            </div>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Loading state
  if (arLoading) {
    return (
      <PageShell>
        <div className="fixed inset-0 -z-10">
          <Suspense fallback={null}>
            <QuantumUniverseScene />
          </Suspense>
        </div>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12 text-yellow-400" />} className="justify-center">
                <span className="text-yellow-400">AR Profile</span>
              </PageTitle>
            </div>

            <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-16 text-center space-y-6">
              <Loader2 className="w-24 h-24 text-yellow-400/50 mx-auto animate-spin" />
              <p className="text-yellow-400 text-lg">Carregando dados do jogo...</p>
            </div>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Error state
  if (arError) {
    return (
      <PageShell>
        <div className="fixed inset-0 -z-10">
          <Suspense fallback={null}>
            <QuantumUniverseScene />
          </Suspense>
        </div>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12 text-yellow-400" />} className="justify-center">
                <span className="text-yellow-400">AR Profile</span>
              </PageTitle>
            </div>

            <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-16 text-center space-y-6">
              <p className="text-yellow-400 text-lg">Erro ao carregar dados do jogo</p>
              <p className="text-yellow-400/70 text-sm">{arError.message}</p>
            </div>
          </div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <QuantumUniverseScene />
        </Suspense>
      </div>
      <Container>
        <div className="py-16 space-y-8">
          <div className="text-center space-y-4">
            <PageTitle icon={<Trophy className="w-12 h-12 text-yellow-400" />} className="justify-center">
              <span className="text-yellow-400">Perfil AR - QuantumoneyAR.app</span>
            </PageTitle>
            <BodyText className="max-w-2xl mx-auto text-center text-yellow-400">
              Dados sincronizados em tempo real com o jogo QuantumoneyAR.app
            </BodyText>
          </div>

          {/* Player Stats */}
          <ARPlayerStats data={arData} />

          {/* Coin Balance */}
          <ARCoinBalance data={arData} />

          {/* Monster Collection */}
          <ARMonsterCollection data={arData} />
        </div>
      </Container>
    </PageShell>
  );
}
