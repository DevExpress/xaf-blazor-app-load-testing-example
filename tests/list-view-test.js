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
