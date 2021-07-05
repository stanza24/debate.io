const fs = require('fs');

/**
 * читать все папки по заданному пути.
 *
 * @param {string} source
 * @returns {Array<string>}
 */
module.exports = (source) =>
    fs
        .readdirSync(source, {withFileTypes: true})
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
