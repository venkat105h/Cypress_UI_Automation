/*
Author: Gaurav Thapar
Description: This Script will get schedules,notifications & platform live status on reception page
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 28th Sept 2021 04:00 PM
Description: Commented old supertest calls and using the new sendRequest function
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();
var request3 = supertest(environment.baseURL3);


//This script will get schedules/sessions on community
describe('Check Reception page', () => {

  //GET SCHEDULES
  //200: This will get schedules on community v2: POST /api/v2/sessions/my-schedules

  it.only('Get schedules on reception: POST /api/v2/sessions/my-schedules', async () => {
    const getschdulesv2 =
    {
      "payload": {
        "data": {
          "event_end_time_milli": 0,
          "event_start_time_milli": 0,
          "start_date": 0,
          "time_zone": "Asia/Calcutta"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/my-schedules',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',getschdulesv2)
  });


  // it.only('Get schedules on reception: POST /api/v2/sessions/my-schedules', (done) => {
  //   const getschdulesv2 =
  //   {
  //     "payload": {
  //       "data": {
  //         "event_end_time_milli": 0,
  //         "event_start_time_milli": 0,
  //         "start_date": 0,
  //         "time_zone": "Asia/Calcutta"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/sessions/my-schedules')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(getschdulesv2)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  //GET NOTIFICATIONS

  it.only('Get notifications on reception: POST /api/v2/notifications/list', async () => {
    const getnotifications =
    {
      "payload": {
        "data": {
          "currentPage": 0,
          "limit": 10,
          "orgNotCount": 0,
          "userNotCount": 0

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/notifications/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',getnotifications)
  });


  // it.only('Get notifications on reception: POST /api/v2/notifications/list', (done) => {
  //   const getnotifications =
  //   {
  //     "payload": {
  //       "data": {
  //         "currentPage": 0,
  //         "limit": 10,
  //         "orgNotCount": 0,
  //         "userNotCount": 0

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/notifications/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(getnotifications)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

   //GET LIVE STATUS

   it.only('Get platform live status on reception: POST /api/v2/platformNew/live-status', async () => {
    const livestatus =
    {
      "payload": {}

    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/live-status',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',livestatus)
  });

  //  it.only('Get platform live status on reception: POST /api/v2/platformNew/live-status', (done) => {
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
  //       done();
  //     });
  // });

});
