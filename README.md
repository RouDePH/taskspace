# Production tooling

This folder keeps the production entrypoints for the Taskspace stack (Nest backend + React Router frontend).

- Frontend API base is driven by `VITE_API_BASE` (defaults to `/api/v1` in production; set it before `yarn build` or `docker build` if you need a different host).

## PM2 (bare metal)

- Copy envs: `cp backend/.env.pm2.example backend/.env.production` and `cp frontend/.env.pm2.example frontend/.env.production`, then fill values.
- Build once: `cd backend && yarn build`, `cd frontend && yarn build`.
- Start: from repo root run `pm2 start infra/pm2/ecosystem.config.cjs --env production`; stop with `pm2 delete taskspace-api taskspace-web`.

## Docker Compose (single host)

- Copy envs first: `cp backend/.env.example backend/.env.production` and `cp frontend/.env.example frontend/.env.production`.
- `cd infra && docker compose -f docker-compose.yml up --build -d`.
- Nginx listens on port 80 and proxies `/api` + `/docs` to the backend and everything else to the frontend.
- Database data is persisted in the `pgdata` volume; credentials come from `infra/docker-compose.yml` defaults (change for production).

## Nginx

- Reverse-proxy config lives at `infra/nginx/default.conf` (used by Docker Compose, can be dropped into any nginx install).
- Proxies `/api` to `backend:3000`, `/docs` to Swagger UI, everything else to `frontend:4173`; includes a `/healthz` endpoint.
