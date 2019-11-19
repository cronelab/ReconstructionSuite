# registration_pipeline

Converts a T1 MR into a segmented and parcellated 3D object file.

Each individual brain region is it's own mesh and can be queried/modified/disabled

The gLTF binary file format allows for optimized viewing directly in browsers and VR/AR devices.
*Examples coming soon.*

This project is essentially feature complete.

###Dependencies:
- Freesurfer (90% of this project is just **recon-all**)
    - Which means it will take ~16ish hours to run.
- Various [Brainder](https://brainder.org/) scripts for mesh generation
    - Matlab/Octave
- Blender (Freesurfer OBJ to FBX/gLTF)
    - Comes with a python interpreter

- **Bioimage Suite**
    - This is where all of the coregistration/electrode localization is done. After warping the CT-marked electrodes to the Freesurfer-normalized T1.nii/.mgz export the BIS .mgrid as a .txt file and drop it in the *Freesurfer Subject Directory*/Subject/electrodes folder

###To do:
- Documentation/Instructions
- Investigate either embedding the former Unity/Holgram shader into the 3D scene on either the Blender side or ThreeJS side
- Option to just create a brain mesh and not do anything with electrodes
- Possibly remove the dependency on Blender
- Incorporate into the neuroimg_pipe repo
    - This will ideally replace the dependence on Bioimage suite (but it might be nice to keep that as an option)

###Example:

![Example](/Picture.jpg)