import { Selector } from 'testcafe';

fixture`List View`
    .page`${process.env.APP_URL}:5002`;

for (let i = 0; i < 30; i ++) {
    test(`List View Pages Navigation - ${i}`, async t => {
        await t.expect(Selector('.dxbs-grid .card').exists).ok({ timeout: 30000 });

        for (let j = 0; j < 19; j++) {
            await t
                .click('[data-args="PBN"] div svg')
                .expect(Selector('.dxbs-grid .page-link input').value).eql(`${j + 2}`)
                .wait(500);
        }
    });
}