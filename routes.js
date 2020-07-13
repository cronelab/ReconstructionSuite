import path from "path";
import fs from "fs";

let subject = process.env.SUBJECT || "fsaverage";
let dataDir = process.env.SUBJECTS_DIR || "/data/derivatives/freesurfer";

let __dirname = path.resolve(path.dirname(""));
const routes = (express) => {
  const router = express.Router();

  router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/dist", "/index.html"))
  );
  router.use("/docs/meshviz", express.static(path.join(__dirname, "/docs", "/_build/html")));
  router.use("/docs/meshgen", express.static(path.join(__dirname, "/meshdocs", "/_build/html")));
  router.use("/docs/seek", express.static(path.join(__dirname, "/seekdocs", "/_build/html")));


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

  //3D brain
  router.get("/electrodes/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/electrodes.glb`)) {
      res.sendFile(`electrodes.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
    else {
      res.status(404).send('Not Found')
    }
  });

  router.get("/nifti/:subject", (req, res) => {
    let subject = req.params.subject
    if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)) {
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
    } else {
      res.status(404).send('Not Found')
    }
  });




  // // objs
  // router.get("/api/obj", (req, res) => {
  //   if (fs.existsSync(`${dataDir}/${subject}/obj/3rd-Ventricle.obj`)) {
  //     console.log("Sending obj...");
  //     res.sendFile(`3rd-Ventricle.obj`, {
  //       root: `${dataDir}/${subject}/obj/`,
  //     });
  //   }
  // });

  // //3D brain
  // router.get("/api/brain3D", (req, res) => {
  //   if (fs.existsSync(`${dataDir}/${subject}/reconstruction.glb`)) {
  //     console.log("Sending glb...");
  //     res.sendFile(`reconstruction.glb`, {
  //       root: `${dataDir}/${subject}/`,
  //     });
  //   }
  // });
  return router;
};
export default routes;
