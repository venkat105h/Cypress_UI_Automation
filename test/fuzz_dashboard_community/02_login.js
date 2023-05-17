import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');

import supertest from 'supertest';
import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil'
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_fuzzemail']


describe('Fuzz: Login dashboard & community', () => {

  var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;
  console.log("The length of the list is: ", list_length);

  it.skip('[Dashboard]: Fuzz: Valid email id & fuzz password as True: POST /backend/api/v2/auth/login', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_login =
      {
        "data": {
          "captchaToken": "",
          "email": myemail,
          "password": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
        }
      }
      console.log("The payload with fuzz Valid email id & fuzz password is: ", dashboard_login);
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', dashboard_login)
      if (response.body.status == 200)
      {
        console.log("The response is:", response.body)

        var ratio_email = fuzzball.ratio(response.body.data.userData.email, myemail)
        console.log("The email ratio is:", ratio_email)

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
        console.log("The status ratio for the login is: ", ratio_status);
      }
      else
      {
        console.log("The response is:", response.body)
        console.log("Couldn't able to login, so sad to have no login message. !!!")

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
        console.log("The login status ratio for valid email and invalid password is:", ratio_status)

        var ratio_message = fuzzball.ratio(JSON.stringify(response.body.message), "The given data failed to pass validation");
        console.log("The invalid login status message ratio for The given data failed to pass validation is:", ratio_message)

        var ratio_message1 = fuzzball.ratio(JSON.stringify(response.body.message), "Invalid Credentials");
        console.log("The invalid login status message ratio for Invalid Credentials is:", ratio_message1)
      }
    }
  })

  it.skip('[Dashboard]: Fuzz: Invalid email id & valid password: POST /backend/api/v2/auth/login', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_login =
      {
        "data": {
          "captchaToken": "",
          "email": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
          "password": "hubilomasterpassword"
        }
      }
      console.log("The payload with Invalid email id & valid password: ", dashboard_login);
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', dashboard_login)
      if (response.body.status == 200)
      {
        console.log("The response is:", response.body)

        var ratio_email = fuzzball.ratio(response.body.data.userData.email, myemail)
        console.log("The email ratio is:", ratio_email)

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
        console.log("The status ratio for the login is: ", ratio_status);
      }
      else
      {
        console.log("The response is:", response.body)
        console.log("Couldn't able to login, so sad to have no login message. !!!")

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
        console.log("The login status ratio for valid email and invalid password is:", ratio_status)

        var ratio_email_alert = fuzzball.token_sort_ratio(response.body.errors.email[0],"This is not a valid Email Address" )
        console.log("The ratio_email_alert ratio is:", ratio_email_alert)
  
        var ratio_email_message = fuzzball.token_sort_ratio(response.body.message,"The given data failed to pass validation" )
        console.log("The ratio_email_message ratio is:", ratio_email_message)
      }
    }
  })

  it.skip('[Dashboard]: Fuzz: Invalid email id & Invalid password: POST /backend/api/v2/auth/login', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_login =
      {
        "data": {
          "captchaToken": "",
          "email": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
          "password": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
        }
      }
      console.log("The payload with Invalid email id & valid password: ", dashboard_login);
      var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', dashboard_login)
      if (response.body.status == 200)
      {
        console.log("The response is:", response.body)

        var ratio_email = fuzzball.ratio(response.body.data.userData.email, myemail)
        console.log("The email ratio is:", ratio_email)

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
        console.log("The status ratio for the login is: ", ratio_status);
      }
      else
      {
        console.log("The response is:", response.body)
        console.log("Couldn't able to login, so sad to have no login message. !!!")

        var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
        console.log("The login status ratio for valid email and invalid password is:", ratio_status)

        var ratio_email_alert = fuzzball.token_sort_ratio(response.body.errors.email[0],"This is not a valid Email Address" )
        console.log("The ratio_email_alert ratio is:", ratio_email_alert)
  
        var ratio_email_message = fuzzball.token_sort_ratio(response.body.message,"The given data failed to pass validation" )
        console.log("The ratio_email_message ratio is:", ratio_email_message)
      }
    }
  })

  it.only('[Dashboard]: Fuzz: Create login token: POST /backend/api/v2/auth/login', async () => {
    const login1 =
    {
      "data": {
        "captchaToken": "",
        "email": myemail,
        "password": "hubilomasterpassword"

      }
    }
    console.log("The payload with valid email id & valid password: ", login1);
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    if (response.body.status == 200)
    {
      console.log("The response is:", response.body)

      process.env.fuzz_etoken = response.body.data.token
      process.env.fuzz_org_id = response.body.data.organiser_id
  
      var ratio_login_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
      console.log("The status ratio for login is: ", ratio_login_status);
  
      var excert_email_ratio = fuzzball.token_sort_ratio(response.body.data.userData.email, myemail)
      console.log("The excert_email_ratio is:", excert_email_ratio)
    }
    else
    {
      console.log("The response is:", response.body)
      console.log("Couldn't able to login, so sad to have no login message. !!!")

      var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
      console.log("The login status ratio for valid email and invalid password is:", ratio_status)

      var ratio_email_alert = fuzzball.token_sort_ratio(response.body.errors.email[0],"This is not a valid Email Address" )
      console.log("The ratio_email_alert ratio is:", ratio_email_alert)

      var ratio_email_message = fuzzball.token_sort_ratio(response.body.message,"The given data failed to pass validation" )
      console.log("The ratio_email_message ratio is:", ratio_email_message)
    }
    

  })
})