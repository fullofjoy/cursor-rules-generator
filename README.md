# Cursor Rules Generator (.mdc)

A blazing-fast, client-side web application to configure and download modular, path-scoped `.cursor/rules/*.mdc` files for Cursor AI, with multi-target export support for Claude Code (`CLAUDE.md`) and Windsurf (`.windsurfrules`).

---

## 🚀 Features

- **Multi-File Architecture**: Generates scoped `.cursor/rules/*.mdc` files with proper YAML frontmatter (`description`, `globs`, `alwaysApply`) to prevent context bloat.
- **1-Click .zip Download**: Powered by client-side `JSZip`. Unzips directly into `.cursor/rules/` ready to drop into any repository.
- **Battle-Tested Presets**:
  - Frontend: Next.js 15 (App Router, Server Actions), React 19, Vue 3 / Nuxt
  - Backend: Python FastAPI (Pydantic v2), Go (Gin/Chi), Node.js / Hono
  - Styling & UI: Tailwind CSS v4, Shadcn/UI
  - Database: Supabase + RLS, Drizzle, Prisma
- **Universal Export**: Switch between Cursor `.mdc`, Claude Code (`CLAUDE.md`), Windsurf (`.windsurfrules`), and legacy `.cursorrules`.
- **Zero Dependencies / $0 Cost**: Pure HTML5 + Tailwind CSS + Vanilla JS. Zero build step, zero backend API keys, zero server costs.

---

## 📦 Instant Deployment (Cloudflare Pages / Vercel)

### Option 1: Cloudflare Pages (Recommended - 100% Free)
1. Fork or push this repository to GitHub.
2. In Cloudflare Dashboard, go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3. Select this repository.
4. **Build settings**:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `.`
5. Click **Save and Deploy**. Your site is instantly live with free global CDN and SSL!

### Option 2: Drag & Drop (Zero Git required)
In Cloudflare Pages, choose "Direct Upload", drag this entire folder into the browser window, and your site is live in 10 seconds.
