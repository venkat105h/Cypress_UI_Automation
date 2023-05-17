/*
Author: Pranjal Shah
Description: This Script will update notification setting in community and then verify.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 22nd Oct 2021 05:15 PM.
Description: Added 2 sec delay for failure retry.
Modified: Pranjal Shah 21st Jan 2022 17:09 PM.
Description: "link" parameter is added for SWAT env payload script handling updated accordingly.
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest,addDays} from '../../helper/CommonUtil'
require('dotenv').config();

var approvedid
var ProfileViewid
var Messageid
var MeetingStatusid
var AdminPostid
var AdminPollid
var SessionRegistrationid
var Meetingreminderid
var Sessionreminderid
var SessionGoLiveid
var attendeegroup
var boothmembergroup
var speakergroup
var getAttendees
var notification_id
var notification_id1


//This script will update/remove settings on community
describe('Update Notification Setting And Verify', function () {
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
    var todayDate = new Date().toISOString().slice(0, 10);

    var SecondDay = addDays(new Date(), 1).toISOString().slice(0, 10);
    var ThirdDay = addDays(new Date(), 2).toISOString().slice(0, 10);
    var FourDay = addDays(new Date(), 3).toISOString().slice(0, 10);

    var now = new Date(); //Current date
    var nextWeek = addDays(now, 3).toISOString().slice(0, 10); // Add 7 days

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + 'T' + time.concat('+05:30')


    // it.only('Enable all organiser notification & new activity : POST /api/v2/settings/update-settings-web', (done) => {
    //     const enableNotification =
    //     {
    //       "payload": {
    //         "data": {
    //           "isDisabled": false,
    //           "meetingReminder": true,
    //           "newChat": true,
    //           "newMeeting": true,
    //           "newPoll": true,
    //           "newPost": true,
    //           "newPostActivity": true,
    //           "newProfileView": true,
    //           "notificationType": "DESKTOP",
    //           "pushFromOrganiser": true,
    //           "scheduleReminder": true

    //         }
    //       }
    //     }
    //     request3
    //       .post('/api/v2/settings/update-settings-web')
    //       .set('Authorization', process.env.accesstokenloginuser)
    //       .set('source', environment.HSource)
    //       .set('languageid', 34)
    //       .set('Content-Type', 'application/json')
    //       .send(enableNotification)
    //       .end((err, response) => {
    //          consolelog(response)
    //         expect(response.status).to.equal(200)
    //         expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //         done();
    //       });
    //   });


    //New Post Activity OFF

    it.only('New Post Activity Off : POST /api/v2/settings/update-settings-web', async () => {
        const enableNotification =
        {
            "payload": {
                "data": {
                    "notificationType": "DESKTOP",
                    "isDisabled": false,
                    "meetingReminder": true,
                    "newChat": false,
                    "newMeeting": false,
                    "newPoll": true,
                    "newPost": true,
                    "newPostActivity": false,
                    "newProfileView": false,
                    "pushFromOrganiser": false,
                    "scheduleReminder": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', enableNotification)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    });
    // it.only('New Post Activity Off : POST /api/v2/settings/update-settings-web', (done) => {
    //     const enableNotification =
    //     {
    //         "payload": {
    //             "data": {
    //                 "notificationType": "DESKTOP",
    //                 "isDisabled": false,
    //                 "meetingReminder": true,
    //                 "newChat": false,
    //                 "newMeeting": false,
    //                 "newPoll": true,
    //                 "newPost": true,
    //                 "newPostActivity": false,
    //                 "newProfileView": false,
    //                 "pushFromOrganiser": false,
    //                 "scheduleReminder": false
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/update-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(enableNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //             done();
    //         });
    // });

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
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/create', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', create_event_feed)
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

    it.only('Sign in with otp: POST /api/v2/users/login', async () => {

        const community2 = {

            "payload": {
                "data": {
                    "email": "asii9s0s@gmail.com",
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2)
        process.env.accesstokenloginusernotification = (response.body.success.data.accessToken)
    });


    // it.only('Sign in with otp: POST /api/v2/users/login', (done) => {

    //     const community2 = {

    //         "payload": {
    //             "data": {
    //                 "email": "asii9s0s@gmail.com",
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
    //             process.env.accesstokenloginusernotification = (response.body.success.data.accessToken)
    //             // console.log(process.env.accesstokenloginusernotification)
    //             done();
    //         });
    // });

    it.only('Add comment on feed : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "Test Comment",
                    "feedId": approvedid


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginusernotification, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('Test Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
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
    //         .set('Authorization', process.env.accesstokenloginusernotification)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.comment).to.equal('Test Comment')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
    //             expect(response.body.success.data.isApproved).to.equal('YES')
    //             // comment_id = (response.body.success.data._id)
    //             // console.log(comment_id, 'Get Comment ID')
    //             done();
    //         });
    // });

    it.only('Verify Notifications : POST /api/v2/notifications/list', async () => {

        const VerfiyPostNotification = {
            "payload": {
                "data": {

                    "userNotCount": 0,
                    "orgNotCount": 0,
                    "currentPage": 0,
                    "limit": 10


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/notifications/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', VerfiyPostNotification)
    });

    // it.only('Verify Notifications : POST /api/v2/notifications/list', function (done) {

    //     const VerfiyPostNotification = {
    //         "payload": {
    //             "data": {

    //                 "userNotCount": 0,
    //                 "orgNotCount": 0,
    //                 "currentPage": 0,
    //                 "limit": 10


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/notifications/list')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(VerfiyPostNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.count).to.equal(0)
    //             done();
    //         });
    // });

    it.only('New Post Activity On : POST /api/v2/settings/update-settings-web', async () => {

        const enableNotification =
        {
            "payload": {
                "data": {
                    "notificationType": "DESKTOP",
                    "isDisabled": false,
                    "meetingReminder": true,
                    "newChat": false,
                    "newMeeting": false,
                    "newPoll": true,
                    "newPost": true,
                    "newPostActivity": true,
                    "newProfileView": false,
                    "pushFromOrganiser": false,
                    "scheduleReminder": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', enableNotification)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    });

    // it.only('New Post Activity On : POST /api/v2/settings/update-settings-web', (done) => {
    //     const enableNotification =
    //     {
    //         "payload": {
    //             "data": {
    //                 "notificationType": "DESKTOP",
    //                 "isDisabled": false,
    //                 "meetingReminder": true,
    //                 "newChat": false,
    //                 "newMeeting": false,
    //                 "newPoll": true,
    //                 "newPost": true,
    //                 "newPostActivity": true,
    //                 "newProfileView": false,
    //                 "pushFromOrganiser": false,
    //                 "scheduleReminder": false
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/update-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(enableNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //             done();
    //         });
    // });

    it.only('Add comment on feed : POST /api/v2/feed/comment/add', async () => {

        const comment_event_feed = {
            "payload": {
                "data": {

                    "comment": "Test Comment",
                    "feedId": approvedid


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/feed/comment/add', { 'Authorization': process.env.accesstokenloginusernotification, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', comment_event_feed)
        expect(response.body.success.data.comment).to.equal('Test Comment')
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
        expect(response.body.success.data.isApproved).to.equal('YES')
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
    //         .set('Authorization', process.env.accesstokenloginusernotification)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(comment_event_feed)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.comment).to.equal('Test Comment')
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Event_Comment_Add)
    //             expect(response.body.success.data.isApproved).to.equal('YES')
    //             // comment_id = (response.body.success.data._id)
    //             // console.log(comment_id, 'Get Comment ID')
    //             done();
    //         });
    // });

    it.only('Verify Notifications : POST /api/v2/notifications/list', async () => {

        const VerfiyPostNotification = {
            "payload": {
                "data": {
                    "userNotCount": 0,
                    "orgNotCount": 0,
                    "currentPage": 0,
                    "limit": 10


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/notifications/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', VerfiyPostNotification)
    });

    // it.only('Verify Notifications : POST /api/v2/notifications/list', function (done) {
    //     // this.retries(2)
    //     // console.log('retry')

    //     const VerfiyPostNotification = {
    //         "payload": {
    //             "data": {
    //                 "userNotCount": 0,
    //                 "orgNotCount": 0,
    //                 "currentPage": 0,
    //                 "limit": 10


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/notifications/list')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(VerfiyPostNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.count).to.equal(1)
    //             // expect(response.body.success.data.list[0].context).to.equal('POST_COMMENT')
    //             done();
    //         });
    // });

    it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        attendeegroup = (response.body.data[0].id)
        boothmembergroup = (response.body.data[1].id)
        speakergroup = (response.body.data[2].id)
    });


    // it.only('Get group list of people : GET /backend/api/v2/people/groups/list', (done) => {
    //     request1
    //         .get('/backend/api/v2/people/groups/list')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('buildversion', process.env.buildversion)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             attendeegroup = (response.body.data[0].id)
    //             // console.log(attendeegroup)
    //             boothmembergroup = (response.body.data[1].id)
    //             // console.log(boothmembergroup)
    //             speakergroup = (response.body.data[2].id)
    //             // console.log(speakergroup)
    //             done();
    //         });
    // });

    it.only('Verify added attendee on community: POST /api/v2/attendee', async () => {
        const searchattendee =
        {
            "payload": {
                "data": {
                    "language": 0,
                    "page": 0,
                    "limit": 18,
                    "sort": 0,
                    "input": "",
                    "filter": "0,0,0",
                    "isShowLoggedinUser": "NO",
                    "industryIds": "",
                    "intrestIds": "",
                    "attendeeIds": [
                        ""
                    ],
                    "wantOnlineAttendee": "NO",
                    "designation": "",
                    "organisationName": "",
                    "country": "",
                    "state": "",
                    "city": "",
                    "userProfileFields": {},
                    "sidebarId": attendeegroup
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/attendee', { 'Authorization': process.env.accesstokenloginusernotification, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', searchattendee)
        getAttendees = (response.body.success.data.attendees[0].Id)
    })


    // it.only('Verify added attendee on community: POST /api/v2/attendee', (done) => {
    //     const searchattendee =
    //     {
    //         "payload": {
    //             "data": {
    //                 "language": 0,
    //                 "page": 0,
    //                 "limit": 18,
    //                 "sort": 0,
    //                 "input": "",
    //                 "filter": "0,0,0",
    //                 "isShowLoggedinUser": "NO",
    //                 "industryIds": "",
    //                 "intrestIds": "",
    //                 "attendeeIds": [
    //                     ""
    //                 ],
    //                 "wantOnlineAttendee": "NO",
    //                 "designation": "",
    //                 "organisationName": "",
    //                 "country": "",
    //                 "state": "",
    //                 "city": "",
    //                 "userProfileFields": {},
    //                 "sidebarId": attendeegroup
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/attendee')
    //         .set('Authorization', process.env.accesstokenloginusernotification)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(searchattendee)
    //         .end((err, response) => {
    //             consolelog(response);
    //             expect(response.status).to.equal(200)
    //             getAttendees = (response.body.success.data.attendees[0].Id)
    //             // console.log(getAttendees)
    //             // expect(response.body.success.data.attendees[1].profilePictures.orignal).to.equal('3971_5650_662620001619006566.png')
    //             done();
    //         });
    // });



    //Send Meeting Request

    // it.only('Send Meeting Request: POST /api/v2/attendee/meet', (done) => {

    //     // var meetingdate = new Date().toISOString().slice(0, 22).concat('+05:30')

    //     const meetingrequest = {
    //         "payload": {
    //             "data": {
    //                 "slotDuration": 15,
    //                 "meetingDate": dateTime,
    //                 "message": "Hi  joker, I would like to connect with you.",
    //                 "numberOfSlots": 1,
    //                 "meetingStartTime": new Date().getTime(),
    //                 "meetingEndTime": (addTime(new Date(), 1)).getTime()
    //             }
    //         }
    //     }

    //     console.log(meetingrequest, 'meeting request payload')

    //     request3
    //         .post('/api/v2/attendee/' + getAttendees + '/meet')
    //         .set('Authorization', process.env.accesstokenloginusernotification)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(meetingrequest)
    //         .end((err, response) => {
    //             // consolelog(response)
    //             console.log(response.body)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_community_Add_message)
    //             // getAttendees = (response.body.data.attendees[0])
    //             // console.log(getAttendees)
    //             done();
    //         });
    // });

    it.only('Verify Notifications : POST /api/v2/notifications/list', async () => {

        const VerfiyPostNotification = {
            "payload": {
                "data": {

                    "userNotCount": 0,
                    "orgNotCount": 0,
                    "currentPage": 0,
                    "limit": 10


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/notifications/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', VerfiyPostNotification)
    });

    // it.only('Verify Notifications : POST /api/v2/notifications/list', function (done) {

    //     const VerfiyPostNotification = {
    //         "payload": {
    //             "data": {

    //                 "userNotCount": 0,
    //                 "orgNotCount": 0,
    //                 "currentPage": 0,
    //                 "limit": 10


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/notifications/list')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(VerfiyPostNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.count).to.equal(1)
    //             done();
    //         });
    // });

    it.only('New Post Activity On : POST /api/v2/settings/update-settings-web', async () => {
        const enableNotification =
        {
            "payload": {
                "data": {
                    "isDisabled": false,
                    "meetingReminder": true,
                    "newChat": true,
                    "newMeeting": true,
                    "newPoll": true,
                    "newPost": true,
                    "newPostActivity": true,
                    "newProfileView": true,
                    "notificationType": "DESKTOP",
                    "pushFromOrganiser": true,
                    "scheduleReminder": true

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', enableNotification)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    });


    // it.only('New Post Activity On : POST /api/v2/settings/update-settings-web', (done) => {
    //     const enableNotification =
    //     {
    //         "payload": {
    //             "data": {
    //                 "isDisabled": false,
    //                 "meetingReminder": true,
    //                 "newChat": true,
    //                 "newMeeting": true,
    //                 "newPoll": true,
    //                 "newPost": true,
    //                 "newPostActivity": true,
    //                 "newProfileView": true,
    //                 "notificationType": "DESKTOP",
    //                 "pushFromOrganiser": true,
    //                 "scheduleReminder": true

    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/update-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(enableNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //             done();
    //         });
    // });

    it.only('Profile views notification Off : POST /api/v2/settings/update-settings-web', async () => {
        const profileviewsnotoff =
        {
            "payload": {
                "data": {
                    "notificationType": "DESKTOP",
                    "isDisabled": false,
                    "meetingReminder": true,
                    "newChat": true,
                    "newMeeting": true,
                    "newPoll": true,
                    "newPost": true,
                    "newPostActivity": true,
                    "newProfileView": false,
                    "pushFromOrganiser": true,
                    "scheduleReminder": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', profileviewsnotoff)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    });

    // it.only('Profile views notification Off : POST /api/v2/settings/update-settings-web', (done) => {
    //     const profileviewsnotoff =
    //     {
    //         "payload": {
    //             "data": {
    //                 "notificationType": "DESKTOP",
    //                 "isDisabled": false,
    //                 "meetingReminder": true,
    //                 "newChat": true,
    //                 "newMeeting": true,
    //                 "newPoll": true,
    //                 "newPost": true,
    //                 "newPostActivity": true,
    //                 "newProfileView": false,
    //                 "pushFromOrganiser": true,
    //                 "scheduleReminder": true
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/update-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(profileviewsnotoff)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //             done();
    //         });
    // });

    it.only('Signup a new user (clown28@yopmail.com) : POST api/v2/users/signup', async () => {

        const community2 = {
            "payload": {
                "data": {
                    "email": "clown28@yopmail.com",
                    "firstName": "joker",
                    "lastName": "clown",
                    "password": "Test@1234",

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/signup', { 'Authorization': process.env.accessTokenLoginPage, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_signup_newuser_succesfull_message)
        expect(response.body.success.data.email).to.equal('clown28@yopmail.com')
        process.env.accesstokenclown28user = (response.body.success.data.accessToken)
    });


    // it.only('Signup a new user (clown28@yopmail.com) : POST api/v2/users/signup', (done) => {

    //     const community2 = {
    //         "payload": {
    //             "data": {
    //                 "email": "clown28@yopmail.com",
    //                 "firstName": "joker",
    //                 "lastName": "clown",
    //                 "password": "Test@1234",
    //                 // "user_consent_data": [{ consentid: "YES" }]

    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/users/signup')
    //         // .set('devicetype', environment.Hdevicetype)
    //         .set('Authorization', process.env.accessTokenLoginPage)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(community2)
    //         .end((err, response) => {
    //             // console.log('sign up entered');
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_signup_newuser_succesfull_message)
    //             expect(response.body.success.data.email).to.equal('clown28@yopmail.com')
    //             process.env.accesstokenclown28user = (response.body.success.data.accessToken)
    //             // console.log(process.env.accesstokenclown28user)
    //             done();
    //         });
    // });

    it.only('View an attendee profile on community V2 post turning of profile views : POST /api/v2/attendee/view', async () => {

        const viewattendeeprofile = {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, ('/api/v2/attendee/' + process.env.clown26userid + '/view'), { 'Authorization': process.env.accesstokenclown28user, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', viewattendeeprofile)
        expect(response.body.success.data.userInfo.firstName).to.equal('joker')
        expect(response.body.success.data.userInfo.lastName).to.equal('clown')
    });

    // it.only('View an attendee profile on community V2 post turning of profile views : POST /api/v2/attendee/view', (done) => {

    //     const viewattendeeprofile = {
    //         "payload": {}
    //     }

    //     request3
    //         .post('/api/v2/attendee/' + process.env.clown26userid + '/view')
    //         .set('Authorization', process.env.accesstokenclown28user)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(viewattendeeprofile)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.userInfo.firstName).to.equal('joker')
    //             expect(response.body.success.data.userInfo.lastName).to.equal('clown')
    //             done();
    //         });
    // });

    it.only('Verify Notifications when profile views is off : POST /api/v2/notifications/list', async () => {

        const VerfiyPostNotification = {
            "payload": {
                "data": {

                    "userNotCount": 0,
                    "orgNotCount": 0,
                    "currentPage": 0,
                    "limit": 10


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/notifications/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', VerfiyPostNotification)
    });

    // it('Verify Notifications when profile views is off : POST /api/v2/notifications/list', (done) => {

    //     const VerfiyPostNotification = {
    //         "payload": {
    //             "data": {

    //                 "userNotCount": 0,
    //                 "orgNotCount": 0,
    //                 "currentPage": 0,
    //                 "limit": 10


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/notifications/list')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(VerfiyPostNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.count).to.equal(1)
    //             // expect(response.body.success.data.list[0].userId).to.equal(process.env.clown26userid)
    //             done();
    //         });
    // });

    it.only('Profile views notification on : POST /api/v2/settings/update-settings-web', async () => {

        const profileviewsnoton =
        {
            "payload": {
                "data": {
                    "notificationType": "DESKTOP",
                    "isDisabled": false,
                    "meetingReminder": true,
                    "newChat": true,
                    "newMeeting": true,
                    "newPoll": true,
                    "newPost": true,
                    "newPostActivity": true,
                    "newProfileView": true,
                    "pushFromOrganiser": true,
                    "scheduleReminder": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/update-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', profileviewsnoton)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    });

    // it.only('Profile views notification on : POST /api/v2/settings/update-settings-web', (done) => {
    //     const profileviewsnoton =
    //     {
    //         "payload": {
    //             "data": {
    //                 "notificationType": "DESKTOP",
    //                 "isDisabled": false,
    //                 "meetingReminder": true,
    //                 "newChat": true,
    //                 "newMeeting": true,
    //                 "newPoll": true,
    //                 "newPost": true,
    //                 "newPostActivity": true,
    //                 "newProfileView": true,
    //                 "pushFromOrganiser": true,
    //                 "scheduleReminder": true
    //             }
    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/update-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(profileviewsnoton)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
    //             done();
    //         });
    // });

    it.only('View an attendee profile on community V2 post turning on profile views : POST /api/v2/attendee/view', async () => {

        const viewattendeeprofile = {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, ('/api/v2/attendee/' + process.env.clown26userid + '/view'), { 'Authorization': process.env.accesstokenclown28user, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', viewattendeeprofile)
        expect(response.body.success.data.userInfo.firstName).to.equal('joker')
        expect(response.body.success.data.userInfo.lastName).to.equal('clown')
    });

    // it.only('View an attendee profile on community V2 post turning on profile views : POST /api/v2/attendee/view', (done) => {

    //     const viewattendeeprofile = {
    //         "payload": {}
    //     }

    //     request3
    //         .post('/api/v2/attendee/' + process.env.clown26userid + '/view')
    //         .set('Authorization', process.env.accesstokenclown28user)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(viewattendeeprofile)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.userInfo.firstName).to.equal('joker')
    //             expect(response.body.success.data.userInfo.lastName).to.equal('clown')
    //             done();
    //         });
    // });

    it.only('Verify Notifications when profile views is on : POST /api/v2/notifications/list', async () => {

        const VerfiyPostNotification = {
            "payload": {
                "data": {

                    "userNotCount": 0,
                    "orgNotCount": 0,
                    "currentPage": 0,
                    "limit": 10


                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/notifications/list', { 'Authorization': process.env.accesstokenclown28user, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', VerfiyPostNotification)
    });

    // it.only('Verify Notifications when profile views is on : POST /api/v2/notifications/list', (done) => {

    //     const VerfiyPostNotification = {
    //         "payload": {
    //             "data": {

    //                 "userNotCount": 0,
    //                 "orgNotCount": 0,
    //                 "currentPage": 0,
    //                 "limit": 10


    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/notifications/list')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(VerfiyPostNotification)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.count).to.equal(1)
    //             // expect(response.body.success.data.list[0].userId).to.equal(process.env.clown26userid)
    //             done();
    //         });
    // });

    it.only('Get notification settings in dashboard : GET /backend/api/v2/events/settings/notification', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        ProfileViewid = (response.body.data[0].id)
        Messageid = (response.body.data[1].id)
        MeetingStatusid = (response.body.data[2].id)
        AdminPostid = (response.body.data[3].id)
        AdminPollid = (response.body.data[4].id)
        SessionRegistrationid = (response.body.data[5].id)
        Meetingreminderid = (response.body.data[6].id)
        Sessionreminderid = (response.body.data[7].id)
        SessionGoLiveid = (response.body.data[8].id)
    });

    // it.only('Get notification settings in dashboard : GET /backend/api/v2/events/settings/notification', (done) => {
    //     request1
    //         .get('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             ProfileViewid = (response.body.data[0].id)
    //             Messageid = (response.body.data[1].id)
    //             MeetingStatusid = (response.body.data[2].id)
    //             AdminPostid = (response.body.data[3].id)
    //             AdminPollid = (response.body.data[4].id)
    //             SessionRegistrationid = (response.body.data[5].id)
    //             Meetingreminderid = (response.body.data[6].id)
    //             Sessionreminderid = (response.body.data[7].id)
    //             SessionGoLiveid = (response.body.data[8].id)
    //             done();
    //         });
    // });

    it.only('Update profile views in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not1 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update profile views in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not1 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify profile view in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not1_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not1_comm)
        expect(response.body.success.data.organiserSetting[0].is_desktop).to.equal(0)
    });

    // it.only('Verify profile view in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not1_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not1_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[0].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update message in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not2 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not2)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update message in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not2 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify message in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not2_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not2_comm)
        expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
    });

    // it.only('Verify message in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not2_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not2_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Meeting status in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not3 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not3)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Meeting status in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not3 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not3)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Metting status in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not3_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not3_comm)
        expect(response.body.success.data.organiserSetting[2].is_desktop).to.equal(0)
    });

    // it.only('Verify Metting status in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not3_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not3_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[2].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Admin post in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not4 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not4)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });


    // it.only('Update Admin post in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not4 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not4)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', async () => {

        const community2 = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": "Test@1234"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', { 'Authorization': process.env.accessTokenLoginPage, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2)
        process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    });


    // it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', (done) => {

    //     const community2 = {

    //         "payload": {
    //             "data": {
    //                 "email": "clown26@yopmail.com",
    //                 "mode": "PASSWORD",
    //                 "password": "Test@1234"
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
    //             process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    //             // console.log(process.env.accesstokenloginuser)
    //             done();
    //         });
    // });

    it.only('Verify Admin post in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not4_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not4_comm)
        expect(response.body.success.data.organiserSetting[3].is_desktop).to.equal(0)
    });

    // it.only('Verify Admin post in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not4_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not4_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[3].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Admin poll in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not5 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not5)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Admin poll in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not5 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not5)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Admin poll in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not5_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not5_comm)
        expect(response.body.success.data.organiserSetting[4].is_desktop).to.equal(0)
    });

    // it.only('Verify Admin poll in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not5_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not5_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[4].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Session registration in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not6 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not6)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Session registration in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not6 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not6)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Session registration in_app notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not6_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not6_comm)
        expect(response.body.success.data.organiserSetting[5].is_desktop).to.equal(0)
    });


    // it.only('Verify Session registration in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not6_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not6_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[5].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Meeting reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not7 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not7)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Meeting reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not7 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not7)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Meeting reminder in_app notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not7_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not7_comm)
        expect(response.body.success.data.organiserSetting[6].is_desktop).to.equal(0)
    });

    // it.only('Verify Meeting reminder in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not7_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not7_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[6].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Session reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not8 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not8)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });


    // it.only('Update Session reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not8 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not8)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Session reminder in_app notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not8_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not8_comm)
        expect(response.body.success.data.organiserSetting[7].is_desktop).to.equal(0)
    });

    // it.only('Verify Session reminder in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not8_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not8_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[7].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 0
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Session go live in_app notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[8].is_desktop).to.equal(0)
    });

    // it.only('Verify Session go live in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[8].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Profile view email notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[0].is_email).to.equal(0)
    });

    // it.only('Verify Profile view email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[0].is_email).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Message email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Message email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Message email notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[1].is_email).to.equal(0)
    });

    // it.only('Verify Message email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[1].is_email).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Meeting status email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });


    // it.only('Update Meeting status email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Meeting status email notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[2].is_email).to.equal(0)
    });

    // it.only('Verify Meeting status email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[2].is_email).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Session registration email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Session registration email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Session registration email notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[5].is_email).to.equal(0)
    });


    // it.only('Verify Session registration email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[5].is_email).to.equal(0)
    //             done();
    //         });
    // });
    it.only('Update Meeting reminder email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });


    // it.only('Update Meeting reminder email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Meeting reminder email notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    });

    // it.only('Verify Meeting reminder email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Meeting reminder,profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 0,
                    "is_in_app": 1
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Meeting reminder,profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 0,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', async () => {

        const community2 = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": "Test@1234"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', { 'Authorization': process.env.accessTokenLoginPage, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2)
        process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    });


    // it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', (done) => {

    //     const community2 = {

    //         "payload": {
    //             "data": {
    //                 "email": "clown26@yopmail.com",
    //                 "mode": "PASSWORD",
    //                 "password": "Test@1234"
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
    //             process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    //             // console.log(process.env.accesstokenloginuser)
    //             done();
    //         });
    // });

    it.only('Verify Meeting reminder,profile  email notifications: POST /api/v2/settings/get-settings-web', async () => {
        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[0].is_email).to.equal(0)
        expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    });

    // it.only('Verify Meeting reminder,profile  email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[0].is_email).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Message,Admin post,Meeting reminder,Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {

        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 1,
                    "is_in_app": 0
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 0
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Message,Admin post,Meeting reminder,Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 0
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Message,Admin post,Meeting reminder,Session go live in_app notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
        expect(response.body.success.data.organiserSetting[3].is_desktop).to.equal(0)
        expect(response.body.success.data.organiserSetting[6].is_desktop).to.equal(0)
        expect(response.body.success.data.organiserSetting[8].is_desktop).to.equal(0)
    });

    // it.only('Verify Message,Admin post,Meeting reminder,Session go live in_app notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[3].is_desktop).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[6].is_desktop).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[8].is_desktop).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Update Message,Meeting reminder in_app & email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        const not9 = {
            "data": [
                {
                    "id": ProfileViewid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Messageid,
                    "is_email": 0,
                    "is_in_app": 0
                },
                {
                    "id": MeetingStatusid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPostid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": AdminPollid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionRegistrationid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": Meetingreminderid,
                    "is_email": 0,
                    "is_in_app": 0
                },
                {
                    "id": Sessionreminderid,
                    "is_email": 1,
                    "is_in_app": 1
                },
                {
                    "id": SessionGoLiveid,
                    "is_email": 1,
                    "is_in_app": 1
                }
            ]
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', not9)
        expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    });

    // it.only('Update Message,Meeting reminder in_app & email notifications to 0 : PUT /backend/api/v2/events/settings/notification', (done) => {
    //     const not9 = {
    //         "data": [
    //             {
    //                 "id": ProfileViewid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Messageid,
    //                 "is_email": 0,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": MeetingStatusid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPostid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": AdminPollid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionRegistrationid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": Meetingreminderid,
    //                 "is_email": 0,
    //                 "is_in_app": 0
    //             },
    //             {
    //                 "id": Sessionreminderid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             },
    //             {
    //                 "id": SessionGoLiveid,
    //                 "is_email": 1,
    //                 "is_in_app": 1
    //             }
    //         ]
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/notification')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(not9)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    //             done();
    //         });
    // });

    it.only('Verify Message,Meeting reminder in_app & email notifications: POST /api/v2/settings/get-settings-web', async () => {

        const not9_comm =
        {
            "payload": {}
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/settings/get-settings-web', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', not9_comm)
        expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
        expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
        expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
        expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    });

    // it.only('Verify Message,Meeting reminder in_app & email notifications: POST /api/v2/settings/get-settings-web', (done) => {
    //     const not9_comm =
    //     {
    //         "payload": {}
    //     }
    //     request3
    //         .post('/api/v2/settings/get-settings-web')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(not9_comm)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[1].is_desktop).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    //             expect(response.body.success.data.organiserSetting[6].is_email).to.equal(0)
    //             done();
    //         });
    // });



});


describe('Notification Dashboard', () => {

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
    it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
      attendeegroup = (response.body.data[0].id)
      boothmembergroup = (response.body.data[1].id)
      speakergroup = (response.body.data[2].id)
    });
  
  
    it.only('Add Notification with recipients as Attendee: POST /backend/api/v2/events/notifications', async () => {
      var Notification_Add =

  
      {
        "data": {
          "title": "Test Notification",
          "description": "Test Notification",
          "timezone_id": 94,
          "is_now": 1,
          "notification_time_milli": "",
          "targetting_screen_id": "",
          "groups": [
            attendeegroup
          ],
          "link": ""
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/notifications',  {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken }, 'post', Notification_Add)
      notification_id = (response.body.data.ids.notification_id)
      expect(response.body.message).to.equal(Responsemessages.Parameter_Notifications_Add_Dashboard)
    })
  
    it.only('Get list of notifications: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list',  {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].title).to.equal("Test Notification")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
  
    it.only('Add Notification with recipients as Attendee, Speaker, Booth Member: POST /backend/api/v2/events/notifications', async () => {
      const Notification_Add =
  
      {
        "data": {
          "title": "New Second",
          "description": "New Second Event",
          "timezone_id": 94,
          "is_now": 1,
          "notification_time_milli": "",
          "targetting_screen_id": "",
          "groups": [
            attendeegroup,speakergroup,boothmembergroup
          ],
          "link": ""
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/notifications',  {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken }, 'post', Notification_Add)
      notification_id1 = (response.body.data.ids.notification_id)
      expect(response.body.message).to.equal(Responsemessages.Parameter_Notifications_Add_Dashboard)
    })
  
  
    it.only('Add Notification with title more than 100 character and description with more than 160 character: POST /backend/api/v2/events/notifications', async () => {
     
      var max100 = 'NewEvent11'.repeat(11)
      var desc = 'NewEvent11'.repeat(17)
      const Notification_Add = 
      {
        "data": {
          "title": max100,
          "description": desc,
          "timezone_id": 94,
          "is_now": 1,
          "notification_time_milli": "",
          "targetting_screen_id": "",
          "groups": [
            attendeegroup,speakergroup,boothmembergroup
          ],
          "link": ""
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/notifications',  {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken }, 'post', Notification_Add)
      notification_id1 = (response.body.data.ids.notification_id)
      expect(response.body.message).to.equal(Responsemessages.Parameter_Notifications_Add_Dashboard)
    })
  
    it.only('Search notification by full title: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'Test Notification' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].title).to.equal("Test Notification")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
    it.only('Search notification by partial title: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'Test' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].title).to.equal("Test Notification")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
    
  
    it.only('Search notification by wrong title: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'wrongtitle' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(0)
    })
    
  
    it.only('Search notification by description: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'New Second Event' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].description).to.equal("New Second Event")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
    it.only('Search notification by full upper case description: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'NEW SECOND EVENT' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].description).to.equal("New Second Event")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
    it.only('Search notification by full lower case description: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'new second event' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].description).to.equal("New Second Event")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
    it.only('Search notification by partial description: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'Second' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(1)
      expect(response.body.data[0].description).to.equal("New Second Event")
      expect(response.body.data[0].message_status.name).to.equal("Sent")
    })
  
    it.only('Search notification by wrong description: POST /backend/api/v2/notifications/list', async () => {
      const Notification_list =
      {
        "data": {
          "filter": {}
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'search':'wrong' }, 'post', Notification_list)
      expect(response.body.total_count).to.equal(0)
    })
  
    it.only('Delete Notification: POST /backend/api/v2/notifications/delete', async () => {
      const Notification_Add =
      {
        "data": {
          "is_all": 0,
          "notification_ids": [
            notification_id
          ]
        }
      }
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/notifications/delete',  {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken }, 'post', Notification_Add)
      expect(response.body.message).to.equal(Responsemessages.Parameter_Notifications_Delete_Dashboard)
    })
  
  })
  
  




