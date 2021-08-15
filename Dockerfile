FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install\
    && npm install typescript -g\
    && npm install -g serve

COPY . .
EXPOSE 3000

RUN npm run build 

CMD ["serve", "-l", "3000", "-s", "build"]