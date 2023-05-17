/*
Author: Biswajit Pattanaik
Description: This script will be used to test the cases for public API.

Timestamp: 24th Jan 2022 11:30 AM
Modified: Biswajit Pattanaik 28th Jan 2022 10:00 AM
Description : Added cases for get SPeaker list
*/
import supertest from 'supertest';
import { expect } from 'chai'
import environment from '../../config/environment';
import publicApiTestData from '../../config/publicApiTestData';
import piblicAPIData from '../../config/publicApiTestData';
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, Events, organizerUserHeader, emailaddress, addDays, addTime, getValueFromJsonObject, ComunitySignupLogin, People, Session } from '../../helper/CommonUtil'
import { stringify } from 'querystring';
import request from 'superagent';
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_email']
var eventId, eventId2, eventId3, eventId4, eventId5, eventId6, eventForMediaDownloadId
var attendeegroup, speakergroup, boothmembergroup
var expiredToken, created_group_id
var eventList = []
var eventUrl
var eventUrl2
var eventUrl3
var multipleFiles
var interestsList

var URL
var V2_URL
var V2_INDEX_URL
var V2_COVER_IMAGES_0
var V2_COVER_IMAGES_1
var V2_COVER_IMAGES_2
var V2_COVER_IMAGES_3
var V2_COVER_IMAGES_4
var V2_COVER_IMAGES_5


var fs = require('fs');

var imageAsBase64_Favicon = fs.readFileSync('./images_branding/ferriswheel.png', 'base64');
var imageAsBase64_Community_Banner = fs.readFileSync('./images_branding/Community_Banners_Final.jpg', 'base64');
var imageAsBase64_Event_Logo = fs.readFileSync('./images_branding/event_LOGO.png', 'base64');
var imageAsBase64_Login_Banner = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');
var imageAsBase64_Booth_SpotLight_Banner = fs.readFileSync('./booth_images/Ducatibanner.jpg', 'base64')
var imageAsBase64_Booth_Reception_Banner = fs.readFileSync('./booth_images/DucatiSessionResecptionBanner.png', 'base64')
var imageAsBase64_Booth_Small_Banner = fs.readFileSync('./booth_images/DucatiListBanner.jpg', 'base64')
var imageAsBase64_Session_Banner_image = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');

var pdfasBinary= fs.readFileSync('./config/sample-pdf-file.pdf', 'binary');


var virtual10 = {
  "data": {
    "booth_size": "LARGE",
    "category": "category",
    "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
    "email": "testfghanistan@yopmail.com",
    "fb_url": "https://facebook.com",
    "instagram_url": "https://instagram.com",
    "is_featured": true,
    "is_rating": true,
    "linked_url": "https://linkedin.com",
    "list_banner_image": [
      {}
    ],
    "location": "afghnaistan adddres",
    "small_banner_image": [
      {
        "img_file_name": ""
      }
    ],
    "multiple_file": [],
    "name": "test updated",
    "phone": "9988776666",
    "phone_code": "+93",
    "position": 1,
    "profile_img": "",
    "productLabel":"Products/Services",
    "spotlight_banner": [
      {
        "img_file_name": ""
      }
    ],
    "spotlight_banner_type": "IMAGE",
    "tags": "test tag",
    "twitter_url": "https://twitter.com",
    "website_url": "https://google.com",
    "whatsapp_no": "12345678"
  }
}

var virtual11 = {
  "data": {
    "booth_size": "LARGE",
    "category": "category",
    "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
    "email": "testfghanistan@yopmail.com",
    "fb_url": "https://facebook.com",
    "instagram_url": "https://instagram.com",
    "is_featured": true,
    "is_rating": true,
    "linked_url": "https://linkedin.com",
    "list_banner_image": [
      {}
    ],
    "location": "afghnaistan adddres",
    "small_banner_image": [
      {
        "img_file_name": ""
      }
    ],
    "multiple_file": [],
    "name": "test updated",
    "phone": "9988776666",
    "phone_code": "+93",
    "position": 1,
    "profile_img": "",
    "productLabel":"Products/Services",
    "spotlight_banner": [
      {
        "img_file_name": ""
      }
    ],
    "spotlight_banner_type": "IMAGE",
    "tags": "test tag",
    "twitter_url": "https://twitter.com",
    "website_url": "https://google.com",
    "whatsapp_no": "12345678"
  }
}


//Get list all all events on dashboad i,e (ongoing,upcoming,ended)
var getEventListFromDashboard = async () =>{
  var eventArr = [];
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/list',{'organiserId': global.OrganizerId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
  eventArr=eventArr.concat(response.body.upcoming_events);
  eventArr=eventArr.concat(response.body.ongoing_events);
  eventArr=eventArr.concat(response.body.ended_events);
  return eventArr;
}


//Delete all the events in the eventList object
var deleteEventListFromDashboard = async(eventList) =>{
  for (var i=0;i<eventList.length;i++){
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserId': global.OrganizerId, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'eventid': eventList[i].id }, 'post')
  }
}

export const refreshDashboardDeveloperAccessToken = async (accessToken, organizerId) => {
    var response = await sendRequest(environment.baseURL, '/api/v2/helper/refreshToken',  { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + accessToken, 'organiserid': organizerId }, 'post')
    expect(response.body.status).to.equal(200)
    return response.body.data
}

export const loginToDashboardUsingUsernameAndPassword = async (userName, password) => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": userName,
        "password": password
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.userData.email).to.satisfy(str => str.toLowerCase() == userName)
    return response
}

const getSharedPublicAPIToken = async (accessToken, organizerId) => {
    var response = await sendRequest(environment.baseURL, '/api/v2/helper/getToken', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + accessToken, 'organiserid': organizerId }, 'get')
    expect(response.body.status).to.equal(200)
    return (response.body.data)
}

const getAgendaDateInFormat = (timestamp) => {
  var date = new Date(timestamp)
  var formatDate = date.toISOString().split('T')[0]
  return formatDate
}

const getAgendaStartAndEndDateInFormat = (timestamp) => {
  var date = new Date(timestamp)
  var formatDate = date.toISOString().split('T')[0] + ' ' + date.toUTCString().split(' ')[4]
  return formatDate
}

const getSessionDetails = async (accessToken, organizerId, eventId, agendaId) => {
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agenda/basic', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + accessToken, 'organiserid': organizerId, 'eventid': eventId, 'agendaid': agendaId }, 'get')
  expect(response.body.status).to.equal(200)
  return response.body
}

const uploadFilesAsBase = async (location, imageAsBase, headers ) => {
  var request = supertest(environment.baseURL1)
  var response = await request.post('/backend/api/v2/events/uploads')
  .set(headers)
  .field('type', 'base')
  .field('location', location)
  .field('data', 'data:image/jpeg;base64,' + imageAsBase)
  //.end()
  expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message, 'File upload failed');
  return (response.body.data.file_name)
}

const uploadFilesAsImg = async (location, imageFilePath, headers ) => {
  var request = supertest(environment.baseURL1)
  var response = await request.post('/backend/api/v2/events/uploads')
  .set(headers)
  //.set('Content-Type', 'multipart/form-data')
  // .set('content-length','497668')
  .field('type', 'img')
  .field('location', location)
  .attach('data', imageFilePath, { contentType: 'image/png' })
  //.end()
  expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message, 'File upload failed');
  return (response.body.data.file_name)
}

const uploadFilesAsFile = async (location, filePath, headers ) => {
  var request = supertest(environment.baseURL1)
  var response = await request.post('/backend/api/v2/events/uploads')
  .set(headers)
  //.set('Content-Type', 'multipart/form-data')
  // .set('content-length','497668')
  .field('module_name', 'file')
  .field('type', 'file')
  .field('location', location)
  .attach('data', filePath)
  //.end()
  expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_file_upload_message)
  return (response.body.data.file_name)
}



const updateBrandingSettings = async (eventId, organizerId, accessToken, URL, favicon, communityBannerList, logoList, loginBannerList, coverImagesList) => {
  const payload_vanity =
        {
            "data": {
                "favicon": favicon,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": null
                },
                "communityBannerList": communityBannerList,
                "logoList": logoList,
                "loginBannerList": loginBannerList,
                "logos": logoList.map(function(map){return {'img_file_name': map, 'logo_url' : ''}}),
                "coverImagesList": coverImagesList.map(map => map.img_file_name),
                "coverImages": coverImagesList,
                "communityBanners": communityBannerList.map(function(map){ return {'img_file_name': map, 'link': ''}}),
                "is_landing_page": 1,
                "isPoweredBy": true,
                "isShowOnBoardingBanners": 1,
                "enable_event_logo_in_navigation": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': organizerId,'authorization': 'Bearer ' + accessToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': eventId}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
}

const sendGetFormRequest = async (urlHost, urlPath, headers, methodName, payload) => {
  var request = supertest(urlHost)
  var response = await request.get(urlPath)
  .set(headers)
  //.type('form')
  .send(payload)
  expect(response.status).to.equal(200)
  return response
}

describe('Public API v1.1 access token tests', () => {

  before(async () => {
    
    //Login with users from all plans
    //Enterprise user login
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, "hubilomasterpassword")
    process.env.eToken = response.body.data.token
    global.OrganizerId = response.body.data.userData.id
    //Basic plan user login
    response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.basicPlanUser, "hubilomasterpassword")
    process.env.eTokenBasicPlan = response.body.data.token
    global.OrganizerIdBasic = response.body.data.userData.id
    //Advanced plan user login
    response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.advancedPlanUser, "hubilomasterpassword")
    process.env.eTokenAdvancedPlan = response.body.data.token
    global.OrganizerIdAdvanced = response.body.data.userData.id
    //Pro plan user login
    response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.proPlanUser, "hubilomasterpassword")
    process.env.eTokenProPlan = response.body.data.token
    global.OrganizerIdPro = response.body.data.userData.id
  });

  it.only('Get shared token with enterprise plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    expect(process.env.eApiToken, 'Unable to get access token for publi APIs').to.not.be.undefined
  })

  it.only('Get organizer profile with basic plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    process.env.eApiTokenBasicPlan = await getSharedPublicAPIToken(process.env.eTokenBasicPlan, global.OrganizerIdBasic)
    expect(process.env.eApiTokenBasicPlan, 'Unable to get access token for publi APIs').to.not.be.undefined
  })

  it.only('Get organizer profile with advanced plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    process.env.eApiTokenAdvancedPlan = await getSharedPublicAPIToken(process.env.eTokenAdvancedPlan, global.OrganizerIdAdvanced)
    expect(process.env.eApiTokenAdvancedPlan, 'Unable to get access token for publi APIs').to.not.be.undefined
  })

  it.only('Get organizer profile with pro plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    process.env.eApiTokenProPlan = await getSharedPublicAPIToken(process.env.eTokenProPlan, global.OrganizerIdPro)
    expect(process.env.eApiTokenProPlan, 'Unable to get access token for publi APIs').to.not.be.undefined
  })

  it.only('Verify the refresh token from dashboard for enterprise plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    expiredToken = process.env.eApiToken
    process.env.eApiToken = await refreshDashboardDeveloperAccessToken(process.env.eToken, global.OrganizerId)
    expect(process.env.eApiToken, 'Unable to get the refreshed token').to.not.be.undefined
  })

  it.only('Verify the refresh token from dashboard for basic plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    expiredToken = process.env.eApiToken
    process.env.eApiTokenBasicPlan = await refreshDashboardDeveloperAccessToken(process.env.eTokenBasicPlan, global.OrganizerIdBasic)
    expect(process.env.eApiTokenBasicPlan, 'Unable to get the refreshed token').to.not.be.undefined
  })

  it.only('Verify the refresh token from dashboard for advanced plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    expiredToken = process.env.eApiToken
    process.env.eApiTokenAdvancedPlan = await refreshDashboardDeveloperAccessToken(process.env.eTokenAdvancedPlan, global.OrganizerIdAdvanced)
    expect(process.env.eApiTokenAdvancedPlan, 'Unable to get the refreshed token').to.not.be.undefined
  })

  it.only('Verify the refresh token from dashboard for pro plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    expiredToken = process.env.eApiToken
    process.env.eApiTokenProPlan = await refreshDashboardDeveloperAccessToken(process.env.eTokenProPlan, global.OrganizerIdPro)
    expect(process.env.eApiTokenProPlan, 'Unable to get the refreshed token').to.not.be.undefined
  })

})


describe('Public API v1.1 Organiser tests', () => {

  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, "hubilomasterpassword")
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var eventListk
    // if ((process.env.releaseenv == 'qat' && global.OrganizerId == '434331') || (process.env.releaseenv == 'release' && global.OrganizerId == '350112')) {
    //     while((eventList = await getEventListFromDashboard()).length > 0){
    //         await deleteEventListFromDashboard(eventList);
    //     }
    // }
  });

  it.only('Get organizer profile for enterprise plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/organiser/profile', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.email).to.equal(publicApiTestData.enterPrisePlanUser)
  })

  it.only('Get organizer profile for basic plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/organiser/profile', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiTokenBasicPlan }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.email).to.equal(publicApiTestData.basicPlanUser)
  })

  it.only('Get organizer profile for advanced plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/organiser/profile', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiTokenAdvancedPlan }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.email).to.equal(publicApiTestData.advancedPlanUser)
  })

  it.only('Get organizer profile for pro plan : GET /api/v1.1/integration/organiser/profile', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/organiser/profile', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiTokenProPlan }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.email).to.equal(publicApiTestData.proPlanUser)
  })

  it.only('Verify expired token no longer can be used for authentication : GET /api/v1.1/integration/organiser/profile', async () => { 
    expiredToken = process.env.eApiToken
    process.env.eApiToken = await refreshDashboardDeveloperAccessToken(process.env.eToken, global.OrganizerId)
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/organiser/profile', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + expiredToken }, 'get')
    expect(response.body.status).to.equal(401)
  })

})


describe('Public API v1.1 Events tests', () => {

  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var eventListArr
    if ((process.env.releaseenv == 'qat' && environment.HOrganiserId == '376745') || (process.env.releaseenv == 'release' && environment.HOrganiserId == '350112')) {
      while((eventListArr = await getEventListFromDashboard()).length > 0){
            await deleteEventListFromDashboard(eventListArr);
        }
    }
  });

  it.only('Verify new event is visible for : GET /api/v1.1/integration/event/list', async () => {
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
    eventList.push(eventId)
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=5', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.data[0].id).to.equal(eventId)
    expect(response.body.data.data[0].name).to.equal('NewEvent')
    expect(response.body.data.data[0].description).to.equal('description for new event')
    expect(response.body.data.data[0].organiserId).to.equal(parseInt(global.OrganizerId))
    expect(response.body.data.data[0].startTimeMilli).to.equal(String(startDate))
    expect(response.body.data.data[0].endTimeMilli).to.equal(String(endDate))
  })

  it.only('Verify mutliple events (20) are visible for : GET /api/v1.1/integration/event/list', async () => {
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    for(var i=1;i<=20;i++){
      var eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent' + i, 'description for new event ' + i, startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')  
      eventList.push(eventId)
    }
    eventList.reverse()
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(21)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList)
  });

  it.only('Verify pagination, check all event data on page 1 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.currentPage).to.equal(0)
    //expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(0,10))
  });

  it.only('Verify pagination, check all event data on page 2 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=1&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.currentPage).to.equal(1)
    //expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(10,20))
  });

  it.only('Verify pagination, check all event data on page 3 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=2&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.currentPage).to.equal(2)
    //expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members([eventId])
  });

  it.only('Verify pagination default values : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(21)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList)
  });

  it.only('Verify pagination with 20 limit page 1: GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=20', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(20)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(2)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(0,20))
  });

  it.only('Verify pagination with 20 limit page 2: GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=1&limit=20', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.currentPage).to.equal(1)
    //expect(response.body.data.totalPages).to.equal(2)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members([eventId])
  });

  it.only('Verify search by event name : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=10&searchInput=NewEvent3', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data[0].id).to.equal(eventList[17])
    expect(response.body.data.data[0].name).to.equal('NewEvent3')
    expect(response.body.data.data[0].description).to.equal('description for new event 3')
  });

  it.only('Verify search by event partial name : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=10&searchInput=Event3', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data[0].id).to.equal(eventList[17])
    expect(response.body.data.data[0].name).to.equal('NewEvent3')
    expect(response.body.data.data[0].description).to.equal('description for new event 3')
  });

  it.only('Verify search by wrong event name : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=10&searchInput=NewEventabcdef', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(0)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(0)
  });

  it.only('Verify event details : GET /api/v1.1/integration/event/detail', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.id).to.equal(eventId)
    expect(response.body.data.data.organiserId).to.equal(parseInt(global.OrganizerId))
    expect(response.body.data.data.name).to.equal('NewEvent')
    expect(response.body.data.data.description).to.equal('description for new event')
  });

  it.only('Verify event details for invalid eventId : GET /api/v1.1/integration/event/detail', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + 1000000000, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal('Invalid Access')
  });

  it.only('Verify event details for bad request : GET /api/v1.1/integration/event/detail', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/detail', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Sorry, Some parameter are missing. Please enter all required values.')
  });

  it.only('Remove existing event : GET /api/v1.1/integration/event/delete', async () => {
    const payload = {
      "eventId": eventList[0]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Event Deleted')
    
  });

  it.only('Verify deleted event does not appear on list : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(20)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.not.include(eventList[0])
    eventList.shift()
  });

  it.only('Remove non existing existing event : GET /api/v1.1/integration/event/delete', async () => {
    const payload = {
      "eventId": 999999999
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal('Invalid Access')  
  })

  it.only('Remove event bad request : GET /api/v1.1/integration/event/delete', async () => {
    const payload = {
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/event/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Sorry, Some parameter are missing. Please enter all required values.')
  })

})

describe('Public API v1.1 exhibitor tests', () => {

  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)

    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var now = new Date()
    eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    //Update restrict access
    await event.eventRestrictOffAddCustomOtp(organizerUserHeader(), eventId, '1234')
    //make event live
    eventUrl = await event.makeEventGoLive(organizerUserHeader(), eventId)
    console.log(eventUrl)
    //Get event group
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    
    attendeegroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    boothmembergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    speakergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
  
    var payload = {"data":{"name":"TAG1"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/add', {'organiserId': global.OrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_add_custom_tags_message)
    payload = {"data":{"name":"TAG2"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/add', {'organiserId': global.OrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',payload)

  });

  it.only('Add SMALL exhibitor with all params : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Hubilo Exhibitor Booth",
      "category": "Category1",
      "boothSize": "SMALL",
      "description": "Exhibitor description",
      "address": "City - Ahmedabad, State - Gujurat, Country - India",
      "email": "exhibitor@yopmail.com",
      "phone": "9999999999",
      "website": "https://www.your_website_name.com",
      "instagram": "https://www.instagram.com",
      "facebook": "https://www.facebook.com",
      "linkedin": "https://www.linkedin.com",
      "twitter": "https://www.twitter.com",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.exhibitorId = response.body.data.data.hubiloExhibitorId
  })

  it.only('Verify SMALL exhibitor with all params : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[0].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId)
    expect(response.body.data.data[0].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth')
    expect(response.body.data.data[0].email).to.be.an('string').and.to.equal('exhibitor@yopmail.com')
    //expect(response.body.data.data[0].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].boothSize).to.be.an('string').and.to.equal('SMALL')
    expect(response.body.data.data[0].description).to.be.an('string').and.to.equal('Exhibitor description')
    expect(response.body.data.data[0].address).to.be.an('string').and.to.equal('City - Ahmedabad, State - Gujurat, Country - India')
    expect(response.body.data.data[0].phone).to.be.an('string').and.to.equal('9999999999')
    expect(response.body.data.data[0].website).to.be.an('string').and.to.equal('https://www.your_website_name.com')
    expect(response.body.data.data[0].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com')
    expect(response.body.data.data[0].facebook).to.be.an('string').and.to.equal('https://www.facebook.com')
    expect(response.body.data.data[0].instagram).to.be.an('string').and.to.equal('https://www.instagram.com')
    expect(response.body.data.data[0].twitter).to.be.an('string').and.to.equal('https://www.twitter.com')
  })

  it.only('Add MEDIUM exhibitor with all params : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Medium Hubilo Exhibitor Booth",
      "category": "Category2",
      "boothSize": "MEDIUM",
      "description": "Exhibitor description2",
      "address": "City - Surat, State - Gujurat, Country - India",
      "email": "exhibitor2@yopmail.com",
      "phone": "9999999999",
      "website": "https://www.your_website_name.com",
      "instagram": "https://www.instagram.com",
      "facebook": "https://www.facebook.com",
      "linkedin": "https://www.linkedin.com",
      "twitter": "https://www.twitter.com",
      "tags": ["tag3", "tag4"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.exhibitorId2 = response.body.data.data.hubiloExhibitorId
  })

  it.only('Verify MEDIUM exhibitor with all params : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[1].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId2)
    expect(response.body.data.data[1].name).to.be.an('string').and.to.equal('Medium Hubilo Exhibitor Booth')
    expect(response.body.data.data[1].email).to.be.an('string').and.to.equal('exhibitor2@yopmail.com')
    //expect(response.body.data.data[1].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[1].boothSize).to.be.an('string').and.to.equal('MEDIUM')
    expect(response.body.data.data[1].description).to.be.an('string').and.to.equal('Exhibitor description2')
    expect(response.body.data.data[1].address).to.be.an('string').and.to.equal('City - Surat, State - Gujurat, Country - India')
    expect(response.body.data.data[1].phone).to.be.an('string').and.to.equal('9999999999')
    expect(response.body.data.data[1].website).to.be.an('string').and.to.equal('https://www.your_website_name.com')
    expect(response.body.data.data[1].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com')
    expect(response.body.data.data[1].facebook).to.be.an('string').and.to.equal('https://www.facebook.com')
    expect(response.body.data.data[1].instagram).to.be.an('string').and.to.equal('https://www.instagram.com')
    expect(response.body.data.data[1].twitter).to.be.an('string').and.to.equal('https://www.twitter.com')
  })

  it.only('Add LARGE exhibitor with all params : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Large Hubilo Exhibitor Booth",
      "category": "Category3",
      "boothSize": "LARGE",
      "description": "Exhibitor description3",
      "address": "City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitor3@yopmail.com",
      "phone": "9999999999",
      "website": "https://www.your_website_name.com",
      "instagram": "https://www.instagram.com",
      "facebook": "https://www.facebook.com",
      "linkedin": "https://www.linkedin.com",
      "twitter": "https://www.twitter.com",
      "tags": ["tag1", "tag1"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.exhibitorId3 = response.body.data.data.hubiloExhibitorId
  })

  it.only('Verify LARGE exhibitor with all params : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[2].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId3)
    expect(response.body.data.data[2].name).to.be.an('string').and.to.equal('Large Hubilo Exhibitor Booth')
    expect(response.body.data.data[2].email).to.be.an('string').and.to.equal('exhibitor3@yopmail.com')
    //expect(response.body.data.data[2].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[2].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[2].description).to.be.an('string').and.to.equal('Exhibitor description3')
    expect(response.body.data.data[2].address).to.be.an('string').and.to.equal('City - Rajkot, State - Gujurat, Country - India')
    expect(response.body.data.data[2].phone).to.be.an('string').and.to.equal('9999999999')
    expect(response.body.data.data[2].website).to.be.an('string').and.to.equal('https://www.your_website_name.com')
    expect(response.body.data.data[2].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com')
    expect(response.body.data.data[2].facebook).to.be.an('string').and.to.equal('https://www.facebook.com')
    expect(response.body.data.data[2].instagram).to.be.an('string').and.to.equal('https://www.instagram.com')
    expect(response.body.data.data[2].twitter).to.be.an('string').and.to.equal('https://www.twitter.com')
  })

  it.only('Verify booth category list : GET /api/v1.1/integration/booth/category/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/category/list?eventId='+ eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data).to.have.members(['Category1','Category2','Category3'])
  })

  it.only('Verify booth category list with invalid eventId : GET /api/v1.1/integration/booth/category/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/category/list?eventId='+ 0, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add  exhibitor with mandatory params and rest as empty : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Hubilo Exhibitor Booth Only mandatory populated",
      "category": "",
      "boothSize": "",
      "description": "",
      "address": "",
      "email": "",
      "phone": "",
      "website": "",
      "instagram": "",
      "facebook": "",
      "linkedin": "",
      "twitter": "",
      "tags": []
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)

  })

  it.only('Verify exhibitor with mandatory params and rest as empty : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[3].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Only mandatory populated')
    expect(response.body.data.data[3].email).to.be.an('string').and.to.equal('')
    //expect(response.body.data.data[3].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].boothSize).to.be.an('string').and.to.equal('SMALL')
    expect(response.body.data.data[3].description).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].address).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].website).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].linkedin).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].facebook).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].instagram).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[3].twitter).to.be.an('string').and.to.equal('')
  })

  it.only('Add  exhibitor with only mandatory params : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Hubilo Exhibitor Booth Only mandatory",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    
  })

  it.only('Verify exhibitor with mandatory params and rest as empty : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[4].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Only mandatory')
    expect(response.body.data.data[4].email).to.be.an('string').and.to.equal('')
    //expect(response.body.data.data[4].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].boothSize).to.be.an('string').and.to.equal('SMALL')
    expect(response.body.data.data[4].description).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].address).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].website).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].linkedin).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].facebook).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].instagram).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[4].twitter).to.be.an('string').and.to.equal('')
  })

  it.only('Add LARGE exhibitor with client exhibitor Id : POST /api/v1.1/integration/booth/add', async () => {
    global.clientExhibitorId = String(Math.floor(Math.random() * 1000000))
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": global.clientExhibitorId,
      "name": "Large Hubilo Exhibitor Booth ClientId",
      "category": "Category5",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId",
      "address": "City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitor4@yopmail.com",
      "phone": "8888888888",
      "website": "https://www.your_website_name.com",
      "instagram": "https://www.instagram.com",
      "facebook": "https://www.facebook.com",
      "linkedin": "https://www.linkedin.com",
      "twitter": "https://www.twitter.com",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.exhibitorId5 = response.body.data.data.hubiloExhibitorId
  })

  it.only('Verify LARGE exhibitor with all params and clientId : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[5].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId5)
    expect(response.body.data.data[5].clientExhibitorId).to.be.an('string').and.to.equal(global.clientExhibitorId)
    expect(response.body.data.data[5].name).to.be.an('string').and.to.equal('Large Hubilo Exhibitor Booth ClientId')
    expect(response.body.data.data[5].email).to.be.an('string').and.to.equal('exhibitor4@yopmail.com')
    //expect(response.body.data.data[5].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[5].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[5].description).to.be.an('string').and.to.equal('Exhibitor description with clientId')
    expect(response.body.data.data[5].address).to.be.an('string').and.to.equal('City - Rajkot, State - Gujurat, Country - India')
    expect(response.body.data.data[5].phone).to.be.an('string').and.to.equal('8888888888')
    expect(response.body.data.data[5].website).to.be.an('string').and.to.equal('https://www.your_website_name.com')
    expect(response.body.data.data[5].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com')
    expect(response.body.data.data[5].facebook).to.be.an('string').and.to.equal('https://www.facebook.com')
    expect(response.body.data.data[5].instagram).to.be.an('string').and.to.equal('https://www.instagram.com')
    expect(response.body.data.data[5].twitter).to.be.an('string').and.to.equal('https://www.twitter.com')
  })

  it.only('Add  exhibitor with empty exhibitor name : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "",
      "category": "",
      "boothSize": "",
      "description": "",
      "address": "",
      "email": "",
      "phone": "",
      "website": "",
      "instagram": "",
      "facebook": "",
      "linkedin": "",
      "twitter": "",
      "tags": []
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add  exhibitor without exhibitor name : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "category": "",
      "boothSize": "",
      "description": "",
      "address": "",
      "email": "",
      "phone": "",
      "website": "",
      "instagram": "",
      "facebook": "",
      "linkedin": "",
      "twitter": "",
      "tags": []
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add  exhibitor with invalid eventId : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": 0,
      "clientExhibitorId": "",
      "name": "Hubilo invalid event exhibitor",
      "category": "",
      "boothSize": "",
      "description": "",
      "address": "",
      "email": "",
      "phone": "",
      "website": "",
      "instagram": "",
      "facebook": "",
      "linkedin": "",
      "twitter": "",
      "tags": []
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add  exhibitor with a tag that does not exist and verify error : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "name": "Hubilo invalid tag exhibitor",
      "category": "",
      "boothSize": "",
      "description": "",
      "address": "",
      "email": "",
      "phone": "",
      "website": "",
      "instagram": "",
      "facebook": "",
      "linkedin": "",
      "twitter": "",
      "tags": ["TAG3"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
  })

  //Updated booth cases

  it.only('Update exhibitor with all params : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "hubiloExhibitorId": global.exhibitorId,
      "name": "Hubilo Exhibitor Booth Updated",
      "category": "Category4",
      "boothSize": "LARGE",
      "description": "Exhibitor description updated",
      "address": "Hubilo ,City - Ahmedabad, State - Gujurat, Country - India",
      "email": "exhibitorupdated@yopmail.com",
      "phone": "8888888888",
      "website": "https://www.your_website_name.com/updated",
      "instagram": "https://www.instagram.com/updated",
      "facebook": "https://www.facebook.com/updated",
      "linkedin": "https://www.linkedin.com/updated",
      "twitter": "https://www.twitter.com/updated",
      "tags": ["TAG1", "TAG2", "TAG3"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Updated Successfully')

  })

  it.only('Verify updated booth details : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[0].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId)
    expect(response.body.data.data[0].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Updated')
    expect(response.body.data.data[0].email).to.be.an('string').and.to.equal('exhibitorupdated@yopmail.com')
    //expect(response.body.data.data[0].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[0].description).to.be.an('string').and.to.equal('Exhibitor description updated')
    expect(response.body.data.data[0].address).to.be.an('string').and.to.equal('Hubilo ,City - Ahmedabad, State - Gujurat, Country - India')
    expect(response.body.data.data[0].phone).to.be.an('string').and.to.equal('8888888888')
    expect(response.body.data.data[0].website).to.be.an('string').and.to.equal('https://www.your_website_name.com/updated')
    expect(response.body.data.data[0].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com/updated')
    expect(response.body.data.data[0].facebook).to.be.an('string').and.to.equal('https://www.facebook.com/updated')
    expect(response.body.data.data[0].instagram).to.be.an('string').and.to.equal('https://www.instagram.com/updated')
    expect(response.body.data.data[0].twitter).to.be.an('string').and.to.equal('https://www.twitter.com/updated')
  })

  it.only('Update exhibitor details using clientExhibitorId : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": global.clientExhibitorId,
      "name": "Large Hubilo Exhibitor Booth ClientId Updated",
      "category": "UpdatedCategory",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId updated",
      "address": "Hubilo, City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitorupdated2@yopmail.com",
      "phone": "7777777777",
      "website": "https://www.your_website_name.com/updated",
      "instagram": "https://www.instagram.com/updated",
      "facebook": "https://www.facebook.com/updated",
      "linkedin": "https://www.linkedin.com/updated",
      "twitter": "https://www.twitter.com/updated",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Updated Successfully')
  })

  it.only('Verify updated exhibitor with all params : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[5].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId5)
    expect(response.body.data.data[5].clientExhibitorId).to.be.an('string').and.to.equal(global.clientExhibitorId)
    expect(response.body.data.data[5].name).to.be.an('string').and.to.equal('Large Hubilo Exhibitor Booth ClientId Updated')
    expect(response.body.data.data[5].email).to.be.an('string').and.to.equal('exhibitorupdated2@yopmail.com')
    //expect(response.body.data.data[5].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[5].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[5].description).to.be.an('string').and.to.equal('Exhibitor description with clientId updated')
    expect(response.body.data.data[5].address).to.be.an('string').and.to.equal('Hubilo, City - Rajkot, State - Gujurat, Country - India')
    expect(response.body.data.data[5].phone).to.be.an('string').and.to.equal('7777777777')
    expect(response.body.data.data[5].website).to.be.an('string').and.to.equal('https://www.your_website_name.com/updated')
    expect(response.body.data.data[5].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com/updated')
    expect(response.body.data.data[5].facebook).to.be.an('string').and.to.equal('https://www.facebook.com/updated')
    expect(response.body.data.data[5].instagram).to.be.an('string').and.to.equal('https://www.instagram.com/updated')
    expect(response.body.data.data[5].twitter).to.be.an('string').and.to.equal('https://www.twitter.com/updated')
  })

  it.only('Update exhibitor details using clientExhibitorId and hubiloExhibitorId : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": global.clientExhibitorId,
      "hubiloExhibitorId": global.hubiloExhibitorId5,
      "name": "Large Hubilo Exhibitor Booth ClientId Updated2",
      "category": "UpdatedCategory2",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId updated2",
      "address": "Hubilo2, City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitorupdated3@yopmail.com",
      "phone": "7777777778",
      "website": "https://www.your_website_name.com/updated2",
      "instagram": "https://www.instagram.com/updated2",
      "facebook": "https://www.facebook.com/updated2",
      "linkedin": "https://www.linkedin.com/updated2",
      "twitter": "https://www.twitter.com/updated2",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Updated Successfully')
  })

  it.only('Verify updated exhibitor with all params : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[5].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId5)
    expect(response.body.data.data[5].clientExhibitorId).to.be.an('string').and.to.equal(global.clientExhibitorId)
    expect(response.body.data.data[5].name).to.be.an('string').and.to.equal('Large Hubilo Exhibitor Booth ClientId Updated2')
    expect(response.body.data.data[5].email).to.be.an('string').and.to.equal('exhibitorupdated3@yopmail.com')
    //expect(response.body.data.data[5].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[5].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[5].description).to.be.an('string').and.to.equal('Exhibitor description with clientId updated2')
    expect(response.body.data.data[5].address).to.be.an('string').and.to.equal('Hubilo2, City - Rajkot, State - Gujurat, Country - India')
    expect(response.body.data.data[5].phone).to.be.an('string').and.to.equal('7777777778')
    expect(response.body.data.data[5].website).to.be.an('string').and.to.equal('https://www.your_website_name.com/updated2')
    expect(response.body.data.data[5].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com/updated2')
    expect(response.body.data.data[5].facebook).to.be.an('string').and.to.equal('https://www.facebook.com/updated2')
    expect(response.body.data.data[5].instagram).to.be.an('string').and.to.equal('https://www.instagram.com/updated2')
    expect(response.body.data.data[5].twitter).to.be.an('string').and.to.equal('https://www.twitter.com/updated2')
  })

  it.only('Update exhibitor with only params to be updated : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "hubiloExhibitorId": global.exhibitorId,
      "name": "Hubilo Exhibitor Booth Updated2",
      "category": "Category5",
      "description": "Exhibitor description updated with limited params",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Updated Successfully')

  })

  it.only('Verify updated booth details : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[0].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Updated2')
    expect(response.body.data.data[0].email).to.be.an('string').and.to.equal('exhibitorupdated@yopmail.com')
    //expect(response.body.data.data[0].logo).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[0].description).to.be.an('string').and.to.equal('Exhibitor description updated with limited params')
    expect(response.body.data.data[0].address).to.be.an('string').and.to.equal('Hubilo ,City - Ahmedabad, State - Gujurat, Country - India')
    expect(response.body.data.data[0].phone).to.be.an('string').and.to.equal('8888888888')
    expect(response.body.data.data[0].website).to.be.an('string').and.to.equal('https://www.your_website_name.com/updated')
    expect(response.body.data.data[0].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com/updated')
    expect(response.body.data.data[0].facebook).to.be.an('string').and.to.equal('https://www.facebook.com/updated')
    expect(response.body.data.data[0].instagram).to.be.an('string').and.to.equal('https://www.instagram.com/updated')
    expect(response.body.data.data[0].twitter).to.be.an('string').and.to.equal('https://www.twitter.com/updated')
  })

  it.only('Update exhibitor without clientExhibitorId key  : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "hubiloExhibitorId": global.exhibitorId,
      "name": "Hubilo Exhibitor Booth Updated3",
      "category": "Category5",
      "description": "Exhibitor description updated without client exhibitor key",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Updated Successfully')

  })

  it.only('Verify updated booth details : GET /api/v1.1/integration/booth/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId='+ eventId + '&currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[0].hubiloExhibitorId).to.be.an('number').and.to.equal(global.exhibitorId)
    expect(response.body.data.data[0].name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Updated3')
    // expect(response.body.data.data[0].email).to.be.an('string').and.to.equal('exhibitorupdated@yopmail.com')
    // expect(response.body.data.data[0].logo).to.be.an('string').and.to.equal('')
    // expect(response.body.data.data[0].boothSize).to.be.an('string').and.to.equal('LARGE')
    expect(response.body.data.data[0].description).to.be.an('string').and.to.equal('Exhibitor description updated without client exhibitor key')
    // expect(response.body.data.data[0].address).to.be.an('string').and.to.equal('Hubilo ,City - Ahmedabad, State - Gujurat, Country - India')
    // expect(response.body.data.data[0].phone).to.be.an('string').and.to.equal('8888888888')
    // expect(response.body.data.data[0].website).to.be.an('string').and.to.equal('https://www.your_website_name.com/updated')
    // expect(response.body.data.data[0].linkedin).to.be.an('string').and.to.equal('https://www.linkedin.com/updated')
    // expect(response.body.data.data[0].facebook).to.be.an('string').and.to.equal('https://www.facebook.com/updated')
    // expect(response.body.data.data[0].instagram).to.be.an('string').and.to.equal('https://www.instagram.com/updated')
    // expect(response.body.data.data[0].twitter).to.be.an('string').and.to.equal('https://www.twitter.com/updated')
  })

  it.only('Update exhibitor details with empty clientExhibitorId and hubiloExhibitorId and verify error : POST /api/v1.1/integration/booth/update', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": "",
      "hubiloExhibitorId": "",
      "name": "Large Hubilo Exhibitor Booth ClientId Updated2",
      "category": "UpdatedCategory2",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId updated2",
      "address": "Hubilo2, City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitorupdated3@yopmail.com",
      "phone": "7777777778",
      "website": "https://www.your_website_name.com/updated2",
      "instagram": "https://www.instagram.com/updated2",
      "facebook": "https://www.facebook.com/updated2",
      "linkedin": "https://www.linkedin.com/updated2",
      "twitter": "https://www.twitter.com/updated2",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update exhibitor details with invalid eventId and verify error : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": 0,
      "clientExhibitorId": global.clientExhibitorId,
      "hubiloExhibitorId": global.hubiloExhibitorId5,
      "name": "Large Hubilo Exhibitor Booth ClientId Updated2",
      "category": "UpdatedCategory2",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId updated2",
      "address": "Hubilo2, City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitorupdated3@yopmail.com",
      "phone": "7777777778",
      "website": "https://www.your_website_name.com/updated2",
      "instagram": "https://www.instagram.com/updated2",
      "facebook": "https://www.facebook.com/updated2",
      "linkedin": "https://www.linkedin.com/updated2",
      "twitter": "https://www.twitter.com/updated2",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update exhibitor details with out eventId and verify error : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "clientExhibitorId": global.clientExhibitorId,
      "hubiloExhibitorId": global.hubiloExhibitorId5,
      "name": "Large Hubilo Exhibitor Booth ClientId Updated2",
      "category": "UpdatedCategory2",
      "boothSize": "LARGE",
      "description": "Exhibitor description with clientId updated2",
      "address": "Hubilo2, City - Rajkot, State - Gujurat, Country - India",
      "email": "exhibitorupdated3@yopmail.com",
      "phone": "7777777778",
      "website": "https://www.your_website_name.com/updated2",
      "instagram": "https://www.instagram.com/updated2",
      "facebook": "https://www.facebook.com/updated2",
      "linkedin": "https://www.linkedin.com/updated2",
      "twitter": "https://www.twitter.com/updated2",
      "tags": ["TAG1", "TAG2"]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update exhibitor details with empty exhibitor name and verify error : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "hubiloExhibitorId": global.exhibitorId2,
      "name": "",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update exhibitor details with out exhibitor name and verify error : POST /api/v1.1/integration/booth/add', async () => {
    const payload = {
      "eventId": eventId,
      "hubiloExhibitorId": global.exhibitorId2,
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/booth/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })


})

var peopleList = []
var peopleEmailList = []
var eventId2

describe('Public API v1.1 User tests', () => {

  before(async () => {

    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var now = new Date()
    var todayDate = 
    eventId2 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventPeoplePaginationCheck', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    var attendeegroup2 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")

    multipleFiles = [{"filename":"1797_6668_580551001643177045.pdf","format":"pdf","real_filename":"pdf1_485227260281221.pdf"},{"filename":"1797_6668_580551001643177046.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"},{"filename":"1797_6668_580551001643177047.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"}]
    interestsList = [
      "Hiking",
      "Investing",
      "Digital Marketing"
    ]
    var people = new People()
    global.listAttendeeId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'newpaginationcheckuser@yopmail.com', 'SpeakerListUser', 'TestUser', [attendeegroup2], 'accountant', 'testing', 'accounting', interestsList, '3971_5650_662620001619006566.png', true, true, 0, multipleFiles, '9988887777', '91')


    peopleEmailList.push(myemail)
    peopleEmailList.push('newpaginationcheckuser@yopmail.com')
    for (var i=1;i<=24;i++){
      var peopleId
      var people = new People();
      peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'newpaginationcheckuser'+ i +'@yopmail.com', 'PaginatedUser' + i, 'Attendee', [attendeegroup2])
      peopleList.push(peopleId)
      peopleEmailList.push('newpaginationcheckuser'+ i +'@yopmail.com')
    }
    peopleList.reverse()
    peopleEmailList.reverse()

  });

  it.only('Verify user list data on page 1 with limit 10 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 0 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(10)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList.slice(0,10))
    expect(response.body.data.data[0].totalCount[0].count).to.equal(10)
  })

  it.only('Verify user list data on page 2 with limit 10 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 1 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(10)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList.slice(10,20))
    expect(response.body.data.data[0].totalCount[0].count).to.equal(10)
  })

  it.only('Verify user list data on page 3 with limit 10 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 2 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(6)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList.slice(20,26))
    expect(response.body.data.data[0].totalCount[0].count).to.equal(6)
  })

  it.only('Verify user list data on page 1 with limit 100 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 0 +'&limit=' + 100, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(26)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList)
    expect(response.body.data.data[0].totalCount[0].count).to.equal(26)
  })

  it.only('Verify user list data with default pagination : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(26)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList)
    expect(response.body.data.data[0].totalCount[0].count).to.equal(26)
  })

  it.only('Verify user list data on page 1 with limit 20 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 0 +'&limit=' + 20, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(20)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList.slice(0,20))
    expect(response.body.data.data[0].totalCount[0].count).to.equal(20)
  })

  it.only('Verify user list data on page 2 with limit 20 : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId2 +'&currentPage='+ 1 +'&limit=' + 20, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults.length).to.equal(6)
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.ordered.members(peopleEmailList.slice(20,26))
    expect(response.body.data.data[0].totalCount[0].count).to.equal(6)
  })



  it.only('Verify member group type : GET api/v1.1/integration/user/membergroup/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(3)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members([attendeegroup, speakergroup, boothmembergroup])
    expect(response.body.data.data.map(map => map.name)).to.have.ordered.members(['Attendee', 'Speaker', 'Booth Member'])
  });

  it.only('Add new group and verify it appears on the attendee group API : GET /api/v1.1/integration/user/membergroup/list', async () => {
    const newgroup =
    {
      "data": {
        "name": "Test Group",
        "group_id": attendeegroup 
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', newgroup)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_add_message)  
    created_group_id = (response.body.data.group_id)
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(4)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members([attendeegroup, speakergroup, boothmembergroup, created_group_id])
    expect(response.body.data.data.map(map => map.name)).to.have.ordered.members(['Attendee', 'Speaker', 'Booth Member', 'Test Group'])
  })

  it.only('Verify member group type of invalid event : GET api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?eventId=' + 99999999, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal('Invalid Access')  

    // expect(response.body.status).to.equal(400)
    // expect(response.body.message).to.equal('Sorry, Some parameter are missing. Please enter all required values.')
  });

  it.only('Verify member group type bad request : GET api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?eventId=' + 99999999, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    // expect(response.body.status).to.equal(400)
    // expect(response.body.message).to.equal('Sorry, Some parameter are missing. Please enter all required values.')

    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal('Invalid Access')  
  });

  
  it.only('Verify matchmaking looking for list : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'get')
    var matchMakingList = response.body.data.matchMakingData.map(map => map.name)
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + eventId + '&type=LOOKINGFOR', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data).to.have.members(matchMakingList)
  })

  it.only('Verify matchmaking offering list : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'lookingfor' }, 'get')
    var matchMakingList = response.body.data.matchMakingData.map(map => map.name)
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + eventId + '&type=OFFERING', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data).to.have.members(matchMakingList)
  })

  it.only('Verify matchmaking interests list : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'interest' }, 'get')
    var matchMakingList = response.body.data.matchMakingData.map(map => map.name)
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + eventId + '&type=INTEREST', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data).to.have.members(matchMakingList)
  })

  it.only('Verify matchmaking industry list : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/matchmaking/details', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'type': 'industry' }, 'get')
    var matchMakingList = response.body.data.matchMakingData.map(map => map.name)
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + eventId + '&type=INDUSTRY', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data).to.have.members(matchMakingList)
  })

  it.only('Verify matchmaking industry list for invalid event : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + 9999999999 + '&type=INDUSTRY', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal('Invalid Access')

    // expect(response.body.status).to.equal(400)
    // expect(response.body.message).to.equal('Sorry, Some parameter are missing. Please enter all required values.')
  })

  it.only('Verify matchmaking industry list for invalid matchmaking type : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + eventId + '&type=ABCD', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    // expect(response.body.status).to.equal(401)
    // expect(response.body.message).to.equal('Invalid Access')

    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Please pass type from LOOKINGFOR,OFFERING,INDUSTRY,INTEREST')

  })

  it.only('Verify matchmaking for both invalid eventId for invalid matchmaking type : GET /api/v1.1/integration/user/matchmaking/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/matchmaking/list?eventId=' + 9999999999 + '&type=ABCD', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    // expect(response.body.status).to.equal(401)
    // expect(response.body.message).to.equal('Invalid Access')

    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Please pass type from LOOKINGFOR,OFFERING,INDUSTRY,INTEREST')
  })

  //Add user cases


  it.only('Add user with mandatory fields and rest as blank and verify : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithMandatoryParams,
      "lastName": publicApiTestData.apiUserLnameWithMandatoryParams,
      "email": publicApiTestData.apiUserEmailWithMandatoryParams,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200, 'User creation failed')
    expect(response.body.data.data).to.equal('User Created!', 'User creation failed')
  })

  it.only('Verify user with mandatory field populated and rest data as blank is visible on : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId +'&currentPage='+ 0 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams)
    expect(response.body.data.data[0].paginatedResults[0].eventId).to.be.an('number').and.to.equal(eventId)
    expect(response.body.data.data[0].paginatedResults[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithMandatoryParams)
    expect(response.body.data.data[0].paginatedResults[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParams)
    expect(response.body.data.data[0].paginatedResults[0].groups).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}], 'group name is incorrect')
    expect(response.body.data.data[0].paginatedResults[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data.data[0].paginatedResults[0].customFieldData).to.be.an('array').and.to.have.members([])
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.equal(2)
  })

  it.only('Verify user with mandatory field populated and rest data as blank is visible on : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiUserEmailWithMandatoryParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithMandatoryParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParams)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Add user with only mandatory fields : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithMandatoryParams2,
      "lastName": publicApiTestData.apiUserLnameWithMandatoryParams2,
      "email": publicApiTestData.apiUserEmailWithMandatoryParams2,
      "memberGroupId": [
          attendeegroup
      ], 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200, 'User creation failed')
    expect(response.body.data.data).to.equal('User Created!', 'User creation failed')
  })

  it.only('Verify user with mandatory field populated and rest data as blank is visible on : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId +'&currentPage='+ 0 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data[0].paginatedResults[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams2)
    expect(response.body.data.data[0].paginatedResults[0].eventId).to.be.an('number').and.to.equal(eventId)
    expect(response.body.data.data[0].paginatedResults[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithMandatoryParams2)
    expect(response.body.data.data[0].paginatedResults[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParams2)
    expect(response.body.data.data[0].paginatedResults[0].groups).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}], 'group name is incorrect')
    expect(response.body.data.data[0].paginatedResults[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data.data[0].paginatedResults[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data.data[0].paginatedResults[0].customFieldData).to.be.an('array').and.to.have.members([])
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.equal(3)
  })

  it.only('Verify user with mandatory field populated and rest data as blank is visible on : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email='+ publicApiTestData.apiUserEmailWithMandatoryParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithMandatoryParams2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParams2)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })


  it.only('Add user with all params : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithAllParams,
      "lastName": publicApiTestData.apiUserLnameWithAllParams,
      "email": publicApiTestData.apiUserEmailWithAllParams,
      "password": "Hubilo@1234",
      "phoneCode": publicApiTestData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country,
      "state": publicApiTestData.state,
      "city": publicApiTestData.city,
      "website": publicApiTestData.webSite,
      "interest": interestsList,
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  it.only('Verify new user can check regisered email and login verify user details', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    await signup.checkRegisteredEmail(global.accessTokenLoginPage, publicApiTestData.apiUserEmailWithAllParams)
    
    var jsonObj = {
      "payload": {
          "data": {
              "email": publicApiTestData.apiUserEmailWithAllParams,
              "mode": "PASSWORD",
              "password": 'Hubilo@1234'
          }
      }
    }

    var response = await signup.loginJson(global.accessTokenLoginPage, jsonObj)
    expect(response.body.success.data.firstName).to.equal(publicApiTestData.apiUserFnameWithAllParams)
    expect(response.body.success.data.lastName).to.equal(publicApiTestData.apiUserLnameWithAllParams)
    expect(response.body.success.data.about).to.equal(publicApiTestData.about)
    expect(response.body.success.data.gender).to.equal('Male')
    expect(response.body.success.data.designation).to.equal('SDET')
    expect(response.body.success.data.country).to.equal(publicApiTestData.country)
    expect(response.body.success.data.state).to.equal(publicApiTestData.state)
    expect(response.body.success.data.city).to.equal(publicApiTestData.city)
    expect(response.body.success.data.organisation_name).to.equal('Hubilo')
    expect(response.body.success.data.website).to.equal(publicApiTestData.webSite)
    expect(response.body.success.data.userRole).to.equal('ATTENDEE')
    global.accesstokenloginuser = response.body.success.data.accessToken
    global.userId = response.body.success.data.userId
    global.attendeeId = response.body.success.data._id
  });

  it.only('Verify added attendee with all params is visible for : GET /api/v1.1/integration/user/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId='+ eventId +'&currentPage='+ 0 +'&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data[0].paginatedResults).to.be.an('array')
    expect(response.body.data.data[0].totalCount).to.be.an('array')
    expect(response.body.data.data[0].paginatedResults[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(response.body.data.data[0].paginatedResults[0].eventId).to.be.an('number').and.to.equal(eventId)
    expect(response.body.data.data[0].paginatedResults[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParams)
    expect(response.body.data.data[0].paginatedResults[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParams)
    expect(response.body.data.data[0].paginatedResults[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data.data[0].paginatedResults[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data.data[0].paginatedResults[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data.data[0].paginatedResults[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data.data[0].paginatedResults[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data.data[0].paginatedResults[0].state).to.be.an('string').and.to.equal(publicApiTestData.state)
    expect(response.body.data.data[0].paginatedResults[0].city).to.be.an('string').and.to.equal(publicApiTestData.city)
    expect(response.body.data.data[0].paginatedResults[0].groups).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data.data[0].paginatedResults[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data.data[0].paginatedResults[0].customFieldData).to.be.an('array').and.to.have.members([])
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.equal(4)
    global.loginMagicLink = (response.body.data.data[0].paginatedResults[0].loginMagicLink).split('/invite/')[1]
  })

  it.only('Verify added attendee with all params is visible for : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiUserEmailWithAllParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParams)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    global.addedAttendeeUserId = response.body.data[0].id
  })

  it.only('Verify added user details for user on dashboard : GET /backend/api/v2/people/single', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId, 'userId' : global.addedAttendeeUserId}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParams)
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParams)
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].looking).to.be.an('string').and.to.equal('Web development')
    expect(response.body.data[0].offering).to.be.an('string').and.to.equal('Design')
    expect(response.body.data[0].organisation).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].industry).to.be.an('string').and.to.equal('Banking')
    expect(response.body.data[0].interest).to.be.an('array').that.have.ordered.members(interestsList)
    expect(response.body.data[0].groups).to.be.an('array').that.have.ordered.members([attendeegroup])
  })

  it.only('Verify new user can check magic link access token : POST /api/v2/users/validate/invite-token', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    const payload = {
      "payload": {
        "data": {
          "token": global.loginMagicLink,
          "userId": ""
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/validate/invite-token', { 'Content-Type': 'application/json', 'authorization' :  global.accessTokenLoginPage }, 'post',payload)
    expect(response.body.success.message).to.equal('Token validate successfully')
    global.accesstokenfornewuser = response.body.success.data.accessToken
  });

  it.only('Add user with existing emailId and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithAllParams,
      "lastName": publicApiTestData.apiUserLnameWithAllParams,
      "email": publicApiTestData.apiUserEmailWithAllParams,
      "memberGroupId": [
          attendeegroup
      ], 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400,)
    expect(response.body.message).to.equal('EMAIL ALREADY_EXISTS')
  })

  it.only('Add another user with all params : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithAllParams2,
      "lastName": publicApiTestData.apiUserFnameWithAllParams2,
      "email": publicApiTestData.apiUserFnameWithAllParams2,
      "password": "Hubilo@1234",
      "phoneCode": publicApiTestData.phoneCode2,
      "phone": publicApiTestData.testPhoneNumber2,
      "gender": "Male",
      "about": publicApiTestData.about2,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country2,
      "state": publicApiTestData.state2,
      "city": publicApiTestData.city2,
      "website": publicApiTestData.webSite2,
      "interest": interestsList,
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  //Add member with different group type

  it.only('Add user with member type as speaker and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiSpeakerFnameWithAllParams,
      "lastName": publicApiTestData.apiSpeakerLnameWithAllParams,
      "email": publicApiTestData.apiSpeakerEmailWithAllParams,
      "password": "Hubilo@1234",
      "phoneCode": publicApiTestData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country,
      "state": publicApiTestData.state,
      "city": publicApiTestData.city,
      "website": publicApiTestData.webSite,
      "interest": [],
      "memberGroupId": [
          speakergroup
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })


  it.only('Add user with group member type as custom group : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": piblicAPIData.apiCustomGroupUserFnameWithAllParams,
      "lastName": piblicAPIData.apiCustomGroupUserLnameWithAllParams,
      "email": piblicAPIData.apiCustomGroupUserEmailWithAllParams,
      "password": "Hubilo@1234",
      "phoneCode": piblicAPIData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country2,
      "state": publicApiTestData.state2,
      "city": publicApiTestData.city2,
      "website": publicApiTestData.webSite2,
      "interest": [],
      "memberGroupId": [
          created_group_id
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  it.only('Verify added user with custom group member grouptype : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiCustomGroupUserEmailWithAllParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiCustomGroupUserEmailWithAllParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiCustomGroupUserFnameWithAllParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiCustomGroupUserLnameWithAllParams)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Test Group","groupId": created_group_id}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Add user with group member type as boothmember group : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      "hubiloExhibitorId": String(global.exhibitorId),
      "firstName": piblicAPIData.apiBoothmemberUserFnameWithAllParams,
      "lastName": piblicAPIData.apiBoothmemberUserLnameWithAllParams,
      "email": piblicAPIData.apiBoothmemberUserEmailWithAllParams,
      "password": "Hubilo@1234",
      "phoneCode": piblicAPIData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country2,
      "state": publicApiTestData.state2,
      "city": publicApiTestData.city2,
      "website": publicApiTestData.webSite2,
      "interest": interestsList,
      "memberGroupId": [
          boothmembergroup
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {},
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  it.only('Verify added user with boothmember grouptype : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiBoothmemberUserEmailWithAllParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserEmailWithAllParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserFnameWithAllParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserLnameWithAllParams)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Booth Member","groupId": boothmembergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    global.exhibitorUserId = response.body.data[0].id
  })

  it.only('Verify exhibitor details for user on dashboard : GET /backend/api/v2/people/single', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId, 'userId' : global.exhibitorUserId}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserEmailWithAllParams)
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserFnameWithAllParams)
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserLnameWithAllParams)
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].looking).to.be.an('string').and.to.equal('Web development')
    expect(response.body.data[0].offering).to.be.an('string').and.to.equal('Design')
    expect(response.body.data[0].organisation).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].industry).to.be.an('string').and.to.equal('Banking')
    expect(response.body.data[0].interest).to.be.an('array').that.have.ordered.members(interestsList)
    expect(response.body.data[0].exhibitor_id).to.be.an('number').and.to.equal(global.exhibitorId)
    expect(response.body.data[0].exhibitor_meta.id).to.be.an('number').and.to.equal(global.exhibitorId)
    expect(response.body.data[0].exhibitor_meta.name).to.be.an('string').and.to.equal('Hubilo Exhibitor Booth Updated3')
    
  })

  it.only('Add user with group member type as boothmember group using client exhibitor id : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      "clientExhibitorId": String(global.clientExhibitorId),
      //"hubiloExhibitorId": String(global.exhibitorId),
      "firstName": piblicAPIData.apiBoothmemberUserFnameWithAllParams2,
      "lastName": piblicAPIData.apiBoothmemberUserLnameWithAllParams2,
      "email": piblicAPIData.apiBoothmemberUserEmailWithAllParams2,
      "password": "Hubilo@1234",
      "phoneCode": piblicAPIData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country2,
      "state": publicApiTestData.state2,
      "city": publicApiTestData.city2,
      "website": publicApiTestData.webSite2,
      "interest": interestsList,
      "memberGroupId": [
          boothmembergroup
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {},
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  it.only('Verify added user with boothmember grouptype : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiBoothmemberUserEmailWithAllParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserEmailWithAllParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserFnameWithAllParams2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserLnameWithAllParams2)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Booth Member","groupId": boothmembergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    global.exhibitorUserId = response.body.data[0].id
  })

  it.only('Verify exhibitor details for user on dashboard : GET /backend/api/v2/people/single', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId, 'userId' : global.exhibitorUserId}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserEmailWithAllParams2)
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserFnameWithAllParams2)
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal(publicApiTestData.apiBoothmemberUserLnameWithAllParams2)
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].looking).to.be.an('string').and.to.equal('Web development')
    expect(response.body.data[0].offering).to.be.an('string').and.to.equal('Design')
    expect(response.body.data[0].organisation).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].industry).to.be.an('string').and.to.equal('Banking')
    expect(response.body.data[0].interest).to.be.an('array').that.have.ordered.members(interestsList)
    expect(response.body.data[0].groups).to.be.an('array').that.have.ordered.members([boothmembergroup])
    expect(response.body.data[0].exhibitor_id).to.be.an('number').and.to.equal(global.exhibitorId5)
    expect(response.body.data[0].exhibitor_meta.id).to.be.an('number').and.to.equal(global.exhibitorId5)
    expect(response.body.data[0].exhibitor_meta.name).to.be.an('string').and.to.equal('Large Hubilo Exhibitor Booth ClientId Updated2')
  })

  it.only('Add user with multiple group member : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiMultipleGroupUserFnameWithAllParams,
      "lastName": publicApiTestData.apiMultipleGroupUserLnameWithAllParams,
      "email": publicApiTestData.apiMultipleGroupUserEmailWithAllParams,
      "password": "Hubilo@1234",
      "phoneCode": publicApiTestData.phoneCode,
      "phone": publicApiTestData.testPhoneNumber,
      "gender": "Male",
      "about": publicApiTestData.about,
      "organisation": "Hubilo",
      "designation": "SDET",
      "country": publicApiTestData.country,
      "state": publicApiTestData.state,
      "city": publicApiTestData.city,
      "website": publicApiTestData.webSite2,
      "interest": [],
      "memberGroupId": [
          attendeegroup,
          created_group_id
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('User Created!')
  })

  it.only('Verify added user with multiple group type : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiMultipleGroupUserEmailWithAllParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiMultipleGroupUserEmailWithAllParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiMultipleGroupUserFnameWithAllParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiMultipleGroupUserLnameWithAllParams)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city)
    //expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup},{"groupName": "Speaker","groupId": speakergroup},{"groupName": "Booth Member","groupId": boothmembergroup},{"groupName": "Test Group","groupId": created_group_id}])
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup},{"groupName": "Test Group","groupId": created_group_id}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })


  //Add user negative cases

  it.only('Add user with eventId as invalid and verify error: POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": 0,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams,
      "email": publicApiTestData.apiUserEmailWithInvalidParams,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user without eventId key : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams,
      "email": publicApiTestData.apiUserEmailWithInvalidParams,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })


  it.skip('Add user with eventId as string and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": String(eventId),
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams,
      "email": publicApiTestData.apiUserEmailWithInvalidParams,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })


  it.only('Add user with firstName and lastName as blank and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": "",
      "lastName": "",
      "email": publicApiTestData.apiUserFnameWithInvalidParams2,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user without firstName and lastName key and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "email": publicApiTestData.apiUserFnameWithInvalidParams2,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user with emailId as blank and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams3,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams3,
      "email": "",
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user without emailId and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams3,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams3,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user with member group as as blank and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams3,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams3,
      "email": publicApiTestData.apiUserEmailWithInvalidParams3,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  it.only('Add user without membergroup type key and verify error : POST /api/v1.1/integration/user/add', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithInvalidParams3,
      "lastName": publicApiTestData.apiUserLnameWithInvalidParams3,
      "email": publicApiTestData.apiUserEmailWithInvalidParams3,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/add', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200, 'User creation succesfull, should have failed')
    
  })

  //Update user cases

  it.only('Update user with mandatory fields and rest as blank and verify : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithMandatoryParamsUpdated,
      "lastName": publicApiTestData.apiUserLnameWithMandatoryParamsUpdated,
      "email": publicApiTestData.apiUserEmailWithMandatoryParams,
      "password": "",
      "phoneCode": "",
      "phone": "",
      "gender": "",
      "about": "",
      "organisation": "",
      "designation": "",
      "country": "",
      "state": "",
      "city": "",
      "website": "",
      "interest": [],
      "memberGroupId": [
          attendeegroup
      ], 
      "industry": "",
      "lookingFor": "",
      "offering": "",
      "customFieldData": {},
      "isSendInviteeMail": ""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200, 'User creation failed')
    expect(response.body.data.data).to.equal('Profile updated !', 'User creation failed')
  })

  it.only('Verify updated user with mandatory field populated and rest data as blank is visible on : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiUserEmailWithMandatoryParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithMandatoryParamsUpdated)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParamsUpdated)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Update user with only mandatory and fields and fields to be updated : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "email": publicApiTestData.apiUserEmailWithMandatoryParams2,
      "firstName": publicApiTestData.apiUserLnameWithMandatoryParamsUpdated2,
      "lastName": publicApiTestData.apiUserLnameWithMandatoryParamsUpdated2
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200, 'User creation failed')
    expect(response.body.data.data).to.equal('Profile updated !', 'User creation failed')
  })

  it.only('Verify user updated with on : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiUserEmailWithMandatoryParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithMandatoryParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParamsUpdated2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithMandatoryParamsUpdated2)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeegroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Update user with all params : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": publicApiTestData.apiUserFnameWithAllParamsUpdated,
      "lastName": publicApiTestData.apiUserLnameWithAllParamsUpdated,
      "email": publicApiTestData.apiUserEmailWithAllParams,
      "password": "Hubilo@12345",
      "phoneCode": publicApiTestData.phoneCode2,
      "phone": publicApiTestData.testPhoneNumber2,
      "gender": "Female",
      "about": publicApiTestData.about2,
      "organisation": "Hubilo2",
      "designation": "SDET2",
      "country": publicApiTestData.country2,
      "state": publicApiTestData.state2,
      "city": publicApiTestData.city2,
      "website": publicApiTestData.webSite2,
      "interest": [],
      "memberGroupId": [
          created_group_id
      ], 
      "industry": "Banking",
      "lookingFor": "Web development",
      "offering": "Design",
      "customFieldData": {
          
      },
      "isSendInviteeMail": "YES"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.equal('Profile updated !', 'User creation failed')
  })

  it.only('Verify updated attendee with all params is visible for : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiUserEmailWithAllParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParamsUpdated)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParamsUpdated)
    expect(response.body.data[0].about).to.be.an('string').and.to.equal(publicApiTestData.about2)
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal(publicApiTestData.phoneCode2)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber2)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo2')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET2')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Test Group","groupId": created_group_id}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([created_group_id])
    global.addedAttendeeUserId = response.body.data[0].id
  })

  it.only('Verify added user details for user on dashboard : GET /backend/api/v2/people/single', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId, 'userId' : global.addedAttendeeUserId}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParamsUpdated)
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParamsUpdated)
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal(publicApiTestData.phoneCode2)
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber2)
    expect(response.body.data[0].looking).to.be.an('string').and.to.equal('Web development')
    expect(response.body.data[0].offering).to.be.an('string').and.to.equal('Design')
    expect(response.body.data[0].organisation).to.be.an('string').and.to.equal('Hubilo2')
    expect(response.body.data[0].industry).to.be.an('string').and.to.equal('Banking')
    expect(response.body.data[0].interest).to.be.an('array').that.is.empty
    expect(response.body.data[0].groups).to.be.an('array').that.have.ordered.members([])
  })

  it.only('Verify updated password for user by loggin in', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    await signup.checkRegisteredEmail(global.accessTokenLoginPage, publicApiTestData.apiUserEmailWithAllParams )
    
    var jsonObj = {
      "payload": {
          "data": {
              "email": publicApiTestData.apiUserEmailWithAllParams,
              "mode": "PASSWORD",
              "password": 'Hubilo@12345'
          }
      }
    }

    var response = await signup.loginJson(global.accessTokenLoginPage, jsonObj)
    expect(response.body.success.data.firstName).to.equal(publicApiTestData.apiUserFnameWithAllParamsUpdated)
    expect(response.body.success.data.lastName).to.equal(publicApiTestData.apiUserLnameWithAllParamsUpdated)
    expect(response.body.success.data.about).to.equal(publicApiTestData.about2)
    expect(response.body.success.data.gender).to.equal('Female')
    expect(response.body.success.data.designation).to.equal('SDET2')
    expect(response.body.success.data.country).to.equal(publicApiTestData.country2)
    expect(response.body.success.data.state).to.equal(publicApiTestData.state2)
    expect(response.body.success.data.city).to.equal(publicApiTestData.city2)
    expect(response.body.success.data.organisation_name).to.equal('Hubilo2')
    expect(response.body.success.data.website).to.equal(publicApiTestData.webSite2)
    expect(response.body.success.data.userRole).to.equal('ATTENDEE')
    global.accesstokenloginuser = response.body.success.data.accessToken
    global.userId = response.body.success.data.userId
    global.attendeeId = response.body.success.data._id
  });

  it.only('Update user with emailId passed as empty and verify error : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": "APIUserMandatoryOnly Updated 2",
      "email": "", 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
    
  })

  it.only('Update user without passing emailId and verify error : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": eventId,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": "APIUserMandatoryOnly Updated 2", 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update user with with invalid eventId and verify error : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      "eventId": 0,
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": "APIUserMandatoryOnly Updated",
      "email": "apiuser2@yopmail.com", 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update user without eventId and verify error : POST /api/v1.1/integration/user/update', async () => {
    const payload = {
      // "clientExhibitorId": "EXH-11",
      //"hubiloExhibitorId": "434095",
      "firstName": "APIUserMandatoryOnly Updated",
      "email": "apiuser2@yopmail.com", 
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })



  // it.only('Update user with eventId passed as string and verify error : POST /api/v1.1/integration/user/update', async () => {
  //   const payload = {
  //     "eventId": String(eventId),
  //     // "clientExhibitorId": "EXH-11",
  //     //"hubiloExhibitorId": "434095",
  //     "firstName": "APIUserMandatoryOnly Updated",
  //     "email": "apiuser2@yopmail.com", 
  //   }
  //   var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/update', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
  //   expect(response.body.status).to.not.equal(200)
  // })



})


describe('Public API v1.1 speaker add/update tests', () => {

  before(async () => {
  });

  //Add speaker cases

  it.only('Add speaker with all param : POST /api/v1.1/integration/speaker/upsert', async () => {
    global.clientSpeakerId = String(Math.floor(Math.random() * 1000000))
    const payload = {
      "eventId": String(eventId),
      "operationType":"CREATE",
      "clientSpeakerId": global.clientSpeakerId,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParams2,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParams2,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber,
      "city":publicApiTestData.city,
      "state":publicApiTestData.state,
      "country":publicApiTestData.country,
      "company":"Hubilo",
      "title":"SDET",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage1",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.speakerId = response.body.data.data.speakerId
  })

  it.only('Verify added speaker info : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiSpeakerEmailWithAllParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithAllParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithAllParams2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithAllParams2)
    // expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Speaker","groupId": speakergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    global.speakerUserId = response.body.data[0].id
  })

  it.only('Verify added user details for user on dashboard : GET /backend/api/v2/people/single', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId, 'userId' : global.speakerUserId}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithAllParams2)
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithAllParams2)
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithAllParams2)
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber)
    expect(response.body.data[0].looking).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].offering).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisation).to.be.an('string').and.to.equal('Hubilo')
    expect(response.body.data[0].industry).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].interest).to.be.an('array').that.is.empty
    expect(response.body.data[0].groups).to.be.an('array').that.have.ordered.members([speakergroup])
  })

  it.only('Add speaker with mandatory param and rest as empty : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"CREATE",
      "firstName":publicApiTestData.apiSpeakerFnameWithMandatoryParams,
      "lastName":publicApiTestData.apiSpeakerLnameWithMandatoryParams,
      "email": publicApiTestData.apiSpeakerEmailWithMandatoryParams,
      "phone":"",
      "city":"",
      "state":"",
      "country":"",
      "company":"",
      "title":"",
      "facebookUrl":"",
      "twitterUrl":"",
      "profileImageURL":"",
      "whatsappNumber":"",
      "linkedinUrl":"",
      "instagramUrl":""
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.speakerId2 = response.body.data.data.speakerId
  })

  it.only('Verify added speaker with only mandatory param added and rest as empty : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiSpeakerEmailWithMandatoryParams, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithMandatoryParams)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithMandatoryParams)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithMandatoryParams)
    // expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Speaker","groupId": speakergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Add speaker with only mandatory param : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"CREATE",
      "firstName":publicApiTestData.apiSpeakerFnameWithMandatoryParams2,
      "lastName":publicApiTestData.apiSpeakerLnameWithMandatoryParams2,
      "email":publicApiTestData.apiSpeakerEmailWithMandatoryParams2,
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.speakerId3 = response.body.data.data.speakerId
  })

  it.only('Verify added speaker with only mandatory param : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email='+ publicApiTestData.apiSpeakerEmailWithMandatoryParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithMandatoryParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithMandatoryParams2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithMandatoryParams2)
    // expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Speaker","groupId": speakergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Update speaker with all params without hubilo speaker id and verify error : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated2,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated2,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber2,
      "city":publicApiTestData.city2,
      "state":publicApiTestData.state2,
      "country":publicApiTestData.country2,
      "company":"Hubilo2",
      "title":"SDET2",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
  }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update speaker with all params with invalid hubilo speaker id and verify error : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "hubiloSpeakerId": 0,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated2,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated2,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber2,
      "city":publicApiTestData.city2,
      "state":publicApiTestData.state2,
      "country":publicApiTestData.country2,
      "company":"Hubilo2",
      "title":"SDET2",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
  }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update speaker with all params with invalid client speaker id and verify error : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": "",
      "operationType":"UPDATE",
      "clientSpeakerId": 0,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated2,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated2,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber2,
      "city":publicApiTestData.city2,
      "state":publicApiTestData.state2,
      "country":publicApiTestData.country2,
      "company":"Hubilo2",
      "title":"SDET2",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
  }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update speaker with all params with hubilo speaker id : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "hubiloSpeakerId": global.speakerId,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated2,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated2,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber2,
      "city":publicApiTestData.city2,
      "state":publicApiTestData.state2,
      "country":publicApiTestData.country2,
      "company":"Hubilo2",
      "title":"SDET2",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
  }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
  })

  it.only('Verify updated speaker info : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiSpeakerEmailWithAllParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithAllParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithAllParamsUpdated2)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithAllParamsUpdated2)
    // expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber2)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo2')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET2')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Speaker","groupId": speakergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Update speaker with all params with client speaker id : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "clientSpeakerId": global.clientSpeakerId,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated3,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated3,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber3,
      "city":publicApiTestData.city3,
      "state":publicApiTestData.state3,
      "country":publicApiTestData.country3,
      "company":"Hubilo3",
      "title":"SDET3",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
  })

  it.only('Verify updated speaker info : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId +'&email=' + publicApiTestData.apiSpeakerEmailWithAllParams2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithAllParams2)
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithAllParamsUpdated3)
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerLnameWithAllParamsUpdated3)
    // expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber3)
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('Hubilo3')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('SDET3')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal(publicApiTestData.country3)
    expect(response.body.data[0].state).to.be.an('string').and.to.equal(publicApiTestData.state3)
    expect(response.body.data[0].city).to.be.an('string').and.to.equal(publicApiTestData.city3)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Speaker","groupId": speakergroup}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
  })

  it.only('Update speaker with all params with client speaker id and hubilo speaker id : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "clientSpeakerId": global.clientExhibitorId,
      "hubiloSpeakerId": global.speakerId,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated3,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated3,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber3,
      "city":publicApiTestData.city3,
      "state":publicApiTestData.state3,
      "country":publicApiTestData.country3,
      "company":"Hubilo3",
      "title":"SDET3",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update speaker with all params with client speaker id and hubilo speaker id belonging to different user and verify error : POST /api/v1.1/integration/speaker/upsert', async () => {
    const payload = {
      "eventId": String(eventId),
      "operationType":"UPDATE",
      "clientSpeakerId": global.clientSpeakerId,
      "hubiloSpeakerId": global.speakerId2,
      "firstName":publicApiTestData.apiSpeakerFnameWithAllParamsUpdated3,
      "lastName":publicApiTestData.apiSpeakerLnameWithAllParamsUpdated3,
      "email":publicApiTestData.apiSpeakerEmailWithAllParams2,
      "phone": publicApiTestData.testPhoneNumber3,
      "city":publicApiTestData.city3,
      "state":publicApiTestData.state3,
      "country":publicApiTestData.country3,
      "company":"Hubilo3",
      "title":"SDET3",
      "facebookUrl":publicApiTestData.facebookUrl,
      "twitterUrl":publicApiTestData.twitterUrl,
      "profileImageURL":"ProfileImage2",
      "whatsappNumber":publicApiTestData.whatsAppNumber,
      "linkedinUrl":publicApiTestData.linkedinUrl,
      "instagramUrl":publicApiTestData.instagramUrl
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })



})

var speakerList = []


describe('Public API v1.1 get speaker list tests', () => {

  var speakergroup2

  before(async () => {

    var response = await loginToDashboardUsingUsernameAndPassword(myemail, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)

    //Create event for pagination check for speakers
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var now = new Date()
    var todayDate = 
    eventId2 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventSpeakerPaginationCheck', 'description fokr new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    //Get speaker group id
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    speakergroup2 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")

    //Add category
    const payload = {"data":{"name":"SpeakerCategory1"}}
    var response2 = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/speaker/cateogry/add', { 'organiserId': global.OrganizerId, 'eventId': eventId2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', payload)
    global.speakerCategoryId = response2.body.data.id
    global.speakerCategoryName = response2.body.data.name

    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()
    global.listSessionId1 = await session.createSessionAndVerify(organizerUserHeader(), eventId2, 'ListSessionOne','', '', 'Session List check 1', sessionStartTime, sessionEndTime)
    global.listSessionId2 = await session.createSessionAndVerify(organizerUserHeader(), eventId2, 'ListSessionTwo','', '', 'Session List check 2', sessionStartTime, sessionEndTime)

    var people = new People()
    multipleFiles = [{"filename":"1797_6668_580551001643177045.pdf","format":"pdf","real_filename":"pdf1_485227260281221.pdf"},{"filename":"1797_6668_580551001643177046.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"},{"filename":"1797_6668_580551001643177047.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"}]
    interestsList = [
      "Hiking",
      "Investing",
      "Digital Marketing"
    ]
    global.timeStamp2_1 = Math.round(Date.now()/1000) * 1000
    global.listSpeakerId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'speakerlistusertest@yopmail.com', 'SpeakerListUser', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', interestsList, '3971_5650_662620001619006566.png', true, true, 0, multipleFiles, '9988887777', '91', [global.listSessionId1, global.listSessionId2])
    global.timeStamp2_2 = Math.round(Date.now()/1000) * 1000
    speakerList.push('speakerlistusertest@yopmail.com')
    await people.updateSingleAttendee(organizerUserHeader(), eventId2, global.listSpeakerId, 'speakerlistusertest@yopmail.com', 'SpeakerListUser', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', interestsList, '3971_5650_662620001619006566.png', true, true, 0, multipleFiles, '9988887777', '91', [global.listSessionId1, global.listSessionId2], global.speakerCategoryId)
    global.timeStamp2_3 = Math.round(Date.now()/1000) * 1000
    


    global.timeStamp3_1 = Math.round(Date.now()/1000) * 1000
    global.listSpeakerId1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'speakerlistusertest1@yopmail.com', 'SpeakerListUser1', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', [], '', true, true, 0, [], '9988887777', '91', [global.listSessionId1])
    global.timeStamp3_2 = Math.round(Date.now()/1000) * 1000
    speakerList.push('speakerlistusertest1@yopmail.com')
    await people.updateSingleAttendee(organizerUserHeader(), eventId2, global.listSpeakerId1, 'speakerlistusertest1@yopmail.com', 'SpeakerListUser1', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', [], '', true, true, 0, [], '9988887777', '91', [global.listSessionId1], global.speakerCategoryId)
    global.timeStamp3_3 = Math.round(Date.now()/1000) * 1000

    global.timeStamp4_1 = Math.round(Date.now()/1000) * 1000
    global.listSpeakerId2 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'speakerlistusertest2@yopmail.com', 'SpeakerListUser2', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', [], '', true, true, 0, [], '9988887777', '91', [])
    global.timeStamp4_2 = Math.round(Date.now()/1000) * 1000
    speakerList.push('speakerlistusertest2@yopmail.com')
    // await people.updateSingleAttendee(organizerUserHeader(), eventId2, global.listSpeakerId2, 'speakerlistusertest2@yopmail.com', 'SpeakerListUser2', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', [], '', true, true, 0, [], '9988887777', '91', [], global.speakerCategoryId)
    // global.timeStamp4_3 = Math.round(Date.now()/1000) * 1000


    for(var i=3; i <= 25 ; i++){
      var people = new People()
      var sessionId = global.listSessionId1

      if(i>20){
        sessionId = global.listSessionId2
      }
      await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'speakerlistusertest' + i + '@yopmail.com', 'SpeakerListUser' + i, 'TestUser' + i, [speakergroup2], 'accountant', 'testing', 'accounting', interestsList, '3971_5650_662620001619006566.png', true, true, 0, multipleFiles, '9988887777', '91', [sessionId])
      speakerList.push( 'speakerlistusertest' + i + '@yopmail.com')
    }  
  
  });

  
  //Get speakers list

  it.only('GET speakers list for speaker created from dashboard without session details and category : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    var result = response.body.data.data.filter( obj => obj.email == 'speakerlistusertest2@yopmail.com')[0]
    expect(result).to.not.be.undefined
    expect(response.body.data.currentPage).to.be.an('number').to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(1)
    expect(result.speakerName).to.be.an('string').and.to.equal('SpeakerListUser2 TestUser')
    expect(result.email).to.be.an('string').and.to.equal('speakerlistusertest2@yopmail.com')
    expect(result.whatsappNo).to.be.an('string').and.to.equal('')
    expect(result.fbUrl).to.be.an('string').and.to.equal('')
    expect(result.linkedinUrl).to.be.an('string').and.to.equal('')
    expect(result.twitterUrl).to.be.an('string').and.to.equal('')
    expect(result.instagramUrl).to.be.an('string').and.to.equal('')
    expect(result.profileImg).to.be.an('string').and.to.equal('')
    expect(result.shortDescription).to.be.an('string').and.to.equal('')
    expect(result.longDescription).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('string').and.to.equal('')
    expect(result.presentationTitle).to.be.an('string').and.to.equal('')
    expect(result.presentation).to.be.an('string').and.to.equal('')
    expect(result.presentationFileName).to.be.an('string').and.to.equal('')
    expect(result.createTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp4_1) && (parseInt(str) <= global.timeStamp4_2) )
    var createdMili = parseInt(result.createTimeMilli)
    expect(result.updateTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp4_1) && (parseInt(str) <= global.timeStamp4_2) )  
    var updatedMili = parseInt(result.updateTimeMilli)
    expect(result.eventId).to.be.an('number').and.to.equal(eventId2)
    expect(result.isRating).to.be.an('number').and.to.equal(1)
    expect(result.categoryName).to.be.an('string').and.to.equal('')
    expect(result.categoryId).to.be.null
    // expect(result.categoryName).to.be.an('string').and.to.equal(global.speakerCategoryName)
    // expect(result.categoryId).to.be.an('number').and.to.equal(global.speakerCategoryId)
    expect(result.sessionDetails).to.be.an('array').and.to.be.empty
    // expect(result.sessionId).to.be.an('string').and.to.equal('')
  });

  it.only('GET speakers list for speaker created from dashboard with one session and category : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    var result = response.body.data.data.filter( obj => obj.email == 'speakerlistusertest1@yopmail.com')[0]
    expect(result).to.not.be.undefined
    expect(result.speakerName).to.be.an('string').and.to.equal('SpeakerListUser1 TestUser')
    expect(result.email).to.be.an('string').and.to.equal('speakerlistusertest1@yopmail.com')
    expect(result.whatsappNo).to.be.an('string').and.to.equal('')
    expect(result.fbUrl).to.be.an('string').and.to.equal('')
    expect(result.linkedinUrl).to.be.an('string').and.to.equal('')
    expect(result.twitterUrl).to.be.an('string').and.to.equal('')
    expect(result.instagramUrl).to.be.an('string').and.to.equal('')
    expect(result.profileImg).to.be.an('string').and.to.equal('')
    expect(result.shortDescription).to.be.an('string').and.to.equal('')
    expect(result.longDescription).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('string').and.to.equal('')
    expect(result.presentationTitle).to.be.an('string').and.to.equal('')
    expect(result.presentation).to.be.an('string').and.to.equal('')
    expect(result.presentationFileName).to.be.an('string').and.to.equal('')
    expect(result.createTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp3_1) && (parseInt(str) <= global.timeStamp3_2) )
    var createdMili = parseInt(result.createTimeMilli)
    expect(result.updateTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp3_2) && (parseInt(str) <= global.timeStamp3_3) )  
    var updatedMili = parseInt(result.updateTimeMilli)
    expect(result.eventId).to.be.an('number').and.to.equal(eventId2)
    expect(result.isRating).to.be.an('number').and.to.equal(1)
    expect(result.categoryName).to.be.an('string').and.to.equal(global.speakerCategoryName)
    expect(result.categoryId).to.be.an('number').and.to.equal(global.speakerCategoryId)
    expect(result.sessionDetails).to.be.an('array').that.have.lengthOf(1).and.have.deep.members([{ 'sessionName' : 'ListSessionOne', 'sessionId' : global.listSessionId1, 'position' : 0, 'tags' : ''}])
    // expect(result.sessionId).to.be.an('string').and.to.equal('')

    expect(result.updatedAt).to.be.an('string').and.to.satisfy(str => new Date(updatedMili).toISOString() == str )
    expect(result.createdAt).to.be.an('string').and.to.satisfy(str => new Date(createdMili).toISOString() == str )
  })

  it.only('GET speakers list for speaker created from dashboard with downloadable presentaiton files and profile image : GET /api/v1.1/integration/speaker/list', async () => {
    var brochureCommonPath = environment.baseURL4 + '/brochure/' + global.OrganizerId + '/'
    var multipleFilesResponse = [{"filename": brochureCommonPath + "1797_6668_580551001643177045.pdf","format":"pdf","real_filename":"pdf1_485227260281221.pdf"},
    {"filename": brochureCommonPath + "1797_6668_580551001643177046.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"},
    {"filename": brochureCommonPath + "1797_6668_580551001643177047.pdf","format":"pdf","real_filename":"pdf2_485227260281221.pdf"}]
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    var result = response.body.data.data.filter( obj => obj.email == 'speakerlistusertest@yopmail.com')[0]
    expect(result).to.not.be.undefined
    expect(result.speakerName).to.be.an('string').and.to.equal('SpeakerListUser TestUser')
    expect(result.email).to.be.an('string').and.to.equal('speakerlistusertest@yopmail.com')
    expect(result.whatsappNo).to.be.an('string').and.to.equal('')
    expect(result.fbUrl).to.be.an('string').and.to.equal('')
    expect(result.linkedinUrl).to.be.an('string').and.to.equal('')
    expect(result.twitterUrl).to.be.an('string').and.to.equal('')
    expect(result.instagramUrl).to.be.an('string').and.to.equal('')
    expect(result.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/3971_5650_662620001619006566.png')
    expect(result.shortDescription).to.be.an('string').and.to.equal('')
    expect(result.longDescription).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('string').and.to.equal(JSON.stringify(multipleFilesResponse))
    expect(result.presentationTitle).to.be.an('string').and.to.equal('')
    expect(result.presentation).to.be.an('string').and.to.equal('pdf1_485227260281221.pdf')
    expect(result.presentationFileName).to.be.an('string').and.to.equal(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/1797_6668_580551001643177045.pdf')
    expect(result.createTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp2_1) && (parseInt(str) <= global.timeStamp2_2) )
    var createdMili = parseInt(result.createTimeMilli)
    expect(result.updateTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp2_2) && (parseInt(str) <= global.timeStamp2_3) )  
    var updatedMili = parseInt(result.updateTimeMilli)
    expect(result.eventId).to.be.an('number').and.to.equal(eventId2)
    expect(result.isRating).to.be.an('number').and.to.equal(1)
    expect(result.categoryName).to.be.an('string').and.to.equal(global.speakerCategoryName)
    expect(result.categoryId).to.be.an('number').and.to.equal(global.speakerCategoryId)
    // expect(result.sessionName).to.be.an('string').and.to.equal('')
    // expect(result.sessionId).to.be.an('string').and.to.equal('')
    expect(result.sessionDetails).to.be.an('array').that.have.lengthOf(2).and.have.deep.members([{ 'sessionName' : 'ListSessionOne', 'sessionId' : global.listSessionId1, 'position' : 0, 'tags' : ''}, { 'sessionName' : 'ListSessionTwo', 'sessionId' : global.listSessionId2, 'position' : 0, 'tags' : ''}])
    expect(result.updatedAt).to.be.an('string').and.to.satisfy(str => new Date(updatedMili).toISOString() == str )
    expect(result.createdAt).to.be.an('string').and.to.satisfy(str => new Date(createdMili).toISOString() == str )
  })

  it.only('GET speakers list verify speakers clientSpeakerId and hubiloSpeakerId : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    var result = response.body.data.data.filter( obj => obj.email == publicApiTestData.apiSpeakerEmailWithAllParams2)[0]
    expect(result).to.not.be.undefined
    
    expect(result.hubiloSpeakerId).to.be.an('number').and.to.equal(global.speakerId)
    expect(result.clientSpeakerId).to.be.an('string').and.to.equal(global.clientSpeakerId)
    expect(result.speakerName).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerFnameWithAllParamsUpdated3.toLowerCase() + ' ' + publicApiTestData.apiSpeakerLnameWithAllParamsUpdated3.toLowerCase())
    expect(result.email).to.be.an('string').and.to.equal(publicApiTestData.apiSpeakerEmailWithAllParams2)
    expect(result.whatsappNo).to.be.an('string').and.to.equal(publicApiTestData.whatsAppNumber)
    expect(result.fbUrl).to.be.an('string').and.to.equal(publicApiTestData.facebookUrl)
    expect(result.linkedinUrl).to.be.an('string').and.to.equal(publicApiTestData.linkedinUrl)
    expect(result.twitterUrl).to.be.an('string').and.to.equal(publicApiTestData.twitterUrl)
    expect(result.instagramUrl).to.be.an('string').and.to.equal(publicApiTestData.instagramUrl)
    expect(result.profileImg).to.be.an('string').and.to.equal('')
    expect(result.shortDescription).to.be.an('string').and.to.equal('')
    expect(result.longDescription).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('string').and.to.equal('')
    expect(result.presentationTitle).to.be.an('string').and.to.equal('')
    expect(result.presentation).to.be.an('string').and.to.equal('')
    expect(result.presentationFileName).to.be.an('string').and.to.equal('')
    //expect(result.createTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp2_1) && (parseInt(str) <= global.timeStamp2_2) )
    var createdMili = parseInt(result.createTimeMilli)
    //expect(result.updateTimeMilli).to.be.an('string').and.to.satisfy(str => (parseInt(str) >= global.timeStamp2_2) && (parseInt(str) <= global.timeStamp2_3) )  
    var updatedMili = parseInt(result.updateTimeMilli)
    expect(result.eventId).to.be.an('number').and.to.equal(eventId)
    expect(result.isRating).to.be.an('number').and.to.equal(0)
    expect(result.categoryName).to.be.an('string').and.to.equal('')
    expect(result.categoryId).to.equal(null)
    // expect(result.sessionName).to.be.an('string').and.to.equal('')
    // expect(result.sessionId).to.be.an('string').and.to.equal('')
    expect(result.sessionDetails).to.be.an('array').and.to.be.empty
    expect(result.updatedAt).to.be.an('string').and.to.satisfy(str => new Date(updatedMili).toISOString() == str )
    expect(result.createdAt).to.be.an('string').and.to.satisfy(str => new Date(createdMili).toISOString() == str )
  })

  // //Pagination with only event

  it.only('GET speakers list for page 1 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 0 + '&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(0,10))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(3)
  })

  it.only('GET speakers list for page 2 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 1 + '&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(10,20))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(1)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(3)
  })

  it.only('GET speakers list for page 3 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 2 + '&limit=' + 10, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(6)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(20,26))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(2)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(3)
  })

  it.only('GET speakers list for page 1 with limit 20 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 0 + '&limit=' + 20, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(20)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(0,20))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(2)
  })

  it.only('GET speakers list for page 2 with limit 20 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 1 + '&limit=' + 20, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(6)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(20,26))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(1)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(2)
  })
  
  it.only('GET speakers list for page 1 with limit 100 : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 0 + '&limit=' + 100, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(26)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(0,26))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(1)
  })

  it.only('GET speakers list default pagination : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(26)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(0,26))
    expect(response.body.data.currentPage).to.be.an('number').to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').to.equal(1)
  })

  it.only('GET speakers list for pagination limit less than 10 and verify 10 elements are fetched by default : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 0 + '&limit=' + 5, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Limit must be more than 10')
    // expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    // expect(response.body.status).to.equal(200)
    // expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    // expect(response.body.data.data.length).to.equal(5)
    // expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList.slice(0,10))
  })

  it.only('GET speakers with negative pageLimit : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=' + 0 + '&limit=-10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    
    expect(response.body.status).to.equal(400)
    expect(response.body.message).to.equal('Limit must be more than 10')
  })

  it.only('GET speakers with negative currentPage : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=-1&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    
    expect(response.body.status).to.equal(500)
    expect(response.body.message).to.equal('Something went wrong. Please try again.')
  })

  it.only('GET speakers with currentPage and limit values other than number : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&currentPage=one&limit=ten', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get') 
    
    expect(response.body.status).to.not.equal(200)
    //expect(response.body.message).to.equal('Something went wrong. Please try again.')
  })

  it.only('GET speakers list with sessionId filter : GET /api/v1.1/integration/speaker/list', async () => {
    var people = new People()
    await people.updateSingleAttendee(organizerUserHeader(), eventId2, global.listSpeakerId2, 'speakerlistusertest2@yopmail.com', 'SpeakerListUser2', 'TestUser', [speakergroup2], 'accountant', 'testing', 'accounting', [], '', true, true, 0, [], '9988887777', '91', [global.listSessionId1], global.categoryId)
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&sessionId=' + global.listSessionId1, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(21)
    expect(response.body.data.data.map(map => map.email)).to.have.members(speakerList.slice(0,21))
  })

  it.only('GET speakers list with sessionId filter using 2nd session : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&sessionId=' + global.listSessionId2, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(6)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(['speakerlistusertest@yopmail.com'].concat(speakerList.slice(21,26)))
  })

  it.only('GET speakers list with sessionId and email filter : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&sessionId=' + global.listSessionId2 + '&email=speakerlistusertest@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(['speakerlistusertest@yopmail.com'])
  })

  it.only('GET speakers list with email filter : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&email=speakerlistusertest@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(1)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(['speakerlistusertest@yopmail.com'])
  })

  it.only('GET speakers list with email filter and empty email id : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&email=', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(26)
    expect(response.body.data.data.map(map => map.email)).to.have.ordered.members(speakerList)
  })

  it.only('GET speakers list with email filter and partial email id : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId2 + '&email=speakerlistusertest', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(0)
    expect(response.body.data.data.map(map => map.email)).to.be.empty
  })

  it.only('GET speakers list without passing eventId and verify error : GET /api/v1.1/integration/speaker/list', async () => {
    var people = new People()
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.status).to.not.equal(200)
  })

  it.only('GET speakers list with invalid eventId and verify error : GET /api/v1.1/integration/speaker/list', async () => {
    var people = new People()
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=0', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.status).to.not.equal(200)
  })

  it.only('GET speakers list with sessionId from other eventId and verify error : GET /api/v1.1/integration/speaker/list', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/speaker/list?eventId=' + eventId + '&sessionId=' + global.listSessionId1, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.status).to.equal(200)
    expect(response.body.data).to.be.an('object').that.have.property('data').that.is.an('array')
    expect(response.body.data.data.length).to.equal(0)
    expect(response.body.data.data).to.be.empty
  })


})

var peopleList = []
var sessionList = []
var sessionIdForCheckingRegistration

describe('Public API v1.1 Session tests', () => {

  before(async () => {

    //Add agenda days
    var now = new Date()
    var todayDate = getAgendaDateInFormat(new Date().getTime())
    var nextWeek = getAgendaDateInFormat(addDays(now, 3).getTime())
    const session10 = {
      "data": {
        "end_date": nextWeek,
        "start_date": todayDate
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays',{'organiserId': global.OrganizerId, 'eventId' : eventId, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);

    //Add 20 sessions to validate pagination

    var session = new Session();
    
    for (var i=1;i<=25;i++){
      var sessionEndTime = (addTime(new Date(), 1 + i)).getTime()
      var sessionStartTime = (addTime(new Date(), 0 + i)).getTime()
      var sessionid = await session.createSessionAndVerify(organizerUserHeader(), eventId, 'Test Future Session' + i,'', '', 'Test Session Description' + i, sessionStartTime, sessionEndTime)
      sessionList.push(sessionid)
    }

    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()

    sessionIdForCheckingRegistration = await session.createSessionAndVerify(organizerUserHeader(), eventId, 'Test Future Session for registration','', '', 'Test Session Description for registration', sessionStartTime, sessionEndTime)

    sessionList = [sessionIdForCheckingRegistration].concat(sessionList)


    var people = new People();
    global.registrationUser1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'registrationattendeeuser1@yopmail.com', 'RegistrationAttendeeUser1', 'Attendee', [attendeegroup], 'accountant', 'testing', 'accounting', interestsList, '3971_5650_662620001619006566.png', true, true, 0, multipleFiles, '9988887777', '91')
    global.registrationUser2 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'registrationattendeeuser2@yopmail.com', 'RegistrationAttendeeUser2', 'Attendee', [attendeegroup])
    global.registrationUser3 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId, 'registrationattendeeuser3@yopmail.com', 'RegistrationAttendeeUser3', 'Attendee', [attendeegroup])

    //Enable waitlist registration

    const customupdate =
    {
      "data": {
        "is_attendee_registration": 1,
        "is_registration_status_open": 1,
        "is_waitlist_after_limit": 0,
        "is_let_unregister": 1,
        "is_waitlist_registration": 1,
        "is_registration_start_immidiately": 1,
        "is_registration_end_on_session_start": 1,
        "registration_end_time_milli": "",
        "registration_limit": "",
        "registration_start_time_milli": "",
        "is_apply_all": 0,
        "is_restricted": 0,
        "access_real_file_name": "",
        "access_file_name": "",
        "is_language_interpretation": 0,
        "interpretation_service_meta_id": 1,
        "interpretation_service_token_link": "",
        "emails": [],
        "groups": [],
        "is_custom_iframe": false,
        "custom_iframe_btn_label": "",
        "custom_iframe_code": "",
        "is_email_certificate": 0,
        "is_survey_filled": 0,
        "is_on_demand_eligibility": 0,
        "is_cep_enabled": 0,
        "eligibility_percentage": 0,
        "credit_point": 0
      }
    }

    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced',{'organiserId': global.OrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionIdForCheckingRegistration},'put',customupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update, 'session registration enable failed');



  });

  it.only('View all session list for page 1 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.members(sessionList.slice(0,10))
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list for page 2 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=2&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.members(sessionList.slice(10,20))
    expect(response.body.data.currentpage).to.equal(2)
    //expect(response.body.data.totalPages).to.equal(3)
    //expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list for page 3 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=3&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(6)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.members(sessionList.slice(20,26))
    expect(response.body.data.currentpage).to.equal(3)
    //expect(response.body.data.totalPages).to.equal(3)
    //expect(response.body.data.count).to.equal(26)
  })

  it.only('Verify default pagination : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.members(sessionList.slice(0,10))
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list for page 1 with page limit 20 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=20', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(20)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.members(sessionList.slice(0,20))
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(2)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list for page 1 with page limit 100 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(26)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.ordered.members(sessionList)
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list for page 1 with page limit 100 : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(26)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.ordered.members(sessionList)
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list with sort by asc : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=10&sortBy=asc', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.ordered.members(sessionList.slice(0,10))
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('View all session list with sort by desc : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=1&limit=10&sortBy=desc', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.data.map(map => map.agendaId)).to.have.ordered.members(Array.from(sessionList).reverse().slice(0,10))
    expect(response.body.data.currentpage).to.equal(1)
    expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.count).to.equal(26)
  })

  it.only('Verify invalid page and pagelimit : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId + '&currentPage=one&limit=twenty-five', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add track to event : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "operationType" : "CREATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.trackId = response.body.data.data.hubiloTrackId
  })

  it.only('Add track to event with invalid eventId and verify error : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": 0,
      "operationType" : "CREATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add track to event without operationType and verify error : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Add track to event with only mandatory parameters : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "operationType" : "CREATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack2",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.trackId2 = response.body.data.data.hubiloTrackId
  })

  it.only('Verify tracks list on dashboard :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.id)).to.have.members([global.trackId, global.trackId2])
    expect(response.body.data.map(map => map.name)).to.have.members(['SessionTrack','SessionTrack2'])
    expect(response.body.data[0].sessionCount).to.equal(0)
    expect(response.body.data[1].sessionCount).to.equal(0)
  });

  it.only('Delete track from dashboard and add the same track name : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    //Delete the track from dashboard
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/delete', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'trackid' : global.trackId2 }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Delete)
    const payload = {
      "eventId": eventId,
      "operationType" : "CREATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack2",
    }
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    global.trackId2 = response.body.data.data.hubiloTrackId
  })

  it.only('Verify tracks list on dashboard :- GET /backend/api/v2/events/session/tracks', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks', { 'organiserId': global.OrganizerId, 'eventId': eventId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.map(map => map.id)).to.have.members([global.trackId, global.trackId2])
    expect(response.body.data.map(map => map.name)).to.have.members(['SessionTrack','SessionTrack2'])
    expect(response.body.data[0].sessionCount).to.equal(0)
    expect(response.body.data[1].sessionCount).to.equal(0)
  });

  it.only('Update track details without trackId and verify error : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "operationType" : "UPDATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Pass invalid operation type and verify error : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "operationType" : "ANY",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Update track details : POST /api/v1.1/integration/session/track/upsert', async () => {
    var now = new Date()
    const payload = {
      "eventId": eventId,
      "hubiloTrackId": global.trackId,
      "operationType" : "UPDATE",
      "agendaTrackDate":  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
      "name": "SessionTrack",
      "colorCode": "#fffff"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/track/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    
    expect(response.body.status).to.equal(200)
  })

  it.only('Add session with all params : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime = (addTime(new Date(), 1)).getTime()
    global.sessionStartTime = new Date().getTime()
    global.clientSessionId  = String(Math.floor(Math.random() * 1000000))
    const payload = {
      "eventId": eventId,
      "clientSessionId" : global.clientSessionId,
      "operationType" :  "CREATE",
      "name": "Session With All Params",
      "startTimeMilli": String(global.sessionStartTime),
      "endTimeMilli": String(global.sessionEndTime),
      "clientSessionSpeakers": [],
      "hubiloSessionSpeakers": [global.speakerId, global.speakerId2],
      "trackId" : String(global.trackId),
      "description" : "This is a session with all parameters defined"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    
    global.sessionId = response.body.data.data.hubiloSessionId
    expect(response.body.status).to.equal(200)
    
  })

  it.only('Verify agenda on dashboard', async () => {
    var response = await getSessionDetails(process.env.eToken, global.OrganizerId, eventId, global.sessionId)
    
    expect(response.data.details.id).to.equal(global.sessionId)
    expect(response.data.details.name).to.equal('Session With All Params')
    expect(response.data.details.description).to.equal('This is a session with all parameters defined')
    expect(response.data.details.start_time_milli).to.equal(global.sessionStartTime)
    expect(response.data.details.end_time_milli).to.equal(global.sessionEndTime)
    expect(response.data.details.speakers.map(map => map.id)).to.have.members([global.speakerId, global.speakerId2])
    expect(response.data.details.agenda_track.id).to.equal(global.trackId)
    expect(response.data.details.agenda_track.name).to.equal('SessionTrack')
  })

  it.only('View all session list : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With All Params')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime) + 'T00:00:00.000Z')
    expect(result.agendaDescription).to.be.an('string').to.equal('This is a session with all parameters defined')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime))
    expect(result.speakers.map(map => map.speakerId)).to.be.an('array').to.have.members([global.speakerId, global.speakerId2])
  })

  it.only('Add session with mandatory all params : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "CREATE",
      "name": "Session With Mandatory Params",
      "startTimeMilli": String(global.sessionStartTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    global.sessionId2 = response.body.data.data.hubiloSessionId
    expect(response.body.status).to.equal(200)

  })

  it.only('Verify agenda on dashboard', async () => {
    var response = await getSessionDetails(process.env.eToken, global.OrganizerId, eventId, global.sessionId2)
    
    expect(response.data.details.id).to.equal(global.sessionId2)
    expect(response.data.details.name).to.equal('Session With Mandatory Params')
    expect(response.data.details.description).to.equal('')
    expect(response.data.details.start_time_milli).to.equal(global.sessionStartTime2)
    expect(response.data.details.end_time_milli).to.equal(global.sessionEndTime2)
    expect(response.data.details.speakers).to.be.empty
    expect(response.data.details.agenda_track).to.equal(null)
  })

  it.only('View all session list : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId2)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId2)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With Mandatory Params')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime2) + 'T00:00:00.000Z')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime2))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime2))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime2))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime2))
    expect(result.speakers).to.be.an('array').and.to.be.empty
    expect(response.body.status).to.equal(200)
  })

  it.only('Add session with out eventId and verify error : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "operationType" :  "CREATE",
      "name": "Session With Invalid Params",
      "startTimeMilli": String(global.sessionEndTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session without session name and verify error : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "CREATE",
      "startTimeMilli": String(global.sessionEndTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session without starttime and endtime : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "CREATE",
      "name": "Session With Invalid Params",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session without session name and verify error  : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "CREATE",
      "name": "",
      "startTimeMilli": String(global.sessionEndTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session with invalid operation type and verify error  : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "ANY",
      "name": "Session With Invalid Params",
      "startTimeMilli": String(global.sessionEndTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session without operation type and verify error : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime2 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime2 = (addTime(new Date(), 2)).getTime()
    const payload = {
      "eventId": eventId,
      "name": "Session With Invalid Params",
      "startTimeMilli": String(global.sessionEndTime2),
      "endTimeMilli": String(global.sessionEndTime2),
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)

  })

  it.only('Add session with both clientSessionSpeakers and hubiloSessionSpeakers and verify error : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime = (addTime(new Date(), 1)).getTime()
    global.sessionStartTime = new Date().getTime()
    global.clientSessionId = String(Math.floor(Math.random() * 1000000))
    const payload = {
      "eventId": eventId,
      "clientSessionId" : global.clientSessionId,
      "operationType" :  "CREATE",
      "name": "Session With All Params",
      "startTimeMilli": String(global.sessionEndTime),
      "endTimeMilli": String(global.sessionEndTime),
      "clientSessionSpeakers": [global.clientSpeakerId],
      "hubiloSessionSpeakers": [global.speakerId2, global.speakerId3],
      "trackId" : String(global.trackId),
      "description" : "This is a session with all parameters defined"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    
    expect(response.body.status).to.not.equal(200)
    
  })

  // Session update cases

  it.only('Update session with all params using hubilo sesison Id  : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime3 = (addTime(new Date(), 2)).getTime()
    global.sessionStartTime3 = new Date().getTime()
    const payload = {
      "eventId": eventId,
      "hubiloSessionId" : global.sessionId,
      "operationType" :  "UPDATE",
      "name": "Session With All Params Updated",
      "startTimeMilli": String(global.sessionStartTime3),
      "endTimeMilli": String(global.sessionEndTime3),
      "clientSessionSpeakers": [],
      "hubiloSessionSpeakers": [global.speakerId, global.speakerId2, global.speakerId3],
      "trackId" : String(global.trackId2),
      "description" : "This is a session with all parameters defined updated"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    
  })

  it.only('Verify agenda on dashboard', async () => {
    var response = await getSessionDetails(process.env.eToken, global.OrganizerId, eventId, global.sessionId)
    
    expect(response.data.details.id).to.equal(global.sessionId)
    expect(response.data.details.name).to.equal('Session With All Params Updated')
    expect(response.data.details.description).to.equal('This is a session with all parameters defined updated')
    expect(response.data.details.start_time_milli).to.equal(global.sessionStartTime3)
    expect(response.data.details.end_time_milli).to.equal(global.sessionEndTime3)
    expect(response.data.details.speakers.map(map => map.id)).to.have.members([global.speakerId, global.speakerId2, global.speakerId3])
    expect(response.data.details.agenda_track.id).to.equal(global.trackId2)
    expect(response.data.details.agenda_track.name).to.equal('SessionTrack2')
  })

  it.only('View all session list : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With All Params Updated')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime3) + 'T00:00:00.000Z')
    expect(result.agendaDescription).to.be.an('string').to.equal('This is a session with all parameters defined updated')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime3))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime3))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime3))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime3))
    expect(result.speakers.map(map => map.speakerId)).to.be.an('array').to.have.members([global.speakerId, global.speakerId2, global.speakerId3])
  })

  it.only('Update session with all params using clientSessionId : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime4 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime4 = new Date().getTime()
    const payload = {
      "eventId": eventId,
      "clientSessionId" : global.clientSessionId,
      "operationType" :  "UPDATE",
      "name": "Session With All Params Updated2",
      "startTimeMilli": String(global.sessionStartTime4),
      "endTimeMilli": String(global.sessionEndTime4),
      "clientSessionSpeakers": [],
      "hubiloSessionSpeakers": [global.speakerId, global.speakerId2],
      "trackId" : String(global.trackId),
      "description" : "This is a session with all parameters defined updated2"
    }
    
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    
  })

  it.only('Verify agenda on dashboard', async () => {
    var response = await getSessionDetails(process.env.eToken, global.OrganizerId, eventId, global.sessionId)
    
    expect(response.data.details.id).to.equal(global.sessionId)
    expect(response.data.details.name).to.equal('Session With All Params Updated2')
    expect(response.data.details.description).to.equal('This is a session with all parameters defined updated2')
    expect(response.data.details.start_time_milli).to.equal(global.sessionStartTime4)
    expect(response.data.details.end_time_milli).to.equal(global.sessionEndTime4)
    expect(response.data.details.speakers.map(map => map.id)).to.have.members([global.speakerId, global.speakerId2])
    expect(response.data.details.agenda_track.id).to.equal(global.trackId)
    expect(response.data.details.agenda_track.name).to.equal('SessionTrack')
  })

  it.only('View all session list : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With All Params Updated2')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime4) + 'T00:00:00.000Z')
    expect(result.agendaDescription).to.be.an('string').to.equal('This is a session with all parameters defined updated')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime4))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime4))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime4))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime4))
    expect(result.speakers).to.be.an('array').to.have.members([global.speakerId, global.speakerId2])
    expect(response.body.status).to.equal(200)
  })

  it.only('Update session using only the necessary parameters to be updated without passing rest : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime4 = (addTime(new Date(), 3)).getTime()
    global.sessionStartTime4 = new Date().getTime()
    const payload = {
      "eventId": eventId,
      "clientSessionId" : global.clientSessionId,
      "operationType" :  "UPDATE",
      "name": "Session With All Params Updated3",
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    
  })

  it.only('Verify agenda on dashboard', async () => {
    var response = await getSessionDetails(process.env.eToken, global.OrganizerId, eventId, global.sessionId)
    expect(response.data.details.id).to.equal(global.sessionId)
    expect(response.data.details.name).to.equal('Session With All Params Updated2')
    expect(response.data.details.description).to.equal('This is a session with all parameters defined updated2')
    expect(response.data.details.start_time_milli).to.equal(String(global.sessionStartTime4))
    expect(response.data.details.end_time_milli).to.equal(String(global.sessionEndTime4))
    expect(response.data.details.speaker.map(map => map.id)).to.have.members([global.speakerId, global.speakerId2])
    expect(response.data.details.agenda_track.id).to.equal(global.trackId)
    expect(response.data.details.agenda_track.name).to.equal('SessionTrack')
  })

  it.only('View all session list : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With All Params Updated2')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime4) + 'T00:00:00.000Z')
    expect(result.agendaDescription).to.be.an('string').to.equal('This is a session with all parameters defined updated2')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime4))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime4))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime4))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime4))
    expect(result.speakers).to.be.an('array').to.have.members([global.speakerId, global.speakerId2])
    expect(response.body.status).to.equal(200)
  })

  it.only('Update session without clientSessionId or hubiloSessionId and verify error  : POST /api/v1.1/integration/session/upsert', async () => {
    global.sessionEndTime3 = (addTime(new Date(), 2)).getTime()
    global.sessionStartTime3 = new Date().getTime()
    const payload = {
      "eventId": eventId,
      "operationType" :  "UPDATE",
      "name": "Session With All Params Updated Without ID for update",
      "startTimeMilli": String(global.sessionEndTime3),
      "endTimeMilli": String(global.sessionEndTime3),
      "clientSessionSpeakers": [],
      "hubiloSessionSpeakers": [global.speakerId, global.speakerId2, global.speakerId3],
      "trackId" : String(global.trackId2),
      "description" : "This is a session with all parameters defined updated"
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/session/upsert', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
    
  })


  it.only('View all session list with updated details  : GET /api/v1.1/integration/analytics/session/session-info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventId, { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.data.data).to.be.an('array')
    var result = response.body.data.data.filter(agenda => agenda.agendaId == global.sessionId)[0]
    expect(result, 'sessionId was not found in the list').to.not.be.undefined
    expect(result.agendaId).to.be.an('number').to.equal(global.sessionId)
    expect(result.organiserId).to.be.an('number').to.equal(parseInt(global.OrganizerId))
    expect(result.agendaName).to.be.an('string').to.equal('Session With All Params Updated2')
    expect(result.agendaDate).to.be.an('string').to.equal(getAgendaDateInFormat(global.sessionStartTime4) + 'T00:00:00.000Z')
    expect(result.agendaDescription).to.be.an('string').to.equal('This is a session with all parameters defined updated2')
    expect(result.startTimeMilli).to.be.an('string').to.equal(String(global.sessionStartTime4))
    expect(result.endTimeMilli).to.be.an('string').to.equal(String(global.sessionEndTime4))
    expect(result.startTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionStartTime4))
    expect(result.endTime).to.be.an('string').to.equal(getAgendaStartAndEndDateInFormat(global.sessionEndTime4))
    expect(result.speakers).to.be.an('array').to.have.members([global.speakerId, global.speakerId2])
    expect(response.body.status).to.equal(200)
  })

  //Registration list API

  it.only('Check registration status is visible for : GET /api/v1.1/integration/analytics/session/register', async () => {

    //Login to community and register for session.
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accesstokenregistrationuser = await signup.loginWithOtp(global.accessTokenLoginPage, publicApiTestData.apiUserEmailWithAllParams.toLowerCase(), '1234')
    //Register user from community
    const registerSession = {"payload":{"data":{"agendaId":sessionIdForCheckingRegistration}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokenregistrationuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/register?eventId=' + eventId + '&agendaId=' + sessionIdForCheckingRegistration , { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(obj => obj.email == publicApiTestData.apiUserEmailWithAllParams)[0]
    expect(result).to.not.be.undefined
    expect(result.status).to.be.an('string').and.to.equal('PENDING')
    expect(result.firstName).to.be.an('string').and.to.equal(publicApiTestData.apiUserFnameWithAllParamsUpdated)
    expect(result.lastName).to.be.an('string').and.to.equal(publicApiTestData.apiUserLnameWithAllParamsUpdated)
    expect(result.email).to.be.an('string').and.to.equal(publicApiTestData.apiUserEmailWithAllParams)
    expect(result.designation).to.be.an('string').and.to.equal('SDET2')
    expect(result.organisation).to.be.an('string').and.to.equal('Hubilo')
    expect(result.phone).to.be.an('string').and.to.equal(publicApiTestData.testPhoneNumber2)
    expect(result.city).to.be.an('string').and.to.equal(publicApiTestData.city2)
    expect(result.country).to.be.an('string').and.to.equal(publicApiTestData.country2)
    expect(result.state).to.be.an('string').and.to.equal(publicApiTestData.state2)
    expect(result.about).to.be.an('string').and.to.equal(publicApiTestData.about2)
    expect(result.website).to.be.an('string').and.to.equal(publicApiTestData.webSite2)
    expect(result.memberGroups).to.be.an('array').that.have.members(['ATTENDEE', 'TEST GROUP'])    
    
  });

  it.only('Check registration accepted status is visible for : GET /api/v1.1/integration/analytics/session/register', async () => {

    //Login to community and register for session.
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accesstokenregistrationuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'registrationattendeeuser2@yopmail.com', '1234')
    //Register user from community
    const registerSession = {"payload":{"data":{"agendaId":sessionIdForCheckingRegistration}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokenregistrationuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    //Accept registration from dashboard
    const payload = {"data":{"userId":[global.registrationUser2],"status":"Registered"}}
    response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': global.OrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionIdForCheckingRegistration},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
    
    //Verify registration status
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/register?eventId=' + eventId + '&agendaId=' + sessionIdForCheckingRegistration , { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    
    expect(response.body.status).to.equal(200)

    var result = response.body.data.data.filter(obj => obj.email == 'registrationattendeeuser2@yopmail.com')[0]
    expect(result).to.not.be.undefined
    expect(result.status).to.be.an('string').and.to.equal('ACCEPTED')
    expect(result.firstName).to.be.an('string').and.to.equal('RegistrationAttendeeUser2')
    expect(result.lastName).to.be.an('string').and.to.equal('Attendee')
    expect(result.email).to.be.an('string').and.to.equal('registrationattendeeuser2@yopmail.com')
    expect(result.memberGroups).to.be.an('array').that.have.members(['ATTENDEE'])   

  });

  it.only('Check registration rejected status is visible for : GET /api/v1.1/integration/analytics/session/register', async () => {

    //Login to community and register for session.
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    global.accesstokenregistrationuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'registrationattendeeuser3@yopmail.com', '1234')
    //Register user from community
    const registerSession = {"payload":{"data":{"agendaId":sessionIdForCheckingRegistration}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/sessions/register',{'Authorization' : global.accesstokenregistrationuser, 'languageid': 34,'Content-Type' : 'application/json'},'post',registerSession);
    //Accept registration from dashboard
    const payload = {"data":{"userId":[global.registrationUser3],"status":"Rejected"}}
    response = await sendRequest(environment.baseURL1,'/backend/api/v2/attendees/agendas/status',{'organiserId': global.OrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : sessionIdForCheckingRegistration},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_session_registration_status_update_message)
    
    //Verify registration status
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/register?eventId=' + eventId + '&agendaId=' + sessionIdForCheckingRegistration , { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(obj => obj.email == 'registrationattendeeuser3@yopmail.com')[0]
    expect(result).to.not.be.undefined
    expect(result.status).to.be.an('string').and.to.equal('REJECTED')
    expect(result.firstName).to.be.an('string').and.to.equal('RegistrationAttendeeUser3')
    expect(result.lastName).to.be.an('string').and.to.equal('Attendee')
    expect(result.email).to.be.an('string').and.to.equal('registrationattendeeuser3@yopmail.com')
    expect(result.memberGroups).to.be.an('array').that.have.members(['ATTENDEE'])   
  });

})

var attendeeGroupId3
var faviconImageFile 
var communityBannerFile 
var communityBannerFile2
var eventLogoFile 
var eventLogoFile2
var eventLoginBannerFile 
var eventLoginBannerFile2
var coverImagesList
var coverImagesList2
var Video_FileName

var fileNameBoothLogo 
var fileNameBoothSpotLightBanner
var fileNameBoothSmallBanner
var fileNameBoothListBanner 
var fileNameForPdfUpload1
var fileNameForPdfUpload2
var fileNameForSessionBanner
var attendeeProfileImageFile

describe('Public API v1.1 Media download support cases', () => {

  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var eventList
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    global.startDateMiliForEvent = startDate
    global.endDateMiliForEvent = endDate
    var now = new Date()
    eventForMediaDownloadId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventForMediaDownloadId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    attendeeGroupId3 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    

    //Update restrict access
    await event.eventRestrictOffAddCustomOtp(organizerUserHeader(), eventForMediaDownloadId, '1234')
    //make event live
    eventUrl2 = await event.makeEventGoLive(organizerUserHeader(), eventForMediaDownloadId)
    console.log(eventUrl2)

    //Get cover image details
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/settings',{'organiserId': global.OrganizerId,'Authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'eventId': eventForMediaDownloadId},'get')
    URL= (response.body.data.domainSettings.url)
    V2_URL= (response.body.data.domainSettings.v2_url)
    V2_INDEX_URL= (response.body.data.domainSettings.v2_index_url)
    coverImagesList = response.body.data.coverImages


    /* Upload all images for event */

    faviconImageFile = await uploadFilesAsBase('favicon', imageAsBase64_Favicon, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    communityBannerFile = await uploadFilesAsBase('community_banner', imageAsBase64_Community_Banner, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    communityBannerFile2 = await uploadFilesAsBase('community_banner', imageAsBase64_Community_Banner, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    eventLogoFile = await uploadFilesAsBase('logo', imageAsBase64_Event_Logo, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    eventLogoFile2 = await uploadFilesAsBase('logo', imageAsBase64_Event_Logo, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    eventLoginBannerFile = await uploadFilesAsBase('community_login_banner', imageAsBase64_Login_Banner, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    eventLoginBannerFile2 = await uploadFilesAsBase('community_login_banner', imageAsBase64_Login_Banner, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })


    /* Adding another exhibitor */
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': global.OrganizerId, 'eventId' : eventForMediaDownloadId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    global.exhibitorIdMediaDownload2 = (response.body.data.ids.exhibitor_id)


    


    fileNameForPdfUpload1  = await uploadFilesAsFile('brochure', './config/sample-pdf-file.pdf', {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })
    fileNameForPdfUpload2  = await uploadFilesAsFile('brochure', './config/sample-pdf-file.pdf', {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })

    
    virtual10.data.multiple_file = [{ "filename": fileNameForPdfUpload1, "format": "pdf", "real_filename" : "sample-pdf-file.pdf" }, { "filename" : fileNameForPdfUpload2, "format": "pdf", "real_filename" : "sample-pdf-file2.pdf" }]
    
   
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': global.OrganizerId, 'eventId' : eventForMediaDownloadId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    global.exhibitorIdMediaDownload = (response.body.data.ids.exhibitor_id)

    fileNameBoothLogo = await uploadFilesAsImg('booth', './booth_images/1200px-Ducati_Corse_logo.png', {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId, 'boothid': global.exhibitorIdMediaDownload })
    fileNameBoothSpotLightBanner = await uploadFilesAsBase('boothSpotlightBanner', imageAsBase64_Booth_SpotLight_Banner, {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId, 'boothid': global.exhibitorIdMediaDownload })
    fileNameBoothSmallBanner = await uploadFilesAsBase('boothSmallBanner', imageAsBase64_Booth_Small_Banner, {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId, 'boothid': global.exhibitorIdMediaDownload })
    fileNameBoothListBanner = await uploadFilesAsBase('boothListBanner', imageAsBase64_Booth_Reception_Banner, {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId, 'boothid': global.exhibitorIdMediaDownload })
   
    virtual10.data.list_banner_image =  [{ "img_file_name": fileNameBoothListBanner}]
    virtual10.data.profile_img = fileNameBoothLogo
    virtual10.data.spotlight_banner = [{ "img_file_name": fileNameBoothSpotLightBanner}]
    virtual10.data.small_banner_image = [{ "img_file_name": fileNameBoothSmallBanner}]
   
    response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': global.OrganizerId, 'eventId' : eventForMediaDownloadId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': global.exhibitorIdMediaDownload},'put',virtual10)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);

    /* Adding another booth with spotligh banner as video */

    virtual10.data.spotlight_banner_type = 'VIDEO'
    virtual10.data.spotlight_banner = [
      {
        "type": "YOUTUBE",
        "link": "https://www.youtube.com/watch?v=p-dBkturtMs"
      }
    ]
    virtual10.data.list_banner_image = [{}]
    virtual10.data.small_banner_image = [{'img_file_name':""}]
    virtual10.data.profile_img = ""
    virtual10.data.multiple_file = ""
    

    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': global.OrganizerId, 'eventId' : eventForMediaDownloadId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    global.exhibitorIdMediaDownload3 = (response.body.data.ids.exhibitor_id)


    /* Adding profile image for people */

    attendeeProfileImageFile = await uploadFilesAsBase('profile', imageAsBase64_Event_Logo, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })

    /* Adding people with profile image */
    var people = new People()
    global.peopleForMediaDownloadId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventForMediaDownloadId, 'attendeeuserformediadownload1@yopmail.com', 'AttendeeList', 'TestUser', [attendeeGroupId3], 'accountant', 'testing', 'accounting', interestsList, attendeeProfileImageFile, true, true, 0, multipleFiles, '9988887777', '91', [global.listSessionId1, global.listSessionId2])
    global.peopleForMediaDownloadId2 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventForMediaDownloadId, 'attendeeuserformediadownload2@yopmail.com', 'AttendeeList', 'TestUser', [attendeeGroupId3], 'accountant', 'testing', 'accounting', interestsList, '', true, true, 0, multipleFiles, '9988887777', '91', [global.listSessionId1, global.listSessionId2])

    fileNameForSessionBanner = await uploadFilesAsBase('sessionbanner',imageAsBase64_Session_Banner_image, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventForMediaDownloadId, 'organiserid' : global.OrganizerId })

    var session = new Session();
    var sessionEndTime = (addTime(new Date(), 1)).getTime()
    var sessionStartTime = new Date().getTime()
    global.sessionIdForDownloadMedia1 = await session.createSessionAndVerify(organizerUserHeader(), eventForMediaDownloadId, 'ListSessionOne','', fileNameForSessionBanner, 'Session List check 1', sessionStartTime, sessionEndTime)
    global.sessionIdForDownloadMedia2 = await session.createSessionAndVerify(organizerUserHeader(), eventForMediaDownloadId, 'ListSessionTwo','', '', 'Session List check 2', sessionStartTime, sessionEndTime)

    /* Updted agenda basic settings with multiple file */

    var basicPayload = {
      "data": {
        "description": "<p>Session List check 1</p>",
        "multiple_file": [{ "filename": fileNameForPdfUpload1, "format": "pdf", "real_filename" : "sample-pdf-file.pdf" }, { "filename" : fileNameForPdfUpload2, "format": "pdf", "real_filename" : "sample-pdf-file2.pdf" }],
        "start_time_milli": sessionStartTime,
        "end_time_milli": sessionEndTime,
        "is_featured": 0,
        "is_rating": 0,
        "speakers": [],
        "booths": [],
        "name": "ListSessionOne",
        "tags": "",
        "banner": fileNameForSessionBanner
      }
    }

    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/agenda/basic', {'organiserId': global.OrganizerId, 'eventId' : eventForMediaDownloadId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'agendaid' : global.sessionIdForDownloadMedia1},'put',basicPayload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);

  });

  it.only('Verify media download link for event with isSendMedia No : GET /api/v1.1/integration/event/detail', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': false})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.id).to.be.an('number').and.to.equal(eventForMediaDownloadId)
    expect(response.body.data.data.organiserId).to.be.an('number').and.to.equal(global.OrganizerId)
    expect(response.body.data.data.name).to.be.an('string').and.to.equal('NewEvent')
    expect(response.body.data.data.startTimeMilli).to.be.an('string').and.to.equal(String(global.startDateMiliForEvent))
    expect(response.body.data.data.endTimeMilli).to.be.an('string').and.to.equal(String(global.endDateMiliForEvent))
    expect(response.body.data.data.description).to.be.an('string').and.to.equal('description for new event')
    expect(response.body.data.data.commonPhoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.commonPhoneCodeCountry).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.isEventOnline).to.be.an('number').and.to.equal(1)
    expect(response.body.data.data.locationId).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.address).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.city).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.state).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.country).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.lat).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.lng).to.be.an('string').and.to.equal('')
    expect(response.body.data.data).to.not.have.keys('favicon', 'communityBanner', 'eventLogo', 'loginBanner', 'welcomeVideo')
  })

  it.only('Verify media download link for event with isSendMedia No : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': false})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]
    expect(result.name).to.equal('NewEvent')
    expect(result.description).to.equal('description for new event')
    expect(result.organiserId).to.equal(parseInt(global.OrganizerId))
    expect(result.startTimeMilli).to.equal(String(global.startDateMiliForEvent))
    expect(result.endTimeMilli).to.equal(String(global.endDateMiliForEvent))

    response.body.data.data.forEach((elem) => {
      expect(elem).to.not.have.keys('favicon', 'communityBanner', 'eventLogo', 'loginBanner', 'welcomeVideo')
    })

  })

  it.only('Verify media download link for event with isSendMedia YES without any file in event : GET /api/v1.1/integration/event/detail', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data.id).to.be.an('number').and.to.equal(eventForMediaDownloadId)
    expect(response.body.data.data.organiserId).to.be.an('number').and.to.equal(global.OrganizerId)
    expect(response.body.data.data.name).to.be.an('string').and.to.equal('NewEvent')
    expect(response.body.data.data.startTimeMilli).to.be.an('string').and.to.equal(String(global.startDateMiliForEvent))
    expect(response.body.data.data.endTimeMilli).to.be.an('string').and.to.equal(String(global.endDateMiliForEvent))
    expect(response.body.data.data.description).to.be.an('string').and.to.equal('description for new event')
    expect(response.body.data.data.commonPhoneCode).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.commonPhoneCodeCountry).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.isEventOnline).to.be.an('number').and.to.equal(1)
    expect(response.body.data.data.locationId).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.address).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.city).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.state).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.country).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.lat).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.lng).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.favicon).to.be.an('string').and.to.equal('')
    expect(response.body.data.data.communityBanner).to.be.an('array').and.to.be.empty
    expect(response.body.data.data.eventLogo).to.be.an('array').and.to.be.empty
    expect(response.body.data.data.loginBanner).to.be.an('array').and.to.be.empty
    expect(response.body.data.data.welcomeVideo).to.be.an('array').and.to.be.empty
  })

  it.only('Verify media download link for event with isSendMedia YES : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]
    expect(result.name).to.equal('NewEvent')
    expect(result.description).to.equal('description for new event')
    expect(result.organiserId).to.equal(parseInt(global.OrganizerId))
    expect(result.startTimeMilli).to.equal(String(global.startDateMiliForEvent))
    expect(result.endTimeMilli).to.equal(String(global.endDateMiliForEvent))

    expect(result.favicon).to.be.an('string').and.to.equal('')
    expect(result.communityBanner).to.be.an('array').and.to.be.empty
    expect(result.eventLogo).to.be.an('array').and.to.be.empty
    expect(result.loginBanner).to.be.an('array').and.to.be.empty
    expect(result.welcomeVideo).to.be.an('array').and.to.be.empty

  })

  it.only('Verify media download link for event with isSendMedia YES with WelcomeVideo : GET /api/v1.1/integration/event/detail', async () => { 
    
    /* Add welcome video to event */

    const video_uploading =
    {
        "data": {
            "link": "https://www.youtube.com/watch?v=6xmxe27J-LU",
            "type": "YOUTUBE",
            "is_show_after_login": 1,
            "is_home_screen": 1,
            'title' : 'Youtube video',
            'description' : 'description for youtube video'
        }
    }  
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': global.OrganizerId,'eventId': eventForMediaDownloadId,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
    Video_FileName= (response.body.data.thumb)
    expect(response.body.status).to.equal(200, 'Welcome video add failed');
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
    expect(response2.body.data.data.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
    expect(response2.body.data.data.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
    expect(response2.body.data.data.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
    expect(response2.body.data.data.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
    expect(response2.body.data.data.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
    expect(response2.body.data.data.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
    expect(response2.body.data.data.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
    expect(response2.body.data.data.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName)

  })

  it.only('Verify media download link for event with isSendMedia YES with WelcomeVideo : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]
    expect(result.name).to.equal('NewEvent')
    expect(result.description).to.equal('description for new event')
    expect(result.organiserId).to.equal(parseInt(global.OrganizerId))
    expect(result.startTimeMilli).to.equal(String(global.startDateMiliForEvent))
    expect(result.endTimeMilli).to.equal(String(global.endDateMiliForEvent))

    expect(result.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
    expect(result.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
    expect(result.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
    expect(result.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
    expect(result.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
    expect(result.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
    expect(result.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
    expect(result.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
    expect(result.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName)

  })

  it.only('Verify media download link for event with favicon image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save favicon image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [],
      [],
      [],
      coverImagesList);
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.favicon).to.be.an('string').to.equal(environment.baseURL4 + '/favicon/' + global.OrganizerId + '/32/' + faviconImageFile)
  })

  it.only('Verify media download link for event with favicon image : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.favicon).to.be.an('string').to.equal(environment.baseURL4 + '/favicon/' + global.OrganizerId + '/32/' + faviconImageFile)

  })

  it.only('Verify media download link for event with community banner image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save community banner image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile],
      [],
      [],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.communityBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with community banner image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]
  
    expect(result.communityBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)

  })

  it.only('Verify media download link for event with multiple community banner image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save communityBanner image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile,communityBannerFile2],
      [],
      [],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile), String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile2)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.communityBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with multiple community banner image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */
    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile), String(environment.baseURL4 + '/banner/community_banner/' + global.OrganizerId + '/1036/' + communityBannerFile2)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.favicon).to.be.an('string').to.equal(environment.baseURL4 + '/favicon/' + global.OrganizerId + '/32/' + faviconImageFile)

  })

  it.only('Verify media download link for event with eventlogo image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile, communityBannerFile2],
      [eventLogoFile],
      [],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.eventLogo).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with eventlogo image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */
    var arrayToAssert = [String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.eventLogo).to.be.an('array').that.have.ordered.members(arrayToAssert)

  })

  it.only('Verify media download link for event with multiple eventlogo image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile, communityBannerFile2],
      [eventLogoFile, eventLogoFile2],
      [],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile), String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile2)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.eventLogo).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with multiple eventlogo image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */
    var arrayToAssert = [String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile), String(environment.baseURL4 + '/logo/' + global.OrganizerId + '/300/' + eventLogoFile2)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.eventLogo).to.be.an('array').that.have.ordered.members(arrayToAssert)

  })

  it.only('Verify media download link for event with event login banner image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile, communityBannerFile2],
      [eventLogoFile, eventLogoFile2],
      [eventLoginBannerFile],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.loginBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with event login banner image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */
    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.loginBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)

  })

  it.only('Verify media download link for event with multiple event_login_banner image : GET /api/v1.1/integration/event/detail', async () => { 
    

    /* Save image in branding settings */
    await updateBrandingSettings(eventForMediaDownloadId, global.OrganizerId, process.env.eToken, 
      URL,
      faviconImageFile,
      [communityBannerFile, communityBannerFile2],
      [eventLogoFile, eventLogoFile2],
      [eventLoginBannerFile, eventLoginBannerFile2],
      coverImagesList);

    /* Preparing assertion array */

    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile), String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile2)]
    
    var response2 = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/detail?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response2.body.status).to.equal(200)
    expect(response2.body.data.data.loginBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)
  })

  it.only('Verify media download link for event with multiple event_login_banner image : GET /api/v1.1/integration/event/list', async () => {
    
    /* Preparing the assertion array */
    var arrayToAssert = [String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile), String(environment.baseURL4 + '/banner/community_login_banner/' + global.OrganizerId + '/1120/' + eventLoginBannerFile2)]
    
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    var result = response.body.data.data.filter(map => map.id == eventForMediaDownloadId)[0]

    expect(result.loginBanner).to.be.an('array').that.have.ordered.members(arrayToAssert)

  })

  it.only('Verify media download link for booth isSendMedia NO : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': false})

    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload2)[0]
    expect(response.body.status).to.equal(200)
    expect(result.hubiloExhibitorId).to.be.an('number').to.equal(global.exhibitorIdMediaDownload2)
    expect(result.clientExhibitorId).to.be.an('string').to.equal('')
    expect(result.name).to.be.an('string').to.equal('test updated')
    expect(result.email).to.be.an('string').to.equal('testfghanistan@yopmail.com')
    expect(result.phone).to.be.an('string').to.equal('9988776666')
    expect(result.description).to.be.an('string').to.equal('<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>')
    expect(result.website).to.be.an('string').to.equal('https://google.com')
    expect(result.address).to.be.an('string').to.equal('afghnaistan adddres')
    expect(result.facebook).to.be.an('string').to.equal('https://facebook.com')
    expect(result.linkedin).to.be.an('string').to.equal('https://linkedin.com')
    expect(result.twitter).to.be.an('string').to.equal('https://twitter.com')
    expect(result.instagram).to.be.an('string').to.equal('https://instagram.com')
    expect(result.boothSize).to.be.an('string').to.equal('LARGE')
    expect(result).to.not.have.keys('profileImg', 'spotlightBannerType', 'spotlightBanner', 'brochure', 'multipleFile', 'listBannerImage', 'smallBannerImage')
  })

  it.only('Verify media download link for booth isSendMedia YES without any media : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload2)[0]

    expect(response.body.status).to.equal(200)
    expect(response.body.status).to.equal(200)
    expect(result.hubiloExhibitorId).to.be.an('number').to.equal(global.exhibitorIdMediaDownload2)
    expect(result.clientExhibitorId).to.be.an('string').to.equal('')
    expect(result.name).to.be.an('string').to.equal('test updated')
    expect(result.email).to.be.an('string').to.equal('testfghanistan@yopmail.com')
    expect(result.phone).to.be.an('string').to.equal('9988776666')
    expect(result.description).to.be.an('string').to.equal('<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>')
    expect(result.website).to.be.an('string').to.equal('https://google.com')
    expect(result.address).to.be.an('string').to.equal('afghnaistan adddres')
    expect(result.facebook).to.be.an('string').to.equal('https://facebook.com')
    expect(result.linkedin).to.be.an('string').to.equal('https://linkedin.com')
    expect(result.twitter).to.be.an('string').to.equal('https://twitter.com')
    expect(result.instagram).to.be.an('string').to.equal('https://instagram.com')
    expect(result.boothSize).to.be.an('string').to.equal('LARGE')
    expect(result.profileImg).to.be.an('string').and.to.equal('')
    expect(result.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
    expect(result.spotlightBanner).to.be.an('string').and.to.equal('')
    expect(result.brochure).to.be.an('string').and.to.equal('')
    expect(result.listBannerImage).to.be.an('string').and.to.equal('')
    expect(result.smallBannerImage).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('array').and.to.be.empty
  })

  it.only('Verify media download link for booth logo : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload)[0]
    expect(response.body.status).to.equal(200)
    expect(result.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
  })

  it.only('Verify media download link for booth spotlightBanner image : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload)[0]
    expect(response.body.status).to.equal(200)
    expect(result.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
    expect(result.spotlightBanner).to.be.an('string').and.to.equal(environment.baseURL4 + '/banner/exhibitor_spotlight_banner/' + global.OrganizerId + '/1036/' + fileNameBoothSpotLightBanner)
  })

  it.only('Verify media download link for booth spotlightBanner video : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload3)[0]
    expect(response.body.status).to.equal(200)
    expect(result.spotlightBannerType).to.be.an('string').and.to.equal('VIDEO')
    expect(result.spotlightBanner).to.be.an('array').that.have.lengthOf(1)
    expect(result.spotlightBanner[0]).to.be.an('object').that.have.keys('link','type')
    expect(result.spotlightBanner[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=p-dBkturtMs')
    expect(result.spotlightBanner[0].type).to.be.an('string').and.to.equal('YOUTUBE')
  })

  it.only('Verify media download link for booth listbanner : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload)[0]
    expect(result.listBannerImage).to.be.an('string').and.to.equal(environment.baseURL4 + '/banner/exhibitor_list_banner_image/' + global.OrganizerId + '/1036/' + fileNameBoothListBanner)
  })

  it.only('Verify media download link for booth smallbanner : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload)[0]
    expect(response.body.status).to.equal(200)
    expect(result.smallBannerImage).to.be.an('string').and.to.equal(environment.baseURL4 + '/banner/exhibitor_list_banner_image/' + global.OrganizerId + '/1036/' + fileNameBoothSmallBanner)
  })

  it.only('Verify media download link for booth multiple files : GET /api/v1.1/integration/booth/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data.filter(map => map.hubiloExhibitorId == global.exhibitorIdMediaDownload)[0]
    expect(response.body.status).to.equal(200)
    expect(result.brochure).to.be.an('string').and.to.equal(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/' + fileNameForPdfUpload1)
    expect(result.multipleFile).to.be.an('array').that.have.members([String(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/' + fileNameForPdfUpload1), String(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/' + fileNameForPdfUpload2)])
  })

  it.only('Verify media download link attendee with isSendMedia NO : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': false})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    expect(result).to.not.include.keys('profilePictureURL')
  })

  it.only('Verify media download link attendee with isSendMedia NO : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventForMediaDownloadId +'&email=attendeeuserformediadownload2@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get', {'isSendMedia': false})
    
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal('attendeeuserformediadownload2@yopmail.com')
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal('AttendeeList')
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal('TestUser')
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('91')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('9988887777')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeeGroupId3}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    expect(response.body.data[0].createdAt).to.be.an('string').and.to.not.be.empty
    expect(response.body.data[0].profilePictures).to.be.an('object').that.have.all.keys('orignal', 'thumb')
    expect(response.body.data[0].profilePictures.orignal).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].profilePictures.thumb).to.be.an('string').and.to.equal('')
    expect(response.body.data[0]).to.not.have.keys('profilePictureURL')
  })

  it.only('Verify media download link attendee with isSendMedia YES and without profile image : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')[0]
    expect(result).to.include.keys('profilePictureURL')
    expect(result.profilePictureURL).to.be.an('string').and.to.equal('')
  })

  it.only('Verify media download link attendee with isSendMedia YES and without profile image : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventForMediaDownloadId +'&email=attendeeuserformediadownload2@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].email).to.be.an('string').and.to.equal('attendeeuserformediadownload2@yopmail.com')
    expect(response.body.data[0].firstName).to.be.an('string').and.to.equal('AttendeeList')
    expect(response.body.data[0].lastName).to.be.an('string').and.to.equal('TestUser')
    expect(response.body.data[0].about).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].phoneCode).to.be.an('string').and.to.equal('91')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('9988887777')
    expect(response.body.data[0].organisationName).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].designation).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].country).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].state).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].city).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "Attendee","groupId": attendeeGroupId3}])
    expect(response.body.data[0].organiserId).to.be.an('number').and.to.equal(parseInt(global.OrganizerId))
    expect(response.body.data[0].customFieldData).to.be.an('array').and.to.have.members([])
    expect(response.body.data[0].createdAt).to.be.an('string').and.to.not.be.empty
    expect(response.body.data[0].profilePictures).to.be.an('object').that.have.all.keys('orignal', 'thumb')
    expect(response.body.data[0].profilePictures.orignal).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].profilePictures.thumb).to.be.an('string').and.to.equal('')
    expect(response.body.data[0].profilePictureURL).to.be.an('string').and.to.equal('')
  })

  it.only('Verify media download link attendee with isSendMedia YES and with profile image : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload1@yopmail.com')[0]
    expect(result).to.include.keys('profilePictureURL')
    expect(result.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
    
  })

  it.only('Verify media download link attendee with isSendMedia YES and with profile image : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventForMediaDownloadId +'&email=attendeeuserformediadownload1@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].profilePictures).to.be.an('object')
    expect(response.body.data[0].profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
  })

  it.only('Verify media download link for session with isSendMedia NO : GET /api/v1.1/integration/analytics/session/session-info', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': false})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(map => map.agendaId == global.sessionIdForDownloadMedia2)
    expect(result).to.not.include.keys('banner', 'multipleFile')
  })

  it.only('Verify media download link for session with isSendMedia YES without media : GET /api/v1.1/integration/analytics/session/session-info', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(map => map.agendaId == global.sessionIdForDownloadMedia2)[0]
    expect(result).to.include.keys('banner', 'multipleFile')
    expect(result.banner).to.be.an('string').and.to.equal('')
    expect(result.multipleFile).to.be.an('string').and.to.equal('')
  })

  it.only('Verify media download link for session with isSendMedia YES with session banner : GET /api/v1.1/integration/analytics/session/session-info', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(map => map.agendaId == global.sessionIdForDownloadMedia1)[0]
    expect(result).to.include.keys('banner', 'multipleFile')
    expect(result.banner).to.be.an('string').and.to.equal(environment.baseURL4 + '/sessionbanner/' + global.OrganizerId + '/' + fileNameForSessionBanner)
  })

  it.only('Verify media download link for session with isSendMedia YES with multiple files : GET /api/v1.1/integration/analytics/session/session-info', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/analytics/session/session-info?eventId=' + eventForMediaDownloadId, { 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    var result = response.body.data.data.filter(map => map.agendaId == global.sessionIdForDownloadMedia1)[0]
    expect(result).to.include.keys('banner', 'multipleFile')
    expect(result.multipleFile).to.be.an('array').that.have.members([String(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/' + fileNameForPdfUpload1), String(environment.baseURL4 + '/brochure/' + global.OrganizerId + '/' + fileNameForPdfUpload2)])
  })
  
})


describe('Public API v1.1 Media download support event pagination tests', () => {

  var Video_FileName_List = []
  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var eventListArr = []
    if ((process.env.releaseenv == 'qat' && environment.HOrganiserId == '376745') || (process.env.releaseenv == 'release' && environment.HOrganiserId == '350112')) {
      while((eventListArr = await getEventListFromDashboard()).length > 0){
            await deleteEventListFromDashboard(eventListArr);
        }
    }

    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    for(var i=1;i<=25;i++){
      /* Add welcome video to event */

      var eventId = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent' + i, 'description for new event ' + i, startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')  

      const video_uploading =
      {
          "data": {
              "link": "https://www.youtube.com/watch?v=6xmxe27J-LU",
              "type": "YOUTUBE",
              "is_show_after_login": 1,
              "is_home_screen": 1,
              'title' : 'Youtube video',
              'description' : 'description for youtube video'
          }
      }  
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': global.OrganizerId,'eventId': eventId,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
      var Video_FileName= (response.body.data.thumb)
      Video_FileName_List.push(Video_FileName)
      expect(response.body.status).to.equal(200, 'Welcome video add failed');
      
      eventList.push(eventId)
    }
    eventList.reverse()
    Video_FileName_List.reverse()

  });

  it.only('Verify mutliple events (20) are visible for with isSendMedia YES : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(25)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList)
    response.body.data.data.forEach((elem,index) => {
      
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index])
    })
  });

  it.only('Verify mutliple events on page 1 with page limit 10 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(3)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(0,10))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index])
    })
  });

  it.only('Verify mutliple events on page 2 with page limit 10 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=1&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(10)
    expect(response.body.data.currentPage).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(10,20))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index+10])
    })
  });

  it.only('Verify mutliple events on page 3 with page limit 10 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=2&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(5)
    expect(response.body.data.currentPage).to.equal(2)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(20,25))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index+20])
    })
  });

  it.only('Verify mutliple events on page 1 with page limit 20 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(20)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(2)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(0,20))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index])
    })
  });

  it.only('Verify mutliple events on page 2 with page limit 20 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=1&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(5)
    expect(response.body.data.currentPage).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(20,25))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index+20])
    })
  });

  it.only('Verify mutliple events on page 1 with page limit 100 : GET /api/v1.1/integration/event/list', async () => {
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/event/list?currentPage=0&limit=100', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').and.to.not.be.undefined
    expect(response.body.data.data.length).to.equal(25)
    expect(response.body.data.currentPage).to.equal(0)
    expect(response.body.data.totalPages).to.equal(1)
    expect(response.body.data.data.map(map => map.id)).to.have.ordered.members(eventList.slice(0,25))
    response.body.data.data.forEach((elem,index) => {
      expect(elem.favicon).to.be.an('string').and.to.equal('')
      expect(elem.communityBanner).to.be.an('array').and.to.be.empty
      expect(elem.eventLogo).to.be.an('array').and.to.be.empty
      expect(elem.loginBanner).to.be.an('array').and.to.be.empty
      expect(elem.welcomeVideo).to.be.an('array').and.to.have.lengthOf(1)
      expect(elem.welcomeVideo[0]).to.be.an('object').that.have.all.keys('type', 'link', 'isHomeScreen', 'isShowAfterLogin', 'thumb', 'title', 'description')
      expect(elem.welcomeVideo[0].type).to.be.an('string').and.to.equal('YOUTUBE')
      expect(elem.welcomeVideo[0].link).to.be.an('string').and.to.equal('https://www.youtube.com/watch?v=6xmxe27J-LU')
      expect(elem.welcomeVideo[0].isShowAfterLogin).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].title).to.be.an('string').and.to.equal('Youtube video')
      expect(elem.welcomeVideo[0].isHomeScreen).to.be.an('number').and.to.equal(1)
      expect(elem.welcomeVideo[0].description).to.be.an('string').and.to.equal('description for youtube video')
      expect(elem.welcomeVideo[0].thumb).to.be.an('string').and.to.equal(Video_FileName_List[index])
    })
  });

  

})

describe('Public API v1.1 Media download support users pagination tests', () => {

  var eventId2
  var peopleList = []
  var peopleEmailList = []
  var attendeeProfileImageFile
  
  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    var now = new Date()
    eventId2 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventPeoplePaginationCheck', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId2, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    var attendeegroup2 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")

    attendeeProfileImageFile = await uploadFilesAsBase('profile', imageAsBase64_Event_Logo, { 'Content-Type': 'multipart/form-data', 'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventId2, 'organiserid' : global.OrganizerId })

    peopleEmailList.push(myemail)
    for (var i=1;i<=24;i++){
      var peopleId
      var people = new People();
      peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId2, 'newpaginationcheckuser'+ i +'@yopmail.com', 'PaginatedUser' + i, 'Attendee', [attendeegroup2], 'accountant', 'testing', 'accounting', [], attendeeProfileImageFile)
      peopleList.push(peopleId)
      peopleEmailList.push('newpaginationcheckuser'+ i +'@yopmail.com')
    }
    peopleList.reverse()
    peopleEmailList.reverse()

  });

  it.only('Verify media download link attendee with isSendMedia NO : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList)
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(25)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 24){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 1 with limit 10 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=0&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(0,10))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(10)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 24){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 2 with limit 10 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=1&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(10,20))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(10)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 24){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 1 with limit 10 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=2&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(20,25))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(5)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 4){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 1 with limit 20 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=0&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(0,20))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(20)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 24){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 2 with limit 20 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=1&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(20,25))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(5)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 4){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

  it.only('Verify media download link attendee with isSendMedia NO for page 1 with limit 100 : GET /api/v1.1/integration/user/list', async () => { 
    var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/user/list?eventId=' + eventId2 + '&currentPage=0&limit=100', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
    expect(response.body.status).to.equal(200)
    // var result = response.body.data.data[0].paginatedResults.filter(map => map.email == 'attendeeuserformediadownload2@yopmail.com')
    // expect(result).to.not.include.keys('profilePictureURL')
    expect(response.body.data.data[0].paginatedResults.map(map => map.email)).to.have.members(peopleEmailList.slice(0,25))
    expect(response.body.data.data[0].totalCount[0].count).to.be.an('number').and.to.equal(25)
    response.body.data.data[0].paginatedResults.forEach((elem, index) => {
      if(index != 24){
        expect(elem.profilePictureURL).to.be.an('string').and.to.equal(environment.baseURL4 + '/profile/' + attendeeProfileImageFile)
      }
    })
  })

})



describe('Public API v1.1 Media download support virtual booth pagination tests', () => {

    var eventId2
    
    var boothList = []
    
    before(async () => {
      var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
      global.OrganizerId = response.body.data.userData.id
      process.env.eToken = response.body.data.token
      process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
      var event = new Events();
      var startDate = new Date().getTime()
      var endDate = (addDays(new Date(), 3)).getTime()
      var now = new Date()
      eventId2 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEventPeoplePaginationCheck', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')
  
  
      fileNameBoothLogo = await uploadFilesAsImg('booth', './booth_images/1200px-Ducati_Corse_logo.png', {  'authorization' : 'Bearer ' + process.env.eToken, 'eventid' : eventId2, 'organiserid' : global.OrganizerId })
  
  
      for (var i=1;i<=25;i++){
        virtual11.data.name = 'test booth' + i
        virtual11.data.profile_img = fileNameBoothLogo
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': global.OrganizerId, 'eventId' : eventId2, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual11)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
        boothList.push(response.body.data.ids.exhibitor_id)
      }
      
  
    });

    it.only('Verify media download link for booth isSendMedia YES : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2, { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList)
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.only('Verify media download link for booth isSendMedia YES for page 1 with limit 10 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=0&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(0,10))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.skip('Verify media download link for booth isSendMedia YES for page 2 with limit 10 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=1&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(10,20))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.skip('Verify media download link for booth isSendMedia YES for page 3 with limit 10 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=2&limit=10', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(20,25))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.only('Verify media download link for booth isSendMedia YES for page 1 with limit 20 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=0&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(0,20))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.skip('Verify media download link for booth isSendMedia YES for page 2 with limit 20 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=1&limit=20', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(20,25))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })

    it.only('Verify media download link for booth isSendMedia YES for page 1 with limit 100 : GET /api/v1.1/integration/booth/list', async () => { 
      var response = await sendGetFormRequest(environment.ApiURL, '/api/v1.1/integration/booth/list?eventId=' + eventId2 + '&currentPage=0&limit=100', { 'authorization' : 'Bearer ' + process.env.eApiToken, 'Content-type' : 'application/json' }, 'get', {'isSendMedia': true})
      expect(response.body.data.data.map(map => map.hubiloExhibitorId)).to.have.members(boothList.slice(0,25))
      expect(response.body.status).to.equal(200)
      response.body.data.data.forEach((elem) => {
        expect(elem.spotlightBannerType).to.be.an('string').and.to.equal('IMAGE')
        expect(elem.spotlightBanner).to.be.an('string').and.to.equal('')
        expect(elem.brochure).to.be.an('string').and.to.equal('')
        expect(elem.listBannerImage).to.be.an('string').and.to.equal('')
        expect(elem.smallBannerImage).to.be.an('string').and.to.equal('')
        //expect(elem.multipleFile).to.be.an('array').and.to.be.empty
        expect(elem.profileImg).to.be.an('string').and.to.equal(environment.baseURL4 + '/exhibitor/' + global.OrganizerId + '/300/' + fileNameBoothLogo)
      })
      
    })
  
   
  
  })


var attendeegroup3
var speakergroup3
var boothmembergroup3
var newPeopleID
var groupPaginationList = []

describe.skip('Public API v1.1 CRD Group APIs test', () => {

  before(async () => {
    var response = await loginToDashboardUsingUsernameAndPassword(publicApiTestData.enterPrisePlanUser, publicApiTestData.commonPassword)
    global.OrganizerId = response.body.data.userData.id
    process.env.eToken = response.body.data.token
    process.env.eApiToken = await getSharedPublicAPIToken(process.env.eToken, global.OrganizerId)
    var event = new Events();
    var startDate = new Date().getTime()
    var endDate = (addDays(new Date(), 3)).getTime()
    global.startDateMiliForEvent = startDate
    global.endDateMiliForEvent = endDate
    var now = new Date()
    eventId4 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    attendeegroup3 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    speakergroup3 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
    boothmembergroup3 = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    //Update restrict access
    await event.eventRestrictOffAddCustomOtp(organizerUserHeader(), eventId4, '1234')
    //make event live
    eventUrl3 = await event.makeEventGoLive(organizerUserHeader(), eventId4)
    console.log(eventUrl3)

    /* Add another event and required data for pagination */

    var now = new Date()
    eventId5 = await event.createEventOnDashboard(organizerUserHeader(), 'NewEvent', 'description for new event', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com')

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId5, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')

    var tmp = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    groupPaginationList.push(tmp)
    tmp = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
    groupPaginationList.push(tmp)
    tmp = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    groupPaginationList.push(tmp)

    for(var i=1;i<=25;i++){
      var payload = {
        "eventId": eventId5,
        "name": "TestGroup" + i,
        "sourceGroupId": groupPaginationList[0]
      }
      var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
      groupPaginationList.push(response.body.data.groupId)
    }

  });

  it.only('Get list for groups with default pagination : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(28)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(0,28))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(1)
    
  })

  it.only('Get list for groups with page 1 limit 10 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(10)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(0,10))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(3)
  })

  it.only('Get list for groups with page 2 limit 10 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=1&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(10)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(10,20))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(1)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(3)
    
  })

  it.only('Get list for groups with page 3 limit 10 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=2&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(8)
    expect(response.body.data.data.map(map => map.name))
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(20,28))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(2)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(3)
    
  })

  it.only('Get list for groups with page 1 limit 20 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=20', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(20)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(0,20))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(2)
    
  })

  it.only('Get list for groups with page 2 limit 10 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=1&limit=20', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(8)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(20,28))
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(1)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(2)
    
  })

  it.only('Get list for groups with page 1 limit 100 : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(28)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(0,28))
    
  })

  it.only('Get list for groups with limit as negative number and verify error : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=-10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.not.equal(200)
  })

  it.only('Get list for groups with currentPage as negative number and verify error : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=-1&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.not.equal(200)
    
  })

  it.only('Get list for groups with limit as zero and verify error : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=-10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.not.equal(200)
    
  })

  it.only('Get list for default groups and verify : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body).to.have.all.keys('status', 'data', 'message', 'flag', 'eventLastUpdatedAt')
    expect(response.body.data).to.have.all.keys('data', 'functionalityType', 'currentPage', 'totalPages')
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(1)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(3)
    expect(response.body.data.functionalityType).to.be.an('array').that.have.lengthOf(8)
    expect(response.body.data.functionalityType.map(map => map.name)).to.have.members(['On Boarding', 'Create Post', 'Create Poll', 'Vote Poll', 'Comment Post', 'Create Photo Posts', 'Create Videos Posts', 'Create Introduction Posts'])
    expect(response.body.data.data[0]).to.be.an('object').that.have.all.keys('id', 'name', 'isMain', 'isDefault', 'isOnboarding', 'isCustom', 'type', 'functionalitySettings')
    expect(response.body.data.data[0].id).to.be.an('string').to.equal(attendeegroup3)
    expect(response.body.data.data[0].name).to.be.an('string').to.equal('Attendee')
    expect(response.body.data.data[0].isMain).to.be.an('string').to.equal('YES')
    expect(response.body.data.data[0].isDefault).to.be.an('string').to.equal('YES')
    expect(response.body.data.data[0].isCustom).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[0].type).to.be.an('string').to.equal('ATTENDEE')

    expect(response.body.data.data[1]).to.be.an('object').that.have.all.keys('id', 'name', 'isMain', 'isDefault', 'isOnboarding', 'isCustom', 'type')
    expect(response.body.data.data[1].id).to.be.an('string').to.equal(speakergroup3)
    expect(response.body.data.data[1].name).to.be.an('string').to.equal('Speaker')
    expect(response.body.data.data[1].isMain).to.be.an('string').to.equal('YES')
    expect(response.body.data.data[1].isDefault).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[1].isCustom).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[1].type).to.be.an('string').to.equal('SPEAKER')

    expect(response.body.data.data[2]).to.be.an('object').that.have.all.keys('id', 'name', 'isMain', 'isDefault', 'isOnboarding', 'isCustom', 'type')
    expect(response.body.data.data[2].id).to.be.an('string').to.equal(boothmembergroup3)
    expect(response.body.data.data[2].name).to.be.an('string').to.equal('Booth Member')
    expect(response.body.data.data[2].isMain).to.be.an('string').to.equal('YES')
    expect(response.body.data.data[2].isDefault).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[2].isCustom).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[2].type).to.be.an('string').to.equal('BOOTHMEMBER')

  })

  it.only('Create group with attendee group as source : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup1",
      "sourceGroupId": attendeegroup3
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(attendeegroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup1 = response.body.data.groupId
  })

  it.only('Create an attendee with new group a verify its group details on dashboard', async () => { 
    var people = new People()
    newPeopleID = await people.addSingleAttendeeAndVerify(organizerUserHeader(), eventId4, 'newuserwithcustomgroup1@yopmail.com', 'Attendee', 'User', [global.customGroup1], 'accountant', 'testing', 'accounting', [], '3971_5650_662620001619006566.png', true, true, 0, [], '9988887777', '91')
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId4, 'userId' : newPeopleID}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal('newuserwithcustomgroup1@yopmail.com')
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal('Attendee')
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal('User')
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal('91')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('9988887777')
    expect(response.body.data[0].groups).to.be.an('array').that.have.ordered.members([global.customGroup1])
    
  })

  it.only('Verify user now have custom group attahced : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId4 +'&email=newuserwithcustomgroup1@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].group).to.be.an('array').that.have.lengthOf(1)
    expect(response.body.data[0].group).to.be.an('array').and.to.have.deep.members([{"groupName": "TestGroup1","groupId": global.customGroup1}])
  })



  it.only('Get list for groups verify new group details : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(4)
    expect(response.body.data.data[3]).to.be.an('object').that.have.all.keys('id', 'name', 'isMain', 'isDefault', 'isOnboarding', 'isCustom', 'type')
    expect(response.body.data.data[3].id).to.be.an('string').to.equal(global.customGroup1)
    expect(response.body.data.data[3].name).to.be.an('string').to.equal('TestGroup1')
    expect(response.body.data.data[3].isMain).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[3].isDefault).to.be.an('string').to.equal('NO')
    expect(response.body.data.data[3].isCustom).to.be.an('string').to.equal('YES')
    expect(response.body.data.data[3].type).to.be.an('string').to.equal('ATTENDEE')
  })

  it.only('Create group with speker group as source : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup2",
      "sourceGroupId": speakergroup3
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(speakergroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup2 = response.body.data.groupId
  })

  it.only('Create group with boothmember group as source : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup3",
      "sourceGroupId": boothmembergroup3
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(boothmembergroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup3 = response.body.data.groupId
  })

  it.only('Create group with another custom group as source : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup4",
      "sourceGroupId": global.customGroup1
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(global.customGroup1)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup4 = response.body.data.groupId
  })

  it.only('Create group with duplicate group name and verify error : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup4",
      "sourceGroupId": global.customGroup1
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body).to.have.all.keys('status', 'message', 'flag', 'eventLastUpdatedAt')
    expect(response.body.status).to.not.equal(200)
    expect(response.body.message).to.be.an('string').and.to.equal('Group name already exists. Please provide a unique group name.')
    
  })

  it.only('Get list for default groups : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10&isDefault=YES', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(1)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3])
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(1)
  })

  it.only('Get list for non default groups : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10&isDefault=NO', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(6)
    expect(response.body.data.data.map(map => map.id)).to.have.members([speakergroup3, boothmembergroup3, global.customGroup1, global.customGroup2, global.customGroup3, global.customGroup4])
    expect(response.body.data.currentPage).to.be.an('number').and.to.equal(0)
    expect(response.body.data.totalPages).to.be.an('number').and.to.equal(1)
  })


  it.only('Get list for groups on dashboard and verify : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    var attendeeGroupDetails1 = response.body.data.filter(map => map.id == global.customGroup1)[0]
    expect(attendeeGroupDetails1).to.not.be.undefined
    expect(attendeeGroupDetails1.name).to.equal('TestGroup1')
    expect(attendeeGroupDetails1.type).to.equal('ATTENDEE')
    expect(attendeeGroupDetails1.isMain).to.equal('NO')
    var attendeeGroupDetails2 = response.body.data.filter(map => map.id == global.customGroup2)[0]
    expect(attendeeGroupDetails2).to.not.be.undefined
    expect(attendeeGroupDetails2.name).to.equal('TestGroup2')
    expect(attendeeGroupDetails2.type).to.equal('ATTENDEE')
    expect(attendeeGroupDetails2.isMain).to.equal('NO')
    var attendeeGroupDetails3 = response.body.data.filter(map => map.id == global.customGroup3)[0]
    expect(attendeeGroupDetails3).to.not.be.undefined
    expect(attendeeGroupDetails3.name).to.equal('TestGroup3')
    expect(attendeeGroupDetails3.type).to.equal('ATTENDEE')
    expect(attendeeGroupDetails3.isMain).to.equal('NO')
    var attendeeGroupDetails4 = response.body.data.filter(map => map.id == global.customGroup4)[0]
    expect(attendeeGroupDetails4).to.not.be.undefined
    expect(attendeeGroupDetails4.name).to.equal('TestGroup4')
    expect(attendeeGroupDetails4.type).to.equal('ATTENDEE')
    expect(attendeeGroupDetails4.isMain).to.equal('NO')
  })

  var functionalityType
  var postSettingsPayload
  

  it.only('Verify group details on dashboard for settings and permissions : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'page':1, 'limit': 15, 'search': '' }, 'get')
    var groupIdListId = [attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup1, global.customGroup2, global.customGroup3, global.customGroup4]
    var groupListName = ['Attendee', 'Speaker', 'Booth Member', 'TestGroup1', 'TestGroup2', 'TestGroup3', 'TestGroup4']
    functionalityType = response.body.data.functionalityType
    //functionalityType = functionalityType.concat(response.body.data.onboradingFunctionality)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/details', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': global.customGroup1 }, 'get')
    var meetingSettingsDetails = response.body.data.meeting_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })

    var messagingSettingsDetails = response.body.data.messaging_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    var profileViewSettingsDetails = response.body.data.profile_view_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    var functionalitySettingsDetails = response.body.data.functionality_settings.map(function(map){ return {'community_functionality_type_id': map.community_functionality_type_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    expect(meetingSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': 1, 'name': groupListName[i]} }))
    expect(messagingSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': 1, 'name': groupListName[i]} }))
    expect(profileViewSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': 1, 'name': groupListName[i]} }))
    expect(functionalitySettingsDetails).to.have.deep.members(functionalityType.map((map) => { return {'community_functionality_type_id':map.id, 'is_enable': 1, 'name': map.name} }))

    expect(response.body.data.is_onboarding).to.equal(1)
    expect(response.body.data.is_default).to.equal('NO')
    expect(response.body.data.isCustom).to.equal('YES')
    expect(response.body.data.type).to.equal('ATTENDEE')

  })


  it.only('Update attendee group permission and create group using attendee group and verify the new group has all the updated settings : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    
    /* Disable group settings */
    

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/details', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': attendeegroup3 }, 'get')
    postSettingsPayload = response.body
    delete postSettingsPayload.status
    postSettingsPayload.data._id = attendeegroup3
    postSettingsPayload.data.meeting_settings[1].is_enable = 0
    postSettingsPayload.data.messaging_settings[1].is_enable = 0
    postSettingsPayload.data.profile_view_settings[1].is_enable = 0
    postSettingsPayload.data.functionality_settings[1].is_enable = 0

    var meetingSettingsUpdatedGroup = postSettingsPayload.data.meeting_settings[1].receiver_member_group_id
    var messageSettingsUpdatedGroup = postSettingsPayload.data.messaging_settings[1].receiver_member_group_id
    var profileSettingsUpdatedGroup = postSettingsPayload.data.profile_view_settings[1].receiver_member_group_id
    var functionalitySettingsUpdatedId = postSettingsPayload.data.functionality_settings[1].community_functionality_type_id

    /* Update group settings for attendee */

    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid' : attendeegroup3}, 'post', postSettingsPayload)
    
    expect(response.body.message).to.equal("Group's details have been updated.")
    
    /* Add another group with updated group settings */

    var payload = {
      "eventId": eventId4,
      "name": "TestGroup5",
      "sourceGroupId": attendeegroup3
    }
    response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken}, 'post', payload)

    expect(response.body.status).to.equal(200)
    global.customGroup5 = response.body.data.groupId

    var groupIdListId = [attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup1, global.customGroup2, global.customGroup3, global.customGroup4, global.customGroup5]
    var groupListName = ['Attendee', 'Speaker', 'Booth Member', 'TestGroup1', 'TestGroup2', 'TestGroup3', 'TestGroup4', 'TestGroup5']
    //functionalityType = functionalityType.concat(response.body.data.onboradingFunctionality)
    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/details', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': global.customGroup5 }, 'get')
    
    /* This will remove id for each of the settings and only compare groupId, name, is_enable */
    
    var meetingSettingsDetails = response.body.data.meeting_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })

    var messagingSettingsDetails = response.body.data.messaging_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    var profileViewSettingsDetails = response.body.data.profile_view_settings.map(function(map){ return {'receiver_member_group_id': map.receiver_member_group_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    var functionalitySettingsDetails = response.body.data.functionality_settings.map(function(map){ return {'community_functionality_type_id': map.community_functionality_type_id, 'is_enable': map.is_enable, 'name':map.name} })
    
    /* Compare group settings */
    
    expect(meetingSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': (map == meetingSettingsUpdatedGroup?0:1), 'name': groupListName[i]} }))
    expect(messagingSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': (map == messageSettingsUpdatedGroup?0:1), 'name': groupListName[i]} }))
    expect(profileViewSettingsDetails).to.have.deep.members(groupIdListId.map((map,i) => { return {'receiver_member_group_id':map, 'is_enable': (map == profileSettingsUpdatedGroup?0:1), 'name': groupListName[i]} }))
    expect(functionalitySettingsDetails).to.have.deep.members(functionalityType.map((map) => { return {'community_functionality_type_id':map.id, 'is_enable': (map.id == functionalitySettingsUpdatedId?0:1), 'name': map.name} }))

    expect(response.body.data.is_onboarding).to.equal(1)
    expect(response.body.data.is_default).to.equal('NO')
    expect(response.body.data.isCustom).to.equal('YES')
    expect(response.body.data.type).to.equal('ATTENDEE')

    postSettingsPayload = response.body
    delete postSettingsPayload.status

  })

  it.only('Update group settings make it default : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    
    /* Disable group settings */

    
    

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/details', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': global.customGroup5 }, 'get')
    postSettingsPayload = response.body
    delete postSettingsPayload.status
    postSettingsPayload.data._id = global.customGroup5
    postSettingsPayload.data.is_default = 'YES'

    /* Update group settings for attendee */

    response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', { 'organiserId': global.OrganizerId, 'eventId': eventId4, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid' : global.customGroup5}, 'post', postSettingsPayload)
    
    expect(response.body.message).to.equal("Group's details have been updated.")

  })

  it.only('Verify new group shows up in group list with isDefault set to yes : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10&isDefault=YES', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(1)
    expect(response.body.data.data.map(map => map.id)).to.have.members([global.customGroup5])
  })

  it.only('Verify new group does not shows up in group list with isDefault set to false : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10&isDefault=NO', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(7)
    expect(response.body.data.data.map(map => map.id)).to.not.include(global.customGroup5)
    expect(response.body.data.data.map(map => map.id)).to.include(attendeegroup3)
  })


  it.only('delete a group : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [global.customGroup2]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('data')
    expect(response.body.data.data).to.be.an('string').and.to.equal('Deleting groups.')
  })

  it.only('Get list for groups verify deleted group does not show up : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(7)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup1, global.customGroup3, global.customGroup4, global.customGroup5])
  })

  it.only('delete default attendee group and verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [attendeegroup3]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
    expect(response.body.message).to.be.an('string').and.to.equal("Sorry, You can not delete main groups.")
  })

  it.only('delete speaker group and verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [speakergroup3]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
  })

  it.only('delete boothmember group and verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [boothmembergroup3]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
  })

  it.only('delete a group that is assigned to a user : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [global.customGroup1]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('data')
    expect(response.body.data.data).to.be.an('string').and.to.equal('Deleting groups.')
    

  })

  it.only('Get list for groups verify deleted group does not show up : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(6)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup3, global.customGroup4, global.customGroup5])
  })

  it.only('group is removed from dashboard people table for an user on dashboard', async () => { 
    
    /* Verify the group is removed from user */

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eToken, 'organiserId': global.OrganizerId, 'eventId': eventId4, 'userId' : newPeopleID}, 'get')
    expect(response.body.status).to.equal(200)

    expect(response.body.data[0].email).to.be.an('string').and.to.equal('newuserwithcustomgroup1@yopmail.com')
    expect(response.body.data[0].first_name).to.be.an('string').and.to.equal('Attendee')
    expect(response.body.data[0].last_name).to.be.an('string').and.to.equal('User')
    
    expect(response.body.data[0].phone_code).to.be.an('string').and.to.equal('91')
    expect(response.body.data[0].phone).to.be.an('string').and.to.equal('9988887777')
    expect(response.body.data[0].groups).to.be.an('array').that.is.empty

  })

  it.only('Verify user does not have groups : GET /api/v1.1/integration/user/info', async () => {
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/info?eventId='+ eventId4 +'&email=newuserwithcustomgroup1@yopmail.com', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data[0].group).to.be.an('array').that.is.empty
  })

  it.only('delete a groups in bulk using two groups : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [global.customGroup3, global.customGroup4]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('data')
    expect(response.body.data.data).to.be.an('string').and.to.equal('Deleting groups.')
    

  })

  it.only('Get list for groups verify deleted group does not show up : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(4)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup5])
  })

  it.only('delete custom group which was made default and verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [global.customGroup5]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400)

    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
    expect(response.body.message).to.be.an('string').and.to.equal("You cannot delete the default group. Make sure you have set attendee or any other custom group for this event set as default before deleting this group.")
  })

  it.only('delete list of groups which include main and custom groups and verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId5,
      "groupId": groupPaginationList.slice(0,10)
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.not.equal(200)
    // expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    // expect(response.body.data).to.be.an('object').that.have.all.keys('data')
    // expect(response.body.data.data).to.be.an('string').and.to.equal('Deleting groups.')

  })

  it.only('Get list for groups verify none of the groups are deleted : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(28)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList)
  })

  it.only('delete 25 groups in bulk : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId5,
      "groupId": groupPaginationList.slice(3,28)
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('data')
    expect(response.body.data.data).to.be.an('string').and.to.equal('Deleting groups.')
  })

  it.only('Get list for groups verify deleted group does not show up : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=100', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId5 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(3)
    expect(response.body.data.data.map(map => map.id)).to.have.members(groupPaginationList.slice(0,3))
  })

  it.only('delete group which does not belong to the event and verify error verify error : POST /api/v1.1/integration/user/membergroup/delete', async () => { 
    var payload = {
      "eventId": eventId4,
      "groupId": [groupPaginationList[25]]
    }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/delete', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
    expect(response.body.message).to.equal("Group doesn't exist or not belongs to the event.")
  })

  it.only('Create group without source group name and verify error : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup10",
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(attendeegroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroupWithoutGrpupName = response.body.data.groupId
  })

  it.only('Create group with invalid eventId and verify error : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": 0,
      "name": "TestGroup10",
      "sourceGroupId": ""
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(500)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag')
    expect(response.body.message).to.equal("Something went wrong. Please try again.")
    
  })

  it.only('Create group with 25 char and verify the group must be created : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": 'agood'.repeat(5),
      "sourceGroupId": attendeegroup3
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(attendeegroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup6 = response.body.data.groupId
  })

  it.only('Get list for groups verify new group added : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(6)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup5, global.customGroupWithoutGrpupName, global.customGroup6])
    expect(response.body.data.data.filter(map => map.id == global.customGroup6)[0].name).to.equal('agood'.repeat(5))
  })

  it.only('Create group with more than 25 char and verify : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": 'isgood'.repeat(5),
      "sourceGroupId": attendeegroup3
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(400)
    expect(response.body).to.be.an('object').that.have.all.keys('status','message','flag','eventLastUpdatedAt')
    expect(response.body.message).to.be.an('string').to.equal("Group Name can be maximum 25 characters.")
  })

  it.only('Create group with empty source group name and verify group is getting created : POST /api/v1.1/integration/user/membergroup/create', async () => { 
    var payload = {
      "eventId": eventId4,
      "name": "TestGroup11",
      "sourceGroupId": ""
     }
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/create', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken }, 'post', payload)
    expect(response.body.status).to.equal(200)
    expect(response.body).to.be.an('object').that.have.all.keys('status','data','message','flag','eventLastUpdatedAt')
    expect(response.body.data).to.be.an('object').that.have.all.keys('groupId','type','isCustom')
    expect(response.body.data.groupId).to.be.an('string').and.to.not.equal(attendeegroup3)
    expect(response.body.data.type).to.be.an('string').and.to.equal('ATTENDEE')
    expect(response.body.data.isCustom).to.be.an('string').and.to.equal('YES')
    global.customGroup7 = response.body.data.groupId
  })

  it.only('Get list for groups verify new group added : GET /api/v1.1/integration/user/membergroup/list', async () => { 
    var response = await sendRequest(environment.ApiURL, '/api/v1.1/integration/user/membergroup/list?currentPage=0&limit=10', { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + process.env.eApiToken, 'eventid':eventId4 }, 'get')
    expect(response.body.status).to.equal(200)
    expect(response.body.data.data).to.be.an('array').that.have.lengthOf(7)
    expect(response.body.data.data.map(map => map.id)).to.have.members([attendeegroup3, speakergroup3, boothmembergroup3, global.customGroup5, global.customGroupWithoutGrpupName, global.customGroup6, global.customGroup7])
    expect(response.body.data.data.filter(map => map.id == global.customGroup7)[0].name).to.equal('TestGroup11')
  })


})


