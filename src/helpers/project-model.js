const db = require('../db-config');

module.exports = {
  get() {
    return db('projects');
  },

  getById(id) {
    return db('projects')
      .where({ id })
      .first();
  },

  add(project) {
    return db('projects')
      .insert(project)
      .then(() => this.getProjects());
  },

  update(id, updated) {
    return db('projects')
      .where({ id })
      .update(updated)
      .then(id => (id > 0 ? this.getById(id) : null));
  },

  delete(id) {
    return db('projects')
      .where({ id: id })
      .del();
  },

  getTasks(id) {
    return db('tasks as t')
      .join('projects as p', 'p.id', 't.project_id')
      .select(
        't.description',
        'notes',
        't.completed',
        'p.description as project_description',
        'p.name as project_name'
      )
      .where({ 'p.id': id });
  },

  addTask(task, id) {
    const tasksData = {
      project_id: id,
      ...task
    };
    return db('tasks')
      .insert(task)
      .then(id => ({ ...tasksData, id: id[0] }));
  }
};
