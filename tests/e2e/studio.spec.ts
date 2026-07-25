import { expect, test, type Page } from '@playwright/test';

const capacityCases = [
  { control: 'Låg', id: 'low' },
  { control: 'Normal', id: 'normal' },
  { control: 'Hög', id: 'high' },
] as const;

async function selectModule(page: Page, label: 'Home' | 'Planning' | 'Journal') {
  await page.getByRole('button', { name: label, exact: true }).click();
}

async function selectCapacity(page: Page, label: 'Låg' | 'Normal' | 'Hög') {
  await page.getByRole('button', { name: label, exact: true }).click();
}

async function expectSharedSafety(page: Page) {
  const phoneHasHorizontalOverflow = await page
    .getByTestId('phone-scroll')
    .evaluate((element) => element.scrollWidth > element.clientWidth);
  const undersizedButtons = await page.locator('button').evaluateAll((buttons) =>
    buttons
      .map((button) => {
        const rect = button.getBoundingClientRect();
        return {
          label: button.getAttribute('aria-label') ?? button.textContent,
          width: rect.width,
          height: rect.height,
        };
      })
      .filter(({ width, height }) => width < 48 || height < 48),
  );

  expect(phoneHasHorizontalOverflow).toBe(false);
  expect(undersizedButtons).toEqual([]);
  await expect(page.getByRole('navigation', { name: 'Huvudnavigation' })).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Huvudnavigation' }).getByRole('button'),
  ).toHaveCount(5);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Studio controls switch density and depth without losing the preview', async ({ page }) => {
  await page.getByRole('button', { name: 'Balanserad', exact: true }).click();
  await page.getByRole('button', { name: 'Instrument', exact: true }).click();

  await expect(
    page.getByText('home · normal · balanced · instrument', { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('main', { name: 'Telefonpreview' })).toBeVisible();
  await expectSharedSafety(page);
});

for (const capacity of capacityCases) {
  test(`Home is capacity-safe in ${capacity.id} mode`, async ({ page }) => {
    await selectModule(page, 'Home');
    await selectCapacity(page, capacity.control);

    await expect(
      page.getByText(`home · ${capacity.id} · calm · soft-3d`, { exact: true }),
    ).toBeVisible();
    await expect(page.getByText('Nästa mikrosteg', { exact: true })).toBeVisible();

    if (capacity.id === 'low') {
      await expect(page.getByText('Dagens steg', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Kapacitet idag', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByText('Dagens steg', { exact: true })).toBeVisible();
      await expect(page.getByText('Kapacitet idag', { exact: true })).toBeVisible();
    }

    await expectSharedSafety(page);
  });

  test(`Planning preserves P3 in ${capacity.id} mode`, async ({ page }) => {
    await selectModule(page, 'Planning');
    await selectCapacity(page, capacity.control);

    await expect(
      page.getByText(`planning · ${capacity.id} · calm · soft-3d`, { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'P3 Kanban', exact: true })).toBeVisible();
    await expect(page.getByText('Låst kärnflöde', { exact: true })).toBeVisible();

    if (capacity.id === 'high') {
      await expect(page.getByText('mockade poster väntar på sortering.')).toBeVisible();
    } else {
      await expect(page.getByText('mockade poster väntar på sortering.')).toHaveCount(0);
    }

    if (capacity.id === 'low') {
      const actionBox = await page.getByTestId('planning-primary-action').boundingBox();
      const dockBox = await page.getByTestId('floating-dock').boundingBox();
      expect(actionBox).not.toBeNull();
      expect(dockBox).not.toBeNull();
      expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(dockBox!.y);
    }

    await expectSharedSafety(page);
  });

  test(`Journal stays separate from Valvet in ${capacity.id} mode`, async ({ page }) => {
    await selectModule(page, 'Journal');
    await selectCapacity(page, capacity.control);

    await expect(
      page.getByText(`journal · ${capacity.id} · calm · soft-3d`, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Fristående från Valvets evidensflöden', { exact: true }),
    ).toBeVisible();
    await expect(page.getByLabel('Skrivyta')).toBeVisible();

    if (capacity.id === 'low') {
      await expect(page.getByText('Dagens reflektion', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Senaste inlägg', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByText('Dagens reflektion', { exact: true })).toBeVisible();
      await expect(page.getByText('Senaste inlägg', { exact: true })).toBeVisible();
    }

    await expectSharedSafety(page);
  });
}
