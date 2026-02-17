import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ProfileGlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function ProfileGlassPanel({ children, className = '' }: ProfileGlassPanelProps) {
  return (
    <Card className={`profile-glass-panel ${className}`}>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
