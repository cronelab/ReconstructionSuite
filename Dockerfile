FROM node:latest

WORKDIR /home/visualizer
COPY ./package*.json ./
RUN npm i
COPY fsaverage /data/derivatives/freesurfer/fsaverage
EXPOSE 5000
COPY ./ ./
CMD [ "node", "server" ]