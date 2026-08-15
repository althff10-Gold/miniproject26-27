exports.up = function(knex) {
  return knex.schema.createTable('pitch_submissions', (table) => {
    table.increments('id').primary();
    table.integer('event_id').unsigned().notNullable()
      .references('id').inTable('pitch_events').onDelete('CASCADE');
    table.integer('startup_id').unsigned().notNullable()
      .references('id').inTable('startups').onDelete('CASCADE');
    table.integer('student_id').unsigned().notNullable()
      .references('id').inTable('students').onDelete('CASCADE');
    table.string('pitch_title', 255).notNullable();
    table.text('pitch_content');
    table.string('presentation_url', 500);
    table.string('video_url', 500);
    table.enum('status', ['draft', 'submitted', 'reviewed']).defaultTo('draft');
    table.timestamps(true, true);
    table.unique(['event_id', 'student_id']);
    table.index('event_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pitch_submissions');
};
