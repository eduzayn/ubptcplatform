<<<<<<< HEAD
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
=======
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
<<<<<<< HEAD
  },
);
=======
  }
)
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
<<<<<<< HEAD
  asChild?: boolean;
=======
  asChild?: boolean
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
<<<<<<< HEAD
    const Comp = asChild ? Slot : "button";
    const isDisabled = props.disabled;
    const hasLoadingIndicator =
      props.children &&
      typeof props.children === "object" &&
      React.isValidElement(props.children) &&
      props.children.type === "svg" &&
      props.children.props.className?.includes("animate-spin");

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isDisabled && !hasLoadingIndicator && "opacity-70 cursor-not-allowed",
          isDisabled && hasLoadingIndicator && "opacity-90 cursor-wait",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
=======
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
