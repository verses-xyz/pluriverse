# Base Image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn-lock.json ./
RUN yarn install

# Copy source code and static files
COPY . .

# Run app
CMD [ "tsc", "&&" "node", "dist/index.js" ]
