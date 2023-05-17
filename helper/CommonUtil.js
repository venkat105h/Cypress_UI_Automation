/*
Author: 
Description: 
Timestamp: 
Modified: Biswajit Pattanaik 12th Oct 2021 03:00 PM
Description: Create and update functions added using json for people, session, comunity signup and login
Modified: Biswajit Pattanaik 14th Oct 2021 06:00 PM
Description: Rooms commonfunctions added
*/


import { expect } from 'chai'
import * as ApiEndPoints from './ApiEndPoints.js';
export const base = { 'Content-Type': 'application/json', 'Content': 'application/json', 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken } // common headers
import environment from '../config/environment';
import Responsemessages from '../config/Responsemessages';
require('dotenv').config();
const request = require('supertest');


export const addDays = (dateObj, numDays) => {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
};

export const addTime = (dateObj, numTime) => {
  dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
  return dateObj;
}

export var now = new Date(); //Current date

export var nextWeek = addDays(now, 3).toISOString().slice(0, 10); // Add 7 days

export var todayDate = new Date().toISOString().slice(0, 10);

export const sendRequest = async (requesturl, endpoint, headers, methodname, body = '', status = 200) => {
  let response
  switch (methodname) {
    case 'get':
      response = await request(requesturl)
        .get(endpoint)
        .set(headers)
      break;
    case 'post':
      response = await request(requesturl)
        .post(endpoint)
        .set(headers)
        .send(body);
      break;
    case 'put':
      response = await request(requesturl)
        .put(endpoint)
        .set(headers)
        .send(body);
      break;
    case 'patch':
      response = await request(requesturl)
        .patch(endpoint)
        .set(headers)
        .send(body);
      break;
    case 'delete':
      response = await request(requesturl)
        .delete(endpoint)
        .set(headers)
        .send(body);
      break;
    default:
      throw new Error('Incorrect method name')
  }
  consolelog(response)
  expect(response.status).to.equal(status)
  return response
};

export const getValueFromJsonObject = (jsonResponse, path) => {
  var jp = require('jsonpath')
  var result = jp.value(jsonResponse, path);
  return result;
}

export const getValuesFromJsonObject = (jsonResponse, path) => {
  var jp = require('jsonpath')
  var result = jp.query(jsonResponse, path);
  return result;
}

export const updateValueOfJsonObjectByPath = (jsonResponse, path, value) => {
  var jp = require('jsonpath')
  var result = jp.apply(jsonResponse, path, function(jssonValue){ return value });
  return jsonResponse;
}

//<-These are the function written by biswajit for bulk upload->


// Upload excel sheet to the target URL
export const uploadExcelFile = async (requestUrl,excelUploadEndPoint,headers,csvHeaders,location,filePath) => {
  var response = await request(requestUrl)
  .post(excelUploadEndPoint)
  .set(headers)
  .field('csvheaders',csvHeaders)
  .field('location',location)
  .attach('data',filePath,{ contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  expect(response.status).to.equal(200)
  return response;
}


//Trigger actuall bulk upload process for an excel sheet already uploaded to the application.
export const downloadAndSaveFileOnLocal = async (requestUrl,downloadEndpoint,localFolderPath) => {
  var fs = require('fs');
  var fileNameToSave = await downloadEndpoint.split('/').slice(-1)[0]
  var filePathToSave = await localFolderPath.concat("/",fileNameToSave)
  var response = await request(requestUrl)
  .get(downloadEndpoint)
  .buffer()
  .parse((res, callback) => {
    res.setEncoding('binary');
    res.data = '';
    res.on('data', (chunk) => {
      res.data += chunk;
    });
    res.on('end', () => {
      callback(null, Buffer.from(res.data,'binary'))
    });
  });
  expect(response.status).to.equal(200)
  await fs.writeFileSync( filePathToSave, response.body, "binary");
  return filePathToSave

}

//<--End of bulk upload functions>


// <-- By Biswajit Events class commmon functions -->

export class Events {
  constructor(){

  }
  async createEventOnDashboard( headers, name, description = '', start_time_milli, end_time_milli, timezone_id, instagram_url = '', linkedin_url = '', twitter_url = '', website_url = '', fb_url = ''){
    var jsonObj = {
      'data': {
        'name' : name,
        'description' : description,
        'start_time_milli' : start_time_milli,
        'end_time_milli' : end_time_milli,
        'timezone_id' : timezone_id,
        'instagram_url' : instagram_url,
        'linkedin_url' : linkedin_url,
        'twitter_url' : twitter_url,
        'website_url' : website_url,
        'fb_url' : fb_url,
        'base_language' : 34,
        'event_languages' : [
          34
        ]
      }
    }
    return (await this.createEventOnDashboardWithJsonBody(headers, jsonObj))
  }

  async createEventOnDashboardWithJsonBody(headers, jsonBody){
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.CreateEvent, headers, 'post',jsonBody)
    return (response.body.data.event_id)
  }

  async createEventNegativeOnDashboard( headers, name, description = '', start_time_milli, end_time_milli, timezone_id, instagram_url = '', linkedin_url = '', twitter_url = '', website_url = '', fb_url = '',eventMetaTypeId,eventMetaTypeValue ='',base_language,event_languages){
    var jsonObj = {
      'data': {
        'name' : name,
        'description' : description,
        'start_time_milli' : start_time_milli,
        'end_time_milli' : end_time_milli,
        'timezone_id' : timezone_id,
        'instagram_url' : instagram_url,
        'linkedin_url' : linkedin_url,
        'twitter_url' : twitter_url,
        'website_url' : website_url,
        'fb_url' : fb_url,
        "eventMetaTypeId": eventMetaTypeId,
        "eventMetaTypeValue": eventMetaTypeValue,
        'base_language' : base_language,
        'event_languages' : [
          event_languages
        ]
      }
    }
    var response = await this.createEventOnDashboardWithJsonBodyNegative(headers, jsonObj)
    expect(response.body).to.not.have.deep.property('event_id');
    return (response)

  }

  async createEventOnDashboardWithJsonBodyNegative(headers, jsonBody){
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.CreateEvent, headers, 'post',jsonBody)
    return response
  }



  async updateEventOnDashboard( headers, eventId, name, description = '', start_time_milli, end_time_milli, timezone_id, instagram_url = '', linkedin_url = '', twitter_url = '', website_url = '', fb_url = ''){
    var jsonObj = {
      'data': {
        'name' : name,
        'description' : description,
        'start_time_milli' : start_time_milli,
        'end_time_milli' : end_time_milli,
        'timezone_id' : timezone_id,
        'instagram_url' : instagram_url,
        'linkedin_url' : linkedin_url,
        'twitter_url' : twitter_url,
        'website_url' : website_url,
        'fb_url' : fb_url,
        'base_language' : 34,
        'event_languages' : [
          34
        ]
      }
    }
    var response = await this.updateEventOnDashboardWithJsonBody(headers, eventId, jsonObj)
    expect(response.body.data.name).to.equal(name);
    expect(response.body.data.linkedin_url).to.equal(linkedin_url);
    expect(response.body.data.instagram_url).to.equal(instagram_url);
  }

  async updateEventOnDashboardWithJsonBody( headers, eventId, jsonBody){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.EventBasicInfo, headers, 'put',jsonBody)
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_updated_message);
    return response
  }

  async getEventsListOnDashboard(headers){
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.ListEvents, headers, 'get')
    return response.body
  }

  async eventRestrictOffAddCustomOtp(headers, eventId, otp){
    await this.updateEventLoginSettings(headers, eventId, 0, otp)
  }
  async updateEventLoginSettings(headers, eventId, is_restrict = 0 ,default_custom_otp = '1234', is_allow_login = 1, is_facebook = 1, is_google = 1, is_linkedin = 1, is_signup = 1, is_sso = 0, is_sso_connected = false, support_email = '' ){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var  event = {
      "data": {
          "default_custom_otp": default_custom_otp,
          "is_allow_login": is_allow_login,
          "is_facebook": is_facebook,
          "is_google": is_google,
          "is_linkedin": is_linkedin,
          "is_restrict": is_restrict,
          "is_signup": is_signup,
          "is_sso": is_sso,
          "is_sso_connected": is_sso_connected,
          "support_email": support_email
      }
    }
    var response = await this.updateEventLoginSettingsJson(headers, eventId, event)
    expect(response.body.message).to.equal(Responsemessages.Parameters_dashboard_login_setting_updated_message)
  }

  async updateEventLoginSettingsJson(headers, eventId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.ChangeSettings, headers, 'put', jsonObj)
    return response
  }

  async makeEventGoLive(headers, eventId){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var goLiveDto = {
      "data": {
          "is_publish": 1
      }
    }
    var response = await sendRequest(environment.baseURL, ApiEndPoints.EventLive, headers, 'post', goLiveDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_publish_message);
    return (response.body.data.url).split("/community")[0];
  }

  async deleteEvent(headers,eventId){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.DeleteEvent , headers, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
  }
}

export class People{
  peopleType 
  exhibitorId
  constructor(peopleType = undefined, exhibitorId = undefined){
    this.peopleType = peopleType
    this.exhibitorId = exhibitorId
  }

  async addSingleAttendeeAndVerify(headers, eventId, email, first_name, last_name, groups, looking = '', offering = '', industry = '', interest = '', img_file_name = undefined, is_featured = undefined, is_rating = undefined, is_send_invite_mail = undefined, multiple_file= undefined, phone = undefined, phone_code = undefined, sessions = undefined){
    var response = await this.addSingleAttendee(headers, eventId, email, first_name, last_name, groups, looking, offering, industry, interest, img_file_name, is_featured, is_rating, is_send_invite_mail, multiple_file, phone, phone_code, sessions)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_post_message);
    var data = JSON.parse(response.body.data)
    return (data.userId.$oid)
  }

  async addSingleAttendee(headers, eventId, email, first_name, last_name, groups, looking = '', offering = '', industry = '', interest = '', img_file_name = undefined, is_featured = undefined, is_rating = undefined, is_send_invite_mail = undefined, multiple_file= undefined, phone = undefined, phone_code = undefined, sessions = undefined){
    var jsonObj = {
      'data': {
        'email' : email,
        'first_name' : first_name,
        'last_name' : last_name,
        'groups' : groups,
        'looking' : looking,
        'offering' : offering,
        'industry' : industry,
        'interest' : interest
      }
    }
    if(img_file_name != undefined)
      jsonObj.data['img_file_name'] = img_file_name
    if(is_featured != undefined)
      jsonObj.data['is_featured'] = is_featured
    if(is_rating != undefined)
      jsonObj.data['is_rating'] = is_rating
    if(is_send_invite_mail != undefined)
      jsonObj.data['is_send_invite_mail'] = is_send_invite_mail
    if(multiple_file != undefined)
      jsonObj.data['multiple_file'] = multiple_file
    if(phone != undefined)
      jsonObj.data['phone'] = phone
    if(phone_code != undefined)
      jsonObj.data['phone_code'] = phone_code
    if(sessions != undefined)
      jsonObj.data['sessions'] = sessions
    if(this.exhibitorId != undefined)
      jsonObj.data['exhibitor_id'] = this.exhibitorId
    return (await this.addSingleAttendeeJson(headers, eventId, jsonObj))
  }

  async addSingleAttendeeJson(headers, eventId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.AddPeople , headers, 'post', jsonObj)
    return response
  }

  
  async addSingleAttendeeAndVerifyNegative(headers, eventId, email, first_name, last_name, groups, looking = '', offering = '', industry = '', interest = '', img_file_name = undefined, is_featured = undefined, is_rating = undefined, is_send_invite_mail = undefined, multiple_file= undefined, phone = undefined, phone_code = undefined, sessions = undefined){
    var response = await this.addSingleAttendee(headers, eventId, email, first_name, last_name, groups, looking, offering, industry, interest, img_file_name, is_featured, is_rating, is_send_invite_mail, multiple_file, phone, phone_code, sessions)

  }

  async updateSingleAttendee(headers, eventId, userId, email, first_name, last_name, groups, looking = '', offering = '', industry = '', interest = '', img_file_name = undefined, is_featured = undefined, is_rating = undefined, is_send_invite_mail = undefined, multiple_file= undefined, phone = undefined, phone_code = undefined, sessions = undefined, category_id = undefined){
    var jsonObj = {
      'data': {
        'email' : email,
        'first_name' : first_name,
        'last_name' : last_name,
        'groups' : groups,
        'looking' : looking,
        'offering' : offering,
        'industry' : industry,
        'interest' : interest
      }
    }
    jsonObj.data['userId'] = userId
    if(img_file_name != undefined)
      jsonObj.data['img_file_name'] = img_file_name
    if(is_featured != undefined)
      jsonObj.data['is_featured'] = is_featured
    if(is_rating != undefined)
      jsonObj.data['is_rating'] = is_rating
    if(is_send_invite_mail != undefined)
      jsonObj.data['is_send_invite_mail'] = is_send_invite_mail
    if(multiple_file != undefined)
      jsonObj.data['multiple_file'] = multiple_file
    if(phone != undefined)
      jsonObj.data['phone'] = phone
    if(phone_code != undefined)
      jsonObj.data['phone_code'] = phone_code
    if(sessions != undefined)
      jsonObj.data['sessions'] = sessions
    if(category_id != undefined)
      jsonObj.data['category_id'] = category_id
    if(this.exhibitorId != undefined)
      jsonObj.data['exhibitor_id'] = this.exhibitorId

    var response = await this.updateSingleAttendeeJson(headers, eventId, jsonObj)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
    return response
  }

  async updateSingleAttendeeJson(headers, eventId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.UpdatePeople , headers, 'put', jsonObj)
    return response
  }

  async getPeopleList(headers, eventId){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    headers['page'] = environment.HPage
    headers['limit'] = environment.HLimit
    var response = await sendRequest(environment.baseURL, ApiEndPoints.GetPeople, headers, 'post')
    return (response.body)
  }

  async deleteAddedAttendee(headers, eventId, attendeeList){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var jsonObj = 
    {
      "data": {

        "ids": attendeeList,
        "is_all": 0

      }
    }
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.DeletePeople, headers, 'post',jsonObj)
    expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
  }
}

export class ComunitySignupLogin {
  constructor(){

  }

  async getNewWebstate(comunityUrl){
    var response = await this.getNewWebstateResponse(comunityUrl)
    return (response.body.success.data.access_token)
  }

  async getNewWebstateResponse(comunityUrl){
    comunityUrl = ((comunityUrl.split("https://")[1]))
    var headers = { 'Content-Type': 'application/json' }
    var jsonObj = {
      "payload": {
          "data": {
              "url": comunityUrl,
              "app_version": "1.0.0",
              "source": "COMMUNITY",
              "device_type": "WEB",
              "language": 34

          }
      }
    }
    var response = await sendRequest(environment.baseURL3, ApiEndPoints.CommunityLoginPage, headers, 'post', jsonObj)
    return response
  }

  async signupAndVerify(accessToken, email, firstname, lastname, password){
    var response  = await this.signup(accessToken, email, firstname, lastname, password)
    console.log(response.body)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_signup_newuser_succesfull_message, 'failed to signup new user = ' + email)
    expect(response.body.success.data.email).to.be.an('string').and.satisfy(str => str == email.toLowerCase())
    console.log(response.body)
    //global.clown26userid = (response.body.success.data._id)
    return (response.body.success.data.accessToken)
  }

  async signup(accessToken, email, firstname, lastname, password){
    var jsonObj = {
      "payload": {
          "data": {
              "email": email,
              "firstName": firstname,
              "lastName": lastname,
              "password": password,

          }
      }
    }
    return (await this.signupJson(accessToken, jsonObj))
  }
  async signupJson(accessToken, jsonObj){
    var headers = headers3
    headers['Authorization'] = accessToken
    return (await sendRequest(environment.baseURL3, ApiEndPoints.SignupUser, headers, 'post', jsonObj))
  }

  async onboarding(accessToken, jsonObj){
    var headers = headers3
    headers['Authorization'] = accessToken
    var response = await sendRequest(environment.baseURL3, ApiEndPoints.OnBoarding, headers, 'post', jsonObj)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);
  }

  async checkRegisteredEmail(accessToken, email){
    var headers = headers3
    headers['Authorization'] = accessToken
    const checkmail = {

      "payload": {
          "data": {
              "email": email,
              "is_otp_login": false
          }
      }
    }

    var response = await sendRequest(environment.baseURL3, ApiEndPoints.CheckRegistration, headers, 'post', checkmail)
    expect(response.body.success.data.is_password).to.equal(true)
    expect(response.body.success.data.is_register).to.equal(true)
  }
  async loginWithUsernameAndPassword(accessToken, email, password){
    var jsonObj = {
      "payload": {
          "data": {
              "email": email,
              "mode": "PASSWORD",
              "password": password
          }
      }
    }
    var response = await this.loginJson(accessToken, jsonObj)
    return (response.body.success.data.accessToken)
  }

  async loginWithOtp(accessToken, email, otp){
    var jsonObj = {
      "payload": {
        "data": {
            "email": email,
            "mode": "OTP",
            "otp": otp,
            "user_consent_data": []
        }
      }
    }
    var response = await this.loginJson(accessToken, jsonObj)
    return (response.body.success.data.accessToken)
  }

  async loginJson(accessToken, jsonObj){
    var headers = headers3
    headers['Authorization'] = accessToken
    var response = await sendRequest(environment.baseURL3, ApiEndPoints.ComunityLogin, headers, 'post', jsonObj)
    return response
  }
}

export class Session{
  constructor(){

  }

  async createSessionAndVerify(headers, eventId, title, agenda_track_id, banner, description, start_time_milli, end_time_milli){
    var response = await this.createSession(headers, eventId, title, agenda_track_id, banner, description, start_time_milli, end_time_milli)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_successfully_message)
    return (response.body.data.ids.agenda_id)
  }

  async createSession(headers, eventId, title, agenda_track_id, banner, description, start_time_milli, end_time_milli){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    const jsonObj =
    {
      "data": {
        "agenda_track_id": agenda_track_id,
        "banner": banner,
        "description": description,
        "end_time_milli": end_time_milli,
        "start_time_milli": start_time_milli,
        "title": title
      }
    }
    return (await this.createSessionJson(headers, eventId, jsonObj))
  }

  async createSessionJson(headers, eventId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.CreateSession, headers, 'post', jsonObj)
    return response
  }

  async updateSessionStreamSettings(headers, eventId, agendaId, hosting_properties, is_moderate_qna, is_stream, stream_link, stream_recording_link, stream_type_id){
    var jsonObj = {
      "data": {
        "hosting_properties": hosting_properties,
        "is_moderate_qna": is_moderate_qna,
        "is_stream": is_stream,
        "stream_link": stream_link,
        "stream_recording_link": stream_recording_link,
        "stream_type_id": stream_type_id
      }
    }
    var response = await this.updateSessionStreamSettingsJson(headers, eventId, agendaId, jsonObj)
    expect(response.body.message).to.equal(Responsemessages.Parameter_sessions__stream_post_successfully_message)
    return response
  }

  async updateSessionStreamSettingsJson(headers, eventId, agendaId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    headers['agendaId'] = agendaId
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.UpdateSessionStremSettings, headers, 'post', jsonObj)
    return response
  }

  async getSessionsList(headers, eventId){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.GetSessions, headers, 'get')
    console.log(response.body)
    return (response.body.data)
  }
  
  async deleteSession(headers, eventId, agendaId){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    headers['agendaId'] = agendaId
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.DeleteSession, headers, 'post')
    return response
  }
}

export class Notifications{
  notificationIdList;
  notificationType;
  notificationValues;
  constructor(notificationIdList){
    this.notificationIdList = notificationIdList;  
    this.notificationType = ["is_email", "is_in_app"]
    this.notificationValues = [0,1]
  }
  async getNotificationDefaultDto(){
    var defaultjsonDto={"data": []};
    this.notificationIdList.forEach((notificationId) => {
      var notificationObjectDto = {
        "id": notificationId,
        "is_email": 1,
        "is_in_app": 1
      }
      defaultjsonDto.data.push(notificationObjectDto)
    });
    return defaultjsonDto;
  }

  async updateNotificationsSetting(headers, eventId, notificationObjectDtoList){
    var defaultNotificationDto = await this.getNotificationDefaultDto();
    for(var i=0;i<notificationObjectDtoList.length;i++){
      var notificationObjectDto = notificationObjectDtoList[i]
      defaultNotificationDto = await this.updateNotification(defaultNotificationDto, notificationObjectDto.id, notificationObjectDto.type, notificationObjectDto.value)
    }
    var response = await this.updateNotificationWithJson(headers, eventId, defaultNotificationDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    return response
  }

  async updateNotificationSetting(headers, eventId, notificationId, notification_type, notification_value){
    var defaultNotificationDto = await this.getNotificationDefaultDto();
    defaultNotificationDto = await this.updateNotification(defaultNotificationDto, notificationId, notification_type, notification_value)
    var response = await this.updateNotificationWithJson(headers, eventId, defaultNotificationDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_notifications_update)
    return response
  }

  async updateNotification(defaultNotificationDto, notificationId, notification_type, notification_value){
    if (!this.notificationIdList.includes(notificationId)){
      throw new Error('Notifications.updateNotificationSetting - notificationId is not present in the notificationId list' + notificationId + ' ' + this.notificationIdList)
    }

    if (!this.notificationType.includes(notification_type)){
      throw new Error('Notifications.updateNotificationSetting - notification_type is not valid, allowed types:' + this.notificationType)
    }

    if (!this.notificationValues.includes(notification_value)){
      throw new Error('Notifications.updateNotificationSetting - notification_type is not valid, allowed types:' + this.notificationValues)
    }

    defaultNotificationDto = await updateValueOfJsonObjectByPath(defaultNotificationDto, '$.data[?(@.id=="'+ notificationId +'")].' + notification_type, notification_value)
    return defaultNotificationDto
  }

  async updateNotificationWithJson(headers, eventId, jsonObj){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var response = await sendRequest(environment.baseURL1, ApiEndPoints.UpdateBackendNotification, headers, 'put', jsonObj)
    return response
  }
}

export class Rooms{
  defaultJsonDto = {
    "data": {
      "roomId": "",
      "name": "",
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
      "isFeatured": "NO",
      "isChat": "YES",
      "isQandA": "YES",
      "isModerateQandA": "NO",
      "isPolls": "YES",
      "isParticipant": "YES",
      "isRoomInfo": "NO"
    }
  }

  constructor(name, description, roomType, joinPermission){
    this.defaultJsonDto.data['name'] = name;
    this.defaultJsonDto.data['description'] = description;
    this.defaultJsonDto.data['roomType'] = roomType;
    this.defaultJsonDto.data['joinPermission'] = joinPermission;
    if(roomType == "MULTIPLE"){
      this.defaultJsonDto.data['roomStartMilli'] = null;
      this.defaultJsonDto.data['roomExipryMilli'] = null;
    }
    if(joinPermission == "HIDDEN"){
      this.defaultJsonDto.data['shareAVPermission'] = "MODERATED";
    }
  }

  async createRoom(headers, eventId, jsonDto){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    if(jsonDto != undefined)
      await this.updateDefaultJsonDto(jsonDto)
    var response = await sendRequest(environment.baseURL, ApiEndPoints.CreateRooms , headers, 'post', this.defaultJsonDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_rooms_save_message)
    return response.body.roomId
  }

  async updateDefaultJsonDto(jsonDto){
    Object.keys(jsonDto).forEach((key)=>{
      this.defaultJsonDto.data[key] = jsonDto[key]
    });
  }

  static async filterRooms(headers, eventId, roomType, joinPermission, shareAVPermission){
    headers['eventId'] = eventId
    headers['buildversion'] = process.env.buildversion
    var filter_room= {
      "data": {
        "filter": {
          "roomType": "",
          "roomStartMilli": "",
          "roomExipryMilli": "",
          "shareAVPermission": [],
          "joinPermission": [],
          "roomStartTime": "",
          "roomEndTime": ""
        }
      }
    }
    filter_room.data.filter.roomType = roomType;
    filter_room.data.filter.joinPermission = joinPermission;
    filter_room.data.filter.shareAVPermission = shareAVPermission;
    var response = await sendRequest(environment.baseURL, ApiEndPoints.ListRooms , headers, 'post', filter_room)
    return response
  }
}

export const consolelog = (response) => {
  if (process.env.consoleflag == 'test') {
    console.log('****************************************************************************************************************')
    console.log(response.status, 'status')
    console.log(response.body, 'body')
    console.log('****************************************************************************************************************')
  }
}

// <-- End of Events class commmon functions -->

export const emailaddress =
{
  release_email: "hubilo_api@yopmail.com",
  qat_email: "hubilo_api@yopmail.com",
  swat_email: "hubilo_api@yopmail.com",
  //dev_email:"amit_v2dev1@hubilo.com",
  dev_email:"mihir.jain@hubilo.com",
  qat_fuzzemail: "hubilo_apifuzz@yopmail.com",
  release_fuzzemail: "hubilo_apifuzz@yopmail.com",
  qat1_email: "hubilo_api@yopmail.com",
  qat_super_admin_email: "hrt7809@gmail.com",
  qat1_super_admin_email: "hrt7809@gmail.com",
  release_super_admin_email: "hrt7809@gmail.com",
  swat_super_admin_email: "hrt7809@gmail.com"
}

export const emailPassword =
{
  release_password: "hubilomasterpassword",
  qat_password: "hubilomasterpassword",
  qat1_password: "hubilomasterpassword",
  swat_password: "hubilomasterpassword",
  dev_password: "Hubilo@123",
  qat_super_admin_password: "hrt12345",
  qat1_super_admin_password: "hrt12345",
  release_super_admin_password: "hrt12345",
  swat_super_admin_password: "hrt12345",
}

export const headers = { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' } // common headers
export const headers2 = { 'Authorization': process.env.accessTokenLoginPage, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' } // common headers
export const headers3 = { 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' } // common headers
export const dashboardheader = { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }

//Common function to fetch updated organizerId and userToken for Freetrial user

export const freeTrialUserHeader = () =>{
  return {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}
} 

export const organizerUserHeader = () =>{
  return {'organiserId': environment.HOrganiserId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + process.env.eToken}
} 

export const organizerUserHeaderpeople = () =>{
  return {'organiserId': environment.HOrganiserId, 'buildversion': process.env.buildversion, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + process.env.eToken}
} 