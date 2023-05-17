/*
Author: Pranjal Shah
Description: This Script will add/update/search/delete events.
Timestamp: 18th Sept 2021 11:30 AM
Modified: Pranjal Shah 21th Sept 2021 07:00 PM
Modified: Gaurav Thapar 24th Sept 2021 03:09 PM
Modified : Biswajit Pattanaik 24th Sept 2021 07:00 PM
Description: Added logic to delete the existing events before starting of the testcase execution.
Modified: Biswajit Pattanaik 28th Dec 2021 06:30 PM
Description: Fixed script issue swat event delete
Modified: Pranjal Shah 28th Jan 2021 13:10 PM
Description: Cookies lable checked for community login page.
Modified: Biswajit Pattanaik 12th Jan 2022 01:30 PM
Description: Fixed script issue qat1 event delete
*/

import environment from '../../config/environment';
import { expect } from 'chai'
import { sendRequest, Events, organizerUserHeader, getValueFromJsonObject } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();


var eventid1
var eventid2
var eventid3
var eventid4
var eventid5
var eventid6
var eventid7
var eventid8
var eventid9
var boun_eventid
var eventid_landingpage
var eventurl_landingpage
var communityv2url_landing


function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}

function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}

//Get list all all events on dashboad i,e (ongoing,upcoming,ended)
var getEventListFromDashboard = async () =>{
    var eventArr = [];
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/list',{'organiserId': environment.HOrganiserId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    eventArr=eventArr.concat(response.body.upcoming_events);
    eventArr=eventArr.concat(response.body.ongoing_events);
    eventArr=eventArr.concat(response.body.ended_events);
    return eventArr;
}


//Delete all the events in the eventList object
var deleteEventListFromDashboard = async(eventList) =>{
    for (var i=0;i<eventList.length;i++){
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'eventid': eventList[i].id }, 'post')
    }
}

var todayDate = new Date().toISOString().slice(0, 10);


describe('Create an Event and Sign-in to community', () => {

    beforeEach(function (done) {
        setTimeout(function(){
          done();
        }, environment.HTestDelay);
      });

    //<-changes by Biswajit for deleting events existing on dashboard before starting any testcase execution->


    before(async () => {
        var eventList
        if ((process.env.releaseenv == 'qat1' && environment.HOrganiserId == '376745') || (process.env.releaseenv == 'qat' && environment.HOrganiserId == '376745') || (process.env.releaseenv == 'release' && environment.HOrganiserId == '350112') || (process.env.releaseenv == 'swat' && environment.HOrganiserId == '350112')) {
            while((eventList = await getEventListFromDashboard()).length > 0){
                await deleteEventListFromDashboard(eventList);
            }
        }
    });

    //<-End of changes by Biswajit ->

    // -------------------Dashboard & community cases started-------------------------------

    it.only('Create a new event : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        process.env.eventid = await event.createEventOnDashboard(organizerUserHeader(), todayDate, 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Change settings for restrict access off & default code 1234: PUT /backend/api/v2/events/settings/login', async () => {
        const event8 = {
            "data": {
                "default_custom_otp": "1234",
                "is_allow_login": 1,
                "is_facebook": 1,
                "is_google": 1,
                "is_linkedin": 1,
                "is_restrict": 0,
                "is_signup": 1,
                "is_sso": 0,
                "is_sso_connected": false,
                "support_email": ""
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/login', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', event8)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Login_Setting_Update)
    });

    it.only('This will make event live: POST /api/v1/event/livestatus/update', async () => {

        const event7 = {
            "data": {
                "is_publish": 1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/livestatus/update', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event7)
        expect(response.body.message).to.equal(Responsemessages.Parameter_events_publish_message);
        process.env.eventurl = (response.body.data.url).split("/community")[0];
        console.log(process.env.eventurl)

    });

    it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {

        process.env.communityv2url = ((process.env.eventurl.split("https://")[1]))
        const community1 = {
            "payload": {
                "data": {
                    "url": process.env.communityv2url,
                    "app_version": "1.0.0",
                    "source": "COMMUNITY",
                    "device_type": "WEB",
                    "language": 34

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Content-Type': 'application/json' }, 'post', community1)

    });

    it.only('Verify Social links of event on community : POST /api/v2/platformNew/web-state-new', async () => {
        const verifydisplayfield =
        {
            "payload": {
                "data": {
                    "source": "COMMUNITY",
                    "url": process.env.communityv2url,
                    "app_version": "1.0.0",
                    "device_type": "WEB",
                    "language": 34
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
        expect(response.body.success.data.eventSettings.twitterUrl).to.equal('https://twitter.com')
        expect(response.body.success.data.eventSettings.linkedUrl).to.equal('https://linkedin.com')
        expect(response.body.success.data.eventSettings.websiteUrl).to.equal('https://google.com')
        expect(response.body.success.data.eventSettings.instagramUrl).to.equal('https://instagram.com')
        expect(response.body.success.data.eventSettings.description).to.equal("new")
        expect(response.body.success.data.gdpr.cookie_policy.label).to.equal('Cookie Policy')
        expect(response.body.success.data.eventSettings.name).to.equal(todayDate)

    })

    it.only('Verify timezoneId of event on community : POST /api/v2/platformNew/web-state-new', async () => {
        const verifydisplayfield =
        {
            "payload": {
                "data": {
                    "source": "COMMUNITY",
                    "url": process.env.communityv2url,
                    "app_version": "1.0.0",
                    "device_type": "WEB",
                    "language": 34
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
        expect(response.body.success.data.eventSettings.timezone.id).to.equal(94)
        expect(response.body.success.data.eventSettings.timezone.name).to.equal('Asia/Kolkata')
        expect(response.body.success.data.eventSettings.timezone.country).to.equal('India')
    })

    it.only('Search Event by wrong name: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrongevent' }, 'get')
        expect(response.body.total_count).to.equal(0)
    });

    it.only('Get the events list: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    });

    it.only('Create event with US timezone : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid5 = await event.createEventOnDashboard(organizerUserHeader(), 'US Timezone Event', 'US Timezone Event', startDate, endDate, 5, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it('Verify US timezone of event on community : POST /api/v2/platformNew/web-state-new', async () => {
        const verifydisplayfield =
        {
            "payload": {
                "data": {
                    "source": "COMMUNITY",
                    "url": process.env.communityv2url,
                    "app_version": "1.0.0",
                    "device_type": "WEB",
                    "language": 34
                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
        expect(response.body.success.data.eventSettings.timezone.id).to.equal(5)
        expect(response.body.success.data.eventSettings.timezone.name).to.equal('America/Los_Angeles')
        expect(response.body.success.data.eventSettings.timezone.country).to.equal('United States of America')
        expect(response.body.success.data.eventSettings.timezone.description).to.equal('(UTC -07:00) America/Los Angeles (PDT)')
        expect(response.body.success.data.eventSettings.description).to.equal("US Timezone Event")
        expect(response.body.success.data.eventSettings.name).to.equal("US Timezone Event")
    })

    it.only('Verify US timezone of event on dashboard: POST /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.ongoing_events[1].name).to.equal('US Timezone Event');
        expect(response.body.ongoing_events[1].timezone.id).to.equal(5);

    });

    it.only('Create event with US timezone America/Denver : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid6 = await event.createEventOnDashboard(organizerUserHeader(), 'US Timezone Event America/Denver', 'US Timezone Event America/Denver', startDate, endDate, 11, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Verify US timezone America/Denver event on dashboard: POST /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.ongoing_events[2].name).to.equal('US Timezone Event America/Denver');
        expect(response.body.ongoing_events[2].timezone.id).to.equal(11);

    });

    it.only('Create event with US timezone America/Chicago : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid7 = await event.createEventOnDashboard(organizerUserHeader(), 'US Timezone Event America/Chicago', 'US Timezone Event America/Chicago', startDate, endDate, 13, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Create event with US timezone America/Mexico_City : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid8 = await event.createEventOnDashboard(organizerUserHeader(), 'US Timezone Event America/Mexico_City', 'US Timezone Event America/Mexico_City', startDate, endDate, 14, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Create event with US timezone America/New_York : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid9 = await event.createEventOnDashboard(organizerUserHeader(), 'US Timezone Event America/New_York', 'US Timezone Event America/New_York', startDate, endDate, 19, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Create an event to check CRUD operation : POST /backend/api/v2/events', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid1 = await event.createEventOnDashboard(organizerUserHeader(), 'New event CURD', 'New event CURD', startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

      it.only('Update event name : POST /backend/api/v2/events/basicinfo', async () => {
        
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        await event.updateEventOnDashboard(organizerUserHeader(), eventid1, 'New event Update', 'New event CURD', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Search event by name: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'New event Update' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('New event Update')
    });

    it.only('Search event by upper case name: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'NEW EVENT UPDATE' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('New event Update')
    });

    it.only('Search event with lower case name: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'new event update' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('New event Update')
    });

    it.only('Search event by partial name: GET  /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'update' }, 'get')
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('New event Update')
    });

    it.only('Create an event with name 100 character and description with 4000 character : POST /backend/api/v2/events', async () => {

        var max100 = 'NewEvent11'.repeat(10)
        var desc4000 = 'NewEvent11'.repeat(400)
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid2 = await event.createEventOnDashboard(organizerUserHeader(), max100, desc4000, startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Create an event with name more 100 character and description with 4000 character : POST /backend/api/v2/events', async () => {

        var max100 = 'NewEvent11'.repeat(11)
        var desc4000 = 'NewEvent11'.repeat(401)
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        boun_eventid = await event.createEventOnDashboard(organizerUserHeader(), max100, desc4000, startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });
 
    it.only('Create an upcoming event : POST /backend/api/v2/events', async () => {

        var event = new Events();
        var startDate =  (addDays(new Date(), 1)).getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventid3 = await event.createEventOnDashboard(organizerUserHeader(), 'Upcoming New Event', 'Upcoming New Event', startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    });

    it.only('Verify an upcoming event : POST /backend/api/v2/events/list', async () => {


        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.upcoming_count).to.equal(1);
        expect(response.body.upcoming_events[0].name).to.equal('Upcoming New Event');
        expect(response.body.upcoming_events[0].timezone_id).to.equal(68);

    });

    it.only('Create an event with past date : POST /backend/api/v2/events', async () => {

        var event = new Events();
        var startDate =  (addDays(new Date(), -2)).getTime()
        var endDate = (addDays(new Date(), -1)).getTime()
        eventid4 = await event.createEventOnDashboard(organizerUserHeader(), 'New ended event', 'New ended event', startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
        global.endedEventId = eventid4
    });

    it.only('Verify an event with past date : POST /backend/api/v2/events/list', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.ended_count).to.equal(1);
        expect(response.body.ended_events[0].name).to.equal('New ended event');
    });


    it.only('Get list of all events : POST /backend/api/v2/events', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.total_count).to.equal(11);
    });


    it.only('Delete CRUD operation event : POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid1)

    });


    it.only('Delete event having name 100 character and description with 4000 character : POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid2)

    });

    it.only('Delete event having name with more than 100 character and description with 4000 character : POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), boun_eventid)

    });


    it.only('Delete Upcoming event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid3)

    });

    // it.only('Delete past date event: POST /backend/api/v2/events/delete', async () => {


    //     var event = new Events();
    //     await event.deleteEvent(organizerUserHeader(), eventid4)

    // });

    it.only('Delete US timezone event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid5)

    });


    it.only('Delete US timezone America/Denver event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid6)

    });

    it.only('Delete US timezone America/Chicago event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid7)

    });

    it.only('Delete US timezone America/Mexico_City event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid8)

    });

    it.only('Delete US timezone America/New_York event: POST /backend/api/v2/events/delete', async () => {


        var event = new Events();
        await event.deleteEvent(organizerUserHeader(), eventid9)

    });


    //<-----------Negative Cases added for event----------->

it.only('Create a event without name : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventOnDashboard(organizerUserHeader(), "", 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
});


it.only('Create a event without timezoneid : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var response = await event.createEventNegativeOnDashboard(organizerUserHeader(), "TestEvent", 'new', startDate, endDate, "", 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Create a event invaild timezoneid : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var response = await event.createEventNegativeOnDashboard(organizerUserHeader(), "TestEvent", 'new', startDate, endDate, "test11", 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event without passing event META type in json : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "TestEvent", 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event without passing event languages in json : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "Without Event Language", 'Without Event Language', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","","",34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event without passing base language in json : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "Without base Language", 'Without base Language', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","","","")
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event by passing invaild event type id in json : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "Without base Language", 'Without base Language', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',656,"",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event by passing event type id as string in json : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "event type id as string", 'event type id as string', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"test1","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event by passing invaild event languages in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild event languages", 'invaild event languages', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",657,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event by passing invaild base language in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild base language", 'invaild base language', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,765)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event by passing base language as string in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild base language", 'invaild base language', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,"test1")
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event by passing invaild start milli in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = 768688
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild start milli in json", 'invaild start milli in json', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event by passing invaild end milli in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = 765768
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild end milli in json", 'invaild end milli in json', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event by passing invaild start and end milli in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = 98749574
    var endDate = 765768
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "invaild start and end milli", 'invaild start and end milli', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event without passing start milli in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = ""
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "without passing start milli", 'without passing start milli', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event without passing end milli in json: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = ""
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "without passing end milli", 'without passing end milli', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});

it.only('Try to create event with no start and end time: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = ""
    var endDate = ""
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "with no start and end time", 'with no start and end time', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


it.only('Try to create event by passing invaild Social Engagement Links: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "passing invaild Social Engagement Links", 'passing invaild Social Engagement Links', startDate, endDate, 94, 'instagram', 'linkedin', 'twitter', 'google',"","",34,34)
    // expect(response.status).to.equal(400)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
});


// it.only('Try to create event without auth/organiser id: POST /backend/api/v2/events', async () => {
        
//     var event = new Events();
//     var startDate = new Date().getTime()
//     var endDate = (addDays(new Date(), 3)).getTime()
//     await event.createEventNegativeOnDashboard("","passing invaild Social Engagement Links", 'passing invaild Social Engagement Links', startDate, endDate, 94, 'instagram', 'linkedin', 'twitter', 'google',"","",34,34)
//     // expect(response.status).to.equal(400)
//     // expect(response.body.message).to.equal(Responsemessages.Parameter_events_timezoneid_invaild_message)
// });

it.only('Try to create an event more than three days : POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 6)).getTime()
    await event.createEventNegativeOnDashboard(organizerUserHeader(), "TestEvent", 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
});
    
  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    global.attendeegroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    global.boothmembergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    global.speakergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
  });


  
it.only('Create an event to check community login page on landing page: POST /backend/api/v2/events', async () => {
        
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    eventid_landingpage = await event.createEventOnDashboard(organizerUserHeader(), 'New event community landing page', 'New event community landing page', startDate, endDate, 68, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

});

it.only('This will make event live to check landing page: POST /api/v1/event/livestatus/update', async () => {

    const event7 = {
        "data": {
            "is_publish": 1
        }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/event/livestatus/update', { 'organiserId': environment.HOrganiserId, 'eventid': eventid_landingpage, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event7)
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_publish_message);
    eventurl_landingpage = (response.body.data.url).split("/community")[0];
    communityv2url_landing = ((process.env.eventurl.split("https://")[1]))

});

it.only('Get landing page configuration to check event is publish : POST /api/v2/landing-page/configuration', async () => {

    const get_landing_page_conf =
    {
      "payload": {
        "data": {
          "prevId": 0,
          "url":  communityv2url_landing.concat("/register")
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/landing-page/configuration',{ }, 'post', get_landing_page_conf)
   expect(response.body.success.code).to.equal("LOADED_CONFIGUARATION_SUCCESSFULLY");
   expect(response.body.success.data.communityPageShow).to.equal(true);
  });

  
  it.only('Unpublish Event in dashbaord: POST /api/v1/event/livestatus/update', async () => {
    const unpublish_event = 
    {"data":{"is_publish":0}}
      
    var response = await sendRequest(environment.baseURL, '/api/v1/event/livestatus/update', { 'organiserId': environment.HOrganiserId, 'eventId': eventid_landingpage, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', unpublish_event)
    expect(response.body.message).to.equal(Responsemessages.Parameter_unpublish_message)
   
  });

  it.only('Get landing page configuration to check event unpublish : POST /api/v2/landing-page/configuration', async () => {

    const get_landing_page_conf =
    {
      "payload": {
        "data": {
          "prevId": 0,
          "url":  communityv2url_landing.concat("/register")
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/landing-page/configuration',{ }, 'post', get_landing_page_conf)
   expect(response.body.success.code).to.equal("LOADED_CONFIGUARATION_SUCCESSFULLY");
   expect(response.body.success.data.communityPageShow).to.equal(false);
  });

});
