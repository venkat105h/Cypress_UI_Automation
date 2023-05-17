import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');


import supertest from 'supertest';
import { assert, should, expect } from 'chai'
import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

var fs = require('fs');
var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');

var myemail = emailaddress[process.env.releaseenv + '_email']

var contestnew
var ticketid1
var ticketid2
var ticketid3
var ticketid4
var contestid1
var contestid2
var contestid3
var contestid4
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

var attendeegroup
var speakergroup
var boothmembergroup
var peopleid1

function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}

function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}

describe.skip('Fuzz: Create Contest.', () => {
    beforeEach(function (done) {
        if (this.currentTest.currentRetry()>0){
            setTimeout(function () {
              done();
            }, 2000);
        }
        else{
            setTimeout(function () {
                done();
            }, 300);
        }
    });

    //var list_length = 2;
    var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;

    console.log("The length of the list on the contest module is: ", list_length)

    it.only('[Dashboard]: Fuzz: Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'get')
        attendeegroup = (response.body.data[0].id)
        boothmembergroup = (response.body.data[1].id)
        speakergroup = (response.body.data[2].id)
    });

    it.skip('[Dashboard]: Fuzz: Create a valid Entry contest on dashbaord: POST /api/v1/contest/create', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const contest_payload =
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
                            "id": attendeegroup
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
            console.log("The payload with fuzz to Create a Entry contest is:", contest_payload);
            var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', contest_payload)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Entry contest has been created.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Contest Created");
              console.log("The message ratio for entry contest creation is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create filter the meeting, so sad to have no event with meeting !!!")
    
            //   var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
            //   console.log("The ration for the invalid meeting is: ", ratio_status);
    
            //   var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
            //   console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }


    });

    it.only('[Dashboard]: Fuzz: Create a invalid startMili Entry contest on dashbaord: POST /api/v1/contest/create', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const contest_payload =
            {
                "data": {
                    "contestType": "ENTRY",
                    "contestName": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "startMili": new Date().getTime(),
                    "endMili": (addTime(new Date(), 1)).getTime(),
                    "banner": "",
                    "groups": [
                        {
                            "name": "Attendee",
                            "isMain": "YES",
                            "type": "ATTENDEE",
                            "id": attendeegroup
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
            console.log("The payload with fuzz to Create a Entry contest is:", contest_payload);
            var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', { /*'limit': environment.HLimit, 'page': environment.HPage,*/ 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', contest_payload)
            console.log(JSON.stringify(response.body));
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Entry contest has been created.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Contest Created");
              console.log("The message ratio for entry contest creation is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the contest, so sad to have no event with contest !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }


    });

})
