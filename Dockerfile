# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first to leverage cached layers.
COPY package*.json ./
RUN corepack enable && npm ci

# Build the production bundle.
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

# Replace the default nginx static assets with the Vite build output.
RUN rm -rf ./*
COPY --from=build /app/dist ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
