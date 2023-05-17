/*
Author: Pranjal Shah
Description: This Script will update/verify profile setting on community. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 27th Oct 2021 5:50 PM
Description : Updaing the payload for update profile calls
Modified: Pranjal Shah 15th Jan 2021 07:00 PM
Description: SWAT Test Cases Added.
Modified : Biswajit Pattanaik 12th Jan 2021 01:10 PM
Description : Handled the qat different message for login
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest, getValueFromJsonObject } from '../../helper/CommonUtil'
import { send } from 'process';
require('dotenv').config();
var request3 = supertest(environment.baseURL3);
var websitelink
var faceboklink
var linkedinlink
var twitterlink
var instagramlink
var file_name


//This script will edit profile on community
describe('Edit profile settings', () => {
  beforeEach(function (done) {
    setTimeout(function(){
      done();
    }, environment.HTestDelay);
  });

  it.only('Get user profile fields in settings : GET /backend/api/v2/events/settings/userprofile', async () => {
       
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'buildversion': process.env.buildversion, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    // websitelink = (response.body.data.userProfileFields[9]._id)
    // faceboklink = (response.body.data.userProfileFields[10]._id)
    // linkedinlink = (response.body.data.userProfileFields[11]._id)
    // twitterlink = (response.body.data.userProfileFields[12]._id)
    // instagramlink = (response.body.data.userProfileFields[13]._id)

    websitelink = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Website')]._id")
    //facebook_id = (response.body.data.userProfileFields[10]._id)
    faceboklink = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Facebook Link')]._id")
    //linkedin_id = (response.body.data.userProfileFields[11]._id)
    linkedinlink = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Linkedin Link')]._id")
    //twitter_id = (response.body.data.userProfileFields[12]._id)
    twitterlink = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Twitter Link')]._id")
    //instagram_id = (response.body.data.userProfileFields[13]._id)
    instagramlink = getValueFromJsonObject(response.body,"$.data.userProfileFields[?(@.fieldName=='Instagram Link')]._id")
});

//   it.only('Get user profile fields in settings : GET /backend/api/v2/events/settings/userprofile', (done) => {
       
//     request1
//         .get('/backend/api/v2/events/settings/userprofile')
//         .set('organiserId', environment.HOrganiserId)
//         // .set('eventid', process.env.eventid)
//         .set('eventId', process.env.eventid)
//         .set('buildversion', process.env.buildversion)
//         .set('Authorization', 'Bearer ' + process.env.eToken)
//         .end((err, response) => {
//           consolelog(response)
//             expect(response.status).to.equal(200)
//             websitelink = (response.body.data.userProfileFields[9]._id)
//             faceboklink = (response.body.data.userProfileFields[10]._id)
//             linkedinlink = (response.body.data.userProfileFields[11]._id)
//             twitterlink = (response.body.data.userProfileFields[12]._id)
//             instagramlink = (response.body.data.userProfileFields[13]._id)
//             done();
//         });
// });

it.only('Update facebook link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', async () => {
  const test1 = {
   "data": {
     "_id": faceboklink,
     "fieldName": "Facebook Link",
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
     "isShowToOthers": "NO",
     "showIsUseInFilter": "NO",
     "isUseInFilter": "NO",
     "showIsUseInOnoarding": "NO",
     "isUseInOnoarding": "YES",
     "user_profile_field_icons_id": 9,
     "communityGroups": "All",
      "isAllCommunityGroups": "YES",
     "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
     "icon_name": "facebook",
     "userFiledType": "Link"
   }
 }
 var response = await sendRequest (environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'fieldid' : faceboklink},'put',test1)
});

// it.only('Update facebook link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', (done) => {
//        const test1 = {
//         "data": {
//           "_id": faceboklink,
//           "fieldName": "Facebook Link",
//           "user_profile_field_type": 7,
//           "user_profile_default_field_type": 13,
//           "isDefault": "YES",
//           "isDisabled": "NO",
//           "isLinkable": "NO",
//           "showIsRequired": "YES",
//           "isRequired": "NO",
//           "hasOptions": "NO",
//           "options": [],
//           "selectedOptions": [],
//           "properties": [],
//           "isDisabledOptions": "YES",
//           "disabledOptionsMsg": "",
//           "showIsShow": "YES",
//           "isShow": "YES",
//           "showIsShowToOthers": "YES",
//           "isShowToOthers": "NO",
//           "showIsUseInFilter": "NO",
//           "isUseInFilter": "NO",
//           "showIsUseInOnoarding": "NO",
//           "isUseInOnoarding": "YES",
//           "user_profile_field_icons_id": 9,
//           "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.3333 2H3.66667C2.74583 2 2 2.74583 2 3.66667V20.3333C2 21.2542 2.74583 22 3.66667 22H12.8333V14.5H10.3333V11.1667H12.8333V9.01083C12.8333 6.4275 14.4108 5.02083 16.7158 5.02083C17.82 5.02083 18.7683 5.10333 19.045 5.14V7.84L17.4467 7.84083C16.1933 7.84083 15.9508 8.43667 15.9508 9.31V11.1667H19.6508L18.8175 14.5H15.9508V22H20.3333C21.2542 22 22 21.2542 22 20.3333V3.66667C22 2.74583 21.2542 2 20.3333 2Z\" fill=\"black\"/></svg>",
//           "icon_name": "facebook",
//           "userFiledType": "Link"
//         }
//       }
//   request1
//       .put('/backend/api/v2/events/settings/userprofile')
//       .set('organiserId', environment.HOrganiserId)
//       // .set('eventid', process.env.eventid)
//       .set('eventId', process.env.eventid)
//       .set('buildversion', process.env.buildversion)
//       .set('Authorization', 'Bearer ' + process.env.eToken)
//       .set('fieldid', faceboklink)
//       .send(test1)
//       .end((err, response) => {
//         consolelog(response)
//           expect(response.status).to.equal(200)
//           done();
//       });
// });

it.only('Update website link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', async () => {
  const test1 = {
    "data": {
      "_id": websitelink,
      "fieldName": "Website",
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
      "communityGroups": "All",
      "isAllCommunityGroups": "YES",
      "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
      "icon_name": "default",
      "userFiledType": "Link"
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : websitelink},'put',test1)
});

// it.only('Update website link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', (done) => {
//   const test1 = {
//     "data": {
//       "_id": websitelink,
//       "fieldName": "Website",
//       "user_profile_field_type": 7,
//       "user_profile_default_field_type": 12,
//       "isDefault": "YES",
//       "isDisabled": "NO",
//       "isLinkable": "NO",
//       "showIsRequired": "YES",
//       "isRequired": "NO",
//       "hasOptions": "NO",
//       "options": [],
//       "selectedOptions": [],
//       "properties": [],
//       "isDisabledOptions": "YES",
//       "disabledOptionsMsg": "",
//       "showIsShow": "YES",
//       "isShow": "YES",
//       "showIsShowToOthers": "YES",
//       "isShowToOthers": "NO",
//       "showIsUseInFilter": "NO",
//       "isUseInFilter": "NO",
//       "showIsUseInOnoarding": "NO",
//       "isUseInOnoarding": "YES",
//       "user_profile_field_icons_id": 16,
//       "icon": " <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.1645 21.9977 19.3284 21.981 19.49 21.95L19.79 21.88H19.86H19.91L20.28 21.74L20.41 21.67C20.51 21.61 20.62 21.56 20.72 21.49C20.8535 21.3918 20.9805 21.2849 21.1 21.17L21.17 21.08C21.2682 20.9805 21.3585 20.8735 21.44 20.76L21.53 20.63C21.5998 20.5187 21.6601 20.4016 21.71 20.28C21.7374 20.232 21.7609 20.1818 21.78 20.13C21.83 20.01 21.86 19.88 21.9 19.75V19.6C21.9567 19.4046 21.9903 19.2032 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V14.69L7.29 11.39C7.38296 11.2963 7.49356 11.2219 7.61542 11.1711C7.73728 11.1203 7.86799 11.0942 8 11.0942C8.13201 11.0942 8.26272 11.1203 8.38458 11.1711C8.50644 11.2219 8.61704 11.2963 8.71 11.39L17.31 20H5ZM20 19C19.9991 19.1233 19.9753 19.2453 19.93 19.36C19.9071 19.4087 19.8804 19.4556 19.85 19.5C19.8232 19.5423 19.7931 19.5825 19.76 19.62L14.41 14.27L15.29 13.39C15.383 13.2963 15.4936 13.2219 15.6154 13.1711C15.7373 13.1203 15.868 13.0942 16 13.0942C16.132 13.0942 16.2627 13.1203 16.3846 13.1711C16.5064 13.2219 16.617 13.2963 16.71 13.39V13.39L20 16.69V19ZM20 13.86L18.12 12C17.5477 11.457 16.7889 11.1543 16 11.1543C15.2111 11.1543 14.4523 11.457 13.88 12L13 12.88L10.12 10C9.54772 9.45699 8.7889 9.15428 8 9.15428C7.2111 9.15428 6.45228 9.45699 5.88 10L4 11.86V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V13.86Z\" fill=\"black\"/></svg>",
//       "icon_name": "default",
//       "userFiledType": "Link"
//     }
//   }
// request1
//  .put('/backend/api/v2/events/settings/userprofile')
//  .set('organiserId', environment.HOrganiserId)
//  // .set('eventid', process.env.eventid)
//  .set('eventId', process.env.eventid)
//  .set('buildversion', process.env.buildversion)
//  .set('Authorization', 'Bearer ' + process.env.eToken)
//  .set('fieldid', websitelink)
//  .send(test1)
//  .end((err, response) => {
//    consolelog(response)
//      expect(response.status).to.equal(200)
//      done();
//  });
// });

it.only('Update linkedin link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', async () => {
  const test1 = {
    "data": {
      "_id": linkedinlink,
      "fieldName": "Linkedin Link",
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
      "communityGroups": "All",
      "isAllCommunityGroups": "YES",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
      "icon_name": "linkedIn",
      "userFiledType": "Link"
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : linkedinlink},'put',test1)
});

// it.only('Update linkedin link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', (done) => {
//   const test1 = {
//     "data": {
//       "_id": linkedinlink,
//       "fieldName": "Linkedin Link",
//       "user_profile_field_type": 7,
//       "user_profile_default_field_type": 14,
//       "isDefault": "YES",
//       "isDisabled": "NO",
//       "isLinkable": "NO",
//       "showIsRequired": "YES",
//       "isRequired": "NO",
//       "hasOptions": "NO",
//       "options": [],
//       "selectedOptions": [],
//       "properties": [],
//       "isDisabledOptions": "YES",
//       "disabledOptionsMsg": "",
//       "showIsShow": "YES",
//       "isShow": "YES",
//       "showIsShowToOthers": "YES",
//       "isShowToOthers": "NO",
//       "showIsUseInFilter": "NO",
//       "isUseInFilter": "NO",
//       "showIsUseInOnoarding": "NO",
//       "isUseInOnoarding": "YES",
//       "user_profile_field_icons_id": 17,
//       "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.4701 2.00014H3.53006C3.33964 1.9975 3.15056 2.03239 2.97362 2.10282C2.79669 2.17326 2.63536 2.27786 2.49886 2.41065C2.36235 2.54344 2.25334 2.70182 2.17805 2.87675C2.10276 3.05167 2.06267 3.23972 2.06006 3.43014V20.5701C2.06267 20.7606 2.10276 20.9486 2.17805 21.1235C2.25334 21.2985 2.36235 21.4568 2.49886 21.5896C2.63536 21.7224 2.79669 21.827 2.97362 21.8975C3.15056 21.9679 3.33964 22.0028 3.53006 22.0001H20.4701C20.6605 22.0028 20.8496 21.9679 21.0265 21.8975C21.2034 21.827 21.3648 21.7224 21.5013 21.5896C21.6378 21.4568 21.7468 21.2985 21.8221 21.1235C21.8974 20.9486 21.9375 20.7606 21.9401 20.5701V3.43014C21.9375 3.23972 21.8974 3.05167 21.8221 2.87675C21.7468 2.70182 21.6378 2.54344 21.5013 2.41065C21.3648 2.27786 21.2034 2.17326 21.0265 2.10282C20.8496 2.03239 20.6605 1.9975 20.4701 2.00014ZM8.09006 18.7401H5.09006V9.74014H8.09006V18.7401ZM6.59006 8.48014C6.17632 8.48014 5.77953 8.31578 5.48697 8.02323C5.19442 7.73067 5.03006 7.33388 5.03006 6.92014C5.03006 6.5064 5.19442 6.10961 5.48697 5.81705C5.77953 5.5245 6.17632 5.36014 6.59006 5.36014C6.80975 5.33522 7.03224 5.35699 7.24293 5.42402C7.45363 5.49105 7.6478 5.60183 7.81272 5.7491C7.97763 5.89637 8.10958 6.07682 8.19993 6.27862C8.29028 6.48043 8.33698 6.69904 8.33698 6.92014C8.33698 7.14124 8.29028 7.35985 8.19993 7.56166C8.10958 7.76346 7.97763 7.94391 7.81272 8.09118C7.6478 8.23845 7.45363 8.34923 7.24293 8.41626C7.03224 8.48329 6.80975 8.50505 6.59006 8.48014ZM18.9101 18.7401H15.9101V13.9101C15.9101 12.7001 15.4801 11.9101 14.3901 11.9101C14.0527 11.9126 13.7242 12.0184 13.4489 12.2133C13.1735 12.4082 12.9645 12.6828 12.8501 13.0001C12.7718 13.2352 12.7379 13.4827 12.7501 13.7301V18.7301H9.75006C9.75006 18.7301 9.75006 10.5501 9.75006 9.73014H12.7501V11.0001C13.0226 10.5272 13.419 10.1377 13.8965 9.87334C14.374 9.60902 14.9146 9.47999 15.4601 9.50014C17.4601 9.50014 18.9101 10.7901 18.9101 13.5601V18.7401Z\" fill=\"black\"/></svg>",
//       "icon_name": "linkedIn",
//       "userFiledType": "Link"
//     }
//   }
// request1
//  .put('/backend/api/v2/events/settings/userprofile')
//  .set('organiserId', environment.HOrganiserId)
//  // .set('eventid', process.env.eventid)
//  .set('eventId', process.env.eventid)
//  .set('buildversion', process.env.buildversion)
//  .set('Authorization', 'Bearer ' + process.env.eToken)
//  .set('fieldid', linkedinlink)
//  .send(test1)
//  .end((err, response) => {
//    consolelog(response)
//      expect(response.status).to.equal(200)
//      done();
//  });
// });

it.only('Update twitter link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', async () => {
  const test1 = {
    "data": {
      "_id": twitterlink,
      "fieldName": "Twitter Link",
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
      "communityGroups": "All",
      "isAllCommunityGroups": "YES",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
      "icon_name": "twitter",
      "userFiledType": "Link"
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : twitterlink},'put',test1)
});


// it.only('Update twitter link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', (done) => {
//   const test1 = {
//     "data": {
//       "_id": twitterlink,
//       "fieldName": "Twitter Link",
//       "user_profile_field_type": 7,
//       "user_profile_default_field_type": 15,
//       "isDefault": "YES",
//       "isDisabled": "NO",
//       "isLinkable": "NO",
//       "showIsRequired": "YES",
//       "isRequired": "NO",
//       "hasOptions": "NO",
//       "options": [],
//       "selectedOptions": [],
//       "properties": [],
//       "isDisabledOptions": "YES",
//       "disabledOptionsMsg": "",
//       "showIsShow": "YES",
//       "isShow": "YES",
//       "showIsShowToOthers": "YES",
//       "isShowToOthers": "NO",
//       "showIsUseInFilter": "NO",
//       "isUseInFilter": "NO",
//       "showIsUseInOnoarding": "NO",
//       "isUseInOnoarding": "YES",
//       "user_profile_field_icons_id": 10,
//       "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23 3.01009C22.0424 3.68768 20.9821 4.20594 19.86 4.54489C19.2577 3.85023 18.4573 3.35787 17.567 3.1344C16.6767 2.91094 15.7395 2.96715 14.8821 3.29543C14.0247 3.62372 13.2884 4.20824 12.773 4.96994C12.2575 5.73163 11.9877 6.63376 12 7.55431V8.55744C10.2426 8.60315 8.50127 8.21218 6.93101 7.41933C5.36074 6.62648 4.01032 5.45638 3 4.01323C3 4.01323 -1 13.0415 8 17.054C5.94053 18.4564 3.48716 19.1595 1 19.0603C10 24.076 21 19.0603 21 7.52421C20.9991 7.24479 20.9723 6.96606 20.92 6.69161C21.9406 5.68194 22.6608 4.40717 23 3.01009V3.01009Z\" fill=\"black\"/></svg>",
//       "icon_name": "twitter",
//       "userFiledType": "Link"
//     }
//   }
// request1
//  .put('/backend/api/v2/events/settings/userprofile')
//  .set('organiserId', environment.HOrganiserId)
//  // .set('eventid', process.env.eventid)
//  .set('eventId', process.env.eventid)
//  .set('buildversion', process.env.buildversion)
//  .set('Authorization', 'Bearer ' + process.env.eToken)
//  .set('fieldid', twitterlink)
//  .send(test1)
//  .end((err, response) => {
//    consolelog(response)
//      expect(response.status).to.equal(200)
//      done();
//  });
// });

it.only('Update instagram link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', async () => {
  const test1 = {
    "data": {
      "_id": instagramlink,
      "fieldName": "Instagram Link",
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
      "communityGroups": "All",
      "isAllCommunityGroups": "YES",
      "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
      "icon_name": "instagram",
      "userFiledType": "Link"
    }
  }
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'fieldid' : instagramlink},'put',test1)
});

// it.only('Update instagram link to display under edit profile : PUT /backend/api/v2/events/settings/userprofile', (done) => {
//   const test1 = {
//     "data": {
//       "_id": instagramlink,
//       "fieldName": "Instagram Link",
//       "user_profile_field_type": 7,
//       "user_profile_default_field_type": 16,
//       "isDefault": "YES",
//       "isDisabled": "NO",
//       "isLinkable": "NO",
//       "showIsRequired": "YES",
//       "isRequired": "NO",
//       "hasOptions": "NO",
//       "options": [],
//       "selectedOptions": [],
//       "properties": [],
//       "isDisabledOptions": "YES",
//       "disabledOptionsMsg": "",
//       "showIsShow": "YES",
//       "isShow": "YES",
//       "showIsShowToOthers": "YES",
//       "isShowToOthers": "NO",
//       "showIsUseInFilter": "NO",
//       "isUseInFilter": "NO",
//       "showIsUseInOnoarding": "NO",
//       "isUseInOnoarding": "YES",
//       "user_profile_field_icons_id": 11,
//       "icon": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 3.99998C5.567 3.99998 4 5.56699 4 7.49998V16.5C4 18.433 5.567 20 7.5 20H16.5C18.433 20 20 18.433 20 16.5V7.49998C20 5.56699 18.433 3.99998 16.5 3.99998H7.5ZM2 7.49998C2 4.46242 4.46243 1.99998 7.5 1.99998H16.5C19.5376 1.99998 22 4.46242 22 7.49998V16.5C22 19.5375 19.5376 22 16.5 22H7.5C4.46243 22 2 19.5375 2 16.5V7.49998Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4203 9.38918C11.8794 9.30896 11.3269 9.40136 10.8415 9.65324C10.3561 9.90511 9.96243 10.3036 9.71656 10.7921C9.47069 11.2806 9.38511 11.8342 9.47199 12.3741C9.55887 12.914 9.81379 13.4128 10.2005 13.7995C10.5872 14.1862 11.086 14.4412 11.6259 14.528C12.1658 14.6149 12.7194 14.5293 13.2079 14.2835C13.6964 14.0376 14.0949 13.644 14.3468 13.1585C14.5987 12.6731 14.6911 12.1206 14.6108 11.5797C14.529 11.0279 14.2719 10.517 13.8774 10.1226C13.483 9.72813 12.9721 9.47101 12.4203 9.38918ZM9.92035 7.87799C10.7792 7.43237 11.7566 7.26889 12.7137 7.41081C13.69 7.55558 14.5938 8.0105 15.2917 8.70837C15.9895 9.40624 16.4444 10.3101 16.5892 11.2863C16.7311 12.2434 16.5677 13.2209 16.122 14.0797C15.6764 14.9385 14.9713 15.6349 14.1071 16.0699C13.2428 16.5049 12.2634 16.6563 11.3082 16.5026C10.3529 16.3489 9.47044 15.8979 8.78628 15.2137C8.10212 14.5296 7.65111 13.6471 7.49739 12.6919C7.34368 11.7366 7.49509 10.7572 7.93009 9.89294C8.36509 9.0287 9.06153 8.32362 9.92035 7.87799Z\" fill=\"black\"/><ellipse cx=\"16.5\" cy=\"6.50001\" rx=\"1\" ry=\"0.999999\" fill=\"black\"/></svg>",
//       "icon_name": "instagram",
//       "userFiledType": "Link"
//     }
//   }
// request1
//  .put('/backend/api/v2/events/settings/userprofile')
//  .set('organiserId', environment.HOrganiserId)
//  // .set('eventid', process.env.eventid)
//  .set('eventId', process.env.eventid)
//  .set('buildversion', process.env.buildversion)
//  .set('Authorization', 'Bearer ' + process.env.eToken)
//  .set('fieldid', instagramlink)
//  .send(test1)
//  .end((err, response) => {
//    consolelog(response)
//      expect(response.status).to.equal(200)
//      done();
//  });
// });

  //EDIT PROFILE

  it.only('Edit profile: POST /api/v2/users/on-board', async () => {
    const editprofile =
    {
      "payload": {
        "data": {
          "about": "about clown",
          // "city": "melbourne",
          // "country": "Australia",
          "cover_image": "",
          "cover_image_type": "",
          "designation": "clown designation",
          "firstName": "Clown",
         // "gender": "FEMALE",
          "groupValueArray": {},
          "industry": "Criminal Justice",
          "lastName": "89",
          "organisation_name": "clown organisation",
         // "phone": "",
          "profilePictures": {},
          "userProfileFields" : {}
          //"state": "South Australia",
          // "userProfileFields": {
          //   "609c77904b75050b23610ee3": "",
          //   "6098c1cf4b750506b6800bcf": [
          //     "It could be a biological weapon "
          //   ],
          //   "6098c11f4b750506b6800bce": "test area new",
          //   "6098c1364b75052dcc1471f4": "04/05/2021",
          //   "6098c1724b750506e3008bf6": "Metro",
          //   "6098c2304b750573e029127c": "Lounge",
          //   "60530e874b750540c844f617": "hubiotest",
          //   "605348ef4b75052dcc14707d": "text new"
          // }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',editprofile)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Edit profile: POST /api/v2/users/on-board', (done) => {
  //   const editprofile =
  //   {
  //     "payload": {
  //       "data": {
  //         "about": "about clown",
  //         // "city": "melbourne",
  //         // "country": "Australia",
  //         "cover_image": "",
  //         "cover_image_type": "",
  //         "designation": "clown designation",
  //         "firstName": "Clown",
  //        // "gender": "FEMALE",
  //         "groupValueArray": {},
  //         "industry": "Criminal Justice",
  //         "lastName": "89",
  //         "organisation_name": "clown organisation",
  //        // "phone": "",
  //         "profilePictures": {},
  //         "userProfileFields" : {}
  //         //"state": "South Australia",
  //         // "userProfileFields": {
  //         //   "609c77904b75050b23610ee3": "",
  //         //   "6098c1cf4b750506b6800bcf": [
  //         //     "It could be a biological weapon "
  //         //   ],
  //         //   "6098c11f4b750506b6800bce": "test area new",
  //         //   "6098c1364b75052dcc1471f4": "04/05/2021",
  //         //   "6098c1724b750506e3008bf6": "Metro",
  //         //   "6098c2304b750573e029127c": "Lounge",
  //         //   "60530e874b750540c844f617": "hubiotest",
  //         //   "605348ef4b75052dcc14707d": "text new"
  //         // }
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(editprofile)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE INTEREST

  it.only('Update interest to Accounting, Banking, Biotech, Computer Science, Engineering : POST /api/v2/users/on-board', async () => {
    const updateinterset =
    {
      "payload": {
        "data": {
          "intrests": ["Accounting", "Banking", "Biotech", "Computer Science", "Engineering"]

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updateinterset)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update interest to Accounting, Banking, Biotech, Computer Science, Engineering : POST /api/v2/users/on-board', (done) => {
  //   const updateinterset =
  //   {
  //     "payload": {
  //       "data": {
  //         "intrests": ["Accounting", "Banking", "Biotech", "Computer Science", "Engineering"]

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updateinterset)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE SOCIAL LINKS

  it.only('Update social links of website,fb,twitter,linkedin,insta,favourite website : POST /api/v2/users/on-board', async () => {
    const updatesociallinks =
    {
      "payload": {
        "data": {
          "facebook_url": "https://facebook.com",
          "groupValueArray": {},
          "instagramLink": "https://instagram.com",
          "linkdin_url": "https://linkedin.com",
          "twitter_url": "https://twitter.com",
          "userProfileFields": {
            "6098c2474b750573e17d10b8": "https://amazon.com"
          },
          "website": "https://google.com"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatesociallinks)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update social links of website,fb,twitter,linkedin,insta,favourite website : POST /api/v2/users/on-board', (done) => {
  //   const updatesociallinks =
  //   {
  //     "payload": {
  //       "data": {
  //         "facebook_url": "https://facebook.com",
  //         "groupValueArray": {},
  //         "instagramLink": "https://instagram.com",
  //         "linkdin_url": "https://linkedin.com",
  //         "twitter_url": "https://twitter.com",
  //         "userProfileFields": {
  //           "6098c2474b750573e17d10b8": "https://amazon.com"
  //         },
  //         "website": "https://google.com"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updatesociallinks)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE LOOKING & OFFERING

  it.only('Update looking & offering to Seo executive & skilled labour : POST /api/v2/users/on-board', async () => {
    const updatelookingoffering =
    {
      "payload": {
        "data": {
          "lookingfor": "SEO Executive",
          "offering": "Skilled Labor"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatelookingoffering)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update looking & offering to Seo executive & skilled labour : POST /api/v2/users/on-board', (done) => {
  //   const updatelookingoffering =
  //   {
  //     "payload": {
  //       "data": {
  //         "lookingfor": "SEO Executive",
  //         "offering": "Skilled Labor"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updatelookingoffering)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //GET PROFILE TO VIEW UPDATED DETAILS

  it.only('Get profile to view updated details : POST /api/v2/users/profile', async () => {
    const updateprofiledetails =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updateprofiledetails)
    expect(response.body.success.data.facebook_url).to.equal('https://facebook.com')
    expect(response.body.success.data.linkdin_url).to.equal('https://linkedin.com')
    expect(response.body.success.data.twitter_url).to.equal('https://twitter.com')
    expect(response.body.success.data.instagramLink).to.equal('https://instagram.com')
    expect(response.body.success.data.lookingfor).to.equal('SEO Executive')
    expect(response.body.success.data.offering).to.equal('Skilled Labor')
    expect(response.body.success.data.intrests[0]).to.equal('Accounting')
    expect(response.body.success.data.intrests[1]).to.equal('Banking')
    expect(response.body.success.data.intrests[2]).to.equal('Biotech')
    expect(response.body.success.data.intrests[3]).to.equal('Computer Science')
    expect(response.body.success.data.intrests[4]).to.equal('Engineering')
  });


  // it.only('Get profile to view updated details : POST /api/v2/users/profile', (done) => {
  //   const updateprofiledetails =
  //   {
  //     "payload": {
  //       "data": null

  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/profile')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updateprofiledetails)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.facebook_url).to.equal('https://facebook.com')
  //       expect(response.body.success.data.linkdin_url).to.equal('https://linkedin.com')
  //       expect(response.body.success.data.twitter_url).to.equal('https://twitter.com')
  //       expect(response.body.success.data.instagramLink).to.equal('https://instagram.com')
  //       expect(response.body.success.data.lookingfor).to.equal('SEO Executive')
  //       expect(response.body.success.data.offering).to.equal('Skilled Labor')
  //       expect(response.body.success.data.intrests[0]).to.equal('Accounting')
  //       expect(response.body.success.data.intrests[1]).to.equal('Banking')
  //       expect(response.body.success.data.intrests[2]).to.equal('Biotech')
  //       expect(response.body.success.data.intrests[3]).to.equal('Computer Science')
  //       expect(response.body.success.data.intrests[4]).to.equal('Engineering')
  //       done();
  //     });
  // });

  //EDIT PROFILE1

  it.only('This will edit profile : POST /api/v2/users/on-board', async () => {
    const editprofile1 =
    {
      "payload": {
        "data": {
          "about": "clown is new",
          //"city": "houston",
          //"country": "United States",
          "cover_image": "",
          "cover_image_type": "",
          "designation": "clown designation is ceo",
          "firstName": "joker",
          //"gender": "MALE",
          "groupValueArray": {},
          "industry": "Technical",
          "lastName": "clown",
          "organisation_name": "clown organisation is world",
          //"phone": "",
          "profilePictures": {},
          //"state": "Texas",
          "userProfileFields": {}
          // "userProfileFields": {
          //   "609c77904b75050b23610ee3": "",
          //   "6098c1cf4b750506b6800bcf": [
          //     "Human activity with nature", "Climate change"
          //   ],
          //   "6098c11f4b750506b6800bce": "new text uui",
          //   "6098c1364b75052dcc1471f4": "04/05/2021",
          //   "6098c1724b750506e3008bf6": "Bus",
          //   "6098c2304b750573e029127c": "Hotel",
          //   "60530e874b750540c844f617": "new",
          //   "605348ef4b75052dcc14707d": "newest test"
          // }
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',editprofile1)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('This will edit profile : POST /api/v2/users/on-board', (done) => {
  //   const editprofile1 =
  //   {
  //     "payload": {
  //       "data": {
  //         "about": "clown is new",
  //         //"city": "houston",
  //         //"country": "United States",
  //         "cover_image": "",
  //         "cover_image_type": "",
  //         "designation": "clown designation is ceo",
  //         "firstName": "joker",
  //         //"gender": "MALE",
  //         "groupValueArray": {},
  //         "industry": "Technical",
  //         "lastName": "clown",
  //         "organisation_name": "clown organisation is world",
  //         //"phone": "",
  //         "profilePictures": {},
  //         //"state": "Texas",
  //         "userProfileFields": {}
  //         // "userProfileFields": {
  //         //   "609c77904b75050b23610ee3": "",
  //         //   "6098c1cf4b750506b6800bcf": [
  //         //     "Human activity with nature", "Climate change"
  //         //   ],
  //         //   "6098c11f4b750506b6800bce": "new text uui",
  //         //   "6098c1364b75052dcc1471f4": "04/05/2021",
  //         //   "6098c1724b750506e3008bf6": "Bus",
  //         //   "6098c2304b750573e029127c": "Hotel",
  //         //   "60530e874b750540c844f617": "new",
  //         //   "605348ef4b75052dcc14707d": "newest test"
  //         // }
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(editprofile1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE INTEREST1

  it.only('Update interest to Culinary Arts : POST /api/v2/users/on-board', async () => {
    const updateinterset1 =
    {
      "payload": {
        "data": {
          "intrests": ["Culinary Arts"]

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updateinterset1)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update interest to Culinary Arts : POST /api/v2/users/on-board', (done) => {
  //   const updateinterset1 =
  //   {
  //     "payload": {
  //       "data": {
  //         "intrests": ["Culinary Arts"]

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updateinterset1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE SOCIAL LINKS1

  it.only('Update new social links of website,fb,twitter,linkedin,insta,favourite website : POST /api/v2/users/on-board', async () => {
    const updatesociallinks1 =
    {
      "payload": {
        "data": {
          "facebook_url": "https://facebook.com/raj",
          "groupValueArray": {},
          "instagramLink": "https://instagram.com/rahul",
          "linkdin_url": "https://linkedin.com/vikram",
          "twitter_url": "https://twitter.com/pat",
          "userProfileFields": {
            "6098c2474b750573e17d10b8": "https://amazon.in"
          },
          "website": "https://google.com/rajesh"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatesociallinks1)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update new social links of website,fb,twitter,linkedin,insta,favourite website : POST /api/v2/users/on-board', (done) => {
  //   const updatesociallinks1 =
  //   {
  //     "payload": {
  //       "data": {
  //         "facebook_url": "https://facebook.com/raj",
  //         "groupValueArray": {},
  //         "instagramLink": "https://instagram.com/rahul",
  //         "linkdin_url": "https://linkedin.com/vikram",
  //         "twitter_url": "https://twitter.com/pat",
  //         "userProfileFields": {
  //           "6098c2474b750573e17d10b8": "https://amazon.in"
  //         },
  //         "website": "https://google.com/rajesh"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updatesociallinks1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //UPDATE LOOKING & OFFERING1

  it.only('Update looking & offering to Receptionist & Investors : POST /api/v2/users/on-board', async () => {
    const updatelookingoffering1 =
    {
      "payload": {
        "data": {
          "lookingfor": "Receptionist",
          "offering": "Investors"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatelookingoffering1)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });

  // it.only('Update looking & offering to Receptionist & Investors : POST /api/v2/users/on-board', (done) => {
  //   const updatelookingoffering1 =
  //   {
  //     "payload": {
  //       "data": {
  //         "lookingfor": "Receptionist",
  //         "offering": "Investors"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updatelookingoffering1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });

  //GET PROFILE TO VIEW NEW UPDATED DETAILS

  it.only('Get profile to view new updated details : POST /api/v2/users/profile', async () => {
    const updateprofiledetails1 =
    {
      "payload": {
        "data": null

      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/profile',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updateprofiledetails1)
    expect(response.body.success.data.website).to.equal('https://google.com/rajesh')
    expect(response.body.success.data.facebook_url).to.equal('https://facebook.com/raj')
    expect(response.body.success.data.linkdin_url).to.equal('https://linkedin.com/vikram')
    expect(response.body.success.data.twitter_url).to.equal('https://twitter.com/pat')
    expect(response.body.success.data.instagramLink).to.equal('https://instagram.com/rahul')
    expect(response.body.success.data.lookingfor).to.equal('Receptionist')
    expect(response.body.success.data.offering).to.equal('Investors')
    expect(response.body.success.data.intrests[0]).to.equal('Culinary Arts')
    expect(response.body.success.data.firstName).to.equal('joker')
    expect(response.body.success.data.lastName).to.equal('clown')
    expect(response.body.success.data.designation).to.equal('clown designation is ceo')
    expect(response.body.success.data.organisation_name).to.equal('clown organisation is world')
    // expect(response.body.success.data.country).to.equal('United States')
    // expect(response.body.success.data.state).to.equal('Texas')
    // expect(response.body.success.data.city).to.equal('houston')
  });

  // it.only('Get profile to view new updated details : POST /api/v2/users/profile', (done) => {
  //   const updateprofiledetails1 =
  //   {
  //     "payload": {
  //       "data": null

  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/profile')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updateprofiledetails1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.website).to.equal('https://google.com/rajesh')
  //       expect(response.body.success.data.facebook_url).to.equal('https://facebook.com/raj')
  //       expect(response.body.success.data.linkdin_url).to.equal('https://linkedin.com/vikram')
  //       expect(response.body.success.data.twitter_url).to.equal('https://twitter.com/pat')
  //       expect(response.body.success.data.instagramLink).to.equal('https://instagram.com/rahul')
  //       expect(response.body.success.data.lookingfor).to.equal('Receptionist')
  //       expect(response.body.success.data.offering).to.equal('Investors')
  //       expect(response.body.success.data.intrests[0]).to.equal('Culinary Arts')
  //       expect(response.body.success.data.firstName).to.equal('joker')
  //       expect(response.body.success.data.lastName).to.equal('clown')
  //       expect(response.body.success.data.designation).to.equal('clown designation is ceo')
  //       expect(response.body.success.data.organisation_name).to.equal('clown organisation is world')
  //       // expect(response.body.success.data.country).to.equal('United States')
  //       // expect(response.body.success.data.state).to.equal('Texas')
  //       // expect(response.body.success.data.city).to.equal('houston')
  //       done();
  //     });
  // });

  //Uplaod Image

  it('Upload Image : POST /api/v2/get-signed-url', async () => {
    const uploadimage =
    {
      "payload": {
        "data": {
          "contentType": "image/jpeg",
          "extension": "jpg",
          "options": { size: 200, skipUpload: true },
          "uploadType": "PROFILE"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/get-signed-url',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',uploadimage)
    global.upload_url_logo = (response.body.success.data.urlLists[0].uploadURL)
    file_name = (response.body.success.data.urlLists[0].fileName)
  });

  it.only('Upload image to aws upload url', function (done) {
    const req = require('supertest')
    var awsHost = 'https://' + global.upload_url_logo.split('/')[2]
    var awsUploadUrl = global.upload_url_logo.substr(awsHost.length)
    const fs = require('fs')
    let testImage = './images_branding/event_LOGO.png'
    req(awsHost).put(awsUploadUrl)
      .set('Content-Type', 'image/png')
      .send(fs.readFileSync(testImage))
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it.only('This will edit profile : POST /api/v2/users/on-board', async () => {
    const editprofile1 =
    {
      "payload": {
        "data": {
          "about": "clown is new",
          "cover_image": "",
          "cover_image_type": "",
          "designation": "clown designation is ceo",
          "firstName": "joker",
          "groupValueArray": {},
          "industry": "Technical",
          "lastName": "clown",
          "organisation_name": "clown organisation is world",
          "profilePictures": {
            "orignal": file_name,
            "thumb": file_name
          },
          "userProfileFields": {}
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',editprofile1)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  });


  // it('Upload Image : POST /api/v2/get-signed-url', (done) => {
  //   const uploadimage =
  //   {
  //     "payload": {
  //       "data": {
  //         "contentType": "image/jpeg",
  //         "extension": "jpg",
  //         "options": { size: 200, skipUpload: true },
  //         "uploadType": "PROFILE"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/get-signed-url')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(uploadimage)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });




  //Get Cover Image

  it.only('Upload Image : POST /api/v2/users/cover-images', async () => {
    // const updatelookingoffering1 =
    // {
    //   "payload": {
    //     "data": {
    //       "contentType": "image/jpeg",
    //        "extension": "jpg",
    //        "options": {size: 200, skipUpload: true},
    //        "uploadType": "PROFILE"
    //     }
    //   }
    // }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/cover-images',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post')
    expect(response.body.success.data.images[0].name).to.equal('n-cover-1.png')
    expect(response.body.success.data.images[5].name).to.equal('n-cover-6.png')
  });

  // it.only('Upload Image : POST /api/v2/users/cover-images', (done) => {
  //   // const updatelookingoffering1 =
  //   // {
  //   //   "payload": {
  //   //     "data": {
  //   //       "contentType": "image/jpeg",
  //   //        "extension": "jpg",
  //   //        "options": {size: 200, skipUpload: true},
  //   //        "uploadType": "PROFILE"
  //   //     }
  //   //   }
  //   // }
  //   request3
  //     .post('/api/v2/users/cover-images')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     // .send(updatelookingoffering1)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.images[0].name).to.equal('n-cover-1.png')
  //       expect(response.body.success.data.images[5].name).to.equal('n-cover-6.png')
  //       done();
  //     });
  // });


  //Uplaod Cover Image

  it.only('Upload Cover Image : POST /api/v2/users/on-board', async () => {
    const uploadcoverimage =
    {
      "payload": {
        "data": {
          "cover_image": "n-cover-1.png",
          "cover_image_type": "DEFAULT"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/on-board',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',uploadcoverimage)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
    });

  // it.only('Upload Cover Image : POST /api/v2/users/on-board', (done) => {
  //   const uploadcoverimage =
  //   {
  //     "payload": {
  //       "data": {
  //         "cover_image": "n-cover-1.png",
  //         "cover_image_type": "DEFAULT"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/on-board')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(uploadcoverimage)
  //     .end((err, response) => {
  //     consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_profile_updated_message)
  //       done();
  //     });
  // });


});