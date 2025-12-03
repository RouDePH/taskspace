FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN corepack enable && yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
ENV PORT=3000
EXPOSE 3000
CMD ["node", "./node_modules/.bin/react-router-serve", "./build/server/index.js", "--host", "0.0.0.0", "--port", "3000"]
