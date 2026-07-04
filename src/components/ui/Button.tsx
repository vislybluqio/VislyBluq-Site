import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white';
type ButtonSize = 'sm' | 'md';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  to?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string;
  type?: never;
  disabled?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-visly-navy text-white hover:bg-visly-blue shadow-sm',
  secondary: 'border border-gray-200 text-visly-dark bg-white hover:border-visly-blue hover:text-visly-blue',
  ghost: 'text-visly-blue hover:bg-visly-gray',
  white: 'bg-white text-visly-navy hover:bg-visly-cyan hover:text-white shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const classes = `inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('to' in props && props.to) {
    const { to, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { disabled, type = 'button', ...rest } = props as ButtonAsButton;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${classes} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

