/**
 * Migration: Create guardians table
 */
exports.up = function(knex) {
  return knex.schema.createTable('guardians', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('relationship', 50); // parent, legal_guardian, etc.
    table.string('occupation', 255);
    table.string('address', 500);
    table.timestamps(true, true);

    table.index('user_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('guardians');
};
