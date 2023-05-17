/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/export/delete/Join/leave meeting. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 16 Jan 2022 14:38 PM
Description: SWAT Test Cases Added for meeting
Modified: Pranjal Shah 17 Jan 2022 20:53 PM
Description: .only is added for  Delete user created for meeting purpose
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, addTime, People, organizerUserHeader, getValueFromJsonObject, ComunitySignupLogin, addDays } from '../../helper/CommonUtil'
require('dotenv').config();

var ticketid100
var ticketid102
var usermail1
var meetingnewid
var peopleid1
var peopleid2
var virtualboothid1

describe('Create, View and Join meetings', () => {
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

    // it.only('Get people on dashboard: POST /api/v1/people/list', async () => {
    //     var response = await sendRequest(environment.baseURL, '/api/v1/people/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
    //     ticketid100 = (response.body.data[0].userId)
    //     ticketid102 = (response.body.data[1].userId)
    //     usermail1 = (response.body.data[0].email)
    // });


    it.only('Add a Attendee for meeting', async () => {

        var people = new People();
        global.attendde_meeting_id = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'atttendee1@mailinator.com', 'flip', 'dety', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_meeting_participant1 = await signup.loginWithOtp(global.accessTokenLoginPage, 'atttendee1@mailinator.com', '1234')
    });


    it.only('Add a second Attendee for meeting', async () => {

        var people = new People();
        global.attendde_meeting_id1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'atttendee_meeting@mailinator.com', 'hezal', 'wood', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_moderate_participant2 = await signup.loginWithOtp(global.accessTokenLoginPage, 'atttendee_meeting@mailinator.com', '1234')
    });


    it.only('Create meeting in dashboard : POST /api/v2/meetings/schedule', async () => {
        const people1000 = {
            "data": {

                "is_send_confirmation_mail": 0,
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 1)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people1000)
        global.meetingid_general = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });

    var same_time = (addTime(new Date(), 2)).getTime()
    it.only('Create meeting to check same timings with same participant : POST /api/v2/meetings/schedule', async () => {
        const people1000 = {
            "data": {

                "is_send_confirmation_mail": 0,
                "meeting_description": "catch up now urgent",
                "meeting_time": same_time,
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people1000)
        global.meetingid_general1 = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });


    it.only('Creation of meeting on same day with same timings with same participant : POST /api/v2/meetings/schedule', async () => {
        const same_time_meet = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "same timings with same participant",
                "meeting_time": same_time,
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', same_time_meet)
        expect(response.body.status).to.equal(400)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_same_participant_message)
    });


    it.only('Creation of meeting with same participant at different time : POST /api/v2/meetings/schedule', async () => {
        const diff_time_meet = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "same participant at different time",
                "meeting_time": (addTime(new Date(), 0.5)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', diff_time_meet)
        global.meetingid_diff_time = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });

    it.only('Delete meetings : POST /backend/api/v2/meetings/delete', async () => {

        const delete1meet =
        {
            "data": {

                "filter": {},
                "is_all": 0,
                "meeting_ids": [global.meetingid_diff_time, global.meetingid_same_time,global.meetingid_general1],
                "search": ""

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1meet)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_delete_message);
    });

    it.only('Verify meeting in my-schedules->meeting: POST /api/v2/users/meetings', async () => {

        const community23 =
        {
            "payload": {
                "data": {
                    "timeZone": "Asia/Kolkata",
                    "limit": 10,
                    "offset": 1
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/meetings', { 'Authorization': global.accesstoken_meeting_participant1, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community23)
        expect(response.body.success.data.meetings.total).to.equal(1)
        expect(response.body.success.data.meetings.list[0].meetingStatus).to.equal("APPROVED")
        expect(response.body.success.data.meetings.list[0].slotDuration).to.equal("15")
        expect(response.body.success.data.meetings.list[0].message).to.equal("catch up now urgent")

    });

    it.only('Join meeting: POST /api/v2/meetings/one-to-one/join', async () => {

        const community2343 =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid_general
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/one-to-one/join', { 'Authorization': global.accesstoken_meeting_participant1, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2343)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_joined_message)
    });


    it.only('Leave meeting: POST /api/v2/meetings/one-to-one/leave', async () => {

        const community2343 =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid_general
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/one-to-one/leave', { 'Authorization': global.accesstoken_meeting_participant1, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2343)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_leave_message)
    });

    // GET Meeting

    it.only('Get meeting list on dashboard: POST /backend/api/v2/meetings/list', async () => {

        const getmeetingdash = {
            "data": {

                "filter": {}

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'limit': environment.HLimit, 'page': environment.HPage, 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', getmeetingdash)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].meetingStatus).to.equal("APPROVED")
        expect(response.body.data[0].message).to.equal("catch up now urgent")
        expect(response.body.data[0].isOnsite).to.equal(false)
    });


    it.only('Export meeting details to mentioned valid emails ids: POST /backend/api/v2/meetings/export', async () => {
        const export_body =
        {
            "data":
            {
                "email_ids":
                    [
                        "rajeev1991@yopmail.com"
                    ]
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_Meeting_message);
    });

    it.only('Export meeting details to mentioned null as emails ids: POST /backend/api/v2/meetings/export', async () => {
        const export_body =
        {
            "data":
            {
                "email_ids":
                    [
                        null
                    ]
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_Meeting_message);
    });

    it.only('Export meeting details to mentioned blank emails ids: POST /backend/api/v2/meetings/export', async () => {
        const export_body =
        {
            "data":
            {
                "email_ids":
                    [
                        "  "
                    ]
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_Meeting_message);
    });


    it('Filter meeting by applying from and to date filter: POST /backend/api/v2/meetings/list', async () => {
        const export_body =
        {
            "data": {
                "filter": {
                    "from": new Date(),
                    "upto": new Date()
                }
            }
        }

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Dashboard_Export_Meeting_message);
    });


    // it.only('Get participant list : POST /backend/api/v2/events/people/list', async () => {

    //     var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/people/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    //     peopleid1 = (response.body.data[4].userId)
    //     peopleid2 = (response.body.data[5].userId)
    // });

    it.only('Filter meeting by single participant : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter": {
                    "participants"
                        : [global.attendde_meeting_id]
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Filter meeting by both participant in dashboard : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter": {
                    "participants"
                        : [global.attendde_meeting_id, global.attendde_meeting_id1]
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Filter meeting by status as approved in dashboard : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter":
                    { "status": "APPROVED" }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Filter meeting by status as pending dashboard : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter":
                    { "status": "PENDING" }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Filter meeting by status as rejected in dashboard : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter":
                    { "status": "REJECTED" }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Filter meeting by status as cancelled in dashboard : POST /backend/api/v2/meetings/list', async () => {
        const filter_meeting_body =
        {
            "data": {
                "filter":
                    { "status": "CANCELLED" }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', filter_meeting_body)
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Get meeting after click on clear filter  : POST /backend/api/v2/meetings/list', async () => {
        const clear_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', clear_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Search meeting with description  : POST /backend/api/v2/meetings/list', async () => {
        const clear_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'catch up now urgent' }, 'post', clear_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Search meeting with lower case description  : POST /backend/api/v2/meetings/list', async () => {
        const clear_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'catch up now urgent' }, 'post', clear_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Search meeting with upper case description  : POST /backend/api/v2/meetings/list', async () => {
        const clear_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'CATCH UP NOW URGENT' }, 'post', clear_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });


    it.only('Search meeting with partial description  : POST /backend/api/v2/meetings/list', async () => {
        const clear_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'catch up' }, 'post', clear_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });


    it.only('Search meeting with wrong description  : POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'hellotest' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Search meeting by partial name: POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'flip' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });


    it.only('Search meeting by name: POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'Flip Dety' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });

    it.only('Search meeting by lower case name: POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'flip dety' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });


    it.only('Search meeting by upper case name: POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'FLIP DETY' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].message).to.equal('catch up now urgent')
        expect(response.body.data[0].meetingStatus).to.equal('APPROVED')
    });


    it.only('Search meeting by wrong name: POST /backend/api/v2/meetings/list', async () => {
        const search_filter =
        {
            "data": {
                "filter":
                {
                    "status": "",
                    "participants": [],
                    "from": "", "upto": ""
                }
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'hellotest' }, 'post', search_filter)
        expect(response.body.total_count).to.equal(0)
    });


    it.only('Add range in meeting timing: POST /backend/api/v2/meetings/settings', async () => {
        const add_range =
        {
            "data": {
                "openSlots": [
                    {
                        "startMilli": (new Date()).getTime(),
                        "endMilli": (addTime(new Date(), 1)).getTime()
                    }
                ]
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_range_add_message)
    });


    it.only('Create meeting in time range : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "this is time range check",
                "meeting_time": (addTime(new Date(), 0.5)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingid1 = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Verify meeting in my-schedules->meeting: POST /api/v2/users/meetings', async () => {

        const community23 =

        {
            "payload": {
                "data": {
                    "limit": 5,
                    "offset": 1,
                    "timeZone": "asia/kolkata"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/meetings', { 'Authorization': global.accesstoken_moderate_participant2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community23)
        expect(response.body.success.data.meetings.total).to.equal(2)
        expect(response.body.success.data.meetings.list[0].meetingStatus).to.equal("APPROVED")
        expect(response.body.success.data.meetings.list[0].slotDuration).to.equal("15")
        expect(response.body.success.data.meetings.list[0].message).to.equal("this is time range check")

    });

    it.only('Join meeting from my-schedules->meeting: POST /api/v2/meetings/one-to-one/join', async () => {

        const community2343 =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid1
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/one-to-one/join', { 'Authorization': global.accesstoken_moderate_participant2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2343)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_joined_message)
        expect(response.body.success.data.slotDuration).to.equal("15")
    });

    it.only('Leave meeting my-schedules->meeting: POST /api/v2/meetings/one-to-one/leave', async () => {

        const community2343 =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid1
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/one-to-one/leave', { 'Authorization': global.accesstoken_moderate_participant2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2343)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_leave_message)
    });

    it.only('Again rejoin meeting from my-schedules->meeting: POST /api/v2/meetings/one-to-one/join', async () => {

        const community2343 =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid1
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/one-to-one/join', { 'Authorization': global.accesstoken_moderate_participant2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community2343)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_joined_message)
        expect(response.body.success.data.slotDuration).to.equal("15")
    });


    it.only('Create meeting in outside of time range : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 0.9)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_outside_range_message)
    });

    it.only('Edit range in meeting timing: POST /backend/api/v2/meetings/settings', async () => {
        const add_range =
        {
            "data": {
                "openSlots": [
                    {
                        "startMilli": (new Date()).getTime(),
                        "endMilli": (addTime(new Date(), 1)).getTime()
                    }
                ]
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_range_add_message)
    });

    it.only('Delete range in meeting range timing: POST /backend/api/v2/meetings/settings', async () => {
        const add_range =
            { "data": { "openSlots": [] } }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_range_delete_message)
    });

    it.only('Again try create meeting in outside of time range : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 0.9)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingid_outside_range = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.is_send_confirmation_mail).to.equal(1)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Get event-section details to get the section id : POST /api/v2/event-section/event-section/details', async () => {

        const event_section_create =
            { "data": { "showforMeeting": true } }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event_section_create)
        global.eventsectionid1 = (response.body.event_section_id)
        global.eventsectionvisiabilityid_attendee = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Attendee')].id")
        global.eventsectionid_atttendee = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Attendee')].event_section_id")
        global.mongodbid_atttendee = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Attendee')].mongodb_id")
        global.eventsectionvisiabilityid_speaker = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Speaker')].id")
        global.eventsectionid_speaker = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Speaker')].event_section_id")
        global.mongodbid_speaker = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Speaker')].mongodb_id")
        global.eventsectionvisiabilityid_boothmember = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Booth Member')].id")
        global.eventsectionid_boothmember = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Booth Member')].event_section_id")
        global.mongodbid_boothmember = getValueFromJsonObject(response.body, "$.eventSectionVisibility[?(@.name=='Booth Member')].mongodb_id")
    });


    it.only('Meeting visiability toggle off : POST /api/v2/event-section/event-section/show-hide', async () => {

        const meeting_create = {
            "data": {
                "event_section_id": global.eventsectionid1,
                "is_visible": 0,
                "isSubsection": false,
                "is_parent": 0
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/show-hide', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_visiablity_toggle_message)
        expect(response.body.all_subsection_hidden).to.equal(0)
    });

    it.only('Add a Attendee for meeting', async () => {

        var people = new People();
        global.meetingattendee = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'flipter@mailinator.com', 'flip', 'dety', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_meeting_attendee = await signup.loginWithOtp(global.accessTokenLoginPage, 'flipter@mailinator.com', '1234')
    });


    it.only('Add a second Attendee for meeting', async () => {

        var people = new People();
        global.meetingattendee2 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'woodter@mailinator.com', 'hezal', 'wood', [global.attendeegroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstoken_meeting_attendee2 = await signup.loginWithOtp(global.accessTokenLoginPage, 'woodter@mailinator.com', '1234')
    });

    it.only('Add a speaker and sign', async () => {

        var people = new People();
        global.peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'speakermeeting1@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup])
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        global.accesstokenspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'speakermeeting1@yopmail.com', '1234')
    });



    it.only('Add Virtual Booth : POST /backend/api/v2/events/booth/add', async () => {
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
        global.boothmemberid = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember@yopmail.com', 'OnboardingUser', 'boothmember', [global.boothmembergroup])
    });

    //   it.only('Sign in a booth member', async () => {

    //      var signup = new ComunitySignupLogin();
    //       global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    //       global.accesstokenboothuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker@yopmail.com', '1234')
    //   });

    it.only('Meeting visiability toggle on for Attendee and speaker and off for booth member : POST /api/v2/event-section/event-section/update/details', async () => {

        const meeting_create = {
            "data": {
                "visibility": [
                    {
                        "id": global.eventsectionvisiabilityid_attendee,
                        "is_visible": 1,
                        "name": "Attendee",
                        "event_section_id": global.eventsectionid_atttendee,
                        "mongodb_id": global.mongodbid_atttendee
                    },
                    {
                        "id": global.eventsectionvisiabilityid_speaker,
                        "is_visible": 1,
                        "name": "Speaker",
                        "event_section_id": global.eventsectionid_speaker,
                        "mongodb_id": global.mongodbid_speaker
                    },
                    {
                        "id": global.eventsectionvisiabilityid_boothmember,
                        "is_visible": 0,
                        "name": "Booth Member",
                        "event_section_id": global.eventsectionid_boothmember,
                        "mongodb_id": global.mongodbid_boothmember
                    }
                ],
                "eventSectionDetails": {
                    "label": "Meetings",
                    "is_visible": 1,
                    "event_section_icon_id": 10,
                    "event_section_id": global.eventsectionid1,
                    "isSubsection": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_section_visiablity_group_message)
    });


    it.only('Meeting visiability toggle on for Speaker and booth member and off for attendee : POST /api/v2/event-section/event-section/update/details', async () => {

        const meeting_create = {
            "data": {
                "visibility": [
                    {
                        "id": global.eventsectionvisiabilityid_attendee,
                        "is_visible": 0,
                        "name": "Attendee",
                        "event_section_id": global.eventsectionid_atttendee,
                        "mongodb_id": global.mongodbid_atttendee
                    },
                    {
                        "id": global.eventsectionvisiabilityid_speaker,
                        "is_visible": 1,
                        "name": "Speaker",
                        "event_section_id": global.eventsectionid_speaker,
                        "mongodb_id": global.mongodbid_speaker
                    },
                    {
                        "id": global.eventsectionvisiabilityid_boothmember,
                        "is_visible": 1,
                        "name": "Booth Member",
                        "event_section_id": global.eventsectionid_boothmember,
                        "mongodb_id": global.mongodbid_boothmember
                    }
                ],
                "eventSectionDetails": {
                    "label": "Meetings",
                    "is_visible": 1,
                    "event_section_icon_id": 10,
                    "event_section_id": global.eventsectionid1,
                    "isSubsection": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_section_visiablity_group_message)
    });


    it.only('Meeting visiability toggle on for Attendee and booth member and off for speaker : POST /api/v2/event-section/event-section/update/details', async () => {

        const meeting_create = {
            "data": {
                "visibility": [
                    {
                        "id": global.eventsectionvisiabilityid_attendee,
                        "is_visible": 1,
                        "name": "Attendee",
                        "event_section_id": global.eventsectionid_atttendee,
                        "mongodb_id": global.mongodbid_atttendee
                    },
                    {
                        "id": global.eventsectionvisiabilityid_speaker,
                        "is_visible": 0,
                        "name": "Speaker",
                        "event_section_id": global.eventsectionid_speaker,
                        "mongodb_id": global.mongodbid_speaker
                    },
                    {
                        "id": global.eventsectionvisiabilityid_boothmember,
                        "is_visible": 1,
                        "name": "Booth Member",
                        "event_section_id": global.eventsectionid_boothmember,
                        "mongodb_id": global.mongodbid_boothmember
                    }
                ],
                "eventSectionDetails": {
                    "label": "Meetings",
                    "is_visible": 1,
                    "event_section_icon_id": 10,
                    "event_section_id": global.eventsectionid1,
                    "isSubsection": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_section_visiablity_group_message)
    });


    it.only('Update meeting visiability toggle on for all group : POST /api/v2/event-section/event-section/update/details', async () => {

        const meeting_create = {
            "data": {
                "visibility": [
                    {
                        "id": global.eventsectionvisiabilityid_attendee,
                        "is_visible": 1,
                        "name": "Attendee",
                        "event_section_id": global.eventsectionid_atttendee,
                        "mongodb_id": global.mongodbid_atttendee
                    },
                    {
                        "id": global.eventsectionvisiabilityid_speaker,
                        "is_visible": 1,
                        "name": "Speaker",
                        "event_section_id": global.eventsectionid_speaker,
                        "mongodb_id": global.mongodbid_speaker
                    },
                    {
                        "id": global.eventsectionvisiabilityid_boothmember,
                        "is_visible": 1,
                        "name": "Booth Member",
                        "event_section_id": global.eventsectionid_boothmember,
                        "mongodb_id": global.mongodbid_boothmember
                    }
                ],
                "eventSectionDetails": {
                    "label": "Meetings",
                    "is_visible": 1,
                    "event_section_icon_id": 10,
                    "event_section_id": global.eventsectionid1,
                    "isSubsection": false
                }
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_section_visiablity_group_message)
    });


    it.only('Creation of Meeting on same day with same timings different participant : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                "participant1": global.meetingattendee,
                "participant2": global.meetingattendee2
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingid_diff_part = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.is_send_confirmation_mail).to.equal(1)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Creation of Meeting on same day with different timings different participant : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "meeting with different partcipant",
                "meeting_time": (addTime(new Date(), 1)).getTime(),
                "participant1": global.meetingattendee2,
                "participant2": global.peopleId
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingid_diff_part2 = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.is_send_confirmation_mail).to.equal(1)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Verify meeting in my schedule calander: POST /api/v2/users/meetings', async () => {

        const cancel_meeting =
        {
            "payload": {
                "data": {
                    "timeZone": "Asia/Kolkata",
                    "startDateTime": new Date().getTime(),
                    "endStartTime": (addDays(new Date(), 3)).getTime(),
                    "isCalenderDisplay": true
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/meetings', { 'Authorization': global.accesstoken_meeting_attendee2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', cancel_meeting)
        expect(response.body.success.data.meetings[0].slotDuration).to.equal("15")
        expect(response.body.success.data.meetings[0].meetingStatus).to.equal("APPROVED")
    });

    it.only('Cancel meeting in my schedule: POST /api/v2/attendee/cancel-meet', async () => {

        const cancel_meeting =
        {
            "payload": {
                "data": {
                    "meetingId": global.meetingid_diff_part,
                    "reason": "cancel this meeting"
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/cancel-meet', { 'Authorization': global.accesstoken_meeting_attendee2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', cancel_meeting)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_cancel_message)
    });

    it.only('Create meeting in to check single delete functionality: POST /api/v2/meetings/schedule', async () => {
        const people1000 = {
            "data": {

                "is_send_confirmation_mail": 0,
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 1)).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people1000)
        global.meetingid_single_delete = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });


    it('Send Meeting Request: POST /api/v2/attendee/meet', async  () => {

        const meetingrequest = {
            "payload": {
                "data": {
                    "slotDuration": 15,
                    "meetingDate":  new Date().getTime(),
                    "message": "Hi  joker, I would like to connect with you.",
                    "numberOfSlots": 1,
                    "meetingStartTime": new Date().getTime(),
                    "meetingEndTime": (addTime(new Date(), 1)).getTime()
                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', people1000)

        request3
            .post('/api/v2/attendee/' + getAttendees + '/meet')
            .set('Authorization', process.env.accesstokenloginusernotification)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(meetingrequest)
            .end((err, response) => {
                // consolelog(response)
                console.log(response.body)
                expect(response.status).to.equal(200)
                expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_community_Add_message)
                // getAttendees = (response.body.data.attendees[0])
                // console.log(getAttendees)
                done();
            });
    });

    // Swat case
    it.only('Add range in meeting timing: POST /backend/api/v2/meetings/settings', async () => {
        const add_range =
        {
            "data": {
                "openSlots": [
                    {
                        "startMilli": (new Date()).getTime(),
                        "endMilli": (addTime(new Date(), 1)).getTime()
                    }
                ]
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', add_range)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_range_add_message)
    });

    it.only('Create meeting at exact start time of time range : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "this is time range check",
                "meeting_time": (new Date()).getTime(),
                "participant1": global.attendde_meeting_id,
                "participant2": global.attendde_meeting_id1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingidstrat1 = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Add a Attendee for meeting', async () => {

        var people = new People();
        global.attendde_meeting_id_end = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'atttendee1end@mailinator.com', 'meetuser', 'end1', [global.attendeegroup])
        // var signup = new ComunitySignupLogin();
        // global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        // global.accesstoken_meeting_participant1 = await signup.loginWithOtp(global.accessTokenLoginPage, 'atttendee1end@mailinator.com', '1234')
    });

    it.only('Add a second Attendee for meeting', async () => {

        var people = new People();
        global.attendde_meeting_id1_end = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'atttendee_meetingend@mailinator.com', 'meeting', 'end2', [global.attendeegroup])
        // var signup = new ComunitySignupLogin();
        // global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
        // global.accesstoken_moderate_participant2 = await signup.loginWithOtp(global.accessTokenLoginPage, 'atttendee_meetingend@mailinator.com', '1234')
    });

    it.only('Create meeting at exact end time of time range : POST /api/v2/meetings/schedule', async () => {
        const meeting_create = {
            "data": {

                "is_send_confirmation_mail": 1,
                "meeting_description": "this is time range check end time",
                "meeting_time": (addTime(new Date(), 0.7)).getTime(),
                "participant1": global.attendde_meeting_id_end,
                "participant2": global.attendde_meeting_id1_end
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v2/meetings/schedule', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', meeting_create)
        global.meetingidendendtime = (response.body.data.meeting_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
        expect(response.body.data.meeting.slotDuration).to.equal("15")
        expect(response.body.data.meeting.meetingStatus).to.equal("APPROVED")
        expect(response.body.data.meeting.isOnsite).to.equal(false)
    });

    it.only('Update/Block calander slot for meeting: POST /api/v2/users/update-my-calender-slot', async () => {
        
            var today = new Date();
            var dateTime = today.setDate(today.getDate() + 1)

        const update_slot =
        {
            "payload": {
                "data": {
                    "slotsAdd": {
                        "meetingDate": dateTime,
                        "meetingEndTimeMilli": (addTime(new Date(), 1)).getTime(),
                        "meetingStartTimeMilli": new Date().getTime()
                    }
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/update-my-calender-slot', { 'Authorization': global.accesstoken_meeting_attendee2, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', update_slot)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_meeting_update_calender_message)
    });

    // DELETE Meeting

    it.only('Verify delete functionality of one meeting : POST /backend/api/v2/meetings/delete', async () => {

        const delete1meet =
        {
            "data": {

                "filter": {},
                "is_all": 0,
                "meeting_ids": [global.meetingid_single_delete],
                "search": ""

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1meet)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_delete_message);
    });



    it.only('Verify delete functionality of multiple meetings : POST /backend/api/v2/meetings/delete', async () => {

        const delete1meet =
        {
            "data": {

                "filter": {},
                "is_all": 0,
                "meeting_ids": [global.meetingid1, global.meetingid2],
                "search": ""

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', delete1meet)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_delete_message);
    });

    it.only('Delete user created for meeting purpose : POST /backend/api/v2/people/delete', async () => {
        const delete1 =
        {
            "data": {

                "ids": [global.attendde_meeting_id, global.attendde_meeting_id1, global.meetingattendee, global.meetingattendee2, global.peopleId, global.boothmemberid],
                "is_all": 0

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
    });

    it.only('Delete virtuabooth : POST /backend/api/v2/events/booth/delete', async () => {
        const deleteBooth =
        {
            "data": {

                "booth_ids": [global.virtualboothid1],
                "is_all": 0

            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', deleteBooth)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
    });

});
