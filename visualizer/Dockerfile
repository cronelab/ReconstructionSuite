FROM node:latest

WORKDIR /home/visualizer
COPY ./visualizer/package*.json ./
RUN npm i
COPY ./visualizer/ ./
CMD [ "node", "server" ]