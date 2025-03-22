module.exports = {
  MONGO_IP: process.env.MONGO_IP || 'mongo',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER || 'sanjeev',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'mypassword$$ythisyear',
  REDIS_URL: process.env.REDIS_URL || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET || 'orwepfEWJAFAO@R@#R232jrifn3oq3',
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || 'minio',
  MINIO_PORT: process.env.MINIO_PORT || 9000,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minioadmin',
  MINIO_USE_SSL: process.env.MINIO_USE_SSL === 'true' || false,
  MINIO_BUCKET: process.env.MINIO_BUCKET || 'uploads'
};
