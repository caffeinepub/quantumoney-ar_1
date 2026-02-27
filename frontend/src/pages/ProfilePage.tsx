import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { User, Loader2, Trophy } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useARGameData } from '@/hooks/useARGameData';
import TechnicalValidationPanel from '@/components/profile/TechnicalValidationPanel';
import ARPlayerStats from '@/components/profile/ARPlayerStats';
import ARCoinBalance from '@/components/profile/ARCoinBalance';
import ARMonsterCollection from '@/components/profile/ARMonsterCollection';
import { Button } from '@/components/ui/button';
import type { PlayerProfile } from '@/backend';

function toPlayerStatsShape(profile: PlayerProfile | null | undefined) {
  if (!profile) return undefined;
  return {
    xp: Number(profile.xp),
    level: Number(profile.level),
  };
}

function toCoinBalanceShape(profile: PlayerProfile | null | undefined) {
  if (!profile) return undefined;
  return {
    availableCoins: Number(profile.availableTokens),
    lockedCoins: Number(profile.plantedTokens),
    bonusCoins: Number(profile.bonusTokens),
  };
}

function toMonsterCollectionShape(profile: PlayerProfile | null | undefined) {
  if (!profile) return undefined;
  return {
    capturedMonsters: profile.capturedMonsters.map((cm) => ({
      name: cm.monster.name,
      captureTime: Number(cm.captureTime),
      energyBoost: Number(cm.monster.energyBoost),
    })),
  };
}

export default function ProfilePage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: arData, isLoading: arLoading, error: arError } = useARGameData();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12 text-yellow-400" />} className="justify-center">
                <span className="text-yellow-400">Perfil AR</span>
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
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Conectando...</>
                ) : 'Conectar'}
              </Button>
            </div>
          </div>
        </Container>
      </PageShell>
    );
  }

  if (arLoading) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 text-center">
            <Loader2 className="w-16 h-16 text-yellow-400/50 mx-auto animate-spin mb-4" />
            <p className="text-yellow-400">Carregando dados do jogo...</p>
          </div>
        </Container>
      </PageShell>
    );
  }

  if (arError) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 text-center">
            <p className="text-yellow-400 text-lg">Erro ao carregar dados do jogo</p>
            <p className="text-yellow-400/70 text-sm mt-2">{arError.message}</p>
          </div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
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
          <TechnicalValidationPanel />
          <ARPlayerStats data={toPlayerStatsShape(arData)} />
          <ARCoinBalance data={toCoinBalanceShape(arData)} />
          <ARMonsterCollection data={toMonsterCollectionShape(arData)} />
        </div>
      </Container>
    </PageShell>
  );
}
