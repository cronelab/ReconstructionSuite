#!/bin/bash
echo "Brain converter"
echo "Enter Patient #: "
read patientID
blender --background --python obj2fbx.py $patientID