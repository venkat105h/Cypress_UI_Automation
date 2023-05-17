/*
Author: Biswajit Pattanaik
Description: This script will be used to test free trial user.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 21st October 2021 05:45 PM
Description: Adding more cases for branding and lounge
Modified: Biswajit Pattanaik 30th November 2021 07:30 PM
Description: Plan name assertion in get /auth api changed from FREE_PLAN to free
*/
import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
//import { consolelog, sendRequest, addDays,  } from '../../helper/CommonUtil'
import { Events, People, ComunitySignupLogin, Session, Notifications, Rooms, addTime, addDays, comunityUserHeader, freeTrialUserHeader, headers3, consolelog, emailaddress, sendRequest, getValueFromJsonObject} from '../../helper/CommonUtil'
import { head } from 'superagent';
require('dotenv').config();
var fs = require('fs');
var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');
var imageAsBase64_FaviconBIG_File = fs.readFileSync('./images_branding/icon_developer_icon.png', 'base64');
var faker = require('faker');

var eventUrl
var eventId
var eventId1
var eventId2
var attendeeId1
var attendeeId2
var attendeeId3
var peopleidList = []
var attendeegroup
var boothmembergroup
var speakergroup
var speakerId1
var speakerId2
var ticketid1
var ticketid2
var ticketid3
var ticketid4
var trackid
var sessionid1
var sessionid2
var meetingnewid
var sessionStartTime
var sessionEndTime
var notificationObj
var approvedid
var ProfileViewid
var Messageid
var MeetingStatusid
var AdminPostid
var AdminPollid
var SessionRegistrationid
var Meetingreminderid
var Sessionreminderid
var SessionGoLiveid
var contestid1
var contestid2
var contestid3
var contestid4
var contestid5
var imageid1
var roomid1
var roomid2
var roomid3
var roomid4
var roomid5
var virtualboothid1
var virtualboothid2
var virtualboothid3
var virtualboothids = []
var created_group_id
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
var team_member_userid
var URL
var V2_URL
var V2_INDEX_URL
var V2_COVER_IMAGES_0
var V2_COVER_IMAGES_1
var V2_COVER_IMAGES_2
var V2_COVER_IMAGES_3
var V2_COVER_IMAGES_4
var V2_COVER_IMAGES_5
var Favicon_FileName
var random_First_Vanity_BankAccountIBAN
var Video_FileName
var Primary_Color
var Accent_Color
var Font_Color
var Secondary_Font_Color
var Main_Background_Color
var tableId
var tableId_4_capacity
var ExhibitorstableId




var virtual10 = {
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
      "position": 0,
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

  const virtualBoothMakePremium = {
    "data": {
      "is_premium": true,
      "is_manage_profile": true,
      "is_add_team_members": true,
      "team_members_limit": 10,
      "is_show_analytics": false
    }
  }

  const virtualBoothMakePremiumWithAnalytics = {
    "data": {
      "is_premium": true,
      "is_manage_profile": true,
      "is_add_team_members": true,
      "team_members_limit": 10,
      "is_show_analytics": true
    }
  }

  const virtualBoothRevertPremium = {
    "data": {
      "is_premium": false,
      "is_manage_profile": false,
      "is_add_team_members": false,
      "team_members_limit": 10,
      "is_show_analytics": false
    }
  }

const AttendeeLoungedata =
{
    "data":
    {
        "capacity": "2",
        "exhibitors": "",
        "lounge_image": "",
        "meeting_limit": "",
        "name": "Test Lounge",
        "priority": "1",
        "table_type": "ATTENDEE",
        "topic": "This is Test Lounge"

    }
};


describe('Free trial user signup and accessibility', () => {
    beforeEach(function (done) {
        setTimeout(function(){
              done()
          }, environment.HTestDelay);
    });
    it.only('signup as a free trial user', async () => {
        var timestampMiliSeconds = new Date().getTime();
        var organizerEmail = 'freeTrialUser' + timestampMiliSeconds + "@yopmail.com";
        var userSignupDto = {
            "data": {
              "email": organizerEmail,
              "firstName": "TestFname" + timestampMiliSeconds,
              "lastName": "TestLname" + timestampMiliSeconds,
              "password": "Test@1234",
              "organisation": "Hubilo",
              "captchaResponse": "",
              "lastUrl": ""
            }
          }
          global.organizerEmail = organizerEmail
          global.organizerPassword = "Test@1234"
          var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', {'Content-Type' : 'application/json'}, 'post', userSignupDto)
          global.FreeTrialUserToken = (response.body.data.token);
          global.FreeTrialOrganizerId = (response.body.data.userData.id)
          expect(response.body.data.userData.email).to.equal(organizerEmail)
    });

    it.only('get countries list : GET /api/v1/countries-industries/list', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/countries-industries/list', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'buildversion': process.env.buildversion }, 'get')
        global.CountryId = getValueFromJsonObject(response.body, '$.countries[?(@.name=="India")].id')
    });

    it.only('Free trial user onboarding : POST /api/v1/auth/collectonboardingdetails', async () => {
        var onboardingDtoDetails = {
            "data": {
              "annualEvents": "5 - 15",
              "industry": "Event Management Company",
              "avgAttendeeCount": "1 - 500",
              "countryId": global.CountryId,
              "countryName": "India"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/auth/collectonboardingdetails', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'buildversion': process.env.buildversion }, 'post', onboardingDtoDetails)
        expect(response.body.status).to.equal(200)
    });

    it.only('Get authentication details and verify permissions : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.planName).to.equal('free')
        expect(response.body.data.maximumEventDays).to.equal(3)
        expect(response.body.data.totalAttendeeCredit).to.equal(25)
        expect(response.body.data.usedAttendeeCredit).to.equal(0)
        expect(response.body.data.totalVirtualBoothCredit).to.equal(10)
        expect(response.body.data.usedVirtualBoothCredit).to.equal(0)
        expect(response.body.data.totalConcurrentSessionCredit).to.equal(1)
        expect(response.body.data.usedConcurrentSessionCredit).to.equal(0)
        expect(response.body.data.totalAdminMemberCredit).to.equal(1)
        expect(response.body.data.usedAdminMemberCredit).to.equal(0)
        expect(response.body.data.is_sponsored_ads_support).to.equal(1);
        expect(response.body.data.userPermission.canManageAllEvents).to.equal(1);
        expect(response.body.data.userPermission.canManageTeamMembers).to.equal(1);
        expect(response.body.data.userPermission.canManagePayout).to.equal(1);
        expect(response.body.data.userPermission.canExport).to.equal(1);
        expect(response.body.data.userPermission.isEventAdmin).to.equal(1);
        expect(response.body.data.userPermission.canManageAllSections).to.equal(1);
    });

    it.only('Logout from dashboard : GET /backend/api/v2/auth/logout', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/logout', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.message).to.equal(Responsemessages.Parameters_dashboard_logout_message)
    });

    it.only('Login to dashboard with username and password : POST /backend/api/v2/auth/login', async () => {
        
        // global.organizerEmail = "freeTrialUser1634036551566@yopmail.com"
        // global.organizerPassword = "Test@1234"
        // global.FreeTrialOrganizerId = 359273

        // freeTrialUser1633581657732@yopmail.com / 400329

        console.log(global.organizerEmail)
        console.log(global.FreeTrialOrganizerId)
        const login1 =
    
        {
            "data": {
            "captchaToken": "",
            "email": global.organizerEmail,
            "password": global.organizerPassword
    
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
        global.FreeTrialUserToken = (response.body.data.token);
        expect(response.body.data.userData.email).to.equal(global.organizerEmail)
    });

    it.only('Create new event everytime : POST /backend/api/v2/events', async ()=>{
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        eventId = await event.createEventOnDashboard(freeTrialUserHeader(), 'FreeUserTrial', 'new', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
    })

    it.only('Get events list verify event added: GET  /backend/api/v2/events/list', async () => {
        var event = new Events();
        var eventsList = await event.getEventsListOnDashboard(freeTrialUserHeader())
        expect(eventsList.ongoing_count).to.equal(1)
        expect(eventsList.ongoing_events[0].name).to.be.a('string').and.satisfy(str => str.startsWith('FreeUserTrial'))
    });

    it.only('Change settings for restrict access off & default code 1234: PUT /backend/api/v2/events/settings/login', async () => {
        var event = new Events();
        await event.eventRestrictOffAddCustomOtp(freeTrialUserHeader(), eventId, '1234')
    });

    it.only('Make event live: POST /api/v1/event/livestatus/update', async () => {
        var event = new Events();
        eventUrl = await event.makeEventGoLive(freeTrialUserHeader(), eventId)
    });

    it.only('Create another event : POST /backend/api/v2/events', async ()=>{
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        var description = "<ul>\n<li><span style=\"text-decoration: underline; font-size: 24pt;\"><em><strong>new</strong></em></span></li>\n</ul>"
        eventId1 = await event.createEventOnDashboard(freeTrialUserHeader(), 'New Event', description, startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
    })

    it.only('Verify the new event added to dashboard: GET  /backend/api/v2/events/list', async () => {
        var event = new Events();
        var eventsList = await event.getEventsListOnDashboard(freeTrialUserHeader())
        expect(eventsList.ongoing_count).to.equal(2)
        expect(eventsList.ongoing_events[1].name).to.be.a('string').and.satisfy(str => str.startsWith('New Event'))
    });

    it.only('Update the new event : PUT /backend/api/v2/events/basicinfo', async () => {
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 3)).getTime()
        await event.updateEventOnDashboard(freeTrialUserHeader(), eventId1, 'New Event updated', '', startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
    });

    it.only('Add  an 7 day long event : POST /backend/api/v2/events', async ()=>{
        var event = new Events();
        var startDate = new Date().getTime()
        var endDate = (addDays(new Date(), 7)).getTime()
        var description = "<ul>\n<li><span style=\"text-decoration: underline; font-size: 24pt;\"><em><strong>new</strong></em></span></li>\n</ul>"
        eventId2 = await event.createEventOnDashboard(freeTrialUserHeader(), 'New Event 4 days', description, startDate, endDate, 94, 'https://instagram.com', 'https://linkedin.com', 'https://twitter.com', 'https://google.com') 
    })

    it.only('Verify event count: GET  /backend/api/v2/events/list', async () => {
        var event = new Events();
        var eventsList = await event.getEventsListOnDashboard(freeTrialUserHeader())
        expect(eventsList.ongoing_count).to.equal(2, '4 day long events are getting added')
    });

    it.only('Delete 2nd new event : POST /backend/api/v2/events/delete', async () => {
        var event = new Events();
        event.deleteEvent(freeTrialUserHeader(),eventId2)
    });

    //Community Login check

    it.only('Load login page : POST /api/v2/platformNew/web-state-new', async () => {
        var signup = new ComunitySignupLogin();
        global.accessTokenLoginPage = await signup.getNewWebstate(eventUrl)
    });
    
    it.only('Signup a new user (clown26@yopmail.com) : POST api/v2/users/signup', async () => {
        var signup = new ComunitySignupLogin();
        global.accesstokenclown26user = await signup.signupAndVerify(global.accessTokenLoginPage, 'clown26@yopmail.com', 'joker', 'clown', 'Test@1234')
    });


    it.only('Step 1 :- Onboarding with personal details : POST /api/v2/users/on-board', async () => {

        const onbording1 = {
            "payload": {
                "data": {

                    "groupValueArray": {},
                    "industry": "Technical",
                    "userProfileFields": {},
                    "designation": "clown designation is ceo",
                    "organisation_name": "clown organisation is world",
                }
            }
        }
        var signup = new ComunitySignupLogin();
        await signup.onboarding(global.accesstokenclown26user, onbording1)
    });

    it.only('Step 2 :- Onboarding with cover image : POST /api/v2/users/on-board', async () => {

        const onBoarding2 = {
            "payload": {
                "data": {
                    "cover_image": "n-cover-1.png",
                    "cover_image_type": "CUSTOM"
                }
            }
        }
        var signup = new ComunitySignupLogin();
        await signup.onboarding(global.accesstokenclown26user, onBoarding2)
    });

    it.only('Step 3 :- Onboarding with social profile connections : POST /api/v2/users/on-board', async () => {

        const onBoarding3 = {
            "payload": {
                "data": {
                    "facebook_url": "https://facebook.com",
                    "groupValueArray": {},
                    "instagramLink": "https://instagram.com",
                    "linkdin_url": "https://linkedin.com",
                    "twitter_url": "https://twitter.com",
                    "userProfileFields": {},
                    "website": "https://hubilo.com/"
                }
            }
        }
        var signup = new ComunitySignupLogin();
        await signup.onboarding(global.accesstokenclown26user, onBoarding3)
    });

    it.only('Step 4 :- Onboarding with looking & offering : POST /api/v2/users/on-board', async () => {

        const onBoarding4 = {
            "payload": {
                "data": {
                    "lookingfor": "Accountant",
                    "offering": "Designer"
                }
            }
        }
        var signup = new ComunitySignupLogin();
        await signup.onboarding(global.accesstokenclown26user, onBoarding4)
    });

    it.only('Step 5 :- Onboarding with interests : POST /api/v2/users/on-board', async () => {

        const onBoarding5 = {
            "payload": {
                "data": {
                    "intrests": ["Accounting", "Advertising", "Agriculture", "Banking", "Biotech"],
                    "isBoardingComplete": true
                }
            }
        }
        var signup = new ComunitySignupLogin();
        await signup.onboarding(global.accesstokenclown26user, onBoarding5)

    });

    it.only('Check if user (clown26@yopmail.com) is registered: POST /api/v2/users/check-email', async () => {

        const checkmail = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "is_otp_login": false
                }
            }
        }

        headers3["Authorization"] = global.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.success.data.is_password).to.equal(true)
        expect(response.body.success.data.is_register).to.equal(true)

    });

    it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', async () => {
        var signup = new ComunitySignupLogin();
        global.accesstokenloginuser = await signup.loginWithUsernameAndPassword(global.accessTokenLoginPage, 'clown26@yopmail.com', 'Test@1234')
    });

    //

    it.only('Get group list of people : GET /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'buildversion': process.env.buildversion, 'eventId': eventId }, 'get')
        attendeegroup = (response.body.data[0].id)
        boothmembergroup = (response.body.data[1].id)
        speakergroup = (response.body.data[2].id)
    });

    it.only('Add a single attendee with mandatory parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        attendeeId1 = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'asii9s0s@gmail.com', 'gaurav', 'thappar', [attendeegroup])
    })

    it.only('Add a single attendee with all parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        attendeeId2 = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'ga823ndmc@gmail.com', 'gaurav', 'rao', [attendeegroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [])
    })

    it.only('Get attendee on dashboard: POST /api/v1/people/list', async () => {
        var people = new  People();
        var peopleList = await people.getPeopleList(freeTrialUserHeader(), eventId);
        expect(peopleList.data[0].email).to.equal('ga823ndmc@gmail.com')
        expect(peopleList.data[1].email).to.equal('asii9s0s@gmail.com')
        ticketid1 = (peopleList.data[0].userId)
        ticketid2 = (peopleList.data[1].userId)
    });

    it.only('Update attendee with mandatory params: PUT /backend/api/v2/people/single/edit', async () => {
        var people = new People()
        await people.updateSingleAttendee(freeTrialUserHeader(), eventId, attendeeId1, 'asii9s0s@gmail.com', 'gaurav updated', 'thappar updated', [attendeegroup], '', '', 'Consulting', '')
    })

    it.only('Update attendee with all params: PUT /backend/api/v2/people/single/edit', async () => {
        var people = new People()
        await people.updateSingleAttendee(freeTrialUserHeader(), eventId, attendeeId2, 'ga823ndmc@gmail.com', 'gaurav updated 2', 'rao updated 2', [attendeegroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', [])
    })

    it.only('Add 22 attendee with all parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        var id;
        for (let i=1;i<=22;i++){
            id  = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'asii9s0s'+ i +'@gmail.com', 'gaurav', 'thappar', [attendeegroup])
            peopleidList.push(id);
        }
    })

    it.only('Verify user registration limit reached : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedAttendeeCredit).to.equal(25)
    });
    
    it.only('Add 25th attendee with all parameters and verify the failure due to registration limit: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        var response  = await people.addSingleAttendee(freeTrialUserHeader(), eventId, 'ga823ndmc25thuser@gmail.com', 'gaurav', 'rao', [attendeegroup], 'accountant', 'testing', 'accounting', 'accounting', '', true, true, 0, [], '9988887777', '91', []) 
        expect(response.body.message).to.equal(Responsemessages.Parameter_people_credit_exchaust_message)
    })

    it.only('Signup a new user (clown29@yopmail.com) and verify credit exhaust failure : POST api/v2/users/signup', async () => {
        var signup = new ComunitySignupLogin();
        var response = await signup.signup(global.accessTokenLoginPage, 'clown29@yopmail.com', 'joker', 'clown', 'Test@1234')
        expect(response.body.status).to.equal(false)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_signup_newUser_failed_message)
        expect(response.body.error.errorStack.message).to.equal(Responsemessages.Parameter_people_credit_exchaust_message)
    });

    it.only('Delete Added Attendee: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        var response  = await people.deleteAddedAttendee(freeTrialUserHeader(), eventId, peopleidList)
    })

    it.only('Verify user registration credit used : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedAttendeeCredit).to.equal(3)
    });

    it.only('Add another attendee with all parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        attendeeId3  = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'testanotheruser@gmail.com', 'gaurav', 'thappar', [attendeegroup]) 
    })

    it.only('login to community using otp for the new user (testanotheruser@gmail.com): POST /api/v2/users/login', async () => {
        var signup = new ComunitySignupLogin();
        var response = await signup.loginWithOtp(global.accessTokenLoginPage, 'testanotheruser@gmail.com', '1234')
    })

    it.only('Delete Added Attendee3: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        var response  = await people.deleteAddedAttendee(freeTrialUserHeader(), eventId, [attendeeId3])
    })

    it.only('Verify user registration limit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedAttendeeCredit).to.equal(4)
    });

    //Speaker

    it.only('Add a single speaker with mandatory parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        speakerId1 = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'clown30@gmail.com', 'vicky', 'mehta', [speakergroup])
    })

    it.only('Add a single speaker with all parameters: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        speakerId2 = await people.addSingleAttendeeAndVerify(freeTrialUserHeader(), eventId, 'clo2n31@gmail.com', 'rajesh', 'sharma', [speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '3971_5650_662620001619006566.png', true, true, 0, [], '9988887777', '91', [])
    })

    it.only('Get speaker on dashboard: POST /api/v1/people/list', async () => {
        var people = new  People();
        var peopleList = await people.getPeopleList(freeTrialUserHeader(), eventId);
        expect(peopleList.data[0].email).to.equal('clo2n31@gmail.com')
        expect(peopleList.data[1].email).to.equal('clown30@gmail.com')
        ticketid1 = (peopleList.data[0].userId)
        ticketid2 = (peopleList.data[1].userId)
    });

    it.only('Update speaker with mandatory params: PUT /backend/api/v2/people/single/edit', async () => {
        var people = new People()
        await people.updateSingleAttendee(freeTrialUserHeader(), eventId, speakerId1, 'clown30@gmail.com', 'vicky updated', 'mehta updated', [speakergroup])
    })

    it.only('Update speaker with all params: PUT /backend/api/v2/people/single/edit', async () => {
        var people = new People()
        await people.updateSingleAttendee(freeTrialUserHeader(), eventId, speakerId2, 'clo2n31@gmail.com', 'rajesh updated', 'sharma updated', [speakergroup], 'accountant', 'testing', 'accounting', 'accounting', '3971_5650_662620001619006566.png', true, true, 0, [], '9988887777', '91', [])
    })

    it.only('Delete Added speaker: POST /backend/api/v2/people/single', async () => {
        var people = new People();
        var response  = await people.deleteAddedAttendee(freeTrialUserHeader(), eventId, [speakerId1, speakerId2])
    })

    it.only('Get people list on dashboard: POST /api/v1/people/list', async () => {
        var people = new  People();
        var peopleList = await people.getPeopleList(freeTrialUserHeader(), eventId);
        ticketid1 = (peopleList.data[0].userId)
        ticketid2 = (peopleList.data[1].userId)
    });

    it.only('Create meeting in dashboard : POST /backend/api/v2/meetings/schedule', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const people1000 = {
            "data": {

                "is_send_confirmation_mail": "0",
                "meeting_description": "catch up now urgent",
                "meeting_time": (addTime(new Date(), 0.1)).getTime(),
                "participant1": ticketid1,
                "participant2": ticketid2
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/schedule', headers, 'post', people1000)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_scheduled_message)
    });

    it.only('Get meeting list on dashboard: POST /backend/api/v2/meetings/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['limit'] = environment.HLimit
        headers['page'] = environment.HPage
        const getmeetingdash = {
            "data": {
                "filter": {}
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/list', headers, 'post', getmeetingdash)
        meetingnewid = (response.body.data[0]._id)
    });

    it.only('Delete meeting on dashboard : POST /backend/api/v2/meetings/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const delete1meet =
        {
            "data": {
                "filter": {},
                "is_all": 0,
                "meeting_ids": [meetingnewid],
                "search": ""
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/meetings/delete', headers, 'post', delete1meet)
        expect(response.body.message).to.equal(Responsemessages.Parameter_meeting_delete_message);
    });

    //POST AGENDA DAYS

    it.only('Add Tracks in Session :- POST backend/api/v2/events/session/tracks/add', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const addtracks = {
          "data":
          {
            "name": "TRACK7",
            "color_code": "#e0e0e0"
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/session/tracks/add', headers, 'post', addtracks)
        trackid = (response.body.data.id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Track_Add)
        expect(response.body.data.name).to.equal('TRACK7')
    });
    
    //POST AGENDAS

    
    it.only('Add agenda days : POST /backend/api/v2/events/agendadays', async () => {
        var now = new Date();
        var nextWeek = addDays(now, 3).toISOString().slice(0, 10);
        var todayDate = new Date().toISOString().slice(0, 10);
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const session10 = {
          "data": {
            "end_date": nextWeek,
            "start_date": todayDate
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agendadays', headers,'post',session10);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_agenda_post_successfully_message);
    });

    it.only('Session creation with mandatory parameters : POST /backend/api/v2/events/agendas', async () => {
        var session = new Session();
        sessionEndTime = (addTime(new Date(), 1)).getTime()
        sessionStartTime = new Date().getTime()
        sessionid1= await session.createSessionAndVerify(freeTrialUserHeader(), eventId, 'tiger session 1', trackid, '', '', sessionStartTime, sessionEndTime)
    });

    it.only('Session creation with all parameters : POST /backend/api/v2/events/agendas', async () => {
        var session = new Session();
        var endTimeMilis = (addTime(new Date(), 2)).getTime()
        var startTimeMilis = (addTime(new Date(), 1)).getTime()
        var description = "<ul>\n<li><span style=\"font-size: 10pt;\"><em><strong><span style=\"text-decoration: underline;\">new description</span></strong></em></span></li>\n</ul>"
        sessionid2 = await session.createSessionAndVerify(freeTrialUserHeader(), eventId, 'lion session', trackid, '', description, startTimeMilis, endTimeMilis)
    });
    
    it.only('Verify concurrent session limit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedConcurrentSessionCredit).to.equal(1)
    });

    it.only('Concurrent Session creation with all parameters, verify failure : POST /backend/api/v2/events/agendas', async () => {
        var session = new Session();
        var endTimeMilis = (addTime(new Date(), 2)).getTime()
        var startTimeMilis = (addTime(new Date(), 1)).getTime()
        var description = "<ul>\n<li><span style=\"font-size: 10pt;\"><em><strong><span style=\"text-decoration: underline;\">new description</span></strong></em></span></li>\n</ul>"
        var response = await session.createSession(freeTrialUserHeader(), eventId, 'lion session 1', trackid, '', description, startTimeMilis, endTimeMilis)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Concurrent_session_exhausted_message)
    });

    it.only('Overlapping Session creation with all parameters, verify failure : POST /backend/api/v2/events/agendas', async () => {
        var session = new Session();
        var endTimeMilis = (addTime(new Date(), 2.5)).getTime()
        var startTimeMilis = (addTime(new Date(), 1.5)).getTime()
        var description = "<ul>\n<li><span style=\"font-size: 10pt;\"><em><strong><span style=\"text-decoration: underline;\">new description</span></strong></em></span></li>\n</ul>"
        var response = await session.createSession(freeTrialUserHeader(), eventId, 'lion session 1', trackid, '', description, startTimeMilis, endTimeMilis)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Concurrent_session_exhausted_message)
    });

    it.only('Update session stream settings for sesion with mandatory parameters : POST /backend/api/v2/agendas/stream', async () => {
        var hosting_properties = "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]"
        var stream_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
        var stream_recording_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
        var session = new Session();
        var response = await session.updateSessionStreamSettings(freeTrialUserHeader(), eventId, sessionid1, hosting_properties, 0, 1, stream_link, stream_recording_link, 1)
        expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    });

    it.only('Update session stream settings for sesion with all parameters : POST /backend/api/v2/agendas/stream', async () => {
        var hosting_properties = "[{\"type\":\"LIVE_CHAT\",\"name\":\"CHAT\",\"isActive\":\"YES\"},{\"type\":\"QUESTION_AND_ANSWERS\",\"name\":\"Q & A\",\"isActive\":\"YES\"},{\"type\":\"LIVE_POLLS\",\"name\":\"POLLS\",\"isActive\":\"YES\"},{\"type\":\"ATTENDEE_LIST\",\"name\":\"ATTENDEES\",\"isActive\":\"NO\"},{\"type\":\"SESSIONS\",\"name\":\"SESSIONS\",\"isActive\":\"NO\"}]"
        var stream_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
        var stream_recording_link = "https://www.youtube.com/watch?v=RpxiptFOg5k"
        var session = new Session();
        var response = await session.updateSessionStreamSettings(freeTrialUserHeader(), eventId, sessionid2, hosting_properties, 0, 1, stream_link, stream_recording_link, 1)
        expect(response.body.data.stream_link).to.equal('https://www.youtube.com/watch?v=RpxiptFOg5k')
    });

    it.only('Update basic settings with custom tags for session with all params : PUT /backend/api/v2/events/agenda/basic', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['agendaId'] = sessionid1
        const customupdate =
        {
          "data": {
            "agenda_track_id": trackid,
            "banner": "",
            "booths": [],
            "description": "<p>tetst</p>",
            "end_time_milli": sessionEndTime,
            "is_featured": 1,
            "is_rating": 1,
            "multiple_file": [],
            "name": "tiger session 1",
            "speakers": [],
            "start_time_milli": sessionStartTime,
            "tags": "tag,virtual booth,first"
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/basic', headers, 'put', customupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
    });
    
    it.only('Update session advanced settings : PUT /backend/api/v2/events/agenda/advanced', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['agendaId'] = sessionid1
        const session122 =
        {
          "data": {
            "access_file_name": "",
            "access_real_file_name": "",
            "custom_iframe_btn_label": "",
            "custom_iframe_code": "",
            "emails": [],
            "groups": [],
            "interpretation_service_meta_id": 1,
            "interpretation_service_token_link": "",
            "is_apply_all": 0,
            "is_attendee_registration": 0,
            "is_custom_iframe": 0,
            "is_language_interpretation": 0,
            "is_let_unregister": 1,
            "is_registration_end_on_session_start": 1,
            "is_registration_start_immidiately": 1,
            "is_registration_status_open": 1,
            "is_restricted": 0,
            "is_waitlist_after_limit": 0,
            "is_waitlist_registration": 0,
            "registration_end_time_milli": "",
            "registration_limit": "",
            "registration_start_time_milli": ""
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/agenda/advanced', headers, 'put', session122);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sessions_Setting_Update);
    });

    it.only('Get session attendees settings : GET /backend/api/v2/events/attendees', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['agendaId'] = sessionid1
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/attendees', headers, 'get');
    });

    it.only('Get Sessions : GET /backend/api/v2/events/agendas', async () => {
        var session = new Session();
        var sessionList = await session.getSessionsList(freeTrialUserHeader(), eventId)
        expect(sessionList.agendaList[0].name).to.equal('tiger session 1');
        expect(sessionList.agendaList[1].name).to.equal('lion session');
        ticketid1 = (sessionList.agendaList[0].id)
        ticketid2 = (sessionList.agendaList[1].id)
    });

    it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {
        var session = new Session();
        session.deleteSession(freeTrialUserHeader(), eventId, ticketid1)
    });

    it.only('Delete Session : POST /backend/api/v2/agendas/delete', async () => {
        var session = new Session();
        session.deleteSession(freeTrialUserHeader(), eventId, ticketid2)
    });

    //Notification

    
    it.only('Get notification settings in dashboard : GET /backend/api/v2/events/settings/notification', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/notification', headers, 'get')
        ProfileViewid = (response.body.data[0].id)
        Messageid = (response.body.data[1].id)
        MeetingStatusid = (response.body.data[2].id)
        AdminPostid = (response.body.data[3].id)
        AdminPollid = (response.body.data[4].id)
        SessionRegistrationid = (response.body.data[5].id)
        Meetingreminderid = (response.body.data[6].id)
        Sessionreminderid = (response.body.data[7].id)
        SessionGoLiveid = (response.body.data[8].id)
        notificationObj = new Notifications([ProfileViewid, Messageid, MeetingStatusid, AdminPostid, AdminPollid, SessionRegistrationid, Meetingreminderid, Sessionreminderid, SessionGoLiveid]);
    });

    it.only('Update profile views in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, ProfileViewid, 'is_in_app', 0);
    });

    it.only('Update message in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, Messageid, 'is_in_app', 0);
    });

    it.only('Update meeting status in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, MeetingStatusid, 'is_in_app', 0);
    });

    it.only('Update admin post in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, AdminPostid, 'is_in_app', 0);
    });

    it.only('Update admin poll in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, AdminPollid, 'is_in_app', 0);
    });

    it.only('Update Session registration in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, SessionRegistrationid, 'is_in_app', 0);
    });

    it.only('Update meeting reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, Meetingreminderid, 'is_in_app', 0);
    });

    it.only('Update session reminder in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, Sessionreminderid, 'is_in_app', 0);
    });

    it.only('Update Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, SessionGoLiveid, 'is_in_app', 0);
    });

    it.only('Update profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, SessionGoLiveid, 'is_email', 0);
    });

    it.only('Update message email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, Messageid, 'is_email', 0);
    });

    it.only('Update meeting status email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, MeetingStatusid, 'is_email', 0);
    });

    it.only('Update Session registration email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, MeetingStatusid, 'is_email', 0);
    });

    it.only('Update Meeting reminder email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationSetting(freeTrialUserHeader(), eventId, Meetingreminderid, 'is_email', 0);
    });

    it.only('Update Meeting reminder,profile view email notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        await notificationObj.updateNotificationsSetting(freeTrialUserHeader(), eventId, [{"id": ProfileViewid, "type": "is_email", "value": 0},{"id": Meetingreminderid, "type": "is_email", "value": 0}]);
    });

    it.only('Update Message,Admin post,Meeting reminder,Session go live in_app notifications to 0 : PUT /backend/api/v2/events/settings/notification', async () => {
        var jsonDto = [
            {"id": Messageid, "type": "is_in_app", "value": 0},
        {"id": AdminPostid, "type": "is_in_app", "value": 0},
        {"id": Meetingreminderid, "type": "is_in_app", "value": 0},
        {"id": SessionGoLiveid, "type": "is_in_app", "value": 0}
    ]
        await notificationObj.updateNotificationsSetting(freeTrialUserHeader(), eventId, jsonDto);
    });

    it.only('Update Message,Meeting reminder in_app & email notifications to 0: PUT /backend/api/v2/events/settings/notification', async () => {
        var jsonDto = [
        {"id": Messageid, "type": "is_in_app", "value": 0},
        {"id": Meetingreminderid, "type": "is_in_app", "value": 0},
        {"id": Meetingreminderid, "type": "is_email", "value": 0},
        {"id": Messageid, "type": "is_email", "value": 0}
    ]
        await notificationObj.updateNotificationsSetting(freeTrialUserHeader(), eventId, jsonDto);
    });

    //Contents

    it.only('Create a Entry contest on dashbaord: POST /api/v1/contest/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest1 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', headers, 'post', contest1)
        contestid1 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Create a Quiz contest on dashboard: POST /api/v1/contest/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest2 =

        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "multipleFile": [],
                "numberOfWinner": 10,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', headers, 'post', contest2)
        contestid2 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('This will create a Entry contest on dashboard with all params :-  : POST /api/v1/contest/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest3 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 1",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    },

                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": true,
                "isMultipleEntries": true,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": true
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', headers, 'post', contest3)
        contestid3 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

  
    it.only('This will create a Quiz contest on dashboard with all params :-  : POST /api/v1/contest/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest4 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 1",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    },

                ],
                "multipleFile": [],
                "numberOfWinner": 100,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/create', headers, 'post', contest4)
        contestid4 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Add Question in quiz contest :-  : POST /api/v1/contest/que/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest4 =
        {
            "data": {
                "pollQuestion": "Test 1",
                "pollStartMilli": new Date().getTime(),
                "pollEndMilli": (addTime(new Date(), 1)).getTime(),
                "contestId": contestid4,
                "contestType": "QUIZ",
                "options": ["test 1", "rest 2"],
                "answer": "test 1"
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/que/create', headers, 'post', contest4)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_Question_successfull_message);
    });

    it.only('Update Entry contests on dashbaord: POST /api/v1/contest/edit', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['contest_id'] = contestid1
        const contest11 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 1 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": false,
                "isMultipleEntries": false,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": true,
                    "video": false
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', headers, 'post', contest11)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update quiz contest on dashboard: POST /api/v1/contest/edit', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['contest_id'] = contestid2
        const contest12 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 1 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "multipleFile": [],
                "numberOfWinner": 101,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', headers, 'post', contest12)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update entry contest on dashboard with all params: POST /api/v1/contest/edit', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['contest_id'] = contestid3
        const contest13 =
        {
            "data": {
                "contestType": "ENTRY",
                "contestName": "Entry contest 2 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "isAttachmentMandatory": true,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "isModerateEntries": true,
                "isMultipleEntries": true,
                "maxChar": 100,
                "minChar": 0,
                "multipleFile": [],
                "postSupportedAttachement": {
                    "image": false,
                    "video": true
                },
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', headers, 'post', contest13)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Update Quiz contest on dashboard with all params : POST /api/v1/contest/edit', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['contest_id'] = contestid4
        const contest14 =
        {
            "data": {
                "contestType": "QUIZ",
                "contestName": "Quiz contest 2 updated",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    },
                ],
                "multipleFile": [],
                "numberOfWinner": 10,
                "rules": ""
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/contest/edit', headers, 'post', contest14)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_updated_message);
    });

    it.only('Get contest list which are created above in dashbaord: POST /api/v1/contest/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['page'] = environment.HPage
        const contest15 =
        {
            "data": {
                "status": "ONGOING"
            }
        }
        

        var response = await sendRequest(environment.baseURL, '/api/v1/contest/list', headers, 'post', contest15);
        ticketid1 = (response.body.data.feed_count[0]._id)
        ticketid2 = (response.body.data.feed_count[1]._id)
        ticketid3 = (response.body.data.feed_count[2]._id)
        ticketid4 = (response.body.data.feed_count[3]._id)
    });

    it.only('Image Response Contest upload : POST /backend/api/v2/events/uploads', (done) => {
        const request = require('supertest');
        request(environment.baseURL1)
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', global.FreeTrialOrganizerId)
            .set('eventId', eventId)
            .set('Authorization', 'Bearer ' + global.FreeTrialUserToken)
            .field('Content-Type', 'multipart/form-data')
            .field('location', 'contestImage')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                imageid1 = (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Create a Response contest on dashbaord: POST /api/v1/contest/create', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest1 =
        {
            "data": {
                "contestType": "RESPONSE",
                "contestName": "Test Response Contest",
                "startMili": new Date().getTime(),
                "endMili": (addTime(new Date(), 1)).getTime(),
                "rules": "", "multipleFile": [],
                "banner": "",
                "groups": [
                    {
                        "name": "Attendee",
                        "isMain": "YES",
                        "type": "ATTENDEE",
                        "id": attendeegroup
                    }
                ],
                "caption": "This is Test Response",
                "content": imageid1,
                "maxChar": 100,
                "minChar": 0,
                "isMultipleEntries": false,
                "isModerateEntries": false,
                "isAttendeeCanComment": true,
                "isAttendeeCanSee": true,
                "width": 1919,
                "height": 996
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/create',headers,'post',contest1)
        contestid5 = (response.body.data.contestId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_contest_successfull_message);
    });

    it.only('Delete 1st contest : POST /api/v1/contest/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest16 =
        {
            "data": {
                "contestId": ticketid1
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',headers,'post',contest16);
    });

    it.only('Delete 2nd contest : POST /api/v1/contest/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest16 =
        {
            "data": {
                "contestId": ticketid2
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',headers,'post',contest16);
    });

    it.only('Delete 3rd contest : POST /api/v1/contest/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest16 =
        {
            "data": {
                "contestId": ticketid3
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',headers,'post',contest16);
    });

    it.only('Delete 4th contest : POST /api/v1/contest/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest16 =
        {
            "data": {
                "contestId": ticketid4
            }
        }

        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete',headers,'post',contest16);
    });

    it.only('Delete 5th contest : POST /api/v1/contest/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const contest16 =
        {
            "data": {
                "contestId": contestid5
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/contest/delete', headers,'post',contest16);
    });

    //Rooms

    it.only('Add a single room : POST /api/v1/rooms/add', async () => {
        var room = new Rooms('Test Single Room', 'room', 'SINGLE', 'ANYONE')
        await room.createRoom(freeTrialUserHeader(), eventId)
    });

    it.only('Add a coded room : POST /api/v1/rooms/add', async () => {
        var room = new Rooms('Test Room New Multiple', 'Test Room Multiple', 'MULTIPLE', 'CODED')
        await room.createRoom(freeTrialUserHeader(), eventId, {'roomCode':'1234'})
    });

    it.only('Add a single room Anyone to Moderator : POST /api/v1/rooms/add', async () => {
        var room = new Rooms('Anyone to Moderator', 'Test', 'SINGLE', 'ANYONE')
        await room.createRoom(freeTrialUserHeader(), eventId, {'shareAVPermission':'MODERATED', 'avAcceptPermissionUsers': [attendeeId1] })
    });

    it.only('Create a Room Specific Group to Anyone : POST /api/v1/rooms/add', async () => {
        var room = new Rooms('Specific Group Anyone', 'Test Specific Group', 'SINGLE', 'GROUPS')
        await room.createRoom(freeTrialUserHeader(), eventId, {'joinPermissionGroups': [attendeegroup] })
    });

    it.only('Create a Private Room : POST /api/v1/rooms/add', async () => {
        var room = new Rooms('Test Private Room', 'Test Private Room', 'SINGLE', 'HIDDEN')
        await room.createRoom(freeTrialUserHeader(), eventId, {'avAcceptPermissionUsers': [attendeeId2, attendeeId3] })
    });

    it.only('This will get the rooms on dashboard: POST /api/v1/rooms/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const RoomGet1 =
        {
            "data": {
                "filter": {}
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/rooms/list', headers, 'post', RoomGet1)
        expect(response.body.data).to.not.be.null;
        roomid1 = (response.body.data[0]._id)
        roomid2 = (response.body.data[1]._id)
        roomid3 = (response.body.data[2]._id)
        roomid4 = (response.body.data[3]._id)
        roomid5 = (response.body.data[4]._id)
    });

    it.only('Filter Room with room purpose as single in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, 'SINGLE',[],[])
        expect(response.body.total_count).to.equal(4)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].joinPermission).to.equal('HIDDEN')
        expect(response.body.data[3].name).to.equal('Test Single Room')
        expect(response.body.data[3].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room with room purpose as multiple in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, 'MULTIPLE',[],[])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Room New Multiple')
        expect(response.body.data[0].roomType).to.equal('MULTIPLE')
    });

    it.only('Filter Room by Anyone to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, '',['ANYONE'],['ANYONE'])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Single Room')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room by Anyone to Moderator in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, '',['ANYONE'],['MODERATED'])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room by Specific group to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, '',['GROUPS'],['ANYONE'])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Specific Group Anyone')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('GROUPS')
    });

    it.only('Filter Room by coded to Anyone in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, '',['CODED'],['ANYONE'])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Room New Multiple')
        expect(response.body.data[0].shareAVPermission).to.equal('ANYONE')
        expect(response.body.data[0].joinPermission).to.equal('CODED')
    });

    it.only('Filter Room by Private to Moderator in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, '',['HIDDEN'],['ANYONE','MODERATED'])
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].joinPermission).to.equal('HIDDEN')
    });

    it.only('Filter Room Type as Single and Join permission as Anyone in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, 'SINGLE',['ANYONE'],[])
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data[0].name).to.equal('Anyone to Moderator')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].roomType).to.equal('SINGLE')
        expect(response.body.data[0].joinPermission).to.equal('ANYONE')
    });

    it.only('Filter Room Type as Single and Share AV permission as Moderator in dashbaord: POST /api/v1/rooms/list', async () => {
        var response = await Rooms.filterRooms(freeTrialUserHeader(), eventId, 'SINGLE',[],['MODERATED'])
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data[0].name).to.equal('Test Private Room')
        expect(response.body.data[0].shareAVPermission).to.equal('MODERATOR')
        expect(response.body.data[0].roomType).to.equal('SINGLE')
        expect(response.body.data[1].shareAVPermission).to.equal('MODERATOR')
    });

    it.only('Delete Rooms : POST /api/v1/rooms/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const RoomDelete =
        {
            "data": {
                "is_all": 0,
                "roomId": [roomid1, roomid2, roomid3, roomid4, roomid5]
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v1/rooms/delete', headers, 'post', RoomDelete)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Room_post_delete_message);
    });

    //Virtual booth

    it.only('Pdf upload: POST /backend/api/v2/events/uploads', (done) => {
        const request = require('supertest');
        request(environment.baseURL1)
          .post('/backend/api/v2/events/uploads')
          .set('organiserId', global.FreeTrialOrganizerId)
          .set('eventId', eventId)
          .set('buildversion', process.env.buildversion)
          .set('Authorization', 'Bearer ' + global.FreeTrialUserToken)
          // .type('multipart/form-data')
          .field('module_name', 'file')
          .field('location', 'brochure')
          .field('type', 'file')
          .attach('data', './config/sample-pdf-file.pdf')
          .end((err, response) => {
            expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_file_upload_message);
            process.env.VBfile_name = (response.body.data.file_name)
            done();
          });
    });
    
      //POST VIRTUAL BOOTH
    
    it.only('single booth add now : POST /backend/api/v2/events/booth/add', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add', headers, 'post', virtual10)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message)
        virtualboothid1 = (response.body.data.ids.exhibitor_id)
    });

    it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
              "multiple_file": [{ "filename": process.env.VBfile_name, "format": "pdf", "real_filename": "sample-pdf-file.pdf" }],
              "name": "test updated",
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
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', headers,'post',virtual11)
        virtualboothid2 = (response.body.data.ids.exhibitor_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    });

    it.only('Update single booth : PUT /backend/api/v2/events/booth/basic', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid1
        const virtual12 = {
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
            "multiple_file": [{ "filename": process.env.VBfile_name, "format": "pdf", "real_filename": "sample-pdf-file.pdf" }],
            "name": "test updated 1",
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
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic', headers, 'put', virtual12)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
    });

    it.only('Update single booth all params: PUT /backend/api/v2/events/booth/basic', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid2
        virtual10.data['name'] = 'test updated 2'
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic', headers, 'put', virtual10)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
    });

    it.only('Verify virtual booth used credit to be 0 : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(0)
    });

    it.only('Update booth settings make it premium with analytics disabled: PUT /backend/api/v2/events/booth/premium/settings', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid1
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothMakePremium)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message);
    });

    it.only('Verify virtual booth used credit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(0)
    });

    it.only('Update booth settings make it premium with analytics enabled: PUT /backend/api/v2/events/booth/premium/settings', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid1
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothMakePremiumWithAnalytics)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message);
    });

    it.only('Verify virtual booth used credit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(1)
    });

    it.only('Update booth settings make it premium with analytics enabled: PUT /backend/api/v2/events/booth/premium/settings', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid2
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothMakePremiumWithAnalytics)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message);
    });

    it.only('Verify virtual booth used credit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(2)
    });

    it.only('Filter Virtual Booth by size in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
        const virtual_Booth_Filter = { "data": { "filter": { "category": "", "booth_size": "Large" } } }
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', headers, 'post', virtual_Booth_Filter)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('test updated 1')
        expect(response.body.data[0].booth_size).to.equal('LARGE')
    });

    it.only('Filter Virtual Booth by Premium Booth as On in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const virtual_Booth_Filter ={ "data": { "filter": { "category": "", "booth_size": "", "is_premium": 1 } } }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', headers, 'post', virtual_Booth_Filter)
        expect(response.body.total_count).to.equal(2)
        expect(response.body.data[0].name).to.equal('test updated 1')
        expect(response.body.data[0].booth_size).to.equal('LARGE')
        expect(response.body.data[0].is_premium).to.equal(1)
    });

    it.only('Search Virtual Booth by name in dashbaord: POST /backend/api/v2/events/booth/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['search'] = 'test updated 1'
        const virtual_Booth_search = {"data":{"filter": {}}}
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', headers, 'post', virtual_Booth_search)
        expect(response.body.total_count).to.equal(1)
        expect(response.body.data[0].name).to.equal('test updated 1')
        expect(response.body.data[0].booth_size).to.equal('LARGE')
        expect(response.body.data[0].is_premium).to.equal(1)
      });

    it.only('Add 8 premium booths', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        for(var i=1;i<=8;i++){
            virtual10.data['name'] = 'test booth ' + i;
            var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add', headers, 'post', virtual10)
            expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message)
            virtualboothids.push(response.body.data.ids.exhibitor_id)
        }
        for(var i=0;i<virtualboothids.length;i++){
            headers['boothid'] = virtualboothids[i]
            var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothMakePremiumWithAnalytics)
            expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
        }
    });

    it.only('Verify virtual booth used credit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(10)
    });

    it.only('single booth add and verify booth credit exhausted : POST /backend/api/v2/events/booth/add', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        virtual10.data['name'] = 'test booth 11'
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', headers, 'post', virtual10)
        //expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message)
        virtualboothid3 = (response.body.data.ids.exhibitor_id)
    });

    it.only('Update booth settings make it premium with analytics enabled and verify booth credit exhausted error: PUT /backend/api/v2/events/booth/premium/settings', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['boothid'] = virtualboothid3
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothMakePremiumWithAnalytics)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Virtualbooth_Credit_Exchausted_Message);
    });

    it.only('Remove 8 booths premium previliges', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        for(var i=0;i<virtualboothids.length;i++){
            headers['boothid'] = virtualboothids[i]
            var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/premium/settings', headers, 'put', virtualBoothRevertPremium)
            expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
        }
    });

    it.only('Verify virtual booth used credit to be 10 : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedVirtualBoothCredit).to.equal(10)
    });

    it.only('Delete all virtuabooths : POST /backend/api/v2/events/booth/delete', async () => {
        virtualboothids = virtualboothids.concat([virtualboothid2, virtualboothid3])
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const delete1 =
        {
          "data": {
    
            "booth_ids": virtualboothids,
            "is_all": 0
    
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/delete', headers, 'post', delete1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
    });

    //Setting Group

    it.only('Add new group : POST /backend/api/v2/events/groups', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const newgroup =
        {
          "data": {
            "name": "Test Group",
            "group_id": attendeegroup 
          }
        }
        console.log(newgroup)
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups', headers, 'post', newgroup)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_add_message)  
        created_group_id = (response.body.data.group_id)
    })

    it.only('Verify new group in setting  : POST /backend/api/v2/events/settings/groups', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', headers, 'get')
        expect(response.body.data.groupsList[3].name).to.equal('Test Group')
        expect(response.body.data.groupsList[3].type).to.equal('ATTENDEE')
        expect(response.body.data.groupsList[3].isCustom).to.equal('YES')
    })


    it.only('Verify new group in people  : POST /backend/api/v2/people/groups/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', headers, 'get')
        expect(response.body.data[3].name).to.equal('Test Group')
        expect(response.body.data[3].isMain).to.equal('NO')
        expect(response.body.data[3].type).to.equal('ATTENDEE')
        expect(response.body.total_count).to.equal(4)
    })

    it.only('Delete new group in setting  : POST /backend/api/v2/events/groups/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['groupid'] = created_group_id
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/delete', headers, 'post')
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_delete_message)  
    })

    it.only('Verify new group in people after delete  : POST /backend/api/v2/people/groups/list', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', headers, 'get')
        expect(response.body.total_count).to.equal(3)
    })

    //ProfileFields

    it.only('Get user profile fields : GET /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers,'get')
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

    it.only('Update gender as mandatory, display = true & show in editprofile with mandatory flag true: PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = gender_id
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
              "selectedOptions": [
                "Male"
              ],
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
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
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', genderupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify gender updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[0].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[0].fieldName).to.equal('Gender')
    });

    it.only('Update about as mandatory, display = true & show in editprofile with mandatory flag true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = about_id
        const aboutupdate1 = {
          "data": {
            "_id": about_id,
            "fieldName": "About",
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
            "isRequiredInCommunity": "YES",
            "communityGroups": "All",
            "isAllCommunityGroups": "YES",
            "isUseInTicketing": "NO",
            "isRequiredInTicketing": "NO",
            "ticketingGroups": [],
            "isAllTicketingGroups": "NO",
            "ticketsMappedWithGroups": [],
            "isAllTicketsMappedWithGroups": "NO",
            "icon": "",
            "icon_name": "about",
            "isTicketFlowNonEditable": "NO",
            "showIsUseInTicketing": "YES",
            "isCommunityFlowNonEditable": "NO",
            "userFiledType": "Text Area"
          }
        }
        var response = await sendRequest( environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'put', aboutupdate1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify About updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[1].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[1].fieldName).to.equal('About')
    });

    it.only('Update designation as mandatory, display = true & show in editprofile with mandatory flag true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = designation_id
        const designationupdate1 = {
          "data": {
            "_id": designation_id,
            "fieldName": "Designation",
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
            "icon": "",
            "icon_name": "jobTitle",
            "isTicketFlowNonEditable": "NO",
            "showIsUseInTicketing": "YES",
            "isCommunityFlowNonEditable": "NO",
            "userFiledType": "Text"
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', designationupdate1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify designation updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[2].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[2].fieldName).to.equal('Designation')
    });

    it.only('Update organisation as mandatory, display = true & show in editprofile with mandatory flag true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = organisation_id
        const organisationupdate1 = {
          "data": {
            "_id": organisation_id,
            "fieldName": "Organisation",
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
            "icon": "",
            "icon_name": "organisation",
            "isTicketFlowNonEditable": "NO",
            "showIsUseInTicketing": "YES",
            "isCommunityFlowNonEditable": "NO",
            "userFiledType": "Text"
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', organisationupdate1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify Organization updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[3].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[3].fieldName).to.equal('Organisation')
    });

    it.only('Update country field as mandatory, display = true & show in editprofile with mandatory flag true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = country_id
        const countryupdate1 = {
          "data": {
            "_id": country_id,
            "fieldName": "Country",
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
            "icon": "",
            "icon_name": "country",
            "isTicketFlowNonEditable": "NO",
            "showIsUseInTicketing": "YES",
            "isCommunityFlowNonEditable": "NO",
            "userFiledType": "Dropdown"
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', countryupdate1)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify country updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[4].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[4].fieldName).to.equal('Country')
    });

    it.only('Update state field as mandatory, display = true & show in editprofile with mandatory flag true :- PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = state_id
        const stateupdate = {
          "data": {
            "_id": state_id,
            "fieldName": "State",
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
            "isRequiredInCommunity": "YES",
            "communityGroups": "All",
            "isAllCommunityGroups": "YES",
            "isUseInTicketing": "NO",
            "isRequiredInTicketing": "NO",
            "ticketingGroups": [],
            "isAllTicketingGroups": "NO",
            "ticketsMappedWithGroups": [],
            "isAllTicketsMappedWithGroups": "NO",
            "icon": "",
            "icon_name": "default",
            "isTicketFlowNonEditable": "NO",
            "showIsUseInTicketing": "YES",
            "isCommunityFlowNonEditable": "NO",
            "userFiledType": "Dropdown"
          }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', stateupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify state updated value for mandtory and display on dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers =freeTrialUserHeader();
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[5].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[5].fieldName).to.equal('State')
    });

    it.only('Update facebook link field with mandatory, display field to others, show in editprofile with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = facebook_id
        const facebookUpdate = {
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
              "icon_name": "facebook",
              "isTicketFlowNonEditable": "NO",
              "showIsUseInTicketing": "YES",
              "isCommunityFlowNonEditable": "NO",
              "userFiledType": "Link"
            }
        }
       var response = await sendRequest (environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers,'put',facebookUpdate)
       expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify facebook field with mandatory as true on dashboard: GET /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[8].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[8].fieldName).to.equal('Facebook Link')
    });
    

    it.only('Update website field with mandatory, display field to others, show in editprofile with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = website_id
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
              "icon_name": "default",
              "isTicketFlowNonEditable": "NO",
              "showIsUseInTicketing": "YES",
              "isCommunityFlowNonEditable": "NO",
              "userFiledType": "Link"
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers,'put',websiteupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify Website field with mandatory as true on dashboard: GET /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[7].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[7].fieldName).to.equal('Website')
      });

    it.only('Update linkedin link field with mandatory, display field to others, show in editprofile with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = linkedin_id
        const updateLinkedin = {
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
              "icon_name": "linkedIn",
              "isTicketFlowNonEditable": "NO",
              "showIsUseInTicketing": "YES",
              "isCommunityFlowNonEditable": "NO",
              "userFiledType": "Link"
            }
          }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', updateLinkedin)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify linkedin field with mandatory flag as true on dashboard: GET /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[9].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[9].fieldName).to.equal('Linkedin Link')
      });


    it.only('Update twitter link field with mandatory, display field to others, show in editprofile with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = twitter_id
        const updateTwitter = {
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
              "icon_name": "twitter",
              "isTicketFlowNonEditable": "NO",
              "showIsUseInTicketing": "YES",
              "isCommunityFlowNonEditable": "NO",
              "userFiledType": "Link"
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', updateTwitter)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify twitter field with mandatory flag as true on dashboard: GET /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[10].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[10].fieldName).to.equal('Twitter Link')
    });

    it.only('Update instagram link field with mandatory, display field to others, show in editprofile with mandatory flag as true : PUT /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['fieldid'] = instagram_id
        const instagramUpdate = {
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
              "isRequiredInCommunity": "YES",
              "communityGroups": "All",
              "isAllCommunityGroups": "YES",
              "isUseInTicketing": "NO",
              "isRequiredInTicketing": "NO",
              "ticketingGroups": [],
              "isAllTicketingGroups": "NO",
              "ticketsMappedWithGroups": [],
              "isAllTicketsMappedWithGroups": "NO",
              "icon": "",
              "icon_name": "instagram",
              "isTicketFlowNonEditable": "NO",
              "showIsUseInTicketing": "YES",
              "isCommunityFlowNonEditable": "NO",
              "userFiledType": "Link"
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/settings/userprofile', headers, 'put', instagramUpdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_profilefield_settings_updated_message)
    });

    it.only('Verify instagram field with mandatory flag as true on dashboard: GET /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.default_fields[11].isRequired).to.equal('YES')
        expect(response.body.data.default_fields[11].fieldName).to.equal('Instagram Link')
    });

    it.only('Add a new field - Hobby with field type text, mandatory flag as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "user_profile_field_type": 1,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', hobbyupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        hobbyid = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify Hobby with field type text after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[0].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[0].fieldName).to.equal('Hobby')
        expect(response.body.data.custom_fields[0].user_profile_field_type).to.equal(1)
    });

    it.only('Add a new field - Painting with field type text area, mandatory flag as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "user_profile_field_type": 2,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', paintingupdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        paintingid = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify Painting with field type text area after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[1].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[1].fieldName).to.equal('Painting')
        expect(response.body.data.custom_fields[1].user_profile_field_type).to.equal(2)
    });

    it.only('Add Group field with a text field & all flags as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "selectedOptions": [
              "Name"
            ],
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
            "user_profile_field_type": 8,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', addgroup)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        groupidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify group field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[2].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[2].fieldName).to.equal('Group field')
        expect(response.body.data.custom_fields[2].user_profile_field_type).to.equal(8)
    });

    it.only('Add checkbox field with options A & B all flags as true :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "selectedOptions": [
              "A",
              "B"
            ],
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
                "name": "A"
              },
              {
                "id": 2,
                "name": "B"
              }
            ],
            "user_profile_field_type": 5,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', addcheckbox)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        checkboxidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify checkbox field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[3].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[3].fieldName).to.equal('Checkbox field')
        expect(response.body.data.custom_fields[3].user_profile_field_type).to.equal(5)
    });

    it.only('Add Link field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "user_profile_field_type": 7,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', addlink)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        linkidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify link field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[4].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[4].fieldName).to.equal('link test')
    });

    it.only('Add File field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "user_profile_field_type": 11,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', addfile)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        fileidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify file field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[5].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[5].fieldName).to.equal('file test')
        expect(response.body.data.custom_fields[5].properties.max_file_size).to.equal('5')
        expect(response.body.data.custom_fields[5].properties.allowed_max_file_size).to.equal('5')
    });

    it.only('Add Date field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
            "user_profile_field_type": 3,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', add_date)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        dateidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify Date field after adding in profile fields mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[6].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[6].fieldName).to.equal('Test Date')
    });

    it.only('Add Radio field in profile field :- POST /backend/api/v2/events/settings/userprofile', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
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
                "name": "Test 1"
              },
              {
                "id": 2,
                "name": "Test 2"
              }
            ],
            "user_profile_field_type": 6,
            "user_profile_field_icons_id": 16
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/userprofile', headers, 'post', add_radio)
        expect(response.body.message).to.equal(Responsemessages.Parameter_new_profile_field_creation)
        dateidadded = (response.body.data.ids.field_id.$oid)
    });

    it.only('Verify Radio with mandatory as true dashboard: POST /backend/api/v2/people/profilefields', async ()=>  {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/profilefields', headers, 'get')
        expect(response.body.data.custom_fields[7].isRequired).to.equal('YES')
        expect(response.body.data.custom_fields[7].fieldName).to.equal('Radio Test')
        expect(response.body.data.custom_fields[7].options[0]).to.equal('Test 1')
        expect(response.body.data.custom_fields[7].options[1]).to.equal('Test 2')
    });

    //Team Member

    it.only('Get team member list : POST /api/v1/team-member/list', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member = { "data": { "filter": {} } }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', headers, 'post', team_member)
        expect(response.body.total_count).to.equal(0);
    
    });
    
    it.only('Add team member as an admin : POST /api/v1/team-member/create', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member =
        {
          "data": {
            "email": "",
            "emails": [
              "apitest@yopmail.com"
            ],
            "canExport": false,
            "canManageAllEvents": false,
            "canManageAllSections": false,
            "canManageTeamMembers": false,
            "canManagePayout": false,
            "isSuperAdmin": true,
            "isEventAdmin": true,
            "selectedEvents": [],
            "canManageSelectedEvents": false,
            "selectedEventSections": [],
            "selectedEventList": null,
            "selectedSectionList": null,
            "errors": {
              "eventError": false,
              "sectionError": false
            },
            "eventList": null,
            "sectionList": null,
            "subscription_meta_id": 1
          }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);
    });

    it.only('Get team member list : POST /api/v1/team-member/list', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member = { "data": { "filter": {} } }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', headers, 'post', team_member)
        team_member_userid = (response.body.data[0].user_id)
    });

    it.only('Verify tem member limit reached : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedAdminMemberCredit).to.equal(1)
    });

    it.only('Add another team member as an admin and verify failure due to limit: POST /api/v1/team-member/create', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member =
        {
          "data": {
            "email": "",
            "emails": [
              "apitestanother@yopmail.com"
            ],
            "canExport": false,
            "canManageAllEvents": false,
            "canManageAllSections": false,
            "canManageTeamMembers": false,
            "canManagePayout": false,
            "isSuperAdmin": true,
            "isEventAdmin": true,
            "selectedEvents": [],
            "canManageSelectedEvents": false,
            "selectedEventSections": [],
            "selectedEventList": null,
            "selectedSectionList": null,
            "errors": {
              "eventError": false,
              "sectionError": false
            },
            "eventList": null,
            "sectionList": null,
            "subscription_meta_id": 1
          }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_exhausted_message);
    });

    it.only('Delete team member: POST /api/v1/team-member/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member =
        {
          "data": {
            "is_all": 0,
            "ids": [
              team_member_userid
            ],
            "subscription_meta_id": 1
          }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/delete', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_delete_message);
    });

    it.only('Verify tem member limit : GET /api/v1/user/auth', async () => {
        var response = await sendRequest(environment.baseURL, '/api/v1/user/auth', {'organiserId': global.FreeTrialOrganizerId, 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + global.FreeTrialUserToken}, 'get')
        expect(response.body.data.usedAdminMemberCredit).to.equal(0)
    });

    it.only('Add team member with permission of manage payout, manage team member, and as event admin : POST /api/v1/team-member/create', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member =
        {
          "data": {
            "email": "",
            "emails": [
              "tt@yopmail.com"
            ],
            "canExport": false,
            "canManageAllEvents": false,
            "canManageAllSections": false,
            "canManageTeamMembers": true,
            "canManagePayout": true,
            "isSuperAdmin": false,
            "isEventAdmin": true,
            "selectedEvents": [],
            "canManageSelectedEvents": false,
            "selectedEventSections": [],
            "selectedEventList": null,
            "selectedSectionList": null,
            "errors": {
              "eventError": false,
              "sectionError": false
            },
            "eventList": null,
            "sectionList": null,
            "subscription_meta_id": 1
          }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);
    });

    it.only('Verify team member list with permission of manage payout, manage team member, and as event admin : POST /api/v1/team-member/list', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member = { "data": { "filter": {} } }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', headers, 'post', team_member)
        expect(response.body.total_count).to.equal(1);
        team_member_userid = (response.body.data[0].user_id)
        expect(response.body.data[0].email).to.equal('tt@yopmail.com');
        expect(response.body.data[0].status).to.equal('INVITED');
        expect(response.body.data[0].roles[0]).to.equal('EVENT_ADMIN');
        expect(response.body.data[0].roles[1]).to.equal('PAYOUT_MANAGER');
        expect(response.body.data[0].roles[2]).to.equal('TEAM_MANAGER');
    });

    it.only('Edit team member from admin to event admin : POST /api/v1/team-member/edit', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member = {
            "data": {
              "email": "tt@yopmail.com",
              "emails": [
                "tt@yopmail.com"
              ],
              "canExport": false,
              "canManageAllEvents": false,
              "canManageAllSections": false,
              "canManageTeamMembers": true,
              "canManagePayout": true,
              "isSuperAdmin": true,
              "isEventAdmin": true,
              "selectedEvents": [],
              "canManageSelectedEvents": false,
              "selectedEventSections": [],
              "selectedEventList": null,
              "selectedSectionList": null,
              "errors": {
                "eventError": false,
                "sectionError": false
              },
              "role_id": "15,16,17",
              "roles": "EVENT_ADMIN,PAYOUT_MANAGER,TEAM_MANAGER",
              "first_name": "Tt",
              "last_name": "Tt",
              "img_profile": "",
              "user_id": team_member_userid,
              "access": {
                "canManageAllEvents": false,
                "canManageTeamMembers": true,
                "canManagePayout": true,
                "canExport": false,
                "isEventAdmin": true,
                "isSuperAdmin": false,
                "canManageAllSections": false,
                "canManageSelectedEvents": false
              },
              "eventList": null,
              "sectionList": null
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/edit', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_update_message);
    
    });

    it.only('Verify team member list with permission of admin', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member = { "data": { "filter": {} } }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', headers, 'post', team_member)
        expect(response.body.total_count).to.equal(1);
        team_member_userid = (response.body.data[0].user_id)
        expect(response.body.data[0].email).to.equal('tt@yopmail.com');
        expect(response.body.data[0].status).to.equal('INVITED');
        expect(response.body.data[0].roles[0]).to.equal('SUPER_ADMIN');
        console.log(response.body)
    });

    it.only('Delete team member: POST /api/v1/team-member/delete', async () => {
        var headers = freeTrialUserHeader()
        headers['buildversion'] = process.env.buildversion
        const team_member =
        {
          "data": {
            "is_all": 0,
            "ids": [
              team_member_userid
            ],
            "subscription_meta_id": 1
          }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/team-member/delete', headers, 'post', team_member)
        expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_delete_message);
    });

    //Lounge

    it.only('Attendee Lounge:  Add Attendee Lounge : POST /backend/api/v2/lounge/tables', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables', headers,'post',AttendeeLoungedata)
        tableId = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    it.only('Attendee Lounge:  Add Attendee Lounge with capacity as Four  : POST /backend/api/v2/lounge/tables', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const AttendeeLoungedata2 =
        {
            "data":
            {
                "capacity": "4",
                "exhibitors": "",
                "lounge_image": "",
                "meeting_limit": "",
                "name": "Test Lounge with Capacity 4",
                "priority": "2",
                "table_type": "ATTENDEE",
                "topic": "This is Test Lounge with Capacity 4"

            }
        };

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables', headers,'post',AttendeeLoungedata2)
        tableId_4_capacity = (response.body.data.ids.table_id);
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    it.only('Exhibitor Lounge:  Add Exhibitor Lounge : POST /backend/api/v2/lounge/tables', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const ExhibitorsLoungedata =
        {
            "data":
            {
                "capacity": "2",
                "exhibitors": [{
                    "id": virtualboothid1,
                    "lounge_image": "",
                    "name": "Lounge Virtual Booth"
                }],
                "lounge_image": "",
                "meeting_limit": 1,
                "name": "Test Lounge EXHIBITOR",
                "priority": "1",
                "table_type": "EXHIBITOR",
                "topic": "This is Test Lounge EXHIBITOR"

            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables', headers,'post',ExhibitorsLoungedata)
        ExhibitorstableId = (response.body.data.ids.table_id);
        console.log(ExhibitorstableId)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_post_Add_message)
    });

    it.only('Lounge Update: Update Attendee Lounge : PUT backend/api/v2/lounge/tables', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['tableid'] = tableId_4_capacity
        const LoungeUpdate =
        {
            "data":
            {
                "capacity": "2",
                "lounge_image": "",
                "meeting_limit": 0,
                "name": "Test Lounge Update",
                "priority": "2",
                "table_type": "ATTENDEE",
                "topic": "This is Test Lounge"
            }
        };
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/tables', headers,'put',LoungeUpdate)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    });

    it(' Lounge Update Exhibitor : POST backend/api/v2/lounge/tables', async () => {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        headers['tableid'] = ExhibitorstableId
        const LoungeUpdateExhibitor =
        {
            "data":
            {
                "capacity": "2",
                "exhibitors": "",
                "lounge_image": "",
                "meeting_limit": "2",
                "name": "Test Lounge Update Exhibitor",
                "priority": "2",
                "sourceId": virtualboothid1,
                "table_type": "EXHIBITOR",
                "topic": "This is Test Lounge Update Exhibitor",


            }
        };
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/lounge/tables', headers, 'put', LoungeUpdateExhibitor)
        console.log(response.body)
        expect(response.body.message).to.equal(Responsemessages.Parameter_lounge_update_message);
    });

    it.only('Delete 1st lounge : POST /backend/api/v2/lounge/delete/tables', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/delete/tables',{'organiserId': global.FreeTrialOrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'tableid': tableId_4_capacity},'post')
    });

    it.only('Delete 2nd lounge : POST /backend/api/v2/lounge/delete/tables', async () => {
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/lounge/delete/tables',{'organiserId': global.FreeTrialOrganizerId, 'eventId' : eventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + global.FreeTrialUserToken, 'tableid': ExhibitorstableId},'post')
    });
    //Branding

    it.only('Get branding setting info: GET /backend/api/v2/brandyourevent/settings', async () => 
    {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/settings', headers,'get')
        URL= (response.body.data.domainSettings.url)
        V2_URL= (response.body.data.domainSettings.v2_url)
        V2_INDEX_URL= (response.body.data.domainSettings.v2_index_url)
        V2_COVER_IMAGES_0= (response.body.data.coverImages[0].id)
        V2_COVER_IMAGES_1= (response.body.data.coverImages[1].id)
        V2_COVER_IMAGES_2= (response.body.data.coverImages[2].id)
        V2_COVER_IMAGES_3= (response.body.data.coverImages[3].id)
        V2_COVER_IMAGES_4= (response.body.data.coverImages[4].id)
        V2_COVER_IMAGES_5= (response.body.data.coverImages[5].id)
    });

    it.only('Updating Vanity URL: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        random_First_Vanity_BankAccountIBAN = faker.finance.iban();
        const payload_vanity =
        {
            "data": {
                "favicon": "",
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "communityBanners": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings', headers, 'put', payload_vanity)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);     
    });

    it.only("Branding: Uploading BIG 128*128 Favicon: POST /backend/api/v2/events/uploads", (done) =>
    {      
        const request = require('supertest');
        request(environment.baseURL1)
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', global.FreeTrialOrganizerId)
            .set('eventId', eventId)
            .set('authorization', 'Bearer ' + global.FreeTrialUserToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3790')
            .field('type', 'base')
            .field('location', 'favicon')
            .field('data', 'data:image/png;base64,' + imageAsBase64_FaviconBIG_File)
            .end((err, response) => {
                Favicon_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Uploading Youtube Video: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const video_uploading =
        {
            "data": {
                "link": "https://www.youtube.com/watch?v=6xmxe27J-LU",
                "type": "YOUTUBE",
                "is_show_after_login": 1,
                "is_home_screen": 1
            }
        }  
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo', headers,'post', video_uploading)
        Video_FileName= (response.body.data.thumb)
        expect(response.body.status).to.equal(200);
    });

    it.only('Saving the BIG 128*128 Favicon branding setting images: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [
                    {
                        "img_file_name": "",
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": "",
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings', headers, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });

    it.only('Asserting the dashboard response with community BIG 128*128 Favicon response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        // var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        // var communityv2url_split_vanityurl = communityv2url_baseURL.split("/")[0]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": ((eventUrl.split("https://")[1])),
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{ 'Content-Type': 'application/json' }, 'post', community_webstate);
          console.log(response.body.success.data.tracking)
          expect(response.body.success.data.tracking.favicon).to.equal(Favicon_FileName);
    });

    it.only("Branding: Applying new color theme: POST /api/v1/event/theme ", async ()=>
    {  
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var randomName = faker.name.findName();
        Primary_Color= "#2f6ba2";
        Accent_Color="#5fdcc1";
        Font_Color="#76c1f2";
        Secondary_Font_Color="#ece3e3";
        Main_Background_Color="#777272";
        const new_theme =
        {
            "data": {
              "is_default": 0,
              "name": randomName,
              "background_type": "COLOR",
              "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
              "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
              "is_applied": 1,
              "background_image": "",
              "preview_theme_id": "",
              "previewUrl": ""
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme', headers,'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Preview of new color theme added: POST /api/v1/event/theme/preview", async ()=>
    {  
        var headers = freeTrialUserHeader()
        headers['eventId'] = eventId
        headers['buildversion'] = process.env.buildversion
        var randomName = faker.name.findName();
        Primary_Color= "#2f6ba2";
        Accent_Color="#5fdcc1";
        Font_Color="#76c1f2";
        Secondary_Font_Color="#ece3e3";
        Main_Background_Color="#777272";
        
        const new_theme_preview =
        {
            "data": {
              "previewData": "{\"is_default\":0,\"event_id\":"+process.env.eventid+",\"organiser_id\":"+environment.HOrganiserId+",\"name\":\""+randomName+"\",\"background_type\":\"COLOR\",\"primary_color\":{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"},\"secondary_color\":{\"type\":\"solid\",\"color1\":\"\"},\"accent_color\":{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"},\"headbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"navbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"font_color\":{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"},\"secondary_font_color\":{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"},\"main_background_color\":{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"},\"background_image\":{}}"
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme/preview', headers,'post', new_theme_preview)
        expect(response.body.status).to.equal(200);
    });


    

    it.only('delete first event : POST /backend/api/v2/events/delete', async () => {
        var event = new Events();
        event.deleteEvent(freeTrialUserHeader(),eventId)
    });

    it.only('delete third event : POST /backend/api/v2/events/delete', async () => {
        var event = new Events();
        event.deleteEvent(freeTrialUserHeader(),eventId2)
    });
})

