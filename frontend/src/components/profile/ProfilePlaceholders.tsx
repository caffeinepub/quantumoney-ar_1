import ProfileGlassPanel from './ProfileGlassPanel';
import { Package, Activity, Zap } from 'lucide-react';

export default function ProfilePlaceholders() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Captured Monsters Placeholder */}
      <ProfileGlassPanel>
        <div className="p-6 text-center space-y-4">
          <Package className="w-12 h-12 text-primary/50 mx-auto" />
          <h4 className="text-lg font-semibold text-primary">Captured Monsters</h4>
          <p className="text-sm text-primary/70">
            View your collection of captured monsters and their stats
          </p>
          <p className="text-xs text-primary/50 italic">Coming soon</p>
        </div>
      </ProfileGlassPanel>

      {/* Recent Activity Placeholder */}
      <ProfileGlassPanel>
        <div className="p-6 text-center space-y-4">
          <Activity className="w-12 h-12 text-primary/50 mx-auto" />
          <h4 className="text-lg font-semibold text-primary">Recent Activity</h4>
          <p className="text-sm text-primary/70">
            Track your recent actions, achievements, and progress
          </p>
          <p className="text-xs text-primary/50 italic">Coming soon</p>
        </div>
      </ProfileGlassPanel>

      {/* Quick Actions Placeholder */}
      <ProfileGlassPanel>
        <div className="p-6 text-center space-y-4">
          <Zap className="w-12 h-12 text-primary/50 mx-auto" />
          <h4 className="text-lg font-semibold text-primary">Quick Actions</h4>
          <p className="text-sm text-primary/70">
            Access frequently used features and shortcuts
          </p>
          <p className="text-xs text-primary/50 italic">Coming soon</p>
        </div>
      </ProfileGlassPanel>
    </div>
  );
}
