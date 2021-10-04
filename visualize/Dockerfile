FROM node:latest
WORKDIR /home/visualize
COPY ./package*.json ./
RUN npm i
RUN npm i https://github.com/TheBrainChain/ami
# COPY ./ ./
# RUN npm run build
# CMD [ "npm", "run", "start" ]

RUN mkdir -p /usr/local/freesurfer/bin
RUN curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_info -o /usr/local/freesurfer/bin/mri_info
RUN chmod +x /usr/local/freesurfer/bin/mri_info

COPY ./freesurferlicense.txt /usr/local/freesurfer/.license
ENV FREESURFER_HOME=/usr/local/freesurfer
COPY FreeSurferColorLUT.txt /usr/local/freesurfer/FreeSurferColorLUT.txt
