import bpy
import os
import pandas

def main():

    patientDir=os.environ.get('SUBJECTS_DIR')
    patientID=os.environ.get('SUBJECT')

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

    bpy.ops.export_scene.gltf(
        export_format="GLB",
        filepath="{dir}/{patient}".format(dir=subjDir,
        patient="electrodes"),
        export_texcoords=False,
        export_normals=False,
        export_cameras=False,
        export_yup=False)

if __name__ == "__main__":
    main()
