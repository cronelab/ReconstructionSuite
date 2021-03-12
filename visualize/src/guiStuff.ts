// Import dat.GUI
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import * as dat from '../node_modules/dat.gui/build/dat.gui';
import { Mesh } from 'three';
import { useHistory } from 'react-router-dom';

export const guiCall = (brainScene, slices): void => {
  const gyri = brainScene.children[0];
  const substructures = brainScene.children[1];
  const wm = brainScene.children[2];
  const gui = new dat.GUI({
    autoPlace: false,
  });

  const customContainer = document.getElementById('my-gui-container');
  customContainer.appendChild(gui.domElement);

  const stackFolder = gui.addFolder('Slicer');
  const transparencyToggler = gui.addFolder('Transparency');
  const meshToggler = gui.addFolder('Mesh');
  const electrodeManager = gui.addFolder('Electrodes');
  const newViewerFolder = gui.addFolder('NewViewer');
  const viewerController = function () {
    this.select = false;
  };
  // let viewerbutton = new viewerController();
  // const ViewerSwitcher = newViewerFolder.add(viewerbutton, 'New Viewer', true).listen();
  // ViewerSwitcher.onChange = () => {
  //   useHistory.push('/custom');
  // };

  const redChanged = stackFolder
    .add(slices.r1.stackHelper, 'index', 0, slices.r1.stackHelper.orientationMaxIndex)
    .step(1)
    .listen();
  const yellowChanged = stackFolder
    .add(slices.r2.stackHelper, 'index', 0, slices.r2.stackHelper.orientationMaxIndex)
    .step(1)
    .listen();
  const greenChanged = stackFolder
    .add(slices.r3.stackHelper, 'index', 0, slices.r3.stackHelper.orientationMaxIndex)
    .step(1)
    .listen();

  const meshController = function () {
    this.Mesh = true;
    this.Cortex = true;
    this.WM = true;
    this.Substructures = true;
    this.xTransform = 0;
    this.yTransform = 0;
    this.zTransform = 0;
    this.Transparency = true;
  };
  const text = new meshController();
  const transToggler = transparencyToggler.add(text, 'Transparency', true).listen();
  const fullMeshToggler = meshToggler.add(text, 'Mesh', false).listen();
  const cortexMeshToggler = meshToggler.add(text, 'Cortex', false).listen();
  const wmMeshToggler = meshToggler.add(text, 'WM', false).listen();
  const subMeshToggler = meshToggler.add(text, 'Substructures', false).listen();

  const electrodeController = function (legend) {
    this.Electrode_display = true;
    //   elecs.children[0].children.forEach((elecName) => {
    //     this[elecName.name] = [legend[elecName.name].r * 255, legend[elecName.name].g * 255, legend[elecName.name].b * 255];
    //   });
  };
  // const elecCtrl = new electrodeController(electrodeLegend);
  // const electrodeToggler = electrodeManager.add(elecCtrl, 'Electrode_display', true).listen();

  transToggler.onChange((val) => {
    if (val == true) {
      brainScene.traverse((child) => {
        if (child instanceof Mesh && child.parent.name != 'Electrodes') {
          child.material.transparent = true;
          child.material.opacity = 0.5;
        }
      });
    } else {
      brainScene.traverse((child) => {
        if (child instanceof Mesh && child.parent.name != 'Electrodes') {
          child.material.transparent = false;
        }
      });
    }
  });

  fullMeshToggler.onChange((val) => {
    if (val == false) {
      wm.visible = false;
      gyri.visible = false;
      substructures.visible = false;
      text.Cortex = false;
      text.WM = false;
      text.Substructures = false;
    } else {
      wm.visible = true;
      gyri.visible = true;
      substructures.visible = true;
      text.Cortex = true;
      text.WM = true;
      text.Substructures = true;
    }
  });
  cortexMeshToggler.onChange((val) => {
    if (val == false) {
      gyri.visible = false;
    } else {
      gyri.visible = true;
    }
  });
  wmMeshToggler.onChange((val) => {
    if (val == false) {
      wm.visible = false;
    } else {
      wm.visible = true;
    }
  });
  subMeshToggler.onChange((val) => {
    if (val == false) {
      substructures.visible = false;
    } else {
      substructures.visible = true;
    }
  });
};
