exports.up = function(knex) {
  return knex.schema.createTable('learning_progress', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.integer('course_id').unsigned().notNullable()
      .references('id').inTable('courses').onDelete('CASCADE');
    table.integer('lesson_id').unsigned()
      .references('id').inTable('lessons').onDelete('CASCADE');
    table.boolean('completed').defaultTo(false);
    table.integer('progress_percentage').defaultTo(0);
    table.timestamp('completed_at');
    table.timestamps(true, true);
    table.unique(['student_id', 'course_id', 'lesson_id']);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('learning_progress');
};
