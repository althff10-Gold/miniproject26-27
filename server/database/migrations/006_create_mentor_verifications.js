/**
 * Migration: Create mentor_verifications table
 * Stores verification documents and admin review
 */
exports.up = function(knex) {
  return knex.schema.createTable('mentor_verifications', (table) => {
    table.increments('id').primary();
    table.integer('mentor_id').unsigned().notNullable()
      .references('id').inTable('mentors').onDelete('CASCADE');
    table.string('document_type', 100); // degree, certification, id_proof
    table.string('document_url', 500);
    table.string('qualification', 255);
    table.string('institution', 255);
    table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending');
    table.integer('reviewed_by').unsigned()
      .references('id').inTable('users');
    table.text('review_notes');
    table.timestamp('reviewed_at');
    table.timestamps(true, true);

    table.index('mentor_id');
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mentor_verifications');
};
