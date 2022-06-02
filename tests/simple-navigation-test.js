async function simpleNavigaionTest({ page, data: url }) {
    const startTime = Date.now();

    await page.goto(url);

    try {
        await page.waitForSelector('.dxbs-grid div');

        for (let i = 0; i < 20; i++) {
            const nextPageButton = await page.waitForSelector('[data-args="PBN"] div svg');

            await nextPageButton.click();
            await page.waitForTimeout(500);
        }
    }
    catch (err) {
        await page.screenshot({ path: 'screenshot', type: 'png' });

        throw err;
    }

    return Date.now() - startTime;
}

module.exports = simpleNavigaionTest;
