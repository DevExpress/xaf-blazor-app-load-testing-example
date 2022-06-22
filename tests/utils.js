function retry (fn, ms) {
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

module.exports = { retry };