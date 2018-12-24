const makeStorage = require('./make-storage');
const makeMixin = require('./make-mixin');

const install = (Vue, schema, dataKey = 'storage') => {
  const storage = makeStorage(schema);
  return Vue.mixin(makeMixin(storage, dataKey));
};

module.exports = { install };
