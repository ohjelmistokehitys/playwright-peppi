# Playwright automation for Peppi portal

This repository contains Playwright scripts for automating tasks in Peppi portal.

## Files

- `tests/login.setup.ts`: manual login step (uses `page.pause()`) and saves `storage.secret`.
- `tests/grading.spec.ts`: grading automation for the selected course and student list.
- `playwright.config.ts`: Playwright projects and test configuration.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

   Follow Playwright installatin instructions to set up the Chrome browser.

2. Run setup once to create auth state:
   ```bash
   npx playwright test --project=setup --headed
   ```

3. Run grading test:
   ```bash
   npx playwright test tests/grading.spec.ts --project=chromium --headed
   ```

## Notes

- Update course code and students in `tests/grading.spec.ts` before running.
- HTML reports are generated in `playwright-report/`.
