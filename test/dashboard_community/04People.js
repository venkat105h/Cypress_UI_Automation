/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/export/delete people. Also few negative cases have been
asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified:  Pranjal Shah 25th Jan 2022 11:49 AM
Description : SWAT cases added for december.
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, getValueFromJsonObject,People,organizerUserHeader} from '../../helper/CommonUtil'
import supertest from 'supertest';
require('dotenv').config();

var attendeegroup
var speakergroup
var boothmembergroup
var ticketid1
var ticketid2
var peopleid1
var peopleid2
var viewattendeenew
var profile_image
var peopleList = []
var fs = require('fs');
const request1 = supertest(environment.baseURL1);


var interest = [
  "Accounting",
  "Advertising",
  "Agriculture",
  "Banking",
  "Biotech",
  "Computer Science",
  "Construction",
  "Consulting",
  "Criminal Justice",
  "Culinary Arts",
  "Design",
  "Engineering",
  "Environment Conservation",
  "Finance",
  "Financial Services",
  "Fine, Visual, Performing Arts",
  "Food Management",
  "Government/Public Sector/Policy",
  "Graphic Arts",
  "Green Industries",
  "Healthcare",
  "Hospitality",
  "Human Resources",
  "Insurance",
  "Investment",
  "Management",
  "Manufacturing",
  "Marketing & Sales",
  "Multimedia Production",
  "PR and Media",
  "Packaging",
  "Research",
  "Security",
  "Social & Community Services",
  "Supply Chain",
  "Tourism",
  "Training and Development",
  "Urban Planning",
  "Writing and Publishing"
]

var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');

describe('List/search/sort people on community', () => {
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


  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    attendeegroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    boothmembergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    speakergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
  });

  it.only('Upload profile image: POST /backend/api/v2/events/uploads',  (done) => {
        
    request1
    .post('/backend/api/v2/events/uploads')
    .set('organiserId', environment.HOrganiserId)
    .set('eventId', process.env.eventid)
    .set('Authorization', 'Bearer ' + process.env.eToken)
    .field('Content-Type', 'multipart/form-data')
    .field('location', 'profile')
    .field('type', 'base')
    .field('data', 'data:image/png;base64,' + imageAsBase64)
    .end((err, response) => {
        profile_image = (response.body.data.file_name)
        expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
        done();
});
   
});

  it.only('Add a single attendee in people : POST /backend/api/v2/people/single', async () => {

    const people10 = {
      "data": {
        "email": "asii9s0s@gmail.com",
        "first_name": "gaurav",
        "groups": [
          attendeegroup
        ],

        "last_name": "thappar",
        "looking": "",
        "offering": "",
        "industry": "",
        "interest": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people10)
    var data = JSON.parse(response.body.data)
    peopleid1 = (data.userId.$oid)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });

  it.only('Add a single attendee with all parameters: POST /backend/api/v2/people/single', async () => {

    const people11 = {
      "data": {

        "email": "ga823ndmc@gmail.com",
        "first_name": "gaurav",
        "groups": [
          attendeegroup
        ],
        "img_file_name": "",
        "industry": "accounting",
        "interest": "advertising",
        "is_featured": true,
        "is_rating": true,
        "is_send_invite_mail": 0,
        "last_name": "rao",
        "looking": "accountant",
        "multiple_file": [],
        "offering": "testing",
        "phone": "9988887777",
        "phone_code": "91",
        "sessions": []
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people11)
    var data = JSON.parse(response.body.data)
    peopleid2 = (data.userId.$oid)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });

  it.only('Verify added attendee on community: POST /api/v2/attendee', async () => {

    const searchattendee =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchattendee)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav Rao')
    expect(response.body.success.data.attendees[1].userName).to.equal('Gaurav Thappar')
  });

  it.only('Update single attendee : PUT /backend/api/v2/people/single/edit', async () => {

    const people12 = {
      "data": {
        "email": "ga823ndmc@gmail.com",
        "first_name": "gaurav updated",
        "groups": [
          attendeegroup
        ],
        "img_file_name": "",
        "industry": "accounting",
        "interest": "advertising",
        "is_featured": true,
        "is_rating": true,
        "is_send_invite_mail": true,
        "last_name": "rao updated",
        "looking": "accountant",
        "multiple_file": [],
        "offering": "testing",
        "phone": "9988887777",
        "phone_code": "91",
        "sessions": [],
        "userId": peopleid1
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', people12)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  });

  it.only('Update attendee with all params: PUT /backend/api/v2/people/single/edit', async () => {

    const people13 = {
      "data": {

        "email": "asii9s0s@gmail.com",
        "first_name": "gaurav updated 2",
        "groups": [
          attendeegroup
        ],

        "last_name": "rao updated 2",
        "looking": "",
        "offering": "",
        "industry": "Consulting",
        "interest": "",
        "status": "Activated",
        "userId": peopleid2
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', people13)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  });

  it.only('Verify updated attendee on community: POST /api/v2/attendee', async () => {

    const searchattendee =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchattendee)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
    expect(response.body.success.data.attendees[1].userName).to.equal('Gaurav updated Rao updated')
  });

  it.only('Get attendee on dashboard: POST /api/v1/people/list', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
    expect(response.body.data[0].email).to.equal('ga823ndmc@gmail.com')
    expect(response.body.data[1].email).to.equal('asii9s0s@gmail.com')
    ticketid1 = (response.body.data[0].userId)
    ticketid2 = (response.body.data[1].userId)
  });

  it.only('Search attendee on Community: POST /api/v2/attendee', async () => {
    const searchattendee =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "gaurav",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 10,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchattendee)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
    expect(response.body.success.data.attendees[1].userName).to.equal('Gaurav updated Rao updated')
    expect(response.body.success.data.count).to.equal(2)
  });

  it.only('Filter attendee by industry - consulting : POST /api/v2/attendee', async () => {

    const filterattendeeindustry =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "[\"Consulting\"]",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', filterattendeeindustry)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
    expect(response.body.success.data.count).to.equal(1)
  });

  it.only('Filter attendee by interest - multimedia production : POST /api/v2/attendee', async () => {

    const filterattendeeinterest =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "[\"Accounting\"]",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": attendeegroup
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', filterattendeeinterest)
    expect(response.body.success.data.attendees[0].userName).to.be.an('string').and.satisfy(str => str.toLowerCase() == 'joker clown')
    expect(response.body.success.data.attendees[0].userName).to.equal('joker clown')
    expect(response.body.success.data.attendees[0].designation).to.equal('clown designation is ceo')
    expect(response.body.success.data.count).to.equal(1)
  });

  it.only('Filter attendee by organisation : POST /api/v2/attendee', async () => {

    const filterattendeeorganisation =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "[\"clown organisation is world\"]",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', filterattendeeorganisation)
    expect(response.body.success.data.attendees[0].userName).to.equal('joker clown')
    expect(response.body.success.data.count).to.equal(1)
  });

  it.only('Filter attendee by industry,interest : POST /api/v2/attendee', async () => {

    const filterattendeeindustinterstcount =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "[\"IT\"]",
          "input": "",
          "intrestIds": "[\"Engineering\"]",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', filterattendeeindustinterstcount)
  });

  it.only('Search IT industry in filters : POST /api/v2/attendee/filters', async () => {

    const searchitfilter =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 50,
          "sort": 0,
          "input": "IT",
          "filterId": "industry",
          "sidebarId": attendeegroup
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/filters', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchitfilter)
  });

  it.only('Search science interest in filters : POST /api/v2/attendee/filters', async () => {

    const searchscienceinterest =
    {
      "payload": {
        "data": {
          "filterId": "interests",
          "input": "science",
          "language": 0,
          "limit": 50,
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/filters', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchscienceinterest)
  });

  it.only('Search cto designation in filters : POST /api/v2/attendee/filters', async () => {

    const searchctodesignation =
    {
      "payload": {
        "data": {
          "filterId": "5fd2fafa4b75052c581ebecf",
          "input": "cto",
          "language": 0,
          "limit": 50,
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/filters', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchctodesignation)
  });

  it.only('Sort attendee(A-Z) on community v2: POST /api/v2/attendee', async () => {

    const sortattendee =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 1,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": attendeegroup
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortattendee)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated Rao updated')
    expect(response.body.success.data.attendees[1].userName).to.equal('Gaurav updated 2 Rao updated 2')
  });

  it.only('Sort attendee(Z-A)) on community v2: POST /api/v2/attendee', async () => {

    const sortattendee1 =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 2,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortattendee1)
    expect(response.body.success.data.attendees[1].userName).to.equal('joker clown')
    expect(response.body.success.data.attendees[3].userName).to.equal('Gaurav updated Rao updated')
  });

  it.only('Sort attendee(recently added) on community v2: POST /api/v2/attendee', async () => {

    const sortattendee2 =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 18,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortattendee2)
    expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
    expect(response.body.success.data.attendees[1].userName).to.equal('Gaurav updated Rao updated')
    viewattendeenew = (response.body.success.data.attendees[0].Id)
  });

  it.only('View an attendee profile on community V2 : POST /api/v2/attendee/view', async () => {

    const viewattendeeprofile = {
      "payload": {}
    }
    var response = await sendRequest(environment.baseURL3, ('/api/v2/attendee/' + viewattendeenew + '/view'), { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', viewattendeeprofile)
    expect(response.body.success.data.userInfo.firstName).to.equal('Gaurav updated 2')
    expect(response.body.success.data.userInfo.lastName).to.equal('Rao updated 2')
  });

  it.only('Send a note to an attendee via view profile on community V2 : POST /api/v2/notes/add', async () => {

    const notesendattendee = {
      "payload": {
        "data": {
          "note": "testing gaurav",
          "note_type": "ATTENDEE",
          "noted_id": viewattendeenew,
          "target": viewattendeenew
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/notes/add', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', notesendattendee)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_post_message)
    expect(response.body.success.data.notes).to.equal('testing gaurav')
  });

  it.only('Export people to mentioned valid emails ids: POST /backend/api/v2/people/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            "rajeev1991@yopmail.com"
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_message);
  });

  it.only('Export people to mentioned null as emails ids: POST /backend/api/v2/people/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            null
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_message);
  });

  it.only('Export people to mentioned blank emails ids: POST /backend/api/v2/people/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            "  "
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_message);
  });

  it.only('Filter Logged in people in dashboard: POST /api/v1/people/list', async () => {
    const fiter_loogedin =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [],
          "industry": [],
          "lookingfor": [],
          "offering": [], "designation": "",
          "organisation": "",
          "loginStatus": "LOGGEDIN",
          "is_logged_in": true,
          "is_not_logged_in": false
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_loogedin)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
  });

  it.only('Filter Not Loggedin in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_Not_loogedin =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [],
          "industry": [],
          "lookingfor": [],
          "offering": [],
          "designation": "",
          "organisation": "",
          "loginStatus": "NOTLOGGEDIN",
          "is_logged_in": false,
          "is_not_logged_in": true
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_Not_loogedin)
    expect(response.body.total_count).to.equal(3)
  });

  it.only('Filter Not Any in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{"group":[],"interest":[],"industry":[],"lookingfor":[],"offering":[],"designation":"","organisation":"","loginStatus":"ANY","is_logged_in":false,"is_not_logged_in":false}}}

    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
  
  });


  it.only('Filter by attendee group and login status Any in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [attendeegroup],
          "interest": [],
          "industry": [],
          "lookingfor": [],
          "offering": [],
          "designation": "",
          "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    
  });


  it.only('Filter by speaker group and login status Any in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [speakergroup],
          "interest": [],
          "industry": [],
          "lookingfor": [],
          "offering": [],
          "designation": "",
          "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    
  });


  it.only('Filter by designation people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [], "interest": [],
          "industry": [], "lookingfor": [],
          "offering": [],
          "designation": "clown designation is ceo",
          "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
    expect(response.body.data[0].designation).to.equal('clown designation is ceo')
  });


  it.only('Filter by organization in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [],
          "industry": [],
          "lookingfor": [],
          "offering": [],
          "designation": "clown designation is ceo",
          "organisation": "clown organisation is world",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
    expect(response.body.data[0].designation).to.equal('clown designation is ceo')
    expect(response.body.data[0].organisation).to.equal('clown organisation is world')
  });

  it.only('Filter by industry in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [], "industry":
            ["Technical"],
          "lookingfor": [],
          "offering": [],
          "designation": "", "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
    expect(response.body.data[0].industry).to.equal('Technical')
  });

  it.only('Filter by interest in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": ["Accounting"],
          "industry": [],
          "lookingfor": [],
          "offering": [],
          "designation": "",
          "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
  });

  it.only('Filter by looking for in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [],
          "industry": [],
          "lookingfor": ["Accountant"],
          "offering": [],
          "designation": "",
          "organisation": "",
          "loginStatus": "",
          "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
  });

  it.only('Filter by offering for in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {
      "data": {
        "filter": {
          "group": [],
          "interest": [],
          "industry": [], "lookingfor": [],
          "offering": ["Designer"],
          "designation": "", "organisation": "",
          "loginStatus": "", "is_logged_in": false,
          "is_not_logged_in": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
    expect(response.body.data[0].offering).to.equal('Designer')
  });


  it.only('Clear Appiled Filter in people dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)

  });

  it.only('Search people by email id in dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'clown26@yopmail.com' }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('joker')
    expect(response.body.data[0].lastName).to.equal('clown')
    expect(response.body.data[0].offering).to.equal('Designer')
    expect(response.body.data[0].email).to.equal('clown26@yopmail.com')
  });

  it.only('Search people by wrong email id in dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'clown26wrong@yopmail.com' }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Search people by name in dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'joker' }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
  });

  it.only('Verify people in Event Analytics in dashbaord: GET /api/v1/analytics/attendees/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/attendees/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.totalAttendee).to.equal(4)
    expect(response.body.data.loggedInAttendee).to.equal(1)
  });

  it.only('Verify people in overview in dashbaord: POST /api/v1/event/overview/analytics/numbers', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.people).to.equal(4)
  });

  it.only('Verify people in overview analytics in dashbaord: POST /api/v1/event/overview/analytics', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.recentLogin[0].user.firstName).to.equal('joker')
    expect(response.body.data.recentLogin[0].user.lastName).to.equal('clown')
    expect(response.body.data.leaderBoard[0].user.firstName).to.equal('joker')
    expect(response.body.data.leaderBoard[1].user.firstName).to.equal('Gaurav updated 2')
  });

  //Swat case

  it.only('Send invite mailer in people: POST /backend/api/v2/people/invitemailer', async () => {

    const invite_mailer ={
        "data": {
          "search": "",
          "filter": {
            "group": [],
            "interest": [],
            "industry": [],
            "lookingfor": [],
            "offering": [],
            "designation": "",
            "organisation": "",
            "loginStatus": "",
            "is_logged_in": false,
            "is_not_logged_in": false
          },
          "is_all": 0,
          "ids": [
            peopleid1
          ]
        }
      }
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/invitemailer', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post',invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_invite_mailer_message)
  });

  it.only('Block people from dashboard: POST /backend/api/v2/people/blockstate', async () => {

    const block_people =
    {
        "data": {
          "search": "",
          "filter": {
            "group": [],
            "interest": [],
            "industry": [],
            "lookingfor": [],
            "offering": [],
            "designation": "",
            "organisation": "",
            "loginStatus": "",
            "is_logged_in": false,
            "is_not_logged_in": false
          },
          "is_block": 1,
          "is_all": 0,
          "ids": [
            peopleid1
          ]
        }
      }
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/blockstate', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post',block_people)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_block_message)
  });

  
  it.only('Search blocked people by email id in dashboard: POST /api/v1/people/list', async () => {
    const fiter_any =
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'asii9s0s@gmail.com' }, 'post', fiter_any)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].firstName).to.equal('Gaurav updated')
    expect(response.body.data[0].lastName).to.be.an('string').and.satisfy(str => str.toLowerCase() == 'rao updated')
    expect(response.body.data[0].profileStatus).to.equal('BLOCKED')
    expect(response.body.data[0].status).to.equal('BLOCKED')
    expect(response.body.data[0].idWiseData.STATUS).to.equal('BLOCKED')
  });


  it.only('Unblock people from dashboard: POST /backend/api/v2/people/blockstate', async () => {

    const block_people =
    {
        "data": {
          "search": "",
          "filter": {
            "group": [],
            "interest": [],
            "industry": [],
            "lookingfor": [],
            "offering": [],
            "designation": "",
            "organisation": "",
            "loginStatus": "",
            "is_logged_in": false,
            "is_not_logged_in": false
          },
          "is_block": 0,
          "is_all": 0,
          "ids": [
            peopleid1
          ]
        }
      }
   
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/blockstate', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post',block_people)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_Unblock_message)
  });


  // it.only('Get attendee on dashboard: POST /api/v1/people/list', async () => {

  //   var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
  //   expect(response.body.data[0].email).to.equal('ga823ndmc@gmail.com')
  //   expect(response.body.data[1].email).to.equal('asii9s0s@gmail.com')
  //   ticketid1 = (response.body.data[0].userId)
  //   ticketid2 = (response.body.data[1].userId)
  // });

  

  it.only('Try to add people without first name', async () => {

    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'withoutname@mailinator.com', '', 'dety', [global.attendeegroup])
    peopleList.push(peopleId)
});

it.only('Try to add people without last name', async () => {

  var people = new People();
   var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'withoutname1@mailinator.com', 'firstname', '', [global.attendeegroup])
   peopleList.push(peopleId)
});

it.only('Try to add people without mail id', async () => {

  var people = new People();
  var peopleId=  await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, '', 'firstname', 'test', [global.attendeegroup])
  peopleList.push(peopleId)
});

it.only('Try to add people without first and last name', async () => {

  var people = new People();
  var peopleId = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'attendeetesgfdgdt@yopmail.com', '', '', [global.attendeegroup])
  console.log(peopleId)
  peopleList.push(peopleId)
});

it.only('Try to add people without group', async () => {

  var people = new People();
  var peopleId  = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'attendeetest@yopmail.com', 'test', 'people', [])
  console.log(peopleId)
  peopleList.push(peopleId)
});

// it.only('Try to add people with invaild group', async () => {

//   var people = new People();
//   var response = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'attendeetest@yopmail.com', 'test', 'people', ["wqewqewq123"])
//   expect(response.body.status).to.equal(400)
//   expect(response.body.message).to.equal(Responsemessages.Parameter_people_error_message)
// });

it.only('Try to add people with invaild mail id', async () => {

  var people = new People();
  var peopleId = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'attendeetestyopmail.com', 'test', 'people', [global.attendeegroup])
  console.log(peopleId)
  peopleList.push(peopleId)
});

it.only('Try to add people with first name more than 100 character', async () => {
    
  var max100 = 'Attendee1user'.repeat(10)
  var people = new People();
  var peopleId = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'peoplemore100@yopmail.com', max100, 'people', [global.attendeegroup])
  peopleList.push(peopleId)
});

it.only('Try to add people with last name more than 100 character', async () => {

  var lastname100 = 'Attendee1user'.repeat(10)
  var people = new People();
  var peopleId = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'peoplemorelat@yopmail.com', 'test', lastname100, [global.attendeegroup])
  peopleList.push(peopleId)
});

it.only('Get profile field id: POST /backend/api/v2/people/profilefields', async () => {
  
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
  global.gender_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Gender')].id")
  global.about_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='About')].id")
  global.designation_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Designation')].id")
  global.organization_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Organisation')].id")
  global.country_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Country')].id")
  global.state_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='State')].id")
  global.city_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='City/Town')].id")
  global.website_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Website')].id")
  global.facebook_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Facebook Link')].id")
  global.linkedin_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Linkedin Link')].id")
  global.twitter_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Twitter Link')].id")
  global.insta_id = getValueFromJsonObject(response.body.data, "$.default_fields[?(@.fieldName=='Instagram Link')].id")
});
/*
it.only('Try to add people with more then 1000 charcater in about field', async () => {

  var aboutmax1000 = 'Attendee1user'.repeat(100)
  const about1000 = {
    "data": {
      "phone_code": "",
      "phone": "",
      "email": "testevent1@yopmail.com",
      "is_rating": false,
      "is_featured": false,
      "img_file_name": "",
      "is_send_invite_mail": 0,
      "category_id": "",
       gender_id: "Male",
       about_id: aboutmax1000,
       designation_id: "QA",
       organization_id: "QA",
       country_id: "India",
       state_id: "Rajasthan",
       city_id: "",
       website_id: "",
       facebook_id: "",
       linkedin_id: "",
       twitter_id: "",
       insta_id: "",
      "first_name": "test",
      "last_name": "event",
      "looking": "",
      "offering": "",
      "industry": "",
      "interest": [],
      "custom_tags": "",
      "sessions": [],
      "groups": [
        global.attendeegroup
      ],
      "multiple_file": []
    }
  }

  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', about1000)
    // var data = JSON.parse(response.body.data)
    // peopleid1 = (data.userId.$oid)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
    peopleList.push(response)
});

it.only('Try to add people with more then 50 charcater in designation and organization field', async () => {

  var aboutmax1000 = 'Attendee1user'.repeat(100)
  var desiganmax50 = 'Attendee1user'.repeat(10)
  var organimax = 'Attendee1user'.repeat(10)
  const about1000 = {
    "data": {
      "phone_code": "",
      "phone": "",
      "email": "designmore500@yopmail.com",
      "is_rating": false,
      "is_featured": false,
      "img_file_name": "",
      "is_send_invite_mail": 0,
      "category_id": "",
       gender_id: "Male",
       about_id: aboutmax1000,
       designation_id: desiganmax50,
       organization_id: organimax,
       country_id: "India",
       state_id: "Rajasthan",
       city_id: "",
       website_id: "",
       facebook_id: "",
       linkedin_id: "",
       twitter_id: "",
       insta_id: "",
      "first_name": "test",
      "last_name": "event",
      "looking": "",
      "offering": "",
      "industry": "",
      "interest": [],
      "custom_tags": "",
      "sessions": [],
      "groups": [
        global.attendeegroup
      ],
      "multiple_file": []
    }
  }

  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', about1000)
    // var data = JSON.parse(response.body.data)
    // peopleid1 = (data.userId.$oid)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
    peopleList.push(response)
});


it.only('Try to add people with invaild social links', async () => {

  const invaildsocaillink = {
    "data": {
      "phone_code": "",
      "phone": "",
      "email": "invaildsocial@yopmail.com",
      "is_rating": false,
      "is_featured": false,
      "img_file_name": "",
      "is_send_invite_mail": 0,
      "category_id": "",
       gender_id: "Male",
       about_id: "",
       designation_id: "",
       organization_id: "",
       country_id: "India",
       state_id: "Rajasthan",
       city_id: "",
       website_id: "testxyz",
       facebook_id: "testxyz",
       linkedin_id: "testxyz",
       twitter_id: "testxyz",
       insta_id: "testxyz",
      "first_name": "test",
      "last_name": "event",
      "looking": "",
      "offering": "",
      "industry": "",
      "interest": [],
      "custom_tags": "",
      "sessions": [],
      "groups": [
        global.attendeegroup
      ],
      "multiple_file": []
    }
  }
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', invaildsocaillink)
  // var data = JSON.parse(response.body.data)
  // peopleid1 = (data.userId.$oid)
  expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  peopleList.push(response)
  
  
});

it.only('Try to add people with invaild gender', async () => {

  const invaildgender = {
    "data": {
      "phone_code": "",
      "phone": "",
      "email": "invaildgender@yopmail.com",
      "is_rating": false,
      "is_featured": false,
      "img_file_name": "",
      "is_send_invite_mail": 0,
      "category_id": "",
       gender_id: "testxyz",
       about_id: "",
       designation_id: "",
       organization_id: "",
       country_id: "India",
       state_id: "Rajasthan",
       city_id: "",
       website_id: "",
       facebook_id: "",
       linkedin_id: "",
       twitter_id: "",
       insta_id: "",
      "first_name": "test",
      "last_name": "event",
      "looking": "",
      "offering": "",
      "industry": "",
      "interest": [],
      "custom_tags": "",
      "sessions": [],
      "groups": [
        global.attendeegroup
      ],
      "multiple_file": []
    }
  }
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', invaildgender)
  // var data = JSON.parse(response.body.data)
  // peopleid1 = (data.userId.$oid)
  expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  peopleList.push(response)
});


// it.only('Try to add people with invaild image/upload invaild profile picture', async () => {

//   var people = new People();
//   var response = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'attendeetestyopmail.com', 'test', 'people', [global.attendeegroup])
  
// });


it.only('Try to add people with invaild phone code', async () => {

  var people = new People();
  var response = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'invaildphone@yopmail.com', 'test', 'people', [global.attendeegroup],'',"","","","","","","","","xyz","")
  peopleList.push(response)
});

it.only('Try to add people with invaild mobile number', async () => {

  var people = new People();
  var response = await people.addSingleAttendeeAndVerifyNegative(organizerUserHeader(), process.env.eventid, 'invaildphone@yopmail.com', 'test', 'people', [global.attendeegroup],'',"","","","","","","","","xyz","xyz")
  peopleList.push(response)
});
*/

it.only('delete all added users', async() => {
  var people = new People();
  people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, peopleList)
})

for (var i=0;i<=5;i++){
  it('Get and Delete added attendees on dashboard : POST /backend/api/v2/people/delete', async () => {
 
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage, 'limit': environment.HLimit }, 'post')
   var ticketid1 = (response.body.data[i].userId)
    const delete1 =
    {
      "data": {

        "ids": [ticketid1],
        "is_all": 0

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  
  });
}

it.only('Get list of interest field values on add people to check that dropdown data for interest field getting loading. : GET /backend/api/v2/people/staticfieldvalues', async () => {
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
  var list = response.body.data.map(map => map.name)
  response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
  expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(interest)
});


it.only('Filter by interest in people dashboard: POST /api/v1/people/list', async () => {
  const fiter_any =
  {
    "data": {
      "filter": {
        "group": [],
        "interest": ["Accounting"],
        "industry": [],
        "lookingfor": [],
        "offering": [],
        "designation": "",
        "organisation": "",
        "loginStatus": "",
        "is_logged_in": false,
        "is_not_logged_in": false
      }
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', fiter_any)
  expect(response.body.total_count).to.equal(1)
  expect(response.body.data[0].firstName).to.equal('joker')
  expect(response.body.data[0].lastName).to.equal('clown')
});


});
