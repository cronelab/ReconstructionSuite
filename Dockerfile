FROM node:latest

WORKDIR /home/visualizer
COPY ./package*.json ./
RUN npm i
COPY fsaverage /data/derivatives/freesurfer/fsaverage
COPY ./ ./
CMD [ "npm", "run", "start" ]