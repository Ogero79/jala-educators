import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg focus:ring-primary',
    secondary: 'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90 hover:shadow-lg focus:ring-secondary',
    outline: 'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground focus:ring-secondary',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };

  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;