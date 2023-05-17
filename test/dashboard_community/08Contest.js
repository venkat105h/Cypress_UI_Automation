/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/participate/delete in contest. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified : Gaurav Thapar 27th Sept 2021 06:53 PM
Description: Removed commented it blocks using old function
Modified: Biswajit Pattanaik 25th Oct 2021 05:55 PM
Description: Added the retry on failure delay
Modified: Pranjal Shah 26 Nov 2021 17:18 PM
Description: Assertion updates in search standings test case.
Modified: Biswajit 4th Jan 2022 06:40 PM
Description: Fixed one script issue
*/

import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog, organizerUserHeader, getValueFromJsonObject, People, ComunitySignupLogin, sendRequest, addTime } from '../../helper/CommonUtil'
require('dotenv').config();
var request3 = supertest(environment.baseURL3);
var fs = require('fs');
var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');

var contestnew
var ticketid1
var ticketid2
var ticketid3
var ticketid4
var contestid1
var contestid2
var contestid3
var contestid4
var contestid5
var contestpost
var commentidcontest
var contestfeedid
var Entry_contest_file
var Entry_contest_file2
var contestfeedid2
var commentidcontest1
var commentidcontest2
var optionid1
var optionid2
var contestfeedidQuiz
var imageid1
var contestidresponse
var commentFeedId
var contestresponseFeedId
var upcoming_contestid1
var ended_contestid1
var peopleList = []


describe('Verify Contest list', () => {
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

    it.only('This will get groups of people list : GET /backend/api/v2/people/groups/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        process.env.attendeegroup2 = (response.body.data[0].id)
        process.env.boothmember2 = (response.body.data[1].id)
        process.env.speaker2 = (response.body.data[2].id)
    });

    it.only('Create a Entry contest on dashbaord: POST /api/v1/contest/create', async () => {

        const contest1 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest1)
        contestid1 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Create a Quiz contest on dashboard: POST /api/v1/contest/create', async () => {

        const contest2 =

        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "multipleFile": [],
                "numberOfWinner": 10,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest2)
        contestid2 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('This will create a Entry contest on dashboard with all params :-  : POST /api/v1/contest/create', async () => {

        const contest3 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 1",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    },

                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": true,
                "isMultipleEntries": true,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": true
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest3)
        contestid3 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

  
    it.only('This will create a Quiz contest on dashboard with all params :-  : POST /api/v1/contest/create', async () => {

        const contest4 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 1",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    },

                ],
                "multipleFile": [],
                "numberOfWinner": 100,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest4)
        contestid4 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Add Question in quiz contest :-  : POST /api/v1/contest/que/create', async () => {

        const contest4 =
        {
            "data": {
                "pollQuestion": "Test 1",
                "pollStartMilli": new Date().getTime(),
                "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                "contestId": contestid4,
                "contestType": "QUIZ",
                "options": ["test 1", "rest 2"],
                "answer": "test 1"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest4)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_successfull_message);
    });
    

    it.only('Verify contest list: POST /api/v2/contests/list', async () => {

        const community383478 = {
            "payload": {
                "data": {
                    "contestType": "",
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community383478)
        expect(response.body.success.data.list[0].contestName).to.equal('Entry contest')
        expect(response.body.success.data.list[0].contestType).to.equal('ENTRY')
        expect(response.body.success.data.list[1].contestName).to.equal('Quiz contest')
        expect(response.body.success.data.list[1].contestType).to.equal('QUIZ')
        expect(response.body.success.data.list[2].contestName).to.equal('Entry contest 1')
        expect(response.body.success.data.list[3].contestName).to.equal('Quiz contest 1')
    });

    it.only('Verify contest details: POST /api/v2/contests/contest-details', async () => {

        const contestdeatilsbody = {
            "payload": {
                "data": {
                    "contestId": contestid1

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/contest-details', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestdeatilsbody)
        expect(response.body.success.data.contestName).to.equal('Entry contest')
        expect(response.body.success.data.contestType).to.equal('ENTRY')
        expect(response.body.success.data.attachmentType).to.equal('PHOTO')
    });

    it.only('Verify All entries in details: POST /api/v2/contests/entry/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "contestId": contestid1,
                    "limit": 10,
                    "page": 0,
                    "type": "ALL"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/entry/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestallentry)
    });

    it.only('Verify My entries in contest details: POST /api/v2/contests/entry/list', async () => {

        const contestmyentry = {
            "payload": {
                "data": {
                    "contestId": contestid1,
                    "limit": 10,
                    "page": 0,
                    "type": "MY"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/entry/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestmyentry)
    });

    it.only('Filter contest by contest type: POST /api/v2/contests/list', async () => {

        const contestfilterentry = {
            "payload": {
                "data": {
                    "contestType": "ENTRY",
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestfilterentry)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_list_message);
        expect(response.body.success.data.list[0].contestName).to.equal('Entry contest')
        expect(response.body.success.data.list[0].contestType).to.equal('ENTRY')
        expect(response.body.success.data.list[1].contestName).to.equal('Entry contest 1')
    });

    it.only('Filter contest by contest type as Response: POST /api/v2/contests/list', async () => {

        const contestfilterresponse = {
            "payload": {
                "data": {
                    "contestType": "RESPONSE",
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestfilterresponse)
    });

    it.only('Filter contest by contest type as QUIZ: POST /api/v2/contests/list', async () => {

        const contestfilterentry = {
            "payload": {
                "data": {
                    "contestType": "QUIZ",
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestfilterentry)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_list_message);
        expect(response.body.success.data.list[0].contestName).to.equal('Quiz contest')
        expect(response.body.success.data.list[0].contestType).to.equal('QUIZ')
        expect(response.body.success.data.list[1].contestName).to.equal('Quiz contest 1')
        expect(response.body.success.data.list[1].attachmentType).to.equal('DISCUSSION')
    });


    it.only('Search contest by name: POST  /api/v1/contest/list', async () => {

        const contest_search = {"data":{"status":"ONGOING"}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'limit' : 12, 'page' : environment.HPage, 'search': 'Entry contest' }, 'post', contest_search)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data.contest_count).to.equal(2)

    });

    it.only('Search contest by partial name: POST  /api/v1/contest/list', async () => {

        const contest_search = {"data":{"status":"ONGOING"}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit' : 12, 'page' : environment.HPage, 'search': 'Entry' }, 'post', contest_search)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data.contest_count).to.equal(2)

    });

    it.only('Search contest by upper case character name: POST  /api/v1/contest/list', async () => {

        const contest_search = {"data":{"status":"ONGOING"}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit' : 12, 'page' : environment.HPage, 'search': 'ENTRY CONTEST' }, 'post', contest_search)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data.contest_count).to.equal(2)

    });

    it.only('Search contest by lower case character name: POST  /api/v1/contest/list', async () => {

        const contest_search = {"data":{"status":"ONGOING"}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'limit' : 12, 'page' : environment.HPage, 'search': 'entry contest' }, 'post', contest_search)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data.contest_count).to.equal(2)

    });

    it.only('Search contest by wrong name: POST  /api/v1/contest/list', async () => {

        const contest_search = {"data":{"status":"ONGOING"}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit' : 12, 'page' : environment.HPage, 'search': 'Wrong Name' }, 'post', contest_search)
        expect(response.body.total_count).to.equal(0)

    });

    it.only('Create an upcoming Entry contest on dashbaord: POST /api/v1/contest/create', async () => {

        const contest1 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Upcoming entry contest",
                "startMili": (addTime(new Date(), 1)).getTime(),
                "endMili": (addTime(new Date(), 2)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest1)
        upcoming_contestid1 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Verify list of upcoming contest on dashbaord: POST /api/v1/contest/list', async () => {
  
       const upcoming_contest =
       {
        "data": {
          "status": "UPCOMING"
        }
      }      
       
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', upcoming_contest)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data.contest_count).to.equal(1)
        expect(response.body.data.contest_list[0].contestName).to.equal('Upcoming entry contest')
    });
    

    it.only('Verify Upcoming contest list: POST /api/v2/contests/list', async () => {

        const upcomingcontest = {
            "payload": {
                "data": {
                    "contestType": "",
                    "limit": 10,
                    "page": 0,
                    "status": "UPCOMING"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', upcomingcontest)
        expect(response.body.success.data.list[0].contestName).to.equal('Upcoming entry contest')
    });

    it.only('Create an ended Entry contest on dashbaord: POST /api/v1/contest/create', async () => {

        const contest1 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Ended contest",
                "startMili": (addTime(new Date(), -2)).getTime(),
                "endMili": (addTime(new Date(), -1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest1)
        ended_contestid1 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Verify list of ended contest on dashbaord: POST /api/v1/contest/list', async () => {
  
        const ended_contest =
        {"data":{"status":"ENDED"}}

         var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', ended_contest)
         expect(response.body.total_count).to.equal(1)
         expect(response.body.data.contest_count).to.equal(1)
         expect(response.body.data.contest_list[0].contestName).to.equal('Ended contest')
     });
 

    it.only('Verify ended contest list: POST /api/v2/contests/list', async () => {

        const endedcontest = {
            "payload": {
                "data": {
                    "contestType": "",
                    "limit": 10,
                    "page": 0,
                    "status": "ENDED"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource }, 'post', endedcontest)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_list_message);
        expect(response.body.success.data.list[0].contestName).to.equal('Ended contest')
    });

   
    it.only('Update Entry contests on dashbaord: POST /api/v1/contest/edit', async () => {

        const contest11 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 1 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid1 }, 'post', contest11)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update quiz contest on dashboard: POST /api/v1/contest/edit', async () => {

        const contest12 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 1 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "multipleFile": [],
                "numberOfWinner": 101,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid2 }, 'post', contest12)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update entry contest on dashboard with all params: POST /api/v1/contest/edit', async () => {

        const contest13 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 2 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": true,
                "isMultipleEntries": true,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": false,
                    "video": true
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid3 }, 'post', contest13)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update Quiz contest on dashboard with all params : POST /api/v1/contest/edit', async () => {

        const contest14 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 2 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    },
                ],
                "multipleFile": [],
                "numberOfWinner": 10,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid4 }, 'post', contest14)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Verify contest list after update: POST /api/v2/contests/list', async () => {

        const community3834 = {
            "payload": {
                "data": {
                    "contestType": "",
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community3834)
        expect(response.body.success.data.list[0].contestName).to.equal('Entry contest 1 updated')
        expect(response.body.success.data.list[0].contestType).to.equal('ENTRY')
        expect(response.body.success.data.list[1].contestName).to.equal('Quiz contest 1 updated')
        expect(response.body.success.data.list[1].contestType).to.equal('QUIZ')
        expect(response.body.success.data.list[2].contestName).to.equal('Entry contest 2 updated')
        expect(response.body.success.data.list[3].contestName).to.equal('Quiz contest 2 updated')
    });

    it.only('Get contest list which are created above in dashbaord: POST /api/v1/contest/list', async () => {
        const contest15 =
        {
            "data": {
                "status": "ONGOING"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'page' : environment.HPage, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', contest15);
        ticketid1 = (response.body.data.feed_count[0]._id)
        ticketid2 = (response.body.data.feed_count[1]._id)
        ticketid3 = (response.body.data.feed_count[2]._id)
        ticketid4 = (response.body.data.feed_count[3]._id)
    });

    it.only('Get contest list in dashbaord: POST /api/v1/contest/list', async () => {
        const contest15 =
        {
            "data": {
                "status": "ONGOING"
            }
        }
        
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/list',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage },'post',contest15);
    });

    it.only('Upload image in contest: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "png",
                    "contentType": "image/png",
                    "pathType": "feed",
                    "uploadType": "CONTEST_IMAGE"
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        Entry_contest_file = (response.body.success.data.urlLists[0].fileName);
    });

    it.only('Participate in Entry Contest : POST /api/v2/contests/entry/create', async () => {

        const EntryContest =
        {
            "payload": {
                "data":
                {
                    "contestId": contestid1,
                    "info": "Test Post",
                    "image_height": "415",
                    "image_width": "800",
                    "feedType": "PHOTO",
                    "imageFileName": Entry_contest_file
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/create', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'},'post',EntryContest);
        contestfeedid = (response.body.success.data._id);
    });

    it.only('Sign in with otp: POST /api/v2/users/login', async () => {
        // const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community2 = {

            "payload": {
                "data": {
                    "email": "asii9s0s@gmail.com",
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }
    
        var response = await sendRequest(environment.baseURL3,'/api/v2/users/login',{'Authorization' : process.env.accessTokenLoginPage, 'Content-Type' : 'application/json', 'source' : 'COMMUNITY' },'post',community2);
        process.env.accesstokenloginusernotification = (response.body.success.data.accessToken);
    });

    it.only('Upload image in contest: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "png",
                    "contentType": "image/png",
                    "pathType": "feed",
                    "uploadType": "CONTEST_IMAGE"
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3,'/api/v2/get-signed-url',{'Authorization' : process.env.accesstokenloginusernotification, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type': 'application/json'},'post',get_signed_url);
        Entry_contest_file2 = (response.body.success.data.urlLists[0].fileName);
    });

    it.only('Participate in Entry Contest : POST /api/v2/contests/entry/create', async () => {

        const EntryContest =
        {
            "payload": {
                "data":
                {
                    "contestId": contestid1,
                    "info": "Test Post",
                    "image_height": "415",
                    "image_width": "800",
                    "feedType": "PHOTO",
                    "imageFileName": Entry_contest_file2
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/create',{'Authorization' : process.env.accesstokenloginusernotification, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',EntryContest);
        contestfeedid2 = (response.body.success.data._id);
    });

    it.only('Contest feed like : POST /api/v2/contests/feed/like', async () => {

        const contestfeedlike = {
            "payload": {
                "data": {
                    "feedId": contestfeedid,
                    "isLike": "YES"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed/like',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'}, 'post',contestfeedlike);
        expect(response.body.success.data.isLike).to.equal("YES")
        expect(response.body.success.data.count).to.equal('1')
        expect(response.body.success.data.message).to.equal("Liked")
    });

    it.only('Contest feed like with 2nd user : POST /api/v2/contests/feed/like', async () => {

        const contestfeedlike = {
            "payload": {
                "data": {
                    "feedId": contestfeedid,
                    "isLike": "YES"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed/like',{'Authorization' : process.env.accesstokenloginusernotification, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestfeedlike);
        expect(response.body.success.data.isLike).to.equal("YES")
        expect(response.body.success.data.count).to.equal('1')
        expect(response.body.success.data.message).to.equal("Liked")
    });

    it.only('Verify contest feed like list in dashbaord: POST /api/v1/contest/feed/like', async () => {
        const contest_like =
        {"data":{"action":"likes"}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/feed/like',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': contestid1, 'feedid':contestfeedid},'post',contest_like);
        expect(response.body.total_count).to.equal(2)
    });


    it.only('Contest feed Unlike : POST /api/v2/contests/feed/like', async () => {

        const contestfeedlike = {
            "payload": {
                "data": {
                    "feedId": contestfeedid,
                    "isLike": "NO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed/like',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestfeedlike)
        expect(response.body.success.data.isLike).to.equal("NO")
        expect(response.body.success.data.message).to.equal("Unliked")
    });

    it.only('Verify contest feed like list after unlike in dashbaord: POST /api/v1/contest/feed/like', async () => {
        const contest_like =
        {"data":{"action":"likes"}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/feed/like',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': contestid1, 'feedid':contestfeedid},'post',contest_like);
        expect(response.body.total_count).to.equal(1)
    });

    it.only('Comment in Entry contest with 1st user : POST /api/v2/contests/feed-comment/create', async () => {

        const contest_entry_comment = {
            "payload": {
                "data": {
                    "comment": "Good Entry First",
                    "feedId": contestfeedid
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contest_entry_comment);
        commentidcontest1 = (response.body.success.data.comment._id)
        expect(response.body.success.data.comment.comment).to.equal("Good Entry First")
    });

    it.only('Comment in Entry contest with 2nd user : POST /api/v2/contests/feed-comment/create', async () => {

        const contest_entry_comment = {
            "payload": {
                "data": {
                    "comment": "Good Entry Second",
                    "feedId": contestfeedid
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginusernotification, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contest_entry_comment);
        commentidcontest2 = (response.body.success.data.comment._id)
        expect(response.body.success.data.comment.comment).to.equal("Good Entry Second")
    });

    it.only('Comment in Entry contest with 1st user with 200 Character : POST /api/v2/contests/feed-comment/create', async () => {

        const max200 = 'ThisIsGoodThisIsGood'.repeat(10)
        const create_contest_feed_comment_max = {
            "payload": {
                "data": {
                    "comment": max200,
                    "feedId": contestfeedid
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',create_contest_feed_comment_max);
    });

    it.only('Comment in Entry contest with 1st user more than 200 Character : POST /api/v2/contests/feed-comment/create', async () => {

        const more200 = 'ThisIsGoodThisIsGoodText'.repeat(10)
        const create_contest_feed_comment_max = {
            "payload": {
                "data": {
                    "comment": more200,
                    "feedId": contestfeedid
                }
            }
        }


        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',create_contest_feed_comment_max);
    });

    it.only('Verify contest feed comment list in dashbaord: POST /api/v1/contest/feed/like', async () => {
        const contest_like =
        {"data":{"action":"comments"}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/feed/like',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': contestid1, 'feedid':contestfeedid},'post',contest_like);
        expect(response.body.total_count).to.equal(4)
        expect(response.body.data[0].comment).to.equal("Good Entry First")
    });

    it.only('Delete comment in Entry contest of 1st user : POST /api/v2/contests/feed-comment/delete', async () => {

        const contestrsponsecommentdelete = {
            "payload": {
                "data": {
                    "commentId": commentidcontest1,
                    "feedId": contestfeedid
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/delete',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestrsponsecommentdelete);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_feed_comment_delete_message);
        expect(response.body.success.code).to.equal("FEED_COMMENT_DELETE")      
    });

    it.only('Verify contest feed comment list after deleting comment in dashbaord: POST /api/v1/contest/feed/like', async () => {
        const contest_like =
        {"data":{"action":"comments"}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/feed/like',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': contestid1, 'feedid':contestfeedid},'post',contest_like);
        expect(response.body.total_count).to.equal(3)
        expect(response.body.data[0].comment).to.equal("Good Entry Second")
    });

    it.only('Comment in Entry contest with 1st user for checking delete from dashboard : POST /api/v2/contests/feed-comment/create', async () => {

        const contest_entry_comment = {
            "payload": {
                "data": {
                    "comment": "Good Entry First",
                    "feedId": contestfeedid
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contest_entry_comment);
        commentidcontest1 = (response.body.success.data.comment._id)
        expect(response.body.success.data.comment.comment).to.equal("Good Entry First")
    });

    it.only('Delete comment from contest feed from dashboard: POST /api/v1/contest/comment/delete', async () => {
        const contest_like =
        {"data":{"feedId": contestfeedid}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/comment/delete',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': contestid1, 'commentid':commentidcontest1},'post',contest_like);
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_feed_comment_delete_dashboard_message)
    });

    it.only('Verify All entries in details: POST /api/v2/contests/entry/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "contestId": contestid1,
                    "limit": 10,
                    "page": 0,
                    "type": "ALL"

                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
    });

    it.only('contest feed partial search from dashboard: POST /api/v1/contest/entries', async () => {
        const contest_like =
        {"data":{"contestId":contestid1}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/entries',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'search': 'test'},'post',contest_like);
    });

    it.only('Verify My entries in contest details: POST /api/v2/contests/entry/list', async () => {

        const contestmyentry = {
            "payload": {
                "data": {
                    "contestId": contestid1,
                    "limit": 10,
                    "page": 0,
                    "type": "MY"

                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
    });

    it.only('Report a feed in contest: POST /api/v2/contests/report', async () => {

        const contestmyentry = {
            "payload": {
                "data": {
                    "feedId": contestfeedid2,
                    "contestId": contestid1,
                    "reason": "It's spam"

                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/report',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_feed_report_message);
    });

    it.only('Contest feed delete : POST /api/v2/contests/feed/delete', async () => {

        const contestfeeddelete = {
            "payload": {
                "data": {
                    "feedId": contestfeedid2
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed/delete',{'Authorization' : process.env.accesstokenloginusernotification, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestfeeddelete)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_feed_delete_message);
        expect(response.body.success.code).to.equal("DELETED_FEED");
    });

    it.only('Verify Quiz contest details: POST /api/v2/contests/quiz/list', async () => {

        const contestmyentry =
        {
            "payload": {
                "data": {
                    "contestId": contestid4,
                    "limit": 10,
                    "page": 0,
                    "status": "ONGOING"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/quiz/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
        optionid1 = (response.body.success.data.list[0].options[0]._id)
        optionid2 = (response.body.success.data.list[0].options[1]._id)
        contestfeedidQuiz = (response.body.success.data.list[0]._id)
    });

    it.only('Submit Answer in Quiz Contest: POST /api/v2/contests/submit-quiz', async () => {

        const contestmyentry =
        {
            "payload": {
                "data": {
                    "contestId": contestid4,
                    "answers": [{
                        "feedId": contestfeedidQuiz,
                        "optionId": optionid1
                    }]
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/submit-quiz',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_quiz_answer_message);
    });

  

    it.only('Verify Quiz contest details after answer submission: POST /api/v2/contests/contest-details', async () => {

        const contestmyentry =
        {
            "payload": {
                "data": {
                    "contestId":contestid4,
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/contest-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
        expect(response.body.success.data.entries).to.equal(1);
        expect(response.body.success.data.numberOfWinner).to.equal(10);
    });


    it.only('Image Response Contest upload : POST /backend/api/v2/events/uploads', (done) => {

        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .field('Content-Type', 'multipart/form-data')
            .field('location', 'contestImage')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                imageid1 = (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });


    it.only('Create a Response contest on dashbaord: POST /api/v1/contest/create', async () => {
        const contest1 =
        {
            "data": {
                "contestType": "RESPONSE",
                "contestName": "Test Response Contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "rules": "", "multipleFile": [],
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "caption": "This is Test Response",
                "content": imageid1,
                "maxChar": 100,
                "minChar": 0,
                "isMultipleEntries": false,
                "isModerateEntries": false,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "width": 1919,
                "height": 996
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/create',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',contest1)
        contestidresponse = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Verify contest details Response: POST /api/v2/contests/contest-details', async () => {

        const contestdeatilsbody = {
            "payload": {
                "data": {
                    "contestId": contestidresponse

                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/contest-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
        contestresponseFeedId = (response.body.success.data.feedId)
        expect(response.body.success.data.contestName).to.equal('Test Response Contest')
        expect(response.body.success.data.contestType).to.equal('RESPONSE')
        expect(response.body.success.data.attachmentType).to.equal('DISCUSSION')
    });

    it.only('Create post feed in Response Contest: POST /api/v2/contests/feed-comment/create', async () => {

        const contestdeatilsbody =
        {
            "payload": {
                "data":
                {
                    "comment": "Hello Response Contest",
                    "feedId": contestresponseFeedId
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
        commentFeedId = (response.body.success.data.comment._id)
    });

    it.only('Create post feed in Response Contest with charcater limit of 100: POST /api/v2/contests/feed-comment/create', async () => {

        const max100 = 'ThisIsGood'.repeat(10)
        const contestdeatilsbody =
        {
            "payload": {
                "data":
                {
                    "comment": max100,
                    "feedId": contestresponseFeedId
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
    });

    it.only('Create post feed in Response Contest with charcater limit of more than 100: POST /api/v2/contests/feed-comment/create', async () => {

        const more100 = 'ThisIsGoodThisIsGood'.repeat(10)
        const contestdeatilsbody =
        {
            "payload": {
                "data":
                {
                    "comment": more100,
                    "feedId": contestresponseFeedId
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
    });

    it.only('Contest feed like : POST /api/v2/contests/feed-comment/like', async () => {

        const contestfeedlike = {
            "payload": {
                "data":
                {
                    "commentId": commentFeedId,
                    "feedId": contestresponseFeedId,
                    "isLike": "YES"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/like',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestfeedlike)
        expect(response.body.success.data.isLike).to.equal("YES")
        expect(response.body.success.data.count).to.equal('1')
        expect(response.body.success.data.message).to.equal("Liked")
    });

    it.only('Contest feed Unlike : POST /api/v2/contests/feed-comment/like', async () => {

        const contestfeedlike =
        {
            "payload": {
                "data":
                {
                    "commentId": commentFeedId,
                    "feedId": contestresponseFeedId,
                    "isLike": "NO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/like',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestfeedlike);
        expect(response.body.success.data.isLike).to.equal("NO")
        expect(response.body.success.data.message).to.equal("Unliked")
    });

    it('Comment in response contest : POST /api/v2/contests/feed-comment/create', async () => {

        const contestrsponsecomment = {
            "payload": {
                "data": {
                    "comment": "test gaurav",
                    "feedId": "60c35ac3286b4f46c25d5790"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestrsponsecomment);
        commentidcontest = (response.body.success.data.comment._id);
    });


    //<-- Adding the cases for contest as per review-->

    it.only('Add entry contest with both image and video attachment options with group attendee', async () => {
        global.entryContestOneStartTime = new Date().getTime()
        global.entryContestOneEndTime = (addTime(new Date(), 1)).getTime()
        const contest1 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest with Image/Video/Text",
                "startMili": global.entryContestOneStartTime,
                "endMili": global.entryContestOneEndTime,
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "isAttachmentMandatory": false,
                "isAttendeeCanComment": false,
                "isAttendeeCanSee": false,
                "isModerateEntries": false,
                "isMultipleEntries": true,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": true
                },
                "rules": "Test Description"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest1)
        contestid5 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it('Verify contest list on dashboard verify the contest does not show on page 1 : POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(response.body.total_count).to.equal(6)
        expect(response.body.data.contest_count).to.equal(6)
        expect(response.body.total_page).to.equal(2)
        expect(response.body.current_page).to.equal(1)
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest list on dashboard and attachment type as PHOTO,VIDEO on page 2: POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': 12, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(response.body.data.contest_count).to.equal(6)
        expect(response.body.current_page).to.equal(1)
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.isMultipleEntries).to.equal(1)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test Description');

    });

    it.only('Verify created contest in contest list in community : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test Description');
    });

    it.only('Verify created contest details on community : POST /api/v2/contests/contest-details', async () => {
        const contestdetail = {"payload":{"data":{"contestId":contestid5}}}
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/contest-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdetail);
        var contestObj = response.body.success.data
        expect(contestObj._id).to.equal(contestid5)
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.isMultipleEntries).to.equal(1)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test Description');
        expect(contestObj.entries).to.equal(0)
        expect(contestObj.myEntries).to.equal(0)
    });

    it.only('add a speaker from dashboard with mandatory param', async () => {
        var people = new People();
        var attendeeId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'contestspeaker@yopmail.com', 'Contest', 'Speaker', [process.env.speaker2])
        peopleList.push(attendeeId1)
    });

    it.only('Login with otp for speaker (contestspeaker@yopmail) : POST /api/v2/users/login', async () =>{
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstokenloginspeaker = await signup.loginWithOtp(global.accessTokenLoginPage, 'contestspeaker@yopmail.com', '1234')
    })

    it.only('Verify created contest is not displayed for speaker : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
        const virtual11 = {
            "data": {
              "booth_size": "LARGE",
              "category": "category",
              "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
              "email": "testfghanistan@yopmail.com",
              "fb_url": "https://facebook.com",
              "instagram_url": "https://instagram.com",
              "is_featured": true,
              "is_rating": true,
              "linked_url": "https://linkedin.com",
              "list_banner_image": [
                {
                  "img_file_name": ""
                }
              ],
              "location": "afghnaistan adddres",
              "multiple_file": [],
              "name": "TestBoothProfile",
              "phone": "9988776666",
              "phone_code": "+93",
              "position": 1,
              "profile_img": "",
              "spotlight_banner": [
                {
                  "img_file_name": ""
                }
              ],
              "spotlight_banner_type": "IMAGE",
              "tags": "",
              "twitter_url": "https://twitter.com",
              "website_url": "https://google.com",
              "whatsapp_no": "12345678"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'Content-Type': 'application/json'},'post',virtual11)
        global.virtualboothid = (response.body.data.ids.exhibitor_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    });

    it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People('boothmember', global.virtualboothid);
        var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'contestboothmember@yopmail.com', 'contest', 'boothmember', [process.env.boothmember2])
        peopleList.push(peopleId)
    });

    it.only('Login with otp for boothmember (contestboothmember@yopmail.com) : POST /api/v2/users/login', async () =>{
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstokenloginboothmember = await signup.loginWithOtp(global.accessTokenLoginPage, 'contestboothmember@yopmail.com', '1234')
    });

    it.only('Verify created contest is not displayed for boothmember : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Update entry contest and use speaker as display filter : POST /api/v1/contest/edit', async () => {
        const updateContest = {
            "data": {
              "contestType": "ENTRY",
              "contestName": "Entry contest with Image/Video/Text",
              "startMili": global.entryContestOneStartTime,
              "endMili": global.entryContestOneEndTime,
              "rules": "Test description",
              "multipleFile": [],
              "banner": "",
              "maxChar": 100,
              "minChar": 0,
              "isAttachmentMandatory": false,
              "isMultipleEntries": true,
              "isModerateEntries": false,
              "isAttendeeCanComment": false,
              "isAttendeeCanSee": false,
              "groups": [
                {
                  "name": "Speaker",
                  "isMain": "YES",
                  "type": "SPEAKER",
                  "id": process.env.speaker2
                }
              ],
              "postSupportedAttachement": {
                "image": true,
                "video": true
              }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid5}, 'post', updateContest)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Verify created contest is not displayed for attendee : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify created contest is not displayed for boothmember : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest is displayed in contest list in community for speaker : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test description');
    });

    it.only('Update entry contest and use boothmember as display filter : POST /api/v1/contest/edit', async () => {
        const updateContest = {
            "data": {
              "contestType": "ENTRY",
              "contestName": "Entry contest with Image/Video/Text",
              "startMili": global.entryContestOneStartTime,
              "endMili": global.entryContestOneEndTime,
              "rules": "Test description",
              "multipleFile": [],
              "banner": "",
              "maxChar": 100,
              "minChar": 0,
              "isAttachmentMandatory": false,
              "isMultipleEntries": true,
              "isModerateEntries": false,
              "isAttendeeCanComment": false,
              "isAttendeeCanSee": false,
              "groups": [
                {
                  "name": "Booth Member",
                  "isMain": "YES",
                  "type": "BOOTHMEMBER",
                  "id": process.env.boothmember2
                }
              ],
              "postSupportedAttachement": {
                "image": true,
                "video": true
              }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid5}, 'post', updateContest)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Verify created contest is not displayed for attendee : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify created contest is not displayed for speaker : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest is displayed in contest list in community for boothmember : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test description');
    });

    it.only('Update entry contest and use attendee, boothmember and speaker as display filter : POST /api/v1/contest/edit', async () => {
        const updateContest = {
            "data": {
              "contestType": "ENTRY",
              "contestName": "Entry contest with Image/Video/Text",
              "startMili": global.entryContestOneStartTime,
              "endMili": global.entryContestOneEndTime,
              "rules": "Test description",
              "multipleFile": [],
              "banner": "",
              "maxChar": 100,
              "minChar": 0,
              "isAttachmentMandatory": false,
              "isMultipleEntries": true,
              "isModerateEntries": false,
              "isAttendeeCanComment": false,
              "isAttendeeCanSee": true,
              "groups": [
                {
                  "name": "Attendee",
                  "isMain": "YES",
                  "type": "ATTENDEE",
                  "id": process.env.attendeegroup2
                },
                {
                    "name": "Speaker",
                    "isMain": "YES",
                    "type": "SPEAKER",
                    "id": process.env.speaker2
                },
                {
                      "name": "Booth Member",
                      "isMain": "YES",
                      "type": "BOOTHMEMBER",
                      "id": process.env.boothmember2
                }
              ],
              "postSupportedAttachement": {
                "image": true,
                "video": true
              }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid5}, 'post', updateContest)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Verify created contest in contest list in community : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test description');
    });

    it.only('Verify contest is displayed in contest list in community for speaker : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test description');
    });

    it.only('Verify contest is displayed in contest list in community for boothmember : POST /api/v2/contests/list', async () => {
        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.isAttachmentMandatory).to.equal(0)
        expect(contestObj.attachmentType).to.equal('PHOTO,VIDEO');
        expect(contestObj.rules).to.equal('Test description');
    });

    it.only('Create an entry using only text in the contest : POST /api/v2/contests/entry/create', async () => {
        const createEntry = {
            "payload": {
              "data": {
                "contestId": contestid5,
                "info": "Test feed Text",
                "feedType": "DISCUSSION"
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/create', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',createEntry);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_entry_created_message)
        expect(response.body.success.data.isApproved).to.equal('YES')
        expect(response.body.success.data.info).to.equal('Test feed Text')
        expect(response.body.success.data.feedType).to.equal('DISCUSSION')
        global.entryContestOneEntryOneId = (response.body.success.data._id)
    });

    it.only('Upload image in contest: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "png",
                    "contentType": "image/png",
                    "pathType": "feed",
                    "uploadType": "CONTEST_IMAGE"
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        global.entryContestFile = (response.body.success.data.urlLists[0].fileName);
        global.entryContestFileUploadUrl = (response.body.success.data.urlLists[0].uploadURL)
    });

    it.only('Upload image to aws upload url', function(done){
        const req = require('supertest')
        var awsHost = 'https://' + global.entryContestFileUploadUrl.split('/')[2]
        var awsUploadUrl = global.entryContestFileUploadUrl.substr(awsHost.length)
        const fs = require('fs')
        let testImage = './images_branding/event_LOGO.png'
        req(awsHost).put(awsUploadUrl)
        .set('Content-Type','image/png')
        .send(fs.readFileSync(testImage))
        .end((err, response) => {
            expect(response.status).to.equal(200);
            done();
        });
    });

    it.only('Participate in Entry Contest with image : POST /api/v2/contests/entry/create', async () => {
        const EntryContest =
        {
            "payload": {
                "data":
                {
                    "contestId": contestid5,
                    "info": "Test Post Image",
                    "image_height": "415",
                    "image_width": "800",
                    "feedType": "PHOTO",
                    "imageFileName": global.entryContestFile
                }
            }
        } 
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/create', {'Authorization' : global.accesstokenloginspeaker, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'},'post',EntryContest);
        global.entryContestOneEntryTwoId = (response.body.success.data._id);
    });

    it.only('Upload video in in entry contest: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "mp4",
                    "contentType": "video/mp4",
                    "pathType": "feed",
                    "uploadType": "CONTEST_VIDEO"
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        global.entryContestFile2 = (response.body.success.data.urlLists[0].fileName);
        global.entryContestFileUploadUrl2 = (response.body.success.data.urlLists[0].uploadURL)
    });

    it.only('Upload video to aws upload url', function(done){
        const req = require('supertest')
        var awsHost = 'https://' + global.entryContestFileUploadUrl2.split('/')[2]
        var awsUploadUrl = global.entryContestFileUploadUrl2.substr(awsHost.length)
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

    it.only('Upload video thumbnail image in contest: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "png",
                    "contentType": "image/png",
                    "pathType": "feed",
                    "uploadType": "CONTEST_VIDEO_THUMB"
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        global.entryContestFile3 = (response.body.success.data.urlLists[0].fileName);
        global.entryContestFileUploadUrl3 = (response.body.success.data.urlLists[0].uploadURL)
    });

    it.only('Upload image to aws upload url', function(done){
        const req = require('supertest')
        var awsHost = 'https://' + global.entryContestFileUploadUrl3.split('/')[2]
        var awsUploadUrl = global.entryContestFileUploadUrl3.substr(awsHost.length)
        const fs = require('fs')
        let testImage = './images_branding/Network_thumb.png'
        req(awsHost).put(awsUploadUrl)
        .set('Content-Type','image/png')
        .send(fs.readFileSync(testImage))
        .end((err, response) => {
            expect(response.status).to.equal(200);
            done();
        });
    });

    it.only('Participate in Entry Contest with video : POST /api/v2/contests/entry/create', async () => {
        const EntryContest =
        {
            "payload": {
                "data":
                {
                    "contestId": contestid5,
                    "info": "Test Post video",
                    "feedType": "VIDEO",
                    "imageUrl": global.entryContestFile3,
                    "video": global.entryContestFile2,
                    "video_sub_type": "NATIVE"
                }
            }
        } 
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/entry/create', {'Authorization' : global.accesstokenloginboothmember, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'},'post',EntryContest);
        global.entryContestOneEntryThreeId = (response.body.success.data._id);
    });

    it.only('Verify contest list entries count dashboard : POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': 2, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        expect(getValueFromJsonObject(response.body, "$.data.feed_count[?(@._id == '" + contestid5 + "')]").count).to.equal(3)
    });

    it.only('Verify contest feed entries on dashboard : POST /api/v1/contest/entries', async () => {
        const contest_entries =
        {"data":{"contestId":contestid5}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/entries',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'sort': 1, 'search': ''},'post',contest_entries);
        expect(response.body.total_count).to.equal(3)
        expect(response.body.data[2].feedType).to.equal('DISCUSSION')
        expect(response.body.data[2]._id).to.equal(global.entryContestOneEntryOneId)
        expect(response.body.data[2].contestId).to.equal(contestid5)
        expect(response.body.data[2].info).to.equal('Test feed Text')
        expect(response.body.data[2].userId.user_name).to.equal('joker clown')
        expect(response.body.data[1].feedType).to.equal('PHOTO')
        expect(response.body.data[1]._id).to.equal(global.entryContestOneEntryTwoId)
        expect(response.body.data[1].contestId).to.equal(contestid5)
        expect(response.body.data[1].info).to.equal('Test Post Image')
        expect(response.body.data[1].image.thumb).to.equal(global.entryContestFile)
        expect(response.body.data[1].image.orignal).to.equal(global.entryContestFile)
        expect(response.body.data[1].image.height).to.equal('415')
        expect(response.body.data[1].image.width).to.equal('800')
        expect(response.body.data[1].userId.user_name).to.equal('contest speaker')
        expect(response.body.data[0].feedType).to.equal('VIDEO')
        expect(response.body.data[0]._id).to.equal(global.entryContestOneEntryThreeId)
        expect(response.body.data[0].info).to.equal('Test Post video')
        expect(response.body.data[0].userId.user_name).to.equal('contest boothmember')
        expect(response.body.data[0].contestId).to.equal(contestid5)
        expect(response.body.data[0].video).to.equal(global.entryContestFile2)
        expect(response.body.data[0].imageUrl).to.equal(global.entryContestFile3)
    });

    it.only('Verify All entries in community contest details: POST /api/v2/contests/entry/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "contestId": contestid5,
                    "limit": 10,
                    "page": 0,
                    "type": "ALL"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/entry/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', contestallentry)
        expect(response.body.success.data.myEntries).to.equal(1)
        expect(response.body.success.data.entries).to.equal(3)
        expect(response.body.success.data.feeds[2].feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.feeds[2]._id).to.equal(global.entryContestOneEntryOneId)
        expect(response.body.success.data.feeds[2].contestId).to.equal(contestid5)
        expect(response.body.success.data.feeds[2].info).to.equal('Test feed Text')
        expect(response.body.success.data.feeds[2].user.firstName).to.equal('joker')
        expect(response.body.success.data.feeds[2].user.lastName).to.equal('clown')
        expect(response.body.success.data.feeds[1].feedType).to.equal('PHOTO')
        expect(response.body.success.data.feeds[1]._id).to.equal(global.entryContestOneEntryTwoId)
        expect(response.body.success.data.feeds[1].contestId).to.equal(contestid5)
        expect(response.body.success.data.feeds[1].info).to.equal('Test Post Image')
        expect(response.body.success.data.feeds[1].image.thumb).to.equal(global.entryContestFile)
        expect(response.body.success.data.feeds[1].image.orignal).to.equal(global.entryContestFile)
        expect(response.body.success.data.feeds[1].image.height).to.equal('415')
        expect(response.body.success.data.feeds[1].image.width).to.equal('800')
        expect(response.body.success.data.feeds[1].user.firstName).to.equal('Contest')
        expect(response.body.success.data.feeds[1].user.lastName).to.equal('Speaker')
        expect(response.body.success.data.feeds[0].feedType).to.equal('VIDEO')
        expect(response.body.success.data.feeds[0].video_sub_type).to.equal('NATIVE')
        expect(response.body.success.data.feeds[0]._id).to.equal(global.entryContestOneEntryThreeId)
        expect(response.body.success.data.feeds[0].info).to.equal('Test Post video')
        expect(response.body.success.data.feeds[0].user.firstName).to.equal('Contest')
        expect(response.body.success.data.feeds[0].user.lastName).to.equal('Boothmember')
        expect(response.body.success.data.feeds[0].contestId).to.equal(contestid5)
        expect(response.body.success.data.feeds[0].video).to.equal(global.entryContestFile2)
        expect(response.body.success.data.feeds[0].imageUrl).to.equal(global.entryContestFile3)
    });

    it.only('verify the image is visible in image entry', async () => {
        var response = await sendRequest(environment.baseURL4, '/contest/' + process.env.eventid + '/' + global.entryContestFile, {}, 'get')
    });

    it.only('verify the video thumb image is visible in video entry', async () => {
        var response = await sendRequest(environment.baseURL4, '/contest/' + process.env.eventid + '/videos/thumb/' + global.entryContestFile3, {}, 'get')
    });

    it.only('verify the video visible in video entry',  (done) => {
        const req = require('supertest')
        req(environment.baseURL4).get('/contest/' + process.env.eventid + '/videos/' + global.entryContestFile2)
        .end((err, response) => {
            expect(response.status).to.equal(200)
            done()
        })
    });

    it.only('Update entry contest and make the end time now : POST /api/v1/contest/edit', async () => {
        const updateContest = {
            "data": {
              "contestType": "ENTRY",
              "contestName": "Entry contest with Image/Video/Text",
              "startMili": global.entryContestOneStartTime,
              "endMili": new Date().getTime(),
              "rules": "Test description",
              "multipleFile": [],
              "banner": "",
              "maxChar": 100,
              "minChar": 0,
              "isAttachmentMandatory": false,
              "isMultipleEntries": true,
              "isModerateEntries": false,
              "isAttendeeCanComment": false,
              "isAttendeeCanSee": true,
              "groups": [
                {
                    "name": "Attendee",
                    "isMain": "YES",
                    "type": "ATTENDEE",
                    "id": process.env.attendeegroup2
                },
                {
                    "name": "Speaker",
                    "isMain": "YES",
                    "type": "SPEAKER",
                    "id": process.env.speaker2
                },
                {
                    "name": "Booth Member",
                    "isMain": "YES",
                    "type": "BOOTHMEMBER",
                    "id": process.env.boothmember2
                }
              ],
              "postSupportedAttachement": {
                "image": true,
                "video": true
              }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion , 'contest_id': contestid5}, 'post', updateContest)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Verify contest does not show up in ongoing tab on dashboard : POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        expect(response.body.total_count).to.equal(5)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest show up in ended contest tab on dashboard : POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ENDED"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.isActive).to.equal(1)
        expect(contestObj.isWinnerDeclared).to.equal(0)
        expect(contestObj.winningCriteria).to.equal('ADMIN')
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text')
        expect(contestObj.rules).to.equal('Test description')
        expect(contestObj._id).to.equal(contestid5)
        expect(response.body.total_count).to.equal(2)
    });

    it.only('Verify contest is not showing up in community ongoing contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
        expect(response.body.success.data.nextTab.upcoming).to.equal(1)
        expect(response.body.success.data.nextTab.ongoing).to.equal(5)
        expect(response.body.success.data.nextTab.ended).to.equal(2)
    });

    it.only('Verify contest showing up in community ended contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ENDED",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.rules).to.equal('Test description')
        expect(contestObj._id).to.equal(contestid5)
        expect(contestObj.feedCount).to.equal(3)
        expect(response.body.success.data.nextTab.upcoming).to.equal(1)
        expect(response.body.success.data.nextTab.ongoing).to.equal(5)
        expect(response.body.success.data.nextTab.ended).to.equal(2)
    });

    it.only('shortlist text feed entry for new contest : POST /api/v1/contest/entries/shortlist_unshortlist', async () => {
        const contestEntryShortlist = {
            "data": {
              "contestId": contestid5,
              "isShortlisted": "YES",
              "feedId": global.entryContestOneEntryOneId
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entries/shortlist_unshortlist', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestEntryShortlist)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_shortlist_successful_message)
    });

    it.only('Verify shortlisted entry does not show up on entries list : POST /api/v1/contest/entries', async () => {
        const contest_entries =
        {"data":{"contestId":contestid5}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/entries',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'sort': 1, 'search': ''},'post',contest_entries);
        expect(response.body.total_count).to.equal(2)
        expect(getValueFromJsonObject(response.body, "$.data[?(@._id == '" + global.entryContestOneEntryOneId + "')]")).to.be.undefined
    });

    it.only('Verify the shortlisted entry in contest winners list : POST /api/v1/contest/entry/winners', async ()=>{
        const contestWinnerPayload = {"data":{"contestId":contestid5}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entry/winners', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'sort': 1, 'search': ''}, 'post', contestWinnerPayload)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.contestOver).to.equal(1)
        expect(response.body.isWinnerDeclared).to.equal(0)
        expect(response.body.contestName).to.equal('Entry contest with Image/Video/Text')
        var contestObj = getValueFromJsonObject(response.body, "$.data[?(@._id == '" + global.entryContestOneEntryOneId + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.isShortlisted).to.equal(1)
        expect(contestObj.isWinner).to.equal(0)
        expect(contestObj.info).to.equal('Test feed Text')
        expect(contestObj.feedType).to.equal('DISCUSSION')
        expect(contestObj.userId.user_name).to.equal('joker clown')
    });

    it.only('Un-shortlist text feed entry for new contest : POST /api/v1/contest/entries/shortlist_unshortlist', async () => {
        const contestEntryShortlist = {
            "data": {
              "contestId": contestid5,
              "isShortlisted": "NO",
              "feedId": global.entryContestOneEntryOneId
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entries/shortlist_unshortlist', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestEntryShortlist)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_unshortlist_successful_message)
    });

    it.only('Verify the shortlisted entry is removed from contest winners list : POST /api/v1/contest/entry/winners', async ()=>{
        var contestWinnerPayload = {"data":{"contestId":contestid5}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entry/winners', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'sort': 1, 'search': ''}, 'post', contestWinnerPayload)
        expect(response.body.total_count).to.equal(0)
        expect(response.body.contestOver).to.equal(1)
        expect(response.body.isWinnerDeclared).to.equal(0)
        expect(response.body.contestName).to.equal('Entry contest with Image/Video/Text')
        var contestObj = getValueFromJsonObject(response.body, "$.data[?(@._id == '" + global.entryContestOneEntryOneId + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify un-shortlisted entry shows up on entries list : POST /api/v1/contest/entries', async () => {
        const contest_entries =
        {"data":{"contestId":contestid5}}
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/entries',{ 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage, 'sort': 1, 'search': ''},'post',contest_entries);
        expect(response.body.total_count).to.equal(3)
        var contestObj = getValueFromJsonObject(response.body, "$.data[?(@._id == '" + global.entryContestOneEntryOneId + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.isShortlisted).to.equal(0)
        expect(contestObj.info).to.equal('Test feed Text')
        expect(contestObj.feedType).to.equal('DISCUSSION')
        expect(contestObj.userId.user_name).to.equal('joker clown')
    });

    it.only('shortlist video feed entry for new contest : POST /api/v1/contest/entries/shortlist_unshortlist', async () => {
        const contestEntryShortlist = {
            "data": {
              "contestId": contestid5,
              "isShortlisted": "YES",
              "feedId": global.entryContestOneEntryThreeId
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entries/shortlist_unshortlist', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestEntryShortlist)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_shortlist_successful_message)
    });

    it.only('declare contest winner by selecting the video feed entry : POST /api/v1/contest/winners/declare', async ()=> {
        const contestWinnerDeclare = {
            "data": {
              "contestId": contestid5,
              "entryWinnerList": [
                global.entryContestOneEntryThreeId
              ]
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/winners/declare', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestWinnerDeclare)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_declare_winner_succesful_message)
    })

    it.only('Verify contest winner declared in community my participant contest lists : POST /api/v2/contests/my-participants', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/my-participants',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.rules).to.equal('Test description')
        expect(contestObj.isWinnerDeclared).to.equal(1)
        expect(contestObj.winner.count).to.equal(1)
        expect(contestObj.winner.isWinnerDeclared).to.equal(true)
        expect(contestObj.winner.list[0].user.firstName).to.equal('Contest')
        expect(contestObj.winner.list[0].user.lastName).to.equal('Boothmember')
        expect(contestObj.winner.list[0].user.isOptOutChat).to.equal('NO')
        expect(contestObj.winner.list[0].user.isOptOutMeeting).to.equal('NO')
        expect(contestObj.feedCount).to.equal(3)
    });

    it.only('Verify contest winner declared in community contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ENDED",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
        expect(contestObj.contestType).to.equal('ENTRY')
        expect(contestObj.rules).to.equal('Test description')
        expect(contestObj.isWinnerDeclared).to.equal(1)
        expect(contestObj.winner.count).to.equal(1)
        expect(contestObj.winner.isWinnerDeclared).to.equal(true)
        expect(contestObj.winner.list[0].user.firstName).to.equal('Contest')
        expect(contestObj.winner.list[0].user.lastName).to.equal('Boothmember')
        expect(contestObj.winner.list[0].user.isOptOutChat).to.equal('NO')
        expect(contestObj.winner.list[0].user.isOptOutMeeting).to.equal('NO')
        expect(contestObj.feedCount).to.equal(3)
    });

    it('Delete comment in response contest : POST /api/v2/contests/feed-comment/delete', async () => {

        const contestrsponsecommentdelete = {
            "payload": {
                "data": {
                    "commentId": commentidcontest,
                    "feedId": "60c35ac3286b4f46c25d5790"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/delete',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestrsponsecommentdelete);
    });


    it.only('Pdf upload: POST /backend/api/v2/events/uploads', (done) => {
        request1
          .post('/backend/api/v2/events/uploads')
          .set('organiserId', environment.HOrganiserId)
          .set('eventId', process.env.eventid)
          .set('buildversion', process.env.buildversion)
          .set('Authorization', 'Bearer ' + process.env.eToken)
          // .type('multipart/form-data')
          .field('module_name', 'file')
          .field('location', 'contest')
          .field('type', 'file')
          .attach('data', './config/sample-pdf-file.pdf')
          .end((err, response) => {
            consolelog(response)
            expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message);
            global.contest_rule_file_name = (response.body.data.file_name)
            // console.log(process.env.VBfile_name, 'Virtual Booth File name')
            done();
          });
      });
     
    it.only('create a Quiz contest to check update/delete questions :-  : POST /api/v1/contest/create', async () => {

        const contest4 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz Contest Review",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "rules": "",
                "multipleFile": [
                    {
                        "id": 1,
                        "realFileName": "sample-pdf-file.pdf",
                        "fileName": global.contest_rule_file_name,
                        "fileBlob": null,
                        "uploadStatus": "IDEAL",
                        "uploadingPer": 0,
                        "fileSize": "0.14",
                        "format": "pdf"
                    }
                ],
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": process.env.attendeegroup2
                    }
                ],
                "numberOfWinner": 1
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest4)
        global.Quiz_contestid = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Add Question in quiz contest :-  : POST /api/v1/contest/que/create', async () => {

        const contest4 =
        {
            "data": {
                "pollQuestion": "Test 1 Question",
                "pollStartMilli": new Date().getTime(),
                "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                "contestId": global.Quiz_contestid,
                "contestType": "QUIZ",
                "options": ["test 1", "rest 2"],
                "answer": "test 1"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest4)
        global.Question_feed= (response.body.data.list[0]._id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_successfull_message);
    });


    it.only('Add Second Question in quiz contest :-  : POST /api/v1/contest/que/create', async () => {

        const contest4 =
        {
            "data": {
                "pollQuestion": "This is Second Question",
                "pollStartMilli": new Date().getTime(),
                "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                "contestId": global.Quiz_contestid,
                "contestType": "QUIZ",
                "options": ["1", "2"],
                "answer": "1"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contest4)
        global.Question_feed2= (response.body.data.list[0]._id)
        global.option_id_second_question1 =(response.body.data.list[0].option[0]._id)
        global.option_id_second_question2 =(response.body.data.list[0].option[1]._id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_successfull_message);
    });

    it.only('Get option id in Question in quiz contest :-  : POST /api/v1/contest/que/getbyid', async () => {
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/getbyid', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'contestid': global.Quiz_contestid, 'feedid':global.Question_feed},'get');
        global.optionid1 = (response.body.data.option[0]._id)
        global.optionid2 = (response.body.data.option[1]._id)
    });
    
    it.only('Update Question in quiz contest', async () => {
        
        const update_question =
        {
            "data": {
              "pollQuestion": "Quiz Question update",
              "pollStartMilli": new Date().getTime(),
              "pollEndMilli": (addTime(new Date(), 1)).getTime(),
              "options": [
                {
                  "_id": global.option_id_second_question1,
                  "title": "1",
                  "isAnswer": 1
                },
                {
                  "_id": global.option_id_second_question2,
                  "title": "2",
                  "isAnswer": 0
                }
              ],
              "answer": "1"
            }
          }
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/edit', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : '12', 'page' : environment.HPage,'contestid': global.Quiz_contestid, 'feedid':global.Question_feed2},'post',update_question);
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_update_message);
        expect(response.body.data.list[0].pollQuestion).to.equal("Quiz Question update")
    });

    it.only('Verify Quiz contest details: POST /api/v2/contests/contest-details', async () => {

        const contestmyentry =
        {
            "payload": {
                "data": {
                    "contestId": global.Quiz_contestid,
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/contest-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
        expect(response.body.success.data.entries).to.equal(0);
        expect(response.body.success.data.numberOfWinner).to.equal(1);
        expect(response.body.success.data.multipleFile[0].fileName).to.equal(global.contest_rule_file_name);
        expect(response.body.success.data.multipleFile[0].realFileName).to.equal("sample-pdf-file.pdf");
        expect(response.body.success.data.multipleFile[0].format).to.equal("pdf");
    });


    it.only('Submit Answer in Quiz Contest: POST /api/v2/contests/submit-quiz', async () => {

        const contestmyentry =
        {
            "payload": {
              "data": {
                "contestId": global.Quiz_contestid,
                "answers": [
                  {
                    "feedId": global.Question_feed,
                    "optionId": global.optionid1
                  },
                  {
                    "feedId": global.Question_feed2,
                    "optionId":global.option_id_second_question1
                  }
                ]
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/submit-quiz',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestmyentry);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_quiz_answer_message);
    });


    it.only('Verify Question in quiz contest after answer :-  : POST /api/v1/contest/que/list', async () => {
        
        const verify_question =
        {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : '12', 'page' : environment.HPage,'contestid': global.Quiz_contestid},'post',verify_question);
        expect(response.body.data.total_count).to.equal(2)
        expect(response.body.data.questions[0].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[0].option[0].hits).to.equal(1)
        expect(response.body.data.questions[0].option[0].title).to.equal("test 1")
        expect(response.body.data.questions[0].option[1].isAnswer).to.equal(0)
        expect(response.body.data.questions[0].option[1].hits).to.equal(0)
        expect(response.body.data.questions[1].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[1].option[0].hits).to.equal(1)
        expect(response.body.data.questions[1].option[0].title).to.equal("1")
    });


    it.only('Search Question in quiz contest name : POST /api/v1/contest/que/list', async () => {

        const contest_question_search =
        {"data":{"status":"ONGOING"}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Test 1 Question', 'limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_question_search)
        expect(response.body.data.total_count).to.equal(1);
        expect(response.body.data.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data.questions[0].pollQuestion).to.equal("Test 1 Question");
        expect(response.body.data.questions[0].isActive).to.equal(1);
        expect(response.body.data.questions[0].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[0].option[0].hits).to.equal(1)
        expect(response.body.data.questions[0].option[0].title).to.equal("test 1")
      });
  
      it.only('Search Question in quiz contest by wrong name : POST /api/v1/contest/que/list', async () => {
  
        const contest_question_search =
        {"data":{"status":"ONGOING"}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid  }, 'post', contest_question_search)
        expect(response.body.data.total_count).to.equal(0);
      });
  
  
      it.only('Search Question in quiz contest by partial name : POST /api/v1/contest/que/list', async () => {
  
        const contest_question_search =
        {"data":{"status":"ONGOING"}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Test','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid  }, 'post', contest_question_search)
        expect(response.body.data.total_count).to.equal(1);
        expect(response.body.data.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data.questions[0].pollQuestion).to.equal("Test 1 Question");
        expect(response.body.data.questions[0].isActive).to.equal(1);
        expect(response.body.data.questions[0].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[0].option[0].hits).to.equal(1)
        expect(response.body.data.questions[0].option[0].title).to.equal("test 1")
      });
  
      it.only('Search Question in quiz contest by lower case name : POST /api/v1/contest/que/list', async () => {
  
        const contest_question_search =
        {"data":{"status":"ONGOING"}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'test 1 question','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_question_search)
        expect(response.body.data.total_count).to.equal(1);
        expect(response.body.data.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data.questions[0].pollQuestion).to.equal("Test 1 Question");
        expect(response.body.data.questions[0].isActive).to.equal(1);
        expect(response.body.data.questions[0].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[0].option[0].hits).to.equal(1)
        expect(response.body.data.questions[0].option[0].title).to.equal("test 1")
      });
  
  
      it.only('Search Question in quiz contest by upper case name : POST /api/v1/contest/que/list', async () => {
  
        const contest_question_search =
        {"data":{"status":"ONGOING"}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'TEST 1 QUESTION','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_question_search)
        expect(response.body.data.total_count).to.equal(1);
        expect(response.body.data.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data.questions[0].pollQuestion).to.equal("Test 1 Question");
        expect(response.body.data.questions[0].isActive).to.equal(1);
        expect(response.body.data.questions[0].option[0].isAnswer).to.equal(1)
        expect(response.body.data.questions[0].option[0].hits).to.equal(1)
        expect(response.body.data.questions[0].option[0].title).to.equal("test 1")
      });


      it.only('Search standings in quiz contest name : POST /api/v1/contest/que/standings', async () => {

        const contest_standings_search =
        {"data":{"filter":{}}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/standings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Joker Clown', 'limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_standings_search)
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data[0].correct_response).to.equal(2);
        expect(response.body.data[0].user.email).to.equal("clown26@yopmail.com");
        expect(response.body.data[0].user.user_name).to.equal("joker clown");
      });
  
      it.only('Search standings in quiz contest by wrong name', async () => {
  
        const contest_standings_search =
        {"data":{"filter":{}}}

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/standings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid  }, 'post', contest_standings_search)
        expect(response.body.total_count).to.equal(0);
      });
  
  
      it.only('Search standings in quiz contest by partial name : POST /api/v1/contest/que/standings', async () => {
  
        const contest_standings_search =
        {"data":{"filter":{}}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/standings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'joker','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid  }, 'post', contest_standings_search)
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data[0].correct_response).to.equal(2);
        expect(response.body.data[0].user.email).to.equal("clown26@yopmail.com");
        expect(response.body.data[0].user.user_name).to.equal("joker clown");
      });
  
      it.only('Search standings in quiz contest by lower case name : POST /api/v1/contest/que/standingst', async () => {
  
        const contest_standings_search =
        {"data":{"filter":{}}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/standings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'joker clown','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_standings_search)
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data[0].correct_response).to.equal(2);
        expect(response.body.data[0].user.email).to.equal("clown26@yopmail.com");
        expect(response.body.data[0].user.user_name).to.equal("joker clown");
      });
  
  
      it.only('Search standings in quiz contest by upper case name : POST /api/v1/contest/que/standings', async () => {
  
        const contest_standings_search =
        {"data":{"filter":{}}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/standings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'JOKER CLOWN','limit':'12', 'page':environment.HPage,'contestid': global.Quiz_contestid}, 'post', contest_standings_search)
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Quiz Contest Review");
        expect(response.body.data[0].correct_response).to.equal(2);
        expect(response.body.data[0].user.email).to.equal("clown26@yopmail.com");
        expect(response.body.data[0].user.user_name).to.equal("joker clown");
      });
  
    it.only('Export Question in quiz contest :-  : POST /api/v1/contest/que/download', async () => {
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/download', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': global.Quiz_contestid},'post');
    });

    it.only('Image Response Contest upload : POST /backend/api/v2/events/uploads', (done) => {

        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .field('Content-Type', 'multipart/form-data')
            .field('location', 'contestImage')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                imageid1 = (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });


    it.only('Create a Response contest on dashbaord to check moderation and additional settings: POST /api/v1/contest/create', async () => {
    
        const contest1 =
        {
            "data": {
              "contestType": "RESPONSE",
              "contestName": "Test Response Contest",
              "startMili": new Date().getTime(),
              "endMili": (addTime(new Date(), 1)).getTime(),
              "rules": "This is response contest",
              "multipleFile": [],
              "banner": "",
              "groups": [
                {
                  "name": "Attendee",
                  "isMain": "YES",
                  "type": "ATTENDEE",
                  "id": process.env.attendeegroup2
                }
              ],
              "caption": "This is response contest discussion",
              "content": imageid1,
              "maxChar": 100,
              "minChar": 0,
              "isMultipleEntries": true,
              "isModerateEntries": true,
              "isAttendeeCanComment": false,
              "isAttendeeCanSee": true,
              "width": 1919,
              "height": 996
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/create',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',contest1)
        contestidresponse = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Verify contest details Response: POST /api/v2/contests/contest-details', async () => {

        const contestdeatilsbody = {
            "payload": {
                "data": {
                    "contestId": contestidresponse

                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/contest-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
        contestresponseFeedId = (response.body.success.data.feedId)
        expect(response.body.success.data.contestName).to.equal('Test Response Contest')
        expect(response.body.success.data.contestType).to.equal('RESPONSE')
        expect(response.body.success.data.attachmentType).to.equal('DISCUSSION')
        expect(response.body.success.data.isMultipleEntries).to.equal(1)
        expect(response.body.success.data.isAttendeeCanSee).to.equal(1)
        expect(response.body.success.data.isAttendeeCanComment).to.equal(0)
    });

    it.only('Create post feed in Response Contest: POST /api/v2/contests/feed-comment/create', async () => {

        const contestdeatilsbody =
        {
            "payload": {
                "data":
                {
                    "comment": "Hello Response Contest",
                    "feedId": contestresponseFeedId
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_moderate_message);
        expect(response.body.success.code).to.equal("WAIT_MODERATOR_APPROVE");
        expect(response.body.success.data.is_moderated).to.equal("YES");
        expect(response.body.success.data.comment.isApproved).to.equal("NO");
        expect(response.body.success.data.comment.comment).to.equal("Hello Response Contest");
        expect(response.body.success.data.comment.feed_screen).to.equal("PENDING");
    });

    it.only('Verify moderate response in pending : POST /api/v1/contest/moderate', async () => {
  
        const contest_moderate_search =
        {"data":{"feed_status":"PENDING"}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/moderate', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit':'12', 'page':environment.HPage,'contestid':contestidresponse}, 'post', contest_moderate_search)
        global.feedid1 = getValueFromJsonObject(response.body, "$.data[?(@.comment=='Hello Response Contest')]._id")
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.data[0].isApproved).to.equal("NO");
        expect(response.body.data[0].feed_screen).to.equal("PENDING");
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });

      it.only('Approve moderate response in pending : POST /api/v1/contest/moderate/approve', async () => {
  
        const contest_moderate_search =
        {"data":{"isApproved":"YES"}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/moderate/approve', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'contestid':contestidresponse,'feedid':global.feedid1 }, 'post', contest_moderate_search)
        expect(response.body.messages).to.equal(Responsemessages.Parameter_contest_moderate_approve_message);
      });


      it.only('Verify response after approve from moderator : POST /api/v2/contests/response/list', async () => {
  
        const contest_moderate_search =
        {
            "payload": {
              "data": {
                "contestId": contestidresponse,
                "feedId": contestresponseFeedId,
                "page": 0,
                "limit": 10
              }
            }
          }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/contests/response/list', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource,'Content-Type' : 'application/json'}, 'post', contest_moderate_search)
        expect(response.body.success.data.list[0].isApproved).to.equal("YES");
        expect(response.body.success.data.list[0].feed_screen).to.equal("YES");
        expect(response.body.success.data.list[0].is_active).to.equal("YES");
        expect(response.body.success.data.list[0].comment).to.equal("Hello Response Contest");
      });



      it.only('Create second post feed in Response Contest: POST /api/v2/contests/feed-comment/create', async () => {

        const contestdeatilsbody =
        {
            "payload": {
                "data":
                {
                    "comment": "Hello Response Contest Second Post",
                    "feedId": contestresponseFeedId
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/feed-comment/create',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestdeatilsbody);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_contest_moderate_message);
        expect(response.body.success.code).to.equal("WAIT_MODERATOR_APPROVE");
        expect(response.body.success.data.is_moderated).to.equal("YES");
        expect(response.body.success.data.comment.isApproved).to.equal("NO");
        expect(response.body.success.data.comment.comment).to.equal("Hello Response Contest Second Post");
        expect(response.body.success.data.comment.feed_screen).to.equal("PENDING");
    });

    it.only('Verify moderate response in pending : POST /api/v1/contest/moderate', async () => {
  
        const contest_moderate_search =
        {"data":{"feed_status":"PENDING"}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/moderate', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit':'12', 'page':environment.HPage,'contestid':contestidresponse}, 'post', contest_moderate_search)
        global.feedid2 = getValueFromJsonObject(response.body, "$.data[?(@.comment=='Hello Response Contest Second Post')]._id")
        expect(response.body.total_count).to.equal(1);
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.data[0].isApproved).to.equal("NO");
        expect(response.body.data[0].feed_screen).to.equal("PENDING");
        expect(response.body.data[0].comment).to.equal("Hello Response Contest Second Post");
      });


    it.only('Reject moderate response in pending : POST /api/v1/contest/moderate/approve', async () => {
  
        const contest_moderate_search =
        {"data":{"isApproved":"NO"}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/moderate/approve', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'contestid':contestidresponse,'feedid': global.feedid2}, 'post', contest_moderate_search)
        expect(response.body.messages).to.equal(Responsemessages.Parameter_contest_moderate_approve_message);
      });


      it.only('Check the response count in response tab : POST /api/v1/contest/entries', async () => {
  
        const contest_moderate_search =
        {"data":{"contestId":contestidresponse}}
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entries', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'limit':'12', 'page':environment.HPage, 'sort':'1'}, 'post', contest_moderate_search)
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.total_count).to.equal(1);
        expect(response.body.data[0].isApproved).to.equal("YES");
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });

      it.only('Shortlist the response in response tab : POST /api/v1/contest/entries/shortlist_unshortlist', async () => {
  
        const contest_moderate_search =
        {
            "data": {
              "contestId": contestidresponse,
              "isShortlisted": "YES",
              "feedId": global.feedid1
            }
          }
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/entries/shortlist_unshortlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'post', contest_moderate_search)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_shortlist_successful_message)
      });

      it.only('Search contest response in winner list by user name : POST /api/v1/contest/response/winners', async () => {

        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'joker clown', 'limit':'12', 'page':environment.HPage, 'sort':'1'}, 'post', contest_question_search)
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.total_count).to.equal(1);
        expect(response.body.data[0].isApproved).to.equal("YES");
        expect(response.body.data[0].isShortlisted).to.equal(1);
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });
  
      it.only('Search contest response in winner list by wrong user name : POST /api/v1/contest/response/winners', async () => {
  
        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name','limit':'12', 'page':environment.HPage,'sort':'1'}, 'post', contest_question_search)
        expect(response.body.total_count).to.equal(0);
      });
  
  
      it.only('Search contest response in winner list by partial name : POST /api/v1/contest/response/winners', async () => {
  
        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'joker','limit':'12', 'page':environment.HPage,'sort':'1' }, 'post', contest_question_search)
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.total_count).to.equal(1);
        expect(response.body.data[0].isApproved).to.equal("YES");
        expect(response.body.data[0].isShortlisted).to.equal(1);
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });


      it.only('Search contest response in winner list by post name : POST /api/v1/contest/response/winners', async () => {

        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Hello Response Contest', 'limit':'12', 'page':environment.HPage, 'sort':'1'}, 'post', contest_question_search)
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.total_count).to.equal(1);
        expect(response.body.data[0].isApproved).to.equal("YES");
        expect(response.body.data[0].isShortlisted).to.equal(1);
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });
  
      it.only('Search contest response in winner list by wrong post name : POST /api/v1/contest/response/winners', async () => {
  
        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name','limit':'12', 'page':environment.HPage,'sort':'1'}, 'post', contest_question_search)
        expect(response.body.total_count).to.equal(0);
      });
  
  
      it.only('Search contest response in winner list by partial name : POST /api/v1/contest/response/winners', async () => {
  
        const contest_question_search =
        {"data":{"contestId":contestidresponse}}
    
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/response/winners', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Hello','limit':'12', 'page':environment.HPage,'sort':'1' }, 'post', contest_question_search)
        expect(response.body.contestName).to.equal("Test Response Contest");
        expect(response.body.total_count).to.equal(1);
        expect(response.body.data[0].isApproved).to.equal("YES");
        expect(response.body.data[0].isShortlisted).to.equal(1);
        expect(response.body.data[0].comment).to.equal("Hello Response Contest");
      });
        
    it.only('Delete Question in quiz contest :-  : POST /api/v1/contest/que/delete', async () => {
        
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/delete', { 'organiserId' : environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion' : process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'limit' : 12, 'page' : environment.HPage,'contestid': global.Quiz_contestid, 'feedid':global.Question_feed},'post');
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_delete_message);
    });


    it.only('De-activate the contest : POST /api/v1/contest/active_deactive', async ()=>{
        const deactivateContest = {
            "data": {
              "contestId": contestid5,
              "action": "DEACTIVE"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/active_deactive', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', deactivateContest);
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_deactivate_successful_message);
    });

    it('Verify contest list on dashboard verify the contest is deactivated: POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ONGOING"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': 12, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text')
        expect(contestObj.isActive).to.equal(0)
    });

    it.only('Verify contest is not showing up in community ongoing contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ONGOING",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest does not show up on community my participant contest lists : POST /api/v2/contests/my-participants', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/my-participants',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Re-activate the contest : POST /api/v1/contest/active_deactive', async ()=>{
        const deactivateContest = {
            "data": {
              "contestId": contestid5,
              "action": "ACTIVE"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/active_deactive', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', deactivateContest);
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_deactivate_successful_message);
    });

    it('Verify contest list on dashboard verify the contest is activated: POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ENDED"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': 12, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text')
        expect(contestObj.isActive).to.equal(1)
    });

    it.only('Verify contest is visible on community ended contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ENDED",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
    });

    it.only('Verify contest visible on community my participant contest lists : POST /api/v2/contests/my-participants', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/my-participants',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.not.be.undefined
        expect(contestObj.contestName).to.equal('Entry contest with Image/Video/Text');
    });

    //Delete contest

    it.only('Delete contest : POST /api/v1/contest/delete', async () => {
        const contestdelete = {
            "data": {
                "contestId": contestid5
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',contestdelete);
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_deleted_message)
    });

    it.only('Verify contest list on dashboard verify the contest is deleted: POST /api/v1/contest/list', async () => {
        const contestListPayload = {"data":{"status":"ENDED"}}
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', { 'limit': 12, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', contestListPayload)
        var contestObj = getValueFromJsonObject(response.body, "$.data.contest_list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest is not visible on community ended contest lists : POST /api/v2/contests/list', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "status": "ENDED",
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    it.only('Verify contest is not visible on community my participant contest lists : POST /api/v2/contests/my-participants', async () => {

        const contestallentry = {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 0,
                    "contestType": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/contests/my-participants',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',contestallentry);
        var contestObj = getValueFromJsonObject(response.body, "$.success.data.list[?(@._id == '" + contestid5 + "')]")
        expect(contestObj).to.be.undefined
    });

    

    
    it.only('Delete 1st contest : POST /api/v1/contest/delete', async () => {
        const contest16 =

        {

            "data": {
                "contestId": ticketid1
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',contest16);
    });

    it.only('Delete 2nd contest : POST /api/v1/contest/delete', async () => {

        const contest17 =
        {

            "data": {
                "contestId": ticketid2
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',contest17);
    });

    it.only('Delete added users',async ()=>{
        var people = new People();
        await people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, peopleList)
    });

    it.only('Delete virtuabooth : POST /backend/api/v2/events/booth/delete', async () => {
        const deleteBooth =
        {
          "data": {
    
            "booth_ids": [global.virtualboothid],
            "is_all": 0
    
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/delete', {'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', deleteBooth)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
    });

});
