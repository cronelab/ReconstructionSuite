FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get -y install bc binutils libgomp1 perl psmisc sudo tar tcsh unzip \
    uuid-dev vim-common libjpeg62-dev curl octave gawk jq

# Copy all scripts to image
COPY ./mesh_generator/scripts /home/scripts
# Set work directory
WORKDIR /home/scripts
# Download relevant freesurfer binaries
RUN curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mris_convert -o /home/scripts/mris_convert \
RUN curl https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev_binaries/centos7_x86_64/mri_convert -o /home/scripts/mri_convert \
    && chmod +x mris_convert && chmod +x mri_convert
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
ENV SUBJECT=$SUBJECTS_DIR/LA02

# Freesurfer data directory
COPY ./Data /data

RUN mkdir -p $SUBJECT/obj \
    && mkdir -p $SUBJECT/rois \
    && mkdir -p /usr/local/freesurfer/matlab \
    && ./mris_convert $SUBJECT/surf/lh.pial $SUBJECT/surf/lh.pial.asc \
    && ./mris_convert $SUBJECT/surf/rh.pial $SUBJECT/surf/rh.pial.asc \
    && mv $SUBJECT/surf/lh.pial.asc $SUBJECT/surf/lh.pial.srf \
    && mv $SUBJECT/surf/rh.pial.asc $SUBJECT/surf/rh.pial.srf \
    && ./annot2dpv $SUBJECT/label/lh.aparc.annot $SUBJECT/label/lh.aparc.annot.dpv \
    && ./annot2dpv $SUBJECT/label/rh.aparc.annot $SUBJECT/label/rh.aparc.annot.dpv \
    && ./splitsrf $SUBJECT/surf/lh.pial.srf $SUBJECT/label/lh.aparc.annot.dpv $SUBJECT/rois/lh.pial_roi \
    && ./splitsrf $SUBJECT/surf/rh.pial.srf $SUBJECT/label/rh.aparc.annot.dpv $SUBJECT/rois/rh.pial_roi \
    && chmod +x srf2objWrapper && ./srf2objWrapper

# mkdir $SUBJECTS_DIR/$1/electrodes
# mkdir $SUBJECTS_DIR/$1/obj
# mkdir $SUBJECTS_DIR/$1/rois
# # Segment the brainstem
# segmentBS.sh $1
# # Segment the thalamic nuclei
# segmentThalamicNuclei.sh $1 $SUBJECTS_DIR
# segmentThalamicNuclei.sh  $1 $SUBJECTS_DIR T2.mgz T2 't2'
# # Segment the hippocampus/amygdala
# segmentHA_T2.sh $1 T2.mgz T2 1
# segmentHA.sh $1
# # On the other hand ThalamicNuclei.v10.T1.FSvoxelSpace.mgz lives in the same voxel space as the other FreeSurfer volumes (e.g., orig.mgz, nu.mgz, aseg.mgz), so you can use it directly to produce masks for further analyses, but its resolution is lower (1 mm vs 0.5 mm).

RUN /usr/local/blender/blender --background --python scripts/sceneCreator.py /${SUBJECT} True True