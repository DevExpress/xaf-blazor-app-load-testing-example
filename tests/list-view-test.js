async function listViewTest(page) {
    await page.waitForSelector('.dxbs-grid .card');

    await page.evaluate(() => {
        window.scrollTo(0, window.document.body.scrollHeight);
    });

    for (let i = 0; i < 19; i++) {
        await page.waitForSelector('[data-args="PBN"] div svg');

        const nextPageButton = await page.$('[data-args="PBN"] div svg');
        await nextPageButton.click();

        await page.waitForTimeout(500);

        await page.waitForFunction(`document.querySelector(".dxbs-grid .page-link input").value === "${i + 2}"`);

        await page.waitForTimeout(1000);
    }
}

module.exports = listViewTest;
