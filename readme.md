# React Boilerplate

A modern React boilerplate with TypeScript, Vite, TanStack Router, and Tailwind CSS v4, featuring production-ready configurations and development tools.

## Features

- ⚡️ React 19 with Vite 4
- 🎨 Tailwind CSS 4
- 🗺 TanStack Router v1 with File-based Routing
- 🌐 i18n with React i18next
- ✅ Testing: Vitest + Playwright + Testing Library
- 🐋 Docker Development & Production Setup
- 🔍 ESLint + Prettier + Stylelint
- 🐺 Husky + Commitlint + Lint-staged
- 🔒 Security Hardened Nginx Config
- 📱 PWA-ready Configuration
- 🧩 Modular Architecture

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:rupeq/react-boilerplate.git
```

Or clone it with HTTPS:

```bash
git clone https://github.com/rupeq/react-boilerplate.git
```

### 2. Move into the Project Directory

```bash
cd react-boilerplate
```

### 3. Remove Existing Git History

```bash
rm -rf .git
```

_(And optionally remove any additional files, folders, or dependencies you might not need.)_

### 4. Install Dependencies

```bash
pnpm install
```

> **Note**: This boilerplate uses [pnpm](https://pnpm.io) as its preferred package manager.  
> Required Node.js version is pinned in `.nvmrc` (22.0.0) and PNPM is pinned in `package.json`.

### 5. (Optional) Run Setup Script

```bash
pnpm run setup
```

This script will:

- Re-initialize your Git repository
- Set up Husky for Git hooks
- Install necessary Playwright browsers
- Generate TanStack routes

**Congratulations!** You’re ready to start developing your new project.

If you’d rather execute the above steps in a single command:

```bash
git clone git@github.com:rupeq/react-boilerplate.git && \
cd react-boilerplate && \
rm -rf .git && \
pnpm install && \
pnpm run setup
```

---

## Project Structure

Below is a summary of the key files and folders:

```
.
├── certs/               # HTTPS certs for production
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Shared components
│   ├── features/        # Feature modules
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Third-party integrations
│   ├── routes/          # Route definitions
│   ├── stores/          # State management
│   ├── testing/         # Test utilities
│   ├── types/           # Type definitions
│   └── utils/           # Utility functions
├── e2e/                # Playwright tests
```

### Notable Configuration Files

- **`vite.config.ts`**: Vite configuration for local development and production builds.
- **`vitest.config.ts`** & **`vitest.setup.ts`**: Test runner (Vitest) configuration and setup.
- **`playwright.config.ts`**: End-to-end (E2E) test configuration for Playwright.
- **`eslint.config.js`** / **`stylelint.config.js`** / **`prettier.config.js`**: Linting and formatting configurations.
- **`lint-staged.config.js`**: Defines the tasks run by lint-staged on Git pre-commit hooks.
- **`.editorconfig`** / **`.browserlistrc`** / **`.nvmrc`**: Development environment, editor, and browser target configurations.
- **Docker and Nginx**: Config files (`Dockerfile.*`, `nginx.conf`, `docker-compose.*`) for containerized development and production.

### Code Quality

- ESLint with strict TypeScript rules
- Prettier with sorted imports
- Stylelint with CSS/SCSS rules
- Git hooks with Husky
- Commit message validation

---

## Available Scripts

All scripts are defined in the **`package.json`** under the `"scripts"` key.

### Linting & Formatting

- **`pnpm run lint:code`**  
  Lints `.js`, `.jsx`, `.ts`, and `.tsx` files with ESLint.

- **`pnpm run lint:styles`**  
  Lints `.scss` and `.css` files with Stylelint.

- **`pnpm run lint:types`**  
  Runs TypeScript compiler checks (`tsc --noEmit`).

- **`pnpm run lint:format`**  
  Checks formatting on relevant file types (`.jsx`, `.ts`, `.tsx`, `.json`, `.md`, `.yml`, etc.) using Prettier.

- **`pnpm run lint:fix`**  
  Auto-fixes where possible: runs both `lint:code --fix`, `lint:styles --fix`, and `lint:format --write`.

### Testing

- **`pnpm run test`**  
  Runs **both** unit (Vitest) and E2E (Playwright) tests.

- **`pnpm run test:unit`**  
  Runs **only** unit tests with Vitest.

- **`pnpm run test:unit:coverage`**  
  Runs unit tests with coverage reporting (Vitest).

- **`pnpm run test:e2e`**  
  Runs **only** E2E tests with Playwright.

- **`pnpm run test:e2e:report`**  
  Opens a Playwright test report in the browser.

---

## Using Docker

There are **two** Docker setups provided: one for development (`docker-compose.development.yml`) and one for production (`docker-compose.production.yml`).

### Development with Docker

```bash
docker-compose -f docker-compose.development.yml up --build
```

- Access the app at [http://localhost:3000](http://localhost:3000).
- Code changes on your host machine automatically sync to the Docker container if mounted.

### Production with Docker

```bash
docker-compose -f docker-compose.production.yml up --build
```

- Builds and runs an **nginx**-based Docker image to serve your compiled app at [https://localhost](https://localhost).

### Frequently Used Commands

- **`docker-compose -f docker-compose.production.yml down --volumes --remove-orphans --rmi all`**  
  Tears down all services, removing volumes, orphan containers, and images.
- **`docker-compose -f docker-compose.development.yml up --build`**  
  Builds and starts the **development** service.
- **`docker-compose -f docker-compose.production.yml up --build`**  
  Builds and starts the **production** service.
- **`docker-compose build --no-cache -f docker-compose.development.yml app`**
  Rebuilds the **development** service without using any cached layers.

---

## Internationalization (i18n)

- This boilerplate includes **i18next** with **react-i18next**, configured to detect language and load translations dynamically.
- Default languages available in `src/assets/locales`: `en` (English) and `ru` (Russian).
- Update or add your own translation files to the corresponding `locales` directory.
