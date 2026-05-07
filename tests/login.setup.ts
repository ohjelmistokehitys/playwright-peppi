import { expect, test } from '@playwright/test';

test('Login and save authentication state', async ({ page, context }) => {
    test.setTimeout(60_000);

    await page.goto('https://teacher.home.haaga-helia.fi/');

    await page.pause();

    await expect(page).toHaveTitle(/Etusivu/i, { timeout: 60_000 });

    await context.storageState({ path: "./storage.secret" })
});

