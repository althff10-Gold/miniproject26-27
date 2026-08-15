exports.up = function(knex) {
  return knex.schema.createTable('conversations', (table) => {
    table.increments('id').primary();
    table.string('title', 255);
    table.enum('type', ['direct', 'group', 'mentorship']).defaultTo('direct');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('conversations');
};
