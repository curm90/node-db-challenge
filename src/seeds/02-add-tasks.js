exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          project_id: 1,
          description: 'task-1',
          notes: 'this is my first task',
          completed: false
        },
        {
          project_id: 1,
          description: 'task-2',
          notes: 'this is my second task',
          completed: false
        },
        {
          project_id: 1,
          description: 'task-3',
          notes: 'this is my third task',
          completed: false
        },
        {
          project_id: 2,
          description: 'task-1',
          notes: '1st task 2nd project',
          completed: false
        },
        {
          project_id: 2,
          description: 'task-2',
          notes: '2nd task 2nd project',
          completed: false
        },
        {
          project_id: 3,
          description: 'task-1',
          notes: 'this is my first task 3rd projec',
          completed: false
        }
      ]);
    });
};
