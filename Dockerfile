FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install\
    && npm install typescript -g\
    && npm install -g serve\
    && npm install react-scripts@3.4.1 -g --silent
    
COPY . .
EXPOSE 3000

RUN npm run build 

CMD ["npm", "run", "prod"]