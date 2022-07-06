import fs from 'fs';
export default function handler(req, res) {
  let { scan, modality } = req.query;
  let dataDir = `/home/chris/Development/OneRepoFinal/apps/ReconstructionSuite/data/derivatives/freesurfer/`;
  if(modality){
    if (fs.existsSync(`${dataDir}/${scan}/${modality}.nii.gz`)) {
      let file = fs.readFileSync(`${dataDir}/${scan}/${modality}.nii.gz`);
      res.setHeader('Content-Type', 'application/gzip');
      res.send(file);
    } else if (fs.existsSync(`${dataDir}/${scan}/${modality}.nii`)) {
      res.setHeader('Content-Type', 'application/nii');
      let file = fs.readFileSync(`${dataDir}/${scan}/${modality}.nii`);
      res.send(file);
    } else {
      res.status(404).send('Not Found');
    }
  }
else{

  if (fs.existsSync(`${dataDir}/${scan}/reconstruction.nii.gz`)) {
    let file = fs.readFileSync(`${dataDir}/${scan}/reconstruction.nii.gz`);
    res.setHeader('Content-Type', 'application/gzip');
    res.send(file);
  } else if (fs.existsSync(`${dataDir}/${scan}/reconstruction.nii`)) {
    res.setHeader('Content-Type', 'application/nii');
    res.sendFile(`${dataDir}/${scan}/reconstruction.nii`);
  } else {
    res.status(404).send('Not Found');
  }}
}


