# XAF Blazor load testing example

This repository contains a sample XAF Blazor application with high-load test scripts.

## Disclaimer

Since the Blazor Server technology uses WebSocket connection instead of HTTP requests, traditional tools like JMeter are not suitable for this task. Therefore, the following example is prepared with [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) and [https://github.com/thomasdondorf/puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster) , which allows us to run a lot of concurrent browser instances on a certain machine. Besides, we can test end user’s experience in case of moderate server usage/loading.

## Getting started

1. Clone this repository:
```
git clone https://github.com/Dmitry-Ostashev/xaf-blazor-app-load-testing-example.git
```
2. Build and run the application using Visual Studio or .NET SDK CLI

3. Go to the project's root directory:
```
cd xaf-blazor-app-load-testing-example
```
3. Install the Node.JS modules for running test scripts:
```
npm install
```
4. Launch the test scripts for running application using the following command. Specify the application url and a number of the concurrent browser instances:
```
node ./tests/index.js localhost:5000 30
```
## Overview

This repo contains a simple XAF Blazor application with several views. Also there are some test scripts (located in the `tests` directory).
These scripts allow running a lot of concurrent browser instances by using Puppeteer and puppeteer-cluster automation tools.

**Test Scripts**
There are two test script samples in this repo. For example, the `list-view-test.js` script opens a List View with 100 records per page and switches between pages:

```
const DXGRID           = '.dxbs-grid .card';
const NEXT_PAGE_BUTTON = '[data-args="PBN"] div svg';

async function listViewTest(page) {
    await page.waitForSelector(DXGRID, { timeout: 60000 });

    await page.evaluate(() => {
        window.scrollTo(0, window.document.body.scrollHeight);
    });

    for (let i = 0; i < 19; i++) {
        await page.waitForSelector(NEXT_PAGE_BUTTON);

        const nextPageButton = await page.$(NEXT_PAGE_BUTTON);
        await nextPageButton.click();

        await page.waitForTimeout(500);

        await page.waitForFunction(`document.querySelector(".dxbs-grid .page-link input").value === "${i + 2}"`);

        await page.waitForTimeout(1000);
    }
}

module.exports = listViewTest;
```

The `detail-view-test.js` is intended for checking Detail View concurrent loading.
The `run-tests.js` script launches all these tests with predefined concurrency and produces a report with information about successful and failed runs. Also, it can capture a screenshot when the test fails.

**Running tests on the GitHub Actions CI**
In the following example, we use a cloud virtual machine for building and running application and github-hosted runners for tests. This machine has pre-installed MySql database engine. You can deploy your app any way you want (local machine, cloud VM, Azure App Service, etc.).

The workflow described in the `deploy-app-linux.yaml` file is running manually. It buildls and runs app on the self-hosted runner and then, triggers another workflow (`load-tests-linux.yaml`) which runs load tests themselves. We use the aurelien-baudet/workflow-dispatch@v2    action for this purpose (https://github.com/marketplace/actions/workflow-dispatch-and-wait). Note that we need to store GitHub personal access token (PAT) in the PERSONAL_TOKEN secret.

So, two workflows are ready. You can launch the “Build and Run Application on Linux“ workflow, and it will trigger the “Load Testing”. Besides, you can deploy your app manually (e.g., to Azure App Services) and trigger just a second one with predefined application url.

