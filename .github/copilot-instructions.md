# Copilot Instructions for Challenge

## Big Picture & Data Flow

This project is a **dummy SQL Query Runner** for the Frontend Engineering Challenge. It simulates a data analyst's workflow: users write SQL queries, select from predefined queries, and view tabular results. **No real database or SQL execution exists**—all data is static JSON in `public/data/`, fetched client-side. The architecture is designed for:

- **Realistic analyst UX** (query input, tabular results, fast switching)
- **Performance** (must handle thousands of rows without browser crashes)
- **Accessibility** (WCAG 2.1+ focus, ARIA, keyboard, and screen reader support)
- **Scalability** (structure supports large datasets and future extension)

## Essential Project Patterns

### Structure & Component Patterns

- **Next.js 15 App Router**: All routes in `src/app/` (no legacy `pages/`)
- **Feature-based folders**: Each domain (e.g., `query-editor/`, `results-panel/`, `sidebar/`) has its own components, hooks, types, and utils
- **shadcn/ui pattern**: All UI in `src/components/ui/` uses compound component + `cva` (variants) + Radix primitives. **Always use or extend these; add new ones via `npx shadcn add <component>`**
- **Tailwind CSS v4**: Theming via CSS variables (see `components.json`)
- **Utilities**: Use `cn()` from `@/utils/cn` for conditional classes
- **TypeScript strict**: Use `I` prefix for interfaces, `T` for types

### Data & Integration

- **Static data only**: All data is in `public/data/*.json`, fetched via GET. No backend, no real SQL parsing/execution
- **No database**: Simulate query results by mapping queries to static tables
- **Path aliases**: Use `@/` for imports (see `tsconfig.json`)

### Accessibility & Performance

- **Accessibility**: All components must be accessible (ARIA, focus, keyboard, screen reader). Follow WCAG 2.1+ and project a11y instructions
- **Performance**: Must render large tables (thousands of rows) without lag. Use virtualization or pagination if needed
- **Scalability**: Structure supports future extension and concurrent users

## Developer Workflow

- **Development**: `npm run dev` (Turbopack, always running)
- **Testing**: `npm run test` (Vitest + React Testing Library, jsdom)
- **Production**: `npm run build --turbopack` then `npm start`
- **Component tests**: Only write tests if explicitly asked; co-locate with source
- **Add UI**: Always use/extend shadcn/ui components; never build custom UI from scratch
- **Data**: Add new datasets to `public/data/` as needed

## Key Examples

- **Feature folder**: `src/components/query-editor/` contains its own `components/`, `hooks/`, etc.
- **UI extension**: To add a new button, use `npx shadcn add button` and extend in `src/components/ui/button.tsx`
- **Data fetch**: Use `fetch('/data/products.json')` in client components

## Evaluation Focus

- **Core functionality**: Query input + results table must always work
- **Performance**: Fast load, smooth large dataset handling
- **Accessibility**: All UI must be usable by keyboard and screen reader
- **Consistency**: Follow shadcn/ui, feature folders, and naming conventions

For more, see `README.md` and `docs/`.

### Framework Setup

- **Next.js 15** with App Router (`src/app/` directory structure)
- **Tailwind CSS v4** for styling with CSS variables for theming
- **shadcn/ui New York style** components with Radix primitives
- **Vitest** for testing with React Testing Library and jsdom

### Component Architecture

- **shadcn/ui pattern**: All UI components in `src/components/ui/` follow the compound component pattern with `cva` (class-variance-authority) for variants
- **ShadCN components required**: Always use existing ShadCN components from `src/components/ui/`. When new UI components are needed, install them via `npx shadcn add <component-name>` rather than building from scratch
- **Feature-based structure**: Components in `src/components/` are organized by feature domains (e.g., `query-editor/`, `results-table/`, `sidebar/`) with each feature containing its own components, hooks, services, types, and utilities
- **Radix integration**: Components use `@radix-ui/react-slot` for flexible composition (see `Button` component)
- **Type-safe variants**: All components use `VariantProps` with TypeScript for design system consistency

### Styling Conventions

- **CSS Variables**: Tailwind uses CSS custom properties for theming (configured in `components.json`)
- **Class utility**: Use `cn()` from `@/utils/cn` (combines `clsx` and `tailwind-merge`) for conditional classes
- **Focus management**: All interactive components include comprehensive focus-visible states and ARIA attributes

### Development Workflow

#### Scripts

```bash
# Development (uses Turbopack for faster builds)
npm run dev           # NOTE: Always running - no need to execute this command

# Testing (comprehensive Vitest setup)
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:ui       # Visual test UI
npm run test:coverage # Coverage report

# Production
npm run build --turbopack
npm start
```

#### Testing Patterns

- **Co-location**: Place tests next to source files (e.g., `page.test.tsx`, `utils.test.ts`)
- **Testing Library**: Use `render`, `screen`, and `cleanup` from `@testing-library/react`
- **Vitest setup**: Tests run in jsdom environment with TypeScript path resolution

### File Organization Principles

- **App Router**: All routes in `src/app/` with layout hierarchies
- **Component library**: Reusable UI components in `src/components/ui/`
- **Feature-based components**: Domain-specific components organized by feature in `src/components/`. Use this structure based on complexity - simple features may only need a few files, while complex features benefit from full organization:
  ```
  src/components/
  ├── ui/                    # shadcn/ui components (Button, Card, etc.)
  └── [feature-name]/        # Feature-based organization (adapt based on needs)
      ├── components/        # Feature-specific components (always present)
      │   ├── ComponentA/    # Individual component folders (if complex)
      │   └── ComponentB/
      ├── hooks/            # Feature-specific React hooks (only if needed)
      ├── services/         # Feature business logic & API calls (only if needed)
      ├── types/            # Feature TypeScript definitions (only if complex)
      │   └── index.ts      # OR use types.ts file for simpler cases
      ├── utils/            # Feature utility functions (only if needed)
      └── index.ts          # Feature exports barrel file
  ```
  **Guidelines for structure decisions:**
  - Single component features can be a single file in the feature folder
  - Use `types.ts` instead of `types/` directory for simple type definitions
  - Only create `hooks/`, `services/`, `utils/` folders when you have multiple files
  - Complex features with 3+ components benefit from the full folder structure
- **Utilities**: Shared functions in `src/lib/`
- **Static data**: JSON datasets in `public/data/` for client-side fetching
- **Path aliases**: Use `@/` prefix for imports (configured in `tsconfig.json`)

### Performance & Accessibility Focus

- **Font optimization**: Uses `next/font/google` with Geist family
- **Image optimization**: Leverages `next/image` for all graphics
- **Accessibility**: Components include proper ARIA attributes, focus management, and semantic HTML
- **Performance budgets**: Built with data analyst daily usage patterns in mind (fast query results, responsive tables)
- **Large dataset handling**: Must render thousands of rows without browser crashes (virtualization, pagination)
- **Load time optimization**: Prioritizes initial load speed and re-render performance

## Key Implementation Notes

- **Button component**: Extensive variant system with proper focus states and disabled handling
- **Testing philosophy**: Each component should have unit tests covering variants and accessibility
- **TypeScript strict**: Full type safety with React 19 and Next.js 15 types
- **No database**: This is a UI-focused challenge - simulate data patterns rather than real backend integration
- **Data handling**: JSON files stored in `public/data/` directory, fetched via GET requests (no backend needed)
- **Essential vs. enhanced features**: Prioritize core functionality (query input, results display) before adding value-add features

## Development Guidelines

When adding features:

1. **Use ShadCN components**: Always prefer existing ShadCN components from `src/components/ui/` or install new ones with `npx shadcn add <component>` before creating custom UI components
2. Follow the shadcn/ui component pattern for consistency
3. Use `cn()` for all conditional styling
4. Include comprehensive focus and disabled states
5. **Never write any unit test or integration test unless explicitly asked.** Do not generate any test files, test code, or test stubs unless the user specifically requests it.
6. Write tests alongside implementation only if explicitly instructed.
7. Maintain the data analyst workflow focus - prioritize usability over complexity
8. **TypeScript naming convention**: Always use the `I` prefix for interfaces (e.g., `IQuery`) and the `T` prefix for types (e.g., `TQuery`).

## Evaluation Focus Areas

- **Core functionality first**: SQL input interface + tabular results display are non-negotiable
- **Performance optimization**: Load time, re-render speed, large dataset handling
- **User experience**: Anticipate data analyst workflows and daily usage patterns
- **Code quality**: Structure, readability, and adherence to best practices
- **Value-add features**: Features that enhance analyst productivity without adding complexity
