import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

const Container = ({ children, className = '', narrow = false }: ContainerProps) => (
  <div
    className={`mx-auto px-4 sm:px-6 lg:px-8 ${
      narrow ? 'max-w-4xl' : 'max-w-7xl'
    } ${className}`}
  >
    {children}
  </div>
);

export default Container;
