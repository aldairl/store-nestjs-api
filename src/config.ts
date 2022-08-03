import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      uri: process.env.MONGO_URI,
      database: process.env.DATABASE_NAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'SECRET',
      expires: process.env.JWT_EXPIRES || '1d',
    },
  };
});
