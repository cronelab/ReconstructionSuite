// Import dat.GUI
//@ts-nocheck
import * as dat from '../../node_modules/dat.gui/build/dat.gui';
import { lutHelperFactory } from '../../node_modules/ami.js/build/ami';

export const guiCall = (): void => {
  console.log('ASD');
  const HelpersLut = lutHelperFactory();
  const gui = new dat.GUI({
    autoPlace: false,
  });
  console.log('hello');

  const customContainer = document.getElementById('my-gui-container');
  customContainer.appendChild(gui.domElement);
  // const element = gui.domElement; // Store the element to re-render on print.js changes
  // document.body.appendChild(element);
  const lut = new HelpersLut(
    'slices',
    'default',
    'linear',
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
    ]
  );
  lut.luts = HelpersLut.presetLuts();
  // const LutFolder = gui.addFolder('LUT');
  // const lutUpdate1 = LutFolder.add(r1.stackHelper.slice, 'lut', lut.lutsAvailable());
  // const lutUpdate2 = LutFolder.add(r2.stackHelper.slice, 'lut', lut.lutsAvailable());
  // const lutUpdate3 = LutFolder.add(r3.stackHelper.slice, 'lut', lut.lutsAvailable());
  // lutUpdate1.onChange((value) => {
  //   lut.lut = value;
  //   r1.stackHelper.slice.lutTexture = lut.texture;
  // });
  // lutUpdate2.onChange((value) => {
  //   lut.lut = value;
  //   r2.stackHelper.slice.lutTexture = lut.texture;
  // });
  // lutUpdate3.onChange((value) => {
  //   lut.lut = value;
  //   r3.stackHelper.slice.lutTexture = lut.texture;
  // });

  // // Red
  const stackFolder = gui.addFolder('Slicer');
  // const redChanged = stackFolder.add(r1.stackHelper, 'index', 0, r1.stackHelper.orientationMaxIndex).step(1).listen();
  // const yellowChanged = stackFolder.add(r2.stackHelper, 'index', 0, r2.stackHelper.orientationMaxIndex).step(1).listen();
  // const greenChanged = stackFolder.add(r3.stackHelper, 'index', 0, r3.stackHelper.orientationMaxIndex).step(1).listen();

  const meshController = function () {
    this.Mesh = true;
    this.Cortex = true;
    this.WM = true;
    this.Substructures = true;
    this.xTransform = 0;
    this.yTransform = 0;
    this.zTransform = 0;
    // this.screenshot = () => {
    //   html2canvas(document.querySelector("#main")).then((canvas) => {
    //     document.body.appendChild(canvas);
    //   });
    // };
    this.Transparency = true;
  };
  const text = new meshController();
  const transparencyToggler = gui.addFolder('Transparency');
  const transToggler = transparencyToggler.add(text, 'Transparency', true).listen();
  // let screenshot = meshToggler.add(text, "screenshot").listen();

  const meshToggler = gui.addFolder('Mesh');

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
  // const electrodeManager = gui.addFolder('Electrodes');
  // const electrodeToggler = electrodeManager.add(elecCtrl, 'Electrode_display', true).listen();
};
