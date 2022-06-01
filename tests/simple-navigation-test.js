// import { Selector } from 'testcafe';

// fixture`Simple Page Navigation`
//     .page`https://localhost:5001/`;

// for (let i = 0; i < 100; i++) {
//     test(`New Test ${i}`, async t => {
//         await t
//             .expect(Selector('.dxbs-grid div').exists).ok()
//             .click(Selector('[data-args="PBN"] div svg use'))
//             .click(Selector('[data-args="PBN"] div svg'))
//             .click(Selector('[data-args="PBN"] div svg'))
//             .click(Selector('[data-args="PBN"] div svg'))
//             .click(Selector('[data-args="PBN"] div svg'))
//             .click(Selector('[data-args="PBN"] div svg'))
//             .click(Selector('[data-args="PBN"] div svg'));
//     });
// }

async function simpleNavigaionTest ({ page, data: url }) {
    await page.goto(url);

    await page.waitForSelector('.dxbs-grid div');
    
    for (let i = 0; i < 20; i++) {
        const nextPageButton = await page.waitForSelector('[data-args="PBN"] div svg');

        await nextPageButton.click();
        await page.waitForTimeout(500);
    }
}

module.exports = simpleNavigaionTest;
