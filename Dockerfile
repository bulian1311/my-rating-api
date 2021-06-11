FROM node:14-alpine
WORKDIR /opt/app

COPY package*.json ./
RUN npm install --only=prod

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]