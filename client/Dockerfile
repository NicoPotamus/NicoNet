FROM node:22-alpine

WORKDIR /app

# Optimize npm for better reliability and use multiple registries
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm config set fetch-retries 5 \
    && npm config set registry https://registry.npmmirror.com/ \
    && npm config set strict-ssl false \
    && npm config set legacy-peer-deps true

# Install dependencies with fallback registries
COPY package*.json ./
RUN npm install || \
    (npm config set registry https://registry.npmjs.org/ && npm install) || \
    (npm config set registry https://registry.yarnpkg.com/ && npm install)

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
