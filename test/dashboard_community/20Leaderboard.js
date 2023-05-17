/*
Author: Gaurav Thapar
Description: This Script will get search/verify/update leaderboard
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 06th Oct 2021 03:10 PM
Description : Add awards test cases added.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest } from '../../helper/CommonUtil'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
const request3 = supertest(environment.baseURL3);
require('dotenv').config();

var settingid1

describe('Search, Verify, Update Leaderboard', () => {

    it('200: Positive: Reset Leaderbaord : POST /api/v1/leaderboard/reset', async () => {
        var response = await sendRequest(environment.baseURL,'/api/v1/leaderboard/reset',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post')
        expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_post_Reset_message)
    });

    // it('200: Positive: Reset Leaderbaord : POST /api/v1/leaderboard/reset', (done) => {
    //     request
    //         .post('/api/v1/leaderboard/reset')
    //         .set('organiserId', environment.HOrganiserId)
    //         // .set('eventId', process.env.eventid)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         // .send(ExhibitorsLoungedata)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_post_Reset_message)
    //             done();
    //         });
    // });


    //Search Leaderbaord

    //200: Positive: Search Leaderbaord : POST backend/api/v2/leaderboard/people/list

    it.only('Search Leaderbaord : POST backend/api/v2/leaderboard/people/list', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/leaderboard/people/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post')
        // expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_post_Reset_message)
    });

    // it.only('Search Leaderbaord : POST backend/api/v2/leaderboard/people/list', (done) => {
    //     request1
    //         .post('/backend/api/v2/leaderboard/people/list')
    //         .set('organiserId', environment.HOrganiserId)
    //         // .set('eventId', process.env.eventid)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .set('search', 'Clown 89')
    //         // .send(ExhibitorsLoungedata)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_post_Reset_message)
    //             done();
    //         });
    // });


    //Show /Hide leaderboard
    //200: Positive: Show /Hide leaderboard : PUT backend/api/v2/leaderboard/setting

    it('Show leaderboard : PUT backend/api/v2/leaderboard/settings', async () => {
        const HideLeaderboard =
        {
            "data":
            {
                "showLeaderboard": 1
            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/leaderboard/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'put',HideLeaderboard)
        expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    });

    // it('Show leaderboard : PUT backend/api/v2/leaderboard/settings', (done) => {
    //     const HideLeaderboard =
    //     {
    //         "data":
    //         {
    //             "showLeaderboard": 1
    //         }
    //     };
    //     request1
    //         .put('/backend/api/v2/leaderboard/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(HideLeaderboard)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    //             done();
    //         });
    // });

    //Show Leaderboard

    //200: Positive: Show /Hide leaderboard : POST backend/api/v2/leaderboard/settings

    it.only('Hide leaderboard : POST backend/api/v2/leaderboard/settings', async () => {
        const ShowLeaderboard =
        {
            "data":
            {
                "showLeaderboard": 0
            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/leaderboard/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'put',ShowLeaderboard)
        //expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    });

    // it.only('Hide leaderboard : POST backend/api/v2/leaderboard/settings', (done) => {
    //     const ShowLeaderboard =
    //     {
    //         "data":
    //         {
    //             "showLeaderboard": 0
    //         }
    //     };
    //     request1
    //         .put('/backend/api/v2/leaderboard/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('eventId', process.env.eventid)
    //         .set('buildversion', process.env.buildversion)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(ShowLeaderboard)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             //expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    //             done();
    //         });
    // });

    //Get Leaderboard Score Setting

    //200: Positive: Get Leaderboard Scrore : GET backend/api/v2/leaderboard/settings

    it.only('Get Leaderboard Scrore : GET backend/api/v2/leaderboard/settings', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/leaderboard/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
        settingid1 = (response.body.data.settings[0].id)
        console.log(settingid1, 'settingid print')
    });

    // it.only('Get Leaderboard Scrore : GET backend/api/v2/leaderboard/settings', (done) => {
    //     request1
    //         .get('/backend/api/v2/leaderboard/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         // .set('eventId', process.env.eventid)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // console.log(response.body.data.settings)
    //             settingid1 = (response.body.data.settings[0].id)
    //             console.log(settingid1, 'settingid print')
    //             done();
    //         });
    // });


    //Update Score

    //200: Positive: Update Score leaderboard : PUT backend/api/v2/leaderboard/settings

    it.only('Update Score leaderboard : PUT backend/api/v2/leaderboard/settings', async () => {
        const UpdateScore =
        {
            "data":
            {
                "id": settingid1,
                "score": 5
            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/leaderboard/settings',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'put',UpdateScore)
        expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    });

    // it.only('Update Score leaderboard : PUT backend/api/v2/leaderboard/settings', (done) => {
    //     const UpdateScore =
    //     {
    //         "data":
    //         {
    //             "id": settingid1,
    //             "score": 5
    //         }
    //     };
    //     request1
    //         .put('/backend/api/v2/leaderboard/settings')
    //         .set('organiserId', environment.HOrganiserId)
    //         .set('buildversion', process.env.buildversion)
    //         // .set('eventId', process.env.eventid)
    //         .set('eventId', process.env.eventid)
    //         .set('Authorization', 'Bearer ' + process.env.eToken)
    //         .send(UpdateScore)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Hide_message)
    //             done();
    //         });
    // });


    //Leaderboard Community v2 Reception

    //200: POSITIVE This will verify leaderboard on community: POST /api/v2/event/leaderboard

    it.only('Verify leaderboard list: POST /api/v2/event/leaderboard', async () => {
        // const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community23 =

        {
            "payload": {
                "data": {
                    "currentPage": 1,
                    "limit": 15,
                    "topUsers": "true"
                }
            }
        }
        console.log(community23, 'Verify Leaderboard')
        var response = await sendRequest(environment.baseURL3,'/api/v2/event/leaderboard',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',community23)
        // expect(response.body.success.data.currentUser).to.equal('catch up now urgent')
        console.log(response.body.success.data.currentUser.user.firstName)
        // expect(response.body.success.data.currentUser.firstName).to.equal('Clown')
        // process.env.meetingid = (response.body.success.data[0]._id)
        // console.log( process.env.meetingid, 'meeting id print')
    });

    // it.only('Verify leaderboard list: POST /api/v2/event/leaderboard', (done) => {
    //     // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    //     const community23 =

    //     {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 1,
    //                 "limit": 15,
    //                 "topUsers": "true"
    //             }
    //         }
    //     }
    //     console.log(community23, 'Verify Leaderboard')
    //     request3
    //         .post('/api/v2/event/leaderboard')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(community23)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.currentUser).to.equal('catch up now urgent')
    //             console.log(response.body.success.data.currentUser.user.firstName)
    //             // expect(response.body.success.data.currentUser.firstName).to.equal('Clown')
    //             // process.env.meetingid = (response.body.success.data[0]._id)
    //             // console.log( process.env.meetingid, 'meeting id print')
    //             done();
    //         });
    // });


    //Leaderboard Community v2 Side panel
    //200: POSITIVE This will verify meeting on community: POST /api/v2/event/leaderboard

    it.only('Verify leaderboard sidepanel: POST /api/v2/event/leaderboard', async () => {

        const community23 =

        {
            "payload": {
                "data": {
                    "currentPage": 0,
                    "limit": 15,
                    "topUsers": "false"
                }
            }
        }
        console.log(community23, 'leaderboard')
        var response = await sendRequest(environment.baseURL3,'/api/v2/event/leaderboard',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',community23)
        // expect(response.body.success.data.currentUser).to.equal('catch up now urgent')
        // console.log(response.body.success.data.currentUser.firstName)
        expect(response.body.success.data.currentUser.user.firstName).to.equal('joker')
        // process.env.meetingid = (response.body.success.data[0]._id)
        // console.log( process.env.meetingid, 'meeting id print')
    });

    // it.only('Verify leaderboard sidepanel: POST /api/v2/event/leaderboard', (done) => {

    //     const community23 =

    //     {
    //         "payload": {
    //             "data": {
    //                 "currentPage": 0,
    //                 "limit": 15,
    //                 "topUsers": "false"
    //             }
    //         }
    //     }
    //     console.log(community23, 'leaderboard')
    //     request3
    //         .post('/api/v2/event/leaderboard')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(community23)
    //         .end((err, response) => {
    //             consolelog(response)
    //             expect(response.status).to.equal(200)
    //             // expect(response.body.success.data.currentUser).to.equal('catch up now urgent')
    //             // console.log(response.body.success.data.currentUser.firstName)
    //             expect(response.body.success.data.currentUser.user.firstName).to.equal('joker')
    //             // process.env.meetingid = (response.body.success.data[0]._id)
    //             // console.log( process.env.meetingid, 'meeting id print')
    //             done();
    //         });
    // });

    //GET POINTS LIST

    it.only('Leaderboard points list : POST /api/v2/event/leaderboard/points', async () => {

        const getpointslist =

        {
            "payload": {}

        }
        var response = await sendRequest(environment.baseURL3,'/api/v2/event/leaderboard/points',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',getpointslist)
        //expect(response.body.success.data[0].points).to.equal('35')
        // expect(response.body.success.data[15].points).to.equal('7')
    });


    it.only('Add Awards in leaderboard : POST /api/v1/leaderboard/award', async () => {
        const Add_Award =
        {
            "data": {
              "leaderboardAwardTitle": "Award and Rewards",
              "leaderboardAwardText": "Award and Rewards"
            }
          }
        var response = await sendRequest(environment.baseURL,'/api/v1/leaderboard/award',{ 'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken },'post', Add_Award)
        expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Add_Award_message)
    });



    it.only('Add Awards in leaderboard : POST /api/v1/leaderboard/award', async () => {

        var max200 = 'Awardwin11'.repeat(20)
        var desc1000 = 'NewEvent11'.repeat(100)
        const Add_Award =
        {
            "data": {
              "leaderboardAwardTitle": max200,
              "leaderboardAwardText":  desc1000
            }
          }
        var response = await sendRequest(environment.baseURL,'/api/v1/leaderboard/award',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',Add_Award)
        expect(response.body.message).to.equal(Responsemessages.Parameter_leaderbaord_Add_Award_message)
    });

    // it.only('Leaderboard points list : POST /api/v2/event/leaderboard/points', (done) => {

    //     const getpointslist =

    //     {
    //         "payload": {}

    //     }
    //     request3
    //         .post('/api/v2/event/leaderboard/points')
    //         .set('Authorization', process.env.accesstokenloginuser)
    //         .set('Content-Type', 'application/json')
    //         .set('source', 'COMMUNITY')
    //         .send(getpointslist)
    //         .end((err, response) => {
    //             consolelog(response)
    //             //expect(response.body.success.data[0].points).to.equal('35')
    //             // expect(response.body.success.data[15].points).to.equal('7')
    //             done();
    //         });
    // });
});

