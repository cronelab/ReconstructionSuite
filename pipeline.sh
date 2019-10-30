#!/bin/bash

./scripts/prepPatient.sh $1
./scripts/reconall.sh $1
python ./scripts/coreg.py $1
./scripts/aseg2srf.sh -s $1

mris_convert $SUBJECTS_DIR/$1/surf/lh.pial $SUBJECTS_DIR/$1/surf/lh.pial.asc
mris_convert $SUBJECTS_DIR/$1/surf/rh.pial $SUBJECTS_DIR/$1/surf/rh.pial.asc
mv $SUBJECTS_DIR/$1/surf/lh.pial.asc $SUBJECTS_DIR/$1/surf/lh.pial.srf
mv $SUBJECTS_DIR/$1/surf/rh.pial.asc $SUBJECTS_DIR/$1/surf/rh.pial.srf
./srf2obj $SUBJECTS_DIR/$1/surf/lh.pial.srf > $SUBJECTS_DIR/$1/surf/lh.pial.obj
./srf2obj $SUBJECTS_DIR/$1/surf/rh.pial.srf > $SUBJECTS_DIR/$1/surf/rh.pial.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_004.srf > $SUBJECTS_DIR/$1/ascii/aseg_004.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_005.srf > $SUBJECTS_DIR/$1/ascii/aseg_005.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_007.srf > $SUBJECTS_DIR/$1/ascii/aseg_007.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_008.srf > $SUBJECTS_DIR/$1/ascii/aseg_008.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_010.srf > $SUBJECTS_DIR/$1/ascii/aseg_010.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_011.srf > $SUBJECTS_DIR/$1/ascii/aseg_011.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_012.srf > $SUBJECTS_DIR/$1/ascii/aseg_012.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_013.srf > $SUBJECTS_DIR/$1/ascii/aseg_013.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_014.srf > $SUBJECTS_DIR/$1/ascii/aseg_014.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_015.srf > $SUBJECTS_DIR/$1/ascii/aseg_015.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_016.srf > $SUBJECTS_DIR/$1/ascii/aseg_016.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_017.srf > $SUBJECTS_DIR/$1/ascii/aseg_017.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_018.srf > $SUBJECTS_DIR/$1/ascii/aseg_018.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_026.srf > $SUBJECTS_DIR/$1/ascii/aseg_026.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_028.srf > $SUBJECTS_DIR/$1/ascii/aseg_028.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_043.srf > $SUBJECTS_DIR/$1/ascii/aseg_043.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_044.srf > $SUBJECTS_DIR/$1/ascii/aseg_044.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_046.srf > $SUBJECTS_DIR/$1/ascii/aseg_046.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_047.srf > $SUBJECTS_DIR/$1/ascii/aseg_047.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_049.srf > $SUBJECTS_DIR/$1/ascii/aseg_049.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_050.srf > $SUBJECTS_DIR/$1/ascii/aseg_050.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_051.srf > $SUBJECTS_DIR/$1/ascii/aseg_051.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_052.srf > $SUBJECTS_DIR/$1/ascii/aseg_052.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_053.srf > $SUBJECTS_DIR/$1/ascii/aseg_053.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_054.srf > $SUBJECTS_DIR/$1/ascii/aseg_054.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_058.srf > $SUBJECTS_DIR/$1/ascii/aseg_058.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_060.srf > $SUBJECTS_DIR/$1/ascii/aseg_060.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_251.srf > $SUBJECTS_DIR/$1/ascii/aseg_251.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_252.srf > $SUBJECTS_DIR/$1/ascii/aseg_252.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_253.srf > $SUBJECTS_DIR/$1/ascii/aseg_253.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_254.srf > $SUBJECTS_DIR/$1/ascii/aseg_254.obj
# ./srf2obj $SUBJECTS_DIR/$1/ascii/aseg_255.srf > $SUBJECTS_DIR/$1/ascii/aseg_255.obj
# ./srf2obj $SUBJECTS_DIR/PY19N022_/ascii/aseg_255.srf > $SUBJECTS_DIR/$1/ascii/aseg_255.obj

# #annotation2label
mri_annotation2label --subject PY19N022_ --hemi "lh" --surface pial --outdir $SUBJECETS_DIR/PY19N022_/label/gyri
mri_annotation2label --subject PY19N022_ --hemi "rh" --surface pial --outdir $SUBJECETS_DIR/PY19N022_/label/gyri
