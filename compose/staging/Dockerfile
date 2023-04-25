# Base image
FROM node:16-alpine AS builder

ENV NODE_ENV production
# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY ./front/package.json .
COPY ./front/yarn.lock .
RUN yarn install --frozen-lockfile && mkdir /nextjs-ui && mv ./node_modules ./nextjs-ui

# Copy source files
COPY ./front .

# Build the app
RUN /bin/sh -c npm run build

# Stage 2 - the production environment
FROM nginx:1.19.6-alpine

# Copy build from builder stage
COPY --from=builder /nextjs-ui/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]