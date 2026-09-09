import { expect, test } from "@playwright/test";

test("fragrance calculator computes fragrance oil for the default soy wax recipe", async ({
  page,
}) => {
  await page.goto("/fragrance-calculator");
  // Default: Soy wax (container) 500g at its 6% recommended load.
  await expect(page.getByTestId("result")).toContainText("Fragrance oil: 30 g");
  await expect(page.getByTestId("result")).toContainText("Total finished weight: 530 g");
  await expect(page.getByTestId("result")).toContainText("fragrance content");
});

test("fragrance calculator recomputes when wax weight changes", async ({ page }) => {
  await page.goto("/fragrance-calculator");
  await page.getByLabel("Wax weight").fill("1000");
  await expect(page.getByTestId("result")).toContainText("Fragrance oil: 60 g");
});

test("fragrance calculator rejects a load above the wax's maximum", async ({ page }) => {
  await page.goto("/fragrance-calculator");
  await page.getByLabel("Fragrance load percent").fill("50");
  await expect(page.getByTestId("result").getByRole("alert")).toContainText("maximum");
});

test("fragrance calculator switches wax type and updates the recommended default", async ({
  page,
}) => {
  await page.goto("/fragrance-calculator");
  await page.getByLabel("Wax type").selectOption("Beeswax (100%)");
  await expect(page.getByLabel("Fragrance load percent")).toHaveValue("4");
});

test("fragrance calculator supports a custom wax with a user-entered maximum", async ({
  page,
}) => {
  await page.goto("/fragrance-calculator");
  await page.getByLabel("Wax type").selectOption("Custom / other wax (enter your own maximum)");
  await page.getByLabel("Custom wax maximum percent").fill("15");
  await page.getByLabel("Fragrance load percent").fill("12");
  await expect(page.getByTestId("result")).not.toContainText("alert");
});

test("fragrance calculator rejects a custom maximum above the sanity ceiling", async ({
  page,
}) => {
  await page.goto("/fragrance-calculator");
  await page.getByLabel("Wax type").selectOption("Custom / other wax (enter your own maximum)");
  await page.getByLabel("Custom wax maximum percent").fill("30");
  await expect(page.getByTestId("result").getByRole("alert")).toContainText(
    "any real candle wax"
  );
});

test("wax fragrance reference page lists common wax types", async ({ page }) => {
  await page.goto("/wax-fragrance-reference");
  await expect(page.getByRole("cell", { name: /Soy wax/ })).toBeVisible();
  await expect(page.getByRole("cell", { name: /Beeswax/ })).toBeVisible();
});

test("candle cost calculator computes total cost, per-candle cost, and suggested price", async ({
  page,
}) => {
  await page.goto("/candle-cost-calculator");
  await expect(page.getByTestId("result")).toContainText("Total batch cost: 21");
  await expect(page.getByTestId("result")).toContainText("Cost per candle: 4.2");
  await expect(page.getByTestId("result")).toContainText("Suggested price per candle: 7");
});

test("candle cost calculator recomputes when number of candles changes", async ({
  page,
}) => {
  await page.goto("/candle-cost-calculator");
  await page.getByLabel("Number of candles").fill("10");
  // Wax/fragrance cost stay fixed (5 + 2 = 7), but wick/container/other
  // costs are per-candle and now apply to 10 candles: 3 + 20 + 5 = 28.
  // Total 35 / 10 candles = 3.5 per candle.
  await expect(page.getByTestId("result")).toContainText("Total batch cost: 35");
  await expect(page.getByTestId("result")).toContainText("Cost per candle: 3.5");
});

test("candle cost calculator rejects a negative input", async ({ page }) => {
  await page.goto("/candle-cost-calculator");
  await page.getByLabel("Container cost per candle").fill("-5");
  await expect(page.getByTestId("result").getByRole("alert")).toBeVisible();
});

test("homepage links reach every tool", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tool-card-fragrance-calculator").click();
  await expect(page).toHaveURL(/\/fragrance-calculator$/);
});
