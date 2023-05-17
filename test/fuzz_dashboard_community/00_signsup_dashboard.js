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


describe.skip('Fuzz: Org Signsup dashboard & community', () => 
{
  // var list_length = 3;
  var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;
  console.log("The length of the list is: ", list_length);
  
  it.only('[Dashboard]: Fuzz emails & rest all valid: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "firstName": faker.name.firstName(),
            "lastName": faker.name.lastName(),
            "password": "0Qwer!y0",
            "organisation": "Hubilo",
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)
    
      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
    }
  })

  it.only('[Dashboard]: Fuzz fname & rest all valid: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": faker.internet.exampleEmail(),
            "firstName": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "lastName": faker.name.lastName(),
            "password": "0Qwer!y0",
            "organisation": "Hubilo",
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)
    
      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
      
    }
  })

  it.only('[Dashboard]: Fuzz lname & rest all valid: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": faker.internet.exampleEmail(),
            "firstName": faker.name.firstName(),
            "lastName": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "password": "0Qwer!y0",
            "organisation": "Hubilo",
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)
    
      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
      
    }
  })

  it.only('[Dashboard]: Fuzz pwd & rest all valid: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": faker.internet.exampleEmail(),
            "firstName": faker.name.firstName(),
            "lastName": faker.name.lastName(),
            "password": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "organisation": "Hubilo",
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)
    
      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
      
    }
  })

  it.only('[Dashboard]: Fuzz org & rest all valid: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": faker.internet.exampleEmail(),
            "firstName": faker.name.firstName(),
            "lastName": faker.name.lastName(),
            "password": "0Qwer!y0",
            "organisation": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)
    
      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
      
    }
  })

  it.only('[Dashboard]: Fuzz email, fname, lname, cname, pwd: POST /api/v1/user/auth/signup', async () => 
  {
    for (var i=0; i<list_length; i++)
    {
      const dashboard_signsup =
      {
        "data": {
            "email": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "firstName": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "lastName": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "password": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "organisation": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
            "captchaResponse": "",
            "lastUrl": ""
        }
      }
      console.log("The payload with fuzz InValid email id as fuzz string is: ", dashboard_signsup);
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', { 'Content-Type': 'application/json' }, 'post', dashboard_signsup)
      console.log("The response is:", response.body)

      var ratio_status = fuzzball.ratio(response.body.status, 400);
      console.log("The status ratio is:", ratio_status)

      var ratio_message = fuzzball.ratio(response.body.message, "User already exists.")
      console.log("The message ratio is:", ratio_message)
    }
  })

})