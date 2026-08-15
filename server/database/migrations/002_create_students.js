/**
 * Migration: Create students table
 * Extended profile for student/young founder role
 */
exports.up = function(knex) {
  return knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('school_name', 255);
    table.string('grade', 50);
    table.date('date_of_birth');
    table.text('interests');
    table.text('bio');
    table.string('city', 100);
    table.string('state', 100);
    table.boolean('guardian_approved').defaultTo(false);
    table.timestamps(true, true);

    table.index('user_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
};
