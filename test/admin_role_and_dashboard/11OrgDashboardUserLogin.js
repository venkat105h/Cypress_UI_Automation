/*
Author: Rajeev Pramanik
Description: This Script will Login as an super admin in dashboard.
Timestamp: 17th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import { sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import {expect} from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

describe('Login using a org dashboard user & store etoken.', () => {

    it.only('Make the added Org Dashboard user inactive by super admin and verify the response: PUT /api/v1/users/{{org_user_id}}', async () => 
    {
        const   org_user_inactive_body =
        {
            "id": global.org_user_id,
            "isDeactivated": true,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.org_user_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', org_user_inactive_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.org_user_id);
            expect(response.body.data.firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.email).to.equal(global.org_user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.org_updated_role_name);

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

    it.only('Try login for the inactive Org Dashboard user and validate the response.: POST /api/v1/users/login', async () => 
    {
        const   org_dash_user_login_body = 
        {
            "email": global.org_user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', org_dash_user_login_body, 403)
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

    it.only('Make the added Org Dashboard user active by super admin and verify the response: PUT /api/v1/users/{{user_id}}', async () => 
    {
        const   org_user_active_body =
        {
            "id": global.org_user_id,
            "isDeactivated": false,
            "activeType": "InActive"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/'+global.org_user_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', org_user_active_body)
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.id).to.equal(global.org_user_id);
            expect(response.body.data.firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.lastName).to.equal(global.org_user_last_name);
            expect(response.body.data.email).to.equal(global.org_user_email_id);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.hasLoggedIn).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.data.roles[0].name).to.equal(global.org_updated_role_name);

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

    it.only('Make the Org dashboard user login and store the etoken: POST /api/v1/users/login', async () => 
    {
        const   org_dash_user_login_body = 
        {
            "email": global.org_user_email_id,
            "password": "123456"
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users/login', {'Content-Type':'application/json'},'post', org_dash_user_login_body)
        if (response.status == 200)
        {
            global.org_dashboard_user_etoken = response.body.data.accessToken
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Validate the logged in Org Dashboard user AUTH and validate the response.: GET /backend/api/v1/auth/user', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/auth/user', {'Content-Type':'application/json', 'authorization':'Bearer '+global.org_dashboard_user_etoken, 'buildversion':'1.2'},'get')
        if (response.status == 200)
        {
            expect(response.body.user.id).to.equal(global.org_user_id);
            expect(response.body.user.firstName).to.equal(global.org_user_first_name);
            expect(response.body.user.lastName).to.equal(global.org_user_last_name);
            expect(response.body.user.email).to.equal(global.org_user_email_id);
            expect(response.body.user.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.user.hasLoggedIn).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.roles[0].id).to.equal(global.org_updated_role_id);
            expect(response.body.user.roles[0].name).to.equal(global.org_updated_role_name);

            expect(response.body.user.permissions[0].id).to.equal(22);
            expect(response.body.user.permissions[0].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[1].id).to.equal(23);
            expect(response.body.user.permissions[1].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.user.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[2].id).to.equal(24);
            expect(response.body.user.permissions[2].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.user.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[3].id).to.equal(25);
            expect(response.body.user.permissions[3].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.user.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[4].id).to.equal(26);
            expect(response.body.user.permissions[4].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.user.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[5].id).to.equal(27);
            expect(response.body.user.permissions[5].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.user.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[6].id).to.equal(28);
            expect(response.body.user.permissions[6].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.user.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[7].id).to.equal(29);
            expect(response.body.user.permissions[7].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.user.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[8].id).to.equal(30);
            expect(response.body.user.permissions[8].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.user.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[9].id).to.equal(31);
            expect(response.body.user.permissions[9].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.user.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[10].id).to.equal(32);
            expect(response.body.user.permissions[10].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.user.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[11].id).to.equal(33);
            expect(response.body.user.permissions[11].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.user.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[12].id).to.equal(34);
            expect(response.body.user.permissions[12].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.user.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[13].id).to.equal(35);
            expect(response.body.user.permissions[13].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.user.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[14].id).to.equal(36);
            expect(response.body.user.permissions[14].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.user.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[15].id).to.equal(37);
            expect(response.body.user.permissions[15].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[16].id).to.equal(38);
            expect(response.body.user.permissions[16].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[17].id).to.equal(39);
            expect(response.body.user.permissions[17].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.user.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[18].id).to.equal(40);
            expect(response.body.user.permissions[18].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.user.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[19].id).to.equal(41);
            expect(response.body.user.permissions[19].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.user.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[20].id).to.equal(42);
            expect(response.body.user.permissions[20].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.user.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[21].id).to.equal(43);
            expect(response.body.user.permissions[21].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.user.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})