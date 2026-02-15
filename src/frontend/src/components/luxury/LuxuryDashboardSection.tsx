import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface LuxuryDashboardSectionProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function LuxuryDashboardSection({ 
  title, 
  icon: Icon, 
  children, 
  className = '' 
}: LuxuryDashboardSectionProps) {
  return (
    <Card className={`glass-card-elevated border-primary/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3 text-xl">
          {Icon && <Icon className="w-6 h-6" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
