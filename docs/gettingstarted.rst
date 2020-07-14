Getting Started
======================================

Setup (see `SEEK <https://github.com/ncsl/seek>`_)
------------------------------------------------------------------------------
- Install `Freesurfer <https://surfer.nmr.mgh.harvard.edu/fswiki/DownloadAndInstall>`_
- Run a Freesurfer reconstruction: recon-all...
- Perform a CT/T1 coregistration
    + Freesurfer
    + Fieldtrip
- Perform an electrode localization on the coregistered CT
    + Fieldtrip
    + BioimageSuite
- create a folder in the FS subject/subject directory 'electrodes'
- Place a BIDS-compliant electrode file corresponding to the Freesurfer tkRAS brain meshes in the electrodes folder

Without Docker
---------------------------------
- Install `Blender <https://docs.blender.org/manual/en/latest/getting_started/installing/index.html/>`_
- git clone https://github.com/cronelab/FreesurferMeshGenerator
- cd FreesurferMeshGenerator
- ./scripts/runscript.sh

With Docker
-----------------------------------------
.. code-block:: bash
    :linenos:
      - SUBJECT=fsaverage

    # Replace SUBJECTS_DIR and SUBJECT variables with your own
    docker run --rm -e SUBJECTS_DIR=/data/derivatives/freesurfer -e SUBJECT=fsaverage neuroseek/recon_visualizer 




.. Modify docker-compose.yml
..     - $SUBJECT environment variable should point to processed Freesurfer SUBJECT
..     - Volume should point to Freesurfer $SUBJECTS_DIR

..     .. code-block:: bash

..         docker-compose up --build

Output data
--------------------------------

- brain.glb
- electrodes.glb
- reconstruction.nii # T1.mgz converted to nifti