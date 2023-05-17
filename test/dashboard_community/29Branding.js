/*
Author: Rajeev Kumar Pramanik
Description: This Script will add/assert images/videos in branding. Also few negative cases have been
asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Biswajit Pattanaik 20th October 2021 02:15 PM
Description: Adding the missing done callback in the beforeEach settimeout function
Modified: Biswajit Pattanaik 20th October 2021 02:15 PM
Description: updated the delay wait time from 5 sec to 1 sec
Modified: Pranjal Shah 23 Nov 2021 12:51 PM
Description: Error Correction in failed Test Cases for Apply theme,Edit theme with background color.
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
var request3 = supertest(environment.baseURL3);
import Responsemessages from '../../config/Responsemessages';
import { commonassertion, sendRequest,now,getValueFromJsonObject} from '../../helper/CommonUtil';
import { consolelog } from '../../helper/CommonUtil'
import { async } from 'regenerator-runtime';
require('dotenv').config();
var faker = require('faker');
var fs = require('fs');

var imageAsBase64_Favicon = fs.readFileSync('./images_branding/ferriswheel.png', 'base64');
var imageAsBase64_Community_Banner = fs.readFileSync('./images_branding/Community_Banners_Final.jpg', 'base64');
var imageAsBase64_Event_Logo = fs.readFileSync('./images_branding/event_LOGO.png', 'base64');
var imageAsBase64_Login_Banner = fs.readFileSync('./images_branding/login_BANNER.png', 'base64');
var imageAsBase64_BackgroundImageTheme = fs.readFileSync('./images_branding/background_image.png', 'base64');
var imageAsBase64_Cover_Images_For_Attendees = fs.readFileSync('./images_branding/Cover_Images_for_Attendees.png', 'base64');
var imageAsBase64_FaviconBIG_File = fs.readFileSync('./images_branding/icon_developer_icon.png', 'base64');
var imageAsBase64_Favicon_12mb = fs.readFileSync('./images_branding/BigFileImage.jpg', 'base64');
var imageAsBase64_CommunityBanner_7860_4320 = fs.readFileSync('./images_branding/cute_child_is_lying_7680x4320.jpg', 'base64');
var pdfasBinary= fs.readFileSync('./config/sample-pdf-file.pdf', 'binary');

var request3 = supertest(environment.baseURL3);
var URL
var V2_URL
var V2_INDEX_URL
var V2_COVER_IMAGES_0
var V2_COVER_IMAGES_1
var V2_COVER_IMAGES_2
var V2_COVER_IMAGES_3
var V2_COVER_IMAGES_4
var V2_COVER_IMAGES_5
var Favicon_FileName
var Community_Banner_FileName
var Event_Logo_FileName
var Login_Banner_FileName
var Video_FileName
var BackgroundImage_FileName
var Primary_Color
var Accent_Color
var Font_Color
var Secondary_Font_Color
var Main_Background_Color
var Random_Name_For_Color_Theme
var Random_Image_Color_Theme
var Primary_Color2
var Accent_Color2
var Font_Color2
var Secondary_Font_Color2
var Main_Background_Color2
var Cover_Image_FileName
var Invalid_login_banner_Message
var Invalid_BackgroundImage_message
var Invalid_Cover_Images_Message
var Invalid_Favicon_Message
var Invalid_Community_Banner_Message
var Invalid_event_logo_Message
var random_BankAccountIBAN_Last
var random_First_Vanity_BankAccountIBAN



describe('Branding: Setting Page', () => 
{
    beforeEach(function (done) {
      setTimeout(function(){
          done()
      }, environment.HTestDelay);
    });

    it.only('Get branding setting info: GET /backend/api/v2/brandyourevent/settings', async () => 
    {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/settings',{'organiserId': environment.HOrganiserId,'Authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'eventId': process.env.eventid},'get')
        URL= (response.body.data.domainSettings.url)
        V2_URL= (response.body.data.domainSettings.v2_url)
        V2_INDEX_URL= (response.body.data.domainSettings.v2_index_url)
        V2_COVER_IMAGES_0= (response.body.data.coverImages[0].id)
        V2_COVER_IMAGES_1= (response.body.data.coverImages[1].id)
        V2_COVER_IMAGES_2= (response.body.data.coverImages[2].id)
        V2_COVER_IMAGES_3= (response.body.data.coverImages[3].id)
        V2_COVER_IMAGES_4= (response.body.data.coverImages[4].id)
        V2_COVER_IMAGES_5= (response.body.data.coverImages[5].id)
    });

    it.only('Updating Invalid Vanity URL: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {
        const payload_vanity =
        {
            "data": {
                "favicon": "",
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": "  "
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "communityBanners": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json', 'organiserid': environment.HOrganiserId, 'authorization': 'Bearer ' + process.env.eToken, 'community_version': 2, 'buildversion': process.env.buildversion, 'eventid': process.env.eventid}, 'put', payload_vanity)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Invalid_Vanity_URL_message);    
    });

    it.only('Updating NULL as Vanity URL: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {
        const payload_vanity =
        {
            "data": {
                "favicon": "",
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": null
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "communityBanners": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });

    it.only('Updating Vanity URL: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {
        random_First_Vanity_BankAccountIBAN = faker.finance.iban();
        const payload_vanity =
        {
            "data": {
                "favicon": "",
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "communityBanners": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);     
    });

    it.only("Branding: Uploading BIG 128*128 Favicon: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3790')
            .field('type', 'base')
            .field('location', 'favicon')
            .field('data', 'data:image/png;base64,' + imageAsBase64_FaviconBIG_File)
            .end((err, response) => {
                Favicon_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Saving the BIG 128*128 Favicon branding setting images: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [],
                "logoList": [],
                "loginBannerList": [],
                "logos": [
                    {
                        "img_file_name": "",
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": "",
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });

    it.only('Asserting the dashboard response with community BIG 128*128 Favicon response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        // var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        // var communityv2url_split_vanityurl = communityv2url_baseURL.split("/")[0]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          expect(response.body.success.data.tracking.favicon).to.equal(Favicon_FileName);
    });

    it.only("Branding: Uploading BIG 7860*4320 Community Banner: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            // .set('content-length','497668')
            .field('type', 'base')
            .field('location', 'community_banner')
            .field('data', 'data:image/jpeg;base64,' + imageAsBase64_CommunityBanner_7860_4320)
            .end((err, response) => {
                Community_Banner_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });
    it.only('Saving the branding setting BIG 7860*4320 Community Banner: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [
                    Community_Banner_FileName
                ],
                "logoList": [
                ],
                "loginBannerList": [
                ],
                "logos": [
                    {
                        "img_file_name": "",
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": Community_Banner_FileName,
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });
    it.only('Asserting the dashboard response with community BIG 7860*4320 Community Banner response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        // var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        // var communityv2url_split_vanityurl = communityv2url_baseURL.split("/")[0]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          expect(response.body.success.data.community_banner[0].imgFileName).to.equal(Community_Banner_FileName);
    });
    it.only("Branding: Uploading BIG 7860*4320 Event Logo: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'logo')
            .field('data', 'data:image/png;base64,' + imageAsBase64_CommunityBanner_7860_4320)
            .end((err, response) => {
                Event_Logo_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });
    it.only('Saving the branding setting BIG 7860*4320 Event Logo: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_First_Vanity_BankAccountIBAN
                },
                "communityBannerList": [
                    Community_Banner_FileName
                ],
                "logoList": [
                    Event_Logo_FileName
                ],
                "loginBannerList": [
                ],
                "logos": [
                    {
                        "img_file_name": Event_Logo_FileName,
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": Community_Banner_FileName,
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });
    it.only('Asserting the dashboard response with community BIG 7860*4320 Event Logo response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        // var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        // var communityv2url_split_vanityurl = communityv2url_baseURL.split("/")[0]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          expect(response.body.success.data.event_data[0].imgFileName).to.equal(Event_Logo_FileName);
    });
    it.only("Branding: Uploading Favicon: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3790')
            .field('type', 'base')
            .field('location', 'favicon')
            .field('data', 'data:image/png;base64,' + imageAsBase64_Favicon)
            .end((err, response) => {
                Favicon_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Uploading Community Banner: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','497668')
            .field('type', 'base')
            .field('location', 'community_banner')
            .field('data', 'data:image/jpeg;base64,' + imageAsBase64_Community_Banner)
            .end((err, response) => {
                Community_Banner_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Uploading Event Logo: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .field('type', 'base')
            .field('location', 'logo')
            .field('data', 'data:image/png;base64,' + imageAsBase64_Event_Logo)
            .end((err, response) => {
                Event_Logo_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Uploading login banner: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','416969')
            .field('type', 'base')
            .field('location', 'community_login_banner')
            .field('data', 'data:image/png;base64,' + imageAsBase64_Login_Banner)
            .end((err, response) => {
                Login_Banner_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Uploading Invalid Youtube Video: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        const video_uploading =
        {
            "data": {
                "link": "  ",
                "type": "  ",
                "is_show_after_login": 1,
                "is_home_screen": 1
            }
        }  
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion':process.env.buildversion},'post', video_uploading)
        expect(response.body.status).to.equal(200);
    });

    it.only("Branding: Uploading NULL as Invalid Youtube Video: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        const video_uploading =
        {
            "data": {
                "link": null,
                "type": null,
                "is_show_after_login": 1,
                "is_home_screen": 1
            }
        }  
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
        expect(response.body.status).to.equal(200);
    });

    it.only("Branding: Uploading Youtube Video: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        const video_uploading =
        {
            "data": {
                "link": "https://www.youtube.com/watch?v=6xmxe27J-LU",
                "type": "YOUTUBE",
                "is_show_after_login": 1,
                "is_home_screen": 1
            }
        }  
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
        Video_FileName= (response.body.data.thumb)
        expect(response.body.status).to.equal(200);
    });

    it.only('Saving the branding setting with images and video: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        var random_BankAccountIBAN = faker.finance.iban();
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_BankAccountIBAN
                },
                "communityBannerList": [
                    Community_Banner_FileName
                ],
                "logoList": [
                    Event_Logo_FileName
                ],
                "loginBannerList": [
                    Login_Banner_FileName
                ],
                "logos": [
                    {
                        "img_file_name": Event_Logo_FileName,
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png"
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": process.env.Community_Banner_FileName,
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });

    it.only("Branding: Applying new color theme with invalid color code: POST /api/v1/event/theme", async ()=>
    {  
        var randomName = faker.name.findName();
        Primary_Color= "#QWERTY#";
        Accent_Color="#QWERTY#";
        Font_Color="#QWERTY#";
        Secondary_Font_Color="#QWERTY#";
        Main_Background_Color="#QWERTY#";
        
        const new_theme =
        {
            "data": {
                "is_default": 0,
                "name": randomName,
                "background_type": "COLOR",
                "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
                "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
                "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
                "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
                "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
                "is_applied": 1,
                "background_image": "",
                "preview_theme_id": "",
                "previewUrl": ""
            }
            }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });
    it.only("Branding: Applying new color theme with invalid blank as color code: POST /api/v1/event/theme", async ()=>
    {  
        var randomName = faker.name.findName();

        Primary_Color= "  ";
        Accent_Color="  ";
        Font_Color="   ";
        Secondary_Font_Color="   ";
        Main_Background_Color="   ";
        
        const new_theme =
        {
            "data": {
                "is_default": 0,
                "name": randomName,
                "background_type": "COLOR",
                "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
                "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
                "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
                "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
                "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
                "is_applied": 1,
                "background_image": "",
                "preview_theme_id": "",
                "previewUrl": ""
            }
            }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Applying new color theme with NULL as color code: POST /api/v1/event/theme", async ()=>
    {  
        var randomName = faker.name.findName();

        Primary_Color= null;
        Accent_Color= null;
        Font_Color= null;
        Secondary_Font_Color= null;
        Main_Background_Color= null;
        
        const new_theme =
        {
            "data": {
                "is_default": 0,
                "name": randomName,
                "background_type": "COLOR",
                "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
                "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
                "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
                "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
                "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
                "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
                "is_applied": 1,
                "background_image": "",
                "preview_theme_id": "",
                "previewUrl": ""
            }
            }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Applying new color theme with different color code but empty theme name: POST /api/v1/event/theme", async ()=>
    {  
        Primary_Color= "#2f6ba2";
        Accent_Color="#5fdcc1";
        Font_Color="#76c1f2";
        Secondary_Font_Color="#ece3e3";
        Main_Background_Color="#777272";
        
        const new_theme =
        {
            "data": {
              "is_default": 0,
              "name": "    ",
              "background_type": "COLOR",
              "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
              "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
              "is_applied": 1,
              "background_image": "",
              "preview_theme_id": "",
              "previewUrl": ""
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Applying new color theme: POST /api/v1/event/theme ", async ()=>
    {  
        var randomName = faker.name.findName();
        Primary_Color= "#2f6ba2";
        Accent_Color="#5fdcc1";
        Font_Color="#76c1f2";
        Secondary_Font_Color="#ece3e3";
        Main_Background_Color="#777272";
        const new_theme =
        {
            "data": {
              "is_default": 0,
              "name": randomName,
              "background_type": "COLOR",
              "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"}",
              "main_background_color": "{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"}",
              "is_applied": 1,
              "background_image": "",
              "preview_theme_id": "",
              "previewUrl": ""
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Preview of new color theme added: POST /api/v1/event/theme/preview", async ()=>
    {  
        var randomName = faker.name.findName();
        Primary_Color= "#2f6ba2";
        Accent_Color="#5fdcc1";
        Font_Color="#76c1f2";
        Secondary_Font_Color="#ece3e3";
        Main_Background_Color="#777272";
        
        const new_theme_preview =
        {
            "data": {
              "previewData": "{\"is_default\":0,\"event_id\":"+process.env.eventid+",\"organiser_id\":"+environment.HOrganiserId+",\"name\":\""+randomName+"\",\"background_type\":\"COLOR\",\"primary_color\":{\"type\":\"solid\",\"color1\":\""+Primary_Color+"\"},\"secondary_color\":{\"type\":\"solid\",\"color1\":\"\"},\"accent_color\":{\"type\":\"solid\",\"color1\":\""+Accent_Color+"\"},\"headbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"navbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"font_color\":{\"type\":\"solid\",\"color1\":\""+Font_Color+"\"},\"secondary_font_color\":{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color+"\"},\"main_background_color\":{\"type\":\"solid\",\"color1\":\""+Main_Background_Color+"\"},\"background_image\":{}}"
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme/preview',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion,'community_version': 2},'post', new_theme_preview)
        expect(response.body.status).to.equal(200);
    });

    it.only("Branding: Uploading background image for theme: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3395680')
            .field('location', 'webappThemeBackground')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64_BackgroundImageTheme)
            .end((err, response) => {
                BackgroundImage_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Applying new background image theme: POST /api/v1/event/theme", async ()=>
    {  
        var randomName = faker.name.findName();
        Primary_Color2= "#3E3535";
        Accent_Color2="#0E7B61";
        Font_Color2="#EFEFEF";
        Secondary_Font_Color2="#FFFFFF";

        const new_theme =
        {
            "data": {
              "is_default": 0,
              "name": randomName,
              "background_type": "IMAGE",
              "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color2+"\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color2+"\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color2+"\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color2+"\"}",
              "main_background_color": "",
              "is_applied": 1,
              "background_image": "{\"img_file_name\":\""+BackgroundImage_FileName+"\",\"opacity\":10,\"vignette\":1,\"blur\":1,\"url\":\"\"}",
              "preview_theme_id": "",
              "previewUrl": ""
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','community_version': 2,'buildversion': process.env.buildversion},'post', new_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });

    it.only("Branding: Preview of new Image color theme added: POST /api/v1/event/theme/preview", async ()=>
    {  
        var randomName = faker.name.findName();
        const new_theme_preview =
        {
            "data": {
              "previewData": "{\"is_default\":0,\"event_id\":"+process.env.eventid+",\"organiser_id\":"+environment.HOrganiserId+",\"name\":\""+randomName+"\",\"background_type\":\"COLOR\",\"primary_color\":{\"type\":\"solid\",\"color1\":\""+Primary_Color2+"\"},\"secondary_color\":{\"type\":\"solid\",\"color1\":\"\"},\"accent_color\":{\"type\":\"solid\",\"color1\":\""+Accent_Color2+"\"},\"headbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"navbar_color\":{\"type\":\"solid\",\"color1\":\"\"},\"font_color\":{\"type\":\"solid\",\"color1\":\""+Font_Color2+"\"},\"secondary_font_color\":{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color2+"\"},\"main_background_color\":{\"type\":\"solid\",\"color1\":\""+Main_Background_Color2+"\"},\"background_image\":{}}"
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme/preview',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion,'community_version': 2},'post', new_theme_preview)
        expect(response.body.status).to.equal(200);
    });

    it.only("Branding: Uploading Cover Images for Attendees image for theme: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('buildversion', process.env.buildversion)
            .set('content-length','3395680')
            .field('location', 'cover_image')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64_Cover_Images_For_Attendees)
            .end((err, response) => {
                Cover_Image_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only('Updating or saving the Cover Images for Attendees image for theme: PUT /backend/api/v2/brandyourevent/settings', async () => 
    {  
        random_BankAccountIBAN_Last = faker.finance.iban();
        const payload_vanity =
        {
            "data": {
                "favicon": Favicon_FileName,
                "color": 4,
                "domainSettings": {
                    "is_hubilo": 1,
                    "domain_protocol": "https://",
                    "url": URL,
                    "v2_index_url": random_BankAccountIBAN_Last
                },
                "communityBannerList": [
                    Community_Banner_FileName
                ],
                "logoList": [
                    Event_Logo_FileName
                ],
                "loginBannerList": [
                    Login_Banner_FileName
                ],
                "logos": [
                    {
                        "img_file_name": Event_Logo_FileName,
                        "logo_url": ""
                    }
                ],
                "coverImagesList": [
                    "n-cover-1.png",
                    "n-cover-2.png",
                    "n-cover-3.png",
                    "n-cover-4.png",
                    "n-cover-5.png",
                    "n-cover-6.png",
                    Cover_Image_FileName
                ],
                "coverImages": [
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-1.png",
                        "id": V2_COVER_IMAGES_0
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-2.png",
                        "id": V2_COVER_IMAGES_1
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-3.png",
                        "id": V2_COVER_IMAGES_2
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-4.png",
                        "id": V2_COVER_IMAGES_3
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-5.png",
                        "id": V2_COVER_IMAGES_4
                    },
                    {
                        "is_template_type": "DEFAULT",
                        "visibility": 1,
                        "img_file_name": "n-cover-6.png",
                        "id": V2_COVER_IMAGES_5
                    },
                    {
                        "img_file_name": Cover_Image_FileName,
                        "visibility": 1,
                        "is_template_type": "CUSTOM"
                    },
                ],
                "communityBanners": [
                    {
                        "img_file_name": Community_Banner_FileName,
                        "link": ""
                    }
                ],
                "is_landing_page": 1,
                "isPoweredBy": true
            }
        }
        var response = await sendRequest(environment.baseURL1,'/backend/api/v2/brandyourevent/settings',{'Content-Type': 'application/json','organiserid': environment.HOrganiserId,'authorization': 'Bearer ' + process.env.eToken,'community_version': 2,'buildversion': process.env.buildversion,'eventid': process.env.eventid}, 'put', payload_vanity);
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Vanity_URL_message);       
    });

    it.only('Asserting the dashboard response with community response: POST /api/v2/platformNew/web-state-new', async () =>
    {
        // var communityv2url_baseURL = process.env.eventurl.split("https://")[1]
        // var communityv2url_split_vanityurl = communityv2url_baseURL.split("/")[0]
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          expect(response.body.success.data.tracking.favicon).to.equal(Favicon_FileName);
          expect(response.body.success.data.event_data[0].imgFileName).to.equal(Event_Logo_FileName);
          expect(response.body.success.data.community_banner[0].imgFileName).to.equal(Community_Banner_FileName);
          expect(response.body.success.data.eventSettings.isPoweredBy).to.equal(1);
          
          const community_login_banner_trimmed = (response.body.success.data.eventSettings.communityLoginBanner).replace(/[\[\]']+/g,'')
          const community_login_banner_trimmed1 = community_login_banner_trimmed.replace(/^"(.*)"$/, '$1');
          expect(community_login_banner_trimmed1).to.equal(Login_Banner_FileName);

          const json1 = response.body.success.data.eventSettings.welcomeVideo.replace(/[\[\]']+/g,'')
          const obj = JSON.parse(json1);
          expect(obj.thumb).to.equal(Video_FileName);

          const color_json = response.body.success.data.preview_data.replace(/[\[\]']+/g,'')
          const Obj_color_json1 = JSON.parse(color_json);
          expect(Obj_color_json1.primaryColor.color1).to.equal(Primary_Color2);
          expect(Obj_color_json1.accentColor.color1).to.equal(Accent_Color2);
          expect(Obj_color_json1.fontColor.color1).to.equal(Font_Color2);
          expect(Obj_color_json1.secondaryFontColor.color1).to.equal(Secondary_Font_Color2);
    });

    it.only("Branding: Uploading Invalid as login banner.", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','416969')
            .field('type', 'base')
            .field('location', 'community_login_banner')
            .field('data', 'data:image/png;base64,' + pdfasBinary)
            .end((err, response) => {
                Invalid_login_banner_Message= (response.body.message)
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });
    it.only("Branding: Uploading Invalid background image for theme: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3395680')
            .field('location', 'webappThemeBackground')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + pdfasBinary)
            .end((err, response) => {
                Invalid_BackgroundImage_message= (response.body.message)
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });
    it.only("Branding: Uploading Invalid Cover Images for Attendees image theme: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('buildversion', process.env.buildversion)
            .field('location', 'cover_image')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + pdfasBinary)
            .end((err, response) => {
                Invalid_Cover_Images_Message= (response.body.message)
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });
    it.only("Branding: Uploading Invalid Favicon: POST /backend/api/v2/events/uploads", (done) =>
{      
    request1
        .post('/backend/api/v2/events/uploads')
        .set('organiserId', environment.HOrganiserId)
        .set('eventId', process.env.eventid)
        .set('authorization', 'Bearer ' + process.env.eToken)
        .set('Content-Type', 'multipart/form-data')
        .field('type', 'base')
        .field('location', 'favicon')
        .field('data', '(binary)' + pdfasBinary)
        .end((err, response) => {
            Invalid_Favicon_Message= (response.body.message)
            expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
            done();
        });
    });
    it.only("Branding: Uploading Invalid Community Banner: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','497668')
            .field('type', 'base')
            .field('location', 'community_banner')
            .field('data', 'data:image/jpeg;base64,' + pdfasBinary)
            .end((err, response) => {
                Invalid_Community_Banner_Message= (response.body.message)
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });
    it.only("Branding: Uploading Invalid Event Logo: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','12203')
            .field('type', 'base')
            .field('location', 'logo')
            .field('data', 'data:image/png;base64,' + pdfasBinary)
            .end((err, response) => {
                Invalid_event_logo_Message= (response.body.message)
                expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Uploading_Pdf_message);
                done();
            });
    });
    it.only("Branding: Uploading NULL as a Favicon: POST /backend/api/v2/events/uploads", (done) =>
    {      
    request1
        .post('/backend/api/v2/events/uploads')
        .set('organiserId', environment.HOrganiserId)
        .set('eventId', process.env.eventid)
        .set('authorization', 'Bearer ' + process.env.eToken)
        .set('Content-Type', 'multipart/form-data')
        .set('content-length','3790')
        .field('type', 'base')
        .field('location', 'favicon')
        .field('data', '(binary)' + null)
        .end((err, response) => {
            Invalid_Favicon_Message= (response.body.message)
            expect(response.body.message).to.be.oneOf(Responsemessages.Parameter_Branding_Invalid_Favicon_Image_message);
            done();
        });
    });


    it.only("Branding: Uploading Vimeo Video: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        const video_uploading =
        {
            "data": {
              "link": "https://vimeo.com/253989945",
              "type": "VIMEO",
              "is_show_after_login": 1,
              "is_home_screen": 1,
              "title": "Vimeo Video",
              "description": "This is  test Vimeo Video"
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
        global.Vimeo_Video_FileName= (response.body.data.thumb)
    });



    it.only('Asserting the dashboard response with community response for PopUp After First Login and Show On Reception true: POST /api/v2/platformNew/web-state-new', async () =>
    {
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          const json1 = response.body.success.data.eventSettings.welcomeVideo.replace(/[\[\]']+/g,'')
          const obj = JSON.parse(json1);
          expect(obj.thumb).to.equal(global.Vimeo_Video_FileName);
          expect(obj.type).to.equal("VIMEO");
          expect(obj.is_home_screen).to.equal(1);
          expect(obj.is_show_after_login).to.equal(1);
          expect(obj.title).to.equal("Vimeo Video");
          expect(obj.description).to.equal("This is  test Vimeo Video");
    });

    it.only("Branding: Update Vimeo Video PopUp After First Login and Show On Reception fasle: POST /backend/api/v2/brandyourevent/welcomevideo", async ()=>
    {  
        const video_uploading =
        {
            "data": {
              "type": "VIMEO",
              "link": "https://vimeo.com/253989945",
              "is_home_screen": 0,
              "is_show_after_login": 0,
              "thumb": global.Vimeo_Video_FileName,
              "title": "Vimeo Video",
              "description": "This is  test Vimeo Video"
            }
          }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/brandyourevent/welcomevideo',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post', video_uploading)
        global.Vimeo_Video_FileName= (response.body.data.thumb)
    });


    it.only('Asserting the dashboard response with community response for PopUp After First Login and Show On Reception false: POST /api/v2/platformNew/web-state-new', async () =>
    {
        const community_webstate=
        {
            "payload": {
              "data": {
                "source": "COMMUNITY",
                "url": process.env.communityv2url,
                "app_version": "1.0.0",
                "device_type": "WEB",
                "language": 34
              }
            }
          }
          var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/web-state-new',{'Content-Type': 'application/json'}, 'post', community_webstate);
          const json1 = response.body.success.data.eventSettings.welcomeVideo.replace(/[\[\]']+/g,'')
          const obj = JSON.parse(json1);
          expect(obj.thumb).to.equal(global.Vimeo_Video_FileName);
          expect(obj.type).to.equal("VIMEO");
          expect(obj.is_home_screen).to.equal(0);
          expect(obj.is_show_after_login).to.equal(0);
          expect(obj.title).to.equal("Vimeo Video");
          expect(obj.description).to.equal("This is  test Vimeo Video");
    });

    it.only("Get theme id: POST /api/v1/event/allthemes", async ()=>
    {  

        var response = await sendRequest(environment.baseURL, '/api/v1/event/allthemes',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion, 'limit':16, 'page':environment.HPage},'get')
        global.theme_id= (response.body.data[0].id)
    });

    it.only("Apply theme: POST /api/v1/event/applyTheme", async ()=>
    {  
        const apply_theme=
        {"data":{"theme_id":global.theme_id}}

        var response = await sendRequest(environment.baseURL, '/api/v1/event/applyTheme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion},'post',apply_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);       
    });


    it.only("Edit theme with background color: POST /api/v1/event/theme", async ()=>
    {  
        const apply_theme=
        {
            "data": {
              "id": global.theme_id,
              "is_default": 0,
              "event_id": process.env.eventid,
              "organiser_id": environment.HOrganiserId,
              "name": "Theme Update",
              "primary_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"#363636\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\"#E47426\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\"#919191\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\"#4e2b2b\"}",
              "background_type": "COLOR",
              "background_image": "",
              "main_background_color": "{\"type\":\"solid\",\"color1\":\"#EDEDED\"}",
              "created_at": now,
              "updated_at": now,
              "is_applied": 1
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion, 'limit':16, 'page':environment.HPage},'post',apply_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);       
    });


    it.only("Branding: Uploading background image for theme: POST /backend/api/v2/events/uploads", (done) =>
    {      
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('authorization', 'Bearer ' + process.env.eToken)
            .set('Content-Type', 'multipart/form-data')
            .set('content-length','3395680')
            .field('location', 'webappThemeBackground')
            .field('type', 'base')
            .field('data', 'data:image/png;base64,' + imageAsBase64_BackgroundImageTheme)
            .end((err, response) => {
                BackgroundImage_FileName= (response.body.data.file_name)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });

    it.only("Branding: Applying new background image theme: POST /api/v1/event/theme", async ()=>
    {  
        var randomName = faker.name.findName();
        Primary_Color2= "#3E3535";
        Accent_Color2="#0E7B61";
        Font_Color2="#EFEFEF";
        Secondary_Font_Color2="#FFFFFF";

        const new_theme =
        {
            "data": {
              "is_default": 0,
              "name": randomName,
              "background_type": "IMAGE",
              "primary_color": "{\"type\":\"solid\",\"color1\":\""+Primary_Color2+"\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\""+Accent_Color2+"\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\""+Font_Color2+"\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\""+Secondary_Font_Color2+"\"}",
              "main_background_color": "",
              "is_applied": 1,
              "background_image": "{\"img_file_name\":\""+BackgroundImage_FileName+"\",\"opacity\":10,\"vignette\":1,\"blur\":1,\"url\":\"\"}",
              "preview_theme_id": "",
              "previewUrl": ""
            }
          }
        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','community_version': 2,'buildversion': process.env.buildversion},'post', new_theme)
        global.theme_id_image= getValueFromJsonObject(response.body, "$.data[?(@.background_type=='IMAGE')].id")
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);  
    });


    it.only("Edit theme with background image: POST /api/v1/event/theme", async ()=>
    {  
        const apply_theme=
        {
            "data": {
              "id": global.theme_id_image,
              "is_default": 0,
              "event_id": process.env.eventid,
              "organiser_id": environment.HOrganiserId,
              "name": "Theme Image Update",
              "primary_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "secondary_color": "{\"type\":\"solid\",\"color1\":\"#363636\"}",
              "accent_color": "{\"type\":\"solid\",\"color1\":\"#E47426\"}",
              "headbar_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "navbar_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "font_color": "{\"type\":\"solid\",\"color1\":\"#919191\"}",
              "secondary_font_color": "{\"type\":\"solid\",\"color1\":\"#FFFFFF\"}",
              "background_type": "IMAGE",
              "background_image": "{\"img_file_name\":\""+BackgroundImage_FileName+"\",\"opacity\":10,\"vignette\":0,\"blur\":0,\"url\":\"\"}",
              "main_background_color": "",
              "created_at": now,
              "updated_at": now,
              "is_applied": 1
            }
          }

        var response = await sendRequest(environment.baseURL, '/api/v1/event/theme',{'organiserId': environment.HOrganiserId,'eventId': process.env.eventid,'authorization': 'Bearer ' + process.env.eToken,'Content-Type': 'application/json','buildversion': process.env.buildversion, 'limit':16, 'page':environment.HPage},'post',apply_theme)
        expect(response.body.message).to.equal(Responsemessages.Parameter_Branding_Theme_Got_applied_message);       
    });

    
})