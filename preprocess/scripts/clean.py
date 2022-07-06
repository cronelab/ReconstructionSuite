import os
import nibabel as nib
import numpy as np

SUBJECT = os.environ["SUBJECT"]
SUBJECTS_DIR = os.environ["SUBJECTS_DIR"]
filePath = f'{SUBJECTS_DIR}/derivatives/{SUBJECT}'


os.system(
    f'mri_mask -T 10 {SUBJECTS_DIR}/{SUBJECT}/spmT_0001_Tongue.nii {SUBJECTS_DIR}/{SUBJECT}/mri/brain.mgz {SUBJECTS_DIR}/{SUBJECT}/spmT_0001_Tongue_coreg.nii')

img = nib.load(f'{SUBJECTS_DIR}/{SUBJECT}/spmT_0001_Tongue_coreg.nii')
CT_data = img.slicer[:, :, :]
CT_data.dataobj[CT_data.dataobj < 6] = 6
CT_data.dataobj[CT_data.dataobj > 10] = 10
nib.save(CT_data, f'{SUBJECTS_DIR}/{SUBJECT}/spmT_0001_Tongue_clean.nii.gz')
