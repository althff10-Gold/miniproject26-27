exports.up = function(knex) {
  return knex.schema.createTable('milestones', (table) => {
    table.increments('id').primary();
    table.integer('startup_id').unsigned().notNullable()
      .references('id').inTable('startups').onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('description');
    table.date('due_date');
    table.integer('order_index').defaultTo(0);
    table.enum('status', ['not_started', 'in_progress', 'completed', 'overdue']).defaultTo('not_started');
    table.timestamps(true, true);
    table.index('startup_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('milestones');
};
