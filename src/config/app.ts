import SMTPTransport from "nodemailer/lib/smtp-transport";

// General configuration
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TIMEZONE;

// Cors configuration
export const corsOrigin = process.env.CORS_ORIGIN;

// Logging configuration
export const logDirectory = process.env.LOG_DIR;

// Redis configuration
export const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  pass: process.env.REDIS_PASS
}

// Cache configuration
export const cache = {
  contentCacheDuration: parseInt(
    process.env.CONTENT_CACHE_DURATION || '600000',
  ),
}

// Email configuration
export const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
} as SMTPTransport.Options;