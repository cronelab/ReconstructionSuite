# syntax=docker/dockerfile:1.2
FROM ubuntu:latest
ENV DEBIAN_FRONTEND noninteractive

LABEL authors="Christopher Coogan <c.coogan2201@gmail.com>, Adam Li <ali39@jhu.edu>"

# Install dependencies
RUN apt-get update && apt-get -y install bc binutils libgomp1 perl psmisc sudo tar tcsh unzip \
    uuid-dev vim-common libjpeg62-dev curl octave gawk jq locales apt-utils
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LC_ALL en_US.UTF-8 
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en    

# Download Blender and set path
RUN mkdir /usr/local/blender \
    && curl -SL https://download.blender.org/release/Blender2.91/blender-2.91.0-linux64.tar.xz -o blender.tar.xz \
    && tar -xf blender.tar.xz -C /usr/local/blender --strip-components=1 \
    && rm blender.tar.xz \
    && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && /usr/local/blender/2.91/python/bin/python3.7m get-pip.py \
    && /usr/local/blender/2.91/python/bin/python3.7m -m pip install pandas

ENV PATH /usr/local/blender:$PATH

# Download relevant freesurfer binaries
RUN mkdir -p /usr/local/freesurfer/bin/ \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mris_convert -o /usr/local/freesurfer/bin/mris_convert \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_info -o /usr/local/freesurfer/bin/mri_info \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_convert -o /usr/local/freesurfer/bin/mri_convert \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_pretess -o /usr/local/freesurfer/bin/mri_pretess \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_tessellate -o /usr/local/freesurfer/bin/mri_tessellate \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mris_smooth -o /usr/local/freesurfer/bin/mris_smooth \
    && chmod +x /usr/local/freesurfer/bin/mris_convert && chmod +x /usr/local/freesurfer/bin/mri_convert \
    && chmod +x /usr/local/freesurfer/bin/mri_info \
    && chmod +x /usr/local/freesurfer/bin/mri_pretess \
    && chmod +x /usr/local/freesurfer/bin/mri_tessellate \
    && chmod +x /usr/local/freesurfer/bin/mris_smooth

COPY FreeSurferColorLUT.txt /usr/local/freesurfer/FreeSurferColorLUT.txt

# License/path necessary for freesurfer binaries to work
ENV FREESURFER_HOME /usr/local/freesurfer
ENV PATH /usr/local/freesurfer/bin:$PATH

COPY ./freesurferlicense.txt /usr/local/freesurfer/.license

# Copy all scripts to image
COPY ./scripts /home/scripts
