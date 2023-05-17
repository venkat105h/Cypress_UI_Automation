/*
Author: Rajeev Pramanik
Description: This Script will fetch the user api and role api as an super admin in dashboard.
Timestamp: 17th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest, emailaddress} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import {expect} from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var super_email = emailaddress[process.env.releaseenv + '_super_admin_email']

describe('Fetch and verify User list and Role list.', () => {

    it.only('Super Admin: Fetch the organisations data on the super admin and validate User Type is displaying: GET /backend/api/v1/organisations', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/organisations', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            global.super_admin_org_id_for_generate_token_api = response.body.data.organisationData[0].id;
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
            expect(response.body.data.organisationData[0]).to.have.all.keys("id", "user_role_id", "first_name", "last_name", "email", "support_pin", "img_profile", "organisation", "is_support_deactive", "created_at", "subscription_name");
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the organisations id generate-token on the super admin and validate response: GET /backend/api/v1/organisations/org_id/generate-token', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/organisations/'+global.super_admin_org_id_for_generate_token_api+'/generate-token', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            global.super_admin_org_token_from_generate_token_api = response.body.data.token;
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the events data on the super admin and validate User Type is displaying: GET /backend/api/v1/events', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/events', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
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

    it.only('Super Admin: Fetch the Logs on the super admin and validate User Type is displaying: GET /backend/api/v1/activitylog', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/activitylog', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.status).to.equal(Responsemessages.parameter_success_as_value);
            expect(response.body).to.have.all.keys("status","data");
            expect(response.body.data).to.have.all.keys("organisationData","current_page","total_count","total_page");
            expect(response.body.data.organisationData[0]).to.have.all.keys("hubilo_admin_id","msg","created_at","admin");
            expect(response.body.data.organisationData[0].admin).to.have.all.keys("id","first_name","last_name");

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch and Validate the logged in Org Dashboard user AUTH and validate the response.: GET /backend/api/v1/auth/user', async () => 
    {
        var response = await sendRequest(environment.baseURL5, '/backend/api/v1/auth/user', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.user.id).to.equal(2);
            expect(response.body.user.email).to.equal(super_email);
            expect(response.body.user.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.user.hasLoggedIn).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.roles[0].id).to.equal(1);
            expect(response.body.user.roles[0].name).to.equal("Super Admin");

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

            expect(response.body.user.permissions[21].id).to.equal(22);
            expect(response.body.user.permissions[21].code).to.equal(Responsemessages.parameter_O_E_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[21].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[21].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[21].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[22].id).to.equal(23);
            expect(response.body.user.permissions[22].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_R_W_D_as_value);
            expect(response.body.user.permissions[22].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[22].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[22].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[23].id).to.equal(24);
            expect(response.body.user.permissions[23].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_R_W_D_as_value);
            expect(response.body.user.permissions[23].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[23].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[23].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[24].id).to.equal(25);
            expect(response.body.user.permissions[24].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_R_W_D_as_value);
            expect(response.body.user.permissions[24].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[24].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[24].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[25].id).to.equal(26);
            expect(response.body.user.permissions[25].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_R_W_D_as_value);
            expect(response.body.user.permissions[25].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[25].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[25].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[26].id).to.equal(27);
            expect(response.body.user.permissions[26].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_R_W_D_as_value);
            expect(response.body.user.permissions[26].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[26].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[26].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[27].id).to.equal(28);
            expect(response.body.user.permissions[27].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_R_W_D_as_value);
            expect(response.body.user.permissions[27].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[27].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[27].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[28].id).to.equal(29);
            expect(response.body.user.permissions[28].code).to.equal(Responsemessages.parameter_O_E_ROOMS_R_W_D_as_value);
            expect(response.body.user.permissions[28].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[28].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[28].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[29].id).to.equal(30);
            expect(response.body.user.permissions[29].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_R_W_D_as_value);
            expect(response.body.user.permissions[29].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[29].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[29].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[30].id).to.equal(31);
            expect(response.body.user.permissions[30].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_R_W_D_as_value);
            expect(response.body.user.permissions[30].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[30].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[30].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[31].id).to.equal(32);
            expect(response.body.user.permissions[31].code).to.equal(Responsemessages.parameter_O_E_BRANDING_R_W_D_as_value);
            expect(response.body.user.permissions[31].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[31].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[31].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[32].id).to.equal(33);
            expect(response.body.user.permissions[32].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_R_W_D_as_value);
            expect(response.body.user.permissions[32].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[32].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[32].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[33].id).to.equal(34);
            expect(response.body.user.permissions[33].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_R_W_D_as_value);
            expect(response.body.user.permissions[33].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[33].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[33].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[34].id).to.equal(35);
            expect(response.body.user.permissions[34].code).to.equal(Responsemessages.parameter_O_E_RECORDING_R_W_D_as_value);
            expect(response.body.user.permissions[34].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[34].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[34].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[35].id).to.equal(36);
            expect(response.body.user.permissions[35].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_R_W_D_as_value);
            expect(response.body.user.permissions[35].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[35].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[35].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[36].id).to.equal(37);
            expect(response.body.user.permissions[36].code).to.equal(Responsemessages.parameter_O_C_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[36].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[36].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[36].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[37].id).to.equal(38);
            expect(response.body.user.permissions[37].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_R_W_D_as_value);
            expect(response.body.user.permissions[37].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[37].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[37].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[38].id).to.equal(39);
            expect(response.body.user.permissions[38].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_R_W_D_as_value);
            expect(response.body.user.permissions[38].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[38].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[38].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[39].id).to.equal(40);
            expect(response.body.user.permissions[39].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_R_W_D_as_value);
            expect(response.body.user.permissions[39].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[39].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[39].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[40].id).to.equal(41);
            expect(response.body.user.permissions[40].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_R_W_D_as_value);
            expect(response.body.user.permissions[40].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[40].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[40].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[41].id).to.equal(42);
            expect(response.body.user.permissions[41].code).to.equal(Responsemessages.parameter_O_A_TEAM_R_W_D_as_value);
            expect(response.body.user.permissions[41].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[41].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[41].deleteGranted).to.equal(Responsemessages.parameter_true_message);

            expect(response.body.user.permissions[42].id).to.equal(43);
            expect(response.body.user.permissions[42].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_R_W_D_as_value);
            expect(response.body.user.permissions[42].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[42].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.user.permissions[42].deleteGranted).to.equal(Responsemessages.parameter_true_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the list of users on the super admin: GET /api/v1/users?page=0&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
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

    it.only('Super Admin: Fetch the list of roles on the super admin: GET /api/v1/roles?page=0&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
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

    it.only('Super Admin: Fetch the 1 pagination list of roles on the super admin: GET /api/v1/roles?page=1&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=1&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin: Fetch the 1 pagination list of users on the super admin: GET /api/v1/users?page=1&limit=100', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=1&limit=100', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
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

})