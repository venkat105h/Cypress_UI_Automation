/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

describe('Role active with verify and inactive with verify.', () => {

    it.only('Make the added Admin Dashboard role inactive on the super admin and verify the response: PUT /api/v1/roles/{{user_role_id}}', async () => 
    {
        const   role_inactive_body =
        {
            "id": global.role_id,
            "isDeactivated": true,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', role_inactive_body)
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

    it.only('Make the added Admin Dashboard role active on the super admin and verify the response : PUT /api/v1/roles/{{user_role_id}}', async () => 
    {
        const   role_active_body =
        {
            "id": global.role_id,
            "isDeactivated": false,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', role_active_body)
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

    it.only('Make the added Organisation Dashboard role inactive on the super admin and verify the response: PUT /api/v1/roles/{{user_role_id}}', async () => 
    {
        const   role_org_inactive_body =
        {
            "id": global.org_updated_role_id,
            "isDeactivated": true,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.org_updated_role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', role_org_inactive_body)
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.org_updated_role_id);
            expect(response.body.data.name).to.equal(global.org_updated_role_name);
            expect(response.body.data.description).to.equal(global.updated_org_role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(22);
            expect(response.body.data.permissions[0].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(23);
            expect(response.body.data.permissions[1].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Registration_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(24);
            expect(response.body.data.permissions[2].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Sessions_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(25);
            expect(response.body.data.permissions[3].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_People_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(26);
            expect(response.body.data.permissions[4].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Virtual_Booths_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(27);
            expect(response.body.data.permissions[5].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Meetings_as_value);

            expect(response.body.data.permissions[6].permissionId).to.equal(28);
            expect(response.body.data.permissions[6].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Lounge_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(29);
            expect(response.body.data.permissions[7].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Rooms_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(30);
            expect(response.body.data.permissions[8].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Engagement_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(31);
            expect(response.body.data.permissions[9].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Embedded_Apps_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(32);
            expect(response.body.data.permissions[10].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Branding_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(33);
            expect(response.body.data.permissions[11].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Analytics_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(34);
            expect(response.body.data.permissions[12].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_Settings_as_value);

            expect(response.body.data.permissions[13].permissionId).to.equal(35);
            expect(response.body.data.permissions[13].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_Recording_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(36);
            expect(response.body.data.permissions[14].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_File_Logs_as_value);

            expect(response.body.data.permissions[15].permissionId).to.equal(37);
            expect(response.body.data.permissions[15].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_CONTACTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[16].permissionId).to.equal(38);
            expect(response.body.data.permissions[16].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_ANALYTICS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[17].permissionId).to.equal(39);
            expect(response.body.data.permissions[17].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_INTEGRATIONS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_All_Integrations_as_value);

            expect(response.body.data.permissions[18].permissionId).to.equal(40);
            expect(response.body.data.permissions[18].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_Account_Details_as_value);

            expect(response.body.data.permissions[19].permissionId).to.equal(41);
            expect(response.body.data.permissions[19].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Payout_as_value);

            expect(response.body.data.permissions[20].permissionId).to.equal(42);
            expect(response.body.data.permissions[20].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Team_as_value);

            expect(response.body.data.permissions[21].permissionId).to.equal(43);
            expect(response.body.data.permissions[21].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[21].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[21].name).to.equal(Responsemessages.parameter_Subscription_Billings_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Make the added Organisation Dashboard role active on the super admin and verify the response: PUT /api/v1/roles/{{user_role_id}}', async () => 
    {
        const   role_org_active_body =
        {
            "id": global.org_updated_role_id,
            "isDeactivated": false,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.org_updated_role_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', role_org_active_body)
        if (response.status == 200)
        {

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.org_updated_role_id);
            expect(response.body.data.name).to.equal(global.org_updated_role_name);
            expect(response.body.data.description).to.equal(global.updated_org_role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(22);
            expect(response.body.data.permissions[0].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(23);
            expect(response.body.data.permissions[1].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Registration_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(24);
            expect(response.body.data.permissions[2].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Sessions_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(25);
            expect(response.body.data.permissions[3].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_People_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(26);
            expect(response.body.data.permissions[4].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Virtual_Booths_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(27);
            expect(response.body.data.permissions[5].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Meetings_as_value);

            expect(response.body.data.permissions[6].permissionId).to.equal(28);
            expect(response.body.data.permissions[6].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Lounge_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(29);
            expect(response.body.data.permissions[7].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Rooms_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(30);
            expect(response.body.data.permissions[8].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Engagement_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(31);
            expect(response.body.data.permissions[9].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Embedded_Apps_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(32);
            expect(response.body.data.permissions[10].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Branding_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(33);
            expect(response.body.data.permissions[11].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Analytics_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(34);
            expect(response.body.data.permissions[12].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_Settings_as_value);

            expect(response.body.data.permissions[13].permissionId).to.equal(35);
            expect(response.body.data.permissions[13].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_Recording_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(36);
            expect(response.body.data.permissions[14].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_File_Logs_as_value);

            expect(response.body.data.permissions[15].permissionId).to.equal(37);
            expect(response.body.data.permissions[15].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_CONTACTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[16].permissionId).to.equal(38);
            expect(response.body.data.permissions[16].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_ANALYTICS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[17].permissionId).to.equal(39);
            expect(response.body.data.permissions[17].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_INTEGRATIONS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_All_Integrations_as_value);

            expect(response.body.data.permissions[18].permissionId).to.equal(40);
            expect(response.body.data.permissions[18].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_Account_Details_as_value);

            expect(response.body.data.permissions[19].permissionId).to.equal(41);
            expect(response.body.data.permissions[19].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Payout_as_value);

            expect(response.body.data.permissions[20].permissionId).to.equal(42);
            expect(response.body.data.permissions[20].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Team_as_value);

            expect(response.body.data.permissions[21].permissionId).to.equal(43);
            expect(response.body.data.permissions[21].roleId).to.equal(global.org_updated_role_id);
            expect(response.body.data.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[21].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[21].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[21].name).to.equal(Responsemessages.parameter_Subscription_Billings_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})