const generateId = require('./generate-id');
const payload = require('./payload');

module.exports = {
    generateId: (instance) => generateId(instance),
    payload: (persistence, entity, instance) => payload(persistence, entity, instance)
};
