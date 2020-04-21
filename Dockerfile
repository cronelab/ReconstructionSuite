FROM node:latest

# Blender
# RUN mkdir /usr/local/blender \
#     && curl -SL https://download.blender.org/release/Blender2.82/blender-2.82a-linux64.tar.xz -o blender.tar.xz \
#     && tar -xf blender.tar.xz -C /usr/local/blender --strip-components=1 \
#     && rm blender.tar.xz

WORKDIR /home/visualizer
COPY ./Data /data
RUN npm i
COPY ./visualizer /home/visualizer
