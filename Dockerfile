FROM node:18-alpine
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_APP_URL=https://www.mydomain.com

RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 4000
CMD ["npm", "run","start"]