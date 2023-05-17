/*
Author: Rajeev Pramanik
Description: This Script will add new users with verification and edit users with verification as an super admin in dashboard.
Timestamp: 19th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { assert, expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var casual = require('casual');
const d = new Date();
let timestamp = d.getTime();

describe('Add with verify and edit with verify Users.', () => {

    it.only('Try adding non hubilo user on super admin and verify the response: POST /api/v1/users', async () => 
    {
        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        var non_hubilo_email = casual.email;
        
        const   add_non_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": non_hubilo_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_non_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_hubilo_email_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding non hubilo (GMAIL) user on super admin and verify the response: POST /api/v1/users', async () => 
    {
        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        var modified_email = user_fname+"@gmail.com"
        
        const   add_non_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": modified_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_non_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_hubilo_email_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding non hubilo (YAHOO) user on super admin and verify the response: POST /api/v1/users', async () => 
    {
        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        var modified_email = user_fname+"@yahoo.com"
        
        const   add_non_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": modified_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_non_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_hubilo_email_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding non hubilo (HOTMAIL) user on super admin and verify the response: POST /api/v1/users', async () => 
    {
        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        var modified_email = user_fname+"@hotmail.com"
        
        const   add_non_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": modified_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_non_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_hubilo_email_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Admin Dashboard user with fname as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": "",
            "lastName": user_lname,
            "email": final_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_fname_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_first_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Admin Dashboard user with lname as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": "",
            "email": final_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_lname_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_last_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Admin Dashboard user with email id as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": "",
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_emailid_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isEmail).to.equal(Responsemessages.parameter_emailid_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Admin Dashboard user without role id on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": final_email,
            "roleIds": [
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.arrayMinSize).to.equal(Responsemessages.parameter_roleid_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Admin Dashboard user with role id as empty on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": final_email,
            "roleIds": [
                ""
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.isNumber).to.equal(Responsemessages.parameter_roleid_should_not_be_blank_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Org Dashboard user with fname as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": "",
            "lastName": user_lname,
            "email": final_email,
            "roleIds": [
                global.updated_org_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_fname_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_first_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Org Dashboard user with lname as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": "",
            "email": final_email,
            "roleIds": [
                global.updated_org_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_lname_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_last_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding new Org Dashboard user with email id as blank on super admin: POST /api/v1/users', async () => 
    {

        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": "",
            "roleIds": [
                global.updated_org_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.length).to.equal(Responsemessages.parameter_emailid_char_should_be_more_1_alert_as_value);
            expect(response.body.errors[0].constraints.isEmail).to.equal(Responsemessages.parameter_emailid_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Add new Admin Dashboard user with inactive status on super admin: POST /api/v1/users', async () => 
    {
        var inactive_user_fname = casual.first_name;
        var inactive_user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        const inactive_d = new Date();
        let inactive_timestamp = inactive_d.getTime();
        var inactive_final_email = str1+inactive_timestamp+str2;

        const   add_user_body = 
        {
            "firstName": inactive_user_fname,
            "lastName": inactive_user_lname,
            "email": inactive_final_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": true
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(inactive_user_fname);
            expect(response.body.data.lastName).to.equal(inactive_user_lname);
            expect(response.body.data.email).to.equal(inactive_final_email);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.role_id);
            expect(response.body.data.roles[0].name).to.equal(global.role_name);

            expect(response.body.data.permissions[0].id).to.equal(1);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(2);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[2].id).to.equal(3);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[3].id).to.equal(4);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[4].id).to.equal(5);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[5].id).to.equal(6);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[6].id).to.equal(7);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[7].id).to.equal(8);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[8].id).to.equal(9);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[9].id).to.equal(10);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(11);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[11].id).to.equal(12);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(13);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[13].id).to.equal(14);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[14].id).to.equal(15);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(16);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[16].id).to.equal(17);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[17].id).to.equal(18);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[18].id).to.equal(19);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[19].id).to.equal(20);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[20].id).to.equal(21);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the list of users and validating wether the user is activate, logged in and send invitation on the super admin: GET /api/v1/users?page=0&limit=10', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            global.isactivated_isDeactivated = response.body.data.items[0].isDeactivated;
            global.hasLoggedIn_notLoggedIn = response.body.data.items[0].hasLoggedIn;
            if (global.isactivated_isDeactivated==Responsemessages.parameter_true_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_true_message)
            {
                console.log("deactivated & logged in.")
            }
            else if (global.isactivated_isDeactivated==Responsemessages.parameter_true_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_false_message)
            {
                console.log("deactivated & not logged in.")
            }
            else if(global.isactivated_isDeactivated==Responsemessages.parameter_false_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_true_message)
            {
                console.log("activated & logged in.")
            }
            else
            {
                console.log("activated & not logged in.")
            }
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Add new Admin Dashboard user with active status on super admin: POST /api/v1/users', async () => 
    {
        var user_fname = casual.first_name;
        var user_lname = casual.last_name;
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        var final_email = str1+timestamp+str2;

        global.user_fname;
        global.user_lname;
        global.final_email;
        
        const   add_user_body = 
        {
            "firstName": user_fname,
            "lastName": user_lname,
            "email": final_email,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_user_body)
        if (response.status == 200)
        {
            global.user_id = response.body.data.id;
            global.user_first_name = response.body.data.firstName;
            global.user_last_name = response.body.data.lastName;
            global.user_email_id = response.body.data.email;
            global.updated_role_id = response.body.data.roles[0].id;
            global.updated_role_name = response.body.data.roles[0].name;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(user_fname);
            expect(response.body.data.lastName).to.equal(user_lname);
            expect(response.body.data.email).to.equal(final_email);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.role_id);
            expect(response.body.data.roles[0].name).to.equal(global.role_name);

            expect(response.body.data.permissions[0].id).to.equal(1);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(2);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[2].id).to.equal(3);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[3].id).to.equal(4);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[4].id).to.equal(5);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[5].id).to.equal(6);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[6].id).to.equal(7);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[7].id).to.equal(8);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[8].id).to.equal(9);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[9].id).to.equal(10);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(11);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[11].id).to.equal(12);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(13);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[13].id).to.equal(14);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[14].id).to.equal(15);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(16);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[16].id).to.equal(17);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[17].id).to.equal(18);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[18].id).to.equal(19);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[19].id).to.equal(20);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[20].id).to.equal(21);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the list of users and validating wether the user is activate, logged in and send invitation on the super admin: GET /api/v1/users?page=0&limit=10', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            global.isactivated_isDeactivated = response.body.data.items[0].isDeactivated;
            global.hasLoggedIn_notLoggedIn = response.body.data.items[0].hasLoggedIn;
            if (global.isactivated_isDeactivated==Responsemessages.parameter_true_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_true_message)
            {
                console.log("deactivated & logged in.")
            }
            else if (global.isactivated_isDeactivated==Responsemessages.parameter_true_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_false_message)
            {
                console.log("deactivated & not logged in.")
            }
            else if(global.isactivated_isDeactivated==Responsemessages.parameter_false_message && global.hasLoggedIn_notLoggedIn ==Responsemessages.parameter_true_message)
            {
                console.log("activated & logged in.")
            }
            else
            {
                console.log("activated & not logged in.")
            }
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Admin Dashboard users and assert the response for position on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.user_id);
            assert.isOk(response.body.data.items, global.user_fname);
            assert.isOk(response.body.data.items, global.user_lname);
            assert.isOk(response.body.data.items, global.final_email);
            assert.isOk(response.body.data.items, global.role_id);
            assert.isOk(response.body.data.items, global.role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);

            expect(response.body.data.items[0].id).to.equal(global.user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.updated_role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.updated_role_name);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the Admin Dashboard user 1st name and validate the response on super admin: PUT /api/v1/roles/', async () => 
    {
        var edit_user_fname = casual.first_name;

        global.edit_user_fname;
        
        const   update_user_1st_name_body = 
        {
            "firstName": edit_user_fname,
            "lastName": global.user_last_name,
            "email": global.user_email_id,
            "id": global.user_id,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_user_1st_name_body)
        if (response.status == 200)
        {
            global.user_id = response.body.data.id;
            global.updated_user_first_name = response.body.data.firstName;
            global.user_last_name = response.body.data.lastName;
            global.user_email_id = response.body.data.email;
            global.updated_role_id = response.body.data.roles[0].id;
            global.updated_role_name = response.body.data.roles[0].name;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(edit_user_fname);
            expect(response.body.data.lastName).to.equal(global.user_last_name);
            expect(response.body.data.email).to.equal(global.user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.role_id);
            expect(response.body.data.roles[0].name).to.equal(global.role_name);

            expect(response.body.data.permissions[0].id).to.equal(1);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(2);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[2].id).to.equal(3);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[3].id).to.equal(4);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[4].id).to.equal(5);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[5].id).to.equal(6);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[6].id).to.equal(7);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[7].id).to.equal(8);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[8].id).to.equal(9);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[9].id).to.equal(10);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(11);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[11].id).to.equal(12);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(13);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[13].id).to.equal(14);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[14].id).to.equal(15);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(16);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[16].id).to.equal(17);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[17].id).to.equal(18);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[18].id).to.equal(19);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[19].id).to.equal(20);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[20].id).to.equal(21);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of edited Admin Dashboard users and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.user_id);
            assert.isOk(response.body.data.items, global.edit_user_fname);
            assert.isOk(response.body.data.items, global.user_lname);
            assert.isOk(response.body.data.items, global.final_email);
            assert.isOk(response.body.data.items, global.role_id);
            assert.isOk(response.body.data.items, global.role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the Admin Dashboard user last name and validate the response on super admin: PUT /api/v1/roles/', async () => 
    {
        var edit_user_lname = casual.last_name;

        global.edit_user_lname;
        
        const   update_user_1st_name_body = 
        {
            "firstName": global.updated_user_first_name,
            "lastName": edit_user_lname,
            "email": global.user_email_id,
            "id": global.user_id,
            "roleIds": [
                global.updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_user_1st_name_body)
        if (response.status == 200)
        {
            global.user_id = response.body.data.id;
            global.updated_user_first_name = response.body.data.firstName;
            global.user_last_name = response.body.data.lastName;
            global.user_email_id = response.body.data.email;
            global.updated_role_id = response.body.data.roles[0].id;
            global.updated_role_name = response.body.data.roles[0].name;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.lastName).to.equal(edit_user_lname);
            expect(response.body.data.email).to.equal(global.user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.role_id);
            expect(response.body.data.roles[0].name).to.equal(global.role_name);

            expect(response.body.data.permissions[0].id).to.equal(1);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(2);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[2].id).to.equal(3);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[3].id).to.equal(4);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[4].id).to.equal(5);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[5].id).to.equal(6);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[6].id).to.equal(7);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[7].id).to.equal(8);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[8].id).to.equal(9);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[9].id).to.equal(10);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(11);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[11].id).to.equal(12);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(13);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[13].id).to.equal(14);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[14].id).to.equal(15);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(16);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[16].id).to.equal(17);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[17].id).to.equal(18);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[18].id).to.equal(19);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[19].id).to.equal(20);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[20].id).to.equal(21);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of edited Admin Dashboard users and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.user_id);
            assert.isOk(response.body.data.items, global.updated_user_first_name);
            assert.isOk(response.body.data.items, global.edit_user_lname);
            assert.isOk(response.body.data.items, global.user_email_id);
            assert.isOk(response.body.data.items, global.updated_role_id);
            assert.isOk(response.body.data.items, global.role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the Admin Dashboard user email id and validate the response on super admin: PUT /api/v1/roles/', async () => 
    {
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        const e = new Date();
        let timestamp3 = e.getTime();
        var updated_final_email = str1+timestamp3+str2;
        
        const   update_user_email_body = 
        {
            "firstName": global.updated_user_first_name,
            "lastName": global.user_last_name,
            "email": updated_final_email,
            "id": global.user_id,
            "roleIds": [
                global.updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_user_email_body)
        if (response.status == 200)
        {
            global.user_id = response.body.data.id;
            global.updated_user_first_name = response.body.data.firstName;
            global.user_last_name = response.body.data.lastName;
            global.user_email_id = response.body.data.email;
            global.updated_role_id = response.body.data.roles[0].id;
            global.updated_role_name = response.body.data.roles[0].name;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.lastName).to.equal(global.user_last_name);
            expect(response.body.data.email).to.equal(updated_final_email);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.role_id);
            expect(response.body.data.roles[0].name).to.equal(global.role_name);

            expect(response.body.data.permissions[0].id).to.equal(1);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(2);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[2].id).to.equal(3);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[3].id).to.equal(4);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[4].id).to.equal(5);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[5].id).to.equal(6);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[6].id).to.equal(7);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[7].id).to.equal(8);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[8].id).to.equal(9);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[9].id).to.equal(10);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(11);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[11].id).to.equal(12);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(13);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[13].id).to.equal(14);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[14].id).to.equal(15);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(16);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[16].id).to.equal(17);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[17].id).to.equal(18);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[18].id).to.equal(19);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[19].id).to.equal(20);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[20].id).to.equal(21);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Admin Dashboard users and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.user_id);
            assert.isOk(response.body.data.items, global.updated_user_first_name);
            assert.isOk(response.body.data.items, global.user_last_name);
            assert.isOk(response.body.data.items, global.user_email_id);
            assert.isOk(response.body.data.items, global.updated_role_id);
            assert.isOk(response.body.data.items, global.updated_role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Add new Organisation Dashboard user with active status on super admin: POST /api/v1/users', async () => 
    {
        var org_user_fname = casual.first_name;
        var org_user_lname = casual.last_name;
        const org_str1 = 'rajeev+';
        const org_str2 = '@hubilo.com';
        const c = new Date();
        let timestamp2 = c.getTime();
        var org_final_email = org_str1+timestamp2+org_str2;

        global.org_user_fname;
        global.org_user_lname;
        global.org_final_email;
        
        const   add_org_user_body = 
        {
            "firstName": org_user_fname,
            "lastName": org_user_lname,
            "email": org_final_email,
            "roleIds": [
                global.updated_org_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_org_user_body)
        if (response.status == 200)
        {
            global.org_user_id = response.body.data.id;
            global.org_user_first_name = response.body.data.firstName;
            global.org_user_last_name = response.body.data.lastName;
            global.org_user_email_id = response.body.data.email;
            global.org_updated_role_id = response.body.data.roles[0].id;
            global.org_updated_role_name = response.body.data.roles[0].name;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(org_user_fname);
            expect(response.body.data.lastName).to.equal(org_user_lname);
            expect(response.body.data.email).to.equal(org_final_email);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.updated_org_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.updated_org_role_name);

            expect(response.body.data.permissions[0].id).to.equal(22);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(23);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[2].id).to.equal(24);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[3].id).to.equal(25);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[4].id).to.equal(26);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[5].id).to.equal(27);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[6].id).to.equal(28);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[7].id).to.equal(29);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[8].id).to.equal(30);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[9].id).to.equal(31);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(32);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[11].id).to.equal(33);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(34);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[13].id).to.equal(35);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[14].id).to.equal(36);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(37);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[16].id).to.equal(38);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[17].id).to.equal(39);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[18].id).to.equal(40);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[19].id).to.equal(41);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[20].id).to.equal(42);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[21].id).to.equal(43);
            expect(response.body.data.permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Organisation Dashboard users and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.org_user_id);
            assert.isOk(response.body.data.items, global.org_user_first_name);
            assert.isOk(response.body.data.items, global.org_user_last_name);
            assert.isOk(response.body.data.items, global.org_user_email_id);
            assert.isOk(response.body.data.items, global.org_updated_role_id);
            assert.isOk(response.body.data.items, global.org_updated_role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the added Organisation Dashboard user 1st name and validate the response on super admin: PUT /api/v1/users/', async () => 
    {
        var edit_org_user_fname = casual.first_name;
        global.edit_org_user_fname;
        
        const   update_org_user_1st_name_body = 
        {
            "firstName": edit_org_user_fname,
            "lastName": global.org_user_last_name,
            "email": global.org_user_email_id,
            "id": global.org_user_id,
            "roleIds": [
                global.org_updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.org_user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_org_user_1st_name_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(edit_org_user_fname);
            expect(response.body.data.lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.email).to.equal(global.org_user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.org_updated_role_name);

            global.org_user_id = response.body.data.id;
            global.org_user_first_name = response.body.data.firstName;
            global.org_user_last_name = response.body.data.lastName;
            global.org_user_email_id = response.body.data.email;
            global.org_updated_role_id = response.body.data.roles[0].id;
            global.org_updated_role_name = response.body.data.roles[0].name;

            expect(response.body.data.permissions[0].id).to.equal(22);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(23);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[2].id).to.equal(24);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[3].id).to.equal(25);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[4].id).to.equal(26);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[5].id).to.equal(27);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[6].id).to.equal(28);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[7].id).to.equal(29);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[8].id).to.equal(30);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[9].id).to.equal(31);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(32);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[11].id).to.equal(33);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(34);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[13].id).to.equal(35);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[14].id).to.equal(36);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(37);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[16].id).to.equal(38);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[17].id).to.equal(39);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[18].id).to.equal(40);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[19].id).to.equal(41);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[20].id).to.equal(42);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[21].id).to.equal(43);
            expect(response.body.data.permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Organisation Dashboard users 1st name and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {

            assert.isOk(response.body.data.items, global.org_user_id);
            assert.isOk(response.body.data.items, global.org_user_first_name);
            assert.isOk(response.body.data.items, global.org_user_last_name);
            assert.isOk(response.body.data.items, global.org_user_email_id);
            assert.isOk(response.body.data.items, global.org_updated_role_id);
            assert.isOk(response.body.data.items, global.org_updated_role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the added Organisation Dashboard user last name and validate the response on super admin: PUT /api/v1/users/', async () => 
    {
        var edit_org_user_lname = casual.last_name;
        global.edit_org_user_lname;
        
        const   update_org_user_last_name_body = 
        {
            "firstName": global.org_user_first_name,
            "lastName": edit_org_user_lname,
            "email": global.org_user_email_id,
            "id": global.org_user_id,
            "roleIds": [
                global.org_updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.org_user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_org_user_last_name_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.lastName).to.equal(edit_org_user_lname);
            expect(response.body.data.email).to.equal(global.org_user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.org_updated_role_name);

            global.org_user_id = response.body.data.id;
            global.org_user_first_name = response.body.data.firstName;
            global.org_user_last_name = response.body.data.lastName;
            global.org_user_email_id = response.body.data.email;
            global.org_updated_role_id = response.body.data.roles[0].id;
            global.org_updated_role_name = response.body.data.roles[0].name;

            expect(response.body.data.permissions[0].id).to.equal(22);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(23);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[2].id).to.equal(24);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[3].id).to.equal(25);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[4].id).to.equal(26);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[5].id).to.equal(27);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[6].id).to.equal(28);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[7].id).to.equal(29);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[8].id).to.equal(30);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[9].id).to.equal(31);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(32);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[11].id).to.equal(33);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(34);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[13].id).to.equal(35);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[14].id).to.equal(36);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(37);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[16].id).to.equal(38);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[17].id).to.equal(39);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[18].id).to.equal(40);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[19].id).to.equal(41);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[20].id).to.equal(42);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[21].id).to.equal(43);
            expect(response.body.data.permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Organisation Dashboard users last name and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.org_user_id);
            assert.isOk(response.body.data.items, global.org_user_first_name);
            assert.isOk(response.body.data.items, global.org_user_last_name);
            assert.isOk(response.body.data.items, global.org_user_email_id);
            assert.isOk(response.body.data.items, global.org_updated_role_id);
            assert.isOk(response.body.data.items, global.org_updated_role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit and update the added Organisation Dashboard user email id and validate the response on super admin: PUT /api/v1/users/', async () => 
    {
        const str1 = 'rajeev+';
        const str2 = '@hubilo.com';
        const f = new Date();
        let timestamp4 = f.getTime();
        var updated_final_email = str1+timestamp4+str2;
        
        const   update_org_user_email_body = 
        {
            "firstName": global.org_user_first_name,
            "lastName": global.org_user_last_name,
            "email": updated_final_email,
            "id": global.org_user_id,
            "roleIds": [
                global.org_updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.org_user_id, {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', update_org_user_email_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.email).to.equal(updated_final_email);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.org_updated_role_name);

            global.org_user_id = response.body.data.id;
            global.org_user_first_name = response.body.data.firstName;
            global.org_user_last_name = response.body.data.lastName;
            global.org_user_email_id = response.body.data.email;
            global.org_updated_role_id = response.body.data.roles[0].id;
            global.org_updated_role_name = response.body.data.roles[0].name;

            expect(response.body.data.permissions[0].id).to.equal(22);
            expect(response.body.data.permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[1].id).to.equal(23);
            expect(response.body.data.permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[2].id).to.equal(24);
            expect(response.body.data.permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[3].id).to.equal(25);
            expect(response.body.data.permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[4].id).to.equal(26);
            expect(response.body.data.permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[5].id).to.equal(27);
            expect(response.body.data.permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[6].id).to.equal(28);
            expect(response.body.data.permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[7].id).to.equal(29);
            expect(response.body.data.permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[8].id).to.equal(30);
            expect(response.body.data.permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[9].id).to.equal(31);
            expect(response.body.data.permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[10].id).to.equal(32);
            expect(response.body.data.permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[11].id).to.equal(33);
            expect(response.body.data.permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[12].id).to.equal(34);
            expect(response.body.data.permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[13].id).to.equal(35);
            expect(response.body.data.permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[14].id).to.equal(36);
            expect(response.body.data.permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[15].id).to.equal(37);
            expect(response.body.data.permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[16].id).to.equal(38);
            expect(response.body.data.permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[17].id).to.equal(39);
            expect(response.body.data.permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[18].id).to.equal(40);
            expect(response.body.data.permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[19].id).to.equal(41);
            expect(response.body.data.permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[20].id).to.equal(42);
            expect(response.body.data.permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.permissions[21].id).to.equal(43);
            expect(response.body.data.permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Fetch the list of added Organisation Dashboard users email id and assert the response on the super admin: GET /api/v1/users?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.org_user_id);
            assert.isOk(response.body.data.items, global.org_user_first_name);
            assert.isOk(response.body.data.items, global.org_user_last_name);
            assert.isOk(response.body.data.items, global.org_user_email_id);
            assert.isOk(response.body.data.items, global.org_updated_role_id);
            assert.isOk(response.body.data.items, global.org_updated_role_name);

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding duplicate Admin Dashboard user on super admin & validate the response.: POST /api/v1/users', async () => 
    {
        const   add_duplicate_admin_user_body = 
        {
            "firstName": global.updated_user_first_name,
            "lastName": global.user_last_name,
            "email": global.user_email_id,
            "roleIds": [
                global.role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_duplicate_admin_user_body, 409)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_duplicate_user_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding duplicate Org Dashboard user on super admin & validate the response.: POST /api/v1/users', async () => 
    {
        const   add_duplicate_org_user_body = 
        {
            "firstName": global.org_user_first_name,
            "lastName": global.org_user_last_name,
            "email": global.org_user_email_id,
            "roleIds": [
                global.org_updated_role_id
            ],
            "isDeactivated": false
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_duplicate_org_user_body, 409)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_duplicate_user_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})