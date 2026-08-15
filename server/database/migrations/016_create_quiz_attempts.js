exports.up = function(knex) {
  return knex.schema.createTable('quiz_attempts', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.integer('quiz_id').unsigned().notNullable()
      .references('id').inTable('quizzes').onDelete('CASCADE');
    table.integer('score').defaultTo(0);
    table.integer('total_points').defaultTo(0);
    table.jsonb('answers'); // { "question_id": selected_answer_index }
    table.boolean('passed').defaultTo(false);
    table.integer('time_taken_seconds');
    table.timestamps(true, true);
    table.index(['student_id', 'quiz_id']);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('quiz_attempts');
};
