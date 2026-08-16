const knex = require('knex');
const knexConfig = require('../../knexfile');
const logger = require('./logger');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

/**
 * Initialize and test database connection
 */
async function initializeDatabase() {
  try {
    await db.raw('SELECT 1');
    logger.info(`Database connected (${environment})`);
    return true;
  } catch (error) {
    logger.warn(`PostgreSQL connection to ${environment} failed: ${error.message}.`);
    logger.warn('Server will run in resilient mode (PostgreSQL reconnection will be attempted on requests).');
    return false;
  }
}

module.exports = { db, initializeDatabase };
