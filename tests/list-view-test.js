const fs = require('fs');
const path = require('path');

async function listViewTest({ page, data: url }) {
    const startTime = Date.now();

    const { retry } = require('./utils');

    await retry(() => page.goto(`${url}StickyNote_ListView`), 1000);

    try {
        await page.waitForSelector('.dxbs-grid .card');

        await page.evaluate(() => {
            window.scrollTo(0, window.document.body.scrollHeight);
        });

        for (let i = 0; i < 19; i++) {
            const nextPageButton = await page.waitForSelector('[data-args="PBN"] div svg');

            await nextPageButton.click();

            await page.waitForFunction(`document.querySelector(".dxbs-grid .page-link input").value === "${i + 200}"`);
            await page.waitForTimeout(500);
        }
    }
    catch (err) {
        const dir = path.resolve(path.join(__dirname, '../screenshots'));

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        await page.screenshot({ path: 'screenshots/screenshot.png', type: 'png' });

        throw err;
    }

    return Date.now() - startTime;
}

module.exports = listViewTest;
