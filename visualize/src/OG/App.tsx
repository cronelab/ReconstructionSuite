//@ts-nocheck
import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initHelpersStack, initRenderer3D, initRenderer2D } from './helpers';
// Import THREE
import { Scene, Plane, Vector3, Matrix4, Mesh, Color } from 'three';

// Import GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Import AMI (from TheBrainChain repo)
import { VolumeLoader } from 'ami.js';
import { guiCall } from './guiStuff';

function App() {
  const r0 = {
    domId: 'r0',
    domElement: null,
    renderer: null,
    color: 0x212121,
    targetID: 0,
    camera: null,
    controls: null,
    scene: null,
    light: null,
  };

  // 2d axial renderer
  const r1 = {
    domId: 'r1',
    domElement: null,
    renderer: null,
    color: 0x121212,
    sliceOrientation: 'axial',
    sliceColor: 0xff1744,
    targetID: 1,
    camera: null,
    controls: null,
    scene: null,
    light: null,
    stackHelper: null,
  };

  // 2d sagittal renderer
  const r2 = {
    domId: 'r2',
    domElement: null,
    renderer: null,
    color: 0x121212,
    sliceOrientation: 'sagittal',
    sliceColor: 0xffea00,
    targetID: 2,
    camera: null,
    controls: null,
    scene: null,
    light: null,
    stackHelper: null,
  };

  // 2d coronal renderer
  const r3 = {
    domId: 'r3',
    domElement: null,
    renderer: null,
    color: 0x121212,
    sliceOrientation: 'coronal',
    sliceColor: 0x76ff03,
    targetID: 3,
    camera: null,
    controls: null,
    scene: null,
    light: null,
    stackHelper: null,
  };

  const data = [];

  const sceneClip = new Scene();
  const clipPlane1 = new Plane(new Vector3(0, 0, 0), 0);
  const clipPlane2 = new Plane(new Vector3(0, 0, 0), 0);
  const clipPlane3 = new Plane(new Vector3(0, 0, 0), 0);

  let elecs, brainScene, wm, gyri, substructures;

  let ready = false;
  const electrodeLegend = {};

  const urlParams = new URLSearchParams(window.location.search);

  function init() {
    function animate() {
      render();
      requestAnimationFrame(() => animate());
    }
    initRenderer3D(r0);
    initRenderer2D(r1);
    initRenderer2D(r2);
    initRenderer2D(r3);

    animate();
  }

  function render() {
    // we are ready when both meshes have been loaded
    if (ready) {
      // render
      r0.controls.update();
      r1.controls.update();
      r2.controls.update();
      r3.controls.update();

      r0.light.position.copy(r0.camera.position);
      r0.renderer.render(r0.scene, r0.camera);

      r1.renderer.clear();
      r1.renderer.render(r1.scene, r1.camera);
      r1.renderer.clearDepth();
      // data.forEach((object) => {
      //   object.materialFront.clippingPlanes = [clipPlane1];
      //   object.materialBack.clippingPlanes = [clipPlane1];
      // });
      r1.renderer.render(sceneClip, r1.camera);
      r1.renderer.clearDepth();

      r2.renderer.clear();
      r2.renderer.render(r2.scene, r2.camera);
      r2.renderer.clearDepth();
      // data.forEach((object) => {
      //   object.materialFront.clippingPlanes = [clipPlane2];
      //   object.materialBack.clippingPlanes = [clipPlane2];
      // });
      r2.renderer.render(sceneClip, r2.camera);
      r2.renderer.clearDepth();

      r3.renderer.clear();
      r3.renderer.render(r3.scene, r3.camera);
      r3.renderer.clearDepth();
      // data.forEach((object) => {
      //   object.materialFront.clippingPlanes = [clipPlane3];
      //   object.materialBack.clippingPlanes = [clipPlane3];
      // });
      r3.renderer.render(sceneClip, r3.camera);
      r3.renderer.clearDepth();
    }
  }

  useEffect(() => {
    guiCall();
  });

  useEffect(() => {
    (async () => {
      init();

      // Get the subject and modality of the 3D scan from the url params
      const subject = urlParams.get('subject') || 'fsaverage';
      const modality = urlParams.get('modality') || 't1'; //ct

      // If a T1 or CT exists, load it.
      const brainReq = await fetch(`/${modality}/${subject}`);
      if (!brainReq.ok) {
        alert('Error: Subject not fo und');
        return;
      }
      const brain = await brainReq.blob();
      const objectURL = URL.createObjectURL(brain);

      // Use AMI to parse, processes, and display the scan
      const loader = new VolumeLoader();
      loader
        .load(objectURL)
        .then(() => {
          const series = loader.data[0].mergeSeries(loader.data)[0];
          loader.free();
          // loader = null;
          const stack = series.stack[0];
          stack.prepare();

          // center 3d camera/control on the stack
          const centerLPS = stack.worldCenter();

          r0.camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
          r0.camera.updateProjectionMatrix();
          r0.controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

          // red slice
          initHelpersStack(r1, stack);
          r0.scene.add(r1.scene);

          // yellow slice
          initHelpersStack(r2, stack);
          r0.scene.add(r2.scene);

          // green slice
          initHelpersStack(r3, stack);
          r0.scene.add(r3.scene);

          // transToggler.onChange((val) => {
          //   if (val == true) {
          //     brainScene.traverse((child) => {
          //       if (child instanceof Mesh && child.parent.name != 'Electrodes') {
          //         child.material.transparent = true;
          //         child.material.opacity = 0.5;
          //       }
          //     });
          //   } else {
          //     brainScene.traverse((child) => {
          //       if (child instanceof Mesh && child.parent.name != 'Electrodes') {
          //         child.material.transparent = false;
          //       }
          //     });
          //   }
          // });

          // fullMeshToggler.onChange((val) => {
          //   console.log(wm);
          //   console.log(gyri);
          //   console.log(substructures);
          //   if (val == false) {
          //     wm.visible = false;
          //     gyri.visible = false;
          //     substructures.visible = false;
          //     text.Cortex = false;
          //     text.WM = false;
          //     text.Substructures = false;
          //   } else {
          //     wm.visible = true;
          //     gyri.visible = true;
          //     substructures.visible = true;
          //     text.Cortex = true;
          //     text.WM = true;
          //     text.Substructures = true;
          //   }
          // });
          // cortexMeshToggler.onChange((val) => {
          //   if (val == false) {
          //     gyri.visible = false;
          //   } else {
          //     gyri.visible = true;
          //   }
          // });
          // wmMeshToggler.onChange((val) => {
          //   if (val == false) {
          //     wm.visible = false;
          //   } else {
          //     wm.visible = true;
          //   }
          // });
          // subMeshToggler.onChange((val) => {
          //   if (val == false) {
          //     substructures.visible = false;
          //   } else {
          //     substructures.visible = true;
          //   }
          // });

          function updateClipPlane(refObj, clipPlane) {
            const stackHelper = refObj.stackHelper;
            const camera = refObj.camera;
            const vertices = stackHelper.slice.geometry.vertices;
            const p1 = new Vector3(vertices[0].x, vertices[0].y, vertices[0].z).applyMatrix4(
              stackHelper._stack.ijk2LPS
            );
            const p2 = new Vector3(vertices[1].x, vertices[1].y, vertices[1].z).applyMatrix4(
              stackHelper._stack.ijk2LPS
            );
            const p3 = new Vector3(vertices[2].x, vertices[2].y, vertices[2].z).applyMatrix4(
              stackHelper._stack.ijk2LPS
            );

            clipPlane.setFromCoplanarPoints(p1, p2, p3);

            const cameraDirection = new Vector3(1, 1, 1);
            cameraDirection.applyQuaternion(camera.quaternion);

            if (cameraDirection.dot(clipPlane.normal) > 0) {
              clipPlane.negate();
            }
          }
          const onYellowChanged = () => updateClipPlane(r2, clipPlane2);
          const onRedChanged = () => updateClipPlane(r1, clipPlane1);
          const onGreenChanged = () => updateClipPlane(r3, clipPlane3);

          function onScroll(event) {
            const id = event.target.domElement.id;
            let stackHelper = null;
            switch (id) {
              case 'r1':
                stackHelper = r1.stackHelper;
                break;
              case 'r2':
                stackHelper = r2.stackHelper;
                break;
              case 'r3':
                stackHelper = r3.stackHelper;
                break;
            }

            if (event.delta > 0) {
              if (stackHelper.index >= stackHelper.orientationMaxIndex - 1) {
                return false;
              }
              stackHelper.index += 1;
            } else {
              if (stackHelper.index <= 0) {
                return false;
              }
              stackHelper.index -= 1;
            }

            onGreenChanged();
            onRedChanged();
            onYellowChanged();
          }

          // event listeners
          r1.controls.addEventListener('OnScroll', onScroll);
          r2.controls.addEventListener('OnScroll', onScroll);
          r3.controls.addEventListener('OnScroll', onScroll);

          window.addEventListener(
            'resize',
            () => {
              function windowResize2D(rendererObj) {
                rendererObj.camera.canvas = {
                  width: rendererObj.domElement.clientWidth,
                  height: rendererObj.domElement.clientHeight,
                };
                rendererObj.camera.fitBox(2, 1);
                rendererObj.renderer.setSize(rendererObj.domElement.clientWidth, rendererObj.domElement.clientHeight);

                // update info to draw borders properly
                rendererObj.stackHelper.slice.canvasWidth = rendererObj.domElement.clientWidth;
                rendererObj.stackHelper.slice.canvasHeight = rendererObj.domElement.clientHeight;
              } // update 3D
              r0.camera.aspect = r0.domElement.clientWidth / r0.domElement.clientHeight;
              r0.camera.updateProjectionMatrix();
              r0.renderer.setSize(r0.domElement.clientWidth, r0.domElement.clientHeight);

              // update 2d
              windowResize2D(r1);
              windowResize2D(r2);
              windowResize2D(r3);
            },
            false
          );

          const RASToLPS = new Matrix4();
          const worldCenter = r1.stackHelper.stack.worldCenter();
          RASToLPS.set(-1, 0, 0, worldCenter.x, 0, -1, 0, worldCenter.y, 0, 0, 1, worldCenter.z, 0, 0, 0, 1);

          // onGreenChanged();
          // onRedChanged();
          // onYellowChanged();
          const load3DBrain_gltf = () => {
            return new Promise(async (resolve) => {
              const loader = new GLTFLoader();
              loader.load(`/brain/${subject}`, (object3d) => {
                object3d.scene.traverse((child) => {
                  if (child instanceof Mesh) {
                    child.material.transparent = true;
                    child.material.opacity = 0.4;
                  }
                });
                r0.scene.add(object3d.scene);
                brainScene = object3d.scene.children[0];
                gyri = brainScene.children[0];
                substructures = brainScene.children[1];
                wm = brainScene.children[2];
                brainScene.applyMatrix4(RASToLPS);
                resolve(brainScene);
              });
              const _electrodeColors = await fetch(`/electrodeColors/${subject}`);
              let electrodeColors = undefined;
              let cols = undefined;
              if (_electrodeColors.ok) {
                electrodeColors = await _electrodeColors.json();
              }

              loader.load(`/electrodes/${subject}`, (object3d) => {
                elecs = object3d.scene;
                r0.scene.add(object3d.scene);
                object3d.scene.children.forEach((electrodeGroups) => {
                  electrodeGroups.children.forEach((electrodeGroup) => {
                    if (electrodeColors != undefined) cols = electrodeColors[electrodeGroup.name];
                    const childMesh = electrodeGroup.children[0];
                    if (childMesh instanceof Mesh) {
                      electrodeLegend[electrodeGroup.name] = childMesh.material.color;
                      if (cols != undefined) {
                        childMesh.material.color = new Color(
                          cols.split(' ')[0],
                          cols.split(' ')[1],
                          cols.split(' ')[2]
                        );
                      }
                    }
                  });
                });
                object3d.scene.applyMatrix4(RASToLPS);
              });
            });
          };
          load3DBrain_gltf().then((scene: Scene) => {
            let i = 0;
            scene.traverse((child) => {
              if (child instanceof Mesh) {
                if (child.parent.parent.name != 'WhiteMatter') {
                  data[i] = {};

                  // let meshOpacity = 0.8;
                  // let transparency = false;
                  // if (elec.parent.name == 'Electrodes') {
                  //   transparency = false;
                  // } else {
                  //   meshOpacity = 0.5;
                  //   transparency = true;
                  // }

                  // data[i].scene = new THREE.Scene();
                  // data[i].materialFront = new THREE.MeshBasicMaterial({
                  //   color: child.material.color,
                  //   side: THREE.FrontSide,
                  //   depthWrite: true,
                  //   opacity: 0,
                  //   transparent: true,
                  //   clippingPlanes: [],
                  // });
                  // data[i].materialBack = new THREE.MeshBasicMaterial({
                  //   color: elec.material.color,
                  //   side: THREE.BackSide,
                  //   depthWrite: true,
                  //   opacity: meshOpacity,
                  //   transparent: true,
                  //   clippingPlanes: [],
                  // });
                  // data[i].meshFront = new THREE.Mesh(
                  //   elec.geometry,
                  //   data[i].materialFront
                  // );
                  // data[i].meshBack = new THREE.Mesh(elec.geometry, data[i].materialBack);
                  // data[i].meshFront.position.set(
                  //   elec.position.x,
                  //   elec.position.y,
                  //   elec.position.z
                  // );
                  // data[i].meshBack.position.set(
                  //   elec.position.x,
                  //   elec.position.y,
                  //   elec.position.z
                  // );
                  // data[i].scene.add(data[i].meshFront);
                  // data[i].scene.add(data[i].meshBack);
                  // data[i].scene.applyMatrix4(RASToLPS);
                  // sceneClip.add(data[i].scene);
                  i++;
                }
              }
            });
            ready = true;
            render();

            // elecs.children[0].children.forEach((elecName) => {
            //   electrodeManager.addColor(elecCtrl, elecName.name);
            // });

            // electrodeToggler.onChange((val) => {
            //   elecs.visible = val;
            // });
          });
        })
        .catch((error) => window.console.log(error));
      // };
    })();
  }, []);

  return (
    <>
      <div className="App" style={{ height: '100%' }}>
        <div id="my-gui-container"></div>
        <div className="container-fluid p-0" style={{ height: '100%' }}>
          <div id="main" className="row" style={{ height: '100%' }}>
            <div className="col-8" id="r0"></div>
            <div id="slices" className="col-4 p-0" style={{ height: '100%' }}>
              <div className="row renderer" id="r1"></div>
              <div className="row renderer" id="r2"></div>
              <div className="row renderer" id="r3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
