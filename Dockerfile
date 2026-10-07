FROM node:24-bookworm-slim AS build
WORKDIR /app
ARG PUBLIC_SITE_URL=https://ngetech.studio
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack pnpm install --frozen-lockfile
COPY . .
RUN corepack pnpm build

FROM node:24-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 DATA_DIR=/app/data CMS_COOKIE_SECURE=true
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/scripts/cms-user.mjs ./scripts/cms-user.mjs
COPY --from=build --chown=node:node /app/src/server/auth.mjs /app/src/server/files.mjs ./src/server/
RUN mkdir /app/data && chown node:node /app/data
USER node
EXPOSE 3000
VOLUME ["/app/data"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/server/entry.mjs"]
