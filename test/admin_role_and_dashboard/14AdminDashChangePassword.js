/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import { sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import {expect} from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var casual = require('casual');

describe('Admin Dashboard user change password.', () => {

    it.only('Try changing the current admin dashboard users password with Invalid old password and verify the response: PATCH /api/v1/users/user_id/change-password', async () => 
    {
        const change_password_body = 
        {
            "newPassword": "qwerty",
            "oldPassword": casual.password
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id+'/change-password', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'patch',change_password_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_Invalid_old_password_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Change the current admin dashboard users password with valid old passwordand verify the response: PATCH /api/v1/users/user_id/change-password', async () => 
    {
        const change_password_body = 
        {
            "newPassword": "qwerty",
            "oldPassword": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id+'/change-password', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'patch',change_password_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})