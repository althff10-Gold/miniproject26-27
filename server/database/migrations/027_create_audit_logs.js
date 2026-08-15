exports.up = function(knex) {
  return knex.schema.createTable('audit_logs', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.string('action', 100).notNullable();
    table.string('entity_type', 100);
    table.integer('entity_id');
    table.jsonb('old_values');
    table.jsonb('new_values');
    table.string('ip_address', 45);
    table.text('user_agent');
    table.timestamps(true, true);
    table.index('user_id');
    table.index('action');
    table.index('entity_type');
    table.index('created_at');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('audit_logs');
};
