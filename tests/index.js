const runTests = require('./run-tests');

const DEFAULT_CONCURRENCY = 5;

const concurrency = process.argv[2] && parseInt(process.argv[2]) || DEFAULT_CONCURRENCY;

runTests('https://172.31.177.125:5002/', concurrency, true);
//Why puppeteer-cluster instead of puppeteer-loadtest? Supports the latest puppeteer version, zero vulnerabilites