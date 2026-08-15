/**
 * Migration: Create mentor_assignments table
 */
exports.up = function(knex) {
  return knex.schema.createTable('mentor_assignments', (table) => {
    table.increments('id').primary();
    table.integer('mentor_id').unsigned().notNullable()
      .references('id').inTable('mentors').onDelete('CASCADE');
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.integer('assigned_by').unsigned()
      .references('id').inTable('users');
    table.enum('status', ['active', 'paused', 'completed', 'cancelled']).defaultTo('active');
    table.text('notes');
    table.timestamps(true, true);

    table.unique(['mentor_id', 'student_id']);
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mentor_assignments');
};
