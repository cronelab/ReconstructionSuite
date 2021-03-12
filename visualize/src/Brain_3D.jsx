import React, { useRef, useState, useEffect } from 'react';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import { modifySize, modifyColor } from './helpers/modifyElectrodes';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Color } from 'three';
import { useControl } from 'react-three-gui';

export function Brain_3D(props) {
  let first = true;

  const elecInfoRef = useRef();
  const subCortRef = useRef();
  const gyriRef = useRef();
  const wmRef = useRef();
  const cam = useRef();
  const lightRef = useRef();
  const brainRef = useRef();
  const electrodeRef = useRef();
  const controlRef = useRef();
  const structureNameRef = useRef();

  //* Import files
  const brain = useLoader(GLTFLoader, `/brain/${props.activeSubject}`);
  const electrodes = useLoader(GLTFLoader, `/electrodes/${props.activeSubject}`);

  //* Destructure nodes
  const { Electrodes } = electrodes.nodes;
  const { Gyri, SubcorticalStructs, WhiteMatter } = brain.nodes;

  //* Set states
  const [labels, setLabels] = useState([]);
  const [allowHover, setAllowHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState('Click a structure to display name');
  const [elecState, setElecState] = useState('Hover over an electrode to view location');
  const [initialGyriColorsDeclared, setInitialGyriColorsDeclared] = useState([]);
  const [initialSubcortColorsDeclared, setInitialSubcortColorsDeclared] = useState([]);

  //* Mesh sliders
  const subcortTransparency = useControl('Transparency: Subcort', {
    type: 'number',
    group: 'Transparency',
    min: 0,
    max: 1,
    value: 0.5,
  });
  const gyriTransparency = useControl('Transparency: Gyri', {
    id: 'GyriTransparency',
    type: 'number',
    group: 'Transparency',
    min: 0,
    max: 1,
    value: 0.5,
  });
  const wmTransparency = useControl('Transparency: WM', {
    type: 'number',
    group: 'Transparency',
    min: 0,
    max: 1,
    value: 0,
  });

  //* Grayscale
  const gyriGrayScale = useControl('Gyri colors: grayscale', {
    type: 'boolean',
    group: 'Grayscale',
    value: false,
  });
  const subcortGrayScale = useControl('Subcort colors: grayscale', {
    type: 'boolean',
    group: 'Grayscale',
    value: false,
  });

  //* Disable electrodes in view
  const disableElectrode = useControl('Disable electrodes?', {
    type: 'boolean',
    value: false,
    group: 'electrodes',
  });

  const rotationX = useControl('Rotation X', { type: 'number', group: 'test' });

  useEffect(() => {
    (async () => {
      let _records = await fetch(`/data/list/${props.activeSubject}`);
      let records = await _records.json();
      set;
    })();
  });

  const dataLoader = useControl('Load data', {
    type: 'button',
    group: 'data',
    onClick() {
      (async () => {
        console.log(records);

        let _data = await fetch(`/data/${props.activeSubject}`);
        let data = await _data.json();
        Object.keys(data).forEach((elec) => {
          modifySize(Electrodes[elec].material, data[elec].size);
          modifyColor(Electrodes[elec], data[elec].color);
        });
      })();
    },
  });

  //* Gyri grayscale
  useEffect(() => {
    if (initialGyriColorsDeclared.length <= 0) {
      let _initialGyriColorsDeclared = gyriRef.current.children.map((mat) => mat.material.color);
      setInitialGyriColorsDeclared(_initialGyriColorsDeclared);
    } else {
      if (gyriGrayScale === true)
        gyriRef.current.children.map((mat) => {
          mat.material.color = new Color('rgb(255,255,255)');
          mat.material.opacity = 1;
        });
      else if (gyriGrayScale === false) {
        gyriRef.current.children.map((mat, i) => {
          mat.material.color = initialGyriColorsDeclared[i];
          mat.material.opacity = gyriTransparency;
        });
      }
    }
  }, [gyriGrayScale]);

  //Subcortical grayscale
  useEffect(() => {
    if (initialSubcortColorsDeclared.length <= 0) {
      let _initialSubcortColorsDeclared = subCortRef.current.children.map((mat) => {
        if (mat instanceof Mesh) {
          return mat.material.color;
        } else {
          return null;
        }
      });
      setInitialSubcortColorsDeclared(_initialSubcortColorsDeclared);
    } else {
      if (subcortGrayScale === true)
        subCortRef.current.children.map((mat) => {
          if (mat instanceof Mesh) {
            mat.material.color = new Color('rgb(50,50,50)');
            mat.materialopacity = 1;
          }
        });
      else if (subcortGrayScale === false) {
        subCortRef.current.children.map((mat, i) => {
          if (mat instanceof Mesh) {
            mat.material.color = initialSubcortColorsDeclared[i];
            mat.materialopacity = subcortTransparency;
          }
        });
      }
    }
  }, [subcortGrayScale]);

  //Current electrode
  useControl('currentElectrode', {
    type: 'custom',
    value: elecState,
    group: 'descriptors',
    component: () => <div ref={elecInfoRef}>{elecState}</div>,
  });

  //Current structure
  useControl('selectedStructure', {
    type: 'custom',
    value: selectedStructure,
    group: 'descriptors',
    component: () => <div ref={structureNameRef}>{selectedStructure}</div>,
  });

  useEffect(() => {
    electrodeRef.current.children.forEach((child) => {
      child.traverse((electrode) => {
        electrode.visible = !disableElectrode;
      });
    });
  }, [disableElectrode]);

  // useEffect(() => {
  //   electrodeRef.current.children.forEach((child) => {
  //     child.traverse((electrode) => {
  //       modifySize(electrode,1);
  //       // electrode.visible = !disableElectrode;
  //     });
  //   });
  // }, [disableElectrode]);

  useEffect(() => {
    subCortRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = subcortTransparency;
      }
    });
    if (subcortTransparency === 0) {
      subCortRef.current.visible = false;
    } else {
      subCortRef.current.visible = true;
    }
  }, [subcortTransparency]);

  useEffect(() => {
    wmRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = wmTransparency;
      }
    });
    if (wmTransparency === 0) {
      wmRef.current.visible = false;
    } else {
      wmRef.current.visible = true;
    }
  }, [wmTransparency]);

  useEffect(() => {
    gyriRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = gyriTransparency;
      }
    });
    if (gyriTransparency === 0) {
      gyriRef.current.visible = false;
    } else {
      gyriRef.current.visible = true;
    }
  }, [gyriTransparency]);

  useFrame(({ camera, scene }) => {
    lightRef.current.position.copy(camera.position);
    //    console.log(electrodeRef)
  });
  //renderOrder
  useEffect(() => {
    if (controlRef.current && first === true) {
      first = false;
      controlRef.current.addEventListener('end', (e) => setAllowHover(true));
      controlRef.current.addEventListener('start', (e) => setAllowHover(false));
    }
  }, [controlRef.current || first]);

  return (
    <group dispose={null}>
      <directionalLight ref={lightRef} position={[0, 0, -400]} />
      <OrthographicCamera ref={cam} makeDefault position={[0, 0, -400]} zoom={1} />
      <OrbitControls ref={controlRef} rotateSpeed={2} target0={brainRef} />
      {/* Gyri */}
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          e.object.scale.set(1.5, 1.5, 1.5);
          structureNameRef.current.innerText = `Selected structure: ${e.object.name}`;
          setTimeout(() => {
            structureNameRef.current.innerText = `Select a structure`;
            e.object.scale.set(1, 1, 1);
          }, 1000);
        }}
        ref={gyriRef}
        {...props}
        object={Gyri}
      ></primitive>
      {/* Subcortical structures */}
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          e.object.scale.set(1.5, 1.5, 1.5);
          structureNameRef.current.innerText = `Selected structure: ${e.object.name}`;
          setTimeout(() => {
            structureNameRef.current.innerText = `Select a structure`;
            e.object.scale.set(1, 1, 1);
          }, 1000);
        }}
        ref={subCortRef}
        {...props}
        object={SubcorticalStructs}
      ></primitive>
      {/* White Matter */}

      <primitive ref={wmRef} {...props} object={WhiteMatter}></primitive>

      {/* Electrodes */}
      <primitive
        ref={electrodeRef}
        object={Electrodes}
        {...props}
        onPointerOver={(e) => {
          e.stopPropagation();
          e.object.scale.set(3, 3, 3);
          let location = labels?.filter((label) => {
            let withoutApost = label.name.split("'");
            if (withoutApost[0] + withoutApost[1] === e.object.name) {
              return label;
            } else {
              return null;
            }
          });
          elecInfoRef.current.innerText = `${e.object.name}`;
          if (location.length > 0) {
            elecInfoRef.current.innerText = `${e.object.name}: ${location[0].location}`;
          }
        }}
        onPointerOut={(e) => {
          elecInfoRef.current.innerText = `Hover over another electrode`;

          e.object.scale.set(1, 1, 1);
        }}
      ></primitive>
    </group>
  );
}
