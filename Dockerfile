FROM node:18-alpine
WORKDIR /app/clean-node-api
COPY package.json .
RUN npm install --only=prod
COPY ./dist .
EXPOSE 3000
CMD ["npm", "start"]