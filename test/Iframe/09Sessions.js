/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/delete/join/leave session. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 04th Jan 2022 17:37 PM
Description : JWT token changed for zoom meeting in admin dashboard
Modified: Biswajit 12th Jan 2022 09:00 AM
Description: Modification made for session join using different users
Modified: Pranjal Shah 24th Jan 2022 04:56 PM
Description : SWAT cases added for december.
Modified: Pranjal Shah 247h Jan 2022 04:56 PM
Description : Failure fixed in session file.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest, People, ComunitySignupLogin, Session, organizerUserHeader, getValueFromJsonObject, downloadAndSaveFileOnLocal, uploadExcelFile } from '../../helper/CommonUtil';
import * as WorkbookUtility from '../../helper/workbookCommonUtils.js'
import * as ApiEndPoints from '../../helper/ApiEndPoints';
require('dotenv').config();

var ticketid1
var ticketid2
var sessionid1
var sessionid2
var sessionid3
var attendeeadd
var agendacommid1
var agendacommid2
var noteid
var feedidsessionlive
var questionid
var questionid1
var sessionidstring
var trackid
var trackid2
var session_banner
var sessionid_viemo, sessionid_viemo2, sessionid_viemo3
var sessionid_zoom
var sessionid_zoom_webinar
var sessionid_external_encoder
var sessionid_pre_recorded, sessionid_pre_recorded2, sessionid_pre_recorded3
var pre_recorded_mux_playbackid
var pre_recorded_live_link
var sessionid_hbs
var hbs_session_rtmp_url
var hbs_session_stream_key
var hbs_session_stream_link
var hbs_session_studio_link
var studio_host_id
var accesstoken_host
var broadcast_studio_id
var asset_url
var upload_url
var file_name
var asset_id
var hostid_zoomwebinar
var external_user_id
var file_name_overlay
var background_asset_id
var banner_asset_id
var file_name_background_image
var sessionid_other_stream
var sessionid_engagement_options_stream
var created_group_id
var registration_start_time_milli
var registration_end_time_milli
var peopleList = []
var csvHeaders
var sampleFileDownloadUrl
var fileNameToSave
var fileName
var filePath
var sessionid_youtube, sessionid_youtube2, sessionid_youtube3
var pre_recorded_mux_playbackid_common, pre_recorded_session_id_common
var team_member_userid
var sessionid_nextday
var tem_member_email_attendee_id
var sessionid_speaker_session

const virtual10 = {
  "data": {
    "booth_size": "SMALL",
    "category": "category",
    "description": "",
    "email": "",
    "fb_url": "",
    "instagram_url": "",
    "is_featured": false,
    "is_rating": false,
    "linked_url": "",
    "list_banner_image": [
      {
        "img_file_name": ""
      }
    ],
    "location": "",
    "multiple_file": [],
    "name": "test",
    "phone": "",
    "phone_code": "",
    "position": 1,
    "profile_img": "",
    "spotlight_banner": [
      {
        "img_file_name": ""
      }
    ],
    "spotlight_banner_type": "IMAGE",
    "tags": "",
    "twitter_url": "",
    "website_url": "",
    "whatsapp_no": ""
  }
}

var fs = require('fs');

var imageAsBase64_Session_Banner_image = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');


var qs = require('qs');
const request3 = supertest(environment.baseURL3);

//Add a agenda with mandatory paramters only
describe('Create sessions as per days, attend and interact', () => {
  beforeEach(function (done) {
    if (this.currentTest.currentRetry() > 0) {
      setTimeout(function () {
        done();
      }, environment.HRetryDelay);
    }
    else {
      setTimeout(function () {
        done();
      }, environment.HTestDelay);
    }
  });

  var todayDate = new Date().toISOString().slice(0, 10);
  //console.log(todayDate);

  var SecondDay = addDays(new Date(), 1).toISOString().slice(0, 10);

  var ThirdDay = addDays(new Date(), 2).toISOString().slice(0, 10);

  var FourDay = addDays(new Date(), 3).toISOString().slice(0, 10);

  function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  var now = new Date(); //Current date

  var nextWeek = addDays(now, 3).toISOString().slice(0, 10); // Add 7 days
  //console.log(nextWeek)

  function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
  }
  

  //<----------------------Add Track---------------------------->
  it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
    expect(response.body.data.agenda_days).to.have.ordered.members([todayDate, SecondDay, ThirdDay, FourDay])
  });

  it.only('Delete 4th adenda day : POST /backend/api/v2/events/agendadays/delete', async () => {
    const session10 = {"data":{"agenda_date":FourDay,"is_delete_all_days":0}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_agendadays_delete_message);
  });

  it.only('Verify agenda days in the event post delete : GET /backend/api/v2/events/agendas', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.agendaDays).to.have.ordered.members([todayDate, SecondDay, ThirdDay])
  });

  it.only('Update agenda days : POST /backend/api/v2/events/agendadays', async () => {
    const session10 = {
      "data": {
        "start_date": FourDay,
        "old_date": ThirdDay,
        "is_update": 1
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
    expect(response.body.data.agenda_days).to.have.ordered.members([todayDate, SecondDay, FourDay])
  });

  it.only('Verify agenda days in the event post update : GET /backend/api/v2/events/agendas', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.agendaDays).to.have.ordered.members([todayDate, SecondDay, FourDay])
  });

  

  //Add Tracks
  it.only('Add Tracks in Session :- POST backend/api/v2/events/session/tracks/add', async () => {
    const addtracks = {
      "data":
      {
        "name": "TRACK7",
        "color_code": "#e0e0e0"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addtracks)
    trackid = (response.body.data.id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Add)
    expect(response.body.data.name).to.equal('TRACK7')
  });

  it.only('Add another track in Session :- POST backend/api/v2/events/session/tracks/add', async () => {
    const addtracks = {
      "data":
      {
        "name": "TRACK8",
        "color_code": "#e0e0e0"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addtracks)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Add)
    expect(response.body.data.name).to.equal('TRACK8')
    trackid2 = (response.body.data.id)
  });

  it.only('Verify tracks list :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.id)).to.have.ordered.members([trackid,trackid2])
    expect(response.body.data.map(map => map.name)).to.have.ordered.members(['TRACK7','TRACK8'])
    expect(response.body.data[0].sessionCount).to.equal(0)
    expect(response.body.data[1].sessionCount).to.equal(0)
  });

  it.only('Update a track in Session :- POST /backend/api/v2/events/session/tracks/update', async () => {
    const updateTracks = {
      "data":
      {
        "name": "TRACK9",
        "color_code": "#e0e0e0"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/update', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'trackid' : trackid2 }, 'put', updateTracks)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Update)
    expect(response.body.data.name).to.equal('TRACK9')
    expect(response.body.data.id).to.equal(trackid2.toString())
  });

  it.only('Verify tracks list post update :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.id)).to.have.ordered.members([trackid,trackid2])
    expect(response.body.data.map(map => map.name)).to.have.ordered.members(['TRACK7','TRACK9'])
  });

  it.only('Rearrange tracks in Session :- POST /backend/api/v2/events/session/tracks/rearrange', async () => {
    const updateTracks = {"data":{"tracks":[trackid2,trackid]}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/rearrange', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'put', updateTracks)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Rearrange)
  });

  it.only('Verify tracks list post re arrange :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.id)).to.have.ordered.members([trackid2,trackid])
    expect(response.body.data.map(map => map.name)).to.have.ordered.members(['TRACK9','TRACK7'])
  });

  it.only('Delete a track in Session :- POST /backend/api/v2/events/session/tracks/delete', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'trackid' : trackid2 }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Delete)
  });

  it.only('Verify tracks list post delete :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.length).to.equal(1)
    expect(response.body.data[0].id).to.equal(trackid)
    expect(response.body.data[0].name).to.equal('TRACK7')
  });



  it.only('Upload Session banner image: POST /backend/api/v2/events/uploads',  (done) => {
        
    request1
    .post('/backend/api/v2/events/uploads')
    .set('organiserId', environment.HOrganiserId)
    .set('eventId', process.env.eventid)
    .set('Authorization', 'Bearer ' + process.env.eToken)
    .field('Content-Type', 'multipart/form-data')
    .field('location', 'sessionbanner')
    .field('type', 'base')
    .field('data', 'data:image/png;base64,' + imageAsBase64_Session_Banner_image)
    .end((err, response) => {
        session_banner = (response.body.data.file_name)
        expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
        done();
  });
   
  });

  // it.only('Add agenda days : POST /backend/api/v2/events/agendadays', (done) => {

  //   const session10 = {
  //     "data": {
  //       "end_date": nextWeek,
  //       "start_date": todayDate
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendadays')
  //     .set('organiserId', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(session10)
  //     .end((err, response) => {
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
  //       done();
  //     });
  // });

  //200: POSITIVE session with mandatory parameters : POST /backend/api/v2/events/agendas

  it.only('Session creation with mandatory parameters : POST /backend/api/v2/events/agendas', async () => {

    const session11 =
    {
      "data": {
        // "agenda_track_id": "",
        "agenda_track_id": trackid,
        "banner": "",
        "description": "",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "start_time_milli": new Date().getTime(),
        "title": "tiger session 1"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendas',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session11);
    sessionid1 = (response.body.data.ids.agenda_id);
  });

  // it.only('Session creation with mandatory parameters : POST /backend/api/v2/events/agendas', (done) => {

  //   const session11 =
  //   {
  //     "data": {
  //       // "agenda_track_id": "",
  //       "agenda_track_id": trackid,
  //       "banner": "",
  //       "description": "",
  //       "end_time_milli": (addTime(new Date(), 1)).getTime(),
  //       "start_time_milli": new Date().getTime(),
  //       "title": "tiger session 1"
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendas')
  //     .set('organiserId', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(session11)
  //     .end((err, response) => {
  //       expect(response.status).to.equal(200)
  //       sessionid1 = (response.body.data.ids.agenda_id)
  //       // console.log(sessionid1)
  //       //expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_successfully_message);
  //       done();
  //     });
  // });


  it.only('Session creation with all parameters : POST /backend/api/v2/events/agendas', async () => {

    const session12 =
    {
      "data": {
        "agenda_track_id": trackid,
        "description": "<ul>\n<li><span style=\"font-size: 10pt;\"><em><strong><span style=\"text-decoration: underline;\">new description</span></strong></em></span></li>\n</ul>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "start_time_milli": new Date().getTime(),
        "title": "lion session"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendas',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session12);
    sessionid2 = (response.body.data.ids.agenda_id)
    sessionidstring = JSON.stringify(response.body.data.ids.agenda_id)
  });

  // it.only('Session creation with all parameters : POST /backend/api/v2/events/agendas', (done) => {

  //   const session12 =
  //   {
  //     "data": {
  //       "agenda_track_id": trackid,
  //       "description": "<ul>\n<li><span style=\"font-size: 10pt;\"><em><strong><span style=\"text-decoration: underline;\">new description</span></strong></em></span></li>\n</ul>",
  //       "end_time_milli": (addTime(new Date(), 1)).getTime(),
  //       "start_time_milli": new Date().getTime(),
  //       "title": "lion session"
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendas')
  //     .set('organiserId', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(session12)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       sessionid2 = (response.body.data.ids.agenda_id)
  //       sessionidstring = JSON.stringify(response.body.data.ids.agenda_id)
  //       // console.log(sessionid2)
  //       //expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_successfully_message);
  //       done();
  //     });
  // });

  //200: POSITIVE session stream settings : POST /backend/api/v2/agendas/stream

  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

    const session121 =
    {
      "data": {
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",
        "is_moderate_qna": 0,
        "is_stream": 1,
        "stream_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
        "stream_recording_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
        "stream_type_id": 1
      }
    }

    // console.log(session121, 'stream settings changed body')

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid1},'post',session121)
    expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
  });

  // it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', (done) => {

  //   const session121 =
  //   {
  //     "data": {
  //       "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",
  //       "is_moderate_qna": 0,
  //       "is_stream": 1,
  //       "stream_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
  //       "stream_recording_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
  //       "stream_type_id": 1
  //     }
  //   }

  //   // console.log(session121, 'stream settings changed body')

  //   request1
  //     .post('/backend/api/v2/agendas/stream')
  //     .set('organiserId', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .set('agendaid', sessionid1)
  //     .send(session121)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
  //       done();
  //     });
  // });

  //UPDATE SESSION STREAM SETTINGS FOR ALL PARAMS

  it.only('Update session stream settings for session with all parameters : POST /backend/api/v2/agendas/stream', async () => {

    const session1211 =
    {
      "data": {
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",
        "is_moderate_qna": 0,
        "is_stream": 1,
        "stream_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
        "stream_recording_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
        "stream_type_id": 1
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid2},'post',session1211)
  });


  // UPDATE BASICS WITH CUSTOM TAGS

  it('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "lion session",
        "speakers": [],
        "start_time_milli": new Date().getTime(),
        "tags": "tag,virtual booth,first"

      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid2},'put',customupdate)
  });


  it.only('Update session advanced settings : PUT /backend/api/v2/events/agenda/advanced', async () => {

    const session122 =
    {
      "data": {
        "access_file_name": "",
        "access_real_file_name": "",
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "emails": [],
        "groups": [],
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "is_apply_all": 0,
        "is_attendee_registration": 0,
        "is_custom_iframe": 0,
        "is_language_interpretation": 0,
        "is_let_unregister": 1,
        "is_registration_end_on_session_start": 1,
        "is_registration_start_immidiately": 1,
        "is_registration_status_open": 1,
        "is_restricted": 0,
        "is_waitlist_after_limit": 0,
        "is_waitlist_registration": 0,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": ""
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid1},'put',session122);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  // it.only('Update session advanced settings : PUT /backend/api/v2/events/agenda/advanced', (done) => {

  //   const session122 =
  //   {
  //     "data": {
  //       "access_file_name": "",
  //       "access_real_file_name": "",
  //       "custom_iframe_btn_label": "",
  //       "custom_iframe_code": "",
  //       "emails": [],
  //       "groups": [],
  //       "interpretation_service_meta_id": 1,
  //       "interpretation_service_token_link": "",
  //       "is_apply_all": 0,
  //       "is_attendee_registration": 0,
  //       "is_custom_iframe": 0,
  //       "is_language_interpretation": 0,
  //       "is_let_unregister": 1,
  //       "is_registration_end_on_session_start": 1,
  //       "is_registration_start_immidiately": 1,
  //       "is_registration_status_open": 1,
  //       "is_restricted": 0,
  //       "is_waitlist_after_limit": 0,
  //       "is_waitlist_registration": 0,
  //       "registration_end_time_milli": "",
  //       "registration_limit": "",
  //       "registration_start_time_milli": ""
  //     }
  //   }

  //   request1
  //     .put('/backend/api/v2/events/agenda/advanced')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('buildversion', process.env.buildversion)
  //     // .set('eventid', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .set('agendaid', sessionid1)
  //     .send(session122)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  //       done();
  //     });
  // });

  //200: POSITIVE session attendees settings : GET /backend/api/v2/events/attendees

  it.only('Get session attendees settings : GET /backend/api/v2/events/attendees', async () => {

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/attendees',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid1, 'page' : environment.HPage},'get');
    attendeeadd = (response.body.data.attendees[1].userId)
  });


  it('200: POSITIVE session attendees settings : POST /backend/api/v2/agendas/attendees', async () => {

    const session124 =
    {
      "data": {
        "is_send_mail": 0,
        "userId": [attendeeadd]
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/attendees',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid1, 'page' : environment.HPage, 'limit' : environment.HLimit},'post',session124)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__attendee_registered_successfully_message)
  });

  //Verify agendas in community

  it('Verify agendas list : POST /api/v2/sessions/get-sessions', async () => {

    const communitysession =
    {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": ""

        }
      }
    }
   
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstoken, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communitysession)
    expect(response.body.success.data.agenda[0].title).to.equal('tiger session 1')
    expect(response.body.success.data.agenda[1].title).to.equal('lion session')
    expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
    expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
    expect(response.body.success.data.agenda[1].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agenda[1].agendaInfo.track_name).to.equal("TRACK1")
    expect(response.body.success.data.agenda[1].agendaInfo.is_stream).to.equal(1)   
  });

  // it('Verify agendas list : POST /api/v2/sessions/get-sessions', (done) => {

  //   const communitysession =
  //   {
  //     "payload": {
  //       "data": {
  //         "agenda_id": "",
  //         "custom_tag": [],
  //         "isSendLiveAgenda": "NO",
  //         "search": "",
  //         "speakerIds": [],
  //         "time_zone": "Asia/Kolkata",
  //         "trackIds": [],
  //         "track_date": ""

  //       }
  //     }
  //   }
  //   //  console.log(communitysession, 'contest body')

  //   request3
  //     .post('/api/v2/sessions/get-sessions')
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('authorization', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey',process.env.apikey)
  //     // .set('organiserid',environment.HOrganiserId)
  //     // .set('eventid',process.env.eventid)
  //     .send(communitysession)
  //     .end((err, response) => {
  //       // console.log('contest landing page');
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agenda[0].title).to.equal('tiger session 1')
  //       expect(response.body.success.data.agenda[1].title).to.equal('lion session')
  //       expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
  //       expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
  //       expect(response.body.success.data.agenda[1].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agenda[1].agendaInfo.track_name).to.equal("TRACK1")
  //       expect(response.body.success.data.agenda[1].agendaInfo.is_stream).to.equal(1)
  //       // console.log(data1, 'Body Res Test')
  //       // console.log(data1.data[3].agenda[0].title)

  //       // expect(response.body.success.data.liveAgenda[0].title).to.equal('first session')
  //       // expect(response.body.success.data.liveAgenda[0].title).to.equal('first session')
  //       // expect(response.body.success.data.agenda[0].title).to.equal('final session')
  //       // expect(response.body.success.data.agenda[1].title).to.equal('first session')
  //       // agendacommid1 = (response.body.success.data.agenda[0].agenda_id)
  //       // console.log(agendacommid1)
  //       // agendacommid2 = (response.body.success.data.agenda[1].agenda_id)
  //       // console.log(agendacommid2)
  //       done();
  //     });
  // });

  // GET LIVE SESSION WITH MANDATORY PARAMS

  it.only('Verify live agendas for session with mandatory params: POST /api/v2/sessions/live-agenda/get', async () => {

    const community584 = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community584);
    expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
    expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
    expect(response.body.success.data.title).to.equal("tiger session 1")
    expect(response.body.success.data.agendaId).to.equal(JSON.stringify(sessionid1))
    noteid = (response.body.success.data.agendaId)
    // console.log(noteid)
    feedidsessionlive = (response.body.success.data.feedId)
    // console.log(feedidsessionlive)
  });

  // it.only('Verify live agendas for session with mandatory params: POST /api/v2/sessions/live-agenda/get', (done) => {

  //   const community584 = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,
  //         "is_stream": true

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/live-agenda/get')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(community584)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
  //       expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //       expect(response.body.success.data.title).to.equal("tiger session 1")
  //       expect(response.body.success.data.agendaId).to.equal(JSON.stringify(sessionid1))
  //       noteid = (response.body.success.data.agendaId)
  //       // console.log(noteid)
  //       feedidsessionlive = (response.body.success.data.feedId)
  //       // console.log(feedidsessionlive)
  //       done();
  //     });
  // });

  // GET LIVE SESSION WITH ALL PARAMS

  it.only('Verify live agendas for session with all params: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid2,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
    expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
    expect(response.body.success.data.title).to.equal("lion session")
    expect(response.body.success.data.agendaId).to.equal(JSON.stringify(sessionid2))
  });

  // it.only('Verify live agendas for session with all params: POST /api/v2/sessions/live-agenda/get', (done) => {

  //   const community5844 = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid2,
  //         "is_stream": true

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/live-agenda/get')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(community5844)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agendaInfo.tags).to.equal("tag,virtual booth,first")
  //       expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
  //       expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //       expect(response.body.success.data.title).to.equal("lion session")
  //       expect(response.body.success.data.agendaId).to.equal(JSON.stringify(sessionid2))
  //       done();
  //     });
  // });

  //Add custom tags

  it.only('Add custom tag as "tag" : POST /backend/api/v2/events/general/customtags/add', async () => {
    const customtag = {"data":{"name":"tag"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtag)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_add_custom_tag_success_message);
    global.sessionCustomTag1 = response.body.data.id
  });

  it.only('Add custom tag as "virtual booth" : POST /backend/api/v2/events/general/customtags/add', async () => {
    const customtag = {"data":{"name":"virtual booth"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtag)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_add_custom_tag_success_message);
    global.sessionCustomTag2 = response.body.data.id
  });

  it.only('Add custom tag as "first" : POST /backend/api/v2/events/general/customtags/add', async () => {
    const customtag = {"data":{"name":"first"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtag)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_add_custom_tag_success_message);
    global.sessionCustomTag3 = response.body.data.id
  });

  it.only('Verify the session custom tags list : GET /backend/api/v2/events/general/customtags/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    expect(response.body.data.map(map => map.id)).to.have.members([global.sessionCustomTag1, global.sessionCustomTag2, global.sessionCustomTag3])
    expect(response.body.data.map(map => map.name)).to.have.members(['tag','virtual booth','first'])
  });

  it.only('Add duplicate custom tag and verify the error : POST /backend/api/v2/events/general/customtags/add', async () => {
    const customtag = {"data":{"name":"first"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtag)
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_duplicate_tag_error_message);
  });

  it.only('Add duplicate custom tag with uppercase and verify the error : POST /backend/api/v2/events/general/customtags/add', async () => {
    const customtag = {"data":{"name":"FIRST"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtag)
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_duplicate_tag_error_message);
  });

  it.only('Delete custom tag : POST /backend/api/v2/events/general/customtags/delete', async () => {
    const customtagDelete = {"data":{"id":global.sessionCustomTag3}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post', customtagDelete)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_custom_tag_delete_message);
  });  

  it.only('Verify the session custom tags list after deleting the tag: GET /backend/api/v2/events/general/customtags/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/general/customtags/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    expect(response.body.data.map(map => map.id)).to.have.members([global.sessionCustomTag1, global.sessionCustomTag2])
    expect(response.body.data.map(map => map.name)).to.have.members(['tag','virtual booth'])
  });

  it.only('Verify session custom tag filter list: GET  /backend/api/v2/agendas/customtags', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/agendas/customtags', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.length).to.equal(0);
  });

  // UPDATE BASICS WITH CUSTOM TAGS

  it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "is_featured": 0,
        "is_rating": 0,
        "multiple_file": [],
        "name": "lion session",
        "speakers": [],
        "start_time_milli": new Date().getTime(),
        "tags": "tag,virtual booth"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid2},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it('Verify tags on agenda list agendas list : POST /api/v2/sessions/get-sessions', async () => {

    const communitysession =
    {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": ""

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstoken, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communitysession)
    expect(response.body.success.data.agenda[1].agendaInfo.tags).to.equal('tag,virtual booth')
  });

  it.only('Session details verify tags : POST /api/v2/sessions/live-agenda/get', async () => {

    const sessionmoreinfo = {
      "payload": {
        "data": {
          "agenda_id": sessionid2,

        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sessionmoreinfo)
    expect(response.body.success.data.agendaInfo.tags).to.equal('tag,virtual booth')
    expect(response.body.success.data.agendaInfo.isRating).to.equal(0)
  });

  //Update is rating enabled

  it.only('Update basic settings with is_rating enabled with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "is_featured": 0,
        "is_rating": 1,
        "multiple_file": [],
        "name": "lion session",
        "speakers": [],
        "start_time_milli": new Date().getTime(),
        "tags": "tag,virtual booth"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid2},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Session details verify  session rating enabled : POST /api/v2/sessions/live-agenda/get', async () => {

    const sessionmoreinfo = {
      "payload": {
        "data": {
          "agenda_id": sessionid2,

        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sessionmoreinfo)
    expect(response.body.success.data.agendaInfo.isRating).to.equal(1)
  });



  //Add rating

  it.only('Add rating on live stream 3 stars: POST /api/v2/add-rating', async () => {

    const addratinglive3 = {
      "payload": {
        "data": {
          "type": "SCHEDULE",
          "typeId": sessionid2.toString(),
          "rating": 3,
          "sessionId": sessionid2,
          "sessionName": "lion session",
          "source": "Session"
        }
      }
    }

    // console.log(addratinglive3, 'add rating live 3 body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/add-rating',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',addratinglive3);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  });

  it.only('Session details verify user rating : POST /api/v2/sessions/live-agenda/get', async () => {

    const sessionmoreinfo = {
      "payload": {
        "data": {
          "agenda_id": sessionid2,

        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sessionmoreinfo)
    expect(response.body.success.data.agendaInfo.userRating).to.equal(3)
  });

  // Add rating on live stream 5 stars

  it.only('Add rating on live stream 5 stars: POST /api/v2/add-rating', async () => {

    const addratinglive5 = {
      "payload": {
        "data": {
          "type": "SCHEDULE",
          "typeId": sessionid2.toString(),
          "rating": 5,
          "sessionId": sessionid2,
          "sessionName": "lion session",
          "source": "Session"
        }
      }
    }

    // console.log(addratinglive5, 'add rating live 5 body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/add-rating',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',addratinglive5)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  });

  it.only('Session details verify user rating : POST /api/v2/sessions/live-agenda/get', async () => {

    const sessionmoreinfo = {
      "payload": {
        "data": {
          "agenda_id": sessionid2,

        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sessionmoreinfo)
    expect(response.body.success.data.agendaInfo.userRating).to.equal(5)
  });



  //Featured sessions

  it('Verify no featured session present : POST /api/v2/sessions/get-sessions', async () => {

    const communityFeaturedSession =
    {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "YES",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "isFeatured": true
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstoken, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communityFeaturedSession)
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Update basic settings with is_featured enabled with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "lion session",
        "speakers": [],
        "start_time_milli": new Date().getTime(),
        "tags": "tag,virtual booth"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid2},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it('Verify featured session list on community page : POST /api/v2/sessions/get-sessions', async () => {

    const communityFeaturedSession =
    {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "YES",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "isFeatured": true
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstoken, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communityFeaturedSession)
    expect(response.body.success.data.agenda.length).to.equal(1)
    expect(response.body.success.data.agenda[0].title).to.equal('lion session')
    expect(response.body.success.data.agenda[0].agenda_id).to.equal(sessionid2)
  });

  

  it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    global.virtualboothid1 = (response.body.data.ids.exhibitor_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  });

  

  it.only('Session creation with mandatory parameters : POST /backend/api/v2/events/agendas', async () => {
    global.session3StartTime = (addTime(new Date(), 3)).getTime()
    global.session3EndTime = (addTime(new Date(), 6)).getTime()
    const session11 =
    {
      "data": {
        // "agenda_track_id": "",
        "agenda_track_id": trackid,
        "banner": "",
        "description": "",
        "end_time_milli": global.session3EndTime,
        "start_time_milli": global.session3StartTime,
        "title": "Test session"
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendas',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session11);
    sessionid3 = (response.body.data.ids.agenda_id);
  });

  it.only('Add a single speaker with mandatory parameters and login: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newSessionGroupTestSpeaker@yopmail.com', 'SessionTestSpeaker', 'Speaker', [global.speakergroup])
    global.sessionGroupTestSpeakerId = peopleId
    peopleList.push(peopleId)
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokensessionspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newSessionGroupTestSpeaker@yopmail.com', '1234')
  })

  it.only('Add a single boothmember with mandatory parameters and login: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid1);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newSessionGroupTestBoothmember@yopmail.com', 'SessionTestBoothmember', 'Boothmember', [global.boothmembergroup])
    global.sessionGroupTestBoothmemberId = peopleId
    peopleList.push(peopleId)
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokensessionboothmemberuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newSessionGroupTestBoothmember@yopmail.com', '1234')
  })

  //Session sponsored booths

  it.only('Update basic with sponsored booths : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [global.virtualboothid1],
        "description": "<p>tetst</p>",
        "end_time_milli": global.session3EndTime,
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "Test session",
        "speakers": [],
        "start_time_milli": global.session3StartTime,
        "tags": ""
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify session with booth : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].exhibitors[0].exhibitor_id).to.equal(global.virtualboothid1)
  });


  //Session advanced settings registration

  it.only('Update advanced  settings with registration enabled : PUT /backend/api/v2/events/agenda/advanced', async () => {

    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });
  
  it.only('Verify advanced  settings with registration enabled : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_attendee_registration).to.equal(1);
    expect(response.body.data.is_registration_status_open).to.equal(1);
    expect(response.body.data.is_registration_start_immidiately).to.equal(1);
    expect(response.body.data.is_registration_end_on_session_start).to.equal(1);
    registration_end_time_milli = (response.body.data.registration_end_time_milli)
    registration_start_time_milli = (response.body.data.registration_start_time_milli)
    expect(registration_end_time_milli).to.equal(global.session3StartTime)
  });

  it.only('Verify session registration : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.is_attendee_registration).to.equal(1)
    expect(response.body.success.data.agenda[0].agendaInfo.is_waitlist_registration).to.equal(0)
    expect(response.body.success.data.agenda[0].agendaInfo.is_waitlist_after_limit).to.equal(0)
    expect(response.body.success.data.agenda[0].agendaInfo.registration_limit).to.equal('')
    expect(response.body.success.data.agenda[0].agendaInfo.is_registration_status_open).to.equal(1)
    expect(response.body.success.data.agenda[0].agendaInfo.registration_start_time_milli).to.equal(String(registration_start_time_milli))
    expect(response.body.success.data.agenda[0].agendaInfo.registration_end_time_milli).to.equal(String(registration_end_time_milli))
  });

  it.only('Verify user can register : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('Verify registered user appear on dashboard session attendee list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.session_name).to.equal('Test session')
    expect(response.body.data.attendees.length).to.equal(1)
    expect(response.body.data.attendees[0].userId).to.equal(process.env.clown26userid)
    expect(response.body.data.attendees[0].email).to.equal('clown26@yopmail.com')
    expect(response.body.data.attendees[0].firstName).to.equal('joker')
    expect(response.body.data.attendees[0].lastName).to.equal('clown')
    expect(response.body.data.attendees[0].status).to.equal('REGISTERED')
  });

  it.only('Verify user can un-register : POST /api/v2/sessions/unregister', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  });

  it.only('Verify user un-registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('NO')
  });

  it.only('Verify un-registered user does not appear on dashboard session attendee list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.session_name).to.equal('Test session')
    expect(response.body.data.attendees.length).to.equal(0)
  });

  it.only('Register an attendee for session : POST /api/v2/sessions/register', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('From dashboard reject the session registration for attendee : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[process.env.clown26userid],"status":"Rejected"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify registered user status changed to rejected : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.session_name).to.equal('Test session')
    expect(response.body.data.attendees.length).to.equal(1)
    expect(response.body.data.attendees[0].userId).to.equal(process.env.clown26userid)
    expect(response.body.data.attendees[0].status).to.equal('REJECTED')
  });

  it.only('Verify user rejected on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('REJECTED')
  });

  it.only('From dashboard update the session registration status for attendee to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[process.env.clown26userid],"status":"Registered"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify rejected user status changed to registered : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.session_name).to.equal('Test session')
    expect(response.body.data.attendees.length).to.equal(1)
    expect(response.body.data.attendees[0].userId).to.equal(process.env.clown26userid)
    expect(response.body.data.attendees[0].status).to.equal('REGISTERED')
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('Unregister for session : POST /api/v2/sessions/unregister', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  });

  it.only('Update advanced  settings with registration status closed : PUT /backend/api/v2/events/agenda/advanced', async () => {

    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 0,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });
  

  it.only('Verify advanced  settings with registration enabled and status close : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_registration_status_open).to.equal(0);
    expect(response.body.data.is_registration_start_immidiately).to.equal(1);
    expect(response.body.data.is_registration_end_on_session_start).to.equal(1);
    registration_end_time_milli = (response.body.data.registration_end_time_milli)
    registration_start_time_milli = (response.body.data.registration_start_time_milli)
  });

  it.only('Verify session registration with registration status close : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.is_registration_status_open).to.equal(0)
    expect(response.body.success.data.agenda[0].agendaInfo.registration_start_time_milli).to.equal(String(registration_start_time_milli))
    expect(response.body.success.data.agenda[0].agendaInfo.registration_end_time_milli).to.equal(String(registration_end_time_milli))
  });

  // it.only('Verify user can not register with registration status closed : POST /api/v2/sessions/register', async () => {

  //   const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
  //   expect(response.body.success.message).to.not.equal(Responsemessages.Parameter_session_registration_success_message)
  // });

  // it.only('Unregister for session : POST /api/v2/sessions/unregister', async () => {
  //   const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
  //   expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  // });

  it.only('Update advanced settings with start time and end on session start : PUT /backend/api/v2/events/agenda/advanced', async () => {
    registration_start_time_milli = (addTime(new Date(), 1)).getTime()
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced  settings with registration start on time and end on session start : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_registration_status_open).to.equal(1);
    expect(response.body.data.is_registration_start_immidiately).to.equal(0);
    expect(response.body.data.is_registration_end_on_session_start).to.equal(1);
    registration_end_time_milli = (response.body.data.registration_end_time_milli)
    expect(response.body.data.registration_start_time_milli).to.equal(registration_start_time_milli)
  });

  it.only('Verify session registration with registration timing : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.registration_start_time_milli).to.equal(String(registration_start_time_milli))
    expect(response.body.success.data.agenda[0].agendaInfo.registration_end_time_milli).to.equal(String(registration_end_time_milli))
  });

  it.only('Verify user can not register with registration interval not started : POST /api/v2/sessions/register', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_not_started_message)
  });

  it.only('Update advanced settings with start time and end time : PUT /backend/api/v2/events/agenda/advanced', async () => {
    registration_start_time_milli = (addTime(new Date(), 1)).getTime()
    registration_end_time_milli = (addTime(new Date(), 3)).getTime()
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced  settings with registration start on time and end time : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_registration_start_immidiately).to.equal(0);
    expect(response.body.data.is_registration_end_on_session_start).to.equal(0);
    expect(response.body.data.registration_end_time_milli).to.equal(registration_end_time_milli)
    expect(response.body.data.registration_start_time_milli).to.equal(registration_start_time_milli)
  });

  it.only('Verify session registration with registration start and end time : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.registration_start_time_milli).to.equal(String(registration_start_time_milli))
    expect(response.body.success.data.agenda[0].agendaInfo.registration_end_time_milli).to.equal(String(registration_end_time_milli))
  });

  it.only('Update advanced settings with seat limits : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": 10,
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced  settings with registration limit : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.registration_limit).to.equal('10');
  });

  it.only('Verify session registration with registration seat limit : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.registration_limit).to.equal('10')
  });

  it.only('Update advanced settings with seat limits as 2 : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": 2,
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Register 1 user : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('Register another user : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('Verify session registration with registration seat limit using another user: POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].registration_limit).to.equal(0)
  });

  it.only('Register third and verify error user : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    console.log(response.body)
    expect(response.body.error.message).to.equal(Responsemessages.Parameter_session_registration_limit_exceed_message)
  });

  it.only('Unregister all users for current session : POST /api/v2/sessions/unregister', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
    response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  });
  

  it.only('Update advanced settings with seat limits and waitlist after registration limit : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 1,
        "is_let_unregister": 1,
        "is_waitlist_registration": 0,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": 2,
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced  settings with waitlist after registration limit : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.registration_limit).to.equal('2');
    expect(response.body.data.is_waitlist_after_limit).to.equal(1);
  });

  it.only('Verify session registration with waitlist after registration limit: POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.registration_limit).to.equal('2')
    expect(response.body.success.data.agenda[0].agendaInfo.is_waitlist_after_limit).to.equal(1)
  });
  

  it.only('Register 1 user : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('Register another user : POST /api/v2/sessions/register', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_registration_success_message)
    expect(response.body.success.data.status).to.equal("ACCEPTED")
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('Register third and verify user can register : POST /api/v2/sessions/register', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_waitlist_register_message)
    expect(response.body.success.data.status).to.equal('PENDING')
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('PENDING')
  });

  it.only('Verify registered user appear on dashboard session registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.session_name).to.equal('Test session')
    expect(response.body.data.attendees[0].userId).to.equal(process.env.clown26userid)
    expect(response.body.data.attendees[0].email).to.equal('clown26@yopmail.com')
    expect(response.body.data.attendees[0].status).to.equal('REGISTERED')
    expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(response.body.data.attendees[1].status).to.equal('REGISTERED')
    expect(response.body.data.attendees[2].userId).to.equal(global.sessionGroupTestBoothmemberId)
    expect(response.body.data.attendees[2].email).to.equal('newsessiongrouptestboothmember@yopmail.com')
    expect(response.body.data.attendees[2].status).to.equal('PENDING')
  });

  it.only('From dashboard update the session registration status to registered for third user to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[global.sessionGroupTestBoothmemberId],"status":"Registered"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify user status updated on dashboard session registered list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees[2].userId).to.equal(global.sessionGroupTestBoothmemberId)
    expect(response.body.data.attendees[2].email).to.equal('newsessiongrouptestboothmember@yopmail.com')
    expect(response.body.data.attendees[2].status).to.equal('REGISTERED')
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('From dashboard update the session registration status to rejected for third user to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[global.sessionGroupTestBoothmemberId],"status":"Rejected"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify user status updated on dashboard session registered list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees[2].userId).to.equal(global.sessionGroupTestBoothmemberId)
    expect(response.body.data.attendees[2].email).to.equal('newsessiongrouptestboothmember@yopmail.com')
    expect(response.body.data.attendees[2].status).to.equal('REJECTED')
  });

  it.only('Verify user rejected on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('REJECTED')
  });

  it.only('Unregister all users for current session : POST /api/v2/sessions/unregister', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
    response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  });

  it.only('Update advanced settings with wait list registration enabled : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced  settings with wait list registration : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_waitlist_registration).to.equal(1);
  });

  it.only('Verify session registration with waitlist registration : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.is_waitlist_registration).to.equal(1)
  });

  it.only('Register 1 user and verify waitlist pending status : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_waitlist_register_message)
    expect(response.body.success.data.status).to.equal("PENDING")
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('PENDING')
  });

  it.only('Verify registered user appear on dashboard session registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees.length).to.equal(2)
    var jsonObj = response.body.data.attendees.filter(attendee => attendee.userId == global.sessionGroupTestSpeakerId)[0]
    expect(jsonObj).to.not.be.undefined
    expect(jsonObj.email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(jsonObj.status).to.equal('PENDING')
    // expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    // expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    // expect(response.body.data.attendees[1].status).to.equal('PENDING')
  });

  it.only('Unregister registsred users for current session : POST /api/v2/sessions/unregister', async () => {
    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/unregister',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_un_register_success_message)
  });

  it.only('Verify user un-registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('NO')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('')
  });

  it.only('Verify un-registered user does not appear on dashboard session registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees.length).to.equal(1)
  });

  it.only('Register 1 user and verify waitlist pending status : POST /api/v2/sessions/register', async () => {

    const registerSession = {"payload":{"data":{"agendaId":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_session_waitlist_register_message)
    expect(response.body.success.data.status).to.equal("PENDING")
  });

  it.only('Verify registered user appear on dashboard session registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    console.log(response.body.data.attendees)
    expect(response.body.data.attendees.length).to.equal(2)
    var jsonObj = response.body.data.attendees.filter(attendee => attendee.userId == global.sessionGroupTestSpeakerId)[0]
    expect(jsonObj).to.not.be.undefined
    expect(jsonObj.email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(jsonObj.status).to.equal('PENDING')
    // expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    // expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    // expect(response.body.data.attendees[1].status).to.equal('PENDING')
  });

  it.only('From dashboard update the session registration status to registered for third user to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[global.sessionGroupTestSpeakerId],"status":"Registered"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify registered user status updated registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees.length).to.equal(2)
    var jsonObj = response.body.data.attendees.filter(attendee => attendee.userId == global.sessionGroupTestSpeakerId)[0]
    expect(jsonObj).to.not.be.undefined
    expect(jsonObj.email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(jsonObj.status).to.equal('REGISTERED')
    // expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    // expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    // expect(response.body.data.attendees[1].status).to.equal('REGISTERED')
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('From dashboard update the session registration status to rejected for third user to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[global.sessionGroupTestSpeakerId],"status":"Rejected"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify registered user status updated registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees.length).to.equal(2)
    var jsonObj = response.body.data.attendees.filter(attendee => attendee.userId == global.sessionGroupTestSpeakerId)[0]
    expect(jsonObj).to.not.be.undefined
    expect(jsonObj.email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(jsonObj.status).to.equal('REJECTED')
    // expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    // expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    // expect(response.body.data.attendees[1].status).to.equal('REJECTED')
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('REJECTED')
  });

  it.only('From dashboard update the session registration status to from rejected to registered for third user to registered : POST /backend/api/v2/attendees/agendas/status', async () => {
    const payload = {"data":{"userId":[global.sessionGroupTestSpeakerId],"status":"Registered"}}
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
  });

  it.only('Verify user registered on agenda tab : POST /api/v2/sessions/get-sessions', async () => {
    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].is_registred).to.equal('YES')
    expect(response.body.success.data.agenda[0].registration_status).to.equal('ACCEPTED')
  });

  it.only('Verify registered user status updated registration list : POST /api/v1/session/attendees/registered', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL,'/api/v1/session/attendees/registered',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'post',payload)
    expect(response.body.data.attendees.length).to.equal(2)
    var jsonObj = response.body.data.attendees.filter(attendee => attendee.userId == global.sessionGroupTestSpeakerId)[0]
    expect(jsonObj).to.not.be.undefined
    expect(jsonObj.email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    expect(jsonObj.status).to.equal('REGISTERED')
    // expect(response.body.data.attendees[1].userId).to.equal(global.sessionGroupTestSpeakerId)
    // expect(response.body.data.attendees[1].email).to.equal('newsessiongrouptestspeaker@yopmail.com')
    // expect(response.body.data.attendees[1].status).to.equal('REGISTERED')
  });

  it.only('Update advanced settings add CTA button to session : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": 1,
        "custom_iframe_btn_label": "Test Label",
        "custom_iframe_code": "<iframe src='https://hubilo.com/' title='W3Schools Free Online Web Tutorials'></iframe>",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify CTA label and iframe for agenda : POST /api/v2/sessions/live-agenda/get', async () => {
    const SearchSession = {"payload":{"data":{"agenda_id":sessionid3}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    console.log(response.body)
    expect(response.body.success.data.agendaInfo.custom_iframe_btn_label).to.equal('Test Label')
    expect(response.body.success.data.agendaInfo.custom_iframe_code).to.equal("<iframe src='https://hubilo.com/' title='W3Schools Free Online Web Tutorials'></iframe>")
  });


  it.only('Update advanced settings make visible to attendee only : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 1,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [
          global.attendeegroup
        ],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced settings for restriction : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_restricted).to.equal(1);
    expect(response.body.data.restricted_to_groups).to.have.have.members([global.attendeegroup])
  });


  it.only('Verify session is visible for attendee : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Verify advanced settings for restriction : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is not visible for boothmember : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Update advanced settings make session visible to speaker only : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 1,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [
          global.speakergroup
        ],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced settings for restriction : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_restricted).to.equal(1);
    expect(response.body.data.restricted_to_groups).to.have.have.members([global.speakergroup])
  });

  it.only('Verify session is not visible for attendee : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is visible for speaker : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Verify session is not visible for boothmember : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Update advanced settings make visible to boothmember only : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 1,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [
          global.boothmembergroup
        ],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('VVerify advanced settings for restriction : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    expect(response.body.data.is_restricted).to.equal(1);
    expect(response.body.data.restricted_to_groups).to.have.have.members([global.boothmembergroup])
  });


  it.only('Verify session is not visible for attendee : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is not visible for speaker : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is visible for boothmember : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Update advanced settings make visible to clown26 user only : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 1,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": ['clown26@yopmail.com'],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced settings for restriction : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    console.log(response.body.data)
    expect(response.body.data.is_restricted).to.equal(1);
    expect(response.body.users.length).to.equal(1);
    expect(response.body.users[0].email).to.equal('clown26@yopmail.com');
  });

  it.only('Verify session is visible for clown26 user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Verify session is not visible to session speaker user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is not visible for boothmember user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Download sample file for user restriction for agenda : GET /backend/api/v2/sample/agendas', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/sample/agendas',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    csvHeaders = response.body.data.headers
    var fullDownloadFileURL = response.body.data.file_path
    sampleFileDownloadUrl = fullDownloadFileURL.substring(fullDownloadFileURL.indexOf("/storage/app/public"))
  });

  it.only("download actual file and save to a location add boothmember and speaker email details", async () => {
    fileNameToSave = await downloadAndSaveFileOnLocal(environment.baseURL1, sampleFileDownloadUrl, './sheets')
    console.log('file modify')
    await WorkbookUtility.updateWorkBookDataWithAgendaRestrictAccessDetails(fileNameToSave,['newSessionGroupTestBoothmember@yopmail.com','newSessionGroupTestSpeaker@yopmail.com'])
  })

  it.only('Bulkupload rooms list UploadExcelFile : POST /backend/api/v2/events/exceluploads', async () => {
    var response = await uploadExcelFile(environment.baseURL1, '/backend/api/v2/events/exceluploads', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken }, csvHeaders.join(), 'agenda_access', fileNameToSave)
    console.log(response.body)
    fileName = response.body.data.file_name
    filePath = response.body.data.path.split('/').slice(-1)[0]
  });

  it.only('Update advanced settings make visible to speaker and boothmember user only : PUT /backend/api/v2/events/agenda/advanced', async () => {
    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 0,
        "is_registration_end_on_session_start": 0,
        "registration_end_time_milli": registration_end_time_milli,
        "registration_limit": "",
        "registration_start_time_milli": registration_start_time_milli,
        "is_apply_all": 0,
        "is_restricted": 1,
        "access_real_file_name": fileNameToSave.split('/').slice(-1)[0],
        "access_file_name": fileName,
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
  });

  it.only('Verify advanced settings for restriction : GET /backend/api/v2/events/agenda/advanced', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid3},'get')
    //expect(response.body.data.access_file_name).to.equal(fileName);
    expect(response.body.data.access_real_file_name).to.equal(fileNameToSave.split('/').slice(-1)[0]);
    expect(response.body.users.length).to.equal(0);
  });

  it.only('Verify session is not visible for clown26 user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(0)
  });

  it.only('Verify session is visible to session speaker user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionspeakeruser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Verify session is visible for boothmember user : POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Test session",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : global.accesstokensessionboothmemberuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda.length).to.equal(1)
  });

  it.only('Delete all virtuabooths : POST /backend/api/v2/events/booth/delete', (done) => {
    const delete1 =
    {
      "data": {

        "booth_ids": [global.virtualboothid1],
        "is_all": 0

      }
    }
    request1
      .post('/backend/api/v2/events/booth/delete')
      .set('organiserId', environment.HOrganiserId)
      .set('eventId', process.env.eventid)
      .set('buildversion', process.env.buildversion)
      .set('Authorization', 'Bearer ' + process.env.eToken)
      .send(delete1)
      .end((err, response) => {
        consolelog(response);
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
        done();
      });
  });

  it.only('delete all added users', async() => {
      var people = new People();
      people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, peopleList)
      
  })

  it.only('delete third session', async() => {
    var session = new Session();
    session.deleteSession(organizerUserHeader(), process.env.eventid, sessionid3)
  })

  // Stream live Q&A

  

  it.only('Get stream live Q & A : POST /api/v2/qna/stream_live_qna', async () => {

    const streamliveqaa = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,
          "current_page": 0,
          "limit": 10,
          "sort": 1,
          "feedId": feedidsessionlive

        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/stream_live_qna',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',streamliveqaa)
  });

  // it.only('Get stream live Q & A : POST /api/v2/qna/stream_live_qna', (done) => {

  //   const streamliveqaa = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,
  //         "current_page": 0,
  //         "limit": 10,
  //         "sort": 1,
  //         "feedId": feedidsessionlive

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/qna/stream_live_qna')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(streamliveqaa)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  // Ask a question in live stream


  it.only('Ask a question in live stream : POST /api/v2/qna/create-question', async () => {

    const askaquestionlivestrem = {
      "payload": {
        "data": {
          "isAnonymous": false,
          "question": "new test",
          "feedId": feedidsessionlive

        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/create-question',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',askaquestionlivestrem)
    expect(response.body.success.data.comment).to.equal("new test")
    expect(response.body.success.data.isActive).to.equal(1)
    expect(response.body.success.data.feedId).to.equal(feedidsessionlive)
    questionid = (response.body.success.data._id)
    // console.log(questionid)
  });

  // it.only('Ask a question in live stream : POST /api/v2/qna/create-question', (done) => {

  //   const askaquestionlivestrem = {
  //     "payload": {
  //       "data": {
  //         "isAnonymous": false,
  //         "question": "new test",
  //         "feedId": feedidsessionlive

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/qna/create-question')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(askaquestionlivestrem)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'ask a question live stream entered')
  //       // console.log(response.body.success.data, 'astream data message')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.comment).to.equal("new test")
  //       expect(response.body.success.data.isActive).to.equal(1)
  //       expect(response.body.success.data.feedId).to.equal(feedidsessionlive)
  //       questionid = (response.body.success.data._id)
  //       // console.log(questionid)
  //       done();
  //     });
  // });

  // Upvote a question in live stream

  it.only('Upvote a question in live stream : POST /api/v2/qna/stream_qna_control', async () => {

    const upvoteaquestionlivestrem = {
      "payload": {
        "data": {
          "action": 4,
          "agenda_id": sessionid1,
          "commentId": questionid,
          "feedId": feedidsessionlive,
          "isUpvote": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/stream_qna_control',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',upvoteaquestionlivestrem)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Upvoted_message)
    expect(response.body.success.code).to.equal("UPVOTE_ADDED")
  });

  // it.only('Upvote a question in live stream : POST /api/v2/qna/stream_qna_control', (done) => {

  //   const upvoteaquestionlivestrem = {
  //     "payload": {
  //       "data": {
  //         "action": 4,
  //         "agenda_id": sessionid1,
  //         "commentId": questionid,
  //         "feedId": feedidsessionlive,
  //         "isUpvote": true

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/qna/stream_qna_control')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(upvoteaquestionlivestrem)
  //     .end((err, response) => {
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Upvoted_message)
  //       expect(response.body.success.code).to.equal("UPVOTE_ADDED")
  //       done();
  //     });
  // });

  // Ask a question in live stream as anonymous

  it.only('Ask a question in live stream as anonymous: POST /api/v2/qna/create-question', async () => {

    const askaquestionlivestremanonymous = {
      "payload": {
        "data": {
          "isAnonymous": true,
          "question": "new test anonymous",
          "feedId": feedidsessionlive

        }
      }
    }
    // console.log(askaquestionlivestremanonymous, 'ask a question as anonymous body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/create-question',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',askaquestionlivestremanonymous)
    expect(response.body.success.data.comment).to.equal("new test anonymous")
    expect(response.body.success.data.isActive).to.equal(1)
    expect(response.body.success.data.feedId).to.equal(feedidsessionlive)
    expect(response.body.success.data.is_anonymous).to.equal("YES")
    questionid1 = (response.body.success.data._id)
  });

  // it.only('Ask a question in live stream as anonymous: POST /api/v2/qna/create-question', (done) => {

  //   const askaquestionlivestremanonymous = {
  //     "payload": {
  //       "data": {
  //         "isAnonymous": true,
  //         "question": "new test anonymous",
  //         "feedId": feedidsessionlive

  //       }
  //     }
  //   }
  //   // console.log(askaquestionlivestremanonymous, 'ask a question as anonymous body')

  //   request3
  //     .post('/api/v2/qna/create-question')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(askaquestionlivestremanonymous)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.comment).to.equal("new test anonymous")
  //       expect(response.body.success.data.isActive).to.equal(1)
  //       expect(response.body.success.data.feedId).to.equal(feedidsessionlive)
  //       expect(response.body.success.data.is_anonymous).to.equal("YES")
  //       questionid1 = (response.body.success.data._id)
  //       // console.log(questionid1)
  //       done();
  //     });
  // });

  // Sort by most voted question on live stream

  it.only('Sort by most voted question on live stream: POST /api/v2/qna/stream_live_qna', async () => {

    const sortbynostvoted = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,
          "current_page": 0,
          "feedId": feedidsessionlive,
          "limit": 10,
          "sort": 2

        }
      }
    }

    // console.log(sortbynostvoted, 'sort by most voted body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/stream_live_qna',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sortbynostvoted)
    expect(response.status).to.equal(200)
    expect(response.body.success.data.comments[0].likes).to.equal(1)
    expect(response.body.success.data.comments[0].comment).to.equal("new test")
    expect(response.body.success.data.comments[0].feedId).to.equal(feedidsessionlive)
    questionid1 = (response.body.success.data._id)
    // console.log(questionid1)
  });

  // it.only('Sort by most voted question on live stream: POST /api/v2/qna/stream_live_qna', (done) => {

  //   const sortbynostvoted = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,
  //         "current_page": 0,
  //         "feedId": feedidsessionlive,
  //         "limit": 10,
  //         "sort": 2

  //       }
  //     }
  //   }

  //   // console.log(sortbynostvoted, 'sort by most voted body')

  //   request3
  //     .post('/api/v2/qna/stream_live_qna')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(sortbynostvoted)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'sort by most voted')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.comments[0].likes).to.equal(1)
  //       expect(response.body.success.data.comments[0].comment).to.equal("new test")
  //       expect(response.body.success.data.comments[0].feedId).to.equal(feedidsessionlive)
  //       questionid1 = (response.body.success.data._id)
  //       // console.log(questionid1)
  //       done();
  //     });
  // });

  // Sort by recent question on live stream

  it.only('Sort by recent question on live stream: POST /api/v2/qna/stream_live_qna', async () => {

    const sortbyrecent = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,
          "current_page": 0,
          "feedId": feedidsessionlive,
          "limit": 10,
          "sort": 1

        }
      }
    }
    // console.log(sortbyrecent, 'sort by recent body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/stream_live_qna',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sortbyrecent)
    expect(response.body.success.data.comments[0].is_active).to.equal("YES")
    expect(response.body.success.data.comments[0].feedId).to.equal(feedidsessionlive)
  });

  // it.only('Sort by recent question on live stream: POST /api/v2/qna/stream_live_qna', (done) => {

  //   const sortbyrecent = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,
  //         "current_page": 0,
  //         "feedId": feedidsessionlive,
  //         "limit": 10,
  //         "sort": 1

  //       }
  //     }
  //   }
  //   // console.log(sortbyrecent, 'sort by recent body')

  //   request3
  //     .post('/api/v2/qna/stream_live_qna')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(sortbyrecent)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'sort by recent entered')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.comments[0].is_active).to.equal("YES")
  //       expect(response.body.success.data.comments[0].feedId).to.equal(feedidsessionlive)
  //       done();
  //     });
  // });

  // Delete a question asked on live stream

  it.only('Delete a question asked on live stream: POST /api/v2/qna/delete-question', async () => {

    const deleteaquestion = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,
          "commentId": questionid,
          "feedId": feedidsessionlive
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/qna/delete-question',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',deleteaquestion)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Agenda_Question_Remove)
    expect(response.body.success.code).to.equal("AGENDA_COMMENT_DELETE")
  });

  // it.only('Delete a question asked on live stream: POST /api/v2/qna/delete-question', (done) => {

  //   const deleteaquestion = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,
  //         "commentId": questionid,
  //         "feedId": feedidsessionlive
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/qna/delete-question')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(deleteaquestion)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Agenda_Question_Remove)
  //       expect(response.body.success.code).to.equal("AGENDA_COMMENT_DELETE")
  //       done();
  //     });
  // });

  //<--------------------- GET ATTENDEES search on Commumity------------------>

  it.only('Get attendees on live stream for session with all params: POST /api/v2/sessions/attendees', async () => {

    const getliveattendees = {
      "payload": {
        "data": {
          "agendaId": sessionid2,
          "currentPage": 1,
          "limit": 10,
          "search": ""
        }
      }
    }

    // console.log(getliveattendees, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/attendees',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',getliveattendees)
  });

  // it.only('Get attendees on live stream for session with all params: POST /api/v2/sessions/attendees', (done) => {

  //   const getliveattendees = {
  //     "payload": {
  //       "data": {
  //         "agendaId": sessionid2,
  //         "currentPage": 1,
  //         "limit": 10,
  //         "search": ""
  //       }
  //     }
  //   }

  //   // console.log(getliveattendees, 'Search Body')

  //   request3
  //     .post('/api/v2/sessions/attendees')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(getliveattendees)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  it.only('Search attendees on live stream for session with all params: POST /api/v2/sessions/attendees', async () => {

    const searchliveattendees = {
      "payload": {
        "data": {
          "agendaId": sessionid2,
          "currentPage": 1,
          "limit": 10,
          "search": "joker"
        }
      }
    }

    // console.log(searchliveattendees, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/attendees',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',searchliveattendees);
  });



  // it.only('Search attendees on live stream for session with all params: POST /api/v2/sessions/attendees', (done) => {

  //   const searchliveattendees = {
  //     "payload": {
  //       "data": {
  //         "agendaId": sessionid2,
  //         "currentPage": 1,
  //         "limit": 10,
  //         "search": "joker"
  //       }
  //     }
  //   }

  //   // console.log(searchliveattendees, 'Search Body')

  //   request3
  //     .post('/api/v2/sessions/attendees')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(searchliveattendees)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  // Add rating on live stream 3 stars

  it.only('Add rating on live stream 3 stars: POST /api/v2/add-rating', async () => {

    const addratinglive3 = {
      "payload": {
        "data": {
          "rating": 3,
          "type": "SCHEDULE",
          "typeId": sessionidstring
        }
      }
    }

    // console.log(addratinglive3, 'add rating live 3 body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/add-rating',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',addratinglive3);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  });

  // it.only('Add rating on live stream 3 stars: POST /api/v2/add-rating', (done) => {

  //   const addratinglive3 = {
  //     "payload": {
  //       "data": {
  //         "rating": 3,
  //         "type": "SCHEDULE",
  //         "typeId": sessionidstring
  //       }
  //     }
  //   }

  //   // console.log(addratinglive3, 'add rating live 3 body')

  //   request3
  //     .post('/api/v2/add-rating')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(addratinglive3)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'add rating live 3 entered')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  //       done();
  //     });
  // });

  // Add rating on live stream 5 stars

  it.only('Add rating on live stream 5 stars: POST /api/v2/add-rating', async () => {

    const addratinglive5 = {
      "payload": {
        "data": {
          "rating": 5,
          "type": "SCHEDULE",
          "typeId": sessionidstring
        }
      }
    }

    // console.log(addratinglive5, 'add rating live 5 body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/add-rating',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',addratinglive5)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  });

  // it.only('Add rating on live stream 5 stars: POST /api/v2/add-rating', (done) => {

  //   const addratinglive5 = {
  //     "payload": {
  //       "data": {
  //         "rating": 5,
  //         "type": "SCHEDULE",
  //         "typeId": sessionidstring
  //       }
  //     }
  //   }

  //   // console.log(addratinglive5, 'add rating live 5 body')

  //   request3
  //     .post('/api/v2/add-rating')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(addratinglive5)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'add rating live 5 entered')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_Rating)
  //       done();
  //     });
  // });

  //200: POSITIVE Get Notes on Community: POST /api/v2/notes/get

  it.only('Get session notes : POST /api/v2/notes/get', async () => {

    const getnote = {
      "payload": {
        "data": {
          "note_type": "AGENDA",
          "noted_id": noteid

        }
      }
    }

    // console.log(getnote, 'note get body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/notes/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',getnote);
  });


  // it.only('Get session notes : POST /api/v2/notes/get', (done) => {

  //   const getnote = {
  //     "payload": {
  //       "data": {
  //         "note_type": "AGENDA",
  //         "noted_id": noteid

  //       }
  //     }
  //   }

  //   // console.log(getnote, 'note get body')

  //   request3
  //     .post('/api/v2/notes/get')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(getnote)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  //200: POSITIVE Add Notes on Community: POST /api/v2/notes/add

  it.only('Add session notes: POST /api/v2/notes/add', async () => {

    const Addnote = {
      "payload": {
        "data": {
          "note_type": "AGENDA",
          "noted_id": noteid,
          "note": "Test Session"

        }
      }
    }

    // console.log(Addnote, 'note ADD body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/notes/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',Addnote);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions__note_added_message)
    expect(response.body.success.data.notes).to.equal('Test Session')
    process.env.session_notes = (response.body.success.data.notes)
    // console.log(process.env.session_notes, 'Notes Printed')
  });

  // it.only('Add session notes: POST /api/v2/notes/add', (done) => {

  //   const Addnote = {
  //     "payload": {
  //       "data": {
  //         "note_type": "AGENDA",
  //         "noted_id": noteid,
  //         "note": "Test Session"

  //       }
  //     }
  //   }

  //   // console.log(Addnote, 'note ADD body')

  //   request3
  //     .post('/api/v2/notes/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(Addnote)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions__note_added_message)
  //       expect(response.body.success.data.notes).to.equal('Test Session')
  //       process.env.session_notes = (response.body.success.data.notes)
  //       // console.log(process.env.session_notes, 'Notes Printed')
  //       done();
  //     });
  // });

  //<----------------------Search Session on Commumity------------------>

  it.only('Search Session on Community: POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "tiger session 1",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    // console.log(SearchSession, 'Search Body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession);
    expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
    expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
    expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
  });

  // it.only('Search Session on Community: POST /api/v2/sessions/get-sessions', (done) => {

  //   const SearchSession = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": "",
  //         "custom_tag": [],
  //         "isSendLiveAgenda": "NO",
  //         "search": "tiger session 1",
  //         "speakerIds": [],
  //         "time_zone": "Asia/Kolkata",
  //         "trackIds": [],
  //         "track_date": "",
  //       }
  //     }
  //   }

  //   // console.log(SearchSession, 'Search Body')

  //   request3
  //     .post('/api/v2/sessions/get-sessions')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(SearchSession)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
  //       expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
  //       expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
  //       done();
  //     });
  // });

  //<----------------------Filter Session on Commumity By tracks------------------>

  it.only('Search Session on Community: POST /api/v2/sessions/get-sessions', async () => {

    const FilterSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [trackid]
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSession)
    expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
    expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
    expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
    // var gaurav1231 = response.body.success.data.agenda.some(function (e) {
    //   return e.title == "tiger session 1";
    // });
    // console.log(gaurav1231, 'verify thius is true')
    // expect(gaurav1231).to.equal(true)
  });

  // it.only('Search Session on Community: POST /api/v2/sessions/get-sessions', (done) => {

  //   const FilterSession = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": "",
  //         "custom_tag": [],
  //         "isSendLiveAgenda": "NO",
  //         "search": "",
  //         "speakerIds": [],
  //         "time_zone": "Asia/Kolkata",
  //         "trackIds": [trackid]
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/get-sessions')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(FilterSession)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
  //       expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
  //       expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
  //       // var gaurav1231 = response.body.success.data.agenda.some(function (e) {
  //       //   return e.title == "tiger session 1";
  //       // });
  //       // console.log(gaurav1231, 'verify thius is true')
  //       // expect(gaurav1231).to.equal(true)
  //       done();
  //     });
  // });

  //<---------------------- Search Tracks in filter in Session on Community------------------>

  it.only('Search Tracks in filter in Session : POST /api/v2/filters/tag/list', async () => {

    const FilterSession = {
      "payload": {
        "data": {
          "limit": 10,
          "page": 1,
          "search": "Track7",
          "type": "TRACKS"
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSession)
        //expect(response.body.success.data.tags[0].name).to.equal("TRACK7")
        // var gaurav1231 = response.body.success.data.tags.some(function (e) {
        //   return e.name == "TRACK7";
        // });
        // console.log(gaurav1231, 'verify thius is true')
        // expect(gaurav1231).to.equal(true)
    
  });


  // it.only('Search Tracks in filter in Session : POST /api/v2/filters/tag/list', (done) => {

  //   const FilterSession = {
  //     "payload": {
  //       "data": {
  //         "limit": 10,
  //         "page": 1,
  //         "search": "Track7",
  //         "type": "TRACKS"
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/filters/tag/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(FilterSession)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //expect(response.body.success.data.tags[0].name).to.equal("TRACK7")
  //       // var gaurav1231 = response.body.success.data.tags.some(function (e) {
  //       //   return e.name == "TRACK7";
  //       // });
  //       // console.log(gaurav1231, 'verify thius is true')
  //       // expect(gaurav1231).to.equal(true)
  //       done();
  //     });
  // });

  it.only('Search Session with invalid name: POST /api/v2/sessions/get-sessions', async () => {

    const SearchSession = {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "Wrong Name",
          "speakerIds": [],
          "time_zone": "Asia/Kolkata",
          "trackIds": [],
          "track_date": "",
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',SearchSession)
    expect(response.status).to.equal(200)
    var gaurav1231 = response.body.success.data.agenda.some(function (e) {
      return e.title == "tiger session 1";
    });
    console.log(gaurav1231, 'verify thius is true')
    expect(gaurav1231).to.equal(false)   
  });


  // it.only('Search Session with invalid name: POST /api/v2/sessions/get-sessions', (done) => {

  //   const SearchSession = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": "",
  //         "custom_tag": [],
  //         "isSendLiveAgenda": "NO",
  //         "search": "Wrong Name",
  //         "speakerIds": [],
  //         "time_zone": "Asia/Kolkata",
  //         "trackIds": [],
  //         "track_date": "",
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/get-sessions')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(SearchSession)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       var gaurav1231 = response.body.success.data.agenda.some(function (e) {
  //         return e.title == "tiger session 1";
  //       });
  //       console.log(gaurav1231, 'verify thius is true')
  //       expect(gaurav1231).to.equal(false)
  //       done();
  //     });
  // });

  //<---------------------- Search Tracks in filter in Session with  invalid name------------------>

  it.only('Search Tracks in filter in Session with Invalid name : POST /api/v2/filters/tag/list', async () => {

    const FilterSession = {
      "payload": {
        "data": {
          "limit": 10,
          "page": 1,
          "search": "Wrong Session Track",
          "type": "TRACKS"
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSession)
    var gaurav1231 = response.body.success.data.tags.some(function (e) {
      return e.name == "TRACK7";
    });
    console.log(gaurav1231, 'verify thius is true')
    expect(gaurav1231).to.equal(false)    

  });

  // it.only('Search Tracks in filter in Session with Invalid name : POST /api/v2/filters/tag/list', (done) => {

  //   const FilterSession = {
  //     "payload": {
  //       "data": {
  //         "limit": 10,
  //         "page": 1,
  //         "search": "Wrong Session Track",
  //         "type": "TRACKS"
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/filters/tag/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     // .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(FilterSession)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       var gaurav1231 = response.body.success.data.tags.some(function (e) {
  //         return e.name == "TRACK7";
  //       });
  //       console.log(gaurav1231, 'verify thius is true')
  //       expect(gaurav1231).to.equal(false)
  //       done();
  //     });
  // });

  //<----------------------Session More Info button -------------------------------->  

  it.only('Session More Info: POST /api/v2/sessions/live-agenda/get', async () => {

    const sessionmoreinfo = {
      "payload": {
        "data": {
          "agenda_id": sessionid1,

        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',sessionmoreinfo)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
    expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
    expect(response.body.success.data.title).to.equal("tiger session 1")
    noteid = (response.body.success.data.agendaId)
  });

  // it.only('Session More Info: POST /api/v2/sessions/live-agenda/get', (done) => {

  //   const sessionmoreinfo = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid1,

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/live-agenda/get')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     // .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     // .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     // .set('apikey', process.env.apikey)
  //     // .set('organiserid', environment.HOrganiserId)
  //     // .set('eventid', process.env.eventid)
  //     .send(sessionmoreinfo)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agendaInfo.streamLink).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
  //       expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //       expect(response.body.success.data.title).to.equal("tiger session 1")
  //       noteid = (response.body.success.data.agendaId)
  //       // console.log(noteid)
  //       done();
  //     });
  // });



  //<----------------------Add to My Schedule-------------------------------->  

  it('Add to My Schedule : POST /api/v2/sessions/my-schedule/add', async () => {

    const Addtoschedule =
    {
      "payload": {
        "data": {
          "agendaId": sessionid1,
          "tabIndex": 0
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/my-schedule/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',Addtoschedule);
  });

  // it('Add to My Schedule : POST /api/v2/sessions/my-schedule/add', (done) => {

  //   const Addtoschedule =
  //   {
  //     "payload": {
  //       "data": {
  //         "agendaId": sessionid1,
  //         "tabIndex": 0
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/my-schedule/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     // .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(Addtoschedule)
  //     .end((err, response) => {
  //       // consolelog(response)
  //       // expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  //<----------------------Remove from My Schedule  -------------------------------->  

  it('Remove From My Schedule : POST /api/v2/sessions/my-schedule/remove', async () => {

    const Addtoschedule =
    {
      "payload": {
        "data": {
          "agendaId": sessionid1,
          "tabIndex": 0
        }
      }
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/my-schedule/remove',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',Addtoschedule);
  });

  // it('Remove From My Schedule : POST /api/v2/sessions/my-schedule/remove', (done) => {

  //   const Addtoschedule =
  //   {
  //     "payload": {
  //       "data": {
  //         "agendaId": sessionid1,
  //         "tabIndex": 0
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/sessions/my-schedule/remove')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     // .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(Addtoschedule)
  //     .end((err, response) => {
  //       consolelog(response)
  //       // expect(response.status).to.equal(200)
  //       done();
  //     });
  // });


  //<----------------------Filter Session By date-------------------------------->  

  it.only('Filter Session By date : POST /api/v2/sessions/get-sessions', async () => {

    const FilterSessionByDate =
    {
      "payload": {
        "data": {
          "agenda_id": "",
          "custom_tag": [],
          "isSendLiveAgenda": "NO",
          "search": "",
          "speakerIds": [],
          "time_zone": "Asia/Calcutta",
          "trackIds": [],
          "track_date": "2021-06-24"
        }
      }
    }
    // console.log(FilterSessionByDate, 'Filter Session by date body')

    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource,'Content-Type' : 'application/json'},'post',FilterSessionByDate);
    expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
    expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
    expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
  });

  

  // it.only('Filter Session By date : POST /api/v2/sessions/get-sessions', (done) => {

  //   const FilterSessionByDate =
  //   {
  //     "payload": {
  //       "data": {
  //         "agenda_id": "",
  //         "custom_tag": [],
  //         "isSendLiveAgenda": "NO",
  //         "search": "",
  //         "speakerIds": [],
  //         "time_zone": "Asia/Calcutta",
  //         "trackIds": [],
  //         "track_date": "2021-06-24"
  //       }
  //     }
  //   }

  //   // console.log(FilterSessionByDate, 'Filter Session by date body')

  //   request3
  //     .post('/api/v2/sessions/get-sessions')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     // .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(FilterSessionByDate)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'Filter Session By date Response Body')
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.agenda[0].agendaInfo.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
  //       expect(response.body.success.data.agenda[0].agendaInfo.track_name).to.equal("TRACK7")
  //       expect(response.body.success.data.agenda[0].agendaInfo.is_stream).to.equal(1)
  //       expect(response.body.success.data.agenda[0].title).to.equal("tiger session 1")
  //       done();
  //     });
  // });

  //GET LIVE STATUS

  it('Get platform live status on reception: POST /api/v2/platformNew/live-status', async () => {

    const livestatus =
    {
      "payload": {}
    }

    var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/live-status',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',livestatus)
    expect(response.success.data.agendaIsLive).to.equal(true)
    expect(response.success.data.roomIsLive).to.equal(false)
  });

  // it('Get platform live status on reception: POST /api/v2/platformNew/live-status', (done) => {

  //   const livestatus =
  //   {
  //     "payload": {}
  //   }

  //   request3
  //     .post('/api/v2/platformNew/live-status')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(livestatus)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.success.data.agendaIsLive).to.equal(true)
  //       expect(response.success.data.roomIsLive).to.equal(false)
  //       done();
  //     });
  // });

  //Agenda live chat in community

  // it('200: POSITIVE Verify agendas on community: POST /api/v1/app/agenda_live_chat', (done) => {
  //   const request2 = supertest((process.env.eventurl.replace("http", "https")));

  it('200: POSITIVE Verify agendas on community: POST /api/v2/session/chat/create', (done) => {

    // const community585 = {

    //   "access_token": process.env.accesstoken,
    //   "api_key": process.env.apikey,
    //   "app_version": "1.0.0",
    //   "device_type": environment.Hdevicetype,
    //   "event_id": process.env.eventid,
    //   "organiser_id": environment.HOrganiserId,
    //   "agenda_id": sessionid1,
    //   "message": "test chat"

    // }

    const community585 =
    {
      "payload": {
        "data": {
          "message": "Hello gaurav",
          "moduleId": 21627,
          "type": "SESSION"
        }
      }
    }
    // console.log(community585, 'agenda join body')

    request3
      .post('/api/v2/sessions/live-agenda/get')
      .set('Authorization', process.env.accesstokenloginuser)
      // .set('devicetype', environment.Hdevicetype)
      .set('source', environment.HSource)
      .set('languageid', 34)
      // .set('accesstoken', process.env.accesstoken)
      .set('Content-Type', 'application/json')
      // .set('apikey', process.env.apikey)
      // .set('organiserid', environment.HOrganiserId)
      // .set('eventid', process.env.eventid)
      .send(community585)
      .end((err, response) => {
        // console.log(response.status)
        // console.log(response.body, '')
        expect(response.status).to.equal(200)
        done();
      });
  });

  //Agenda leave in community

  // it('200: POSITIVE Verify agendas on community: POST /api/v1/app/agenda_live_leave', (done) => {

  //   const request2 = supertest((process.env.eventurl.replace("http", "https")));

  //   const community586 = {

  //     "access_token": process.env.accesstoken,
  //     "api_key": process.env.apikey,
  //     "app_version": "1.0.0",
  //     "device_type": environment.Hdevicetype,
  //     "event_id": process.env.eventid,
  //     "organiser_id": environment.HOrganiserId,
  //     "agenda_id": sessionid1,
  //     "userLiveType": "LIVE"

  //   }

  //   // console.log(community586, 'agenda leave body')

  //   request2
  //     .post('/api/v1/app/agenda_live_leave')
  //     .set('devicetype', environment.Hdevicetype)
  //     .set('source', environment.HSource)
  //     .set('accesstoken', process.env.accesstoken)
  //     .set('Content-Type', 'application/json')
  //     .set('apikey', process.env.apikey)
  //     .set('organiserid', environment.HOrganiserId)
  //     .set('eventid', process.env.eventid)
  //     .send(community586)
  //     .end((err, response) => {
  //       // console.log(response.status)
  //       // console.log(response.body, 'agenda leave entered body')
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  it.only('Filter session by track in dashbaord: GET /backend/api/v2/events/agendas', async () => {
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'trackid':trackid }, 'get')
    expect(response.body.data.agendaList[0].name).to.equal('tiger session 1')
    expect(response.body.data.agendaList[0].track_name).to.equal('TRACK7')
    expect(response.body.data.agendaList[1].name).to.equal('lion session')
    expect(response.body.data.agendaList[1].track_name).to.equal('TRACK7')
  });

  it.only('Get Custom Tags in session dashbaord: GET  /backend/api/v2/agendas/customtags', async () => {
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/agendas/customtags', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data[0]).to.equal('tag')
    expect(response.body.data[1]).to.equal('virtual booth')
  });

  it.only('Filter session by custom tags in dashbaord: GET /backend/api/v2/events/agendas', async () => {
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'customtags':'tag' }, 'get')
    expect(response.body.data.agendaList[0].name).to.equal('lion session')
    expect(response.body.data.agendaList[0].track_name).to.equal('TRACK7')
  });


  it.only('Search session in dashbaord: GET /backend/api/v2/events/agendas', async () => {
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search':'lion session' }, 'get')
    expect(response.body.data.agendaList[0].name).to.equal('lion session')
    expect(response.body.data.agendaList[0].track_name).to.equal('TRACK7')
  });

  it.only('Search session by wrong name in dashbaord: GET /backend/api/v2/events/agendas', async () => {
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendas', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search':'wrongsession' }, 'get')
  });


  it.only('Verify Session in Event Analytics in dashbaord: GET /api/v1/analytics/session/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/session/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.totalSessions).to.equal(2)
    expect(response.body.data.totalTracks).to.equal(1)
    expect(response.body.data.totalViews).to.equal(2)
    expect(response.body.data.totalUniqueViews).to.equal(2)
    expect(response.body.data.avgUserRating).to.equal(5)
  });

  it.only('Verify Session wise stats in Event Analytics in dashbaord: POST /api/v1/analytics/sessionwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/sessionwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.total_count).to.equal(2)
    expect(response.body.data[0].name).to.equal('tiger session 1')
    expect(response.body.data[0].totalViews).to.equal(1)
    expect(response.body.data[1].name).to.equal('lion session')
    expect(response.body.data[1].totalViews).to.equal(1)
  });

  it.only('Verify Session wise top charts in Event Analytics in dashbaord: POST /api/v1/analytics/session/topcharts', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/session/topcharts', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.mostViewed.count).to.equal(1)
    expect(response.body.data.mostQandA.count).to.equal(1)
    expect(response.body.data.sessionData[0].name).to.equal('tiger session 1')
    expect(response.body.data.sessionData[1].name).to.equal('lion session')
  });

  it.only('Download Session Summary in Event Analytics in dashbaord: POST /api/v1/analytics/download/sessions/summary', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/sessions/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
  });

  it.only('Search Session wise stats in Event Analytics in dashbaord: POST /api/v1/analytics/sessionwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/sessionwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'tiger'}, 'post')
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('tiger session 1')
    expect(response.body.data[0].notes).to.equal(1)
    expect(response.body.data[0].QandA).to.equal(1)
  });

  it.only('Search Session wise stats with wrong session name in Event Analytics in dashbaord: POST /api/v1/analytics/sessionwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/sessionwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'wrongname'}, 'post')
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Download Individual Session Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/sessions/individual', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/sessions/individual', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'agendaid': sessionid1 }, 'get')
  });


  it.only('Download Individual Session Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/sessions/individual', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/sessions/individual', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'agendaid': sessionid2 }, 'get')
  });

  // GET SESSIONS

  it.only('Get Sessions : GET /backend/api/v2/events/agendas', async () => {

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendas',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    expect(response.body.data.agendaList[0].name).to.equal('tiger session 1');
    expect(response.body.data.agendaList[1].name).to.equal('lion session');
    ticketid1 = (response.body.data.agendaList[0].id)
    ticketid2 = (response.body.data.agendaList[1].id)
  });


  // DELETE SESSIONS

  it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : ticketid1},'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
  });


  it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : ticketid2},'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
  });


  it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
  });


  it.only('Add a speaker and sign', async () => {

    var people = new People();
    global.peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'speakermeeting1@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup])
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokenspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'speakermeeting1@yopmail.com', '1234')
  });


  it.only('Add new group : POST /backend/api/v2/events/groups', async () => {
    var headers = organizerUserHeader()
    headers['eventId'] = process.env.eventid
    headers['buildversion'] = process.env.buildversion
    const newgroup =
    {
      "data": {
        "name": "Test Group",
        "group_id": global.attendeegroup
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups', headers, 'post', newgroup)
    created_group_id = (response.body.data.group_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_add_message)
    expect(response.body.data.isCustom).to.equal("YES")
  })

  it.only('Add a people with custom group', async () => {

    var people = new People();
    global.custom_group_id = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'customgroup1@yopmail.com', 'custom', 'user', [created_group_id])
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokencustomgroup = await signup.loginWithOtp(global.accessTokenLoginPage, 'customgroup1@yopmail.com', '1234')
  });



  it.only('Add Virtual Booth : POST /backend/api/v2/events/booth/add', async () => {
    const virtual10 = {
        "data": {
            "booth_size": "SMALL",
            "category": "category",
            "is_featured": false,
            "is_rating": false,
            "multiple_file": [],
            "name": "Survey Booth",
            "position": 0,
            "email": "",
            "tags": "",
            "spotlight_banner_type": "IMAGE"
        }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', virtual10)
    global.virtualboothid1 = (response.body.data.ids.exhibitor_id)
  });

  it.only('Add a booth member', async () => {

    var people = new People('boothmember', global.virtualboothid1);
    global.boothmemberid = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'sessionuser@yopmail.com', 'OnboardingUser', 'boothmember', [global.boothmembergroup])
  });

  it.only('Sign in a booth member', async () => {

      var signup = new ComunitySignupLogin();
      global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
      global.accesstokenboothuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'sessionuser@yopmail.com', '1234')
  });


  it.only('Sign in as organizer', async () => {

    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokenorganizercommunityuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'hubilo_api@yopmail.com', '1234')
  });

  it.only('Add team member as an admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "apitest@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": true,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);
    console.log(response.body)
  });

  it.only('Get team member ID and login to community : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    team_member_userid = (response.body.data[0].user_id)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].email).to.equal('apitest@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('SUPER_ADMIN');
    var people = new People();
    tem_member_email_attendee_id = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'apitest@yopmail.com', 'TeamMember', 'user', [global.attendeegroup])
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokenteammeberuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'apitest@yopmail.com', '1234')

  });


  //Common function to test if all users can join youtube and vimeo session for upcoming, ended, live sessions

  const verifySesionByJoiningSessionWithDifferentUser = function( streamLink, streamTypeName, sessionTitle) {
    it.only('Verify ' + sessionTitle + ' join the streaming: POST /api/v2/sessions/live-agenda/get', async () => {

      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });
    
    it.only('Verify ' + sessionTitle + ' join the streaming with custom group: POST /api/v2/sessions/live-agenda/get', async () => {
    
      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });
    
    
    it.only('Verify ' + sessionTitle + ' join the streaming with speaker user: POST /api/v2/sessions/live-agenda/get', async () => {
    
      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });
    
    
    it.only('Verify ' + sessionTitle + ' join as booth member/exhibitor: POST /api/v2/sessions/live-agenda/get', async () => {
    
      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });
    
    it.only('Verify ' + sessionTitle + ' join as organizer: POST /api/v2/sessions/live-agenda/get', async () => {
    
      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenorganizercommunityuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });

    it.only('Verify ' + sessionTitle + ' join as team member: POST /api/v2/sessions/live-agenda/get', async () => {
    
      const community5844 = {
        "payload": {
          "data": {
            "agenda_id": global.sessionIdCommon,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenteammeberuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal(streamLink)
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
      expect(response.body.success.data.agendaId).to.equal(JSON.stringify(global.sessionIdCommon))
    });
  }

//Youtube stream session live session

  it.only('Create a session to check youtube streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()
    sessionid_youtube = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Youtube live Session','', '', 'Youtube Session Description', sessionStartTime, sessionEndTime)
  });

  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {
    var hosting_properties = "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]"
    var stream_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var stream_recording_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var session = new Session();
    var response = await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid, sessionid_youtube, hosting_properties, 0, 1, stream_link, stream_recording_link, 1)
    expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    global.sessionIdCommon = sessionid_youtube
  });

  it.only('Update a single speaker with all parameters and session details : PUT /backend/api/v2/people/single/edit', async () => {
    var people = new People();
    await people.updateSingleAttendee(organizerUserHeader(), process.env.eventid, global.peopleId, 'speakermeeting1@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [sessionid_youtube])
  })

  verifySesionByJoiningSessionWithDifferentUser('https://www.youtube.com/watch?v=RpxiptFOg5k', 'Youtube', 'Youtube live Session')

  //Youtube stream session future session

  it.only('Create a future session to check youtube streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 2)).getTime()
    var sessionStartTime = (addTime(new Date(), 1)).getTime()
    sessionid_youtube2 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Youtube Future Session','', '', 'Youtube Session Description', sessionStartTime, sessionEndTime)
  });

  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {
    var hosting_properties = "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]"
    var stream_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var stream_recording_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var session = new Session();
    var response = await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid, sessionid_youtube2, hosting_properties, 0, 1, stream_link, stream_recording_link, 1)
    expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    global.sessionIdCommon = sessionid_youtube2
  });

  it.only('Update a single speaker with all parameters and session details : PUT /backend/api/v2/people/single/edit', async () => {
    var people = new People();
    await people.updateSingleAttendee(organizerUserHeader(), process.env.eventid, global.peopleId, 'speakermeeting1@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [sessionid_youtube2])
  })

  verifySesionByJoiningSessionWithDifferentUser('https://www.youtube.com/watch?v=RpxiptFOg5k', 'Youtube', 'Youtube Future Session')

  //Youtube stream session past session

  it.only('Create a past session to check youtube streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), -1)).getTime()
    var sessionStartTime = (addTime(new Date(), -2)).getTime()
    sessionid_youtube3 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Youtube Past Session','', '', 'Youtube Session Description', sessionStartTime, sessionEndTime)
  });

  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {
    var hosting_properties = "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]"
    var stream_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var stream_recording_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
    var session = new Session();
    var response = await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid, sessionid_youtube3, hosting_properties, 0, 1, stream_link, stream_recording_link, 1)
    expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    global.sessionIdCommon = sessionid_youtube3
  });

  it.only('Update a single speaker with all parameters and session details : PUT /backend/api/v2/people/single/edit', async () => {
    var people = new People();
    await people.updateSingleAttendee(organizerUserHeader(), process.env.eventid, global.peopleId, 'speakermeeting1@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [sessionid_youtube3])
  })

  verifySesionByJoiningSessionWithDifferentUser('https://www.youtube.com/watch?v=RpxiptFOg5k', 'Youtube','Youtube Past Session')


  //Vimeo stream session live session

  it.only('Create a session to check vimeo streaming : POST /backend/api/v2/events/agendas', async () => {
      var session = new Session();
      var sessionEndTime = (addTime(new Date(), 1)).getTime()
      var sessionStartTime = new Date().getTime()
      sessionid_viemo= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Vimeo live Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
  });


  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_viemo,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://vimeo.com/253989945","https://vimeo.com/253989945",2)
  });

  it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 1)).getTime(),
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "Vimeo live Session",
        "speakers": [global.peopleId],
        "start_time_milli": new Date().getTime(),
        "tags": "tag,virtual booth,first"

      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_viemo},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
    global.sessionIdCommon = sessionid_viemo
  });

  verifySesionByJoiningSessionWithDifferentUser('https://vimeo.com/253989945', 'viemo', 'Vimeo live Session')

  //Vimeo stream session future session

  it.only('Create a future session to check vimeo streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 2)).getTime()
    var sessionStartTime = (addTime(new Date(), 1)).getTime()
    sessionid_viemo2 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Vimeo Future Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
  });


  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_viemo2,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://vimeo.com/253989945","https://vimeo.com/253989945",2)
  });

  it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), 2)).getTime(),
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "Vimeo Future Session",
        "speakers": [global.peopleId],
        "start_time_milli": (addTime(new Date(), 1)).getTime(),
        "tags": "tag,virtual booth,first"

      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_viemo2},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
    global.sessionIdCommon = sessionid_viemo2
  });

  verifySesionByJoiningSessionWithDifferentUser('https://vimeo.com/253989945', 'viemo', 'Vimeo Future Session')

  //Vimeo stream session past session

  it.only('Create a past session to check vimeo streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), -1)).getTime()
    var sessionStartTime = (addTime(new Date(), -2)).getTime()
    sessionid_viemo3 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Vimeo Past Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
  });


  it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_viemo3,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://vimeo.com/253989945","https://vimeo.com/253989945",2)
  });

  it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

    const customupdate =
    {
      "data": {
        "agenda_track_id": trackid,
        "banner": "",
        "booths": [],
        "description": "<p>tetst</p>",
        "end_time_milli": (addTime(new Date(), -1)).getTime(),
        "is_featured": 1,
        "is_rating": 1,
        "multiple_file": [],
        "name": "Vimeo Past Session",
        "speakers": [global.peopleId],
        "start_time_milli": (addTime(new Date(), -2)).getTime(),
        "tags": "tag,virtual booth,first"

      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_viemo3},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
    global.sessionIdCommon = sessionid_viemo3
  });

  verifySesionByJoiningSessionWithDifferentUser('https://vimeo.com/253989945', 'viemo', 'Vimeo Past Session')



// it.only('Update session stream settings with pre Recorded video  : POST /backend/api/v2/agendas/stream', async () => {

//   var session = new Session();
//   await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_viemo,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://vimeo.com/253989945","https://vimeo.com/253989945",2)
//   });

  const verifyPreRecordedSessionJoinByDifferentUser = function( sessionTitle){
    it.only('Verify ' + sessionTitle + ' into the streaming: POST /api/v2/sessions/live-agenda/get', async () => {
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });
  
  
    it.only('Verify ' + sessionTitle + ' into the streaming with custom group: POST /api/v2/sessions/live-agenda/get', async () => {
  
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });
  
    it.only('Verify ' + sessionTitle + ' into the streaming with speaker: POST /api/v2/sessions/live-agenda/get', async () => {
  
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });
  
    it.only('Verify ' + sessionTitle + ' into the streaming with boothmember: POST /api/v2/sessions/live-agenda/get', async () => {
  
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });
  
    it.only('Verify ' + sessionTitle + ' into the streaming with organizer : POST /api/v2/sessions/live-agenda/get', async () => {
  
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenorganizercommunityuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });

    it.only('Verify ' + sessionTitle + ' into the streaming with team member : POST /api/v2/sessions/live-agenda/get', async () => {
  
      const verify_pre_recorder = {
        "payload": {
          "data": {
            "agenda_id": pre_recorded_session_id_common,
            "is_stream": true
    
          }
        }
      }
    
      var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenteammeberuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
      expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid_common+".m3u8")
      expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
      expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
      expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
      expect(response.body.success.data.title).to.equal(sessionTitle)
    });

  }

  it.only('Create a session to check Pre Recorded video streaming : POST /api/v1/session/upload/video', async () => {
    var session = new Session();
      var sessionEndTime = (addTime(new Date(), 1)).getTime()
      var sessionStartTime = new Date().getTime()
      sessionid_pre_recorded= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Pre Recorded live Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
      pre_recorded_session_id_common = sessionid_pre_recorded
  });

  it.only('Upload pre recorded video : POST /api/v1/session/upload/video', async () => {

    const pre_recorded_video =
    {
      "data": {
        "fileInfo": {
          "name": "Network.mp4"
        },
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }

    var response = await sendRequest(environment.baseURL,'/api/v1/session/upload/video',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded},'post',pre_recorded_video)
    global.pre_recorded_uploadurl = (response.body.data.uploadUrl)
  });


  it.only('Upload video to aws upload url', function(done){
      const req = require('supertest')
      var awsHost = 'https://' + global.pre_recorded_uploadurl.split('/')[2]
      var awsUploadUrl = global.pre_recorded_uploadurl.substr(awsHost.length)
      const fs = require('fs')
      let testVideo = './images_branding/Network.mp4'
      req(awsHost).put(awsUploadUrl)
      .set('Content-Type','video/mp4')
      .send(fs.readFileSync(testVideo))
      .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
      });
  });

  it.only('Get pre recorder live link : POST /backend/api/v2/agendas/stream', async () => {
      
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid': sessionid_pre_recorded},'get')
    pre_recorded_mux_playbackid = (response.body.data.pre_recorded_mux_playback_id)
    pre_recorded_mux_playbackid_common = pre_recorded_mux_playbackid
    console.log(pre_recorded_mux_playbackid, 'playback id')
    expect(pre_recorded_mux_playbackid).to.not.be.empty;
    pre_recorded_live_link = (response.body.data.pre_recorded_live_link)
    expect(pre_recorded_live_link).to.not.be.empty;
    console.log(pre_recorded_live_link, 'live link')
  });


  it.only('Save session stream settings pre recorded video on demand recording toogle on : POST /backend/api/v2/agendas/stream', async () => {
    const pre_recorded_video = 
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 6,
        "stream_link": "",
        "stream_recording_link": "",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }


    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded},'post',pre_recorded_video)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    expect(response.body.data.is_support_pre_recorded_live).to.equal(1)
    expect(response.body.data.pre_recorded_is_replay_video).to.equal(1)
  });

  it.only('Get pre recorder live link : POST /backend/api/v2/agendas/stream', async () => {
    
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid': sessionid_pre_recorded},'get')
    pre_recorded_mux_playbackid = (response.body.data.pre_recorded_mux_playback_id)
    console.log(pre_recorded_mux_playbackid, 'playback id')
    pre_recorded_live_link = (response.body.data.pre_recorded_live_link)
    console.log(pre_recorded_live_link, 'live link')
  });


  verifyPreRecordedSessionJoinByDifferentUser( 'Pre Recorded live Session')


  // it.only('Verify Pre Recorded video live sessions into the streaming: POST /api/v2/sessions/live-agenda/get', async () => {

  //   const verify_pre_recorder = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid_pre_recorded,
  //         "is_stream": true
  
  //       }
  //     }
  //   }
  
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
  //   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //   expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
  //   expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
  //   expect(response.body.success.data.title).to.equal("Pre Recorded Session")
  // });


  // it.only('Verify Pre Recorded video live sessions into the streaming with custom group: POST /api/v2/sessions/live-agenda/get', async () => {

  //   const verify_pre_recorder = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid_pre_recorded,
  //         "is_stream": true
  
  //       }
  //     }
  //   }
  
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
  //   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //   expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
  //   expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
  //   expect(response.body.success.data.title).to.equal("Pre Recorded Session")
  // });

  // it.only('Verify Pre Recorded video live sessions into the streaming with speaker: POST /api/v2/sessions/live-agenda/get', async () => {

  //   const verify_pre_recorder = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid_pre_recorded,
  //         "is_stream": true
  
  //       }
  //     }
  //   }
  
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
  //   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //   expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
  //   expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
  //   expect(response.body.success.data.title).to.equal("Pre Recorded Session")
  // });

  // it.only('Verify Pre Recorded video live sessions into the streaming with boothmember: POST /api/v2/sessions/live-agenda/get', async () => {

  //   const verify_pre_recorder = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid_pre_recorded,
  //         "is_stream": true
  
  //       }
  //     }
  //   }
  
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
  //   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //   expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
  //   expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
  //   expect(response.body.success.data.title).to.equal("Pre Recorded Session")
  // });

  // it.only('Verify Pre Recorded video live sessions into the streaming with organizer : POST /api/v2/sessions/live-agenda/get', async () => {

  //   const verify_pre_recorder = {
  //     "payload": {
  //       "data": {
  //         "agenda_id": sessionid_pre_recorded,
  //         "is_stream": true
  
  //       }
  //     }
  //   }
  
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenorganizercommunityuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',verify_pre_recorder)
  //   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
  //   expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  //   expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
  //   expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(1)
  //   expect(response.body.success.data.title).to.equal("Pre Recorded Session")
  // });

  //Pre-recorded future session


it.only('Create a session to check Pre Recorded video streaming : POST /api/v1/session/upload/video', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 2)).getTime()
   var sessionStartTime = (addTime(new Date(), 1)).getTime()
   sessionid_pre_recorded2 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Pre Recorded Future Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
   pre_recorded_session_id_common = sessionid_pre_recorded2
});

  it.only('Upload pre recorded video : POST /api/v1/session/upload/video', async () => {

    const pre_recorded_video =
    {
      "data": {
        "fileInfo": {
          "name": "Network.mp4"
        },
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }

    var response = await sendRequest(environment.baseURL,'/api/v1/session/upload/video',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded2},'post',pre_recorded_video)
    global.pre_recorded_uploadurl = (response.body.data.uploadUrl)
  });


  it.only('Upload video to aws upload url', function(done){
      const req = require('supertest')
      var awsHost = 'https://' + global.pre_recorded_uploadurl.split('/')[2]
      var awsUploadUrl = global.pre_recorded_uploadurl.substr(awsHost.length)
      const fs = require('fs')
      let testVideo = './images_branding/Network.mp4'
      req(awsHost).put(awsUploadUrl)
      .set('Content-Type','video/mp4')
      .send(fs.readFileSync(testVideo))
      .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
      });
  });

  it.only('Save session stream settings pre recorded video on demand recording toogle on : POST /backend/api/v2/agendas/stream', async () => {
    const pre_recorded_video = 
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 6,
        "stream_link": "",
        "stream_recording_link": "",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }


    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded2},'post',pre_recorded_video)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    expect(response.body.data.is_support_pre_recorded_live).to.equal(1)
    expect(response.body.data.pre_recorded_is_replay_video).to.equal(1)
  });

  it.only('Get pre recorder live link : POST /backend/api/v2/agendas/stream', async () => {
      
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid': sessionid_pre_recorded2},'get')
    pre_recorded_mux_playbackid = (response.body.data.pre_recorded_mux_playback_id)
    pre_recorded_mux_playbackid_common = pre_recorded_mux_playbackid
    console.log(pre_recorded_mux_playbackid, 'playback id')
    expect(pre_recorded_mux_playbackid).to.not.be.empty;
    pre_recorded_live_link = (response.body.data.pre_recorded_live_link)
    expect(pre_recorded_live_link).to.not.be.empty;
    console.log(pre_recorded_live_link, 'live link')
  });

  verifyPreRecordedSessionJoinByDifferentUser('Pre Recorded Future Session')


  //Pre-recorded past session


  it.only('Create a session to check Pre Recorded video streaming : POST /api/v1/session/upload/video', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), -1)).getTime()
    var sessionStartTime = (addTime(new Date(), -2)).getTime()
    sessionid_pre_recorded3 = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Pre Recorded Past Session','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
    pre_recorded_session_id_common = sessionid_pre_recorded3
  });

  it.only('Upload pre recorded video : POST /api/v1/session/upload/video', async () => {

    const pre_recorded_video =
    {
      "data": {
        "fileInfo": {
          "name": "Network.mp4"
        },
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }

    var response = await sendRequest(environment.baseURL,'/api/v1/session/upload/video',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded3},'post',pre_recorded_video)
    global.pre_recorded_uploadurl = (response.body.data.uploadUrl)
  });


  it.only('Upload video to aws upload url', function(done){
      const req = require('supertest')
      var awsHost = 'https://' + global.pre_recorded_uploadurl.split('/')[2]
      var awsUploadUrl = global.pre_recorded_uploadurl.substr(awsHost.length)
      const fs = require('fs')
      let testVideo = './images_branding/Network.mp4'
      req(awsHost).put(awsUploadUrl)
      .set('Content-Type','video/mp4')
      .send(fs.readFileSync(testVideo))
      .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
      });
  });

  it.only('Save session stream settings pre recorded video on demand recording toogle on : POST /backend/api/v2/agendas/stream', async () => {
    const pre_recorded_video = 
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 6,
        "stream_link": "",
        "stream_recording_link": "",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }


    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded3},'post',pre_recorded_video)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    expect(response.body.data.is_support_pre_recorded_live).to.equal(1)
    expect(response.body.data.pre_recorded_is_replay_video).to.equal(1)
  });

  it.only('Get pre recorder live link : POST /backend/api/v2/agendas/stream', async () => {
      
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid': sessionid_pre_recorded3},'get')
    pre_recorded_mux_playbackid = (response.body.data.pre_recorded_mux_playback_id)
    pre_recorded_mux_playbackid_common = pre_recorded_mux_playbackid
    console.log(pre_recorded_mux_playbackid, 'playback id')
    expect(pre_recorded_mux_playbackid).to.not.be.empty;
    pre_recorded_live_link = (response.body.data.pre_recorded_live_link)
    expect(pre_recorded_live_link).to.not.be.empty;
    console.log(pre_recorded_live_link, 'live link')
  });

  verifyPreRecordedSessionJoinByDifferentUser('Pre Recorded Past Session')


  it.only('Save session stream settings pre recorded video on demand recording toogle on : POST /backend/api/v2/agendas/stream', async () => {
    const pre_recorded_video = 
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 6,
        "stream_link": "",
        "stream_recording_link": "",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 1
      }
    }


    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded},'post',pre_recorded_video)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    expect(response.body.data.is_support_pre_recorded_live).to.equal(1)
    expect(response.body.data.pre_recorded_is_replay_video).to.equal(1)
  });

  it.only('Get pre recorder live link : POST /backend/api/v2/agendas/stream', async () => {
    
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid': sessionid_pre_recorded},'get')
    pre_recorded_mux_playbackid = (response.body.data.pre_recorded_mux_playback_id)
    console.log(pre_recorded_mux_playbackid, 'playback id')
    pre_recorded_live_link = (response.body.data.pre_recorded_live_link)
    console.log(pre_recorded_live_link, 'live link')
  });


  it.only('Save session stream settings pre recorded video on demand recording toogle off : POST /backend/api/v2/agendas/stream', async () => {
    const pre_recorded_video = 
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 6,
        "stream_link": "",
        "stream_recording_link": "",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "pre_recorded_is_replay_video": 0
      }
    }


    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded},'post',pre_recorded_video)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    expect(response.body.data.is_support_pre_recorded_live).to.equal(1)
    expect(response.body.data.pre_recorded_is_replay_video).to.equal(0)
  });

  it.only('Verify Pre Recorded video session on demand recording toogle off: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_pre_recorded,
          "is_stream": true
  
        }
      }
    }
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
    expect(response.body.success.data.agendaInfo.preRecordedLiveM3u8Link).to.equal("https://stream.mux.com/"+pre_recorded_mux_playbackid+".m3u8")
    expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(6)
    expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(0)
    expect(response.body.success.data.title).to.equal("Pre Recorded live Session")
  });


  it.only('Delete pre recorded video : POST /api/v1/session/upload/delete', async () => {
   
    var response = await sendRequest(environment.baseURL,'/api/v1/session/upload/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_pre_recorded},'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Video_delete)
  });


  it.only('login to admin dashboard: POST /backend/api/v2/auth/login', async () => {
    const login1 =
    {
      "email": "hrt7809@gmail.com",
      "password": "hrt12345"
    }
    var response = await sendRequest(environment.baseURL6, ApiEndPoints.Adminloginurl, { 'Content-Type': 'application/json' }, 'post', login1)
    // global.token = (response.body.token)
    if (response.body.token != undefined){
global.token = response.body.token
}
else{
global.token = response.body.data.accessToken
}
  })

  it.only('Get event details in admin dashboard:  ', async () => {
   

    var response = await sendRequest(environment.baseURL5, `/backend/api/v1/organisations/${environment.HOrganiserId}/events/${process.env.eventid}`, { 'Authorization' : 'Bearer ' + global.token, 'buildversion': '1.2' }, 'get')
    global.timezonid = (response.body.data.timezone_id)
    global.start_time = (response.body.data.start_time)
    global.end_time = (response.body.data.end_time)
  })

  it.only('Update event info with JWT token in admin dashboard:  ', async () => {

    const update_info =
    {
      "data": {
        "timezone_id": global.timezonid,
        "platform_template_id": null,
        "is_powered_by": 1,
        "type": "VIRTUAL",
        "opt_phy_meet": 0,
        "canHidePoweredBy": false,
        "start_time": global.start_time,
        "end_time": global.end_time,
        "is_networking_lounge": 1,
        "is_webapp_multiskin_support": 1,
        "is_support_pre_recorded_live": 1,
        "is_product_tour": 1,
        "is_support_room_recording": "YES",
        "max_lounge_tables": 20,
        "is_exhibitor_table": "YES",
        "max_exhibitor_meetings": 100,
        "is_zoom_token": 1,
        "zoom_token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q",
        "adminAttendeeTableCapacityOptions": "2,4,8,16",
        "adminExhibitorTableCapacityOptions": "2,4,8,16",
        "adminSponsorTableCapacityOptions": "2,4",
        "adminLoungeVideoProvider": "AGORA",
        "adminMeetingProvider": "AGORA",
        "community_version": 2,
        "is_sponsor_table": "NO",
        "max_sponsor_meetings": 100,
        "is_single_device_login": 0,
        "is_zoom_popup": 0,
        "networking_slot_duration": 15,
        "is_new_exhibitor_list": 1,
        "is_exhibitor_central": 0,
        "exhibitor_product_image_label": "Product/Services",
        "sponsor_product_image_label": "Product/Services",
        "is_new_agenda_list": "YES",
        "is_mux": 1,
        "showMeetingFeedback": "YES",
        "showLoungeFeedback": "YES",
        "showRoomFeedback": "NO"
      }
    }
   

    var response = await sendRequest(environment.baseURL5, `/backend/api/v1/events/${process.env.eventid}/info`, { 'Authorization' : 'Bearer ' + global.token, 'buildversion': '1.2'}, 'put', update_info)
    global.timezonid = (response.body.data.timezone_id)
    global.start_time = (response.body.data.start_time)
    global.end_time = (response.body.data.end_time)
  })

  it.only('Add webinars host:  ', async () => {

   const webinars_host =
   {
    "data": {
      "first_name": "srinivas",
      "last_name": "kantipudi",
      "email": "srinivas.kantipudi@hubilo.com",
      "attendees_count": 100
    }
  }
   

    var response = await sendRequest(environment.baseURL5, `/backend/api/v1/organisations/${environment.HOrganiserId}/events/${process.env.eventid}/webinars`, { 'Authorization' : 'Bearer ' + global.token, 'buildversion': '1.2' }, 'post',webinars_host)
    global.webinars_host_id = (response.body.data.ids.webinar_host_id)
  })

  it.only('Create a session to check zoom meeting streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
     var sessionEndTime = (addTime(new Date(), 1)).getTime()
     var sessionStartTime =(addTime(new Date(), 1)).getTime()
     sessionid_zoom= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Zoom Session Test','', '', 'Zoom Session Description', sessionStartTime, sessionEndTime)
});


it.only('Update session stream settings for zoom meeting stream : POST /backend/api/v2/agendas/stream', async () => {

  const session1211 =
  {
    "data": {
      "is_stream": 1,
      "stream_type_id": 4,
      "stream_link": "",
      "stream_recording_link": "",
      "is_moderate_qna": 0,
      "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
      "is_closed_caption_on": 0,
      "stream_subtype_id": 1,
      "webinar_host_id": global.webinars_host_id
    }
  }

  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_zoom},'post',session1211)
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
  global.rtmp_url =(response.body.data.rtmp_url)
  global.join_link =(response.body.data.join_link)
  global.start_link =(response.body.data.start_link)
  global.stream_key =(response.body.data.stream_key)
  global.stream_link =(response.body.data.stream_link)
});

it.only('Verify zoom meeting: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Session Description")
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
});


it.only('Verify zoom meeting with custom group: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Session Description")
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
});


it.only('Verify zoom meeting with speaker user: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Session Description")
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
});

it.only('Verify zoom meeting with booth member/exhibitor: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Session Test")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Session Description")
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
});

it.only('Create a session to check zoom webinar streaming : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 3)).getTime()
   var sessionStartTime = (addTime(new Date(), 2)).getTime()
   sessionid_zoom_webinar= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Zoom Webinar','', '', 'Zoom Webinar Description', sessionStartTime, sessionEndTime)
});

it.only('Get the list of host : POST /backend/api/v2/events/hosts', async () => {

 
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/hosts',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit': '15','page':environment.HPage},'post')
  hostid_zoomwebinar = (response.body.data[0].id)
  expect(response.body.data[0].email).to.equal("srinivas.kantipudi@hubilo.com")
});


it.only('Update session stream settings for zoom webinar : POST /backend/api/v2/agendas/stream', async () => {

  const session1211 =
  {
    "data": {
      "is_stream": 1,
      "stream_type_id": 5,
      "stream_recording_link": "",
      "webinar_host_id":  hostid_zoomwebinar
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_zoom_webinar},'post',session1211)
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
  global.join_link_webinar =(response.body.data.join_link)
  global.start_link_webinar =(response.body.data.start_link)
});


it.only('Verify zoom meeting webinar: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom_webinar,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Webinar Description")
});

it.only('Verify zoom meeting webinar with custom group: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom_webinar,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Webinar Description")
});

it.only('Verify zoom meeting webinar with speaker user: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom_webinar,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Webinar Description")
});

it.only('Verify zoom meeting webinar with speaker user: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_zoom_webinar,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.title).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.name).to.equal("Zoom Webinar")
  expect(response.body.success.data.agendaInfo.description).to.equal("Zoom Webinar Description")
});


it.only('Create a session to check external encoder streaming : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 1)).getTime()
   var sessionStartTime = new Date().getTime()
   sessionid_external_encoder= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'external encoder','', '', 'external encoder Description', sessionStartTime, sessionEndTime)
});


it.only('Update session stream settings for external encoder streaming : POST /backend/api/v2/agendas/stream', async () => {

  const session1211 =
  {
    "data": {
      "is_stream": 1,
      "stream_type_id": 4,
      "stream_link": "",
      "stream_recording_link": "https://www.youtube.com/watch?v=t0Q2otsqC4I",
      "is_moderate_qna": 0,
      "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
      "is_closed_caption_on": 0,
      "stream_subtype_id": 2
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/stream',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_external_encoder},'post',session1211)
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
  global.rtmp_url =(response.body.data.rtmp_url)
  global.stream_key_external =(response.body.data.stream_key)
  global.stream_link_external =(response.body.data.stream_link)
});


it.only('Verify external encoder streaming: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_external_encoder,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.agendaInfo.streamLink).to.equal(global.stream_link_external)
  expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=t0Q2otsqC4I")
  expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
  expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(0)
  expect(response.body.success.data.title).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.name).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.description).to.equal("external encoder Description")
});

it.only('Verify external encoder streaming with custom group: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_external_encoder,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' :global.accesstokencustomgroup, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.agendaInfo.streamLink).to.equal(global.stream_link_external)
  expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=t0Q2otsqC4I")
  expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
  expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(0)
  expect(response.body.success.data.title).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.name).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.description).to.equal("external encoder Description")
});

it.only('Verify external encoder streaming with speaker group: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_external_encoder,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' :global.accesstokenspeakeruser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.agendaInfo.streamLink).to.equal(global.stream_link_external)
  expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=t0Q2otsqC4I")
  expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
  expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(0)
  expect(response.body.success.data.title).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.name).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.description).to.equal("external encoder Description")
});

it.only('Verify external encoder streaming with join as booth member/exhibitor: POST /api/v2/sessions/live-agenda/get', async () => {

  const community5844 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_external_encoder,
        "is_stream": true

      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' :global.accesstokenboothuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community5844)
  expect(response.body.success.data.agendaInfo.streamLink).to.equal(global.stream_link_external)
  expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=t0Q2otsqC4I")
  expect(response.body.success.data.agendaInfo.isStream).to.equal(1)
  expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(4)
  expect(response.body.success.data.agendaInfo.preRecordedIsReplayVideo).to.equal(0)
  expect(response.body.success.data.title).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.name).to.equal("external encoder")
  expect(response.body.success.data.agendaInfo.description).to.equal("external encoder Description")
});

it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : sessionid_zoom},'post')
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
});


it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : sessionid_zoom_webinar},'post')
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
});



  it.only('Create a session to check stream source as other stream: POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = (addTime(new Date(), 1)).getTime()
    sessionid_other_stream = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Other Stream Test', '', '', 'Other Stream Test Description', sessionStartTime, sessionEndTime)
  });


  it.only('Update session stream settings for stream source as other stream : POST /backend/api/v2/agendas/stream', async () => {

    const session1211 =
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 3,
        "stream_link": "https://www.youtube.com/watch?v=Fu3MIwF-LJw",
        "stream_recording_link": "https://www.youtube.com/watch?v=Fu3MIwF-LJw",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/agendas/stream', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'agendaid': sessionid_other_stream }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
    global.stream_link_other = (response.body.data.stream_link)
  });

  it.only('Verify stream source as other stream join as attendee: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_other_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.name).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.description).to.equal("Other Stream Test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(3)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
  });


  it.only('Join other stream source Session with speaker: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_other_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.name).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.description).to.equal("Other Stream Test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(3)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
  });

  it.only('Verify stream source as other stream join as booth member/exhibitor: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_other_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.name).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.description).to.equal("Other Stream Test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(3)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
  });

  it.only('Join other stream source Session with custom group user: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_other_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokencustomgroup, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.name).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.description).to.equal("Other Stream Test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(3)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
  });

  it.only('Create a session to check engagement options: POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = (addTime(new Date(), 1)).getTime()
    sessionid_engagement_options_stream = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Youtube Session', '', '', 'Youtube Session test Description', sessionStartTime, sessionEndTime)
  });


  it.only('Update session stream settings of engagement options session : POST /backend/api/v2/agendas/stream', async () => {

    const session1211 =
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 1,
        "stream_link": "https://www.youtube.com/watch?v=Fu3MIwF-LJw",
        "stream_recording_link": "https://www.youtube.com/watch?v=Fu3MIwF-LJw",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/agendas/stream', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'agendaid': sessionid_engagement_options_stream }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message);
    global.stream_link_other = (response.body.data.stream_link)
  });

  it.only('Get list of engagement options in session : POST /api/v2/engagement/list', async () => {

    
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken,'type':'session','type_id':sessionid_engagement_options_stream }, 'get')
    global.Live_Chat_id = getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].id")
    global.Polls_id = getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].id")
    global.QnA_id = getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Q&A')].id")
    global.Attendees_id = getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Attendees')].id")
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_visible")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].is_visible")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_default")).to.equal(1)
  });


  it.only('Verify engagement options with attendee : POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_engagement_options_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.name).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.description).to.equal("Youtube Session test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].orderIndex")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].engagementMetaName")).to.equal("Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].orderIndex")).to.equal(2)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].engagementMetaName")).to.equal("Polls")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].orderIndex")).to.equal(3)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].engagementMetaName")).to.equal("QnA")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].name")).to.equal("Attendees")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].orderIndex")).to.equal(4)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].engagementMetaName")).to.equal("Attendees List")
  });

  it.only('Disable live engagement option from session : POST /api/v2/engagement/status', async () => {

    const session1211 =
    {
      "data": {
        "id": global.Live_Chat_id,
        "is_visible": 0
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/status', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_App_disbale_message);
  });

  it.only('Verify list of engagement options in dashboard : POST /api/v2/engagement/list', async () => {

    
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken,'type':'session','type_id':sessionid_engagement_options_stream }, 'get')
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].is_visible")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_default")).to.equal(1)
  });


  it.only('Verify engagement options with attendee: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_engagement_options_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.name).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.description).to.equal("Youtube Session test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].name")).to.not.equal("Live Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].orderIndex")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].engagementMetaName")).to.not.equal("Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].orderIndex")).to.equal(2)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].engagementMetaName")).to.equal("Polls")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].orderIndex")).to.equal(3)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].engagementMetaName")).to.equal("QnA")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].orderIndex")).to.equal(4)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].engagementMetaName")).to.equal("Attendees List")
  });

  it.only('Disable polls engagement option from session : POST /api/v2/engagement/status', async () => {

    const session1211 =
    {
      "data": {
        "id":  global.Polls_id,
        "is_visible": 0
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/status', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_App_disbale_message);
  });

  it.only('Verify list of engagement options in dashboard : POST /api/v2/engagement/list', async () => {

    
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken,'type':'session','type_id':sessionid_engagement_options_stream }, 'get')
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_default")).to.equal(1)
  });

  it.only('Verify engagement options with attendee polls engagement option as disable: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_engagement_options_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.name).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.description).to.equal("Youtube Session test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].name")).to.not.equal("Live Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].orderIndex")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].engagementMetaName")).to.not.equal("Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].orderIndex")).to.not.equal(2)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].engagementMetaName")).to.not.equal("Polls")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].orderIndex")).to.equal(3)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].engagementMetaName")).to.equal("QnA")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].orderIndex")).to.equal(4)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].engagementMetaName")).to.equal("Attendees List")
  });

  it.only('Disable Q&A engagement option from session : POST /api/v2/engagement/status', async () => {

    const session1211 =
    {
      "data": {
        "id":  global.QnA_id,
        "is_visible": 0
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/status', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_App_disbale_message);
  });

  it.only('Verify list of engagement options in dashboard disable for Live Chat/Polls/Q&A : POST /api/v2/engagement/list', async () => {

    
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken,'type':'session','type_id':sessionid_engagement_options_stream }, 'get')
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Q&A')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_default")).to.equal(1)
  });

  it.only('Verify engagement options with attendee Q&A engagement option as disable: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_engagement_options_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.name).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.description).to.equal("Youtube Session test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].name")).to.not.equal("Live Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].orderIndex")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].engagementMetaName")).to.not.equal("Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].orderIndex")).to.not.equal(2)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].engagementMetaName")).to.not.equal("Polls")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].orderIndex")).to.not.equal(3)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].engagementMetaName")).to.not.equal("QnA")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].isDefault")).to.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].orderIndex")).to.equal(4)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].engagementMetaName")).to.equal("Attendees List")
  });

  it.only('Disable Attendees engagement option from session : POST /api/v2/engagement/status', async () => {

    const session1211 =
    {
      "data": {
        "id":  global.Attendees_id,
        "is_visible": 0
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/status', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, }, 'post', session1211)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_App_disbale_message);
  });

  
  it.only('Verify list of engagement options in dashboard disable for Live Chat/Polls/Q&A : POST /api/v2/engagement/list', async () => {

    
    var response = await sendRequest(environment.baseURL, '/api/v2/engagement/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken,'type':'session','type_id':sessionid_engagement_options_stream }, 'get')
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Polls')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Q&A')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Attendees')].is_visible")).to.equal(0)
    expect(getValueFromJsonObject(response.body, "$.data.list[?(@.name=='Live Chat')].is_default")).to.equal(1)
  });


  it.only('Verify engagement options with attendees section engagement option as disable: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_engagement_options_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.name).to.equal("Youtube Session")
    expect(response.body.success.data.agendaInfo.description).to.equal("Youtube Session test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(1)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].name")).to.not.equal("Live Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].orderIndex")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Live Chat')].engagementMetaName")).to.not.equal("Chat")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].orderIndex")).to.not.equal(2)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Polls')].engagementMetaName")).to.not.equal("Polls")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].orderIndex")).to.not.equal(3)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Q&A')].engagementMetaName")).to.not.equal("QnA")
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].isDefault")).to.not.equal(1)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].orderIndex")).to.not.equal(4)
    expect(getValueFromJsonObject(response.body, "$.success.data.engagements[?(@.name=='Attendees')].engagementMetaName")).to.not.equal("Attendees List")
  });


  it.only('Login as host', async () => {

    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    accesstoken_host = await signup.loginWithOtp(global.accessTokenLoginPage, 'hubilo_api@yopmail.com', '1234')
  });


  it.only('Verify stream source as other stream join as host: POST /api/v2/sessions/live-agenda/get', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "agenda_id": sessionid_other_stream,
          "is_stream": true

        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.title).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.name).to.equal("Other Stream Test")
    expect(response.body.success.data.agendaInfo.description).to.equal("Other Stream Test Description")
    expect(response.body.success.data.agendaInfo.streamTypeId).to.equal(3)
    expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
    expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://www.youtube.com/watch?v=Fu3MIwF-LJw")
  });


  it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
  });

  it.only('Create a session to check Hubilo BroadCast Studio streaming : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()
    sessionid_hbs = await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Hubilo Broad Cast Studio', '', '', 'Hubilo Broad Cast studio Description', sessionStartTime, sessionEndTime)
  });

  it.only('Get Studio host list', async () => {


    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/studiohost/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': '15' }, 'post')
    studio_host_id = (response.body.data[0].userId)
    expect(response.body.data[0].email).to.equal("hubilo_api@yopmail.com")
  });

  it.only('Update session stream settings for HBS Session : POST /backend/api/v2/agendas/stream', async () => {

    const session121 =
    {
      "data": {
        "is_stream": 1,
        "stream_type_id": 4,
        "stream_link": "",
        "stream_recording_link": "https://www.youtube.com/watch?v=t0Q2otsqC4I",
        "is_moderate_qna": 0,
        "hosting_properties": "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"YES\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"YES\"}]",
        "is_closed_caption_on": 0,
        "stream_subtype_id": 3,
        "studio_host_id": studio_host_id
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/agendas/stream', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'agendaid': sessionid_hbs }, 'post', session121)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_HBS_message);
    hbs_session_rtmp_url = (response.body.data.rtmp_url)
    hbs_session_stream_key = (response.body.data.stream_key)
    hbs_session_stream_link = (response.body.data.stream_link)
    hbs_session_studio_link = (response.body.data.studio_link)
  });

  it.only('Login as host', async () => {

    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    accesstoken_host = await signup.loginWithOtp(global.accessTokenLoginPage, 'hubilo_api@yopmail.com', '1234')
  });



  it.only('Get hbs agenda: POST /api/v2/hbs/get-agenda', async () => {

    const community5844 = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "sessionId": sessionid_hbs
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/get-agenda', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.userType).to.equal("HOST")
    expect(response.body.success.data.agenda.name).to.equal("Hubilo Broad Cast Studio")
    expect(response.body.success.data.agenda.description).to.equal("Hubilo Broad Cast studio Description")
    expect(response.body.success.data.engagements[0].name).to.equal("Live Chat")
    expect(response.body.success.data.engagements[0].engagementMetaName).to.equal("Chat")
    expect(response.body.success.data.engagements[1].name).to.equal("Polls")
    expect(response.body.success.data.engagements[1].engagementMetaName).to.equal("Polls")
    expect(response.body.success.data.engagements[2].name).to.equal("Q&A")
    expect(response.body.success.data.engagements[2].engagementMetaName).to.equal("QnA")
    expect(response.body.success.data.engagements[3].name).to.equal("Attendees")
    expect(response.body.success.data.engagements[3].engagementMetaName).to.equal("Attendees List")
  });

  it.only('Test meeting call in hbs agenda: POST /api/v2/hbs/test-meeting', async () => {

    const community5844 = { "payload": { "data": {} } }

    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/test-meeting', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community5844)
    expect(response.body.success.data.meeting.MediaRegion).to.equal("ap-south-1")
  });


  it.only('Join HBS session as host: POST /api/v2/hbs/join', async () => {

    const join_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "agendaId": sessionid_hbs,
          "userName": "SHubilo",
          "audioEnabled": true,
          "videoEnabled": false,
          "schreenShareEnabled": false
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/join', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', join_hbs)
    // expect(response.body.success.data.meeting.MediaRegion).to.equal("ap-south-1")
    broadcast_studio_id = (response.body.success.data.broadcastStudio._id)
    external_user_id = (response.body.success.data.chimeAttendee.ExternalUserId)
  });

  it.only('Video in HBS session: POST /api/v2/hbs/videos', async () => {

    const join_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "broadcastStudioId": broadcast_studio_id,
          "currentPage": 1,
          "limit": 5
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/videos', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', join_hbs)
    // expect(response.body.success.data.meeting.MediaRegion).to.equal("ap-south-1")
  });


  it.only('Add host as member to stream: POST /api/v2/hbs/add-member', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "agendaId": sessionid_hbs,
          "attendeeId": external_user_id
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/add-member', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_Add_Member_message);
    expect(response.body.success.data.panelMember.userType).to.equal("HOST")
    expect(response.body.success.data.panelMember.onStream).to.equal(true)
  });

  it.only('Update stream layout as presenter view with padding: POST /api/v2/hbs/update', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id,
          "streamLayout": 2
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.code).to.equal("HBS_UPDATED")
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_update_message);
    expect(response.body.success.data.broadcastStudio.streamLayout).to.equal(2)
    expect(response.body.success.data.broadcastStudio.is_powered_by).to.equal(1)
  });

  it.only('Update stream layout as presenter view with frame: POST /api/v2/hbs/update', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id,
          "streamLayout": 3
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.code).to.equal("HBS_UPDATED")
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_update_message);
    expect(response.body.success.data.broadcastStudio.streamLayout).to.equal(3)
    expect(response.body.success.data.broadcastStudio.is_powered_by).to.equal(1)
  });


  it.only('Update stream layout as spotlight presenter view: POST /api/v2/hbs/update', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "organiser_id": environment.HOrganiserId,
          "event_id": process.env.eventid,
          "app_version": "1.0.0",
          "device_type": "WEB",
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id,
          "streamLayout": 4
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.code).to.equal("HBS_UPDATED")
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_update_message);
    expect(response.body.success.data.broadcastStudio.streamLayout).to.equal(4)
    expect(response.body.success.data.broadcastStudio.is_powered_by).to.equal(1)
  });

  // it.only('Start streaming in HBS : POST /api/v2/hbs/start-streaming', async () => {

  //   const add_member_hbs = {
  //     "payload": {
  //       "data": {
  //         "organiser_id": environment.HOrganiserId,
  //         "event_id": process.env.eventid,
  //         "app_version": "1.0.0",
  //         "device_type": "WEB",
  //         "agendaId": sessionid_hbs,
  //         "broadcastStudioId": broadcast_studio_id
  //       }
  //     }
  //   }
  //   var response = await sendRequest(environment.baseURL3,'/api/v2/hbs/start-streaming',{'Authorization' : accesstoken_host,'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'source' : environment.HSource,'Content-Type' : 'application/json','devicetype':'WEB'},'post',add_member_hbs)
  //   expect(response.body.success.code).to.equal("STREAMING_STARTED")
  //   expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_start_stream_message);
  // });


  it.only('Get assets list: POST /api/v2/hbs/assets', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "currentPage": 1,
          "assetType": "logo",
          "broadcastStudioId": broadcast_studio_id,
          "limit": 5
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/assets', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.assetsCount).to.equal(1)
    expect(response.body.success.data.assets[0].assetType).to.equal("logo")
    asset_url = (response.body.success.data.assets[0].url)
  });

  it.only('Get signed url for new logo: POST /api/v2/get-signed-url', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "extension": "png",
          "contentType": "image/png",
          "uploadType": "HBS_LOGO",
          "options": {}
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    global.upload_url_logo = (response.body.success.data.urlLists[0].uploadURL)
    file_name = (response.body.success.data.urlLists[0].fileName)
  });

  it.only('Upload image to aws upload url', function (done) {
    const req = require('supertest')
    var awsHost = 'https://' + global.upload_url_logo.split('/')[2]
    var awsUploadUrl = global.upload_url_logo.substr(awsHost.length)
    const fs = require('fs')
    let testImage = './images_branding/event_LOGO.png'
    req(awsHost).put(awsUploadUrl)
      .set('Content-Type', 'image/png')
      .send(fs.readFileSync(testImage))
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it.only('Add asset: POST /api/v2/hbs/add-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetType": "logo",
          "url": file_name,
          "metadata": {
            "size": {
              "width": 251,
              "height": 201
            },
            "assetPosition": 0
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/add-asset', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    asset_id = (response.body.success.data._id)
    expect(response.body.success.data.assetType).to.equal("logo")
    expect(response.body.success.data.metadata.size.width).to.equal(251)
    expect(response.body.success.data.metadata.size.height).to.equal(201)
  });

  it.only('Add logo to stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 1,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "top-left"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.data.appliedLogo.assetId.isDefault).to.equal(false)
    expect(response.body.success.data.appliedLogo.position).to.equal("top-left")
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });

  it.only('Remove logo from stream with position as top-left: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 2,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "top-left"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });

  it.only('Update logo to top right: POST /api/v2/hbs/update-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "url": file_name,
          "metadata": {
            "size": {
              "width": 251,
              "height": 201
            },
            "assetPosition": 1
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_update_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_UPDATED")
    expect(response.body.success.data.metadata.assetPosition).to.equal(1)
    expect(response.body.success.data.assetType).to.equal("logo")
  });

  it.only('Add logo to stream at top-right: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 1,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "top-right"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.data.appliedLogo.assetId.isDefault).to.equal(false)
    expect(response.body.success.data.appliedLogo.position).to.equal("top-right")
    expect(response.body.success.data.appliedLogo.size.width).to.equal(251)
    expect(response.body.success.data.appliedLogo.size.height).to.equal(201)
  });

  it.only('Remove logo from stream with position as top-right: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 2,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "top-right"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
  });


  it.only('Update logo to bottom right: POST /api/v2/hbs/update-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "url": file_name,
          "metadata": {
            "size": {
              "width": 251,
              "height": 201
            },
            "assetPosition": 2
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.metadata.assetPosition).to.equal(2)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_update_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_UPDATED")
    expect(response.body.success.data.assetType).to.equal("logo")
  });

  it.only('Add logo to stream at bottom-right: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 1,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "bottom-right"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.data.appliedLogo.assetId.isDefault).to.equal(false)
    expect(response.body.success.data.appliedLogo.position).to.equal("bottom-right")
    expect(response.body.success.data.appliedLogo.size.width).to.equal(251)
    expect(response.body.success.data.appliedLogo.size.height).to.equal(201)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });

  it.only('Remove logo from stream with position as bottom-right: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 2,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "bottom-right"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });


  it.only('Update logo to bottom left: POST /api/v2/hbs/update-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "url": file_name,
          "metadata": {
            "size": {
              "width": 251,
              "height": 201
            },
            "assetPosition": 3
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/update-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.metadata.assetPosition).to.equal(3)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_update_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_UPDATED")
    expect(response.body.success.data.assetType).to.equal("logo")
  });

  it.only('Add logo to stream at bottom-left: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 1,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "bottom-left"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.data.appliedLogo.assetId.isDefault).to.equal(false)
    expect(response.body.success.data.appliedLogo.position).to.equal("bottom-left")
    expect(response.body.success.data.appliedLogo.size.width).to.equal(251)
    expect(response.body.success.data.appliedLogo.size.height).to.equal(201)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });

  it.only('Remove logo from stream with position as bottom-left: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "LOGO",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": asset_id,
          "action": 2,
          "logoDetails": {
            "size": {
              "width": 251,
              "height": 201
            },
            "position": "bottom-left"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });


  it.only('Remove asset: POST /api/v2/hbs/remove-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetId": asset_id,
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/remove-asset', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.deleted).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_delete_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_DELETED")
  });

  it.only('Get signed url for new overlay: POST /api/v2/get-signed-url', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "extension": "png",
          "contentType": "image/png",
          "uploadType": "HBS_OVERLAY_IMAGE",
          "options": {
            "size": 1112
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    global.upload_url_logo = (response.body.success.data.urlLists[0].uploadURL)
    file_name_overlay = (response.body.success.data.urlLists[0].fileName)
  });

  it.only('Upload image to aws upload url', function (done) {
    const req = require('supertest')
    var awsHost = 'https://' + global.upload_url_logo.split('/')[2]
    var awsUploadUrl = global.upload_url_logo.substr(awsHost.length)
    const fs = require('fs')
    let testImage = './images_branding/event_LOGO.png'
    req(awsHost).put(awsUploadUrl)
      .set('Content-Type', 'image/png')
      .send(fs.readFileSync(testImage))
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it.only('Add asset overlay: POST /api/v2/hbs/add-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetType": "overlay",
          "url": file_name_overlay
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/add-asset', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    global.overlay_id = (response.body.success.data._id)
    expect(response.body.success.data.assetType).to.equal("overlay")
    expect(response.body.success.data.isDefault).to.equal(false)
    expect(response.body.success.data.isDeleted).to.equal(false)
  });

  it.only('Add overlay asset to stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "OVERLAY",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": global.overlay_id,
          "action": 1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });

  it.only('Remove overlay asset from stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "OVERLAY",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": global.overlay_id,
          "action": 2
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });


  it.only('Remove asset: POST /api/v2/hbs/remove-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetId": asset_id,
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/remove-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.deleted).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_delete_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_DELETED")
  });

  it.only('Hide participant-name in HBS Session toggle on : POST /api/v2/hbs/show-hide-participant-name', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id,
          "isHideParticipantName": true
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/show-hide-participant-name', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_update_message)
    expect(response.body.success.code).to.equal("HBS_UPDATED")
  });

  it.only('Hide participant-name in HBS Session toggle off : POST /api/v2/hbs/show-hide-participant-name', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id,
          "isHideParticipantName": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/show-hide-participant-name', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_update_message)
    expect(response.body.success.code).to.equal("HBS_UPDATED")
  });

  it.only('Get signed url for background image: POST /api/v2/get-signed-url', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "extension": "png",
          "contentType": "image/png",
          "uploadType": "HBS_BACKGROUND_IMAGE",
          "options": {
            "size": 1112
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    global.upload_url_backgoundimage = (response.body.success.data.urlLists[0].uploadURL)
    file_name_background_image = (response.body.success.data.urlLists[0].fileName)
  });

  it.only('Upload image to aws upload url', function (done) {
    const req = require('supertest')
    var awsHost = 'https://' + global.upload_url_backgoundimage.split('/')[2]
    var awsUploadUrl = global.upload_url_backgoundimage.substr(awsHost.length)
    const fs = require('fs')
    let testImage = './images_branding/login_BANNER.png'
    req(awsHost).put(awsUploadUrl)
      .set('Content-Type', 'image/png')
      .send(fs.readFileSync(testImage))
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });


  it.only('Add asset background image: POST /api/v2/hbs/add-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetType": "background",
          "url": file_name_background_image
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/add-asset', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    background_asset_id = (response.body.success.data._id)
    expect(response.body.success.data.assetType).to.equal("background")
    expect(response.body.success.data.isDefault).to.equal(false)
    expect(response.body.success.data.isDeleted).to.equal(false)
  });


  it.only('Add asset background image to stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "BACKGROUND",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": background_asset_id,
          "action": 1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });

  it.only('Remove asset background image from stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "BACKGROUND",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": background_asset_id,
          "action": 2
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });

  it.only('Delete asset as backgound image from stream: POST /api/v2/hbs/remove-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetId": background_asset_id,
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/remove-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.deleted).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_delete_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_DELETED")
  });

  it.only('Add banner: POST /api/v2/hbs/add-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetType": "banner",
          "metadata": {
            "bannerType": 1,
            "bannerName": "This is test banner",
            "bannerText": "This is test banner",
            "autoAnimateOut": false,
            "color": "#4E59B8"
          }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/add-asset', { 'Authorization': accesstoken_host, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    banner_asset_id = (response.body.success.data._id)
    expect(response.body.success.data.assetType).to.equal("banner")
    expect(response.body.success.data.isDefault).to.equal(false)
    expect(response.body.success.data.isDeleted).to.equal(false)
    expect(response.body.success.data.metadata.bannerType).to.equal(1)
    expect(response.body.success.data.metadata.bannerName).to.equal("This is test banner")
    expect(response.body.success.data.metadata.bannerText).to.equal("This is test banner")
    expect(response.body.success.data.metadata.autoAnimateOut).to.equal(false)
    expect(response.body.success.data.metadata.color).to.equal("#4E59B8")
  });


  it.only('Apply asset banner image to stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "BANNER",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": banner_asset_id,
          "action": 1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_Add_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_APPLIED")
  });


  it.only('Remove asset banner image from stream: POST /api/v2/hbs/apply/asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "agendaId": sessionid_hbs,
          "assetType": "BANNER",
          "broadcastStudioId": broadcast_studio_id,
          "assetId": banner_asset_id,
          "action": 2
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/apply/asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.is_powered_by).to.equal(1)
    expect(response.body.success.data.isHideParticipantName).to.equal(false)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_remove_overlay_stream_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_REMOVED")
  });


  it.only('Delete asset as banner image from stream: POST /api/v2/hbs/remove-asset', async () => {

    const add_member_hbs = {
      "payload": {
        "data": {
          "assetId": banner_asset_id,
          "agendaId": sessionid_hbs,
          "broadcastStudioId": broadcast_studio_id
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/hbs/remove-asset', { 'Authorization': accesstoken_host, 'source': environment.HSource, 'Content-Type': 'application/json', 'devicetype': 'WEB' }, 'post', add_member_hbs)
    expect(response.body.success.data.deleted).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_sessions_HBS_asset_delete_message)
    expect(response.body.success.code).to.equal("HBS_ASSET_DELETED")
  });

  it.only('Get list of people to get host : POST /api/v1/people/list', async () => {

    const get_list =
    {"data":{"filter":{}}}

    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', get_list)
    global.host_id_added = getValueFromJsonObject(response.body, "$.data[?(@.email=='srinivas.kantipudi@hubilo.com')].userId")
  });


   //SWAT bugs

   it.only('Get landing page configuration : POST /api/v2/landing-page/configuration', async () => {

    const get_landing_page_conf =
    {
      "payload": {
        "data": {
          "prevId": 0,
          "url":  process.env.communityv2url.concat("/register")
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/landing-page/configuration',{ }, 'post', get_landing_page_conf)
   global.access_token_landing_page = (response.body.success.data.accessToken)
   expect(response.body.success.code).to.equal("LOADED_CONFIGUARATION_SUCCESSFULLY");
  });

  it.only('Get landing page details for session: POST /api/v2/landing-page', async () => {

    const landing_page_details = {"payload":{"data":{}}}
  
    var response = await sendRequest(environment.baseURL3,'/api/v2/landing-page',{'Authorization' : global.access_token_landing_page, 'source' : environment.HSource},'post',landing_page_details)
    expect(response.body.success.data.sessions.displayName).to.equal("Agenda")
    expect(response.body.success.data.sessions.eventSectionName).to.equal("AGENDA")
    expect(response.body.success.code).to.equal("LANDING_PAGE_SUCCESS");
    // expect(getValueFromJsonObject(response.body, "$.success.sessions.data.data[?(@.title=='Zoom Session')].title")).to.equal("Zoom Session")
    // expect(getValueFromJsonObject(response.body, "$.success.sessions.data.data[?(@.title=='Pre Recorded Session')].title")).to.equal("Pre Recorded Session")
  });

  it.only('Create a session for next day : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
     var sessionEndTime = (addTime(new Date(), 1)).getTime()
     var sessionStartTime = (addTime(new Date(), 18)).getTime()
     sessionid_nextday= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Next day check','', '', 'Next Day Session Description', sessionStartTime, sessionEndTime)
});

it.only('Verify agendas list session for next day: POST /api/v2/sessions/get-sessions', async () => {

  var today = new Date();
  var dd = today.getDate()+1
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  today = yyyy+'-0'+mm+'-'+dd;

  const communitysession =
  {
    "payload": {
      "data": {
        "time_zone": "Asia/Kolkata",
        "agenda_id": "",
        "custom_tag": [],
        "speakerIds": [],
        "trackIds": [],
        "isSendLiveAgenda": "NO",
        "search": "",
        "track_date": today
      }
    }
  }
  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communitysession)
  expect(response.body.success.data.agenda[0].title).to.equal("Next day check")
  expect(response.body.success.data.agenda[0].agendaInfo.description).to.equal("Next Day Session Description")
});

it.only('Get landing page details for session: POST /api/v2/landing-page/sessions', async () => {
  var today = new Date();
  var dd = today.getDate()+1
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  var nextday = yyyy+'-0'+mm+'-'+dd;

  const next_day_details = {
    "payload": {
      "data": {
        "date": nextday
      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/landing-page/sessions',{'Authorization' : global.access_token_landing_page, 'source' : environment.HSource},'post',next_day_details)
  expect(response.body.success.data.data[0].title).to.equal("Next day check")
  expect(response.body.success.data.data[0].description).to.equal("Next Day Session Description")
  // expect(response.body.success.data.data[0].agendaDate).to.equal(nextday);
});

it.only('Create a session for check duplicate after update : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 1)).getTime()
   var sessionStartTime = (addTime(new Date(), 1)).getTime()
   sessionid_viemo= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Duplicate session check','', '', 'Duplicate session check Description', sessionStartTime, sessionEndTime)
});
  

it.only('Update basic settings to check duplicate session : PUT /backend/api/v2/events/agenda/basic', async () => {

  const customupdate =
  {
    "data": {
      "description": "Duplicate session check update",
      "multiple_file": [],
      "start_time_milli": new Date().getTime(),
      "end_time_milli": (addTime(new Date(), 1)).getTime(),
      "is_featured": 0,
      "is_rating": 0,
      "speakers": [],
      "booths": [],
      "name": "Duplicate session check update",
      "tags": "",
      "banner": ""
    }
  }

  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_viemo},'put',customupdate)
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
});

it.only('Verify if session is duplicate in session list : POST /api/v2/sessions/get-sessions', async () => {

  const communitysession =
  {
    "payload": {
      "data": {
        "agenda_id": "",
        "custom_tag": [],
        "isSendLiveAgenda": "NO",
        "search": "",
        "speakerIds": [],
        "time_zone": "Asia/Kolkata",
        "trackIds": [],
        "track_date": ""

      }
    }
  }
 
  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',communitysession)
  var tt = getValueFromJsonObject(response.body.success, "$.data.agenda[?(@.title=='Duplicate session check update')].name")
  expect(getValueFromJsonObject(response.body.success, "$.data.agenda[?(@.title=='Duplicate session check update')].name")).to.not.equal("Duplicate session check")
});


it.only('Verify live agendas if duplicate with same name: POST /api/v2/sessions/live-agenda/get', async () => {

  const community584 = {
    "payload": {
      "data": {
        "agenda_id": sessionid_viemo,
  
      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/live-agenda/get',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',community584);
  expect(response.body.success.data.title).to.equal("Duplicate session check update")
  expect(response.body.success.data.agendaId).to.equal(JSON.stringify(sessionid_viemo))
});

  it.only('Delete user created for session purpose : POST /backend/api/v2/people/delete', async () => {
    const delete1 =
    {
      "data": {

        "ids": [global.peopleId, global.boothmemberid,global.custom_group_id,global.host_id_added],
        "is_all": 0

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  });

  it.only('Delete virtuabooth : POST /backend/api/v2/events/booth/delete', async () => {
    const deleteBooth =
    {
      "data": {

        "booth_ids": [global.virtualboothid1],
        "is_all": 0

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', deleteBooth)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
  });

  
  it.only('Delete group : POST /backend/api/v2/events/groups/delete', async () => {
  
  
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'groupid':created_group_id }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Group_delete_message);
  });

  it.only('Delete team member: POST /api/v1/team-member/delete', async () => {
    const team_member =
    {
      "data": {
        "is_all": 0,
        "ids": [
          team_member_userid
        ],
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_delete_message);
  });

  it.only('delete all added users', async() => {
    var people = new People();
    people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, [tem_member_email_attendee_id])  
  })



  it('Delete session 1st day : POST /backend/api/v2/events/agendadays/delete', async () => {

    const agendaday1 = {
      "data": {
        "agenda_date": todayDate,
        "is_delete_all_days": 0
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', agendaday1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  });

  // it.only('Delete session 1st day : POST /backend/api/v2/events/agendadays/delete', (done) => {

  //   const agendaday1 = {
  //     "data": {
  //       "agenda_date": todayDate,
  //       "is_delete_all_days": 0
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendadays/delete')
  //     .set('organiserId', environment.HOrganiserId)
  //     // .set('eventId', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(agendaday1)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  //       done();
  //     });
  // });

  it(' Delete session 2nd day : POST /backend/api/v2/events/agendadays/delete', async () => {

    const agendaday3 = {
      "data": {
        "agenda_date": SecondDay,
        "is_delete_all_days": 0
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', agendaday3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  });

  // it.only(' Delete session 2nd day : POST /backend/api/v2/events/agendadays/delete', (done) => {

  //   const agendaday3 = {
  //     "data": {
  //       "agenda_date": SecondDay,
  //       "is_delete_all_days": 0
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendadays/delete')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('buildversion', process.env.buildversion)
  //     .set('eventId', process.env.eventid)
  //     // .set('eventId', process.env.eventid)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(agendaday3)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  //       done();
  //     });
  // });

  it('Delete session 3rd day : POST /backend/api/v2/events/agendadays/delete', async () => {

    const agendaday4 = {
      "data": {
        "agenda_date": ThirdDay,
        "is_delete_all_days": 0
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', agendaday4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  });

  // it.only('Delete session 3rd day : POST /backend/api/v2/events/agendadays/delete', (done) => {

  //   const agendaday4 = {
  //     "data": {
  //       "agenda_date": ThirdDay,
  //       "is_delete_all_days": 0
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/events/agendadays/delete')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('buildversion', process.env.buildversion)
  //     .set('eventId', process.env.eventid)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(agendaday4)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  //       done();
  //     });
  // });

  it('Delete session 4th day : POST /backend/api/v2/events/agendadays/delete', async () => {

    const agendaday5 = {
      "data": {
        "agenda_date": FourDay,
        "is_delete_all_days": 0
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', agendaday5)
    expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  });

  // it.only('Delete session 4th day : POST /backend/api/v2/events/agendadays/delete', (done) => {

  //   const agendaday5 = {
  //     "data": {
  //       "agenda_date": FourDay,
  //       "is_delete_all_days": 0
  //     }
  //   }
  //   request1
  //     .post('/backend/api/v2/events/agendadays/delete')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('buildversion', process.env.buildversion)
  //     // .set('eventId', process.env.eventid)
  //     .set('eventId', process.env.eventid)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(agendaday5)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_agendaday_post_deleted_message);
  //       done();
  //     });
  // });

  
it.only('Add a speaker and sign', async () => {

  var people = new People();
  global.peopleId_speaker = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'speakerfilteruser1@yopmail.com', 'speakerseesion', 'user', [global.speakergroup])
  var signup = new ComunitySignupLogin();
  global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  global.accesstokenspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'speakerfilteruser1@yopmail.com', '1234')
});


it.only('Create a session to check speaker filter : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
  var sessionEndTime = (addTime(new Date(), 1)).getTime()
  var sessionStartTime = new Date().getTime()
  sessionid_speaker_session= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Speaker filter Session check','', '', 'Speaker filter Session check description', sessionStartTime, sessionEndTime)
});


it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

var session = new Session();
await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_speaker_session,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://vimeo.com/253989945","https://vimeo.com/253989945",2)
});

it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {

const customupdate =
{
  "data": {
    "agenda_track_id": trackid,
    "banner": "",
    "booths": [],
    "description": "Speaker filter Session check description",
    "end_time_milli": (addTime(new Date(), 1)).getTime(),
    "is_featured": 1,
    "is_rating": 1,
    "multiple_file": [],
    "name": "Speaker filter Session check",
    "speakers": [global.peopleId_speaker],
    "start_time_milli": new Date().getTime(),
    "tags": "tag,virtual booth,first"

  }
}

var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionid_speaker_session},'put',customupdate)
expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
global.sessionIdCommon = sessionid_speaker_session
});

it.only('Filter in Session by speaker : POST /api/v2/filters/tag/list', async () => {

  const FilterSessionspeaker = {
    "payload": {
      "data": {
        "type": "SPEAKER_FILTER",
        "limit": 30,
        "page": 1
      }
    }
  }

  var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSessionspeaker)
    
});

it.only('Filter session by speaker : POST /api/v2/sessions/get-sessions', async () => {

  const FilterSessionByspeaker =
  {
    "payload": {
      "data": {
        "time_zone": "Asia/Kolkata",
        "trackIds": [],
        "custom_tag": [],
        "agenda_id": "",
        "speakerIds": [
          global.peopleId_speaker
        ],
        "isSendLiveAgenda": "NO",
        "search": "",
        "track_date": "2022-01-24"
      }
    }
  }
  
  var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/get-sessions',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource,'Content-Type' : 'application/json'},'post',FilterSessionByspeaker);
  expect(getValueFromJsonObject(response.body.success, "$.data.agenda.agendaInfo[?(@.name=='Speaker filter Session check')].description")).to.not.equal("Speaker filter Session check description")
});


// it.only('Search speaker in speaker filter by name : POST /api/v2/filters/tag/list', async () => {

//   const FilterSessionspeaker = {
//     "payload": {
//       "data": {
//         "type": "SPEAKER_FILTER",
//         "limit": 10,
//         "page": 1,
//         "search": "speakerseesion user"
//       }
//     }
//   }
//   var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSessionspeaker)
//   expect(response.body.success.data.total).to.equal(1);
//   expect(response.body.success.data.tags[0].name).to.equal("speakerseesion user");
//   expect(response.body.success.data.tags[0].email).to.equal("speakermeeting1user@yopmail.com");
// });

// it.only('Search speaker in speaker filter by partial name : POST /api/v2/filters/tag/list', async () => {

//   const FilterSessionspeaker = {
//     "payload": {
//       "data": {
//         "type": "SPEAKER_FILTER",
//         "limit": 10,
//         "page": 1,
//         "search": "speakerseesion"
//       }
//     }
//   }
//   var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSessionspeaker)
//   expect(response.body.success.data.total).to.equal(1);
//   expect(response.body.success.data.tags[0].name).to.equal("speakerseesion user");
//   expect(response.body.success.data.tags[0].email).to.equal("speakermeeting1user@yopmail.com");
// });

it.only('Search speaker in speaker filter by invaild name : POST /api/v2/filters/tag/list', async () => {

  const FilterSessionspeaker = {
    "payload": {
      "data": {
        "type": "SPEAKER_FILTER",
        "limit": 10,
        "page": 1,
        "search": "*&*%^%&^%^$^^:"
      }
    }
  }
  var response = await sendRequest(environment.baseURL3,'/api/v2/filters/tag/list',{'Authorization' : process.env.accesstokenloginuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',FilterSessionspeaker)
  expect(response.body.success.data.total).to.equal(0);
});


// it.only('Verify iframe widget with session on different day and time: POST /api/v2/embed/agenda-list', async () => {

//   const iframe = 
//   {
//     "payload": {
//       "data": {
//         "time_zone": "Asia/Kolkata",
//         "agenda_id": "",
//         "custom_tag": [],
//         "speakerIds": [],
//         "trackIds": [],
//         "isSendLiveAgenda": "NO",
//         "search": "",
//         "track_date": today
//       }
//     }
//   }
//   var response = await sendRequest(environment.baseURL7, '/api/v2/embed/agenda-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe)
//   expect(response.body.success.message).to.equal(Responsemessages.Parameter_agenda_list_message)
//   expect(response.body.success.data.agenda[0].title).to.equal("Next day check")
//   expect(response.body.success.data.agenda[0].agendaInfo.description).to.equal("Next Day Session Description")
// });

// it.only('Verify iframe widget with viemo session and tags : POST /api/v2/embed/agenda-details', async () => {

//   const iframe_agendadetails = 
//   {
//     "payload": {
//       "data": {
//         "agenda_id": sessionid_viemo
//       }
//     }
//   }
//   var response = await sendRequest(environment.baseURL7, '/api/v2/embed/agenda-details',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe_agendadetails)
//   expect(response.body.success.message).to.equal(Responsemessages.Parameter_agenda_details_message)
//   expect(response.body.success.data.title).to.equal("viemo session")
//   expect(response.body.success.data.agendaInfo.name).to.equal("viemo session")
//   expect(response.body.success.data.agendaInfo.tags).to.equal("tag,virtual booth,first")
//   expect(response.body.success.data.agendaInfo.streamLink).to.equal("https://vimeo.com/253989945")
//   expect(response.body.success.data.agendaInfo.streamRecordingLink).to.equal("https://vimeo.com/253989945")
//   expect(response.body.success.data.agendaInfo.trackName).to.equal("TRACK7")
// });

it.only('Delete speaker created for session purpose : POST /backend/api/v2/people/delete', async () => {
  const delete1 =
  {
    "data": {

      "ids": [global.peopleId_speaker],
      "is_all": 0

    }
  }
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
  expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
});





});
