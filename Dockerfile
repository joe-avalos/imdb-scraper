FROM node:latest

WORKDIR /var/www

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]

