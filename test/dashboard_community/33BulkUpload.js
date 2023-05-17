/*
Author: Biswajit Pattanaik
Description: This script will test bulk upload for people, rooms, session and virtual booth
Timestamp: 5th Oct 2021 07:30 PM
Modified : Biswajit Pattanaik 6th Oct 2021 02:30 PM
Description: Formatting and removing spaces and the commented blocks as per code review
Modified: Biswajit Pattanaik 22nd Oct 2021 05:15 PM
Description: Test Cases added for verifying processing status for the uploaded files.
Modified : Pranjal Shah 05th Jan 2022 12:44 PM
Description: Added functions to compare data with excel for room and fixed failed cases.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
//import { consolelog, sendRequest, addDays,  } from '../../helper/CommonUtil'
import * as WorkbookUtility from '../../helper/workbookCommonUtils.js'
import { consolelog, addDays, addTime, emailaddress, emailPassword, sendRequest, uploadExcelFile, downloadAndSaveFileOnLocal,getValueFromJsonObject } from '../../helper/CommonUtil'
require('dotenv').config();


var csvHeaders
var sampleFileDownloadUrl
var fileNameToSave
var fileName
var filePath
var attendeegroup
var boothmembergroup
var speakergroup
var ticketid1
var ticketid2
var myemail = emailaddress[process.env.releaseenv + '_email']
var mypassword = emailPassword[process.env.releaseenv + '_password']
var todayDate = new Date().toISOString().slice(0, 10);
var SecondDay = addDays(new Date(), 1).toISOString().slice(0, 10);
var ThirdDay = addDays(new Date(), 2).toISOString().slice(0, 10);
var FourDay = addDays(new Date(), 3).toISOString().slice(0, 10);
var now = new Date(); //Current date
var nextWeek = addDays(now, 3).toISOString().slice(0, 10); // Add 7 days

describe('Test bulkupload feature on dashboard', () => {
  beforeEach(function (done) {
    if (this.currentTest.currentRetry()>0){
      setTimeout(function () {
        done();
      }, environment.HRetryDelay);
    }
    else{
      setTimeout(function () {
        done();
      }, environment.HTestDelay);
    }
  });

  it.only('Create login token: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": myemail,
        "password": mypassword

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    process.env.eToken = (response.body.data.token)
    expect(response.body.data.userData.email).to.equal(myemail)
    //expect(response.body.data.userData.email).to.equal('')
  });

  

  it.only('create a new event for bulk upload : POST /backend/api/v2/events', async () => {

    const event9 = {
      "data": {
        "description": "new",
        "end_time_milli": (addDays(new Date(), 3)).getTime(),
        "name": todayDate + 'bulk upload',
        "start_time_milli": new Date().getTime(),
        "timezone_id": 94,
        "instagram_url": "https://instagram.com",
        "linkedin_url": "https://linkedin.com",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com"


      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event9)
    process.env.eventid2 = (response.body.data.event_id)

  });

  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    attendeegroup = (response.body.data[0].id)
    boothmembergroup = (response.body.data[1].id)
    speakergroup = (response.body.data[2].id)
  });

  //Bulk upload attendee

  it.only('select attendee group to get sample file : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "ATTENDEE" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })

  it.only("download actual attendee file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithAttendeeDetails(fileNameToSave)
  })

  it.only('Bulkload Attendee list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": attendeegroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify attendee on dashboard: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.total_count).to.equal(2)
    expect(response.body.data[0].email).to.equal('attendee@yopmail.com')
    ticketid1 = (response.body.data[0].userId)
  });

  it.only('Verify attendee list with excel data: POST /api/v1/people/list', async () => {
    // var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': 50}, 'post')
    // var emialid = getValueFromJsonObject(response.body, "$.data[?(@.email)]")
    // console.log(emialid, 'email id')
    await WorkbookUtility.compareExcelWithPeopleData(fileNameToSave)
  });

  // BulkUpload Speakers

  it.only('select Speakers group to get sample file : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "SPEAKER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual speakers file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithSpeakerDetails(fileNameToSave)
  })

  it.only('Bulkload speakers list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": speakergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(2)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify speakers on dashboard: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(3)
    expect(response.body.data[0].email).to.equal('speaker@yopmail.com')
    ticketid1 = (response.body.data[0].userId)
  });

  //Bulkupload session

  it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
  });

  it.only('Getting session bulkupload sample file : POST /api/v1/session/export/sample', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/session/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/session/"))
    csvHeaders = response.body.data.headers
  })

  it.only("download session sample file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithSessionDetails(fileNameToSave)
  })

  it.only('Bulkload sessions list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'session', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  it.only('Bulkload Attendee, upload Attendees : POST /api/v1/session/bulkupload', async () => {
    const data1 = { "data": { "file": filePath } }
    var response = await sendRequest(environment.baseURL, '/api/v1/session/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("Session Visibility")
    expect(response.body.data[0].file_name).to.equal(filePath)
    expect(response.body.data[0].real_file_name).to.equal(fileName)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify session added to the event GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.session).to.equal(1)
  });

  //Bulkupload Rooms

  it.only('Getting rooms bulkupload sample file : GET /api/v1/rooms/export/sample', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
    csvHeaders = response.body.data.headers

  })

  it.only("download rooms sample file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithRoomsDetails(fileNameToSave)
  })

  it.only('Bulkupload rooms list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  it.only('Bulkupload rooms upload Attendees : POST /api/v1/rooms/bulkupload', async () => {
    const data1 = { "data": { "file": filePath } }
    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(4)
    expect(response.body.data[0].name).to.equal("Rooms")
    expect(response.body.data[0].file_name).to.equal(filePath)
    expect(response.body.data[0].real_file_name).to.equal(fileName)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify room added to the event GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.room).to.equal(1)
  });

   //Get Rooms on Dashboard
   it.only('Verify room list with excel data: POST /api/v1/rooms/list', async () => {
    
    await WorkbookUtility.compareExcelWithRoomData(fileNameToSave)
  });
  

  //Bulkupload virtual booth

  it.only('Getting virtual booth bulkupload sample file : GET /backend/api/v2/events/booth/sample', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public/sample"))
    csvHeaders = response.body.data.headers
  })

  it.only("download virtual booth sample file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithViertualBoothDetails(fileNameToSave)
  })

  it.only('Bulkupload virtual booth list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'exhibitor', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkupload virtual booth upload  : POST /backend/api/v2/events/booth/bulkupload', async () => {

    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave.split('/').slice(-1)[0] } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(5)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/exhibitor/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave.split('/').slice(-1)[0])
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify booth added to the event GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.booth).to.equal(1)
  });

  //Bulk upload boothmember

  it.only('select boothmember group to get sample file : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "BOOTHMEMBER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual boothmember file and save to a location", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithBoothmemberDetails(fileNameToSave)
  })

  it.only('Bulkload boothmember list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload boothmember upload Attendees : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": boothmembergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(6)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify boothmember on dashboard: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(4)
    expect(response.body.data[0].email).to.equal('boothmember@yopmail.com')
    ticketid1 = (response.body.data[0].userId)
  });


  //File Logs Search

  it.only('Verify file log config : GET  /backend/api/v2/logs/files/config', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/logs/files/config', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.statusList.map(status => status.name)).to.be.an('array').that.includes('PROCESSING').and.that.includes('PROCESSED')
    expect(response.body.data.sections.map(section => section.name)).to.be.an('array').that.includes('People').and.that.includes('Virtual Booth').and.that.includes('Session Visibility')
  });

  it.only('Search file by event section name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'People' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[2].name).to.equal("People")
  });


  it.only('Search file by event section name with upper case in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'PEOPLE' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[2].name).to.equal("People")
  });

  it.only('Search file by event section with wrong in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrongname' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Search file by event section name with lower case in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'people' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[2].name).to.equal("People")
  });


  it.only('Search file by event section name with partial name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'peop' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[2].name).to.equal("People")
  });

  //File Logs Search with file name

  it.only('Search file by file name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Virtual_Booth_Sample_Import' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });


  it.only('Search file by file name with upper case in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'VIRTUAL_BOOTH_SAMPLE_IMPORT' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });

  it.only('Search file by wrong file name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrongname' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Search file by lower case file name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'virtual_booth_sample_import' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });


  it.only('Search file by partial file name in file logs: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'VIRTUAL_BOOTH' }, 'post', filelog_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });

  it.only('Filter file logs by status as processed: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter =
    {
      "data": {
        "filter": {
          "search_start_milli": "",
          "search_end_milli": "",
          "status": "PROCESSED",
          "section": ""
        }
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(6)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[5].status).to.equal("PROCESSED")
  });

  it.only('Filter file logs by status as processed and event section: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter =
    {
      "data": {
        "filter": {
          "search_start_milli": "",
          "search_end_milli": "",
          "status": "PROCESSED",
          "section": [
            20
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal("Session Visibility")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });


  it.only('Filter file logs by status as processed and event section: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter =
    {
      "data": {
        "filter": {
          "search_start_milli": "",
          "search_end_milli": "",
          "status": "PROCESSED",
          "section": [
            10,
            3
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(4)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
  });

  it.only('Filter file logs by event sections as people: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter =
    {
      "data": {
        "filter": {
          "search_start_milli": "",
          "search_end_milli": "",
          "status": "",
          "section": [
            3
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(3)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].status).to.equal("PROCESSED")
    expect(response.body.data[2].name).to.equal("People")
  });

  
  //Bulk upload attendee to check with all fields

  it.only('select attendee group to get sample file to check with all fields : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "ATTENDEE" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })

  it.only("download actual attendee file and save to a location to check with all fields", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithAllParamterAttendee(fileNameToSave)
  })

  it.only('Bulkload Attendee list UploadExcelFile to check with all fields : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees to check with all fields : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": attendeegroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file to check with all fields : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(7)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify attendee on dashboard to check with all fields: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.total_count).to.equal(4)
    // expect(response.body.data[0].email).to.equal('attendee@yopmail.com')
    // ticketid1 = (response.body.data[0].userId)
  });

//Bulk upload speaker all fields
  it.only('select Speakers group to get sample file to check with all fields : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "SPEAKER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual speakers file and save to a location to check with all fields", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithAllParamterSpeakerDetails(fileNameToSave)
  })

  it.only('Bulkload speakers list UploadExcelFile to check with all fields : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees to check with all fields : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": speakergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file to check with all fields : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(8)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify speakers on dashboard to check with all fields: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(4)
    // expect(response.body.data[0].email).to.equal('speaker@yopmail.com')
    // ticketid1 = (response.body.data[0].userId)
  });

  //Bulk upload boothmember all fields

  it.only('select boothmember group to get sample file to check with all fields : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "BOOTHMEMBER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual boothmember file and save to a location to check with all fields", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithBoothmemberWithAllParamter(fileNameToSave)
  })

  it.only('Bulkload boothmember list UploadExcelFile to check with all fields : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload boothmember upload Attendees to check with all fields : POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": boothmembergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file to check with all fields : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(9)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify boothmember on dashboard to check with all fields: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(4)
    expect(response.body.data[0].email).to.equal('boothmember@yopmail.com')
    ticketid1 = (response.body.data[0].userId)
  });
   
  //bulk upload with multiple data for attendee

  it.only('select attendee group to get sample file for multiple data upload : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "ATTENDEE" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })

  it.only("download actual attendee file and save to a location for multiple data upload", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataAttendeeandSpeakerwithMultiple(fileNameToSave)
  })

  it.only('Bulkload Attendee list UploadExcelFile for multiple data upload : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees for multiple data upload: POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": attendeegroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file for multiple data upload: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(10)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify attendee on dashboard for multiple data upload: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.total_count).to.equal(9)
    // expect(response.body.data[0].email).to.equal('attendee@yopmail.com')
    // ticketid1 = (response.body.data[0].userId)
  });


  //bulk upload with multiple data for speaker

  it.only('select Speakers group to get sample file for multiple data upload : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "SPEAKER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual speakers file and save to a location for multiple data upload", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataAttendeeandSpeakerwithMultiple(fileNameToSave)
  })

  it.only('Bulkload speakers list UploadExcelFile for multiple data upload : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees for multiple data upload: POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": speakergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file for multiple data upload for speaker: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(11)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify speakers on dashboard for multiple data upload: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(5)
    // expect(response.body.data[0].email).to.equal('speaker@yopmail.com')
  });


  //Bulk upload boothmember all fields with multiple data

  it.only('select boothmember group to get sample file for multiple data upload : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "BOOTHMEMBER" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })
  it.only("download actual boothmember file and save to a location for multiple data upload", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithBoothmemberWithwithMultipleData(fileNameToSave)
  })

  it.only('Bulkload boothmember list UploadExcelFile for multiple data upload: POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload boothmember upload Attendees for multiple data upload: POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": boothmembergroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file for multiple data upload boothmember: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(12)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify boothmember on dashboard for multiple data upload: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data.length).to.equal(5)
    // expect(response.body.data[0].email).to.equal('boothmember@yopmail.com')
    // ticketid1 = (response.body.data[0].userId)
  });

  //Bulkupload session with multiple session data

 //Bulkupload session

 it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

  const session10 = {
    "data": {
      "end_date": nextWeek,
      "start_date": todayDate
    }
  }

  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', session10);
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
});

it.only('Getting session bulkupload sample file to check with multiple session : POST /api/v1/session/export/sample', async () => {
  var response = await sendRequest(environment.baseURL, '/api/v1/session/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post')
  var fullDownloadFileURL = response.body.data.file_path
  sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/session/"))
  csvHeaders = response.body.data.headers
})

it.only("download session sample file and save to a location to check with multiple session", async () => {
  fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
  WorkbookUtility.updateworkbookDataWithSessionDetailsMultipleData(fileNameToSave)
})

it.only('Bulkload sessions list UploadExcelFile to check with multiple session : POST /backend/api/v2/events/exceluploads', async () => {
  var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'session', fileNameToSave)
  fileName = response.body.data.file_name
  filePath = response.body.data.path
});

it.only('Bulkload Attendee, upload Attendees to check with multiple session : POST /api/v1/session/bulkupload', async () => {
  const data1 = { "data": { "file": filePath } }
  var response = await sendRequest(environment.baseURL, '/api/v1/session/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
  expect(response.body.message).to.equal(Responsemessages.Parameter_session_bulkupload_message)
});

it.only('Verify file log as processed for uploaded file to check with multiple session : POST  /backend/api/v2/events/logs/files', async () => {

  const filelog_filter = {"data":{"filter":{}}}
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
  // expect(response.body.total_count).to.equal(3)
  // expect(response.body.data[0].name).to.equal("Session Visibility")
  // expect(response.body.data[0].file_name).to.equal(filePath)
  // expect(response.body.data[0].real_file_name).to.equal(fileName)
  expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
});

it.only('verify session added to the event to check with multiple session GET /api/v1/event/overview/analytics/numbers', async () => {
  var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
  // expect(response.body.data.total.session).to.equal(6)
});


   //Bulk upload attendee with existing email id

   it.only('select attendee group to get sample file to check bulk upload with existing email id : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "ATTENDEE" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })

  it.only("download actual attendee file and save to a location to check bulk upladd with existing email id", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithAttendeeDetails(fileNameToSave)
  })

  it.only('Bulkload Attendee list UploadExcelFile to check bulk uploadd with existing email id: POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees to check bulk upload with existing email id: POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": attendeegroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file upload with existing email id : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(14)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });


  //Bulk upload attendee invalid mail

  it.only('select attendee group to get sample file to check bulk upload with invalid email id : POST /backend/api/v2/people/sample', async () => {
    const payload = { "data": { "group_type": "ATTENDEE" } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', payload)
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
    csvHeaders = response.body.data.headers
  })

  it.only("download actual attendee file and save to a location to check bulk upload with invalid email id", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateWorkBookDataWithAttendeeInvaildMail(fileNameToSave)
  })

  it.only('Bulkload Attendee list UploadExcelFile to check bulk upload with invalid email id: POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'people', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkload Attendee, upload Attendees to check bulk upload with invalid email id: POST /backend/api/v2/people/bulkupload', async () => {
    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave, "group_id": attendeegroup } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_attendees_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(15)
    expect(response.body.data[0].name).to.equal("People")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/people/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('Verify attendee invalid mail id not present in people list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': 50 }, 'post')
     expect(getValueFromJsonObject(response.body, "$.data[?(@.email=='attendee.com')]")).to.not.equal("attendee.com")
  });


  //Bulkupload Rooms invalid time

  it.only('Getting rooms bulkupload sample file to check with invalid time : GET /api/v1/rooms/export/sample', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
    csvHeaders = response.body.data.headers

  })

  it.only("download rooms sample file and save to a location to check with invalid time", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithRoomsInvaildTimeAndPriority(fileNameToSave)
  })

  it.only('Bulkupload rooms list UploadExcelFile to check with invalid time : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  it.only('Bulkupload rooms upload Attendees to check with invalid time : POST /api/v1/rooms/bulkupload', async () => {
    const data1 = { "data": { "file": filePath } }
    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_invaild_data_message)
  });

  it.only('Verify file log as processed for uploaded file to check with invalid time : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(16)
    expect(response.body.data[0].name).to.equal("Rooms")
    expect(response.body.data[0].file_name).to.equal(filePath)
    expect(response.body.data[0].real_file_name).to.equal(fileName)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify room added to the event to check with invalid time GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.room).to.equal(1)
  });

   //Get Rooms on Dashboard

   it.only('This will get the rooms on dashboard: POST /api/v1/rooms/list', async () => {
    const RoomGet1 =

    {
        "data": {
            "filter": {}
        }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': environment.HLimit, 'page': environment.HPage }, 'post', RoomGet1)
    expect(getValueFromJsonObject(response.body, "$.data[?(@.name)]")).to.not.equal("InvaildRoom")
    expect(getValueFromJsonObject(response.body, "$.data[?(@.description)]")).to.not.equal("Invaild Test Description for room")
});


   //Bulkupload Rooms invalid date like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.)

   it.only('Getting rooms bulkupload sample file to check with invalid date like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.) : GET /api/v1/rooms/export/sample', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
    csvHeaders = response.body.data.headers

  })

  it.only("download rooms sample file and save to a location to check with invalid like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.)", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithRoomsInvalidData(fileNameToSave)
  })

  it.only('Bulkupload rooms list UploadExcelFile to check with invalid like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.) : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  it.only('Bulkupload rooms upload Attendees to check with invalid like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.) : POST /api/v1/rooms/bulkupload', async () => {
    const data1 = { "data": { "file": filePath } }
    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_invaild_data_message)
  });

  it.only('Verify file log as processed for uploaded file to check with invalid like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.) : POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(17)
    expect(response.body.data[0].name).to.equal("Rooms")
    expect(response.body.data[0].file_name).to.equal(filePath)
    expect(response.body.data[0].real_file_name).to.equal(fileName)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify room added to the event to check with invalid like Priority, Who can join the Room ,Share Audio/Video in the room (Req.),Maximum Video (Req.) GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.room).to.equal(1)
  });


  //Get Rooms on Dashboard

  it.only('Verify rooms on dashboard to check with invaild data: POST /api/v1/rooms/list', async () => {
    const RoomGet1 =

    {
        "data": {
            "filter": {}
        }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': environment.HLimit, 'page': environment.HPage }, 'post', RoomGet1)
    expect(getValueFromJsonObject(response.body, "$.data[?(@.name!=='Invaild data TestRoom')]")).to.not.equal('Invaild data TestRoom')
    expect(getValueFromJsonObject(response.body, "$.data[?(@.description!=='Invaild all dataTest Description for room')]")).to.not.equal('Invaild all dataTest Description for room')
});


  


    //Bulkupload Private Rooms invalid date to check with invalid data Choose The People Who Can Participate In This Private Room

    it.only('Getting rooms bulkupload sample file to check with invalid data Choose The People Who Can Participate In This Private Room : GET /api/v1/rooms/export/sample', async () => {

      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
      var fullDownloadFileURL = response.body.data.file_path
      sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
      csvHeaders = response.body.data.headers
  
    })
  
    it.only("download rooms sample file and save to a location to check with invalid data Choose The People Who Can Participate In This Private Room", async () => {
      fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
      WorkbookUtility.updateworkbookDataPrivateRoomInvaildData(fileNameToSave)
    })
  
    it.only('Bulkupload rooms list UploadExcelFile to check with invalid data Choose The People Who Can Participate In This Private Room : POST /backend/api/v2/events/exceluploads', async () => {
      var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
      fileName = response.body.data.file_name
      filePath = response.body.data.path
    });
  
    it.only('Bulkupload rooms upload Attendees to check with invalid data Choose The People Who Can Participate In This Private Room : POST /api/v1/rooms/bulkupload', async () => {
      const data1 = { "data": { "file": filePath } }
      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
      expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_invaild_data_message)
    });
  
    it.only('Verify file log as processed for uploaded file to check with invalid data Choose The People Who Can Participate In This Private Room : POST  /backend/api/v2/events/logs/files', async () => {
  
      const filelog_filter = {"data":{"filter":{}}}
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
      expect(response.body.total_count).to.equal(18)
      expect(response.body.data[0].name).to.equal("Rooms")
      expect(response.body.data[0].file_name).to.equal(filePath)
      expect(response.body.data[0].real_file_name).to.equal(fileName)
      expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
    });

    //Get Rooms on Dashboard

  it.only('Verify rooms on dashboard to check with invaild data private room: POST /api/v1/rooms/list', async () => {
    const RoomGet1 =

    {
        "data": {
            "filter": {}
        }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': environment.HLimit, 'page': environment.HPage }, 'post', RoomGet1)
    expect(getValueFromJsonObject(response.body, "$.data[?(@.name!=='Invalid Test Private Room')]")).to.not.equal('Invalid Test Private Room')
    expect(getValueFromJsonObject(response.body, "$.data[?(@.description!=='Invalid Private Test Description for room')]")).to.not.equal('Invalid Private Test Description for room')
});

    //Bulkupload Specific Rooms invalid date group

    it.only('Getting rooms bulkupload sample file to check with invalid data in specific group name: GET /api/v1/rooms/export/sample', async () => {

      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
      var fullDownloadFileURL = response.body.data.file_path
      sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
      csvHeaders = response.body.data.headers
  
    })
  
    it.only("download rooms sample file and save to a location to check with invalid data in specific group name", async () => {
      fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
      WorkbookUtility.updateworkbookDataRoomSpecificGroup(fileNameToSave)
    })
  
    it.only('Bulkupload rooms list UploadExcelFile to check with invalid data in specific group name: POST /backend/api/v2/events/exceluploads', async () => {
      var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
      fileName = response.body.data.file_name
      filePath = response.body.data.path
    });
  
    it.only('Bulkupload rooms upload Attendees to check with invalid data in specific group name : POST /api/v1/rooms/bulkupload', async () => {
      const data1 = { "data": { "file": filePath } }
      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
      expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_invaild_data_message)
    });
  
    it.only('Verify file log as processed for uploaded file to check with invalid data in specific group name : POST  /backend/api/v2/events/logs/files', async () => {
  
      const filelog_filter = {"data":{"filter":{}}}
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
      expect(response.body.total_count).to.equal(19)
      expect(response.body.data[0].name).to.equal("Rooms")
      expect(response.body.data[0].file_name).to.equal(filePath)
      expect(response.body.data[0].real_file_name).to.equal(fileName)
      expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
    });


     //Bulkupload invalid date moderate email id

     it.only('Getting rooms bulkupload sample file to check with invalid date moderate email id: GET /api/v1/rooms/export/sample', async () => {

      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
      var fullDownloadFileURL = response.body.data.file_path
      sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
      csvHeaders = response.body.data.headers
  
    })
  
    it.only("download rooms sample file and save to a location to check with invalid data moderate email id", async () => {
      fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
      WorkbookUtility.updateworkbookDataModerateRoomInvaildData(fileNameToSave)
    })
  
    it.only('Bulkupload rooms list UploadExcelFile to check with invalid data moderate email id: POST /backend/api/v2/events/exceluploads', async () => {
      var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
      fileName = response.body.data.file_name
      filePath = response.body.data.path
    });
  
    it.only('Bulkupload rooms upload Attendees to check with invalid data in moderate email id: POST /api/v1/rooms/bulkupload', async () => {
      const data1 = { "data": { "file": filePath } }
      var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
      expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_invaild_data_message)
    });
  
    it.only('Verify file log as processed for uploaded file to check with invalid data moderate email id : POST  /backend/api/v2/events/logs/files', async () => {
  
      const filelog_filter = {"data":{"filter":{}}}
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
      expect(response.body.total_count).to.equal(20)
      expect(response.body.data[0].name).to.equal("Rooms")
      expect(response.body.data[0].file_name).to.equal(filePath)
      expect(response.body.data[0].real_file_name).to.equal(fileName)
      expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
    });


     //Bulkupload session with invalid data

  it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
  });

  it.only('Getting session bulkupload sample file for invalid data upload: POST /api/v1/session/export/sample', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/session/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/session/"))
    csvHeaders = response.body.data.headers
  })

  it.only("download session sample file and save to a location for invalid data upload", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithSessionInvaildData(fileNameToSave)
  })

  it.only('Bulkload sessions list UploadExcelFile with invalid data upload : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'session', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  // it.only('Bulkload Attendee, upload Attendees : POST /api/v1/session/bulkupload', async () => {
  //   const data1 = { "data": { "file": filePath } }
  //   var response = await sendRequest(environment.baseURL, '/api/v1/session/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
  //   expect(response.body.message).to.equal(Responsemessages.Parameter_session_bulkupload_message)
  // });

  it.only('Verify file log as processed for uploaded file for invalid data upload: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(20)
    // expect(response.body.data[0].name).to.equal("Session Visibility")
    // expect(response.body.data[0].file_name).to.equal(filePath)
    // expect(response.body.data[0].real_file_name).to.equal(fileName)
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify session added to the event after importing invalid data GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.session).to.equal(5)
  });

  // it.only('Verify session after invalid data upload in dashboard list : GET /backend/api/v2/events/agendas', async () => {
  //   var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'get')
  //   expect(getValueFromJsonObject(response.body, "$.data.agendaList[?(@.name)]")).to.equal("Invalid data Test Session")
  // });


  //Bulkupload virtual booth with invalid data

  it.only('Getting virtual booth bulkupload sample file for checking with invalid data : GET /backend/api/v2/events/booth/sample', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public/sample"))
    csvHeaders = response.body.data.headers
  })

  it.only("download virtual booth sample file and save to a location for checking with invalid data", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithVirtualBoothInvaildData(fileNameToSave)
  })

  it.only('Bulkupload virtual booth list UploadExcelFile for checking with invalid data : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'exhibitor', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkupload virtual booth upload for checking with invalid data: POST /backend/api/v2/events/booth/bulkupload', async () => {

    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave.split('/').slice(-1)[0] } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_bulk_upload_error_message)
  });

  it.only('Verify file log as processed for uploaded file for checking with invalid data: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(21)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/exhibitor/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave.split('/').slice(-1)[0])
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify booth added to the event GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.booth).to.equal(1)
  });


   //Bulkupload virtual booth check with multiple data

   it.only('Getting virtual booth bulkupload sample file for check with multiple data : GET /backend/api/v2/events/booth/sample', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public/sample"))
    csvHeaders = response.body.data.headers
  })

  it.only("download virtual booth sample file and save to a location for check with multiple data", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithVirtualBoothMultipleData(fileNameToSave)
  })

  it.only('Bulkupload virtual booth list UploadExcelFile for check with multiple data: POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'exhibitor', fileNameToSave)
    fileName = response.body.data.file_name
  });

  it.only('Bulkupload virtual booth upload for check with multiple data: POST /backend/api/v2/events/booth/bulkupload', async () => {

    const data1 = { "data": { "file_name": fileName, "real_file_name": fileNameToSave.split('/').slice(-1)[0] } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_bulkupload_message)
  });

  it.only('Verify file log as processed for uploaded file for check with multiple data: POST  /backend/api/v2/events/logs/files', async () => {

    const filelog_filter = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
    expect(response.body.total_count).to.equal(22)
    expect(response.body.data[0].name).to.equal("Virtual Booth")
    expect(response.body.data[0].file_name).to.equal(environment.baseURL4 + '/exhibitor/' + environment.HOrganiserId + '/csv_files/' + fileName)
    expect(response.body.data[0].real_file_name).to.equal(fileNameToSave.split('/').slice(-1)[0])
    expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  });

  it.only('verify booth added to the event after upload with multiple data GET /api/v1/event/overview/analytics/numbers', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.booth).to.equal(6)
  });


  //Bulkupload Rooms to check with multiple data

  it.only('Getting rooms bulkupload sample file to check with multiple data : GET /api/v1/rooms/export/sample', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/rooms/export/sample', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get')
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/rooms/"))
    csvHeaders = response.body.data.headers

  })

  it.only("download rooms sample file and save to a location to check with multiple data", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL4, sampleFileDownloadUrl, './sheets')
    WorkbookUtility.updateworkbookDataWithRoomsMultipleData(fileNameToSave)
  })

  it.only('Bulkupload rooms list UploadExcelFile to check with multiple data : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'rooms', fileNameToSave)
    fileName = response.body.data.file_name
    filePath = response.body.data.path
  });

  // it.only('Bulkupload rooms upload Attendees to check with multiple data : POST /api/v1/rooms/bulkupload', async () => {
  //   const data1 = { "data": { "file": filePath } }
  //   var response = await sendRequest(environment.baseURL, '/api/v1/rooms/bulkupload', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', data1)
  //   expect(response.body.message).to.equal(Responsemessages.Parameter_room_bulkupload_message)
  // });

  // it.only('Verify file log for rooms as processed for uploaded file to check with multiple data : POST  /backend/api/v2/events/logs/files', async () => {

  //   const filelog_filter = {"data":{"filter":{}}}
  //   var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/logs/files', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', filelog_filter)
  //   expect(response.body.total_count).to.equal(29)
  //   expect(response.body.data[0].name).to.equal("Rooms")
  //   expect(response.body.data[0].file_name).to.equal(filePath)
  //   expect(response.body.data[0].real_file_name).to.equal(fileName)
  //   expect(response.body.data[0].status).to.equal("PROCESSED","File is still in processing status")
  // });

  // it.only('verify room added to the event to check with multiple data GET /api/v1/event/overview/analytics/numbers', async () => {
  //   var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
  //   expect(response.body.data.total.room).to.equal(1)
  // });
  
  it.only('Delete bulk upload event : POST /backend/api/v2/events/delete', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'eventid': process.env.eventid2 }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
  });

})