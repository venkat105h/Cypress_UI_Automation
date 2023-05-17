/*
Author: Gaurav Thapar
Description: This Script will update/verify legal settings
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit 28th Dec 2021 20:00 PM
Description: Added new cookie policy change mandatory parameter for /backend/api/v2/brandyourevent/settings
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();
var fs = require('fs');

var host1


describe('Setting Legal Test Cases', () => {
    beforeEach(function (done) {
        setTimeout(function () {
            done();
        }, environment.HTestDelay);
    });

    it.only('Get Legal details in dashbaord: GET /backend/api/v2/events/settings/legal', async () => {
    
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.terms.label).to.equal('Terms and Conditions')
        expect(response.body.data.terms.is_show).to.equal(1)
        expect(response.body.data.privacy.label).to.equal('Privacy Policy')
        expect(response.body.data.privacy.is_show).to.equal(1)
        expect(response.body.data.cookie.label).to.equal('Cookie Policy')
        expect(response.body.data.cookie.is_show).to.equal(1)
    });


    it.only('Update Legal details for terms and condition is show off in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
        const seo_details =
        {
            "data": {
              "terms_description": "This is Terms and Description",
              "terms_label": "Terms and Conditions",
              "terms_is_link": 0,
              "terms_link": "",
              "terms_is_show": 0,
              "policy_description": "This is test policy",
              "policy_label": "Privacy Policy",
              "policy_is_link": 0,
              "policy_link": "",
              "policy_is_show": 1,
              "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
              "cookie_label": "Cookie Policy",
              "cookie_is_link": 0,
              "cookie_link": "",
              "cookie_is_show": 1,
              "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
              "dialog_position": "Banner Bottom",
              "dialog_type": "banner"
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
    });

      //Verify on community 

      it.only('Verify terms and condition is show off Permission on Community: POST /api/v2/platformNew/web-state-new', async () => {
         const community1 = {
            "payload": {
                "data": {
                    "url": process.env.communityv2url,
                    "app_version": "1.0.0",
                    "source": "COMMUNITY",
                    "device_type": "WEB",
                    "language": 34

                }
            }
        }

        var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', community1)
        expect(response.body.success.data.gdpr.terms_and_conditions.label).to.equal('Terms and Conditions')
        expect(response.body.success.data.gdpr.terms_and_conditions.link).to.equal('')
      
    });



    it.only('Update Legal details for Privacy Policy is show off in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
        const seo_details =
        {
            "data": {
              "terms_description": "This is Terms and Description",
              "terms_label": "Terms and Conditions",
              "terms_is_link": 0,
              "terms_link": "",
              "terms_is_show": 1,
              "policy_description": "This is test policy",
              "policy_label": "Privacy Policy",
              "policy_is_link": 0,
              "policy_link": "",
              "policy_is_show": 0,
              "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
              "cookie_label": "Cookie Policy",
              "cookie_is_link": 0,
              "cookie_link": "",
              "cookie_is_show": 1,
              "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
              "dialog_position": "Banner Bottom",
              "dialog_type": "banner"
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
    });

    //Verify on community 

    it.only('Verify terms and condition is show off Permission on Community: POST /api/v2/platformNew/web-state-new', async () => {
        const linkcomm = {
           "payload": {
               "data": {
                   "url": process.env.communityv2url,
                   "app_version": "1.0.0",
                   "source": "COMMUNITY",
                   "device_type": "WEB",
                   "language": 34

               }
           }
       }

       var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
       expect(response.body.success.data.gdpr.privacy_policy.label).to.equal('Privacy Policy')
       expect(response.body.success.data.gdpr.privacy_policy.link).to.equal('')
   });


   it.only('Update Legal details for Privacy Policy is show off in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
    const seo_details =
    {
        "data": {
          "terms_description": "This is Terms and Description",
          "terms_label": "Terms and Conditions",
          "terms_is_link": 0,
          "terms_link": "",
          "terms_is_show": 0,
          "policy_description": "This is test policy",
          "policy_label": "Privacy Policy",
          "policy_is_link": 0,
          "policy_link": "",
          "policy_is_show": 0,
          "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
          "cookie_label": "Cookie Policy",
          "cookie_is_link": 0,
          "cookie_link": "",
          "cookie_is_show": 0,
          "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
          "dialog_position": "Banner Bottom",
          "dialog_type": "banner"
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
});

 //Verify on community 

 it.only('Verify Cookies policy is show off Permission on Community: POST /api/v2/platformNew/web-state-new', async () => {
    const linkcomm = {
       "payload": {
           "data": {
               "url": process.env.communityv2url,
               "app_version": "1.0.0",
               "source": "COMMUNITY",
               "device_type": "WEB",
               "language": 34

           }
       }
   }

   var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
   expect(response.body.success.data.gdpr.cookie_policy.label).to.equal('Cookie Policy')
   expect(response.body.success.data.gdpr.cookie_policy.link).to.equal('')
});


it.only('Update Legal details for All is show on in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
    const seo_details =
    {
        "data": {
          "terms_description": "This is Terms and Description",
          "terms_label": "Terms and Conditions",
          "terms_is_link": 0,
          "terms_link": "",
          "terms_is_show": 1,
          "policy_description": "This is test policy",
          "policy_label": "Privacy Policy",
          "policy_is_link": 0,
          "policy_link": "",
          "policy_is_show": 1,
          "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
          "cookie_label": "Cookie Policy",
          "cookie_is_link": 0,
          "cookie_link": "",
          "cookie_is_show": 1,
          "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
          "dialog_position": "Banner Bottom",
          "dialog_type": "banner"
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
});


//Verify on community 

it.only('Verify Cookies policy is show off Permission on Community: POST /api/v2/platformNew/web-state-new', async () => {
    const linkcomm = {
       "payload": {
           "data": {
               "url": process.env.communityv2url,
               "app_version": "1.0.0",
               "source": "COMMUNITY",
               "device_type": "WEB",
               "language": 34

           }
       }
   }

   var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
   expect(response.body.success.data.gdpr.cookie_policy.label).to.equal('Cookie Policy')
});


it.only('Update Legal details lable name for All is show on in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
    const seo_details =
    {
        "data": {
          "terms_description": "This is Terms and Description",
          "terms_label": "Terms and Conditions Update",
          "terms_is_link": 0,
          "terms_link": "",
          "terms_is_show": 1,
          "policy_description": "This is test policy",
          "policy_label": "Privacy Policy Update",
          "policy_is_link": 0,
          "policy_link": "",
          "policy_is_show": 1,
          "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
          "cookie_label": "Cookie Policy Update",
          "cookie_is_link": 0,
          "cookie_link": "",
          "cookie_is_show": 1,
          "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
          "dialog_position": "Banner Bottom",
          "dialog_type": "banner"
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
});


it.only('Verify With Updated lable name of term and conditions, privacy policy, Cookie Policy on Community: POST /api/v2/platformNew/web-state-new', async () => {
    const linkcomm = {
       "payload": {
           "data": {
               "url": process.env.communityv2url,
               "app_version": "1.0.0",
               "source": "COMMUNITY",
               "device_type": "WEB",
               "language": 34

           }
       }
   }

   var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
   expect(response.body.success.data.gdpr.terms_and_conditions.label).to.equal('Terms and Conditions Update')
   expect(response.body.success.data.gdpr.privacy_policy.label).to.equal('Privacy Policy Update')
   expect(response.body.success.data.gdpr.cookie_policy.label).to.equal('Cookie Policy Update')
});


it.only('Update Legal details lable name for All is show on in dashbaord: PUT /backend/api/v2/events/settings/legal', async () => {
    const seo_details =
    {
        "data": {
          "terms_description": "This is Terms and Description",
          "terms_label": "Terms and Conditions Update",
          "terms_is_link": 1,
          "terms_link": "https://legal.demohubilo.com/terms",
          "terms_is_show": 1,
          "policy_description": "This is test policy",
          "policy_label": "Privacy Policy Update",
          "policy_is_link": 1,
          "policy_link": "https://legal.demohubilo.com/privacy",
          "policy_is_show": 1,
          "cookie_description": "<p>Here is the cookie policy document of (Event Name) (&ldquo;we, &ldquo;us,&rdquo; &ldquo;our&rdquo;) which guides you through the process of use of cookies of the website visitors and networking platform users of the Event.</p>\n<p>It refers to the information collected from (website URL) and any webpage/social accounts linked to it and how securely it is stored. The cookie policy of the Event will be updated regularly when incorporating any new security regulations.</p>\n<p>Our website uses a small text file to collect the attendees&rsquo; information with Cookies. We may use cookies to collect information about the user activities on the site to use this as an opportunity to improvise on the website experience and services.</p>\n<p>Most browsers allow the users to control cookies.</p>\n<p><strong>What kind of cookies do we collect?</strong></p>\n<p>Our event website and networking community collects cookies in the form of user tokens.</p>\n<p><strong>How do we use these cookies?</strong></p>\n<p>We use in the form of tokens to authorize users with the iFrame compatibility on our website and community platform. These cookies are collected as they are necessary for the platforms to function.</p>",
          "cookie_label": "Cookie Policy Update",
          "cookie_is_link": 1,
          "cookie_link": "https://legal.demohubilo.com/cookies",
          "cookie_is_show": 1,
          "banner_message": "We use cookies to improve your experience on our site. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies. To get more information about these cookies check our Cookie Policy.",
          "dialog_position": "Banner Bottom",
          "dialog_type": "banner"
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/legal', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_legal_update)
});
    

it.only('Verify With Updated link of term and conditions, privacy policy, Cookie Policy on Community: POST /api/v2/platformNew/web-state-new', async () => {
    const linkcomm = {
       "payload": {
           "data": {
               "url": process.env.communityv2url,
               "app_version": "1.0.0",
               "source": "COMMUNITY",
               "device_type": "WEB",
               "language": 34

           }
       }
   }

   var response = await sendRequest(environment.baseURL3, '/api/v2/platformNew/web-state-new', { 'Authorization': process.env.accesstokenloginuser, 'source': environment.HSource, 'languageid': 34, 'Content-Type': 'application/json' }, 'post', linkcomm)
   expect(response.body.success.data.gdpr.terms_and_conditions.link).to.equal('https://legal.demohubilo.com/terms')
   expect(response.body.success.data.gdpr.privacy_policy.link).to.equal('https://legal.demohubilo.com/privacy')
   expect(response.body.success.data.gdpr.cookie_policy.link).to.equal('https://legal.demohubilo.com/cookies')
});

it.only('Get Invite mailer in dashbaord: GET /backend/api/v2/events/settings/invitemail', async () => {
    
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.join_button_name).to.equal('Join the community now')
    expect(response.body.data.is_add_calendar_links).to.equal(1)
});

it.only('Update Invite Mailer in dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    var  email_subject = 'T<|event_name|>'.repeat(10)
    const invite_mailer =
    {
        "data": {
          "email_subject": email_subject,
          "email_title": "Start interacting with your fellow attendees at the <|event_name|>",
          "email_body": "<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>",
          "join_button_name": "Join the community now",
          "is_add_calendar_links": 1
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});

it.only('Update Invite Mailer with character limit 150 in dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    var  email_subject = 'T<|event_name|>'.repeat(10)
    const invite_mailer =
    {
        "data": {
          "email_subject": email_subject,
          "email_title": "Start interacting with your fellow attendees at the <|event_name|>",
          "email_body": "<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>",
          "join_button_name": "Join the community now",
          "is_add_calendar_links": 1
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});


it.only('Update Invite Mailer with character limit 100 in dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    var  email_subject = 'T<|event_name|>'.repeat(10)
    var  email_title = 'TestHubilo'.repeat(10)
    const invite_mailer =
    {
        "data": {
          "email_subject": email_subject,
          "email_title": email_title,
          "email_body": "<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>",
          "join_button_name": "Join the community now",
          "is_add_calendar_links": 1
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});


it.only('Update Invite Mailer with character limit for Email Subject, Email title and Join Button in dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    var  email_subject = 'T<|event_name|>'.repeat(10)
    var  email_title = 'TestHubilo'.repeat(10)
    var  join_button_name = 'TestHubilo'.repeat(10)
    const invite_mailer =
    {
        "data": {
          "email_subject": email_subject,
          "email_title": email_title,
          "email_body": "<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>",
          "join_button_name": join_button_name,
          "is_add_calendar_links": 1
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});


it.only('Update Invite Mailer with is add calander link as off in dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    var  email_subject = 'T<|event_name|>'.repeat(10)
    var  email_title = 'TestHubilo'.repeat(10)
    var  join_button_name = 'TestHubilo'.repeat(10)
    var  email_body = '<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>'.repeat(20)
    const invite_mailer =
    {
        "data": {
          "email_subject": email_subject,
          "email_title": email_title,
          "email_body": email_body,
          "join_button_name": join_button_name,
          "is_add_calendar_links": 0
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});

it.only('Update Invite Mailer to its default state dashbaord: PUT /backend/api/v2/events/settings/invitemail', async () => {
    const invite_mailer =
    {
        "data": {
          "email_subject": "Start interacting with your fellow attendees at the <|event_name|>",
          "email_title": "Start interacting with your fellow attendees at the <|event_name|>",
          "email_body": "<p>Hello &lt;|first_name|&gt;,</p>\n<p>Congratulations! You are now officially a part of &lt;|event_name|&gt;.<br />You may now start setting up meetings and interacting with your fellow attendees who will be attending the event.</p>",
          "join_button_name": "Join the community now",
          "is_add_calendar_links": 1
        }
      }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/invitemail', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', invite_mailer)
    expect(response.body.message).to.equal(Responsemessages.Parameter_settings_invite_mailer_update)
});

it.only('Get Studio host in dashbaord: GET /api/v1/broadcaststudio/host/list', async () => {
    
  var response = await sendRequest(environment.baseURL, '/api/v1/broadcaststudio/host/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
  expect(response.body.message).to.equal(Responsemessages.Parameter_settings_studio_host_update)
  
});

it.only('Get People list in dashbaord: GET /api/v1/broadcaststudio/host/peoplelist', async () => {
    
  var response = await sendRequest(environment.baseURL, '/api/v1/broadcaststudio/host/peoplelist', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
  host1 = (response.body.data[0].userId)
 
});


it.only('Add Studio host in dashbaord: POST /api/v1/broadcaststudio/host/add', async () => {
  const studio_host = 
  {"data":[{"userId":host1}]}
    
  var response = await sendRequest(environment.baseURL, '/api/v1/broadcaststudio/host/add', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', studio_host)

 
});


it.only('Delete Studio host in dashbaord: POST /api/v1/broadcaststudio/host/delete', async () => {
  const studio_host = 
  {"data":{"userId":host1}}
    
  var response = await sendRequest(environment.baseURL, '/api/v1/broadcaststudio/host/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', studio_host)
  expect(response.body.message).to.equal(Responsemessages.Parameter_settings_studio_host_delete)
 
});

});
