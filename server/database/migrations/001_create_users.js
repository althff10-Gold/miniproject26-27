/**
 * Migration: Create users table
 * Base authentication table for all user roles
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.enum('role', ['student', 'guardian', 'mentor', 'admin']).notNullable();
    table.enum('status', ['pending', 'active', 'suspended', 'deactivated']).defaultTo('pending');
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.string('phone', 20);
    table.string('avatar_url', 500);
    table.timestamp('last_login');
    table.integer('failed_login_attempts').defaultTo(0);
    table.timestamp('locked_until');
    table.timestamps(true, true); // created_at, updated_at
    
    // Indexes
    table.index('email');
    table.index('role');
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
