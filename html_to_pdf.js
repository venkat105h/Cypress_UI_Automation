var fs = require('fs');
var pdf = require('html-pdf');
require('dotenv').config();


var html = fs.readFileSync('./report.html', 'utf8');
var config = { format: 'A2' };


// Create the PDF
if (process.env.releaseenv == 'qat') {
   pdf.create(html, config).toFile('PdfGeneration/v2qat.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
   });
   
}
else if (process.env.releaseenv == 'qat1') {
   pdf.create(html, config).toFile('PdfGeneration/v2qat1.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
   });
   
}
else if (process.env.releaseenv == 'swat') {
   pdf.create(html, config).toFile('PdfGeneration/v2swat.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
   });
}

else if (process.env.releaseenv == 'dev') {
   pdf.create(html, config).toFile('PdfGeneration/v2dev.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
   });
   
}
else {
   pdf.create(html, config).toFile('PdfGeneration/v2release.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
   });
   
}
// pdf.create(html, config).toFile('PdfGeneration/generated.pdf', function (err, res) {
//    if (err) return console.log(err);
//    console.log(res);
// });

// // Create the PDF
// pdf.create(html, config).toFile('PdfGeneration/generated.pdf', function (err, res) {
//    if (err) return console.log(err);
//    console.log(res);
// });
