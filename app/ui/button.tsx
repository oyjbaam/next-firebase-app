import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../util/twMerge'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonStyles = cva('font-semibold transition duration-200 ease-in-out', {
  variants: {
    intent: {
      filled:
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
      outlined: 'bg-slate-200 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-300 active:bg-slate-400',
      text: 'hover:text-blue-600 active:text-blue-200',
    },
    sizes: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    rounded: {
      normal: '',
      full: 'rounded-full',
    },
    disabled: {
      false: '',
      true: 'cursor-not-allowed bg-gray-400 hover:bg-gray-400 active:bg-gray-400',
    },
    _content: {
      text: '',
      textAndIcon: 'inline-flex items-center',
      icon: '',
    },
  },
  compoundVariants: [
    { sizes: 'sm', rounded: 'normal', className: 'rounded' },
    { sizes: ['md', 'lg'], rounded: 'normal', className: 'rounded-md' },
    { sizes: 'sm', _content: ['text', 'textAndIcon'], className: 'gap-x-1.5 py-2 px-4' },
    { sizes: ['md', 'lg'], _content: ['text', 'textAndIcon'], className: 'gap-x-2' },
    { sizes: 'md', _content: ['textAndIcon', 'text'], className: 'py-3 px-6' },
    { sizes: 'lg', _content: ['textAndIcon', 'text'], className: 'py-3.5 px-7' },
    { sizes: 'sm', _content: 'icon', className: 'p-1' },
    { sizes: 'md', _content: 'icon', className: 'p-1.5' },
    { sizes: 'lg', _content: 'icon', className: 'p-2' },
  ],
  defaultVariants: {
    intent: 'filled',
    sizes: 'md',
    rounded: 'normal',
    _content: 'text',
    disabled: false,
  },
})

export type SVGComponent = React.ComponentType<React.SVGAttributes<SVGElement>>
export type ButtonVariants = Omit<VariantProps<typeof buttonStyles>, '_content'>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<ButtonVariants> &
  (
    | {
        trailingIcon?: SVGComponent
        leadingIcon?: never
      }
    | {
        trailingIcon?: never
        leadingIcon?: SVGComponent
      }
  )

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      intent,
      sizes,
      rounded,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      className,
      disabled,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        disabled={disabled ? disabled : undefined}
        className={cn(
          buttonStyles({
            intent,
            sizes,
            rounded,
            _content: LeadingIcon || TrailingIcon ? 'textAndIcon' : 'text',
            disabled,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {LeadingIcon ? <LeadingIcon className="-ml-0.5 h-5 w-5" aria-hidden={true} /> : null}
        {children}
        {TrailingIcon ? <TrailingIcon className="-mr-0.5 h-5 w-5" aria-hidden={true} /> : null}
      </button>
    )
  }
)
Button.displayName = 'Button'
export { Button, buttonStyles }
