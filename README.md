# SQL Query Runner - Frontend Engineering Challenge

[🌐 **Live Demo:** sql-runner-ux.imanish.com](https://sql-runner-ux.imanish.com)

**SCREENSHOT:**

![App Screenshot](docs/SCREENSHOT.png)

A web-based application capable of running SQL queries and displaying results, built for Frontend Engineering challenge.

## 📋 Challenge Overview

This application is designed to simulate a SQL query runner interface that a data analyst would use throughout their workday. While this is a dummy application that doesn't connect to a real database, it provides an intuitive interface for writing SQL queries and viewing tabular results.

## 🛠 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and maintainability
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) for pre-built accessible components. ShadCN internally uses [Radix UI](https://www.radix-ui.com/) primitives.
- **Table & Virtualization**: [@tanstack/react-table](https://tanstack.com/table/latest) & [@tanstack/react-virtual](https://tanstack.com/virtual/latest)
  - Virtualization is implemented to efficiently handle large datasets and ensure smooth scrolling and interaction.
- **Icons**: [lucide-react](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting**: [ESLint](https://eslint.org/) with [eslint-config-next](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)
- **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [class-variance-authority](https://cva.style/) to manage conditional class names and Tailwind CSS variants.
- **Resizable Panels**: [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) to allow users to adjust the size of the query editor and results pane.
- **Dialog & Primitives**: [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [@radix-ui/react-separator](https://www.radix-ui.com/primitives/docs/components/separator), [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/components/slot). These are added by components from shadcn/ui, and can be used directly if needed.

## 🎥 Demo

[Walkthrough video will be added here - showcasing implementation details and query execution]

## 📁 Project Structure

```
public/
  ├── data/                # Static JSON datasets
  └── ...                  # Static assets (SVGs, images, etc.)
src/
  ├── app/                 # Next.js app router (pages, layouts)
  ├── components/
  │   ├── ui/              # Base UI components (shadcn/ui)
  │   ├── query-editor/    # Query editor feature (components, hooks)
  │   ├── query-runner/    # Query runner feature (components, hooks)
  │   ├── results-panel/   # Results panel feature (components, hooks)
  │   └── sidebar/         # Sidebar feature (components, data)
  ├── utils/               # Shared utility functions
  └── types.ts             # Global TypeScript types
```

## 🎨 Design Philosophy

The application is built on these core principles:

- **User-Centric Workflows**: Designed for real-world data analyst tasks—fast query input, instant results, and seamless switching between queries.
- **Performance at Scale**: Efficient virtualization and static JSON datasets allow the app to handle thousands of rows smoothly, ensuring responsive interactions even on modest hardware.
- **Accessibility by Design**: Every UI component is crafted for keyboard navigation, screen reader compatibility, and high-contrast viewing, following WCAG 2.2 AA standards and accessibility best practices.
- **Future-Proof Scalability**: The modular, feature-based folder structure supports easy extension, maintenance, and the addition of new datasets or features as analyst workflows evolve.

## Performance Metrics

I have used both Performance Tab of Chrome DevTools and Lighthouse to measure the performance of the application. You can see below the results from both tools.

### Performance Tab of Chrome DevTools

I have used Performance Tab of Chrome DevTools to measure the performance of the application. Here are some key metrics:

- Time to First Byte (TTFB): ~50ms
- First Contentful Paint (FCP): ~250ms
- Largest Contentful Paint (LCP): ~380 ms
- Cumulative Layout Shift (CLS): ~0.00

### Lighthouse Performance Score

Here is screenshot of the Lighthouse performance score. It shows both Performance and Accessibility scores are 100.

![Lighthouse Performance Score](docs/LIGHTHOUSE_RESULT.png)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/imanish003/SQL-Runner-UX
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

Run the test suite:

```bash
npm run test
```
