exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Master nodeJS',
          description: 'Become a NodeJs Guru',
          completed: false
        },
        {
          name: 'Build a CLI',
          description: 'Practice using NodeJs and build my own CLI',
          completed: false
        },
        {
          name: 'Project-3',
          description: 'This project is open for debate',
          completed: false
        }
      ]);
    });
};
