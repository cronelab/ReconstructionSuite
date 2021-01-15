# NeuroSEEK-Viz
![Github Actions](https://github.com/cronelab/ReconstructionVisualizer/workflows/Node.js%20CI/badge.svg?branch=master)
![Circle CI](https://circleci.com/gh/cronelab/ReconstructionVisualizer.svg?style=svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A web-based visualization platform for sEEG electrodes in brain space. This can be used as a stand-alone visualization, or in conjunction with [NeuroSEEK-pipeline](https://github.com/ncsl/seek). 

All this repository requires are ``Blender`` objects (`.glb` files) for the brains and electrodes.


### Visualize Freesurfer cortical parcellations and subcortical segmentations in the browser

Input: Freesurfer directory with completed subjects
Output: 3D mesh file containing brain regions and electrodes

### To run:

- docker run -p 5000:5000 neuroseek/recon_visualizer

### Example:

![Example](/docs/_static/Picture.jpg)
The gLTF binary file format allows for optimized viewing directly in browsers and VR/AR devices.

### Dependencies:

- Select Freesurfer binaries 
- Various [Brainder](https://brainder.org/) scripts for mesh generation
    - Matlab/Octave
- Blender (Freesurfer OBJ to FBX/gLTF)
    - Comes with a python interpreter

# Documentation
The official documentation with usage is at http://neuroseek.azurewebsites.net/docs/

### Instructions:

- In the docker-compose.yml file edit the environment and volumes field:
    - environment:
        - Subject=Name of freesurfer subject
    - volumes:
        - path to $SUBJECTS_DIR

### electrodes.tsv:
| name              | x         | y       | z       |
| ----------------- | --------- | ------- | ------- |
| electrodeGroupA'1 | 4.52036   | 61.73   | 66.4995 |
| electrodeGroupA'2 | 1.85841   | 63.8435 | 66.9489 |
| electrodeGroupA'3 | -2.14716  | 65.0158 | 67.3797 |
| electrodeGroupB'1 | -5.17384  | 65.0651 | 68.1047 |

### reconstruction.glb:
- Brain
    - Gyri
        - all of the left and right hemisphere aparc regions
    - SubcorticalStructs
        - all of the aseg rois
    - WhiteMatter
        - Left-Cerebral-White-Matter
        - Right-Cerebral-White-Matter
- Electrodes
    - electrodeGroupA
        - electrodeGroupA1

Citing
------

+ Preprocessing
    - https://brainder.org/2012/05/08/importing-freesurfer-subcortical-structures-into-blender/
    - https://brainder.org/research/brain-for-blender/

+ Visualization
    - https://github.com/FNNDSC/ami


Version 2.0 viewer
+ Written with react/react-three-fiber/drei
+ Only mesh view, no volumetric rendering
+ localhost/threed.html?subject=$SUBJECT