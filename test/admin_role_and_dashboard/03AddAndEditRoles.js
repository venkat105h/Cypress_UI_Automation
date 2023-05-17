/*
Author: Rajeev Pramanik
Description: This Script will add new roles with verification and edit role with verification as an super admin in dashboard.
Timestamp: 18th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { assert,expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var casual = require('casual');

describe('Add with verify and edit with verify roles.', () => {

    it.only('Try adding Admin Dashboard roles with blank name on super admin: POST /api/v1/roles', async () => 
    {
        var role_description = casual.description;
        global.role_description;

        const   invalid_add_role_body = 
        {
            "name": "",
            "description": role_description,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.minLength).to.equal(Responsemessages.parameter_char_count_should_be_more_thatn_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding Admin Dashboard roles with blank name & description on super admin: POST /api/v1/roles', async () => 
    {
        const   invalid_add_role_body = 
        {
            "name": "",
            "description": "",
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.minLength).to.equal(Responsemessages.parameter_char_count_should_be_more_thatn_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding Org Dashboard roles with blank name on super admin: POST /api/v1/roles', async () => 
    {
        var role_description = casual.description;
        global.role_description;

        const   invalid_add_role_body = 
        {
            "name": "",
            "description": role_description,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.minLength).to.equal(Responsemessages.parameter_char_count_should_be_more_thatn_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding Org Dashboard roles with blank name & description on super admin: POST /api/v1/roles', async () => 
    {
        const   invalid_add_role_body = 
        {
            "name": "",
            "description": "",
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.minLength).to.equal(Responsemessages.parameter_char_count_should_be_more_thatn_1_alert_as_value);
            expect(response.body.errors[0].constraints.isNotEmpty).to.equal(Responsemessages.parameter_name_should_not_be_empty_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding Dashboard roles only without permissions value on super admin: POST /api/v1/roles', async () => 
    {
        var role_title = casual.title;
        var role_description = casual.description;

        global.role_title;
        global.role_description;

        const   invalid_add_role_body = 
        {
            "name": role_title,
            "description": role_description,
            "permissions": [
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {

            expect(response.body.errors[0].target.name).to.equal(role_title);
            expect(response.body.errors[0].target.description).to.equal(role_description);

            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.arrayMinSize).to.equal(Responsemessages.parameter_permission_value_missing_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding Dashboard roles only without permissions key:value on super admin: POST /api/v1/roles', async () => 
    {
        var role_title = casual.title;
        var role_description = casual.description;

        global.role_title;
        global.role_description;

        const   invalid_add_role_body = 
        {
            "name": role_title,
            "description": role_description
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {

            expect(response.body.errors[0].target.name).to.equal(role_title);
            expect(response.body.errors[0].target.description).to.equal(role_description);

            expect(response.body.message).to.equal(Responsemessages.parameter_invalid_name_role_alert_as_value);
            expect(response.body.errors[0].constraints.arrayMinSize).to.equal(Responsemessages.parameter_permission_value_missing_alert_as_value);
            expect(response.body.errors[0].constraints.isArray).to.equal(Responsemessages.parameter_permission_key_value_alert_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.skip('Try adding Admin Dashboard roles with name without string on super admin: POST /api/v1/roles', async () => 
    {
        var role_description = casual.description;
        global.role_description;

        var only_char = qwerty
        global.only_char;

        const   invalid_add_role_body = 
        {
            "name": only_char,
            "description": role_description,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 500)
        if (response.status != 200)
        {
            assert.exists(response.body.error, Responsemessages.parameter_unexpected_role_name_alert_as_value)
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.skip('Try adding Admin Dashboard roles with name & description without string on super admin: POST /api/v1/roles', async () => 
    {
        var role_title = casual.title;
        global.role_title;

        const   invalid_add_role_body = 
        {
            "name": role_title,
            "description": global.only_char,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            assert.exists(response.body.error, Responsemessages.parameter_unexpected_role_name_alert_as_value)
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.skip('Try adding Org Dashboard roles with name without string on super admin: POST /api/v1/roles', async () => 
    {
        var role_description = casual.description;
        global.role_description;

        const   invalid_add_role_body = 
        {
            "name": global.only_char,
            "description": role_description,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 500)
        if (response.status != 200)
        {
            assert.exists(response.body.error, Responsemessages.parameter_unexpected_role_name_alert_as_value)
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.skip('Try adding Org Dashboard roles with name & description without string on super admin: POST /api/v1/roles', async () => 
    {
        var role_title = casual.title;
        global.role_title;

        const   invalid_add_role_body = 
        {
            "name": role_title,
            "description": global.only_char,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', invalid_add_role_body, 400)
        if (response.status != 200)
        {
            assert.exists(response.body.error, Responsemessages.parameter_unexpected_role_name_alert_as_value)
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Super Admin Check All permission [Read]: true - Fetch the permission and assert the response: GET /api/v1/permissions', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/permissions', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            
            expect(response.body.data[0].id).to.equal(1);
            expect(response.body.data[0].name).to.equal(Responsemessages.parameter_Overview_as_value);
            expect(response.body.data[0].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[0].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[0].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[0].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[0].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[0].code).to.equal(Responsemessages.parameter_A_O_OVERVIEW_as_value);

            expect(response.body.data[1].id).to.equal(2);
            expect(response.body.data[1].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[1].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[1].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[1].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[1].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[1].name).to.equal(Responsemessages.parameter_Organiser_Profile_as_value);
            expect(response.body.data[1].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_PROFILE__as_value);

            expect(response.body.data[2].id).to.equal(3);
            expect(response.body.data[2].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[2].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[2].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[2].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[2].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[2].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);
            expect(response.body.data[2].code).to.equal(Responsemessages.parameter_A_O_FEATURES_AND_PRICING_as_value);

            expect(response.body.data[3].id).to.equal(4);
            expect(response.body.data[3].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[3].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[3].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[3].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[3].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[3].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);
            expect(response.body.data[3].code).to.equal(Responsemessages.parameter_A_O_FEES_AND_COMMISSIONS_as_value);

            expect(response.body.data[4].id).to.equal(5);
            expect(response.body.data[4].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[4].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[4].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[4].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[4].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[4].name).to.equal(Responsemessages.parameter_Organiser_Settings_as_value);
            expect(response.body.data[4].code).to.equal(Responsemessages.parameter_A_O_ORGANISER_SETTINGS_as_value);

            expect(response.body.data[5].id).to.equal(6);
            expect(response.body.data[5].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[5].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[5].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[5].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[5].type).to.equal(Responsemessages.parameter_ORGANISATIONS_as_value);
            expect(response.body.data[5].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value);
            expect(response.body.data[5].code).to.equal(Responsemessages.parameter_A_O_CERTIFICATE_TOKEN_as_value);

            expect(response.body.data[6].id).to.equal(7);
            expect(response.body.data[6].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[6].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[6].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[6].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[6].name).to.equal(Responsemessages.parameter_Overview_as_value);
            expect(response.body.data[6].code).to.equal(Responsemessages.parameter_A_E_OVERVIEW_as_value);

            expect(response.body.data[7].id).to.equal(8);
            expect(response.body.data[7].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[7].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[7].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[7].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[7].name).to.equal(Responsemessages.parameter_Event_Settings_as_value);
            expect(response.body.data[7].code).to.equal(Responsemessages.parameter_A_E_EVENT_SETTINGS_as_value);

            expect(response.body.data[8].id).to.equal(9);
            expect(response.body.data[8].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[8].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[8].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[8].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[8].name).to.equal(Responsemessages.parameter_Fees_n_Commissions_as_value);
            expect(response.body.data[8].code).to.equal(Responsemessages.parameter_A_E_FEES_AND_COMMISSIONS_as_value);

            expect(response.body.data[9].id).to.equal(10);
            expect(response.body.data[9].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[9].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[9].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[9].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[9].name).to.equal(Responsemessages.parameter_Ticketing_Transfer_as_value);
            expect(response.body.data[9].code).to.equal(Responsemessages.parameter_A_E_TICKETING_TRANSFER_as_value);

            expect(response.body.data[10].id).to.equal(11);
            expect(response.body.data[10].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[10].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[10].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[10].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[10].name).to.equal(Responsemessages.parameter_Features_n_Pricing_as_value);
            expect(response.body.data[10].code).to.equal(Responsemessages.parameter_A_E_FEATURES_AND_PRICING_as_value);

            expect(response.body.data[11].id).to.equal(12);
            expect(response.body.data[11].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[11].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[11].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[11].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[11].name).to.equal(Responsemessages.parameter_Coupon_Codes_as_value);
            expect(response.body.data[11].code).to.equal(Responsemessages.parameter_A_E_COUPON_CODES_as_value);

            expect(response.body.data[12].id).to.equal(13);
            expect(response.body.data[12].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[12].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[12].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[12].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[12].name).to.equal(Responsemessages.parameter_App_Settings_as_value);
            expect(response.body.data[12].code).to.equal(Responsemessages.parameter_A_E_APP_SETTINGS_as_value);

            expect(response.body.data[13].id).to.equal(14);
            expect(response.body.data[13].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[13].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[13].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[13].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[13].name).to.equal(Responsemessages.parameter_App_Notification_as_value);
            expect(response.body.data[13].code).to.equal(Responsemessages.parameter_A_E_APP_NOTIFICATION_as_value);

            expect(response.body.data[14].id).to.equal(15);
            expect(response.body.data[14].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[14].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[14].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[14].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[14].name).to.equal(Responsemessages.parameter_Webinar_Hosts_as_value);
            expect(response.body.data[14].code).to.equal(Responsemessages.parameter_A_E_WEBINAR_HOSTS_as_value);

            expect(response.body.data[15].id).to.equal(16);
            expect(response.body.data[15].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[15].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[15].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[15].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[15].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[15].name).to.equal(Responsemessages.parameter_Session_Streams_as_value);
            expect(response.body.data[15].code).to.equal(Responsemessages.parameter_A_E_SESSION_STREAMS_as_value);

            expect(response.body.data[16].id).to.equal(17);
            expect(response.body.data[16].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[16].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[16].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[16].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[16].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[16].name).to.equal(Responsemessages.parameter_Certificates_n_Tokens_as_value);
            expect(response.body.data[16].code).to.equal(Responsemessages.parameter_A_E_CERTIFICATE_TOKEN_as_value);

            expect(response.body.data[17].id).to.equal(18);
            expect(response.body.data[17].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[17].writeEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[17].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[17].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[17].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data[17].name).to.equal(Responsemessages.parameter_My_Logs_as_value);
            expect(response.body.data[17].code).to.equal(Responsemessages.parameter_A_L_MY_LOGS_as_value);

            expect(response.body.data[18].id).to.equal(19);
            expect(response.body.data[18].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[18].writeEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[18].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[18].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[18].type).to.equal(Responsemessages.parameter_LOGS_as_value);
            expect(response.body.data[18].name).to.equal(Responsemessages.parameter_All_Logs_as_value);
            expect(response.body.data[18].code).to.equal(Responsemessages.parameter_A_L_ALL_LOGS_as_value);

            expect(response.body.data[19].id).to.equal(20);
            expect(response.body.data[19].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[19].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[19].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[19].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[19].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data[19].name).to.equal(Responsemessages.parameter_Users_as_value);
            expect(response.body.data[19].code).to.equal(Responsemessages.parameter_A_U_USERS_as_value);

            expect(response.body.data[20].id).to.equal(21);
            expect(response.body.data[20].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[20].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[20].deleteEnabled).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data[20].platform).to.equal(Responsemessages.parameter_ADMIN_DASHBOARD_as_value);
            expect(response.body.data[20].type).to.equal(Responsemessages.parameter_USERS_as_value);
            expect(response.body.data[20].name).to.equal(Responsemessages.parameter_Roles_as_value);
            expect(response.body.data[20].code).to.equal(Responsemessages.parameter_A_U_ROLES_as_value);

            expect(response.body.data[21].id).to.equal(22);
            expect(response.body.data[21].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[21].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[21].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[21].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[21].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[21].name).to.equal(Responsemessages.parameter_Overall_as_value);
            expect(response.body.data[21].code).to.equal(Responsemessages.parameter_O_E_OVERALL_as_value);

            expect(response.body.data[22].id).to.equal(23);
            expect(response.body.data[22].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[22].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[22].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[22].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[22].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[22].name).to.equal(Responsemessages.parameter_Registration_as_value);
            expect(response.body.data[22].code).to.equal(Responsemessages.parameter_O_E_REGISTRATION_as_value);

            expect(response.body.data[23].id).to.equal(24);
            expect(response.body.data[23].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[23].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[23].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[23].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[23].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[23].name).to.equal(Responsemessages.parameter_Sessions_as_value);
            expect(response.body.data[23].code).to.equal(Responsemessages.parameter_O_E_SESSIONS_as_value);

            expect(response.body.data[24].id).to.equal(25);
            expect(response.body.data[24].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[24].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[24].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[24].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[24].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[24].name).to.equal(Responsemessages.parameter_People_as_value);
            expect(response.body.data[24].code).to.equal(Responsemessages.parameter_O_E_PEOPLE_as_value);

            expect(response.body.data[25].id).to.equal(26);
            expect(response.body.data[25].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[25].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[25].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[25].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[25].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[25].name).to.equal(Responsemessages.parameter_Virtual_Booths_as_value);
            expect(response.body.data[25].code).to.equal(Responsemessages.parameter_O_E_VIRTUAL_BOOTHS_as_value);

            expect(response.body.data[26].id).to.equal(27);
            expect(response.body.data[26].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[26].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[26].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[26].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[26].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[26].name).to.equal(Responsemessages.parameter_Meetings_as_value);
            expect(response.body.data[26].code).to.equal(Responsemessages.parameter_O_E_MEETINGS_as_value);

            expect(response.body.data[27].id).to.equal(28);
            expect(response.body.data[27].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[27].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[27].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[27].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[27].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[27].name).to.equal(Responsemessages.parameter_Lounge_as_value);
            expect(response.body.data[27].code).to.equal(Responsemessages.parameter_O_E_LOUNGE_as_value);

            expect(response.body.data[28].id).to.equal(29);
            expect(response.body.data[28].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[28].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[28].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[28].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[28].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[28].name).to.equal(Responsemessages.parameter_Rooms_as_value);
            expect(response.body.data[28].code).to.equal(Responsemessages.parameter_O_E_ROOMS_as_value);

            expect(response.body.data[29].id).to.equal(30);
            expect(response.body.data[29].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[29].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[29].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[29].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[29].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[29].name).to.equal(Responsemessages.parameter_Engagement_as_value);
            expect(response.body.data[29].code).to.equal(Responsemessages.parameter_O_E_ENGAGEMENT_as_value);

            expect(response.body.data[30].id).to.equal(31);
            expect(response.body.data[30].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[30].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[30].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[30].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[30].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[30].name).to.equal(Responsemessages.parameter_Embedded_Apps_as_value);
            expect(response.body.data[30].code).to.equal(Responsemessages.parameter_O_E_EMBEDDED_APPS_as_value);

            expect(response.body.data[31].id).to.equal(32);
            expect(response.body.data[31].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[31].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[31].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[31].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[31].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[31].name).to.equal(Responsemessages.parameter_Branding_as_value);
            expect(response.body.data[31].code).to.equal(Responsemessages.parameter_O_E_BRANDING_as_value);

            expect(response.body.data[32].id).to.equal(33);
            expect(response.body.data[32].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[32].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[32].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[32].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[32].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[32].name).to.equal(Responsemessages.parameter_Analytics_as_value);
            expect(response.body.data[32].code).to.equal(Responsemessages.parameter_O_E_ANALYTICS_as_value);

            expect(response.body.data[33].id).to.equal(34);
            expect(response.body.data[33].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[33].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[33].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[33].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[33].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[33].name).to.equal(Responsemessages.parameter_Settings_as_value);
            expect(response.body.data[33].code).to.equal(Responsemessages.parameter_O_E_SETTINGS_as_value);

            expect(response.body.data[34].id).to.equal(35);
            expect(response.body.data[34].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[34].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[34].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[34].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[34].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[34].name).to.equal(Responsemessages.parameter_Recording_as_value);
            expect(response.body.data[34].code).to.equal(Responsemessages.parameter_O_E_RECORDING_as_value);

            expect(response.body.data[35].id).to.equal(36);
            expect(response.body.data[35].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[35].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[35].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[35].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[35].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data[35].name).to.equal(Responsemessages.parameter_File_Logs_as_value);
            expect(response.body.data[35].code).to.equal(Responsemessages.parameter_O_E_FILE_LOGS_as_value);

            expect(response.body.data[36].id).to.equal(37);
            expect(response.body.data[36].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[36].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[36].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[36].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[36].type).to.equal(Responsemessages.parameter_CONTACTS_as_value);
            expect(response.body.data[36].name).to.equal(Responsemessages.parameter_Overall_as_value);
            expect(response.body.data[36].code).to.equal(Responsemessages.parameter_O_C_OVERALL_as_value);

            expect(response.body.data[37].id).to.equal(38);
            expect(response.body.data[37].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[37].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[37].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[37].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[37].type).to.equal(Responsemessages.parameter_ANALYTICS_as_value);
            expect(response.body.data[37].name).to.equal(Responsemessages.parameter_Overall_as_value);
            expect(response.body.data[37].code).to.equal(Responsemessages.parameter_O_AN_OVERALL_as_value);

            expect(response.body.data[38].id).to.equal(39);
            expect(response.body.data[38].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[38].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[38].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[38].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[38].type).to.equal(Responsemessages.parameter_INTEGRATIONS_as_value);
            expect(response.body.data[38].name).to.equal(Responsemessages.parameter_All_Integrations_as_value);
            expect(response.body.data[38].code).to.equal(Responsemessages.parameter_O_I_ALL_INTEGRATIONS_as_value);

            expect(response.body.data[39].id).to.equal(40);
            expect(response.body.data[39].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[39].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[39].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[39].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[39].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data[39].name).to.equal(Responsemessages.parameter_Account_Details_as_value);
            expect(response.body.data[39].code).to.equal(Responsemessages.parameter_O_A_ACCOUNT_DETAILS_as_value);

            expect(response.body.data[40].id).to.equal(41);
            expect(response.body.data[40].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[40].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[40].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[40].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[40].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data[40].name).to.equal(Responsemessages.parameter_Payout_as_value);
            expect(response.body.data[40].code).to.equal(Responsemessages.parameter_O_A_PAYOUT_as_value);

            expect(response.body.data[41].id).to.equal(42);
            expect(response.body.data[41].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[41].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[41].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[41].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[41].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data[41].name).to.equal(Responsemessages.parameter_Team_as_value);
            expect(response.body.data[41].code).to.equal(Responsemessages.parameter_O_A_TEAM_as_value);

            expect(response.body.data[42].id).to.equal(43);
            expect(response.body.data[42].readEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[42].writeEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[42].deleteEnabled).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data[42].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data[42].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data[42].name).to.equal(Responsemessages.parameter_Subscription_Billings_as_value);
            expect(response.body.data[42].code).to.equal(Responsemessages.parameter_O_A_SUBSCRIPTION_AND_BILLINGS_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Add new Admin Dashboard roles on super admin: POST /api/v1/roles', async () => 
    {
        var role_title = casual.title;
        var role_description = casual.description;

        global.role_title;
        global.role_description;

        const   add_role_body = 
        {
            "name": role_title,
            "description": role_description,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_role_body)
        if (response.status == 200)
        {
            global.role_id = response.body.data.id;
            global.role_name = response.body.data.name;
            global.decsription = response.body.data.description;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.name).to.equal(role_title);
            expect(response.body.data.description).to.equal(role_description);
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

    it.only('Fetch the list of newly added Admin Dashboard roles and assert the response on the super admin: GET /api/v1/roles?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.role_id);
            assert.isOk(response.body.data.items, global.role_title);
            assert.isOk(response.body.data.items, global.role_description);
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit the newly added Admin Dashboard roles on super admin: PUT /api/v1/roles/'+process.env.role_id, async () => 
    {
        var put_role_title = casual.title;
        var put_role_description = casual.description;

        global.put_role_title;
        global.put_role_description;

        const   edit_role_body = 
        {
            "name": put_role_title,
            "description": put_role_description,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ],
            "id": global.role_id
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.role_id,{'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', edit_role_body)
        if (response.status == 200)
        {
            global.role_id = response.body.data.id;
            global.role_name = response.body.data.name;
            global.role_description = response.body.data.description;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.name).to.equal(put_role_title);
            expect(response.body.data.description).to.equal(put_role_description);
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

    it.only('Fetch the list of edited Admin Dashboard roles and assert the response on the super admin: GET /api/v1/roles?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.role_id);
            assert.isOk(response.body.data.items, global.put_role_title);
            assert.isOk(response.body.data.items, global.put_role_description);
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Add new Organisation Dashboard roles on super admin: POST /api/v1/roles', async () => 
    {
        var org_role_title = casual.title;
        var org_role_description = casual.description;

        global.org_role_title;
        global.org_role_description;

        const   org_role_body = 
        {
            "name": org_role_title,
            "description": org_role_description,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', org_role_body)
        if (response.status == 200)
        {
            global.org_role_id = response.body.data.id;
            global.org_role_name = response.body.data.name;
            global.org_role_decsription = response.body.data.description;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.name).to.equal(org_role_title);
            expect(response.body.data.description).to.equal(org_role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(22);
            expect(response.body.data.permissions[0].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(23);
            expect(response.body.data.permissions[1].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Registration_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(24);
            expect(response.body.data.permissions[2].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Sessions_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(25);
            expect(response.body.data.permissions[3].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_People_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(26);
            expect(response.body.data.permissions[4].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Virtual_Booths_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(27);
            expect(response.body.data.permissions[5].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Meetings_as_value);

            expect(response.body.data.permissions[6].permissionId).to.equal(28);
            expect(response.body.data.permissions[6].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Lounge_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(29);
            expect(response.body.data.permissions[7].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Rooms_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(30);
            expect(response.body.data.permissions[8].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Engagement_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(31);
            expect(response.body.data.permissions[9].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Embedded_Apps_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(32);
            expect(response.body.data.permissions[10].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Branding_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(33);
            expect(response.body.data.permissions[11].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Analytics_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(34);
            expect(response.body.data.permissions[12].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_Settings_as_value);

            expect(response.body.data.permissions[13].permissionId).to.equal(35);
            expect(response.body.data.permissions[13].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_Recording_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(36);
            expect(response.body.data.permissions[14].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_File_Logs_as_value);

            expect(response.body.data.permissions[15].permissionId).to.equal(37);
            expect(response.body.data.permissions[15].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_CONTACTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[16].permissionId).to.equal(38);
            expect(response.body.data.permissions[16].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_ANALYTICS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[17].permissionId).to.equal(39);
            expect(response.body.data.permissions[17].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_INTEGRATIONS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_All_Integrations_as_value);

            expect(response.body.data.permissions[18].permissionId).to.equal(40);
            expect(response.body.data.permissions[18].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_Account_Details_as_value);

            expect(response.body.data.permissions[19].permissionId).to.equal(41);
            expect(response.body.data.permissions[19].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Payout_as_value);

            expect(response.body.data.permissions[20].permissionId).to.equal(42);
            expect(response.body.data.permissions[20].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Team_as_value);

            expect(response.body.data.permissions[21].permissionId).to.equal(43);
            expect(response.body.data.permissions[21].roleId).to.equal(global.org_role_id);
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

    it.only('Fetch the list of newly added Organisation Dashboard roles and assert the response on the super admin: GET /api/v1/roles?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.org_role_id);
            assert.isOk(response.body.data.items, global.org_role_name);
            assert.isOk(response.body.data.items, global.org_role_decsription);
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Edit the newly added Organisation Dashboard roles on super admin: PUT /api/v1/roles/'+process.env.role_id, async () => 
    {
        var edit_role_title = casual.title;
        var edit_role_description = casual.description;

        global.edit_role_title;
        global.edit_role_description;

        const   edit_org_role_body = 
        {
            "name": edit_role_title,
            "description": edit_role_description,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ],
            "id": global.org_role_id
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles/'+global.org_role_id,{'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'put', edit_org_role_body)
        if (response.status == 200)
        {
            global.updated_org_role_id = response.body.data.id;
            global.updated_org_role_name = response.body.data.name;
            global.updated_org_role_description = response.body.data.description;

            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.name).to.equal(edit_role_title);
            expect(response.body.data.description).to.equal(edit_role_description);
            expect(response.body.data.isDeactivated).to.equal(Responsemessages.parameter_false_message);
            expect(response.body.data.isDefault).to.equal(Responsemessages.parameter_false_message);

            expect(response.body.data.permissions[0].permissionId).to.equal(22);
            expect(response.body.data.permissions[0].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[0].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[0].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[0].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[0].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[1].permissionId).to.equal(23);
            expect(response.body.data.permissions[1].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[1].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[1].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[1].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[1].name).to.equal(Responsemessages.parameter_Registration_as_value);

            expect(response.body.data.permissions[2].permissionId).to.equal(24);
            expect(response.body.data.permissions[2].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[2].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[2].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[2].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[2].name).to.equal(Responsemessages.parameter_Sessions_as_value);

            expect(response.body.data.permissions[3].permissionId).to.equal(25);
            expect(response.body.data.permissions[3].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[3].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[3].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[3].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[3].name).to.equal(Responsemessages.parameter_People_as_value);

            expect(response.body.data.permissions[4].permissionId).to.equal(26);
            expect(response.body.data.permissions[4].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[4].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[4].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[4].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[4].name).to.equal(Responsemessages.parameter_Virtual_Booths_as_value);

            expect(response.body.data.permissions[5].permissionId).to.equal(27);
            expect(response.body.data.permissions[5].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[5].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[5].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[5].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[5].name).to.equal(Responsemessages.parameter_Meetings_as_value);

            expect(response.body.data.permissions[6].permissionId).to.equal(28);
            expect(response.body.data.permissions[6].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[6].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[6].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[6].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[6].name).to.equal(Responsemessages.parameter_Lounge_as_value);

            expect(response.body.data.permissions[7].permissionId).to.equal(29);
            expect(response.body.data.permissions[7].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[7].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[7].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[7].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[7].name).to.equal(Responsemessages.parameter_Rooms_as_value);

            expect(response.body.data.permissions[8].permissionId).to.equal(30);
            expect(response.body.data.permissions[8].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[8].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[8].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[8].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[8].name).to.equal(Responsemessages.parameter_Engagement_as_value);

            expect(response.body.data.permissions[9].permissionId).to.equal(31);
            expect(response.body.data.permissions[9].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[9].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[9].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[9].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[9].name).to.equal(Responsemessages.parameter_Embedded_Apps_as_value);

            expect(response.body.data.permissions[10].permissionId).to.equal(32);
            expect(response.body.data.permissions[10].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[10].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[10].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[10].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[10].name).to.equal(Responsemessages.parameter_Branding_as_value);

            expect(response.body.data.permissions[11].permissionId).to.equal(33);
            expect(response.body.data.permissions[11].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[11].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[11].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[11].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[11].name).to.equal(Responsemessages.parameter_Analytics_as_value);

            expect(response.body.data.permissions[12].permissionId).to.equal(34);
            expect(response.body.data.permissions[12].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[12].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[12].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[12].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[12].name).to.equal(Responsemessages.parameter_Settings_as_value);

            expect(response.body.data.permissions[13].permissionId).to.equal(35);
            expect(response.body.data.permissions[13].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[13].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[13].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[13].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[13].name).to.equal(Responsemessages.parameter_Recording_as_value);

            expect(response.body.data.permissions[14].permissionId).to.equal(36);
            expect(response.body.data.permissions[14].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[14].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[14].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[14].type).to.equal(Responsemessages.parameter_EVENTS_as_value);
            expect(response.body.data.permissions[14].name).to.equal(Responsemessages.parameter_File_Logs_as_value);

            expect(response.body.data.permissions[15].permissionId).to.equal(37);
            expect(response.body.data.permissions[15].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[15].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[15].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[15].type).to.equal(Responsemessages.parameter_CONTACTS_as_value);
            expect(response.body.data.permissions[15].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[16].permissionId).to.equal(38);
            expect(response.body.data.permissions[16].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[16].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[16].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[16].type).to.equal(Responsemessages.parameter_ANALYTICS_as_value);
            expect(response.body.data.permissions[16].name).to.equal(Responsemessages.parameter_Overall_as_value);

            expect(response.body.data.permissions[17].permissionId).to.equal(39);
            expect(response.body.data.permissions[17].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[17].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[17].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[17].type).to.equal(Responsemessages.parameter_INTEGRATIONS_as_value);
            expect(response.body.data.permissions[17].name).to.equal(Responsemessages.parameter_All_Integrations_as_value);

            expect(response.body.data.permissions[18].permissionId).to.equal(40);
            expect(response.body.data.permissions[18].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[18].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[18].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[18].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[18].name).to.equal(Responsemessages.parameter_Account_Details_as_value);

            expect(response.body.data.permissions[19].permissionId).to.equal(41);
            expect(response.body.data.permissions[19].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[19].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[19].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[19].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[19].name).to.equal(Responsemessages.parameter_Payout_as_value);

            expect(response.body.data.permissions[20].permissionId).to.equal(42);
            expect(response.body.data.permissions[20].roleId).to.equal(global.org_role_id);
            expect(response.body.data.permissions[20].readGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].writeGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].deleteGranted).to.equal(Responsemessages.parameter_true_message);
            expect(response.body.data.permissions[20].platform).to.equal(Responsemessages.parameter_ORGANISER_DASHBOARD_as_value);
            expect(response.body.data.permissions[20].type).to.equal(Responsemessages.parameter_ACCOUNT_as_value);
            expect(response.body.data.permissions[20].name).to.equal(Responsemessages.parameter_Team_as_value);

            expect(response.body.data.permissions[21].permissionId).to.equal(43);
            expect(response.body.data.permissions[21].roleId).to.equal(global.org_role_id);
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

    it.only('Fetch the list of newly edited Organisation Dashboard roles and assert the response on the super admin: GET /api/v1/roles?page=0&limit=1000', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10000', {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            assert.isOk(response.body.data.items, global.updated_org_role_id);
            assert.isOk(response.body.data.items, global.updated_org_role_name);
            assert.isOk(response.body.data.items, global.updated_org_role_description);
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding duplicate Admin Dashboard roles on super admin and assert the response.: POST /api/v1/roles', async () => 
    {
        const   add_duplicate_admin_role_body = 
        {
            "name": global.role_name,
            "description": global.role_description,
            "permissions": [
                {
                    "permissionId": 1,
                    "code": "A-O-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 2,
                    "code": "A-O-ORGANISER_PROFILE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 3,
                    "code": "A-O-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 4,
                    "code": "A-O-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 5,
                    "code": "A-O-ORGANISER_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 6,
                    "code": "A-O-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 7,
                    "code": "A-E-OVERVIEW",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 8,
                    "code": "A-E-EVENT_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 9,
                    "code": "A-E-FEES_AND_COMMISSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 10,
                    "code": "A-E-TICKETING_TRANSFER",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 11,
                    "code": "A-E-FEATURES_AND_PRICING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 12,
                    "code": "A-E-COUPON_CODES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 13,
                    "code": "A-E-APP_SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 14,
                    "code": "A-E-APP_NOTIFICATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 15,
                    "code": "A-E-WEBINAR_HOSTS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 16,
                    "code": "A-E-SESSION_STREAMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 17,
                    "code": "A-E-CERTIFICATE_TOKEN",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 18,
                    "code": "A-L-MY_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 19,
                    "code": "A-L-ALL_LOGS",
                    "readGranted": true,
                    "writeGranted": false,
                    "deleteGranted": false
                },
                {
                    "permissionId": 20,
                    "code": "A-U-USERS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                },
                {
                    "permissionId": 21,
                    "code": "A-U-ROLES",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": false
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_duplicate_admin_role_body, 409)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_duplicate_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Try adding duplicate Org Dashboard roles on super admin and assert the response.: POST /api/v1/roles', async () => 
    {
        const   add_duplicate_org_role_body = 
        {
            "name": global.updated_org_role_name,
            "description": global.updated_org_role_description,
            "permissions": [
                {
                    "permissionId": 22,
                    "code": "O-E-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 23,
                    "code": "O-E-REGISTRATION",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 24,
                    "code": "O-E-SESSIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 25,
                    "code": "O-E-PEOPLE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 26,
                    "code": "O-E-VIRTUAL_BOOTHS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 27,
                    "code": "O-E-MEETINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 28,
                    "code": "O-E-LOUNGE",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 29,
                    "code": "O-E-ROOMS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 30,
                    "code": "O-E-ENGAGEMENT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 31,
                    "code": "O-E-EMBEDDED_APPS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 32,
                    "code": "O-E-BRANDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 33,
                    "code": "O-E-ANALYTICS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 34,
                    "code": "O-E-SETTINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 35,
                    "code": "O-E-RECORDING",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 36,
                    "code": "O-E-FILE_LOGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 37,
                    "code": "O-C-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 38,
                    "code": "O-AN-OVERALL",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 39,
                    "code": "O-I-ALL_INTEGRATIONS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 40,
                    "code": "O-A-ACCOUNT_DETAILS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 41,
                    "code": "O-A-PAYOUT",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 42,
                    "code": "O-A-TEAM",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                },
                {
                    "permissionId": 43,
                    "code": "O-A-SUBSCRIPTION_AND_BILLINGS",
                    "readGranted": true,
                    "writeGranted": true,
                    "deleteGranted": true
                }
            ]
        }
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles', {'accept':'application/json','Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'post', add_duplicate_org_role_body, 409)
        if (response.status != 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_duplicate_alert_as_value);
            expect(response.body.data).to.equal(Responsemessages.parameter_null_as_value);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })
    
})