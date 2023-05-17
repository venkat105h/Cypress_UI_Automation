/*
Author: Pranjal Shah
Description: This Script will add/list/remove speaker bookmark/delegate bookmark/booth bookmark. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 28th Sept 2021 04:00 PM
Description: Commented old supertest calls and using the new sendRequest function
Modified: Pranjal Shah 18th Jan 2021 17:51 PM
Description: Remove speaker bookmark Test Case Updated.
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

var attendeeuser
var virtualboothid1
var boothmembergroup
var speakeruser
var attendeegroup
var speakergroup
var boothmembergroup

//This script will add/delete bookmarks on community
describe('Add, remove Bookmarks', () => {
  beforeEach(function (done) {
    setTimeout(function(){
      done();
    }, environment.HTestDelay);
  });

  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/people/groups/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    attendeegroup = (response.body.data[0].id)
    // console.log(attendeegroup)
    boothmembergroup = (response.body.data[1].id)
    // console.log(boothmembergroup)
    speakergroup = (response.body.data[2].id)
  });


  // it.only('Get group list of people : GET /backend/api/v2/people/groups/list', (done) => {
  //   request1
  //     .get('/backend/api/v2/people/groups/list')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       attendeegroup = (response.body.data[0].id)
  //       // console.log(attendeegroup)
  //       boothmembergroup = (response.body.data[1].id)
  //       // console.log(boothmembergroup)
  //       speakergroup = (response.body.data[2].id)
  //       // console.log(speakergroup)
  //       done();
  //     });
  // });


  //New added code
  it.only('Search attendee: POST /api/v2/attendee', async () => {
    const searchattendee =
    {
      "payload": {
        "data": {
          "attendeeIds": [
            ""
          ],
          "city": "",
          "country": "",
          "designation": "",
          "filter": "0,0,0",
          "industryIds": "",
          "input": "",
          "intrestIds": "",
          "isShowLoggedinUser": "NO",
          "language": 0,
          "limit": 10,
          "organisationName": "",
          "page": 0,
          "sidebarId": attendeegroup,
          "sort": 0,
          "state": "",
          "userProfileFields": {},
          "wantOnlineAttendee": "NO"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',searchattendee)
    attendeeuser = (response.body.success.data.attendees[0].Id)
    // console.log(attendeeuser)
    // expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
    expect(response.body.success.data.attendees[0].userName).to.equal('joker clown')
  });

  // it.only('Search attendee: POST /api/v2/attendee', (done) => {
  //   const searchattendee =
  //   {
  //     "payload": {
  //       "data": {
  //         "attendeeIds": [
  //           ""
  //         ],
  //         "city": "",
  //         "country": "",
  //         "designation": "",
  //         "filter": "0,0,0",
  //         "industryIds": "",
  //         "input": "",
  //         "intrestIds": "",
  //         "isShowLoggedinUser": "NO",
  //         "language": 0,
  //         "limit": 10,
  //         "organisationName": "",
  //         "page": 0,
  //         "sidebarId": attendeegroup,
  //         "sort": 0,
  //         "state": "",
  //         "userProfileFields": {},
  //         "wantOnlineAttendee": "NO"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/attendee')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(searchattendee)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       attendeeuser = (response.body.success.data.attendees[0].Id)
  //       // console.log(attendeeuser)
  //       // expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav updated 2 Rao updated 2')
  //       expect(response.body.success.data.attendees[0].userName).to.equal('joker clown')
  //       done();
  //     });
  // });

  //New added code

  it.only('Search speaker: POST /api/v2/event/speakers', async () => {
    const searchspeaker =
    {
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
    var response =  await sendRequest(environment.baseURL3,'/api/v2/event/speakers',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',searchspeaker)
    expect(response.status).to.equal(200)
    speakeruser = JSON.stringify(response.body.success.data.speakers[0].speakerId)
    // console.log(speakeruser)
    // expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav Thappar')
  });

  // it.only('Search speaker: POST /api/v2/event/speakers', (done) => {
  //   const searchspeaker =
  //   {
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
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(searchspeaker)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       speakeruser = JSON.stringify(response.body.success.data.speakers[0].speakerId)
  //       // console.log(speakeruser)
  //       // expect(response.body.success.data.attendees[0].userName).to.equal('Gaurav Thappar')
  //       done();
  //     });
  // });

  //Get groups list
  //New added code

  it('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/people/groups/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    boothmembergroup = (response.body.data[1].id)
  });

  // it('Get group list of people : GET /backend/api/v2/people/groups/list', (done) => {
  //   request1
  //     .get('/backend/api/v2/people/groups/list')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       // attendeegroup = (response.body.data[0].id)
  //       // console.log(attendeegroup)
  //       boothmembergroup = (response.body.data[1].id)
  //       // console.log(boothmembergroup)
  //       // speakergroup = (response.body.data[2].id)
  //       // console.log(speakergroup)
  //       done();
  //     });
  // });


  //POST VIRTUAL BOOTH
  //New added code

  it('Single booth add now : POST /backend/api/v2/events/booth/add', async() => {
    const virtual10 = {
      "data": {
        "booth_size": "SMALL",
        "category": "category",
        "description": "",
        "email": "",
        "fb_url": "",
        "instagram_url": "",
        "is_featured": false,
        "is_rating": false,
        "linked_url": "",
        "list_banner_image": [
          {
            "img_file_name": ""
          }
        ],
        "location": "",
        "multiple_file": [],
        "name": "test",
        "phone": "",
        "phone_code": "",
        "position": 0,
        "profile_img": "",
        "spotlight_banner": [
          {
            "img_file_name": ""
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "",
        "twitter_url": "",
        "website_url": "",
        "whatsapp_no": ""
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    virtualboothid1 = (response.body.data.ids.exhibitor_id)
    console.log(virtualboothid1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  });

  // it('Single booth add now : POST /backend/api/v2/events/booth/add', (done) => {
  //   const virtual10 = {
  //     "data": {
  //       "booth_size": "SMALL",
  //       "category": "category",
  //       "description": "",
  //       "email": "",
  //       "fb_url": "",
  //       "instagram_url": "",
  //       "is_featured": false,
  //       "is_rating": false,
  //       "linked_url": "",
  //       "list_banner_image": [
  //         {
  //           "img_file_name": ""
  //         }
  //       ],
  //       "location": "",
  //       "multiple_file": [],
  //       "name": "test",
  //       "phone": "",
  //       "phone_code": "",
  //       "position": 0,
  //       "profile_img": "",
  //       "spotlight_banner": [
  //         {
  //           "img_file_name": ""
  //         }
  //       ],
  //       "spotlight_banner_type": "IMAGE",
  //       "tags": "",
  //       "twitter_url": "",
  //       "website_url": "",
  //       "whatsapp_no": ""
  //     }
  //   }
  //   request1
  //     .post('/backend/api/v2/events/booth/add')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(virtual10)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       virtualboothid1 = (response.body.data.ids.exhibitor_id)
  //       console.log(virtualboothid1)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  //       done();
  //     });
  // });
  //POST PEOPLE

  it('Add a single people as booth : POST /backend/api/v2/people/single', async () => {
    const people10 = {
      "data": {

        "email": "clown27@yopmail.com",
        "first_name": "gaurav",
        "groups": [
          boothmembergroup
        ],
        "last_name": "thappar",
        "exhibitor_id": virtualboothid1,
        "looking": "",
        "offering": "",
        "industry": "",
        "interest": ""
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/people/single',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',people10)
    var data = JSON.parse(response.body.data)
    peopleid1 = (data.userId.$oid)
    console.log(peopleid1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  });


  // it('Add a single people as booth : POST /backend/api/v2/people/single', (done) => {
  //   const people10 = {
  //     "data": {

  //       "email": "clown27@yopmail.com",
  //       "first_name": "gaurav",
  //       "groups": [
  //         boothmembergroup
  //       ],
  //       "last_name": "thappar",
  //       "exhibitor_id": virtualboothid1,
  //       "looking": "",
  //       "offering": "",
  //       "industry": "",
  //       "interest": ""
  //     }
  //   }
  //   request1
  //     .post('/backend/api/v2/people/single')
  //     .set('organiserId', environment.HOrganiserId)
  //     .set('eventId', process.env.eventid)
  //     .set('buildversion', process.env.buildversion)
  //     .set('Authorization', 'Bearer ' + process.env.eToken)
  //     .send(people10)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       var data = JSON.parse(response.body.data)
  //       peopleid1 = (data.userId.$oid)
  //       console.log(peopleid1)
  //       expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
  //       done();
  //     });
  // });



  //POST BOOKMARKS

  //200: This will add a speaker bookmark on community v2: POST /api/v2/bookmark/add

  it.only('Add a speaker bookmark : POST /api/v2/bookmark/add', async () => {
    const bookmarkaddspeaker =
    {
      "payload": {
        "data": {
          "moduleId": speakeruser,
          "moduleType": "SPEAKER",

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkaddspeaker)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  });
  // it.only('Add a speaker bookmark : POST /api/v2/bookmark/add', (done) => {
  //   const bookmarkaddspeaker =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": speakeruser,
  //         "moduleType": "SPEAKER",

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkaddspeaker)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  //       done();
  //     });
  // });
  //200: This will add a delegate bookmark on community v2: POST /api/v2/bookmark/add
  it.only('Add a delegate bookmark : POST /api/v2/bookmark/add', async () => {
    const bookmarkadddelegate =
    {
      "payload": {
        "data": {
          "moduleId": attendeeuser,
          "moduleType": "ATTENDEE",

        }
      }
    }
    // console.log(bookmarkadddelegate)
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkadddelegate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  });

  it.only('Again try to add a delegate bookmark : POST /api/v2/bookmark/add', async () => {
    const bookmarkadddelegate =
    {
      "payload": {
        "data": {
          "moduleId": attendeeuser,
          "moduleType": "ATTENDEE",

        }
      }
    }
    // console.log(bookmarkadddelegate)
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkadddelegate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  });
  // it.only('Add a delegate bookmark : POST /api/v2/bookmark/add', (done) => {
  //   const bookmarkadddelegate =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": attendeeuser,
  //         "moduleType": "ATTENDEE",

  //       }
  //     }
  //   }
  //   // console.log(bookmarkadddelegate)
  //   request3
  //     .post('/api/v2/bookmark/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkadddelegate)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  //       done();
  //     });
  // });
  //200: This will add a booth bookmark on community v2: POST /api/v2/bookmark/add
  it('Add a booth bookmark: POST /api/v2/bookmark/add', async () => {
    const bookmarkaddbooth =
    {
      "payload": {
        "data": {
          "moduleId": boothuser,
          "moduleType": "EXHIBITOR",

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkaddbooth)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  });
  // it('Add a booth bookmark: POST /api/v2/bookmark/add', (done) => {
  //   const bookmarkaddbooth =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": boothuser,
  //         "moduleType": "EXHIBITOR",

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkaddbooth)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_add_success_message)
  //       done();
  //     });
  // });

  //LIST BOOKMARK

  //200: This will list a speaker bookmark on community v2: POST /api/v2/bookmark/list

  it.only('List a speaker bookmark : POST /api/v2/bookmark/list', async () => {
    const listspeakerbookmark =
    {
      "payload": {
        "data": {
          "limit": 18,
          "moduleType": "SPEAKER",
          "page": 1

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',listspeakerbookmark)
    var lisspeakerbkmark = response.body.success.data.speaker.some(function(e) {
      return e.speakerId ==  speakeruser;
    });
    //console.log(lisspeakerbkmark, 'verify this is true')
    expect(lisspeakerbkmark).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)
    //expect(response.body.success.data.speaker[0].speakerId).to.equal(10984)
  });

  // it.only('List a speaker bookmark : POST /api/v2/bookmark/list', (done) => {
  //   const listspeakerbookmark =
  //   {
  //     "payload": {
  //       "data": {
  //         "limit": 18,
  //         "moduleType": "SPEAKER",
  //         "page": 1

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(listspeakerbookmark)
  //     .end((err, response) => {
  //      consolelog(response)
  //       // console.log(response.body.success.data.speaker)
  //       expect(response.status).to.equal(200)
  //       var lisspeakerbkmark = response.body.success.data.speaker.some(function(e) {
  //       return e.speakerId ==  speakeruser;
  //       });
  //       // console.log(lisspeakerbkmark, 'verify this is true')
  //       expect(lisspeakerbkmark).to.equal(true)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)
  //       //expect(response.body.success.data.speaker[0].speakerId).to.equal(10984)
  //       done();
  //     });
  // });
  //200: This will list a delegate bookmark on community v2: POST /api/v2/bookmark/list

  it.only('List a delegate bookmark: POST /api/v2/bookmark/list', async () => {
    const listspeakerbookmark =
    {
      "payload": {
        "data": {
          "limit": 18,
          "moduleType": "ATTENDEE",
          "page": 1

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',listspeakerbookmark)
    expect(response.body.success.data.attendee[0].user_name).to.equal('joker clown')
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)
  });

  // it.only('List a delegate bookmark: POST /api/v2/bookmark/list', (done) => {
  //   const listspeakerbookmark =
  //   {
  //     "payload": {
  //       "data": {
  //         "limit": 18,
  //         "moduleType": "ATTENDEE",
  //         "page": 1

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(listspeakerbookmark)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.attendee[0].user_name).to.equal('joker clown')
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)
  //       done();
  //     });
  // });
  //200: This will list a booth bookmark on community v2: POST /api/v2/bookmark/list

  it('List a booth bookmark : POST /api/v2/bookmark/list', async () => {
    const lisboothbookmark =
    {
      "payload": {
        "data": {
          "limit": 9,
          "moduleType": "EXHIBITOR",
          "page": 1

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/list',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',lisboothbookmark)
    var lissboothbkmark = response.body.success.data.exhibitor.some(function (e) {
      return e.id == 423986;
    });
    // console.log(lissboothbkmark, 'verify this is true')
    expect(lissboothbkmark).to.equal(true)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)
  });
  // it('List a booth bookmark : POST /api/v2/bookmark/list', (done) => {
  //   const lisboothbookmark =
  //   {
  //     "payload": {
  //       "data": {
  //         "limit": 9,
  //         "moduleType": "EXHIBITOR",
  //         "page": 1

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/list')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(lisboothbookmark)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       var lissboothbkmark = response.body.success.data.exhibitor.some(function (e) {
  //         return e.id == 423986;
  //       });
  //       // console.log(lissboothbkmark, 'verify this is true')
  //       expect(lissboothbkmark).to.equal(true)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_get_success_message)

  //       // expect(response.body.success.data.exhibitor[0].id).to.equal(423986)
  //       done();
  //     });
  // });



  //REMOVE BOOKMARKS
  //200: This will remove speaker bookmark on community v2: POST /api/v2/bookmark/remove

  it.only('Remove speaker bookmark: POST /api/v2/bookmark/remove', async () => {
    const bookmarkremovespeaker =
    {
      "payload": {
        "data": {
          "moduleId": speakeruser,
          "moduleType": "SPEAKER",

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/remove',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkremovespeaker);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_remove_success_message)
  });
  // it.only('Remove speaker bookmark: POST /api/v2/bookmark/remove', (done) => {
  //   const bookmarkremovespeaker =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": speakeruser,
  //         "moduleType": "SPEAKER",

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/remove')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkremovespeaker)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });
  //200: This will remove delegate bookmark on community v2: POST /api/v2/bookmark/remove
  it.only('Remove delegate bookmark: POST /api/v2/bookmark/remove', async () => {
    const bookmarkremovedelegate =
    {
      "payload": {
        "data": {
          "moduleId": attendeeuser,
          "moduleType": "ATTENDEE",

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/remove',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkremovedelegate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_remove_success_message)
  });


  it.only('Again try to remove delegate bookmark: POST /api/v2/bookmark/remove', async () => {
    const bookmarkremovedelegate =
    {
      "payload": {
        "data": {
          "moduleId": attendeeuser,
          "moduleType": "ATTENDEE",

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/bookmark/remove',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkremovedelegate)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_remove_success_message)
  });
  // it.only('Remove delegate bookmark: POST /api/v2/bookmark/remove', (done) => {
  //   const bookmarkremovedelegate =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": attendeeuser,
  //         "moduleType": "ATTENDEE",

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/remove')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkremovedelegate)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });
  //200: This will remove booth bookmark on community v2: POST /api/v2/bookmark/remove

  it('Remove booth bookmark : POST /api/v2/bookmark/remove', async () => {
    const bookmarkremovebooth =
    {
      "payload": {
        "data": {
          "moduleId": "423986",
          "moduleType": "EXHIBITOR",

        }
      }
    }
    var response =await sendRequest(environment.baseURL3,'/api/v2/bookmark/remove',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',bookmarkremovebooth)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_bookmark_remove_success_message)
  });

  // it('Remove booth bookmark : POST /api/v2/bookmark/remove', (done) => {
  //   const bookmarkremovebooth =
  //   {
  //     "payload": {
  //       "data": {
  //         "moduleId": "423986",
  //         "moduleType": "EXHIBITOR",

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/bookmark/remove')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(bookmarkremovebooth)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });





});
