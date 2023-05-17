/*
Author: Rajeev Pramanik
Description: This Script will try all possible ways to signup on the dashboard using fuzz keywords.
Timestamp: 29th Sept 2021 11:30 AM
*/

import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');

import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil'
require('dotenv').config();


describe.skip('Fuzz: Org forgot password dashboard.', () => 
{
  // var list_length = 3;
  var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;
  console.log("The length of the list is: ", list_length);

  it.only('[Dashboard]: Fuzz: forgot password: POST /backend/api/v2/auth/forgot', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_forgot_password =
      {
        "data": {
            "email": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "captchaToken": ""
        }
    }
      console.log("The payload with fuzz invalid email id for forgot password: ", dashboard_forgot_password);
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/forgot', { 'Content-Type': 'application/json' }, 'post', dashboard_forgot_password)
      if (response.body.status == 200)
      {
        console.log("The response is:", response.body)

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
        console.log("The status ratio for the forgot password is: ", ratio_status);

        var ratio_message = fuzzball.ratio(JSON.stringify(response.body.message), "An email will be sent on the given Email Address to reset your password");
        console.log("The valid forgot status message is:", ratio_message);
      }
      else
      {
        console.log("The response is:", response.body)
        console.log("Couldn't able to send the forgot mail, so sad to have no forgot message. !!!")

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
        console.log("The forgot password status ratio for invalid email is:", ratio_status)

        var ratio_message = fuzzball.ratio(JSON.stringify(response.body.message), "The given data failed to pass validation");
        console.log("The invalid login status message ratio for The given data failed to pass validation is:", ratio_message)

        var ratio_message1 = fuzzball.ratio(JSON.stringify(response.body.errors.email[0]), "This field is required");
        console.log("The invalid forgot error status message ratio for Invalid email is:", ratio_message1)
      }
    }
  })

})