async function detailViewTest(page) {
    for (let i = 0; i < 5; i++) {
        await page.waitForSelector('.dxbs-grid .card');
        await page.waitForSelector('tr.cursor-pointer');

        const rows = await page.$$('tr.cursor-pointer');

        await page.waitForTimeout(500);

        const row = await rows[i].$('td.xaf-action');

        await row.click();

        await page.waitForSelector('input[name="FirstName"]');

        // const firstName = await page.$('input[name="FirstName"]');
        // await firstName.click();

        await page.goBack();
    }
}

module.exports = detailViewTest;
