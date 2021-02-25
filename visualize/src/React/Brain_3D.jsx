// @ts-nocheck
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Color } from "three";

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

  const brain = useLoader(GLTFLoader, `/brain/${props.activeSubject}`);
  const electrodes = useLoader(
    GLTFLoader,
    `/electrodes/${props.activeSubject}`
    );
    
    const { Electrodes } = electrodes.nodes;
  const { Gyri, SubcorticalStructs, WhiteMatter } = brain.nodes;
  
  const [allowHover, setAllowHover] = useState(false);
    );
    const [elecState, setElecState] = useState(
    "Hover over an electrode to view location"
    );

  const subcortTransparency = useControl("Transparency: Subcort", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.5,
  });
  const gyriTransparency = useControl("Transparency: Gyri", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.5,
  });
  const wmTransparency = useControl("Transparency: WM", {
    type: "number",
    min: 0,
    max: 1,
    value: 0,
  });

  const gyriGrayScale = useControl("Gyri colors: grayscale", {
    type: "boolean",
    value: false,
  });
  const subcortGrayScale = useControl("Subcort colors: grayscale", {
    type: "boolean",
    value: false,
  });
  const disableElectrode = useControl("Disable electrodes?", {
    type: "boolean",
    value: false,
  });

  useEffect(() => {
        (mat) => mat.material.color
      );
    }
    if (gyriGrayScale === true)
      gyriRef.current.children.map((mat) => {
        mat.material.color = new Color("rgb(255,255,255)");
        mat.material.opacity = 1;
      });
    else if (gyriGrayScale === false) {
      gyriRef.current.children.map((mat, i) => {
        mat.material.color = initialGyriColorsDeclared[i];
      });
    }
  }, [gyriGrayScale]);

  useEffect(() => {
        if (mat instanceof Mesh) {
          return mat.material.color;
        } else {
          return null;
        }
      });
    }
    if (subcortGrayScale === true)
      subCortRef.current.children.map((mat) => {
        if (mat instanceof Mesh) {
          mat.material.color = new Color("rgb(50,50,50)");
          mat.materialopacity = 1;
        }
      });
    else if (subcortGrayScale === false) {
      subCortRef.current.children.map((mat, i) => {
        if (mat instanceof Mesh) {
          mat.material.color = initialSubcortColorsDeclared[i];
        }
      });
    }
}, [subcortGrayScale]);

    type: "custom",
    value: elecState,
    component: () => <div ref={elecInfoRef}>{elecState}</div>,
  });
    type: "custom",
  });

  useEffect(() => {
    electrodeRef.current.children.forEach((child) => {
      child.traverse((electrode) => {
        electrode.visible = !disableElectrode;
      });
    });
  }, [disableElectrode]);

  useEffect(() => {
    subCortRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = subcortTransparency;
      }
    });
  }, [subcortTransparency]);

  useEffect(() => {
    wmRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = wmTransparency;
      }
    });
  }, [wmTransparency]);

  useEffect(() => {
    gyriRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparent = true;
        child.material.opacity = gyriTransparency;
      }
    });
  }, [gyriTransparency]);

  useFrame(({ camera, scene }) => {
    lightRef.current.position.copy(camera.position);
    //    console.log(electrodeRef)
  });
  //renderOrder
  useEffect(() => {
    if (controlRef.current && first === true) {
      first = false;
      controlRef.current.addEventListener("end", (e) => setAllowHover(true));
      controlRef.current.addEventListener("start", (e) => setAllowHover(false));
    }
  }, [controlRef.current || first]);

  return (
    <group dispose={null}>
      <directionalLight ref={lightRef} position={[0, 0, -400]} />
      <OrbitControls ref={controlRef} rotateSpeed={2} target0={brainRef} />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          e.object.scale.set(1.5, 1.5, 1.5);
          setTimeout(() => {
            e.object.scale.set(1, 1, 1);
          }, 1000);
        }}
        ref={gyriRef}
        {...props}
        object={Gyri}
      ></primitive>
      <primitive
        ref={subCortRef}
        {...props}
        object={SubcorticalStructs}
      ></primitive>
      <primitive
        ref={electrodeRef}
        object={Electrodes}
        {...props}
        onPointerOver={(e) => {
          e.stopPropagation();
          e.object.scale.set(3, 3, 3);
            let withoutApost = label.name.split("'");
            if (withoutApost[0] + withoutApost[1] === e.object.name) {
              return label;
            } else {
              return null;
            }
          });
            elecInfoRef.current.innerText = `${e.object.name}: ${location[0].location}`;
        }}
        onPointerOut={(e) => {
          elecInfoRef.current.innerText = `Hover over another electrode`;

          e.object.scale.set(1, 1, 1);
        }}
      ></primitive>
    </group>
  );
}
