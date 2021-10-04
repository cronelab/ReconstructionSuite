//@ts-nocheck
import { useEffect, useState } from 'react';
import '../App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  r0,
  r1,
  r2,
  r3,
  sceneClip,
  data,
  electrodeMarker,
  animate,
  lastKnownClick,
  onDoubleClick,
  onScroll,
} from '../helpers/renderers';
import cv from '@techstark/opencv-js';
import { loadVolume } from '../helpers/loadVolume';
import { loadBrainSurface } from '../helpers/loadSurfaces';

import setGUIS from '../helpers/sliceGUI';
import { initHelpersStack, initRenderer3D } from '../helpers/helpers';
// Import THREE
import { Scene, Mesh, MeshBasicMaterial, FrontSide, BackSide, SphereGeometry, Matrix4, Vector3 } from 'three';

import { useControls, folder } from 'leva';

function SlicedView(): JSX.Element {
  const [valuesToSave, setValuesToSave] = useState();
  const [electrodeName, setElectrodeName] = useState('');
  const [newOpts, setNewOpts] = useState({});
  const [electrodeColor, setElectrodeColor] = useState('');
  const [stack_, setStack_] = useState();
  const [show, setShow] = useState(false);

  useControls('Electrodes', newOpts, [newOpts, electrodeName]);
  setGUIS();
  let stack;
  useEffect(() => {
    initRenderer3D(r0);

    (async () => {
      stack = await loadVolume();

      stack.prepare();
      const worldCenter = stack.worldCenter();

      r0.camera.lookAt(worldCenter.x, worldCenter.y, worldCenter.z);
      r0.camera.updateProjectionMatrix();
      r0.controls.target.set(worldCenter.x, worldCenter.y, worldCenter.z);

      r0.scene.add(electrodeMarker);

      [r1, r2, r3].forEach((r) => {
        initHelpersStack(r, stack);
        r0.scene.add(r.scene);
        r.domElement.addEventListener('dblclick', onDoubleClick);
        r.controls.addEventListener('OnScroll', onScroll);
      });

      animate();

      await loadBrainSurface(r0, worldCenter);
      console.log(r0);
      setStack_(stack);
      // console.log(stack);
      // console.log(cv);
    })();
  }, []);

  let handleKeyDown = async (e) => {
    if (e.key == 'n') {
      let newElecName = prompt('Name of electrode', 'LA');
      setElectrodeName(newElecName);
      let eleCol = prompt('Color?', 'green');
      setElectrodeColor(eleCol);
      setNewOpts((opts) => ({
        ...opts,
        [newElecName]: folder({}, { color: eleCol }),
      }));
    }
    if (e.key == 'a') {
      const LPStoRAS = new Matrix4();
      const worldCenter = stack_.worldCenter();
      LPStoRAS.set(-1, 0, 0, worldCenter.x, 0, -1, 0, worldCenter.y, 0, 0, 1, worldCenter.z, 0, 0, 0, 1).invert();
      let VOX = new Vector3(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z).applyMatrix4(stack_._lps2IJK);

      let req_anatomicalLocation = await fetch(`locationInfo?location=${JSON.stringify(VOX)}`);
      let anatomicalLocation = await req_anatomicalLocation.json();
      alert(anatomicalLocation);
    }
    if (e.key == 'Enter') {
      console.log(stack_);
      let sphere_r0 = new Mesh(new SphereGeometry(1.1), new MeshBasicMaterial({ color: 0x00ff00 }));
      sphere_r0.position.set(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z);

      // let tkRAS = new Vector3(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z).applyMatrix4(LPStoRAS);
      const LPStoRAS = new Matrix4();
      const worldCenter = stack_.worldCenter();
      LPStoRAS.set(-1, 0, 0, worldCenter.x, 0, -1, 0, worldCenter.y, 0, 0, 1, worldCenter.z, 0, 0, 0, 1).invert();
      let VOX = new Vector3(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z).applyMatrix4(stack_._lps2IJK);
      let RAS = new Vector3(VOX.x, VOX.y, VOX.z).applyMatrix4(stack_._ijk2LPS).applyMatrix4(LPStoRAS);

      let req_anatomicalLocation = await fetch(`locationInfo?location=${JSON.stringify(VOX)}`);
      let anatomicalLocation = await req_anatomicalLocation.json();
      r0.scene.add(sphere_r0);

      let i = data.length + 1;
      data[i] = {};
      data[i].scene = new Scene();
      data[i].materialFront = new MeshBasicMaterial({
        color: electrodeColor,
        side: FrontSide,
        depthWrite: true,
        opacity: 0,
        transparent: true,
        clippingPlanes: [],
      });
      data[i].materialBack = new MeshBasicMaterial({
        color: electrodeColor,
        side: BackSide,
        depthWrite: true,
        opacity: 1,
        transparent: true,
        clippingPlanes: [],
      });
      let geometry_r1 = new SphereGeometry(1.1);
      data[i].meshFront = new Mesh(geometry_r1, data[i].materialFront);
      data[i].meshBack = new Mesh(geometry_r1, data[i].materialBack);
      data[i].meshFront.position.set(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z);
      data[i].meshBack.position.set(lastKnownClick.x, lastKnownClick.y, lastKnownClick.z);
      data[i].scene.add(data[i].meshFront);
      data[i].scene.add(data[i].meshBack);
      sceneClip.add(data[i].scene);

      let coordinate = [-lastKnownClick.x.toFixed(2), -lastKnownClick.y.toFixed(2), lastKnownClick.z.toFixed(2)];
      let currentElectrode = `${electrodeName}'${Object.keys(newOpts[electrodeName].schema).length + 1}`;

      setValuesToSave((vals) => ({
        ...vals,
        [currentElectrode]: {
          tkRAS: [...coordinate],
          VOX: [VOX.x.toFixed(2), VOX.y.toFixed(2), VOX.z.toFixed(2)],
          location: anatomicalLocation,
          RAS: [RAS.x.toFixed(2), RAS.y.toFixed(2), RAS.z.toFixed(2)],
        },
      }));

      setNewOpts((opts) => ({
        ...opts,
        [electrodeName]: folder(
          {
            ...opts[electrodeName].schema,
            [currentElectrode]: anatomicalLocation,
          },
          { color: electrodeColor }
        ),
      }));
    }
    if (e.key == 's') {
      console.log(valuesToSave);
      let sender = await fetch('/saveElectrodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(valuesToSave),
      });
      let answer = await sender.json();
      alert(answer);
    }
    if (e.key == 'm') {
      setShow(true);
    }
    if (e.key == 'c') {
      let elecToChange = prompt('Which electrode name would you like to change?');
      let elecToChangeTo = prompt('Change it to what?');
      let tempOpts = newOpts;
      Object.keys(tempOpts[elecToChange].schema).forEach((elec, index) => {
        tempOpts[elecToChange].schema[`${elecToChangeTo}'${index + 1}`] =
          tempOpts[elecToChange].schema[`${elecToChange}'${index + 1}`];
        delete tempOpts[elecToChange].schema[`${elecToChange}'${index + 1}`];
      });
      tempOpts[elecToChangeTo] = tempOpts[elecToChange];
      delete tempOpts[elecToChange];
      setNewOpts(tempOpts);
      setElectrodeName(elecToChangeTo);
    }
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stack_, newOpts]);

  // document.onkeypress = (e) => {
  // if (e.key == 'e') {
  //   let editableElectrode = prompt('Which electrode would you like to edit?', "name'num");
  //   let group = editableElectrode.split("'")[0];
  //   let num = editableElectrode.split("'")[1];
  //   let tempOpts = newOpts;
  //   delete tempOpts[group].schema.editableElectrode;
  //   console.log(tempOpts);
  //   setNewOpts(tempOpts);
  // }
  // };

  return (
    <>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>s: Save</ListGroup.Item>
            <ListGroup.Item>m: Show modal</ListGroup.Item>
            <ListGroup.Item>n: New electrode group</ListGroup.Item>
            <ListGroup.Item>e: Add electrode to current group</ListGroup.Item>
            <ListGroup.Item>d: Delete electrode from current group</ListGroup.Item>
            <ListGroup.Item>a: Get anatomical location</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SlicedView;
