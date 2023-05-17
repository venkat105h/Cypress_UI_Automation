/*
Author: Pranjal Shah
Description: This Script will update and verify timeformat/language/timezone on community.
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


//This script will update time format on community
describe('Update time format', () => {

  //UPDATE TIME FORMAT TO 24 HOURS
  //200: This will update time format to 24hours on community v2: POST /api/v2/community/update

  it.only('Update time format to 24hours: POST /api/v2/community/update', async () => {
    const update24hours =
    {
      "payload": {
        "data": {
          "language": "",
          "languageId": 34,
          "timeFormat": "24",
          "timeZone": "Asia/Calcutta"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/community/update',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',update24hours)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  });

  // it.only('Update time format to 24hours: POST /api/v2/community/update', (done) => {
  //   const update24hours =
  //   {
  //     "payload": {
  //       "data": {
  //         "language": "",
  //         "languageId": 34,
  //         "timeFormat": "24",
  //         "timeZone": "Asia/Calcutta"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/community/update')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(update24hours)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  //       done();
  //     });
  // });

  //UPDATE TIME FORMAT TO 12 HOURS
  //200: This will update time format to 24hours on community v2: POST /api/v2/community/update

  it.only('Update time format to 12hours : POST /api/v2/community/update', async () => {
    const update12hours =
    {
      "payload": {
        "data": {
          "language": "",
          "languageId": 34,
          "timeFormat": "12",
          "timeZone": "Asia/Calcutta"

        }
      }
    }    
    var response = await sendRequest(environment.baseURL3,'/api/v2/community/update',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',update12hours)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  });


  // it.only('Update time format to 12hours : POST /api/v2/community/update', (done) => {
  //   const update12hours =
  //   {
  //     "payload": {
  //       "data": {
  //         "language": "",
  //         "languageId": 34,
  //         "timeFormat": "12",
  //         "timeZone": "Asia/Calcutta"

  //       }
  //     }
  //   }    
  //   request3
  //     .post('/api/v2/community/update')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(update12hours)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  //       done();
  //     });
  // });

  //UPDATE LANGUAGE & TIMEZONE TO CHINESE & EUROPE
  //200: This will update langauge to chinese & timezone to europe community v2: POST /api/v2/community/update

  it.only('Update langauge to English & timezone to europe : POST /api/v2/community/update', async () => {
    const chinaeuroupdate =
    {
      "payload": {
        "data": {
          "language": "EN",
          "languageId": 25,
          "timeFormat": "12",
          "timeZone": "Europe/Volgograd"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/community/update',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',chinaeuroupdate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  });

  // it.only('Update langauge to English & timezone to europe : POST /api/v2/community/update', (done) => {
  //   const chinaeuroupdate =
  //   {
  //     "payload": {
  //       "data": {
  //         "language": "EN",
  //         "languageId": 25,
  //         "timeFormat": "12",
  //         "timeZone": "Europe/Volgograd"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/community/update')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(chinaeuroupdate)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  //       done();
  //     });
  // });

  //UPDATE LANGUAGE & TIMEZONE TO ENGLISH & ASIA/CALCUTTA
  //200: This will update langauge to english & timezone to asia/calcutta community v2: POST /api/v2/community/update

  it.only('Update langauge to english & timezone to asia/calcutta : POST /api/v2/community/update', async () => {
    const indiaasiaupdate =
    {
      "payload": {
        "data": {
          "language": "EN",
          "languageId": 34,
          "timeFormat": "12",
          "timeZone": "Asia/Calcutta"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/community/update',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',indiaasiaupdate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  });


  // it.only('Update langauge to english & timezone to asia/calcutta : POST /api/v2/community/update', (done) => {
  //   const indiaasiaupdate =
  //   {
  //     "payload": {
  //       "data": {
  //         "language": "EN",
  //         "languageId": 34,
  //         "timeFormat": "12",
  //         "timeZone": "Asia/Calcutta"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/community/update')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(indiaasiaupdate)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_user_updated_message)
  //       done();
  //     });
  // });




});
