FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get -y install bc binutils libgomp1 perl psmisc sudo tar tcsh unzip \
    uuid-dev vim-common libjpeg62-dev curl octave gawk jq

# Copy all scripts to image
COPY ./mesh_generator/scripts /home/scripts
# Set work directory
WORKDIR /home/scripts
# Download relevant freesurfer binaries
RUN curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mris_convert -o mris_convert \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_info -o mri_info \
    && curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_convert -o mri_convert \
    && chmod +x mris_convert && chmod +x mri_convert && chmod +x mri_info
# License/path necessary for freesurfer binaries to work
ENV FREESURFER_HOME /usr/local/freesurfer
COPY ./mesh_generator/freesurferlicense.txt /usr/local/freesurfer/.license

# Download Blender and set path
RUN mkdir /usr/local/blender \
    && curl -SL https://download.blender.org/release/Blender2.82/blender-2.82a-linux64.tar.xz -o blender.tar.xz \
    && tar -xf blender.tar.xz -C /usr/local/blender --strip-components=1 \
    && rm blender.tar.xz
ENV PATH /usr/local/blender:$PATH


ENV SUBJECTS_DIR=/data/derivatives/freesurfer

# Freesurfer data directory
COPY ./Data /data
ARG SUBJECT
RUN chmod +x runscript.sh && ./runscript.sh


# mkdir $SUBJECTS_DIR/$1/electrodes
# # Segment the brainstem
# segmentBS.sh $1
# # Segment the thalamic nuclei
# segmentThalamicNuclei.sh $1 $SUBJECTS_DIR
# segmentThalamicNuclei.sh  $1 $SUBJECTS_DIR T2.mgz T2 't2'
# # Segment the hippocampus/amygdala
# segmentHA_T2.sh $1 T2.mgz T2 1
# segmentHA.sh $1
# # On the other hand ThalamicNuclei.v10.T1.FSvoxelSpace.mgz lives in the same voxel space as the other FreeSurfer volumes (e.g., orig.mgz, nu.mgz, aseg.mgz), so you can use it directly to produce masks for further analyses, but its resolution is lower (1 mm vs 0.5 mm).
