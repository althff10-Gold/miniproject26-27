exports.up = function(knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('type', 50).notNullable();
    table.string('title', 255).notNullable();
    table.text('message');
    table.string('link', 500);
    table.boolean('is_read').defaultTo(false);
    table.timestamps(true, true);
    table.index('user_id');
    table.index('is_read');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notifications');
};
