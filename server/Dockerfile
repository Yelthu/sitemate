# Development stage
FROM  node:16.20.2-alpine as development

WORKDIR /app


COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]


# Production stage
FROM  node:16.20.2-alpine as production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]