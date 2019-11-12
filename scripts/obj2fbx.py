# import bpy
# import sys
# print(sys.argv[4])
# path = '../Subjects/'+sys.argv[4]+'/Unity/'+sys.argv[4]
# bpy.ops.import_scene.obj(filepath=path + ".obj")


# labels = [
# 'lh_pial',
# 'rh_pial',
# 'lh_white',
# 'rh_white',
# 'lHipp',
# 'rHipp',
# 'lThal',
# 'rThal',
# 'lBrainStem',
# 'lCaud',
# 'rCaud',
# 'rAmgd',
# 'lAmgd',
# 'rPut',
# 'lPut',
# 'rh_bankssts',
# 'lh_bankssts',
# 'rh_inferiorparietal',
# 'lh_inferiorparietal',
# 'rh_medialorbitofrontal',
# 'lh_medialorbitofrontal',
# 'rh_pericalcarine',
# 'lh_pericalcarine',
# 'rh_superiorfrontal',
# 'lh_superiorfrontal',
# 'rh_caudalanteriorcingulate',
# 'lh_caudalanteriorcingulate',
# 'rh_inferiortemporal',
# 'lh_inferiortemporal',
# 'rh_middletemporal',
# 'lh_middletemporal',
# 'rh_postcentral',
# 'lh_postcentral',
# 'rh_superiorparietal',
# 'lh_superiorparietal',
# 'rh_caudalmiddlefrontal',
# 'lh_caudalmiddlefrontal',
# 'rh_insula',
# 'lh_insula',
# 'rh_paracentral',
# 'lh_paracentral',
# 'rh_posteriorcingulate',
# 'lh_posteriorcingulate',
# 'rh_superiortemporal',
# 'lh_superiortemporal',
# 'rh_cuneus',
# 'lh_cuneus',
# 'rh_isthmuscingulate',
# 'lh_isthmuscingulate',
# 'rh_parahippocampal',
# 'lh_parahippocampal',
# 'rh_precentral',
# 'lh_precentral',
# 'rh_supramarginal',
# 'lh_supramarginal',
# 'rh_entorhinal',
# 'lh_entorhinal',
# 'rh_lateraloccipital',
# 'lh_lateraloccipital',
# 'rh_parsopercularis',
# 'lh_parsopercularis',
# 'rh_precuneus',
# 'lh_precuneus',
# 'rh_temporalpole',
# 'lh_temporalpole',
# 'rh_frontalpole',
# 'lh_frontalpole',
# 'rh_lateralorbitofrontal',
# 'lh_lateralorbitofrontal',
# 'rh_parsorbitalis',
# 'lh_parsorbitalis',
# 'rh_rostralanteriorcingulate',
# 'lh_rostralanteriorcingulate',
# 'rh_transversetemporal',
# 'lh_transversetemporal',
# 'rh_fusiform',
# 'lh_fusiform',
# 'rh_lingual',
# 'lh_lingual',
# 'rh_parstriangularis',
# 'lh_parstriangularis',
# 'rh_rostralmiddlefrontal',
# 'lh_rostralmiddlefrontal']
# objects = bpy.data.objects

# for i in range(0,len(list(objects))):
#     if(i < len(labels)):
#         objects[0].name = labels[i]

# newParents = ['Pia', 'Substructures', 'White_matter',
#                 'Gyri', 'Electrodes']
# for np in newParents:
#     bpy.ops.object.empty_add(type='CUBE')
#     bpy.data.objects['Empty'].name = np

# objects = bpy.data.objects


# bpy.data.objects['lh_pial'].parent = bpy.data.objects['Pia']
# bpy.data.objects['rh_pial'].parent = bpy.data.objects['Pia']
# bpy.data.objects['lh_white'].parent = bpy.data.objects['White_matter']
# bpy.data.objects['rh_white'].parent = bpy.data.objects['White_matter']
# bpy.data.objects['rHipp'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lHipp'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lThal'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['rThal'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lBrainStem'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lCaud'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['rCaud'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lAmgd'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['rAmgd'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['lPut'].parent = bpy.data.objects['Substructures']
# bpy.data.objects['rPut'].parent = bpy.data.objects['Substructures']

# objects = bpy.data.objects

# for i in range(15,len(labels)):
#     objects[labels[i]].parent = objects['Gyri']

# objects = bpy.data.objects

# for i in range(0,len(list(objects))):
#     if(objects[i].name[0:3]=='grp'):
#         objects[i].name="elec_"+str(i)
#         objects["elec_"+str(i)].parent = objects['Electrodes']


# bpy.ops.export_scene.fbx(filepath=path + ".fbx")

import bpy
import scipy.io
import os
elecmatrix = scipy.io.loadmat(
    '/home/chris/Subjects/PY19N025_Grid/electrodes/electrodes.mat')

# bpy.ops.object.empty_add(type='CUBE')
# bpy.context.active_object.name = 'Pia'
bpy.ops.object.empty_add(type='CUBE')
bpy.context.active_object.name = 'Electrodes'
bpy.ops.object.empty_add(type='CUBE')
bpy.context.active_object.name = 'aseg'

for i in range(0, len(elecmatrix['electrodes']['position'][0][0])):
    bpy.ops.mesh.primitive_ico_sphere_add(
        location=elecmatrix['electrodes']['position'][0][0][i])
    bpy.context.active_object.name = elecmatrix['electrodes']['label'][0][0][i][0][0]
    bpy.context.active_object.parent = bpy.data.objects['Electrodes']


for file in os.listdir("/home/chris/Subjects/PY19N025_Grid/obj"):
    if file.endswith(".obj"):
        bpy.ops.import_scene.obj(
            filepath="/home/chris/Subjects/PY19N025_Grid/obj/" + file)
        bpy.data.objects[os.path.splitext(
            file)[0]].parent = bpy.data.objects['aseg']


# bpy.data.objects['lh.pial'].parent = bpy.data.objects['Pia']
# bpy.data.objects['rh.pial'].parent = bpy.data.objects['Pia']

bpy.ops.export_scene.fbx(filepath='/home/chris/Subjects/PY19N025_Grid/PY19N025_Grid' + ".fbx")
