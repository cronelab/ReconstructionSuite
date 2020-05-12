import path from "path";
import fs from "fs";

let __dirname = path.resolve(path.dirname(""));
const routes = (express) => {
  const router = express.Router();

  router.get("/reconstruction3D", (req, res) =>
    res.sendFile(path.join(__dirname, "/dist", "/index.html"))
  );

  let dataDir = '/data/derivatives/freesurfer/'

  //3D brain
  router.get("/api/brain3D", (req, res) => {
    if (
      fs.existsSync(`${dataDir}/PY20N006/reconstruction.glb`)
    ) {
      console.log("File exists. 1");
      res.sendFile(`reconstruction.glb`, {
        root: `${dataDir}/PY20N006/`,
      });
    }
  });

  router.get("/api/nifti", (req, res) => {
    if (
      fs.existsSync(`${dataDir}/PY20N006/reconstruction.nii`)
    ) {
      console.log("File exists. 2");
      res.sendFile(`${dataDir}/PY20N006/reconstruction.nii`);
    } else {
      console.log("does NOT exist");
      res.status(204).end();
    }
  });

  return router;
};
export default routes;
