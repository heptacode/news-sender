module.exports = {
  apps: [
    {
      name: 'thecamp-news-sender',
      script: 'dist/app.js',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
