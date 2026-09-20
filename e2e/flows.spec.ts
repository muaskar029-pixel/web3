import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function scan(page: Page, target: string) {
  await page.goto("/scan");
  await page.getByLabel("Tautan, alamat wallet, atau nama grup").fill(target);
  await page.getByRole("button", { name: "Scan Risiko", exact: true }).click();
  await expect(page).toHaveURL(/tracking\?case=/);
  await expect(
    page.getByRole("heading", { name: "Bukti di balik indikator" }),
  ).toBeVisible();
  return new URL(page.url()).searchParams.get("case")!;
}
async function connect(page: Page) {
  await page
    .getByRole("button", { name: "Connect Wallet", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Hubungkan wallet demo" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
}
async function stake(page: Page, amount = "0.1") {
  await page
    .getByRole("button", { name: "Stake", exact: true })
    .first()
    .click();
  await page.getByLabel("Nominal stake (ETH simulasi)").fill(amount);
  await page
    .getByRole("button", { name: "Konfirmasi Stake", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeHidden();
}
async function vote(page: Page, label: string) {
  await page.getByRole("radio", { name: label, exact: true }).check();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Tinjau Vote" }).click();
  await page
    .getByRole("button", { name: "Konfirmasi Vote", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Vote simulasi tercatat" }),
  ).toBeVisible();
}

test("scan, evidence, staking, reward, cross-tab tracker and persistent ledger", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/scan");
  await page.getByRole("button", { name: "Scan Risiko", exact: true }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "tidak boleh kosong",
  );
  const id = await scan(page, "claim-airdrop.example");
  await expect(page.locator(".risk-score strong")).toHaveText([
    "92",
    "88",
    "95",
  ]);
  await page.getByRole("button", { name: "Tambah Bukti" }).click();
  await page
    .getByLabel("Penjelasan bukti")
    .fill(
      "Pengelola meminta transfer sebelum penarikan dana; perlu verifikasi lebih lanjut.",
    );
  await page.getByRole("button", { name: "Simpan Bukti" }).click();
  await expect(page.locator(".community-reports")).toContainText(
    "Belum diverifikasi",
  );
  const validator = await context.newPage();
  await validator.goto("/validator");
  await connect(validator);
  await validator
    .getByRole("button", { name: "Stake", exact: true })
    .first()
    .click();
  await validator.getByLabel("Nominal stake (ETH simulasi)").fill("0.09");
  await validator.getByRole("button", { name: "Konfirmasi Stake" }).click();
  await expect(validator.getByRole("dialog").getByRole("alert")).toContainText(
    "Minimal staking",
  );
  await validator.getByLabel("Nominal stake (ETH simulasi)").fill("11");
  await validator.getByRole("button", { name: "Konfirmasi Stake" }).click();
  await expect(validator.getByRole("dialog").getByRole("alert")).toContainText(
    "Saldo dompet",
  );
  await validator.getByLabel("Nominal stake (ETH simulasi)").fill("0.1");
  await validator.getByRole("button", { name: "Konfirmasi Stake" }).click();
  await expect(validator.getByRole("dialog")).toBeHidden();
  await validator.getByRole("link", { name: "Telaah Kasus" }).click();
  await expect(validator).toHaveURL(`/validator/cases/${id}`);
  await expect(
    validator.getByRole("button", { name: "Tinjau Vote" }),
  ).toBeDisabled();
  await vote(validator, "Terindikasi phishing");
  await expect(page.locator(".tracker-message")).toContainText(
    "Hasil voting komunitas: Terindikasi phishing",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("shieldchain_vote_result")),
  ).toBe("Phishing");
  expect(
    await page.evaluate(() => localStorage.getItem("shieldchain_pending_url")),
  ).toBeNull();
  await page.reload();
  await expect(page.locator(".tracker-message")).toContainText(
    "Terindikasi phishing",
  );
  await page.goto("/ledger");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.locator("tbody")).toContainText("+0.05 ETH");
  await page.getByLabel("Cari transaksi").fill("not-a-match");
  await expect(
    page.getByRole("heading", { name: "Tidak ada transaksi yang cocok" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Hapus Filter" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.screenshot({ path: "docs/qa/ledger-desktop.png", fullPage: true });
  await page.goto(`/tracking?case=${id}`);
  await page.screenshot({
    path: "docs/qa/tracking-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    `/tracking?case=${id}`,
    `/validator/cases/${id}`,
    "/ledger",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await expect(page.locator(".ledger-mobile article")).toHaveCount(1);
  await page.screenshot({ path: "docs/qa/ledger-mobile.png", fullPage: true });
  await page.goto(`/tracking?case=${id}`);
  await page.screenshot({
    path: "docs/qa/tracking-mobile.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("slash exhausts stake, disconnect preserves balances, and old vote never leaks", async ({
  page,
}) => {
  const firstId = await scan(page, "example.com");
  await page.goto(`/validator/cases/${firstId}`);
  await expect(
    page.getByRole("heading", { name: "Stake diperlukan untuk vote" }),
  ).toBeVisible();
  await connect(page);
  await stake(page);
  await vote(page, "Tidak ditemukan indikasi utama");
  await page.locator("header").getByRole("button", { name: /0x4B/ }).click();
  await page.getByRole("button", { name: "Putuskan koneksi" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await connect(page);
  await page.goto("/validator");
  await expect(page.locator(".wallet-bar")).toContainText("9.90 ETH");
  const secondId = await scan(page, "ui.ac.id");
  await expect(page.locator(".risk-score strong")).toHaveText(["5", "4", "2"]);
  await expect(page.locator(".tracker-message")).toContainText(
    "Sedang dalam antrean",
  );
  await expect(page.locator(".tracker-message")).not.toContainText(
    "Hasil voting",
  );
  await page.goto(`/validator/cases/${secondId}`);
  await expect(
    page.getByRole("heading", { name: "Stake diperlukan untuk vote" }),
  ).toBeVisible();
  await page.goto("/validator");
  await expect(page.locator(".validator-stats")).toContainText("-0.10 ETH");
  await page.goto("/ledger");
  await page.getByLabel("Hasil simulasi").selectOption("slashed");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.locator("tbody")).toContainText("-0.10 ETH");
});

test("responsive layouts, both themes, keyboard, accessibility, and routes", async ({
  page,
}) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const mode of ["dark", "light"] as const) {
    await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
    for (const [name, width, height] of [
      ["desktop", 1440, 1000],
      ["tablet", 820, 1180],
      ["mobile", 390, 844],
    ] as const) {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `docs/qa/home-${name}-${mode}.png`,
        fullPage: true,
      });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Buka menu" }).click();
  await page
    .getByRole("navigation", { name: "Navigasi seluler" })
    .getByRole("link", { name: "Validator" })
    .click();
  await expect(page).toHaveURL("/validator");
  for (const route of [
    "/scan",
    "/tracking",
    "/ledger",
    "/validator",
    "/validator/cases/missing",
    "/methodology",
    "/not-a-page",
  ]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Lewati ke konten" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(errors).toEqual([]);
});
