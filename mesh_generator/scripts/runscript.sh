#!/bin/bash

mkdir -p $SUBJECTS_DIR/$SUBJECT/obj 
mkdir -p $SUBJECTS_DIR/$SUBJECT/rois 
mkdir -p /usr/local/freesurfer/matlab 

./aseg2srf.sh $SUBJECT

mris_convert $SUBJECTS_DIR/$SUBJECT/surf/lh.pial $SUBJECTS_DIR/$SUBJECT/surf/lh.pial.asc 
mris_convert $SUBJECTS_DIR/$SUBJECT/surf/rh.pial $SUBJECTS_DIR/$SUBJECT/surf/rh.pial.asc 

mv $SUBJECTS_DIR/$SUBJECT/surf/lh.pial.asc $SUBJECTS_DIR/$SUBJECT/surf/lh.pial.srf 
mv $SUBJECTS_DIR/$SUBJECT/surf/rh.pial.asc $SUBJECTS_DIR/$SUBJECT/surf/rh.pial.srf 

./annot2dpv $SUBJECTS_DIR/$SUBJECT/label/lh.aparc.annot $SUBJECTS_DIR/$SUBJECT/label/lh.aparc.annot.dpv 
./annot2dpv $SUBJECTS_DIR/$SUBJECT/label/rh.aparc.annot $SUBJECTS_DIR/$SUBJECT/label/rh.aparc.annot.dpv 

./splitsrf $SUBJECTS_DIR/$SUBJECT/surf/lh.pial.srf $SUBJECTS_DIR/$SUBJECT/label/lh.aparc.annot.dpv $SUBJECTS_DIR/$SUBJECT/rois/lh.pial_roi 
./splitsrf $SUBJECTS_DIR/$SUBJECT/surf/rh.pial.srf $SUBJECTS_DIR/$SUBJECT/label/rh.aparc.annot.dpv $SUBJECTS_DIR/$SUBJECT/rois/rh.pial_roi 

counter=0001
while [ $counter -le 0035 ]; do
	newCount=$(printf "%04g" $counter)
	labelName=$(cat ./roiNames.json | jq '.["'$newCount'"]')
	labelName="${labelName#\"}"
	labelName="${labelName%\"}"
	./srf2obj $SUBJECTS_DIR/$SUBJECT/rois/lh.pial_roi.$newCount.srf >$SUBJECTS_DIR/$SUBJECT/obj/lh.$labelName.obj
	./srf2obj $SUBJECTS_DIR/$SUBJECT/rois/rh.pial_roi.$newCount.srf >$SUBJECTS_DIR/$SUBJECT/obj/rh.$labelName.obj
	((counter++))
done

mri_convert $SUBJECTS_DIR/$SUBJECT/mri/brain.mgz $SUBJECTS_DIR/$SUBJECT/reconstruction.nii

/usr/local/blender/blender --background startup.blend --python sceneCreator.py