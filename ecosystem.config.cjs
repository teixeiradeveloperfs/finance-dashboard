module.exports = {
  apps: [
    {
      name: 'finance-backend',
      cwd: './backend',
      script: 'pnpm',
      args: 'start',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'finance-frontend',
      cwd: './frontend',
      script: 'pnpm',
      args: 'start',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        NUXT_HOST: '127.0.0.1',
        NUXT_PORT: 3000
      }
    }
  ]
}
