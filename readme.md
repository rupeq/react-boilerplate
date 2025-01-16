# React Boilerplate

A starter template for rapidly developing React applications with Vite, TypeScript, testing (Vitest + Playwright), linting (ESLint + Stylelint + Prettier), and i18n support.

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
> Required Node.js version is pinned in `.nvmrc` (22.12.0) and PNPM is pinned in `package.json`.

### 5. (Optional) Run Setup Script

```bash
pnpm run setup
```

This script will:

- Re-initialize your Git repository
- Set up Husky for Git hooks
- Install necessary Playwright browsers

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
├── src
│   ├── App.tsx
│   ├── App.module.css
│   ├── App.test.tsx
│   ├── main.tsx
│   ├── common
│   │   ├── index.ts
│   │   ├── tests.tsx
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── i18n
│   │   ├── index.ts
│   │   ├── shared.ts
│   │   └── tests.ts
│   ├── assets
│   │   ├── locales
│   │   │   ├── en/translations.json
│   │   │   └── ru/translations.json
│   │   └── styles
│   │       └── normalize.css
│   └── types
│       ├── environment.d.ts
│       ├── i18next.d.ts
│       ├── reset.d.ts
│       └── vite-env.d.ts
├── .husky
│   ├── commit-msg       (calls `pnpm commitizen`)
│   └── pre-commit       (calls `pnpm lint-staged`)
├── docker-compose.development.yml
├── docker-compose.production.yml
├── Dockerfile.development
├── Dockerfile.production
├── nginx.conf
├── postcss.config.js
├── prettier.config.js
├── stylelint.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── vitest.setup.ts
└── ...
```

### Notable Configuration Files

- **`vite.config.ts`**: Vite configuration for local development and production builds.
- **`vitest.config.ts`** & **`vitest.setup.ts`**: Test runner (Vitest) configuration and setup.
- **`playwright.config.ts`**: End-to-end (E2E) test configuration for Playwright.
- **`eslint.config.js`** / **`stylelint.config.js`** / **`prettier.config.js`**: Linting and formatting configurations.
- **`lint-staged.config.js`**: Defines the tasks run by lint-staged on Git pre-commit hooks.
- **`.editorconfig`** / **`.browserlistrc`** / **`.nvmrc`**: Development environment, editor, and browser target configurations.
- **Docker and Nginx**: Config files (`Dockerfile.*`, `nginx.conf`, `docker-compose.*`) for containerized development and production.

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

### Git Hooks & Commits

This project comes with two hooks configured by [Husky](https://typicode.github.io/husky):

1. **`pre-commit`**: Runs `pnpm lint-staged` to lint your staged files before committing.
2. **`commit-msg`**: Runs `pnpm commitizen` to help create conventional commit messages.

You can also use **`pnpm commit`** to trigger a guided commit prompt (powered by commitizen and commitlint).

> If you wish to remove any hooks, simply delete the corresponding file in the `.husky` directory or remove Husky entirely.

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

- Builds and runs an **nginx**-based Docker image to serve your compiled app at [http://localhost:4000](http://localhost:4000).

### Frequently Used Commands

- **`docker-compose down --volumes --remove-orphans --rmi all`**  
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
