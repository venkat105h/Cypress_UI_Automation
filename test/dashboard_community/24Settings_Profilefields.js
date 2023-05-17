/*
Author: Gaurav Thapar
Description: This Script will add/edit/update/verify settings in profile fields 
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 27th Oct 2021 5:50 PM
Description : Updaing the payload for update profile calls, and removed commented blocks
Modified : Biswajit Pattanaik 6th Dec 2021 00:00 PM
Description : Adding toggle combination functional checks 128 cases 16 combinations
Modified: Pranjal Shah 24th Jan 2022 11:49 AM
Description : SWAT cases added for december.
Modified: Pranjal Shah 27th Jan 2022 19:05 PM
Description : Response message added for profile filed test cases.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest, getValueFromJsonObject, organizerUserHeader, People, ComunitySignupLogin,headers3 } from '../../helper/CommonUtil'
require('dotenv').config();
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
var request3 = supertest(environment.baseURL3);
var firstname_id
var lastname_id
var gender_id
var about_id
var designation_id
var organisation_id
var country_id
var state_id
var city_id
var website_id
var facebook_id
var linkedin_id
var twitter_id
var instagram_id
var hobbyid
var paintingid
var groupidadded
var checkboxidadded
var linkidadded
var fileidadded
var dateidadded
var groupid
var attendeegroup
var speakergroup
var boothmembergroup
var peopleList = []
var created_group_id

describe('Update Setting for Profile fields And Verify', () => {
  beforeEach(function (done) {
    setTimeout(function(){
      done();
    }, environment.HTestDelay);
  });

  it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
    attendeegroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Attendee')].id")
    boothmembergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Booth Member')].id")
    speakergroup = getValueFromJsonObject(response.body, "$.data[?(@.name=='Speaker')].id")
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

  it.only('Get user profile fields : GET /backend/api/v2/events/settings/userprofile', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    firstname_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='First Name')]._id")
    lastname_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Last Name')]._id")
    gender_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Gender')]._id")
    about_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='About')]._id")
    designation_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Designation')]._id")
    organisation_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Organisation')]._id")
    country_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Country')]._id")
    state_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='State')]._id")
    city_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='City/Town')]._id")
    website_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Website')]._id")
    facebook_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Facebook Link')]._id")
    linkedin_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Linkedin Link')]._id")
    twitter_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Twitter Link')]._id")
    instagram_id = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Instagram Link')]._id")
  });

  it.only('Update gender as mandatory & display = true : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : gender_id},'put',genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify gender updated value for mandtory and display: POST /api/v2/users/profile', async () => {
    const genderupdatecomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',genderupdatecomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").isShowToOthers).to.equal('YES')
  });
  
  it.only('Verify gender updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[0].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[0].fieldName).to.equal('Gender')
  });

  it.only('Update gender with options as female set to default : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const genderupdate1 = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [
        "Female"
        ],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : gender_id},'put',genderupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify gender updated selected options value as female : POST /api/v2/users/profile', async () => {
    const genderupdatecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',genderupdatecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").selectedOptions[0]).to.equal('Female')
  });

  it.only('Update gender with options as female set to default : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const genderupdate1 = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [
        "Female"
        ],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : gender_id},'put',genderupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify gender updated selected options value as female : POST /api/v2/users/profile', async () => {
    const genderupdatecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',genderupdatecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").selectedOptions[0]).to.equal('Female')
  });

  it.only('Update gender with mandtory flag as no : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const genderupdate2 = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [
        "Female"
        ],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : gender_id},'put',genderupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });
  it.only('Verify gender updated with mandatory flag as no : POST /api/v2/users/profile', async () => {
    const genderupdatecomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',genderupdatecomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@.fieldName=='Gender')]").isRequired).to.equal('NO')
  });


  it.only('Verify gender updated value for mandtory as false and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[0].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[0].fieldName).to.equal('Gender')
  });

  it.only('Update about with length(1-1000 char), display field & display to all flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const aboutupdate= {
      "data": {
        "_id": about_id,
        "fieldName": "About",
        "fieldNameLang": {
          "34": "About"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 6,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 1000
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 15,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "about",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid': about_id},'put',aboutupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify about with length(1-1000 char), display field & display to all flag as true : POST /api/v2/users/profile', async () => {
    const aboutupdatecomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',aboutupdatecomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.max).to.equal(1000)
  });

  it.only('Verify About updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[1].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[1].fieldName).to.equal('About')
  });

  it.only('Update about with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const aboutupdate1 = {
      "data": {
        "_id": about_id,
        "fieldName": "About",
        "fieldNameLang": {
          "34": "About"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 6,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 1000
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 15,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "about",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid': about_id},'put',aboutupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify about with mandatory flag as true : POST /api/v2/users/profile', async () => {
    const aboutupdatecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',aboutupdatecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isRequired).to.equal('YES')
  });

  it.only('Update about with length :- min 1 & max 500 : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const aboutupdate2 = {
      "data": {
        "_id": about_id,
        "fieldName": "About",
        "fieldNameLang": {
          "34": "About"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 6,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 15,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "about",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : about_id},'put',aboutupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify about with length :- min 1 & max 500 : POST /api/v2/users/profile', async () => {
    const aboutupdatecomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',aboutupdatecomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.max).to.equal(500)
  });

  it.only('Update about with length :- min 1 & max 4000,mandatory & display to other flags as false : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const aboutupdate3 = {
      "data": {
        "_id": about_id,
        "fieldName": "About",
        "fieldNameLang": {
          "34": "About"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 6,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 4000
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 15,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "about",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : about_id},'put',aboutupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify about with length :- min 1 & max 4000,mandatory & display to other flags as false : POST /api/v2/users/profile', async () => {
    const aboutupdatecomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',aboutupdatecomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.max).to.equal(4000)
  });

  it.only('Update about with length :- min 5 & max 10,mandatory & display to other flags as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
    const aboutupdate4 = {
      "data": {
        "_id": about_id,
        "fieldName": "About you for the field",
        "fieldNameLang": {
          "34": "About you for the field"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 6,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 5,
            "max": 10
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 15,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "about",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : about_id},'put',aboutupdate4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify about with length :- min 5 & max 10,mandatory & display to other flags as true : POST /api/v2/users/profile', async () => {
    const aboutupdatecomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',aboutupdatecomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.min).to.equal(5)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").properties.length.max).to.equal(10)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + about_id + "')]").fieldName).to.equal('About you for the field')
  });

  it.only('Update designation with filter attendees flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation",
        "fieldNameLang": {
          "34": "Designation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });
  it.only('Verify designation with filter attendees flag as false : POST /api/v2/users/profile', async () => {
    const designationcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(50)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").fieldName).to.equal('Designation')
  });

  it.only('Verify Designation on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[2].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[2].fieldName).to.equal('Designation')
  });

  it.only('Update designation with mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate1 = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation",
        "fieldNameLang": {
          "34": "Designation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify designation with mandatory flag as true : POST /api/v2/users/profile', async () => {
    const designationcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(50)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").fieldName).to.equal('Designation')
  });

  it.only('Verify Designation on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[2].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[2].fieldName).to.equal('Designation')
  });


  it.only('Update designation with filters attendees flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate2 = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation",
        "fieldNameLang": {
          "34": "Designation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify designation with filters attendees flag as true : POST /api/v2/users/profile', async () => {
    const designationcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(50)
    //expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isUseInFilter).to.equal('YES')
  });

  it.only('Update designation with length :- min (1), max (100) :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate3 = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation",
        "fieldNameLang": {
          "34": "Designation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify designation with length :- min (1), max (100)  : POST /api/v2/users/profile', async () => {
    const designationcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(100)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isUseInOnoarding).to.equal('YES')
  });

  it.only('Update designation with length :- min (1), max (100) & mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate4 = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation",
        "fieldNameLang": {
          "34": "Designation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Designation with length min(1), max(100) dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[2].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[2].fieldName).to.equal('Designation')
    expect(response.body.data.default_fields[2].properties.length.min).to.equal(1)
    expect(response.body.data.default_fields[2].properties.length.max).to.equal(100)
  });

  it.only('Verify designation with length :- min (1), max (100) & mandatory flag as false  : POST /api/v2/users/profile', async () => {
    const designationcomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(100)
    //expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isUseInFilter).to.equal('YES')
  });

  it.only('Update designation field with name :- Designation test & mandatory as YES :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const designationupdate5 = {
      "data": {
        "_id": designation_id,
        "fieldName": "Designation test",
        "fieldNameLang": {
          "34": "Designation test"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 7,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 3,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 11H18C18.2652 11 18.5196 10.8946 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8H17C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11ZM6 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11C12 10.7348 11.8946 10.4804 11.7071 10.2929C11.5196 10.1054 11.2652 10 11 10H6C5.73478 10 5.48043 10.1054 5.29289 10.2929C5.10536 10.4804 5 10.7348 5 11C5 11.2652 5.10536 11.5196 5.29289 11.7071C5.48043 11.8946 5.73478 12 6 12ZM22 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V19C1 19.2652 1.10536 19.5196 1.29289 19.7071C1.48043 19.8946 1.73478 20 2 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V5C23 4.73478 22.8946 4.48043 22.7071 4.29289C22.5196 4.10536 22.2652 4 22 4ZM21 18H3V6H21V18ZM6 16H11C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15C12 14.7348 11.8946 14.4804 11.7071 14.2929C11.5196 14.1054 11.2652 14 11 14H6C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15C5 15.2652 5.10536 15.5196 5.29289 15.7071C5.48043 15.8946 5.73478 16 6 16Z\" fill=\"black\"/></svg>",
        "icon_name": "jobTitle",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : designation_id},'put',designationupdate5)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify designation field with name :- Designation test & mandatory as YES: POST /api/v2/users/profile', async () => {
    const designationcomm5 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',designationcomm5)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").properties.length.max).to.equal(100)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + designation_id + "')]").fieldName).to.equal('Designation test')
  });


  //Organisation cases

  it.only('Update organisation with filter attendees flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation",
        "fieldNameLang": {
          "34": "Organisation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify organisation with filter attendees flag as false : POST /api/v2/users/profile', async () => {
    const organisationcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(50)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").fieldName).to.equal('Organisation')

  });


  it.only('Verify Organisation with mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[3].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[3].fieldName).to.equal('Organisation')
    expect(response.body.data.default_fields[3].properties.length.min).to.equal(1)
  });

  it.only('Update organisation with mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate1 = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation",
        "fieldNameLang": {
          "34": "Organisation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Organisation with mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[3].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[3].fieldName).to.equal('Organisation')
    expect(response.body.data.default_fields[3].properties.length.min).to.equal(1)
  });

  it.only('Verify organisation with mandatory flag as true : POST /api/v2/users/profile', async () => {
    const organisationcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(50)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").fieldName).to.equal('Organisation')
  });

  it.only('Update organisation with filters attendees flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate2 = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation",
        "fieldNameLang": {
          "34": "Organisation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify organisation with filters attendees flag as true : POST /api/v2/users/profile', async () => {
    const organisationcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(50)
    //expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isUseInFilter).to.equal('YES')
    
  });

  it.only('Update organisation with length :- min (1), max (100) :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate3 = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation",
        "fieldNameLang": {
          "34": "Organisation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify organisation with length :- min (1), max (100)  : POST /api/v2/users/profile', async () => {
    const organisationcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(100)
    //expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isUseInFilter).to.equal('YES')
  });

  it.only('Update organisation with length :- min (1), max (100) & mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate4 = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation",
        "fieldNameLang": {
          "34": "Organisation"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify organisation with length :- min (1), max (100) & mandatory flag as false  : POST /api/v2/users/profile', async () => {
    const organisationcomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(100)
    //expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isUseInFilter).to.equal('YES')
  });

  it.only('Update organisation field with name :- Organisation test & mandatory as YES :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const organisationupdate5 = {
      "data": {
        "_id": organisation_id,
        "fieldName": "Organisation test",
        "fieldNameLang": {
          "34": "Organisation test"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 8,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          }
        },
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "NO",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 4,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H14C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8ZM14 12H15C15.2652 12 15.5196 11.8946 15.7071 11.7071C15.8946 11.5196 16 11.2652 16 11C16 10.7348 15.8946 10.4804 15.7071 10.2929C15.5196 10.1054 15.2652 10 15 10H14C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.2652 13.1054 11.5196 13.2929 11.7071C13.4804 11.8946 13.7348 12 14 12ZM9 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8ZM9 12H10C10.2652 12 10.5196 11.8946 10.7071 11.7071C10.8946 11.5196 11 11.2652 11 11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10H9C8.73478 10 8.48043 10.1054 8.29289 10.2929C8.10536 10.4804 8 10.7348 8 11C8 11.2652 8.10536 11.5196 8.29289 11.7071C8.48043 11.8946 8.73478 12 9 12ZM21 20H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20ZM13 20H11V16H13V20ZM18 20H15V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14H10C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15V20H6V4H18V20Z\" fill=\"black\"/></svg>",
        "icon_name": "organisation",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "YES",
        "userFiledType": "Text",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : organisation_id},'put',organisationupdate5)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify organisation field with name :- Organisation test & mandatory as YES: POST /api/v2/users/profile', async () => {
    const organisationcomm5 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisationcomm5)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.min).to.equal(1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").properties.length.max).to.equal(100)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + organisation_id + "')]").fieldName).to.equal('Organisation test')
  });

  it.only('Verify Organisation with mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[3].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[3].fieldName).to.equal('Organisation test')
    expect(response.body.data.default_fields[3].properties.length.min).to.equal(1)
    expect(response.body.data.default_fields[3].properties.length.max).to.equal(100)
  });

  //Country settings

  it.only('Update country field with mandatory & display field flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate = {
      "data": {
        "_id": country_id,
        "fieldName": "Country",
        "fieldNameLang": {
          "34": "Country"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify country field with mandatory & display field flag as true : POST /api/v2/users/profile', async () => {
    const countrycomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").fieldName).to.equal('Country')
  });

  it.only('Verify Country with mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[4].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[4].fieldName).to.equal('Country')
  });
  

  it.only('Update country field with mandatory as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate1 = {
      "data": {
        "_id": country_id,
        "fieldName": "Country",
        "fieldNameLang": {
          "34": "Country"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify country field with mandatory as false : POST /api/v2/users/profile', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").fieldName).to.equal('Country')
  });

  it.only('Verify Country with mandatory as false on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[4].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[4].fieldName).to.equal('Country')
  });

  it.only('Update country field with show in filter and display as true and other flags set to false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate1 = {
      "data": {
        "_id": country_id,
        "fieldName": "Country",
        "fieldNameLang": {
          "34": "Country"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify country is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Country")
  });

  it.only('Update country field with show in filter as true and other flags set to false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate1 = {
      "data": {
        "_id": country_id,
        "fieldName": "Country",
        "fieldNameLang": {
          "34": "Country"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify country is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Country")
  });


  it.only('Update country field with show in filter as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate1 = {
      "data": {
        "_id": country_id,
        "fieldName": "Country",
        "fieldNameLang": {
          "34": "Country"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify country is not showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("Country")
  });

  it.only('Update country field with field name as :- Country field new :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const countryupdate2 = {
      "data": {
        "_id": country_id,
        "fieldName": "Country field new",
        "fieldNameLang": {
          "34": "Country field new"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 9,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of all the countries will be displayed",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 5,
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
        "icon_name": "country",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Country with updated name dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[4].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[4].fieldName).to.equal('Country field new')
  });

  //State settings
  it.only('Update state field with mandatory & display field flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state field with mandatory & display field flag as true: POST /api/v2/users/profile', async () => {
    const statecomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',statecomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").fieldName).to.equal('State')
  });

  it.only('Verify State with mandatory flag as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[5].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[5].fieldName).to.equal('State')
  });

  it.only('Update state field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state field with mandatory flag as false: POST /api/v2/users/profile', async () => {
    const statecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',statecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").fieldName).to.equal('State')
  });
  
  it.only('Verify State with mandatory flag as false on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[5].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[5].fieldName).to.equal('State')
  });

  it.only('Update state field with show in filter and show flag as true and other flags as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("State")
  });

  it.only('Update state field with show in filter true and other flags as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("State")
  });

  it.only('Update state field with show in filter flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state is not showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("State")
  });

  it.only('Update state field with field name as state field new:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate2 = {
      "data": {
        "_id": state_id,
        "fieldName": "State field new",
        "fieldNameLang": {
          "34": "State field new"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state field with field name as state field new: POST /api/v2/users/profile', async () => {
    const statecomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',statecomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").fieldName).to.equal('State field new')
  });

  it.only('Verify State with updated name on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[5].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[5].fieldName).to.equal('State field new')
  });

  //Website settings
  it.only('Update website field with mandatory, display field, display field to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const websiteupdate = {
      "data": {
        "_id": website_id,
        "fieldName": "Website",
        "fieldNameLang": {
          "34": "Website"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 12,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : website_id},'put',websiteupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify website field with mandatory, display field, display field to others flag as true : POST /api/v2/users/profile', async () => {
    const websitecomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',websitecomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").fieldName).to.equal('Website')
  });

  it.only('Verify Website field with mandatory as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[7].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[7].fieldName).to.equal('Website')
  });

  it.only('Update website field with mandatory,display field to others flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const websiteupdate1 = {
      "data": {
        "_id": website_id,
        "fieldName": "Website",
        "fieldNameLang": {
          "34": "Website"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 12,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : website_id},'put',websiteupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify website field with mandatory,display field to others flag as false : POST /api/v2/users/profile', async () => {
    const websitecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',websitecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + website_id + "')]").fieldName).to.equal('Website')
  });

  it.only('Verify Website field with mandatory as false on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[7].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[7].fieldName).to.equal('Website')
  });

  //Facebook field
  it.only('Update facebook field with mandatory,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const facebookupdate = {
      "data": {
        "_id": facebook_id,
        "fieldName": "Facebook Link",
        "fieldNameLang": {
          "34": "Facebook Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 13,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 9,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
        "icon_name": "facebook",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : facebook_id},'put',facebookupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify facebook field with mandatory,display field & display to others flag as true : POST /api/v2/users/profile', async () => {
    const facebookcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',facebookcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").fieldName).to.equal('Facebook Link')
  });

  it.only('Verify facebook field with mandatory as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[8].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[8].fieldName).to.equal('Facebook Link')
  });

  //Facebook field
  it.only('Update facebook field with mandatory,display field as true & display to others flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const facebookupdate1 = {
      "data": {
        "_id": facebook_id,
        "fieldName": "Facebook Link",
        "fieldNameLang": {
          "34": "Facebook Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 13,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 9,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
        "icon_name": "facebook",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : facebook_id},'put',facebookupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify facebook field with mandatory,display field as true & display to others flag as false : POST /api/v2/users/profile', async () => {
    const facebookcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',facebookcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").fieldName).to.equal('Facebook Link')
  });

  it.only('Verify facebook field with mandatory as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[8].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[8].fieldName).to.equal('Facebook Link')
  });

  //Facebook field
  it.only('Update facebook field with display to others,display field as true & mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const facebookupdate2 = {
      "data": {
        "_id": facebook_id,
        "fieldName": "Facebook Link",
        "fieldNameLang": {
          "34": "Facebook Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 13,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 9,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
        "icon_name": "facebook",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : facebook_id},'put',facebookupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify facebook field with display to others,display field as true & mandatory flag as false : POST /api/v2/users/profile', async () => {
    const facebookcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',facebookcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").fieldName).to.equal('Facebook Link')
  });

  it.only('Update facebook field with display flag as true, display to others & mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const facebookupdate3 = {
      "data": {
        "_id": facebook_id,
        "fieldName": "Facebook Link",
        "fieldNameLang": {
          "34": "Facebook Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 13,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 9,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
        "icon_name": "facebook",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : facebook_id},'put',facebookupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify facebook field with display flag as true, display to others & mandatory flag as false : POST /api/v2/users/profile', async () => {
    const facebookcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',facebookcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").fieldName).to.equal('Facebook Link')
  });

  it.only('Update facebook field with name :- Facebook Link new field & display flag, display to others, mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const facebookupdate4 = {
      "data": {
        "_id": facebook_id,
        "fieldName": "Facebook Link new field",
        "fieldNameLang": {
          "34": "Facebook Link new field"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 13,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "NO",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 9,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
        "icon_name": "facebook",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : facebook_id},'put',facebookupdate4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify facebook field with name :- Facebook Link new field & display flag, display to others, mandatory flag as true : POST /api/v2/users/profile', async () => {
    const facebookcomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',facebookcomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + facebook_id + "')]").fieldName).to.equal('Facebook Link new field')
  });

  it.only('Verify facebook field with updated name on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[8].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[8].fieldName).to.equal('Facebook Link new field')
  });

  //Linkedin link
  it.only('Update linkedin field with mandatory,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkedinupdate = {
      "data": {
        "_id": linkedin_id,
        "fieldName": "Linkedin Link",
        "fieldNameLang": {
          "34": "Linkedin Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 14,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 17,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
        "icon_name": "linkedIn",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : linkedin_id},'put',linkedinupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify linkedin field with mandatory,display field & display to others flag as true : POST /api/v2/users/profile', async () => {
    const linkedincomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',linkedincomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").fieldName).to.equal('Linkedin Link')
  });

  it.only('Verify linkedin field with mandatory flag as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[9].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[9].fieldName).to.equal('Linkedin Link')
  });

  it.only('Update linkedin field with mandatory flag as false ,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkedinupdate1 = {
      "data": {
        "_id": linkedin_id,
        "fieldName": "Linkedin Link",
        "fieldNameLang": {
          "34": "Linkedin Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 14,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 17,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
        "icon_name": "linkedIn",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : linkedin_id},'put',linkedinupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify linkedin field with mandatory flag as false ,display field & display to others flag as true  : POST /api/v2/users/profile', async () => {
    const linkedincomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',linkedincomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").fieldName).to.equal('Linkedin Link')
  });

  it.only('Verify linkedin field with mandatory flag as false on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[9].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[9].fieldName).to.equal('Linkedin Link')
  });

  it.only('Update linkedin field with display to others flag as false ,display field & mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkedinupdate2 = {
      "data": {
        "_id": linkedin_id,
        "fieldName": "Linkedin Link",
        "fieldNameLang": {
          "34": "Linkedin Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 14,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 17,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
        "icon_name": "linkedIn",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : linkedin_id},'put',linkedinupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify linkedin field with display to others flag as false ,display field & mandatory flag as true  : POST /api/v2/users/profile', async () => {
    const linkedincomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',linkedincomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").fieldName).to.equal('Linkedin Link')
  });

  it.only('Update linkedin field with display to others,mandatory flag as false ,display field flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkedinupdate3 = {
      "data": {
        "_id": linkedin_id,
        "fieldName": "Linkedin Link",
        "fieldNameLang": {
          "34": "Linkedin Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 14,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 17,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
        "icon_name": "linkedIn",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : linkedin_id},'put',linkedinupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify linkedin field with display to others,mandatory flag as false ,display field flag as true : POST /api/v2/users/profile', async () => {
    const linkedincomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',linkedincomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkedin_id + "')]").fieldName).to.equal('Linkedin Link')
  });

  //Twitter link
  it.only('Update twitter field with mandatory,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const twitterupdate = {
      "data": {
        "_id": twitter_id,
        "fieldName": "Twitter Link",
        "fieldNameLang": {
          "34": "Twitter Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 15,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 10,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
        "icon_name": "twitter",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : twitter_id},'put',twitterupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify twitter field with mandatory,display field & display to others flag as true : POST /api/v2/users/profile', async () => {
    const twittercomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',twittercomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").fieldName).to.equal('Twitter Link')
  });

  it.only('Verify twitter field with mandatory flag as true on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[10].isRequired).to.equal('YES')
    expect(response.body.data.default_fields[10].fieldName).to.equal('Twitter Link')
  });

  it.only('Update twitter field with mandatory flag as false ,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const twitterupdate1 = {
      "data": {
        "_id": twitter_id,
        "fieldName": "Twitter Link",
        "fieldNameLang": {
          "34": "Twitter Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 15,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 10,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
        "icon_name": "twitter",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : twitter_id},'put',twitterupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify linkedin field with mandatory flag as false ,display field & display to others flag as true  : POST /api/v2/users/profile', async () => {
    const twittercomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',twittercomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").fieldName).to.equal('Twitter Link')
  });

  it.only('Verify twitter field with mandatory flag as false on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.default_fields[10].isRequired).to.equal('NO')
    expect(response.body.data.default_fields[10].fieldName).to.equal('Twitter Link')
    expect(response.body.data.default_fields[10].user_profile_field_type).to.equal(7)
  });

  it.only('Update twitter field with display to others flag as false ,display field & mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const twitterupdate2 = {
      "data": {
        "_id": twitter_id,
        "fieldName": "Twitter Link",
        "fieldNameLang": {
          "34": "Twitter Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 15,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 10,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
        "icon_name": "twitter",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : twitter_id},'put',twitterupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify twitter field with display to others flag as false ,display field & mandatory flag as true  : POST /api/v2/users/profile', async () => {
    const twittercomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',twittercomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").fieldName).to.equal('Twitter Link')
  });

  it.only('Update twitter field with display to others,mandatory flag as false ,display field flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const twitterupdate3 = {
      "data": {
        "_id": twitter_id,
        "fieldName": "Twitter Link",
        "fieldNameLang": {
          "34": "Twitter Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 15,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 10,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
        "icon_name": "twitter",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : twitter_id},'put',twitterupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify twitter field with display to others,mandatory flag as false ,display field flag as true : POST /api/v2/users/profile', async () => {
    const twittercomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',twittercomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + twitter_id + "')]").fieldName).to.equal('Twitter Link')
  });

  //Instagram link
  it.only('Update instagram field with mandatory,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const instagramupdate = {
      "data": {
        "_id": instagram_id,
        "fieldName": "Instagram Link",
        "fieldNameLang": {
          "34": "Instagram Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 16,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 11,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
        "icon_name": "instagram",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : instagram_id},'put',instagramupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify instagram field with mandatory,display field & display to others flag as true : POST /api/v2/users/profile', async () => {
    const instagramcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',instagramcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").fieldName).to.equal('Instagram Link')
  });
  
  it.only('Update instagram field with mandatory flag as false ,display field & display to others flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const instagramupdate1 = {
      "data": {
        "_id": instagram_id,
        "fieldName": "Instagram Link",
        "fieldNameLang": {
          "34": "Instagram Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 16,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 11,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
        "icon_name": "instagram",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : instagram_id},'put',instagramupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify instagram field with mandatory flag as false ,display field & display to others flag as true  : POST /api/v2/users/profile', async () => {
    const instagramcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',instagramcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").fieldName).to.equal('Instagram Link')
  });

  it.only('Update instagram field with display to others flag as false ,display field & mandatory flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const instagramupdate2 = {
      "data": {
        "_id": instagram_id,
        "fieldName": "Instagram Link",
        "fieldNameLang": {
          "34": "Instagram Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 16,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 11,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
        "icon_name": "instagram",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : instagram_id},'put',instagramupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify instagram field with display to others flag as false ,display field & mandatory flag as true  : POST /api/v2/users/profile', async () => {
    const instagramcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',instagramcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").fieldName).to.equal('Instagram Link')
  });

  it.only('Update instagram field with display to others,mandatory flag as false ,display field flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const instagramupdate3 = {
      "data": {
        "_id": instagram_id,
        "fieldName": "Instagram Link",
        "fieldNameLang": {
          "34": "Instagram Link"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 16,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 11,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
        "icon_name": "instagram",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : instagram_id},'put',instagramupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify instagram field with display to others,mandatory flag as false ,display field flag as true : POST /api/v2/users/profile', async () => {
    const instagramcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',instagramcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + instagram_id + "')]").fieldName).to.equal('Instagram Link')
  });

  it.only('Add a new field - Hobby with field type text, mandatory flag as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate = {
      "data": {
        "fieldName": "Hobby",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 1,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    hobbyid = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify new field - Hobby with field type text, mandatory flag as true : POST /api/v2/users/profile', async () => {
    const hobbycomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', hobbycomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")._id).to.equal(hobbyid)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldTypeId).to.equal(1)
  });

  it.only('Verify Hobby with field type text after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[0].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
    expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
  });

  it.only('Update Hobby field with mandtory,display to others,add field to user onboarding flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate1 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Hobby field with mandtory,display to others,add field to user onboarding flag as false : POST /api/v2/users/profile', async () => {
    const hobbycomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', hobbycomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('NO')
  });


  it.only('Verify Hobby with field type text after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[0].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
    expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
  });


  it.only('Update Hobby field with max length as 500 & all flags as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate2 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Hobby field with max length as 500 & all flags as true  : POST /api/v2/users/profile', async () => {
    const hobbycomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', hobbycomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").properties.is_number).to.equal(0)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").properties.length.max).to.equal(500)
  });


  it.only('Verify Hobby with max length as 500  after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[0].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
    expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
    expect(response.body.data.custom_fields[0].properties.length.max).to.equal(500)
  });

  it.only('Update Hobby field is_number flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate3 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Hobby field is_number flag as false : POST /api/v2/users/profile', async () => {
    const hobbycomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', hobbycomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").properties.is_number).to.equal(0)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").properties.length.max).to.equal(500)
  });


  it.only('Verify Hobby field is_number flag as false  after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[0].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
    expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
    expect(response.body.data.custom_fields[0].properties.is_number).to.equal(0)
  });

  it.only('Update Hobby field mandtory,display to others flag as false  & is_number as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate3 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Hobby field mandtory,display to others flag as false  & is_number as true: POST /api/v2/users/profile', async () => {
    const hobbycomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', hobbycomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").properties.is_number).to.equal(1)
  });


  it.only('Verify Hobby field is_number flag as true after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[0].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
    expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
    expect(response.body.data.custom_fields[0].properties.is_number).to.equal(1)
  });

  it.only('Update Hobby field show in filter and show in edit profile as true and other flags false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate3 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify hobby is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Hobby")
  });

  it.only('Update Hobby field show in filter true, other flags false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate3 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify hobby is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Hobby")
  });

  it.only('Update Hobby field show in filter as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const hobbyupdate3 = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          },
          "is_number": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid }, 'put', hobbyupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify hobby is not showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("Hobby")
  });

  //Painting field
  it.only('Add a new field - Painting with field type text area, mandatory flag as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const paintingupdate = {
      "data": {
        "fieldName": "Painting",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 200
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 2,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', paintingupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    paintingid = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify new field - Painting with field type text area, mandatory flag as true : POST /api/v2/users/profile', async () => {
    const paintingcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', paintingcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").fieldName).to.equal('Painting')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]")._id).to.equal(paintingid)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").fieldTypeId).to.equal(2)
  })

  it.only('Verify Painting with field type text area after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[1].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[1].fieldName).to.equal('Painting')
    expect(response.body.data.custom_fields[1].user_profile_field_type).to.equal(2)
  });

  it.only('Update Painting field with mandatory, display to others as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const paintingupdate1 = {
      "data": {
        "_id": paintingid,
        "fieldName": "Painting",
        "fieldNameLang": {
          "34": "Painting"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 200
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': paintingid }, 'put', paintingupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Painting field with mandatory, display to others as false : POST /api/v2/users/profile', async () => {
    const paintingcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', paintingcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Verify Painting with field type text area after Updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[1].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[1].fieldName).to.equal('Painting')
    expect(response.body.data.custom_fields[1].user_profile_field_type).to.equal(2)
  });

  it.only('Update Painting field with max length as 500,add field to user onboarding as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const paintingupdate2 = {
      "data": {
        "_id": paintingid,
        "fieldName": "Painting",
        "fieldNameLang": {
          "34": "Painting"
        },
        "user_profile_field_type": 2,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 500
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text Area"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': paintingid }, 'put', paintingupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Painting field with max length as 500,add field to user onboarding as false : POST /api/v2/users/profile', async () => {
    const paintingcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', paintingcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").isUseInOnoarding).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + paintingid + "')]").properties.length.max).to.equal(500)

  })


  it.only('Verify Painting with max length as 500 after Updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[1].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[1].fieldName).to.equal('Painting')
    expect(response.body.data.custom_fields[1].user_profile_field_type).to.equal(2)
    expect(response.body.data.custom_fields[1].properties.length.max).to.equal(500)
  });

  it.only('Add Group field with a text field & all flags as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addgroup = {
      "data": {
        "fieldName": "Group field",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 3
          },
          "fields": [
            {
              "id": 1,
              "fieldName": "Name",
              "fieldType": 1,
              "isRequired": "YES",
              "isDisabledField": "NO"
            }
          ],
          "field_type_name": "Person",
          "isShowAddButton": "YES",
          "button_label": "CLICK HERE TO ADD A NEW PERSON",
          "last_option_id": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 8,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "YES",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addgroup)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    groupidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify Group field with a text field & all flags as true : POST /api/v2/users/profile', async () => {
    const groupidcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").fieldTypeId).to.equal(8)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]")._id).to.equal(groupidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].fieldName).to.equal('Name')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].isRequired).to.equal('YES')
  })

  it.only('Verify group field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[2].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[2].fieldName).to.equal('Group field')
    expect(response.body.data.custom_fields[2].user_profile_field_type).to.equal(8)
  });

  it.only('Update Group field with text field :- Group text field & mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const addgroupupdate = {
      "data": {
        "_id": groupidadded,
        "fieldName": "Group field",
        "fieldNameLang": {
          "34": "Group field"
        },
        "user_profile_field_type": 8,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 3
          },
          "fields": [
            {
              "id": 1,
              "fieldName": "Group text field",
              "fieldType": 1,
              "isRequired": "YES",
              "isDisabledField": "NO",
              "fieldNameLang": {
                "34": "Group text field"
              }
            }
          ],
          "field_type_name": "Person",
          "isShowAddButton": "YES",
          "button_label": "CLICK HERE TO ADD A NEW PERSON",
          "last_option_id": 1,
          "field_type_nameLang": {
            "34": "Person"
          },
          "button_labelLang": {
            "34": "CLICK HERE TO ADD A NEW PERSON"
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Group"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': groupidadded }, 'put', addgroupupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify Group field with text field :- Group text field & mandatory flag as false : POST /api/v2/users/profile', async () => {
    const groupidcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].fieldName).to.equal('Group text field')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].isRequired).to.equal('YES')

  })

  it.only('Verify group field after updating text field in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[2].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[2].fieldName).to.equal('Group field')
    expect(response.body.data.custom_fields[2].user_profile_field_type).to.equal(8)
    expect(response.body.data.custom_fields[2].properties.fields[0].fieldName).to.equal('Group text field')
    expect(response.body.data.custom_fields[2].properties.fields[0].isRequired).to.equal('YES')
  });

  it.only('Update Group field with text field type as number & add field to onboarding as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const addgroupupdate1 = {
      "data": {
        "_id": groupidadded,
        "fieldName": "Group field",
        "fieldNameLang": {
          "34": "Group field"
        },
        "user_profile_field_type": 8,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 3
          },
          "fields": [
            {
              "id": 1,
              "fieldName": "Group text field",
              "fieldType": 10,
              "isRequired": "YES",
              "isDisabledField": "NO",
              "fieldNameLang": {
                "34": "Group text field"
              }
            }
          ],
          "field_type_name": "Person",
          "isShowAddButton": "YES",
          "button_label": "CLICK HERE TO ADD A NEW PERSON",
          "last_option_id": 1,
          "field_type_nameLang": {
            "34": "Person"
          },
          "button_labelLang": {
            "34": "CLICK HERE TO ADD A NEW PERSON"
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Group"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': groupidadded }, 'put', addgroupupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify Group field with text field type as number & add field to onboarding as false : POST /api/v2/users/profile', async () => {
    const groupidcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isUseInOnoarding).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].fieldName).to.equal('Group text field')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].fieldType).to.equal(10)

  })

  it.only('Update Group field with max length limit as 100 & all flag as true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const addgroupupdate3 = {
      "data": {
        "_id": groupidadded,
        "fieldName": "Group field",
        "fieldNameLang": {
          "34": "Group field"
        },
        "user_profile_field_type": 8,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 100
          },
          "fields": [
            {
              "id": 1,
              "fieldName": "Group text field",
              "fieldType": 10,
              "isRequired": "YES",
              "isDisabledField": "NO",
              "fieldNameLang": {
                "34": "Name"
              }
            }
          ],
          "field_type_name": "Person",
          "isShowAddButton": "YES",
          "button_label": "CLICK HERE TO ADD A NEW PERSON",
          "last_option_id": 1,
          "field_type_nameLang": {
            "34": "Person"
          },
          "button_labelLang": {
            "34": "CLICK HERE TO ADD A NEW PERSON"
          }
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "yes",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Group"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': groupidadded }, 'put', addgroupupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Group field with max length limit as 100 & all flag as true : POST /api/v2/users/profile', async () => {
    // this.retries(2)
    // console.log('retry')
    const groupidcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").properties.length.max).to.equal(100)

  })


  it.only('Verify group field after updating max limit as 100 in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[2].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[2].fieldName).to.equal('Group field')
    expect(response.body.data.custom_fields[2].user_profile_field_type).to.equal(8)
    expect(response.body.data.custom_fields[2].properties.length.max).to.equal(100)
  });

  it.only('Update Group field with field type as speaker :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const addgroupupdate3 = {
      "data": {
      "_id": groupidadded,
      "fieldName": "Group field",
      "fieldNameLang": {
        "34": "Group field"
      },
      "user_profile_field_type": 8,
      "user_profile_default_field_type": 0,
      "isDefault": "NO",
      "isDisabled": "NO",
      "isLinkable": "NO",
      "showIsRequired": "YES",
      "isRequired": "YES",
      "hasOptions": "NO",
      "options": [],
      "optionsLang": [],
      "selectedOptions": [],
      "user_profile_field_icons_id": 16,
      "properties": {
        "length": {
        "min": 1,
        "max": 100
        },
        "fields": [
        {
          "id": 1,
          "fieldName": "Group text field",
          "fieldType": 10,
          "isRequired": "YES",
          "isDisabledField": "NO",
          "fieldNameLang": {
          "34": "Group text field"
          }
        }
        ],
        "field_type_name": "Speaker",
        "isShowAddButton": "YES",
        "button_label": "CLICK HERE TO ADD A NEW PERSON",
        "last_option_id": 1,
        "field_type_nameLang": {
        "34": "Person"
        },
        "button_labelLang": {
        "34": "CLICK HERE TO ADD A NEW PERSON"
        }
      },
      "isDisabledOptions": "NO",
      "disabledOptionsMsg": "",
      "showIsShow": "YES",
      "isShow": "YES",
      "showIsShowToOthers": "YES",
      "isShowToOthers": "YES",
      "showIsUseInFilter": "NO",
      "isUseInFilter": "yes",
      "showIsUseInOnoarding": "YES",
      "isUseInOnoarding": "YES",
      "isRequiredInCommunity": "NO",
      "communityGroups": "All",
      "isAllCommunityGroups": "YES",
      "isUseInTicketing": "YES",
      "isRequiredInTicketing": "NO",
      "ticketingGroups": "All",
      "isAllTicketingGroups": "YES",
      "ticketsMappedWithGroups": "All",
      "isAllTicketsMappedWithGroups": "YES",
      "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
      "icon_name": "default",
      "isTicketFlowNonEditable": "NO",
      "showIsUseInTicketing": "YES",
      "isCommunityFlowNonEditable": "NO",
      "userFiledType": "Group"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': groupidadded }, 'put', addgroupupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify Group field with field type as speaker : POST /api/v2/users/profile', async  () => {
    // this.retries(2)
    // console.log('retry')
    const groupidcomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").properties.field_type_name).to.equal('Speaker')
  })

  it.only('Verify group field after updating with field type as speaker in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[2].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[2].fieldName).to.equal('Group field')
    expect(response.body.data.custom_fields[2].user_profile_field_type).to.equal(8)
    expect(response.body.data.custom_fields[2].properties.length.max).to.equal(100)
    expect(response.body.data.custom_fields[2].properties.field_type_name).to.equal('Speaker')
  });


  it.only('Add checkbox field with options A & B all flags as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addcheckbox = {
      "data": {
        "fieldName": "Checkbox field",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isUseInTicketing": "YES",
        "isRequiredInCommunity": "YES",
        "user_profile_field_type": 5,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addcheckbox)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    checkboxidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify checkbox field with options A & B all flags as true : POST /api/v2/users/profile', async () => {
    const checkboxidcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").fieldTypeId).to.equal(5)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]")._id).to.equal(checkboxidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").fieldName).to.equal('Checkbox field')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[0]).to.equal('A')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[1]).to.equal('B')
  })


  it.only('Verify checkbox field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[3].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox field')
    expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
  });
  

  it.only('Update checkbox field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate1 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox field",
        "fieldNameLang": {
          "34": "Checkbox field"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox field with mandatory flag as false : POST /api/v2/users/profile', async () => {
    const checkboxidcomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Verify checkbox field after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[3].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox field')
    expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
  });

  it.only('Update checkbox field with onboarding,show this profile flags as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate2 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox field",
        "fieldNameLang": {
          "34": "Checkbox field"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify checkbox field with onboarding,show this profile flags as false : POST /api/v2/users/profile', async  () => {
    const checkboxidcomm2 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm2)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('NO')
  })

  it.only('Update checkbox field with display this field as true & all flags as flase :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate3 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox field",
        "fieldNameLang": {
          "34": "Checkbox field"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate3)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox field with display this field as true & all flags as flase : POST /api/v2/users/profile', async () => {
    const checkboxidcomm3 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('NO')
  })

  it.only('Update checkbox field with options as true & false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate4 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox field",
        "fieldNameLang": {
          "34": "Checkbox field"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [
          "true",
          "false"
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "true"
          },
          {
            "id": 2,
            "name": "false"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate4)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox field with options as true & false : POST /api/v2/users/profile', async  () => {
    const checkboxidcomm4 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm4)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[0]).to.equal('true')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[1]).to.equal('false')
  })

  it.only('Verify checkbox field with all flags as true & NA as an optio dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[3].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox field')
    expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
    expect(response.body.data.custom_fields[3].options[0]).to.equal('true')
    expect(response.body.data.custom_fields[3].options[1]).to.equal('false')
  });


  it.only('Update checkbox field with all flags as true & NA as an option :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate5 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox field",
        "fieldNameLang": {
          "34": "Checkbox field"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [
          "true",
          "false",
          "NA"
      ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "true"
          },
          {
            "id": 2,
            "name": "false"
          },
          {
            "id": null,
            "name": "NA"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate5)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox field with all flags as true & NA as an option : POST /api/v2/users/profile', async  () => {
    const checkboxidcomm5 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm5)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[0]).to.equal('true')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[1]).to.equal('false')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").options[2]).to.equal('NA')
  })

  it.only('Verify checkbox field with all flags as true & NA as an optio dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[3].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox field')
    expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
    expect(response.body.data.custom_fields[3].options[0]).to.equal('true')
    expect(response.body.data.custom_fields[3].options[1]).to.equal('false')
    expect(response.body.data.custom_fields[3].options[2]).to.equal('NA')
  });

  
  it.only('Update checkbox field with name as checkbox only :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate7 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox only",
        "fieldNameLang": {
          "34": "Checkbox only"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate7)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox field with name as checkbox only : POST /api/v2/users/profile', async  () => {
    const checkboxidcomm7 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', checkboxidcomm7)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + checkboxidadded + "')]").fieldName).to.equal('Checkbox only')
  })

  it.only('Verify checkbox field after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[3].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox only')
    expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
  });

  it.only('Update checkbox field with showinfilter and display as true and others are false  :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate7 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox only",
        "fieldNameLang": {
          "34": "Checkbox only"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate7)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });

  it.only('Verify checkbox is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Checkbox only")
  });


  it.only('Update checkbox field with showinfilter as true and others are false  :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate7 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox only",
        "fieldNameLang": {
          "34": "Checkbox only"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate7)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });


  it.only('Verify checkbox is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Checkbox only")
  });

  it.only('Update checkbox field with showinfilter as false  :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const checkboxupdate7 = {
      "data": {
        "_id": checkboxidadded,
        "fieldName": "Checkbox only",
        "fieldNameLang": {
          "34": "Checkbox only"
        },
        "user_profile_field_type": 5,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "A",
          "B"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "A",
            "nameLang": {
              "34": "A"
            }
          },
          {
            "id": 2,
            "name": "B",
            "nameLang": {
              "34": "B"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Checkbox"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': checkboxidadded }, 'put', checkboxupdate7)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)

  });


  it.only('Verify checkbox is not showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("Checkbox only")
  });


  it.only('Add Link field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addlink =
    {
      "data": {
        "fieldName": "link test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 7,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addlink)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    linkidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify link field : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").fieldTypeId).to.equal(7)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]")._id).to.equal(linkidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").fieldName).to.equal('link test')
  })

  it.only('Verify link field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[4].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[4].fieldName).to.equal('link test')
  });

  it.only('Update link field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const Updatelink =
    {
      "data": {
        "_id": linkidadded,
        "fieldName": "link test",
        "fieldNameLang": {
          "34": "link test"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': linkidadded }, 'put', Updatelink)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify link field with mandatory flag as false : POST /api/v2/users/profile', async () => {
    const verifylinkflag =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkflag)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Verify link field after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[4].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[4].fieldName).to.equal('link test')
  });

  it.only('Update link field with onboarding,show this profile flags as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkonboardingoff =
    {
      "data": {
        "_id": linkidadded,
        "fieldName": "link test",
        "fieldNameLang": {
          "34": "link test"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': linkidadded }, 'put', linkonboardingoff)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify link onboarding,show this profile flags as false : POST /api/v2/users/profile', async () => {
    const verifylinkonboarding =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkonboarding)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isUseInOnoarding).to.equal('NO')
  })

  it.only('Update link field Display this field as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": linkidadded,
        "fieldName": "link test",
        "fieldNameLang": {
          "34": "link test"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': linkidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify link field Display this field as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
  })

  it.only('Update link field with the name link update:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const UpdateLinkName =
    {
      "data": {
        "_id": linkidadded,
        "fieldName": "link update",
        "fieldNameLang": {
          "34": "link update"
        },
        "user_profile_field_type": 7,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Link"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': linkidadded }, 'put', UpdateLinkName)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify link field after update name : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").fieldTypeId).to.equal(7)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]")._id).to.equal(linkidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + linkidadded + "')]").fieldName).to.equal('link update')
  })

  it.only('Verify link field after update name in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[4].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[4].fieldName).to.equal('link update')
  });
  
  it.only('Add File field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addfile =
    {
      "data": {
        "fieldName": "file test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "ShowIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "selectedOptions": [
          ""
        ],
        "showIsUseInFilter": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInCommunity": "YES",
        "user_profile_field_type": 11,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addfile)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    fileidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify file field : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").fieldTypeId).to.equal(11)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]")._id).to.equal(fileidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").fieldName).to.equal('file test')
  })

  it.only('Verify file field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[5].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[5].fieldName).to.equal('file test')
    expect(response.body.data.custom_fields[5].properties.max_file_size).to.equal('5')
    expect(response.body.data.custom_fields[5].properties.allowed_max_file_size).to.equal('5')
  });

  

  it.only('Update file field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const Updatefile =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file test",
        "fieldNameLang": {
          "34": "file test"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', Updatefile)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with mandatory flag as false : POST /api/v2/users/profile', async () => {
    const verifyfileflag =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifyfileflag)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Verify file field after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[5].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[5].fieldName).to.equal('file test')
    expect(response.body.data.custom_fields[5].properties.max_file_size).to.equal('5')
    expect(response.body.data.custom_fields[5].properties.allowed_max_file_size).to.equal('5')
  });

  it.only('Update file field with onboarding,show this profile flags as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const fileonboardingoff =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file test",
        "fieldNameLang": {
          "34": "file test"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', fileonboardingoff)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file onboarding,show this profile flags as false : POST /api/v2/users/profile', async () => {
    const verifylinkonboarding =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkonboarding)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isUseInOnoarding).to.equal('NO')
  })

  it.only('Update file field show to other as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file test",
        "fieldNameLang": {
          "34": "file test"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field show to other as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isUseInOnoarding).to.equal('YES')
  })


  it.only('Update file field is display as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file test",
        "fieldNameLang": {
          "34": "file test"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field is display as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
  })

  it.only('Update file field with name file update:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field after update name : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").fieldTypeId).to.equal(11)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").fieldName).to.equal('file update')
  })


  it.only('Verify file field after Updating name in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[5].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[5].fieldName).to.equal('file update')
    expect(response.body.data.custom_fields[5].properties.max_file_size).to.equal('5')
    expect(response.body.data.custom_fields[5].properties.allowed_max_file_size).to.equal('5')
  });


  it.only('Update file field with file type PDF as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": false
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with file type PDF as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(false)

  })


  it.only('Update file field with file type IMAGE as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": false
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file fieldwith file type IMAGE as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[1].value).to.equal(false)

  })

  it.only('Update file field with file type DOC as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": false
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with file type DOC as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[1].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[2].value).to.equal(false)

  })

  it.only('Update file field with file type PPT as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": false
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with file type PPt as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[1].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[2].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[3].value).to.equal(false)

  })

  it.only('Update file field with file type EXCEL as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": false
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with file type EXCEL as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[1].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[2].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[3].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[4].value).to.equal(false)

  })

  it.only('Update file field with file type for All as true:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": fileidadded,
        "fieldName": "file update",
        "fieldNameLang": {
          "34": "file update"
        },
        "user_profile_field_type": 11,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [
          ""
        ],
        "user_profile_field_icons_id": 16,
        "properties": {
          "max_file_size": "5",
          "allowed_max_file_size": "5",
          "file_types": [
            {
              "id": 1,
              "name": "PDF",
              "value": true
            },
            {
              "id": 2,
              "name": "IMAGE",
              "value": true
            },
            {
              "id": 3,
              "name": "DOC",
              "value": true
            },
            {
              "id": 6,
              "name": "PPT",
              "value": true
            },
            {
              "id": 7,
              "name": "EXCEL",
              "value": true
            }
          ]
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "YES",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "File"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': fileidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify file field with file type for All as true : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[0].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[1].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[2].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[3].value).to.equal(true)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + fileidadded + "')]").properties.file_types[4].value).to.equal(true)

  })

  it.only('Add Date field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const add_date =
    {
      "data": {
        "fieldName": "Test Date",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 3,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', add_date)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    dateidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify date field : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldTypeId).to.equal(3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldName).to.equal('Test Date')
  })


  it.only('Verify Date field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[6].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[6].fieldName).to.equal('Test Date')
  });

  it.only('Update date field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const Updatelink =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Test Date",
        "fieldNameLang": {
          "34": "Test Date"
        },
        "user_profile_field_type": 3,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Date"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', Updatelink)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify date field with mandatory flag as false : POST /api/v2/users/profile', async () => {
    const verifylinkflag =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkflag)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
  })

   it.only('Verify Date field after updating in profile fields mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[6].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[6].fieldName).to.equal('Test Date')
  });

  it.only('Update date field with onboarding,show this profile flags as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkonboardingoff =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Test Date",
        "fieldNameLang": {
          "34": "Test Date"
        },
        "user_profile_field_type": 3,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Date"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', linkonboardingoff)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  
  it.only('Verify date onboarding,show this profile flags as false : POST /api/v2/users/profile', async () => {
    const verifylinkonboarding =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkonboarding)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('NO')
  })


  it.only('Update date field show to other as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Test Date",
        "fieldNameLang": {
          "34": "Test Date"
        },
        "user_profile_field_type": 3,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Date"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify date field show to other as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
  })


  it.only('Update date field is display as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Test Date",
        "fieldNameLang": {
          "34": "Test Date"
        },
        "user_profile_field_type": 3,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Date"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });


  it.only('Verify date field is display as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
  })

  it.only('Update date field with name date update:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Test Date Update",
        "fieldNameLang": {
          "34": "Test Date Update"
        },
        "user_profile_field_type": 3,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Date"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify date field after update name : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldTypeId).to.equal(3)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldName).to.equal('Test Date Update')
  })

  it.only('Verify Date field after Updating its name in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[6].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[6].fieldName).to.equal('Test Date Update')
  });

  it.only('Add Radio field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const add_radio =
    {
      "data": {
        "fieldName": "Radio Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isUseInTicketing": "YES",
        "user_profile_field_type": 6,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', add_radio)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    dateidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify Radio field : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldTypeId).to.equal(6)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldName).to.equal('Radio Test')
  })

  it.only('Verify Radio with mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[7].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[7].fieldName).to.equal('Radio Test')
    expect(response.body.data.custom_fields[7].options[0]).to.equal('Test 1')
    expect(response.body.data.custom_fields[7].options[1]).to.equal('Test 2')
  });

  it.only('Update Radio field with mandatory flag as false :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const Updatelink =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Radio Test",
        "fieldNameLang": {
          "34": "Radio Test"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "Test 1",
          "Test 2"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Test 1",
            "nameLang": {
              "34": "Test 1"
            }
          },
          {
            "id": 2,
            "name": "Test 2",
            "nameLang": {
              "34": "Test 2"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', Updatelink)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Radio field with mandatory flag as false : POST /api/v2/users/profile', async () => {
    const verifylinkflag =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkflag)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
  })


  it.only('Verify Radio with mandatory as false dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[7].isRequired).to.equal('NO')
    expect(response.body.data.custom_fields[7].fieldName).to.equal('Radio Test')
    expect(response.body.data.custom_fields[7].options[0]).to.equal('Test 1')
    expect(response.body.data.custom_fields[7].options[1]).to.equal('Test 2')
  });

  it.only('Update Radio field with onboarding,show this profile flags as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const linkonboardingoff =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Radio Test",
        "fieldNameLang": {
          "34": "Radio Test"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "Test 1",
          "Test 2"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Test 1",
            "nameLang": {
              "34": "Test 1"
            }
          },
          {
            "id": 2,
            "name": "Test 2",
            "nameLang": {
              "34": "Test 2"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', linkonboardingoff)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Radio onboarding,show this profile flags as false : POST /api/v2/users/profile', async () => {
    const verifylinkonboarding =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifylinkonboarding)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('NO')
  })

  
  it.only('Update Radio field show to other as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Radio Test",
        "fieldNameLang": {
          "34": "Radio Test"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "Test 1",
          "Test 2"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Test 1",
            "nameLang": {
              "34": "Test 1"
            }
          },
          {
            "id": 2,
            "name": "Test 2",
            "nameLang": {
              "34": "Test 2"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Radio field show to other as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('NO')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Update Radio field is display as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Radio Test",
        "fieldNameLang": {
          "34": "Radio Test"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "Test 1",
          "Test 2"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Test 1",
            "nameLang": {
              "34": "Test 1"
            }
          },
          {
            "id": 2,
            "name": "Test 2",
            "nameLang": {
              "34": "Test 2"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Radio field is display as false : POST /api/v2/users/profile', async ()=> {
    const verifydisplayfield =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', verifydisplayfield)
  })


  it.only('Update Radio field with name date update:- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const updatedisplayfield =
    {
      "data": {
        "_id": dateidadded,
        "fieldName": "Radio Test Update",
        "fieldNameLang": {
          "34": "Radio Test Update"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "Test 1",
          "Test 2"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Test 1",
            "nameLang": {
              "34": "Test 1"
            }
          },
          {
            "id": 2,
            "name": "Test 2",
            "nameLang": {
              "34": "Test 2"
            }
          }
        ],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test 1"
          },
          {
            "id": 2,
            "name": "Test 2"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify Radio field after update name : POST /api/v2/users/profile', async () => {
    const linkcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isShowToOthers).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldTypeId).to.equal(6)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + dateidadded + "')]").fieldName).to.equal('Radio Test Update')
  })


  it.only('Verify Radio with after updating its name on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[7].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[7].fieldName).to.equal('Radio Test Update')
    expect(response.body.data.custom_fields[7].options[0]).to.equal('Test 1')
    expect(response.body.data.custom_fields[7].options[1]).to.equal('Test 2')
  });
  

  it.only('Update Radio field with option length upto 40 character length:- PUT /backend/api/v2/events/settings/userprofile', async () => {
 
    var option1 = 'ThisisTest'.repeat(4)
    var option2 = 'Thisis1234'.repeat(4)
    const updatedisplayfield =
    {
      "data": {
        "fieldName": "Radio Test Update",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": option1
          },
          {
            "id": 2,
            "name": option2
          }
        ],
        "user_profile_default_field_type": 0,
        "user_profile_field_type": 6,
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });


  it.only('Verify Radio with after updating its option on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion}, 'get')
    expect(response.body.data.custom_fields[7].isRequired).to.equal('YES')
    expect(response.body.data.custom_fields[7].fieldName).to.equal('Radio Test Update')
    expect(response.body.data.custom_fields[7].options[0]).to.equal('ThisisTestThisisTestThisisTestThisisTest')
    expect(response.body.data.custom_fields[7].options[1]).to.equal('Thisis1234Thisis1234Thisis1234Thisis1234')
  });
  
  it.only('Update Radio field with display and showinfilter as true and others as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
 
    var option1 = 'ThisisTest'.repeat(4)
    var option2 = 'Thisis1234'.repeat(4)
    const updatedisplayfield =
    {
      "data": {
        "fieldName": "Radio Test Update",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": option1
          },
          {
            "id": 2,
            "name": option2
          }
        ],
        "user_profile_default_field_type": 0,
        "user_profile_field_type": 6,
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });



  it.only('Verify radio field is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Radio Test Update")
  });

  it.only('Update Radio field with showinfilter as true and others as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
 
    var option1 = 'ThisisTest'.repeat(4)
    var option2 = 'Thisis1234'.repeat(4)
    const updatedisplayfield =
    {
      "data": {
        "fieldName": "Radio Test Update",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": option1
          },
          {
            "id": 2,
            "name": option2
          }
        ],
        "user_profile_default_field_type": 0,
        "user_profile_field_type": 6,
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify radio field is showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Radio Test Update")
  });

  it.only('Update Radio field with showinfilter as false:- PUT /backend/api/v2/events/settings/userprofile', async () => {
 
    var option1 = 'ThisisTest'.repeat(4)
    var option2 = 'Thisis1234'.repeat(4)
    const updatedisplayfield =
    {
      "data": {
        "fieldName": "Radio Test Update",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": option1
          },
          {
            "id": 2,
            "name": option2
          }
        ],
        "user_profile_default_field_type": 0,
        "user_profile_field_type": 6,
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': dateidadded }, 'put', updatedisplayfield)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify radio field is not showing up in attendees filter : POST /api/v2/attendee', async () => {
    const countrycomm1 =
    {
      "payload": {
        "data": {
          "language": 0,
          "page": 0,
          "limit": 18,
          "sort": 0,
          "input": "",
          "filter": "0,0,0",
          "isShowLoggedinUser": "NO",
          "industryIds": "",
          "intrestIds": "",
          "attendeeIds": [
            ""
          ],
          "wantOnlineAttendee": "NO",
          "designation": "",
          "organisationName": "",
          "country": "",
          "state": "",
          "city": "",
          "userProfileFields": {},
          "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
    expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("Radio Test Update")
  });
  
  

  //<-- Profile field toggle functionality cases-->

  

  it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
    const virtual11 = {
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
            {
              "img_file_name": ""
            }
          ],
          "location": "afghnaistan adddres",
          "multiple_file": [],
          "name": "TestBoothProfile",
          "phone": "9988776666",
          "phone_code": "+93",
          "position": 1,
          "profile_img": "",
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
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'Content-Type': 'application/json'},'post',virtual11)
    global.virtualboothid = (response.body.data.ids.exhibitor_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  });

  it.only('Add new group : POST /backend/api/v2/events/groups', async () => {
    var headers = organizerUserHeader()
    headers['eventId'] = process.env.eventid
    headers['buildversion'] = process.env.buildversion
    const newgroup =
    {
      "data": {
        "name": "Test Group",
        "group_id": attendeegroup 
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups', headers, 'post', newgroup)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_add_message)  
    created_group_id = (response.body.data.group_id)
  })

  //<-- Check all toggle combinations with functionality-->

  var listOfCombinations = [
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "NO",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "NO",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "NO",
      "ShowInEditProfile": "YES"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "NO"
    },
    {
      "ShowInOnBoarding": "YES",
      "ShowInProfileToOthers": "YES",
      "ShowInAttendeeFilter": "YES",
      "ShowInEditProfile": "YES"
    }
  ]



  listOfCombinations.forEach((combination,i)=>{
    it.only('Update country field Show In OnBoarding - ' + combination.ShowInOnBoarding + ', Show In EditProfile - ' + combination.ShowInEditProfile + ', Show In Profile To Others - ' + combination.ShowInProfileToOthers + ', Show Is Use In Filter - ' + combination.ShowInAttendeeFilter + ' with group filter attendee :- PUT /backend/api/v2/events/settings/userprofile', async () => {
      console.log(combination)
      const countryupdate = {
        "data": {
          "_id": country_id,
          "fieldName": "Country",
          "fieldNameLang": {
            "34": "Country"
          },
          "user_profile_field_type": 4,
          "user_profile_default_field_type": 9,
          "isDefault": "YES",
          "isDisabled": "NO",
          "isLinkable": "NO",
          "showIsRequired": "YES",
          "isRequired": "NO",
          "hasOptions": "YES",
          "options": [],
          "selectedOptions": [],
          "properties": [],
          "isDisabledOptions": "YES",
          "disabledOptionsMsg": "List of all the countries will be displayed",
          "showIsShow": "YES",
          "isShow": combination.ShowInEditProfile,
          "showIsShowToOthers": "YES",
          "isShowToOthers": combination.ShowInProfileToOthers,
          "showIsUseInFilter": "YES",
          "isUseInFilter": combination.ShowInAttendeeFilter,
          "showIsUseInOnoarding": "NO",
          "isUseInOnoarding": combination.ShowInOnBoarding,
          "user_profile_field_icons_id": 5,
          "isRequiredInCommunity": "YES",
          "communityGroups": [{"name":"Test Group", "_id": created_group_id}],
          "isAllCommunityGroups": "NO",
          "isUseInTicketing": "NO",
          "isRequiredInTicketing": "NO",
          "ticketingGroups": [],
          "isAllTicketingGroups": "NO",
          "ticketsMappedWithGroups": [],
          "isAllTicketsMappedWithGroups": "NO",
          "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z\" fill=\"black\"/>\n   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96484 12 3.5508C10.1263 5.96484 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z\" fill=\"black\"/>\n   </svg>",
          "icon_name": "country",
          "isTicketFlowNonEditable": "NO",
          "showIsUseInTicketing": "YES",
          "isCommunityFlowNonEditable": "NO",
          "userFiledType": "Dropdown",
          "optionsLang": []
        }
      }
      var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : country_id},'put',countryupdate)
      expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify country field Show In OnBoarding - ' + combination.ShowInOnBoarding + ', Show In EditProfile - ' + combination.ShowInEditProfile + ', Show In Profile To Others - ' + combination.ShowInProfileToOthers + ', Show Is Use In Filter - ' + combination.ShowInAttendeeFilter + ' with group filter attendee :- GET /backend/api/v2/events/settings/userprofile', async () => {
      var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
      var countryObject = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@._id=='" + country_id + "')]")
      expect(countryObject.fieldName).to.equal('Country')
      expect(countryObject.isShow).to.equal(combination.ShowInEditProfile, 'Show in edit profile check')
      expect(countryObject.isShowToOthers).to.equal(combination.ShowInProfileToOthers, 'Show in profile to others')
      expect(countryObject.isUseInFilter).to.equal(combination.ShowInAttendeeFilter, 'Show in attendee filter')
      expect(countryObject.isUseInOnoarding).to.equal(combination.ShowInOnBoarding, 'Show in onboarding')
    });


    it.only('Add a single people for new Test Group with mandatory parameters: POST /backend/api/v2/people/single', async () => {
      var people = new People();
      console.log('newProfileFieldToggleCombinationcheck' + i + '@yopmail.com')
      var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newProfileFieldToggleCombinationcheck' + i + '@yopmail.com', 'OnboardingUser', 'TestGroup4', [created_group_id])
      global.peopleIdForCombinationCheck = peopleId
      peopleList.push(peopleId)
    })
  
    it.only('Login with otp for new user (newProfileFieldToggleCombinationcheck' + i + '@yopmail.com) : POST /api/v2/users/login', async () =>{
      var signup = new ComunitySignupLogin();
      global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
      global.accesstokenCombinationCheckUser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newProfileFieldToggleCombinationcheck' + i + '@yopmail.com', '1234')
    })
  
    it.only('Verify profile field is showing up for new user onboarding - ' + combination.ShowInOnBoarding + ' : POST /api/v2/users/profile', async () =>{
      const payload = {"payload":{"data":{"isOnboarding":true}}}
      var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenCombinationCheckUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
      if(combination.ShowInOnBoarding == 'YES'){
        expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]"),'Onboarding profile object should exist').to.not.be.undefined
        expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").fieldName).to.equal('Country')
        expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").isUseInOnoarding).to.equal('YES')
      }
      else{
        expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]"),'Onboarding profile object should not exist').to.be.undefined
      }
    })

    it.only('Verify profile field is showing up for attendee on editProfile - ' + combination.ShowInEditProfile + ' : POST /api/v2/users/profile', async () =>{
        const payload = {"payload":{"data":null}}
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenCombinationCheckUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
        if(combination.ShowInEditProfile == 'YES'){
          expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]"), 'EditProfile profile object should exist').to.not.be.undefined
          expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]").fieldName).to.equal('Country')
        }
        else{
          expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + country_id + "')]"),'EditProfile profile object should not exist').to.be.undefined
        }
    })

    it.only('Verify profile field is showing up for Testgroup user on other users profile view - ' + combination.ShowInProfileToOthers + ' : POST /api/v2/attendee/<userId>/view', async () =>{
        const payload = {"payload":{}}
        var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.peopleIdForCombinationCheck + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
        if(combination.ShowInProfileToOthers == 'YES'){
          expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + country_id + "')]"),'Show other profile object should exist').to.not.be.undefined
          expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + country_id + "')]").fieldName).to.equal('Country')
        }
        else{
          expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + country_id + "')]"),'Show other profile object should not exist').to.be.undefined
        }
    })

    it.only('Verify country is showing up in attendees filter - ' + combination.ShowInAttendeeFilter + ' : POST /api/v2/attendee', async () => {
      const countrycomm1 =
      {
        "payload": {
          "data": {
            "language": 0,
            "page": 0,
            "limit": 18,
            "sort": 0,
            "input": "",
            "filter": "0,0,0",
            "isShowLoggedinUser": "NO",
            "industryIds": "",
            "intrestIds": "",
            "attendeeIds": [
              ""
            ],
            "wantOnlineAttendee": "NO",
            "designation": "",
            "organisationName": "",
            "country": "",
            "state": "",
            "city": "",
            "userProfileFields": {},
            "sidebarId": ("" + attendeegroup + "," + speakergroup + "," + boothmembergroup)
          }
        }
      }
      var response = await sendRequest(environment.baseURL3,'/api/v2/attendee',{'Authorization' : global.accesstokenCombinationCheckUser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',countrycomm1)
      if(combination.ShowInAttendeeFilter == 'YES'){
        expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.include("Country",'Field should exist in attendee filter fields list')
      }
      else{
        expect(response.body.success.data.filterFields.map(filterField => filterField.fieldName)).to.not.include("Country",'Field should not exist in attendee filter fields list')
      }
    });


  })

  //<-- Settings Profilefield -> groups filter with onboarding for default field gender -->


  it.only('Update the gender field, enable use in onboarding and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee@yopmail.com', 'OnboardingUser', 'Attendee', 'Test@1234')
    global.accessTokenEditProfileAttendee = global.accesstokenonboarduser
  });

  it.only('Verify profile field is showing up for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker@yopmail.com', 'OnboardingUser', 'Speaker', [speakergroup])
    global.speakerId = peopleId
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker@yopmail.com', '1234')
    global.accessTokenEditProfileSpeaker = global.accesstokenonboarduser
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember@yopmail.com', 'OnboardingUser', 'boothmember', [boothmembergroup])
    global.boothMemberId = peopleId
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember@yopmail.com', '1234')
    global.accessTokenEditProfileBoothmember = global.accesstokenonboarduser
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single people for new Test Group with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardTestGroupUser@yopmail.com', 'OnboardingUser', 'TestGroup', [created_group_id])
    global.testGroupUserId = peopleId
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for new user (newOnboardTestGroupUser@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardTestGroupUser@yopmail.com', '1234')
    global.accessTokenEditProfileTestGroupUser = global.accesstokenonboarduser
  })

  it.only('Verify profile field is not showing up for new user onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable use in onboarding and use speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee1@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee1@yopmail.com', 'OnboardingUser', 'Attendee1', 'Test@1234')
  });

  it.only('Verify profile field is not visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker1@yopmail.com', 'OnboardingUser', 'Speaker1', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker1@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker1@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember1@yopmail.com', 'OnboardingUser', 'boothmember1', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember1@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember1@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable use in onboarding and use boothmember group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Booth Member", "_id": boothmembergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee2@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee2@yopmail.com', 'OnboardingUser', 'Attendee2', 'Test@1234')
  });

  it.only('Verify profile field is not visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker2@yopmail.com', 'OnboardingUser', 'Speaker2', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker2@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker2@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember2@yopmail.com', 'OnboardingUser', 'boothmember2', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember2@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember2@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Update the gender field, enable use in onboarding and use speaker group and attendee group as filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1, 
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee3@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee3@yopmail.com', 'OnboardingUser', 'Attendee3', 'Test@1234')
  });

  it.only('Verify profile field is visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker3@yopmail.com', 'OnboardingUser', 'Speaker3', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker3@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker3@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember3@yopmail.com', 'OnboardingUser', 'boothmember3', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember3@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember3@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable use in onboarding and use Test Group as filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Test Group", "_id": created_group_id}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee4@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee4@yopmail.com', 'OnboardingUser', 'Attendee4', 'Test@1234')
  });

  it.only('Verify profile field is not showing up for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker4@yopmail.com', 'OnboardingUser', 'Speaker4', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker4@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker4@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember4@yopmail.com', 'OnboardingUser', 'boothmember4', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardboothmember@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember4@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Add a single people for new Test Group with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardTestGroupUser2@yopmail.com', 'OnboardingUser', 'TestGroup2', [created_group_id])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for new user (newOnboardTestGroupUser2@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardTestGroupUser2@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new user onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").isUseInOnoarding).to.equal('YES')
  })


  //===========================================================================================================================================================================================================================================================

  //<-- Settings Profilefield -> groups filter with onboarding for custom field hobby -->

  it.only('Update the hobby field, enable use in onboarding and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee5@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee5@yopmail.com', 'OnboardingUser', 'Attendee5', 'Test@1234')
  });

  it.only('Verify profile field is showing up for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker5@yopmail.com', 'OnboardingUser', 'Speaker5', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker5@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker5@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember5@yopmail.com', 'OnboardingUser', 'boothmember5', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardboothmember5@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember5@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single people for new TestGroup with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardTestGroupUser3@yopmail.com', 'OnboardingUser', 'TestGroup3', [created_group_id])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for new user (newOnboardTestGroupUser3@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardTestGroupUser3@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new user onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable use in onboarding and use speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Speaker", "_id": speakergroup}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee6@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee6@yopmail.com', 'OnboardingUser', 'Attendee6', 'Test@1234')
  });

  it.only('Verify profile field is not visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker6@yopmail.com', 'OnboardingUser', 'Speaker6', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker6@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker6@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember6@yopmail.com', 'OnboardingUser', 'boothmember6', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember1@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember6@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable use in onboarding and use booth member group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			{"name":"Booth Member", "_id": boothmembergroup}
		],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee7@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee7@yopmail.com', 'OnboardingUser', 'Attendee7', 'Test@1234')
  });

  it.only('Verify profile field is not visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker7@yopmail.com', 'OnboardingUser', 'Speaker7', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker7@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker7@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember7@yopmail.com', 'OnboardingUser', 'boothmember7', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember7@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember7@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Update the hobby field, enable use in onboarding and use Attendee group and speaker as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee8@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee8@yopmail.com', 'OnboardingUser', 'Attendee8', 'Test@1234')
  });

  it.only('Verify profile field is visible for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker8@yopmail.com', 'OnboardingUser', 'Speaker8', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker8@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker8@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember8@yopmail.com', 'OnboardingUser', 'boothmember8', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for boothmember (newOnboardboothmember8@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember8@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable use in onboarding and use new Test Group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "NO",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Test Group", "_id": created_group_id}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Signup a new user (newOnBoardingAttendee9@yopmail.com) : POST api/v2/users/signup', async () => {
    var signup = new ComunitySignupLogin();
    global.accesstokenonboarduser = await signup.signupAndVerify(global.accessTokenLoginPage, 'newOnBoardingAttendee9@yopmail.com', 'OnboardingUser', 'Attendee9', 'Test@1234')
  });

  it.only('Verify profile field is not showing up for new attendee on onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker9@yopmail.com', 'OnboardingUser', 'Speaker9', [speakergroup])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardSpeaker9@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker9@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new speaker onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People('boothmember', global.virtualboothid);
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember9@yopmail.com', 'OnboardingUser', 'boothmember9', [boothmembergroup])
    peopleList.push(peopleId)
  });

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for speaker (newOnboardboothmember9@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardboothmember9@yopmail.com', '1234')
  })

  it.only('Verify profile field is not showing up for new boothmember onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Add a single people for new Test Group with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardTestGroupUser4@yopmail.com', 'OnboardingUser', 'TestGroup4', [created_group_id])
    peopleList.push(peopleId)
  })

  it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  });

  it.only('Login with otp for new user (newOnboardTestGroupUser4@yopmail.com) : POST /api/v2/users/login', async () =>{
    var signup = new ComunitySignupLogin();
        global.accesstokenonboarduser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardTestGroupUser4@yopmail.com', '1234')
  })

  it.only('Verify profile field is showing up for new user onboarding : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":{"isOnboarding":true}}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accesstokenonboarduser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").isUseInOnoarding).to.equal('YES')
  })

  //<-- Settings Profilefield -> groups filter with editProfile for default field gender -->

  it.only('Update the gender field, enable show in editProfile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for Testgroup user on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileTestGroupUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable show in edit profile and use speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable show in edit profile and use boothmember group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Booth Member", "_id": boothmembergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Update the gender field, enable show in edit profile and use speaker group and attendee group as filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1, 
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable show in edit profile and use Test Group as filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Test Group", "_id": created_group_id}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for Testgroup user on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileTestGroupUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  
  
  //<-- Settings Profilefield -> groups filter with editProfile for custom field hobby -->

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for test group on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileTestGroupUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable show in editProfile and use speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Speaker", "_id": speakergroup}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable show in editProfile and use booth member group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			{"name":"Booth Member", "_id": boothmembergroup}
		],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
    
  })

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Update the hobby field, enable show in editprofile and use Attendee group and speaker as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for boothmember on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable use in onboarding and use new Test Group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "NO",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
			    {"name":"Test Group", "_id": created_group_id}
		    ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileSpeaker, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for attendee on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileBoothmember, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for test group on editProfile : POST /api/v2/users/profile', async () =>{
    const payload = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': global.accessTokenEditProfileTestGroupUser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })


  //Adding show to others with group filter cases

  it.only('Update the gender field, enable show to others and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable show to others and use speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })


  it.only('Update the gender field, enable show to others and use boothmember group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Booth Member", "_id": boothmembergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Update the gender field, enable show to others and use attendee and speaker group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Update the gender field, enable show to others and use test group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": [
          {"name":"Test Group", "_id": created_group_id}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.be.undefined
  })

  it.only('Verify profile field is  showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Update the gender field, enable show to others and use group filter all : PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const genderupdate = {
      "data": {
        "_id": gender_id,
        "fieldName": "Gender",
        "fieldNameLang": {
          "34": "Gender"
        },
        "user_profile_field_type": 6,
        "user_profile_default_field_type": 5,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "properties": [],
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "optionsLang": [
          {
            "id": 1,
            "name": "Male",
            "nameLang": {
              "34": "Male"
            }
          },
          {
            "id": 2,
            "name": "Female",
            "nameLang": {
              "34": "Female"
            }
          },
          {
            "id": 3,
            "name": "Other",
            "nameLang": {
              "34": "Other"
            }
          }
        ],
        "selectedOptions": [],
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "NO",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Male"
          },
          {
            "id": 2,
            "name": "Female"
          },
          {
            "id": 3,
            "name": "Other"
          }
        ],
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Radio"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : gender_id}, 'put', genderupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })

  it.only('Verify profile field is showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + gender_id + "')]").fieldName).to.equal('Gender')
  })





  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Booth Member", "_id": boothmembergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Attendee", "_id": attendeegroup},
          {"name":"Speaker", "_id": speakergroup}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": [
          {"name":"Test Group", "_id": created_group_id}
        ],
        "isAllCommunityGroups": "NO",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is not showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is not showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.be.undefined
  })

  it.only('Verify profile field is  showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Update the hobby field, enable show in edit profile and use Attendee group as group filter: PUT /backend/api/v2/events/settings/userprofile', async ()=>  {
    const hobbyupdate = {
      "data": {
        "_id": hobbyid,
        "fieldName": "Hobby",
        "fieldNameLang": {
          "34": "Hobby"
        },
        "user_profile_field_type": 1,
        "user_profile_default_field_type": 0,
        "isDefault": "NO",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "NO",
        "options": [],
        "optionsLang": [],
        "selectedOptions": [],
        "user_profile_field_icons_id": 16,
        "properties": {
          "length": {
            "min": 1,
            "max": 50
          },
          "is_number": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "YES",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": "All",
        "isAllTicketingGroups": "YES",
        "ticketsMappedWithGroups": "All",
        "isAllTicketsMappedWithGroups": "YES",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Text"
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid' : hobbyid}, 'put', hobbyupdate)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify profile field is showing up for attendee on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + process.env.clown26userid + '/view', { 'Authorization': global.accessTokenEditProfileAttendee, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is showing up for speaker on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.speakerId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is showing up for boothmember on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.boothMemberId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('Verify profile field is showing up for Testgroup user on other users profile view : POST /api/v2/attendee/<userId>/view', async () =>{
    const payload = {"payload":{}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/attendee/' + global.testGroupUserId + '/view', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json'}, 'post', payload)
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]")).to.not.be.undefined
    expect(getValueFromJsonObject(response.body,"$.success.data.userInfo.userProfileFields[?(@._id=='" + hobbyid + "')]").fieldName).to.equal('Hobby')
  })

  it.only('delete all added users', async() => {
    var people = new People();
    people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, peopleList)
  })

   //SWAT Test Cases

  it.only('Add Radio field in profile field with same values in option :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const add_radio =
    {
      "data": {
        "fieldName": "Radio Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test1"
          },
          {
            "id": 2,
            "name": "Test1"
          }
        ],
        "isUseInTicketing": "YES",
        "user_profile_field_type": 6,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', add_radio)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // dateidadded = (response.body.data.ids.field_id.$oid)
  });

  
  it.only('Add checkbox field with same values in option :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addcheckbox = {
      "data": {
        "fieldName": "Checkbox field",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "A"
          }
        ],
        "isUseInTicketing": "YES",
        "isRequiredInCommunity": "YES",
        "user_profile_field_type": 5,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addcheckbox)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // checkboxidadded = (response.body.data.ids.field_id.$oid)
  });


  it.only('Add dropdown field with same values in option :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const adddropdown = {
      "data": {
        "fieldName": "Dropdown Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": [],
        "properties": {
          "include_blank": 0,
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test1"
          },
          {
            "id": 2,
            "name": "Test1"
          }
        ],
        "isUseInTicketing": "YES",
        "user_profile_field_type": 4,
        "isOnboardingEditingRestricted": "NO",
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', adddropdown)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // checkboxidadded = (response.body.data.ids.field_id.$oid)
  });


  it.only('Add Radio field in profile field to check with multiple default values :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const add_radio =
    {
      "data": {
        "fieldName": "Radio Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": ["Test1option","Test2option"],
        "properties": {
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test1option"
          },
          {
            "id": 2,
            "name": "Test2option"
          }
        ],
        "isUseInTicketing": "YES",
        "user_profile_field_type": 6,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', add_radio)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // dateidadded = (response.body.data.ids.field_id.$oid)
  });

  
  it.only('Add checkbox field to check with multiple default values :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addcheckbox = {
      "data": {
        "fieldName": "Checkbox field",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": ["A","B"],
        "properties": {
          "include_other_option": 1
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ],
        "isUseInTicketing": "YES",
        "isRequiredInCommunity": "YES",
        "user_profile_field_type": 5,
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addcheckbox)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // checkboxidadded = (response.body.data.ids.field_id.$oid)
  });


  it.only('Add dropdown field to check with multiple default values :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const adddropdown = {
      "data": {
        "fieldName": "Dropdown Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [
          "",
          ""
        ],
        "selectedOptions": ["Test1","Test2"],
        "properties": {
          "include_blank": 0,
          "include_other_option": 0
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "YES",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "optionsForFrontend": [
          {
            "id": 1,
            "name": "Test1"
          },
          {
            "id": 2,
            "name": "Test2"
          }
        ],
        "isUseInTicketing": "YES",
        "user_profile_field_type": 4,
        "isOnboardingEditingRestricted": "NO",
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "NO",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', adddropdown)
    // expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    // checkboxidadded = (response.body.data.ids.field_id.$oid)
  });


  it.only('Update state field with display this field in onboarding form as YES :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });


  it.only('Verify state field with  display this field in onboarding form as YES: POST /api/v2/users/profile', async () => {
    const statecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',statecomm1)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isUseInOnoarding).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isShow).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").fieldName).to.equal('State')
  });

  it.only('Update state field with display this field in onboarding form as NO :- PUT /backend/api/v2/events/settings/userprofile', async () => {
    const stateupdate1 = {
      "data": {
        "_id": state_id,
        "fieldName": "State",
        "fieldNameLang": {
          "34": "State"
        },
        "user_profile_field_type": 4,
        "user_profile_default_field_type": 10,
        "isDefault": "YES",
        "isDisabled": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isRequired": "NO",
        "hasOptions": "YES",
        "options": [],
        "selectedOptions": [],
        "properties": [],
        "isDisabledOptions": "YES",
        "disabledOptionsMsg": "List of 'State options' will be displayed based on 'Country' chosen. If the 'Country' field is hidden, the state field will also be hidden.",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "YES",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "NO",
        "user_profile_field_icons_id": 16,
        "isRequiredInCommunity": "NO",
        "communityGroups": "All",
        "isAllCommunityGroups": "YES",
        "isUseInTicketing": "NO",
        "isRequiredInTicketing": "NO",
        "ticketingGroups": [],
        "isAllTicketingGroups": "NO",
        "ticketsMappedWithGroups": [],
        "isAllTicketsMappedWithGroups": "NO",
        "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
        "icon_name": "default",
        "isTicketFlowNonEditable": "NO",
        "showIsUseInTicketing": "YES",
        "isCommunityFlowNonEditable": "NO",
        "userFiledType": "Dropdown",
        "optionsLang": []
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : state_id},'put',stateupdate1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
  });

  it.only('Verify state field with  display this field in onboarding form as YES: POST /api/v2/users/profile', async () => {
    const statecomm1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',statecomm1)
    // expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").isUseInOnoarding).to.equal('YES')
    // expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + state_id + "')]").fieldName).to.equal('State')
  });


  it.only('Add Group field with a text field and Email filed :- POST /backend/api/v2/events/settings/userprofile', async () => {
    const addgroup = {
      "data": {
        "fieldName": "Group Test",
        "isDefault": "NO",
        "isDisabled": "NO",
        "isDisabledField": "NO",
        "isLinkable": "NO",
        "showIsRequired": "YES",
        "isDisplayInDashboard": "YES",
        "isRequired": "YES",
        "hasOptions": "NO",
        "options": [],
        "selectedOptions": [],
        "properties": {
          "length": {
            "min": 1,
            "max": 3
          },
          "fields": [
            {
              "id": 1,
              "fieldName": "Name",
              "fieldType": 1,
              "isRequired": "YES",
              "isDisabledField": "NO"
            },
            {
              "id": 2,
              "fieldName": "Email",
              "fieldType": 9,
              "isRequired": "YSE",
              "isDisabledField": "NO"
            }
          ],
          "field_type_name": "Person",
          "isShowAddButton": "YES",
          "button_label": "CLICK HERE TO ADD A NEW PERSON",
          "last_option_id": 2
        },
        "isDisabledOptions": "NO",
        "disabledOptionsMsg": "",
        "showIsShow": "YES",
        "isShow": "YES",
        "showIsShowToOthers": "YES",
        "isShowToOthers": "YES",
        "showIsUseInFilter": "NO",
        "isUseInFilter": "NO",
        "showIsUseInOnoarding": "YES",
        "isUseInOnoarding": "YES",
        "isUseInTicketing": "YES",
        "user_profile_field_type": 8,
        "isOnboardingEditingRestricted": "NO",
        "communityGroups": "All",
        "ticketingGroups": "All",
        "ticketsMappedWithGroups": "All",
        "isRequiredInCommunity": "YES",
        "isRequiredInTicketing": "NO",
        "user_profile_field_icons_id": 16
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', addgroup)
    expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
    groupidadded = (response.body.data.ids.field_id.$oid)
  });

  it.only('Verify Group field with text field and Email filed & all flags as true : POST /api/v2/users/profile', async () => {
    const groupidcomm =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/profile', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', groupidcomm)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").isRequired).to.equal('YES')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").fieldTypeId).to.equal(8)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]")._id).to.equal(groupidadded)
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].fieldName).to.equal('Name')
    expect(getValueFromJsonObject(response.body,"$.success.data.userProfileFields[?(@._id=='" + groupidadded + "')]").groupOptions[0].isRequired).to.equal('YES')
  })

  it.only('Check if user (john26@yopmail.com) is registered: POST /api/v2/users/check-email', async () => {

    const checkmail = {

        "payload": {
            "data": {
                "email": "john26@yopmail.com",
                "is_otp_login": false
            }
        }
    }

    headers3["Authorization"] = process.env.accessTokenLoginPage
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
    expect(response.body.success.data.is_password).to.equal(false)
    expect(response.body.success.data.is_register).to.equal(false)

});

  it.only('Signup a new user to check group filed : POST api/v2/users/signup', async () => {

    const community2 = {
        "payload": {
            "data": {
                "email": "john26@yopmail.com",
                "firstName": "john",
                "lastName": "smith",
                "password": "Test@1234",
                "user_consent_data": [
                  {
                    "123931": "YES"
                  }
                ]

            }
        }
    }
    headers3["Authorization"] = process.env.accessTokenLoginPage
    var response = await sendRequest(environment.baseURL3, '/api/v2/users/signup', headers3, 'post', community2)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_signup_newuser_succesfull_message)
    expect(response.body.success.data.email).to.equal('john26@yopmail.com')
    global.johnuserid = (response.body.success.data._id)
    global.accesstokenjohn26user = (response.body.success.data.accessToken)

});


it.only('Onboarding with group details : POST /api/v2/users/on-board', async () => {

  const onbording1 = {
    "payload": {
      "data": {
        "groupValueArray": {
          groupidadded: [
            {
              "id": "1",
              "fieldValue": "new test",
              "team": 1
            },
            {
              "id": "2",
              "fieldValue": "john1@yopmail.com",
              "team": 1
            }
          ]
        },
        "firstName": "test ",
        "lastName": "user1",
        "gender": "",
        "about": "",
        "designation": "",
        "organisation_name": "",
        "country": "",
        "state": "",
        "city": ""
      }
    }
  }
  headers3["Authorization"] = accesstokenjohn26user
  var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onbording1)
  expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);
});

it.only('Update single attendee : PUT /backend/api/v2/people/single/edit', async () => {

  const people12 = {
    "data": {
      "phone_code": "",
      "phone": "",
      "email": "testuser1@yopmail.com",
      "is_rating": "",
      "is_featured": "",
      "img_file_name": "",
      "is_send_invite_mail": "",
      "category_id": "",
      groupidadded: [
        {
          "1": "john 2",
          "2": "john22@yopmail.com"
        }
      ],
      "industry": "",
      "groups": [
        attendeegroup
      ],
      "userId": global.johnuserid,
      "organisation": "",
      "mobile": "",
      "looking": "",
      "offering": "",
      "interest": [],
      "custom_tags": "",
      "first_name": "Test",
      "last_name": "User1",
      "status": "Activated",
      "default_custom_otp": "1234",
      "sessions": [],
      "multiple_file": []
    }
  }
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/single/edit', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', people12)
  expect(response.body.message).to.equal(Responsemessages.Parameter_people_updated_message);
});


//swat dec

it.only('Add a new field - Hobby with field type text, mandatory flag as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
  const hobbyupdate = {
    "data": {
      "fieldName": "Hobby",
      "isDefault": "NO",
      "isDisabled": "NO",
      "isDisabledField": "NO",
      "isLinkable": "NO",
      "showIsRequired": "YES",
      "isDisplayInDashboard": "YES",
      "isRequired": "YES",
      "hasOptions": "NO",
      "options": [],
      "selectedOptions": [],
      "properties": {
        "length": {
          "min": 1,
          "max": 50
        },
        "is_number": 0
      },
      "isDisabledOptions": "NO",
      "disabledOptionsMsg": "",
      "showIsShow": "YES",
      "isShow": "YES",
      "showIsShowToOthers": "YES",
      "isShowToOthers": "YES",
      "showIsUseInFilter": "YES",
      "isUseInFilter": "YES",
      "showIsUseInOnoarding": "YES",
      "isUseInOnoarding": "YES",
      "isUseInTicketing": "YES",
      "user_profile_field_type": 1,
      "communityGroups": "All",
      "ticketingGroups": "All",
      "ticketsMappedWithGroups": "All",
      "isRequiredInCommunity": "NO",
      "isRequiredInTicketing": "NO",
      "user_profile_field_icons_id": 16
    }
  }
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', hobbyupdate)
  expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
  hobbyid = (response.body.data.ids.field_id.$oid)
});


it.only('Delete added custom field :- POST /backend/api/v2/events/userprofile/delete', async () => {
  
  var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/userprofile/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'fieldid': hobbyid}, 'post')
  expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_delete)
 
});



});