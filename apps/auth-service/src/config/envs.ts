type JwtExpiry = `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}` | number;

export const configuration = () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as JwtExpiry,
  },
});
