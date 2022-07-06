import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Tab, Table, Nav, ListGroup } from 'react-bootstrap/';
import { useRouter } from 'next/router';
// mri_vol2vol --mov spmT.nii --o f-in-anat.nii --targ mri/orig.mgz --xfm mri/transforms/talairach.xfm
// freeview -f surf/lh.inflated:overlay=spmT_0001_Tongue_coreg.nii:overlay_threshold=6,10
import {
  stackHelperFactory,
  orthographicCameraFactory,
  trackballOrthoControlFactory,
  lutHelperFactory,
  VolumeLoader,
  LayerUniformShader,
  LayerVertexShader,
  LayerFragmentShader,
  DataUniformShader,
  DataVertexShader,
  DataFragmentShader,
} from 'ami';

// Instantiate AMI factories
import {
  Scene,
  Mesh,
  Matrix4,
  Vector3,
  DoubleSide,
  ShaderMaterial,
  Cache,
  UnsignedByteType,
  UVMapping,
  ClampToEdgeWrapping,
  DataTexture,
  WebGLRenderer,
  WebGLRenderTarget,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
} from 'three'; // Import THREE
import pako from 'pako';

function LabelMapViewer({ brainT1, fmri }) {
  // function LabelMapViewer({ brainGLB, electrodesGLB, brainT1, electrodeColors }) {
  const CamerasOrthographic = orthographicCameraFactory();
  const ControlsOrthographic = trackballOrthoControlFactory();
  const HelpersLut = lutHelperFactory();
  const StackHelper = stackHelperFactory();

  // standard global letiables
  let controls;
  let renderer;
  let camera;
  let threeD;
  //
  let sceneLayer0TextureTarget;
  let sceneLayer1TextureTarget;
  //
  let sceneLayer0;
  let lutLayer0;
  let sceneLayer1;
  let meshLayer1;
  let uniformsLayer1;
  let materialLayer1;
  let lutLayer1;
  let sceneLayerMix;
  let meshLayerMix;
  let uniformsLayerMix;
  let materialLayerMix;

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        let dat = await import('dat.gui');

        function render() {
          controls.update();
          renderer.render(sceneLayer0, camera, sceneLayer0TextureTarget, true);
          renderer.render(sceneLayer1, camera, sceneLayer1TextureTarget, true);
          renderer.render(sceneLayerMix, camera);
        }

        function animate() {
          render();
          requestAnimationFrame(() => animate());
        }

        // renderer
        threeD = document.getElementById('r3d');
        renderer = new WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(threeD.clientWidth, threeD.clientHeight);
        renderer.setClearColor(0x607d8b, 1);

        threeD.appendChild(renderer.domElement);

        // scene
        sceneLayer0 = new Scene();
        sceneLayer1 = new Scene();
        sceneLayerMix = new Scene();

        // render to texture!!!!
        sceneLayer0TextureTarget = new WebGLRenderTarget(threeD.clientWidth, threeD.clientHeight, {
          minFilter: LinearFilter,
          magFilter: NearestFilter,
          format: RGBAFormat,
        });

        sceneLayer1TextureTarget = new WebGLRenderTarget(threeD.clientWidth, threeD.clientHeight, {
          minFilter: LinearFilter,
          magFilter: NearestFilter,
          format: RGBAFormat,
        });

        // camera
        camera = new CamerasOrthographic(
          threeD.clientWidth / -2,
          threeD.clientWidth / 2,
          threeD.clientHeight / 2,
          threeD.clientHeight / -2,
          0.1,
          10000
        );

        // controls
        controls = new ControlsOrthographic(camera, threeD);
        controls.staticMoving = true;
        controls.noRotate = true;
        camera.controls = controls;

        animate();

        let loader = new VolumeLoader(threeD);

        brainT1 = Buffer.from(JSON.parse(brainT1).data);
        fmri = Buffer.from(JSON.parse(fmri).data);
        brainT1 = pako.inflate(brainT1);
        fmri = pako.inflate(fmri);
        let objectURL1 = URL.createObjectURL(new Blob([brainT1]));
        let objectURL2 = URL.createObjectURL(new Blob([fmri]));
        loader
          .load([objectURL1, objectURL2])
          .then(function (x) {
            // first stack of first series
            let mergedSeries = loader.data[0].mergeSeries(loader.data);
            loader.free();
            loader = null;

            let stack = mergedSeries[0].stack[0];
            let stack2 = mergedSeries[1].stack[0];
            if (stack.modality === 'SEG') {
              stack = mergedSeries[0].stack[0];
              stack2 = mergedSeries[1].stack[0];
            }

            const stackHelper = new StackHelper(stack);
            // const stackHelper2 = new StackHelper(stack2);

            stackHelper.bbox.visible = true;
            stackHelper.border.visible = true;
            stackHelper.index = 10;

            sceneLayer0.add(stackHelper);
            // sceneLayer1.add(stackHelper2);

            // stack2.prepare();
            // // pixels packing for the fragment shaders now happens there
            // stack2.pack();

            // let textures2 = [];
            // for (let m = 0; m < stack2._rawData.length; m++) {
            //   let tex = new DataTexture(
            //     stack2.rawData[m],
            //     stack2.textureSize,
            //     stack2.textureSize,
            //     stack2.textureType,
            //     UnsignedByteType,
            //     UVMapping,
            //     ClampToEdgeWrapping,
            //     ClampToEdgeWrapping,
            //     NearestFilter,
            //     NearestFilter
            //   );
            //   tex.needsUpdate = true;
            //   tex.flipY = true;
            //   textures2.push(tex);
            // }

            // uniformsLayer1 = DataUniformShader.uniforms();
            // uniformsLayer1.uTextureSize.value = stack2.textureSize;
            // uniformsLayer1.uTextureContainer.value = textures2;
            // uniformsLayer1.uWorldToData.value = stack2.lps2IJK;
            // uniformsLayer1.uNumberOfChannels.value = stack2.numberOfChannels;
            // uniformsLayer1.uPixelType.value = stack2.pixelType;
            // uniformsLayer1.uPackedPerPixel.value = stack2.packedPerPixel;
            // uniformsLayer1.uBitsAllocated.value = stack2.bitsAllocated;
            // uniformsLayer1.uWindowCenterWidth.value = [stack2.windowCenter, stack2.windowWidth];
            // uniformsLayer1.uRescaleSlopeIntercept.value = [stack2.rescaleSlope, stack2.rescaleIntercept];
            // uniformsLayer1.uDataDimensions.value = [stack2.dimensionsIJK.x, stack2.dimensionsIJK.y, stack2.dimensionsIJK.z];
            // uniformsLayer1.uInterpolation.value = 0;
            // uniformsLayer1.uLowerUpperThreshold.value = [...stack2.minMax];

            // // generate shaders on-demand!
            // let fs = new DataFragmentShader(uniformsLayer1);
            // let vs = new DataVertexShader();
            // materialLayer1 = new ShaderMaterial({
            //   side: DoubleSide,
            //   uniforms: uniformsLayer1,
            //   vertexShader: vs.compute(),
            //   fragmentShader: fs.compute(),
            // });

            // // add mesh in this scene with right shaders...
            // meshLayer1 = new Mesh(stackHelper.slice.geometry, materialLayer1);
            // // go the LPS space
            // meshLayer1.applyMatrix4(stack._ijk2LPS);
            // sceneLayer1.add(meshLayer1);

            // // Create the Mix layer
            // uniformsLayerMix = LayerUniformShader.uniforms();
            // uniformsLayerMix.uTextureBackTest0.value = sceneLayer0TextureTarget.texture;
            // uniformsLayerMix.uTextureBackTest1.value = sceneLayer1TextureTarget.texture;

            // let fls = new LayerFragmentShader(uniformsLayerMix);
            // let vls = new LayerVertexShader();
            // materialLayerMix = new ShaderMaterial({
            //   side: DoubleSide,
            //   uniforms: uniformsLayerMix,
            //   vertexShader: vls.compute(),
            //   fragmentShader: fls.compute(),
            //   transparent: true,
            // });

            // // add mesh in this scene with right shaders...
            // meshLayerMix = new Mesh(stackHelper.slice.geometry, materialLayerMix);
            // // go the LPS space
            // meshLayerMix.applyMatrix4(stack._ijk2LPS);
            // sceneLayerMix.add(meshLayerMix);

            // //
            // // set camera
            // let worldbb = stack.worldBoundingBox();
            // let lpsDims = new Vector3(worldbb[1] - worldbb[0], worldbb[3] - worldbb[2], worldbb[5] - worldbb[4]);

            // // box: {halfDimensions, center}
            // let box = {
            //   center: stack.worldCenter().clone(),
            //   halfDimensions: new Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
            // };

            // // init and zoom
            // let canvas = {
            //   width: threeD.clientWidth,
            //   height: threeD.clientHeight,
            // };
            // camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
            // camera.box = box;
            // camera.canvas = canvas;
            // camera.update();
            // camera.fitBox(2);

            // // CREATE LUT
            // lutLayer0 = new HelpersLut(
            //   'my-lut-canvases-l0',
            //   'default',
            //   'linear',
            //   [
            //     [0, 0, 0, 0],
            //     [1, 1, 1, 1],
            //   ],
            //   [
            //     [0, 1],
            //     [1, 1],
            //   ]
            // );
            // lutLayer0.luts = HelpersLut.presetLuts();
            // lutLayer0.lut = 'spectrum';
            // stackHelper.slice.lut = 1;
            // stackHelper.slice.lutTexture = lutLayer0.texture;

            // lutLayer1 = new HelpersLut(
            //   'my-lut-canvases-l1',
            //   'default',
            //   'linear',
            //   stack2.segmentationLUT,
            //   stack2.segmentationLUTO,
            //   true
            // );
            // uniformsLayer1.uLut.value = 1;
            // uniformsLayer1.uTextureLUT.value = lutLayer1.texture;

            function updateLayer1() {
              if (meshLayer1) {
                meshLayer1.geometry.dispose();
                meshLayer1.geometry = stackHelper.slice.geometry;
                meshLayer1.geometry.verticesNeedUpdate = true;
              }
            }

            function updateLayerMix() {
              if (meshLayerMix) {
                sceneLayerMix.remove(meshLayerMix);
                meshLayerMix.material.dispose();
                meshLayerMix.material = null;
                meshLayerMix.geometry.dispose();
                meshLayerMix.geometry = null;

                meshLayerMix = new Mesh(stackHelper.slice.geometry, materialLayerMix);
                meshLayerMix.applyMatrix4(stackHelper.stack._ijk2LPS);
                sceneLayerMix.add(meshLayerMix);
              }
            }

            // let stack = stackHelper.stack;

            let gui = new dat.GUI({
              autoPlace: false,
            });

            let customContainer = document.getElementById('my-gui-container');
            customContainer.appendChild(gui.domElement);

            let layer0Folder = gui.addFolder('PET');
            layer0Folder.add(stackHelper.slice, 'windowWidth', 1, stack.minMax[1]).step(1).listen();
            layer0Folder.add(stackHelper.slice, 'windowCenter', stack.minMax[0], stack.minMax[1]).step(1).listen();
            layer0Folder.add(stackHelper.slice, 'intensityAuto');
            layer0Folder.add(stackHelper.slice, 'invert');

            let lutUpdate = layer0Folder.add(stackHelper.slice, 'lut', lutLayer0.lutsAvailable());
            lutUpdate.onChange(function (value) {
              lutLayer0.lut = value;
              stackHelper.slice.lutTexture = lutLayer0.texture;
            });

            let indexUpdate = layer0Folder
              .add(stackHelper, 'index', 0, stack.dimensionsIJK.z - 1)
              .step(1)
              .listen();
            indexUpdate.onChange(function () {
              updateLayer1();
              updateLayerMix();
            });

            layer0Folder.add(stackHelper.slice, 'interpolation', 0, 1).step(1).listen();

            layer0Folder.open();

            // layer mix folder
            let layerMixFolder = gui.addFolder('Segmentation');
            let opacityLayerMix1 = layerMixFolder
              .add(
                {
                  opacity1: 1.0,
                  lut: 'default',
                },
                'opacity1',
                0,
                1
              )
              .step(0.01);
            opacityLayerMix1.onChange(function (value) {
              uniformsLayerMix.uOpacity1.value = value;
            });

            layerMixFolder.open();

            // hook up callbacks
            controls.addEventListener('OnScroll', function (e) {
              if (e.delta > 0) {
                if (stackHelper.index >= stack.dimensionsIJK.z - 1) {
                  return false;
                }
                stackHelper.index += 1;
              } else {
                if (stackHelper.index <= 0) {
                  return false;
                }
                stackHelper.index -= 1;
              }

              updateLayer1();
              updateLayerMix();
            });

            updateLayer1();
            updateLayerMix();

            /**
             * On window resize callback
             */
            function onWindowResize() {
              let threeD = document.getElementById('r3d');
              camera.canvas = {
                width: threeD.clientWidth,
                height: threeD.clientHeight,
              };
              camera.fitBox(2);

              renderer.setSize(threeD.clientWidth, threeD.clientHeight);
            }
            window.addEventListener('resize', onWindowResize, false);
            onWindowResize();

            // force 1st render
            render();
            // notify puppeteer to take screenshot
          })
          .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
          });
      }
    })();
  });

  return (
    <>
      <div id="my-gui-container"></div>

      <div id="my-lut-container">
        <div>
          PET<div id="my-lut-canvases-l0" className="my-lut-canvases"></div>
        </div>
        <div>
          Segmentation<div id="my-lut-canvases-l1" className="my-lut-canvases"></div>
        </div>
      </div>

      <div id="r3d"></div>
      <div style={{ backgroundColor: '#f9f9f9', width: 0, height: 0 }}></div>

      {/* <Container fluid style={{ height: '100%', width: '100%', padding: '0' }}>
        <div id="my-gui-container"></div>
        <Row style={{ height: '50%' }}>
          <Col id="r0" className="renderer"></Col>
          <Col id="r1" className="renderer"></Col>
        </Row>
        <Row style={{ height: '50%' }}>
          <Col id="r2" className="renderer"></Col>
          <Col id="r3" className="renderer"></Col>
        </Row>
      </Container> */}
      {/* <ModalToggle></ModalToggle> */}
    </>
  );
}
import fs from 'fs';
export async function getServerSideProps(context) {
  const { subject, modality } = context.query;

  let dataDir = process.env.SUBJECTS_DIR;
  let brainT1 = fs.readFileSync(`${dataDir}/${subject}/f-in-anat.nii.gz`);

  let fmri = fs.readFileSync(`${dataDir}/${subject}/reconstruction.nii.gz`);

  return {
    props: {
      brainT1: JSON.stringify(brainT1),
      fmri: JSON.stringify(fmri),
    },
  };
}

export default LabelMapViewer;
