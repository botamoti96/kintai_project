FROM node:22

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]