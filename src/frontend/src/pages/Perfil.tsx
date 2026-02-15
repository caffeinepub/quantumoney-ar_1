import { useState, useRef } from 'react';
import { useLocalProfile } from '@/contexts/LocalProfileContext';
import { useUnifiedPlayerState } from '@/hooks/useUnifiedPlayerState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { User, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import CapturedMonstersPanel from '@/components/monsters/CapturedMonstersPanel';
import AuthGate from '@/components/auth/AuthGate';
import { useRegisterPlayer, useSaveCallerUserProfile } from '@/hooks/useQueries';

export default function ProfilePage() {
  const { profile, setGender, setAvatarImage, setMonsterAvatar } = useLocalProfile();
  const { playerState, isAuthenticated, refresh } = useUnifiedPlayerState();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other'>(profile.gender || 'male');
  const [displayName, setDisplayName] = useState(playerState?.nickname || '');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const registerMutation = useRegisterPlayer();
  const saveProfileMutation = useSaveCallerUserProfile();

  const handleGenderChange = (value: string) => {
    const gender = value as 'male' | 'female' | 'other';
    setSelectedGender(gender);
    setGender(gender);
    toast.success('Gender updated successfully');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAvatarImage(dataUrl);
      setUploadSuccess(true);
      toast.success('Avatar uploaded and saved successfully!');
      setTimeout(() => setUploadSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleMonsterSelect = (monsterId: string) => {
    setMonsterAvatar(monsterId);
    toast.success('Monster avatar selected');
  };

  const handleSaveProfile = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in first');
      return;
    }

    if (!displayName.trim()) {
      toast.error('Please enter a display name');
      return;
    }

    try {
      if (!playerState?.registered) {
        await registerMutation.mutateAsync(displayName);
        toast.success('Profile registered successfully!');
      } else if (playerState) {
        await saveProfileMutation.mutateAsync({
          ...playerState,
          nickname: displayName,
        });
        toast.success('Profile updated successfully!');
      }
      refresh();
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const monsters = [
    { id: 'btc', name: 'BTC Monster', image: '/assets/generated/btc-monster-transparent.dim_128x128.png' },
    { id: 'eth', name: 'ETH Monster', image: '/assets/generated/eth-monster-transparent.dim_128x128.png' },
    { id: 'icp', name: 'ICP Monster', image: '/assets/generated/icp-monster-transparent.dim_128x128.png' },
    { id: 'sol', name: 'SOL Monster', image: '/assets/generated/sol-monster-transparent.dim_128x128.png' },
  ];

  const isUnlocked = playerState?.registered || false;

  return (
    <PageShell>
      <AuthGate>
        <Container>
          <div className="py-12 space-y-8 pb-32">
            <PageTitle icon={<User className="w-12 h-12" />}>
              Profile Settings
            </PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">Avatar Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden bg-background/50">
                    <img
                      src={profile.avatarImage || '/assets/generated/player-marker-transparent.dim_64x64.png'}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-primary font-semibold">{displayName || 'Player'}</p>
                    {profile.gender && (
                      <p className="text-muted-foreground text-sm capitalize">{profile.gender}</p>
                    )}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {isUnlocked ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 text-sm">Unlocked</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not registered</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="displayName" className="text-primary">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-2 border-primary/40"
                    />
                  </div>

                  <div>
                    <Label className="text-primary mb-3 block">Gender</Label>
                    <RadioGroup value={selectedGender} onValueChange={handleGenderChange}>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="text-primary cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="text-primary cursor-pointer">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="text-primary cursor-pointer">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full"
                    disabled={registerMutation.isPending || saveProfileMutation.isPending}
                  >
                    {registerMutation.isPending || saveProfileMutation.isPending
                      ? 'Saving...'
                      : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Personal Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-primary/40 text-primary hover:bg-primary/10"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                {uploadSuccess && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Upload confirmed and saved!</span>
                  </div>
                )}
                <p className="text-muted-foreground text-xs mt-2 text-center">
                  Upload a personal photo to use as your avatar
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Select Monster Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {monsters.map((monster) => (
                    <button
                      key={monster.id}
                      onClick={() => handleMonsterSelect(monster.id)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        profile.monsterAvatarId === monster.id
                          ? 'border-primary bg-primary/10'
                          : 'border-primary/30 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={monster.image}
                        alt={monster.name}
                        className="w-full h-auto mb-2"
                      />
                      <p className="text-primary text-xs text-center">{monster.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <CapturedMonstersPanel />
          </div>
        </Container>
      </AuthGate>
    </PageShell>
  );
}
