/*
Author: Gaurav Thapar
Description: This Script will add/update/join/screenshare/search/leave/delete loung
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 15th Oct 2021 17:25 PM
Description : Exhibitor test cases added in lounge.
*/

import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest,People,organizerUserHeader,ComunitySignupLogin,addTime,getValueFromJsonObject } from '../../helper/CommonUtil';

const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
const request2 = supertest(environment.baseURL1);
const request3 = supertest(environment.baseURL3);


var fs = require('fs');
var tableId
var ExhibitorstableId
var AttendeetableId
var tableId1
var tableId2
var loungeChannelId
var loungeChanneluserId
var loungid1
var loungid2
var loungid3
var virtualboothidlounge
var tableId_4_capacity
var lounge_logo
var tableId_8_capacity
var tableId_4_capacity
var tableId_16_capacity
var tableId_2_capacity1
var loungeChannelId4
var loungeChanneluserId4
var loungeChannelId_8
var loungeChanneluserId_8
var loungeChannelId_2
var loungeChanneluserId_2

var imageAsBase64_Lounge_Logo = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');

const AttendeeLoungedata =
{
    "data":
    {
        "capacity": "2",
        "exhibitors": "",
        "lounge_image": "",
        "meeting_limit": "",
        "name": "Test Lounge",
        "priority": "1",
        "table_type": "ATTENDEE",
        "topic": "This is Test Lounge"

    }
};



//https://virtual.qa.demohubilo.com/backend/api/v2/lounge/tables
// describe() function is simply a way to group our tests in Mocha.
// We can nest our tests in groups as deep as we deem necessary.
// describe() takes two arguments,
// the first is the name of the test group,
// and the second is a callback function.

// -------------------Dashboard case Started-------------------------------
//Add Lounge
//Request Lounge
describe('Fetch lounge list', () => {
    beforeEach(function (done) {
        setTimeout(function(){
          done();
        }, environment.HTestDelay);
      });

    // it() is used for an individual test case.
    // it() takes two arguments,
    // a string explaining what the test should do,
    // and a callback function which contains our actual test

    it.only('Upload lounge logo: POST /backend/api/v2/events/uploads',  (done) => {
        
        request1
        .post('/backend/api/v2/events/uploads')
        .set('organiserId', environment.HOrganiserId)
        .set('eventId', process.env.eventid)
        .set('Authorization', 'Bearer ' + process.env.eToken)
        .field('Content-Type', 'multipart/form-data')
        .field('location', 'profile')
        .field('type', 'base')
        .field('data', 'data:image/png;base64,' + imageAsBase64_Lounge_Logo)
        .end((err, response) => {
            lounge_logo = (response.body.data.file_name)
            expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
            done();
    });
       
    });
    

    it.only('Attendee Lounge:  Add Attendee Lounge : POST /backend/api/v2/lounge/tables', async () => {

        // A return statement ends the execution of a function, and returns control to the calling function. Execution resumes in the calling function at the point immediately following the call. A return statement can return a value to the calling function.
        // request.post is going to append with the ALIAS service URL and send a request to the service.
        // .set is for setting the API Headers needed.
        // .send(data) is going to send the body raw data along with the request.
        // then fucntion will help to capture the response for per request.
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata)
        tableId = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });


    //Attendee Lounge with 4 Seats 

    it.only('Attendee Lounge:  Add Attendee Lounge with capacity as Four  : POST /backend/api/v2/lounge/tables', async () => {

        const AttendeeLoungedata2 =
        {
            "data":
            {
                "capacity": "4",
                "exhibitors": "",
                "lounge_image": "",
                "meeting_limit": "",
                "name": "Test Lounge with Capacity 4",
                "priority": "2",
                "table_type": "ATTENDEE",
                "topic": "This is Test Lounge with Capacity 4"

            }
        };

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata2)
        tableId_4_capacity = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    // it.only('Attendee Lounge:  Add Attendee Lounge with capacity as Four  : POST /backend/api/v2/lounge/tables', (done) => {

    //     const AttendeeLoungedata2 =
    //     {
    //         "data":
    //         {
    //             "capacity": "4",
    //             "exhibitors": "",
    //             "lounge_image": "",
    //             "meeting_limit": "",
    //             "name": "Test Lounge with Capacity 4",
    //             "priority": "2",
    //             "table_type": "ATTENDEE",
    //             "topic": "This is Test Lounge with Capacity 4"

    //         }
    //     };


    //     request2
    //         .post('/backend/api/v2/lounge/tables')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(AttendeeLoungedata2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             tableId_4_capacity = (response.body.data.ids.table_id);
    //             // console.log(tableId_4_capacity)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    //             done();
    //         });
    // });

    //200: POSITIVE This will Sign in with otp on community : POST /api/v2/users/login


    it.only('Add a Attendee for meeting', async () => {

        var people = new People();
        global.attendde_meeting_id = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'atttendee123@mailinator.com', 'flip', 'dety', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_lounge_participant1 = await signup.loginWithOtp(global.accessTokenLoginPage, 'atttendee123@mailinator.com', '1234')
    });


    it.only('Add Virtual Booth for meeting : POST /backend/api/v2/events/booth/add', async () => {
        const virtual10 = {
            "data": {
                "booth_size": "SMALL",
                "category": "category",
                "is_featured": false,
                "is_rating": false,
                "multiple_file": [],
                "name": "Survey Booth",
                "position": 0,
                "email": "",
                "tags": "",
                "spotlight_banner_type": "IMAGE"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', virtual10)
        global.virtualboothid1 = (response.body.data.ids.exhibitor_id)
    });

    it.only('Add a booth member', async () => {

        var people = new People('boothmember', global.virtualboothid1);
        global.boothmemberid = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newloungboothmember@yopmail.com', 'OnboardingUser', 'boothmember', [global.boothmembergroup])
    });

      it.only('Sign in a booth member', async () => {

         var signup = new ComunitySignupLogin();
          global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
          global.accesstokenboothuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newloungboothmember@yopmail.com', '1234')
      });

    // it.only('Sign in with otp: POST /api/v2/users/login', async () => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

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
    //     var response = await sendRequest(environment.baseURL3,'/api/v2/users/login',{'Authorization' : process.env.accessTokenLoginPage, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',community2)
    //     global.accesstoken_lounge_participant1 = (response.body.success.data.accessToken)
    // });

    // it.only('Sign in with otp: POST /api/v2/users/login', (done) => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

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
    //             global.accesstoken_lounge_participant1 = (response.body.success.data.accessToken)
    //             // console.log(global.accesstoken_lounge_participant1)
    //             done();
    //         });
    // });

    it.only('single booth add  : POST /backend/api/v2/events/booth/add', async () => {

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
                "name": "Lounge Virtual Booth",
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
        virtualboothidlounge = (response.body.data.ids.exhibitor_id)
        // console.log(virtualboothidlounge)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    });

    // it.only('single booth add  : POST /backend/api/v2/events/booth/add', (done) => {

    //     const virtual10 = {
    //         "data": {
    //             "booth_size": "SMALL",
    //             "category": "category",
    //             "description": "",
    //             "email": "",
    //             "fb_url": "",
    //             "instagram_url": "",
    //             "is_featured": false,
    //             "is_rating": false,
    //             "linked_url": "",
    //             "list_banner_image": [
    //                 {
    //                     "img_file_name": ""
    //                 }
    //             ],
    //             "location": "",
    //             "multiple_file": [],
    //             "name": "Lounge Virtual Booth",
    //             "phone": "",
    //             "phone_code": "",
    //             "position": 0,
    //             "profile_img": "",
    //             "spotlight_banner": [
    //                 {
    //                     "img_file_name": ""
    //                 }
    //             ],
    //             "spotlight_banner_type": "IMAGE",
    //             "tags": "",
    //             "twitter_url": "",
    //             "website_url": "",
    //             "whatsapp_no": ""
    //         }
    //     }



    //     request1
    //         .post('/backend/api/v2/events/booth/add')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('buildversion', process.env.buildversion)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(virtual10)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             virtualboothidlounge = (response.body.data.ids.exhibitor_id)
    //             // console.log(virtualboothidlounge)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    //             done();
    //         });
    // });

    it.only('Exhibitor Lounge:  Add Exhibitor Lounge : POST /backend/api/v2/lounge/tables', async () => {
        const ExhibitorsLoungedata =
        {
            "data":
            {
                "capacity": "2",
                "exhibitors": [{
                    "id": virtualboothidlounge,
                    "lounge_image": "",
                    "name": "Lounge Virtual Booth"
                }],
                "lounge_image": "",
                "meeting_limit": 1,
                "name": "Test Lounge EXHIBITOR",
                "priority": "1",
                "table_type": "EXHIBITOR",
                "topic": "This is Test Lounge EXHIBITOR"

            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',ExhibitorsLoungedata)
        ExhibitorstableId = (response.body.data.ids.table_id);
        console.log(ExhibitorstableId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });


    // it.only('Exhibitor Lounge:  Add Exhibitor Lounge : POST /backend/api/v2/lounge/tables', (done) => {
    //     const ExhibitorsLoungedata =
    //     {
    //         "data":
    //         {
    //             "capacity": "2",
    //             "exhibitors": [{
    //                 "id": virtualboothidlounge,
    //                 "lounge_image": "",
    //                 "name": "Lounge Virtual Booth"
    //             }],
    //             "lounge_image": "",
    //             "meeting_limit": 1,
    //             "name": "Test Lounge EXHIBITOR",
    //             "priority": "1",
    //             "table_type": "EXHIBITOR",
    //             "topic": "This is Test Lounge EXHIBITOR"

    //         }
    //     }
    //     request2
    //         .post('/backend/api/v2/lounge/tables')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(ExhibitorsLoungedata)
    //         .end((err, response) => {
    //             consolelog(response)
    //             ExhibitorstableId = (response.body.data.ids.table_id);
    //             console.log(ExhibitorstableId)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    //             done();
    //         });
    // });




    //Update Lounge

    it.only('Lounge Update: Update Attendee Lounge : PUT backend/api/v2/lounge/tables', async () => {

        const LoungeUpdate =
        {
            "data":
            {
                "capacity": "2",
                "lounge_image": "",
                "meeting_limit": 0,
                "name": "Test Lounge Update",
                "priority": "2",
                "table_type": "ATTENDEE",
                "topic": "This is Test Lounge",
                // "tableid": tableId



            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'tableid' : tableId},'put',LoungeUpdate)
        // AttendeetableId=(response.body.data.ids.table_id);
        // console.log(AttendeetableId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    });

    // it.only('Lounge Update: Update Attendee Lounge : PUT backend/api/v2/lounge/tables', (done) => {

    //     const LoungeUpdate =
    //     {
    //         "data":
    //         {
    //             "capacity": "2",
    //             "lounge_image": "",
    //             "meeting_limit": 0,
    //             "name": "Test Lounge Update",
    //             "priority": "2",
    //             "table_type": "ATTENDEE",
    //             "topic": "This is Test Lounge",
    //             // "tableid": tableId



    //         }
    //     };

    //     request2
    //         .put('/backend/api/v2/lounge/tables')
    //         // .set('limit', environment.HLimit)
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         // .set('page', environment.HPage)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('tableid', tableId)
    //         .send(LoungeUpdate)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // AttendeetableId=(response.body.data.ids.table_id);
    //             // console.log(AttendeetableId)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    //             done();
    //         });
    // });




    // // Get Exhibitor For Update
    // it(' Get Exhibitor Lounge: GET /backend/api/v2/lounge/tables?table_type=EXHIBITOR', (done) => {


    //     request2
    //         .get('/backend/api/v2/lounge/tables?table_type=EXHIBITOR')
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('eventId', process.env.eventid)
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('limit', environment.HLimit1)
    //         .set('page', environment.HPage)
    //         .end((err, response) => {
    //           consolelog(response)
    //             console.log(response.status);
    //             expect(response.status).to.equal(200);
    //             tableId2 = (response.body.data[0].id);
    //             console.log(tableId2)
    //             done();
    //         });
    // });




    // Get Exhibitor For Update

    it.only(' Get Exhibitor Lounge: GET /api/v2/lounge', async () => {

        var response = await sendRequest(environment.baseURL,'/api/v2/lounge',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
        tableId2 = (response.body.data[0].id);
    });

    // it.only(' Get Exhibitor Lounge: GET /api/v2/lounge', (done) => {


    //     request
    //         .get('/api/v2/lounge')
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('eventId', process.env.eventid)
    //         .set('organiserId', environment.HOrganiserId)
    //         // .set('limit', environment.HLimit1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200);
    //             tableId2 = (response.body.data[0].id);
    //             // console.log(tableId2)
    //             done();
    //         });
    // });


    //Update Exhibitor Lounge

    it.only(' Lounge Update Exhibitor : POST backend/api/v2/lounge/tables', async () => {

        const LoungeUpdateExhibitor =
        {
            "data":
            {
                "capacity": "2",
                "exhibitors": "",
                "lounge_image": "",
                "meeting_limit": "2",
                "name": "Test Lounge Update Exhibitor",
                "priority": "2",
                "sourceId": virtualboothidlounge,
                "table_type": "EXHIBITOR",
                "topic": "This is Test Lounge Update Exhibitor",


            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken, 'tableid' : tableId2},'put',LoungeUpdateExhibitor)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    });

    // it.only(' Lounge Update Exhibitor : POST backend/api/v2/lounge/tables', (done) => {

    //     const LoungeUpdateExhibitor =
    //     {
    //         "data":
    //         {
    //             "capacity": "2",
    //             "exhibitors": "",
    //             "lounge_image": "",
    //             "meeting_limit": "2",
    //             "name": "Test Lounge Update Exhibitor",
    //             "priority": "2",
    //             "sourceId": virtualboothidlounge,
    //             "table_type": "EXHIBITOR",
    //             "topic": "This is Test Lounge Update Exhibitor",


    //         }
    //     };

    //     request2
    //         .put('/backend/api/v2/lounge/tables')
    //         // .set('limit', environment.HLimit)
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         // .set('page', environment.HPage)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('tableid', tableId2)
    //         .send(LoungeUpdateExhibitor)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    //             done();
    //         });
    // });


    // Get Exhibitor For Update

    it.only(' Get Lounges: GET /api/v2/lounge', async () => {

        var response = await sendRequest(environment.baseURL,'/api/v2/lounge',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
        expect(response.body.data[0].topic).to.equal('This is Test Lounge')
        expect(response.body.data[0].tableName).to.equal('Test Lounge Update')
        expect(response.body.data[0].tableType).to.equal('ATTENDEE')
        expect(response.body.data[0].capacity).to.equal(2)
        expect(response.body.data[2].topic).to.equal('This is Test Lounge Update Exhibitor')
        expect(response.body.data[2].tableName).to.equal('Test Lounge Update Exhibitor')
        expect(response.body.data[2].tableType).to.equal('EXHIBITOR')
    });

    // it.only(' Get Lounges: GET /api/v2/lounge', (done) => {


    //     request
    //         .get('/api/v2/lounge')
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('eventId', process.env.eventid)
    //         .set('organiserId', environment.HOrganiserId)
    //         // .set('limit', environment.HLimit1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200);
    //             expect(response.body.data[0].topic).to.equal('This is Test Lounge')
    //             expect(response.body.data[0].tableName).to.equal('Test Lounge Update')
    //             expect(response.body.data[0].tableType).to.equal('ATTENDEE')
    //             expect(response.body.data[0].capacity).to.equal(2)
    //             expect(response.body.data[2].topic).to.equal('This is Test Lounge Update Exhibitor')
    //             expect(response.body.data[2].tableName).to.equal('Test Lounge Update Exhibitor')
    //             expect(response.body.data[2].tableType).to.equal('EXHIBITOR')
    //             done();
    //         });
    // });







    // //get lounge

    // it('200: Hit endpoint with valid headers with get request: GET /backend/api/v2/lounge/tables?table_type=ATTENDEE', (done) => {
    //     request2
    //         .get('/backend/api/v2/lounge/tables?table_type=ATTENDEE')
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('eventId', process.env.eventid)
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('limit', environment.HLimit1)
    //         .set('page', environment.HPage)
    //         .end((err, response) => {
    //           consolelog(response)
    //             console.log(response.status);
    //             expect(response.status).to.equal(200);
    //             tableId1 = (response.body.data[0].id);
    //             console.log(tableId1)

    //             done();
    //         });
    // });


    // it('200: Hit endpoint with valid headers with get request: GET /backend/api/v2/lounge/tables?table_type=EXHIBITOR', (done) => {


    //     request2
    //         .get('/backend/api/v2/lounge/tables?table_type=EXHIBITOR')
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('eventId', process.env.eventid)
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('limit', environment.HLimit1)
    //         .set('page', environment.HPage)
    //         .end((err, response) => {
    //           consolelog(response)
    //             console.log(response.status);
    //             expect(response.status).to.equal(200);
    //             tableId2 = (response.body.data[0].id);
    //             console.log(tableId2)
    //             done();
    //         });
    // });




    // -------------------Community case Started-------------------------------



    //200: POSITIVE This will fetch the Lounge list on community side : POST /api/v2/lounge/lounges

    it.only('Fetch Lounge list : POST /api/v2/lounge/lounges', async () => {
        // const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const CommunityLounge = {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "input": "",
                    "feature": [],
                    "limit": 15,
                    "showActiveTables": false
                }
            }
        }
        // console.log(CommunityLounge, 'lounge')
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLounge)
        expect(response.body.success.data.loungeTables[0].tableName).to.equal("Test Lounge Update");
        expect(response.body.success.data.loungeTables[0].tableType).to.equal("ATTENDEE");
        expect(response.body.success.data.loungeTables[0].isActive).to.equal('YES');
        expect(response.body.success.data.loungeTables[2].tableName).to.equal('Test Lounge Update Exhibitor');
        expect(response.body.success.data.loungeTables[2].tableType).to.equal("EXHIBITOR");
    });

    // it.only('Fetch Lounge list : POST /api/v2/lounge/lounges', (done) => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    //     const CommunityLounge = {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "input": "",
    //                 "feature": [],
    //                 "limit": 15,
    //                 "showActiveTables": false
    //             }
    //         }
    //     }
    //     // console.log(CommunityLounge, 'lounge')

    //     request3
    //         .post('/api/v2/lounge/lounges')
    //         // .set('devicetype', environment.Hdevicetype)
    //         // .set('Authorization', process.env.accesstoken)
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(CommunityLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.data.loungeTables[0].tableName).to.equal("Test Lounge Update");
    //             expect(response.body.success.data.loungeTables[0].tableType).to.equal("ATTENDEE");
    //             expect(response.body.success.data.loungeTables[0].isActive).to.equal('YES');
    //             expect(response.body.success.data.loungeTables[2].tableName).to.equal('Test Lounge Update Exhibitor');
    //             expect(response.body.success.data.loungeTables[2].tableType).to.equal("EXHIBITOR");
    //             done();
    //         });
    // });



    // This will search lounge

    it('Search Lounge  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeSearch = {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "input": "Test Lounge",
                    "limit": 15,
                    "showActiveTables": false
                }
            }
        }

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeSearch)
        var getloungetables = response.body.success.data.loungeTables.some(function (e) {
            return e.tableName == 'Test Lounge';
        });
        console.log(getloungetables, 'verify this is true')
        expect(getloungetables).to.equal(true)
    });

    // it('Search Lounge  : POST /api/v2/lounge/lounges', (done) => {


    //     const CommunityLoungeSearch = {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "input": "Test Lounge",
    //                 "limit": 15,
    //                 "showActiveTables": false
    //             }
    //         }
    //     }



    //     request3
    //         .post('/api/v2/lounge/lounges')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(CommunityLoungeSearch)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             var getloungetables = response.body.success.data.loungeTables.some(function (e) {
    //                 return e.tableName == 'Test Lounge';
    //             });
    //             console.log(getloungetables, 'verify this is true')
    //             expect(getloungetables).to.equal(true)
    //             done();
    //         });
    // });


    // This will Show Active table

    it('Show Active table  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeActive = {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "input": "",
                    "limit": 15,
                    "showActiveTables": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive)
        var getloungetables = response.body.success.data.loungeTables.some(function (e) {
            return e.tableName == 'Test Lounge';
        });
        console.log(getloungetables, 'verify this is true')
    });

    // it('Show Active table  : POST /api/v2/lounge/lounges', (done) => {


    //     const CommunityLoungeActive = {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "input": "",
    //                 "limit": 15,
    //                 "showActiveTables": true
    //             }
    //         }
    //     }


    //     request3
    //         .post('/api/v2/lounge/lounges')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(CommunityLoungeActive)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             var getloungetables = response.body.success.data.loungeTables.some(function (e) {
    //                 return e.tableName == 'Test Lounge';
    //             });
    //             console.log(getloungetables, 'verify this is true')
    //             // expect(getloungetables).to.equal(true)
    //             done();
    //         });
    // });


    // <-------------------This will Join Lounge------------------>

    it.only('Join Lounge table  : POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    // it.only('Join Lounge table  : POST /api/v2/lounge/join', (done) => {


    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId,
    //                 "seatNumber": 1,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(1)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });


    // <-------------------This will Join Lounge with 2nd User------------------>

    it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId,
                    "seatNumber": 2,
                    "sourceId": 0
                }
            }
        }
        
        console.log(global.accesstoken_lounge_participant1, 'Auth 2nd user')
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(2)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    // it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', (done) => {


    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId,
    //                 "seatNumber": 2,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     console.log(global.accesstoken_lounge_participant1, 'Auth 2nd user')

    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(2)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });


    // <-------------------Share Screen in Lounge------------------>

    it.only('Share Screen in Lounge  : POST /api/v2/lounge/screen-share/join', async () => {


        const ShareScreenLounge =
        {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/screen-share/join',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',ShareScreenLounge)
    });

    // it.only('Share Screen in Lounge  : POST /api/v2/lounge/screen-share/join', (done) => {


    //     const ShareScreenLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //             }
    //         }
    //     }
       
    //     request3
    //         .post('/api/v2/lounge/screen-share/join')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(ShareScreenLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });


    // <-------------------Share Screen in Lounge 2nd User------------------>

    it.only('Share Screen in Lounge with 2nd User  : POST /api/v2/lounge/screen-share/join', async () => {


        const ShareScreenLounge =
        {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/screen-share/join',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',ShareScreenLounge)
    });

    // it.only('Share Screen in Lounge with 2nd User  : POST /api/v2/lounge/screen-share/join', (done) => {


    //     const ShareScreenLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/screen-share/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(ShareScreenLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });


    // <-------------------Leave Share Screen in Lounge------------------>

    it.only('Leave Share Screen in Lounge  : POST /api/v2/lounge/screen-share/join', async () => {


        const LeaveShareScreenLounge =
        {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/screen-share/join',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveShareScreenLounge)
    });

    // it.only('Leave Share Screen in Lounge  : POST /api/v2/lounge/screen-share/join', (done) => {


    //     const LeaveShareScreenLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //             }
    //         }
    //     }
       
    //     request3
    //         .post('/api/v2/lounge/screen-share/join')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveShareScreenLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // <-------------------Leave Share Screen in Lounge with 2nd User------------------>

    it.only('Leave Share Screen in Lounge with 2nd User  : POST /api/v2/lounge/screen-share/join', async () => {

        const LeaveShareScreenLounge =
        {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/screen-share/join',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveShareScreenLounge)
    });

    // it.only('Leave Share Screen in Lounge with 2nd User  : POST /api/v2/lounge/screen-share/join', (done) => {

    //     const LeaveShareScreenLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/screen-share/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveShareScreenLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // This will Show Active table of joined table

    it('Show Active table of joined table : POST /api/v2/lounge/lounges', async () => {

        const CommunityLoungeActive1 = {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "input": "",
                    "limit": 15,
                    "showActiveTables": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive1)
        var getloungetables1 = response.body.success.data.loungeTables.some(function (e) {
            return e.tableName == 'Test Lounge';
        });
        console.log(getloungetables1, 'verify this is true')
        expect(getloungetables1).to.equal(true)
    });

    // it('Show Active table of joined table : POST /api/v2/lounge/lounges', (done) => {

    //     const CommunityLoungeActive1 = {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "input": "",
    //                 "limit": 15,
    //                 "showActiveTables": true
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/lounges')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(CommunityLoungeActive1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             var getloungetables1 = response.body.success.data.loungeTables.some(function (e) {
    //                 return e.tableName == 'Test Lounge';
    //             });
    //             console.log(getloungetables1, 'verify this is true')
    //             expect(getloungetables1).to.equal(true)
    //             done();
    //         });
    // });

    // This will leave joined lounge

    it.only('Leave joined lounge : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    // it.only('Leave joined lounge : POST /api/v2/lounge/leave', (done) => {

    //     const LeaveActivelounge = {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //                 "sourceId": 0
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/leave')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveActivelounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // This will leave joined lounge with 2nd user
    

    it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    // it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', (done) => {

    //     const LeaveActivelounge = {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //                 "sourceId": 0
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/leave')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveActivelounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // This will Show Active table post leaving as 0

    it.only('Show Active table post leaving lounge : POST /api/v2/lounge/lounges', async () => {

        const CommunityLoungeActive2 = {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "input": "",
                    "limit": 15,
                    "showActiveTables": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive2)
    });

    // it.only('Show Active table post leaving lounge : POST /api/v2/lounge/lounges', (done) => {

    //     const CommunityLoungeActive2 = {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "input": "",
    //                 "limit": 15,
    //                 "showActiveTables": true
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/lounges')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(CommunityLoungeActive2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });


    // <-------------------This will Join Lounge------------------>

    it.only('Join Lounge table  : POST /api/v2/lounge/join', async () => {

        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId4 = (response.body.success.data.loungeChannelId)
        loungeChanneluserId4 = (response.body.success.data.Id)
    });

    // it.only('Join Lounge table  : POST /api/v2/lounge/join', (done) => {

    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId_4_capacity,
    //                 "seatNumber": 1,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(1)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });


    // <-------------------This will Join Lounge with 2nd User------------------>

    it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', async () => {

        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 2,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.status).to.equal(200)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(2)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)                
    });

    // it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', (done) => {

    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId_4_capacity,
    //                 "seatNumber": 2,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(2)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });

    // This will leave joined lounge with 2nd user

    it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/lounge/leave',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    // it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', (done) => {

    //     const LeaveActivelounge = {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //                 "sourceId": 0
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/leave')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveActivelounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // <-------------------This will Join Lounge with 2nd User------------------>

    it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', async () => {

        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 3,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',	{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'}, 'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(3)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    // it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', (done) => {

    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId_4_capacity,
    //                 "seatNumber": 3,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(3)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });

    // This will leave joined lounge with 2nd user

    it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',	{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    // it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', (done) => {

    //     const LeaveActivelounge = {
    //         "payload": {
    //             "data": {
    //                 "loungeChannelId": loungeChannelId,
    //                 "loungeChannelUserId": loungeChanneluserId,
    //                 "sourceId": 0
    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/lounge/leave')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(LeaveActivelounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    // <-------------------This will Join Lounge with 2nd User------------------>

    it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', async () => {

        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 4,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',	{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(4)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    // it.only('Join Lounge table with 2nd User  : POST /api/v2/lounge/join', (done) => {

    //     const JoinLounge =
    //     {
    //         "payload": {
    //             "data": {
    //                 "loungeTableId": tableId_4_capacity,
    //                 "seatNumber": 4,
    //                 "sourceId": 0
    //             }
    //         }
    //     }
        
    //     request3
    //         .post('/api/v2/lounge/join')
    //         .set('Authorization', global.accesstoken_lounge_participant1)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(JoinLounge)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
    //             expect(response.body.success.data.seatNumber).to.equal(4)
    //             loungeChannelId = (response.body.success.data.loungeChannelId)
    //             loungeChanneluserId = (response.body.success.data.Id)
    //             done();
    //         });
    // });

    // This will leave joined lounge with 2nd user

    it.only('Leave joined lounge with 2nd User : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',	{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'}, 'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    it.only('Leave joined lounge : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId4,
                    "loungeChannelUserId": loungeChanneluserId4,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    

    it.only('Attendee Lounge:  Add Attendee Lounge with capacity 8  : POST /backend/api/v2/lounge/tables', async () => {

        const AttendeeLoungedata2 =
        {
            "data": {
              "name": "Test Lounge with Capacity 8",
              "topic": "This is Test Lounge with Capacity 8",
              "capacity": "8",
              "lounge_image": "",
              "priority": "4",
              "table_type": "ATTENDEE",
              "meetingLimit": 0,
              "exhibitors": "",
              "meeting_limit": 0
            }
          }

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata2)
        tableId_8_capacity = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });


    it.only('Add Attendee Lounge with capacity 16  : POST /backend/api/v2/lounge/tables', async () => {

        const AttendeeLoungedata2 =
        {
            "data": {
              "name": "Test Lounge with Capacity 16",
              "topic": "This is Test Lounge with Capacity 16",
              "capacity": "16",
              "lounge_image": "",
              "priority": "5",
              "table_type": "ATTENDEE",
              "meetingLimit": 0,
              "exhibitors": "",
              "meeting_limit": 0
            }
          }

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata2)
        tableId_16_capacity = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    it.only('Verify lounge table with capacity 8 and 16  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeActive = {
            "payload": {
              "data": {
                "currentPage": 1,
                "showActiveTables": false,
                "input": "",
                "limit": 10
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 8')].capacity")).to.equal(8)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 8')].priority")).to.equal(4)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 8')].topic")).to.equal("This is Test Lounge with Capacity 8")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 8')].tableType")).to.equal("ATTENDEE")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 16')].capacity")).to.equal(16)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 16')].priority")).to.equal(5)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 16')].topic")).to.equal("This is Test Lounge with Capacity 16")
    });

    it.only('Join Lounge table to check same seat at same time for 2 different Users   : POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_8_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' :  process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId_8 = (response.body.success.data.loungeChannelId)
        loungeChanneluserId_8 = (response.body.success.data.Id)
    });


    it.only('Try to sit on same seat at same time with 2nd User   : POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_8_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstoken_lounge_participant1, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_lounge_Join_error_message)
    });

    it.only('Add range lounge: POST /backend/api/v2/lounge/config', async () => {
        const add_range =
        {
            "data": {
                "slotDuration": 15,
                "openSlots": [
                    {
                        "startMilli": (new Date()).getTime(),
                        "endMilli": (addTime(new Date(), 1)).getTime()
                    }
                ]
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/lounge/config', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_Add_Range_message)
    });

    
    it.only('Attendee Lounge:  Add Attendee Lounge with capacity 4  : POST /backend/api/v2/lounge/tables', async () => {

        const AttendeeLoungedata2 =
        {
            "data": {
              "name": "Test Lounge with Capacity 4 range",
              "topic": "This is Test Lounge with Capacity 4",
              "capacity": "8",
              "lounge_image": "",
              "priority": "4",
              "table_type": "ATTENDEE",
              "meetingLimit": 0,
              "exhibitors": "",
              "meeting_limit": 0
            }
          }

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata2)
        tableId_4_capacity = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });


    it('Verify lounge table with capacity 4 after adding range  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeActive = {
            "payload": {
              "data": {
                "currentPage": 1,
                "showActiveTables": false,
                "input": "",
                "limit": 10
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].capacity")).to.equal(8)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].priority")).to.equal(4)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].topic")).to.equal("This is Test Lounge with Capacity 4")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].tableType")).to.equal("ATTENDEE")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].status")).to.equal("AVAILABLE")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].isActive")).to.equal("YES")
    });


    it.only('Update range lounge: POST /backend/api/v2/lounge/config', async () => {
        const add_range =
        {
            "data": {
                "slotDuration": 15,
                "openSlots": [
                    {
                        "startMilli": (addTime(new Date(), 1)).getTime(),
                        "endMilli": (addTime(new Date(), 1)).getTime()
                    }
                ]
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/lounge/config', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_Add_Range_message)
    });

    it('Verify lounge table with capacity 4 after updating range  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeActive = {
            "payload": {
              "data": {
                "currentPage": 1,
                "showActiveTables": false,
                "input": "",
                "limit": 10
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive)
        expect(response.body.success.data.loungeTablesCount).to.equal(0)
    });


    it.only('Delete time range and save: POST /backend/api/v2/lounge/config', async () => {
        const add_range =
        {
            "data": {
              "slotDuration": 25,
              "openSlots": []
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/lounge/config', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_Add_Range_message)
    });


    it('Verify lounge table with capacity 4 after deleting time range  : POST /api/v2/lounge/lounges', async () => {


        const CommunityLoungeActive = {
            "payload": {
              "data": {
                "currentPage": 1,
                "showActiveTables": false,
                "input": "",
                "limit": 10
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/lounges',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',CommunityLoungeActive)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].capacity")).to.equal(8)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].priority")).to.equal(4)
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].topic")).to.equal("This is Test Lounge with Capacity 4")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].tableType")).to.equal("ATTENDEE")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].status")).to.equal("AVAILABLE")
        expect(getValueFromJsonObject(response.body, "$.success.data.loungeTables[?(@.tableName=='Test Lounge with Capacity 4 range')].isActive")).to.equal("YES")
    });

    it.only('Attendee Lounge:  Add Attendee Lounge with capacity 2  : POST /backend/api/v2/lounge/tables', async () => {

        const AttendeeLoungedata2 =
        {
            "data": {
              "name": "Test Lounge with Capacity 4 range",
              "topic": "This is Test Lounge with Capacity 4",
              "capacity": "2",
              "lounge_image": "",
              "priority": "6",
              "table_type": "ATTENDEE",
              "meetingLimit": 0,
              "exhibitors": "",
              "meeting_limit": 0
            }
          }

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',AttendeeLoungedata2)
        tableId_2_capacity1 = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    it.only('Leave joined lounge check same seat at same time for 2 different Users : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId_8,
                    "loungeChannelUserId": loungeChanneluserId_8,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    it.only('Join Lounge table with capacity 4: POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' :  process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    it.only('Leave joined lounge with capacity 4 : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });


    it.only('Switch Lounge table with capacity 2: POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_2_capacity1,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' :  process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId_2 = (response.body.success.data.loungeChannelId)
        loungeChanneluserId_2 = (response.body.success.data.Id)
    });
    

    it.only('Exhibitors join lounge table with capacity 4: POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    it.only('Leave joined lounge with capacity 4 : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    it.only('Again Exhibitors join lounge table with capacity 4 same table: POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    it.only('Again leave joined lounge with capacity 4 with exhibitor : POST /api/v2/lounge/leave', async () => {

        const LeaveActivelounge = {
            "payload": {
                "data": {
                    "loungeChannelId": loungeChannelId,
                    "loungeChannelUserId": loungeChanneluserId,
                    "sourceId": 0
                }
            }
        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/leave',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',LeaveActivelounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_left_message)
    });

    it.only('Exhibitors join lounge sit on another table.: POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_2_capacity1,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_lounge_Join_message)
        expect(response.body.success.data.seatNumber).to.equal(1)
        loungeChannelId = (response.body.success.data.loungeChannelId)
        loungeChanneluserId = (response.body.success.data.Id)
    });

    it.only('one exhbitors people try to sit on multiple table at the same time : POST /api/v2/lounge/join', async () => {


        const JoinLounge =
        {
            "payload": {
                "data": {
                    "loungeTableId": tableId_4_capacity,
                    "seatNumber": 1,
                    "sourceId": 0
                }
            }
        }
        

        var response = await sendRequest(environment.baseURL3,'/api/v2/lounge/join',{'Authorization' : global.accesstokenboothuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',JoinLounge)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_lounge_Join_error_message)
    });


    //Get Lounge
    //New code added

    it.only('Get lounge list : GET /api/v2/lounge', async () => {
        var response = await sendRequest(environment.baseURL,'/api/v2/lounge',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'page' : 1, 'limit' : 16},'get')
        loungid1 = (response.body.data[0]._id)
        console.log(loungid1)
        loungid2 = (response.body.data[1]._id)
        console.log(loungid2)
        // loungid3 = (response.body.data[2]._id)
        // console.log(loungid3)
    });

    // it.only('Get lounge list : GET /api/v2/lounge', (done) => {
    //     request
    //         .get('/api/v2/lounge')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('buildversion', process.env.buildversion)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('limit', 16)
    //         .set('page', 1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             loungid1 = (response.body.data[0]._id)
    //             console.log(loungid1)
    //             loungid2 = (response.body.data[1]._id)
    //             console.log(loungid2)
    //             // loungid3 = (response.body.data[2]._id)
    //             // console.log(loungid3)
    //             done();
    //         });
    // });

    //Delete Lounge

    it.only('Delete 1st lounge : POST /backend/api/v2/lounge/delete/tables', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/delete/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'tableid': loungid1},'post',)
    });

    // it.only('Delete 1st lounge : POST /backend/api/v2/lounge/delete/tables', (done) => {
    //     request1
    //         .post('/backend/api/v2/lounge/delete/tables')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('buildversion', process.env.buildversion)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('tableid', loungid1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });


    //Delete Lounge
    //New code added

    it.only('Delete 2nd lounge : POST /backend/api/v2/lounge/delete/tables', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/delete/tables', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'tableid' : loungid2},'post')
    });

    // it.only('Delete 2nd lounge : POST /backend/api/v2/lounge/delete/tables', (done) => {
    //     request1
    //         .post('/backend/api/v2/lounge/delete/tables')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('buildversion', process.env.buildversion)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('tableid', loungid2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });

    it.only('Delete virtuabooths : POST /backend/api/v2/events/booth/delete', async () => {
        const delete1 =
        {
            "data": {

                "booth_ids": [virtualboothidlounge,global.virtualboothid1],
                "is_all": 0

            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',delete1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
    });

    it.only('Delete user created for lounge purpose : POST /backend/api/v2/people/delete', async () => {
        const delete1 =
        {
            "data": {

                "ids": [global.attendde_meeting_id,global.boothmemberid],
                "is_all": 0

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
    });


    // it.only('Delete virtuabooths : POST /backend/api/v2/events/booth/delete', (done) => {
    //     const delete1 =
    //     {
    //         "data": {

    //             "booth_ids": [virtualboothidlounge],
    //             "is_all": 0

    //         }
    //     }


    //     request1
    //         .post('/backend/api/v2/events/booth/delete')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('buildversion', process.env.buildversion)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(delete1)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
    //             done();
    //         });
    // });



    //Delete Lounge
    //New code added

    it('Delete 3rd lounge : POST /backend/api/v2/lounge/delete/tables', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/delete/tables',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'tableid': loungid3},'post')
    });

    // it('Delete 3rd lounge : POST /backend/api/v2/lounge/delete/tables', (done) => {
    //     request1
    //         .post('/backend/api/v2/lounge/delete/tables')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('buildversion', process.env.buildversion)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('tableid', loungid3)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             done();
    //         });
    // });


it.only('Delete user created for lounge purpose : POST /backend/api/v2/people/delete', async () => {
    const delete1 =
    {
        "data": {

            "ids": [global.attendde_meeting_id],
            "is_all": 0

        }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
});

});

