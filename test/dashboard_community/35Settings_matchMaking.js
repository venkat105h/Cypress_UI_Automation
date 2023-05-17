/*
Author: Biswajit Pattanaik
Description: This script will test matchmaking fields
Timestamp: 7th Dec 2021 07:30 PM
Modified : Biswajit Pattanaik 10th Dec 01:00 PM
Descriptions : Added negative cases for matchmaking settings
*/
import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
//import { consolelog, sendRequest, addDays  } from '../../helper/CommonUtil'
import * as WorkbookUtility from '../../helper/workbookCommonUtils.js'
import { consolelog, addDays, addTime, Events, ComunitySignupLogin, People, emailaddress, emailPassword, sendRequest, organizerUserHeader, getValueFromJsonObject } from '../../helper/CommonUtil'
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_email']
var mypassword = emailPassword[process.env.releaseenv + '_password']

var eventId
var eventUrl
var attendeeId1
var attendeegroup
var speakergroup
var boothmembergroup

var interest = [
  "Accounting",
  "Advertising",
  "Agriculture",
  "Banking",
  "Biotech",
  "Computer Science",
  "Construction",
  "Consulting",
  "Criminal Justice",
  "Culinary Arts",
  "Design",
  "Engineering",
  "Environment Conservation",
  "Finance",
  "Financial Services",
  "Fine, Visual, Performing Arts",
  "Food Management",
  "Government/Public Sector/Policy",
  "Graphic Arts",
  "Green Industries",
  "Healthcare",
  "Hospitality",
  "Human Resources",
  "Insurance",
  "Investment",
  "Management",
  "Manufacturing",
  "Marketing & Sales",
  "Multimedia Production",
  "PR and Media",
  "Packaging",
  "Research",
  "Security",
  "Social & Community Services",
  "Supply Chain",
  "Tourism",
  "Training and Development",
  "Urban Planning",
  "Writing and Publishing"
]
var industry = [
  "Accounting",
  "Advertising &Public Relations",
  "App Development",
  "Banking",
  "Business",
  "Civil Engineering",
  "Consulting",
  "Customer Service",
  "Data Science",
  "Education",
  "Electronics",
  "Entrepreneurship",
  "Environmental Science",
  "Events",
  "Fashion",
  "Film and Television",
  "Finance",
  "Freelancing",
  "Government",
  "HR",
  "Healthcare",
  "IT",
  "Industrial Engineering",
  "Insurance and Risk Management",
  "Legal Services",
  "Manufacturing",
  "Marketing",
  "Mechanical Engineering",
  "Media",
  "Medical Science",
  "Public Sector",
  "Publishing",
  "Retail",
  "Security",
  "Software Engineering",
  "Software Manufacturing",
  "Technical",
  "Trading",
  "Travel sector"
]

var lookingAndOffering = [
  "Accountant",
  "Admin",
  "Agency",
  "Analyst",
  "Assistant",
  "Caterers",
  "Consultant",
  "Content Writer",
  "Designer",
  "Event Planner",
  "Front-end Developer",
  "Intern",
  "Investors",
  "Java Developer",
  "Leads",
  "Manager",
  "Marketing Executive",
  "Office Manager",
  "On Site Supervisor",
  "Production Manager",
  "Receptionist",
  "Recommendations",
  "SEO Executive",
  "Salesperson",
  "Secretary",
  "Service Provider",
  "Skilled Labor",
  "Sponsors",
  "Supervisor",
  "operation specilist"
]

describe('Matchmaing field tests', () => {
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
    eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventForMatchMaking', 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
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


  it.only('Get match making settings : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.is_interest).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_industry).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_looking_for).to.equal(1)
    expect(response.body.data.matchMakingSettings.interest_name).to.equal('Interest')
    expect(response.body.data.matchMakingSettings.industry_name).to.equal('Industry')
  });

  it.only('Verify the default match making settings on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[0].type).to.equal('industry')
    expect(response.body.success.data.features[0].name).to.equal('industry')
    expect(response.body.success.data.features[0].isActive).to.equal('YES')
    expect(response.body.success.data.features[0].onboarding_title).to.equal('Which Industry do you belong to?')
    expect(response.body.success.data.features[1].type).to.equal('interest')
    expect(response.body.success.data.features[1].name).to.equal('Interest')
    expect(response.body.success.data.features[1].isActive).to.equal('YES')
    expect(response.body.success.data.features[1].onboarding_title).to.equal('Choose your Interests to be matched with like-minded people')
    expect(response.body.success.data.features[2].type).to.equal('looking_for')
    expect(response.body.success.data.features[2].name).to.equal('looking for')
    expect(response.body.success.data.features[2].isActive).to.equal('YES')
    expect(response.body.success.data.features[2].onboarding_title).to.equal('What are you offering or Looking for?')
    expect(response.body.success.data.features[3].type).to.equal('offering')
    expect(response.body.success.data.features[3].name).to.equal('offering')
    expect(response.body.success.data.features[3].isActive).to.equal('YES')
    expect(response.body.success.data.features[3].onboarding_title).to.equal('What are you offering or Looking for?')
  });

  it.only('Get list of interest field values : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.label).to.equal('Interest')
    expect(response.body.data.is_onboarding).to.equal(1)
    expect(response.body.data.is_mandatory).to.equal(0)
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(interest)
  });

  it.only('Get list of industry field values : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.label).to.equal('Industry')
    expect(response.body.data.is_onboarding).to.equal(1)
    expect(response.body.data.is_mandatory).to.equal(0)
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(industry)
  });

  it.only('Get list of looking for field values : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'get')
    expect(response.body.data.is_onboarding).to.equal(1)
    expect(response.body.data.is_mandatory).to.equal(0)
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(lookingAndOffering)
  });

  it.only('Get list of interest field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(interest)
  });

  it.only('Get list of industry field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(industry)
  });

  it.only('Get list of looking for field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(lookingAndOffering)
  });

  it.only('Get list of offering to field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(lookingAndOffering)
  });

  it.only('Add a single attendee with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    attendeeId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'attendee1@yopmail.com', 'attendee', 'people', [attendeegroup])
  })

  it.only('Login to community using otp for the new user (attendee1@yopmail.com): POST /api/v2/users/login', async () => {
    var signup = new ComunitySignupLogin();
    var accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accessTokenLoginAttendee = await signup.loginWithOtp(accessTokenLoginPage, 'attendee1@yopmail.com', '1234')
  })

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(interest)
  })

  it.only('Verify industry list on community : POST /api/v2/industry', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/industry?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.industry.map(map => map.name)).to.have.members(industry)
  })

  it.only('Verify looking for list on community : POST /api/v2/lookingfor', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/lookingfor', { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.lookingFor.map(map => map.name)).to.have.members(lookingAndOffering)
  })

  //Add and remove the interest field values

  it.only('Update interest lists add another interest value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("test")
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of interest field values post adding another value : GET /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(customInterest)
  });

  it.only('Get list of interest field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(customInterest)
  });

  it.only('Verify interest list on community post adding another value : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var customInterest = Array.from(interest)
    customInterest.push("test")
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(customInterest)
  })

  it.only('Save interests with only one value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": ['test1'],
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of interest field values post adding another value : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.members(['test1'])
  });

  it.only('Get list of interest field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.members(['test1'])
  });

  it.only('Verify interest list on community post adding another value : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(['test1'])
  })

  it.only('Update interest label : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": interest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest updated",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Verify interst updated label in match making settings : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.interest_name).to.equal('Interest updated')
  });

  it.only('Get list of interest field values : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.label).to.equal('Interest updated')
  });

  it.only('Verify the updated label on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[1].name).to.equal('Interest updated')
  });

  it.only('Update interest mandatory to true : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": interest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest updated",
        "is_mandatory": 1
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get interst matchmaking details verify mandatory to true : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.is_mandatory).to.equal(1)
  });

  it.only('Verify interst matchmaking mandatory on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.isInterestMandatory).to.equal('YES')
  });

  //Update industry field values

  it.only('Update industry lists add another industry value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customIndustry = Array.from(industry)
    customIndustry.push("test")
    var payload = {
      "data": {
        "match_making_values": customIndustry,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Industry",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of industry field values post adding another value : GET /backend/api/v2/events/matchmaking/details', async () => {
    var customIndustry = Array.from(industry)
    customIndustry.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(customIndustry)
  });

  it.only('Get list of industry field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var customIndustry = Array.from(industry)
    customIndustry.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.members(customIndustry)
  });

  it.only('Verify industry list on community post adding another value : POST /api/v2/industry', async () =>{
    const payload = {"payload":{"data":null}}
    var customIndustry = Array.from(industry)
    customIndustry.push("test")
    var response = await sendRequest(environment.baseURL3, '/api/v2/industry?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.industry.map(map => map.name)).to.have.members(customIndustry)
  })


  it.only('Update industry lists remove all keep one value only : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": ['test'],
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Industry",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of industry field values post update : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.members(['test'])
  });

  it.only('Get list of industry field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.members(['test'])
  });

  it.only('Verify industry list on community post adding only one value : POST /api/v2/industry', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/industry?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.industry.map(map => map.name)).to.have.members(['test'])
  })

  it.only('Update industry label : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": industry,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Industry updated",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Verify interst updated lable in match making settings : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.industry_name).to.equal('Industry updated')
  });

  it.only('Get list of interest field values : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.label).to.equal('Industry updated')
  });

  it.only('Verify the updated label on community : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[0].name).to.equal('Industry updated')
  });

  it.only('Update industry mandatory true : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": industry,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Industry updated",
        "is_mandatory": 1
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get industry matchmaking details verify mandatory : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.is_mandatory).to.equal(1)
  });

  it.only('Verify mandatory enabled on comunity for industry : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.isIndustryMandatory).to.equal('YES')
  });

  //Update looking for field values

  it.only('Update looking for/offering lists add another value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customLookingFor = Array.from(lookingAndOffering)
    customLookingFor.push("test")
    var payload = {
      "data": {
        "match_making_values": customLookingFor,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Looking For/Offering",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of lookingfor/offering field values post adding another value : GET /backend/api/v2/events/matchmaking/details', async () => {
    var customLookingFor = Array.from(lookingAndOffering)
    customLookingFor.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(customLookingFor)
  });

  it.only('Get list of looking for field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var customLookingFor = Array.from(lookingAndOffering)
    customLookingFor.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(customLookingFor)
  });

  it.only('Get list of offering field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var customLookingFor = Array.from(lookingAndOffering)
    customLookingFor.push("test")
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(customLookingFor)
  });

  it.only('Verify lookingfor list on community post adding another value : POST /api/v2/lookingfor', async () =>{
    const payload = {"payload":{"data":null}}
    var customLookingFor = Array.from(lookingAndOffering)
    customLookingFor.push("test")
    var response = await sendRequest(environment.baseURL3, '/api/v2/lookingfor', { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.lookingFor.map(map => map.name)).to.have.members(customLookingFor)
  })

  it.only('Update looking for/offering lists save only one value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": ['test1'],
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Looking For/Offering",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get list of looking for field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'looking', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(['test1'])
  });

  it.only('Get list of offering field values on add people : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'offering', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(['test1'])
  });

  it.only('Verify lookingfor list on community to have only one value : POST /api/v2/lookingfor', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/lookingfor', { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.lookingFor.map(map => map.name)).to.have.members(['test1'])
  })

  it.only('Update looking for/offering lists save only one value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": lookingAndOffering,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Looking For/Offering",
        "is_mandatory": 1
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Get looking for matchmaking details, verify mandatory : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    expect(response.body.data.is_mandatory).to.equal(1)
  });

  it.only('Verify mandatory enabled on comunity for industry : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.isLookingForMandatory).to.equal('YES')
  });

  it.only('Add one more static field to the case : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": lookingAndOffering,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Looking For/Offering",
        "is_mandatory": 1
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });


  //Static field test cases from people - interests

  it.only('Add another matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var payload = {"data":{"name":"Test","type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Verify new field is added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    var tmpList = Array.from(interest)
    tmpList.push('Test')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.members(tmpList)
  });

  it.only('Get list of interest field values and verify new value is present : GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    var tmpList = Array.from(interest)
    tmpList.push('Test')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.members(tmpList)
    global.staticFieldValueId = getValueFromJsonObject(response.body,"$.data.matchMakingData[?(@.name=='Test')].id")
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    var tmpList = Array.from(interest)
    tmpList.push('Test')
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(tmpList)
  })

  it.only('Update matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/update', async () => {
    var payload = {
      "data": {
        "name": "Test update",
        "id": global.staticFieldValueId,
        "type": "interest"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/update', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_update_message)
  });

  it.only('Verify updated field value added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    var tmpList = Array.from(interest)
    tmpList.push('Test update')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.members(tmpList)
  });

  it.only('Get list of interest field values and verify value is updated: GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    var tmpList = Array.from(interest)
    tmpList.push('Test update')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.members(tmpList)
    expect(getValueFromJsonObject(response.body,"$.data.matchMakingData[?(@.name=='Test update')].id")).to.equal(global.staticFieldValueId)
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    var tmpList = Array.from(interest)
    tmpList.push('Test update')
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(tmpList)
  })

  it.only('Delete matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/delete', async () => {
    var payload = {
      "data": {
        "name": "Test update",
        "id": global.staticFieldValueId,
        "type": "interest"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/delete', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_delete_message)
  });

  it.only('Verify deleted field value added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.have.ordered.members(interest)
  });

  it.only('Get list of interest field values and verify value is deleted: GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.have.ordered.members(interest)
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.have.members(interest)
  })

  //Negative test cases

  it.only('Add duplicate matchmaking static field for interest and verify error : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var payload = {"data":{"name":"Accounting","type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Add special characters to matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var payload = {"data":{"name":"Test!@#$%^&*()_+","type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Verify spcial character value added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.include("Test!@#$%^&*()_+")
  });

  it.only('Get list of interest field values and verify spcial character value: GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.include("Test!@#$%^&*()_+")
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include("Test!@#$%^&*()_+")
  })

  it.only('Add only digit to matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var payload = {"data":{"name":"0123456789","type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Verify value added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.include("0123456789")
  });

  it.only('Get list of interest field values and verify newly added value: GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.include("0123456789")
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include("0123456789")
  })

  it.only('Add a value with 50 characters to matchmaking static field for interest : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var text = 'thisisgood'.repeat(5)
    var payload = {"data":{"name":text,"type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Verify 50 character value added to the interests static field list : GET /backend/api/v2/people/staticfieldvalues', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':1 }, 'get')
    var list = response.body.data.map(map => map.name)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest', 'page':2 }, 'get')
    expect(list.concat(response.body.data.map(map => map.name))).to.include('thisisgood'.repeat(5))
  });

  it.only('Get list of interest field values and verify 50 character value: GET /backend/api/v2/events/matchmaking/details', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    expect(response.body.data.matchMakingData.map(map => map.name)).to.include('thisisgood'.repeat(5))
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include('thisisgood'.repeat(5))
  })

  it('Add a value with 55 characters to matchmaking static field for interest and verify error : POST /backend/api/v2/people/staticfieldvalues/add', async () => {
    var text = 'athisisgood'.repeat(5)
    var payload = {"data":{"name":text,"type":"interest"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/staticfieldvalues/add', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_matchmaking_static_field_add_message)
  });

  it.only('Update interest lists add duplicate interest value and verify error : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("Accounting")
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Update interest lists add special characters interest value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("Test!@#$%^&*()_+-=")
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include('Test!@#$%^&*()_+-=')
  })

  it.only('Update interest lists add only digits to interest value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push("0123456789")
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include('0123456789')
  })

  it.only('Update interest lists add 50 characters interest value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push('thisisgood'.repeat(5))
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Verify interest list on community : POST /api/v2/interest', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/interest?event_id=' + eventId, { 'Authorization': global.accessTokenLoginAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(response.body.success.data.interests.map(map => map.name)).to.include('thisisgood'.repeat(5))
  })

  it('Update interest lists add 55 characters interest value : POST /backend/api/v2/events/matchmaking/details', async () => {
    var customInterest = Array.from(interest)
    customInterest.push('athisisgood'.repeat(5))
    var payload = {
      "data": {
        "match_making_values": customInterest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Update interest label with 200 characters text : POST /backend/api/v2/events/matchmaking/details', async () => {
    var text="thisisgood".repeat(20)
    var payload = {
      "data": {
        "match_making_values": interest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": text,
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it('Update interest label with more than 200 characters text : POST /backend/api/v2/events/matchmaking/details', async () => {
    var text="thisisgood".repeat(20) + 'test'
    var payload = {
      "data": {
        "match_making_values": interest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": text,
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.not.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Update interest label save as Interest : POST /backend/api/v2/events/matchmaking/details', async () => {
    var payload = {
      "data": {
        "match_making_values": interest,
        "remove_all": 0,
        "is_onboarding": 1,
        "label": "Interest",
        "is_mandatory": 0
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'post', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_fields_message)
  });

  it.only('Onboarding with personal details add industry : POST /api/v2/users/on-board', async () => {

    const onbording1 = {
      "payload": {
        "data": {
          "userProfileFields": {},
          "groupValueArray": {},
          "firstName": "attendee1",
          "lastName": "people1",
          "gender": "male",
          "about": "",
          "designation": "",
          "organisation_name": "",
          "country": "",
          "state": "",
          "city": "",
          "industry": "IT"
        }
      }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee, onbording1)
  });

  it.only('Onboarding with looking & offering : POST /api/v2/users/on-board', async () => {
    const onBoarding4 = {
        "payload": {
            "data": {
                "lookingfor": "Assistant",
                "offering": "Admin"
            }
        }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee, onBoarding4)
  });

  it.only('Onboarding with interests : POST /api/v2/users/on-board', async () => {

    const onBoarding5 = {
        "payload": {
            "data": {
                "intrests": ["Advertising"],
                "isBoardingComplete": true
            }
        }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee, onBoarding5)

  });

  it.only('Add another attendee with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    attendeeId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'attendee2@yopmail.com', 'attendee1', 'people1', [attendeegroup])
  })

  it.only('Login to community using otp for the new user (attendee2@yopmail.com): POST /api/v2/users/login', async () => {
    var signup = new ComunitySignupLogin();
    var accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accessTokenLoginAttendee1 = await signup.loginWithOtp(accessTokenLoginPage, 'attendee2@yopmail.com', '1234')
  })

  it.only('Onboarding with personal details add industry : POST /api/v2/users/on-board', async () => {

    const onbording1 = {
      "payload": {
        "data": {
          "userProfileFields": {},
          "groupValueArray": {},
          "firstName": "attendee2",
          "lastName": "people2",
          "gender": "male",
          "about": "",
          "designation": "",
          "organisation_name": "",
          "country": "",
          "state": "",
          "city": "",
          "industry": "IT"
        }
      }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee1, onbording1)
  });

  it.only('Onboarding with looking & offering : POST /api/v2/users/on-board', async () => {
  const onBoarding4 = {
      "payload": {
          "data": {
              "lookingfor": "",
              "offering": ""
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee1, onBoarding4)
  });

  it.only('Onboarding with interests : POST /api/v2/users/on-board', async () => {

  const onBoarding5 = {
      "payload": {
          "data": {
              "intrests": [],
              "isBoardingComplete": true
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee1, onBoarding5)

  });

  it.only('Add another attendee with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    attendeeId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'attendee3@yopmail.com', 'attendee1', 'people1', [attendeegroup])
  })
  
  it.only('Login to community using otp for the new user (attendee3@yopmail.com): POST /api/v2/users/login', async () => {
    var signup = new ComunitySignupLogin();
    var accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accessTokenLoginAttendee2 = await signup.loginWithOtp(accessTokenLoginPage, 'attendee3@yopmail.com', '1234')
  })
  
  it.only('Onboarding with personal details add industry : POST /api/v2/users/on-board', async () => {
  
    const onbording1 = {
      "payload": {
        "data": {
          "userProfileFields": {},
          "groupValueArray": {},
          "firstName": "attendee3",
          "lastName": "people3",
          "gender": "male",
          "about": "",
          "designation": "",
          "organisation_name": "",
          "country": "",
          "state": "",
          "city": "",
          "industry": "Business"
        }
      }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee2, onbording1)
  });
  
  it.only('Onboarding with looking & offering : POST /api/v2/users/on-board', async () => {
  const onBoarding4 = {
      "payload": {
          "data": {
              "lookingfor": "",
              "offering": ""
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee2, onBoarding4)
  });
  
  it.only('Onboarding with interests : POST /api/v2/users/on-board', async () => {
  
  const onBoarding5 = {
      "payload": {
          "data": {
              "intrests": ["Advertising"],
              "isBoardingComplete": true
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee2, onBoarding5)
  
  });

  it.only('Add another attendee with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    attendeeId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'attendee4@yopmail.com', 'attendee1', 'people1', [attendeegroup])
  })
  
  it.only('Login to community using otp for the new user (attendee4@yopmail.com): POST /api/v2/users/login', async () => {
    var signup = new ComunitySignupLogin();
    var accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accessTokenLoginAttendee3 = await signup.loginWithOtp(accessTokenLoginPage, 'attendee4@yopmail.com', '1234')
  })
  
  it.only('Onboarding with personal details add industry : POST /api/v2/users/on-board', async () => {
  
    const onbording1 = {
      "payload": {
        "data": {
          "userProfileFields": {},
          "groupValueArray": {},
          "firstName": "attendee4",
          "lastName": "people4",
          "gender": "male",
          "about": "",
          "designation": "",
          "organisation_name": "",
          "country": "",
          "state": "",
          "city": "",
          "industry": "Business"
        }
      }
    }
    var signup = new ComunitySignupLogin();
    await signup.onboarding(global.accessTokenLoginAttendee3, onbording1)
  });
  
  it.only('Onboarding with looking & offering : POST /api/v2/users/on-board', async () => {
  const onBoarding4 = {
      "payload": {
          "data": {
              "lookingfor": "Admin",
              "offering": "Assistant"
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee3, onBoarding4)
  });
  
  it.only('Onboarding with interests : POST /api/v2/users/on-board', async () => {
  
  const onBoarding5 = {
      "payload": {
          "data": {
              "intrests": [],
              "isBoardingComplete": true
          }
      }
  }
  var signup = new ComunitySignupLogin();
  await signup.onboarding(global.accessTokenLoginAttendee3, onBoarding5)
  
  });







  




  //Update Match making settings

  it.only('Update match making settings disable interest : POST /backend/api/v2/events/matchmaking/settings', async () => {
    var payload = {
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
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
  });

  it.only('Verify match making settings on dashboard post update : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.is_interest).to.equal(0)
    expect(response.body.data.matchMakingSettings.is_industry).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_looking_for).to.equal(1)
    expect(response.body.data.matchMakingSettings.interest_name).to.equal('Interest')
    expect(response.body.data.matchMakingSettings.industry_name).to.equal('Industry updated')
  });

  it.only('Verify the matchmaing settings on community for interest : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[0].isActive).to.equal('YES')
    expect(response.body.success.data.features[1].isActive).to.equal('NO')
    expect(response.body.success.data.features[2].isActive).to.equal('YES')
    expect(response.body.success.data.features[3].isActive).to.equal('YES')
  });

  it.only('Update match making settings disable industry : POST /backend/api/v2/events/matchmaking/settings', async () => {
    var payload = {
      "data": {
        "is_interest": 1,
        "is_industry": 0,
        "is_looking_for": 1,
        "is_custom_tag": 1,
        "interest_name": "Interest",
        "industry_name": "Industry",
        "custom_tag_name": "Custom Tags"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
  });

  it.only('Verify match making settings on dashboard post update : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.is_interest).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_industry).to.equal(0)
    expect(response.body.data.matchMakingSettings.is_looking_for).to.equal(1)
    expect(response.body.data.matchMakingSettings.interest_name).to.equal('Interest')
    expect(response.body.data.matchMakingSettings.industry_name).to.equal('Industry updated')
  });

  it.only('Verify the matchmaing settings on community for industry : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[0].isActive).to.equal('NO')
    expect(response.body.success.data.features[1].isActive).to.equal('YES')
    expect(response.body.success.data.features[2].isActive).to.equal('YES')
    expect(response.body.success.data.features[3].isActive).to.equal('YES')
  });

  it.only('Update match making settings disable looking for/offering : POST /backend/api/v2/events/matchmaking/settings', async () => {
    var payload = {
      "data": {
        "is_interest": 1,
        "is_industry": 1,
        "is_looking_for": 0,
        "is_custom_tag": 1,
        "interest_name": "Interest",
        "industry_name": "Industry",
        "custom_tag_name": "Custom Tags"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
  });

  it.only('Verify match making settings on dashboard post update : GET /backend/api/v2/events/matchmaking/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.matchMakingSettings.is_interest).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_industry).to.equal(1)
    expect(response.body.data.matchMakingSettings.is_looking_for).to.equal(0)
    expect(response.body.data.matchMakingSettings.interest_name).to.equal('Interest')
    expect(response.body.data.matchMakingSettings.industry_name).to.equal('Industry updated')
  });

  it.only('Verify the matchmaing settings on community for looking for/offering : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    var response = await signup.getNewWebstateResponse(eventUrl)
    expect(response.body.success.data.features[0].isActive).to.equal('YES')
    expect(response.body.success.data.features[1].isActive).to.equal('YES')
    expect(response.body.success.data.features[2].isActive).to.equal('NO')
    expect(response.body.success.data.features[3].isActive).to.equal('NO')
  });

  it.only('Update match making settings enable all fields : POST /backend/api/v2/events/matchmaking/settings', async () => {
    var payload = {
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
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/settings', { 'organiserId': environment.HOrganiserId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_matchmaking_setting_message)
  });




})