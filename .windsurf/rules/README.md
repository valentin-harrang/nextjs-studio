# Windsurf Rules - Quick Start

Welcome to your Windsurf Rules! This directory contains converted and optimized coding standards from your Cursor Rules.

## 📁 Files in This Directory

### `project-rules.md` ⭐ **START HERE**
Your main rules file - comprehensive, optimized, and ready to use.
- **Size**: ~18KB (optimized from 26KB+ original)
- **Activation**: Set to "Always" in Windsurf
- **Content**: All essential project rules in one organized file

### `CONVERSION-SUMMARY.md`
Detailed conversion report showing:
- What was converted and how
- Key improvements made
- Before/after comparison
- Suggested activation modes
- Next steps

### `ADVANCED-SETUP.md`
Advanced configuration guide for splitting rules into multiple files with glob patterns.
- When to split into multiple files
- Recommended file structure
- Glob pattern examples
- Pros/cons of different approaches

### `README.md` (this file)
Quick start guide to get you up and running.

## 🚀 Quick Start

### Step 1: Enable in Windsurf

**Option A: Automatic (Recommended)**
1. Open Windsurf settings
2. Navigate to "Rules" or "Context" section
3. Enable `.windsurf/rules/` directory
4. Set `project-rules.md` to "Always" activation

**Option B: Manual Reference**
In Windsurf chat, type:
```
@project-rules Please help me create a new component
```

### Step 2: Test It Out

Try these commands to verify rules are working:

```
Create a new button component
→ Should use kebab-case filename (button.tsx)
→ Should use named export (export function Button)
→ Should use cn() utility for className
```

```
Create a search filter with URL state
→ Should suggest Nuqs for URL state
→ Should follow state management decision tree
```

```
Create an API endpoint for users
→ Should create minimal controller
→ Should delegate to domain services
→ Should not include business logic
```

## 🎯 Quick Reference

### Critical Rules (Never Break)

1. ❌ **NEVER use `any` type** → Use `unknown`, specific types, or generics
2. ❌ **NO barrel exports** (index.ts) → Direct imports only
3. ❌ **NO default exports** (except Next.js pages) → Named exports only
4. ❌ **NO px units** → Use rem or Tailwind classes
5. ❌ **NO template literals for className** → Use cn() utility
6. ❌ **NO business logic in route handlers** → Delegate to services
7. ❌ **NO framework imports in domain** → Pure business logic only

### Always Follow

1. ✅ **kebab-case** for all component files
2. ✅ **PascalCase** for exports
3. ✅ **cn() utility** for all className operations
4. ✅ **size-\*** for square elements (not h-* w-*)
5. ✅ **Server Components** by default
6. ✅ **Nuqs** for URL state
7. ✅ **Zod** for validation

## 📚 Main Sections in project-rules.md

1. **Core Architecture** - Clean Architecture principles
2. **TypeScript Standards** - Type safety, NO `any`
3. **Naming Conventions** - Files, variables, types
4. **Import & Export** - NO barrels, NO defaults
5. **State Management** - Decision tree for state
6. **Components** - Server/Client, composition
7. **ShadCn UI** - Component guidelines, cn() usage
8. **Tailwind CSS** - NO px, use size-*, semantic classes
9. **API Routes** - Minimal controllers, no business logic
10. **Patterns** - What to follow/avoid

## 🔍 State Management Decision Tree

```
1. Shareable via URL? (filters, pagination, search)
   → Nuqs

2. Server data? (API, database)
   → Server Component (preferred) or TanStack Query

3. Form? (login, create, edit)
   → React Hook Form + Zod

4. Global to app?
   → Jotai/Zustand (temporary) or with Storage (persisted)

5. Shared between few components? (2-3 levels)
   → Props drilling or React Context

6. Local to component?
   → useState
```

## 🏗️ Architecture Layers

```
Domain (core)
  ↑ NO imports from outer layers
  ↑ Pure business logic
  ↑ Framework-independent

Infrastructure (adapters)
  ↑ Implements domain ports
  ↑ Prisma, APIs, etc.

App (HTTP)
  ↑ Route handlers
  ↑ Minimal controllers

Components (UI)
  ↑ Server Components (default)
  ↑ Client Components (interactivity)
```

## 📝 File Naming Examples

```
✅ Correct:
app/components/ui/button.tsx
app/components/shared/page-header.tsx
app/components/domain/user-card.tsx
src/domain/users/services/create-user.ts
src/domain/users/models/user.ts

❌ Incorrect:
app/components/ui/Button.tsx
app/components/ui/index.ts (barrel export)
app/components/shared/PageHeader.tsx
```

## 🎨 Tailwind Quick Reference

| px | rem | Tailwind Class |
|----|-----|----------------|
| 4px | 0.25rem | `p-1`, `gap-1` |
| 8px | 0.5rem | `p-2`, `gap-2` |
| 16px | 1rem | `p-4`, `text-base` |
| 24px | 1.5rem | `p-6`, `size-6` |
| 32px | 2rem | `p-8`, `size-8` |

```typescript
// ❌ Bad
<Icon className="h-6 w-6" />
<div className="min-h-[600px]" />

// ✅ Good
<Icon className="size-6" />
<div className="min-h-screen" />
```

## 🔄 Migration from Cursor

If you're coming from Cursor:
- ✅ All your rules are preserved
- ✅ Organization is improved
- ✅ Content is more concise (50% reduction)
- ✅ Examples are more practical
- ✅ Ready for Windsurf's Cascade AI

See `CONVERSION-SUMMARY.md` for detailed changes.

## 📖 Need More Detail?

- **Full rules**: Open `project-rules.md`
- **Conversion info**: Read `CONVERSION-SUMMARY.md`
- **Advanced setup**: Check `ADVANCED-SETUP.md`

## 🛠️ Customization

Feel free to edit `project-rules.md`:
- Add project-specific patterns
- Remove rules that don't apply
- Update examples with your code
- Add new technology sections

Keep it under 12,000 characters for optimal performance.

## 💡 Pro Tips

1. **Reference in chat**: Use `@project-rules` to explicitly invoke rules
2. **Test regularly**: Create test files to verify rules are applied
3. **Keep updated**: Document new patterns as you discover them
4. **Share with team**: Ensure everyone knows these rules exist
5. **Review periodically**: Remove outdated rules, add new ones

## 🆘 Troubleshooting

### Rules not being applied?
1. Check Windsurf settings for rules directory
2. Verify `project-rules.md` is set to "Always"
3. Try restarting Windsurf
4. Reference explicitly with `@project-rules`

### Too verbose?
- Split into multiple files (see `ADVANCED-SETUP.md`)
- Remove sections you don't need
- Keep only critical rules

### Missing context?
- Add more examples to `project-rules.md`
- Reference original Cursor rules in `.cursor/rules/`
- Create separate "examples" file

## 📞 Support

- **Windsurf Docs**: https://docs.codeium.com/windsurf
- **Original Rules**: `.cursor/rules/README.md`
- **Project Issues**: [Your project's issue tracker]

---

**Last Updated**: 2025-11-13
**Status**: ✅ Ready to use
**Conversion**: Cursor → Windsurf (Optimized)
