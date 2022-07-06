import fs from 'fs';
export default function handler(req, res) {
  let { subject } = req.query;
  console.log(req.query)
  // process.chdir('../');
  let dataDir = `/home/chris/Development/OneRepoFinal/apps/ReconstructionSuite/data/derivatives/freesurfer/`;
  // if (fs.existsSync(`${dataDir}/${subject}/electrodes/colors.json`)) {
  //   res.setHeader('Content-Type', 'application/gzip');
  //   res.sendFile(`${dataDir}/${subject}/reconstruction.nii.gz`);
  // } else if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)) {
  //   res.setHeader('Content-Type', 'application/nii');
  //   res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
  // } else {
  //   res.status(404).send('Not Found');
  // }}

  if (fs.existsSync(`${dataDir}/${subject}/electrodes/colors.json`)) {
    let file = fs.readFileSync(`${dataDir}/${subject}/electrodes/colors.json`);

    res.send(file);
    } else {
    res.status(404).send('Not Found');
  }
}

// //default colors
//   router.get('/electrodeColors/:subject', (req, res) => {
//     let subject = req.params.subject;
   
//   });