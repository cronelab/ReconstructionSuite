   .. _gettingstarted:
   
Getting Started
====================================================

.. toctree::
   :maxdepth: 2
   :caption: Test:

Step 0:
----------------------------------------------
- In order to view the 3D brain meshes ensure you run the `mesh generator pipeline <https://github.com/cronelab/FreesurferMeshGenerator>`_


Running without Docker
----------------------------------------------

Dependencies
++++++++++++++++++++++++++++++++++
- Node v14
- Git


.. code-block:: bash
    :linenos:

    git clone https://github.com/cronelab/ReconstructionVisualizer.git
    cd ReconstructionVisualizer
    npm i
    # Linux
    export SUBJECTS_DIR=$(pwd) # path to FS subject directory
    export SUBJECT=fsaverage # path to FS subject
    export PORT=80 # Whatever port you want to run the webserver
    # Windows
    set SUBJECTS_DIR=%cd% # path to FS subject directory
    set SUBJECT=fsaverage # path to FS subject
    set PORT=80 # Whatever port you want to run the webserver
    npm run start

Running with Docker
-------------------------

Dependencies
++++++++++++++++++++++++++++++++++
- Docker

.. code-block:: bash
    :linenos:

    # Replace SUBJECTS_DIR and SUBJECT variables with your own
    docker run --rm -p 80:80 -e PORT=80 -e SUBJECTS_DIR=/data/derivatives/freesurfer -e SUBJECT=fsaverage neuroseek/recon_visualizer 

