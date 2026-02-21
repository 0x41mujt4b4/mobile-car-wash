import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    const variants = {
      default: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
      outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
      link: 'text-brand-600 underline-offset-4 hover:underline'
    };
    
    const sizes = {
      default: 'h-12 px-6 py-2',
      sm: 'h-9 px-4 rounded-md text-sm',
      lg: 'h-14 px-8 rounded-full text-lg',
      icon: 'h-12 w-12 flex justify-center items-center'
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
