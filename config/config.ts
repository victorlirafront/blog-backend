export const config = {
  development: {
    API_END_POINT: 'http://localhost:3002',
    CORS_ORIGIN: ['http://localhost:3000', 'http://localhost:3001'],
    SERVER_URL: (port: number) => `http://localhost:${port}`,
  },
  production: {
    API_END_POINT:
      'https://bossa-nova-solutions-challenge-production.up.railway.app',
    CORS_ORIGIN: [
      'https://bossa-nova-solutions-challenge-production.up.railway.app',
    ],
    SERVER_URL: () =>
      'https://bossa-nova-solutions-challenge-production.up.railway.app',
  },
};
