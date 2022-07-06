import React, { useRef, useState, useEffect, Suspense } from 'react';
import { OrthographicCamera, OrbitControls, Html, useProgress } from '@react-three/drei';
// import { modifySize, modifyColor } from './notyet/modifyElectrodes';
import { useLoader, useFrame, Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Color, Scene } from 'three';
import { useControls, Leva } from 'leva';
import { useRouter } from 'next/router';
import { loadBrainScene, loadElectrodeScene } from '../components/helpers/loadSurfaces';
const Electrodes = (props) => {
  const activeSubject = props.subject;

  const { disableElectrode } = useControls('Electrode view', {
    disableElectrode: false,
  });


  const [electrodes, setElectrodes] = useState();

  const elecInfoRef = useRef();
  const electrodeRef = useRef<Mesh>(null);
  useEffect(() => {
    console.log(activeSubject);
    (async() => {
      if(activeSubject != undefined){
        let colorReq = await fetch(`/api/subject/electrodeColors/?subject=${activeSubject}`);
        let colors = await colorReq.json();
        let _electrodes = await loadElectrodeScene(activeSubject,colors)
        // electrodes = useLoader(GLTFLoader, `/api/electrodes/${activeSubject}`, null, (e) => console.log(e)) || null;
        setElectrodes(_electrodes.electrodeScene); // * Destructure nodes
        console.log(_electrodes)
      }
    })()
  },[activeSubject])


  const ElectrodeRenderer = () => {
    if (electrodes != undefined) {
      return (
        <primitive
          ref={electrodeRef}
          object={electrodes}
          activeSubject={activeSubject}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          position={[0, 0, 0]}
          // onPointerOver={(e) => {
          //   e.stopPropagation();
          //   e.object.scale.set(3, 3, 3);
          //   let location = labels?.filter((label) => {
          //     let withoutApost = label.name.split("'");
          //     if (withoutApost[0] + withoutApost[1] === e.object.name) {
          //       return label;
          //     } else {
          //       return null;
          //     }
          //   });
          //   elecInfoRef.current.innerText = `${e.object.name}`;
          //   if (location.length > 0) {
          //     elecInfoRef.current.innerText = `${e.object.name}: ${location[0].location}`;
          //   }
          // }}
          // onPointerOut={(e) => {
          //   elecInfoRef.current.innerText = `Hover over another electrode`;

          //   e.object.scale.set(1, 1, 1);
          // }}
        ></primitive>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <ElectrodeRenderer></ElectrodeRenderer>
    </>
  );
};

const Brain = (props) => {
  const activeSubject = props.subject;
  let first = true;

  const subCortRef = useRef<Mesh>(null);
  const gyriRef = useRef<Mesh>(null);
  const wmRef = useRef<Mesh>(null);
  const cam = useRef();
  const lightRef = useRef<Mesh>(null);
  const brainRef = useRef();
  const controlRef = useRef<Mesh>(null);
  const structureNameRef = useRef<HTMLElement>(null);

  // //* Import files
  const [brain, setBrain] = useState();
  const [Gyri, setGyri] = useState();
  const [SubcorticalStructs, setSubcorticalStructs] = useState();
  const [WhiteMatter, setWhiteMatter] = useState();

  useEffect(() => {
    (async () => {

    console.log(activeSubject)
    if (activeSubject != undefined) {
      const _brain = await loadBrainScene(activeSubject)
      // const { Gyri, SubcorticalStructs, WhiteMatter } = _brain.nodes;
      setGyri(_brain.brainScene.children[0].children[0]);
      setSubcorticalStructs(_brain.brainScene.children[0].children[1]);
      setWhiteMatter(_brain.brainScene.children[0].children[2]);
    }
  })()

  }, [activeSubject]);

  // //* Set states
  const [labels, setLabels] = useState([]);
  const [allowHover, setAllowHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [selectedStructure, setSelectedStructure] = useState('Click a structure to display name');
  const [elecState, setElecState] = useState('Hover over an electrode to view location');
  const [initialGyriColorsDeclared, setInitialGyriColorsDeclared] = useState([]);
  const [initialSubcortColorsDeclared, setInitialSubcortColorsDeclared] = useState([]);

  const { subcortTransparency, gyriTransparency, wmTransparency } = useControls('Transparency', {
    subcortTransparency: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    gyriTransparency: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    wmTransparency: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
    },
  });
  const { gyriGrayScale, subcortGrayScale } = useControls('Grayscale', {
    gyriGrayScale: false,
    subcortGrayScale: false,
  });

  // * Gyri grayscale
  useEffect(() => {
    if (Gyri) {
      if (initialGyriColorsDeclared.length <= 0) {
        //@ts-ignore
        let _initialGyriColorsDeclared = gyriRef.current.children.map((mat) => mat.material.color);
        setInitialGyriColorsDeclared(_initialGyriColorsDeclared);
      } else {
        if (gyriGrayScale === true)
          gyriRef.current.children.map((mat) => {
            //@ts-ignore
            mat.material.color = new Color('rgb(255,255,255)');
            //@ts-ignore
            mat.material.opacity = 1;
          });
        else if (gyriGrayScale === false) {
          gyriRef.current.children.map((mat, i) => {
            //@ts-ignore
            mat.material.color = initialGyriColorsDeclared[i];
            //@ts-ignore
            mat.material.opacity = gyriTransparency;
          });
        }
      }
    }
  }, [gyriGrayScale, Gyri]);

  //Subcortical grayscale
  useEffect(() => {
    if (SubcorticalStructs) {
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
              //@ts-ignore
              mat.materialopacity = 1;
            }
          });
        else if (subcortGrayScale === false) {
          subCortRef.current.children.map((mat, i) => {
            if (mat instanceof Mesh) {
              mat.material.color = initialSubcortColorsDeclared[i];
              //@ts-ignore
              mat.materialopacity = subcortTransparency;
            }
          });
        }
      }
    }
  }, [subcortGrayScale]);

  //Current electrode
  let elecDescriptor = useControls('currentElectrode', {
    elecDescriptor: '',
    // component: () => <div ref={elecInfoRef}>{elecState}</div>,
  });

  //Current structure
  let { selectedStructure } = useControls('selectedStructure', {
    selectedStructure: '',
    // component: () => <div ref={structureNameRef}>{selectedStructure}</div>,
  });

  // useEffect(() => {
  //   electrodeRef.current.children.forEach((child) => {
  //     child.traverse((electrode) => {
  //       electrode.visible = !disableElectrode;
  //     });
  //   });
  // }, [disableElectrode]);

  // useEffect(() => {
  //   electrodeRef.current.children.forEach((child) => {
  //     child.traverse((electrode) => {
  //       modifySize(electrode,1);
  //       electrode.visible = !disableElectrode;
  //     });
  //   });
  // }, [disableElectrode]);

  useEffect(() => {
    if (SubcorticalStructs) {
      subCortRef.current?.traverse((child) => {
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
    }
  }, [subcortTransparency, SubcorticalStructs]);

  useEffect(() => {
    if (WhiteMatter) {
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
    }
  }, [wmTransparency]);

  useEffect(() => {
    if (Gyri) {
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
    <>
      <group dispose={null}>
        <directionalLight ref={lightRef} position={[0, 0, -400]} />
        <OrthographicCamera ref={cam} makeDefault position={[0, 0, -400]} zoom={1} />
        <OrbitControls ref={controlRef} rotateSpeed={2} target0={brainRef} />
        {Gyri ? (
          <>
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
              activeSubject={activeSubject}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position={[0, 0, 0]}
              object={Gyri}
            ></primitive>
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
              activeSubject={activeSubject}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position={[0, 0, 0]}
              object={SubcorticalStructs}
            ></primitive>

            <primitive
              ref={wmRef}
              activeSubject={activeSubject}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position={[0, 0, 0]}
              object={WhiteMatter}
            ></primitive>
          </>
        ) : (
          <></>
        )}
      </group>
    </>
  );
};

const SurfaceView = () => {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  const router = useRouter();

  const [_activeSubject, _setActiveSubject] = useState('');

  useEffect(() => {
      if (!router.isReady) return;
      _setActiveSubject(router.query.subject);
  }, [router.isReady, router.query]);

  return (
    <>
      <Leva
        // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        // hideTitleBar // default = false, hides the GUI header
        // collapsed // default = false, when true the GUI is collpased
        // hidden // default = false, when true the GUI is hidden
      />
      <Canvas style={{ backgroundColor: 'gray' }}>
        <Suspense fallback={<Loader />}>
          <Brain subject={_activeSubject}></Brain>
          <Electrodes subject={_activeSubject}></Electrodes>
        </Suspense>
      </Canvas>
    </>
  );
};

export default SurfaceView;
