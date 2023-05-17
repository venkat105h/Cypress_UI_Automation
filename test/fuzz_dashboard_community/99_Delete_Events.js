import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');

require('dotenv').config();

import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';

var total_ongoing_events
var total_upcoming_events
var total_ended_events
var ended_event_ids
var ongoing_events_ids
var upcoming_events_ids

describe('Fuzz: Delete all fuzz events.', () => {

    it.only('[Dashboard]: Fuzz: Fetch total events: GET  /backend/api/v2/events', async () => 
    {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
        // console.log(response.body)
        total_ongoing_events= response.body.total_count;
        console.log("Total created events are: ", total_ongoing_events);
    });

    it.only('[Dashboard]: Fuzz: Fetch ended event ids counts: GET /backend/api/v2/events/list', async () => 
    {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
        // console.log(response.body)
        total_ended_events= response.body.ended_count;
        console.log("Total ended events are: ", total_ended_events);
    });

    it.only('[Dashboard]: Fuzz: Delete all ended events: GET && POST /backend/api/v2/events/list && /backend/api/v2/events/delete', async () => 
    {
        for (var i=0; i<total_ended_events; i++)
        {   
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
            ended_event_ids= response.body.ended_events[0].id;
            console.log("The ended events ids: ", ended_event_ids);

            var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': ended_event_ids,'accept':'application/json'}, 'post')
            console.log("The ended event delete response is: ", delresponse.body)
        }

    });

    it.only('[Dashboard]: Fuzz: Fetch ongoing event ids counts: GET /backend/api/v2/events/list', async () => 
    {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
        total_ongoing_events= response.body.ongoing_count;
        console.log("Total ongoing events are: ", total_ongoing_events);
    });

    it.only('[Dashboard]: Fuzz: Delete all ongoing events: GET && POST /backend/api/v2/events/list && /backend/api/v2/events/delete', async () => 
    {
        for (var i=0; i<total_ongoing_events; i++)
        {   
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
            ongoing_events_ids= response.body.ongoing_events[0].id;
            console.log("The ongoing events ids: ", ongoing_events_ids);

            var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': ongoing_events_ids,'accept':'application/json'}, 'post')
            console.log("The ongoing event delete response is: ", delresponse.body)
        }

    });

    it.only('[Dashboard]: Fuzz: Fetch upcoming event ids counts: GET /backend/api/v2/events/list', async () => 
    {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
        total_upcoming_events= response.body.upcoming_count;
        console.log("Total upcoming events are: ", total_upcoming_events);
    });

    it.only('[Dashboard]: Fuzz: Delete all upcoming events: GET && POST /backend/api/v2/events/list && /backend/api/v2/events/delete', async () => 
    {
        for (var i=0; i<total_upcoming_events; i++)
        {   
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion}, 'get')
            upcoming_events_ids= response.body.ongoing_events[0].id;
            console.log("The upcoming events ids: ", upcoming_events_ids);

            var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', {'organiserid': process.env.fuzz_org_id, 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': upcoming_events_ids,'accept':'application/json'}, 'post')
            console.log("The upcoming event delete response is: ", delresponse.body)
        }
    });
})