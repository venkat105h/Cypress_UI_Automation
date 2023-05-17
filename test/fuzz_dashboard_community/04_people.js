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

var attendeegroup
var speakergroup
var boothmembergroup
var ticketid1
var ticketid2
var peopleid1
var peopleid2
var viewattendeenew

describe('Fuzz: Create attendees for dashboard.', () => {
    
    // beforeEach(function (done) {
    //     setTimeout(function () {
    //       done();
    //     }, 300);
    //   });

    // var list_length = 30;
    var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;

    it.only('[Dashboard]: Fuzz: Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'get')
        attendeegroup = (response.body.data[0].id)
        boothmembergroup = (response.body.data[1].id)
        speakergroup = (response.body.data[2].id)
    });

    it.skip('[Dashboard]: Fuzz: Add a Invalid single attendee fname in people : POST /backend/api/v2/people/single', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people10 = {
              "data": {
                "email": faker.internet.email(),
                "first_name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                "groups": [
                  attendeegroup
                ],
                "last_name": faker.name.lastName(),
                "looking": "",
                "offering": "",
                "industry": "",
                "interest": ""
              }
            }
            console.log("The payload with fuzz first name is: ", people10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Attendees are getting added when fuzz data's are added to the fname");

              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Data saved successfully");
              console.log("The message ratio for adding the invalid user name is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the attendees, so sad to have no event with attendees !!!")

              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid event name is: ", ratio_status);

              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Attendees cannot be created.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Add a Invalid single attendee lname in people : POST /backend/api/v2/people/single', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people10 = {
              "data": {
                "email": faker.internet.email(),
                "first_name": faker.name.firstName(),
                "groups": [
                  attendeegroup
                ],
                "last_name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                "looking": "",
                "offering": "",
                "industry": "",
                "interest": ""
              }
            }
            console.log("The payload with fuzz last name is: ", people10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Attendees are getting added when fuzz data's are added to the lname");

              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Data saved successfully");
              console.log("The message ratio for adding the invalid user name is: ", ratio_added_message);
              
              var data = JSON.parse(response.body.data)
              peopleid1 = (data.userId.$oid)
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the attendees, so sad to have no event with attendees !!!")

              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid attendees name is: ", ratio_status);

              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Attendees cannot be created.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }

        }
    });

    it.skip('[Dashboard]: Fuzz: Add a Invalid single attendee fname & lname in people : POST /backend/api/v2/people/single', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const people10 = {
              "data": {
                "email": faker.internet.email(),
                "first_name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                "groups": [
                  attendeegroup
                ],
                "last_name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                "looking": "",
                "offering": "",
                "industry": "",
                "interest": ""
              }
            }
            console.log("The payload with fuzz first & last name is: ", people10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Attendees are getting added when fuzz data's are added to the fname & lname");

              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Data saved successfully");
              console.log("The message ratio for adding the invalid user name is: ", ratio_added_message);
              
              var data = JSON.parse(response.body.data)
              peopleid1 = (data.userId.$oid)
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the attendees, so sad to have no event with attendees !!!")

              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid attendees name is: ", ratio_status);

              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Attendees cannot be created.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
            var data = JSON.parse(response.body.data)
            peopleid1 = (data.userId.$oid)
        }
    });

    it.only('[Dashboard]: Fuzz: Add a valid single attendee in people : POST /backend/api/v2/people/single', async () => 
    {
      process.env.fuzz_email_id = faker.internet.email();

      const people10 = {
        "data": {
          "email": process.env.fuzz_email_id,
          "first_name": faker.name.firstName(),
          "groups": [
            attendeegroup
          ],
          "last_name": faker.name.lastName(),
          "looking": "",
          "offering": "",
          "industry": "",
          "interest": ""
        }
      }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', people10)
        console.log(JSON.stringify(response.body));
        var data = JSON.parse(response.body.data)
        peopleid1 = (data.userId.$oid)
        console.log("The added people id is: ", peopleid1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
    });
})