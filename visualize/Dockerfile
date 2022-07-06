FROM node:17.6.0

RUN mkdir -p /usr/local/freesurfer/bin
RUN curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_info -o /usr/local/freesurfer/bin/mri_info
RUN chmod +x /usr/local/freesurfer/bin/mri_info
COPY ./freesurferlicense.txt /usr/local/freesurfer/.license
ENV FREESURFER_HOME=/usr/local/freesurfer
COPY FreeSurferColorLUT.txt /usr/local/freesurfer/FreeSurferColorLUT.txt

WORKDIR /home/visualize
COPY package.json .
RUN yarn install
COPY . .
RUN useradd -u 1014 -ms /bin/bash visualize
# RUN 
# RUN yarn dev
# CMD [ "yarn","dev" ]