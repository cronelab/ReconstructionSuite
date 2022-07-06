
//   //Anatomical locations
//   router.get('/anatomy/:subject', (req, res) => {
//     let subject = req.params.subject;
//     fs.readdir(dataDir, (err, subjects) => {
//       if (subjects.indexOf(subject) > -1) {
//         if (fs.existsSync(`${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`)) {
//           let file = fs.readFileSync(`${dataDir}/${subject}/electrodes/anatomicalLabels.tsv`);
//           let anatomy = parse(file, {
//             delimiter: ['\t'],
//           });
//           anatomy.shift();
//           res.send(JSON.stringify(anatomy));
//         } else {
//           res.status(204).end();
//         }
//       }
//     });
//   });