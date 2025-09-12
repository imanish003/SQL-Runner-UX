# SQL Query Runner - Frontend Engineering Challenge

A web-based application capable of running SQL queries and displaying results, built for Frontend Engineering challenge.

## 📋 Challenge Overview

This application is designed to simulate a SQL query runner interface that a data analyst would use throughout their workday. While this is a dummy application that doesn't connect to a real database, it provides an intuitive interface for writing SQL queries and viewing tabular results.

## 🛠 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for rapid UI development
- **UI Components**: Custom components with shadcn/ui foundation
- **Testing**: Vitest for unit testing
- **Performance**: Built-in Next.js optimizations for fast loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎥 Demo

[Walkthrough video will be added here - showcasing implementation details and query execution]

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   └── ui/             # Base UI components
└── lib/                # Utility functions and helpers
```

## 🧪 Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

## 🚀 Deployment

This application is deployed on [Vercel/Netlify - link to be added].

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

## 🎨 Design Philosophy

The application is designed with the following principles:

- **User-Centric**: Prioritizing data analyst workflows and daily usage patterns
- **Performance First**: Fast loading and responsive interactions
- **Accessibility**: WCAG 2.1 compliant for inclusive usage
- **Scalability**: Architecture supports large datasets and concurrent users
