/*
Author: Biswajit Pattanaik
Description: This helper utility has all the common function for the excel update.
Timestamp: 5th Oct 2021 07:30 PM
Modified : Biswajit Pattanaik 6th Oct 2021 02:30 PM
Description: Removed commented blocks of code as per code review
Modified : Pranjal Shah 05th Jan 2022 12:44 PM
Description: Added functions to compare data with excel for room.
*/


import { sendRequest, getValueFromJsonObject, People, organizerUserHeader, Session} from './CommonUtil'
import { expect } from 'chai'
import environment from '../config/environment';
var today = new Date();
today.setDate(today.getDate() + 1)
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todayroom = yyyy + '/' + mm + '/' + dd;
var datestartroom = new Date(Date.now() + 60 * 6500)
var gaurav = datestartroom.toLocaleString('en-US')
const starthrsroom = gaurav.split(' ')[1].split(':')[0]
const startminroom = gaurav.split(' ')[1].split(':')[1]
const startpmroom = gaurav.split(' ')[2]
var dateendroom = new Date(Date.now() + 120 * 30000)
gaurav = dateendroom.toLocaleString('en-US')
const endhrsroom = gaurav.split(' ')[1].split(':')[0]
const endminroom = gaurav.split(' ')[1].split(':')[1]
const endpmroom = gaurav.split(' ')[2]
var timeinput = starthrsroom + ":" + startminroom + ' ' + startpmroom
var timeinput1 = endhrsroom + ":" + endminroom + ' ' + endpmroom
const timeStrroom = timeinput;
const secondTimeStrroom = timeinput1 ;
const convertTime = timeStr => {
   const [time, modifier] = timeStr.split(' ');
   let [hours, minutes] = time.split(':');
   if (hours === '12') {
      hours = '00';
   }
   if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
   }
   return `${hours}:${minutes}`;
};
var timeinput3 = convertTime(timeStrroom)
var timeinput4 = convertTime(secondTimeStrroom)

var faker = require('faker');

  export const updateWorkBookDataWithAgendaRestrictAccessDetails = (fileName, userNamesToAccess) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var startRow = 1
          for(var i=0; i < userNamesToAccess.length; i++){
            startRow = startRow + 1
            var row = worksheet.getRow(startRow);
            row.getCell(1).value=userNamesToAccess[i]
          }
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      }, (err)=>{
        console.log(err)
      })

  }

  export const updateWorkBookDataWithAttendeeDetails = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "attendee@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "Attendee";
          row.getCell(3).value = "Test";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  
  }
  
  export const updateWorkBookDataWithSpeakerDetails = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "Speaker@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "Speaker";
          row.getCell(3).value = "Test";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  
  }

  export const updateWorkBookDataWithBoothmemberDetails = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var boothId = parseInt(workbook.getWorksheet(2).getRow(2).getCell(2).toString());
          var row = worksheet.getRow(6);
          row.getCell(1).value = "boothmember@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "BoothMember";
          row.getCell(3).value = "Test";
          row.getCell(22).value = boothId;
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  }

  export const updateworkbookDataWithSessionDetails = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "TestSession"; // A5's value set to 5
          row.getCell(2).value = todayroom;
          row.getCell(3).value = starthrsroom + ":" + startminroom;
          row.getCell(4).value = endhrsroom + ":" + endminroom
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  }

  export const updateworkbookDataWithRoomsDetails = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "TestRoom"
        row6.getCell(2).value = "Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "ANYONE"
        row6.getCell(12).value = "ANYONE"
        row6.getCell(14).value = "2"
        row6.getCell(16).value = "1"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }

  export const updateworkbookDataWithViertualBoothDetails = (fileName) => {
     var Excel = require('exceljs');
     var workbook = new Excel.Workbook();
     workbook.xlsx.readFile(fileName)
     .then(function(){
        var worksheet = workbook.getWorksheet(1)
        var row6 = worksheet.getRow(6)
        row6.getCell(1).value = 'Test Booth'
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
     });
  }


  export const updateWorkBookDataWithAllParamterAttendee = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "attendee@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "Attendee";
          row.getCell(3).value = "Test";
          row.getCell(4).value = "QA Designation";
          row.getCell(5).value = "QA Organisation";
          row.getCell(6).value = "91";
          row.getCell(7).value = "5665765656";
          row.getCell(8).value = "M";
          row.getCell(9).value = "Test description";
          row.getCell(10).value = "Mumbai";
          row.getCell(11).value = "Maharashtra";
          row.getCell(12).value = "India";
          row.getCell(13).value = "https://hubilo.com/";
          row.getCell(14).value = "https://facebook.com";
          row.getCell(15).value = "https://twitter.com";
          row.getCell(16).value = "https://linkedin.com";
          row.getCell(17).value = "https://instagram.com";
          row.getCell(18).value = "Leads";
          row.getCell(19).value = "Admin";
          row.getCell(20).value = "Banking";
          row.getCell(21).value = "Agriculture";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  
  }

  export const updateWorkBookDataWithAllParamterSpeakerDetails = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "Speaker@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "Speaker";
          row.getCell(3).value = "Test";
          row.getCell(4).value = "QA Designation";
          row.getCell(5).value = "QA Organisation";
          row.getCell(6).value = "91";
          row.getCell(7).value = "5665765656";
          row.getCell(8).value = "M";
          row.getCell(9).value = "Test description";
          row.getCell(10).value = "Mumbai";
          row.getCell(11).value = "Maharashtra";
          row.getCell(12).value = "India";
          row.getCell(13).value = "https://hubilo.com/";
          row.getCell(14).value = "https://facebook.com";
          row.getCell(15).value = "https://twitter.com";
          row.getCell(16).value = "https://linkedin.com";
          row.getCell(17).value = "https://instagram.com";
          row.getCell(18).value = "Leads";
          row.getCell(19).value = "Admin";
          row.getCell(20).value = "Banking";
          row.getCell(21).value = "Agriculture";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  
  }


  export const updateWorkBookDataWithBoothmemberWithAllParamter = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var boothId = parseInt(workbook.getWorksheet(2).getRow(2).getCell(2).toString());
          var row = worksheet.getRow(6);
          row.getCell(1).value = "boothmember@yopmail.com"; // A5's value set to 5
          row.getCell(2).value = "BoothMember";
          row.getCell(3).value = "Test";
          row.getCell(4).value = "QA Designation";
          row.getCell(5).value = "QA Organisation";
          row.getCell(6).value = "91";
          row.getCell(7).value = "5665765656";
          row.getCell(8).value = "M";
          row.getCell(9).value = "Test description";
          row.getCell(10).value = "Mumbai";
          row.getCell(11).value = "Maharashtra";
          row.getCell(12).value = "India";
          row.getCell(13).value = "https://hubilo.com/";
          row.getCell(14).value = "https://facebook.com";
          row.getCell(15).value = "https://twitter.com";
          row.getCell(16).value = "https://linkedin.com";
          row.getCell(17).value = "https://instagram.com";
          row.getCell(18).value = "Leads";
          row.getCell(19).value = "Admin";
          row.getCell(20).value = "Banking";
          row.getCell(21).value = "Agriculture";
          row.getCell(22).value = boothId;
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  }

  export const updateWorkBookDataAttendeeandSpeakerwithMultiple = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(  
        function() {
          var worksheet = workbook.getWorksheet(1);
          for(let i=0; i<5; i++){
          var row = worksheet.getRow(6 + (i));
          row.getCell(1).value = faker.internet.email(); // A5's value set to 5
          row.getCell(2).value = "Attendee";
          row.getCell(3).value = "Test";
          row.getCell(4).value = "QA Designation";
          row.getCell(5).value = "QA Organisation";
          row.getCell(6).value = "91";
          row.getCell(7).value = "5665765656";
          row.getCell(8).value = "M";
          row.getCell(9).value = "Test description";
          row.getCell(10).value = "Mumbai";
          row.getCell(11).value = "Maharashtra";
          row.getCell(12).value = "India";
          row.getCell(13).value = "https://hubilo.com/";
          row.getCell(14).value = "https://facebook.com";
          row.getCell(15).value = "https://twitter.com";
          row.getCell(16).value = "https://linkedin.com";
          row.getCell(17).value = "https://instagram.com";
          row.getCell(18).value = "Leads";
          row.getCell(19).value = "Admin";
          row.getCell(20).value = "Banking";
          row.getCell(21).value = "Agriculture";
          row.commit();
          }
          return workbook.xlsx.writeFile(fileName);
          
         }
        
        ) 
        
  }



  export const updateWorkBookDataWithBoothmemberWithwithMultipleData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var boothId = parseInt(workbook.getWorksheet(2).getRow(2).getCell(2).toString());
          for(let i=0; i<5; i++){
          var row = worksheet.getRow(6 + (i));
          row.getCell(1).value = "boothmember@yopmail.com" + i; // A5's value set to 5
          row.getCell(2).value = "BoothMember";
          row.getCell(3).value = "Test";
          row.getCell(4).value = "QA Designation";
          row.getCell(5).value = "QA Organisation";
          row.getCell(6).value = "91";
          row.getCell(7).value = "5665765656";
          row.getCell(8).value = "M";
          row.getCell(9).value = "Test description";
          row.getCell(10).value = "Mumbai";
          row.getCell(11).value = "Maharashtra";
          row.getCell(12).value = "India";
          row.getCell(13).value = "https://hubilo.com/";
          row.getCell(14).value = "https://facebook.com";
          row.getCell(15).value = "https://twitter.com";
          row.getCell(16).value = "https://linkedin.com";
          row.getCell(17).value = "https://instagram.com";
          row.getCell(18).value = "Leads";
          row.getCell(19).value = "Admin";
          row.getCell(20).value = "Banking";
          row.getCell(21).value = "Agriculture";
          row.getCell(22).value = boothId;
          row.commit();
           }
          return workbook.xlsx.writeFile(fileName);
      })
  }

  export const updateworkbookDataWithSessionDetailsMultipleData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          for(let i=0; i<5; i++){
          var row = worksheet.getRow(6 + (i));
          row.getCell(1).value = "TestSession" + i  // A5's value set to
          row.getCell(2).value = todayroom;
          row.getCell(3).value = starthrsroom + ":" + startminroom;
          row.getCell(4).value = endhrsroom + ":" + endminroom
          row.commit();
          }
          return workbook.xlsx.writeFile(fileName);
      })
  }


  export const updateWorkBookDataWithAttendeeInvaildMail = (fileName) =>{
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "attendee.com"; // A5's value set to 5
          row.getCell(2).value = "Attendee";
          row.getCell(3).value = "Test";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  
  }


  export const updateworkbookDataWithRoomsInvaildTimeAndPriority = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "InvaildRoom"
        row6.getCell(2).value = "Invaild Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = "Invaild"
        row6.getCell(5).value = "1"
        row6.getCell(6).value = "Invaild"
        row6.getCell(7).value = "2"
        row6.getCell(8).value = "ANYONE"
        row6.getCell(12).value = "ANYONE"
        row6.getCell(14).value = "2"
        row6.getCell(16).value = "1"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }

  export const updateworkbookDataWithRoomsInvalidData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "Invaild data TestRoom"
        row6.getCell(2).value = "Invaild all dataTest Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "Test"
        row6.getCell(12).value = "Test1"
        row6.getCell(14).value = "0"
        row6.getCell(16).value = "0"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }

  export const updateworkbookDataPrivateRoomInvaildData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "Invalid Test Private Room"
        row6.getCell(2).value = "Invalid Private Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "PRIVATE"
        row6.getCell(12).value = "Test1"
        row6.getCell(14).value = "0"
        row6.getCell(16).value = "0"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }

  export const updateworkbookDataRoomSpecificGroup = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "Invalid data specific Test Room"
        row6.getCell(2).value = "Invalid data specific Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "GROUPS"
        row6.getCell(10).value = "1234"
        row6.getCell(12).value = "Test1"
        row6.getCell(14).value = "5"
        row6.getCell(16).value = "2"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }


  export const updateworkbookDataCodedRoomInvaildCode = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "TestRoom"
        row6.getCell(2).value = "Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "GROUPS"
        row6.getCell(10).value = "1234"
        row6.getCell(12).value = "Test1"
        row6.getCell(14).value = "5"
        row6.getCell(16).value = "2"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }


  export const updateworkbookDataModerateRoomInvaildData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function () {
        var worksheet = workbook.getWorksheet(1);
        var row6 = worksheet.getRow(6);
        row6.getCell(1).value = "Invaild moderate email Test Room"
        row6.getCell(2).value = "Invaild moderate email Test Description for room"
        row6.getCell(3).value = "SINGLE"
        row6.getCell(4).value = todayroom
        row6.getCell(5).value = timeinput3
        row6.getCell(6).value = todayroom
        row6.getCell(7).value = timeinput4
        row6.getCell(8).value = "ANYONE"
        row6.getCell(12).value = "MODERATED"
        row6.getCell(13).value = "Test.com"
        row6.getCell(14).value = "5"
        row6.getCell(15).value = "12345"
        row6.getCell(16).value = "2"
        row6.commit();
        return workbook.xlsx.writeFile(fileName);
    });
  }
  
  export const updateworkbookDataWithSessionInvaildData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = "Invalid data Test Session"; // A5's value set to 5
          row.getCell(2).value = "session1";
          row.getCell(3).value = "session1" + ":" + startminroom;
          row.getCell(4).value = "session1" + ":" + endminroom
          row.getCell(5).value = "session1";
          row.getCell(6).value = "!&#$()*+,-./:;<=>?@[\]^_`{|}~";
          row.commit();
          return workbook.xlsx.writeFile(fileName);
      })
  }


  export const updateworkbookDataWithVirtualBoothInvaildData = (fileName) => {
     var Excel = require('exceljs');
     var workbook = new Excel.Workbook();
     workbook.xlsx.readFile(fileName)
     .then(function(){
        var worksheet = workbook.getWorksheet(1)
        var row = worksheet.getRow(6)
        row.getCell(1).value = 'Test Booth'
        row.getCell(2).value = "BoothMember";
        row.getCell(3).value = "Test";
        row.getCell(4).value = "QA Designation";
        row.getCell(5).value = "QA Organisation";
        row.getCell(6).value = "91";
        row.getCell(7).value = "5665765656";
        row.getCell(8).value = "M";
        row.getCell(9).value = "Test description";
        row.getCell(10).value = "Mumbai";
        row.getCell(11).value = "Maharashtra";
        row.getCell(12).value = "India";
        row.getCell(13).value = "https://hubilo.com/";
        row.getCell(14).value = "https://facebook.com";
        row.getCell(15).value = "https://twitter.com";
        row.getCell(16).value = "https://linkedin.com";
        row.getCell(17).value = "https://instagram.com";
        row.getCell(18).value = "Leads";
        row.getCell(19).value = "Admin";
        row.getCell(20).value = "Banking";
        row.getCell(21).value = "Agriculture";
        row.commit();
        return workbook.xlsx.writeFile(fileName);
     });
  }

  export const updateworkbookDataWithVirtualBoothMultipleData = (fileName) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
    .then(function(){
       var worksheet = workbook.getWorksheet(1)
       for(let i=0; i<5; i++){
       var row = worksheet.getRow(6 + (i))
       row.getCell(1).value = "Test Booth"+i;
       row.getCell(2).value = faker.internet.email();
       row.getCell(3).value = "Test";
       row.getCell(4).value = "91";
       row.getCell(5).value = "2232322323";
       row.getCell(6).value = "Small";
       row.getCell(7).value = "1";
       row.getCell(8).value = "https://twitter.com";
       row.getCell(9).value = "https://facebook.com";
       row.getCell(10).value = "https://linkedin.com";
       row.getCell(11).value = "https://hubilo.com";
       row.getCell(12).value = "https://instagram.com";
       row.getCell(13).value = "Test Desc";
       row.getCell(14).value = "test@yopmail.com";
       row.getCell(15).value = "Test Title";
       row.getCell(16).value = "Test CTA Desc";
       row.getCell(17).value = "https://instagram.com";
       row.getCell(18).value = "Test CTA Button label";
       row.getCell(19).value = "Tag1,Tag2";
       row.getCell(20).value = "Y";
       row.getCell(21).value = "";
       row.commit();
       }
       return workbook.xlsx.writeFile(fileName);
    });
 }


 export const updateworkbookDataWithRoomsMultipleData = (fileName) => {
  var Excel = require('exceljs');
  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(fileName)
  .then(function () {
      var worksheet = workbook.getWorksheet(1);
      for(let i=0; i<5; i++){
      var row6 = worksheet.getRow(6 + (i));
      row6.getCell(1).value = "TestRoom"+i;
      row6.getCell(2).value = "Test Description for room"
      row6.getCell(3).value = "SINGLE"
      row6.getCell(4).value = todayroom
      row6.getCell(5).value = timeinput3
      row6.getCell(6).value = todayroom
      row6.getCell(7).value = timeinput4
      row6.getCell(8).value = "ANYONE"
      row6.getCell(12).value = "ANYONE"
      row6.getCell(14).value = i+1;
      row6.getCell(16).value = i+1;
      row6.commit();
      }
      return workbook.xlsx.writeFile(fileName);
  });
}


export const compareExcelWithPeopleData  = async (fileName) => {
  //1 - API call get people data from people list API
  var people = new  People();
  var peopleList = await people.getPeopleList(organizerUserHeader(), process.env.eventid2);
 var Excel = require('exceljs');
 var workbook = new Excel.Workbook();
 workbook.xlsx.readFile(fileName)
 .then(function(){
   try{
  var worksheet = workbook.getWorksheet(1)
 const row = worksheet.getRow(6);
 var emailiduser = row.getCell(1);
 var  firstname = row.getCell(2);
 var  lastname = row.getCell(3);
 var peoplelistjson = getValueFromJsonObject(peopleList, `$.data[?(@.email== '${emailiduser}')]`)
 expect(peoplelistjson).to.not.be.undefined;
 expect(peoplelistjson).to.equal(firstname)
 expect(peoplelistjson).to.equal(lastname)
  console.log(emialid)
   }catch (err){
     console.log(err)
   }
})

}

 export const compareExcelWithPeopleDataMultiple  = async (fileName, count) => {
   //1 - API call get people data from people list API
  getPeopleList()
  var Excel = require('exceljs');
  var workbook = new Excel.Workbook();
   //2 - ReadFile and get email for first row.
  workbook.xlsx.readFile(fileName)
  .then(function(){
   var worksheet = workbook.getWorksheet(1)
   for(let i=0; i<count; i++){
  const row = worksheet.getRow(6 + (i));
  var cell = row.getCell(1 + (i));
  var emialid = getValueFromJsonObject(response.body, "$.data.email")
  console.log(emialid,'emailid')
  expect(row.getCell(cell).value).toEqual(emialid);
  //6 - From step to read next row in excel and repeat.
   }
  });
 }

 export const compareExcelWithRoomData  = async (fileName) => {
  const RoomGet1 =

    {
        "data": {
            "filter": {}
        }
    }

var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': environment.HLimit, 'page': environment.HPage }, 'post', RoomGet1)
 var Excel = require('exceljs');
 var workbook = new Excel.Workbook();
 workbook.xlsx.readFile(fileName)
 .then(function(){
   try{
  var worksheet = workbook.getWorksheet(1)
 const row = worksheet.getRow(6);
 var  roomname = row.getCell(1);
 var roomlistjson = getValueFromJsonObject(response.body, `$.data[?(@.name== '${roomname}')]`)
 console.log(roomlistjson)
 expect(roomlistjson).to.not.be.undefined;
   }catch (err){
     console.log(err)
   }
})
}