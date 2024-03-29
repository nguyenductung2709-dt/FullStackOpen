FROM node:16

WORKDIR /usr/src/app/bloglist-frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
