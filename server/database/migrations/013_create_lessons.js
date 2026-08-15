exports.up = function(knex) {
  return knex.schema.createTable('lessons', (table) => {
    table.increments('id').primary();
    table.integer('course_id').unsigned().notNullable()
      .references('id').inTable('courses').onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('content');
    table.string('video_url', 500);
    table.integer('duration_minutes').defaultTo(0);
    table.integer('order_index').defaultTo(0);
    table.timestamps(true, true);
    table.index('course_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('lessons');
};
