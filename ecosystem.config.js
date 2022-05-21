module.exports = {
  apps: [
    {
      name: 'news-sender',
      script: 'dist/app.js',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
