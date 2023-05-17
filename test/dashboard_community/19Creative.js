/*
Author: Rajeev Kumar Pramanik
Description: This Script will get create/assert/export/fetch/search sponser ads
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 20th October 2021 02:15 PM
Description: Adding the delay of 300 ms in beforeEach block
Modified: Pranjal Shah 17nd Nov 2021 17:27 PM
Description: Added Remaning Review Test Cases.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
import { commonassertion, sendRequest ,People,ComunitySignupLogin,organizerUserHeader} from '../../helper/CommonUtil';
import Responsemessages from '../../config/Responsemessages';
import { consolelog } from '../../helper/CommonUtil'
import { async } from 'regenerator-runtime';
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
var request3 = supertest(environment.baseURL3);

require('dotenv').config();
var faker = require('faker');
var fs = require('fs');

var imageAsBase64FirstUpload = fs.readFileSync('./images_branding/Community_Banners_Final.jpg', 'base64');
var imageAsBase64EditedUpload = fs.readFileSync('./images_branding/Cover_Images_for_Attendees.png', 'base64');
var imageAsBase64SponsorswithVirtual = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');
var pdfasBinary= fs.readFileSync('./config/sample-pdf-file.pdf', 'binary');


var random_JobTitle
var uploaded_image_file_name
var chtURL_Sponsors
var exhibitor_Id
var webTabAdsCount_id_0
var webTabAdsCount_id_1
var webTabAdsCount_id_2
var webTabAdsCount_id_3
var webTabAdsCount_id_4
var webTabAdsCount_id_5
var webTabAdsCount_id_6
var webTabAdsCount_id_7
var webTabAdsCount_id_8
var webTabAdsCount_id_9

var dash_fetch_title
var dash_fetch_ImageUrl
var dash_fetch_cta_URL
var dash_fetch_adId_0
var dash_fetch_adId_1
var dash_fetch_cta_Booth_Id

var dash_sponsors_list_data_ctaUrl_0
var dash_sponsors_list_data_adId_0
var dash_sponsors_list_data_title_0
var dash_sponsors_list_data_imageUrl_0

var dash_sponsors_list_data_ctaBoothIds_1
var dash_sponsors_list_data_adId_1
var dash_sponsors_list_data_title_1
var dash_sponsors_list_data_imageUrl_1


var creativedelete1
var creativedelete2
var creativedelete3
var creativedelete4
var imageid1
var creativeid1
var creativeid2
var creativeid3
var creativeid4


describe('Dashboard: Sponsored Ads  && Community: Creative.', () => {

    beforeEach(function (done) {
        setTimeout(function(){
              done()
          }, environment.HTestDelay);
    });

    //POST IMAGES
    it.only('Dashboard sponsors try pdf uploading instead of image: POST /backend/api/v2/events/uploads', (done) => 
    {
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('buildversion', process.env.buildversion)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'sponsoredads')
            .field('data', 'data:image/png;base64,' + pdfasBinary)
            .end((err, response) => {
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });

    it.only('Dashboard sponsors add valid image upload: POST /backend/api/v2/events/uploads', (done) => 
    {
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('buildversion', process.env.buildversion)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'sponsoredads')
            .field('data', 'data:image/png;base64,' + imageAsBase64FirstUpload)
            .end((err, response) => {
                uploaded_image_file_name= response.body.data.file_name;
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Fetch sponsored-ads getwebtabs: POST /api/v2/sponsored-ads/getwebtabs', async () => 
    {
        const blank_body_getwebtabs = 
        {}
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/getwebtabs',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        webTabAdsCount_id_0 = response.body.webTabAdsCount[0].id;
        webTabAdsCount_id_1 = response.body.webTabAdsCount[1].id;
        webTabAdsCount_id_2 = response.body.webTabAdsCount[2].id;
        webTabAdsCount_id_3 = response.body.webTabAdsCount[3].id;
        webTabAdsCount_id_4 = response.body.webTabAdsCount[4].id;
        webTabAdsCount_id_5 = response.body.webTabAdsCount[5].id;
        webTabAdsCount_id_6 = response.body.webTabAdsCount[6].id;
        webTabAdsCount_id_7 = response.body.webTabAdsCount[7].id;
        webTabAdsCount_id_8 = response.body.webTabAdsCount[8].id;
        webTabAdsCount_id_9 = response.body.webTabAdsCount[9].id;
        expect(response.body.webTabAdsCount[0].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_RECEPTION);
        expect(response.body.webTabAdsCount[1].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EVENT_FEED);
        expect(response.body.webTabAdsCount[2].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_AGENDA);
        expect(response.body.webTabAdsCount[3].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EXHIBITORS);
        expect(response.body.webTabAdsCount[4].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LOUNGE);
        expect(response.body.webTabAdsCount[5].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LEADERBOARD);
        expect(response.body.webTabAdsCount[6].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_HAPPENING_NOW);
        expect(response.body.webTabAdsCount[7].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ROOMS);
        expect(response.body.webTabAdsCount[8].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ENGAGE);
        expect(response.body.webTabAdsCount[9].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_PEOPLE);
        
    });

    it.only('Try Create sponsors ads without any data: POST /api/v2/sponsored-ads/create', async () => 
    {
        var random_JobTitle = faker.name.jobTitle();
        const blank_value_sponsors = 
        {
            "data": 
            {
                "title": "",
                "adType": "MAIN",
                "imageUrl": "",
                "webAppTabIds":
                [
                ],
                "ctaBoothIds": [],
                "ctaType": "URL",
                "ctaUrl": "",
                "isHidden": 0,
                "hasAllWebTab": 1,
                "hasAllBooth": false,
                "status": "PUBLISHED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/create',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_value_sponsors);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_added_sucess_message);
    });

    it.only('Create valid sponsors ads: POST /api/v2/sponsored-ads/create', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const blank_value_sponsors = 
        {
            "data": 
            {
                "title": random_JobTitle,
                "adType": "MAIN",
                "imageUrl": uploaded_image_file_name,
                "webAppTabIds":
                [
                    webTabAdsCount_id_0,
                    webTabAdsCount_id_1,
                    webTabAdsCount_id_2,
                    webTabAdsCount_id_3,
                    webTabAdsCount_id_4,
                    webTabAdsCount_id_5,
                    webTabAdsCount_id_6,
                    webTabAdsCount_id_7,
                    webTabAdsCount_id_8,
                    webTabAdsCount_id_9
                ],
                "ctaBoothIds": [],
                "ctaType": "URL",
                "ctaUrl": "https://www.wikipedia.org/",
                "isHidden": 0,
                "hasAllWebTab": 1,
                "hasAllBooth": false,
                "status": "PUBLISHED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/create',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_value_sponsors);
        uploaded_image_file_name= response.body.createdAd.imageUrl;
        chtURL_Sponsors = response.body.createdAd.ctaUrl;
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_added_sucess_message);
    });

    it.only('Dashboard fetch sponsors ads: POST /api/v2/sponsored-ads/list', async () => 
    {
        const fetch_sponsors = 
        {
            "data": {
                "adType": "MAIN"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid, 'limit':12, 'page':1}, 'post', fetch_sponsors);
        dash_fetch_title = (response.body.data[1].title)
        dash_fetch_ImageUrl = (response.body.data[1].imageUrl)
        dash_fetch_cta_URL = (response.body.data[1].ctaUrl)
        dash_fetch_adId_0 = response.body.data[0].adId
        dash_fetch_adId_1 = response.body.data[1].adId
        expect(dash_fetch_title).to.equal(random_JobTitle);
        expect(dash_fetch_ImageUrl).to.equal(uploaded_image_file_name);
        expect(dash_fetch_cta_URL).to.equal(chtURL_Sponsors);
    });
    
    it.only('Asserting the dashboard response with community sponsors ads webstate response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[1].title).to.equal(dash_fetch_title);
        expect(response.body.success.data.sponsorAdsData.Main[1].imgFileName).to.equal(dash_fetch_ImageUrl);
        expect(response.body.success.data.sponsorAdsData.Main[1].callToActionUrl).to.equal(dash_fetch_cta_URL);
        expect(response.body.success.data.sponsorAdsData.Main[0].callToActionType).to.equal("URL");

        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(null);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(0);
    });

    it.only('Dashboard sponsors ads visibility> HIDE: POST /api/v2/sponsored-ads/visibility', async () => 
    {
        const visibility_sponsors = 
        {
            "data": {
              "id": dash_fetch_adId_0,
              "isHidden": true
            }
          }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/visibility',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', visibility_sponsors);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_update_sucess_message);
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response after hide: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);       
        expect(response.body.success.data.sponsorAdsData.Main).to.have.lengthOf(10);
    });


    it.only('Dashboard sponsors ads visibility> VISIBLE: POST /api/v2/sponsored-ads/visibility', async () => 
    {
        const visibility_sponsors = 
        {
            "data": {
              "id": dash_fetch_adId_0,
              "isHidden": false
            }
          }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/visibility',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', visibility_sponsors);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_update_sucess_message);
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response on visible: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);       
        expect(response.body.success.data.sponsorAdsData.Main).to.have.lengthOf(11);
    });



    it.only('Dashboard sponsors ads delete: POST /api/v2/sponsored-ads/delete', async () => 
    {
        const delete_sponsors = 
        {
            "data": {
              "id": dash_fetch_adId_0
            }
          }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/delete',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', delete_sponsors);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_delete_message);
    });

    it.only('Dashboard sponsors add valid image upload to check edit: POST /backend/api/v2/events/uploads', (done) => 
    {
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('buildversion', process.env.buildversion)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'sponsoredads')
            .field('data', 'data:image/png;base64,' + imageAsBase64EditedUpload)
            .end((err, response) => {
                uploaded_image_file_name= response.body.data.file_name;
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Edit the already added valid sponsors ads: POST /api/v2/sponsored-ads/edit', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const edit_sponsors_body=
        {
          "data": {
            "title": random_JobTitle,
            "adType": "main",
            "imageUrl": uploaded_image_file_name,
            "webAppTabIds": [
              webTabAdsCount_id_0,
              webTabAdsCount_id_1,
              webTabAdsCount_id_2,
              webTabAdsCount_id_3,
              webTabAdsCount_id_4,
              webTabAdsCount_id_5,
              webTabAdsCount_id_6,
              webTabAdsCount_id_7,
              webTabAdsCount_id_8,
              webTabAdsCount_id_9
            ],
            "ctaBoothIds": [],
            "ctaType": "URL",
            "ctaUrl": "https://regexr.com/",
            "isHidden": 0,
            "hasAllWebTab": 1,
            "hasAllBooth": false,
            "status": "PUBLISHED",
            "id": dash_fetch_adId_1
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/edit',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', edit_sponsors_body);
        uploaded_image_file_name= response.body.updatedAd.imageUrl;
        chtURL_Sponsors = response.body.updatedAd.ctaUrl;
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_edit_sucess_message);
    });

    it.only('Dashboard fetch edited sponsors ads: POST /api/v2/sponsored-ads/list', async () => 
    {
        const fetch_sponsors = 
        {
            "data": {
                "adType": "MAIN"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid, 'limit':12, 'page':1}, 'post', fetch_sponsors);
        dash_fetch_title = (response.body.data[0].title)
        dash_fetch_ImageUrl = (response.body.data[0].imageUrl)
        dash_fetch_cta_URL = (response.body.data[0].ctaUrl)
        dash_fetch_adId_0 = response.body.data[0].adId
        expect(dash_fetch_title).to.equal(random_JobTitle);
        expect(dash_fetch_ImageUrl).to.equal(uploaded_image_file_name);
        expect(dash_fetch_cta_URL).to.equal(chtURL_Sponsors);
    });

    it.only('After editing try asserting the dashboard response with community sponsors ads webstate response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].title).to.equal(dash_fetch_title);
        expect(response.body.success.data.sponsorAdsData.Main[0].imgFileName).to.equal(dash_fetch_ImageUrl);
        expect(response.body.success.data.sponsorAdsData.Main[0].callToActionUrl).to.equal(dash_fetch_cta_URL);

        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
    });

    // Export Sponsors Ads
    it.only('Export Sponsors Ads to mentioned valid emails ids: POST /api/v2/sponsor-ads/exports', async () =>
    {
      const export_body=
      {
        "data":
        {
          "email_ids":
          [
            "rajeev1991@yopmail.com"
          ]
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsor-ads/exports', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'post', export_body)
      expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_export_sucess_message);
    });

    it.only('Export Sponsors Ads to mentioned null as emails ids: POST /api/v2/sponsor-ads/exports', async () =>
    {
      const export_body=
      {
        "data":
        {
          "email_ids":
          [
            null
          ]
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsor-ads/exports', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'post', export_body)
      expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_export_sucess_message);
    });

    it.only('Export Sponsors Ads to mentioned blank emails ids: POST /api/v2/sponsor-ads/exports', async () =>
    {
      const export_body=
      {
        "data":
        {
          "email_ids":
          [
            "  "
          ]
        }
      }
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsor-ads/exports', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion}, 'post', export_body)
      expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_export_sucess_message);
    });

    it.only('Create valid virtual booth for sponsors ads: POST /backend/api/v2/events/booth/add', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const virtual_booth_body = 
        {
          "data": {
            "name": random_JobTitle,
            "position": 0,
            "category": "",
            "description": "",
            "phone_code": "",
            "phone": "",
            "email": "",
            "location": "",
            "fb_url": "",
            "twitter_url": "",
            "linked_url": "",
            "whatsapp_no": "",
            "website_url": "",
            "instagram_url": "",
            "is_rating": false,
            "is_featured": false,
            "tags": "",
            "booth_size": "SMALL",
            "spotlight_banner_type": "IMAGE",
            "profile_img": "",
            "spotlight_banner": [
              {
                "img_file_name": ""
              }
            ],
            "list_banner_image": [
              {}
            ],
            "small_banner_image": [
              {
                "img_file_name": ""
              }
            ],
            "multiple_file": null
          }
        }

        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid, 'content-type':'application/json'}, 'post', virtual_booth_body);
        exhibitor_Id = response.body.data.ids.exhibitor_id;
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    });

    it.only('Dashboard sponsors adding again valid image upload for virtual booths sponsors: POST /backend/api/v2/events/uploads', (done) => 
    {
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('buildversion', process.env.buildversion)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'sponsoredads')
            .field('data', 'data:image/png;base64,' + imageAsBase64SponsorswithVirtual)
            .end((err, response) => {
                uploaded_image_file_name= response.body.data.file_name;
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Fetch again sponsored-ads getwebtabs for virtual booths with sponsors ads: POST /api/v2/sponsored-ads/getwebtabs', async () => 
    {
        const blank_body_getwebtabs = 
        {}
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/getwebtabs',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        webTabAdsCount_id_0 = response.body.webTabAdsCount[0].id;
        webTabAdsCount_id_1 = response.body.webTabAdsCount[1].id;
        webTabAdsCount_id_2 = response.body.webTabAdsCount[2].id;
        webTabAdsCount_id_3 = response.body.webTabAdsCount[3].id;
        webTabAdsCount_id_4 = response.body.webTabAdsCount[4].id;
        webTabAdsCount_id_5 = response.body.webTabAdsCount[5].id;
        webTabAdsCount_id_6 = response.body.webTabAdsCount[6].id;
        webTabAdsCount_id_7 = response.body.webTabAdsCount[7].id;
        webTabAdsCount_id_8 = response.body.webTabAdsCount[8].id;
        webTabAdsCount_id_9 = response.body.webTabAdsCount[9].id;
        expect(response.body.webTabAdsCount[0].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_RECEPTION);
        expect(response.body.webTabAdsCount[1].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EVENT_FEED);
        expect(response.body.webTabAdsCount[2].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_AGENDA);
        expect(response.body.webTabAdsCount[3].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EXHIBITORS);
        expect(response.body.webTabAdsCount[4].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LOUNGE);
        expect(response.body.webTabAdsCount[5].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LEADERBOARD);
        expect(response.body.webTabAdsCount[6].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_HAPPENING_NOW);
        expect(response.body.webTabAdsCount[7].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ROOMS);
        expect(response.body.webTabAdsCount[8].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ENGAGE);
        expect(response.body.webTabAdsCount[9].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_PEOPLE);
        
    });

    it.only('Create valid sponsors ads with virtual booths: POST /api/v2/sponsored-ads/create', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const blank_value_sponsors = 
        {
            "data": 
            {
                "title": random_JobTitle,
                "adType": "MAIN",
                "imageUrl": uploaded_image_file_name,
                "webAppTabIds":
                [
                    webTabAdsCount_id_0,
                    webTabAdsCount_id_1,
                    webTabAdsCount_id_2,
                    webTabAdsCount_id_3,
                    webTabAdsCount_id_4,
                    webTabAdsCount_id_5,
                    webTabAdsCount_id_6,
                    webTabAdsCount_id_7,
                    webTabAdsCount_id_8,
                    webTabAdsCount_id_9
                ],
                "ctaBoothIds": [exhibitor_Id],
                "ctaType": "BOOTH",
                "ctaUrl": "",
                "isHidden": 0,
                "hasAllWebTab": 1,
                "hasAllBooth": false,
                "status": "PUBLISHED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/create',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_value_sponsors);
        dash_fetch_adId_1 = response.body.createdAd.adId;
        dash_fetch_cta_Booth_Id = response.body.createdAd.ctaBoothIds;
        dash_fetch_title = response.body.createdAd.title;
        uploaded_image_file_name= response.body.createdAd.imageUrl;
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_added_sucess_message);
    });

    it.only('Dashboard fetch sponsors ads details for virtual booth and sponsors ads: POST /api/v2/sponsored-ads/list', async () => 
    {
        const fetch_sponsors = 
        {
            "data": {
                "adType": "MAIN"
            }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid, 'limit':12, 'page':1}, 'post', fetch_sponsors);
        dash_fetch_adId_1 = response.body.data[1].adId;
        dash_fetch_cta_Booth_Id = (response.body.data[1].ctaBoothIds)
        dash_fetch_title = (response.body.data[1].title)
        dash_fetch_ImageUrl = (response.body.data[1].imageUrl)
        expect(dash_fetch_title).to.equal(random_JobTitle);
        expect(dash_fetch_ImageUrl).to.equal(uploaded_image_file_name);
    });
    
    it.only('Asserting the dashboard response with community sponsors ads webstate response along with virtual booths details: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        var exhibitor_id_string = exhibitor_Id.toString();
        var ads_id_string = dash_fetch_adId_1.toString();
        var response_id_string = (response.body.success.data.sponsorAdsData.Main[19].id).toString();
        expect(response.body.success.data.sponsorAdsData.Main[19].callToActionBooth).to.equal(exhibitor_id_string);
        expect(response.body.success.data.sponsorAdsData.Main[19].title).to.equal(dash_fetch_title);
        expect(response.body.success.data.sponsorAdsData.Main[19].imgFileName).to.equal(dash_fetch_ImageUrl);
        expect(response_id_string).to.equal(ads_id_string);

        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Fetch again sponsored-ads getwebtabs for Preview and Rearrange Creatives with sponsors ads: POST /api/v2/sponsored-ads/getwebtabs', async () => 
    {
        const blank_body_getwebtabs = 
        {}
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/getwebtabs',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        webTabAdsCount_id_0 = response.body.webTabAdsCount[0].id;
        webTabAdsCount_id_1 = response.body.webTabAdsCount[1].id;
        webTabAdsCount_id_2 = response.body.webTabAdsCount[2].id;
        webTabAdsCount_id_3 = response.body.webTabAdsCount[3].id;
        webTabAdsCount_id_4 = response.body.webTabAdsCount[4].id;
        webTabAdsCount_id_5 = response.body.webTabAdsCount[5].id;
        webTabAdsCount_id_6 = response.body.webTabAdsCount[6].id;
        webTabAdsCount_id_7 = response.body.webTabAdsCount[7].id;
        webTabAdsCount_id_8 = response.body.webTabAdsCount[8].id;
        webTabAdsCount_id_9 = response.body.webTabAdsCount[9].id;
        expect(response.body.webTabAdsCount[0].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_RECEPTION);
        expect(response.body.webTabAdsCount[1].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EVENT_FEED);
        expect(response.body.webTabAdsCount[2].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_AGENDA);
        expect(response.body.webTabAdsCount[3].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_EXHIBITORS);
        expect(response.body.webTabAdsCount[4].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LOUNGE);
        expect(response.body.webTabAdsCount[5].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_LEADERBOARD);
        expect(response.body.webTabAdsCount[6].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_HAPPENING_NOW);
        expect(response.body.webTabAdsCount[7].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ROOMS);
        expect(response.body.webTabAdsCount[8].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_ENGAGE);
        expect(response.body.webTabAdsCount[9].name).to.equal(Responsemessages.Parameter_sponsors_getwebtab_PEOPLE);
        
    });

    it.only('Fetch reception sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_0
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Dashboard set position view for reception on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_0,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_0,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch event feed sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_1
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for reception: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for event feed on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_1,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_1,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch agenda sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_2
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for event feed: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for agenda on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_2,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_2,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch exhibitors sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_3
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for agenda: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for exhibitors on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_3,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_3,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch lounge sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_4
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for exhibitors: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for lounge on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_4,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_4,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch leaderboard sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_5
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for lounge: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for leaderboard on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_5,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_5,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch leaderboard sponsors ads list for happening now Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_6
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for leaderboard: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for happening now on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_6,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_6,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch leaderboard sponsors ads list for rooms Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_7
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for happening now: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for rooms on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_7,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_7,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch leaderboard sponsors ads list for engage Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_8
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });

    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for rooms: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for engage on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_8,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_8,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Fetch leaderboard sponsors ads list for people Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/list', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "filter": {
              "sections": [
                webTabAdsCount_id_9
              ]
            }
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/list',{'page': 1,'limit': 10 ,'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        dash_sponsors_list_data_ctaUrl_0 = response.body.data[0].ctaUrl;
        dash_sponsors_list_data_adId_0 = response.body.data[0].adId;
        dash_sponsors_list_data_title_0 = response.body.data[0].title;
        dash_sponsors_list_data_imageUrl_0= response.body.data[0].imageUrl;

        dash_sponsors_list_data_ctaBoothIds_1 = response.body.data[1].ctaBoothIds;
        dash_sponsors_list_data_adId_1 = response.body.data[1].adId;
        dash_sponsors_list_data_title_1 = response.body.data[1].title;
        dash_sponsors_list_data_imageUrl_1= response.body.data[1].imageUrl;
    });
  
    it.only('Asserting the dashboard response with community sponsors ads webstate response along with the postion for engage: POST /api/v2/platformNew/web-state-new', async () =>
    {
        var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": communityv2url_baseURL,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
        var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
        expect(response.body.success.data.sponsorAdsData.Main[0].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[1].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[2].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[3].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[4].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[5].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[6].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[7].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[8].position).to.equal(2);
        expect(response.body.success.data.sponsorAdsData.Main[9].position).to.equal(0);
        expect(response.body.success.data.sponsorAdsData.Main[10].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[11].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[12].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[13].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[14].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[15].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[16].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[17].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[18].position).to.equal(1);
        expect(response.body.success.data.sponsorAdsData.Main[19].position).to.equal(0);

      });

    it.only('Dashboard set position view for people on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": webTabAdsCount_id_9,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": webTabAdsCount_id_9,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Dashboard set position view for null on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": null,
                "adId": dash_sponsors_list_data_adId_1,
                "position": 1
              },
              {
                "webTabid": null,
                "adId": dash_sponsors_list_data_adId_0,
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Dashboard set position view for space on sponsors ads list for Receptions Preview and Rearrange Creatives : POST /api/v2/sponsored-ads/set-position-view', async () => 
    {
        const blank_body_getwebtabs = 
        {
          "data": {
            "adPlacement": [
              {
                "webTabid": null,
                "adId": "  ",
                "position": 1
              },
              {
                "webTabid": null,
                "adId": "   ",
                "position": 2
              }
            ],
            "shouldSaveAsView": false
          }
        }
        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/set-position-view',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_body_getwebtabs);
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_position_sucess_message);
    });

    it.only('Create valid sponsors ads: POST /api/v2/sponsored-ads/create', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const blank_value_sponsors = 
        {
            "data": 
            {
                "title": "Infosys Companies",
                "adType": "MAIN",
                "imageUrl": uploaded_image_file_name,
                "webAppTabIds":
                [
                    webTabAdsCount_id_0,
                    webTabAdsCount_id_1,
                    webTabAdsCount_id_2,
                    webTabAdsCount_id_3,
                    webTabAdsCount_id_4,
                    webTabAdsCount_id_5,
                    webTabAdsCount_id_6,
                    webTabAdsCount_id_7,
                    webTabAdsCount_id_8,
                    webTabAdsCount_id_9
                ],
                "ctaBoothIds": [],
                "ctaType": "URL",
                "ctaUrl": "https://www.wikipediatest.org/",
                "isHidden": 0,
                "hasAllWebTab": 1,
                "hasAllBooth": false,
                "status": "PUBLISHED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/create',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_value_sponsors);
        uploaded_image_file_name= response.body.createdAd.imageUrl;
        chtURL_Sponsors = response.body.createdAd.ctaUrl;
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_added_sucess_message);
    });



    it.only('Create valid sponsors ads with virtual booths: POST /api/v2/sponsored-ads/create', async () => 
    {
        random_JobTitle = faker.name.jobTitle();
        const blank_value_sponsors = 
        {
            "data": 
            {
                "title": "Wipro Event",
                "adType": "MAIN",
                "imageUrl": uploaded_image_file_name,
                "webAppTabIds":
                [
                    webTabAdsCount_id_0,
                    webTabAdsCount_id_1,
                    webTabAdsCount_id_2,
                    webTabAdsCount_id_3,
                    webTabAdsCount_id_4,
                    webTabAdsCount_id_5,
                    webTabAdsCount_id_6,
                    webTabAdsCount_id_7,
                    webTabAdsCount_id_8,
                    webTabAdsCount_id_9
                ],
                "ctaBoothIds": [exhibitor_Id],
                "ctaType": "BOOTH",
                "ctaUrl": "",
                "isHidden": 0,
                "hasAllWebTab": 1,
                "hasAllBooth": false,
                "status": "PUBLISHED"
            }
          }

        var response = await sendRequest(environment.baseURL,'/api/v2/sponsored-ads/create',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'post', blank_value_sponsors);
        dash_fetch_adId_1 = response.body.createdAd.adId;
        dash_fetch_cta_Booth_Id = response.body.createdAd.ctaBoothIds;
        dash_fetch_title = response.body.createdAd.title;
        uploaded_image_file_name= response.body.createdAd.imageUrl;
        expect(response.body.message).to.equal(Responsemessages.Parameter_sponsors_added_sucess_message);
    });


    it.only('Search sponsors ads by name : POST /api/v2/sponsored-ads/list', async () => {

      const sponsors_search =
      {"data":{"adType":"MAIN"}}
  
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsored-ads/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Wipro Event', 'limit':'12', 'page':environment.HPage  }, 'post', sponsors_search)
      expect(response.body.total_count).to.equal(1);
      expect(response.body.data[0].title).to.equal("Wipro Event");
      expect(response.body.data[0].adType).to.equal("MAIN");
      expect(response.body.data[0].appearanceCount).to.equal(10);
      expect(response.body.data[0].status).to.equal("PUBLISHED");
      expect(response.body.data[0].ctaType).to.equal("BOOTH");
    });

    it.only('Search sponsors ads by wrong name : POST /api/v2/sponsored-ads/list', async () => {

      const sponsors_search =
      {"data":{"adType":"MAIN"}}
  
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsored-ads/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'wrong name','limit':'12', 'page':environment.HPage  }, 'post', sponsors_search)
      expect(response.body.total_count).to.equal(0);
    });


    it.only('Search sponsors ads by partial name : POST /api/v2/sponsored-ads/list', async () => {

      const sponsors_search =
      {"data":{"adType":"MAIN"}}
  
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsored-ads/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'Infosys','limit':'12', 'page':environment.HPage  }, 'post', sponsors_search)
      expect(response.body.total_count).to.equal(1);
      expect(response.body.data[0].title).to.equal("Infosys Companies");
      expect(response.body.data[0].adType).to.equal("MAIN");
      expect(response.body.data[0].appearanceCount).to.equal(10);
      expect(response.body.data[0].status).to.equal("PUBLISHED");
      expect(response.body.data[0].ctaType).to.equal("URL");
      expect(response.body.data[0].ctaUrl).to.equal("https://www.wikipediatest.org/");
    });

    it.only('Search sponsors ads by lower case name : POST /api/v2/sponsored-ads/list', async () => {

      const sponsors_search =
      {"data":{"adType":"MAIN"}}
  
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsored-ads/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'infosys companies','limit':'12', 'page':environment.HPage  }, 'post', sponsors_search)
      expect(response.body.total_count).to.equal(1);
      expect(response.body.data[0].title).to.equal("Infosys Companies");
      expect(response.body.data[0].adType).to.equal("MAIN");
      expect(response.body.data[0].appearanceCount).to.equal(10);
      expect(response.body.data[0].status).to.equal("PUBLISHED");
      expect(response.body.data[0].ctaType).to.equal("URL");
      expect(response.body.data[0].ctaUrl).to.equal("https://www.wikipediatest.org/");
    });


    it.only('Search sponsors ads by upper case name : POST /api/v2/sponsored-ads/list', async () => {

      const sponsors_search =
      {"data":{"adType":"MAIN"}}
  
      var response = await sendRequest(environment.baseURL, '/api/v2/sponsored-ads/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'INFOSYS COMPANIES','limit':'12', 'page':environment.HPage }, 'post', sponsors_search)
      expect(response.body.total_count).to.equal(1);
      expect(response.body.data[0].title).to.equal("Infosys Companies");
      expect(response.body.data[0].adType).to.equal("MAIN");
      expect(response.body.data[0].appearanceCount).to.equal(10);
      expect(response.body.data[0].status).to.equal("PUBLISHED");
      expect(response.body.data[0].ctaType).to.equal("URL");
      expect(response.body.data[0].ctaUrl).to.equal("https://www.wikipediatest.org/");
    });


});