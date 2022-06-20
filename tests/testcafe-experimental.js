import { Selector } from 'testcafe';

fixture`Experimental`
    .page`http://localhost:5000/`;

test('Test', async t => {
    await t.expect(Selector('td', { timeout: 20000 }).withText('Note 0').exists).ok({ timeout: 20000 });
});