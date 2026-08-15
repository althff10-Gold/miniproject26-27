/**
 * Migration: Create startups table
 */
exports.up = function(knex) {
  return knex.schema.createTable('startups', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.text('description');
    table.string('industry', 100);
    table.string('logo_url', 500);
    table.enum('stage', ['ideation', 'validation', 'development', 'launch', 'growth']).defaultTo('ideation');
    table.enum('status', ['draft', 'active', 'paused', 'completed']).defaultTo('draft');
    table.text('problem_statement');
    table.text('solution');
    table.text('target_audience');
    table.timestamps(true, true);

    table.index('student_id');
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('startups');
};
