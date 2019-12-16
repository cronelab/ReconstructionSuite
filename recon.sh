#!/bin/bash

# #PREP RECON
mkdir $SUBJECTS_DIR/$1/mri
mkdir $SUBJECTS_DIR/$1/electrodes
mkdir $SUBJECTS_DIR/$1/mri/orig
mkdir $SUBJECTS_DIR/$1/obj
mkdir $SUBJECTS_DIR/$1/rois

mv $SUBJECTS_DIR/$1/T1.nii $SUBJECTS_DIR/$1/mri/orig/T1.nii
# mri_convert $SUBJECTS_DIR/$1/mri/orig/T1.nii $SUBJECTS_DIR/$1/mri/orig/001.mgz


if test -f "$SUBJECTS_DIR/$1/T2.nii"; then
    mv $SUBJECTS_DIR/$1/T2.nii $SUBJECTS_DIR/$1/mri/orig/T2.nii
    recon-all -subject $1 -i $SUBJECTS_DIR/$1/mri/orig/T1.nii -T2 $SUBJECTS_DIR/$1/mri/orig/T2.nii -T2pial -parallel -openmp $(nproc) -all
else
    recon-all -subject $1 -i $SUBJECTS_DIR/$1/mri/orig/T1.nii -parallel -openmp $(nproc) -all
fi

if test -f "$SUBJECTS_DIR/$1/DTI.nii"; then
    dt_recon --i $SUBJECTS_DIR/$1/DTI.nii --b $SUBJECTS_DIR/$1/DTI.bvals $SUBJECTS_DIR/$1/DTI.bvecs --s $1 --o $SUBJECTS_DIR/$1/dti
    export=ACTIVE_SUBJECT=$1
    trac-all -prep -c DTI.config
    trac-all -bedp -c DTI.config
    trac-all -path -c DTI.config
    freeview dmri/dtifit_FA.nii.gz -tv dpath/merged_avg33_mni_bbr.mgz
fi

if test -f "$SUBJECTS_DIR/$1/CT.nii"; then
    mkdir $SUBJECTS_DIR/$1/CT
    mv $SUBJECTS_DIR/$1/CT.nii $SUBJECTS_DIR/$1/CT/CT.nii
fi