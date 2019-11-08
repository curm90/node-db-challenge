const db = require('../db-config');

module.exports = {
  get() {
    return db('resources');
  },

  getById(id) {
    return db('resources')
      .where({ id })
      .first();
  },

  add(resource) {
    return db('resources')
      .insert(resource)
      .then(id => this.getById(id));
  },

  delete(id) {
    return db('resources')
      .where({ id: id })
      .del();
  }
};
