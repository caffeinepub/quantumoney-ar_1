import { PlayerProfile } from '@/backend';

interface ProfileHudOverlayProps {
  profile: PlayerProfile;
}

export default function ProfileHudOverlay({ profile }: ProfileHudOverlayProps) {
  return (
    <div className="fixed top-24 right-4 z-40 space-y-2 pointer-events-none">
      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Nickname</span>
          <span className="text-sm font-semibold text-primary">{profile.nickname}</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Energy</span>
          <span className="text-sm font-semibold text-primary">{profile.energy.toString()}%</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">XP</span>
          <span className="text-sm font-semibold text-primary">{profile.xp.toString()}</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Level</span>
          <span className="text-sm font-semibold text-primary">{profile.level.toString()}</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Available</span>
          <span className="text-sm font-semibold text-primary">{profile.availableTokens.toString()} QTM</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Planted</span>
          <span className="text-sm font-semibold text-primary">{profile.plantedTokens.toString()} QTM</span>
        </div>
      </div>

      <div className="profile-hud-panel px-4 py-2 min-w-[200px]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary/70">Bonus</span>
          <span className="text-sm font-semibold text-primary">{profile.bonusTokens.toString()} QTM</span>
        </div>
      </div>
    </div>
  );
}
