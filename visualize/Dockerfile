FROM node:latest
WORKDIR /home/visualizer
# COPY ./package*.json ./
RUN npm i
# COPY ./data /data
# COPY ./ ./
# RUN npm run build
ENV SUBJECTS_DIR=/home/visualizer/data
EXPOSE 80
# CMD [ "npm", "run", "start" ]