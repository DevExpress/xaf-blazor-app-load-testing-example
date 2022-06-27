const fs = require('fs');
const path = require('path');

function retry(fn, ms) {
    return new Promise(resolve => {
        fn()
            .then(resolve)
            .catch(() => {
                setTimeout(() => {
                    console.log('retrying...');
                    retry(fn, ms).then(resolve);
                }, ms);
            });
    });
}

async function takeScreenshot () {
    const dir = path.resolve(path.join(__dirname, '../screenshots'));

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    await page.screenshot({ path: `screenshots/${process.env.WORKER_NAME}_screenshot.png`, type: 'png' });
}

module.exports = { retry, takeScreenshot };