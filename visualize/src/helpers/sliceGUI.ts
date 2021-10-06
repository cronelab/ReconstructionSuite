//@ts-nocheck
import { r1, r2, r3 } from './renderers';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
import { brainScene } from './loadSurfaces';

// let brainScene;
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
      value: .5,
      min:0,
      max:1,
      onChange: (val) => {
          brainScene?.traverse((child) => {
            console.log(child)
            if(child instanceof Mesh){

              // child.material.transparent = true;
              child.material.opacity = val;
            }
          });
        }
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
