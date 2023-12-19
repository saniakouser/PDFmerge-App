const express = require('express');
const multer = require('multer');
const path = require('path');
const pdfmerge = require('./merge'); 
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
const port = 4000;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'template/index.html'));
})


 app.post('/merge',  upload.array('pdfs'), function (req, res, next) {
   console.log(req.files);
  pdfmerge(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    .then(() => {
      console.log('PDF files merged successfully.');
      res.redirect('/static/merged.pdf');
    })
    .catch((error) => {
      console.error('Error merging PDF files:', error);
    
      res.send('Error merging PDF files.');
    });
  
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
