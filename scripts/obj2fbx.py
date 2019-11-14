import bpy
import os
import sys

def main(patient=''):

    bpy.ops.object.empty_add(type='CUBE')
    bpy.context.active_object.name = 'Electrodes'
    bpy.ops.object.empty_add(type='CUBE')
    bpy.context.active_object.name = 'aseg'

    subjDir = "{dir}{patient}".format(
        dir=os.environ['SUBJECTS_DIR'], patient=patient)
        
    electrodes = open("{dir}/electrodes/electrodes.txt".format(dir=subjDir))
    elecs = electrodes.readlines()
    for elec in elecs:
        electrodeGroup = elec.split('\t')[0]
        electrodeName = elec.split('\t')[2]
        electrodeX = float(elec.split('\t')[3])
        electrodeY = float(elec.split('\t')[4])
        electrodeZ = float(elec.split('\t')[5])
        bpy.ops.mesh.primitive_ico_sphere_add(
            location=(electrodeX, electrodeY, electrodeZ))
        bpy.context.active_object.name = electrodeName
        bpy.context.active_object.parent = bpy.data.objects['Electrodes']

    for file in os.listdir("{dir}/obj".format(dir=subjDir)):
        if file.endswith(".obj"):
            bpy.ops.import_scene.obj(
                filepath="{dir}/obj/".format(dir=subjDir) + file)
            bpy.context.active_object.rotation_euler = (-90,0,0)
            bpy.data.objects[os.path.splitext(
                file)[0]].parent = bpy.data.objects['aseg']

    bpy.ops.export_scene.fbx(filepath="{dir}/{patient}".format(dir=subjDir,patient=patient) + ".fbx")

if __name__ == "__main__":
    main(sys.argv[4])

