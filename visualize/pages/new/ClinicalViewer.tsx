import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { stackHelperFactory } from 'ami';
import { Vector3 } from 'three'; // Import THREE
import { Leva, folder } from 'leva';

import {
  r0,
  r1,
  r2,
  r3,
  sceneClip,
  data,
  electrodeMarker,
  animate,
  onDoubleClick,
  onScroll,
  lastKnownClick,
  activeSubject,
} from '../../zappa/src/helpers/renderers';
import { initHelpersStack, initRenderer3D } from '../../zappa/src/helpers/helpers';

import { loadVolume } from '../../zappa/src/helpers/loadVolume';

import { loadBrainScene, loadElectrodeScene, reorientateBrainScene } from '../../zappa/src/helpers/loadSurfaces';

import setGUIS from '../../zappa/src/helpers/sliceGUI';
const ClinicalViewer = () => {
  const [stack_, setStack_] = useState(null);
  const [colors, setColors] = useState({});
  const [newOpts, setNewOpts] = useState({});
  const loadElectrodeColors = async () => {
    let req = await fetch(`/electrodeColors/${activeSubject}`);
    let res = await req.json();
    return res;
  };

  useEffect(() => {
    (async () => {
      let c = await loadElectrodeColors();
      setColors(c);
      let electrodeColorOptions = {};
      Object.keys(c).forEach((color) => {
        electrodeColorOptions[color] = {
          //@ts-ignore
          r: parseFloat(c[color].split(' ')[0]) * 255,
          //@ts-ignore
          g: parseFloat(c[color].split(' ')[1]) * 255,
          //@ts-ignore
          b: parseFloat(c[color].split(' ')[2]) * 255,
          // }
        };
      });
      setNewOpts(electrodeColorOptions);
      // setNewOpts({
      //   Electrodes: 1,
      // });
      let p = await Promise.all([loadVolume(r0, r1, r2, r3), loadElectrodeScene(c), loadBrainScene()]);
      Object.keys(c).forEach((color) => {
        document.getElementById(`Electrodes.${color}`).parentElement.remove();
      });

      let { stack } = p[0];
      initRenderer3D(r0, stack);
      let { electrodeScene } = p[1];
      let { brainScene } = p[2];

      const worldCenter = stack.worldCenter();

      r0.camera.lookAt(worldCenter.x, worldCenter.y, worldCenter.z);
      r0.camera.updateProjectionMatrix();
      r0.controls.target.set(worldCenter.x, worldCenter.y, worldCenter.z);

      r0.scene.add(electrodeMarker);
      reorientateBrainScene(r0, worldCenter, brainScene, electrodeScene);
      animate();

      const StackHelper = stackHelperFactory();

      const worldbb = stack.worldBoundingBox();
      const lpsDims = new Vector3(
        (worldbb[1] - worldbb[0]) / 2,
        (worldbb[3] - worldbb[2]) / 2,
        (worldbb[5] - worldbb[4]) / 2
      );

      [r1, r2, r3].forEach((r) => {
        let stackHelper = new StackHelper(stack);
        initHelpersStack(r, stack, lpsDims, stackHelper);
        r0.scene.add(r.scene);
        r.domElement.addEventListener('dblclick', onDoubleClick);
        r.controls.addEventListener('OnScroll', onScroll);
      });

      setStack_(stack);
    })();
  }, []);
  setGUIS(newOpts, 'b');
  return (
    <>
      {/* <Leva collapsed></Leva> */}
      <Container fluid style={{ height: '100%', width: '100%', padding: '0' }}>
        <div id="my-gui-container"></div>
        <Row style={{ height: '50%' }}>
          <Col id="r0" className="renderer"></Col>
          <Col id="r1" className="renderer"></Col>
        </Row>
        <Row style={{ height: '50%' }}>
          <Col id="r2" className="renderer"></Col>
          <Col id="r3" className="renderer"></Col>
        </Row>
      </Container>
    </>
  );
};

export default ClinicalViewer;
