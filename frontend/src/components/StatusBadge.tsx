import { Badge } from '@/components/ui/badge';
import { FileText, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'draft' | 'planned' | 'coming-soon';
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = {
    draft: {
      label: 'Draft / In Progress',
      icon: FileText,
      className: 'border-warning/50 text-warning bg-warning/10',
    },
    planned: {
      label: 'Planned / Not Active',
      icon: Clock,
      className: 'border-accent/50 text-accent bg-accent/10',
    },
    'coming-soon': {
      label: 'Not Active / Coming Soon',
      icon: AlertCircle,
      className: 'border-muted-foreground/50 text-muted-foreground bg-muted/20',
    },
  };

  const { label, icon: Icon, className: statusClassName } = config[status];

  return (
    <Badge variant="outline" className={`${statusClassName} flex items-center gap-2 px-3 py-1 ${className}`}>
      <Icon className="w-3 h-3" />
      <span className="text-xs font-medium">{label}</span>
    </Badge>
  );
}
