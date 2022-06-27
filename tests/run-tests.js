const { Cluster }  = require('puppeteer-cluster');
const listViewTest = require('./list-view-test');
const detailViewTest = require('./detail-view-test');

async function runTests(url, concurrency, headless) {
    const cluster = await Cluster.launch({
        puppeteerOptions: { headless, slowMo: 50, args: ['--ignore-certificate-errors'] },
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: concurrency,
        monitor: false,
        timeout: 600000
    });


    await cluster.task(async ({ page, data }) => {
        await listViewTest({ page, data });
        await detailViewTest({ page, data });
    });

    const startTime = Date.now();

    await Promise.all(new Array(concurrency).fill('').map(i => cluster.execute(url)));

    const duration = (Date.now() - startTime) / 1000;

    console.log(`All tests took ${duration} seconds`);

    await cluster.idle();
    await cluster.close();
};

module.exports = runTests;
