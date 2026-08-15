exports.up = function(knex) {
  return knex.schema.createTable('business_ideas', (table) => {
    table.increments('id').primary();
    table.integer('startup_id').unsigned().notNullable()
      .references('id').inTable('startups').onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('description');
    table.text('value_proposition');
    table.text('target_market');
    table.text('revenue_model');
    table.enum('status', ['draft', 'submitted', 'under_review', 'approved', 'rejected']).defaultTo('draft');
    table.text('feedback');
    table.timestamps(true, true);
    table.index('startup_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('business_ideas');
};
