FROM node:latest

WORKDIR /home/visualizer
COPY ./package*.json ./
RUN npm i
COPY fsaverage /data/derivatives/freesurfer/fsaverage
COPY ./ ./
RUN npm run build
CMD [ "npm", "run", "start" ]