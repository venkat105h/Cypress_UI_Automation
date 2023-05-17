/*
Author: Biswajit Pattanaik
Description: This script will test matchmaking fields
Timestamp: 14th Dec 2021 05:00 PM
Modified: Biswajit Pattanaik 6th Jan 2022 09:30 AM
Description: Event section speaker category cases added
*/
import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
//import { consolelog, sendRequest, addDays  } from '../../helper/CommonUtil'
import * as WorkbookUtility from '../../helper/workbookCommonUtils.js'
import { consolelog, addDays, addTime, Events, ComunitySignupLogin, People, emailaddress, emailPassword, sendRequest, organizerUserHeader, getValueFromJsonObject, getValuesFromJsonObject } from '../../helper/CommonUtil'
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_email']
var mypassword = emailPassword[process.env.releaseenv + '_password']

var eventId
var eventUrl
var attendeeId1
var attendeegroup
var speakergroup
var boothmembergroup
var listOfEventSectionIds = []
var listOfEventSubSectionIds = []
var peopleList = []
var eventSectionVisibilityId
var categoryList = []
var speakerSettingObject
var attendeeSettingObject
var displayCategorySettingsId
var eventSectionProfileId = []

var labelList = [
  'Reception',
  'Event feed',
  'Agenda',
  'Exhibitors',
  'Lounge',
  'Leaderboard',
  'Happening now',
  'Rooms',
  'Engage',
  'People'
]

var meta_section_name_list = [
  'RECEPTION',
  'EVENT_FEED',
  'AGENDA',
  'VIRTUAL_BOOTH',
  'LOUNGE',
  'LEADERBOARD',
  'HAPPENING_NOW',
  'ROOMS',
  'ENGAGE',
  'PEOPLE'
]



const attendeeGroupCombinations = [
  {
    'attendeeVisibility' : 0,
    'speakerVisibility': 0,
    'boothmembervisibility':0
  },
  {
    'attendeeVisibility' : 1,
    'speakerVisibility': 0,
    'boothmembervisibility':0
  },
  {
    'attendeeVisibility' : 0,
    'speakerVisibility': 1,
    'boothmembervisibility':0
  },
  {
    'attendeeVisibility' : 0,
    'speakerVisibility': 0,
    'boothmembervisibility':1
  },
  {
    'attendeeVisibility' : 1,
    'speakerVisibility': 1,
    'boothmembervisibility':1
  }
]

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
    "position": 1,
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

const getJsonObjectFromArray = async (jsonArr, key, value) => {
  return jsonArr.filter(function(json){return json[key]==value})[0]
}

const updateOneEventAndVerify = (metaName, index) => {
  //Update event section hide and show and verify
  it.only('Hide event section - '+ metaName +' : POST /api/v2/event-section/event-section/show-hide', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "event_section_id": eventSection.id,
        "is_visible": 0,
        "isSubsection": false,
        "is_parent": 0
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/show-hide', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_hidden_success_message)
  });

  it.only('Verify the event section ' + metaName + ' is not visible on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    expect(response.body.success.data.webTab.map(map => map.eventSectionId)).to.not.include(eventSection.id)
  });

  it.only('Show event section - '+ metaName +' : POST /api/v2/event-section/event-section/show-hide', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "event_section_id": eventSection.id,
        "is_visible": 1,
        "isSubsection": false,
        "is_parent": 0
      }
    }
    var eventSection = getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/show-hide', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_hidden_success_message)
  });

  it.only('Verify the event section ' + metaName + ' is visible on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    expect(response.body.success.data.webTab.map(map => map.eventSectionId)).to.include(eventSection.id)
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
    expect(jsonObject.label).to.equal(eventSection.label)
  });

  it.only('Dashboard verify event section - '+ metaName +' details : POST /api/v2/event-section/event-section/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {"data":{"eventSection":eventSection.id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.label).to.equal(eventSection.label)
    expect(response.body.eventSectionMetaName).to.equal(metaName)
    expect(response.body.eventSectionMetaId).to.equal(eventSection.event_section_meta_id)
    expect(response.body.event_section_icon_id).to.equal(eventSection.icon_id)
    eventSectionVisibilityId = response.body.eventSectionVisibility.map(map=>map.id)
  });

  it.only('Dashboard update event section - '+ metaName +' icon and label details : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": eventSection.label + '2',
          "event_section_id": eventSection.id,
          "event_section_icon_id": (12 - eventSection.icon_id),
          "is_visible": 1,
          "isSubsection": false,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Dashboard verify event section - '+ metaName +' details for updated label and eventname : POST /api/v2/event-section/event-section/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {"data":{"eventSection":eventSection.id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.label).to.equal(eventSection.label+'2')
    expect(response.body.event_section_icon_id).to.equal((12 - eventSection.icon_id))
  });

  it.only('Verify the event section ' + metaName + ' is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    expect(response.body.success.data.webTab.map(map => map.eventSectionId)).to.include(eventSection.id)
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
    expect(jsonObject.label).to.equal(eventSection.label+'2')
  });

  verifyNegativeCasesForEventSectionUpdate(metaName)
  if(metaName!='PEOPLE'){
    attendeeGroupCombinations.forEach((combination)=>{
      updateAndVerifyGroupToggleForEventSection(metaName,index,combination)
    })
  }
  
}

const updateAndVerifyGroupToggleForEventSection = (metaName, index, combination)=> {
  it.only('Dashboard update event section - '+ metaName +' attendeeVisibility ' + combination.attendeeVisibility + ' speakerVisibility ' + combination.speakerVisibility + ' boothmemberVisibility ' + combination.boothmembervisibility + ' : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": eventSection.label + '2',
          "event_section_id": eventSection.id,
          "event_section_icon_id": eventSection.icon_id,
          "is_visible": 1,
          "isSubsection": false,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": combination.attendeeVisibility,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": combination.speakerVisibility,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": combination.boothmembervisibility,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Verify the event section ' + metaName + ' is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    var total_visibleToCount = combination.attendeeVisibility + combination.speakerVisibility + combination.boothmembervisibility
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
    
    if (total_visibleToCount==0){
      expect(jsonObject.visibleTo).to.be.undefined
    }
    else{
      expect(jsonObject.visibleTo.length).to.equal(total_visibleToCount)
      if(combination.attendeeVisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(attendeegroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(attendeegroup)

      if(combination.speakerVisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(speakergroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(speakergroup)

      if(combination.boothmembervisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(boothmembergroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(boothmembergroup)
    }
  });
}

const verifyNegativeCasesForEventSectionUpdate = (metaName) => {
  it.only('Dashboard update event section - '+ metaName +' - add 15 char label name : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": 'goood'.repeat(3),
          "event_section_id": eventSection.id,
          "event_section_icon_id": eventSection.icon_id,
          "is_visible": 1,
          "isSubsection": false,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Dashboard verify event section - '+ metaName +' details for updated label : POST /api/v2/event-section/event-section/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {"data":{"eventSection":eventSection.id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.label).to.equal('goood'.repeat(3))
  });

  it.only('Verify the event section ' + metaName + ' is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    expect(response.body.success.data.webTab.map(map => map.eventSectionId)).to.include(eventSection.id)
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
    expect(jsonObject.label).to.equal('goood'.repeat(3))
  });

  it('Dashboard update event section - '+ metaName +' - add 20 char label name and verify error : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": 'thisisgood'.repeat(2),
          "event_section_id": eventSection.id,
          "event_section_icon_id": eventSection.icon_id,
          "is_visible": 1,
          "isSubsection": false,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it('Dashboard update event section - '+ metaName +' - add blank label name and verify error : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": '',
          "event_section_id": eventSection.id,
          "event_section_icon_id": eventSection.icon_id,
          "is_visible": 1,
          "isSubsection": false,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });
}

const updateAndVerifyGroupToggleForEventSubSection = (metaName, index, combination)=> {
  it.only('Dashboard update event section - '+ metaName +' attendeeVisibility ' + combination.attendeeVisibility + ' speakerVisibility ' + combination.speakerVisibility + ' boothmemberVisibility ' + combination.boothmembervisibility + ' : POST /api/v2/event-section/event-section/update/details', async () => {
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": eventSection.label + '2',
          "event_section_id": eventSection.id,
          "event_section_icon_id": eventSection.icon_id,
          "is_visible": 1,
          "isSubsection": true,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": null
        },
        "profile": null,
        "displayCategory": null,
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": combination.attendeeVisibility,
            "name": "Attendee",
            "event_section_id": eventSection.id,
            "mongodb_id": attendeegroup
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": combination.speakerVisibility,
            "name": "Speaker",
            "event_section_id": eventSection.id,
            "mongodb_id": speakergroup
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": combination.boothmembervisibility,
            "name": "Booth Member",
            "event_section_id": eventSection.id,
            "mongodb_id": boothmembergroup
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Verify the event section ' + metaName + ' is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var eventSection = await getJsonObjectFromArray(listOfEventSectionIds, 'event_section_meta_name', metaName)
    var total_visibleToCount = combination.attendeeVisibility + combination.speakerVisibility + combination.boothmembervisibility
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
    
    if (total_visibleToCount==0){
      expect(jsonObject.visibleTo).to.be.undefined
    }
    else{
      expect(jsonObject.visibleTo.length).to.equal(total_visibleToCount)
      if(combination.attendeeVisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(attendeegroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(attendeegroup)

      if(combination.speakerVisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(speakergroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(speakergroup)

      if(combination.boothmembervisibility==0)
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(boothmembergroup)
      else
        expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(boothmembergroup)
    }
  });
}



describe('Settings>Event section test get list', () => {
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

  it.only('Create login token: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": myemail,
        "password": mypassword

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    process.env.eToken = (response.body.data.token)
    expect(response.body.data.userData.email).to.equal(myemail)
    //expect(response.body.data.userData.email).to.equal('')
  });

  it.only('Create new event everytime : POST /backend/api/v2/events', async ()=>{
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventForEventSectionSettings', 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
  })

  it.only('Change settings for restrict access off & default code 1234: PUT /backend/api/v2/events/settings/login', async () => {
    var event = new Events();
    await event.eventRestrictOffAddCustomOtp(organizerUserHeader(), eventId, '1234')
  });

  it.only('Make event live: POST /api/v1/event/livestatus/update', async () => {
    var event = new Events();
    eventUrl = await event.makeEventGoLive(organizerUserHeader(), eventId)
  });

  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    attendeegroup = (response.body.data[0].id)
    boothmembergroup = (response.body.data[1].id)
    speakergroup = (response.body.data[2].id)
  });

  // it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
  //   var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
  //   global.virtualboothid1 = (response.body.data.ids.exhibitor_id)
  //   expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  // });

  // it.only('Add a single attendee with mandatory parameters and login: POST /backend/api/v2/people/single', async () => {
  //   var people = new People();
  //   var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newSessionGroupTestattendee@yopmail.com', 'SessionTestAttendee', 'Attendee', [global.attendeegroup])
  //   global.sessionGroupTestSpeakerId = peopleId
  //   peopleList.push(peopleId)
  //   var signup = new ComunitySignupLogin();
  //   global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  //   global.accesstokensessionspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newSessionGroupTestattendee@yopmail.com', '1234')
  // })

  it.only('Add a single speaker with mandatory parameters and login: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'newSessionGroupTestSpeaker@yopmail.com', 'SessionTestSpeaker', 'Speaker', [speakergroup])
    global.sessionGroupTestSpeakerId = peopleId
    peopleList.push(peopleId)
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accesstokensessionspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newSessionGroupTestSpeaker@yopmail.com', '1234')
  })

  // it.only('Add a single boothmember with mandatory parameters and login: POST /backend/api/v2/people/single', async () => {
  //   var people = new People('boothmember', global.virtualboothid1);
  //   var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newSessionGroupTestBoothmember@yopmail.com', 'SessionTestBoothmember', 'Boothmember', [global.boothmembergroup])
  //   global.sessionGroupTestBoothmemberId = peopleId
  //   peopleList.push(peopleId)
  //   var signup = new ComunitySignupLogin();
  //   global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  //   global.accesstokensessionboothmemberuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newSessionGroupTestBoothmember@yopmail.com', '1234')
  // })

  it.only('Get event section settings : GET /backend/api/v2/events/settings/sections', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sections', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
  });

  it.only('Get event section details : POST /api/v2/event-section/event-section/list', async () => {
    const payload = {"data":{"getMobileView":false}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/list', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    listOfEventSectionIds = response.body.eventSection.map(function(map){ return {'id': map.event_section_id, 'label' : map.label, 'event_section_meta_name' : map.event_section_meta_name, 'event_section_meta_id': map.event_section_meta_id, 'icon_id' : map.event_section_icon_id, 'order_index' : map.order_index}})
    var arr = getValuesFromJsonObject(response.body, '$.eventSection[*].event_subsection_list').filter(function(elem){ return elem != null}).map(map=> JSON.parse(map))
    var a = [].concat.apply([], arr);
    listOfEventSubSectionIds = a.map(function(map){ return {'id': map.event_subsection_id, 'label' : map.label, 'event_section_meta_name' : map.event_section_meta_name, 'event_section_meta_id': map.event_section_meta_id, 'icon_id' : map.event_section_icon_id}})
    var PeopleObject = response.body.eventSection.filter(function(elem){ return elem.event_section_meta_name=='PEOPLE'})[0]
    attendeeSettingObject = JSON.parse(PeopleObject.event_subsection_list)[0] 
    speakerSettingObject = JSON.parse(PeopleObject.event_subsection_list)[1]
    expect(listOfEventSectionIds.map(map=>map.label)).to.have.ordered.members(labelList)
    expect(listOfEventSectionIds.map(map=>map.event_section_meta_name)).to.have.ordered.members(meta_section_name_list)
  });

  meta_section_name_list.forEach((meta_name, index) => {
    updateOneEventAndVerify(meta_name, index)
  });


  //Attendee group combination checks


  it.only('View attendee setting details : POST /api/v2/event-section/event-subsection/details', async () => {
    const payload = {"data":{"eventSubsection":attendeeSettingObject.event_subsection_id, "eventSectionMetaId":speakerSettingObject.event_section_meta_id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-subsection/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    eventSectionVisibilityId = response.body.eventSectionVisibility.map(map=>map.id)
    eventSectionProfileId = response.body.eventSectionProfile.map(map=>map.id)
  })

  attendeeGroupCombinations.forEach(function(combination){
    it.only('Dashboard update attendee event section with attendeeVisibility ' + combination.attendeeVisibility + ' speakerVisibility ' + combination.speakerVisibility + ' boothmemberVisibility ' + combination.boothmembervisibility + ' : POST /api/v2/event-section/event-section/update/details', async () => {
      const payload = {
        "data": {
          "eventSectionDetails": {
            "label": "Attendees",
            "event_section_id": attendeeSettingObject.event_subsection_id,
            "is_visible": null,
            "isSubsection": true,
            "show_loggedin_profile_only": null,
            "show_online_profile": null,
            "segregate_profile_into_tabs": null,
            "default_sort_order": "date"
          },
          "profile": [
            {
              "id": eventSectionProfileId[0],
              "order_index": 1,
              "is_visible": 1,
              "name": "Attendee",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": attendeegroup
            },
            {
              "id": eventSectionProfileId[1],
              "order_index": 2,
              "is_visible": 1,
              "name": "Speaker",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": speakergroup
            },
            {
              "id": eventSectionProfileId[2],
              "order_index": 3,
              "is_visible": 1,
              "name": "Booth Member",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": boothmembergroup
            }
          ],
          "displayCategory": null,
          "visibility": [
            {
              "id": eventSectionVisibilityId[0],
              "is_visible": combination.attendeeVisibility,
              "name": "Attendee",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": String(attendeegroup)
            },
            {
              "id": eventSectionVisibilityId[1],
              "is_visible": combination.speakerVisibility,
              "name": "Speaker",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": String(speakergroup)
            },
            {
              "id": eventSectionVisibilityId[2],
              "is_visible": combination.boothmembervisibility,
              "name": "Booth Member",
              "event_section_id": attendeeSettingObject.event_subsection_id,
              "mongodb_id": String(boothmembergroup)
            }
          ]
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
      expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
    });
  
    it.only('Verify the event sub section is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
      var signup = new ComunitySignupLogin();
      var response = await signup.getNewWebstateResponse(eventUrl)
      response = await signup.getNewWebstateResponse(eventUrl)
      var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name=='PEOPLE'})[0].eventSubsections[0]
      var total_visibleToCount = combination.attendeeVisibility + combination.speakerVisibility + combination.boothmembervisibility
      //var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
      
      if (total_visibleToCount==0){
        expect(jsonObject.visibleTo).to.be.an('array').that.is.empty
      }
      else{
        expect(jsonObject.visibleTo.length).to.equal(total_visibleToCount)
        if(combination.attendeeVisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(attendeegroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(attendeegroup)
  
        if(combination.speakerVisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(speakergroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(speakergroup)
  
        if(combination.boothmembervisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(boothmembergroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(boothmembergroup)
      }
    });
  
  })

  
  //Speaker group combination check
  

  it.only('View speaker setting details : POST /api/v2/event-section/event-subsection/details', async () => {
    const payload = {"data":{"eventSubsection":speakerSettingObject.event_subsection_id, "eventSectionMetaId":speakerSettingObject.event_section_meta_id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-subsection/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    eventSectionVisibilityId = response.body.eventSectionVisibility.map(map=>map.id)
  })

  attendeeGroupCombinations.forEach(function(combination){
    it.only('Dashboard update speaker event section with attendeeVisibility ' + combination.attendeeVisibility + ' speakerVisibility ' + combination.speakerVisibility + ' boothmemberVisibility ' + combination.boothmembervisibility + ' : POST /api/v2/event-section/event-section/update/details', async () => {
      const payload = {
        "data": {
          "eventSectionDetails": {
            "label": "Attendees",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "is_visible": null,
            "isSubsection": true,
            "show_loggedin_profile_only": null,
            "show_online_profile": null,
            "segregate_profile_into_tabs": null,
            "default_sort_order": "date"
          },
          "profile": null,
          "displayCategory": null,
          "visibility": [
            {
              "id": eventSectionVisibilityId[0],
              "is_visible": combination.attendeeVisibility,
              "name": "Attendee",
              "event_section_id": speakerSettingObject.event_subsection_id,
              "mongodb_id": String(attendeegroup)
            },
            {
              "id": eventSectionVisibilityId[1],
              "is_visible": combination.speakerVisibility,
              "name": "Speaker",
              "event_section_id": speakerSettingObject.event_subsection_id,
              "mongodb_id": String(speakergroup)
            },
            {
              "id": eventSectionVisibilityId[2],
              "is_visible": combination.boothmembervisibility,
              "name": "Booth Member",
              "event_section_id": speakerSettingObject.event_subsection_id,
              "mongodb_id": String(boothmembergroup)
            }
          ]
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
      expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
    });
  
    it.only('Verify the event sub section is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
      var signup = new ComunitySignupLogin();
      var response = await signup.getNewWebstateResponse(eventUrl)
      response = await signup.getNewWebstateResponse(eventUrl)
      var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name=='PEOPLE'})[0].eventSubsections[1]
      var total_visibleToCount = combination.attendeeVisibility + combination.speakerVisibility + combination.boothmembervisibility
      //var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name==metaName})[0]
      
      if (total_visibleToCount==0){
        expect(jsonObject.visibleTo).to.be.an('array').that.is.empty
      }
      else{
        expect(jsonObject.visibleTo.length).to.equal(total_visibleToCount)
        if(combination.attendeeVisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(attendeegroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(attendeegroup)
  
        if(combination.speakerVisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(speakergroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(speakergroup)
  
        if(combination.boothmembervisibility==0)
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.not.include(boothmembergroup)
        else
          expect(jsonObject.visibleTo.map(map => map.mongodbId)).to.include(boothmembergroup)
      }
    });
  
  })



  //Speaker Category tests

  it.only('Add speaker category : POST /backend/api/v2/events/general/speaker/cateogry/add', async () => {
    const payload = {"data":{"name":"category 1"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_speaker_category_add_message)
    expect(response.body.data.name).to.equal('category 1')
  });

  it.only('Add another speaker category : POST /backend/api/v2/events/general/speaker/cateogry/add', async () => {
    const payload = {"data":{"name":"category 2"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_speaker_category_add_message)
    expect(response.body.data.name).to.equal('category 2')
  });

  it.only('Verify category added : POST /backend/api/v2/events/general/speaker/cateogry/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/list', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.name)).to.have.members(['category 1','category 2'])
    categoryList = response.body.data
  });

  it.only('Update a single speaker with all parameters and category : PUT /backend/api/v2/people/single/edit', async () => {
    var people = new People();
    await people.updateSingleAttendee(organizerUserHeader(), eventId, global.sessionGroupTestSpeakerId, 'newSessionGroupTestSpeaker@yopmail.com', 'SessionTestSpeaker', 'Speaker', [speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [], categoryList[0].id)
  })

  it.only('View speaker setting details : POST /api/v2/event-section/event-subsection/details', async () => {
    const payload = {"data":{"eventSubsection":speakerSettingObject.event_subsection_id, "eventSectionMetaId":speakerSettingObject.event_section_meta_id}}
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-subsection/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    displayCategorySettingsId = response.body.eventSectionDisplayCategory.map(map => map.id)
    eventSectionVisibilityId = response.body.eventSectionVisibility.map(map=>map.id)
    expect(response.body.eventSectionDisplayCategory.length).to.equal(2)
    expect(response.body.eventSectionDisplayCategory[0].speaker_category_id).to.equal(categoryList[0].id)
    expect(response.body.eventSectionDisplayCategory[0].name).to.equal(categoryList[0].name)
    expect(response.body.eventSectionDisplayCategory[1].speaker_category_id).to.equal(categoryList[1].id)
    expect(response.body.eventSectionDisplayCategory[1].name).to.equal(categoryList[1].name)
  })

  it.only('Dashboard update event section speaker category visibility disable all categories : POST /api/v2/event-section/event-section/update/details', async () => {
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": "Speakers",
          "event_section_id": speakerSettingObject.event_subsection_id,
          "is_visible": null,
          "isSubsection": true,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": "name"
        },
        "profile": null,
        "displayCategory": [
          {
            "id": displayCategorySettingsId[0],
            "is_visible": 0,
            "order_index": 5,
            "exhibitor_category_name": null,
            "speaker_category_id": categoryList[0].id,
            "event_section_id": speakerSettingObject.event_subsection_id,
            "name": categoryList[0].name
          },
          {
            "id": displayCategorySettingsId[1],
            "is_visible": 0,
            "order_index": 5,
            "exhibitor_category_name": null,
            "speaker_category_id": categoryList[1].id,
            "event_section_id": speakerSettingObject.event_subsection_id,
            "name": categoryList[1].name
          }
        ],
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(attendeegroup)
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(speakergroup)
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(boothmembergroup)
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Verify the event section category list for speaker is visible : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name=='PEOPLE'})[0]
    expect(jsonObject.eventSubsections[1].speakerCategory.length).to.equal(0)
  });

  it.only('Dashboard update event section speaker category visibility enable one category : POST /api/v2/event-section/event-section/update/details', async () => {
    const payload = {
      "data": {
        "eventSectionDetails": {
          "label": "Speakers",
          "event_section_id": speakerSettingObject.event_subsection_id,
          "is_visible": null,
          "isSubsection": true,
          "show_loggedin_profile_only": null,
          "show_online_profile": null,
          "segregate_profile_into_tabs": null,
          "default_sort_order": "name"
        },
        "profile": null,
        "displayCategory": [
          {
            "id": displayCategorySettingsId[0],
            "is_visible": 1,
            "order_index": 5,
            "exhibitor_category_name": null,
            "speaker_category_id": categoryList[0].id,
            "event_section_id": speakerSettingObject.event_subsection_id,
            "name": categoryList[0].name
          },
          {
            "id": displayCategorySettingsId[1],
            "is_visible": 0,
            "order_index": 5,
            "exhibitor_category_name": null,
            "speaker_category_id": categoryList[1].id,
            "event_section_id": speakerSettingObject.event_subsection_id,
            "name": categoryList[1].name
          }
        ],
        "visibility": [
          {
            "id": eventSectionVisibilityId[0],
            "is_visible": 1,
            "name": "Attendee",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(attendeegroup)
          },
          {
            "id": eventSectionVisibilityId[1],
            "is_visible": 1,
            "name": "Speaker",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(speakergroup)
          },
          {
            "id": eventSectionVisibilityId[2],
            "is_visible": 1,
            "name": "Booth Member",
            "event_section_id": speakerSettingObject.event_subsection_id,
            "mongodb_id": String(boothmembergroup)
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v2/event-section/event-section/update/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_event_section_details_updated_message)
  });

  it.only('Verify the event section category list is visible on community post update : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    response = await signup.getNewWebstateResponse(eventUrl)
    var jsonObject = response.body.success.data.webTab.filter(function(elem){ return elem.event_section_meta_name=='PEOPLE'})[0]
    expect(jsonObject.eventSubsections[1].speakerCategory.length).to.equal(1)
    expect(jsonObject.eventSubsections[1].speakerCategory[0].speakerCategoryId).to.equal(categoryList[0].id)
    expect(jsonObject.eventSubsections[1].speakerCategory[0].speakerCategoryName).to.equal(categoryList[0].name)
  });



})

// describe('this is another test', () => {
//   console.log('inside another describe')
//   global.listOfEventSectionIds.forEach(function(events){
//     updateOneEventAndVerify(events)
//   })
// })