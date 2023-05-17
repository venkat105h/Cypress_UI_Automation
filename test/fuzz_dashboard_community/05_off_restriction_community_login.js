import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');


import supertest from 'supertest';
import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil'
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

var myemail = emailaddress[process.env.releaseenv + '_email']

describe('Fuzz: Off login access and login from community.', () => 
{
    // var list_length = 6;
    var list_length = fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ.length;

    it.only('Fuzz: Change event settings for restrict access off & default code 123456: PUT /backend/api/v2/events/settings/login', async () => 
    {
        const setting_restric = {
            "data": {
                "default_custom_otp": "123456",
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
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/login', { 'organiserId': process.env.fuzz_org_id, 'eventid': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'put', setting_restric)
        console.log("The response for change event settings for restrict access off is: ", response.body)
    });

    it.only('Fuzz: Make fuzz event live: POST /api/v1/event/livestatus/update', async () => 
    {
        const eventLive = {
            "data": {
                "is_publish": 1
            }
        }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/livestatus/update', { 'organiserId': process.env.fuzz_org_id, 'eventid': process.env.fuzz_eventid, 'Authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion }, 'post', eventLive)
        console.log("The response for making fuzz event live is:", response.body)
        process.env.fuzz_eventurl = (response.body.data.url).split("/community")[0];
    });

    it.only('Fuzz: Load login page : POST /api/v2/platformNew/web-state-new', async () => {

        process.env.fuzz_modified_community_url = ((process.env.fuzz_eventurl.split("https://")[1]))
        const community1 = {
            "payload": {
                "data": {
                    "url": process.env.fuzz_modified_community_url,
                    "app_version": "1.0.0",
                    "source": "COMMUNITY",
                    "device_type": "WEB",
                    "language": 34

                }
            }
        }
        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Content-Type': 'application/json' }, 'post', community1)
        process.env.fuzz_accessTokenLoginPage = response.body.success.data.access_token
        console.log("The response Load login page community is: ", response.body)

    });

    it.skip('Fuzz: Sign in with valid email id and invalid otp: POST /api/v2/users/login', async () => 
    {
        for (var i=0; i<list_length; i++)
        {
            const community2 = 
            {
                "payload": {
                  "data": {
                    "email": process.env.fuzz_email_id,
                    "mode": "OTP",
                    "otp": fuzzDict.LOGIN_SQL_INJECTION_DECTECTION_FUZZ[i],
                    "user_consent_data": [
                      {
                        "71851": "YES"
                      }
                    ]
                  }
                }
              }
            console.log("The payload with fuzz valid email id and invalid otp is: ", community2);
            var response = await sendRequest(environment.baseURL3, '/api/v2/users/login',{'authorization': process.env.fuzz_accessTokenLoginPage/*headers3*/,  },'post', community2)
            if (response.body.status == true)
            {
              console.log(JSON.stringify(response.body));
              console.log("Attendees are getting logged in with invalid otp codes.");

              var ratio_added_message = fuzzball.token_set_ratio(response.body.success.code, "LOGIN_SUCCESS");
              console.log("The message ratio for login in with otp is: ", ratio_added_message);
            }
            else
            {
              console.log(JSON.stringify(response.body));
              console.log("Couldn't log in by the attendees, so sad to have no event with attendees !!!")

              var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), false);
              console.log("The ration for the invalid response status is: ", ratio_status);

              var ratio_other_message = fuzzball.token_set_ratio(response.body.error.errorStack.message, "Invalid login code. Enter valid login code to continue");
              console.log("The Invalid login code. message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.only('Fuzz: Sign in with valid email id and valid otp: POST /api/v2/users/login', async () => 
    {
        const community2 = 
        {
            "payload": {
                "data": {
                "email": process.env.fuzz_email_id,
                "mode": "OTP",
                "otp": "123456",
                "user_consent_data": [
                    {
                    "71851": "YES"
                    }
                ]
                }
            }
        }
        console.log("The payload with fuzz valid email id and invalid otp is: ", community2);
        var response = await sendRequest(environment.baseURL3, '/api/v2/users/login',{'authorization': process.env.fuzz_accessTokenLoginPage/*headers3*/,  },'post', community2)
        if (response.body.status == true)
        {
            console.log(JSON.stringify(response.body));
            console.log("Attendees are getting logged in with valid email & otp codes.");

            var ratio_added_message = fuzzball.token_set_ratio(response.body.success.code, "LOGIN_SUCCESS");
            console.log("The message ratio for login in with otp is: ", ratio_added_message);

            process.env.fuzz_accesstokenloginuser = response.body.success.data.accessToken
        }
        else
        {
            console.log(JSON.stringify(response.body));
            console.log("Couldn't log in by the attendees, so sad to have no event with attendees !!!")

            var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "false");
            console.log("The ration for the invalid attendees name is: ", ratio_status);

            var ratio_other_message = fuzzball.token_set_ratio(response.body.error.errorStack.message, "Invalid login code. Enter valid login code to continue");
            console.log("The message ratio for other issue is: ", ratio_other_message);
        }
    });

})