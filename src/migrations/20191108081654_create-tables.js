exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .text('name', 128)
        .unique()
        .notNullable();
      tbl.text('description', 256);
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl
        .text('name', 128)
        .notNullable()
        .unique();
      tbl.text('description', 128);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE');
      tbl.text('description', 256).notNullable();
      tbl.text('notes');
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
    })
    .createTable('project_resources', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE');
      tbl
        .integer('resources_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
