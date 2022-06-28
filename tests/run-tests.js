const { Cluster }  = require('puppeteer-cluster');
const listViewTest = require('./list-view-test');
const detailViewTest = require('./detail-view-test');

async function runTestFunc (page, url, instance, testFunc) {
    const { retry, takeScreenshot } = require('./utils');

    await retry(() => page.goto(url), 1000);

    try {
        await testFunc(page);
    }

    catch (err) {
        await takeScreenshot(page, instance);

        throw err;
    }
}

async function runTests(url, concurrency, headless) {
    const cluster = await Cluster.launch({
        puppeteerOptions: { headless, slowMo: 50, args: ['--ignore-certificate-errors'] },
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: concurrency,
        monitor: false,
        timeout: 600000
    });

    const startTime = Date.now();

    let succededTests = 0;

    await Promise.all(new Array(concurrency).fill('').map((item, index) => cluster.execute(url, async ({ page, data: url }) => {
        try {
            await runTestFunc(page, `${url}/StickyNote_ListView`, index, listViewTest);
            await runTestFunc(page, `${url}/Employee_ListView`, index, detailViewTest);

            succededTests++;

            console.log(`Worker ${index} finished successfully.`);
        }
        catch (err) {
            console.log(`Worker ${index} failed.`);
            console.log(err);
        }
            
    })));

    const duration = (Date.now() - startTime) / 1000;

    console.log(`${concurrency - succededTests} of ${concurrency} instances are failed.`);
    console.log(`All tests took ${duration} seconds`);

    await cluster.idle();
    await cluster.close();

    if (succededTests !== concurrency)
        throw new Error('Some test instances are failed');
};

module.exports = runTests;
