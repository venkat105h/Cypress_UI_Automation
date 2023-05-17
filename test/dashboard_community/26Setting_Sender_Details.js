/*
Author: Gaurav Thapar
Description: This Script will update/verify settings sender details
Timestamp: 17th Sept 2021 11:30 AM
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog,sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();


describe('Sender Details', () => {
    beforeEach(function (done) {
        setTimeout(function () {
            done();
        }, environment.HTestDelay);
    });

    it.only('Get sender details in dashbaord: GET /backend/api/v2/events/settings/sender', async () => {

        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sender', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.senderDetails.email_from).to.equal('noreply@olibuh.com')
        expect(response.body.data.senderDetails.email_sender_name).to.equal('Team Hubilo')
    });

    it.only('Update Sender details in dashbaord: PUT /backend/api/v2/events/settings/sender', async () => {
        const sender_details =
        {
            "data": {
                "email_bcc": "api@mailinator.com",
                "email_cc": "api@mailinator.com",
                "email_from": "noreply@olibuh.com",
                "email_sender_name": "Team Hubilo"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sender', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', sender_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_sender_details_message)
    });

    it.only('Update Sender details with sender name upto 40 character length in dashbaord: PUT /backend/api/v2/events/settings/sender', async () => {

        var sender_name = 'Team Hubilo'.repeat(4)
        const sender_details =
        {
            "data": {
                "email_bcc": "api@mailinator.com",
                "email_cc": "api@mailinator.com",
                "email_from": "noreply@olibuh.com",
                "email_sender_name": sender_name
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sender', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', sender_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_sender_details_message)
    });


    it.only('Update Sender details with more than one mail in cc and bcc in dashbaord: PUT /backend/api/v2/events/settings/sender', async () => {
        const sender_details =
        {
            "data": {
                "email_bcc": "api@mailinator.com,tt@mailinator.com,wq@mailinator.com",
                "email_cc": "api@mailinator.com,tt@mailinator.com,wq@mailinator.com",
                "email_from": "noreply@olibuh.com",
                "email_sender_name": "Team Hubilo"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sender', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', sender_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_sender_details_message)
    });

    it.only('Reset Sender details to its default state in dashbaord: PUT /backend/api/v2/events/settings/sender', async () => {

        const sender_details =
        {
            "data": {
                "email_bcc": "",
                "email_cc": "",
                "email_from": "noreply@olibuh.com",
                "email_sender_name": "Team Hubilo"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/sender', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', sender_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_sender_details_message)
    });

    //<----------------------Integration Custom Integration------------------------>

    it.only('Configure Custom Integration Start Of <HEAD> with analytics code in dashboard: POST /backend/api/v2/integrations/custom', async () => {
        const custom_integration =
        {
            "data": {
                "tracking_header": "<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>",
                "tracking_body": "",
                "tracking_footer": ""
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/integrations/custom', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', custom_integration)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_custom_integration_message)
    });


    it.only('Configure Custom Integration Start Of <HEAD>,Start Of <BODY>,End Of <BODY> with analytics code in dashbaord: POST /backend/api/v2/integrations/custom', async () => {
        const custom_integration =
        {
            "data": {
                "tracking_header": "<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>",
                "tracking_body": "<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>",
                "tracking_footer": "<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/integrations/custom', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', custom_integration)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_custom_integration_message)
    });


    it.only('Get Custom Integration after configure in dashbaord: GET /backend/api/v2/integrations/custom', async () => {
       
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/integrations/custom', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.tracking_header).to.equal("<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>")
        expect(response.body.data.tracking_body).to.equal("<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>")
        expect(response.body.data.tracking_footer).to.equal("<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-54516992-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'UA-54516992-1');\n</script>")
    });



    it.only('Reset Custom Integration Start Of <HEAD>,Start Of <BODY>,End Of <BODY> with analytics code in dashboard: POST /backend/api/v2/integrations/custom', async () => {
        const custom_integration =
        {
            "data": {
                "tracking_header": "",
                "tracking_body": "",
                "tracking_footer": ""
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/integrations/custom', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', custom_integration)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_custom_integration_message)
    });


});