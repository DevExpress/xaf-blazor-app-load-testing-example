const { Cluster }         = require('puppeteer-cluster');
const simpleNavigaionTest = require('./simple-navigation-test');


async function runTests (url, concurrency, headless) {
    const cluster = await Cluster.launch({
        puppeteerOptions: { headless,  args: [ '--ignore-certificate-errors' ] },
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: concurrency,
        monitor: true
    });

    await cluster.task(async ({ page, data }) => {
        await simpleNavigaionTest({ page, data });
    });

    await Promise.all(new Array(concurrency).fill('').map(i => cluster.execute(url)));

    await cluster.idle();
    await cluster.close();
};

module.exports = runTests;
