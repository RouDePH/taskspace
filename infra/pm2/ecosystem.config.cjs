const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

module.exports = {
  apps: [
    {
      name: 'taskspace-api',
      cwd: backendDir,
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 3000,
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
      script: 'node',
      args: './node_modules/.bin/react-router-serve ./build/server/index.js --host 0.0.0.0 --port 4173',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.FRONTEND_HOST || '0.0.0.0',
        PORT: process.env.FRONTEND_PORT || 4173,
      },
      env_file: path.join(frontendDir, '.env.production'),
      max_restarts: 5,
      max_memory_restart: '256M',
    },
  ],
};
