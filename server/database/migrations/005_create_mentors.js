/**
 * Migration: Create mentors table
 */
exports.up = function(knex) {
  return knex.schema.createTable('mentors', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('expertise', 255);
    table.string('organization', 255);
    table.text('bio');
    table.integer('years_of_experience');
    table.string('linkedin_url', 500);
    table.enum('verification_status', ['pending', 'under_review', 'verified', 'rejected']).defaultTo('pending');
    table.timestamps(true, true);

    table.index('user_id');
    table.index('verification_status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mentors');
};
