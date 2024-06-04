# Use an appropriate base image, e.g., Node.js for a Node.js server
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
