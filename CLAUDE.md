# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router (React Server Components by default)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** with PostCSS and lightningcss
- **shadcn/ui** component patterns (New York style, Lucide icons)

## Architecture

### App Router Structure
- `app/` - Next.js App Router pages and layouts
- `app/globals.css` - Tailwind CSS configuration with OKLch color system and dark mode support via `.dark` class
- `lib/utils.ts` - Shared utilities including `cn()` function for Tailwind class merging
- `public/` - Static assets

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)
- `@/components`, `@/components/ui`, `@/lib`, `@/hooks` aliases available

### Styling Patterns
- Use `cn()` utility from `@/lib/utils` for conditional/merged Tailwind classes
- CSS variables defined for all design tokens (colors, radius, etc.)
- Dark mode uses CSS variables that change under `.dark` class selector
