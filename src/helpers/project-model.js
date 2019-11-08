const db = require('../db-config');

module.exports = {
  getResources() {
    return db('resources');
  },
  getProjects() {
    return db('projects');
  },
  getTasks() {
    return db('tasks as t')
      .join('projects as p', 'p.id', 't.project_id')
      .select('t.description', 'notes', 't.completed', 'name');
  },
  addProject(project) {
    return db('projects')
      .insert(project)
      .then(() => this.getProjects());
  },
  addResource(resource) {
    return db('resources')
      .insert(resource)
      .then(() => this.getResources());
  },
  addTask(task) {
    return db('tasks')
      .insert(task)
      .then(() => this.getTasks());
  },
  delete(id) {
    return db('projects')
      .where({ id: id })
      .del();
  }
};
