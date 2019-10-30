#!/bin/bash

cd $SUBJECTS_DIR/$1
#PREP RECON
mkdir mri
mkdir CT
mkdir electrodes
mkdir Meshes
mkdir Meshes/subcortical
mkdir mri/orig
mkdir label
mkdir label/gyri
mv CT.nii CT/CT.nii
mv T1.nii mri/orig/T1.nii
mri_convert mri/orig/T1.nii mri/orig/001.mgz