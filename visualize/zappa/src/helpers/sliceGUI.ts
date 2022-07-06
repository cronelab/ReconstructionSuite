import { r1, r2, r3 } from './renderers';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
import { brainScene } from './loadSurfaces';

export const setGUIS = (options, electrodeName) => {
  useControls('Electrodes', options, [options, electrodeName]);
  useControls('', {
    Slicer: folder({
      redIndex: {
        value: r1.stackHelper?.index || 128,
        min: 0,
        max: r1.stackHelper?.orientationMaxIndex || 255,
        step: 1,
        //@ts-ignore
        onChange: (val) => {
          if (r1.stackHelper) r1.stackHelper.index = val;
        },
      },
      yellowIndex: {
        value: r2.stackHelper?.index || 128,
        min: 0,
        max: r2.stackHelper?.orientationMaxIndex || 255,
        step: 1,
        //@ts-ignore
        onChange: (val) => {
          if (r2.stackHelper) r2.stackHelper.index = val;
        },
      },
      greenIndex: {
        value: r3.stackHelper?.index || 128,
        min: 0,
        max: r3.stackHelper?.orientationMaxIndex || 255,
        step: 1,
        //@ts-ignore
        onChange: (val) => {
          if (r3.stackHelper) r3.stackHelper.index = val;
        },
      },
    }),
    Transparency: folder({
      Gyri: {
        value: 1,
        min: 0,
        max: 1,
        onChange: (val) => {
          brainScene?.children.forEach((child) => {
            if (child.name == 'Gyri') {
              if (val == 0) {
                child.visible = false;
              } else {
                child.visible = true;
              }
              child.traverse((c) => {
                if (c instanceof Mesh) {
                  c.material.opacity = val;
                }
              });
            }
          });
        },
      },
      WhiteMatter: {
        value: 1,
        min: 0,
        max: 1,
        onChange: (val) => {
          brainScene?.children.forEach((child) => {
            if (child.name == 'WhiteMatter') {
              if (val == 0) {
                child.visible = false;
              } else {
                child.visible = true;
              }

              child.traverse((c) => {
                if (c instanceof Mesh) {
                  c.material.opacity = val;
                }
              });
            }
          });
        },
      },
      subcorticalStructures: {
        value: 1,
        min: 0,
        max: 1,
        onChange: (val) => {
          brainScene?.children.forEach((child) => {
            if (child.name == 'SubcorticalStructs') {
              if (val == 0) {
                child.visible = false;
              } else {
                child.visible = true;
              }

              child.traverse((c) => {
                if (c instanceof Mesh) {
                  c.material.opacity = val;
                }
              });
            }
          });
        },
      },
    }),
  });
};

export default setGUIS;
