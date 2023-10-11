FROM node:18.18.1 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application source code to the container
COPY . .

# Build the Next.js application for production
RUN yarn run build

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "start"]
