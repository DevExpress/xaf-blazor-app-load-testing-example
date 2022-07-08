async function detailViewTest(page) {
    for (let i = 0; i < 20; i++) {
        await page.waitForSelector('.dxbs-grid .card');
        await page.waitForSelector('.xaf-loading-content[style*="hidden"]');
        await page.waitForXPath(`//td[contains(., 'Employee ${i}#')]`);

        const row = await page.$x(`//td[contains(., 'Employee ${i}#')]`);

        await page.waitForTimeout(500);

        await row[0].click();

        await page.waitForSelector('input[name="FirstName"]');
        await page.waitForSelector('.xaf-loading-content[style*="hidden"]');
        await page.waitForTimeout(1000);
        await page.goBack();
    }
}

module.exports = detailViewTest;
