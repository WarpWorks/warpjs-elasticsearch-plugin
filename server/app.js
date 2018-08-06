const express = require('express');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
const path = require('path');
const warpjsUtils = require('@warp-works/warpjs-utils');

const repoRoot = path.dirname(require.resolve('./../package.json'));
const routes = require('./routes');

module.exports = (config, warpCore, baseUrl, staticUrl) => {
    const app = express();

    baseUrl = (baseUrl === '/') ? '' : baseUrl;

    app.set('view engine', 'hbs');
    app.set('views', warpjsUtils.getHandlebarsViewsDir());

    const handlebarsPartialsDir = warpjsUtils.getHandlebarsPartialsDir();
    hbsUtils.registerWatchedPartials(
        handlebarsPartialsDir,
        {
            precompile: true,
            name: (template) => template.replace(/_/g, '-')
        }
    );

    app.set('base-url', baseUrl);
    app.set('static-url', staticUrl);
    app.set('plugin-config', config);
    app.set('warpjs-core', warpCore);

    app.use('/assets', express.static(path.join(repoRoot, 'assets')));

    app.use(routes(baseUrl || '/').router);

    return app;
};
