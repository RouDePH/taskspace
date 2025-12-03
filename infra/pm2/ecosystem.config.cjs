const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

module.exports = {
  apps: [
    {
      name: 'taskspace-api',
      cwd: backendDir,
      script: 'dist/src/main.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 8080,
      },
      env_file: path.join(backendDir, '.env.production'),
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      max_restarts: 5,
      max_memory_restart: '512M',
    },
    {
      name: 'taskspace-web',
      cwd: frontendDir,
      script: './node_modules/.bin/react-router-serve',
      args: './build/server/index.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.FRONTEND_HOST || '0.0.0.0',
        PORT: process.env.FRONTEND_PORT || 3000,
      },
      env_file: path.join(frontendDir, '.env.production'),
      max_restarts: 5,
      max_memory_restart: '256M',
    },
  ],
};
