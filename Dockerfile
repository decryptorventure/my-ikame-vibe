# Stage 1: Development
FROM node:22-alpine AS development

WORKDIR /app

# Copy dependencies files
COPY .npmrc package.json yarn.lock /app/

# Install dependencies
RUN yarn

# Copy source code
COPY . /app

ENV CI=true

# Stage 2: Build
FROM development AS build

# Build production
RUN yarn build

# Stage 3: Nginx - Production
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built assets
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copy nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
