import path from "path";
import fs from "fs";

let __dirname = path.resolve(path.dirname(""));
const routes = express => {
	const router = express.Router();

	router.get("/reconstruction3D", (req, res) => res.sendFile(path.join(__dirname, "/dist", "/index.html")));

	//3D brain
	router.get("/api/:subject/brain3D_g", (req, res) => {
		let subject = req.params.subject;
		fs.readdir('/data/derivatives/freesurfer', (err, subjects) => {
				if (fs.existsSync(`/data/derivatives/freesurfer/PY20N006/reconstruction.glb`)) {
					res.sendFile(`reconstruction.glb`, {
						root: `/data/derivatives/freesurfer/PY20N006/`
					});
				}
		});
	});

	router.get("/api/:subject/nifti", (req, res) => {
		let subject = req.params.subject;
		if (fs.existsSync(`/data/derivatives/freesurfer/PY20N006/mri/reconstruction.nii`)) {
			res.sendFile(`reconstruction.nii`, {
				root: `/data/derivatives/freesurfer/PY20N006/mri/`
			})
		} else {
			res.status(204).end()
		}
	})


	return router;
};
export default routes;

