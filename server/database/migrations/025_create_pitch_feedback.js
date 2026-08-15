exports.up = function(knex) {
  return knex.schema.createTable('pitch_feedback', (table) => {
    table.increments('id').primary();
    table.integer('submission_id').unsigned().notNullable()
      .references('id').inTable('pitch_submissions').onDelete('CASCADE');
    table.integer('mentor_id').unsigned().notNullable()
      .references('id').inTable('mentors').onDelete('CASCADE');
    table.integer('rating').checkBetween([1, 10]);
    table.text('strengths');
    table.text('improvements');
    table.text('comments');
    table.integer('innovation_score').checkBetween([1, 10]);
    table.integer('feasibility_score').checkBetween([1, 10]);
    table.integer('presentation_score').checkBetween([1, 10]);
    table.timestamps(true, true);
    table.unique(['submission_id', 'mentor_id']);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pitch_feedback');
};
