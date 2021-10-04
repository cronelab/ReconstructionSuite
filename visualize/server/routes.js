import path from 'path';
import fs, { existsSync } from 'fs';
import parse from 'csv-parse/lib/sync.js';
import { exec } from 'child_process';
let dataDir = '/data';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
let __dirname = path.resolve(path.dirname(''));

const routes = (express) => {
  const router = express.Router();
  router.use(express.json()); // for parsing application/json

  router.get('/', (req, res) => res.sendFile(path.join(__dirname, '/dist', '/index.html')));
  router.use('/docs/viz', express.static(path.join(__dirname, '/docs', 'ReconViz/build')));
  router.use('/docs/seek', express.static(path.join(__dirname, '/docs', 'seek/build')));
  router.use('/docs/localize', express.static(path.join(__dirname, '/docs', 'Localization/build')));

  router.use('/docs/', express.static(path.join(__dirname, '/docs', 'LandingPage')));

  //3D brain
  router.get('/brain/:subject', (req, res) => {
    let subject = req.params.subject;
    if (fs.existsSync(`${dataDir}/${subject}/brain.glb`)) {
      res.sendFile(`brain.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    } else {
      res.status(404).send('Not Found');
    }
  });

  //3D electrodes
  router.get('/electrodes/:subject', (req, res) => {
    let subject = req.params.subject;
    console.log(`${dataDir}/${subject}/electrodes.glb`);
    if (fs.existsSync(`${dataDir}/${subject}/electrodes.glb`)) {
      res.sendFile(`electrodes.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    } else {
      res.status(404).send('Not Found');
    }
  });

  router.get('/api/list', (req, res) => {
    fs.readdir('/data/', (err, subjects) => {
      if (subjects != undefined) {
        res.status(200).json(subjects.filter((x) => x.startsWith('PY')));
      } else {
        res.status(200).json(['No subjects in database']);
      }
    });
  });

  //default colors
  router.get('/electrodeColors/:subject', (req, res) => {
    let subject = req.params.subject;
    if (fs.existsSync(`${dataDir}/${subject}/colors.json`)) {
      res.sendFile(`colors.json`, {
        root: `${dataDir}/${subject}/`,
      });
    } else {
      res.status(404).send('Not Found');
    }
  });

  //Anatomical locations
  router.get('/anatomy/:subject', (req, res) => {
    let subject = req.params.subject;
    fs.readdir(dataDir, (err, subjects) => {
      if (subjects.indexOf(subject) > -1) {
        if (fs.existsSync(`${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`)) {
          let file = fs.readFileSync(`${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`);
          let anatomy = parse(file, {
            delimiter: ['\t'],
          });
          anatomy.shift();
          res.send(JSON.stringify(anatomy));
        } else {
          res.status(204).end();
        }
      }
    });
  });

  //T1
  router.get('/t1/:subject', (req, res) => {
    let subject = req.params.subject;
    if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii.gz`)) {
      res.setHeader('Content-Type', 'application/gzip');
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii.gz`);
    } else if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)) {
      res.setHeader('Content-Type', 'application/nii');
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
    } else {
      res.status(404).send('Not Found');
    }
  });

  //CT
  router.get('/ct/:subject', (req, res) => {
    let subject = req.params.subject;
    if (fs.existsSync(`${dataDir}/${subject}/CT.nii.gz`)) {
      res.setHeader('Content-Type', 'application/gzip');
      res.sendFile(`${dataDir}/${subject}/CT.nii.gz`);
    } else if (fs.existsSync(`${dataDir}/${subject}/CT.nii`)) {
      res.setHeader('Content-Type', 'application/nii');
      res.sendFile(`${dataDir}/${subject}/CT.nii`);
    } else {
      res.status(404).send('Not Found');
    }
  });

  router.get('/locationInfo', (req, res) => {
    let location = JSON.parse(req.query.location);
    const data = readFileSync('/usr/local/freesurfer/FreeSurferColorLUT.txt', 'utf-8');
    const lines = data.split(/\r?\n/);
    exec(
      `/usr/local/freesurfer/bin/mri_info /data/PY20N012/mri/wmparc.mgz --voxel ${location.x} ${location.y} ${location.z}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        let segmentToSend;
        lines.forEach((line) => {
          let segment = line.split(' ').filter((entry) => entry.length != 0);
          let segmentID = segment[0];
          if (parseInt(stdout) == segmentID) {
            let segmentName = segment[1];
            segmentToSend = segmentName;
          } else {
          }
        });
        res.send(JSON.stringify(segmentToSend));
      }
    );
  });

  router.post('/saveElectrodes', (req, res) => {
    if (!existsSync('/data/PY21N023/electrodes')) {
      mkdirSync('/data/PY21N023/electrodes');
    }
    writeFileSync('/data/PY21N023/electrodes/RAS_electrodes.tsv', 'name x y z size \n');
    writeFileSync('/data/PY21N023/electrodes/VOX_electrodes.tsv', 'name x y z size \n');
    writeFileSync('/data/PY21N023/electrodes/tkRAS_electrodes.tsv', 'name x y z size \n');

    Object.keys(req.body).forEach((entry) => {
      writeFileSync(
        '/data/PY21N023/electrodes/RAS_electrodes.tsv',
        `${entry} ${req.body[entry].RAS[0]} ${req.body[entry].RAS[1]} ${req.body[entry].RAS[2]} 1.1\n`,
        {
          flag: 'a+',
        }
      );
      writeFileSync(
        '/data/PY21N023/electrodes/VOX_electrodes.tsv',
        `${entry} ${req.body[entry].VOX[0]} ${req.body[entry].VOX[1]} ${req.body[entry].VOX[2]} 1.1\n`,
        {
          flag: 'a+',
        }
      );
      writeFileSync(
        '/data/PY21N023/electrodes/tkRAS_electrodes.tsv',
        `${entry} ${req.body[entry].tkRAS[0]} ${req.body[entry].tkRAS[1]} ${req.body[entry].tkRAS[2]} 1.1\n`,
        {
          flag: 'a+',
        }
      );
    });
    res.send(JSON.stringify('Saved!'));
  });

  return router;
};
export default routes;
