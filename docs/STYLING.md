# Styling Conventions

## Tailwind CSS v4

- Uses Tailwind CSS v4 with `@tailwindcss/postcss`
- NativeWind v5 for React Native compatibility

## File Organization

- Global styles: `global.css` at project root
- Component-specific styles: Use `className` prop with Tailwind utility classes

## Best Practices

- Use `tailwind-merge` for conditional class merging
- Use `tailwind-variants` for reusable component variants with typed props

## tailwind-variants Usage

Define component variants with `tv()`:

```typescript
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

// Usage: button({ color: 'secondary', size: 'sm' })
```

Combine with `tailwind-merge` when overriding classes:

```typescript
import { twMerge } from 'tailwind-merge';

function Button({ className, ...props }) {
  return <button className={twMerge(button(props), className)} {...props} />;
}
```
- Prefer semantic color names over raw values
