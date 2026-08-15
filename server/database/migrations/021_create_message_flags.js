exports.up = function(knex) {
  return knex.schema.createTable('message_flags', (table) => {
    table.increments('id').primary();
    table.integer('message_id').unsigned().notNullable()
      .references('id').inTable('messages').onDelete('CASCADE');
    table.text('reason');
    table.jsonb('flagged_words');
    table.enum('severity', ['low', 'medium', 'high', 'critical']).defaultTo('low');
    table.enum('status', ['pending', 'reviewed', 'dismissed', 'actioned']).defaultTo('pending');
    table.integer('reviewed_by').unsigned().references('id').inTable('users');
    table.timestamp('reviewed_at');
    table.timestamps(true, true);
    table.index('message_id');
    table.index('status');
    table.index('severity');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('message_flags');
};
