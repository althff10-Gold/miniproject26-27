exports.up = function(knex) {
  return knex.schema.createTable('milestone_progress', (table) => {
    table.increments('id').primary();
    table.integer('milestone_id').unsigned().notNullable()
      .references('id').inTable('milestones').onDelete('CASCADE');
    table.text('description');
    table.integer('percentage').defaultTo(0);
    table.integer('updated_by').unsigned()
      .references('id').inTable('users');
    table.timestamps(true, true);
    table.index('milestone_id');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('milestone_progress');
};
