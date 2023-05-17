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

var myemail = emailaddress[process.env.releaseenv + '_email']

var approvedid
var ProfileViewid
var Messageid
var MeetingStatusid
var AdminPostid
var AdminPollid
var SessionRegistrationid
var Meetingreminderid
var Sessionreminderid
var SessionGoLiveid
var attendeegroup
var boothmembergroup
var speakergroup
var getAttendees
var notification_id
var notification_id1

function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}


describe.skip('Fuzz: Create Notifications', function () {
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
    var todayDate = new Date().toISOString().slice(0, 10);

    var SecondDay = addDays(new Date(), 1).toISOString().slice(0, 10);
    var ThirdDay = addDays(new Date(), 2).toISOString().slice(0, 10);
    var FourDay = addDays(new Date(), 3).toISOString().slice(0, 10);

    var now = new Date(); //Current date
    var nextWeek = addDays(now, 3).toISOString().slice(0, 10); // Add 7 days

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + 'T' + time.concat('+05:30')

    // var list_length = 3;
    var list_length = fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ.length;


    it.only('[Dashboard]: Fuzz: Invalid notificationType New Post Activity Off : POST /api/v2/settings/update-settings-web', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const enableNotification =
            {
                "payload": {
                    "data": {
                        "notificationType": "DESKTOP",
                        "isDisabled": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "meetingReminder": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newChat": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newMeeting": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newPoll": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newPost": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newPostActivity": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "newProfileView": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "pushFromOrganiser": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                        "scheduleReminder": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i]
                    }
                }
            }
            console.log("The payload with fuzz new post activity is:", enableNotification);
            var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': process.env.fuzz_accesstokenloginuser, 'buildversion': process.env.buildversion, 'source': environment.HSource, 'languageid': 34,'Content-Type': 'application/json' }, 'post', enableNotification)
            if (response.body.status == true)
            {
              console.log(JSON.stringify(response.body));
              console.log("Notification has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.success.message, "Notification Settings Updated");
              console.log("The message ratio for Notification New Post Activity Off is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't update the notification, so sad to have no event with notification !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), false);
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
            //   var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
            //   console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('Create a discussion feed : POST /api/v2/feed/create', async () => {

        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": "Test feed",


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        expect(response.body.success.data.info).to.equal('Test feed')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.info).to.equal('Test feed')
        approvedid = (response.body.success.data._id)
    });

    it.skip('[Dashboard]: Fuzz: Create a discussion feed : POST /api/v2/feed/create', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const create_event_feed = {
                "payload": {
                    "data": {
    
                        "custom_tag": [],
                        "feedType": "DISCUSSION",
                        "info": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],



                    }
                }
            }
            console.log("The payload with fuzz new discussion post activity is:", create_event_feed);
            var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { /*'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid,*/ 'Authorization': process.env.fuzz_accesstokenloginuser, 'buildversion': process.env.buildversion, 'source': environment.HSource, 'languageid': 34,'Content-Type': 'application/json' }, 'post', create_event_feed)
            if (response.body.status == true)
            {
              console.log(JSON.stringify(response.body));
              console.log("Notification has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.success.message, "Feed created successfully");
              console.log("The message ratio for Create a discussion feed is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't post the discussion on the community, so sad to have no event with discussion !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), false);
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.error.message, "Error occured while feed create.");
              console.log("The error message ratio for other issue is: ", ratio_other_message);
            }
        }
    });


    it.skip('[Dashboard]: Fuzz: Valid New Post Activity Off : POST /api/v2/settings/update-settings-web', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const enableNotification =
            {
                "payload": {
                    "data": {
                        "notificationType": "DESKTOP",
                        "isDisabled": false,
                        "meetingReminder": true,
                        "newChat": false,
                        "newMeeting": false,
                        "newPoll": true,
                        "newPost": true,
                        "newPostActivity": false,
                        "newProfileView": false,
                        "pushFromOrganiser": false,
                        "scheduleReminder": false
                    }
                }
            }
            console.log("The payload with fuzz new post activity is:", enableNotification);
            var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': process.env.fuzz_accesstokenloginuser, 'buildversion': process.env.buildversion, 'source': environment.HSource, 'languageid': 34,'Content-Type': 'application/json' }, 'post', enableNotification)
            if (response.body.status == true)
            {
              console.log(JSON.stringify(response.body));
              console.log("Notification has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.success.message, "Notification Settings Updated");
              console.log("The message ratio for Notification New Post Activity Off is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't update the notification, so sad to have no event with notification !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), false);
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
            //   var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
            //   console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

})