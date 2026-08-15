/**
 * Migration: Create guardian_student_links table
 * Links guardians to students with approval workflow
 */
exports.up = function(knex) {
  return knex.schema.createTable('guardian_student_links', (table) => {
    table.increments('id').primary();
    table.integer('guardian_id').unsigned().notNullable()
      .references('id').inTable('guardians').onDelete('CASCADE');
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.enum('status', ['pending', 'approved', 'rejected', 'revoked']).defaultTo('pending');
    table.string('guardian_code', 20); // Code student uses to link
    table.timestamp('approved_at');
    table.text('rejection_reason');
    table.timestamps(true, true);

    table.unique(['guardian_id', 'student_id']);
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('guardian_student_links');
};
