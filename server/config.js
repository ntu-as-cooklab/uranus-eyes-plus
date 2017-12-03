const path = require('path');
module.exports = {
    product: {
        'nosqldb': 'mongodb://localhost:27017/uranus',
        'port': 8000,
        'dataPath': path.join(__dirname, 'data')
    },
    development: {
        'nosqldb': 'mongodb://localhost:27017/uranusDev',
        'port': 3000,
        'dataPath': path.join(__dirname, 'data-dev')
    },
    test: {
        'nosqldb': 'mongodb://localhost:27017/uranusTest',
        'port': 8888,
        'dataPath': path.join(__dirname, 'data-test')
    }
}