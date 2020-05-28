import bpy
import os
import sys
import json
import math
import pandas
import csv

def main():

    patientDir=os.environ.get('SUBJECTS_DIR')
    patientID=os.environ.get('SUBJECT')
    
    with open('/home/scripts/materialColors.json') as json_file:
        data = json.load(json_file)

    scn = bpy.context.scene
    if not scn.render.engine == 'CYCLES':
        scn.render.engine = 'CYCLES'

    subjDir = "{patientDir}/{patient}".format(patientDir=patientDir, patient=patientID)

    bpy.ops.object.empty_add()
    bpy.context.active_object.name = 'Electrodes'
    electrodes = pandas.read_csv("{dir}/electrodes/electrodes.tsv".format(dir=subjDir), sep="\t")

    oldElectrodeGroup = ''


    for index, elecName in enumerate(electrodes['name']): 
        electrodeGroup = elecName.split("'")[0]
        if(oldElectrodeGroup != electrodeGroup):
            bpy.ops.object.empty_add()
            bpy.context.active_object.name = electrodeGroup
            bpy.context.active_object.parent = bpy.data.objects['Electrodes']
            oldElectrodeGroup = electrodeGroup
        electrodeName = "{group}{name}".format(group=electrodeGroup, name=elecName.split('\'')[1])
        electrodeX = float(electrodes['x'][index])
        electrodeY = float(electrodes['y'][index])
        electrodeZ = float(electrodes['z'][index])
        bpy.ops.mesh.primitive_ico_sphere_add(
            location=(electrodeX, electrodeY, electrodeZ))
        bpy.context.active_object.name = electrodeName
        bpy.context.active_object.parent = bpy.data.objects[electrodeGroup]

    bpy.ops.object.empty_add()
    bpy.context.active_object.name = 'Brain'
    bpy.ops.object.empty_add()
    bpy.context.active_object.name = 'Gyri'
    bpy.context.active_object.parent = bpy.data.objects['Brain']
    bpy.ops.object.empty_add()
    bpy.context.active_object.name = 'WhiteMatter'
    bpy.context.active_object.parent = bpy.data.objects['Brain']
    bpy.ops.object.empty_add()
    bpy.context.active_object.name = 'SubcorticalStructs'
    bpy.context.active_object.parent = bpy.data.objects['Brain']


    for file in os.listdir("{dir}/obj".format(dir=subjDir)):
        name = file.split(sep=".obj")[0]

        r = float(data[os.path.splitext(file)[0]][0]/255)
        g = float(data[os.path.splitext(file)[0]][1]/255)
        b = float(data[os.path.splitext(file)[0]][2]/255)
        if name.endswith("-Cerebral-Cortex") == False:
            bpy.ops.import_scene.obj(filepath="{dir}/obj/".format(dir=subjDir) + file, axis_forward='Y')
            mat = bpy.data.materials.new("brainMaterial")
            mat.diffuse_color = (r, g, b, 1)
            bpy.data.objects[os.path.splitext(
                file)[0]].active_material = mat
            mat.use_nodes = True

            if name.endswith("-Cerebral-Cortex"):
                pass
            elif file[2] == '.':
                bpy.data.objects[os.path.splitext(
                    file)[0]].parent = bpy.data.objects['Gyri']
            elif file == 'Left-Cerebral-White-Matter.obj' or file == 'Right-Cerebral-White-Matter.obj':
                bpy.data.objects[os.path.splitext(
                    file)[0]].parent = bpy.data.objects['WhiteMatter']
            else:
                bpy.data.objects[os.path.splitext(
                    file)[0]].parent = bpy.data.objects['SubcorticalStructs']

    bpy.ops.export_scene.gltf(
        export_format="GLB",
        filepath="{dir}/{patient}".format(dir=subjDir,
        patient="reconstruction"),
        export_texcoords=False,
        export_normals=False,
        export_cameras=False,
        export_yup=False)
        # export_draco_mesh_compression_enable=True)


if __name__ == "__main__":
    main()
