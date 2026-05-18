# Testing Guide

This repository includes comprehensive testing infrastructure to ensure code quality, performance, and accessibility.

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Tests Locally

**Unit & Component Tests:**

```bash
npm run test              # Run once
npm run test:watch       # Watch mode
npm run test:ui          # Visual UI
npm run test:coverage    # With coverage report
```

**End-to-End Tests:**

```bash
npm run test:e2e         # Run all tests
npm run test:e2e:ui      # Visual mode
npm run test:e2e:debug   # Debug mode
```

**Code Quality:**

```bash
npm run lint             # ESLint checks
npm run format:check     # Prettier formatting check
npm run format           # Auto-format code
```

**Performance:**

```bash
npm run lighthouse       # Run Lighthouse CI
```

## Pre-commit Hooks

Husky automatically runs quality checks before commits:

- Code formatting with Prettier
- Linting with ESLint
- Unit tests

This prevents committing code that doesn't meet quality standards.

## CI/CD Pipeline

GitHub Actions runs the full test suite on every PR:

1. **Lint Job** - ESLint + Prettier
2. **Build Job** - Next.js compilation
3. **Unit Tests** - Vitest with coverage
4. **E2E Tests** - Playwright tests
5. **Lighthouse** - Performance metrics (optional, after build)

## Test Files

- **Unit tests:** `src/__tests__/`
- **E2E tests:** `e2e/`

## Writing Tests

### Unit/Component Tests (Vitest + React Testing Library)

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('user can submit story', async ({ page }) => {
  await page.goto('/submit');
  await page.fill('input[name="title"]', 'My Story');
  await page.click('button[type="submit"]');
  await expect(page).toHaveTitle(/success/i);
});
```

## Coverage Goals

- **Line Coverage:** 70%+
- **Branch Coverage:** 65%+
- **Function Coverage:** 70%+
- **Statement Coverage:** 70%+

## Troubleshooting

### Tests not running

```bash
npm install
npm run test
```

### Playwright browser issues

```bash
npx playwright install --with-deps
```

### Lint errors

```bash
npm run format  # Auto-fix formatting
npm run lint    # Check remaining issues
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
