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

var ticketid100
var ticketid102
var usermail1
var meetingnewid
var peopleid1
var peopleid2


function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}

describe.skip('Fuzz: Create meetings for dashboard.', () => {
    
    // beforeEach(function (done) {
    //     setTimeout(function () {
    //       done();
    //     }, 300);
    //   });

    // var list_length = 3;
    var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;

    it.only('[Dashboard]: Fuzz: Get people on dashboard: POST /api/v1/people/list', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post')
        ticketid100 = (response.body.data[0].userId)
        ticketid102 = (response.body.data[1].userId)
        usermail1 = (response.body.data[0].email)
        console.log("The ticketid100 is: ", ticketid100)
        console.log("The ticketid102 is: ", ticketid102)
        console.log("The usermail1 is: ", usermail1)
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid is_send_confirmation_mail number in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "meeting_description": "catch up now urgent",
                    "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                    "participant1": ticketid100,
                    "participant2": ticketid102
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid meeting_description number in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": "0",
                    "meeting_description": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                    "participant1": ticketid100,
                    "participant2": ticketid102
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid meeting time in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": "0",
                    "meeting_description": "catch up now urgent",
                    "meeting_time": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "participant1": ticketid100,
                    "participant2": ticketid102
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid participant 1 in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": "0",
                    "meeting_description": "catch up now urgent",
                    "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                    "participant1": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "participant2": ticketid102
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid participant 2 in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": "0",
                    "meeting_description": "catch up now urgent",
                    "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                    "participant1": ticketid100,
                    "participant2": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Create invalid meeting with invalid participant 2 in dashboard : POST /backend/api/v2/meetings/schedule', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people1000 = {
                "data": {
    
                    "is_send_confirmation_mail": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "meeting_description": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "meeting_time": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "participant1": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "participant2": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                }
            }
            console.log("The payload with fuzz create meetings is:", people1000);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "A meeting has been scheduled.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.only('[Dashboard]: Fuzz: Create a valid meeting in dashboard : POST /backend/api/v2/meetings/schedule', async () => {
        const people1000 = {
            "data": {

                "is_send_confirmation_mail": "0",
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                "participant1": ticketid100,
                "participant2": ticketid102
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people1000)
        console.log(JSON.stringify(response.body));
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });

    it.skip('[Dashboard]: Fuzz: export invalid meeting datas: POST /backend/api/v2/meetings/export', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data":
                {
                    "email_ids":
                        [
                            fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                        ]
                }
            }
            console.log("The payload with fuzz to export invalid meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/export', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been exported.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "You will recieve meetings data in the email entered shortly.");
              console.log("The message ratio for adding the invalid meeting is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the meeting, so sad to have no event with meeting !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid meeting is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }


    });

    it.skip('[Dashboard]: Fuzz: Filter meeting by applying fuzz as from and valid upto date filter: POST /backend/api/v2/meetings/list', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data": {
                    "filter": {
                        "from": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                        "upto": new Date()
                    }
                }
            }
            console.log("The payload with fuzz to filter meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been filetered.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.statusList[0], "APPROVED");
              console.log("The message ratio for filtering the meeting is: ", ratio_added_message);
              
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

    it.skip('[Dashboard]: Fuzz: Filter meeting by applying valid date as from and fuzz date in upto date filter: POST /backend/api/v2/meetings/list', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data": {
                    "filter": {
                        "from": new Date(),
                        "upto": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                    }
                }
            }
            console.log("The payload with fuzz to filter meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been filetered.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.statusList[0], "APPROVED");
              console.log("The message ratio for filtering the meeting is: ", ratio_added_message);
              
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

    it.skip('[Dashboard]: Fuzz: Filter meeting by applying fuzz date as from and fuzz date in upto date filter: POST /backend/api/v2/meetings/list', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data": {
                    "filter": {
                        "from": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                        "upto": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                    }
                }
            }
            console.log("The payload with fuzz to filter meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been filetered.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.statusList[0], "APPROVED");
              console.log("The message ratio for filtering the meeting is: ", ratio_added_message);
              
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

    it.skip('[Dashboard]: Fuzz: Filter valid meeting by applying from and to date filter: POST /backend/api/v2/meetings/list', async () => {
        const export_body =
        {
            "data": {
                "filter": {
                    "from": new Date(),
                    "upto": new Date()
                }
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
        // expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_Meeting_message);
    });

    it.skip('[Dashboard]: Fuzz: Filter meeting by applying fuzz by single participant: POST /backend/api/v2/meetings/list', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data": {
                    "filter": {
                        "participants"
                            : [fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]]
                    }
                }
            }
            console.log("The payload with fuzz to filter meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been filetered.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.statusList[0], "APPROVED");
              console.log("The message ratio for filtering the meeting is: ", ratio_added_message);
              
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

    it.only('[Dashboard]: Fuzz: Delete meeting by applying fuzz data: POST /backend/api/v2/meetings/delete', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const export_body =
            {
                "data": {
    
                    "filter": {},
                    "is_all": 0,
                    "meeting_ids": [fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]],
                    "search": ""
    
                }
            }
            console.log("The payload with fuzz to delete meetings is:", export_body);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/delete', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Meeting has been filetered.");
    
            //   var ratio_added_message = fuzzball.token_set_ratio(response.body.statusList[0], "APPROVED");
            //   console.log("The message ratio for filtering the meeting is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't delete the meeting, so sad to have no event with meeting !!!")
    
            //   var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
            //   console.log("The ration for the invalid meeting is: ", ratio_status);
    
            //   var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Participant 1 has meetings already scheduled at this time");
            //   console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }


    });


})