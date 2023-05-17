/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import {expect} from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

describe('Send invitation email to the added user.', () => {

    it.only('Try sending email invitation to the added Dashboard user with user id as empty by the super admin and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_email_invitation_body =
        {
            "userIds": [
                ""
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', user_email_invitation_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.isInt).to.equal(Responsemessages.parameter_user_id_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try sending email invitation to the added Dashboard user without user id by the super admin and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_email_invitation_body =
        {
            "userIds": [
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', user_email_invitation_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.arrayMinSize).to.equal(Responsemessages.parameter_user_id_should_be_more_then_1_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Send email invitation to the added Admin Dashboard user by the super admin and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_email_invitation_body =
        {
            "userIds": [
                global.user_id
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', user_email_invitation_body)
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

    it.only('Send email invitation to the added Org Dashboard user by the super admin and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_org_email_invitation_body =
        {
            "userIds": [
                global.org_user_id
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', user_org_email_invitation_body)
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

    it.only('Super Admin: Fetch the list of users present in the system: GET /api/v1/users?page=0&limit=3', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=3', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            global.total_users_added = 3;
            global.list_of_users_ids = [];

            for (var i=0; i<global.total_users_added; i++)
            {
                global.fetched_user_id = response.body.data.items[i].id;
                global.list_of_users_ids.push(global.fetched_user_id);
            }
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Send email invitation to the multiple added Admin Dashboard user by the super admin and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_email_invitation_body =
        {
            "userIds": global.list_of_users_ids
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', user_email_invitation_body)
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