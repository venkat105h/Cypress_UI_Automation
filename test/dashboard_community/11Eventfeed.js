/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/delete event feed. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 25th Oct 2021 05:55 PM
Description: Added the retry on failure delay
Modified: Pranjal Shah 17nd Nov 2021 17:27 PM
Description: Added Remaning Review Test Cases.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import { emailaddress, emailPassword } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_email']
var mypassword = emailPassword[process.env.releaseenv + '_password']


const request3 = supertest(environment.baseURL3);

var jokeruserid
var approvedid
var approvedid1
var approvedid2
var comment_id
var polleventcreatedid
var polleventcreatedid1
var polleventcreatedid2
var polleventcreatedid3
var polleventcreatedid4
var introfeedid1
var introfeedid2
var introfeedid22
var introfeedid3
var offerid1
var offerid2
var organiserdiscussion1
var comment_id_organiser
var comment_id_organiser1
var polleventcreatedidotheruser1
var polleventcreatedoptioniduser1
var polleventcreatedoptionid2
var polleventcreatedoptionid3
var polleventcreatedoptionid4
var Entry_contest_file
var photo_feed_id
let moderate_feed_id
let organiserid1
let commuserid1

function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}

//Create event feeds on community
describe('Add, delete, update feed', () => {
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

    // GET PEOPLE

    it('200: This will get attendee on dashboard: POST /api/v1/people/list', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': environment.HLimit, 'Authorization': 'Bearer ' + process.env.eToken }, 'post');
    });

    it('200: This will get attendee on dashboard: POST /api/v1/people/list', (done) => {
        request
            .post('/api/v1/people/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventid', process.env.eventid)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .set('page', environment.HPage)
            .set('limit', environment.HLimit)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                jokeruserid = (response.body.data[2].userId)
                console.log(jokeruserid)
                done();
            });
    });

    //CREATE EVENT FEEDS

    it('200: POSITIVE Create a discussion feed on community : POST /api/event/user/create/feed', (done) => {
        const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community600 = {

            "custom_tag": [],
            "feedType": "DISCUSSION",
            "info": "Test feed",
            "userId": jokeruserid,

        }


        // console.log(community600, 'room body')

        request2
            .post('/api/event/user/create/feed')
            .set('devicetype', environment.Hdevicetype)
            .set('source', environment.HSource)
            .set('accesstoken', process.env.accesstoken)
            .set('Content-Type', 'application/json')
            .set('apikey', process.env.apikey)
            .set('organiserid', environment.HOrganiserId)
            .set('eventid', process.env.eventid)
            .send(community600)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                expect(response.body.data.info).to.equal('Test feed')
                approvedid = (response.body.data._id)
                // console.log(approvedid, 'Get Approved ID')
                done();
            });
    });

    //<-------------------CREATE EVENT FEEDS on Community v2 ----------------------------->

    //200: POSITIVE Create a discussion feed on community : POST /api/v2/feed/create 

    it.only('Create a discussion feed : POST /api/v2/feed/create', async () => {

        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": "Test feed",


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        expect(response.body.success.data.info).to.equal('Test feed')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.info).to.equal('Test feed')
        approvedid = (response.body.success.data._id)
    });
    // it.only('Create a discussion feed : POST /api/v2/feed/create', (done) => {

    //     const create_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "DISCUSSION",
    //                 "info": "Test feed",


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             console.log(response.body,'1st  response body')
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.info).to.equal('Test feed')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('DISCUSSION')
    //             expect(response.body.success.data.info).to.equal('Test feed')
    //             approvedid = (response.body.success.data._id)
    //             // console.log(approvedid, 'Get Approved ID')
    //             done();
    //         });
    // });

    //200: POSITIVE Create a poll feed on community V2 : POST /api/v2/poll/create

    it.only('Create a poll feed : POST /api/v2/poll/create', async () => {

        const create_poll_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"India\",\"new zeland\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "India vs new zealand finals",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "CHECK"



                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedid = (response.body.success.data._id)
    });


    // it.only('Create a poll feed : POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"India\",\"new zeland\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "India vs new zealand finals",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "CHECK"



    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedid = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });


    //<-------------------Search EVENT FEEDS on Community v2 ----------------------------->
    //200: POSITIVE Search a feed on community : POST /api/v2/feed/feeds

    it.only('Search a feed : POST /api/v2/feed/feeds', async () => {

        const search_event_feed = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": [],
                    "input": "Test feed",
                    "limit": 10


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', search_event_feed);
        expect(response.body.success.data.feeds[0].info).to.equal('Test feed')
    });


    // it.only('Search a feed : POST /api/v2/feed/feeds', (done) => {

    //     const search_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": [],
    //                 "input": "Test feed",
    //                 "limit": 10


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(search_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feeds[0].info).to.equal('Test feed')
    //             done();
    //         });
    // });

    //<-------------------Search EVENT FEEDS with Invalid values----------------------------->
    //200: POSITIVE Search a feed on community : POST /api/v2/feed/feeds

    it.only('Search a feed with invalid values : POST /api/v2/feed/feeds', async () => {

        const search_event_feed = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": [],
                    "input": "Wrong Test feed",
                    "limit": 10


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', search_event_feed)
        expect(response.body.success.data.feedCount).to.equal(0)
    });

    // it.only('Search a feed with invalid values : POST /api/v2/feed/feeds', (done) => {

    //     const search_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": [],
    //                 "input": "Wrong Test feed",
    //                 "limit": 10


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(search_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feedCount).to.equal(0)
    //             done();
    //         });
    // });



    //<-------------------user should be able to view own post when user click on "my post". Community v2 ----------------------------->
    //200: POSITIVE Verify that user should be able to view own post when user click on "my post". : POST /api/v2/feed/feeds
    it.only('Verify that user should be able to view own post when user click on "my post". : POST /api/v2/feed/feeds', async () => {

        const mypost_event_feed = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": ["mypost"],
                    "input": "",
                    "limit": 10


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', mypost_event_feed)
        expect(response.body.success.data.feeds[0].feedType).to.equal('POLLS')
        expect(response.body.success.data.feeds[1].feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.feeds[1].info).to.equal('Test feed')
    });

    // it.only('Verify that user should be able to view own post when user click on "my post". : POST /api/v2/feed/feeds', (done) => {

    //     const mypost_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": ["mypost"],
    //                 "input": "",
    //                 "limit": 10


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(mypost_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feeds[0].feedType).to.equal('POLLS')
    //             expect(response.body.success.data.feeds[1].feedType).to.equal('DISCUSSION')
    //             expect(response.body.success.data.feeds[1].info).to.equal('Test feed')
    //             done();
    //         });
    // });




    //<------------------Add Comment in feed Community----------------->

    //200: POSITIVE Add comment feed on community : POST /api/v2/feed/comment/add
    it.only('Add comment on feed : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "Test Comment",
                    "feedId": approvedid


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('Test Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
        comment_id = (response.body.success.data._id)
    });

    it.only('Verify Commnent count and Comment of feed in dashboard : POST /api/v1/activityfeed/commentlist', async () => {

        const feed_list =
        {
            "data": {
              "feed_id": approvedid
            }
          }

          var response = await sendRequest(environment.baseURL,'/api/v1/activityfeed/commentlist',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',feed_list)
          expect(response.body.total_count).to.equal(1)
          expect(response.body.data[0].comment).to.equal('Test Comment')
    });


    // it.only('Add comment on feed : POST /api/v2/feed/comment/add', (done) => {

    //     const comment_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "comment": "Test Comment",
    //                 "feedId": approvedid


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/feed/comment/add')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.comment).to.equal('Test Comment')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
    //             expect(response.body.success.data.isApproved).to.equal('YES')
    //             comment_id = (response.body.success.data._id)
    //             // console.log(comment_id, 'Get Comment ID')
    //             done();
    //         });
    // });


    // Delete Comment Community v2

    //200: POSITIVE  Delete comment feed on community : POST /api/v2/feed/comment/delete

    it.only('Delete comment on feed : POST /api/v2/feed/comment/delete', async () => {

        const comment_delete_feed = {
            "payload": {
                "data": {

                    "commentId": comment_id,
                    "feedId": approvedid


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_delete_feed)
        expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    });


    it.only('Add comment on feed : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "Test Comment",
                    "feedId": approvedid


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('Test Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
        comment_id = (response.body.success.data._id)
    });


    it.only('Delete Comment from dashbaord in Activity feed : POST /api/v1/activityfeed/deletecomment', async () => {

        const feed_list =
        {
            "data": {
              "feed_id": approvedid,
              "comment_id": comment_id
            }
          }

          var response = await sendRequest(environment.baseURL,'/api/v1/activityfeed/deletecomment',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',feed_list)
          expect(response.body.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete_Dashbaord)
    });


    // it.only('Delete comment on feed : POST /api/v2/feed/comment/delete', (done) => {

    //     const comment_delete_feed = {
    //         "payload": {
    //             "data": {

    //                 "commentId": comment_id,
    //                 "feedId": approvedid


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/comment/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_delete_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    //             done();
    //         });
    // });


    //<----------------Like Event Feed on community v2----------------------->

    //200: POSITIVE  Like feed on community : POST /api/v2/feed/like

    it.only('Like feed : POST /api/v2/feed/like', async () => {

        const like_event_feed = {
            "payload": {
                "data": {

                    "feedId": approvedid,
                    "isLike": "YES"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', like_event_feed)
        expect(response.body.success.data.isLike).to.equal('YES')
        expect(response.body.success.code).to.equal('FEED_LIKE')
    });

    it.only('Verify like count of feed in dashboard : POST /api/v1/activityfeed/likelist', async () => {

        const feed_list =
        {
            "data": {
              "feed_id": approvedid
            }
          }

          var response = await sendRequest(environment.baseURL,'/api/v1/activityfeed/likelist',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',feed_list)
          expect(response.body.total_count).to.equal(1)
    });




    // it.only('Like feed : POST /api/v2/feed/like', (done) => {

    //     const like_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": approvedid,
    //                 "isLike": "YES"


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(like_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('YES')
    //             expect(response.body.success.code).to.equal('FEED_LIKE')
    //             done();
    //         });
    // });



    //<----------------UnLike Event Feed on community v2----------------------->

    //200: POSITIVE  Unlike feed on community : POST /api/v2/feed/like

    it.only('Unlike feed : POST /api/v2/feed/like', async () => {

        const unlike_event_feed = {
            "payload": {
                "data": {

                    "feedId": approvedid,
                    "isLike": "NO"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', unlike_event_feed)
        expect(response.body.success.data.isLike).to.equal('NO')
        expect(response.body.success.code).to.equal('FEED_UNLIKE')
    });
    // it.only('Unlike feed : POST /api/v2/feed/like', (done) => {

    //     const unlike_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": approvedid,
    //                 "isLike": "NO"


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(unlike_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('NO')
    //             expect(response.body.success.code).to.equal('FEED_UNLIKE')
    //             done();
    //         });
    // });





    //REPORT OPTION

    it.only('Report option on event feed : POST /api/v2/feed/reportOption', async () => {

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/reportOption', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post')
    });

    // it.only('Report option on event feed : POST /api/v2/feed/reportOption', (done) => {

    //     request3
    //         .post('/api/v2/feed/reportOption')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    //<-------------------Create introduction feed I am looking for----------------------------->

    it.only('Create a Introduction feed I am Looking for : POST /api/v2/feed/introduction', async () => {
        // this.retries(2)


        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "INTRO",
                    "info": "Test Introduction Feed Looking",
                    "intro_type": "LOOK"

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/introduction', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        // console.log(create_event_feed, 'look')
        introfeedid1 = (response.body.success.data._id)
        expect(response.body.success.data.info).to.equal('Test Introduction Feed Looking')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('INTRO')
        expect(response.body.success.data.intro_type).to.equal('LOOK')
    });

    // it.only('Create a Introduction feed I am Looking for : POST /api/v2/feed/introduction', function (done) {
    //     // this.retries(2)


    //     const create_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": "Test Introduction Feed Looking",
    //                 "intro_type": "LOOK"

    //             }
    //         }
    //     }

    //     // console.log(create_event_feed, 'look')

    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed)
    //         .end((err, response) => {
    //             // console.log(response.body)
    //             // console.log(response.status)
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             introfeedid1 = (response.body.success.data._id)
    //             expect(response.body.success.data.info).to.equal('Test Introduction Feed Looking')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('LOOK')
    //             done();
    //         });
    // });

    //<-------------------Create introduction feed I am offering----------------------------->

    it.only('Create a Introduction feed I am offering  : POST /api/v2/feed/introduction', async () => {
        // this.retries(2)

        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "INTRO",
                    "info": "Test Introduction Feed offering",
                    "intro_type": "OFFER",
                    // "isTemplateType": "DEFAULT",
                    // "template": "FEED_TEMPLATE-1620887386656.png"


                }
            }
        }
        // console.log(create_event_feed,'1st intro body')\

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/introduction', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        introfeedid2 = (response.body.success.data._id)
        expect(response.body.success.data.info).to.equal('Test Introduction Feed offering')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('INTRO')
        expect(response.body.success.data.intro_type).to.equal('OFFER')
    });

    // it.only('Create a Introduction feed I am offering  : POST /api/v2/feed/introduction',function (done) {
    //     // this.retries(2)

    //     const create_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": "Test Introduction Feed offering",
    //                 "intro_type": "OFFER",
    //                 // "isTemplateType": "DEFAULT",
    //                 // "template": "FEED_TEMPLATE-1620887386656.png"


    //             }
    //         }
    //     }
    //     // console.log(create_event_feed,'1st intro body')
    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed)
    //         .end((err, response) => {
    //             // console.log(response.body,'1st intro response body')
    //             consolelog(response)
    //             introfeedid2 = (response.body.success.data._id)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.info).to.equal('Test Introduction Feed offering')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('OFFER')
    //             done();
    //         });
    // });


    //<-------------------Filter Feed By Introduction----------------------------->

    it.only('Filter Feed By Introduction  : POST /api/v2/feed/feeds', async () => {
        // this.retries(2)
        // console.log('retry')

        const filter_feed_introduction = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": ["INTRO"],
                    "input": "",
                    "limit": 10

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', filter_feed_introduction)
        expect(response.body.success.data.feeds[0].info).to.equal('Test Introduction Feed offering')
        expect(response.body.success.data.feeds[0].feedType).to.equal('INTRO')
        expect(response.body.success.data.feeds[0].introType).to.equal('OFFER')
        expect(response.body.success.data.feeds[1].info).to.equal('Test Introduction Feed Looking')
        expect(response.body.success.data.feeds[1].introType).to.equal('LOOK')
    });


    // it.only('Filter Feed By Introduction  : POST /api/v2/feed/feeds', function (done)  {
    //     // this.retries(2)
    //     // console.log('retry')

    //     const filter_feed_introduction = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": ["INTRO"],
    //                 "input": "",
    //                 "limit": 10

    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(filter_feed_introduction)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feeds[0].info).to.equal('Test Introduction Feed offering')
    //             expect(response.body.success.data.feeds[0].feedType).to.equal('INTRO')
    //             expect(response.body.success.data.feeds[0].introType).to.equal('OFFER')
    //             expect(response.body.success.data.feeds[1].info).to.equal('Test Introduction Feed Looking')
    //             expect(response.body.success.data.feeds[1].introType).to.equal('LOOK')
    //             done();
    //         });
    // });




    //<----------------Delete Event Feed on community v2----------------------->
    //200: POSITIVE  Delete feed on community : POST /api/v2/feed/delete

    it.only('Delete Discussion feed : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": approvedid,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });
    // it.only('Delete Discussion feed : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": approvedid,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });


    //<----------------Delete Event Feed on community v2----------------------->
    //200: POSITIVE  Delete feed on community : POST /api/v2/feed/delete

    it.only('Delete Poll feed : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedid,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)

    });

    // it.only('Delete Poll feed : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedid,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });


    //<----------------Delete Event Feed on community v2----------------------->
    //200: POSITIVE  Delete feed on community : POST /api/v2/feed/delete

    it.only('Delete Introduction feed I am Looking for : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": introfeedid1,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)

        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });


    // it.only('Delete Introduction feed I am Looking for : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": introfeedid1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });


    //<----------------Delete Event Feed on community v2----------------------->
    //200: POSITIVE  Delete feed on community : POST /api/v2/feed/delete

    it.only('Delete Introduction feed I am offering : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": introfeedid2,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete Introduction feed I am offering : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": introfeedid2,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    //GET EVENT FEEDS IN DASHBOARD

    it('200: This will get event feeds on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const approveddata = {
            "data": {

                "feed_status": "APPROVED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata)
        expect(response.body.data[0]._id).to.equal(approvedid)
    });

    // it('200: This will get event feeds on dashboard: POST /api/v1/activityfeed/feedlist', (done) => {

    //     const approveddata = {
    //         "data": {

    //             "feed_status": "APPROVED"
    //         }
    //     }

    //     request
    //         .post('/api/v1/activityfeed/feedlist')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventid', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('page', environment.HPage)
    //         .set('limit', '12')
    //         .send(approveddata)
    //         .end((err, response) => {
    //             // console.log(response.body);
    //             expect(response.status).to.equal(200)
    //             expect(response.body.data[0]._id).to.equal(approvedid)
    //             done();
    //         });
    // });
    //REJECT EVENT FEEDS IN DASHBOARD

    it('200: This will reject event feeds on dashboard: POST /api/v1/activityfeed/feedstatus', async () => {

        const approveddata1 = {
            "data": {

                "feed_id": approvedid,
                "feed_status": "REJECTED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedstatus', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
    });

    // it('200: This will reject event feeds on dashboard: POST /api/v1/activityfeed/feedstatus', (done) => {

    //     const approveddata1 = {
    //         "data": {

    //             "feed_id": approvedid,
    //             "feed_status": "REJECTED"
    //         }
    //     }

    //     request
    //         .post('/api/v1/activityfeed/feedstatus')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventid', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(approveddata1)
    //         .end((err, response) => {
    //             // console.log(response.body);
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    it.only('Sign in with OTP for organiser : POST /api/v2/users/login', async () => {
        // const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community2 = {

            "payload": {
                "data": {
                    "email": myemail,
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', { 'Authorization': process.env.accessTokenLoginPage, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', community2)
        process.env.accesstokenloginorganiseruser = (response.body.success.data.accessToken)
    });

    // it.only('Sign in with OTP for organiser : POST /api/v2/users/login', (done) => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    //     const community2 = {

    //         "payload": {
    //             "data": {
    //                 "email": myemail,
    //                 "mode": "OTP",
    //                 "otp": "1234",
    //                 "user_consent_data": []
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/users/login')
    //         .set('Authorization', process.env.accessTokenLoginPage)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(community2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             process.env.accesstokenloginorganiseruser = (response.body.success.data.accessToken)
    //             //console.log(process.env.accesstokenloginorganiseruser)
    //             done();
    //         });
    // });

    it.only('Create a discussion feed for organiser user : POST /api/v2/feed/create', async () => {

        const discussion_feed_organiser = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": "test feed",


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', discussion_feed_organiser)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.info).to.equal('test feed')
        organiserdiscussion1 = (response.body.success.data._id)
    });

    // it.only('Create a discussion feed for organiser user : POST /api/v2/feed/create', (done) => {

    //     const discussion_feed_organiser = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "DISCUSSION",
    //                 "info": "test feed",


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/create')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(discussion_feed_organiser)
    //         .end((err, response) => {
    //             // console.log(response.body,'2nd  response body')
    //             // console.log('event feed landing page');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('DISCUSSION')
    //             expect(response.body.success.data.info).to.equal('test feed')
    //             organiserdiscussion1 = (response.body.success.data._id)
    //             //console.log(approvedid, 'Get Approved ID')
    //             done();
    //         });
    // });

    it.only('Like feed by organiser : POST /api/v2/feed/like', async () => {

        const like_event_feed = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "isLike": "YES"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', like_event_feed)
        expect(response.body.success.data.isLike).to.equal('YES')
        expect(response.body.success.code).to.equal('FEED_LIKE')
    });

    // it.only('Like feed by organiser : POST /api/v2/feed/like', (done) => {

    //     const like_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "isLike": "YES"


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(like_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('YES')
    //             expect(response.body.success.code).to.equal('FEED_LIKE')
    //             done();
    //         });
    // });

    it.only('Add comment on feed by organiser : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "Test Comment",
                    "feedId": organiserdiscussion1


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('Test Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
        comment_id_organiser = (response.body.success.data._id)
    });

    // it.only('Add comment on feed by organiser : POST /api/v2/feed/comment/add', (done) => {

    //     const comment_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "comment": "Test Comment",
    //                 "feedId": organiserdiscussion1


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/feed/comment/add')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.comment).to.equal('Test Comment')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
    //             expect(response.body.success.data.isApproved).to.equal('YES')
    //             comment_id_organiser = (response.body.success.data._id)
    //             // console.log(comment_id, 'Get Comment ID')
    //             done();
    //         });
    // });

    it.only('Pin the discussion feed by organiser : POST /api/v2/feed/pin', async () => {

        const pin_feed = {
            "payload": {
                "data": {

                    "isPinned": "YES",
                    "feedId": organiserdiscussion1


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/pin', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', pin_feed)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Pin)
        // console.log(pin_feed, 'feed')
    });

    // it.only('Pin the discussion feed by organiser : POST /api/v2/feed/pin', (done) => {

    //     const pin_feed = {
    //         "payload": {
    //             "data": {

    //                 "isPinned": "YES",
    //                 "feedId": organiserdiscussion1


    //             }
    //         }
    //     }

    //     // console.log(pin_feed, 'feed')

    //     request3
    //         .post('/api/v2/feed/pin')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(pin_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Pin)
    //             done();
    //         });
    // });

    it.only('Unpin the discussion feed by organiser : POST /api/v2/feed/pin', async () => {

        const Unpin_feed = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "isPinned": "NO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/pin', { 'Authorization': process.env.accesstokenloginorganiseruser, 'Content-Type': 'application/json' }, 'post', Unpin_feed)
        // console.log(Unpin_feed, 'feed')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_UnPin)
    });

    // it.only('Unpin the discussion feed by organiser : POST /api/v2/feed/pin', (done) => {

    //     const Unpin_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "isPinned": "NO"
    //             }
    //         }
    //     }

    //     // console.log(Unpin_feed, 'feed')
    //     request3
    //         .post('/api/v2/feed/pin')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         // .set('source', environment.HSource)
    //         .send(Unpin_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_UnPin)
    //             done();
    //         });
    // });

    it.only('Report discussion feed created by organiser: POST /api/v2/feed/report', async () => {

        const report_feed_organiser =
        {
            "payload": {
                "data": {
                    "feedId": organiserdiscussion1,
                    "reportType": "It's spam",
                    "IsPinned": "test"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/report', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', report_feed_organiser)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Report)
    });

    it.only('Get list of Reported feeds in Activity feeds: POST /api/v1/activityfeed/reportlist', async () => {

        const report_list = 
        {
            "data": {
              "feed_id": organiserdiscussion1
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/reportlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', report_list)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].reportType).to.equal("It's spam")
    });

    it.only('Filter Activity feed by Reported Post on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list = 
        {
            "data": {
              "feed_status": "APPROVED",
              "filter": {
                "showReportedPost": "True"
              }
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].reports).to.equal(1)
        expect(response.body.data[0].feedType).to.equal("DISCUSSION")
    });

    it.only('Get People list in dashbaord: POST /backend/api/v2/events/people/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'Authorization': 'Bearer ' + process.env.eToken }, 'post')
         organiserid1 = (response.body.data[0].userId)
         commuserid1 = (response.body.data[1].userId)
    });


    it.only('Filter Activity feed posted by organizer on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list = 
        {
            "data": {
              "feed_status": "APPROVED",
              "filter": {
                "posted_by": organiserid1,
                "showReportedPost": "False"
              }
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].reports).to.equal(1)
        expect(response.body.data[0].feedType).to.equal("DISCUSSION")
    });

    // it.only('Report discussion feed created by organiser: POST /api/v2/feed/report', (done) => {

    //     const report_feed_organiser =
    //     {
    //         "payload": {
    //             "data": {
    //                 "feedId": organiserdiscussion1,
    //                 "reportType": "It's spam",
    //                 "IsPinned": "test"
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/report')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(report_feed_organiser)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Report)
    //             done();
    //         });
    // });

    it.only('Like feed of organiser by other user : POST /api/v2/feed/like', async () => {

        const like_event_feed = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "isLike": "YES"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', like_event_feed)
        expect(response.body.success.data.isLike).to.equal('YES')
        expect(response.body.success.code).to.equal('FEED_LIKE')
    });


    // it.only('Like feed of organiser by other user : POST /api/v2/feed/like', (done) => {

    //     const like_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "isLike": "YES"


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(like_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('YES')
    //             expect(response.body.success.code).to.equal('FEED_LIKE')
    //             done();
    //         });
    // });

    it.only('Add comment on feed by other user on organiser feed : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "New Comment",
                    "feedId": organiserdiscussion1


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('New Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
        comment_id_organiser1 = (response.body.success.data._id)
    });

    // it.only('Add comment on feed by other user on organiser feed : POST /api/v2/feed/comment/add', (done) => {

    //     const comment_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "comment": "New Comment",
    //                 "feedId": organiserdiscussion1


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/feed/comment/add')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.comment).to.equal('New Comment')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
    //             expect(response.body.success.data.isApproved).to.equal('YES')
    //             comment_id_organiser1 = (response.body.success.data._id)
    //             done();
    //         });
    // });

    it.only('Verify count of likes/comments a feed : POST /api/v2/feed/feeds', async () => {

        const verify_counts = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": [],
                    "input": "",
                    "limit": 10


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', verify_counts)
        expect(response.body.success.data.feeds[0].likes).to.equal(2)
        expect(response.body.success.data.feeds[0].commentCount).to.equal(2)
    });

    // it.only('Verify count of likes/comments a feed : POST /api/v2/feed/feeds', (done) => {

    //     const verify_counts = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": [],
    //                 "input": "",
    //                 "limit": 10


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(verify_counts)
    //         .end((err, response) => {
    //             // console.log('event feed landing page');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feeds[0].likes).to.equal(2)
    //             expect(response.body.success.data.feeds[0].commentCount).to.equal(2)
    //             done();
    //         });
    // });

    it.only('Unlike feed of organiser by other user : POST /api/v2/feed/like', async () => {

        const unlike_event_feed = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "isLike": "NO"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', unlike_event_feed)
        expect(response.body.success.data.isLike).to.equal('NO')
        expect(response.body.success.code).to.equal('FEED_UNLIKE')
    });

    // it.only('Unlike feed of organiser by other user : POST /api/v2/feed/like', (done) => {

    //     const unlike_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "isLike": "NO"


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(unlike_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('NO')
    //             expect(response.body.success.code).to.equal('FEED_UNLIKE')
    //             done();
    //         });
    // });

    it.only('Delete comment on feed : POST /api/v2/feed/comment/delete', async () => {

        const comment_delete_feed_organiser_new = {
            "payload": {
                "data": {

                    "commentId": comment_id_organiser1,
                    "feedId": organiserdiscussion1


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_delete_feed_organiser_new)
        expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    });

    // it.only('Delete comment on feed : POST /api/v2/feed/comment/delete', (done) => {

    //     const comment_delete_feed_organiser_new = {
    //         "payload": {
    //             "data": {

    //                 "commentId": comment_id_organiser1,
    //                 "feedId": organiserdiscussion1


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/comment/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_delete_feed_organiser_new)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    //             done();
    //         });
    // });

    it.only('Unlike feed of organiser : POST /api/v2/feed/like', async () => {

        const unlike_event_feed_organiser = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "isLike": "NO"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/like', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', unlike_event_feed_organiser)
        expect(response.body.success.data.isLike).to.equal('NO')
        expect(response.body.success.code).to.equal('FEED_UNLIKE')
    });



    // it.only('Unlike feed of organiser : POST /api/v2/feed/like', (done) => {

    //     const unlike_event_feed_organiser = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "isLike": "NO"


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/like')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(unlike_event_feed_organiser)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.isLike).to.equal('NO')
    //             expect(response.body.success.code).to.equal('FEED_UNLIKE')
    //             done();
    //         });
    // });

    it.only('Delete comment on feed by organiser : POST /api/v2/feed/comment/delete', async () => {

        const comment_delete_feed_organiser = {
            "payload": {
                "data": {

                    "commentId": comment_id_organiser,
                    "feedId": organiserdiscussion1


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/delete', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', comment_delete_feed_organiser)
        expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    });


    // it.only('Delete comment on feed by organiser : POST /api/v2/feed/comment/delete', (done) => {

    //     const comment_delete_feed_organiser = {
    //         "payload": {
    //             "data": {

    //                 "commentId": comment_id_organiser,
    //                 "feedId": organiserdiscussion1


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/comment/delete')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_delete_feed_organiser)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('FEED_COMMENT_DELETE')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Delete)
    //             done();
    //         });
    // });

    it.only('Verify count of likes/comments a feed post unlike & comment delete : POST /api/v2/feed/feeds', async () => {

        const verify_counts_post = {
            "payload": {
                "data": {

                    "current_page": 1,
                    "feature": [],
                    "input": "",
                    "limit": 10


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/feeds', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', verify_counts_post)
        expect(response.body.success.data.feeds[0].likes).to.equal(0)
        expect(response.body.success.data.feeds[0].commentCount).to.equal(0)
    });

    // it.only('Verify count of likes/comments a feed post unlike & comment delete : POST /api/v2/feed/feeds', (done) => {

    //     const verify_counts_post = {
    //         "payload": {
    //             "data": {

    //                 "current_page": 1,
    //                 "feature": [],
    //                 "input": "",
    //                 "limit": 10


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/feeds')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(verify_counts_post)
    //         .end((err, response) => {
    //             // console.log('event feed landing page');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.feeds[0].likes).to.equal(0)
    //             expect(response.body.success.data.feeds[0].commentCount).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Create a poll feed with other user : POST /api/v2/poll/create', async () => {

        const create_poll_feed_user = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"ronaldo\",\"messi\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "new poll feed",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "RADIO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_user)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedidotheruser1 = (response.body.success.data._id)
        polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
    });

    // it.only('Create a poll feed with other user : POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_user = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"ronaldo\",\"messi\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "new poll feed",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_user)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedidotheruser1 = (response.body.success.data._id)
    //             polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptioniduser1,
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });

    // it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptioniduser1,
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Unvote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptioniduser1,
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_UnVote_Done)
    });

    // it.only('Unvote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptioniduser1,
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(0)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_UnVote_Done)
    //             done();
    //         });
    // });

    it.only('Delete discussion feed by organiser : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": organiserdiscussion1,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });


    // it.only('Delete discussion feed by organiser : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": organiserdiscussion1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete poll feed by other user : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete poll feed by other user : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Create a discussion feed with length 1000 characters : POST /api/v2/feed/create', async () => {

        const s = 'abcde12345'.repeat(100)
        const create_event_feed_length_max = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": s,


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed_length_max)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.info).to.equal(s)
        approvedid1 = (response.body.success.data._id)
    });

    // it.only('Create a discussion feed with length 1000 characters : POST /api/v2/feed/create', (done) => {

    //     const s = 'abcde12345'.repeat(100)
    //     const create_event_feed_length_max = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "DISCUSSION",
    //                 "info": s,


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_length_max)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('DISCUSSION')
    //             expect(response.body.success.data.info).to.equal(s)
    //             approvedid1 = (response.body.success.data._id)
    //             //console.log(approvedid, 'Get Approved ID')
    //             done();
    //         });
    // });

    // it.only('Create a discussion feed with more than 1000 characters : POST /api/v2/feed/create', (done) => {

    //     const max1000 = 'abcde12345'.repeat(101)
    //     const create_event_feed_length_max_more = {"payload":{"data":{
    //         "feedType":"DISCUSSION",
    //         "info": max1000,
    //         "custom_tag":[]}}}
    //     console.log(create_event_feed_length_max_more,'4th body')
    //     request3
    //         .post('/api/v2/feed/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_length_max_more)
    //         .end((err, response) => {
    //             console.log(response.body,'4th response body')
    //             // console.log('event feed landing page');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             approvedid2 = (response.body.success.data._id)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('DISCUSSION')
    //             expect(response.body.success.data.info).to.equal(max1000)
    //             //console.log(approvedid, 'Get Approved ID')
    //             done();
    //         });
    // });

    it.only('Create a Introduction feed I am Looking for with length 1000 characters : POST /api/v2/feed/introduction', async () => {
        // this.retries(2)

        const s = 'abcde12345'.repeat(100)
        const create_event_feed_max = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "INTRO",
                    "info": s,
                    "intro_type": "LOOK"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/introduction', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed_max)
        introfeedid22 = (response.body.success.data._id)
        expect(response.body.success.data.info).to.equal(s)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('INTRO')
        expect(response.body.success.data.intro_type).to.equal('LOOK')
    });

    // it.only('Create a Introduction feed I am Looking for with length 1000 characters : POST /api/v2/feed/introduction', function(done) {
    //     // this.retries(2)

    //     const s = 'abcde12345'.repeat(100)
    //     const create_event_feed_max = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": s,
    //                 "intro_type": "LOOK"

    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_max)
    //         .end((err, response) => {
    //             consolelog(response)
    //             introfeedid22 = (response.body.success.data._id)
    //             expect(response.body.success.data.info).to.equal(s)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('LOOK')
    //             done();
    //         });
    // });

    // it.only('Create a Introduction feed I am Looking for with length more than 1000 characters : POST /api/v2/feed/introduction', (done) => {

    //     const s = 'abcde12345'.repeat(101)
    //     const create_event_feed_max_more = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": s,
    //                 "intro_type": "LOOK"

    //             }
    //         }
    //     }
    //     console.log(create_event_feed_max_more,'3nd intro body')


    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_max_more)
    //         .end((err, response) => {
    //             console.log(response.body,'3nd intro body')
    //             //console.log('event feed landing page');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             introfeedid3 = (response.body.success.data._id)
    //             expect(response.body.success.data.info).to.equal(s)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('LOOK')
    //             done();
    //         });
    // });

    it.only('Create a Introduction feed I am offering with length 1000 characters  : POST /api/v2/feed/introduction', async () => {
        // this.retries(2)

        const s = 'abcde12345'.repeat(100)
        const create_event_feed_max_offer = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "INTRO",
                    "info": s,
                    "intro_type": "OFFER",


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/introduction', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed_max_offer)
        offerid1 = (response.body.success.data._id)
        expect(response.body.success.data.info).to.equal(s)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('INTRO')
        expect(response.body.success.data.intro_type).to.equal('OFFER')
    });


    // it.only('Create a Introduction feed I am offering with length 1000 characters  : POST /api/v2/feed/introduction', function(done) {
    //     // this.retries(2)

    //     const s = 'abcde12345'.repeat(100)
    //     const create_event_feed_max_offer = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": s,
    //                 "intro_type": "OFFER",


    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_max_offer)
    //         .end((err, response) => {
    //             consolelog(response)
    //             offerid1 = (response.body.success.data._id)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.info).to.equal(s)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('OFFER')
    //             done();
    //         });
    // });

    // it.only('Create a Introduction feed I am offering with length more than 1000 characters  : POST /api/v2/feed/introduction', (done) => {

    //     const s = 'abcde12345'.repeat(101)
    //     const create_event_feed_max_offer_more = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "feedType": "INTRO",
    //                 "info": s,
    //                 "intro_type": "OFFER",


    //             }
    //         }
    //     }
    //     console.log(create_event_feed_max_offer_more,'event feed landing page');
    //     request3
    //         .post('/api/v2/feed/introduction')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed_max_offer_more)
    //         .end((err, response) => {
    //             console.log(response.body,'event feed landing page');
    //             consolelog(response)
    //             offerid2 = (response.body.success.data._id)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.info).to.equal(s)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('INTRO')
    //             expect(response.body.success.data.intro_type).to.equal('OFFER')
    //             done();
    //         });
    // });

    it.only('Create a poll feed with option length 30 characters & a single answer: POST /api/v2/poll/create', async () => {

        const create_poll_feed_30_max = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"testtesttesttesttesttesttestte\",\"testtesttesttesttesttesttestte\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "India vs new zealand finals",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_30_max)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedid1 = (response.body.success.data._id)
    });

    // it.only('Create a poll feed with option length 30 characters & a single answer: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_30_max = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"testtesttesttesttesttesttestte\",\"testtesttesttesttesttesttestte\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "India vs new zealand finals",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_30_max)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedid1 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Create a poll feed with option length more than 30 characters & a single answer: POST /api/v2/poll/create', async () => {

        const create_poll_feed_30_max_more = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"testtesttesttesttesttesttestte789\",\"testtesttesttesttesttesttestte789\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "India vs new zealand finals",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_30_max_more)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedid2 = (response.body.success.data._id)
    });


    // it.only('Create a poll feed with option length more than 30 characters & a single answer: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_30_max_more = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"testtesttesttesttesttesttestte789\",\"testtesttesttesttesttesttestte789\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "India vs new zealand finals",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_30_max_more)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedid2 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Create a poll feed with option length 30 characters & multiple answers: POST /api/v2/poll/create', async () => {

        const create_poll_feed_30_max_check = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"testtesttesttesttesttesttestte\",\"testtesttesttesttesttesttestte\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "India vs new zealand finals",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_30_max_check)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedid3 = (response.body.success.data._id)
    });

    // it.only('Create a poll feed with option length 30 characters & multiple answers: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_30_max_check = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"testtesttesttesttesttesttestte\",\"testtesttesttesttesttesttestte\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "India vs new zealand finals",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_30_max_check)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedid3 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Create a poll feed with option length more than 30 characters & multiple answers: POST /api/v2/poll/create', async () => {

        const create_poll_feed_30_max_more_check = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"testtesttesttesttesttesttestte789\",\"testtesttesttesttesttesttestte789\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "India vs new zealand finals",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_30_max_more_check)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedid4 = (response.body.success.data._id)
    });

    // it.only('Create a poll feed with option length more than 30 characters & multiple answers: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_30_max_more_check = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"testtesttesttesttesttesttestte789\",\"testtesttesttesttesttesttestte789\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "India vs new zealand finals",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_30_max_more_check)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedid4 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Delete discussion feed with length 1000 characters : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": approvedid1,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
        // console.log(delete_event_feed, 'Delete feed body')
    });

    // it.only('Delete discussion feed with length 1000 characters : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": approvedid1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    // it.only('Delete discussion feed with more than 1000 characters : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": approvedid2,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete Introduction feed I am Looking for with length 1000 characters : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": introfeedid22,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete Introduction feed I am Looking for with length 1000 characters : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": introfeedid22,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    // it.only('Delete Introduction feed I am Looking for with length more than 1000 characters : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": introfeedid3,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete Introduction feed I am offering with length 1000 characters : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": offerid1,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete Introduction feed I am offering with length 1000 characters : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": offerid1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    // it.only('Delete Introduction feed I am offering with length more than 1000 characters  : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": offerid2,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete poll feed with option length 30 characters & a single answer : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedid1,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete poll feed with option length 30 characters & a single answer : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedid1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete poll feed with option length more than 30 characters & a single answer: POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedid2,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete poll feed with option length more than 30 characters & a single answer: POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedid2,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete poll feed with option length 30 characters & multiple answers : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedid3,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });


    // it.only('Delete poll feed with option length 30 characters & multiple answers : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedid3,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Delete poll feed with option length 30 characters & multiple answers : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedid4,
                    "deactivate": "YES"


                }
            }
        }
        // console.log(delete_event_feed, 'Delete feed body')
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete poll feed with option length 30 characters & multiple answers : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedid4,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     // console.log(delete_event_feed, 'Delete feed body')

    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Create a poll feed with five options: POST /api/v2/poll/create', async () => {

        const create_poll_feed_options = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "new poll feed",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_options)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedidotheruser1 = (response.body.success.data._id)
        polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
    });



    // it.only('Create a poll feed with five options: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_options = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "new poll feed",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_options)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedidotheruser1 = (response.body.success.data._id)
    //             polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptioniduser1,
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.status).to.equal(200)
        // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });


    // it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptioniduser1,
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Unvote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptioniduser1,
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_UnVote_Done)
    });

    // it.only('Unvote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptioniduser1,
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(0)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_UnVote_Done)
    //             done();
    //         });
    // });

    it.only('Delete poll feed by other user : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });


    // it.only('Delete poll feed by other user : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Create a poll feed with Multiple Answers and five options: POST /api/v2/poll/create', async () => {

        const create_poll_feed_options = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": "new poll feed",
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_options)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
        polleventcreatedidotheruser1 = (response.body.success.data._id)
        polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
        polleventcreatedoptionid2 = (response.body.success.data.option[1]._id)
        polleventcreatedoptionid3 = (response.body.success.data.option[2]._id)
        polleventcreatedoptionid4 = (response.body.success.data.option[3]._id)
    });



    // it.only('Create a poll feed with Multiple Answers and five options: POST /api/v2/poll/create', (done) => {

    //     const create_poll_feed_options = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": "new poll feed",
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_options)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedidotheruser1 = (response.body.success.data._id)
    //             polleventcreatedoptioniduser1 = (response.body.success.data.option[0]._id)
    //             polleventcreatedoptionid2 = (response.body.success.data.option[1]._id)
    //             polleventcreatedoptionid3 = (response.body.success.data.option[2]._id)
    //             polleventcreatedoptionid4 = (response.body.success.data.option[3]._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptioniduser1,
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });

    // it.only('Vote an answer(ronaldo) from organiser : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptioniduser1,
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Vote an answer with option 2 : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptionid2,
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });



    // it.only('Vote an answer with option 2 : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptionid2,
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Vote an answer with option 3 : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptionid3,
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });

    // it.only('Vote an answer with option 3 : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptionid3,
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Vote an answer with option 4 : POST /api/v2/poll/vote', async () => {

        const vote_ronaldo = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "optionId": polleventcreatedoptionid4,
                    "pollType": "CHECK"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/vote', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', vote_ronaldo)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    });


    // it.only('Vote an answer with option 4 : POST /api/v2/poll/vote', (done) => {

    //     const vote_ronaldo = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "optionId": polleventcreatedoptionid4,
    //                 "pollType": "CHECK"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/vote')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(vote_ronaldo)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.result.polleventcreatedoptioniduser1).to.equal(100)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Vote_Done)
    //             done();
    //         });
    // });

    it.only('Delete poll feed for multiple answers : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": polleventcreatedidotheruser1,
                    "deactivate": "YES"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });


    // it.only('Delete poll feed for multiple answers : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": polleventcreatedidotheruser1,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });

    it.only('Create a poll feed with length of 1000 characters: POST /api/v2/poll/create', async () => {

        const with1000 = 'ThisIsGood'.repeat(100)
        const create_poll_feed_options = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "device_type": "WEB",
                    "feedType": "POLLS",
                    "isOther": "NO",
                    "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
                    "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                    "pollQuestion": with1000,
                    "pollStartMilli": new Date().getTime(),
                    "pollType": "RADIO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/poll/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_poll_feed_options)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
        expect(response.body.success.data.feedType).to.equal('POLLS')
    });


    // it.only('Create a poll feed with length of 1000 characters: POST /api/v2/poll/create', (done) => {

    //     const with1000 = 'ThisIsGood'.repeat(100)
    //     const create_poll_feed_options = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": with1000,
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_options)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedidotheruser1 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    // it.only('Create a poll feed with length of more then 1000 characters: POST /api/v2/poll/create', (done) => {

    //     const with1000more = 'ThisIsGood'.repeat(101)
    //     const create_poll_feed_options = {
    //         "payload": {
    //             "data": {

    //                 "custom_tag": [],
    //                 "device_type": "WEB",
    //                 "feedType": "POLLS",
    //                 "isOther": "NO",
    //                 "options": "[\"ronaldo\",\"messi\",\"Xavi\",\"Andres Iniesta\",\"Neymar\"]",
    //                 "pollEndMilli": (addTime(new Date(), 1)).getTime(),
    //                 "pollQuestion": with1000more,
    //                 "pollStartMilli": new Date().getTime(),
    //                 "pollType": "RADIO"
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/poll/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_poll_feed_options)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Poll_Create)
    //             expect(response.body.success.data.feedType).to.equal('POLLS')
    //             polleventcreatedidotheruser1 = (response.body.success.data._id)
    //             // console.log(polleventcreatedid, 'Get Poll Event Created ID')
    //             done();
    //         });
    // });

    it.only('Upload image in Event Feed: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
                "data": {
                    "extension": "png",
                    "contentType": "image/png",
                    "pathType": "feed",
                    "uploadType": "CONTEST_IMAGE"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', get_signed_url)
        Entry_contest_file = (response.body.success.data.urlLists[0].fileName)
    });

    // it.only('Upload image in Event Feed: POST /api/v2/get-signed-url', (done) => {

    //     const get_signed_url = {
    //         "payload": {
    //             "data": {
    //                 "extension": "png",
    //                 "contentType": "image/png",
    //                 "pathType": "feed",
    //                 "uploadType": "CONTEST_IMAGE"
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/get-signed-url')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(get_signed_url)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             Entry_contest_file = (response.body.success.data.urlLists[0].fileName)
    //             // console.log(Entry_contest_file)
    //             done();
    //         });
    // });


    //<-------------------CREATE EVENT FEEDS on Community v2 ----------------------------->

    //200: POSITIVE Create a discussion feed on community : POST /api/v2/feed/create 

    it.only('Create a Photo Feed : POST /api/v2/feed/create', async () => {

        const create_event_feed =
        {
            "payload":
            {
                "data":
                {
                    "feedType": "PHOTO",
                    "info": "Good Images post",
                    "image": Entry_contest_file,
                    "image_height": 415,
                    "image_width": 800,
                    "custom_tag": []
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed);
        photo_feed_id = (response.body.success.data._id)
        expect(response.body.success.data.info).to.equal('Good Images post')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal('PHOTO')
        expect(response.body.success.data.info).to.equal('Good Images post')
    });


    // it.only('Create a Photo Feed : POST /api/v2/feed/create', (done) => {

    //     const create_event_feed =
    //     {
    //         "payload":
    //         {
    //             "data":
    //             {
    //                 "feedType": "PHOTO",
    //                 "info": "Good Images post",
    //                 "image": Entry_contest_file,
    //                 "image_height": 415,
    //                 "image_width": 800,
    //                 "custom_tag": []
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/feed/create')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(create_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             photo_feed_id = (response.body.success.data._id)
    //             expect(response.body.success.data.info).to.equal('Good Images post')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    //             expect(response.body.success.data.feedType).to.equal('PHOTO')
    //             expect(response.body.success.data.info).to.equal('Good Images post')
    //             done();
    //         });
    // });

    it.only('Delete photo feed by organiser : POST /api/v2/feed/delete', async () => {

        const delete_event_feed = {
            "payload": {
                "data": {

                    "feedId": photo_feed_id,
                    "deactivate": "YES"


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/delete', { 'Authorization': process.env.accesstokenloginorganiseruser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', delete_event_feed)
        expect(response.body.success.code).to.equal('DELETED_FEED')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    });

    // it.only('Delete photo feed by organiser : POST /api/v2/feed/delete', (done) => {

    //     const delete_event_feed = {
    //         "payload": {
    //             "data": {

    //                 "feedId": photo_feed_id,
    //                 "deactivate": "YES"


    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/feed/delete')
    //         .set('Authorization', process.env.accesstokenloginorganiseruser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(delete_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.code).to.equal('DELETED_FEED')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Delete)
    //             done();
    //         });
    // });


    it.only('Turn On Moderation :- POST /api/v1/activityfeed/moderation', async () => {
        const moderate_on =
        {
            "data": {
                "moderation": "YES",
                "feed_status": "NO_CHANGE"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/moderation', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', moderate_on)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Create a discussion feed : POST /api/v2/feed/create', async () => {

        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": "Test feed Moderate"


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser }, 'post', create_event_feed)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_Event_feed_create_moderation)
    });


    it.only('Get event feeds on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list =
        {
            "data": {
                "feed_status": "PENDING"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        moderate_feed_id = (response.body.data[0]._id)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].feedType).to.equal('DISCUSSION')
    });

    it.only('This will reject event feeds on dashboard: POST /api/v1/activityfeed/feedstatus', async () => {

        const approveddata1 = {
            "data": {

                "feed_id": moderate_feed_id,
                "feed_status": "REJECTED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedstatus', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Get list of rejected event feeds on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list = {
            "data": {
                "feed_status": "REJECTED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].feedType).to.equal('DISCUSSION')
    });

    it.only('Pin feed in Activity Feed rejected tab on dashboard: POST /api/v1/activityfeed/pin', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_id": moderate_feed_id,
                "is_pinned": "YES"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/pin', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Unpin feed in Activity Feed rejected tab on dashboard: POST /api/v1/activityfeed/pin', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_id": moderate_feed_id,
                "is_pinned": "NO"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/pin', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Search feed with feed info in rejected tab in Activity Feed: POST /api/v1/activityfeed/feedlist', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_status": "REJECTED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'search': 'Test feed Moderate' }, 'post', approveddata1)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].feedType).to.equal('DISCUSSION')
        expect(response.body.data[0].info).to.equal('Test feed Moderate')


    });

    it.only('Search feed with wrong info in rejected tab in Activity Feed: POST /api/v1/activityfeed/feedlist', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_status": "REJECTED"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'search': 'wrong feed' }, 'post', approveddata1)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Approve Activity feed from Rejected Tab in dashboard: POST /api/v1/activityfeed/feedstatus', async () => {

        const approveddata1 = 
        {
            "data": {
              "feed_id": moderate_feed_id,
              "feed_status": "APPROVED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v1/activityfeed/feedstatus',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Verify feed on community after approve from rejected tab. : POST /api/v2/feed/feeds', async () => {

        const mypost_event_feed = {
            "payload": {
              "data": {
                "current_page": 1,
                "limit": 10,
                "feature": [],
                "input": ""
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/feed/feeds',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',mypost_event_feed)
        expect(response.body.success.data.feeds[0].feedType).to.equal('DISCUSSION')
        expect(response.body.success.data.feeds[0].info).to.equal('Test feed Moderate')
    });
    

    it.only('Verify feed in Approved tab after approve from rejected tab : POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list =
        {
            "data": {
              "feed_status": "APPROVED"
            }
          }

          var response = await sendRequest(environment.baseURL,'/api/v1/activityfeed/feedlist',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'page' : environment.HPage, 'limit' : 12, 'Authorization' : 'Bearer ' + process.env.eToken},'post',feed_list)
          expect(response.body.moderation).to.equal('YES')
          expect(response.body.data[0].feedType).to.equal('DISCUSSION')
          expect(response.body.data[0].isApproved).to.equal('YES')
          expect(response.body.data[0].info).to.equal('Test feed Moderate')
    });

    it.only('Pin feed in Activity Feed Approved tab on dashboard: POST /api/v1/activityfeed/pin', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_id": moderate_feed_id,
                "is_pinned": "YES"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/pin', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });

    it.only('Verify feed on community after pin from approved tab. : POST /api/v2/feed/feeds', async () => {

        const mypost_event_feed = {
            "payload": {
              "data": {
                "current_page": 1,
                "limit": 10,
                "feature": [],
                "input": ""
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/feed/feeds',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',mypost_event_feed)
        expect(response.body.success.data.feeds[0].isPinned).to.equal(1)
        expect(response.body.success.data.feeds[0].info).to.equal('Test feed Moderate')
    });
    

    it.only('Unpin feed in Activity Feed Approved tab on dashboard: POST /api/v1/activityfeed/pin', async () => {

        const approveddata1 =
        {
            "data": {
                "feed_id": moderate_feed_id,
                "is_pinned": "NO"
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/pin', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', approveddata1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    it.only('Verify feed on community after Unpin from approved tab. : POST /api/v2/feed/feeds', async () => {

        const mypost_event_feed = {
            "payload": {
              "data": {
                "current_page": 1,
                "limit": 10,
                "feature": [],
                "input": ""
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/feed/feeds',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',mypost_event_feed)
        expect(response.body.success.data.feeds[0].isPinned).to.equal(0)
        expect(response.body.success.data.feeds[0].info).to.equal("Test feed Moderate")
    });

    it.only('Filter Activity feed with posted by community user on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list = 
        {
            "data": {
              "feed_status": "APPROVED",
              "filter": {
                "posted_by": commuserid1,
                "showReportedPost": "False"
              }
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        expect(response.body.data[0].feedType).to.equal("DISCUSSION")
        expect(response.body.data[0].info).to.equal("Test feed Moderate")
    });


    it.only('Filter Activity feed with posted by and todays date with community user on dashboard: POST /api/v1/activityfeed/feedlist', async () => {

        const feed_list = 
        {
            "data": {
              "feed_status": "APPROVED",
              "filter": {
                "start_milli": new Date().getTime(),
                "end_milli": new Date().getTime(),
                "posted_by": commuserid1,
                "showReportedPost": "False"
              }
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'page': environment.HPage, 'limit': 12, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', feed_list)
        
    });

    it.only('Search feed with feed info in Approved tab in Activity Feed: POST /api/v1/activityfeed/feedlist', async () => {

        const approveddata1 =
        {
            "data": {
              "feed_status": "APPROVED"
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'search': 'Test feed Moderate' }, 'post', approveddata1)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].feedType).to.equal('DISCUSSION')
        expect(response.body.data[0].info).to.equal('Test feed Moderate')


    });

    it.only('Search feed with wrong info in Approved tab in Activity Feed: POST /api/v1/activityfeed/feedlist', async () => {

        const approveddata1 =
        {
            "data": {
              "feed_status": "APPROVED"
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/feedlist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'search': 'wrong feed' }, 'post', approveddata1)
        expect(response.body.moderation).to.equal('YES')
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Turn off Moderation :- POST /api/v1/activityfeed/moderation', async () => {
        const moderate_on =
        {
            "data": {
              "moderation": "NO",
              "feed_status": "NO_CHANGE"
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/activityfeed/moderation', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', moderate_on)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Event_moderation_On)
    });


    //Event Analytics Feed


    it.only('Get most active attendee in event analytics :- POST /api/v1/event/mostActiveAttendee', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/event/mostActiveAttendee', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.attendees[0].firstName).to.equal("joker")
        expect(response.body.data.attendees[0].createPoll).to.equal(8)
        expect(response.body.data.attendees[0].createPost).to.equal(9) 
    });


    it.only('Create a discussion feed after moderation off : POST /api/v2/feed/create', async () => {

        const create_event_feed = {
            "payload": {
                "data": {

                    "custom_tag": [],
                    "feedType": "DISCUSSION",
                    "info": "Test feed",


                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        expect(response.body.success.data.info).to.equal('Test feed')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
    });


    it.only('Upload video in discussion feed: POST /api/v2/get-signed-url', async () => {

        const get_signed_url ={
            "payload": {
              "data": {
                "extension": "mp4",
                "contentType": "video/mp4",
                "pathType": "feed",
                "uploadType": "FEED_VIDEO"
              }
            }
          }
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        global.vvideoFeedFile2 = (response.body.success.data.urlLists[0].fileName);
        global.feedFileUploadUrl2 = (response.body.success.data.urlLists[0].uploadURL)
    });

    it.only('Upload video to aws upload url', function(done){
        const req = require('supertest')
        var awsHost = 'https://' + global.feedFileUploadUrl2.split('/')[2]
        var awsUploadUrl = global.feedFileUploadUrl2.substr(awsHost.length)
        const fs = require('fs')
        let testVideo = './images_branding/Network.mp4'
        req(awsHost).put(awsUploadUrl)
        .set('Content-Type','video/mp4')
        .send(fs.readFileSync(testVideo))
        .end((err, response) => {
            expect(response.status).to.equal(200);
            done();
        });
    });


    it.only('Upload video thumbnail image in feed: POST /api/v2/get-signed-url', async () => {

        const get_signed_url = {
            "payload": {
              "data": {
                "extension": "png",
                "contentType": "image/png",
                "pathType": "feed",
                "uploadType": "FEED_VIDEO_THUMB"
              }
            }
          }
        
        var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
        global.videoFeedImageFile3 = (response.body.success.data.urlLists[0].fileName);
        global.entryContestFileUploadUrl3 = (response.body.success.data.urlLists[0].uploadURL)
    });

    it.only('Upload image to aws upload url', function(done){
        const req = require('supertest')
        var awsHost = 'https://' + global.entryContestFileUploadUrl3.split('/')[2]
        var awsUploadUrl = global.entryContestFileUploadUrl3.substr(awsHost.length)
        const fs = require('fs')
        let testImage = './images_branding/Network_thumb.png'
        req(awsHost).put(awsUploadUrl)
        .set('Content-Type','image/png')
        .send(fs.readFileSync(testImage))
        .end((err, response) => {
            expect(response.status).to.equal(200);
            done();
        });
    });

    it.only('Create a video feed : POST /api/v2/feed/create', async () => {

        const create_event_feed = {
            "payload": {
              "data": {
                "feedType": "VIDEO",
                "info": "Test Video Feed",
                "imageUrl": global.videoFeedImageFile3,
                "video":  global.vvideoFeedFile2,
                "video_sub_type": "NATIVE",
                "custom_tag": []
              }
            }
          }

        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', create_event_feed)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Feed_Create)
        expect(response.body.success.data.feedType).to.equal("VIDEO")
        expect(response.body.success.data.info).to.equal("Test Video Feed")
        expect(response.body.success.data.video_sub_type).to.equal("NATIVE")
    });

    

});
