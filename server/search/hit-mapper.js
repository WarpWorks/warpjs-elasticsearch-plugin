const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const CONTENT_LINK_RE = /{{(.*?),(.*?),(.*?)}}/g;

function contentLinkReplacer(match, label, type, id) {
    const href = RoutesInfo.expand('entity', { id, type });
    const previewUrl = RoutesInfo.expand('W2:portal:preview', { id, type });
    return `<a href="${href}" data-warpjs-action="preview" data-warpjs-preview-url="${previewUrl}">${label}<span class="glyphicon glyphicon-link"></span></a>`;
}

function convertCustomLink(text) {
    return (text || '').replace(CONTENT_LINK_RE, contentLinkReplacer);
}

module.exports = (hit) => {
    const doc = hit._source;
    const url = RoutesInfo.expand('entity', {
        type: doc.type,
        id: doc.id
    });

    const imageUrl = doc.imageUrl;
    delete doc.imageUrl;

    const resource = warpjsUtils.createResource(url, {
        title: doc.title,
        content: convertCustomLink(doc.snippet)
    });

    if (imageUrl) {
        resource.link('image', imageUrl);
    }

    return resource;
};
