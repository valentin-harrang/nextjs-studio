# Advanced Windsurf Rules Setup

This document provides guidance for splitting the unified `project-rules.md` into multiple files with specific activation modes.

## When to Use Multiple Files

Consider splitting into multiple files if:
- You want different rules active for different file types
- You have distinct teams working on different layers
- You want to reduce context size for specific tasks
- You need different rule sets for different phases (dev vs. review)

## Recommended File Structure

```
.windsurf/rules/
├── 01-core-standards.md          # Always active
├── 02-react-components.md         # Glob: **/*.tsx, **/*.jsx
├── 03-api-routes.md               # Glob: app/api/**/*.ts
├── 04-domain-layer.md             # Glob: src/domain/**/*.ts
├── 05-shadcn-components.md        # Glob: app/components/ui/**/*.tsx
└── 06-testing.md                  # Glob: **/*.test.ts, **/*.spec.ts
```

## File 1: Core Standards (Always Active)

**Activation**: Always
**File**: `01-core-standards.md`

```markdown
# Core Standards

## TypeScript Rules
- ❌ NEVER use `any` type
- ✅ Use `unknown`, specific types, or generics
- ✅ Use Zod for external data validation

## Naming Conventions
- Files: `kebab-case.tsx`
- Exports: `PascalCase`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## Import/Export Rules
- ❌ NO barrel exports (index.ts)
- ❌ NO default exports (except Next.js pages)
- ✅ Named exports only
- ✅ Direct imports from source files

## Architecture Principles
- Domain layer: NO framework imports
- Dependency inversion: Domain defines ports
- Separation of concerns: Each layer has single responsibility
```

## File 2: React Components (Glob Pattern)

**Activation**: Glob pattern `**/*.tsx`, `**/*.jsx`
**File**: `02-react-components.md`

```markdown
# React Component Rules

## Server vs Client Components
- Default to Server Components (async/await)
- Use Client Components only for interactivity
- Add 'use client' directive at top of file

## State Management Decision Tree
1. URL state? → Nuqs
2. Server data? → TanStack Query or Server Component
3. Form? → React Hook Form + Zod
4. Global? → Jotai/Zustand
5. Local? → useState

## Component Structure
- Keep under 100 lines
- One component = one responsibility
- Extract sub-components when needed
- Use domain types for props

## ShadCn UI Components
- ✅ Named exports only
- ✅ Always use cn() utility for className
- ✅ Extend HTML element props
- ❌ NO template literals for className

## Tailwind CSS
- ❌ NO px units
- ✅ Use Tailwind classes
- ✅ Use size-* for square elements
- ✅ Always use cn() utility
```

## File 3: API Routes (Glob Pattern)

**Activation**: Glob pattern `app/api/**/*.ts`
**File**: `03-api-routes.md`

```markdown
# API Route Handler Rules

## Purpose
Minimal HTTP controllers that:
1. Parse requests
2. Call domain services
3. Return responses
4. Handle errors

## Critical Rules
- ❌ NO business logic in route handlers
- ❌ NO direct database calls
- ✅ Delegate to domain services
- ✅ Inject repositories as dependencies

## Pattern
```typescript
export async function GET(req: NextRequest) {
  try {
    const result = await serviceFunction(params, repository);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
```

## Error Handling
- Return appropriate HTTP status codes
- Log unexpected errors
- Use custom error classes
- Handle errors at HTTP boundary
```

## File 4: Domain Layer (Glob Pattern)

**Activation**: Glob pattern `src/domain/**/*.ts`
**File**: `04-domain-layer.md`

```markdown
# Domain Layer Rules

## Critical: Framework Independence
- ❌ NO Next.js imports
- ❌ NO React imports
- ❌ NO framework-specific code
- ✅ Pure business logic only

## What Belongs in Domain
- ✅ Entity models and Zod schemas
- ✅ Business rules and validations
- ✅ Service interfaces (ports)
- ✅ Use cases orchestrating logic

## Dependency Injection
- Services receive dependencies as parameters
- Define interfaces for external dependencies
- Never import from infrastructure layer

## Example
```typescript
// ✅ Good - Domain service
export function createUser(
  input: CreateUserInput,
  repository: IUserRepository
) {
  const validated = CreateUserSchema.parse(input);
  return repository.create(validated);
}

// ❌ Bad - Framework import
import { prisma } from '@/infra/database';
```
```

## File 5: ShadCn Components (Glob Pattern)

**Activation**: Glob pattern `app/components/ui/**/*.tsx`
**File**: `05-shadcn-components.md`

```markdown
# ShadCn UI Component Rules

## File Naming
- Files: `kebab-case.tsx` (button.tsx, input.tsx)
- Exports: `PascalCase` (export function Button)

## Mandatory: cn() Utility
❌ **NEVER use template literals for className**

```typescript
// ❌ BAD
className={`${base} ${variant} ${active ? "active" : ""}`}

// ✅ GOOD
className={cn(base, variant, active && "active")}
```

## Component Pattern
```typescript
import { cva } from "class-variance-authority";

const variants = cva("base-styles", {
  variants: {
    variant: {
      default: "...",
      outline: "...",
    },
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={cn(variants({ variant }), className)} {...props} />
  );
}
```

## Tailwind Optimization
- ✅ Use size-* instead of h-* w-* for squares
- ❌ NO px units
- ✅ Prefer Tailwind classes over arbitrary values
```

## File 6: Testing (Glob Pattern)

**Activation**: Glob pattern `**/*.test.ts`, `**/*.spec.ts`
**File**: `06-testing.md`

```markdown
# Testing Rules

## Test Structure
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert
- One assertion per test when possible
- Test behavior, not implementation

## Domain Testing
- Test business logic in isolation
- Mock external dependencies
- Use Zod schemas for test data generation

## Component Testing
- Test user interactions
- Test accessibility
- Avoid testing implementation details

## API Testing
- Test E2E with real requests
- Test error scenarios
- Verify HTTP status codes
```

## Configuration in Windsurf

### Option 1: File Naming Convention
Use numbered prefixes to control load order:
- `01-` = Highest priority / Always active
- `02-` = Component-level rules
- `03-` = API-specific rules
- etc.

### Option 2: Metadata Headers
Add metadata at the top of each file:

```markdown
---
activation: always
priority: high
---

# Core Standards
...
```

or

```markdown
---
activation: glob
patterns:
  - "**/*.tsx"
  - "**/*.jsx"
priority: medium
---

# React Component Rules
...
```

### Option 3: Single Configuration File
Create a `.windsurf/rules-config.json`:

```json
{
  "rules": [
    {
      "file": "01-core-standards.md",
      "activation": "always",
      "priority": "high"
    },
    {
      "file": "02-react-components.md",
      "activation": "glob",
      "patterns": ["**/*.tsx", "**/*.jsx"],
      "priority": "medium"
    },
    {
      "file": "03-api-routes.md",
      "activation": "glob",
      "patterns": ["app/api/**/*.ts"],
      "priority": "medium"
    },
    {
      "file": "04-domain-layer.md",
      "activation": "glob",
      "patterns": ["src/domain/**/*.ts"],
      "priority": "high"
    },
    {
      "file": "05-shadcn-components.md",
      "activation": "glob",
      "patterns": ["app/components/ui/**/*.tsx"],
      "priority": "medium"
    },
    {
      "file": "06-testing.md",
      "activation": "glob",
      "patterns": ["**/*.test.ts", "**/*.spec.ts"],
      "priority": "low"
    }
  ]
}
```

## Pros and Cons

### Single File (Current Setup)
**Pros:**
- ✅ Simple to maintain
- ✅ Complete overview in one place
- ✅ No risk of missing rules
- ✅ Easier for new team members

**Cons:**
- ❌ All rules always loaded (though optimized at 12k chars)
- ❌ No granular control per file type

### Multiple Files (This Setup)
**Pros:**
- ✅ Granular control per file type
- ✅ Reduced context size per task
- ✅ Better for large teams
- ✅ Can have different rules for different layers

**Cons:**
- ❌ More files to maintain
- ❌ Risk of missing rules if glob patterns incorrect
- ❌ Potential rule duplication between files
- ❌ More complex setup

## Recommendation

**For most projects**: Stick with the single unified `project-rules.md`
- Already optimized and concise
- Complete coverage
- Easy to maintain

**Consider splitting if**:
- Team > 10 developers
- Multiple distinct sub-projects
- Very strict layer separation required
- Different rules for different deployment targets

## Migration Path

If you want to try the split approach:

1. **Keep backup**: Don't delete `project-rules.md`
2. **Start with 2-3 files**: Core + React + API
3. **Test thoroughly**: Ensure rules are being applied
4. **Monitor effectiveness**: Check if Cascade uses them correctly
5. **Adjust as needed**: Merge or split based on results

## Testing Your Setup

Create a test file in each area and verify rules are applied:

```bash
# Test React component rules
touch app/components/test-component.tsx
# → Should suggest kebab-case, named exports, cn() utility

# Test API route rules
touch app/api/test/route.ts
# → Should suggest minimal controller, no business logic

# Test domain rules
touch src/domain/test/services/test-service.ts
# → Should prevent framework imports
```

## Further Customization

You can extend this setup with:
- Environment-specific rules (dev vs. prod)
- Role-specific rules (junior vs. senior devs)
- Feature-specific rules (experimental features)
- Language-specific rules (TypeScript vs. JavaScript)

---

**Note**: This is an advanced setup. The default single-file approach in `project-rules.md` is recommended for most use cases.
