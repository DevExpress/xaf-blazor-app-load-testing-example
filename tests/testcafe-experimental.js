import { Selector } from 'testcafe';

fixture`Experimental`
    .page`http://localhost:3000/`;

test('Test', async t => {
    await t.expect(Selector('body').textContent).contains('Hello World!');
});