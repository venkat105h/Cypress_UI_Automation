/*
Author: 
Description: 
Timestamp: 
Modified : Biswajit Pattanaik 20th Oct 2021 2:15 PM
 Description : Modifying this script to send pdf reports to automation-qa slack channel and html report to automation-qa slack channel,
 this is being done as we are scheduling the job from jenkins once we are comfortable running the plans from jenkins we will send pdf reports to automation-report channel.
*/
var fs = require('fs');
var request = require('request');

require('dotenv').config();

//var SLACK_TOKEN = "xoxb-2085879108227-2078978899638-4DSWsho95k0R3adQngJkSZZO";
var SLACK_TOKEN = "xoxb-4763579189-2084000668886-293bpbCAnf7zNhY9D96vjD5E";
var SLACK_CHANNEL = "automation-reports";
var SLACK_CHANNEL2 = "automation-qa";
// var filepath = "./PdfGeneration/generated.pdf";

if (process.env.releaseenv == 'qat') {
  var filepath = "./PdfGeneration/v2qat.pdf";
}
else if (process.env.releaseenv == 'qat1') {
  var filepath = "./PdfGeneration/v2qat1.pdf";
}
else if (process.env.releaseenv == 'swat') {
  var filepath = "./PdfGeneration/v2swat.pdf";
}
else if (process.env.releaseenv == 'dev') {
  var filepath = "./PdfGeneration/v2dev.pdf";
}
else{
  var filepath = "./PdfGeneration/v2release.pdf";
}

var optionsPdf = { method: 'POST',
url: 'https://slack.com/api/files.upload',
headers: { 'cache-control': 'no-cache' },
formData: 
  { token: SLACK_TOKEN,
    channels: SLACK_CHANNEL,
    file: fs.createReadStream(filepath)
  } 
};

var optionsHtml = { method: 'POST',
  url: 'https://slack.com/api/files.upload',
  headers: { 'cache-control': 'no-cache' },
  formData: 
  { token: SLACK_TOKEN,
     channels: SLACK_CHANNEL2,
     filename: process.env.releaseenv + '-report.html',
     file: fs.createReadStream('./report.html')
  } 
};


// if ((process.env.releaseenv != 'qat') && (process.env.releaseenv != 'qat1')) {
//   request(optionsPdf, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
//   });
// }

request(optionsPdf, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});

request(optionsHtml, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
