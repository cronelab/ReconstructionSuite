import path from "path";
import fs from "fs";
import parse from "csv-parse/lib/sync.js";

let subject = process.env.SUBJECT || "fsaverage";
let dataDir = process.env.SUBJECTS_DIR || "/data/derivatives/freesurfer";

let __dirname = path.resolve(path.dirname(""));
const routes = (express) => {
  const router = express.Router();

  router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/dist", "/index.html"))
  );
  router.use("/docs/viz", express.static(path.join(__dirname, "/docs", "ReconViz/build")));
  router.use("/docs/seek", express.static(path.join(__dirname, "/docs", "seek/build")));
  router.use("/docs/localize", express.static(path.join(__dirname, "/docs", "Localization/build")));

  router.use("/docs/", express.static(path.join(__dirname, "/docs", "LandingPage")));

  //3D brain
  router.get("/brain/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/brain.glb`)) {
      res.sendFile(`brain.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
    else {
      res.status(404).send('Not Found')
    }
  });

  //3D electrodes
  router.get("/electrodes/:subject", (req, res) => {
    let subject = req.params.subject
    console.log(`${dataDir}/${subject}/electrodes.glb`)
    if (fs.existsSync(`${dataDir}/${subject}/electrodes.glb`)) {
      res.sendFile(`electrodes.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
    else {
      res.status(404).send('Not Found')
    }
  });

  //datasets
  router.get("/data/:subject", (req, res) => {
    let subject = req.params.subject
    console.log(subject)
    if (fs.existsSync(`/home/visualizer/data/derivatives/timeseries/${subject}/timeSeriesTest.json`)) {
      console.log(subject)
      res.sendFile(`timeSeriesTest.json`, {
        root: `/home/visualizer/data/derivatives/timeseries/${subject}`,
      });
    }
    else {
      res.status(404).send('Not Found')
    }
  });
  
  //default colors
  router.get("/electrodeColors/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/colors.json`)) {
      res.sendFile(`colors.json`, {
        root: `${dataDir}/${subject}/`,
      });
    }
    else {
      res.status(404).send('Not Found')
    }
  });

  //Anatomical locations
  router.get("/anatomy/:subject", (req, res) => {
    let subject = req.params.subject;
    fs.readdir(dataDir, (err, subjects) => {
      if (subjects.indexOf(subject) > -1) {
        if (fs.existsSync(`${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`)) {
          let file = fs.readFileSync(
            `${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`
          );
          let anatomy = parse(file, {
            delimiter: ["\t"],
          });
          anatomy.shift();
          res.send(JSON.stringify(anatomy))
        }
        else {
          res.status(204).end();

        }
      }
    });
  });

  //T1 
  router.get("/t1/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)) {
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
    } else {
      res.status(404).send('Not Found')
    }
  });

  //CT 
  router.get("/ct/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/CT.nii`)) {
      console.log("Sending CT")
      res.sendFile(`${dataDir}/${subject}/CT.nii`);
    } else {
      res.status(404).send('Not Found')
    }
  });

  router.get("/:nifti/:subject", (req, res) => {
    let subject = req.params.subject
    let nifti = req.params.nifti
    if (fs.existsSync(`${dataDir}/${subject}/${nifti}.nii`)) {
      res.sendFile(`${dataDir}/${subject}/${nifti}.nii`);
    } else {
      res.status(404).send('Not Found')
    }
  });

  return router;
};
export default routes;
