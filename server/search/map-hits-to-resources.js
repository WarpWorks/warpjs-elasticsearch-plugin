const hitMapper = require('./hit-mapper');

module.exports = (hits) => (hits || []).map(hitMapper);
