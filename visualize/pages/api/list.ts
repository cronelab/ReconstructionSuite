import fs from 'fs';
export default function handler(req, res) {
  fs.readdir(process.env.SUBJECTS_DIR, (err, subjects) => {
    console.log(subjects);
    if (subjects != undefined) {
      res.status(200).json(subjects.filter((x) => x.startsWith('PY')));
    } else {
      res.status(200).json(['No subjects in database']);
    }
  });
}
