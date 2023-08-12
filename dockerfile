FROM node:20
# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./

COPY .env.local ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# Port 3020 because it is specified in package.json
# and the app binds to this port.
EXPOSE 3020