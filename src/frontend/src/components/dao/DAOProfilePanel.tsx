import { useLocalProfile } from '@/contexts/LocalProfileContext';
import { useUnifiedPlayerState } from '@/hooks/useUnifiedPlayerState';
import { User, TrendingUp, Coins, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DAOProfilePanel() {
  const { profile } = useLocalProfile();
  const { playerState } = useUnifiedPlayerState();

  const avatarSrc = profile.avatarImage || '/assets/generated/player-marker-transparent.dim_64x64.png';
  const xp = playerState?.xp ? Number(playerState.xp) : 0;
  const coins = playerState?.availableTokens ? Number(playerState.availableTokens) : 0;
  const monsters = playerState?.capturedMonsters?.length || 0;

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <User className="w-5 h-5" />
          Player Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-primary object-cover"
          />
          <div className="flex-1">
            <p className="text-primary text-sm font-bold">
              {playerState?.nickname || 'Player'}
            </p>
            {profile.gender && (
              <p className="text-muted-foreground text-xs capitalize">{profile.gender}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">XP</p>
              <p className="text-primary text-base font-bold">{xp}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Coins</p>
              <p className="text-primary text-base font-bold">{coins}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Monsters</p>
              <p className="text-primary text-base font-bold">{monsters}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
