FROM node:latest

WORKDIR /home/visualizer
COPY ./package*.json ./
RUN npm i
COPY ./ ./
CMD [ "node", "server" ]