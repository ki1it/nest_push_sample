import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

const envVarsSchema: Joi.ObjectSchema = Joi.object({

  FIREBASE_SERVICE_ACCOUNT_KEY: Joi.string()
    .default('')
    .allow(''),
});

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const { error, value: validatedEnvConfig } = envVarsSchema.validate(
  process.env,
  {
    allowUnknown: true,
  },
);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const FIREBASE_SERVICE_ACCOUNT_KEY =
  validatedEnvConfig.FIREBASE_SERVICE_ACCOUNT_KEY;
