import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = false }: CardProps) => (
  <div
    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${
      hover ? 'hover:shadow-md transition-shadow duration-200' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
