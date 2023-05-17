/*
Author: Rajeev Pramanik
Description: This Script will Login as an super admin in dashboard.
Timestamp: 17th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest, emailaddress, emailPassword} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import {expect} from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var casual = require('casual');
var super_email = emailaddress[process.env.releaseenv + '_super_admin_email']
var super_password = emailPassword[process.env.releaseenv + '_super_admin_password']

describe('Login using a superadmin & store etoken.', () => {
    beforeEach(function (done) {
        setTimeout(function(){
              done()
          }, environment.HTestDelay);
    });

    it.only('Make the super admin invalid login.: POST /api/v1/users/login', async () => 
    {
        const   invalid_login_body = 
        {
            "email": casual.email,
            "password": super_password
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', invalid_login_body, 401)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_email_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
            expect(response.body).to.have.all.keys("data", "message")
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the super admin login and store the etoken: POST /api/v1/users/login', async () => 
    {
        const   login_body = 
        {
            "email": super_email,
            "password": super_password
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', login_body)
        if (response.status == 200)
        {
            global.super_admin_etoken = response.body.data.accessToken
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body).to.have.all.keys("data", "message")
            expect(response.body.data).to.have.all.keys("accessToken", "expiresAt")
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})