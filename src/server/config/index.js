import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export default {
  port: env.PORT || '4242',
  host: env.HOST || 'localhost',
  isDev: env.NODE_ENV !== 'production',
  isBrowser: typeof window !== 'undefined',
  secret: env.SECRET || 'J was a woman',
  dbString: `${env.DB_URL}${env.DB_NAME}`,
  adminUser: env.ADMIN_USER,
  adminPwd: env.ADMIN_PASSWORD,
};
