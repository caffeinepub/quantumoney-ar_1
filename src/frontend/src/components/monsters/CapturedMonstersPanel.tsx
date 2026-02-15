import { useState } from 'react';
import { useUnifiedPlayerState } from '@/hooks/useUnifiedPlayerState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import MonsterImageModal from './MonsterImageModal';
import { useActor } from '@/hooks/useActor';

export default function CapturedMonstersPanel() {
  const { playerState } = useUnifiedPlayerState();
  const { actor } = useActor();
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const capturedMonsters = playerState?.capturedMonsters || [];

  const handleView = (monsterName: string) => {
    setSelectedMonster(monsterName);
  };

  const handlePrint = (monsterName: string) => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleShare = async (monsterName: string) => {
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      if (!actor) {
        toast.error('Not connected to backend');
        return;
      }

      const shareData = {
        title: `Captured ${monsterName}`,
        text: `I captured ${monsterName} in Quantumoney AR!`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Share link copied to clipboard');
      }

      const success = await actor.shareMonsterAction(monsterName);
      if (success) {
        toast.success('+2 XP earned from sharing!', { duration: 3000 });
      }
    } catch (error: any) {
      if (error.message?.includes('Share limit')) {
        toast.error('Daily share limit reached (10 shares per 24 hours)');
      } else if (error.message !== 'AbortError') {
        toast.error('Share failed');
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (capturedMonsters.length === 0) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary">Captured Monsters</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No monsters captured yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary">Captured Monsters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {capturedMonsters.map((captured, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-primary/20 bg-background/30"
              >
                <div>
                  <p className="text-primary font-semibold">{captured.monster.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Energy Boost: +{Number(captured.monster.energyBoost)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(captured.monster.name)}
                    className="border-primary/40"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePrint(captured.monster.name)}
                    className="border-primary/40"
                  >
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(captured.monster.name)}
                    disabled={isSharing}
                    className="border-primary/40"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMonster && (
        <MonsterImageModal
          monsterName={selectedMonster}
          onClose={() => setSelectedMonster(null)}
          onPrint={() => handlePrint(selectedMonster)}
          onShare={() => handleShare(selectedMonster)}
        />
      )}
    </>
  );
}
