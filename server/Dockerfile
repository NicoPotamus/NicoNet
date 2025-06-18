FROM node:22-alpine

WORKDIR /app

# Add npm configuration for better reliability
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm config set fetch-retries 5 \
    && npm config set registry https://registry.npmmirror.com/

COPY package*.json ./
RUN npm install
RUN npm install reflect-metadata

COPY . .
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
