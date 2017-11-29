const warpjsUtils = require('@warp-works/warpjs-utils');

module.exports = (req, res) => {
    warpjsUtils.wrapWith406(res, {
        html: () => {
            warpjsUtils.sendIndex(res, "Search",
                [
                    `${req.app.get('base-url')}/assets/vendor.min.js`,
                    `${req.app.get('base-url')}/assets/search.min.js`
                ],
                `${req.app.get('base-url')}/assets/style.min.css`
            );
        },

        [warpjsUtils.constants.HAL_CONTENT_TYPE]: () => {
            res.status(200).send("HELLO JSON");
        }
    });
};
