FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY ./dist ./dist

RUN npm set progress=false && npm config set depth 0
RUN npm install ci --only=production

EXPOSE 5000
CMD ["npm", "start"]