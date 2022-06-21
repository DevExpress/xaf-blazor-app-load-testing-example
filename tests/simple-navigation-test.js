async function simpleNavigaionTest({ page, data: url }) {
    const startTime = Date.now();

    const retry = (fn, ms) => new Promise(resolve => {
        fn()
            .then(resolve)
            .catch(() => {
                setTimeout(() => {
                    console.log('retrying...');
                    retry(fn, ms).then(resolve);
                }, ms);
            })
    });

    await retry(() => page.goto(url), 1000);

    try {
        await page.waitForSelector('.dxbs-grid div');

        await page.evaluate(() => {
            window.scrollTo(0, window.document.body.scrollHeight);
          });

        for (let i = 0; i < 19; i++) {
            const nextPageButton = await page.waitForSelector('[data-args="PBN"] div svg');

            await nextPageButton.click();

            await page.waitForFunction(`document.querySelector(".dxbs-grid .page-link input").value === "${i + 2}"`);
            await page.waitForTimeout(500);
        }
    }
    catch (err) {
        await page.screenshot({ path: 'screenshot.png', type: 'png' });

        throw err;
    }

    return Date.now() - startTime;
}

module.exports = simpleNavigaionTest;
