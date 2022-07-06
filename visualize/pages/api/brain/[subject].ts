import fs from 'fs';
export default function handler(req, res) {
  let { subject } = req.query;

  let dataDir = process.env.SUBJECTS_DIR
  if (fs.existsSync(`${dataDir}/${subject}/brain.glb`)) {
    let file = fs.readFileSync(`${dataDir}/${subject}/brain.glb`);
    res.send(file)
  } else {
    res.status(404).send('Not Found');
  }
}
