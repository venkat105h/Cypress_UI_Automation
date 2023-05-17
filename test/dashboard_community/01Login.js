/*
Author: Pranjal Shah
Description: This Script will Login as an organiser in dashboard. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Pranjal Shah 16th Oct 2021 10:30 AM
Description: Added Test Cases according to review points.
*/
import { expect } from 'chai'
import environment from '../../config/environment';
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, emailaddress, emailPassword } from '../../helper/CommonUtil'
require('dotenv').config();
var myemail = emailaddress[process.env.releaseenv + '_email']
var mypassword = emailPassword[process.env.releaseenv + '_password']


describe('Login using an organiser & create token', () => {

  it.only('Create login token: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": myemail,
        "password": mypassword

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    process.env.eToken = (response.body.data.token)
    global.eToken = (response.body.data.token)
    expect(response.body.data.userData.email).to.equal(myemail)
  })

  it.only('Verify with valid Username and Invalid Password : POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": myemail,
        "password": "123454"

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.status).to.equal(401)
    expect(response.body.message).to.equal(Responsemessages.Parameter_login_invalid_password_organizer_message)

  })

  it.only('Verify Forgot Password: POST /backend/api/v2/auth/forgot', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": myemail,

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/forgot', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_login_forgot_password_organizer_message)

  })

  it.only('Verify with invalid Username and Invalid Password : POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "captchaToken": "",
        "email": "tjyt@yopmail.com",
        "password": "123454"

      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.message).to.equal(Responsemessages.Parameter_login_invalid_email_organizer_message)

  })

  it.only('Signup as a new organiser', async () => {
    var timestampMiliSeconds = new Date().getTime();
    var organizerEmail = 'Automation' + timestampMiliSeconds + "@yopmail.com";
    var userSignupDto = {
        "data": {
          "email": organizerEmail,
          "firstName": "AutomationFname" + timestampMiliSeconds,
          "lastName": "AutomationLname" + timestampMiliSeconds,
          "password": "Test@1234",
          "organisation": "Hubilo",
          "captchaResponse": "",
          "lastUrl": ""
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', {'Content-Type' : 'application/json'}, 'post', userSignupDto)
      expect(response.body.data.userData.email).to.equal(organizerEmail)
      expect(response.body.data.userData.is_new_dashboard_signup).to.equal(1)
      expect(response.body.data.userData.email_valid_status_id).to.equal(1)
      expect(response.body.data.userData.admin_account_state).to.equal(1)
      expect(response.body.data.userData.forgot_password_account_state).to.equal(1)

});

it.only('Signup with already existing organiser', async () => {
  var timestampMiliSeconds = new Date().getTime();
  var userSignupDto = {
      "data": {
        "email": myemail,
        "firstName": "TestFname" + timestampMiliSeconds,
        "lastName": "TestLname" + timestampMiliSeconds,
        "password": "Test@1234",
        "organisation": "Hubilo",
        "captchaResponse": "",
        "lastUrl": ""
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', {'Content-Type' : 'application/json'}, 'post', userSignupDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_signup_same_organiser_message)
});

it.only('Signup without email id', async () => {
  var timestampMiliSeconds = new Date().getTime();
  var userSignupDto = {
      "data": {
        "email": "",
        "firstName": "TestFname" + timestampMiliSeconds,
        "lastName": "TestLname" + timestampMiliSeconds,
        "password": "Test@1234",
        "organisation": "Hubilo",
        "captchaResponse": "",
        "lastUrl": ""
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/user/auth/signup', {'Content-Type' : 'application/json'}, 'post', userSignupDto)
    expect(response.body.message).to.equal(Responsemessages.Parameter_signup_without_email_organiser_message)
});


})
