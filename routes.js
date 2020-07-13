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

  //3D brain
  router.get("/api/brain3D", (req, res) => {
    if (fs.existsSync(`${dataDir}/${subject}/reconstruction.glb`)) {
      console.log("Sending glb...");
      res.sendFile(`reconstruction.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
  });

  //3D brain
  router.get("/api/brain", (req, res) => {
    if (fs.existsSync(`${dataDir}/${subject}/brain.glb`)) {
      console.log("Sending glb...");
      res.sendFile(`brain.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
  });

  // objs
  router.get("/api/obj", (req, res) => {
    if (fs.existsSync(`${dataDir}/${subject}/obj/3rd-Ventricle.obj`)) {
      console.log("Sending obj...");
      res.sendFile(`3rd-Ventricle.obj`, {
        root: `${dataDir}/${subject}/obj/`,
      });
    }
  });

    //3D brain
    router.get("/api/electrodes", (req, res) => {
      if (fs.existsSync(`${dataDir}/${subject}/electrodes.glb`)) {
        console.log("Sending glb...");
        res.sendFile(`electrodes.glb`, {
          root: `${dataDir}/${subject}/`,
        });
      }
    });
  
  router.get("/api/nifti", (req, res) => {
    console.log(`${dataDir}/${subject}/reconstruction.nii`)
    if (fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)) {
      console.log("Sending nifti...");
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
    } else {
      console.log("NIFTI does NOT exist");
      res.status(204).end();
    }
  });

  return router;
};
export default routes;
