exports.up = function(knex) {
  return knex.schema.createTable('pitch_events', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description');
    table.timestamp('event_date').notNullable();
    table.timestamp('submission_deadline');
    table.integer('max_participants');
    table.enum('status', ['upcoming', 'active', 'completed', 'cancelled']).defaultTo('upcoming');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
    table.index('status');
    table.index('event_date');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pitch_events');
};
