# Use a lightweight Node.js base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Command to run your application when the container starts
CMD ["node", "index.js"]