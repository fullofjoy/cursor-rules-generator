const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RULES_DIR = path.join(ROOT, 'rules');

const ALL_RULES = [
  {
    slug: 'nextjs-15',
    name: 'Next.js 15',
    heroTitle: 'Next.js 15 App Router & Server Actions .cursorrules (.mdc)',
    title: 'Next.js 15 .cursorrules & .mdc Rules - App Router Best Practices',
    description: 'Production-tested .cursorrules and .cursor/rules/*.mdc configuration for Next.js 15. Enforce React Server Components (RSC), Zod-validated Server Actions, and prevent AI context pollution.',
    keywords: 'cursorrule, cursorrules, .cursorrules, nextjs 15 cursor rules, nextjs app router cursor mdc, server actions cursor rules, react server components cursor prompt, nextjs best cursorrules',
    globs: 'app/**/*.{ts,tsx}, components/**/*.{ts,tsx}',
    mdc_content: `---
description: Next.js 15 App Router, Server Components, and Server Actions standards
globs: app/**/*.{ts,tsx}, components/**/*.{ts,tsx}
alwaysApply: false
---

# Next.js 15 Production Standards

## Architecture & Rendering
- Treat all components as React Server Components (RSC) by default.
- Never add 'use client' at the page or layout level. Only attach 'use client' at the lowest leaf nodes requiring interactivity.
- Fetch data directly in React Server Components using async/await and native fetch with Next.js cache configurations (next: { revalidate: 3600 } or { cache: 'no-store' }).

## Server Actions & Data Mutation
- Place data mutation actions in dedicated actions/*.ts files marked with 'use server' at the top.
- Every Server Action argument MUST be validated using a strict Zod schema before processing.
- Never trust client-provided IDs or user roles without server-side session verification.
- Return structured result objects: { success: boolean, data?: T, error?: string }.

## Performance & Assets
- Always use next/image with explicit width, height, and accessible alt text.
- Use next/font/google or next/font/local for zero-layout-shift font optimization.
- Route handlers belong in app/api/**/route.ts and must return typed NextResponse.json().`,
    faqs: [
      {
        q: 'Why use modular .mdc rules instead of a single .cursorrules for Next.js 15?',
        a: 'Next.js 15 separates client components from server components and server actions. A single .cursorrules file forces the AI to load backend, styling, and database instructions into every single prompt. .mdc rules with glob pattern app/**/*.{ts,tsx} load only when you edit Next.js files, saving tokens and eliminating AI hallucination.'
      },
      {
        q: "How do these rules prevent AI from overusing 'use client'?",
        a: "The rules explicitly mandate that all components default to React Server Components (RSC), and 'use client' is strictly forbidden except at leaf-node interactive boundaries where useState or browser events are required."
      },
      {
        q: 'Are Next.js 15 Server Actions protected by these rules?',
        a: 'Yes, the guidelines mandate that all mutations must use Server Actions and validate every single input payload using Zod before touching the database or external APIs.'
      }
    ]
  },
  {
    slug: 'python-fastapi',
    name: 'Python FastAPI',
    heroTitle: 'FastAPI & Pydantic v2 Microservices .cursorrules (.mdc)',
    title: 'Python FastAPI .cursorrules & .mdc Rules - Pydantic v2 Best Practices',
    description: 'Production-grade .cursorrules and .cursor/rules/*.mdc configuration for FastAPI and Pydantic v2. Enforce dependency injection, async I/O discipline, and strict typing.',
    keywords: 'cursorrule, cursorrules, .cursorrules, fastapi cursor rules, python pydantic v2 cursor mdc, fastapi async cursorrules, python backend cursor prompt, best fastapi cursorrules',
    globs: '**/*.py, api/**/*.py, routers/**/*.py',
    mdc_content: `---
description: Python FastAPI, Pydantic v2, and async service engineering standards
globs: **/*.py, api/**/*.py, routers/**/*.py
alwaysApply: false
---

# FastAPI & Python Standards

## Type Safety & Schema Validation
- All request bodies, path parameters, and responses MUST be declared with Pydantic v2 BaseModel.
- Always use Python 3.11+ type union syntax (X | None instead of Optional[X]).
- Use Pydantic v2 syntax: .model_dump() instead of deprecated .dict(), and @field_validator.
- Always declare explicit response_model on endpoints or use typed return annotations.

## Routing & Dependency Injection
- Organize routes using APIRouter with clear tags and prefix definitions.
- Inject database sessions and current user auth contexts using Depends().
- Never use global database connections or unmanaged session singletons.

## Async & Concurrency Discipline
- Use async def for I/O-bound operations (database queries, external HTTP calls via httpx).
- Use standard def for synchronous CPU-bound operations or libraries without async support (e.g. pandas, Pillow).
- Always raise HTTPException(status_code=..., detail=...) with standard status constants.`,
    faqs: [
      {
        q: 'How does this rule enforce Pydantic v2 migration patterns?',
        a: 'It explicitly flags and forbids deprecated v1 methods like .dict() and @validator, directing the AI to emit .model_dump(), .model_dump_json(), and @field_validator exclusively.'
      },
      {
        q: 'Does this prevent blocking synchronous calls in async endpoints?',
        a: 'Yes, the rule instructs the LLM to separate synchronous CPU-bound logic into standard def or run via starlette run_in_threadpool, while keeping async def strictly for non-blocking I/O.'
      }
    ]
  },
  {
    slug: 'react-vite',
    name: 'React 19 / Vite',
    heroTitle: 'React 19 & Vite TypeScript .cursorrules (.mdc)',
    title: 'React 19 & Vite .cursorrules & .mdc Rules - TypeScript Standards',
    description: 'Production-ready .cursorrules and .mdc rules for React 19 and Vite. Enforce clean custom hooks, prevent redundant useEffect cycles, and guarantee strict TypeScript safety.',
    keywords: 'cursorrule, cursorrules, .cursorrules, react 19 cursor rules, vite react cursor mdc, react typescript cursorrules, react hooks best practices cursor, modern react cursor prompt',
    globs: 'src/**/*.{ts,tsx}',
    mdc_content: `---
description: React 19 and Vite SPA development standards with strict TypeScript
globs: src/**/*.{ts,tsx}
alwaysApply: false
---

# React 19 & Vite Standards

## Component Architecture
- Use functional components exclusively with TypeScript interfaces for props.
- Keep components small and focused. Extract sub-components when JSX exceeds ~120 lines.
- Do NOT use React.FC. Define props directly: function Button({ label, onClick }: ButtonProps).

## Hook Hygiene & State Management
- Never use useEffect to synchronize or derive state that can be computed during render.
- Keep useState local to the component that requires it; lift state only when shared by siblings.
- Custom hooks must start with use*, reside in src/hooks/, and return typed arrays or objects.`,
    faqs: [
      {
        q: 'How do these rules improve React hook hygiene?',
        a: 'They forbid using useEffect for calculating derived state. The AI is instructed to compute values inline during render or use useMemo only when backed by performance measurements.'
      },
      {
        q: 'Does this rule work with Vite and TypeScript?',
        a: "Yes, globs are scoped to src/**/*.{ts,tsx} and enforce strict TypeScript without any 'any' types, along with modern ES module imports."
      }
    ]
  },
  {
    slug: 'vue3-nuxt',
    name: 'Vue 3 / Nuxt',
    heroTitle: 'Vue 3 & Nuxt 3 Composition API .cursorrules (.mdc)',
    title: "Vue 3 & Nuxt .cursorrules & .mdc Rules - Composition API & Pinia",
    description: "Production .cursorrules and .cursor/rules/*.mdc configuration for Vue 3 and Nuxt. Enforce <script setup lang='ts'>, Pinia stores, and clean reactivity patterns.",
    keywords: 'cursorrule, cursorrules, .cursorrules, vue 3 cursor rules, nuxt 3 cursor mdc, pinia composition api cursorrules, vue typescript cursor prompt',
    globs: '**/*.vue, stores/**/*.ts, composables/**/*.ts',
    mdc_content: `---
description: Vue 3 and Nuxt 3 Composition API standards with Pinia and TypeScript
globs: **/*.vue, stores/**/*.ts, composables/**/*.ts
alwaysApply: false
---

# Vue 3 & Nuxt Standards

## Single File Components
- Always use <script setup lang="ts">. The legacy Options API is forbidden.
- Define props with defineProps<{ ... }>() and emits with defineEmits<{ ... }>().
- Use computed() for derived values; avoid deep watchers on reactive objects unless strictly necessary.

## State & Store Management
- Use Pinia for state management. Avoid mutating state directly outside of actions.
- Place reusable logic in composables (composables/use*.ts) returning readonly refs where appropriate.`,
    faqs: [
      {
        q: 'Does this enforce Composition API over Options API?',
        a: 'Yes, it completely bans legacy Vue 2 Options API syntax (data, methods, mounted) and strictly enforces <script setup lang="ts">.'
      },
      {
        q: 'How does it handle reactivity safely?',
        a: 'It mandates ref() for primitives and reactive() for complex objects, and enforces computed() to eliminate manual state sync bugs.'
      }
    ]
  },
  {
    slug: 'supabase',
    name: 'Supabase + RLS',
    heroTitle: 'Supabase & Postgres RLS Security .cursorrules (.mdc)',
    title: 'Supabase & Postgres .cursorrules & .mdc Rules - Row Level Security (RLS)',
    description: 'Security-focused .cursorrules and .cursor/rules/*.mdc guidelines for Supabase. Mandate Row Level Security (RLS) policies, prevent key leaks, and enforce typed queries.',
    keywords: 'cursorrule, cursorrules, .cursorrules, supabase cursor rules, postgres rls cursor mdc, row level security prompt, supabase auth cursorrules',
    globs: 'supabase/**/*.{sql,ts}, lib/supabase/**/*.{ts,tsx}',
    mdc_content: `---
description: Supabase database security, Row Level Security (RLS), and typed SDK standards
globs: supabase/**/*.{sql,ts}, lib/supabase/**/*.{ts,tsx}
alwaysApply: false
---

# Supabase & Database Security Standards

## Row Level Security (RLS) Discipline
- Every new public schema table MUST explicitly enable RLS:
  ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
- Always define explicit policies for SELECT, INSERT, UPDATE, and DELETE.
- Avoid USING (true) unless public read access is explicitly intentional.

## SDK & Key Management
- NEVER import or reference SUPABASE_SERVICE_ROLE_KEY inside client-side components.
- Always use the typed Supabase client generated from supabase gen types typescript.`,
    faqs: [
      {
        q: 'How do these rules protect against data leaks?',
        a: 'Every time the AI creates or modifies a table, it is instructed to append ALTER TABLE ... ENABLE ROW LEVEL SECURITY and generate non-permissive policies.'
      },
      {
        q: 'Does it prevent exposing the service role key?',
        a: 'Yes, service keys are strictly forbidden in client components and restricted to secure server runtimes.'
      }
    ]
  },
  {
    slug: 'tailwind-css',
    name: 'Tailwind v4',
    heroTitle: 'Tailwind CSS v4 & cn() Utility .cursorrules (.mdc)',
    title: 'Tailwind CSS v4 .cursorrules & .mdc Rules - Utility-First Standards',
    description: 'High-velocity .cursorrules and .cursor/rules/*.mdc configuration for Tailwind CSS v4. Enforce cn() utility merging, mobile-first responsiveness, and prevent arbitrary class sprawl.',
    keywords: 'cursorrule, cursorrules, .cursorrules, tailwind css v4 cursor rules, tailwind mdc, cn utility cursor prompt, tailwind responsive best practices',
    globs: '**/*.{tsx,jsx,vue,svelte,html,css}',
    mdc_content: `---
description: Tailwind CSS v4 utility styling, cn() merging, and responsive design standards
globs: **/*.{tsx,jsx,vue,svelte,html,css}
alwaysApply: false
---

# Tailwind CSS v4 Standards

## Utility-First Discipline
- Use atomic utility classes directly. Do not create separate CSS files with @apply unless writing base typography.
- Always use the cn() helper (clsx + tailwind-merge) when conditionally merging classes.
- Follow mobile-first order: base classes first, then sm:, md:, lg:, xl:.

## Theming & Dark Mode
- Use semantic color classes (bg-background, text-foreground, border-border) so dark mode works out of the box.
- Avoid arbitrary hardcoded pixel values (e.g. w-[347px]). Use standard Tailwind spacing scale (w-80, w-96).`,
    faqs: [
      {
        q: 'How does it prevent CSS class conflicts?',
        a: 'It mandates wrapping dynamic class names inside the cn() helper using tailwind-merge to automatically resolve conflicting utility classes.'
      },
      {
        q: 'Is it compatible with Tailwind v4 CSS theme variables?',
        a: 'Yes, it emphasizes CSS variable based color tokens over hardcoded HEX values to support seamless dark/light mode switching.'
      }
    ]
  },
  {
    slug: 'golang',
    name: 'Golang',
    heroTitle: 'Golang & Gin/Chi Microservices .cursorrules (.mdc)',
    title: 'Golang .cursorrules & .mdc Rules - Idiomatic Go Microservice Standards',
    description: 'Production-tested .cursorrules and .cursor/rules/*.mdc configuration for Golang. Enforce idiomatic error handling, context propagation, and zero-allocation struct discipline.',
    keywords: 'cursorrule, cursorrules, .cursorrules, golang cursor rules, go microservice mdc, gin chi cursor rules, idiomatic go cursor prompt',
    globs: '**/*.go',
    mdc_content: `---
description: Idiomatic Golang standards, error wrapping, and context propagation
globs: **/*.go
alwaysApply: false
---

# Golang Engineering Standards

## Error Handling & Reliability
- Handle errors immediately where they occur: if err != nil { return fmt.Errorf("action failed: %w", err) }.
- Never ignore errors with _. Always handle or explicitly log with justification.
- Wrap errors using %w to preserve the causal error chain.

## Concurrency & Context
- Pass ctx context.Context as the very first parameter to any function doing I/O.
- Always release resources using defer resp.Body.Close() or defer rows.Close() immediately after checking for errors.
- Never start unmanaged goroutines without sync.WaitGroup or cancellation signals.`,
    faqs: [
      {
        q: 'How does it handle Go error handling?',
        a: "It strictly enforces the idiomatic 'if err != nil' check immediately after function calls with wrapped context errors using fmt.Errorf('...: %w', err)."
      },
      {
        q: 'Does it handle context.Context?',
        a: 'Yes, context.Context must be the first parameter for all database queries and external RPC calls, preventing hanging connections.'
      }
    ]
  },
  {
    slug: 'cloudflare-workers',
    name: 'Cloudflare Workers',
    heroTitle: 'Cloudflare Workers & Hono Edge .cursorrules (.mdc)',
    title: 'Cloudflare Workers .cursorrules & .mdc Rules - Edge Serverless Standards',
    description: 'High-performance .cursorrules and .cursor/rules/*.mdc configuration for Cloudflare Workers and Hono. Optimize edge startup times, D1 database queries, and KV caching.',
    keywords: 'cursorrule, cursorrules, .cursorrules, cloudflare workers cursor rules, hono mdc rules, cloudflare d1 edge prompt, serverless workers cursorrules',
    globs: 'worker/**/*.{ts,js}, src/**/*.{ts,js}',
    mdc_content: `---
description: Cloudflare Workers, Hono, D1, and Edge runtime engineering standards
globs: worker/**/*.{ts,js}, src/**/*.{ts,js}
alwaysApply: false
---

# Cloudflare Workers & Hono Standards

## Edge Runtime Constraints
- Never rely on persistent in-memory global state between requests.
- Use c.env.DB (D1) or c.env.KV for persistent storage and session management.
- Keep dependencies minimal to ensure sub-10ms worker cold startup times.

## Hono Framework Discipline
- Type your Hono instance with the environment bindings: const app = new Hono<{ Bindings: Env }>().
- Always return typed JSON using c.json({ ... }, 200) and handle errors with app.onError().
- Ensure all asynchronous background tasks use ctx.waitUntil(...) so execution completes reliably.`,
    faqs: [
      {
        q: 'How does it enforce cold-start performance?',
        a: 'It forbids heavy Node.js built-ins and oversized polyfills, restricting dependencies to edge-native libraries to maintain sub-10ms global cold starts.'
      },
      {
        q: 'How does it optimize Cloudflare D1 queries?',
        a: 'It mandates prepared statements using .bind() to prevent SQL injection and batches multi-row writes with db.batch().'
      }
    ]
  },
  // --- NEW HIGH-DEMAND FRAMEWORKS ---
  {
    slug: 'flutter-dart',
    name: 'Flutter & Dart',
    heroTitle: 'Flutter 3.x & Dart Clean Architecture .cursorrules (.mdc)',
    title: 'Flutter & Dart .cursorrules & .mdc Rules - Clean Architecture & Riverpod',
    description: 'Production-tested .cursorrules and .cursor/rules/*.mdc configuration for Flutter and Dart 3. Enforce clean architecture, Riverpod/Bloc state management, const widget optimization, and null safety.',
    keywords: 'cursorrule, cursorrules, .cursorrules, flutter cursor rules, dart 3 cursor mdc, riverpod cursor rules, bloc flutter cursor prompt, clean architecture flutter',
    globs: 'lib/**/*.dart, test/**/*.dart',
    mdc_content: `---
description: Flutter 3 and Dart 3 production architecture, Riverpod state, and widget optimization
globs: lib/**/*.dart, test/**/*.dart
alwaysApply: false
---

# Flutter & Dart Engineering Standards

## Widget Tree & Performance Discipline
- Prefer dedicated StatelessWidget or HookWidget classes over inline helper methods that return Widget.
- Add \`const\` constructors to all static widgets to eliminate unnecessary element rebuilds.
- Never perform heavy data manipulation or network I/O directly inside the build() method.
- Always dispose AnimationControllers, TextEditingControllers, and StreamSubscriptions in dispose().

## State Management (Riverpod / Bloc)
- Keep UI completely decoupled from business logic using Riverpod (NotifierProvider) or Bloc.
- State models MUST be immutable using Freezed or Equatable with copyWith() patterns.
- Never call setState() in deeply nested widget trees; consume granular providers with ConsumerWidget.

## Dart Sound Null Safety & Async
- Sound null safety is strictly enforced. Never use force-unwrap (!) unless preceded by a hard null assertion.
- Handle asynchronous errors with typed Result/Either monads or structured try-catch with specific exceptions.`,
    faqs: [
      {
        q: 'Why does this rule forbid helper methods returning Widget?',
        a: 'Helper methods like Widget _buildHeader() break Flutter element caching and force the entire tree to rebuild. Extracting separate const StatelessWidget classes allows Flutter to short-circuit rebuild cycles.'
      },
      {
        q: 'How does it structure Riverpod and Bloc state?',
        a: 'It mandates immutable state objects (using Freezed or copyWith), forbids mutable properties in state classes, and enforces separation between data layers, controllers, and UI presentation.'
      }
    ]
  },
  {
    slug: 'rust-axum',
    name: 'Rust & Axum',
    heroTitle: 'Rust, Axum & Tokio High-Performance .cursorrules (.mdc)',
    title: 'Rust & Axum .cursorrules & .mdc Rules - Async Tokio & SQLx Best Practices',
    description: 'High-performance .cursorrules and .cursor/rules/*.mdc configuration for Rust, Axum, and Tokio. Enforce idiomatic error handling with thiserror/anyhow, zero-copy deserialization, and strict async discipline.',
    keywords: 'cursorrule, cursorrules, .cursorrules, rust cursor rules, axum cursor mdc, tokio async rust prompt, sqlx rust cursorrules, modern rust web api',
    globs: 'src/**/*.rs, tests/**/*.rs',
    mdc_content: `---
description: Rust 2024 edition, Axum web framework, Tokio async, and SQLx standards
globs: src/**/*.rs, tests/**/*.rs
alwaysApply: false
---

# Rust & Axum Engineering Standards

## Error Handling & Robustness
- Never call .unwrap() or .expect() in production request handlers or library code.
- Define a unified application error enum using \`thiserror\` and implement Axum's \`IntoResponse\`.
- Use \`anyhow\` solely for application entry points (main.rs) or tests.
- Always map database and third-party errors into structured domain error variants.

## Async & Concurrency Discipline (Tokio)
- Never execute blocking CPU-heavy operations or synchronous file/network I/O on async worker threads.
- Offload blocking work to \`tokio::task::spawn_blocking\`.
- Keep mutex lock guards tightly scoped; never hold a std::sync::MutexGuard across an .await point.

## Axum Routing & State
- Group related endpoints into modular routers merged into the main application Router.
- Pass shared application state via \`axum::extract::State(state)\` with an Arc-wrapped struct.
- Validate request payloads with typed extractors (\`Json<T>\`, \`Query<T>\`, \`Path<T>\`).`,
    faqs: [
      {
        q: 'How does this rule eliminate panic crashes in production?',
        a: 'It strictly bans unwrap() and expect() in request handlers, requiring the AI to propagate errors via the Result<T, AppError> pattern with an automated IntoResponse implementation.'
      },
      {
        q: 'How does it protect async Tokio thread pools?',
        a: 'It prevents blocking std I/O calls on async runtimes and warns against holding non-async mutex locks across .await boundaries, preventing thread starvation and deadlocks.'
      }
    ]
  },
  {
    slug: 'react-native-expo',
    name: 'React Native / Expo',
    heroTitle: 'React Native & Expo Router SDK 52 .cursorrules (.mdc)',
    title: 'React Native & Expo .cursorrules & .mdc Rules - Expo Router SDK 52 Standards',
    description: 'Production-ready .cursorrules and .cursor/rules/*.mdc configuration for React Native and Expo Router SDK 52. Enforce typed routing, NativeWind styling, performance list optimization, and smooth 60fps UI.',
    keywords: 'cursorrule, cursorrules, .cursorrules, react native cursor rules, expo router cursor mdc, nativewind mobile prompt, flashlist react native cursorrules',
    globs: 'app/**/*.{tsx,ts}, components/**/*.{tsx,ts}',
    mdc_content: `---
description: React Native and Expo Router SDK 52 mobile application standards
globs: app/**/*.{tsx,ts}, components/**/*.{tsx,ts}
alwaysApply: false
---

# React Native & Expo Standards

## Expo Router & File Navigation
- Follow file-based routing in the app/ directory strictly. Use _layout.tsx for Stack and Tabs navigation.
- Use typed navigation via \`useRouter()\` and \`router.push({ pathname, params })\`.
- Always configure screen options in _layout.tsx rather than imperatively inside individual screen components.

## Performance & 60fps Rendering
- Use \`@shopify/flash-list\` instead of legacy FlatList for rendering feeds with more than 20 items.
- Memoize list renderItem functions with useCallback and wrap items in React.memo with strict comparison.
- Ensure all images use \`expo-image\` with cachePolicy="memory-disk" for instant image loads.

## Safe Areas & Cross-Platform Styling
- Always wrap screen views in \`SafeAreaView\` from \`react-native-safe-area-context\`.
- When using NativeWind / Tailwind CSS, ensure class strings are mobile-optimized without desktop media queries.
- Support both iOS and Android keyboard dismiss behaviors with \`KeyboardAvoidingView\` behavior="padding".`,
    faqs: [
      {
        q: 'Why does it prefer FlashList over FlatList?',
        a: 'Shopify FlashList recycles native views across scrolling rather than reallocating memory, preventing frame drops and OOM crashes on lower-end Android devices.'
      },
      {
        q: 'Does it support Expo Router SDK 52 typed routes?',
        a: 'Yes, it mandates using typed hrefs and parameters in Expo Router, eliminating broken screen transitions and missing navigation parameters.'
      }
    ]
  },
  {
    slug: 'django-python',
    name: 'Django / DRF',
    heroTitle: 'Django 5 & Django REST Framework .cursorrules (.mdc)',
    title: 'Django & DRF .cursorrules & .mdc Rules - Python Web Standards & Celery',
    description: 'Enterprise-grade .cursorrules and .cursor/rules/*.mdc configuration for Django 5 and Django REST Framework (DRF). Prevent N+1 queries with select_related/prefetch_related, enforce typed serializers, and clean service layers.',
    keywords: 'cursorrule, cursorrules, .cursorrules, django cursor rules, django rest framework mdc, drf serializers prompt, python django celery cursorrules',
    globs: '**/*.py, apps/**/*.py',
    mdc_content: `---
description: Django 5 and Django REST Framework (DRF) backend engineering standards
globs: **/*.py, apps/**/*.py
alwaysApply: false
---

# Django & DRF Engineering Standards

## Query Optimization & N+1 Prevention
- Never loop over foreign-key relations without \`select_related()\` (for ForeignKey/OneToOne) or \`prefetch_related()\` (for ManyToMany).
- Use \`.only()\` or \`.values_list()\` when fetching lightweight subsets of columns.
- Use \`bulk_create()\` and \`bulk_update()\` for batch database operations; never save instances in a loop.

## Architecture & Service Layer
- Keep views thin: views and ViewSets should only parse requests, invoke service functions, and return responses.
- Place core business logic in dedicated \`services/*.py\` modules rather than fat models or serializers.
- Use ModelSerializer for CRUD validation; explicitly define \`fields = [...] \` and never use \`fields = '__all__'\`.

## Asynchronous & Background Tasks
- Long-running operations (emails, webhooks, heavy reports) MUST be dispatched to Celery tasks with \`task.delay()\`.`,
    faqs: [
      {
        q: 'How does this rule eliminate Django N+1 query bottlenecks?',
        a: 'It scans query access patterns and mandates select_related on forward relations and prefetch_related on reverse/M2M relations before serialization.'
      },
      {
        q: 'Why is fields = "__all__" forbidden in DRF serializers?',
        a: 'fields = "__all__" can unintentionally leak internal model fields (such as password hashes or audit columns) whenever new database columns are added.'
      }
    ]
  },
  {
    slug: 'laravel-php',
    name: 'Laravel 11',
    heroTitle: 'Laravel 11 & Modern PHP 8.3 .cursorrules (.mdc)',
    title: 'Laravel 11 .cursorrules & .mdc Rules - Modern PHP 8.3 & Eloquent Standards',
    description: 'Modern .cursorrules and .cursor/rules/*.mdc configuration for Laravel 11 and PHP 8.3. Enforce Form Request validation, API Resources, strict Eloquent query optimization, and Pest testing.',
    keywords: 'cursorrule, cursorrules, .cursorrules, laravel 11 cursor rules, php 8.3 cursor mdc, pest testing prompt, eloquent optimization cursorrules',
    globs: 'app/**/*.php, routes/**/*.php, database/**/*.php',
    mdc_content: `---
description: Laravel 11 and modern PHP 8.3 backend engineering standards
globs: app/**/*.php, routes/**/*.php, database/**/*.php
alwaysApply: false
---

# Laravel 11 & PHP 8.3 Standards

## Controller & Request Validation
- Never validate requests directly inside controllers with $request->validate().
- Always extract validation into dedicated Form Request classes: \`php artisan make:request\`.
- Format API outputs using JsonResource / ResourceCollection classes; never return raw Eloquent models directly.

## Eloquent Discipline & Performance
- Prevent lazy loading in local development: call \`Model::preventLazyLoading()\` in AppServiceProvider.
- Always eager load relations with \`with([...])\` to prevent N+1 query loops.
- Use typed properties and PHP 8.3 constructor property promotion across all classes.

## Testing & Quality
- Write tests using Pest PHP for all feature endpoints.
- Group complex business mutations into single-purpose Action classes (\`app/Actions\`).`,
    faqs: [
      {
        q: 'Why are Form Requests mandated over inline controller validation?',
        a: 'Dedicated Form Requests encapsulate validation rules and authorization logic in reusable classes, keeping controller methods slim and single-responsibility.'
      },
      {
        q: 'How does it ensure high-performance Eloquent queries?',
        a: 'It enforces eager loading via with() and instructs developers to enable Model::preventLazyLoading(), throwing hard exceptions whenever un-eager-loaded queries execute.'
      }
    ]
  },
  {
    slug: 'shadcn-ui',
    name: 'shadcn/ui & Radix',
    heroTitle: 'shadcn/ui, Radix UI & Tailwind .cursorrules (.mdc)',
    title: 'shadcn/ui & Radix .cursorrules & .mdc Rules - Accessible Component Standards',
    description: "Production .cursorrules and .cursor/rules/*.mdc configuration for shadcn/ui and Radix UI. Enforce WCAG 2.1 AA accessibility, polymorphic 'asChild' composition, cn() class merging, and headless component purity.",
    keywords: 'cursorrule, cursorrules, .cursorrules, shadcn ui cursor rules, radix ui cursor mdc, accessible components prompt, tailwind radix cursorrules',
    globs: 'components/ui/**/*.{tsx,jsx}, components/**/*.{tsx,jsx}',
    mdc_content: `---
description: shadcn/ui, Radix UI primitives, and accessible component engineering standards
globs: components/ui/**/*.{tsx,jsx}, components/**/*.{tsx,jsx}
alwaysApply: false
---

# shadcn/ui & Radix UI Standards

## Component Composition & asChild Pattern
- When wrapping shadcn/ui components (e.g. Button, DialogTrigger) around custom links or buttons, ALWAYS use \`asChild\` to avoid nested interactive button-in-a-tag HTML errors.
- Never modify files inside \`components/ui/\` directly unless creating a project-wide variant. Build feature wrappers in \`components/\`.

## Accessibility (a11y) & ARIA Compliance
- Every interactive element MUST have visible focus rings: \`focus-visible:ring-2 focus-visible:ring-offset-2\`.
- All icons used as buttons MUST include an accessible \`aria-label\` or \`<span class="sr-only">Label</span>\`.
- Dialogs, Sheets, and Drawers MUST contain a \`<DialogTitle>\` or \`<VisuallyHidden><DialogTitle>\` to satisfy screen readers.

## Styling & Token Consistency
- Always combine conditional classes using the \`cn()\` utility (clsx + tailwind-merge).
- Rely on semantic HSL CSS variable tokens: \`bg-background\`, \`text-muted-foreground\`, \`border-input\`.`,
    faqs: [
      {
        q: "Why is the 'asChild' pattern essential in shadcn/ui?",
        a: "Radix UI uses asChild via the Slot component to merge props into the direct child element, preventing invalid HTML like rendering a <button> inside an <a> tag while preserving full keyboard accessibility."
      },
      {
        q: 'Does this rule guarantee WCAG 2.1 AA accessibility compliance?',
        a: 'Yes, it mandates accessible focus rings, mandatory DialogTitle headers for screen readers, and screen-reader only labels for icon-only action buttons.'
      }
    ]
  }
];

// Generate individual rule page HTML
function generateRulePage(rule) {
  const sidebarLinks = ALL_RULES.map(r => {
    const isCurrent = r.slug === rule.slug;
    const borderClass = isCurrent
      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-semibold'
      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300 hover:text-white';
    return `        <a href="/rules/${r.slug}" class="p-3 rounded-lg border text-xs transition flex items-center justify-between ${borderClass}">
          <span>${r.name}</span>
          <span class="text-[10px] font-mono text-slate-500">.mdc</span>
        </a>`;
  }).join('\n');

  const faqsHtml = rule.faqs.map(f => `        <div class="border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 bg-white dark:bg-slate-900/40">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            ${f.q}
          </h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${f.a}</p>
        </div>`).join('\n');

  const faqSchema = rule.faqs.map(f => `{
          "@type": "Question",
          "name": "${f.q.replace(/"/g, '\\"')}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${f.a.replace(/"/g, '\\"')}"
          }
        }`).join(',\n        ');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${rule.title}</title>
  <meta name="description" content="${rule.description}">
  <meta name="keywords" content="${rule.keywords}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://cursor.pacebowl.com/rules/${rule.slug}">

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://cursor.pacebowl.com/rules/${rule.slug}">
  <meta property="og:title" content="${rule.title}">
  <meta property="og:description" content="${rule.description}">
  <meta property="og:image" content="https://cursor.pacebowl.com/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${rule.title}">
  <meta property="og:site_name" content="Cursor Rules Generator">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://cursor.pacebowl.com/rules/${rule.slug}">
  <meta name="twitter:title" content="${rule.title}">
  <meta name="twitter:description" content="${rule.description}">
  <meta name="twitter:image" content="https://cursor.pacebowl.com/og-image.png">

  <!-- Analytics -->
  <script defer src="https://umami-ruby-alpha-96.vercel.app/script.js" data-website-id="45cd49ed-6c55-4b37-bcbb-69959c065874"></script>
  <script defer data-domain="cursor.pacebowl.com" data-api="https://geo.pacebowl.com/api" src="https://geo.pacebowl.com/geo.js"></script>

  <!-- Structured Data: TechArticle, SoftwareSourceCode & FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "${rule.heroTitle}",
        "description": "${rule.description.replace(/"/g, '\\"')}",
        "url": "https://cursor.pacebowl.com/rules/${rule.slug}",
        "author": {
          "@type": "Organization",
          "name": "Cursor Rules Generator",
          "url": "https://cursor.pacebowl.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Pacebowl Studio",
          "url": "https://pacebowl.com"
        }
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "${rule.name} .cursorrules .mdc configuration",
        "programmingLanguage": "Markdown",
        "targetProduct": "Cursor AI IDE"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
        ${faqSchema}
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cursor.pacebowl.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Rules",
            "item": "https://cursor.pacebowl.com/rules/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${rule.name}",
            "item": "https://cursor.pacebowl.com/rules/${rule.slug}"
          }
        ]
      }
    ]
  }
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { 500: '#6366f1', 600: '#4f46e5' }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">

  <!-- Header -->
  <header class="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
        <span class="font-bold text-base text-slate-900 dark:text-white tracking-tight">Cursor Rules <span class="text-indigo-600 dark:text-indigo-400 font-mono text-xs px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-500/30">.mdc</span></span>
      </a>

      <div class="flex items-center space-x-3 text-xs">
        <a href="/rules/" class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition">Directory</a>
        <a href="/blog/" class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition hidden sm:inline">Guides & Blog</a>
        <a href="/" class="px-3.5 py-1.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-sm">
          <span>⚡</span>
          <span>Customize Stack</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <nav class="max-w-5xl mx-auto px-4 sm:px-6 pt-6 w-full text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
    <a href="/" class="hover:text-indigo-500">Home</a>
    <span>/</span>
    <a href="/rules/" class="hover:text-indigo-500">Rules</a>
    <span>/</span>
    <span class="text-slate-900 dark:text-slate-200 font-medium">${rule.name}</span>
  </nav>

  <!-- Hero -->
  <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
    <div class="mb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
        <span>Production-Ready Rule</span>
        <span>•</span>
        <span class="font-mono text-[11px]">${rule.globs}</span>
      </div>
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        ${rule.heroTitle}
      </h1>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
        ${rule.description}
      </p>
    </div>

    <!-- Actions & Code Card -->
    <div class="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden mb-12">
      <!-- Card Toolbar -->
      <div class="px-4 py-3 bg-slate-100/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center space-x-2">
          <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          <span class="ml-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">.cursor/rules/${rule.slug}.mdc</span>
        </div>

        <div class="flex items-center gap-2">
          <button id="copy-btn" onclick="copyMdc()" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span id="copy-text">Copy .mdc</span>
          </button>
          <button onclick="downloadMdc()" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Download</span>
          </button>
          <a href="/" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-sm">
            <span>⚡ Open in Generator</span>
          </a>
        </div>
      </div>

      <!-- Code Box -->
      <div class="p-5 overflow-x-auto bg-[#0d1117] text-slate-200 font-mono text-xs leading-relaxed max-h-[540px]">
        <pre id="mdc-code-block"><code>${rule.mdc_content}</code></pre>
      </div>
    </div>

    <!-- Community Backlink & Citation Bar -->
    <div class="p-4 rounded-xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs mb-10 shadow-xs">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-base">⭐</span>
        <span class="text-slate-700 dark:text-slate-300 font-medium">Using this rule in your open-source project? Reference in your README:</span>
        <code class="bg-white dark:bg-slate-950 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 select-all">https://cursor.pacebowl.com/rules/${rule.slug}</code>
      </div>
      <div class="flex items-center gap-2">
        <a href="https://github.com/fullofjoy/cursor-rules-generator" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:border-indigo-400 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition font-medium flex items-center gap-1.5 shadow-2xs">
          <span>Star on GitHub</span>
        </a>
        <a href="https://twitter.com/intent/tweet?text=Production%20.cursorrules%20and%20.mdc%20configuration%20for%20${encodeURIComponent(rule.name)}:%20https://cursor.pacebowl.com/rules/${rule.slug}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:border-sky-400 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-300 transition font-medium shadow-2xs">
          Share on X
        </a>
      </div>
    </div>

    <!-- Technical Rationale & FAQ Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div class="lg:col-span-2 space-y-4">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Frequently Asked Questions & Implementation Notes</span>
        </h2>
        <div class="space-y-3">
${faqsHtml}
        </div>
      </div>

      <!-- Sidebar: Other Stacks -->
      <div class="space-y-4">
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Explore Other Frameworks
        </h2>
        <div class="grid grid-cols-1 gap-2">
${sidebarLinks}
        </div>
      </div>
    </div>
  </main>

  <!-- RelNav: PaceBowl Ecosystem Matrix Grid -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-8 border-t border-slate-200 dark:border-slate-800/80 w-full mb-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        PaceBowl Suite Matrix
      </h3>
      <a href="https://pacebowl.com" class="text-xs text-indigo-500 hover:underline">Mothership Hub →</a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <a href="https://deepseek.pacebowl.com" class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-500/60 transition group flex flex-col justify-between">
        <div class="flex items-center gap-2.5 mb-1.5">
          <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">DS</div>
          <span class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition">DeepSeek Studio</span>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">277+ AI Expert Prompts & R1 CoT.</p>
      </a>
      <a href="https://comfy.pacebowl.com" class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-sky-500/60 transition group flex flex-col justify-between">
        <div class="flex items-center gap-2.5 mb-1.5">
          <div class="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-[10px]">CF</div>
          <span class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-400 transition">ComfyUI Prompt Studio</span>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">Flux.1 & 1MP Empty Latent calculator.</p>
      </a>
      <a href="https://geo.pacebowl.com" class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-500/60 transition group flex flex-col justify-between">
        <div class="flex items-center gap-2.5 mb-1.5">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[10px]">GEO</div>
          <span class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition">OpenGEO Attribution</span>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">Track Perplexity & ChatGPT conversions.</p>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/60 py-8 text-xs text-slate-500 transition-colors">
    <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center space-x-2">
        <span>© 2026 Pacebowl Studio</span>
        <span>•</span>
        <a href="https://pacebowl.com" class="hover:text-indigo-500">Pacebowl.com</a>
        <span>•</span>
        <a href="https://deepseek.pacebowl.com" class="hover:text-indigo-500">DeepSeek Studio</a>
        <span>•</span>
        <a href="https://geo.pacebowl.com" class="hover:text-indigo-500">OpenGEO</a>
      </div>
      <div>
        <a href="/sitemap.xml" class="hover:text-indigo-500">Sitemap</a>
      </div>
    </div>
  </footer>

  <script>
    const mdcText = \`${rule.mdc_content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;

    function copyMdc() {
      navigator.clipboard.writeText(mdcText).then(() => {
        const btn = document.getElementById('copy-text');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy .mdc', 2000);
      });
    }

    function downloadMdc() {
      const blob = new Blob([mdcText], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '${rule.slug}.mdc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>`;
}

// Generate Catalog index.html
function generateRulesIndex() {
  const cardsHtml = ALL_RULES.map(r => `      <a href="/rules/${r.slug}" class="p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-indigo-500/60 transition group hover:shadow-lg hover:shadow-indigo-950/30">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-base font-bold text-white group-hover:text-indigo-400 transition">${r.name}</h2>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">.mdc</span>
        </div>
        <p class="text-xs text-slate-400 line-clamp-2 mb-3">${r.description}</p>
        <div class="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
          <span>Glob:</span>
          <span class="text-slate-400">${r.globs}</span>
        </div>
      </a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free .cursorrules & .mdc Directory — Production-Grade Cursor Rules Library</title>
  <meta name="description" content="Browse curated, production-tested .cursorrules and Cursor .mdc rules for Next.js 15, FastAPI, React 19, Vue 3, Supabase, Tailwind CSS, Golang, Flutter, Rust Axum, React Native Expo, Django, Laravel, and shadcn/ui.">
  <meta name="keywords" content="cursorrule, cursorrules, .cursorrules, cursor rules directory, cursor mdc directory, cursor prompt library, best cursorrules, claude code rules, windsurf rules">
  <link rel="canonical" href="https://cursor.pacebowl.com/rules/">
  <meta property="og:title" content="Free .cursorrules & .mdc Directory — Production Rules Library">
  <meta property="og:description" content="Production-tested .cursorrules and .mdc configurations for modern full-stack web and backend frameworks.">
  <meta property="og:image" content="https://cursor.pacebowl.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://cursor.pacebowl.com/og-image.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  <header class="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <a href="https://pacebowl.com" class="text-xs font-mono text-slate-400 hover:text-white transition flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800">
          <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span>PaceBowl</span>
        </a>
        <span class="text-slate-600 font-mono">/</span>
        <a href="/" class="font-bold text-base text-slate-900 dark:text-white">Cursor Rules <span class="text-indigo-400 font-mono text-xs">.mdc</span></a>
      </div>
      <a href="/" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition">⚡ Launch Generator</a>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
    <!-- Header Hero -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-mono font-medium mb-3">
        <span>${ALL_RULES.length} Production Framework Presets</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">Free .cursorrules & .mdc Framework Rules Directory</h1>
      <p class="text-sm text-slate-400 max-w-2xl leading-relaxed">
        Production-tested multi-file rules tailored with precise glob patterns for Cursor AI, Windsurf, and Claude Code. Prevent context bloat and hallucination by scoping prompts to exact file paths.
      </p>
    </div>

    <!-- Developer API & MCP Integration Box -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-500/30 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Open API & MCP Server</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">v1.0</span>
        </div>
        <p class="text-xs text-slate-300">
          Directly fetch structured JSON rules or connect your IDE agent via Model Context Protocol:
        </p>
        <code class="text-[11px] font-mono text-emerald-400 bg-slate-950 px-2 py-1 rounded mt-2 inline-block border border-slate-800">
          curl -s https://cursor.pacebowl.com/api/rules.json
        </code>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <a href="/api/rules.json" target="_blank" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition">
          rules.json
        </a>
        <a href="/api/mcp.json" target="_blank" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs shadow-sm transition">
          mcp.json
        </a>
      </div>
    </div>

    <!-- Rules Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
${cardsHtml}
    </div>
  </main>
</body>
</html>`;
}

// Generate sitemap.xml
function generateSitemap() {
  const date = '2026-10-10';
  const urls = [
    { loc: 'https://cursor.pacebowl.com/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://cursor.pacebowl.com/rules/', priority: '0.9', changefreq: 'daily' },
    { loc: 'https://cursor.pacebowl.com/blog/', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://cursor.pacebowl.com/blog/cursor-rules-mdc-vs-cursorrules', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://cursor.pacebowl.com/blog/how-to-write-nextjs-15-cursor-rules', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://cursor.pacebowl.com/blog/ai-coding-maturity-ladder', priority: '0.9', changefreq: 'weekly' },
  ];

  for (const r of ALL_RULES) {
    urls.push({ loc: `https://cursor.pacebowl.com/rules/${r.slug}`, priority: '0.9', changefreq: 'weekly' });
  }

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const u of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${u.loc}</loc>`);
    lines.push(`    <lastmod>${date}</lastmod>`);
    lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    lines.push(`    <priority>${u.priority}</priority>`);
    lines.push('  </url>');
  }
  lines.push('</urlset>');
  return lines.join('\n');
}

// Generate api/rules.json
function generateApiRules() {
  return JSON.stringify({
    status: 'ok',
    service: 'PaceBowl Cursor Rules API',
    description: 'Production-tested modular .cursor/rules/*.mdc framework standards',
    version: '1.1.0',
    homepage: 'https://cursor.pacebowl.com/',
    mcp_spec: 'https://cursor.pacebowl.com/api/mcp.json',
    total_rules: ALL_RULES.length,
    rules: ALL_RULES.map(r => ({
      slug: r.slug,
      name: r.name,
      title: r.title,
      description: r.description,
      globs: r.globs,
      url: `https://cursor.pacebowl.com/rules/${r.slug}`,
      mdc_content: r.mdc_content
    }))
  }, null, 2);
}

// MAIN BUILD EXECUTION
console.log('Building Cursor Rules Landing Pages and APIs...');
fs.mkdirSync(RULES_DIR, { recursive: true });

for (const rule of ALL_RULES) {
  const filePath = path.join(RULES_DIR, `${rule.slug}.html`);
  fs.writeFileSync(filePath, generateRulePage(rule), 'utf8');
  console.log(`Generated: rules/${rule.slug}.html`);
}

const indexPath = path.join(RULES_DIR, 'index.html');
fs.writeFileSync(indexPath, generateRulesIndex(), 'utf8');
console.log('Updated: rules/index.html');

const sitemapPath = path.join(ROOT, 'sitemap.xml');
fs.writeFileSync(sitemapPath, generateSitemap(), 'utf8');
console.log('Updated: sitemap.xml');

const apiPath = path.join(ROOT, 'api', 'rules.json');
fs.writeFileSync(apiPath, generateApiRules(), 'utf8');
console.log('Updated: api/rules.json');

console.log(`Successfully generated ${ALL_RULES.length} framework rules!`);
