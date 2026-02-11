import { ReactNode, CSSProperties } from 'react';

interface PageTitleProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  style?: CSSProperties;
}

export function PageTitle({ children, className = '', icon, style }: PageTitleProps) {
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4 flex items-center gap-4 ${className}`} style={style}>
      {icon}
      {children}
    </h1>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SectionTitle({ children, className = '', style }: SectionTitleProps) {
  return (
    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary mb-6 ${className}`} style={style}>
      {children}
    </h2>
  );
}

interface SubsectionTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SubsectionTitle({ children, className = '', style }: SubsectionTitleProps) {
  return (
    <h3 className={`text-xl md:text-2xl font-serif font-semibold text-primary mb-4 ${className}`} style={style}>
      {children}
    </h3>
  );
}

interface BodyTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function BodyText({ children, className = '', style }: BodyTextProps) {
  return (
    <p className={`text-base md:text-lg text-muted-foreground leading-relaxed ${className}`} style={style}>
      {children}
    </p>
  );
}
