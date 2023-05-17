/*
Author: Pranjal Shah
Description: This Script will Load community/Signup/Onboarding at community. Also few negative cases have been
asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 24th Dec 2021 06.30
Description: Added 2 sec delay for failures
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, headers3 } from '../../helper/CommonUtil'
require('dotenv').config();


describe('Load community url & signin/signup with a user and On-Board the user on community', function () {

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
        process.env.accessTokenLoginPage = (response.body.success.data.access_token)

    });
    
    it.only('Signup a new user (clown26@yopmail.com) : POST api/v2/users/signup', async () => {

        const community2 = {
            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "firstName": "joker",
                    "lastName": "clown",
                    "password": "Test@1234",

                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/signup', headers3, 'post', community2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_signup_newuser_succesfull_message)
        expect(response.body.success.data.email).to.equal('clown26@yopmail.com')
        process.env.clown26userid = (response.body.success.data._id)
        process.env.accesstokenclown26user = (response.body.success.data.accessToken)

    });

    it('200: POSITIVE This will Get reception data on community: POST /api/v1/app/home_community_data', (done) => {
        const request2 = supertest((process.env.eventurl.replace("http", "https")));

        const community3 = {
            "access_token": process.env.accesstoken,
            "api_key": process.env.apikey,
            "app_version": "1.0.0",
            "device_type": environment.Hdevicetype,
            "event_id": process.env.eventid,
            "isOnlyMeeting": "NO",
            "meetingType": "UPCOMING",
            "organiser_id": environment.HOrganiserId,
            "time_zone": "Asia/Calcutta"
        }
        request2
            .post('/api/v1/app/home_community_data')
            .set('devicetype', environment.Hdevicetype)
            .set('source', environment.HSource)
            .set('accesstoken', process.env.accesstoken)
            .set('Content-Type', 'application/json')
            .set('apikey', process.env.apikey)
            .set('organiserid', environment.HOrganiserId)
            .set('eventid', process.env.eventid)
            .send(community3)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                done();
            });
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
        headers3["Authorization"] = process.env.accesstokenclown26user
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onbording1)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);

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
        headers3["Authorization"] = process.env.accesstokenclown26user
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onBoarding2)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);

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
        headers3["Authorization"] = process.env.accesstokenclown26user
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onBoarding3)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);

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
        headers3["Authorization"] = process.env.accesstokenclown26user
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onBoarding4)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);

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
        headers3["Authorization"] = process.env.accesstokenclown26user
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/on-board', headers3, 'post', onBoarding5)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_on_baording_message);

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

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.success.data.is_password).to.equal(true)
        expect(response.body.success.data.is_register).to.equal(true)

    });

    it('Sign in with otp: POST /api/v2/users/login', (done) => {

        const community2 = {

            "payload": {
                "data": {
                    "email": "clown27@yopmail.com",
                    "mode": "OTP",
                    "otp": "1234",
                    "user_consent_data": []
                }
            }
        }
        request3
            .post('/api/v2/users/login')
            .set('Authorization', process.env.accessTokenLoginPage)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(community2)
            .end((err, response) => {
                consolelog(response)
                expect(response.status).to.equal(200)
                process.env.accesstokenloginuser = (response.body.success.data.accessToken)
                console.log(process.env.accesstokenloginuser)
                done();
            });
    });

    it.only('Sign in with password for user (clown26@yopmail.com) : POST /api/v2/users/login', async () => {

        const community2 = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": "Test@1234"
                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', community2)
        process.env.accesstokenloginuser = (response.body.success.data.accessToken)

    });

    /*
    it.only('Valid email address & invalid password : POST /api/v2/users/login', async () => {

        const validemail = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": "1234"

                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', validemail)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_login_invalid_password_message)

    });

    it.only('Invalid email address & valid password : POST /api/v2/users/login', async () => {

        const invalidemail = {

            "payload": {
                "data": {
                    "email": "test78",
                    "mode": "PASSWORD",
                    "password": "Test@1234"

                }
            }
        }

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', invalidemail)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_login_invalid_email_message)

    });

    it.only('Blank email address & valid password : POST /api/v2/users/login', async () => {

        const blankemail = {

            "payload": {
                "data": {
                    "email": "",
                    "mode": "PASSWORD",
                    "password": "Test@1234"

                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', blankemail)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_login_invalid_email_message)

    });

    it.only('Valid email address & blank password : POST /api/v2/users/login', async () => {

        const blankpassword = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "PASSWORD",
                    "password": ""

                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', blankpassword)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_login_invalid_password_message)

    });
    */
    
    it.only('Sign in with invalid otp : POST /api/v2/users/login', async () => {

        const invalidotp = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "mode": "OTP",
                    "otp": "2898",
                    "user_consent_data": []
                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login', headers3, 'post', invalidotp)

    });


    it.only('Change settings for restrict access on & default code 1234: PUT /backend/api/v2/events/settings/login', async () => {
        const restrict_access = {
            "data": {
              "is_restrict": 1,
              "default_custom_otp": "1234",
              "support_email": "",
              "is_facebook": 1,
              "is_linkedin": 1,
              "is_google": 1,
              "is_signup": 0,
              "is_sso": 0,
              "is_allow_login": 1,
              "is_sso_connected": false
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/login', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', restrict_access)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Login_Setting_Update)
    });


    it.only('Check if user is registered with unregistered email id when restrict access on: POST /api/v2/users/check-email', async () => {

        const checkmail = {
            "payload": {
              "data": {
                "email": "tte@yopmail.com",
                "is_otp_login": true
              }
            }
          }

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.error.message).to.equal(Responsemessages.Parameter_Login_Unregistered_email_message)
        expect(response.body.error.data.message).to.equal(Responsemessages.Parameter_Login_email_Unregistered_message)

    });
    /*
    it.only('Check if user is registered with registered email id when restrict access on: POST /api/v2/users/check-email', async () => {

        const checkmail = {
            "payload": {
              "data": {
                "email": "clown26@yopmail.com",
                "is_otp_login": true
              }
            }
          }

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.success.data.is_register).to.equal(true)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_Login_Code_Send_message)

    });
    */
    
    it.only('Change settings for restrict access off & default code 1234: PUT /backend/api/v2/events/settings/login', async () => {
        const restrict_access = {
            "data": {
              "is_restrict": 0,
              "default_custom_otp": "1234",
              "support_email": "",
              "is_facebook": 1,
              "is_linkedin": 1,
              "is_google": 1,
              "is_signup": 0,
              "is_sso": 0,
              "is_allow_login": 1,
              "is_sso_connected": false
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/login', { 'organiserId': environment.HOrganiserId, 'eventid': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'put', restrict_access)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Login_Setting_Update)
    });

    it.only('Check if user is registered with unregistered email id when restrict access off: POST /api/v2/users/check-email', async () => {

        const checkmail = {
            "payload": {
              "data": {
                "email": "tte@yopmail.com",
                "is_otp_login": false
              }
            }
          }

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.success.data.is_register).to.equal(false)
        expect(response.body.success.data.is_OTP).to.equal(false)

    });

    it.only('Check if user is registered with registered email id when restrict access off: POST /api/v2/users/check-email', async () => {

        const checkmail = {
            "payload": {
              "data": {
                "email": "clown26@yopmail.com",
                "is_otp_login": false
              }
            }
          }

        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', checkmail)
        expect(response.body.success.data.is_register).to.equal(true)
        expect(response.body.success.data.is_OTP).to.equal(false)
        expect(response.body.success.data.is_password).to.equal(true)

    });


    it('Request login code again : POST /api/v2/users/check-email', async () => {

        const requestotpagain = {

            "payload": {
                "data": {
                    "email": "clown26@yopmail.com",
                    "is_otp_login": true
                }
            }
        }
        headers3["Authorization"] = process.env.accessTokenLoginPage
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/check-email', headers3, 'post', requestotpagain)
        expect(response.body.success.message).to.equal(Responsemessages.Parameter_login_requestagain_otp_message)

    });
    
});