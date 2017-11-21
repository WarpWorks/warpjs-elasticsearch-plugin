const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (persistence, entity, instance) => {
    const payload = {
        type: instance.type, // FIXME: Need to find the immutable type.
        id: instance.id,
        title: entity.getDisplayName(instance),
        snippetTitle: null, // Will be set below
        snippet: null, // Will be set below
        imageUrl: null, // Will be set below
        content: null // Will be set below
    };

    return Promise.resolve()
        .then(() => entity.getOverviews(persistence, instance))
        .then((overviews) => {
            const first = overviews.shift();
            payload.snippetTitle = (first && first.Heading) || null;
            payload.snippet = (first && first.Content) || null;
            payload.content = overviews.reduce(
                (memo, overview) => {
                    if (overview.Heading) {
                        memo.push(overview.Heading);
                    }
                    if (overview.Content) {
                        memo.push(overview.Content);
                    }
                    return memo;
                },
                []
            ).join('\n') || null;
        })

        .then(() => entity.getSnippetImageUrl(persistence, instance))
        .then((imageUrl) => _.extend(payload, { imageUrl }))
        .then(() => payload)
    ;
};
