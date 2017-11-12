const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const Logger = require('node-color-log');
const logger = new Logger();

function initEnv() {
    logger.log('Initial the environment.');
    // Check if the folder exist
    const dir = config.dataPath;
    if (!fs.existsSync(dir)) {
        logger.log(`Create folder ${dir}`);
        fs.mkdirSync(dir, '0755');
        fs.chmodSync(dir, '0755');
    }
    const subDirNames = [
        "cirrus", "cirrostratus", "cirrocumulus", "altocumulus",
        "altostratus", "stratocumulus", "stratus", "nimbostratus",
        "cumulus", "cumulonimbus"
    ];
    for (const subDirName of subDirNames) {
        const subDir = path.join(dir, subDirName);
        if (!fs.existsSync(subDir)) {
            logger.log(`Create folder ${subDir}`);
            fs.mkdirSync(subDir, '0755');
            fs.chmodSync(subDir, '0755');
        }
    }
}

module.exports = initEnv;