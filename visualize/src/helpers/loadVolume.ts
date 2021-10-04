import { VolumeLoader, VolumeRenderingHelper, LutHelper, TrackballControl } from 'ami.js';
import { activeSubject, modality } from './renderers';
import pako from 'pako';

export const loadVolume = async () => {
  // If a T1 or CT exists, load it.
  const brainReq = await fetch(`/${modality}/${activeSubject}`);
  if (!brainReq.ok) {
    alert('Error: Subject not found');
    return;
  }
  let brain;
  let objectURL;

  if (brainReq.headers.get('content-type') == 'application/gzip') {
    brain = await brainReq.arrayBuffer();
    objectURL = URL.createObjectURL(new Blob([pako.inflate(brain).buffer]));
  } else {
    brain = await brainReq.blob();
    objectURL = URL.createObjectURL(brain);
  }
  let stack;

  // Use AMI to parse, processes, and display the scan
  const volumeLoader = new VolumeLoader();
  await volumeLoader.load(objectURL);
  const series = volumeLoader.data[0].mergeSeries(volumeLoader.data)[0];
  console.log(volumeLoader);
  console.log(series);
  volumeLoader.free();

  stack = series.stack[0];
  return stack;
};
