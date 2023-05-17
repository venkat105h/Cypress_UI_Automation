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

describe('Filter the added roles/users.', () => {

    it.only('Filter only by added admin role by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(1);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(2);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(3);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(4);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(5);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(6);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(7);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(8);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(9);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(10);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(11);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(12);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(13);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(14);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(15);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(16);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(17);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(18);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(19);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(20);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(21);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin isDeactivated=false by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&&isDeactivated=false', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&&isDeactivated=false', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin isDeactivated=true by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&&isDeactivated=true', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&&isDeactivated=true', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(1);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(2);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(3);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(4);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(5);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(6);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(7);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(8);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(9);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(10);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(11);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(12);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(13);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(14);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(15);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(16);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(17);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(18);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(19);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(20);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(21);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=false by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=false', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=false', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(1);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(2);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(3);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(4);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(5);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(6);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(7);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(8);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(9);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(10);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(11);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(12);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(13);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(14);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(15);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(16);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(17);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(18);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(19);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(20);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(21);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=true by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=true', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=true', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=false&status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=false&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=false&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(1);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(2);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(3);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(4);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(5);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(6);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(7);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(8);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(9);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(10);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(11);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(12);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(13);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(14);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(15);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(16);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(17);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(18);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(19);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(20);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(21);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=true&status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=true&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=true&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=false&status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=false&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=false&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=true&status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=true&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=true&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=false&status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=false&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=false&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added admin role & isDeactivated=true&status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.role_id&isDeactivated=true&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.role_id+'&isDeactivated=true&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.org_user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.org_user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.org_updated_role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(22);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(23);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(24);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(25);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(26);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(27);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(28);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(29);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(30);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(31);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(32);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(33);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(34);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(35);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(36);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(37);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(38);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(39);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(40);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(41);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(42);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[21].id).to.equal(43);
            expect(response.body.data.items[0].permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.org_user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.org_user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.org_updated_role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(22);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(23);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(24);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(25);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(26);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(27);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(28);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(29);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(30);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(31);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(32);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(33);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(34);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(35);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(36);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(37);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(38);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(39);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(40);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(41);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(42);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[21].id).to.equal(43);
            expect(response.body.data.items[0].permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=false by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=false', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=false', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.org_user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.org_user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.org_updated_role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(22);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(23);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(24);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(25);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(26);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(27);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(28);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(29);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(30);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(31);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(32);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(33);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(34);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(35);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(36);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(37);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(38);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(39);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(40);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(41);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(42);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[21].id).to.equal(43);
            expect(response.body.data.items[0].permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=true by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=true', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=true', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=false&status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=false&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=false&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].id).to.equal(global.org_user_id);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.items[0].email).to.equal(global.org_user_email_id);
            expect(response.body.data.items[0].isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.items[0].hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.items[0].roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.items[0].roles[0].name).to.equal(global.org_updated_role_name);

            expect(response.body.data.items[0].permissions[0].id).to.equal(22);
            expect(response.body.data.items[0].permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[1].id).to.equal(23);
            expect(response.body.data.items[0].permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[2].id).to.equal(24);
            expect(response.body.data.items[0].permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[3].id).to.equal(25);
            expect(response.body.data.items[0].permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[4].id).to.equal(26);
            expect(response.body.data.items[0].permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[5].id).to.equal(27);
            expect(response.body.data.items[0].permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[6].id).to.equal(28);
            expect(response.body.data.items[0].permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[7].id).to.equal(29);
            expect(response.body.data.items[0].permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[8].id).to.equal(30);
            expect(response.body.data.items[0].permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[9].id).to.equal(31);
            expect(response.body.data.items[0].permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[10].id).to.equal(32);
            expect(response.body.data.items[0].permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[11].id).to.equal(33);
            expect(response.body.data.items[0].permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[12].id).to.equal(34);
            expect(response.body.data.items[0].permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[13].id).to.equal(35);
            expect(response.body.data.items[0].permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[14].id).to.equal(36);
            expect(response.body.data.items[0].permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[15].id).to.equal(37);
            expect(response.body.data.items[0].permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[16].id).to.equal(38);
            expect(response.body.data.items[0].permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[17].id).to.equal(39);
            expect(response.body.data.items[0].permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[18].id).to.equal(40);
            expect(response.body.data.items[0].permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[19].id).to.equal(41);
            expect(response.body.data.items[0].permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[20].id).to.equal(42);
            expect(response.body.data.items[0].permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.data.items[0].permissions[21].id).to.equal(43);
            expect(response.body.data.items[0].permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.data.items[0].permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.items[0].permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=true&status=INVITED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=true&status=INVITED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=true&status=INVITED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=false&status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=false&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=false&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=true&status=LOGGED_IN by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=true&status=LOGGED_IN', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=true&status=LOGGED_IN', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=false&status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=false&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=false&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Filter only by added Org role & isDeactivated=true&status=DEACTIVATED by the super admin and verify the response: GET /api/v1/users?page=0&limit=1000&roleIds[]=global.org_updated_role_id&isDeactivated=true&status=DEACTIVATED', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=1000&roleIds[]='+global.org_updated_role_id+'&isDeactivated=true&status=DEACTIVATED', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
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