# FROM node:20

# WORKDIR /frontend

# COPY . .

# RUN npm install

# EXPOSE 3000

# CMD ["npm", "start"]

# Stage 1: Build the React app
FROM node:20 as build

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# # Install dependencies
# RUN npm install
# Use --legacy-peer-deps to resolve conflicts
RUN npm install --legacy-peer-deps

# Copy the entire frontend codebase into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 3000

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]


