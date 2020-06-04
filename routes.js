import path from "path";
import fs from "fs";

let subject =  process.env.SUBJECT
let dataDir = process.env.SUBJECTS_DIR

let __dirname = path.resolve(path.dirname(""));
const routes = (express) => {
  const router = express.Router();

  router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/dist", "/index.html"))
  );


  //3D brain
  router.get("/api/brain3D", (req, res) => {
    if (
      fs.existsSync(`${dataDir}/${subject}/reconstruction.glb`)
    ) {
      console.log("Sending glb...");
      res.sendFile(`reconstruction.glb`, {
        root: `${dataDir}/${subject}/`,
      });
    }
  });

  router.get("/api/nifti", (req, res) => {
    if (
      fs.existsSync(`${dataDir}/${subject}/reconstruction.nii`)
    ) {
      console.log("Sending nifti...");
      res.sendFile(`${dataDir}/${subject}/reconstruction.nii`);
    } else {
      console.log("does NOT exist");
      res.status(204).end();
    }
  });

  return router;
};
export default routes;
