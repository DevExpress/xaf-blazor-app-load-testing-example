const runTests = require('./run-tests');

const DEFAULT_CONCURRENCY = 5;
const DEFAULT_HOSTNAME    = 'localhost';

const hostname    = process.argv[2] || DEFAULT_HOSTNAME;
const concurrency = process.argv[3] && parseInt(process.argv[3]) || DEFAULT_CONCURRENCY;
const headless    = process.argv[4] !== 'false';

runTests(`http://${hostname}/`, concurrency, headless)
    .catch(err => {
        console.log(err);
        process.exit(1);
    });