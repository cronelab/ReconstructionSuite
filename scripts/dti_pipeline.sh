#!/bin/bash
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/fmajor_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/fmajor_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/fminor_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/fminor_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.atr_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.atr_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.cab_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.cab_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.ccg_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.ccg_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.cst_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.cst_AS_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.ilf_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.ilf_AS_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.slfp_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o $SUBJECTS_DIR/$1/dpath/lh.slfp_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.slft_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o $SUBJECTS_DIR/$1/dpath/lh.slft_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/lh.unc_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/lh.unc_AS_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.atr_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.atr_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.cab_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.cab_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.ccg_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.ccg_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.cst_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.cst_AS_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.ilf_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.ilf_AS_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.slfp_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o $SUBJECTS_DIR/$1/dpath/rh.slfp_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.slft_PP_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o $SUBJECTS_DIR/$1/dpath/rh.slft_PP_avg33_mni_bbr_brain.mgz --no-save-reg
# mri_vol2vol --mov $SUBJECTS_DIR/$1/dpath/rh.unc_AS_avg33_mni_bbr/path.pd.nii.gz --targ $SUBJECTS_DIR/$1/mri/brain.mgz --regheader --o  $SUBJECTS_DIR/$1/dpath/rh.unc_AS_avg33_mni_bbr_brain.mgz --no-save-reg






while IFS=$'\t' read -r -a myArray; do
    x=$(printf "%.01f" "${myArray[3]}")
    y=$(printf "%.01f" "${myArray[4]}")
    z=$(printf "%.01f" "${myArray[5]}")
    z_=$(echo "256 - $z" | bc -l)
	# ./elec2vox_dti.sh mri/aparc+aseg $x $y $z_ &
	./elec2vox_dti.sh dpath rh.unc_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath fmajor_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath fminor_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.atr_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.cab_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.ccg_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.cst_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.ilf_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.slfp_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.slft_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath lh.unc_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.atr_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.cab_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.ccg_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.cst_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.ilf_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.slfp_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.slft_PP_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	./elec2vox_dti.sh dpath rh.unc_AS_avg33_mni_bbr_brain $x $y $z_ ${myArray[2]} &
	
#     # segment=$(printf "%1.0f" "${seg}")
#     # while IFS=" " read -a line; do
#     #     labelIndex=$(printf "%1.0f" ${line[0]})
#     #     if [ "$segment" -eq "$labelIndex" ]; then
#     #         echo $x $y $z_ "    " "${myArray[2]}" "    " ${line[1]} >> $SUBJECTS_DIR/$1/electrodes/dtiLocations.txt
#     #     fi
#     # done < LUT.txt
done < $SUBJECTS_DIR/$1/electrodes/electrodes.txt

