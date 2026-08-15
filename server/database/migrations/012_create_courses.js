exports.up = function(knex) {
  return knex.schema.createTable('courses', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description');
    table.string('category', 100);
    table.string('thumbnail_url', 500);
    table.enum('difficulty', ['beginner', 'intermediate', 'advanced']).defaultTo('beginner');
    table.integer('duration_minutes').defaultTo(0);
    table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('order_index').defaultTo(0);
    table.timestamps(true, true);
    table.index('status');
    table.index('category');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('courses');
};
