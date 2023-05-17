/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import { sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var jwt = require('jsonwebtoken');
var token_admin_dash_user
var token_org_dash_user
var invalid_jwtoken

describe('Create JWToken & Reset password for Admin/Org Dashboard user.', () => {

    it.only('Create JWToken for Admin/Org Dashboard user.', async () => 
    {

        token_admin_dash_user = jwt.sign({ userId: global.user_id}, environment.secretkey , { expiresIn: 3600 * 3600 });
        global.token_admin_dash_user;

        token_org_dash_user = jwt.sign({ userId: global.org_user_id}, environment.secretkey , { expiresIn: 3600 * 3600 });
        global.token_org_dash_user;

        invalid_jwtoken = jwt.sign({ userId: global.org_user_id},'shhhhh',{ expiresIn: '1h' });
        global.invalid_jwtoken;

    })

    it.only('Reset the added Admin Dashboard user with invalid token by himself and verify the response: PATCH /api/v1/users/reset-password', async () => 
    {
        const   user_admin_reset_invalid_body =
        {
            "token": invalid_jwtoken,
            "newPassword": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/reset-password', {'Accept':'application/json','Content-Type':'application/json'},'patch', user_admin_reset_invalid_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_Invalid_Token_Alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Reset the added Admin Dashboard user with valid token by himself and verify the response: PATCH /api/v1/users/reset-password', async () => 
    {
        const   user_admin_reset_body =
        {
            "token": token_admin_dash_user,
            "newPassword": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/reset-password', {'Accept':'application/json','Content-Type':'application/json'},'patch', user_admin_reset_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Reset the added Org Dashboard user with valid token by himself and verify the response: PATCH /api/v1/users/reset-password', async () => 
    {
        const   user_org_reset_body =
        {
            "token": token_org_dash_user,
            "newPassword": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/reset-password', {'Accept':'application/json','Content-Type':'application/json'},'patch', user_org_reset_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})