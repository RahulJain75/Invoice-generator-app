# Stage 1: Build the React frontend
FROM node 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "server-start"]
