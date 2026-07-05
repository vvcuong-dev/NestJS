import { registerAs as registerAsConfig } from '@nestjs/config';

export default registerAsConfig('app', () => ({
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
}));
