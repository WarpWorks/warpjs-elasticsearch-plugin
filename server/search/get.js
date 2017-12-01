const Promise = require('bluebird');
const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../../lib/constants');
const pagination = require('./pagination');
const mapHitsToResources = require('./map-hits-to-resources');
const search = require('./../../lib/search');

module.exports = (req, res) => {
    warpjsUtils.wrapWith406(res, {
        html: () => {
            warpjsUtils.sendIndex(res, "Search",
                [
                    `${req.app.get('base-url')}/assets/vendor.min.js`,
                    `${req.app.get('base-url')}/assets/${constants.SCRIPT_FILENAME}.min.js`
                ],
                `${req.app.get('base-url')}/assets/style.min.css`
            );
        },

        [warpjsUtils.constants.HAL_CONTENT_TYPE]: () => {
            const q = req.query.q;
            const p = req.query.p ? parseInt(req.query.p, 10) : 1;
            const config = req.app.get('plugin-config');
            const resource = warpjsUtils.createResource(req, {
                withSearch: (q !== undefined),
                p,
                q
            });

            if (q) {
                Promise.resolve()
                    .then(() => search(config, q, p))
                    .then((result) => Promise.resolve()
                        .then(() => {
                            resource.total = result.total;
                            resource.firstResult = Math.min((p - 1) * (config.pageSize || 10) + 1, result.total);
                            resource.lastResult = Math.min((p - 1) * (config.pageSize || 10) + result.hits.length, result.total);
                        })
                        .then(() => mapHitsToResources(result.hits))
                        .then((results) => resource.embed('results', results))
                        .then(() => pagination(result.total, q, p, config.pageSize))
                        .then((pages) => resource.embed('pages', pages))
                    )
                    .then(() => warpjsUtils.sendHal(req, res, resource, RoutesInfo))
                ;
            } else {
                warpjsUtils.sendHal(req, res, resource, RoutesInfo);
            }
        }
    });
};
