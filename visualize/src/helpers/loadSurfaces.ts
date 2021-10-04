//@ts-nocheck
import { Matrix4, Mesh, Color, MeshBasicMaterial, Scene, FrontSide, BackSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // Import GLTFLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { activeSubject, data, sceneClip, electrodeLegend } from './renderers';
export const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/'); // use a full url path
gltfLoader.setDRACOLoader(dracoLoader);

export const loadBrainSurface = async (r0, worldCenter) => {
  // return new Promise(async (resolve) => {
  let brain = await gltfLoader.loadAsync(`/brain/${activeSubject}`);
  let electrodes = await gltfLoader.loadAsync(`/electrodes/${activeSubject}`);

  brain.scene.name = 'BrainMeshScene';
  electrodes.scene.name = 'ElectrodesMeshScene';

  const RASToLPS = new Matrix4();
  RASToLPS.set(-1, 0, 0, worldCenter.x, 0, -1, 0, worldCenter.y, 0, 0, 1, worldCenter.z, 0, 0, 0, 1);

  let i = 1;

  brain.scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.transparent = true;
      child.material.opacity = 0.4;
    }
  });

  brain.scene.children[0].applyMatrix4(RASToLPS);

  // ElectrodeScene = object3d.scene;
  electrodes.scene.children.forEach((electrodeGroups) => {
    electrodeGroups.children.forEach((electrodeGroup) => {
      electrodeGroup.children.forEach((actualElectrode) => {
        data[i] = {};
        let meshOpacity = 0.8;

        data[i].scene = new Scene();
        data[i].materialFront = new MeshBasicMaterial({
          color: new Color(1, 0, 0),
          side: FrontSide,
          depthWrite: true,
          opacity: 0,
          transparent: true,
          clippingPlanes: [],
        });
        //@ts-ignore
        data[i].meshFront = new Mesh(actualElectrode.geometry, data[i].materialFront);
        data[i].materialBack = new MeshBasicMaterial({
          color: new Color(1, 0, 0),
          side: BackSide,
          depthWrite: true,
          opacity: meshOpacity,
          transparent: true,
          clippingPlanes: [],
        });
        //@ts-ignore
        data[i].meshBack = new Mesh(actualElectrode.geometry, data[i].materialBack);
        data[i].meshFront.position.set(
          actualElectrode.position.x,
          actualElectrode.position.y,
          actualElectrode.position.z
        );
        data[i].meshBack.position.set(
          actualElectrode.position.x,
          actualElectrode.position.y,
          actualElectrode.position.z
        );
        data[i].scene.add(data[i].meshFront);
        data[i].scene.add(data[i].meshBack);
        data[i].scene.applyMatrix4(RASToLPS);
        sceneClip.add(data[i].scene);
        i++;
      });
      // const childMesh = electrodeGroup.children[0];
      // if (childMesh instanceof Mesh) {
      //   electrodeLegend[electrodeGroup.name] = childMesh.material.color;
      //   childMesh.material.color = new Color(1, 0, 0);
      // }
    });
  });
  electrodes.scene.applyMatrix4(RASToLPS);

  r0.scene.add(brain.scene);
  r0.scene.add(electrodes.scene);

  return {
    brainScene: brain.scene,
    electrodeScene: electrodes.scene,
  };
};
