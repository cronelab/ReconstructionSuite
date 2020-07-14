#!/bin/bash
if [ $2 == "lh.ilf_AS_avg33_mni_bbr_brain" ]; then
	name="Left inferior longitudinal fasciculus"
elif [ $2 == "rh.slft_PP_avg33_mni_bbr_brain" ]; then
	name="Right superior longitudinal fasciculus - temporal endings"
elif [ $2 == "lh.slfp_PP_avg33_mni_bbr_brain" ]; then 
	name="Left superior longitudinal fasciculus - parietal endings"
elif [ $2 == "rh.slfp_PP_avg33_mni_bbr_brain" ]; then 
	name="Right superior longitudinal fasciculus - parietal endings"
elif [ $2 == "lh.slft_PP_avg33_mni_bbr_brain" ]; then 
	name="Left superior longitudinal fasciculus - temporal endings"
elif [ $2 == "lh.cst_AS_avg33_mni_bbr_brain" ]; then 
	name="Left corticospinal tract"
elif [ $2 == "rh.cst_AS_avg33_mni_bbr_brain" ]; then 
	name="Right corticospinal tract"
elif [ $2 == "rh.ilf_AS_avg33_mni_bbr_brain" ]; then 
	name="Right inferior longitudinal fasciculus"
elif [ $2 == "lh.unc_AS_avg33_mni_bbr_brain" ]; then 
	name="Left uncinate fasciculus"
elif [ $2 == "rh.unc_AS_avg33_mni_bbr_brain" ]; then 
	name="Right uncinate fasciculus"
elif [ $2 == "fmajor_PP_avg33_mni_bbr_brain" ]; then 
	name="Corpus callosum - forceps major"
elif [ $2 == "fminor_PP_avg33_mni_bbr_brain" ]; then 
	name="Corpus callosum - forceps minor"
elif [ $2 == "lh.atr_PP_avg33_mni_bbr_brain" ]; then 
	name="Left anterior thalamic radiations"
elif [ $2 == "rh.atr_PP_avg33_mni_bbr_brain" ]; then 
	name="Right anterior thalamic radiations"
elif [ $2 == "lh.ccg_PP_avg33_mni_bbr_brain" ]; then 
	name="Left cingulum - cingulate gyrus endings"
elif [ $2 == "rh.ccg_PP_avg33_mni_bbr_brain" ]; then 
	name="Right cingulum - cingulate gyrus endings"
elif [ $2 == "lh.cab_PP_avg33_mni_bbr_brain" ]; then 
	name="Left cingulum - angular bundle"
elif [ $2 == "rh.cab_PP_avg33_mni_bbr_brain" ]; then 
	name="Right cingulum - angular bundle"
else
	name=$2
fi

seg=$(mri_info $SUBJECTS_DIR/PY20N004/$1/$2.mgz --voxel $3 $4 $5)
seg_=$(printf "%1.0f" "${seg}")


if [ $seg_ -gt 1 ]; then
	# echo $seg_
	echo $6 ": " $name >> $SUBJECTS_DIR/PY20N004/electrodes/dtiElectrodeLocations.txt

fi
