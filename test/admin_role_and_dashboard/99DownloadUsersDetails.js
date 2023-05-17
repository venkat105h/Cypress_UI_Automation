/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

describe('Download the added users records.', () => {

    it.only('Download the user records by the super admin and verify the response: GET /api/v1/users/download', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/download', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data, environment.dashboardbaseurl4+"/hubiloAdminUsers/users-")
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Download the specific user records by the super admin and verify the response: GET /api/v1/users/download?userIds[]=userid', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/download?userIds[]='+global.user_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data, environment.dashboardbaseurl4+"/hubiloAdminUsers/users-")
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})