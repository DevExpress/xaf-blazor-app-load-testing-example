async function listViewTest({ page, data: url }) {
    const startTime = Date.now();

    const { retry, takeScreenshot } = require('./utils');

    await retry(() => page.goto(`${url}Employee_ListView`), 1000);

    try {
        for (let i = 0; i < 5; i++) {
            await page.waitForSelector('.dxbs-grid .card');
            await page.waitForSelector('tr.cursor-pointer');

            const rows = await page.$$('tr.cursor-pointer');

            await rows[i].click();

            await page.waitForTimeout(1500);

            // const lastName = await page.$('input[name="LastName"]');
            // await lastName.type(`${i} - employee`);

            await page.waitForSelector('input[name="FirstName"]');

            const firstName = await page.$('input[name="FirstName"]');
            await firstName.click();

            await page.waitForTimeout(500);

            const saveButton = await page.waitForSelector('button[data-action-name="Save"]');
            await saveButton.click();

            await page.waitForSelector('button[data-action-name="Save"].disabled');

            const backButton = await page.waitForSelector('button[data-action-name="Back"]');
            await backButton.click();
        }
    }
    catch (err) {
        await takeScreenshot(page);

        throw err;
    }

    return Date.now() - startTime;
}

module.exports = listViewTest;
