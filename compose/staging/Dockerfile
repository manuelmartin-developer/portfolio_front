# Base image
FROM node:16-alpine AS builder

ENV NODE_ENV production
# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY ./front/package.json .
COPY ./front/yarn.lock .
RUN yarn install --frozen-lockfile

# Copy source files
COPY ./front .

# Build the app in ./front directory
RUN yarn build

# Stage 2
# Path: compose/staging/Dockerfile
# Base image
FROM nginx:1.21.1-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=builder ./front/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]