const path = require('path');
module.exports = {
    development: {
        'nosqldb': 'mongodb://localhost:27017/SPPA',
        'port': 3000,
        'dataPath': path.join(__dirname, 'data')
    },
    test: {
        'nosqldb': 'mongodb://localhost:27017/SPPAtest',
        'port': 8880,
        'dataPath': path.join(__dirname, 'data-test')
    }
}