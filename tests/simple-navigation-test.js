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
