import { Lock } from 'lucide-react';

interface ReadOnlyBannerProps {
  message?: string;
}

export default function ReadOnlyBanner({ message = 'This is an institutional read-only dashboard. All transfer and swap functionality is coming soon.' }: ReadOnlyBannerProps) {
  return (
    <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Lock className="w-6 h-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          Read-Only – Transfers Disabled
        </h2>
      </div>
      <p className="text-center text-muted-foreground text-sm md:text-base">
        {message}
      </p>
    </div>
  );
}
