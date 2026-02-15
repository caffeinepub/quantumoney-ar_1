import { useLocalProfile } from '@/contexts/LocalProfileContext';
import { useUnifiedPlayerState } from '@/hooks/useUnifiedPlayerState';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Coins, MapPin } from 'lucide-react';

interface HUDOverlayProps {
  variant?: 'fixed' | 'inline';
}

export default function HUDOverlay({ variant = 'fixed' }: HUDOverlayProps) {
  const { profile } = useLocalProfile();
  const { playerState } = useUnifiedPlayerState();

  const avatarSrc = profile.avatarImage || '/assets/generated/player-marker-transparent.dim_64x64.png';
  const xp = playerState?.xp ? Number(playerState.xp) : 0;
  const coins = playerState?.availableTokens ? Number(playerState.availableTokens) : 0;

  const containerClass = variant === 'fixed'
    ? 'fixed top-24 right-4 z-40 w-64'
    : 'w-full';

  return (
    <div className={containerClass}>
      <Card className="hud-panel border-primary">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-primary object-cover"
            />
            <div className="flex-1">
              <p className="text-primary text-sm font-bold">Player</p>
              {profile.gender && (
                <p className="text-primary text-xs capitalize">{profile.gender}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">XP</span>
              </div>
              <span className="text-primary font-bold">{xp}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">Coins</span>
              </div>
              <span className="text-primary font-bold">{coins}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">Monsters</span>
              </div>
              <span className="text-primary font-bold">
                {playerState?.capturedMonsters?.length || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
