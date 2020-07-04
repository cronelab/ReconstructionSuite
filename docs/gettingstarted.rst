Getting Started
======================================

Required files
----------------------------
1. Freesurfer subject directory
2. electrodes folder inside Freesurfer subject directory

 - electrodes.tsv file in BIDS format

Modify docker-compose.yml
    - $SUBJECT environment variable should point to processed Freesurfer SUBJECT
    - Volume should point to Freesurfer $SUBJECTS_DIR

    .. code-block:: bash

        docker-compose up --build

