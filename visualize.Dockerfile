FROM node:latest
WORKDIR /home/visualizer
COPY ./package*.json ./
RUN npm i
COPY fsaverage /data/derivatives/freesurfer/fsaverage
EXPOSE 80 80
ENV PORT=80
COPY ./ ./
RUN npm run build
CMD [ "npm", "run", "start" ]