import fs from 'fs';
export default function handler(req, res) {
  let { subject } = req.query;

  let dataDir = `/home/chris/Development/OneRepoFinal/apps/ReconstructionSuite/data/derivatives/freesurfer/`;

  console.log(dataDir);
  if (fs.existsSync(`${dataDir}/${subject}/electrodes.glb`)) {
    let file = fs.readFileSync(`${dataDir}/${subject}/electrodes.glb`);
    res.send(file)
  } else {
    res.status(404).send('Not Found');
  }
}
