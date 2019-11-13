
import bpy
import scipy.io
import os
import sys

def main(patient=''):

    subjDir = "{dir}{patient}".format(
        dir=os.environ['SUBJECTS_DIR'], patient=patient)

    electrodes = scipy.io.loadmat("{dir}/electrodes/electrodes.mat".format(dir=subjDir))

    bpy.ops.object.empty_add(type='CUBE')
    bpy.context.active_object.name = 'Electrodes'
    bpy.ops.object.empty_add(type='CUBE')
    bpy.context.active_object.name = 'aseg'

    for i in range(0, len(electrodes['electrodes']['position'][0][0])):
        bpy.ops.mesh.primitive_ico_sphere_add(
            location=electrodes['electrodes']['position'][0][0][i])
        bpy.context.active_object.name = electrodes['electrodes']['label'][0][0][i][0][0]
        bpy.context.active_object.parent = bpy.data.objects['Electrodes']


    for file in os.listdir("{dir}/obj".format(dir=subjDir)):
        if file.endswith(".obj"):
            bpy.ops.import_scene.obj(
                filepath="{dir}/obj/".format(dir=subjDir) + file)
            bpy.data.objects[os.path.splitext(
                file)[0]].parent = bpy.data.objects['aseg']

    bpy.ops.export_scene.fbx(filepath="{dir}/{patient}".format(dir=subjDir,patient=patient) + ".fbx")


if __name__ == "__main__":
    main(sys.argv[4])

