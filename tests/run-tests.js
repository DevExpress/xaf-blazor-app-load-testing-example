const { Cluster }  = require('puppeteer-cluster');
const listViewTest = require('./list-view-test');
const detailViewTest = require('./detail-view-test');

async function runTestFunc (page, url, worker, testFunc) {
    const { retry, takeScreenshot } = require('./utils');

    await retry(() => page.goto(url), 1000);

    try {
        await testFunc(page);
    }

    catch (err) {
        await takeScreenshot(page);

        console.log(`Worker ${worker} failed.`);

        throw err;
    }
}

async function runTests(url, concurrency, headless) {
    const cluster = await Cluster.launch({
        puppeteerOptions: { headless, slowMo: 50, args: ['--ignore-certificate-errors'] },
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: concurrency,
        monitor: false,
        timeout: 600000
    });

    const startTime = Date.now();

    await Promise.all(new Array(concurrency).fill('').map((item, index) => cluster.execute(url, async ({ page, data: url }) => {
        await runTestFunc(page, `${url}/StickyNote_ListView`, index, listViewTest);
        await runTestFunc(page, `${url}/Employee_ListView`, index, detailViewTest);
    })));

    const duration = (Date.now() - startTime) / 1000;

    console.log(`All tests took ${duration} seconds`);

    await cluster.idle();
    await cluster.close();
};

module.exports = runTests;
