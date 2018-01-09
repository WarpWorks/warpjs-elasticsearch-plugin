const packageJson = require('./../package.json');

const basename = packageJson.name.replace(/@/g, '').replace(/\//g, '-');
const version = packageJson.version;
const versionedName = `${basename}-${version}`;

module.exports = {
    basename,
    version,
    versionedName,
    ROUTE_NAME: 'W2:plugin:search:search',
    assets: {
        css: `${versionedName}.min.css`,
        js: `${versionedName}.min.js`
    }
};
