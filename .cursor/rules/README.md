# Cursor Rules - Clean Architecture

This directory contains **Cursor Project Rules** using the new MDC (Markdown with Context) format.

## 🎯 What Are Project Rules?

Project rules tell Cursor AI how to work with your codebase:
- Enforce architecture patterns
- Standardize code conventions
- Provide templates
- Guide feature creation

## 📁 Structure

```
.cursor/rules/
├── architecture.mdc              # Always applied - Core principles
├── naming-conventions.mdc        # Always applied - Naming standards
├── typescript-strict.mdc         # Always applied - NO 'any' type ⚠️
├── imports.mdc                   # Always applied - NO barrel/default exports ⚠️
├── component-architecture.mdc    # Auto attached to app/components/**
├── shadcn-ui.mdc                 # Auto attached to app/components/ui/**
├── domain-layer.mdc              # Auto attached to src/domain/**
├── infra-layer.mdc               # Auto attached to src/infra/**
├── api-routes.mdc                # Auto attached to app/api/**
├── components.mdc                # Auto attached to app/components/**
├── state-management.mdc          # Auto attached to app/**
├── tests.mdc                     # Auto attached to tests/**
├── create-feature.mdc            # Manual - Feature creation workflow
└── templates/
    ├── model-template.mdc        # Manual - @model-template
    ├── service-template.mdc      # Manual - @service-template
    └── repository-template.mdc   # Manual - @repository-template
```

## 🔄 Rule Types

### Always (🟢 Active everywhere)
- `architecture.mdc` - Core Clean Architecture principles
- `naming-conventions.mdc` - File, variable, type naming
- `typescript-strict.mdc` - ⚠️ **CRITICAL** - Never use `any` type
- `imports.mdc` - ⚠️ **CRITICAL** - NO barrel exports (index.ts)

**Usage:** Automatically included in all AI interactions

### Auto Attached (🟡 Context-aware)
- `component-architecture.mdc` - When editing `app/components/**` - Component decomposition guide
- `shadcn-ui.mdc` - When editing `app/components/ui/**` - ShadCn UI guidelines
- `domain-layer.mdc` - When editing `src/domain/**`
- `infra-layer.mdc` - When editing `src/infra/**`
- `api-routes.mdc` - When editing `app/api/**`
- `components.mdc` - When editing `app/components/**`
- `state-management.mdc` - When editing `app/**`
- `tests.mdc` - When editing `tests/**`

**Usage:** Automatically included when working in matching directories

### Manual (🔵 On-demand)
- `create-feature.mdc` - @create-feature
- `templates/model-template.mdc` - @model-template
- `templates/service-template.mdc` - @service-template
- `templates/repository-template.mdc` - @repository-template

**Usage:** Mention with @ruleName in chat

## 🚀 How to Use

### Creating a New Feature

```
@create-feature

I need a "products" feature with:
- name, price, stock fields
- availability check business rule
- CRUD operations
```

AI will follow the step-by-step workflow from `create-feature.mdc`.

### Using Templates

```
@model-template

Create a Product model with these fields:
- name (string, required)
- price (number, positive)
- stock (integer, >= 0)
```

AI will use the template from `templates/model-template.mdc`.

### Working in Specific Layers

Just open a file in that layer:
- Open `src/domain/users/services/create-user.ts`
- AI automatically applies `domain-layer.mdc` rules
- No framework imports will be suggested ✅

## 💡 Examples

### Example 1: Create Model

**You:**
```
@model-template

Create a User model with email, name, role (USER/ADMIN), status (ACTIVE/INACTIVE)
```

**AI:** Creates complete Zod schema with types following the template.

### Example 2: Create Service

**You:**
```
@service-template

Create a user service with get, create, update, delete operations
```

**AI:** Creates service with proper dependency injection and Zod validation.

### Example 3: Working in Domain

**You:** (Open `src/domain/products/services/create-product.ts`)
```
Add a function to create a product
```

**AI:** 
- Applies `domain-layer.mdc` rules automatically
- Won't suggest Next.js imports ✅
- Will use dependency injection ✅
- Will validate with Zod ✅

## 🔍 Rule Details

### Architecture Rule (Always)
Enforces:
- Domain independence
- Dependency inversion
- Layer separation
- No framework in domain

### TypeScript Strict Rule (Always) ⚠️
Enforces:
- **NEVER use `any` type**
- Use `unknown` for truly unknown types
- Use specific types or generics
- Validate external data with Zod
- Proper Prisma types

### Domain Layer Rule (Auto)
Enforces when in `src/domain/`:
- NO Next.js/React imports
- Pure business logic only
- Zod validation
- Dependency injection

### API Routes Rule (Auto)
Enforces when in `src/app/api/`:
- Minimal controllers
- NO business logic
- Call domain services
- Proper error handling

### State Management Rule (Auto)
Enforces when in `src/components/` or `src/app/`:
- Use **Nuqs** for shareable state (filters, pagination, search)
- Use **React Hook Form** for forms with validation
- Use **useState** for local UI state (modals, toggles)
- Golden rule: Shareable via URL? → Nuqs

## 🎯 Benefits

### Before (Single .cursorrules)
- ❌ One huge file
- ❌ All rules always active
- ❌ Hard to maintain
- ❌ No context awareness

### After (MDC Rules)
- ✅ Organized by topic
- ✅ Context-aware activation
- ✅ Easy to maintain
- ✅ Better AI guidance

## 📝 Adding New Rules

### Create New Rule

```bash
# Create new rule file
touch .cursor/rules/my-new-rule.mdc
```

```markdown
---
description: Description for AI to understand when to use this
globs:
  - src/specific/path/**
alwaysApply: false
---

# My New Rule

Content here...
```

### Rule Types

**Always Apply:**
```markdown
---
description: Core rule
globs:
alwaysApply: true
---
```

**Auto Attached:**
```markdown
---
description: Apply to specific paths
globs:
  - src/domain/**
  - src/infra/**
alwaysApply: false
---
```

**Manual (Agent Requested):**
```markdown
---
description: Detailed description for AI to decide when to include
globs:
alwaysApply: false
---
```

**Manual (Explicit):**
```markdown
---
description: Template for X
globs:
alwaysApply: false
---
```

Then use with `@my-new-rule` in chat.

## 🔄 Migration from .cursorrules

The old `.cursorrules` file has been migrated to this new structure:

- Core principles → `architecture.mdc` (Always)
- Naming → `naming-conventions.mdc` (Always)
- Layer-specific → `domain-layer.mdc`, `infra-layer.mdc`, etc. (Auto)
- Templates → `templates/*.mdc` (Manual)

**Old way:**
```
All rules in one file, always active
```

**New way:**
```
Rules organized by context, activated when relevant
```

## 🆘 Troubleshooting

### Rules not being applied

1. Check file extension is `.mdc`
2. Verify metadata format (YAML front-matter)
3. Restart Cursor
4. Check `globs` patterns match your files

### Want rule always active

Set `alwaysApply: true` in metadata:
```markdown
---
description: ...
globs:
alwaysApply: true
---
```

### Want rule for specific path

Set globs:
```markdown
---
description: ...
globs:
  - src/domain/**
  - src/infra/**
alwaysApply: false
---
```

## 📚 Resources

- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [MDC Format](https://docs.cursor.com/context/rules#mdc-format)
- Project: `docs/ARCHITECTURE.md`

---

**Pro tip:** Use `@ruleName` to explicitly include a rule in your conversation!

