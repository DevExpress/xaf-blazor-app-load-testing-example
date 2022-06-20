const runTests = require('./run-tests');

const DEFAULT_CONCURRENCY = 5;
const DEFAULT_HOSTNAME    = 'localhost';

const concurrency = process.argv[3] && parseInt(process.argv[3]) || DEFAULT_CONCURRENCY;
const hostname    = process.argv[2] || DEFAULT_HOSTNAME;

runTests(`http://${hostname}:5002/`, concurrency, true);
//Why puppeteer-cluster instead of puppeteer-loadtest? Supports the latest puppeteer version, zero vulnerabilities