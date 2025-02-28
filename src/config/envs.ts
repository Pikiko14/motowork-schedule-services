import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  APP_ENV: string;
  JWT_SECRET: string;
  MONGO_ATLAS_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASS: string;
  MOTOWORK_EMAIL: string;
  APP_URL: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  APP_ENV: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  MONGO_ATLAS_URL: joi.string().required(),
  SMTP_HOST: joi.string().required(),
  SMTP_PORT: joi.number().required(),
  SMTP_SECURE: joi.boolean().required(),
  SMTP_USER: joi.string().email().required(),
  SMTP_PASS: joi.string().required(),
  MOTOWORK_EMAIL: joi.string().required(),
  APP_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  app_env: envVars.APP_ENV,
  jwt_secret: envVars.JWT_SECRET,
  atlas_url: envVars.MONGO_ATLAS_URL,
  smtp_host: envVars.SMTP_HOST,
  smtp_port: envVars.SMTP_PORT,
  smtp_secure: envVars.SMTP_SECURE,
  smtp_user: envVars.SMTP_USER,
  smtp_pass: envVars.SMTP_PASS,
  motowork_email: envVars.MOTOWORK_EMAIL,
  app_url: envVars.APP_URL,
}