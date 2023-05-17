/*
Author: Gaurav Thapar
Description: This Script will unpublish/delete event created
Timestamp: 17th Sept 2021 11:30 AM
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
import { sendRequest } from '../../helper/CommonUtil'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
require ('dotenv').config();

describe('Delete Live Event', () => {

    it.only('Unpublish Event in dashbaord: POST /api/v1/event/livestatus/update', async () => {
        const unpublish_event = 
        {"data":{"is_publish":0}}
          
        var response = await sendRequest(environment.baseURL, '/api/v1/event/livestatus/update', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', unpublish_event)
        expect(response.body.message).to.equal(Responsemessages.Parameter_unpublish_message)
       
      });
    
    it.only('Delete events : POST /backend/api/v2/events/delete', (done) => {
       
        request1
            .post('/backend/api/v2/events/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('buildversion', process.env.buildversion)
            .set('Authorization','Bearer ' + process.env.eToken)
            .set('eventid',   process.env.eventid)
            .end((err, response) => {
                expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
                done();
            });
    });
    });
