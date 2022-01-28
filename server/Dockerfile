# Base Image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn global add typescript

# Copy source code and static files
COPY . .

RUN npx prisma generate

RUN tsc

# Run app
CMD [ "node", "dist/index.js" ]
