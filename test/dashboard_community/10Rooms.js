/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/delete/join/leave rooms. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 16th Oct 2021 10:30 AM
Description: Added Test Cases according to review points.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { commonassertion, headers } from '../../helper/CommonUtil';
import { consolelog, sendRequest,getValueFromJsonObject,People,ComunitySignupLogin,organizerUserHeader } from '../../helper/CommonUtil'
require('dotenv').config();

var roomid1
var roomId2
var roomsingleid1
var roomsingleid2
var roomidcode
var roomchannelid
var roomchannelidsingle
var roomchannelidcoded
var modratorid
var roomsingleid_modrate
var poll_id
var poll_optionid1
var poll_optionid2
var peopleid1
var attendeegroup
var boothmembergroup
var speakergroup
var Room_Question_id
var Room_Question_id2
var Room_Question_id_Anonymous
var request_user_id
var roomid_specific
var roomid_private
var roomchannelidprivate
var private_userid_1
var private_userid_2
var room_poster
var spec_targetid
var roomchannelidmoderate2
var modratorid2
var virtualboothid1
var roomchannelidmoderate3
var roomchannelidmoderate

var fs = require('fs');

var imageAsBase64_Room_Poster_image = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');

const request3 = supertest(environment.baseURL3);


function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}

//This script will create rooms & view/join/leave rooms on community 
describe('Add and Join rooms', () => {
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

    it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'get');
        attendeegroup = (response.body.data[0].id)
        // console.log(attendeegroup)
        boothmembergroup = (response.body.data[1].id)
        // console.log(boothmembergroup)
        speakergroup = (response.body.data[2].id)
        // console.log(speakergroup)
    });

    //POST PEOPLE

    it.only('Upload room poster image: POST /backend/api/v2/events/uploads', (done) => {

        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .field('Content-Type', 'multipart/form-data')
            .field('location', 'breakout_room_poster')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64_Room_Poster_image)
            .end((err, response) => {
                room_poster = (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
                done();
            });

    });


    it.only('Add a single attendee in people : POST /backend/api/v2/people/single', async () => {

        const people10 = {
            "data": {
                "email": "roomstest@mailinator.com",
                "first_name": "Room",
                "groups": [
                    attendeegroup
                ],

                "last_name": "Test",
                "looking": "",
                "offering": "",
                "industry": "",
                "interest": ""
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', people10);
        var data = JSON.parse(response.body.data)
        peopleid1 = (data.userId.$oid)
       
        expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
    });


    //200: POSITIVE This will Sign in with otp on community : POST /api/v2/users/login
    it.only('Sign in with otp: POST /api/v2/users/login', (done) => {
        const community2 = {

            "payload": {
                "data": {
                    "email": "roomstest@mailinator.com",
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }

        request3
            .post('/api/v2/users/login')
            .set('Authorization', process.env.accessTokenLoginPage)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(community2)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
               global.access_token_login_user_room_participant = (response.body.success.data.accessToken)
                done();
            });
    });

    //POST ROOMS

    it.only('Add a single session room Anyone to Anyone : POST /api/v1/rooms/add', async () => {
        const room1 =
        {
            "data": {
              "roomId": "",
              "name": "Test Single Room",
              "roomType": "SINGLE",
              "description": "room",
              "roomStartMilli": new Date().getTime(),
              "roomExipryMilli": (addTime(new Date(), 1)).getTime(),
              "joinPermission": "ANYONE",
              "shareAVPermission": "ANYONE",
              "joinPermissionGroups": "",
              "avAcceptPermissionUsers": "",
              "roomCode": "",
              "isRecodingAllow": "NO",
              "maximumVideo": "12",
              "priority": "1",
              "banner": "",
              "exhibitor_id": "",
              "isRecodingEnableForModerator": 0,
              "exhibitor": "",
              "isFeatured": "YES",
              "isChat": "YES",
              "isQandA": "YES",
              "isModerateQandA": "NO",
              "isPolls": "YES",
              "isParticipant": "YES",
              "isRoomInfo": "NO",
              "isDominantColor": true
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', room1);
        roomsingleid1 = (response.body.roomId)
        
        expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
    });

    it.only('Add a multiple session coded room on dashbaord: POST /api/v1/rooms/add', async () => {
        const room2 =
        {
            "data":
            {
                "avAcceptPermissionUsers": "",
                "banner": "",
                "description": "Test Room Multiple",
                "exhibitor": "",
                "exhibitor_id": "",
                "isRecodingAllow": "NO",
                "isRecodingEnableForModerator": 0,
                "joinPermission": "CODED",
                "joinPermissionGroups": "",
                "maximumVideo": "12",
                "name": "Test Room New Multiple",
                "priority": "1",
                "roomCode": "1234",
                "roomExipryMilli": null,
                "roomId": "",
                "roomStartMilli": null,
                "roomType": "MULTIPLE",
                "shareAVPermission": "ANYONE"
            }
        };

       

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken }, 'post', room2)
        roomsingleid2 = (response.body.roomId)
       
        expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
    });

    //VERIFY ROOMS ON COMMUNITY V2

    //200: This will verify room list on community v2: POST /api/v2/rooms

    it.only('Verify room list at reception with featured as false : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "featured": false,
                    "input": "",
                    "limit": 10,
                    "organisationName": [],
                    "page": 1,
                    "roomEndMilli": 0,
                    "roomId": "",
                    "roomStartMilli": 0,
                    "showLive": "NO",
                    "sort": 1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Test Single Room')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[1].name).to.equal('Test Room New Multiple')
        expect(response.body.success.data.rooms[1].roomType).to.equal('MULTIPLE')
        expect(response.body.success.data.rooms[1].isCoded).to.equal('YES')
    });


    it.only('Verify room list at reception with featured as true : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "featured": false,
                    "input": "",
                    "limit": 10,
                    "organisationName": [],
                    "page": 1,
                    "roomEndMilli": 0,
                    "roomId": "",
                    "roomStartMilli": 0,
                    "showLive": "NO",
                    "sort": 1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Test Single Room')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].priority).to.equal(1)
    });



    it.only('Verify room list at rooms section : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
              "data": {
                "showLive": "NO",
                "sort": 1,
                "page": 1,
                "limit": 20
              }
            }
          }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Test Single Room')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.success.data.rooms[0].priority).to.equal(1)
    });



    // it.only('Verify room list : POST /api/v2/rooms', (done) => {

    //     const roomlistcommunityv2 =
    //     {
    //         "payload": {
    //             "data": {
    //                 "featured": false,
    //                 "input": "",
    //                 "limit": 10,
    //                 "organisationName": [],
    //                 "page": 1,
    //                 "roomEndMilli": 0,
    //                 "roomId": "",
    //                 "roomStartMilli": 0,
    //                 "showLive": "NO",
    //                 "sort": 1

    //             }
    //         }
    //     }

    //     request3
    //         .post('/api/v2/rooms')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('source', environment.HSource)
    //         .set('languageid', 34)
    //         .set('Content-Type', 'application/json')
    //         .send(roomlistcommunityv2)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
    //             expect(response.body.success.data.rooms[0].name).to.equal('Test Single Room')
    //             expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
    //             expect(response.body.success.data.rooms[1].name).to.equal('Test Room New Multiple')
    //             expect(response.body.success.data.rooms[1].roomType).to.equal('MULTIPLE')
    //             expect(response.body.success.data.rooms[1].isCoded).to.equal('YES')
    //             done();
    //         });
    // });

    // JOIN ROOMS code

    it.only('Get room join validation for coded room : POST /api/v2/rooms/join-validation', async () => {
     

        const community501 = {
            "payload": {
                "data": {
                    "code": "1234",
                    "roomId": roomsingleid2

                }
            }
        }


        
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
        roomidcode = (response.body.success.data.code)
    });


    it.only('Try to join room with invalid code : POST /api/v2/rooms/join-validation', async () => {
      

        const community501 = {
            "payload": {
                "data": {
                    "code": "1234xyzjh",
                    "roomId": roomsingleid2

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_Room_invalid_code_message)
    });

    //<<<<<<<<<<<<<<<<---------------Join Coded Room------------>>>>>>>>>>>//

    it.only('Join Coded Room : POST /api/v2/rooms/join', async () => {
     

        const joincodedroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid2,
                    "code": roomidcode,
                    "options": { apiStore: {} }

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joincodedroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Room New Multiple')
        expect(response.body.success.data.joinPermission).to.equal('CODED')
        roomchannelidcoded = (response.body.success.data.liveUserData[0].roomChannelId)
    });

    //<-----------------------Leave Coded Room--------------------->

    it.only('Leave Coded Room : POST /api/v2/rooms/leave', async () => {
     

        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid2,
                    "roomChannelId": roomchannelidcoded

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });


    // JOIN Validator Single Room

    it.only('Get room join validation : POST /api/v2/rooms/join-validation', async () => {
     

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1

                }
            }
        }

        
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Single Room--------------------->

    it.only('Join Single Room Anyone to Anyone and check for featured/chat/max video count as Yes : POST /api/v2/rooms/join', async () => {
        
        const joinsingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinsingleroom);
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Single Room')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("YES")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("NO")
        expect(response.body.success.data.isModerator).to.equal("NO")
        expect(response.body.success.data.shareAVPermission).to.equal("ANYONE")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });


    it.only('Join Single Room with other attendee Anyone to Anyone and check for featured/chat/max video count as Yes : POST /api/v2/rooms/join', async () => {
        
        const joinsingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': global.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinsingleroom);
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Single Room')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("YES")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("NO")
        expect(response.body.success.data.isModerator).to.equal("NO")
        expect(response.body.success.data.shareAVPermission).to.equal("ANYONE")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });


    it.only('Get Live Users spectator count in Single Room : POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "YES",
                    "isParticipant": "NO",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Test Single Room')
        expect(response.body.success.data.liveUserData[0].userJoinAs).to.equal("SPECTATOR")
        expect(response.body.success.data.liveUserData[1].userJoinAs).to.equal("SPECTATOR")
        expect(response.body.success.data.liveUserData[0].avStatus).to.equal("NOT_REQUESTED")
        expect(response.body.success.data.liveUserData[0].firstName).to.equal("joker")
        expect(response.body.success.data.liveUserData[0].lastName).to.equal("clown")
        expect(response.body.success.data.liveUserData[0].organisationName).to.equal("clown organisation is world")
        expect(response.body.success.data.liveUserData[0].designation).to.equal("clown designation is ceo")
        expect(response.body.success.data.totalCount).to.equal(2)
    });

 //<-----------------------Send sendAudioVideoRequest Screen in Single Room-------------------->

 it.only('Send AV request in single room anyone to anyone : POST /api/v2/rooms/sendAudioVideoRequest', async () => {
   
    const ShareScreen = {
        "payload": {
            "data": {
                "roomId": roomsingleid1,
                "roomChannelId": roomchannelidsingle

            }
        }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/sendAudioVideoRequest', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Send_Audio_Video_request_message)
});




    //<-----------------------Share Screen in Single Room-------------------->

    it.only('Share Screen in Single Room : POST /api/v2/rooms/screenShareJoin', async () => {
     

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Single Room-------------------->

    it.only('Leave Share Screen in Single Room : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });

    //<-----------------------Live User Single Room-------------------->

    it.only('Get Live Users participant count in Single Room : POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "NO",
                    "isParticipant": "YES",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Test Single Room')
        expect(response.body.success.data.liveUserData[0].isBan).to.equal("NO")
        expect(response.body.success.data.liveUserData[0].userJoinAs).to.equal("SPECTATOR")
        expect(response.body.success.data.liveUserData[0].avStatus).to.equal("ACTIVE")
        expect(response.body.success.data.liveUserData[0].firstName).to.equal("joker")
        expect(response.body.success.data.liveUserData[0].lastName).to.equal("clown")
        expect(response.body.success.data.liveUserData[0].organisationName).to.equal("clown organisation is world")
        expect(response.body.success.data.liveUserData[0].designation).to.equal("clown designation is ceo")
        expect(response.body.success.data.totalCount).to.equal(1)
    });

    //<-----------------------Leave Single Room--------------------->

    it.only('Leave Single Room : POST /api/v2/rooms/leave', async () => {
    
        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });


    it.only('Join again single session room anyone to anyone : POST /api/v2/rooms/join', async () => {
        
        const joinsingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinsingleroom);
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Single Room')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("YES")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("NO")
        expect(response.body.success.data.isModerator).to.equal("NO")
        expect(response.body.success.data.shareAVPermission).to.equal("ANYONE")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });

    it.only('Leave Single Room agian : POST /api/v2/rooms/leave', async () => {
    
        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid1,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });


    //Get Rooms on Dashboard

    it.only('This will get the rooms on dashboard: POST /api/v1/rooms/list', async () => {
        const RoomGet1 =

        {
            "data": {
                "filter": {}
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization': 'Bearer ' + process.env.eToken, 'limit': environment.HLimit, 'page': environment.HPage }, 'post', RoomGet1)
        expect(response.body.data).to.not.be.null;
        roomid1 = (response.body.data[0]._id)
        roomId2 = (response.body.data[1]._id)
    });

    //<--------------------------Negative Cases ------------------------------>

    // JOIN ROOMS code

    var data88 = [{ "code": "1234", "roomId": "" }, { "code": "1234", "": roomsingleid2 },]
    for (let i = 0; i < data88.length; i++) {

        it.only('Get room join validation : POST /api/v2/rooms/join-validation', (done) => {
         

            const community501 = {
                "payload": {
                    "data":
                        data88[i]
                }
            }

            

            request3
                .post('/api/v2/rooms/join-validation')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(community501)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    // console.log(roomidcode)
                    done();
                });
        });
    }

    //<<<<<<<<<<<<<<<<---------------Join Coded Room------------>>>>>>>>>>>//

    var data88 = [
        {
            "roomId": "",
            "options": { "apiStore": {} },
            "code": "$2a$08$GvOVJBf9Zyg0yAZtQus4auHN5SOnIcamyVy5g9hjUHXaiGHRCTAsq"
        },
        {
            "": "60f04a349c526f770749919b",
            "options": { "apiStore": {} },
            "code": "$2a$08$GvOVJBf9Zyg0yAZtQus4auHN5SOnIcamyVy5g9hjUHXaiGHRCTAsq"
        },

    ]

    for (let i = 0; i < data88.length; i++) {

        it.only('Join Coded Room : POST /api/v2/rooms/join', (done) => {
         

            const joincodedroom = {
                "payload": {
                    "data":
                        data88[i]
                }
            }


            // console.log(joincodedroom, 'room join body')

            request3
                .post('/api/v2/rooms/join')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(joincodedroom)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    done();
                });
        });
    }

    //<-----------------------Leave Coded Room--------------------->

    var data88 = [
        { "": "60f04a349c526f770749919b", "roomChannelId": "60f04a5254adaf3b9a724634" },
        { "roomId": "60f04a349c526f770749919b", "": "60f04a5254adaf3b9a724634" },
        { "roomId": "", "roomChannelId": "60f04a5254adaf3b9a724634" },
        { "roomId": "60f04a349c526f770749919b", "roomChannelId": "" }
    ]

    for (let i = 0; i < data88.length; i++) {

        it.only('Leave Coded Room : POST /api/v2/rooms/leave', (done) => {
         

            const leavesingleroom = {
                "payload": {
                    "data":
                        data88[i]


                }
            }

            request3
                .post('/api/v2/rooms/leave')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(leavesingleroom)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    done();
                });
        });
    }

    //Room Join Validations

    var data88 = [{ "roomId": "" }, { "": roomsingleid1 },]
    for (let i = 0; i < data88.length; i++) {

        it.only('Get room join validation : POST /api/v2/rooms/join-validation', (done) => {
         

            const community501 = {
                "payload": {
                    "data":
                        data88[i]


                }
            }

            

            request3
                .post('/api/v2/rooms/join-validation')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(community501)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    // expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
                    done();
                });
        });
    }



    //<-----------------------Join Single Room--------------------->

    var data88 = [{ "roomId": "" }, { "": "564654654654564" },]
    for (let i = 0; i < data88.length; i++) {

        it.only('Join Single Room : POST /api/v2/rooms/join', (done) => {
         

            const joinsingleroom = {
                "payload": {
                    "data":
                        data88[i]
                }
            }

            request3
                .post('/api/v2/rooms/join')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(joinsingleroom)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    done();
                });
        });

    }


    //<-----------------------Share Screen in Single Room-------------------->
    var data88 = [{ "": "60e7f43da8fae727878b1cd0", "roomChannelId": "60f0550da8df8b4ab99226df" },
    { "roomId": "", "roomChannelId": "60f0550da8df8b4ab99226df" },
    { "roomId": "60e7f43da8fae727878b1cd0", "roomChannelId": "" }]
    for (let i = 0; i < data88.length; i++) {

        it.only('Share Screen in Single Room : POST /api/v2/rooms/screenShareJoin', (done) => {
         

            const ShareScreen = {
                "payload": {
                    "data":
                        data88[i]

                }
            }

            request3
                .post('/api/v2/rooms/screenShareJoin')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(ShareScreen)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    done();
                });
        });
    }

    //<-----------------------Leave Share Screen in Single Room-------------------->

    var data88 = [{ "": "60e7f43da8fae727878b1cd0", "roomChannelId": "60f0550da8df8b4ab99226df" },
    { "roomId": "", "roomChannelId": "60f0550da8df8b4ab99226df" },
    { "roomId": "60e7f43da8fae727878b1cd0", "roomChannelId": "" }]
    for (let i = 0; i < data88.length; i++) {

        it.only('Leave Share Screen in Single Room : POST /api/v2/rooms/screenShareLeave', (done) => {
         

            const LeaveShareScreen = {
                "payload": {
                    "data":
                        data88[i]

                }
            }

            request3
                .post('/api/v2/rooms/screenShareLeave')
                .set('Authorization', process.env.accesstokenloginuser)
                .set('source', environment.HSource)
                .set('languageid', 34)
                .set('Content-Type', 'application/json')
                .send(LeaveShareScreen)
                .end((err, response) => {
                    consolelog(response)
                    expect(response.status).to.equal(400)
                    done();
                });
        });
    }


    it.only('List All Attendee  : POST /backend/api/v2/events/people/list', (done) => {
        request1
            .post('/backend/api/v2/events/people/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                modratorid = (response.body.data[1].userId)
                
                done();
            });
    });



    it.only('Add a single session room Anyone to Moderator  : POST /api/v1/rooms/add', (done) => {
        const room1 =
        {
            "data": {
                "roomId": "",
                "name": "Anyone to Moderator",
                "roomType": "SINGLE",
                "description": "Test",
                "roomStartMilli": new Date().getTime(),
                "roomExipryMilli": (addTime(new Date(), 1)).getTime(),
                "joinPermission": "ANYONE",
                "shareAVPermission": "MODERATED",
                "joinPermissionGroups": "",
                "avAcceptPermissionUsers": [modratorid],
                "roomCode": "",
                "isRecodingAllow": "YES",
                "maximumVideo": "12", "priority": "2",
                "banner": "",
                "exhibitor_id": "",
                "isRecodingEnableForModerator": 0,
                "exhibitor": "",
                "isFeatured": "NO",
                "isChat": "YES",
                "isQandA": "YES",
                "isModerateQandA": "NO",
                "isPolls": "YES",
                "isParticipant": "YES",
                "isRoomInfo": "NO"
            }
        }

        request
            .post('/api/v1/rooms/add')
            .set('organiserId', environment.HOrganiserId)
            // .set('eventId', process.env.eventid)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(room1)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                roomsingleid_modrate = (response.body.roomId)
                
                expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
                done();
            });
    });

    //200: POSITIVE This will Sign in with otp on community : POST /api/v2/users/login
    it.only('Sign in with otp: POST /api/v2/users/login', (done) => {
        const community2 = {

            "payload": {
                "data": {
                    "email": "roomstest@mailinator.com",
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }

        request3
            .post('/api/v2/users/login')
            .set('Authorization', process.env.accessTokenLoginPage)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(community2)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                process.env.access_token_login_user_room_participant = (response.body.success.data.accessToken)
                done();
            });
    });


    it.only('Get room join validation Moderator Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Moderator Room--------------------->

    it.only('Join Moderator Room anyone to moderator single session : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.isModerator).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });

    it.only('Verify moderator room is live after moderator joins the room: POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
              "data": {
                "showLive": "NO",
                "sort": 1,
                "page": 1,
                "limit": 20
              }
            }
          }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[1].name).to.equal('Anyone to Moderator')
        expect(response.body.success.data.rooms[1].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[1].shareAVPermission).to.equal('MODERATED')
        expect(response.body.success.data.rooms[1].isLive).to.equal("YES")
    });



    it.only('Join Moderator Room anyone to moderator single session with another user : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidmoderate2 = (response.body.success.data.liveUserData[1].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });

    it.only('Send Rise hand request in Anyone to Moderator Room by Attendee : POST /api/v2/rooms/sendRaiseHandRequest', async () => {

        const Send_Risehand =
        {
            "payload": {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidmoderate2,
                    "action": "ON"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/sendRaiseHandRequest', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'Content-Type': 'application/json' }, 'post', Send_Risehand)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Send_Risehand_request_message)
    });


    it.only('Fatch/list Rise hand request in Anyone to Moderator Room by moderator : POST /api/v2/rooms/liveUsers', async () => {

        const list_Risehand =
        {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "NO",
                    "isParticipant": "NO",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "YES",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', list_Risehand)
        request_user_id = (response.body.success.data.liveUserData[0].userId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
    });


    it.only('Accept Rise hand request in Anyone to Moderator Room by moderator :', async () => {

        const Accept_Risehand =
        {
            "payload": {
                "data":
                {
                    "roomChannelId": roomchannelidsingle,
                    "roomId": roomsingleid_modrate,
                    "requestUserId": request_user_id,
                    "accept": "YES"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/acceptRaiseHandRequest', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Accept_Risehand)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Accept_Risehand_request_message)
    });



    //<-----------------------Share Screen in Moderator Room-------------------->

    it.only('Share Screen in Moderator Room : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

     //<-----------------------Share Screen in Moderator Room-------------------->

     it.only('Override Screen in Moderator Room : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidmoderate2

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Moderator Room-------------------->

    it.only('Leave Share Screen in Moderator Room : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidmoderate2

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });

    //<-----------------------Live User Moderator Room-------------------->

    it.only('Live Users in Moderator Room : POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "NO",
                    "isParticipant": "YES",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
    });

    //<-----------------------Create a Poll in Moderator Room-------------------->

    it.only('Create a Poll in Moderator Room : POST /api/v2/common/create/poll', async () => {

        const CreateAPoll =
        {
            "payload": {
                "data": {
                    "pollQuestion": "This is My Poll",
                    "options": [{ "title": "Test 1" }, { "title": "Test 2" }],
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle,
                    "pollType": "RADIO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', CreateAPoll)

        poll_id = (response.body.success.data._id)
        poll_optionid1 = (response.body.success.data.option[0]._id)
        poll_optionid2 = (response.body.success.data.option[1]._id)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_create_message)
    });

    //<-----------------------Publish a Poll in Moderator Room-------------------->

    it.only('Publish a Poll in Moderator Room : POST /api/v2/common/action/poll', async () => {

        const PublishAPoll =
        {
            "payload": {
                "data":
                {
                    "pollId": poll_id,
                    "action": "LIVE", "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/action/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', PublishAPoll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_publish_message)
    });



    //<-----------------------Participant a Poll in Moderator Room-------------------->

    it.only('Participant a Poll in Moderator Room : POST /api/v2/common/vote/poll', async () => {

        const ParticipantinPoll =
        {
            "payload": {
                "data": {
                    "optionId": poll_optionid1,
                    "pollId": poll_id,
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/vote/poll', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ParticipantinPoll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_Upvote_message)
        expect(response.body.success.data.voted).to.equal(true)
    });

    //<-----------------------End a Poll in Moderator Room-------------------->

    it.only('End a Poll in Moderator Room : POST /api/v2/common/action/poll', async () => {

        const EndAPoll =
        {
            "payload": {
                "data": {
                    "pollId": poll_id,
                    "action": "ENDED",
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/action/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', EndAPoll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_End_message)
    });

    //<-----------------------Show Result of a Poll in Moderator Room to Attendee-------------------->

    it.only('Show Result of a Poll in Moderator Room to Attendee : POST api/v2/common/action/poll', async () => {

        const ShowResults =
        {
            "payload": {
                "data": {
                    "pollId": poll_id,
                    "action": "SHOW",
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/action/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShowResults)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_Show_Result_message)
    });


    //<----------------------Hide Result of a Poll in Moderator Room to Attendee-------------------->

    it.only('Hide Result of a Poll in Moderator Room to Attendee : POST api/v2/common/action/poll', async () => {

        const HideResults =
        {
            "payload": {
                "data": {
                    "pollId": poll_id,
                    "action": "HIDE",
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/action/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', HideResults)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_Hide_Result_message)
    });


    //<---------------------Duplicate a Poll in Moderator Room to Attendee-------------------->

    it.only('Duplicate a Poll in Moderator Room to Attendee : POST api/v2/common/action/poll', async () => {

        const Duplicate_Poll =
        {
            "payload": {
                "data": {
                    "pollId": poll_id,
                    "action": "DUPLICATE",
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/action/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Duplicate_Poll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_Duplicate_message)
    });


    //<-----------------------Create a Poll in Moderator Room  with length of 200 characters-------------------->

    it.only('Create a Poll in Moderator Room  with length of 200 characters : POST /api/v2/common/create/poll', async () => {

        const with200 = 'ThisIsGood'.repeat(20)
        const CreateAPoll =
        {
            "payload": {
                "data": {
                    "pollQuestion": with200,
                    "options": [{ "title": "Test 1" }, { "title": "Test 2" }],
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle,
                    "pollType": "RADIO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', CreateAPoll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_create_message)
    });

    //<-----------------------Create a Poll in Moderator Room with option length 30 characters-------------------->

    it.only('Create a Poll in Moderator Room  with option length 30 characters : POST /api/v2/common/create/poll', async () => {

        const with200 = 'ThisIsGood'.repeat(20)
        const option1 = 'ThisIsGood'.repeat(3)
        const option2 = 'ThisIsGood'.repeat(3)
        const CreateAPoll =
        {
            "payload": {
                "data": {
                    "pollQuestion": with200,
                    "options": [{ "title": option1 }, { "title": option2 }],
                    "moduleType": "ROOM",
                    "moduleId": roomsingleid_modrate,
                    "channelId": roomchannelidsingle,
                    "pollType": "RADIO"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/poll', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', CreateAPoll)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Poll_create_message)
    });


    //<---------------------Ask a Question in Anyone to Moderator Room ------------------->

    it.only('Ask a Question in Anyone to Moderator Room : POST /api/v2/common/create/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data":
                {
                    "question": "Hello this a Questions ?",
                    "isAnonymous": 0,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        Room_Question_id = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.comment).equal('Hello this a Questions ?')
    });

    //<---------------------Upvote a Question in Anyone to Moderator Room-------------------->

    it.only('Upvote a Question in Anyone to Moderator Room : POST a/api/v2/common/answer/question', async () => {

        const Upvote_Question =
        {
            "payload": {
                "data":
                {
                    "questionId": Room_Question_id,
                    "action": 4,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "isUpvote": "YES",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Upvote_Question)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Upvote_message)
        expect(response.body.success.code).equal('UPVOTE_ADDED')
    });

    //<---------------------Ask a 2nd Question in Anyone to Moderator Room-------------------->

    it.only('Ask a 2nd Question in Anyone to Moderator Room : POST /api/v2/common/create/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data":
                {
                    "question": "Hello this a 2nd Questions ?",
                    "isAnonymous": 0,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        Room_Question_id2 = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.comment).equal('Hello this a 2nd Questions ?')
    });


    //<---------------------Short Question by most voted in Anyone to Moderator Room-------------------->

    it.only('Short Question by most voted in Anyone to Moderator Room : POST api/v2/common/list/question', async () => {

        const Question_Room_Short =
        {
            "payload": {
                "data": {
                    "current_page": 0,
                    "sort": 2,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle,
                    "limit": 10
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/list/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Short)
        expect(response.body.success.data.list[0].likes).equal(1)
        expect(response.body.success.data.list[1].likes).equal(0)
        expect(response.body.success.data.count).equal(2)
    });

    //<---------------------Short Question by recent in Anyone to Moderator Room-------------------->

    it.only('Short Question by recent in Anyone to Moderator Room by Attendee : POST api/v2/common/list/question', async () => {

        const Question_Room_Short =
        {
            "payload": {
                "data": {
                    "current_page": 0,
                    "sort": 1,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle,
                    "limit": 10
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/list/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Short)
        expect(response.body.success.data.list[0].likes).equal(0)
        expect(response.body.success.data.list[1].likes).equal(1)
        expect(response.body.success.data.count).equal(2)
    });

    //<---------------------Ask a Question Anonymous in Anyone to Moderator Room ------------------->

    it.only('Ask a Question Anonymous in Anyone to Moderator Room as an Attendee : POST /api/v2/common/create/question', async () => {

        const Question_Room_Anonymous =
        {
            "payload": {
                "data":
                {
                    "question": "Hello this a Anonymous Questions ?",
                    "isAnonymous": 1,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Anonymous)
        Room_Question_id_Anonymous = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.comment).equal('Hello this a Anonymous Questions ?')
        expect(response.body.success.data.isAnonymous).equal(1)
    });


    //<---------------------List All added Questions in Anyone to Moderator Room ------------------->

    it.only('List All added Question in Anyone to Moderator Room : POST /api/v2/common/list/question', async () => {

        const Question_Room_List =
        {
            "payload": {
                "data": {
                    "current_page": 0,
                    "sort": 1,
                    "status": 2,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle,
                    "limit": 10
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/list/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_List)
    });


    //<---------------------Answer added Questions in Anyone to Moderator Room ------------------->

    it.only('Answer added Question in Anyone to Moderator Room : POST /api/v2/common/answer/question', async () => {

        const Question_Room_Answer =
        {
            "payload": {
                "data":
                {
                    "questionId": Room_Question_id,
                    "action": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "answer": "Yes That is Correct Answer",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Answer)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Answer_message)
    });


    //<--------------------- Edit Answer in Anyone to Moderator Room ------------------->

    it.only('Edit Answer in Anyone to Moderator Room : POST /api/v2/common/answer/question', async () => {

        const Question_Room_Answer =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id,
                    "action": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "answer": "Yes That is Updated Answer",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Answer)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Answer_message)
    });

    //<--------------------- Delete Answer in Anyone to Moderator Room ------------------->

    it.only('Delete Answer in Anyone to Moderator Room by Moderator : POST /api/v2/common/answer/question', async () => {

        const Question_Room_Answer =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id,
                    "action": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "answer": "",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Answer)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Answer_message)
    });



    //<--------------------- Reject Question in Anyone to Moderator Room ------------------->

    it.only('Reject Question in Anyone to Moderator Room by Moderator : POST /api/v2/common/answer/question', async () => {

        const Question_Room_Reject =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id2,
                    "action": 2,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Reject)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Reject_message)
    });


    //<---------------------Delete Question in Anyone to Moderator Room-------------------->

    it.only('Delete Question in Anyone to Moderator Room by Attendee : POST /api/v2/common/delete/question', async () => {

        const Question_Room_Delete =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id_Anonymous,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/delete/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Delete)
        // expect(response.body.success.data.deleted).equal(true)
    });


    //<---------------------Ask a Question in Anyone to Moderator Room with length of 300 characters ------------------->

    it.only('Ask a Question in Anyone to Moderator Room with length of 300 characters : POST /api/v2/common/create/question', async () => {

        const max300qus = 'ThisIsGood'.repeat(30)
        const Question_Room =
        {
            "payload": {
                "data":
                {
                    "question": max300qus,
                    "isAnonymous": 0,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        Room_Question_id = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
    });


    //<---------------------Answer added Questions in Anyone to Moderator Room with length of 300 characters------------------->

    it.only('Answer added Question in Anyone to Moderator Room with length of 300 characters : POST /api/v2/common/answer/question', async () => {

        const with300ans = 'ThisIsGood'.repeat(30)
        const Question_Room_Answer =
        {
            "payload": {
                "data":
                {
                    "questionId": Room_Question_id,
                    "action": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "answer": with300ans,
                    "channelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_Answer)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Answer_message)
    });


    it.only('Start Recording in Anyone to Moderator Room by Moderator : POST /api/v2/rooms/startRecording', async () => {

        const Start_Recording =
        {
            "payload": {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/startRecording', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Start_Recording)
        expect(response.body.success.code).to.equal('RECORDING_STARTED')
    });


    it.only('Stop Recording in Anyone to Moderator Room by Moderator : POST /api/v2/rooms/stopRecording', async () => {

        const Stop_Recording =
        {
            "payload": {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/stopRecording', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Stop_Recording)
        expect(response.body.success.code).to.equal('RECORDING_STOPPED')
    });


    

    //****** verify participant list here *************


     it.only('Remove Spectator by moderator from Anyone to Moderator room : POST /api/v2/rooms/offAVByModerator', async () => {

        const Remove_user =
        {
            "payload": {
                "data":
                {
                    "roomChannelId": roomchannelidsingle,
                    "roomId": roomsingleid_modrate,
                     "targetId": request_user_id
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/offAVByModerator', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Remove_user)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Remove_participant_rooms_message)
    });

     it.only('Again join the room with removed user join validation : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });


    it.only('Join Moderator Room anyone to moderator with removed user : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidmoderate2 = (response.body.success.data.liveUserData[1].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });



    it.only('Get Live Users spectator in moderator room: POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "YES",
                    "isParticipant": "NO",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        spec_targetid = (response.body.success.data.liveUserData[0].userId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.totalCount).to.equal(1)
    });

      it.only('Ban spectators in moderator room : POST /api/v2/rooms/banUser', async () => {
        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                     "targetId": spec_targetid,
                     "action": "YES"

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/banUser', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Ban_spectators_rooms_message)
    });


    it.only('Spectator automatically leave Moderator Room after ban : POST /api/v2/rooms/leave', async () => {

        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidmoderate2

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_automatically_leave_rooms_message)
    });
    

    it.only('Try to join room with banned user : POST /api/v2/rooms/join-validation', async () => {
     

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_join_rooms_with_ban_user_message)
    });




     it.only('Get Live Users spectator count in moderator room after ban: POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "YES",
                    "isParticipant": "NO",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.totalCount).to.equal(0)
    });


     it.only('Show banned spectator in moderator room after ban: POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "NO",
                    "isParticipant": "NO",
                    "avStatus": "NO",
                    "isBan": "YES",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.totalCount).to.equal(1)
        expect(response.body.success.data.liveUserData[0].isBan).to.equal("YES")
        expect(response.body.success.data.liveUserData[0].isActive).to.equal("NO")
         expect(response.body.success.data.liveUserData[0].userJoinAs).to.equal("SPECTATOR")
    });


      it.only('Unban spectators in moderator room : POST /api/v2/rooms/banUser', async () => {
        const leavesingleroom = 
        {
            "payload": {
                "data": {
                    "roomChannelId": roomchannelidsingle,
                    "roomId": roomsingleid_modrate,
                    "targetId": spec_targetid,
                    "action": "NO"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/banUser', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_unban_spectators_rooms_message)
    });

    it.only('Try to join room after unban spectators : POST /api/v2/rooms/join-validation', async () => {
     
        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate

                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });


    //<-----------------------Leave Moderator Room--------------------->

    it.only('Leave Moderator Room : POST /api/v2/rooms/leave', async () => {
        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });


    it.only('Get room join validation Moderator Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Moderator Room--------------------->

    it.only('Join Moderator Room : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Anyone to Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
    });


    //<-----------------------End Moderator Room--------------------->

    it.only('End Moderator Room : POST /api/v2/rooms/endRoom', async () => {
        const Endingleroom = {
            "payload": {
                "data": {
                    "roomId": roomsingleid_modrate,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/endRoom', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Endingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_End_rooms_message)
    });



    it.only('Create a Room Specific Group to Anyone  : POST /api/v1/rooms/add', (done) => {
        const room_specific_group =
        {
            "data": {
                "roomId": "",
                "name": "Specific Group Anyone",
                "roomType": "SINGLE",
                "description": "Test Specific Group",
                "roomStartMilli": new Date().getTime(),
                "roomExipryMilli": (addTime(new Date(), 1)).getTime(),
                "joinPermission": "GROUPS",
                "shareAVPermission": "ANYONE",
                "joinPermissionGroups": [
                    attendeegroup
                ],
                "avAcceptPermissionUsers": "",
                "roomCode": "",
                "isRecodingAllow": "NO",
                "maximumVideo": "12",
                "priority": "2",
                "banner": "",
                "exhibitor_id": "",
                "isRecodingEnableForModerator": 0,
                "exhibitor": "",
                "isFeatured": "NO",
                "isChat": "YES",
                "isQandA": "YES",
                "isModerateQandA": "NO",
                "isPolls": "YES",
                "isParticipant": "YES",
                "isRoomInfo": "NO"
            }
        }

        request
            .post('/api/v1/rooms/add')
            .set('organiserId', environment.HOrganiserId)
            // .set('eventId', process.env.eventid)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(room_specific_group)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                roomid_specific = (response.body.roomId)
                
                expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
                done();
            });
    });

    it.only('Get room join validation Specific Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomid_specific

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Moderator Room--------------------->

    it.only('Join Specific Room : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomid_specific,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Specific Group Anyone')
        expect(response.body.success.data.joinPermission).to.equal('GROUPS')
    });

    //<-----------------------Send Audio/Video request in Specific Room-------------------->

    it.only('Send Audio/Video in Specific Room : POST /api/v2/rooms/sendAudioVideoRequest', async () => {

        const Send_Audio_Video = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/sendAudioVideoRequest', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Send_Audio_Video)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Send_Audio_Video_request_message)
    });


    //<-----------------------Share Screen in Specific Room-------------------->

    it.only('Share Screen in Specific Room : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Specific Room-------------------->

    it.only('Leave Share Screen in Specific Room : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });


    //<-----------------------Join Validation with 2nd user--------->
    it.only('Get room join validation Specific Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomid_specific

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Validation Room 2nd Attendee--------------------->

    it.only('Join Specific Room : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomid_specific,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        // roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Specific Group Anyone')
        expect(response.body.success.data.joinPermission).to.equal('GROUPS')
    });


    //<-----------------------Send Audio/Video request in Specific Room 2nd User-------------------->

    it.only('Send Audio/Video in Specific Room : POST /api/v2/rooms/sendAudioVideoRequest', async () => {

        const Send_Audio_Video = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/sendAudioVideoRequest', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Send_Audio_Video)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Send_Audio_Video_request_message)
    });


    //<-----------------------Share Screen in Specific Room 2nd User-------------------->

    it.only('Share Screen in Specific Room with 2nd User : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Specific Room 2nd User-------------------->

    it.only('Leave Share Screen in Specific Room with 2nd User : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });

    //<-----------------------Live User Specific Room participants-------------------->

    it.only('Live Users in Specific Room : POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle,
                    "isSpectator": "NO",
                    "isParticipant": "YES",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Specific Group Anyone')
    });

    //<-----------------------Go to Spectators Mode in Specific Room with 2nd User-------------------->

    it.only('Go to Spectators Mode in Specific Room with 2nd User : POST /api/v2/rooms/offAudioVideo', async () => {

        const Spectators_Mode = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/offAudioVideo', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Spectators_Mode)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });


    //<-----------------------Leave Specific Room with 2nd User--------------------->

    it.only('Leave Specific Room : POST /api/v2/rooms/leave', async () => {
        const leavesingleroom = {
            "payload": {
                "data": {
                    "roomId": roomid_specific,
                    "roomChannelId": roomchannelidsingle

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leavesingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });


    it.only('List All Attendee  : POST /backend/api/v2/events/people/list', (done) => {
        request1
            .post('/backend/api/v2/events/people/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                private_userid_1 = (response.body.data[1].userId)
                private_userid_2 = getValueFromJsonObject(response.body, "$.data[?(@.email=='roomstest@mailinator.com')].userId")
                done();
            });
    });


    it.only('Create a Private Room  : POST /api/v1/rooms/add', (done) => {
        const room_private =
        {
            "data": {
                "roomId": "",
                "name": "Test Private Room",
                "roomType": "SINGLE",
                "description": "Test Private Room",
                "roomStartMilli": new Date().getTime(),
                "roomExipryMilli": (addTime(new Date(), 1)).getTime(),
                "joinPermission": "HIDDEN",
                "shareAVPermission": "MODERATED",
                "joinPermissionGroups": "",
                "avAcceptPermissionUsers": [
                    private_userid_1,
                    private_userid_2
                ],
                "roomCode": "",
                "isRecodingAllow": "NO",
                "maximumVideo": "12",
                "priority": "2",
                "banner": "",
                "exhibitor_id": "",
                "isRecodingEnableForModerator": 0,
                "exhibitor": "",
                "isFeatured": "YES",
                "isChat": "YES",
                "isQandA": "YES",
                "isModerateQandA": "NO",
                "isPolls": "YES",
                "isParticipant": "YES",
                "isRoomInfo": "NO"
            }
        }
        request
            .post('/api/v1/rooms/add')
            .set('organiserId', environment.HOrganiserId)
            // .set('eventId', process.env.eventid)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(room_private)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                roomid_private = (response.body.roomId)
                
                expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
                done();
            });
    });

    it.only('Get room join validation Private Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomid_private

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Private Room--------------------->

    it.only('Join Private Room : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomid_private,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidprivate = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Private Room')
        expect(response.body.success.data.joinPermission).to.equal('HIDDEN')
    });


    //<-----------------------Share Screen in Private Room-------------------->

    it.only('Share Screen in Private Room : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Private Room-------------------->

    it.only('Leave Share Screen in Private Room : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });


    //<-----------------------Join Validation with 2nd user--------->
    it.only('Get room join validation Private Room : POST /api/v2/rooms/join-validation', async () => {

        const community501 = {
            "payload": {
                "data": {
                    "roomId": roomid_specific

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join-validation', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community501)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_Validator_message)
    });

    //<-----------------------Join Private Room with 2nd Attendee--------------------->

    it.only('Join Private Room with 2nd Attendee : POST /api/v2/rooms/join', async () => {

        const joinPrivateRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomid_private,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinPrivateRoom)
        // roomchannelidsingle = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Private Room')
        expect(response.body.success.data.joinPermission).to.equal('HIDDEN')
    });

    //<-----------------------Share Screen in Private Room 2nd User-------------------->

    it.only('Share Screen in Private Room with 2nd User : POST /api/v2/rooms/screenShareJoin', async () => {

        const ShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareJoin', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', ShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_message)
    });

    //<-----------------------Leave Share Screen in Private Room 2nd User-------------------->

    it.only('Leave Share Screen in Private Room with 2nd User : POST /api/v2/rooms/screenShareLeave', async () => {

        const LeaveShareScreen = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/screenShareLeave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LeaveShareScreen)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Share_Screen_leave_message)
    });


    //<-----------------------Live User Private Room participants-------------------->

    it.only('Live Users in Private Room : POST /api/v2/rooms/liveUsers', async () => {

        const LiveUsers = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate,
                    "isSpectator": "NO",
                    "isParticipant": "YES",
                    "avStatus": "NO",
                    "isBan": "NO",
                    "isRaiseHand": "NO",
                    "page": 0,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/liveUsers', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', LiveUsers)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Live_User_message)
        expect(response.body.success.data.roomName).to.equal('Test Private Room')
    });

    //<-----------------------Leave Private Room with 2nd User--------------------->

    it.only('Leave Private Room : POST /api/v2/rooms/leave', async () => {
        const leaveprivateeroom = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/leave', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', leaveprivateeroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Leave_message)
    });

    //<-----------------------Join Private Room--------------------->

    it.only('Join Private Room : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomid_private,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidprivate = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Test Private Room')
        expect(response.body.success.data.joinPermission).to.equal('HIDDEN')
    });


    //<-----------------------End Private Room--------------------->

    it.only('End Private Room : POST /api/v2/rooms/endRoom', async () => {
        const Endingleroom = {
            "payload": {
                "data": {
                    "roomId": roomid_private,
                    "roomChannelId": roomchannelidprivate

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/endRoom', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Endingleroom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_End_rooms_message)
    });

    it.only('Filter Room with room purpose as single in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room =
        {
            "data": {
                "filter": {
                    "roomType": "SINGLE",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [],
                    "joinPermission": [],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(4)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].joinPermission).to.equal('HIDDEN')
        expect(response.body.data[3].name).to.equal('Test Single Room')
        expect(response.body.data[3].joinPermission).to.equal('ANYONE')
    });


    it.only('Filter Room with room purpose as Multiple in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "MULTIPLE",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [],
                    "joinPermission": [],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Room New Multiple')
        expect(response.body.data[0].roomType).to.equal('MULTIPLE')
    });


    it.only('Filter Room by Anyone to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "ANYONE"
                    ],
                    "joinPermission": [
                        "ANYONE"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Single Room')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room by Anyone to Moderator in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "MODERATED"
                    ],
                    "joinPermission": [
                        "ANYONE"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room by Specific group to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "ANYONE"
                    ],
                    "joinPermission": [
                        "GROUPS"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Specific Group Anyone')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('GROUPS')
    });


    it.only('Filter Room by Specific group to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "ANYONE"
                    ],
                    "joinPermission": [
                        "GROUPS"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Specific Group Anyone')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('GROUPS')
    });


    it.only('Filter Room by coded to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "ANYONE"
                    ],
                    "joinPermission": [
                        "CODED"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Room New Multiple')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('CODED')
    });


    it.only('Filter Room by Private to Moderator in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "ANYONE",
                        "MODERATED"
                    ],
                    "joinPermission": [
                        "HIDDEN"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].joinPermission).to.equal('HIDDEN')
    });


    it.only('Filter Room Type as Single and Join permission as Anyone in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "SINGLE",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [],
                    "joinPermission": [
                        "ANYONE"
                    ],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].roomType).to.equal('SINGLE')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });


    it.only('Filter Room Type as Single and Share AV permission as Moderator in dashbaord: POST /api/v1/rooms/list', async () => {

        const filter_room = {
            "data": {
                "filter": {
                    "roomType": "SINGLE",
                    "roomStartMilli": "",
                    "roomExipryMilli": "",
                    "shareAVPermission": [
                        "MODERATED"
                    ],
                    "joinPermission": [],
                    "roomStartTime": "",
                    "roomEndTime": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_room)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].roomType).to.equal('SINGLE')
        expect(response.body.data[1].shareAVPermission).to.equal('MODERATOR')
    });


    it.only('Search room by name: GET  /api/v1/rooms/list', async () => {

        const room_search = { "data": { "filter": {} } }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Anyone to Moderator' }, 'post', room_search)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
    });


    it.only('Search room by upper case character name: GET  /api/v1/rooms/list', async () => {

        const room_search = { "data": { "filter": {} } }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'ANYONE TO MODERATOR' }, 'post', room_search)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
    });


    it.only('Search room by lower case character name: GET  /api/v1/rooms/list', async () => {

        const room_search = { "data": { "filter": {} } }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'anyone to moderator' }, 'post', room_search)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
    });

    it.only('Search room by partial name: GET  /api/v1/rooms/list', async () => {

        const room_search = { "data": { "filter": {} } }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Moderator' }, 'post', room_search)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
    });

    it.only('Search room by wrong name: GET  /api/v1/rooms/list', async () => {

        const room_search = { "data": { "filter": {} } }

        var response = await sendRequest(environment.baseURL, '/api/v1/rooms/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name' }, 'post', room_search)
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Verify Rooms in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/stats', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.total_rooms).to.equal(5)
        expect(response.body.data.total_room_sessions).to.equal(6)
        expect(response.body.data.single_session_rooms).to.equal(4)
        expect(response.body.data.multiple_session_rooms).to.equal(1)
        expect(response.body.data.total_spectators).to.equal(8)
    });


    it.only('Verify Rooms Summary in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.total_count).to.equal(5)
        expect(response.body.data[0].roomName).to.equal('Test Private Room')
        expect(response.body.data[0].sessionCount).to.equal(1)
        expect(response.body.data[1].roomName).to.equal('Specific Group Anyone')
        expect(response.body.data[1].sessionCount).to.equal(1)
        expect(response.body.data[1].uniqueSpectators).to.equal(2)
        expect(response.body.data[4].roomName).to.equal('Test Single Room')
    });

    it.only('Verify Rooms meeting in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/meetings', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/meetings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.total_count).to.equal(6)
        expect(response.body.data.map(room => room.roomName)).to.include("Specific Group Anyone","Test Private Room")
    });

    it.only('Search Room summary by name in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'Test Private Room' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].roomName).to.equal('Test Private Room')
        expect(response.body.data[0].sessionCount).to.equal(1)
    });

    it.only('Search Room summary by upper case character name in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'TEST PRIVATE ROOM' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].roomName).to.equal('Test Private Room')
        expect(response.body.data[0].sessionCount).to.equal(1)
    });

    it.only('Search Room summary by lower case character name in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'test private room' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].roomName).to.equal('Test Private Room')
        expect(response.body.data[0].sessionCount).to.equal(1)
    });

    it.only('Search Room summary by partial name in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'Multiple' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].roomName).to.equal('Test Room New Multiple')
        expect(response.body.data[0].sessionCount).to.equal(1)
    });

    it.only('Search Room summary by wrong room name in Event Analytics in dashbaord: GET /api/v1/analytics/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'wrongname' }, 'get')
        expect(response.body.total_count).to.equal(0)
    });


    it.only('Download Room Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    });


    it.only('Download Private Room Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/rooms/summary', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/rooms/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'roomid': roomid_private }, 'get')
    });

    it.only('Verify Rooms in overview in dashbaord: POST /api/v1/event/overview/analytics/numbers', async () => {

        var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
        expect(response.body.data.total.room).to.equal(5)
    });


     //<-----------------------Search Room on Community------------------->

     it.only('Search Room : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "showLive": "NO",
                    "sort": 1,
                    "page": 1,
                    "limit": 20,
                    "input": "Test Single Room"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Test Single Room')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.success.data.rooms[0].userCount).to.equal(1)
        expect(response.body.success.data.rooms[0].spectatingCount).to.equal(1)
    });


    it.only('Search Room with upper case in community : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "showLive": "NO",
                    "sort": 1,
                    "page": 1,
                    "limit": 20,
                    "input": "ANYONE TO MODERATOR"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Anyone to Moderator')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal('MODERATED')
    });

    it.only('Search Room with lower case in community : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "showLive": "NO",
                    "sort": 1,
                    "page": 1,
                    "limit": 20,
                    "input": "anyone to moderator"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Anyone to Moderator')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal('MODERATED')
    });

    it.only('Search Room with partial name in community : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "showLive": "NO",
                    "sort": 1,
                    "page": 1,
                    "limit": 20,
                    "input": "Specific"
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Specific Group Anyone')
        expect(response.body.success.data.rooms[0].roomType).to.equal('SINGLE')
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.success.data.rooms[0].description).to.equal("Test Specific Group")
    });
    //<-----------------------Search Room on Community with Invalid name------------------->

    it.only('Search Room with invalid name : POST /api/v2/rooms', async () => {

        const roomlistcommunityv2 =
        {
            "payload": {
                "data": {
                    "input": "Wrong Name!@$$%^^&&(()_+_)",
                    "limit": 10,
                    "page": 1,
                    "showLive": "NO",
                    "sort": 0

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', roomlistcommunityv2);
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms).to.be.empty;
    });

   
    //<-----------------------Show live Room on Community------------------->

    it.only('Show live rooms : POST /api/v2/rooms', async () => {

        const showliverooms =
        {
            "payload": {
                "data": {
                    "showLive": "YES",
                    "sort": 1,
                    "page": 1,
                    "limit": 20
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', showliverooms)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_list_fatch)
        expect(response.body.success.data.rooms[0].name).to.equal('Specific Group Anyone')
        expect(response.body.success.data.rooms[0].isLive).to.equal("YES")
        expect(response.body.success.data.rooms[0].roomType).to.equal("SINGLE")
        expect(response.body.success.data.rooms[0].shareAVPermission).to.equal("ANYONE")

    });

    
    //<-----------------------Show live rooms off------------------->

    it.only('Toggle off Show live rooms: POST /api/v2/rooms', async () => {

        const showliveroomsoff =
        {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 1,
                    "showLive": "NO",
                    "sort": 0

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', showliveroomsoff)
        expect(response.body.success.data.rooms[0].name).to.equal("Test Single Room")
        expect(response.body.success.data.rooms[0].isLive).to.equal("NO")
        expect(response.body.success.data.rooms[1].name).to.equal("Anyone to Moderator")
        expect(response.body.success.data.rooms[1].isLive).to.equal("NO")
        expect(response.body.success.data.rooms[2].name).to.equal("Specific Group Anyone")
        expect(response.body.success.data.rooms[2].isLive).to.equal("YES")
        expect(response.body.success.data.rooms[3].name).to.equal("Test Private Room")
        expect(response.body.success.data.rooms[3].isLive).to.equal("NO")
    });

    //<-----------------------Sort Rooms A-Z------------------->

    it.only('Short Rooms A-Z : POST /api/v2/rooms', async () => {

        const shortroomsA_Z =
        {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 1,
                    "showLive": "NO",
                    "sort": 2

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', shortroomsA_Z)
        expect(response.body.success.data.rooms[0].name).to.equal("Anyone to Moderator")
        expect(response.body.success.data.rooms[0].isLive).to.equal("NO")
        expect(response.body.success.data.rooms[0].roomType).to.equal("SINGLE")
        expect(response.body.success.data.rooms[1].name).to.equal("Specific Group Anyone")
        expect(response.body.success.data.rooms[2].name).to.equal("Test Private Room")
    });
    
    //<-----------------------Sort Rooms with Date and Time------------------->

    it.only('Short Rooms Date and Time : POST /api/v2/rooms', async () => {
        const shortroomsdate_time =
        {
            "payload": {
                "data": {
                    "limit": 10,
                    "page": 1,
                    "showLive": "NO",
                    "sort": 1

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', shortroomsdate_time)
        expect(response.body.success.data.rooms[0].name).to.equal("Test Single Room")
        expect(response.body.success.data.rooms[0].isLive).to.equal("NO")
        expect(response.body.success.data.rooms[1].name).to.equal("Anyone to Moderator")
        expect(response.body.success.data.rooms[1].isLive).to.equal("NO")
        expect(response.body.success.data.rooms[2].name).to.equal("Specific Group Anyone")
        expect(response.body.success.data.rooms[2].isLive).to.equal("YES")
        expect(response.body.success.data.rooms[3].name).to.equal("Test Private Room")
        expect(response.body.success.data.rooms[3].isLive).to.equal("NO")
    });


    it.only('single booth add now : POST /backend/api/v2/events/booth/add', async () => {
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
              "name": "Rooms Booth",
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
      });
    

    it.only('List All Attendee  : POST /backend/api/v2/events/people/list', (done) => {
        request1
            .post('/backend/api/v2/events/people/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                modratorid = (response.body.data[1].userId)
                modratorid2 = getValueFromJsonObject(response.body, "$.data[?(@.email=='roomstest@mailinator.com')].userId")
                done();
            });
    });



    it.only('Add a single session room Anyone to Moderator to check for multiple moderator  : POST /api/v1/rooms/add', (done) => {
        const room1 =
        {
            "data": {
              "roomId": "",
              "name": "Room Multiple Moderator",
              "roomType": "MULTIPLE",
              "description": "Test Room Multiple Moderator",
              "roomStartMilli": null,
              "roomExipryMilli": null,
              "joinPermission": "ANYONE",
              "shareAVPermission": "MODERATED",
              "joinPermissionGroups": "",
              "avAcceptPermissionUsers": [
                modratorid,
                modratorid2
              ],
              "roomCode": "",
              "isRecodingAllow": "YES",
              "maximumVideo": "12",
              "priority": "8",
              "banner": "",
              "exhibitor_id": virtualboothid1,
              "isRecodingEnableForModerator": 0,
              "exhibitor": {
                "id": virtualboothid1,
                "name": "Rooms Booth"
              },
              "isFeatured": "NO",
              "isChat": "YES",
              "isQandA": "YES",
              "isModerateQandA": "YES",
              "isPolls": "YES",
              "isParticipant": "YES",
              "isRoomInfo": "YES",
              "isDominantColor": true
            }
          }

        request
            .post('/api/v1/rooms/add')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(room1)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                roomsingleid_modrate = (response.body.roomId)
                expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
                done();
            });
    });


    it.only('Join Moderator Room anyone to moderator single session : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidmoderate = (response.body.success.data.liveUserData[0].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Room Multiple Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.isModerator).to.equal("YES")
        expect(response.body.success.data.isModerateQandA).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });


    it.only('Join Moderator Room anyone to moderator single session with another user : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.access_token_login_user_room_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidmoderate2 = (response.body.success.data.liveUserData[1].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Room Multiple Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isModerator).to.equal("YES")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isModerateQandA).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });


    it.only('Get Room Info Moderator Room anyone to moderator single session : POST /api/v2/rooms/roomInfo', async () => {

        const joinModeratorRoom =
        {
            "payload": {
                "data": {
                    "id": roomsingleid_modrate
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/roomInfo', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_rooms_info_fetch_message)
        expect(response.body.success.data.roomDetails.name).to.equal('Room Multiple Moderator')
        expect(response.body.success.data.roomDetails.description).to.equal('Test Room Multiple Moderator')
        expect(response.body.success.data.partnerDetails.name).to.equal("Rooms Booth")
        expect(response.body.success.data.partnerDetails.category).to.equal("category")
        expect(response.body.success.data.roomDetails.moderatorData[0].firstName).to.equal("joker")
        expect(response.body.success.data.roomDetails.moderatorData[0].lastName).to.equal("clown")
        expect(response.body.success.data.roomDetails.moderatorData[1].firstName).to.equal("Room")
    });

    it.only('Add a Attendee', async () => {

        var people = new People();
        global.roomattendee = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'roomtest1@mailinator.com', 'user1', 'Test', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_moderate_participant = await signup.loginWithOtp(global.accessTokenLoginPage, 'roomtest1@mailinator.com', '1234')
      });
    

      it.only('Join Moderator Room anyone to moderator single session with attendee : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': global.accesstoken_moderate_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        roomchannelidmoderate3 = (response.body.success.data.liveUserData[2].roomChannelId)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Room Multiple Moderator')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("YES")
        expect(response.body.success.data.isModerator).to.equal("NO")
        expect(response.body.success.data.isParticipant).to.equal("YES")
        expect(response.body.success.data.isModerateQandA).to.equal("YES")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("YES")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });

    it.only('Ask a Question in Anyone to Moderator Room : POST /api/v2/common/create/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data":
                {
                    "question": "Hello this a Questions ?",
                    "isAnonymous": 0,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate3
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': global.accesstoken_moderate_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        Room_Question_id = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.comment).equal('Hello this a Questions ?')
        expect(response.body.success.data.moduleName).equal("Room Multiple Moderator")
        expect(response.body.success.data.isApproved).equal(0)
    });


    it.only('Approve a Question in Anyone to Moderator Room : POST /api/v2/common/answer/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id,
                    "action": 1,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.updated).equal(true)
        expect(response.body.success.data.moduleName).equal("Room Multiple Moderator")
    });

    it.only('Answer a Question in Anyone to Moderator Room by moderator : POST /api/v2/common/answer/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id,
                    "action": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "answer": "This is Good Ans",
                    "channelId": roomchannelidmoderate
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Answer_message)
        expect(response.body.success.data.updated).equal(true)
        expect(response.body.success.data.moduleName).equal("Room Multiple Moderator")
    });

    it.only('List All added Question in Anyone to Moderator Room to check approved status : POST /api/v2/common/list/question', async () => {

        const Question_Room_List =
        {
            "payload": {
                "data": {
                    "current_page": 0,
                    "sort": 1,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate3,
                    "limit": 10
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/list/question', { 'Authorization':global.accesstoken_moderate_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room_List)
        expect(response.body.success.data.isModerate).equal(true)
        expect(response.body.success.data.count).equal(1)
        expect(response.body.success.data.list[0].isApproved).equal(1)
        expect(response.body.success.data.list[0].comment).equal("Hello this a Questions ?")
        expect(response.body.success.data.list[0].answer).equal("This is Good Ans")
    });


    it.only('Again Ask a Question in Anyone to Moderator Room : POST /api/v2/common/create/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data":
                {
                    "question": "Hello this a latest Questions number two ?",
                    "isAnonymous": 0,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate3
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/create/question', { 'Authorization': global.accesstoken_moderate_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        Room_Question_id2 = response.body.success.data._id
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Add_message)
        expect(response.body.success.data.comment).equal('Hello this a latest Questions number two ?')
        expect(response.body.success.data.moduleName).equal("Room Multiple Moderator")
        expect(response.body.success.data.isApproved).equal(0)
    });

    it.only('Reject a Question in Anyone to Moderator Room : POST /api/v2/common/answer/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data": {
                    "questionId": Room_Question_id2,
                    "action": 2,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/common/answer/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Question_Reject_message)
        expect(response.body.success.data.updated).equal(true)
        expect(response.body.success.data.moduleName).equal("Room Multiple Moderator")
    });

    it.only('Get rejected list of questions : POST /api/v2/common/list/question', async () => {

        const Question_Room =
        {
            "payload": {
                "data": {
                    "current_page": 0,
                    "sort": 1,
                    "status": 3,
                    "moduleId": roomsingleid_modrate,
                    "moduleType": "ROOM",
                    "channelId": roomchannelidmoderate,
                    "limit": 10
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/common/list/question', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', Question_Room)
        expect(response.body.success.data.isModerate).equal(true)
        expect(response.body.success.data.count).equal(1)
        expect(response.body.success.data.list[0].user.firstName).equal("User1")
        expect(response.body.success.data.list[0].isApproved).equal(0)
        expect(response.body.success.data.list[0].comment).equal("Hello this a latest Questions number two ?")
    });

    it.only('Update a multiple session room Anyone to Moderator with isQandA/isPolls/isRoomInfo/isParticipant/isChat as false   : POST /api/v1/rooms/add', (done) => {
        const room1 =
        {
            "data": {
                "_id": roomsingleid_modrate,
                "event_id": process.env.eventid,
                "organiser_id": environment.HOrganiserId,
                "isQandA": "NO",
                "isPolls": "NO",
                "isRoomInfo": "NO",
                "isFeatured": "NO",
                "isChat": "NO",
                "isModerateQandA": "NO",
                "name": "Room Multiple Moderator Update",
                "description": "Test Room Multiple Moderator",
                "roomType": "MULTIPLE",
                "isParticipant": "NO",
                "maximumVideo": 12,
                "roomStartMilli": null,
                "roomExipryMilli": null,
                "joinPermission": "ANYONE",
                "shareAVPermission": "MODERATED",
                "roomCode": null,
                "priority": 8,
                "banner": "",
                "isRecodingAllow": "YES",
                "joinPermissionGroups": "",
                "avAcceptPermissionUsers": [
                    modratorid,
                    modratorid2
                ],
                "exhibitor_id": virtualboothid1,
                "dominantColor": "",
                "exhibitor": {
                    "id": virtualboothid1,
                    "name": "Rooms Booth"
                },
                "isDominantColor": false,
                "roomId": roomsingleid_modrate
            }
        }
        request
            .post('/api/v1/rooms/add')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('buildversion', process.env.buildversion)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(room1)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
                done();
            });
    });

    it.only('Verify isQandA/isPolls/isRoomInfo/isParticipant/isChat as false : POST /api/v2/rooms/join', async () => {

        const joinModeratorRoom =
        {
            "payload":
            {
                "data":
                {
                    "roomId": roomsingleid_modrate,
                    "options": {
                        "apiStore": {}
                    }
                }
            }
        }


        var response = await sendRequest(environment.baseURL3, '/api/v2/rooms/join', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', joinModeratorRoom)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Room_Join_message)
        expect(response.body.success.data.roomName).to.equal('Room Multiple Moderator Update')
        expect(response.body.success.data.joinPermission).to.equal('ANYONE')
        expect(response.body.success.data.isFeatured).to.equal("NO")
        expect(response.body.success.data.isChat).to.equal("NO")
        expect(response.body.success.data.isParticipant).to.equal("NO")
        expect(response.body.success.data.isRecodingAllow).to.equal("YES")
        expect(response.body.success.data.isModerator).to.equal("YES")
        expect(response.body.success.data.isModerateQandA).to.equal("NO")
        expect(response.body.success.data.shareAVPermission).to.equal("MODERATED")
        expect(response.body.success.data.isQandA).to.equal("NO")
        expect(response.body.success.data.maximumVideo).to.equal(12)
    });


    //Delete Rooms on Dashboard

    it.only('Delete Rooms : POST /api/v1/rooms/delete', (done) => {

        const RoomDelete =
        {
            "data": {
                "is_all": 0,
                "roomId": [roomid1, roomId2]
            }
        };

        request
            .post('/api/v1/rooms/delete')
            .set('limit', environment.HLimit)
            .set('organiserId', environment.HOrganiserId)
            .set('buildversion', process.env.buildversion)
            .set('eventId', process.env.eventid)
            // .set('eventid', process.env.eventid)
            .set('page', environment.HPage)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .send(RoomDelete)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_Room_post_delete_message);
                done();
            });
    });


    it.only('Delete user room test created for room purpose : POST /backend/api/v2/people/delete', (done) => {
        const delete1 =
        {
            "data": {

                "ids": [peopleid1,global.roomattendee],
                "is_all": 0

            }
        }
        request1
            .post('/backend/api/v2/people/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            .set('buildversion', process.env.buildversion)
            .send(delete1)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
                done();
            });
    });

  
    it.only('Delete all virtuabooths : POST /backend/api/v2/events/booth/delete', (done) => {
        const delete1 =
        {
          "data": {
    
            "booth_ids": [virtualboothid1],
            "is_all": 0
    
          }
        }
        request1
          .post('/backend/api/v2/events/booth/delete')
          .set('organiserId', environment.HOrganiserId)
          .set('eventId', process.env.eventid)
          .set('buildversion', process.env.buildversion)
          .set('Authorization', 'Bearer ' + process.env.eToken)
          .send(delete1)
          .end((err, response) => {
            consolelog(response);
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
            done();
          });
           
        });
       
});
