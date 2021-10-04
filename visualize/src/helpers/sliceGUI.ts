//@ts-nocheck
import { r1, r2, r3 } from './renderers';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
// import { brainScene } from './loadSurfaces';

let brainScene;
export const setGUIS = () => {
  //@ts-ignore
  const [, si] = useControls('Slice index', {
    redIndex: {
      value: r1.stackHelper?.index || 0,
      min: 0,
      max: r1.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => (r1.stackHelper?.index = val),
    },
    yellowIndex: {
      value: r2.stackHelper?.index || 0,
      min: 0,
      max: r2.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => (r2.stackHelper?.index = val),
    },
    greenIndex: {
      value: r3.stackHelper?.index || 0,
      min: 0,
      max: r3.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => (r3.stackHelper?.index = val),
    },
  });
  //@ts-ignore
  const [, trans] = useControls('Transparency', {
    subcorticalStructs: {
      value: true,
      onChange: (val) => {
        if (val == false) {
          brainScene?.traverse((child) => {
            if (child instanceof Mesh && child.parent.name != 'Electrodes') {
              child.material.transparent = true;
              child.material.opacity = 0.5;
            }
          });
        } else {
          brainScene?.traverse((child) => {
            if (child instanceof Mesh && child.parent.name != 'Electrodes') {
              child.material.transparent = false;
            }
          });
        }
      },
    },
  });
  //@ts-ignore
  const [, meshtoggle] = useControls('Mesh toggle', {
    Gyri: {
      value: true,
      onChange: (val) => {
        if (val == true) {
          brainScene?.children.forEach((child) => {
            if (child.name == 'Gyri') {
              child.visible = true;
            }
          });
        } else {
          brainScene?.children.forEach((child) => {
            if (child.name == 'Gyri') {
              child.visible = false;
            }
          });
        }
      },
    },
    WhiteMatter: {
      value: true,
      onChange: (val) => {
        if (val == true) {
          brainScene?.children.forEach((child) => {
            if (child.name == 'WhiteMatter') {
              child.visible = true;
            }
          });
        } else {
          brainScene?.children.forEach((child) => {
            if (child.name == 'WhiteMatter') {
              child.visible = false;
            }
          });
        }
      },
    },
    SubcortStructs: {
      value: true,
      onChange: (val) => {
        if (val == true) {
          brainScene?.children.forEach((child) => {
            if (child.name == 'SubcorticalStructs') {
              child.visible = true;
            }
          });
        } else {
          brainScene?.children.forEach((child) => {
            if (child.name == 'SubcorticalStructs') {
              child.visible = false;
            }
          });
        }
      },
    },
    All: {
      value: true,
      onChange: (val) => {
        if (val == true) {
          brainScene?.children.forEach((child) => {
            child.visible = true;
          });
        } else {
          brainScene?.children.forEach((child) => {
            child.visible = false;
          });
        }
      },
    },
  });
};

export default setGUIS;
