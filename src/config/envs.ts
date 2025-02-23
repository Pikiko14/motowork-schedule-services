import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  APP_ENV: string;
  JWT_SECRET: string;
  MONGO_ATLAS_URL: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  APP_ENV: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  MONGO_ATLAS_URL: joi.string().required()
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
  atlas_url: envVars.MONGO_ATLAS_URL
}