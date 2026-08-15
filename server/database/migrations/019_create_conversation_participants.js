exports.up = function(knex) {
  return knex.schema.createTable('conversation_participants', (table) => {
    table.increments('id').primary();
    table.integer('conversation_id').unsigned().notNullable()
      .references('id').inTable('conversations').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    table.timestamp('last_read_at');
    table.unique(['conversation_id', 'user_id']);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('conversation_participants');
};
