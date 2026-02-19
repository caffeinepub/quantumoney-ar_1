import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`min-h-[100dvh] pt-20 ${className}`}>
      {children}
    </div>
  );
}
