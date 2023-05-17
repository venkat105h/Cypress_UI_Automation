/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/export/delete speaker. Also few negative cases have been
asserted.
Timestamp: 05th Oct 2021 04:30 PM
Modified: Pranjal Shah 06th Oct 2021 03:10 PM
Description : Upload profile image test cases added.
Modified: Pranjal Shah 30th Jan 2022 23:57 PM
Description : iframe test cases added for speaker.
*/
import environment from '../config/environment';
import { expect } from 'chai'
import { sendRequest,Session,getValueFromJsonObject,addTime,addDays,organizerUserHeader } from '../helper/CommonUtil'
import Responsemessages from '../config/Responsemessages';
import supertest from 'supertest';
require('dotenv').config();

var attendeegroup1
var speakergroup1
var ticketid100
var ticketid102
var peopleid11
var peopleid22
var speakergroup2
var notespeakerid
var speakergot
var vickyspeaker
var clownspeaker
var peopleid222
var peopleid111
var speakerid1
let categoryid
var speaker_image
var speakerid_rajesh1
//iframe
var presentation_file_name
var sessionid_speaker_session
var speakerid_new
var speakerid_new_user
var fs = require('fs');
const request1 = supertest(environment.baseURL1);


var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');

describe('List/Search/Sort Speakers in Community', () => {
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

  //Get groups list

  it.only('Get groups of list of people in dashboard : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    speakergroup1 = (response.body.data[2].id)
  });


  //POST PEOPLE
  it.only('Upload profile image of speaker: POST /backend/api/v2/events/uploads',  (done) => {
        
    request1
    .post('/backend/api/v2/events/uploads')
    .set('organiserId', environment.HOrganiserId)
    .set('eventId', process.env.eventid)
    .set('Authorization', 'Bearer ' + process.env.eToken)
    .field('Content-Type', 'multipart/form-data')
    .field('location', 'profile')
    .field('type', 'base')
    .field('data', 'data:image/png;base64,' + imageAsBase64)
    .end((err, response) => {
        speaker_image = (response.body.data.file_name)
        expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
        done();
});
   
});

  it.only('Add a single speaker in dashboard : POST /backend/api/v2/people/single', async () => {

    const people100 = {
      "data": {

        "email": "clown30@gmail.com",
        "first_name": "vicky",
        "groups": [
          speakergroup1
        ],

        "last_name": "mehta",
        "looking": "",
        "offering": "",
        "industry": "",
        "interest": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people100)
    var data = JSON.parse(response.body.data)
    peopleid11 = (data.userId.$oid)
    peopleid111 = (data.speaker_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });


  it.only('Add a category for speaker: POST /backend/api/v2/events/general/speaker/cateogry/add', async () => {

    const speaker_category = 
    {
      "data": {
        "name": "Category1"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', speaker_category)
    categoryid = (response.body.data.id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_speaker_category_add_message);
  });

  it.only('Get speaker category list: POST /backend/api/v2/events/general/speaker/cateogry/list', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data[0].name).to.equal("Category1");
  });

  
  it.only('Add a single speaker with all parameters: POST /backend/api/v2/people/single', async () => {

    const people110 = {
      "data": {

        "email": "clo2n31@gmail.com",
        "first_name": "rajesh",
        "groups": [
          speakergroup1
        ],
        "img_file_name": "3971_5650_662620001619006566.png",
        "industry": "accounting",
        "interest": "advertising",
        "is_featured": true,
        "is_rating": true,
        "category_id": categoryid,
        "is_send_invite_mail": 0,
        "last_name": "sharma",
        "looking": "accountant",
        "multiple_file": [],
        "offering": "testing",
        "phone": "9988887777",
        "phone_code": "91",
        "sessions": []
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people110)
    var data = JSON.parse(response.body.data)
    peopleid22 = (data.userId.$oid)
    peopleid222 = (data.speaker_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });


  // it.only('Add a single speaker with all parameters: POST /backend/api/v2/people/single', (done) => {

  //   const people110 = {
  //     "data": {

  //       "email": "clo2n31@gmail.com",
  //       "first_name": "rajesh",
  //       "groups": [
  //         speakergroup1
  //       ],
  //       "img_file_name": "3971_5650_662620001619006566.png",
  //       "industry": "accounting",
  //       "interest": "advertising",
  //       "is_featured": true,
  //       "is_rating": true,
  //       "is_send_invite_mail": 0,
  //       "last_name": "sharma",
  //       "looking": "accountant",
  //       "multiple_file": [],
  //       "offering": "testing",
  //       "phone": "9988887777",
  //       "phone_code": "91",
  //       "sessions": []
  //     }
  //   }

  //   request1
  //     .post('/backend/api/v2/people/single')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(people110)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       var data = JSON.parse(response.body.data)
  //       peopleid22 = (data.userId.$oid)
  //       // console.log(peopleid22)
  //       peopleid222 = (data.userId.speaker_id)
  //       console.log(peopleid222)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  //       done();
  //     });
  // });

  it.only('Get Speaker list: POST /api/v2/event/speakers', async () => {

    const CommunitySpeakerList = {
      "payload": {
        "data": {
          "featured": false,
          "input": "",
          "language": 0,
          "limit": 18,
          "page": 1,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', CommunitySpeakerList)
    expect(response.body.success.data.speakers[0].name).to.equal('Vicky Mehta')
    expect(response.body.success.data.speakers[1].name).to.equal('Rajesh Sharma')
  });

  it.only('Verify iframe widget with added speakers from the dashboard : POST api/v2/embed/speaker-list', async () => {

    console.log(global.eTokenembed , 'speaker test')
    const iframe_speaker_list = 
    {
      "payload": {
        "data": {
          "language": 0,
          "limit": 18,
          "sort": 1,
          "page": 1,
          "input": "",
          "featured": false,
          "categoryId": [
            categoryid
          ]
        }
      }
    }
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-list',{'Authorization': global.eTokenembed , 'source':environment.HSource},'post', iframe_speaker_list)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_list_message)
    expect(response.body.success.data.speakers[0].name).to.equal('Rajesh Sharma')
    expect(response.body.success.data.speakers[1].name).to.equal('Vicky Mehta')
    speakerid_rajesh1 = (response.body.success.data.speakers[0].speakerId)
  });
 
 
  //..................Community verification for 2 attendee added ended...................................

  //PUT PEOPLE

  it.only('Update single people in dashbaord: PUT /backend/api/v2/people/single/edit', async () => {

    const people122 = {
      "data": {

        "email": "clo2n31@gmail.com",
        "first_name": "rajesh updated",
        "groups": [
          speakergroup1
        ],
        "img_file_name": "3971_5650_662620001619006566.png",
        "industry": "accounting",
        "interest": "advertising",
        "is_featured": true,
        "is_rating": true,
        "is_send_invite_mail": 0,
        "last_name": "sharma updated",
        "looking": "accountant",
        "multiple_file": [],
        "offering": "testing",
        "phone": "9988887777",
        "phone_code": "91",
        "sessions": [],
        "userId": peopleid11,
        "speaker_id": peopleid111,
        "status": "Activated"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', people122)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  });

  // it.only('update single people in dashbaord: PUT /backend/api/v2/people/single/edit', (done) => {

  //   const people122 = {
  //     "data": {

  //       "email": "clo2n31@gmail.com",
  //       "first_name": "rajesh updated",
  //       "groups": [
  //         speakergroup1
  //       ],
  //       "img_file_name": "3971_5650_662620001619006566.png",
  //       "industry": "accounting",
  //       "interest": "advertising",
  //       "is_featured": true,
  //       "is_rating": true,
  //       "is_send_invite_mail": 0,
  //       "last_name": "sharma updated",
  //       "looking": "accountant",
  //       "multiple_file": [],
  //       "offering": "testing",
  //       "phone": "9988887777",
  //       "phone_code": "91",
  //       "sessions": [],
  //       "userId": peopleid11,
  //       "speaker_id": peopleid111,
  //       "status": "Activated"
  //     }
  //   }

  //   request1
  //     .put('/backend/api/v2/people/single/edit')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(people122)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  //       done();
  //     });
  // });

  it.only('Update single people in dashbaord with all params: PUT /backend/api/v2/people/single/edit', async () => {

    const people133 = {
      "data": {

        "email": "clown30@gmail.com",
        "first_name": "vicky updated",
        "groups": [
          speakergroup1
        ],

        "last_name": "mehta updated",
        "looking": "",
        "offering": "",
        "industry": "",
        "interest": "",
        "userId": peopleid22,
        "speaker_id": peopleid222,
        "status": "Activated"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', people133)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  });

  // it.only('Update single people in dashbaord with all params: PUT /backend/api/v2/people/single/edit', (done) => {

  //   const people133 = {
  //     "data": {

  //       "email": "clown30@gmail.com",
  //       "first_name": "vicky updated",
  //       "groups": [
  //         speakergroup1
  //       ],

  //       "last_name": "mehta updated",
  //       "looking": "",
  //       "offering": "",
  //       "industry": "",
  //       "interest": "",
  //       "userId": peopleid22,
  //       "speaker_id": peopleid222,
  //       "status": "Activated"
  //     }
  //   }

  //   request1
  //     .put('/backend/api/v2/people/single/edit')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(people133)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
  //       done();
  //     });
  // });

  it.only('Get updated Speaker list: POST /api/v2/event/speakers', async () => {

    const CommunitySpeakerList = {
      "payload": {
        "data": {
          "featured": false,
          "input": "",
          "language": 0,
          "limit": 18,
          "page": 1,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', CommunitySpeakerList)
    expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
    expect(response.body.success.data.total).to.equal(2)
    speakergot = JSON.stringify(response.body.success.data.speakers[0].speakerId)
  });


  it.only('Verify iframe widget after updating speakers from the dashboard (Speaker Details) : POST /api/v2/embed/speaker-details', async () => {

    const iframe_speaker_details = 
    {
      "payload": {
        "data": {
          "speaker_id" : peopleid111
        }
      }
    }

    console.log(iframe_speaker_details)
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-details',{'Authorization': global.eTokenembed,},'post', iframe_speaker_details)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_details_message)
    expect(response.body.success.data.name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.email).to.equal('clown30@gmail.com')
    expect(response.body.success.data.userInfo.firstName).to.equal('Rajesh updated')
    expect(response.body.success.data.userInfo.lastName).to.equal("Sharma updated")
    expect(response.body.success.data.userInfo.lookingfor).to.equal("accountant")
    expect(response.body.success.data.userInfo.offering).to.equal("testing")
    expect(response.body.success.data.userInfo.industry).to.equal("accounting")
    expect(response.body.success.data.userInfo.intrests[0]).to.equal("advertising")
  });



  // it.only('Get updated Speaker list: POST /api/v2/event/speakers', (done) => {
  //   // const request2 = supertest((process.env.eventurl.replace("http", "https")));

  //   const CommunitySpeakerList = {
  //     "payload": {
  //       "data": {
  //         "featured": false,
  //         "input": "",
  //         "language": 0,
  //         "limit": 18,
  //         "page": 1,
  //         "sort": 0
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/event/speakers')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(CommunitySpeakerList)
  //     .end((err, response) => {
  //       consolelog(response)

  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null;
  //       expect(response.body).to.not.be.empty;
  //       expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
  //       expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  //       expect(response.body.success.data.total).to.equal(2)
  //       speakergot = JSON.stringify(response.body.success.data.speakers[0].speakerId)
  //       done();
  //     });
  // });

  // GET PEOPLE

  it.only('Get people on dashboard: POST /api/v1/people/list', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'limit': environment.HLimit, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page': environment.HPage }, 'post')
    expect(response.body.data[0].email).to.equal('clo2n31@gmail.com');
    ticketid100 = (response.body.data[0].userId)
  });

  // it.only('Get people on dashboard: POST /api/v1/people/list', (done) => {
  //   request
  //     .post('/api/v1/people/list')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .set('page', environment.HPage)
  //     .set('limit', environment.HLimit)
  //     .end((err, response) => {
  //       consolelog(response);
  //       expect(response.status).to.equal(200)
  //       expect(response.body.data[0].email).to.equal('clo2n31@gmail.com');
  //       ticketid100 = (response.body.data[0].userId)
  //       done();
  //     });
  // });

  it.only('Search a speaker: POST /api/v2/event/speakers', async () => {

    const searchspeaker = {
      "payload": {
        "data": {
          "featured": false,
          "input": "vicky",
          "language": 0,
          "limit": 10,
          "page": 1,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchspeaker)
    expect(response.body.success.data.total).to.equal(1)
    expect(response.body.success.data.speakers[0].name).to.equal('Vicky updated Mehta updated')
    notespeakerid = (response.body.success.data.speakers[0].speakerId)
  });

  // it.only('Search a speaker: POST /api/v2/event/speakers', (done) => {

  //   const searchspeaker = {
  //     "payload": {
  //       "data": {
  //         "featured": false,
  //         "input": "vicky",
  //         "language": 0,
  //         "limit": 10,
  //         "page": 1,
  //         "sort": 0
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/event/speakers')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(searchspeaker)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null;
  //       expect(response.body).to.not.be.empty;
  //       expect(response.body.success.data.total).to.equal(1)
  //       expect(response.body.success.data.speakers[0].name).to.equal('Vicky updated Mehta updated')
  //       notespeakerid = (response.body.success.data.speakers[0].speakerId)
  //       done();
  //     });
  // });

  it.only('Sort a speaker(A-Z) : POST /api/v2/event/speakers', async () => {

    const sortspeaker = {
      "payload": {
        "data": {
          "featured": false,
          "input": "",
          "language": 0,
          "limit": 18,
          "page": 1,
          "sort": 1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortspeaker)
    expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  });

  // it.only('Sort a speaker(A-Z) : POST /api/v2/event/speakers', (done) => {

  //   const sortspeaker = {
  //     "payload": {
  //       "data": {
  //         "featured": false,
  //         "input": "",
  //         "language": 0,
  //         "limit": 18,
  //         "page": 1,
  //         "sort": 1
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/event/speakers')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(sortspeaker)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null;
  //       expect(response.body).to.not.be.empty;
  //       expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
  //       expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  //       done();
  //     });
  // });

  //SORT A SPEAKER(Z-A)

  it.only('Sort a speaker(Z-A) : POST /api/v2/event/speakers', async () => {

    const sortspeaker1 = {
      "payload": {
        "data": {
          "featured": false,
          "input": "",
          "language": 0,
          "limit": 18,
          "page": 1,
          "sort": 2
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortspeaker1)
    expect(response.body.success.data.speakers[0].name).to.equal('Vicky updated Mehta updated')
    expect(response.body.success.data.speakers[1].name).to.equal('Rajesh updated Sharma updated')
  });

  // it.only('Sort a speaker(Z-A) : POST /api/v2/event/speakers', (done) => {

  //   const sortspeaker1 = {
  //     "payload": {
  //       "data": {
  //         "featured": false,
  //         "input": "",
  //         "language": 0,
  //         "limit": 18,
  //         "page": 1,
  //         "sort": 2
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/event/speakers')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(sortspeaker1)
  //     .end((err, response) => {
  //       consolelog(response)

  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null;
  //       expect(response.body).to.not.be.empty;
  //       expect(response.body.success.data.speakers[0].name).to.equal('Vicky updated Mehta updated')
  //       expect(response.body.success.data.speakers[1].name).to.equal('Rajesh updated Sharma updated')
  //       done();
  //     });
  // });

  //SORT A SPEAKER(DEFAULT)

  it.only('Sort a speaker(Default) : POST /api/v2/event/speakers', async () => {

    const sortspeaker2 = {
      "payload": {
        "data": {
          "featured": false,
          "input": "",
          "language": 0,
          "limit": 18,
          "page": 1,
          "sort": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/event/speakers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', sortspeaker2)
    expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  });

  // it.only('Sort a speaker(Default) : POST /api/v2/event/speakers', (done) => {

  //   const sortspeaker2 = {
  //     "payload": {
  //       "data": {
  //         "featured": false,
  //         "input": "",
  //         "language": 0,
  //         "limit": 18,
  //         "page": 1,
  //         "sort": 0
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/event/speakers')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(sortspeaker2)
  //     .end((err, response) => {
  //       consolelog(response)

  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null
  //       expect(response.body).to.not.be.empty
  //       expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
  //       expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  //       done();
  //     });
  // });

  it.only('View a speaker profile : POST /api/v2/event/speakers/view', async () => {

    const viewspeaker = {
      "payload": {}
    }
    var response = await sendRequest(environment.baseURL3, ('/api/v2/event/speakers/' + speakergot + '/view'), { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', viewspeaker)
    expect(response.body.success.data.name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.email).to.equal('clown30@gmail.com')
  });


  // it.only('View a speaker profile : POST /api/v2/event/speakers/view', (done) => {

  //   const viewspeaker = {
  //     "payload": {}
  //   }

  //   request3
  //     .post('/api/v2/event/speakers/' + speakergot + '/view')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(viewspeaker)
  //     .end((err, response) => {
  //       consolelog(response)

  //       expect(response.status).to.equal(200)
  //       expect(response.body).to.not.be.null;
  //       expect(response.body).to.not.be.empty;
  //       expect(response.body.success.data.name).to.equal('Rajesh updated Sharma updated')
  //       expect(response.body.success.data.email).to.equal('clown30@gmail.com')
  //       done();
  //     });
  // });

  //THIS WILL SEND A NOTE TO A SPEAKER

  it.only('Send a note to a speaker via view profile : POST /api/v2/notes/add', async () => {

    const notespeakeradd = {
      "payload": {
        "data": {
          "note": "testing again",
          "note_type": "SPEAKER",
          "noted_id": speakergot
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/notes/add', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', notespeakeradd)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_post_message)
  });

  //Event Analytics

  it.only('Verify Speaker in Event Analytics in dashbaord: GET /api/v1/analytics/speaker/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/speaker/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.totalSpeakers).to.equal(2)
    expect(response.body.data.totalProfileViews).to.equal(1)
    expect(response.body.data.categoryData[0].name).to.equal("Category1")
    expect(response.body.data.categoryData[0].count).to.equal(1)
  });


  it.only('Verify Speaker wise stats in Event Analytics in dashbaord: POST /api/v1/analytics/speakerwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/speakerwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    speakerid1= (response.body.data[0].id)
    expect(response.body.total_count).to.equal(2)
    expect(response.body.data[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.data[0].profileViews).to.equal(1)
    expect(response.body.data[1].name).to.equal('Vicky updated Mehta updated')
  });

  it.only('Verify Speaker Top Chart in Event Analytics in dashbaord: GET /api/v1/analytics/speaker/topcharts', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/speaker/topcharts', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.mostNotes.count).to.equal(1)
    expect(response.body.data.mostProfileViews.count).to.equal(1)
    expect(response.body.data.speakerData[0].name).to.equal('Rajesh updated Sharma updated')
  });

  it.only('Download Speaker Summary in Event Analytics in dashbaord: GET api/v1/analytics/download/speaker/summary', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/speaker/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
  });

  it.only('Download Individual Speaker Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/speaker/individual', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/speaker/individual', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'id': speakerid1 }, 'get')
  });

  it.only('Search Speaker wise stats in Event Analytics by name in dashbaord: POST /api/v1/analytics/speakerwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/speakerwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'Rajesh'}, 'post')
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.data[0].profileViews).to.equal(1)
  });

  it.only('Search Speaker wise stats with wrong Speaker name in Event Analytics in dashbaord: POST /api/v1/analytics/speakerwise/stats', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/speakerwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'wrongname'}, 'post')
    expect(response.body.total_count).to.equal(0)
  });



  // it.only('Send a note to a speaker via view profile : POST /api/v2/notes/add', (done) => {

  //   const notespeakeradd = {
  //     "payload": {
  //       "data": {
  //         "note": "testing again",
  //         "note_type": "SPEAKER",
  //         "noted_id": speakergot
  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/notes/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(notespeakeradd)
  //     .end((err, response) => {
  //       consolelog(response)
  //       // commonassertion(response)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_post_message)
  //       done();
  //     });
  // });

  // DELETE PEOPLE

  it('Delete added speakers on dashbaord : POST /backend/api/v2/people/delete', async () => {
    const delete1 =
    {
      "data": {

        "ids": [ticketid100],
        "is_all": 0

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  });

  // it('Delete added speakers on dashbaord : POST /backend/api/v2/people/delete', (done) => {
  //   const delete1 =
  //   {
  //     "data": {

  //       "ids": [ticketid100],
  //       "is_all": 0

  //     }
  //   }
  //   request1
  //     .post('/backend/api/v2/people/delete')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(delete1)
  //     .end((err, response) => {
  //       consolelog(response);
  //       expect(response.status).to.equal(200)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  //       done();
  //     });
  // });

  it.only('Verify iframe widget after updating speakers from the dashboard (Speaker list) : POST api/v2/embed/speaker-list', async () => {
    const iframe_speaker_list = 
    {
      "payload": {
        "data": {
          "language": 0,
          "limit": 18,
          "sort": 1,
          "page": 1,
          "input": "",
          "featured": false,
          "categoryId": [
            categoryid
          ]
        }
      }
    }
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe_speaker_list)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_list_message)
    expect(response.body.success.data.speakers[0].name).to.equal('Rajesh updated Sharma updated')
    expect(response.body.success.data.speakers[1].name).to.equal('Vicky updated Mehta updated')
  });

  it.only('Uplaod pdf as presentation files for speaker: POST /backend/api/v2/events/uploads', (done) => {
    request1
      .post('/backend/api/v2/events/uploads')
      .set('organiserId', environment.HOrganiserId)
      .set('eventId', process.env.eventid)
      .set('buildversion', process.env.buildversion)
      .set('Authorization', 'Bearer ' + process.env.eToken)
      // .type('multipart/form-data')
      .field('module_name', 'file')
      .field('location', 'brochure')
      .field('type', 'file')
      .attach('data', './config/sample-pdf-file.pdf')
      .end((err, response) => {
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_file_upload_message);
        presentation_file_name = (response.body.data.file_name)
        // console.log(process.env.VBfile_name, 'Virtual Booth File name')
        done();
      });
  });

  it.only('Create a session to check speaker filter : POST /backend/api/v2/events/agendas', async () => {
    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()
    sessionid_speaker_session= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Speaker Session check','', '', 'Speaker Session check description', sessionStartTime, sessionEndTime)
    console.log(sessionid_speaker_session, 'session speaker id')
  });


  it.only('Add a speaker to check delete functionality on iframe: POST /backend/api/v2/people/single', async () => {

    const people110 = {
      "data": {
        "phone_code": 91,
        "phone": "99888877777657",
        "email": "speakeriframe@yopmail.com",
        "is_rating": 1,
        "is_featured": 1,
        "img_file_name": speaker_image,
        "is_send_invite_mail": "",
        "category_id": categoryid,
        insta_id: "https://instagram.com",
        twitter_id: "https://twitter.com",
        linkedin_id: "https://linkedin.com",
        facebook_id: "https://www.facebook.com/",
        website_id: "https://google.com",
        city_id: "Test City",
         state_id: "Punjab",
         country_id: "India",
         designation_id: "SQA",
         organization_id: "hubilo",
         about_id: "Hello this is description",
         gender_id : "Male",
        "groups": [
          speakergroup1
        ],
        "industry": "accounting",
        "organisation": "SQA",
        "mobile": "919988887777",
        "looking": "accountant",
        "offering": "testing",
        "interest": [
          "advertising"
        ],
        "custom_tags": "",
        "first_name": "Speaker First",
        "last_name": "Iframe Test",
        "status": "Activated",
        "sessions": [
          sessionid_speaker_session
        ],
        "multiple_file": [
          {
            "filename": presentation_file_name,
            "format": "pdf",
            "real_filename": "sample-pdf-file.pdf"
          }
        ],
        "default_custom_otp": "1234"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people110)
    var data = JSON.parse(response.body.data)
    speakerid_new_user = (data.userId.$oid)
    speakerid_new = (data.speaker_id)
    console.log(speakerid_new, 'speakerid')
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });

  it.only('Verify speaker list in iframe widget after adding new speaker from dashboard : POST api/v2/embed/speaker-list', async () => {
    const iframe_speaker_list = 
    {
      "payload": {
        "data": {
          "language": 0,
          "limit": 18,
          "sort": 1,
          "page": 1,
          "input": "",
          "featured": false,
          "categoryId": [
            categoryid
          ]
        }
      }
    }
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe_speaker_list)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_list_message)
    expect(response.body.success.data.speakers.length).to.equal(3)
    expect(response.body.success.data.speakers.map(map => map.name)).to.include("Speaker First Iframe Test")
  });

  it.only('Verify new speaker details in iframe widget after adding from dashboard : POST /api/v2/embed/speaker-details', async () => {
    const iframe_speaker_details = 
    {
      "payload": {
        "data": {
          "speaker_id": speakerid_new
        }
      }
    }
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-details',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe_speaker_details)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_details_message)
    expect(response.body.success.data.name).to.equal('Speaker First Iframe Test')
    expect(response.body.success.data.email).to.equal("speakeriframe@yopmail.com")
    expect(response.body.success.data.userInfo.firstName).to.equal('Speaker First')
    expect(response.body.success.data.userInfo.lastName).to.equal('Iframe Test')
    expect(response.body.success.data.userInfo.lookingfor).to.equal("accountant")
    expect(response.body.success.data.userInfo.offering).to.equal("testing")
    expect(response.body.success.data.userInfo.industry).to.equal("accounting")
    expect(response.body.success.data.userInfo.intrests[0]).to.equal("advertising")
    // expect(response.body.success.data.shortDescription).to.equal('SQA at hubilo')
    // expect(response.body.success.data.longDescription).to.equal('Hello this is description')
    // expect(response.body.success.data.presentation).to.equal('sample-pdf-file.pdf')
    // expect(response.body.success.data.fbUrl).to.equal('https://www.facebook.com/')
    // expect(response.body.success.data.linkedinUrl).to.equal('https://linkedin.com')
    // expect(response.body.success.data.twitterUrl).to.equal('https://twitter.com')
    // expect(response.body.success.data.instagramUrl).to.equal('https://instagram.com')
    expect(response.body.success.data.categoryName).to.equal('Category1')
    expect(response.body.success.data.agendas[0].name).to.equal('Speaker Session check')
    expect(response.body.success.data.agendas[0].description).to.equal('Speaker Session check description')
    expect(response.body.success.data.agendas[0].speakers[0].name).to.equal('Speaker First Iframe Test')
  });

  it.only('Delete added speakers on dashbaord : POST /backend/api/v2/people/delete', async () => {
    const delete1 =
    {
      "data": {

        "ids": [speakerid_new_user],
        "is_all": 0

      }
    }

    console.log(delete1, 'delete speaker')
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  });

  it.only('Verify speaker list in iframe widget after deleting new speaker from dashboard and check deleted speaker is showing or not in iframe. : POST api/v2/embed/speaker-list', async () => {
    const iframe_speaker_list = 
    {
      "payload": {
        "data": {
          "language": 0,
          "limit": 18,
          "sort": 1,
          "page": 1,
          "input": "",
          "featured": false,
          "categoryId": [
            categoryid
          ]
        }
      }
    }
    var response = await sendRequest(environment.baseURL7, '/api/v2/embed/speaker-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization': global.eTokenembed,},'post', iframe_speaker_list)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_speaker_list_message)
    expect(response.body.success.data.speakers.length).to.equal(2)
    expect(response.body.success.data.speakers.map(map => map.name)).to.not.include("Speaker First Iframe Test")
  });


});

