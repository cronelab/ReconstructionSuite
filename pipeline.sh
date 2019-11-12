#!/bin/bash

# #PREP RECON
# mkdir $SUBJECTS_DIR/$1/mri
# mkdir $SUBJECTS_DIR/$1/CT
# mkdir $SUBJECTS_DIR/$1/electrodes
# mkdir $SUBJECTS_DIR/$1/Meshes
# mkdir $SUBJECTS_DIR/$1/Meshes/subcortical
# mkdir $SUBJECTS_DIR/$1/mri/orig
# mkdir $SUBJECTS_DIR/$1/label
# mkdir $SUBJECTS_DIR/$1/label/gyri
# mkdir $SUBJECTS_DIR/$1/obj
# mkdir $SUBJECTS_DIR/$1/rois
# mv $SUBJECTS_DIR/$1/CT.nii $SUBJECTS_DIR/$1/CT/CT.nii
# mv $SUBJECTS_DIR/$1/T1.nii $SUBJECTS_DIR/$1/mri/orig/T1.nii
# mri_convert $SUBJECTS_DIR/$1/mri/orig/T1.nii $SUBJECTS_DIR/$1/mri/orig/001.mgz

# ./scripts/reconall.sh $1
# python ./scripts/coreg.py $1
# ./scripts/aseg2srf.sh -s $1

# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_002.srf > $SUBJECTS_DIR/$1/obj/Left-Cerebral-White-Matter.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_003.srf > $SUBJECTS_DIR/$1/obj/Left-Cerebral-Cortex.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_004.srf > $SUBJECTS_DIR/$1/obj/Left-Lateral-Ventricle.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_005.srf > $SUBJECTS_DIR/$1/obj/Left-Inf-Lat-Vent.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_007.srf > $SUBJECTS_DIR/$1/obj/Left-Cerebellum-White-Matter.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_008.srf > $SUBJECTS_DIR/$1/obj/Left-Cerebellum-Cortex.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_010.srf > $SUBJECTS_DIR/$1/obj/Left-Thalamus-Proper.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_011.srf > $SUBJECTS_DIR/$1/obj/Left-Caudate.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_012.srf > $SUBJECTS_DIR/$1/obj/Left-Putamen.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_013.srf > $SUBJECTS_DIR/$1/obj/Left-Pallidum.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_014.srf > $SUBJECTS_DIR/$1/obj/3rd-Ventricle.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_015.srf > $SUBJECTS_DIR/$1/obj/4th-Ventricle.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_016.srf > $SUBJECTS_DIR/$1/obj/Brain-Stem.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_017.srf > $SUBJECTS_DIR/$1/obj/Left-Hippocampus.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_018.srf > $SUBJECTS_DIR/$1/obj/Left-Amygdala.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_024.srf > $SUBJECTS_DIR/$1/obj/CSF.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_026.srf > $SUBJECTS_DIR/$1/obj/Left-Accumbens-area.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_028.srf > $SUBJECTS_DIR/$1/obj/Left-VentralDC.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_030.srf > $SUBJECTS_DIR/$1/obj/Left-vessel.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_031.srf > $SUBJECTS_DIR/$1/obj/Left-choroid-plexus.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_041.srf > $SUBJECTS_DIR/$1/obj/Right-Cerebral-White-Matter.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_042.srf > $SUBJECTS_DIR/$1/obj/Right-Cerebral-Cortex.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_043.srf > $SUBJECTS_DIR/$1/obj/Right-Lateral-Ventricle.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_044.srf > $SUBJECTS_DIR/$1/obj/Right-Inf-Lat-Vent.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_046.srf > $SUBJECTS_DIR/$1/obj/Right-Cerebellum-White-Matter.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_047.srf > $SUBJECTS_DIR/$1/obj/Right-Cerebellum-Cortex.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_049.srf > $SUBJECTS_DIR/$1/obj/Right-Thalamus-Proper.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_050.srf > $SUBJECTS_DIR/$1/obj/Right-Caudate.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_051.srf > $SUBJECTS_DIR/$1/obj/Right-Putamen.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_052.srf > $SUBJECTS_DIR/$1/obj/Right-Pallidum.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_053.srf > $SUBJECTS_DIR/$1/obj/Right-Hippocampus.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_054.srf > $SUBJECTS_DIR/$1/obj/Right-Amygdala.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_058.srf > $SUBJECTS_DIR/$1/obj/Right-Accumbens-area.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_060.srf > $SUBJECTS_DIR/$1/obj/Right-VentralDC.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_063.srf > $SUBJECTS_DIR/$1/obj/Right-choroid-plexus.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_077.srf > $SUBJECTS_DIR/$1/obj/WM-hypointensities.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_085.srf > $SUBJECTS_DIR/$1/obj/Optic-Chiasm.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_251.srf > $SUBJECTS_DIR/$1/obj/CC_Posterior.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_252.srf > $SUBJECTS_DIR/$1/obj/CC_Mid_Posterior.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_253.srf > $SUBJECTS_DIR/$1/obj/CC_Central.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_254.srf > $SUBJECTS_DIR/$1/obj/CC_Mid_Anterior.obj
# ./scripts/srf2obj $SUBJECTS_DIR/$1/ascii/aseg_255.srf > $SUBJECTS_DIR/$1/obj/CC_Anterior.obj

# mris_convert $SUBJECTS_DIR/$1/surf/lh.pial $SUBJECTS_DIR/$1/surf/lh.pial.asc
# mris_convert $SUBJECTS_DIR/$1/surf/rh.pial $SUBJECTS_DIR/$1/surf/rh.pial.asc
# mv $SUBJECTS_DIR/$1/surf/lh.pial.asc $SUBJECTS_DIR/$1/surf/lh.pial.srf
# mv $SUBJECTS_DIR/$1/surf/rh.pial.asc $SUBJECTS_DIR/$1/surf/rh.pial.srf
# ./scripts/annot2dpv $SUBJECTS_DIR/$1/label/lh.aparc.annot $SUBJECTS_DIR/$1/label/lh.aparc.annot.dpv
# ./scripts/annot2dpv $SUBJECTS_DIR/$1/label/rh.aparc.annot $SUBJECTS_DIR/$1/label/rh.aparc.annot.dpv
# ./scripts/splitsrf $SUBJECTS_DIR/$1/surf/lh.pial.srf $SUBJECTS_DIR/$1/label/lh.aparc.annot.dpv $SUBJECTS_DIR/$1/rois/lh.pial_roi
# ./scripts/splitsrf $SUBJECTS_DIR/$1/surf/rh.pial.srf $SUBJECTS_DIR/$1/label/rh.aparc.annot.dpv $SUBJECTS_DIR/$1/rois/rh.pial_roi
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0001.srf > $SUBJECTS_DIR/$1/obj/rh.bankssts.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0002.srf > $SUBJECTS_DIR/$1/obj/rh.caudalanteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0003.srf > $SUBJECTS_DIR/$1/obj/rh.caudalmiddlefrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0004.srf > $SUBJECTS_DIR/$1/obj/rh.corpuscallosum.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0005.srf > $SUBJECTS_DIR/$1/obj/rh.cuneus.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0006.srf > $SUBJECTS_DIR/$1/obj/rh.entorhinal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0007.srf > $SUBJECTS_DIR/$1/obj/rh.fusiform.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0008.srf > $SUBJECTS_DIR/$1/obj/rh.inferiorparietal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0009.srf > $SUBJECTS_DIR/$1/obj/rh.inferiortemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0010.srf > $SUBJECTS_DIR/$1/obj/rh.isthmuscingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0011.srf > $SUBJECTS_DIR/$1/obj/rh.lateraloccipital.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0012.srf > $SUBJECTS_DIR/$1/obj/rh.lateralorbitofrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0013.srf > $SUBJECTS_DIR/$1/obj/rh.lingual.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0014.srf > $SUBJECTS_DIR/$1/obj/rh.medialorbitofrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0015.srf > $SUBJECTS_DIR/$1/obj/rh.middletemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0016.srf > $SUBJECTS_DIR/$1/obj/rh.parahippocampal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0017.srf > $SUBJECTS_DIR/$1/obj/rh.paracentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0018.srf > $SUBJECTS_DIR/$1/obj/rh.parsopercularis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0019.srf > $SUBJECTS_DIR/$1/obj/rh.parsorbitalis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0020.srf > $SUBJECTS_DIR/$1/obj/rh.parstriangularis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0021.srf > $SUBJECTS_DIR/$1/obj/rh.pericalcarine.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0022.srf > $SUBJECTS_DIR/$1/obj/rh.postcentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0023.srf > $SUBJECTS_DIR/$1/obj/rh.posteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0024.srf > $SUBJECTS_DIR/$1/obj/rh.precentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0025.srf > $SUBJECTS_DIR/$1/obj/rh.precuneus.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0026.srf > $SUBJECTS_DIR/$1/obj/rh.rostralanteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0027.srf > $SUBJECTS_DIR/$1/obj/rh.rostralmiddlefrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0028.srf > $SUBJECTS_DIR/$1/obj/rh.superiorfrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0029.srf > $SUBJECTS_DIR/$1/obj/rh.superiorparietal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0030.srf > $SUBJECTS_DIR/$1/obj/rh.superiortemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0031.srf > $SUBJECTS_DIR/$1/obj/rh.supramarginal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0032.srf > $SUBJECTS_DIR/$1/obj/rh.frontalpole.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0033.srf > $SUBJECTS_DIR/$1/obj/rh.temporalpole.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0034.srf > $SUBJECTS_DIR/$1/obj/rh.transversetemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/rh.pial_roi.0035.srf > $SUBJECTS_DIR/$1/obj/rh.insula.obj

./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0001.srf > $SUBJECTS_DIR/$1/obj/lh.bankssts.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0002.srf > $SUBJECTS_DIR/$1/obj/lh.caudalanteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0003.srf > $SUBJECTS_DIR/$1/obj/lh.caudalmiddlefrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0004.srf > $SUBJECTS_DIR/$1/obj/lh.corpuscallosum.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0005.srf > $SUBJECTS_DIR/$1/obj/lh.cuneus.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0006.srf > $SUBJECTS_DIR/$1/obj/lh.entolhinal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0007.srf > $SUBJECTS_DIR/$1/obj/lh.fusiform.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0008.srf > $SUBJECTS_DIR/$1/obj/lh.inferiorparietal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0009.srf > $SUBJECTS_DIR/$1/obj/lh.inferiortemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0010.srf > $SUBJECTS_DIR/$1/obj/lh.isthmuscingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0011.srf > $SUBJECTS_DIR/$1/obj/lh.lateraloccipital.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0012.srf > $SUBJECTS_DIR/$1/obj/lh.lateralorbitofrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0013.srf > $SUBJECTS_DIR/$1/obj/lh.lingual.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0014.srf > $SUBJECTS_DIR/$1/obj/lh.medialorbitofrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0015.srf > $SUBJECTS_DIR/$1/obj/lh.middletemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0016.srf > $SUBJECTS_DIR/$1/obj/lh.parahippocampal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0017.srf > $SUBJECTS_DIR/$1/obj/lh.paracentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0018.srf > $SUBJECTS_DIR/$1/obj/lh.parsopercularis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0019.srf > $SUBJECTS_DIR/$1/obj/lh.parsorbitalis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0020.srf > $SUBJECTS_DIR/$1/obj/lh.parstriangularis.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0021.srf > $SUBJECTS_DIR/$1/obj/lh.pericalcarine.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0022.srf > $SUBJECTS_DIR/$1/obj/lh.postcentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0023.srf > $SUBJECTS_DIR/$1/obj/lh.posteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0024.srf > $SUBJECTS_DIR/$1/obj/lh.precentral.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0025.srf > $SUBJECTS_DIR/$1/obj/lh.precuneus.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0026.srf > $SUBJECTS_DIR/$1/obj/lh.rostralanteriorcingulate.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0027.srf > $SUBJECTS_DIR/$1/obj/lh.rostralmiddlefrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0028.srf > $SUBJECTS_DIR/$1/obj/lh.superiorfrontal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0029.srf > $SUBJECTS_DIR/$1/obj/lh.superiorparietal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0030.srf > $SUBJECTS_DIR/$1/obj/lh.superiortemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0031.srf > $SUBJECTS_DIR/$1/obj/lh.supramarginal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0032.srf > $SUBJECTS_DIR/$1/obj/lh.frontalpole.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0033.srf > $SUBJECTS_DIR/$1/obj/lh.temporalpole.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0034.srf > $SUBJECTS_DIR/$1/obj/lh.transversetemporal.obj
./scripts/srf2obj $SUBJECTS_DIR/$1/rois/lh.pial_roi.0035.srf > $SUBJECTS_DIR/$1/obj/lh.insula.obj


# #annotation2label
# mri_annotation2label --subject $1 --hemi "lh" --surface pial --outdir $SUBJECTS_DIR/$1/label/gyri
# mri_annotation2label --subject $1 --hemi "rh" --surface pial --outdir $SUBJECTS_DIR/$1/label/gyri

#convert the BIS mgrid to a .mat
# matlab -nojvm -nodesktop -batch "mgridConverter ${1}"

# #Take all the objs and electrodes and create a fbx from them
/usr/local/blender/blender --background --python scripts/obj2fbx.py