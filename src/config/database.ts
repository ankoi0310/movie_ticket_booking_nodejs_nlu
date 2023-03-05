export const database = {
  host: process.env.DB_HOST || '',
  name: process.env.DB_NAME || '',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
}