/*
Author: Gaurav Thapar
Description: This Script will update/verify general settings
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 30th Sept 2021 10:10 AM
Description: Commenting out the old supertest functions and using new sendRequest function.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog } from '../../helper/CommonUtil'
require('dotenv').config();
import { emailaddress,sendRequest } from '../../helper/CommonUtil'
import { send } from 'process';

var request3 = supertest(environment.baseURL3);

var attendeegroup
var speakergroup
var boothmembergroup
var user_consent_setting

describe('General Setting', () => {
    beforeEach(function (done) {
        setTimeout(function(){
          done();
        }, environment.HTestDelay);
      });

    //<--------------Login on Community v2 with Password------------------->

    it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', async () => {
        // const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community2 = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": "Test@1234"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/users/login',{'Authorization' : process.env.accessTokenLoginPage, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',community2)
        process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    });

    // it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', (done) => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

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

    it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/people/groups/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
        attendeegroup = (response.body.data[0].id)
        // console.log(attendeegroup)
        boothmembergroup = (response.body.data[1].id)
        // console.log(boothmembergroup)
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

    it.only('Get user profile fields : GET /api/v1/settings/general', async () => {
        var response = await sendRequest(environment.baseURL,'/api/v1/settings/general',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    });

    // it.only('Get user profile fields : GET /api/v1/settings/general', (done) => {
    //     request
    //         .get('/api/v1/settings/general')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    it.only('Chat Permission toggle off : /api/v1/settings/general', async () => {
        const chatupdate = {
            "data":
            {
                "isChatEnabled": "NO",
                "isMeetingEnabled": "YES",
                "isNotificationEnabled": "YES"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/settings/general',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',chatupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    });

    // it.only('Chat Permission toggleh off : /api/v1/settings/general', (done) => {
    //     const chatupdate = {
    //         "data":
    //         {
    //             "isChatEnabled": "NO",
    //             "isMeetingEnabled": "YES",
    //             "isNotificationEnabled": "YES"
    //         }
    //     }
    //     request
    //         .post('/api/v1/settings/general')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(chatupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify Chat Permission on Community: POST /api/v2/platformNew/navigate-new', async () => {
        const chat_verify =
        {
            "payload":
                { "data": null }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/navigate-new',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',chat_verify)
        expect(response.body.success.data.messaging[attendeegroup][0].isEnable).to.equal(0)
        expect(response.body.success.data.messaging[attendeegroup][1].isEnable).to.equal(0)
        expect(response.body.success.data.messaging[attendeegroup][2].isEnable).to.equal(0)
    });

    // it.only('Verify Chat Permission on Community: POST /api/v2/platformNew/navigate-new', (done) => {
    //     const chat_verify =
    //     {
    //         "payload":
    //             { "data": null }
    //     }
    //     request3
    //         .post('/api/v2/platformNew/navigate-new')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(chat_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // console.log(response.body.success.data.messaging[attendeegroup][0].isEnable)
    //             expect(response.body.success.data.messaging[attendeegroup][0].isEnable).to.equal(0)
    //             expect(response.body.success.data.messaging[attendeegroup][1].isEnable).to.equal(0)
    //             expect(response.body.success.data.messaging[attendeegroup][2].isEnable).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Chat Permission toggleh On : /api/v1/settings/general', async () => {
        const chatupdate = {
            "data":
            {
                "isChatEnabled": "YES",
                "isMeetingEnabled": "YES",
                "isNotificationEnabled": "YES"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/settings/general',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',chatupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    });

    // it.only('Chat Permission toggleh On : /api/v1/settings/general', (done) => {
    //     const chatupdate = {
    //         "data":
    //         {
    //             "isChatEnabled": "YES",
    //             "isMeetingEnabled": "YES",
    //             "isNotificationEnabled": "YES"
    //         }
    //     }
    //     request
    //         .post('/api/v1/settings/general')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(chatupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify Chat Permission on Community: POST /api/v2/platformNew/navigate-new', async () => {
        const chat_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/navigate-new',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',chat_verify)
        expect(response.body.success.data.messaging[attendeegroup][0].isEnable).to.equal(1)
        expect(response.body.success.data.messaging[attendeegroup][1].isEnable).to.equal(1)
        expect(response.body.success.data.messaging[attendeegroup][2].isEnable).to.equal(1)
    });

    // it.only('Verify Chat Permission on Community: POST /api/v2/platformNew/navigate-new', (done) => {
    //     const chat_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/platformNew/navigate-new')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(chat_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.messaging[attendeegroup][0].isEnable).to.equal(1)
    //             expect(response.body.success.data.messaging[attendeegroup][1].isEnable).to.equal(1)
    //             expect(response.body.success.data.messaging[attendeegroup][2].isEnable).to.equal(1)
    //             done();
    //         });
    // });

    it.only('Meeting Permission toggleh off : /api/v1/settings/general', async () => {
        const meetingupdate = {
            "data":
            {
                "isChatEnabled": "YES",
                "isMeetingEnabled": "NO",
                "isNotificationEnabled": "YES"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/settings/general',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    });

    // it.only('Meeting Permission toggleh off : /api/v1/settings/general', (done) => {
    //     const meetingupdate = {
    //         "data":
    //         {
    //             "isChatEnabled": "YES",
    //             "isMeetingEnabled": "NO",
    //             "isNotificationEnabled": "YES"
    //         }
    //     }
    //     request
    //         .post('/api/v1/settings/general')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify Metting Permission on Community When Off: POST /api/v2/platformNew/navigate-new', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/navigate-new',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.meeting[attendeegroup][0].isEnable).to.equal(0)
        expect(response.body.success.data.meeting[attendeegroup][1].isEnable).to.equal(0)
        expect(response.body.success.data.meeting[attendeegroup][2].isEnable).to.equal(0)
    });

    // it.only('Verify Metting Permission on Community When Off: POST /api/v2/platformNew/navigate-new', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/platformNew/navigate-new')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.meeting[attendeegroup][0].isEnable).to.equal(0)
    //             expect(response.body.success.data.meeting[attendeegroup][1].isEnable).to.equal(0)
    //             expect(response.body.success.data.meeting[attendeegroup][2].isEnable).to.equal(0)
    //             done();
    //         });
    // });

    it.only('Meeting Permission toggleh On : /api/v1/settings/general', async () => {
        const meetingupdate = {
            "data":
            {
                "isChatEnabled": "YES",
                "isMeetingEnabled": "YES",
                "isNotificationEnabled": "YES"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/settings/general',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    });

    // it.only('Meeting Permission toggleh On : /api/v1/settings/general', (done) => {
    //     const meetingupdate = {
    //         "data":
    //         {
    //             "isChatEnabled": "YES",
    //             "isMeetingEnabled": "YES",
    //             "isNotificationEnabled": "YES"
    //         }
    //     }
    //     request
    //         .post('/api/v1/settings/general')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_general_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify Metting Permission on Community When on: POST /api/v2/platformNew/navigate-new', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/navigate-new',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.meeting[attendeegroup][0].isEnable).to.equal(1)
        expect(response.body.success.data.meeting[attendeegroup][1].isEnable).to.equal(1)
        expect(response.body.success.data.meeting[attendeegroup][2].isEnable).to.equal(1)
    });

    // it.only('Verify Metting Permission on Community When on: POST /api/v2/platformNew/navigate-new', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/platformNew/navigate-new')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.meeting[attendeegroup][0].isEnable).to.equal(1)
    //             expect(response.body.success.data.meeting[attendeegroup][1].isEnable).to.equal(1)
    //             expect(response.body.success.data.meeting[attendeegroup][2].isEnable).to.equal(1)
    //             done();
    //         });
    // });


    // <--------------Matchmaking Fields -> Interest-------------->

    it.only('Interest toggleh off : /backend/api/v2/events/matchmaking/settings', async () => {
        const meetingupdate = {
            "data": {
                "is_interest": 0,
                "is_industry": 1,
                "is_looking_for": 1,
                "is_custom_tag": 1,
                "interest_name": "Interest",
                "industry_name": "Industry",
                "custom_tag_name": "Custom Tags"
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/matchmaking/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
    });

    // it.only('Interest toggleh off : /backend/api/v2/events/matchmaking/settings', (done) => {
    //     const meetingupdate = {
    //         "data": {
    //             "is_interest": 0,
    //             "is_industry": 1,
    //             "is_looking_for": 1,
    //             "is_custom_tag": 1,
    //             "interest_name": "Interest",
    //             "industry_name": "Industry",
    //             "custom_tag_name": "Custom Tags"
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/matchmaking/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
    //             done();
    //         });
    // });

    it.only('Interest toggleh On : /backend/api/v2/events/matchmaking/settings', async () => {
        const meetingupdate = {
            "data": {
                "is_interest": 1,
                "is_industry": 1,
                "is_looking_for": 1,
                "is_custom_tag": 1,
                "interest_name": "Interest",
                "industry_name": "Industry",
                "custom_tag_name": "Custom Tags"
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/matchmaking/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
    });

    // it.only('Interest toggleh On : /backend/api/v2/events/matchmaking/settings', (done) => {
    //     const meetingupdate = {
    //         "data": {
    //             "is_interest": 1,
    //             "is_industry": 1,
    //             "is_looking_for": 1,
    //             "is_custom_tag": 1,
    //             "interest_name": "Interest",
    //             "industry_name": "Industry",
    //             "custom_tag_name": "Custom Tags"
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/matchmaking/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify Interest on Community When togglech On: POST /api/v2/users/profile', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.intrests[0]).to.equal('Culinary Arts')
    });

    // it.only('Verify Interest on Community When togglech On: POST /api/v2/users/profile', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/users/profile')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.intrests[0]).to.equal('Culinary Arts')
    //            // expect(response.body.success.data.intrests[1]).to.be.equal('Advertising')
    //             done();
    //         });
    // });



    // <--------------Setting-> Privacy-------------->

    it.only('Get Privacy Setting  : /backend/api/v2/events/settings/privacy', async () => {
     
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
        user_consent_setting = (response.body.data.user_consent_setting.id)
    });

    // it.only('Get Privacy Setting  : /backend/api/v2/events/settings/privacy', (done) => {
     
    //     request1
    //         .get('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             user_consent_setting = (response.body.data.user_consent_setting.id)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendees can opt-out of Chat/Messaging togglech Off : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 0,
                "is_opt_out_meeting": 0,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Privacy Setting Attendees can opt-out of Chat/Messaging togglech Off : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 0,
    //             "is_opt_out_meeting": 0,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Attendees can opt-out of Chat/Messaging togglech Off : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_chat).to.be.equal(0)
    });

    // it.only('Verify On Community Attendees can opt-out of Chat/Messaging togglech Off : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_chat).to.be.equal(0)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendees can opt-out of Chat/Messaging togglech On : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 0,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Privacy Setting Attendees can opt-out of Chat/Messaging togglech On : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 0,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Attendees can opt-out of Chat/Messaging togglech On : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_chat).to.be.equal(1)
    });

    // it.only('Verify On Community Attendees can opt-out of Chat/Messaging togglech On : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_chat).to.be.equal(1)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendees can opt-out of Meeting Requests togglech Off : /backend/api/v2/events/settings/privacy', async () => {
        // this.retries(2)
        // this.slow(5000)
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 0,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Privacy Setting Attendees can opt-out of Meeting Requests togglech Off : /backend/api/v2/events/settings/privacy', function(done) {
    //     // this.retries(2)
    //     // this.slow(5000)
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 0,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Attendees can opt-out of Meeting Request togglech Off : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_meeting).to.be.equal(0)
    });

    // it.only('Verify On Community Attendees can opt-out of Meeting Request togglech Off : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_meeting).to.be.equal(0)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendees can opt-out of Meeting Requests togglech On : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Privacy Setting Attendees can opt-out of Meeting Requests togglech On : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Attendees can opt-out of Meeting Request togglech On : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_meeting).to.be.equal(1)
    });

    // it.only('Verify On Community Attendees can opt-out of Meeting Request togglech On : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_meeting).to.be.equal(1)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendee can opt-out of Attendee List togglech off : /backend/api/v2/events/settings/privacy', async () => {
        // this.retries(3)
        // this.timeout(10000)
        // this.slow(5000)
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        console.log(meetingupdate)
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        //expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });


    // it.only('Privacy Setting Attendee can opt-out of Attendee List togglech off : /backend/api/v2/events/settings/privacy', function(done)  {
    //     // this.retries(3)
    //     // this.timeout(10000)
    //     // this.slow(5000)
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     console.log(meetingupdate)
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             //expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community  Attendee can opt-out of Attendee List togglech Off : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_attendee).to.be.equal(0)
    });

    // it.only('Verify On Community  Attendee can opt-out of Attendee List togglech Off : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_attendee).to.be.equal(0)
    //             done();
    //         });
    // });

    it.only('Privacy Setting Attendee can opt-out of Attendee List togglech on : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 1,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Privacy Setting Attendee can opt-out of Attendee List togglech on : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 1,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Attendee can opt-out of Attendee List togglech on : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_opt_out_attendee).to.be.equal(1)
    });

    // it.only('Verify On Community Attendee can opt-out of Attendee List togglech on : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_opt_out_attendee).to.be.equal(1)
    //             done();
    //         });
    // });

    it.only('Show Privacy Policy and Terms and Conditions section togglech off : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Show Privacy Policy and Terms and Conditions section togglech off : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech Off : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(0)
    });

    // it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech Off : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(0)
    //             done();
    //         });
    // });

    it.only('Show Privacy Policy and Terms and Conditions section togglech on : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 1,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Show Privacy Policy and Terms and Conditions section togglech on : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 1,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech On : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(1)
    });

    // it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech On : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(1)
    //             done();
    //         });
    // });

    it.only('Show Privacy Policy and Terms and Conditions section togglech off : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 0,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Show Privacy Policy and Terms and Conditions section togglech off : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 0,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech Off : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(0)
    });

    // it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech Off : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_show_legal).to.be.equal(0)
    //             done();
    //         });
    // });

    it.only('Show Privacy Policy and Terms and Conditions section togglech on : /backend/api/v2/events/settings/privacy', async () => {
        const meetingupdate =
        {
            "data": {
                "id": user_consent_setting,
                "is_show": 1,
                "is_opt_out_chat": 1,
                "is_opt_out_meeting": 1,
                "is_opt_out_attendee": 0,
                "is_show_legal": 0,
                "is_attendee_can_request_delete_data": 0,
                "is_show_contact_info": 1,
                "contact_info_email": "myemail",
                "is_opt_out_business_cards": 0
            }
        }
        var response= await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/privacy',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',meetingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    });

    // it.only('Show Privacy Policy and Terms and Conditions section togglech on : /backend/api/v2/events/settings/privacy', (done) => {
    //     const meetingupdate =
    //     {
    //         "data": {
    //             "id": user_consent_setting,
    //             "is_show": 1,
    //             "is_opt_out_chat": 1,
    //             "is_opt_out_meeting": 1,
    //             "is_opt_out_attendee": 0,
    //             "is_show_legal": 0,
    //             "is_attendee_can_request_delete_data": 0,
    //             "is_show_contact_info": 1,
    //             "contact_info_email": "myemail",
    //             "is_opt_out_business_cards": 0
    //         }
    //     }
    //     request1
    //         .put('/backend/api/v2/events/settings/privacy')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('buildversion', process.env.buildversion)
    //         .send(meetingupdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_privacy_setting_message)
    //             done();
    //         });
    // });

    it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech On : POST /api/v2/settings/my-privacy', async () => {
        const meeting_verify =
        {
            "payload": {
                "data": null

            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/settings/my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',meeting_verify)
        expect(response.body.success.data.gdpr.is_show_contact_info).to.be.equal(1)
    });

    // it.only('Verify On Community Show Privacy Policy and Terms and Conditions section togglech On : POST /api/v2/settings/my-privacy', (done) => {
    //     const meeting_verify =
    //     {
    //         "payload": {
    //             "data": null

    //         }
    //     }
    //     request3
    //         .post('/api/v2/settings/my-privacy')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(meeting_verify)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.gdpr.is_show_contact_info).to.be.equal(1)
    //             done();
    //         });
    // });








});
