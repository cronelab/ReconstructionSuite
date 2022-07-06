import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { r0, r1, r2, r3, data, sceneClip } from '../components/helpers/renderers';
import { initRenderer3D } from '../components/helpers/helpers';

import { loadVolume } from '../components/helpers/loadVolume';

import { reorientateBrainScene } from '../components/helpers/loadSurfaces';

import * as dat from 'dat.gui';

import { VolumeRenderingHelper, LutHelper } from 'ami';

import {
  MeshPhongMaterial,
  Mesh,
  Cache,
  Vector3,
  PerspectiveCamera,
  Color,
  Scene,
  MeshBasicMaterial,
  FrontSide,
  BackSide,
  Material,
  MeshStandardMaterial,
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // Import GLTFLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useRouter } from 'next/router';
export const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/'); // use a full url path
gltfLoader.setDRACOLoader(dracoLoader);

let initialVals = {
    apx:-60.4,
    apy:-14.4,
    apz:28.9,
    bpx: 12.4,
    bpy: -7.5,
    bpz: 38.8,
    arx: .573,
    ary: .871,
    arz: 0,
    brx: .374,
    bry: -.519,
    brz: 0
}


function VolumetricRender(): JSX.Element {

    const router = useRouter();

  // setGUIS();
  Cache.enabled = true;

  const myStack = {
    lut: 'default',
    opacity: 'random',
    steps: 256,
    alphaCorrection: 0.5,
    interpolation: 1,
    AposX: initialVals.apx,
    AposY: initialVals.apy,
    AposZ: initialVals.apz,
    BposX: initialVals.bpx,
    BposY: initialVals.bpy,
    BposZ: initialVals.bpz,
    ArotX: initialVals.arx,
    ArotY: initialVals.ary,
    ArotZ: initialVals.arz,
    BrotX: initialVals.brx,
    BrotY: initialVals.bry,
    BrotZ: initialVals.brz,
    meshView: .5,
    meshScale: 1
  };

  let vrHelper;
  let lut;
  let textMeshes;
  const numberMeshes = [];

  const listeners = () => {
    r0.domElement.addEventListener(
      'mousedown',
      () => {
        if (vrHelper && vrHelper.uniforms) {
          vrHelper.uniforms.uSteps.value = Math.floor(myStack.steps / 2);
          vrHelper.interpolation = 0;
        }
      },
      false
    );
    r0.domElement.addEventListener(
      'mouseup',
      () => {
        if (vrHelper && vrHelper.uniforms) {
          vrHelper.uniforms.uSteps.value = myStack.steps;
          vrHelper.interpolation = myStack.interpolation;
        }
      },
      false
    );
  };

  const animate = () => {
    r0.controls.update();
    r0.light.position.copy(r0.camera.position);
    r0.renderer.render(r0.scene, r0.camera);
    // textMeshes.forEach((text) => {
    //   text.lookAt(r0.camera.position);
    //   text.quaternion.copy(r0.camera.quaternion);
    // });
    // if (numberMeshes != undefined) {
    //   numberMeshes?.forEach((text) => {
    //     text.lookAt(r0.camera.position);
    //     text.quaternion.copy(r0.camera.quaternion);
    //   });
    // }
    requestAnimationFrame(() => animate());
  };
  let AElecs;
  let BElecs;
  let brainGLB;


useEffect(() => {
    (async () => {
        if(!router.isReady) return;
        const query = router.query;
      //   let image = await fetch('/api/subject/CC_1?modality=spmT_0001')
      //   let im = await image.blob()



      let  stack = await loadVolume(query.subject, query.image);
      let colorReq = await fetch(`/api/subject/electrodeColors/?subject=${'CC_1'}`);
      let colors = await colorReq.json();
      stack.prepare();
      initRenderer3D(r0, stack);
      vrHelper = new VolumeRenderingHelper(stack);
      vrHelper.children[0].material.transparent = false
      console.log(vrHelper);

      r0.scene.add(vrHelper);

      const worldCenter = stack.worldCenter();

      const worldbb = stack.worldBoundingBox();
      const lpsDims = new Vector3(
        (worldbb[1] - worldbb[0]) / 2,
        (worldbb[3] - worldbb[2]) / 2,
        (worldbb[5] - worldbb[4]) / 2
      );
      //   r0.camera = new PerspectiveCamera(90, r0.domElement.offsetWidth / r0.domElement.offsetHeight, 0.1, 100000);
      //   r0.camera.position.x =worldCenter.x;
      //   r0.camera.position.y =worldCenter.y;
      //   r0.camera.position.z = worldCenter.z;
      //   r0.camera.up.set(-0.42, 0.86, 0.26);

      // // controls
      // r0.controls.rotateSpeed = 5.5;
      // r0.controls.zoomSpeed = 1.2;
      // r0.controls.panSpeed = 0.8;
      // r0.controls.staticMoving = true;
      // r0.controls.dynamicDampingFactor = 0.3;

      r0.camera.lookAt(worldCenter.x, worldCenter.y, worldCenter.z);
      r0.camera.updateProjectionMatrix();
      r0.controls.target.set(worldCenter.x, worldCenter.y, worldCenter.z);

      brainGLB = await fetch(`/api/brain/${'CC_1'}`);
      let _brainGLB = await brainGLB.arrayBuffer();
      let electrodesGLB = await fetch(`/api/electrodes/${'CC_1'}`);
      let _electrodesGLB = await electrodesGLB.arrayBuffer();
      brainGLB = await gltfLoader.parseAsync(_brainGLB, '');
      electrodesGLB = await gltfLoader.parseAsync(_electrodesGLB, '');

      brainGLB.scene.children[0].scale.set(1.259, 1.259, 1.259);




      // r0.scene.add(brainGLB.scene);
      electrodesGLB.scene.name = 'ElectrodesMeshScene';

      brainGLB.scene.children[0].remove(brainGLB.scene.children[0].children[2]);
      brainGLB.scene.children[0].remove(brainGLB.scene.children[0].children[1]);

      brainGLB.scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0.5;
            // if(router.query.image != 'reconstruction'){
            //     child.material.depthWrite = false;
            // }
            if(router.query.image != 'reconstruction'){

                child.material.color = new Color('gray')
            }
        }
      });

      let child = electrodesGLB.scene.children[0].children;
      AElecs = child[0];
    //   AElecs.position.set(initialVals.apx,initialVals.apy,initialVals.apz);
    //   AElecs.rotation.set(initialVals.arx,initialVals.ary,initialVals.arz);
    electrodesGLB.scene.scale.set(1.259, 1.259, 1.259);

      BElecs = child[1];
    //   BElecs.scale.set(1.259, 1.259, 1.259);
    //   BElecs.position.set(initialVals.bpx,initialVals.bpy,initialVals.bpz);
    //   BElecs.rotation.set(initialVals.brx,initialVals.bry,initialVals.brz);























      let i = 1;
      electrodesGLB.scene.children.forEach((electrodeGroups) => {
        electrodeGroups.children.forEach((electrodeGroup) => {
          let cols = colors[electrodeGroup.name];
          //@ts-ignore
          electrodeGroup.children[0].material.color = new Color(
            cols.split(' ')[0],
            cols.split(' ')[1],
            cols.split(' ')[2]
          );
          electrodeGroup.children.forEach((actualElectrode) => {
            // console.log(cols)
            data[i] = {};
            let meshOpacity = 1;

            data[i].scene = new Scene();
            data[i].materialFront = new MeshBasicMaterial({
              color: new Color(cols.split(' ')[0], cols.split(' ')[1], cols.split(' ')[2]),
              side: FrontSide,
              depthWrite: false,
              opacity: 0,
              transparent: true,
              clippingPlanes: [],
            });
            //@ts-ignore
            data[i].meshFront = new Mesh(actualElectrode.geometry, data[i].materialFront);
            data[i].materialBack = new MeshBasicMaterial({
              color: new Color(cols.split(' ')[0], cols.split(' ')[1], cols.split(' ')[2]),
              side: BackSide,
              depthWrite: true,
              opacity: meshOpacity,
              transparent: true,
              clippingPlanes: [],
            });
            //@ts-ignore
            data[i].meshBack = new Mesh(actualElectrode.geometry, data[i].materialBack);
            data[i].meshFront.position.set(
              actualElectrode.position.x,
              actualElectrode.position.y,
              actualElectrode.position.z
            );
            data[i].meshBack.position.set(
              actualElectrode.position.x,
              actualElectrode.position.y,
              actualElectrode.position.z
            );
            data[i].scene.add(data[i].meshFront);
            // data[i].scene.add(data[i].meshBack);
            // data[i].scene.applyMatrix4(RASToLPS);
            sceneClip.add(data[i].scene);
            
            i++;
          });
        });
      });
      reorientateBrainScene(r0, worldCenter, brainGLB.scene, electrodesGLB.scene);
    //   let newMat = AElecs.children[0].material;
    AElecs.children[0].material = new MeshStandardMaterial()
    AElecs.children[0].material.copy( AElecs.children[1].material)
    AElecs.children[0].material.color = new Color('yellow')

    AElecs.children[62].material = new MeshStandardMaterial()
    AElecs.children[62].material.copy( AElecs.children[1].material)
    AElecs.children[62].material.color = new Color('purple')

    AElecs.children[52].material = new MeshStandardMaterial()
    AElecs.children[52].material.copy( AElecs.children[1].material)
    AElecs.children[52].material.color = new Color('pink')

    AElecs.children[60].material = new MeshStandardMaterial()
    AElecs.children[60].material.copy( AElecs.children[1].material)
    AElecs.children[60].material.color = new Color('green')

    BElecs.children[0].material = new MeshStandardMaterial()
    BElecs.children[0].material.copy( AElecs.children[1].material)
    BElecs.children[0].material.color = new Color('yellow')

    BElecs.children[62].material = new MeshStandardMaterial()
    BElecs.children[62].material.copy( AElecs.children[1].material)
    BElecs.children[62].material.color = new Color('purple')

    BElecs.children[52].material = new MeshStandardMaterial()
    BElecs.children[52].material.copy( AElecs.children[1].material)
    BElecs.children[52].material.color = new Color('pink')


    BElecs.children[60].material = new MeshStandardMaterial()
    BElecs.children[60].material.copy( AElecs.children[1].material)
    BElecs.children[60].material.color = new Color('green')
      console.log(BElecs)
      // brainGLB.scene.traverse((child) => {
      //     if (child instanceof Mesh) {
      //       child.material.transparent = true;
      //       child.material.opacity = .1;
      //     }
      //   });

      // let { brainScene, electrodeScene } = await loadBrainSurface(r0, worldCenter);
      //   let { electrodeScene } = await loadElectrodeScene(colors);
      //   reorientateBrainScene(r0, worldCenter, null, electrodeScene);
      //   let loader = new FontLoader();
      //   let fl = loader.load(font);

      //   textMeshes = electrodeScene.children[0].children.map((group) => {
      //     let nums = [];
      //     group.children.forEach((elec, index) => {
      //       if (index == 0 || index == group.children.length - 1) {
      //         let numberText = new TextGeometry(`${index + 1}`, {
      //           font: fl,
      //           size: 2,
      //           height: 1,
      //           curveSegments: 12,
      //           bevelThickness: 10,
      //           bevelSize: 8,
      //           bevelOffset: 0,
      //           bevelSegments: 5,
      //         });
      //         numberText.computeBoundingBox();
      //         let materials = [
      //           new MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      //           new MeshPhongMaterial({ color: 0xffffff }), // side
      //         ];
      //         let tempVec = new Vector3();

      //         elec.getWorldPosition(tempVec);
      //         let numberText1 = new Mesh(numberText, materials);
      //         numberText1.position.x = tempVec.x + 1;
      //         numberText1.position.y = tempVec.y + 1;
      //         numberText1.position.z = tempVec.z + 1;
      //         numberText1.lookAt(r0.camera.position);
      //         r0.scene.add(numberText1);
      //         numberMeshes.push(numberText1);
      //       }
      //       nums.push(parseInt(elec.name.split(/([0-9]+)/)[1]));
      //     });
      //     var indexOfMaxValue = nums.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
      //     let textGeo = new TextGeometry(group.name, {
      //       font: fl,
      //       size: 2,
      //       height: 1,
      //       curveSegments: 12,
      //       bevelThickness: 10,
      //       bevelSize: 8,
      //       bevelOffset: 0,
      //       bevelSegments: 5,
      //     });

      //     textGeo.computeBoundingBox();
      //     let materials = [
      //       new MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      //       new MeshPhongMaterial({ color: 0xffffff }), // side
      //     ];
      //     let tempVec = new Vector3();

      //     group.children[indexOfMaxValue].getWorldPosition(tempVec);
      //     let textMesh1 = new Mesh(textGeo, materials);
      //     textMesh1.position.x = tempVec.x;
      //     textMesh1.position.y = tempVec.y;
      //     textMesh1.position.z = tempVec.z;
      //     textMesh1.lookAt(r0.camera.position);
      //     r0.scene.add(textMesh1);
      //     return textMesh1;
      //   });

      animate();

      buildGUI();
      listeners();
    })();
  }, [router.isReady, router.query]);

  async function buildGUI() {
    lut = new LutHelper('r0');
    lut.luts = LutHelper.presetLuts();
    lut.lutsO = LutHelper.presetLutsO();
    vrHelper.uniforms.uTextureLUT.value = lut.texture;
    vrHelper.uniforms.uLut.value = 1;
    lut.lut = 'hot_and_cold';
    vrHelper.uniforms.uTextureLUT.value.dispose();
    vrHelper.uniforms.uTextureLUT.value = lut.texture;
    let dat = await import('dat.gui');
    const gui = new dat.GUI({
      autoPlace: false,
    });

    const customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    const camUtils = {
      invertRows: false,
      invertColumns: false,
      orientation: 'default',
    };

    // camera
    const cameraFolder = gui.addFolder('Camera');
    const invertRows = cameraFolder.add(camUtils, 'invertRows');
    invertRows.onChange(() => {
      r0.camera.invertRows();
    });

    const invertColumns = cameraFolder.add(camUtils, 'invertColumns');
    invertColumns.onChange(() => {
      r0.camera.invertColumns();
    });

    const orientationUpdate = cameraFolder.add(camUtils, 'orientation', ['default', 'axial', 'coronal', 'sagittal']);
    orientationUpdate.onChange((value) => {
      r0.camera.orientation = value;
      r0.camera.update();
      r0.camera.fitBox(2, 0.6);

      // stackHelper.orientation = r0.camera.stackOrientation;
    });

    cameraFolder.open();
    const stackFolder = gui.addFolder('Settings');
    const lutUpdate = stackFolder.add(myStack, 'lut', lut.lutsAvailable());
    lutUpdate.onChange(function (value) {
      lut.lut = value;
      vrHelper.uniforms.uTextureLUT.value.dispose();
      vrHelper.uniforms.uTextureLUT.value = lut.texture;
    });
    // init LUT

    const opacityUpdate = stackFolder.add(myStack, 'opacity', lut.lutsAvailable('opacity'));
    opacityUpdate.onChange((value) => {
      lut.lutO = value;
      vrHelper.uniforms.uTextureLUT.value.dispose();
      vrHelper.uniforms.uTextureLUT.value = lut.texture;
    });

    const stepsUpdate = stackFolder.add(myStack, 'steps', 0, 512).step(1);
    stepsUpdate.onChange((value) => {
      if (vrHelper.uniforms) {
        vrHelper.uniforms.uSteps.value = value;
      }
    });

    const meshView = stackFolder.add(myStack, 'meshView', 0, 1).step(0.1);
    meshView.onChange((val) => {
      // if(val==1){
          brainGLB.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.material.opacity = val;
            if(val==0){
                child.visible = false
            }
            else{
                child.visible = true;
            }
            
            }
        });
      // }
      // else{
      //     brainGLB.scene.traverse((child) => {
      //         if (child instanceof Mesh) {
      //           child.material.transparent = true;
      //           child.material.opacity = 0;
      //           child.material.color = new Color('gray')
      //         }
      //       });

      // }

    });
   
   const meshScale = stackFolder.add(myStack, 'meshScale', 0, 2).step(.001);
    meshScale.onChange(val => {
        console.log(val)
        brainGLB.scene.children[0].scale.set(val,val,val)
    })


   const AposUpdateX = stackFolder.add(myStack, 'AposX', -100, 100).step(.01);
    const AposUpdateY = stackFolder.add(myStack, 'AposY', -100, 100).step(.01);
    const AposUpdateZ = stackFolder.add(myStack, 'AposZ', -100, 100).step(.01);
    const BposUpdateX = stackFolder.add(myStack, 'BposX', -100, 100).step(.01);
    const BposUpdateY = stackFolder.add(myStack, 'BposY', -100, 100).step(.01);
    const BposUpdateZ = stackFolder.add(myStack, 'BposZ', -100, 100).step(.01);

    const ArotUpdateX = stackFolder.add(myStack, 'ArotX', -Math.PI, Math.PI).step(0.001);
    const ArotUpdateY = stackFolder.add(myStack, 'ArotY', -Math.PI, Math.PI).step(0.001);
    const ArotUpdateZ = stackFolder.add(myStack, 'ArotZ', -Math.PI, Math.PI).step(0.001);
    const BrotUpdateX = stackFolder.add(myStack, 'BrotX', -Math.PI, Math.PI).step(0.001);
    const BrotUpdateY = stackFolder.add(myStack, 'BrotY', -Math.PI, Math.PI).step(0.001);
    const BrotUpdateZ = stackFolder.add(myStack, 'BrotZ', -Math.PI, Math.PI).step(0.001);

    // AposUpdateX.onChange((val) => {
    //   AElecs.position.set(val, AElecs.position.y, AElecs.position.z);
    // });
    // AposUpdateY.onChange((val) => {
    //   AElecs.position.set(AElecs.position.x, val, AElecs.position.z);
    // });
    // AposUpdateZ.onChange((val) => {
    //   AElecs.position.set(AElecs.position.x, AElecs.position.y, val);
    // });

    // BposUpdateX.onChange((val) => {
    //   BElecs.position.set(val, BElecs.position.y, BElecs.position.z);
    // });
    // BposUpdateY.onChange((val) => {
    //   BElecs.position.set(BElecs.position.x, val, BElecs.position.z);
    // });
    // BposUpdateZ.onChange((val) => {
    //   BElecs.position.set(BElecs.position.x, BElecs.position.y, val);
    //   console.log(AElecs);
    //   console.log(BElecs);
    // });

    // ArotUpdateX.onChange((val) => {
    //     console.log(r0)
    //     // rotateAboutPoint(AElecs, new Vector3(0,0,0),'x',val,true)
    //     // console.log(AElecs.rotation)
    //       AElecs.rotation.set(val, AElecs.rotation.y, AElecs.rotation.z);
    // });
    // ArotUpdateY.onChange((val) => {
    //   AElecs.rotation.set(AElecs.rotation.x, val, AElecs.rotation.z);
    // });
    // ArotUpdateZ.onChange((val) => {
    //   AElecs.rotation.set(AElecs.rotation.x, AElecs.rotation.y, val);
    // });

    // BrotUpdateX.onChange((val) => {
    //   BElecs.rotation.set(val, BElecs.rotation.y, BElecs.rotation.z);
    // });
    // BrotUpdateY.onChange((val) => {
    //   BElecs.rotation.set(BElecs.rotation.x, val, BElecs.rotation.z);
    // });
    // BrotUpdateZ.onChange((val) => {
    //   BElecs.rotation.set(BElecs.rotation.x, BElecs.rotation.y, val);
    //   console.log(AElecs);
    //   console.log(BElecs);
    // });

    const alphaCorrrectionUpdate = stackFolder.add(myStack, 'alphaCorrection', 0, 1).step(0.01);
    alphaCorrrectionUpdate.onChange((value) => {
      if (vrHelper.uniforms) {
        vrHelper.uniforms.uAlphaCorrection.value = value;
      }
    });

    stackFolder.add(vrHelper, 'interpolation', 0, 1).step(0.1);

    stackFolder.open();
  }

  return (
    <>
      <Container fluid style={{ height: '100%', width: '100%', padding: '0' }}>
        <div id="my-gui-container"></div>
        {/* <div id="my-tf"></div> */}
        <Row style={{ height: '100%' }}>
          <Col id="r0" className="renderer"></Col>
        </Row>
      </Container>
    </>
  );
}

export default VolumetricRender;
