FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install reflect-metadata

COPY . .
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
