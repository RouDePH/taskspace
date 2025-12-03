# Production tooling

This folder keeps the production entrypoints for the Taskspace stack (Nest backend + React Router frontend).
- Frontend API base is driven by `VITE_API_BASE` (defaults to `/api/v1` in production; set it before `yarn build` or `docker build` if you need a different host).

## PM2 (bare metal)
- Copy envs: `cp backend/.env.example backend/.env.production` and `cp frontend/.env.example frontend/.env.production`, then fill values.
- Build once: `cd backend && yarn build`, `cd frontend && yarn build`.
- Start: from repo root run `pm2 start infra/pm2/ecosystem.config.cjs --env production`; stop with `pm2 delete taskspace-api taskspace-web`.

## Docker Compose (single host)
- Copy envs first: `cp backend/.env.production.example backend/.env.production` and `cp frontend/.env.production.example frontend/.env.production`.
- `cd infra && docker compose -f docker-compose.yml up --build -d`.
- Nginx listens on port 80 and proxies `/api` + `/docs` to the backend and everything else to the frontend.
- Database data is persisted in the `pgdata` volume; credentials come from `infra/docker-compose.yml` defaults (change for production).

## Kubernetes
- Build and push images first (example):  
  `docker build -t ghcr.io/your-org/taskspace-backend:latest backend`  
  `docker build -t ghcr.io/your-org/taskspace-frontend:latest frontend`
- Apply manifests: `kubectl apply -f infra/k8s/secret.yaml -f infra/k8s/postgres.yaml -f infra/k8s/backend.yaml -f infra/k8s/frontend.yaml -f infra/k8s/ingress.yaml`.
- The ingress expects an NGINX ingress controller and routes host `taskspace.local` (`/api` + `/docs` → API, `/` → frontend). Add a local DNS entry if testing.

## Nginx
- Reverse-proxy config lives at `infra/nginx/default.conf` (used by Docker Compose, can be dropped into any nginx install).
- Proxies `/api` to `backend:3000`, `/docs` to Swagger UI, everything else to `frontend:4173`; includes a `/healthz` endpoint.
