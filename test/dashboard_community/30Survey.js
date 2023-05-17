/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/export/delete Survey.
Timestamp: 27th Sept 2021 11:30 AM
Modified: Pranjal Shah 12nd Nov 2021 16:27 PM
Description: Added Remaning Review Test Cases.
Modified: Pranjal Shah 25th Jan 2022 11:49 AM
Description: SWAT cases added for december.
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import { sendRequest,nextWeek,todayDate,addTime,Session,organizerUserHeader,People,ComunitySignupLogin } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();


var surveyid1
var surveyid2
var surveyid3
var surveyid4
var surveyid5
var questionid1
var survey_response_id
var peopleid1
var sessionid1
var sessionid_survey
var surveyid_session
var session_survey_questionid
var session_survey_questionid1
var virtualboothid1
var questionid2
var questionid2gen
var questionid3gen
var questionid4gen
var questionid5gen
var surveyid_duplicate
var sessionid_survey2
var sessionid_survey3
var sessionid_two
var sessionid_survey3
var sessionid_one
var sessionid_three


describe('Survey Test Cases', () => {

  it.only('Get survey setting : GET /api/v1/survey/settings', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')

  });


  it.only('Add a General Survey which is visible to attendee group : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Take the Survey",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "fieldName": "Test Question 1",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "include_other_option": 1
            },
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "surveyFieldType": 5,
            "fieldTypeName": "Checkbox",
            "_id": 1
          },
          {
            "fieldName": "Test Question Rating",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {},
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "isRating": "YES",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "ratingMax": 5,
            "ratingMin": 1,
            "ratingIcons": [],
            "selectedRatingIcon": "STAR",
            "surveyFieldType": 11,
            "fieldTypeName": "Rating",
            "_id": 16
          },
          {
            "fieldName": "Test Question",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "length": {
                "min": 1,
                "max": 200
              }
            },
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "initialStateOptions": [
              "PLACEHOLDER",
              "DEFAULT VALUE"
            ],
            "surveyFieldType": 2,
            "fieldTypeName": "Text Area",
            "_id": 86
          },
          {
            "fieldName": "This is File Question",
            "isDefault": "NO",
            "isDisabled": "NO",
            "isDisabledField": "NO",
            "isLinkable": "NO",
            "showIsRequired": "YES",
            "isRequired": "NO",
            "hasOptions": "NO",
            "isRating": "NO",
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
            "surveyFieldType": 12,
            "fieldTypeName": "File",
            "_id": 77
          },
          {
            "fieldName": "This is link question",
            "isRequired": "NO",
            "properties": {},
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "isRating": "NO",
            "showIsRequired": "YES",
            "surveyFieldType": 7,
            "fieldTypeName": "Link",
            "_id": 30
          }
        ],
        "tagline": "Test 1 Survey",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid1 = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

  });

  //swat case verification
  it.only('Get Survey details : POST /api/v2/survey/details', async () => {

    const survey_details =
    {
      "payload": {
        "data": {
          "surveyId": surveyid1,
          "surveyType": "GENERAL"
        }
      }
    }

    var response = await sendRequest(environment.baseURL3, '/api/v2/survey/details', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_details)
    expect(response.body.success.data.surveyDetails.surveyName).to.equal("Take the Survey")
    expect(response.body.success.data.surveyDetails.surveyType).to.equal("GENERAL")
    // expect(response.body.success.data.surveyQuestionList[0].options[0].value).to.equal("1")
    // expect(response.body.success.data.surveyQuestionList[0].options[1].value).to.equal("2")
    expect(response.body.success.data.surveyQuestionList[0].properties.include_other_option).to.equal(1)
});


  it.only('Verify general survey list in dashboard : GET /api/v1/survey/list', async () => {

    const survey_list=
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_list)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal('Take the Survey');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
    expect(response.body.data[0].surveyType).to.equal("GENERAL");
    expect(response.body.data[0].questionCount).to.equal(5);
  });

  it.only('Add a Attendee', async () => {

    var people = new People();
    var peopleid1 = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'surveytest@mailinator.com', 'user1', 'Test', [global.attendeegroup])
    var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstoken_survey_participant = await signup.loginWithOtp(global.accessTokenLoginPage, 'surveytest@mailinator.com', '1234')
  });

  it.only('Verify attendee is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

  const survey_list =
  {"payload":{"data":null}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.isGeneralSurveyVisible).to.equal(true)
});

it.only('Add a speaker and sign', async () => {

  var people = new People();
  var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardSpeaker@yopmail.com', 'OnboardingUser', 'Speaker', [global.speakergroup])
  var signup = new ComunitySignupLogin();
  global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
  global.accesstokenspeakeruser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker@yopmail.com', '1234')
});


it.only('Verify speaker is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

  const survey_list =
  {"payload":{"data":null}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization':  global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.isGeneralSurveyVisible).to.equal(false)
});


it.only('Add Virtual Booth : POST /backend/api/v2/events/booth/add', async () => {
  const virtual10 ={
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
  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
  virtualboothid1 = (response.body.data.ids.exhibitor_id)
});

it.only('Add a booth member', async () => {

  var people = new People('boothmember', global.virtualboothid1);
  var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember@yopmail.com', 'OnboardingUser', 'boothmember', [global.boothmembergroup])
});

it.only('Sign in a booth member', async () => {
 
   var signup = new ComunitySignupLogin();
    global.accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accesstokenboothuser = await signup.loginWithOtp(global.accessTokenLoginPage, 'newOnboardSpeaker@yopmail.com', '1234')
});

it.only('Verify booth member is able to access the survey', async () => {

  const survey_list =
  {"payload":{"data":null}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.isGeneralSurveyVisible).to.equal(false)
});

  it.only('Add Survey with status as Hidden  : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Survey Hidden",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup
        ],
        "surveyStatus": "HIDDEN",
        "surveyQuestions": [
          {
            "fieldName": "Test Questions ",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "length": {
                "min": 1,
                "max": 200
              },
              "is_number": 1
            },
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "initialStateOptions": [
              "PLACEHOLDER",
              "DEFAULT VALUE"
            ],
            "surveyFieldType": 2,
            "fieldTypeName": "Text Area",
            "_id": 81
          }
        ],
        "tagline": "Survey Hidden",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid2 = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

  });


  it.only('Add General Survey which is visible to all groups : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Take Survey all group",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup, global.speakergroup, global.boothmembergroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "fieldName": "Test Question 1",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "include_other_option": 1
            },
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [
              "1"
            ],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "last_option_id": 2,
            "surveyFieldType": 5,
            "fieldTypeName": "Checkbox",
            "_id": 18
          }
        ],
        "tagline": "Test 1",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid3 = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

  });

  it.only('Verify general survey list in dashboard : GET /api/v1/survey/list', async () => {

    const survey_list=
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_list)
    expect(response.body.total_count).to.equal(3);
    expect(response.body.data[0].surveyName).to.equal('Take Survey all group');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
    expect(response.body.data[0].surveyType).to.equal("GENERAL");
  });


  it.only('Verify attendee is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

    const survey_list =
    {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.isGeneralSurveyVisible).to.equal(true)
  });
  
  it.only('Verify speaker is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

    const survey_list =
    {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization':  global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.isGeneralSurveyVisible).to.equal(true)
  });

  it.only('Verify booth member is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

    const survey_list =
    {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.isGeneralSurveyVisible).to.equal(true)
  });

  
  it.only('Get survey question id which having name Take Survey all group : GET /api/v1/survey/id', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/id', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid, 'surveyid': surveyid3 }, 'get')
    questionid2 = (response.body.data.surveyQuestions[0].questionId)

  });


  it.only('Update general survey with visible group as Atteendee and Speaker : POST /api/v1/survey/edit', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Take Survey all group",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup,
          global.speakergroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 5,
            "fieldName": "Test Question 1",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
            "isRequired": "YES",
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [
              "1"
            ],
            "properties": {
              "include_other_option": 1
            },
            "position": 1,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "NO",
            "ratingMin": 0,
            "ratingMax": 0,
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt": new Date(),
            "last_option_id": 2,
            "__v": 0,
            "surveyId": surveyid3,
            "hasResponse": "FALSE",
            "questionId": questionid2,
            "fieldTypeName": "Checkbox"
          }
        ],
        "tagline": "Test 1",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": "",
        "surveyId": surveyid3
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/edit', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_updated_message);
  });

  it.only('Verify booth member is able to access the survey : POST /api/v2/platformNew/navigate-new', async () => {

    const survey_list =
    {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/navigate-new', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.isGeneralSurveyVisible).to.equal(true)
  });



  it.only('Add General Survey which is visible to attendee and boothmember groups : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Survey for attendee and boothmember",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup, global.boothmembergroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "fieldName": "Test Question 1",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "include_other_option": 1
            },
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [
              "1"
            ],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "last_option_id": 2,
            "surveyFieldType": 5,
            "fieldTypeName": "Checkbox",
            "_id": 18
          }
        ],
        "tagline": "Test 1",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid4 = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

  });

  it.only('Verify speaker is not able to access the survey in survey list : POST /api/v2/survey/list', async () => {

    const survey_list =
    {
      "payload": {
        "data": {
          "surveyType": "GENERAL",
          "currentPage": 0,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/survey/list', { 'Authorization':  global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.surveys.map(survey => survey.surveyName)).to.include("Take Survey all group").and.not.include(['Survey for attendee and boothmember'])
  });



  it.only('Add General Survey which is visible to speaker and boothmember groups : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Survey for speaker and boothmember",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.speakergroup, global.boothmembergroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "fieldName": "Test Question 1",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "isRequired": "YES",
            "properties": {
              "include_other_option": 1
            },
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [
              "1"
            ],
            "isRating": "NO",
            "showIsRequired": "YES",
            "fieldHelpOptions": [
              "TOOLTIP",
              "DESCRIPTION"
            ],
            "last_option_id": 2,
            "surveyFieldType": 5,
            "fieldTypeName": "Checkbox",
            "_id": 18
          }
        ],
        "tagline": "Test 1",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid5 = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

  });

  it.only('Verify attendee is not able to access the survey in survey list : POST /api/v2/platformNew/navigate-new', async () => {

    const survey_list =
    {
      "payload": {
        "data": {
          "surveyType": "GENERAL",
          "currentPage": 0,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/survey/list', { 'Authorization': global.accesstoken_survey_participant, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
    expect(response.body.success.data.surveys.map(survey => survey.surveyName)).to.include("Take Survey all group").and.not.include(['Survey for speaker and boothmember'])
  });


  it.only('Verify general survey list in dashboard : GET /api/v1/survey/list', async () => {

    const survey_list=
    {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_list)
    expect(response.body.total_count).to.equal(5);
    expect(response.body.data[0].surveyName).to.equal('Survey for speaker and boothmember');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
    expect(response.body.data[0].surveyType).to.equal("GENERAL");
  });


  it.only('Filter Survey with status as visible : POST /api/v1/survey/list', async () => {

    const survey_search =
    {
      "data": {
        "filter": {
          "surveyTypes": [],
          "surveyStatus": [
            "VISIBLE"
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
    expect(response.body.total_count).to.equal(4);
    expect(response.body.data.map(survey => survey.surveyName)).to.include("Take Survey all group")
  });


  it.only('Filter Survey with status as hidden : POST /api/v1/survey/list', async () => {

    const survey_search =
    {
      "data": {
        "filter": {
          "surveyTypes": [],
          "surveyStatus": [
            "HIDDEN"
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal('Survey Hidden');
    expect(response.body.data[0].surveyStatus).to.equal('HIDDEN');
  });

  it.only('Filter Survey with status as visible and hidden : POST /api/v1/survey/list', async () => {

    const survey_search =
    {
      "data": {
        "filter": {
          "surveyTypes": [],
          "surveyStatus": [
            "VISIBLE",
            "HIDDEN"
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
    expect(response.body.total_count).to.equal(5);
    expect(response.body.data.map(survey => survey.surveyName)).to.include("Take Survey all group","Survey Hidden")
  });


  it.only('Filter Survey with survey type as general : POST /api/v1/survey/list', async () => {

    const survey_search =
    {
      "data": {
        "filter": {
          "surveyTypes": [
            "GENERAL"
          ],
          "surveyStatus": []
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
    expect(response.body.total_count).to.equal(5);
    expect(response.body.data.map(survey => survey.surveyName)).to.include("Take Survey all group","Survey Hidden")
  });


  it.only('Filter Survey with survey type as general and status as visible and hidden : POST /api/v1/survey/list', async () => {

    const survey_search =
    {
      "data": {
        "filter": {
          "surveyTypes": [
            "GENERAL"
          ],
          "surveyStatus": [
            "VISIBLE",
            "HIDDEN"
          ]
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
    expect(response.body.total_count).to.equal(5);
    expect(response.body.data.map(survey => survey.surveyName)).to.include("Take Survey all group","Survey Hidden")
    // expect(response.body.data[0].surveyName).to.equal('Take Survey all group');
    // expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
    // expect(response.body.data[1].surveyName).to.equal('Survey Hidden');
    // expect(response.body.data[1].surveyStatus).to.equal('HIDDEN');
    // expect(response.body.data[2].surveyName).to.equal('Take the Survey');
  });


  it.only('Search survey with name : POST /api/v1/survey/list', async () => {

    const survey_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Take the Survey' }, 'post', survey_search)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal('Take the Survey');
    expect(response.body.data[0].surveyType).to.equal('GENERAL');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');

  });

  it.only('Search survey with wrong name : POST /api/v1/survey/list', async () => {

    const survey_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Wrong name' }, 'post', survey_search)
    expect(response.body.total_count).to.equal(0);
  });

  it.only('Search survey with partial name : POST /api/v1/survey/list', async () => {

    const survey_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Hidden' }, 'post', survey_search)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal("Survey Hidden");
    expect(response.body.data[0].surveyType).to.equal("GENERAL");
    expect(response.body.data[0].surveyStatus).to.equal("HIDDEN");
  });

  it.only('Search survey with lower case name : POST /api/v1/survey/list', async () => {

    const survey_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'take the survey' }, 'post', survey_search)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal('Take the Survey');
    expect(response.body.data[0].surveyType).to.equal('GENERAL');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
  });

  it.only('Search survey with upper case name : POST /api/v1/survey/list', async () => {

    const survey_search =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'TAKE THE SURVEY' }, 'post', survey_search)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].surveyName).to.equal('Take the Survey');
    expect(response.body.data[0].surveyType).to.equal('GENERAL');
    expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
  });


 it.only('Verify General Survey list in community for (clown26@yopmail.com) user : POST /api/v2/survey/list', async () => {

        const survey_list =
        {
          "payload": {
            "data": {
              "surveyType": "GENERAL",
              "currentPage": 0,
              "limit": 10
            }
          }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/survey/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
        expect(response.body.success.data.surveys.map(survey => survey.surveyName)).to.include("Survey for attendee and boothmember","Take Survey all group","Take the Survey","Take the Survey-Copy")
        expect(response.body.success.data.surveys.map(survey => survey.surveyType)).to.include("GENERAL")
    });


    it.only('Get Survey details : POST /api/v2/survey/details', async () => {

      const survey_details =
      {
        "payload": {
          "data": {
            "surveyId": surveyid1,
            "surveyType": "GENERAL"
          }
        }
      }

      var response = await sendRequest(environment.baseURL3, '/api/v2/survey/details', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_details)
      expect(response.body.success.data.surveyDetails.surveyName).to.equal("Take the Survey")
      expect(response.body.success.data.surveyDetails.surveyType).to.equal("GENERAL")
      expect(response.body.success.data.surveyQuestionList[0].fieldName).to.equal("Test Question 1")
      expect(response.body.success.data.surveyQuestionList[0].isRequired).to.equal("YES")
      expect(response.body.success.data.surveyQuestionList[0].options[0].value).to.equal("1")
      expect(response.body.success.data.surveyQuestionList[0].options[1].value).to.equal("2")
  });


  it.only('Get survey question id and Verify survey url for general survey : GET /api/v1/survey/id', async () => {
    var todayDate1 = new Date().toISOString().slice(0, 10);
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/id', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid, 'surveyid': surveyid1 }, 'get')
    questionid1 = (response.body.data.surveyQuestions[0].questionId)
    questionid2gen = (response.body.data.surveyQuestions[1].questionId)
    questionid3gen = (response.body.data.surveyQuestions[2].questionId)
    questionid4gen = (response.body.data.surveyQuestions[3].questionId)
    questionid5gen = (response.body.data.surveyQuestions[4].questionId)
    expect(response.body.data.surveyUrl).to.equal(`${process.env.eventurl}/survey/${surveyid1}`)
  });


  it.only('Duplicate a survey : POST /api/v1/survey/create', async () => {

    const survey_add =
    {
      "data": {
        "surveyName": "Take the Survey-Copy",
        "surveyType": "GENERAL",
        "isSessionAll": "FALSE",
        "sessionId": [],
        "surveyVisibleGroups": [
          global.attendeegroup
        ],
        "surveyStatus": "VISIBLE",
        "surveyQuestions": [
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 5,
            "fieldName": "Test Question 1",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
            "isRequired": "YES",
            "hasOptions": "YES",
            "options": [
              {
                "id": 1,
                "value": "1"
              },
              {
                "id": 2,
                "value": "2"
              }
            ],
            "selectedOptions": [],
            "properties": {
              "include_other_option": 0
            },
            "position": 1,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "NO",
            "ratingMin": 0,
            "ratingMax": 0,
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt":  new Date(),
            "__v": 0,
            "surveyId": surveyid1,
            "hasResponse": "TRUE",
            "questionId": questionid1,
            "fieldTypeName": "Checkbox"
          },
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 11,
            "fieldName": "Test Question Rating",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
            "isRequired": "YES",
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "position": 2,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "YES",
            "ratingMin": 1,
            "ratingMax": 5,
            "selectedRatingIcon": "STAR",
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt": new Date(),
            "__v": 0,
            "surveyId": surveyid1,
            "hasResponse": "FALSE",
            "questionId": questionid2gen,
            "fieldTypeName": "Rating"
          },
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 2,
            "fieldName": "Test Question",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
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
            "position": 3,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "NO",
            "ratingMin": 0,
            "ratingMax": 0,
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt": new Date(),
            "__v": 0,
            "surveyId": surveyid1,
            "hasResponse": "FALSE",
            "questionId": questionid3gen,
            "fieldTypeName": "Text Area"
          },
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 12,
            "fieldName": "This is File Question",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
            "isRequired": "NO",
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
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
            "position": 4,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "NO",
            "ratingMin": 0,
            "ratingMax": 0,
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt": new Date(),
            "__v": 0,
            "surveyId": surveyid1,
            "hasResponse": "FALSE",
            "questionId": questionid4gen,
            "fieldTypeName": "File"
          },
          {
            "isDefault": "NO",
            "defaultQuestionId": "",
            "isActive": "YES",
            "isDeleted": "NO",
            "resposneCount": 0,
            "event_id": process.env.eventid,
            "organiser_id": environment.HOrganiserId,
            "surveyFieldType": 7,
            "fieldName": "This is link question",
            "initialState": "PLACEHOLDER",
            "initialStateDesc": "",
            "fieldHelp": "TOOLTIP",
            "fieldHelpDesc": "",
            "showIsRequired": "YES",
            "isRequired": "NO",
            "hasOptions": "NO",
            "options": [],
            "selectedOptions": [],
            "position": 5,
            "isDisabledOptions": "NO",
            "disabledOptionsMsg": "",
            "showIsShow": "YES",
            "isShow": "YES",
            "isRating": "NO",
            "ratingMin": 0,
            "ratingMax": 0,
            "createdAtMilli": new Date().getTime(),
            "loacalCreatedAt": new Date(),
            "__v": 0,
            "surveyId": surveyid1,
            "hasResponse": "FALSE",
            "questionId": questionid5gen,
            "fieldTypeName": "Link"
          }
        ],
        "tagline": "Test 1 Survey",
        "ctaLabel": "Take the Survey",
        "surveyFillTime": ""
      }
    }
  
    var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
    surveyid_duplicate = (response.body.data.surveyId)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);
  
  });


  it.only('Answer Survey questions : POST /api/v2/survey/save', async () => {

    const survey_details =
    {
      "payload": {
        "data": {
          "surveyId": surveyid1,
          "surveyType": "GENERAL",
          "answer": [
            1
          ],
          "answerOther": "",
          "questionId": questionid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
    expect(response.body.success.message).to.equal("Answer saved!")
    expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
    expect(response.body.success.data.answerCount).to.equal(1)
});

it.only('Verify partially filled general survey response count in survey list : GET /api/v1/survey/list', async () => {

  const survey_list=
  {"data":{"filter":{}}}
  var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'limit': 10 }, 'post', survey_list)
  expect(response.body.data[5].resposneCount).to.equal(1);
  expect(response.body.data[5].questionCount).to.equal(5);
});

it.only('Answer Second Question of Survey : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid1,
        "surveyType": "GENERAL",
        "answer": [
          5
        ],
        "answerOther": "",
        "questionId": questionid2gen
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
  expect(response.body.success.data.answerCount).to.equal(2)
});

it.only('Answer third question of survey : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid1,
        "surveyType": "GENERAL",
        "answer": [
          "This is Answer of Test Question"
        ],
        "answerOther": "",
        "questionId": questionid3gen
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
  expect(response.body.success.data.answerCount).to.equal(3)
});

it.only('Upload image in Survey: POST /api/v2/get-signed-url', async () => {

  const get_signed_url ={
    "payload": {
      "data": {
        "extension": "png",
        "contentType": "image/png",
        "uploadType": "SURVEY_ANSWER_IMAGE"
      }
    }
  }
  
  var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
  global.upload_url_survey = (response.body.success.data.urlLists[0].uploadURL)
  global.Entry_survey_file = (response.body.success.data.urlLists[0].fileName);
});

it.only('Upload image to aws upload url', function(done){
  const req = require('supertest')
  var awsHost = 'https://' + global.upload_url_survey.split('/')[2]
  var awsUploadUrl = global.upload_url_survey.substr(awsHost.length)
  const fs = require('fs')
  let testImage = './images_branding/event_LOGO.png'
  req(awsHost).put(awsUploadUrl)
  .set('Content-Type','image/png')
  .send(fs.readFileSync(testImage))
  .end((err, response) => {
      expect(response.status).to.equal(200);
      done();
  });
});

it.only('Answer fourth question of survey : POST /api/v2/survey/save', async () => {
var  uploadurl = global.upload_url_survey
var locat = uploadurl.split('?')[0]
var location = locat.split('/survey/')[1]

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid1,
        "surveyType": "GENERAL",
        "answer": {
          "name": global.Entry_contest_file,
          "location": `https://cdn.v2qat.demohubilo.com/survey/${location}`
        },
        "answerOther": "",
        "questionId": questionid4gen
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
  expect(response.body.success.data.answerCount).to.equal(4)
});

it.only('Answer fifth question of survey : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid1,
        "surveyType": "GENERAL",
        "answer": [
          "https://hubilo.com/"
        ],
        "answerOther": "",
        "questionId": questionid5gen
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("COMPLETED")
  expect(response.body.success.data.answerCount).to.equal(5)
});



it.only('Answer Survey questions with other attendee : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid1,
        "surveyType": "GENERAL",
        "answer": [
          2
        ],
        "answerOther": "",
        "questionId": questionid1
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': global.accesstoken_survey_participant, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
});


it.only('Check the status of Survey in list after answer : POST /api/v2/survey/list', async () => {

  const survey_list =
  {
    "payload": {
      "data": {
        "surveyType": "GENERAL",
        "currentPage": 0,
        "limit": 10
      }
    }
  }

  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/list', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource }, 'post', survey_list)
  expect(response.body.success.data.surveys[3].surveyName).to.equal("Take the Survey")
  expect(response.body.success.data.surveys[3].responseType).to.equal("COMPLETED")
});


it.only('Get Survey response list and Verify Survey answers : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
    { "data": { "filter": {} } }

  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1 }, 'post', survey_search)
  survey_response_id = (response.body.data.response[0].id)
  expect(response.body.total_count).to.equal(2);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("surveytest@mailinator.com");
  expect(response.body.data.response[1].user.email).to.equal("clown26@yopmail.com");
});

it.only('Filter Survey response with descending order list : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
    { "data": { "filter": {} } }

  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'order':'desc', 'sort':'name' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(2);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
  expect(response.body.data.response[1].user.email).to.equal("surveytest@mailinator.com");
 
});


it.only('Filter Survey response with ascending order list : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
    { "data": { "filter": {} } }

  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'order':'asc', 'sort':'name' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(2);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("surveytest@mailinator.com");
  expect(response.body.data.response[1].user.email).to.equal("clown26@yopmail.com");
 
});

it.only('Export Survey response : POST /api/v1/surveyresponse/exports', async () => {

  const survey_export =
  {
    "data": {
      "email_ids": [
        "clown26@yopmail.com"
      ]
    }
  }

  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/exports', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1 }, 'post', survey_export)
  expect(response.body.message).to.equal(Responsemessages.Parameter_survey_response_export_message);
});

it.only('Search Survey response by email : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'clown26@yopmail.com' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by partial email : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'clown26@' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by upper case email : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'CLOWN26@YOPMAIL.COM' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by inverse case email : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'ClOwN26@YoPmAiL.CoM' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by wrong email : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'wrongemail@yopmail.com' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(0);
});

it.only('Search Survey response by name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'Joker Clown' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by partial name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'Joker' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by upper case name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'JOKER CLOWN' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by lower case name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'joker clown' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by inverse case name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'JoKeR ClOwN' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data.surveyName).to.equal("Take the Survey");
  expect(response.body.data.surveyType).to.equal("GENERAL");
  expect(response.body.data.response[0].user.email).to.equal("clown26@yopmail.com");
});

it.only('Search Survey response by wrong name : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {}
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1, 'search': 'invalid name' }, 'post', survey_search)
  expect(response.body.total_count).to.equal(0);
});


it.only('Delete Survey response : POST /api/v1/surveyresponse/delete', async () => {

  const delete_survey =
  {
    "data": {
      "surveyResIds": [
        survey_response_id
      ],
      "isDeleteAll": "NO"
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid1}, 'post', delete_survey)
  expect(response.body.message).to.equal(Responsemessages.Parameter_survey_response_deleted_message);
});

it.only('Verify survey Response count should be updated after deletion of response : GET /api/v1/survey/list', async () => {

  const survey_list=
  {"data":{"filter":{}}}
  var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_list)
  expect(response.body.data.map(survey => survey.surveyName)).to.include("Take the Survey")
  expect(response.body.data.map(survey => survey.surveyStatus)).to.include("VISIBLE")
  expect(response.body.data.map(survey => survey.surveyType)).to.include("GENERAL")
  expect(response.body.data[0].resposneCount).to.equal(0);
});


it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {

  const session10 = {
    "data": {
      "end_date": nextWeek,
      "start_date": todayDate
    }
  }

  var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'Authorization' : 'Bearer ' + process.env.eToken},'post',session10);
  expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
});


it.only('Create a session : POST /backend/api/v2/events/agendas', async () => {
       var session = new Session();
        var sessionEndTime = (addTime(new Date(), 1)).getTime()
        var sessionStartTime = new Date().getTime()
        sessionid1= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Survey Session','', '', 'Survey Session Description', sessionStartTime, sessionEndTime)
});


it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid1,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://www.youtube.com/watch?v=RpxiptFOg5k","https://www.youtube.com/watch?v=RpxiptFOg5k",1)
});



it.only('Get unmapped session list : POST /api/v1/survey/unmappedSession/list', async () => {

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/unmappedSession/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
   sessionid_survey = (response.body.data[0].id)
});


it.only('Add a session survey which is visible to attendee group : POST /api/v1/survey/create', async () => {

  const survey_add =
  {
    "data": {
      "surveyName": "The Session Survey",
      "surveyType": "SESSION",
      "isSessionAll": "FALSE",
      "sessionId": [
        sessionid_survey
      ],
      "surveyVisibleGroups": [
        global.attendeegroup
      ],
      "surveyStatus": "VISIBLE",
      "surveyQuestions": [
        {
          "fieldName": "This is Session Survey Question",
          "initialState": "PLACEHOLDER",
          "initialStateDesc": "",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "isRequired": "YES",
          "properties": {
            "length": {
              "min": 1,
              "max": 50
            },
            "is_number": 0
          },
          "hasOptions": "NO",
          "options": [],
          "selectedOptions": [],
          "isRating": "NO",
          "showIsRequired": "YES",
          "fieldHelpOptions": [
            "TOOLTIP",
            "DESCRIPTION"
          ],
          "initialStateOptions": [
            "PLACEHOLDER",
            "DEFAULT VALUE"
          ],
          "surveyFieldType": 1,
          "fieldTypeName": "Text",
          "_id": 92
        },
        {
          "fieldName": "This is Rating Question",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "isRequired": "YES",
          "properties": {},
          "hasOptions": "NO",
          "options": [],
          "selectedOptions": [],
          "isRating": "YES",
          "showIsRequired": "YES",
          "fieldHelpOptions": [
            "TOOLTIP",
            "DESCRIPTION"
          ],
          "ratingMax": 5,
          "ratingMin": 1,
          "ratingIcons": [],
          "selectedRatingIcon": "STAR",
          "surveyFieldType": 11,
          "fieldTypeName": "Rating",
          "_id": 73
        }
      ],
      "tagline": "This is Session Survey",
      "ctaLabel": "Take the Survey"
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
  surveyid_session = (response.body.data.surveyId)
  expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

});

it.only('Verify attendee is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey.isSurveyCompleted).to.equal(false)
  expect(response.body.success.data.survey.title).to.equal("The Session Survey")
});

it.only('Verify speaker is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey).to.equal(null)
});

it.only('Verify booth member is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey).to.equal(null)
});


it.only('Get survey question id : GET /api/v1/survey/id', async () => {

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/id', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid, 'surveyid': surveyid_session }, 'get')
  session_survey_questionid = (response.body.data.surveyQuestions[0].questionId)
  session_survey_questionid1 = (response.body.data.surveyQuestions[1].questionId)

});


it.only('Update a session survey with visible to all groups : POST /api/v1/survey/edit', async () => {

  const survey_add =
  {
    "data": {
      "surveyName": "The Session Survey Updated",
      "surveyType": "SESSION",
      "isSessionAll": "FALSE",
      "sessionId": [
        sessionid_survey
      ],
      "surveyVisibleGroups": [
        global.attendeegroup, global.speakergroup, global.boothmembergroup
      ],
      "surveyStatus": "VISIBLE",
      "surveyQuestions": [
        {
          "isDefault": "NO",
          "defaultQuestionId": "",
          "isActive": "YES",
          "isDeleted": "NO",
          "resposneCount": 0,
          "event_id": process.env.eventid,
          "organiser_id": environment.HOrganiserId,
          "surveyFieldType": 1,
          "fieldName": "This is Session Survey Question",
          "initialState": "PLACEHOLDER",
          "initialStateDesc": "",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "showIsRequired": "YES",
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
          "position": 1,
          "isDisabledOptions": "NO",
          "disabledOptionsMsg": "",
          "showIsShow": "YES",
          "isShow": "YES",
          "isRating": "NO",
          "ratingMin": 0,
          "ratingMax": 0,
          "createdAtMilli": new Date().getTime(),
          "loacalCreatedAt": new Date(),
          "__v": 0,
          "surveyId": surveyid_session,
          "hasResponse": "TRUE",
          "questionId": session_survey_questionid,
          "fieldTypeName": "Text"
        },
        {
          "isDefault": "NO",
          "defaultQuestionId": "",
          "isActive": "YES",
          "isDeleted": "NO",
          "resposneCount": 0,
          "event_id": process.env.eventid,
          "organiser_id": environment.HOrganiserId,
          "surveyFieldType": 11,
          "fieldName": "This is Rating Question",
          "initialState": "PLACEHOLDER",
          "initialStateDesc": "",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "showIsRequired": "YES",
          "isRequired": "YES",
          "hasOptions": "NO",
          "options": [],
          "selectedOptions": [],
          "position": 2,
          "isDisabledOptions": "NO",
          "disabledOptionsMsg": "",
          "showIsShow": "YES",
          "isShow": "YES",
          "isRating": "YES",
          "ratingMin": 1,
          "ratingMax": 5,
          "selectedRatingIcon": "STAR",
          "createdAtMilli": new Date().getTime(),
          "loacalCreatedAt": new Date(),
          "__v": 0,
          "surveyId": surveyid_session,
          "hasResponse": "FALSE",
          "questionId": session_survey_questionid1,
          "fieldTypeName": "Rating"
        }
      ],
      "tagline": "This is Session Survey Updated",
      "ctaLabel": "Take the Survey",
      "surveyId": surveyid_session
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/survey/edit', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)

});

it.only('Verify attendee is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey.isSurveyCompleted).to.equal(false)
  expect(response.body.success.data.survey.title).to.equal("The Session Survey Updated")
});

it.only('Verify speaker is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenspeakeruser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey.isSurveyCompleted).to.equal(false)
  expect(response.body.success.data.survey.title).to.equal("The Session Survey Updated")
});

it.only('Verify booth member is able to access the survey : POST /api/v2/sessions/live-agenda/get', async () => {

  const survey_list =
  {"payload":{"data":{"agenda_id":sessionid1,"is_stream":true}}}
  var response = await sendRequest(environment.baseURL3, '/api/v2/sessions/live-agenda/get', { 'Authorization': global.accesstokenboothuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', survey_list)
  expect(response.body.success.data.survey.isSurveyCompleted).to.equal(false)
  expect(response.body.success.data.survey.title).to.equal("The Session Survey Updated")
});



it.only('Get survey question id : GET /api/v1/survey/id', async () => {

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/id', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid, 'surveyid': surveyid_session }, 'get')
  session_survey_questionid = (response.body.data.surveyQuestions[0].questionId)
  session_survey_questionid1 = (response.body.data.surveyQuestions[1].questionId)

});

it.only('Answer session Survey questions : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid_session,
        "moduleId": sessionid1,
        "surveyType": "SESSION",
        "answer": "This is Good Question",
        "answerOther": "",
        "questionId": session_survey_questionid
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
});


it.only('Answer session Survey second questions : POST /api/v2/survey/save', async () => {

  const survey_details =
  {
    "payload": {
      "data": {
        "surveyId": surveyid_session,
        "moduleId": sessionid1,
        "surveyType": "SESSION",
        "answer": 5,
        "answerOther": "",
        "questionId": session_survey_questionid1
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource}, 'post', survey_details)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("COMPLETED")
});

it.only('Filter Survey with survey type as session : POST /api/v1/survey/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {
        "surveyTypes": [
          "SESSION"
        ],
        "surveyStatus": []
      }
    }
  }

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data[0].surveyName).to.equal('The Session Survey Updated');
  expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
  expect(response.body.data[0].surveyType).to.equal('SESSION');
});


it.only('Filter Survey with survey type as session and status as visible : POST /api/v1/survey/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {
        "surveyTypes": [
          "SESSION"
        ],
        "surveyStatus": [
          "VISIBLE"
        ]
      }
    }
  }

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
  expect(response.body.total_count).to.equal(1);
  expect(response.body.data[0].surveyName).to.equal('The Session Survey Updated');
  expect(response.body.data[0].surveyStatus).to.equal('VISIBLE');
  expect(response.body.data[0].surveyType).to.equal('SESSION');
});

it.only('Filter Survey with survey type as session and status as hidden : POST /api/v1/survey/list', async () => {

  const survey_search =
  {
    "data": {
      "filter": {
        "surveyTypes": [
          "SESSION"
        ],
        "surveyStatus": [
          "HIDDEN"
        ]
      }
    }
  }

  var response = await sendRequest(environment.baseURL, '/api/v1/survey/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', survey_search)
  expect(response.body.total_count).to.equal(0);
});

it.only('Answer session survey questions with other attendee : POST /api/v2/survey/save', async () => {

  const survey_answer =
  {
    "payload": {
      "data": {
        "surveyId": surveyid_session,
        "moduleId": sessionid1,
        "surveyType": "SESSION",
        "answer": "This is Good Question",
        "answerOther": "",
        "questionId": session_survey_questionid
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': global.accesstoken_survey_participant, 'source': environment.HSource}, 'post', survey_answer)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("PARTIAL")
});


it.only('Answer session Survey second questions with other attendee: POST /api/v2/survey/save', async () => {

  const survey_answer =
  {
    "payload": {
      "data": {
        "surveyId": surveyid_session,
        "moduleId": sessionid1,
        "surveyType": "SESSION",
        "answer": 5,
        "answerOther": "",
        "questionId": session_survey_questionid1
      }
    }
  }
  var response = await sendRequest(environment.baseURL3, '/api/v2/survey/save', { 'Authorization': global.accesstoken_survey_participant, 'source': environment.HSource}, 'post', survey_answer)
  expect(response.body.success.message).to.equal("Answer saved!")
  expect(response.body.success.data.surveyResponseType).to.equal("COMPLETED")
});


it.only('Get Session Survey response list and Verify Session Survey answers : POST /api/v1/surveyresponse/list', async () => {

  const survey_search =
    { "data": { "filter": {} } }

  var response = await sendRequest(environment.baseURL, '/api/v1/surveyresponse/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'surveyid': surveyid_session }, 'post', survey_search)
  survey_response_id = (response.body.data.response[0].id)
  expect(response.body.total_count).to.equal(2);
  expect(response.body.data.surveyName).to.equal("The Session Survey Updated");
  expect(response.body.data.surveyType).to.equal("SESSION");
  expect(response.body.data.response[0].user.email).to.equal("surveytest@mailinator.com");
  expect(response.body.data.response[1].user.email).to.equal("clown26@yopmail.com");
});

it.only('Create a first session one to check map multiple sessions with a single survey : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 1)).getTime()
   var sessionStartTime = new Date().getTime()
   sessionid_one= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Survey Session one','', '', 'Survey Session Description', sessionStartTime, sessionEndTime)
});

it.only('Create a second session two to check map multiple sessions with a single survey : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 1)).getTime()
   var sessionStartTime = new Date().getTime()
   sessionid_two= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Survey Session','', '', 'Survey Session Description', sessionStartTime, sessionEndTime)
});

it.only('Create a third session to check map multiple sessions with a single survey : POST /backend/api/v2/events/agendas', async () => {
  var session = new Session();
   var sessionEndTime = (addTime(new Date(), 1)).getTime()
   var sessionStartTime = new Date().getTime()
    sessionid_three= await session.createSessionAndVerify(organizerUserHeader(), process.env.eventid, 'Survey Session','', '', 'Survey Session Description', sessionStartTime, sessionEndTime)
});
it.only('Update session stream settings for sesion one with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

var session = new Session();
await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_one,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://www.youtube.com/watch?v=RpxiptFOg5k","https://www.youtube.com/watch?v=RpxiptFOg5k",1)
});

it.only('Update session stream settings for sesion two with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_two,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://www.youtube.com/watch?v=RpxiptFOg5k","https://www.youtube.com/watch?v=RpxiptFOg5k",1)
  });
  
  
it.only('Update session stream settings for sesion two with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {

  var session = new Session();
  await session.updateSessionStreamSettings(organizerUserHeader(), process.env.eventid,sessionid_three,"[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]",0,1,"https://www.youtube.com/watch?v=RpxiptFOg5k","https://www.youtube.com/watch?v=RpxiptFOg5k",1)
  });

it.only('Get unmapped session list : POST /api/v1/survey/unmappedSession/list', async () => {

var response = await sendRequest(environment.baseURL, '/api/v1/survey/unmappedSession/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
sessionid_survey = (response.body.data[0].id)
sessionid_survey2 = (response.body.data[1].id)
sessionid_survey3 = (response.body.data[2].id)
});


it.only('Verify if an organizer should be able to map multiple sessions with a single survey : POST /api/v1/survey/create', async () => {

  const survey_add =
  {
    "data": {
      "surveyName": "The Session Survey",
      "surveyType": "SESSION",
      "isSessionAll": "FALSE",
      "sessionId": [
        sessionid_survey,sessionid_survey2,sessionid_survey3
      ],
      "surveyVisibleGroups": [
        global.attendeegroup
      ],
      "surveyStatus": "VISIBLE",
      "surveyQuestions": [
        {
          "fieldName": "This is Session Survey Question",
          "initialState": "PLACEHOLDER",
          "initialStateDesc": "",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "isRequired": "YES",
          "properties": {
            "length": {
              "min": 1,
              "max": 50
            },
            "is_number": 0
          },
          "hasOptions": "NO",
          "options": [],
          "selectedOptions": [],
          "isRating": "NO",
          "showIsRequired": "YES",
          "fieldHelpOptions": [
            "TOOLTIP",
            "DESCRIPTION"
          ],
          "initialStateOptions": [
            "PLACEHOLDER",
            "DEFAULT VALUE"
          ],
          "surveyFieldType": 1,
          "fieldTypeName": "Text",
          "_id": 92
        },
        {
          "fieldName": "This is Rating Question",
          "fieldHelp": "TOOLTIP",
          "fieldHelpDesc": "",
          "isRequired": "YES",
          "properties": {},
          "hasOptions": "NO",
          "options": [],
          "selectedOptions": [],
          "isRating": "YES",
          "showIsRequired": "YES",
          "fieldHelpOptions": [
            "TOOLTIP",
            "DESCRIPTION"
          ],
          "ratingMax": 5,
          "ratingMin": 1,
          "ratingIcons": [],
          "selectedRatingIcon": "STAR",
          "surveyFieldType": 11,
          "fieldTypeName": "Rating",
          "_id": 73
        }
      ],
      "tagline": "This is Session Survey",
      "ctaLabel": "Take the Survey"
    }
  }
  var response = await sendRequest(environment.baseURL, '/api/v1/survey/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', survey_add)
  surveyid_session = (response.body.data.surveyId)
  expect(response.body.message).to.equal(Responsemessages.Parameter_survey_successfull_message);

});

  it.only('Downlaod/Export Survey : POST /api/v1/survey/downloadFile', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/downloadFile', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post')
     global.export_filename = (response.body.data.file)
  });

  it.only('Delete Survey : POST /api/v1/survey/delete', async () => {
    const delete_survey =
      { "data": { "surveyIds": [surveyid1], "isDeleteAll": "NO" } }

    var response = await sendRequest(environment.baseURL, '/api/v1/survey/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete_survey)
    expect(response.body.message).to.equal(Responsemessages.Parameter_survey_deleted_message);
  });

  it.only('Delete user created for survey purpose : POST /backend/api/v2/people/delete', async () => {
    const delete1 =
    {
        "data": {

            "ids": [peopleid1],
            "is_all": 0

        }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventId': process.env.eventid }, 'post', delete1)
            expect(response.body.message).to.equal(Responsemessages.Parameter_people_deleted_message);
        });


        it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

          var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : sessionid_one},'post')
          expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
        });

        it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

          var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : sessionid_two},'post')
          expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
        });
      
        it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {

          var response = await sendRequest(environment.baseURL1,'/backend/api/v2/agendas/delete',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken,'agendaid' : sessionid_three},'post')
          expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_post_deleted_message);
        });
      

});
