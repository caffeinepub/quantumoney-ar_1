import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { User, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useRegisterPlayer, useGetPlayerState } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProfileGlassPanel from '@/components/profile/ProfileGlassPanel';
import ProfileHudOverlay from '@/components/profile/ProfileHudOverlay';
import ProfilePlaceholders from '@/components/profile/ProfilePlaceholders';
import { useProfileModuleState } from '@/components/profile/useProfileModuleState';
import { toast } from 'sonner';

export default function Perfil() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: playerState } = useGetPlayerState();
  const saveProfile = useSaveCallerUserProfile();
  const registerPlayer = useRegisterPlayer();

  const [editedNickname, setEditedNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { isAuthenticated, isRegistered, showProfileSetup } = useProfileModuleState(
    identity,
    userProfile,
    profileLoading,
    isFetched
  );

  const handleRegister = async () => {
    if (!editedNickname.trim()) {
      toast.error('Please enter a nickname');
      return;
    }

    try {
      await registerPlayer.mutateAsync(editedNickname.trim());
      toast.success('Profile created successfully!');
      setEditedNickname('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create profile');
    }
  };

  const handleSave = async () => {
    if (!userProfile || !editedNickname.trim()) {
      toast.error('Please enter a valid nickname');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        ...userProfile,
        nickname: editedNickname.trim(),
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setEditedNickname('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const startEditing = () => {
    if (userProfile) {
      setEditedNickname(userProfile.nickname);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedNickname('');
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12" />} className="justify-center">
                Profile
              </PageTitle>
              <BodyText className="max-w-2xl mx-auto text-center">
                Please log in to view your profile
              </BodyText>
            </div>

            <ProfileGlassPanel>
              <div className="p-16 text-center space-y-6">
                <User className="w-24 h-24 text-primary/50 mx-auto" />
                <p className="text-primary text-lg">Authentication required</p>
                <Button
                  onClick={login}
                  disabled={loginStatus === 'logging-in'}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loginStatus === 'logging-in' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </ProfileGlassPanel>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Loading state
  if (profileLoading) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12" />} className="justify-center">
                Profile
              </PageTitle>
            </div>

            <ProfileGlassPanel>
              <div className="p-16 text-center space-y-6">
                <Loader2 className="w-24 h-24 text-primary/50 mx-auto animate-spin" />
                <p className="text-primary text-lg">Loading profile...</p>
              </div>
            </ProfileGlassPanel>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Registration required
  if (showProfileSetup) {
    return (
      <PageShell>
        <Container>
          <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
              <PageTitle icon={<User className="w-12 h-12" />} className="justify-center">
                Profile Setup
              </PageTitle>
              <BodyText className="max-w-2xl mx-auto text-center">
                Create your player profile to start playing
              </BodyText>
            </div>

            <ProfileGlassPanel>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-primary">
                    Nickname
                  </Label>
                  <Input
                    id="nickname"
                    value={editedNickname}
                    onChange={(e) => setEditedNickname(e.target.value)}
                    placeholder="Enter your nickname"
                    className="bg-background/50 border-primary/30 text-foreground focus:border-primary"
                    maxLength={30}
                  />
                </div>

                <Button
                  onClick={handleRegister}
                  disabled={registerPlayer.isPending || !editedNickname.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {registerPlayer.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating profile...
                    </>
                  ) : (
                    'Create Profile'
                  )}
                </Button>
              </div>
            </ProfileGlassPanel>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Registered user - show profile
  const profile = userProfile || playerState;

  return (
    <PageShell>
      <Container>
        <div className="py-16 space-y-8 relative">
          {/* HUD Overlay */}
          {profile && <ProfileHudOverlay profile={profile} />}

          <div className="text-center space-y-4">
            <PageTitle icon={<User className="w-12 h-12" />} className="justify-center">
              Profile
            </PageTitle>
            <BodyText className="max-w-2xl mx-auto text-center">
              Manage your player profile and view your stats
            </BodyText>
          </div>

          {profile && (
            <>
              {/* Main Profile Panel */}
              <ProfileGlassPanel>
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary">Player Information</h3>
                    {!isEditing && (
                      <Button
                        onClick={startEditing}
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Edit Nickname
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-nickname" className="text-primary">
                          Nickname
                        </Label>
                        <Input
                          id="edit-nickname"
                          value={editedNickname}
                          onChange={(e) => setEditedNickname(e.target.value)}
                          placeholder="Enter your nickname"
                          className="bg-background/50 border-primary/30 text-foreground focus:border-primary"
                          maxLength={30}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSave}
                          disabled={saveProfile.isPending || !editedNickname.trim()}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {saveProfile.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                        <Button
                          onClick={cancelEditing}
                          variant="outline"
                          className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Nickname</p>
                        <p className="text-xl font-semibold text-primary">{profile.nickname}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Level</p>
                        <p className="text-xl font-semibold text-primary">{profile.level.toString()}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Experience Points</p>
                        <p className="text-xl font-semibold text-primary">{profile.xp.toString()} XP</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Energy</p>
                        <p className="text-xl font-semibold text-primary">{profile.energy.toString()}%</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Available Tokens</p>
                        <p className="text-xl font-semibold text-primary">{profile.availableTokens.toString()} QTM</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Planted Tokens</p>
                        <p className="text-xl font-semibold text-primary">{profile.plantedTokens.toString()} QTM</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Bonus Tokens</p>
                        <p className="text-xl font-semibold text-primary">{profile.bonusTokens.toString()} QTM</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-primary/70">Captured Monsters</p>
                        <p className="text-xl font-semibold text-primary">{profile.capturedMonsters.length}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ProfileGlassPanel>

              {/* Placeholder sections for future expansion */}
              <ProfilePlaceholders />
            </>
          )}
        </div>
      </Container>
    </PageShell>
  );
}
