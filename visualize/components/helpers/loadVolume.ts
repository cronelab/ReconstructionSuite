import { VolumeLoader, stackHelperFactory } from 'ami';
import pako from 'pako';
export const loadVolume = async (subject, image) => {
  const volumeLoader = new VolumeLoader();
  const brainReq = await fetch(`/api/subject/${subject}?modality=${image}`);
  if (!brainReq.ok) {
    alert('Error: Subject not found');
    return;
  }

  let brain = await brainReq.arrayBuffer();
  let brainT1 = Buffer.from(brain);

  if (brainReq.headers.get('content-type') == 'application/gzip') {
    //@ts-ignore
    await volumeLoader.load(URL.createObjectURL(new Blob([pako.inflate(brainT1)])));
  } else {
    await volumeLoader.load(URL.createObjectURL(new Blob([brain])));
  }

  // Use AMI to parse, processes, and display the scan

  const series = volumeLoader.data[0].mergeSeries(volumeLoader.data)[0];
  volumeLoader.free();

  let stack = series.stack[0];
  stack.prepare();

  return stack;
};
