exports.up = function(knex) {
  return knex.schema.createTable('quizzes', (table) => {
    table.increments('id').primary();
    table.integer('course_id').unsigned().notNullable()
      .references('id').inTable('courses').onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('description');
    table.integer('passing_score').defaultTo(60);
    table.integer('time_limit_minutes');
    table.integer('max_attempts').defaultTo(3);
    table.timestamps(true, true);
    table.index('course_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('quizzes');
};
