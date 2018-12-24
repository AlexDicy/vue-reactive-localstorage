const store = require('store');

module.exports = schema => {
  const local = store.getAll();

  return Object.keys(schema).reduce((acc, key) => {
    const value = local[key] || schema[key];
    return Object.assign({ [key]: value }, acc);
  }, {});
};
