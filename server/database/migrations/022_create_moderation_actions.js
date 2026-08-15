exports.up = function(knex) {
  return knex.schema.createTable('moderation_actions', (table) => {
    table.increments('id').primary();
    table.integer('flag_id').unsigned().notNullable()
      .references('id').inTable('message_flags').onDelete('CASCADE');
    table.enum('action_type', ['approve', 'delete', 'warn_user', 'suspend_user']);
    table.integer('taken_by').unsigned().notNullable()
      .references('id').inTable('users');
    table.text('notes');
    table.timestamps(true, true);
    table.index('flag_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('moderation_actions');
};
