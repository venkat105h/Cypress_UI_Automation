/*
Author: Rajeev Pramanik
Description: This Script will Login as an super admin in dashboard.
Timestamp: 17th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import { sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

describe('Login using a admin dashboard user & store etoken.', () => {

    it.only('Make the added Admin Dashboard user role inactive by super admin and verify the response: PUT /api/v1/roles/{{global.role_id}}', async () => 
    {
        const   user_inactive_body =
        {
            "id": global.role_id,
            "isDeactivated": true,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', user_inactive_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.role_id);
            expect(response.body.data.name).to.equal(global.role_name);
            expect(response.body.data.description).to.equal(global.role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(1);
            expect(response.body.data.permissions[0].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overview_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(2);
            expect(response.body.data.permissions[1].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Organiser_Profile_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(3);
            expect(response.body.data.permissions[2].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(4);
            expect(response.body.data.permissions[3].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(5);
            expect(response.body.data.permissions[4].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Organiser_Settings_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(6);
            expect(response.body.data.permissions[5].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value);
 
            expect(response.body.data.permissions[6].permissionId).to.equal(7);
            expect(response.body.data.permissions[6].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Overview_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(8);
            expect(response.body.data.permissions[7].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Event_Settings_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(9);
            expect(response.body.data.permissions[8].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(10);
            expect(response.body.data.permissions[9].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Ticketing_Transfer_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(11);
            expect(response.body.data.permissions[10].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(12);
            expect(response.body.data.permissions[11].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Coupon_Codes_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(13);
            expect(response.body.data.permissions[12].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_App_Settings_as_value);
           
            expect(response.body.data.permissions[13].permissionId).to.equal(14);
            expect(response.body.data.permissions[13].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_App_Notification_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(15);
            expect(response.body.data.permissions[14].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_Webinar_Hosts_as_value);  

            expect(response.body.data.permissions[15].permissionId).to.equal(16);
            expect(response.body.data.permissions[15].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Session_Streams_as_value); 

            expect(response.body.data.permissions[16].permissionId).to.equal(17);
            expect(response.body.data.permissions[16].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value); 

            expect(response.body.data.permissions[17].permissionId).to.equal(18);
            expect(response.body.data.permissions[17].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_My_Logs_as_value); 

            expect(response.body.data.permissions[18].permissionId).to.equal(19);
            expect(response.body.data.permissions[18].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_All_Logs_as_value); 

            expect(response.body.data.permissions[19].permissionId).to.equal(20);
            expect(response.body.data.permissions[19].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Users_as_value); 

            expect(response.body.data.permissions[20].permissionId).to.equal(21);
            expect(response.body.data.permissions[20].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Roles_as_value); 

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try login for the inactive Admin Dashboard user role and validate the response.: POST /api/v1/users/login', async () => 
    {
        const   admin_dash_user_login_body = 
        {
            "email": global.user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', admin_dash_user_login_body, 403)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_inactive_role_and_user_login_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the added Admin Dashboard user role active by super admin and verify the response: PUT /api/v1/roles/{{global.updated_role_id}}', async () => 
    {
        const   user_inactive_body =
        {
            "id": global.role_id,
            "isDeactivated": false,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', user_inactive_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.role_id);
            expect(response.body.data.name).to.equal(global.role_name);
            expect(response.body.data.description).to.equal(global.role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(1);
            expect(response.body.data.permissions[0].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overview_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(2);
            expect(response.body.data.permissions[1].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Organiser_Profile_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(3);
            expect(response.body.data.permissions[2].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(4);
            expect(response.body.data.permissions[3].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(5);
            expect(response.body.data.permissions[4].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Organiser_Settings_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(6);
            expect(response.body.data.permissions[5].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value);
 
            expect(response.body.data.permissions[6].permissionId).to.equal(7);
            expect(response.body.data.permissions[6].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Overview_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(8);
            expect(response.body.data.permissions[7].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Event_Settings_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(9);
            expect(response.body.data.permissions[8].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(10);
            expect(response.body.data.permissions[9].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Ticketing_Transfer_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(11);
            expect(response.body.data.permissions[10].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(12);
            expect(response.body.data.permissions[11].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Coupon_Codes_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(13);
            expect(response.body.data.permissions[12].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_App_Settings_as_value);
           
            expect(response.body.data.permissions[13].permissionId).to.equal(14);
            expect(response.body.data.permissions[13].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_App_Notification_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(15);
            expect(response.body.data.permissions[14].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_Webinar_Hosts_as_value);  

            expect(response.body.data.permissions[15].permissionId).to.equal(16);
            expect(response.body.data.permissions[15].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Session_Streams_as_value); 

            expect(response.body.data.permissions[16].permissionId).to.equal(17);
            expect(response.body.data.permissions[16].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value); 

            expect(response.body.data.permissions[17].permissionId).to.equal(18);
            expect(response.body.data.permissions[17].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_My_Logs_as_value); 

            expect(response.body.data.permissions[18].permissionId).to.equal(19);
            expect(response.body.data.permissions[18].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_All_Logs_as_value); 

            expect(response.body.data.permissions[19].permissionId).to.equal(20);
            expect(response.body.data.permissions[19].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Users_as_value); 

            expect(response.body.data.permissions[20].permissionId).to.equal(21);
            expect(response.body.data.permissions[20].roleId).to.equal(global.role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Roles_as_value); 
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the admin dashboard user role active login and store the etoken: POST /api/v1/users/login', async () => 
    {
        const   admin_dash_user_login_body = 
        {
            "email": global.user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', admin_dash_user_login_body)
        if (response.status == 200)
        {
            global.admin_dashboard_user_etoken = response.body.data.accessToken
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the added Admin Dashboard user inactive by super admin and verify the response: PUT /api/v1/users/{{user_id}}', async () => 
    {
        const   user_inactive_body =
        {
            "id": global.user_id,
            "isDeactivated": true,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', user_inactive_body)
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.user_id);
            expect(response.body.data.firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.lastName).to.equal(global.user_last_name);
            expect(response.body.data.email).to.equal(global.user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_true_message);

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

    it.only('Try login for the inactive Admin Dashboard user and validate the response.: POST /api/v1/users/login', async () => 
    {
        const   admin_dash_user_login_body = 
        {
            "email": global.user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', admin_dash_user_login_body, 403)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ACCOUNT_Inactive_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the added Admin Dashboard user active by super admin and verify the response: PUT /api/v1/users/{{user_id}}', async () => 
    {
        const   user_active_body =
        {
            "id": global.user_id,
            "isDeactivated": false,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.user_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', user_active_body)
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.user_id);
            expect(response.body.data.firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.lastName).to.equal(global.user_last_name);
            expect(response.body.data.email).to.equal(global.user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_true_message);

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

    it.only('Make the admin dashboard user login and store the etoken: POST /api/v1/users/login', async () => 
    {
        const   admin_dash_user_login_body = 
        {
            "email": global.user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', admin_dash_user_login_body)
        if (response.status == 200)
        {
            global.admin_dashboard_user_etoken = response.body.data.accessToken
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Validate the logged in Admin Dashboard user AUTH and validate the response.: GET /backend/api/v1/auth/user', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/auth/user', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken, 'buildversion':'1.2'},'get')
        if (response.status == 200)
        {
            expect(response.body.user.id).to.equal(global.user_id);
            expect(response.body.user.firstName).to.equal(global.updated_user_first_name);
            expect(response.body.user.lastName).to.equal(global.user_last_name);
            expect(response.body.user.email).to.equal(global.user_email_id);
            expect(response.body.user.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.user.hasLoggedIn).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.roles[0].id).to.equal(global.role_id);
            expect(response.body.user.roles[0].name).to.equal(global.role_name);

            expect(response.body.user.permissions[0].id).to.equal(1);
            expect(response.body.user.permissions[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_R_W_D_as_value);
            expect(response.body.user.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[1].id).to.equal(2);
            expect(response.body.user.permissions[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE_R_W_as_value);
            expect(response.body.user.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[2].id).to.equal(3);
            expect(response.body.user.permissions[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.user.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[3].id).to.equal(4);
            expect(response.body.user.permissions[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.user.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[4].id).to.equal(5);
            expect(response.body.user.permissions[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_R_W_as_value);
            expect(response.body.user.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[5].id).to.equal(6);
            expect(response.body.user.permissions[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.user.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[6].id).to.equal(7);
            expect(response.body.user.permissions[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_R_W_as_value);
            expect(response.body.user.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[7].id).to.equal(8);
            expect(response.body.user.permissions[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_R_W_as_value);
            expect(response.body.user.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[8].id).to.equal(9);
            expect(response.body.user.permissions[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_R_W_as_value);
            expect(response.body.user.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[9].id).to.equal(10);
            expect(response.body.user.permissions[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_R_W_D_as_value);
            expect(response.body.user.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[10].id).to.equal(11);
            expect(response.body.user.permissions[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_R_W_as_value);
            expect(response.body.user.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[11].id).to.equal(12);
            expect(response.body.user.permissions[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_R_W_D_as_value);
            expect(response.body.user.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[12].id).to.equal(13);
            expect(response.body.user.permissions[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_R_W_as_value);
            expect(response.body.user.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[13].id).to.equal(14);
            expect(response.body.user.permissions[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_R_W_as_value);
            expect(response.body.user.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[14].id).to.equal(15);
            expect(response.body.user.permissions[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_R_W_D_as_value);
            expect(response.body.user.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[15].id).to.equal(16);
            expect(response.body.user.permissions[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_R_W_as_value);
            expect(response.body.user.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[16].id).to.equal(17);
            expect(response.body.user.permissions[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_R_W_as_value);
            expect(response.body.user.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[17].id).to.equal(18);
            expect(response.body.user.permissions[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_R_as_value);
            expect(response.body.user.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[17].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.user.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[18].id).to.equal(19);
            expect(response.body.user.permissions[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_R_as_value);
            expect(response.body.user.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[18].writeGranted).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.user.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[19].id).to.equal(20);
            expect(response.body.user.permissions[19].code).to.equal(Responsemessages.parameter_A_U_USERS_R_W_as_value);
            expect(response.body.user.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.user.permissions[20].id).to.equal(21);
            expect(response.body.user.permissions[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_R_W_as_value);
            expect(response.body.user.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_false_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the organisations data and validate User Type is displaying: GET /backend/api/v1/organisations', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/organisations', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            global.admin_dash_org_id_for_generate_token_api = response.body.data.organisationData[0].id;
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
            expect(response.body.data.organisationData[0]).to.have.all.keys("id", "user_role_id", "first_name", "last_name", "email", "support_pin", "img_profile", "organisation", "is_support_deactive", "created_at", "subscription_name");
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the organisations id generate-token and validate response: GET /backend/api/v1/organisations/org_id/generate-token', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/organisations/'+global.admin_dash_org_id_for_generate_token_api+'/generate-token', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            global.admin_dash_org_token_from_generate_token_api = response.body.data.token;
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the events data and validate User Type is displaying: GET /backend/api/v1/events', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/events', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
            expect(response.body).to.have.all.keys("status", "data");
            expect(response.body.data).to.have.all.keys("eventsData", "current_page", "total_count", "total_page");
            expect(response.body.data.eventsData[0]).to.have.all.keys("id", "organiser_id", "location_id", "name","start_time", "end_time", "created_at", "is_support_deactive", "is_deactive", "is_multi_event", "logo", "location", "organiser");
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the list of users: GET /api/v1/users?page=0&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body).to.have.all.keys("data", "message");
            expect(response.body.data).to.have.all.keys("items","totalCount", "totalPages", "currentPage");
            expect(response.body.data.items[0]).to.have.all.keys("id", "firstName", "lastName", "email", "isDeactivated", "hasLoggedIn", "roles", "permissions");
            expect(response.body.data.items[0].roles[0]).to.have.all.keys("id", "name");
            expect(response.body.data.items[0].permissions[0]).to.have.all.keys("id", "code","readGranted","writeGranted","deleteGranted");

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the list of roles: GET /api/v1/roles?page=0&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body).to.have.all.keys("data", "message");
            expect(response.body.data).to.have.all.keys("items","totalCount", "totalPages", "currentPage");
            expect(response.body.data.items[0]).to.have.all.keys("id", "name","description","isDeactivated","isDefault","permissions");
            expect(response.body.data.items[0].permissions[0]).to.have.all.keys("permissionId", "roleId","readGranted","writeGranted","deleteGranted","platform","type","name");

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the 1 pagination list of roles on the super admin: GET /api/v1/roles?page=1&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=1&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Admin Dashboard: Fetch the 1 pagination list of users on the super admin: GET /api/v1/users?page=1&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=1&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
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

    it.only('Admin Dashboard: Fetch the list of users and validating wether the user is activate, logged in and send invitation on the super admin: GET /api/v1/users?page=0&limit=10', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
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

    it.only('Admin Dashboard: Fetch the list of users present in the system: GET /api/v1/users?page=0&limit=3', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=3', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            global.total_users_added = 3;
            global.list_of_users_ids_for_mapping_single_role = [];

            for (var i=0; i<global.total_users_added; i++)
            {
                global.fetched_user_id = response.body.data.items[i].id;
                global.list_of_users_ids_for_mapping_single_role.push(global.fetched_user_id);
            }
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Send email invitation to the multiple added Admin Dashboard user by the admin  and verify the response: POST /api/v1/users/resend-invite-email', async () => 
    {
        const   user_email_invitation_body =
        {
            "userIds": global.list_of_users_ids_for_mapping_single_role
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/resend-invite-email', {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'post', user_email_invitation_body)
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