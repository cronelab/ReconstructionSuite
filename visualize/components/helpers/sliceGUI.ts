import { r0, r1, r2, r3 } from './renderers';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';
import { brainScene } from './loadSurfaces';
// import { modality } from './renderers';

// let brainScene;
export const setGUIS = async (newOpts, electrodeName) => {
  // if(modality == "T1"){
  // }
  // else if(modality == "CT"){
  // useControls('Electrodes', newOpts, [newOpts, electrodeName]);
  // console.log(brainScene);
  // }

  // @ts-ignore
  useControls('Slice index', {
    redIndex: {
      value: r1.stackHelper?.index || 0,
      min: 0,
      max: r1.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => {
        if (r1.stackHelper) r1.stackHelper.index = val;
      },
    },
    yellowIndex: {
      value: r2.stackHelper?.index || 0,
      min: 0,
      max: r2.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => {
        if (r2.stackHelper) r2.stackHelper.index = val;
      },
    },
    greenIndex: {
      value: r3.stackHelper?.index || 0,
      min: 0,
      max: r3.stackHelper?.orientationMaxIndex || 255,
      step: 1,
      //@ts-ignore
      onChange: (val) => {
        if (r3.stackHelper) r3.stackHelper.index = val;
      },
    },
  });

  
};

export default setGUIS;
