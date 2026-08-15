exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('conversation_id').unsigned().notNullable()
      .references('id').inTable('conversations').onDelete('CASCADE');
    table.integer('sender_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.text('content').notNullable();
    table.boolean('is_flagged').defaultTo(false);
    table.boolean('is_moderated').defaultTo(false);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.index('conversation_id');
    table.index('sender_id');
    table.index('is_flagged');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages');
};
