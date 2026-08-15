exports.up = function(knex) {
  return knex.schema.createTable('quiz_questions', (table) => {
    table.increments('id').primary();
    table.integer('quiz_id').unsigned().notNullable()
      .references('id').inTable('quizzes').onDelete('CASCADE');
    table.text('question_text').notNullable();
    table.jsonb('options').notNullable(); // ["Option A", "Option B", "Option C", "Option D"]
    table.integer('correct_answer').notNullable(); // Index of correct option (0-based)
    table.integer('points').defaultTo(1);
    table.text('explanation');
    table.integer('order_index').defaultTo(0);
    table.timestamps(true, true);
    table.index('quiz_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('quiz_questions');
};
