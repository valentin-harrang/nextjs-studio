# AI Assistant Hub - Windsurf Rules

This project follows Clean Architecture principles with Next.js App Router, TypeScript, Tailwind CSS, and ShadCn UI.

## Core Architecture

### Clean Architecture Principles

- **Domain Independence**: Business logic MUST be framework-independent
- **Dependency Inversion**: Domain defines interfaces (ports), infrastructure implements them
- **Separation of Concerns**: Each layer has a single responsibility
- **Testability**: Business logic must be testable without external dependencies

### Layer Structure

```
src/
├── domain/        # Business logic (NO framework imports)
├── infra/         # Infrastructure adapters (Prisma, APIs, etc.)
├── app/           # Next.js App Router (HTTP layer)
└── components/    # React components (UI layer)
```

#### Domain Layer (`src/domain/`)

- ✅ Pure business logic (calculations, validations, rules)
- ✅ Entity models and Zod schemas
- ✅ Interfaces (ports) for external dependencies
- ✅ Use cases (services) orchestrating business logic
- ❌ NO Next.js, React, or framework imports
- ❌ NO direct database or API calls

#### Infrastructure Layer (`src/infra/`)

- ✅ Implement ports defined in domain
- ✅ Database repositories (Prisma, Drizzle)
- ✅ External API clients
- ✅ Email/Payment providers

#### App Layer (`src/app/`)

- ✅ HTTP entry points (Route Handlers)
- ✅ Minimal controllers
- ❌ NO business logic

#### Components Layer (`src/components/`)

- ✅ Server Components for display (default)
- ✅ Client Components for interactivity ('use client')
- ✅ Use domain types

### Dependency Flow

```
Domain (core) ← Infrastructure (adapters) ← App (HTTP) ← Components (UI)
```

**Key Rule:** Domain never imports from outer layers.

---

## TypeScript Standards

### Critical: NEVER Use `any` Type

**The `any` type is FORBIDDEN in this codebase.**

#### What to Do Instead

**1. Use `unknown` for Truly Unknown Types:**
```typescript
// ✅ Good - Use unknown + type guard
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'something' in data) {
    return (data as { something: string }).something;
  }
  throw new Error('Invalid data');
}
```

**2. Use Specific Union Types:**
```typescript
// ✅ Good - Specific union
type ApiResponse =
  | { success: true; data: User }
  | { success: false; error: string };
```

**3. Use Generic Types:**
```typescript
// ✅ Good - Generic function
function wrapInArray<T>(item: T): T[] {
  return [item];
}
```

**4. Use Zod for External Data:**
```typescript
// ✅ Good - Validate external data with Zod
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const user = UserSchema.parse(externalData);
```

### Type Safety Requirements

- Enable strict mode in `tsconfig.json`
- Use type guards for runtime validation
- Use discriminated unions for complex types
- Use `satisfies` operator for type checking

---

## Naming Conventions

### Files and Folders

- **ALL component files**: `kebab-case` → `user-card.tsx`, `payment-form.tsx`, `page-container.tsx`
- **Hooks**: `kebab-case` with `use` prefix → `use-user.ts`, `use-auth.ts`
- **Utilities**: `kebab-case` → `format-date.ts`, `validate-email.ts`
- **Services**: `kebab-case` → `create-user.ts`, `process-payment.ts`
- **Types/Models**: `kebab-case` → `user.ts`, `product.ts`
- **Folders**: `kebab-case` → `business-rules/`, `data-integration/`
- **Tests**: same name + `.test.ts` → `validate-user-role.test.ts`

**Important:** Component files use **kebab-case**, but exports remain **PascalCase**:
```typescript
// File: user-card.tsx (kebab-case)
export function UserCard() { } // Export: PascalCase

// Import
import { UserCard } from "@/app/components/ui/user-card";
```

### Variables and Functions

```typescript
// ✅ Good
const userName = 'John';
function getUserById(id: string) {}
const isActive = true;

// ❌ Bad
const UserName = 'John';
function get_user_by_id(id: string) {}
```

### Constants

```typescript
// ✅ Global constants: UPPER_SNAKE_CASE
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

// ✅ Config objects: camelCase with 'as const'
export const appConfig = {
  maxUploadSize: 5 * 1024 * 1024,
} as const;
```

### Types and Interfaces

```typescript
// ✅ Types for entities
export type User = { ... };

// ✅ Interfaces for ports (with 'I' prefix)
export interface IUserRepository { ... }

// ✅ Input/Output types with suffixes
export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<User>;
```

---

## Import & Export Conventions

### Critical: NO Barrel Exports

**❌ NEVER create barrel export files (index.ts/index.js)**

#### Why Barrel Exports Are Bad

1. **Performance**: Breaks tree-shaking, bundles unused code
2. **Build Time**: Increases bundle size and compilation time
3. **Circular Dependencies**: Can create hard-to-debug circular imports
4. **Type Inference**: Slower TypeScript type checking
5. **Hot Module Replacement**: Breaks HMR in development

#### What to Do Instead

```typescript
// ✅ GOOD - Direct imports from source files
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// ❌ BAD - Barrel imports
import { Button, Input, Card } from "@/components/ui";
```

### NO Default Exports (except Next.js pages)

**Use named exports for all components and utilities:**

```typescript
// ✅ Good - Named export
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ❌ Bad - Default export
export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
```

**Exception:** Next.js special files MUST use default export:
- `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`

**Why Named Exports?**
1. Better refactoring: IDE can rename across all imports automatically
2. No naming conflicts: Import name must match export name
3. Better tree-shaking: Bundler can optimize better
4. Consistency: Same pattern everywhere
5. Auto-complete: IDE suggests correct name immediately

### Import Ordering

```typescript
// 1. External dependencies (React, Next.js, libraries)
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// 2. Internal absolute imports (@/)
import { Button } from "@/app/components/ui/button";
import { PageContainer } from "@/app/components/shared/page-container";
import type { ChatMessage } from "@/app/types/chat";

// 3. Relative imports (same directory or parent)
import { MessageItem } from "./message-item";
import { formatDate } from "../utils/format-date";
```

### Type Imports

```typescript
// ✅ Good - Use 'type' keyword for type-only imports
import type { User } from "@/app/types/user";
import type { ReactNode } from "react";
```

### Path Aliases

```typescript
// ✅ Good - Absolute imports with alias
import { Button } from "@/app/components/ui/button";
import type { User } from "@/app/types/user";

// ❌ Bad - Relative imports for distant files
import { Button } from "../../../components/ui/button";
```

---

## React State Management

### Decision Tree

1. **Is this state shareable via URL?** (filters, pagination, search, tabs)
   → 🔵 **Nuqs**

2. **Is this data from the server?** (API, database)
   → Prefer **Server Component** (async/await)
   → If Client Component needed: 🟣 **TanStack Query**

3. **Is this a form?** (login, create, edit)
   → 🟢 **React Hook Form** + Zod

4. **Is this global to the app?**
   - Temporary session → 🟡 **Jotai / Zustand**
   - Persisted (localStorage) → 🟠 **Jotai Storage / Zustand Persist** (handle SSR)

5. **Shared with few components?** (2-3 levels)
   - < 3 levels → **Props drilling**
   - 3+ levels → 🟤 **React Context** (watch re-renders)

6. **Local to component?**
   → 🔴 **useState / useReducer**

### Golden Rules

- **Shareable via URL?** → Use Nuqs
- **Server data should NEVER be duplicated in client state** → Use TanStack Query or Server Component
- **NEVER use useEffect + fetch for server data** → Use TanStack Query or Server Component
- **Start simple** → useState first, escalate only when needed

### Nuqs - URL State Management ⭐

**Use when:** State should be shareable via URL (filters, pagination, search, tabs)

```typescript
'use client';
import { useQueryState, parseAsString } from 'nuqs';

function SearchBar() {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### TanStack Query - Server Data

**Use when:** Fetching data from API in Client Components

```typescript
'use client';
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;
  return <div>{products.map(...)}</div>;
}
```

### React Hook Form - Forms

**Use when:** Managing form input and validation

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Create</button>
    </form>
  );
}
```

### Anti-Patterns to Avoid

❌ Duplicating server data in client state
❌ useState + useEffect for server data
❌ Context for local UI state
❌ Centralized mega-store
❌ Manual URL state management

---

## Component Guidelines

### Component Structure

```
components/
├── ui/            # Design system (button.tsx, input.tsx, card.tsx)
├── shared/        # Reusable components (page-header.tsx, page-container.tsx)
└── domain/        # Domain-specific UI (user-card.tsx, product-form.tsx)
```

### Server Components (Default)

```typescript
// No 'use client' = Server Component
export async function UserList() {
  // ✅ Can fetch data directly
  const users = await getUsers(userRepository);

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

**Use Server Components by default, Client Components only for interactivity**

### Client Components

```typescript
'use client'; // ✅ Required for interactivity

import { useState } from 'react';

export function UserForm({ onSubmit }: Props) {
  const [email, setEmail] = useState('');
  // Interactive form logic
}
```

### Component Best Practices

- Type everything with domain types
- Compose, don't duplicate
- Keep components small (< 100 lines)
- NO barrel exports
- NO default exports (except Next.js pages)

---

## ShadCn UI Guidelines

### What is ShadCn UI?

- **Copy-paste components** - You own the code
- **Based on Radix UI** - Unstyled, accessible primitives
- **Styled with Tailwind CSS** - Utility-first CSS
- **Customizable** - Modify to fit your needs

### Components Location

All ShadCn UI components live in `app/components/ui/`:
- Files use **kebab-case**: `button.tsx`, `input.tsx`, `card.tsx`
- Exports use **PascalCase**: `export function Button() {}`

### Critical Rules for ShadCn Components

**1. Named Exports Only:**
```typescript
// ✅ Good - Named export
export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
}
```

**2. ALWAYS Use cn() Utility - MANDATORY:**

❌ **NEVER use template literals for className concatenation.**

```typescript
// ❌ BAD - Template literal
className={`${baseClass} ${variant} ${condition ? "active" : ""}`}

// ✅ GOOD - Use cn() utility
import { cn } from "@/app/lib/utils";

className={cn(
  baseClass,
  variant,
  condition && "active",
  className // Allow override from props
)}
```

**Why cn() is mandatory:**
- Merges Tailwind classes correctly
- Handles conflicts (e.g., `bg-blue-600` + `bg-red-600` = `bg-red-600`)
- Removes duplicates automatically
- Handles conditional classes (`condition && "class"`)
- Handles `undefined`/`null` values gracefully

**3. Extend Native HTML Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "default" | "sm" | "lg";
}
```

**4. Use CVA for Variants:**
```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

---

## Tailwind CSS Conventions

### Critical Rules

**1. ❌ NEVER Use "px" Units**

Always use "rem" units or Tailwind classes.

```typescript
// ❌ BAD - Using px
<div className="min-h-[600px]">
<div className="h-[24px] w-[24px]">

// ✅ GOOD - Using rem or Tailwind classes
<div className="min-h-[37.5rem]">  // Only if no Tailwind class exists
<div className="min-h-screen">      // Prefer Tailwind classes
<div className="size-6">            // 1.5rem = 24px
```

**2. ✅ Always Prefer Tailwind Classes Over Arbitrary Values**

```typescript
// ❌ BAD - Arbitrary values when Tailwind class exists
<div className="h-[24px] w-[24px]">  // Use size-6 instead
<div className="p-[16px]">            // Use p-4 instead

// ✅ GOOD - Tailwind classes
<div className="size-6">
<div className="p-4">
```

**3. ✅ Use `size-*` Instead of `h-* w-*` for Square Elements**

```typescript
// ❌ BAD - Separate h and w
<Icon className="h-6 w-6" />

// ✅ GOOD - Use size
<Icon className="size-6" />
```

### Common px to rem Conversions (16px base)

| px | rem | Tailwind Class |
|----|-----|----------------|
| 4px | 0.25rem | `p-1`, `gap-1` |
| 8px | 0.5rem | `p-2`, `gap-2` |
| 16px | 1rem | `p-4`, `text-base` |
| 24px | 1.5rem | `p-6`, `size-6` |
| 32px | 2rem | `p-8`, `size-8` |

### When Arbitrary Values Are Acceptable

Arbitrary values are acceptable **only** when:
1. No equivalent Tailwind class exists
2. You need a specific rem value not in Tailwind's scale
3. You're using CSS custom properties

---

## API Route Handlers

### Purpose

Minimal HTTP controllers that:
1. Parse requests
2. Call domain services
3. Return responses
4. Handle errors

### Pattern

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(params.id, userRepository);
    return NextResponse.json(user);
  } catch (error) {
    return handleError(error);
  }
}
```

### Critical Rules

**❌ NO Business Logic in Route Handlers:**
```typescript
// ❌ BAD - Business logic in route handler
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.email.includes('@admin')) { // ❌ Business logic
    body.role = 'ADMIN';
  }
  // ...
}

// ✅ GOOD - Delegate to service
export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await createUser(body, userRepository);
  return NextResponse.json(user);
}
```

**❌ NO Direct Database Calls:**
```typescript
// ❌ BAD
const users = await prisma.user.findMany();

// ✅ GOOD
const users = await getUsers(userRepository);
```

---

## Patterns to Follow

### Type-Safe Domain Models

- Use Zod schemas for validation
- Export inferred types from Zod schemas
- Create Input/Output types with Omit/Pick/Partial

### Dependency Injection

- Domain services receive dependencies as parameters
- Infrastructure implements domain interfaces
- Route handlers inject repositories into services

### Error Handling

- Use custom error classes
- Handle errors at the HTTP boundary
- Log unexpected errors
- Return appropriate HTTP status codes

---

## Patterns to Avoid

### Anti-Patterns

- ❌ NO `any` type (use `unknown`, specific types, or generics)
- ❌ NO barrel exports (index.ts files)
- ❌ NO default exports (except Next.js pages)
- ❌ NO business logic in route handlers
- ❌ NO direct database calls from routes
- ❌ NO framework imports in domain layer
- ❌ NO px units in Tailwind (use rem or Tailwind classes)
- ❌ NO template literals for className (use cn() utility)
- ❌ NO h-* w-* for square elements (use size-*)
- ❌ NO useState + useEffect for server data (use TanStack Query or Server Component)
- ❌ NO duplicating server data in client state

### Common Mistakes

**DON'T:** Put business logic in components
```typescript
// ❌ Bad
function UserCard({ user }) {
  const canDelete = user.role !== 'ADMIN' && user.status === 'ACTIVE';
  // Business rule in component
}
```

**DO:** Use business rules from domain
```typescript
// ✅ Good
import { canDeleteUser } from '@/domain/users/business-rules';

function UserCard({ user }) {
  const canDelete = canDeleteUser(user);
}
```

**DON'T:** Mix layers
```typescript
// ❌ Bad - Domain importing from infra
import { prisma } from '@/infra/database';
```

**DO:** Use dependency injection
```typescript
// ✅ Good
export function createUser(
  input: CreateUserInput,
  repository: IUserRepository
) {
  // Use repository interface
}
```

---

## Summary - Quick Reference

### File Naming
- All components: `kebab-case.tsx`
- Exports: `PascalCase`
- Utilities: `kebab-case.ts`

### TypeScript
- ❌ NEVER use `any`
- ✅ Use `unknown` + type guards
- ✅ Use Zod for validation

### Imports/Exports
- ❌ NO barrel exports (index.ts)
- ❌ NO default exports (except Next.js pages)
- ✅ Named exports only
- ✅ Direct imports from source files

### Tailwind
- ❌ NO px units
- ✅ Use Tailwind classes
- ✅ Use `size-*` for squares
- ✅ Use `cn()` utility (NEVER template literals)

### State Management
- URL state → Nuqs
- Server data → TanStack Query or Server Component
- Forms → React Hook Form
- Local UI → useState

### Architecture
- Domain = Pure business logic (NO framework)
- Infrastructure = External adapters
- App = HTTP controllers (minimal)
- Components = UI layer
