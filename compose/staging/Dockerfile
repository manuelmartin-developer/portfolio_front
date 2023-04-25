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
COPY . .

# Build the app
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.19.6-alpine

# Copy build from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]