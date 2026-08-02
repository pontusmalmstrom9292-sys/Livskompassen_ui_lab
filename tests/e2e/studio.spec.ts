import { expect, test, type Page } from '@playwright/test';

const capacityCases = [
  { control: 'Låg', id: 'low' },
  { control: 'Normal', id: 'normal' },
  { control: 'Hög', id: 'high' },
] as const;

const densityCases = [
  { control: 'Lugn', id: 'calm' },
  { control: 'Balanserad', id: 'balanced' },
  { control: 'Full', id: 'full' },
] as const;

const depthCases = [
  { control: 'Platt', id: 'flat' },
  { control: 'Mjuk 3D', id: 'soft-3d' },
  { control: 'Instrument', id: 'instrument' },
] as const;

async function selectModule(page: Page, label: 'Home' | 'Planning' | 'Journal' | 'Family' | 'Vault') {
  await page.getByRole('button', { name: label, exact: true }).click();
}

async function selectCapacity(page: Page, label: 'Låg' | 'Normal' | 'Hög') {
  await page.getByRole('button', { name: label, exact: true }).click();
}

async function selectDensity(page: Page, label: 'Lugn' | 'Balanserad' | 'Full') {
  await page.getByRole('button', { name: label, exact: true }).click();
}

async function selectDepth(page: Page, label: 'Platt' | 'Mjuk 3D' | 'Instrument') {
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

    const nextStepBox = await page.getByText('Nästa mikrosteg', { exact: true }).boundingBox();
    const anchorBox = await page.getByText('Dagens ankare', { exact: true }).boundingBox();
    expect(nextStepBox).not.toBeNull();
    expect(anchorBox).not.toBeNull();
    expect(nextStepBox!.y).toBeLessThan(anchorBox!.y);

    if (capacity.id === 'low') {
      await expect(page.getByText('Dagens steg', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Kapacitet idag', { exact: true })).toHaveCount(0);

      const phoneBox = await page.getByTestId('phone-scroll').boundingBox();
      const dockBox = await page.getByTestId('floating-dock').boundingBox();
      expect(phoneBox).not.toBeNull();
      expect(dockBox).not.toBeNull();
      expect(phoneBox!.y + phoneBox!.height - (dockBox!.y + dockBox!.height)).toBeLessThanOrEqual(
        24,
      );
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

  test(`Family keeps Barnfokus visible in ${capacity.id} mode`, async ({ page }) => {
    await selectModule(page, 'Family');
    await selectCapacity(page, capacity.control);

    await expect(
      page.getByText(`family · ${capacity.id} · calm · soft-3d`, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Barnfokus - alltid synligt', { exact: true }),
    ).toBeVisible();
    await expect(page.getByText('Leo', { exact: true })).toBeVisible();

    if (capacity.id === 'low') {
      await expect(page.getByText('Kommande aktiviteter', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Hushållsstatus', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByText('Kommande aktiviteter', { exact: true })).toBeVisible();
      await expect(page.getByText('Hushållsstatus', { exact: true })).toBeVisible();
    }

    await expectSharedSafety(page);
  });

  test(`Vault preserves its locked evidence flow in ${capacity.id} mode`, async ({ page }) => {
    await selectModule(page, 'Vault');
    await selectCapacity(page, capacity.control);

    await expect(
      page.getByText(`vault · ${capacity.id} · calm · soft-3d`, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Evidensflödet är separat från Dagbokens personliga reflektioner.', {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole('tablist', { name: 'Valvets flikar' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Mönster', exact: true })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Orkester', exact: true })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Kunskapsbank', exact: true })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Aktörskarta', exact: true })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Manuell kontroll före promovering', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Granska och promovera manuellt', exact: true }),
    ).toBeVisible();

    if (capacity.id === 'low') {
      await expect(page.getByText('Nästa trygga steg', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByText('Nästa trygga steg', { exact: true })).toBeVisible();
    }

    const promotionActionBox = await page
      .getByRole('button', { name: 'Granska och promovera manuellt', exact: true })
      .boundingBox();
    const dockBox = await page.getByTestId('floating-dock').boundingBox();
    expect(promotionActionBox).not.toBeNull();
    expect(dockBox).not.toBeNull();
    expect(promotionActionBox!.y + promotionActionBox!.height).toBeLessThanOrEqual(dockBox!.y);

    await expectSharedSafety(page);
  });
}

test('Vault tabs reveal their distinct fictional evidence contexts', async ({ page }) => {
  await selectModule(page, 'Vault');

  const tabs = [
    ['Mönster', 'Fiktivt mönster: återkommande avbrott vid sena eftermiddagar.'],
    ['Orkester', 'Fiktiv orkestrering: samla underlag före nästa trygga steg.'],
    ['Kunskapsbank', 'Fiktiv kunskap: korta pauser kan minska belastningen före beslut.'],
    ['Aktörskarta', 'Fiktiv aktörskarta: Sam, mentor och vårdcentralen kan vara relevanta.'],
  ] as const;

  for (const [label, detail] of tabs) {
    const tab = page.getByRole('tab', { name: label, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveText(detail);
  }
});

test('Home supports every capacity, density and depth combination', async ({ page }) => {
  await selectModule(page, 'Home');

  for (const capacity of capacityCases) {
    await selectCapacity(page, capacity.control);

    for (const density of densityCases) {
      await selectDensity(page, density.control);

      for (const depth of depthCases) {
        await selectDepth(page, depth.control);
        await expect(
          page.getByText(
            `home · ${capacity.id} · ${density.id} · ${depth.id}`,
            { exact: true },
          ),
        ).toBeVisible();
        await expectSharedSafety(page);
      }
    }
  }
});

test('Home daily steps expose a working keyboard-safe completion control', async ({ page }) => {
  await selectModule(page, 'Home');
  await selectCapacity(page, 'Normal');

  const capacityFillColor = await page
    .getByRole('meter', { name: 'Kapacitet' })
    .locator('div')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(capacityFillColor).not.toBe('rgba(0, 0, 0, 0)');

  const firstStep = page.getByTestId('home-step-step-1');
  const secondStep = page.getByTestId('home-step-step-2');
  await expect(firstStep).toHaveAttribute('aria-pressed', 'false');
  await firstStep.focus();
  await expect(firstStep).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(secondStep).toBeFocused();
  const focusedStepShadow = await secondStep.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  );
  expect(focusedStepShadow).not.toBe('none');
  await secondStep.press('Enter');
  await expect(secondStep).toHaveAttribute('aria-pressed', 'true');
});
