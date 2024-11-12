FROM node:22

WORKDIR /frontend

COPY . .

RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]