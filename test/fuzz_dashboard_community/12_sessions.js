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

var ticketid1
var ticketid2
var sessionid1
var sessionid2
var attendeeadd
var agendacommid1
var agendacommid2
var noteid
var feedidsessionlive
var questionid
var questionid1
var sessionidstring
var trackid
var session_banner
var fs = require('fs');

var imageAsBase64_Session_Banner_image = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');


var qs = require('qs');
const request3 = supertest(environment.baseURL3);


describe('Fuzz: Create sessions as per days, attend and interact', () => 
{
    // var list_length = 3;
    var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;
    
    beforeEach(function (done) {
      setTimeout(function () {
        done();
      }, 300);
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


    it.skip('[Dashboard]: Fuzz: Add invalid tracks with invalid track name in Session :- POST backend/api/v2/events/session/tracks/add', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const addtracks = {
                "data":
                {
                  "name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                  "color_code": "#e0e0e0"
                }
              }
            
            console.log("The payload with fuzz create addtracks is:", addtracks);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', addtracks)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Addtracks has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Track Added.");
              console.log("The message ratio for adding the invalid Track is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the Track, so sad to have no event with Track. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Add invalid color code with valid track name in Session :- POST backend/api/v2/events/session/tracks/add', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const addtracks = {
                "data":
                {
                  "name": faker.lorem.word(),
                  "color_code": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
              }
            
            console.log("The payload with fuzz create addtracks is:", addtracks);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', addtracks)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Addtracks has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Track Added.");
              console.log("The message ratio for adding the invalid Track is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the Track, so sad to have no event with Track. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Add invalid color code with invalid track name in Session :- POST backend/api/v2/events/session/tracks/add', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const addtracks = {
                "data":
                {
                  "name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                  "color_code": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
              }
            
            console.log("The payload with fuzz create addtracks is:", addtracks);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', addtracks)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Addtracks has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Track Added.");
              console.log("The message ratio for adding the invalid Track is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the Track, so sad to have no event with Track. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: Fuzz: Add agenda with invalid start date and valid end time in Session :- POST /backend/api/v2/events/agendadays', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const session10 = {
                "data": {
                  "end_date": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                  "start_date": todayDate
                }
              }
            
            console.log("The payload with fuzz create invalid agenda is:", session10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', session10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Agenda has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Session day(s) created");
              console.log("The message ratio for adding the invalid agenda is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the agenda, so sad to have no event with agenda. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.only('[Dashboard]: Fuzz: Add agenda with valid start date and invalid end time in Session :- POST /backend/api/v2/events/agendadays', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const session10 = {
                "data": {
                  "end_date": nextWeek,
                  "start_date": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
              }
            
            console.log("The payload with fuzz create invalid agenda is:", session10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', session10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Agenda has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Session day(s) created");
              console.log("The message ratio for adding the invalid agenda is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the agenda, so sad to have no event with agenda. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.only('[Dashboard]: Fuzz: Add agenda with invalid start date and invalid end time in Session :- POST /backend/api/v2/events/agendadays', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const session10 = {
                "data": {
                  "end_date": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                  "start_date": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
              }
            
            console.log("The payload with fuzz create invalid agenda is:", session10);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agendadays', { 'organiserId': process.env.fuzz_org_id, 'eventId': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', session10)
            if (response.body.status == 200)
            {
              console.log(JSON.stringify(response.body));
              console.log("Agenda has been added.");
    
              var ratio_added_message = fuzzball.token_set_ratio(response.body.message, "Session day(s) created");
              console.log("The message ratio for adding the invalid agenda is: ", ratio_added_message);
              
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't create the agenda, so sad to have no event with agenda. !!!")
    
              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
              console.log("The ration for the invalid Track is: ", ratio_status);
    
              var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "The track is already existing. Please create a new track.");
              console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    

})