#!/bin/bash

mkdir $SUBJECTS_DIR/$1/mri
mkdir $SUBJECTS_DIR/$1/mri/orig
mri_convert $SUBJECTS_DIR/$1/T1.nii $SUBJECTS_DIR/$1/mri/orig/001.mgz


if test -f "$SUBJECTS_DIR/$1/T2.nii"; then
    recon-all -subject $1 -T2 $SUBJECTS_DIR/$1/T2.nii -T2pial -parallel -openmp $(nproc) -all
else
    recon-all -subject $1 -parallel -openmp $(nproc) -all
fi
mkdir $SUBJECTS_DIR/$1/electrodes
mkdir $SUBJECTS_DIR/$1/obj
mkdir $SUBJECTS_DIR/$1/rois

if test -f "$SUBJECTS_DIR/$1/DTI.nii"; then
    dt_recon --i $SUBJECTS_DIR/$1/DTI.nii --b $SUBJECTS_DIR/$1/DTI.bvals $SUBJECTS_DIR/$1/DTI.bvecs --s $1 --o $SUBJECTS_DIR/$1/dti
    export=ACTIVE_SUBJECT=$1
    trac-all -prep -c DTI.config
    trac-all -bedp -c DTI.config
    trac-all -path -c DTI.config
    freeview dmri/dtifit_FA.nii.gz -tv dpath/merged_avg33_mni_bbr.mgz
fi

if test -f "$SUBJECTS_DIR/$1/CT/CT.nii"; then
    # mkdir $SUBJECTS_DIR/$1/CT
    # mv $SUBJECTS_DIR/$1/CT.nii $SUBJECTS_DIR/$1/CT/CT.nii
    if test -f "$SUBJECTS_DIR/$1/mri/T2.mgz"; then
        bbregister --s $1 --mov $SUBJECTS_DIR/$1/CT/CT.nii --reg $SUBJECTS_DIR/$1/CT/reg.lta --t1 --t2 --o $SUBJECTS_DIR/$1/CT/registeredCT.nii
        # else
        
        # bbregister --s $1 --mov $SUBJECTS_DIR/$1/CT/CT.nii --reg $SUBJECTS_DIR/$1/CT/reg.lta --t1 --o $SUBJECTS_DIR/$1/CT/registeredCT.nii
    fi
fi