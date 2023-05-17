/*
Author: Gaurav Thapar
Description: This Script will add/update/search/verify/filter/export virtual booths . Also verifying under
analytics.
Timestamp: 17th Sept 2021 11:30 AM
Modified: Ruchit Chanchawat 25th Jan 2022 11:30 AM
Description : Add Virtual Booth Cases for Iframe 
*/
import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest, Events, People, ComunitySignupLogin, organizerUserHeader } from '../../helper/CommonUtil'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
require('dotenv').config();


const request3 = supertest(environment.baseURL3);

var now = new Date(); //Current date
var todayDate = new Date().toISOString().slice(0, 10);
var eventname



var ticketid1
var ticketid2
var ticketid3
var virtualboothid1
var virtualboothid2
var virtualboothid3
var VBfile_name
var virtualboothidcommunity
var teammemberid
var file_name
var file_name2, file_name_logo, file_name_boothlist_banner, file_name_soptlight_banner, file_name_reception_banner
var vbid
var virtualbooth_image
var tag_id
var virtualboothidList = []
var pastEventBoothId
var peopleList = []

const virtual10 = {
  "data": {
    "booth_size": "SMALL",
    "category": "category",
    "description": "",
    "email": "",
    "fb_url": "",
    "instagram_url": "",
    "is_featured": false,
    "is_rating": false,
    "linked_url": "",
    "list_banner_image": [
      {
        "img_file_name": ""
      }
    ],
    "location": "",
    "multiple_file": [],
    "name": "test",
    "phone": "",
    "phone_code": "",
    "position": 1,
    "profile_img": "",
    "spotlight_banner": [
      {
        "img_file_name": ""
      }
    ],
    "productLabel":"Products/Services",
    "spotlight_banner_type": "IMAGE",
    "tags": "",
    "twitter_url": "",
    "website_url": "",
    "whatsapp_no": ""
  }
}

const virtual11 = {
  "data": {
    "booth_size": "LARGE",
    "category": "category",
    "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
    "email": "testfghanistan@yopmail.com",
    "fb_url": "https://facebook.com",
    "instagram_url": "https://instagram.com",
    "is_featured": true,
    "is_rating": true,
    "linked_url": "https://linkedin.com",
    "list_banner_image": [
      {
        "img_file_name": ""
      }
    ],
    "location": "afghnaistan adddres",
    "multiple_file": [{ filename: "process.env.VBfile_name", format: "pdf", real_filename: "sample-pdf-file.pdf" }],
    "name": "test updated",
    "phone": "9988776666",
    "phone_code": "+93",
    "position": 1,
    "profile_img": "",
    "productLabel":"Products/Services",
    "spotlight_banner": [
      {
        "img_file_name": ""
      }
    ],
    "spotlight_banner_type": "IMAGE",
    "tags": "test tag",
    "twitter_url": "https://twitter.com",
    "website_url": "https://google.com",
    "whatsapp_no": "12345678"
  }
}
//Virtual Booth Test Cases
describe('Add/Update Virtual booths', () => {
  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, environment.HTestDelay);
  });

 

  //Upload File in booth

  //200: POSITIVE single people booth with all parameters: POST /backend/api/v2/events/uploads

  
  it.only('Pdf upload: POST /backend/api/v2/events/uploads', (done) => {
    request1
      .post('/backend/api/v2/events/uploads')
      .set('organiserId', environment.HOrganiserId)
      .set('eventId', process.env.eventid)
      .set('buildversion', process.env.buildversion)
      .set('Authorization', 'Bearer ' + process.env.eToken)
      // .type('multipart/form-data')
      .field('module_name', 'file')
      .field('location', 'brochure')
      .field('type', 'file')
      .attach('data', './config/sample-pdf-file.pdf')
      .end((err, response) => {
        consolelog(response)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_file_upload_message);
        process.env.VBfile_name = (response.body.data.file_name)
        // console.log(process.env.VBfile_name, 'Virtual Booth File name')
        done();
      });
  });

  //POST VIRTUAL BOOTH

  it.only('single booth add now : POST /backend/api/v2/events/booth/add', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual10)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    virtualboothid1 = (response.body.data.ids.exhibitor_id)
  });


  //200: POSITIVE single people booth with all parameters: POST /backend/api/v2/events/booth/add

  it.only('Single people booth creation with all parameters: POST /backend/api/v2/events/booth/add', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtual11)
    virtualboothid2 = (response.body.data.ids.exhibitor_id)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
  });

  //<----------------------------Get Team member to virtual booth------------------>
  
  it('Get Team member to virtual booth: POST /backend/api/v2/events/booth/attendees', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/attendees',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid' : virtualboothid2},'get')
    teammemberid = (response.body.data[0].userId)
  });
  

  //<------------------------Add Team member to virtual booth------------------->
  
  it('Add Team member to virtual booth: POST /backend/api/v2/events/booth/members/add', async () => {

    const Addteammember = {
      "data": {
        "userId": [teammemberid],
        "role": "ADMIN"
      }
    }

    // console.log(Addteammember, 'team member payload')
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/members/add',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid' : virtualboothid2},'post',Addteammember)
    // virtualboothid2 = (response.body.data.ids.exhibitor_id)
    // console.log(virtualboothid2)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_team_member_Add);
  });


  //PUT PEOPLE

  it.only('Update single booth : PUT /backend/api/v2/events/booth/basic', async () => {

    const virtual12 = {
      "data": {
        "booth_size": "LARGE",
        "category": "category",
        "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
        "email": "testfghanistan@yopmail.com",
        "fb_url": "https://facebook.com",
        "instagram_url": "https://instagram.com",
        "is_featured": true,
        "is_rating": true,
        "linked_url": "https://linkedin.com",
        "list_banner_image": [
          {
            "img_file_name": ""
          }
        ],
        "location": "afghnaistan adddres",
        "multiple_file": [{ filename: "process.env.VBfile_name", format: "pdf", real_filename: "sample-pdf-file.pdf" }],
        "name": "test updated 1",
        "phone": "9988776666",
        "phone_code": "+93",
        "position": 1,
        "profile_img": "",
        "spotlight_banner": [
          {
            "img_file_name": ""
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "test tag",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com",
        "whatsapp_no": "12345678"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',virtual12)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
  });

  it.only('Update single booth all params: PUT /backend/api/v2/events/booth/basic', async () => {

    const virtual13 = {
      "data": {
        "booth_size": "SMALL",
        "category": "",
        "description": "",
        "email": "",
        "fb_url": "",
        "instagram_url": "",
        "is_featured": false,
        "is_rating": false,
        "linked_url": "",
        "list_banner_image": [
          {
            "img_file_name": ""
          }
        ],
        "location": "",
        "multiple_file": [],
        "name": "test updated 2",
        "phone": "",
        "phone_code": "",
        "position": 0,
        "profile_img": "",
        "spotlight_banner": [
          {
            "img_file_name": ""
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "",
        "twitter_url": "",
        "website_url": "",
        "whatsapp_no": ""
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid' : virtualboothid2},'put',virtual13)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
  });

  // GET VIRTUALBOOTHS

  it.only('Get single virtual booth: POST /backend/api/v2/events/booth/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'page' : environment.HPage, 'limit' : environment.HLimit},'post')
    expect(response.body.data[0].booth_size).to.equal('LARGE');
    expect(response.body.data[0].name).to.equal('test updated 1');
    expect(response.body.data[1].booth_size).to.equal('SMALL');
    expect(response.body.data[1].name).to.equal('test updated 2');
    ticketid1 = (response.body.data[0].exhibitor_id)
    // console.log(ticketid1)
    ticketid2 = (response.body.data[1].exhibitor_id)  
  });

  

  it.only('Make Virtual Booth as Premium Booth in dashbaord: PUT /backend/api/v2/events/booth/premium/settings', async () => {
    const virtual_Booth_Premium =
      { "data": { "is_premium": true, "is_manage_profile": true, "is_add_team_members": true, "team_members_limit": 10, "is_show_analytics": false } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/premium/settings', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'boothid': ticketid2 }, 'put', virtual_Booth_Premium)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
  });


  //<<----------------------Community v2Verification Virtual Booth -------------------------->

  //200: POSITIVE This will fetch the Virtual Booth list on community side : POST /api/v2/exhibitors

  it.only('Fetch the Virtual Booth list : POST /api/v2/exhibitors', async () => {
    // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    const virtualboothlist = {
      "payload": {
        "data": {
          "categoryList": [],
          "currentPage": 0,
          "featured": false,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlist)
    expect(response.body.success.data.exhibitors[0].name).to.equal('test updated 1');
    expect(response.body.success.data.exhibitors[0].boothSize).to.equal('LARGE');
    expect(response.body.success.data.exhibitors[0].category).to.equal('category');
    expect(response.body.success.data.exhibitors[1].name).to.equal('test updated 2');
    expect(response.body.success.data.exhibitors[1].boothSize).to.equal('SMALL');
  });


  //<<----------------------Community v2Verification Virtual Booth  Search-------------------------->

  //200: POSITIVE This will search virtual booth by name on community side 

  it.only('Search virtual booth by name : POST /api/v2/exhibitors', async () => {
    // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    const virtualboothlistsearch = {
      "payload": {
        "data": {
          "categoryList": ["Category", "category"],
          "featured": false,
          "input": "test updated 1"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlistsearch)
    var gaurav1231 = response.body.success.data.exhibitors.some(function (e) {
      return e.name == "test updated 1";
    });
    console.log(gaurav1231, 'verify thius is true')
    expect(gaurav1231).to.equal(true)
  });


  //<<----------------------Community v2Verification Virtual Booth  Filter-------------------------->

  //200: POSITIVE This will Filter virtual booth by Ctegory and name on community side : POST /api/v2/exhibitors

  it.only('Filter virtual booth by Category and name : POST /api/v2/exhibitors', async () => {
    // const request2 = supertest((process.env.eventurl.replace("http", "https")));

    const virtualboothlistfilter = {
      "payload": {
        "data": {
          "categoryList": ["category"],
          "currentPage": 0,
          "customTag": "test tag",
          "featured": false,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlistfilter)
    expect(response.body.success.data.exhibitors[0].name).to.equal('test updated 1');
    expect(response.body.success.data.exhibitors[0].boothSize).to.equal('LARGE');
    expect(response.body.success.data.exhibitors[0].category).to.equal('category');
  });


  //<<----------------------Community v2Verification Virtual Booth Get Deatils-------------------------->
  //200: POSITIVE This will fetch the Virtual Booth Details on community side : POST /api/v2/exhibitors/exhibitor-details

  it.only('Fetch the Virtual Booth Details : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.data.name).to.equal('test updated 1');
    expect(response.body.success.data.brochureFileName).to.equal('sample-pdf-file.pdf');
    expect(response.body.success.data.linkedUrl).to.equal('https://linkedin.com');
    expect(response.body.success.data.location).to.equal('afghnaistan adddres');
    // console.log(response.body.success.data.id)
    process.env.virtualboothidcommunity = JSON.stringify(response.body.success.data.id)
    // console.log(process.env.virtualboothidcommunity, 'Get virtual booth id community')
    vbid = (response.body.success.data.id)
  });


  // Community v2 add file to brifcase

  //200: POSITIVE This will Add Virtual Booth File to brifcase : POST /api/v2/briefcase/files/action

  it.only('Add Virtual Booth File to brifcase : POST /api/v2/briefcase/files/action', async () => {

    const VBFileAddBrifcase = {
      "payload": {
        "data": {
          "action": "ADD",
          "briefcase_type": "FILE",
          "filename": "process.env.VBfile_name",
          "real_filename": "sample-pdf-file.pdf",
          "type": "EXHIBITOR",
          "type_id": process.env.virtualboothidcommunity
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files/action',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',VBFileAddBrifcase)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtualbooth_file_Add_Brifcase)
    expect(response.body.success.code).to.equal('ADD_FILE_BRIEFCASE')
    // console.log(VBFileAddBrifcase, 'VB File add payload')
  });


  //<<----------------------Community v2Verification Virtual Booth Rate -------------------------->

  it.only('This will Rate the Virtual Booth list: POST /api/v2/add-rating', async () => {
    // const request2 = supertest((process.env.eventurl.replace("http", "https")));
    const virtualboothlist = {
      "payload": {
        "data": {
          rating: 3,
          type: "EXHIBITOR",
          typeId: process.env.virtualboothidcommunity
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/add-rating',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlist)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtualbooth_Rate_Message)
  });


  //<<----------------------Virtual Booth Team member chat -------------------------->

  it.only('This will Rate the Virtual Booth list on community side : POST /api/v2/exhibitors/team-members', async () => {

    const virtualboothteam_member = {
      "payload": {
        "data": {
          "currentPage": 0,
          "exhibitorId": vbid,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/team-members',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothteam_member)
    // console.log(virtualboothteam_member, 'Virtual Booth Team member')
    // expect(response.body.success.data.members[0].userId).to.equal(teammemberid)
  });


  //<<----------------------Virtual Booth Share Your Details / Share Business Card -------------------------->

  it.only('Share Your Details in Virtual Booth : POST /api/v2/exhibitors/share-details', async () => {

    const virtualboothtshare_details = {
      "payload": {
        "data": {
          "exhibitorId": vbid
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/share-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothtshare_details)
    // console.log(virtualboothtshare_details, 'Virtual Booth Team member')
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtualbooth_Share_Business_Card)
  });


  //<<----------------------Community v2Verification Virtual Booth  Search With Wrong Keyword-------------------------->

  it.only('This will search virtual booth by Wrong name : POST /api/v2/exhibitors', async () => {
    const virtualboothlistsearch = {
      "payload": {
        "data": {
          "categoryList": ["Category", "Premium"],
          "featured": false,
          "input": "Wrong Booth"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlistsearch)
    var wrongname = response.body.success.data.exhibitors.some(function (e) {
      return e.name == "test updated";
    });
    expect(wrongname).to.equal(false)
  });


  //<<----------------------Community v2Verification Virtual Booth  Filter with wrong value-------------------------->

  it.only('This will Filter virtual booth by Category and name with Wrong value: POST /api/v2/exhibitors', async () => {
    // const request2 = supertest((process.env.eventurl.replace("http", "https")));
    const virtualboothlistfilterwrong = {
      "payload": {
        "data": {
          "categoryList": ["Wrong", "Value"],
          "currentPage": 0,
          "customTag": "test tag",
          "featured": false,
          "limit": 10
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlistfilterwrong)
    var wrongcatagorylist = response.body.success.data.exhibitors.some(function (e) {
      return e.name == "test updated";
    });
    expect(wrongcatagorylist).to.equal(false)
  });

  // Export Virtual booth

  it.only('Export Virtual Booth:- POST /backend/api/v2/events/booth/export', async () => {
    const exportvirtualbooth =
      { "data": { "email": ["clown26@yopmail.com"] } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, }, 'post', exportvirtualbooth)
  });

  //Upload File in booth with more then 3 MB size
  
  /*
  it.only('Pdf upload with more then 3 MB size : POST /backend/api/v2/events/uploads', (done) => {
    request1
      .post('/backend/api/v2/events/uploads')
      .set('organiserId', environment.HOrganiserId)
      .set('eventId', process.env.eventid)
      .set('buildversion', process.env.buildversion)
      .set('Authorization', 'Bearer ' + process.env.eToken)
      // .type('multipart/form-data')
      .field('module_name', 'file')
      .field('location', 'brochure')
      .field('type', 'file')
      .attach('data', './config/Wallpape Instructions.pdf')
      .end((err, response) => {
        consolelog(response)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_file_upload_message);
        done();
      });
  });
  */
  // Export Virtual booth
  

  
  it.only('Export Virtual Booth to mentioned valid emails ids: POST /backend/api/v2/events/booth/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            "rajeev1991@yopmail.com"
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    // expect(response.body.data.file_name).to.equals("Virtual_Booth_Export_");
    assert.isOk(response.body.data.file_name, Responsemessages.Parameter_Dashboard_Export_Virtual_Booth_message);
  });

  it.only('Export Virtual Booth to mentioned null as emails ids: POST /backend/api/v2/events/booth/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            null
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    // expect(response.body.data.file_name).to.equals("Virtual_Booth_Export_");
    assert.isOk(response.body.data.file_name, Responsemessages.Parameter_Dashboard_Export_Virtual_Booth_message);
  });

  it.only('Export Virtual Booth to mentioned blank emails ids: POST /backend/api/v2/events/booth/export', async () => {
    const export_body =
    {
      "data":
      {
        "email_ids":
          [
            "  "
          ]
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/export', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', export_body)
    // expect(response.body.data.file_name).to.equals("Virtual_Booth_Export_");
    assert.isOk(response.body.data.file_name, Responsemessages.Parameter_Dashboard_Export_Virtual_Booth_message);
  });

  it.only('Filter Virtual Booth by size in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "Large" } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].booth_size).to.equal('LARGE')
  });


  it.only('Filter Virtual Booth by size as Small in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "Small" } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 2')
    expect(response.body.data[0].booth_size).to.equal('SMALL')
  });

  it.only('Filter Virtual Booth by size as Medium in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "Medium" } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(0)
  });


  it.only('Filter Virtual Booth by Premium Booth as off in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "", "is_premium": 0 } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].booth_size).to.equal('LARGE')
    expect(response.body.data[0].is_premium).to.equal(0)
  });

  it.only('Filter Virtual Booth by Premium Booth as On in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "", "is_premium": 1 } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 2')
    expect(response.body.data[0].booth_size).to.equal('SMALL')
    expect(response.body.data[0].is_premium).to.equal(1)
  });

  it.only('Filter Virtual Booth by Booth Size as Large and Premium Booth as off in dashbaord: GET /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_Filter =
      { "data": { "filter": { "category": "", "booth_size": "Large", "is_premium": 0 } } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post', virtual_Booth_Filter)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].booth_size).to.equal('LARGE')
    expect(response.body.data[0].is_premium).to.equal(0)
  });

  it.only('Search Virtual Booth by name in dashbaord: POST /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_search =
    {
      "data":
      {
        "filter": {}
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'test updated 1' }, 'post', virtual_Booth_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].booth_size).to.equal('LARGE')
    expect(response.body.data[0].is_premium).to.equal(0)
  });

  it.only('Search Virtual Booth by email in dashbaord: POST /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_search =
      { "data": { "filter": {} } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'testfghanistan@yopmail.com' }, 'post', virtual_Booth_search)
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].booth_size).to.equal('LARGE')
    expect(response.body.data[0].email).to.equal('testfghanistan@yopmail.com')
  });

  it.only('Search Virtual Booth by wrong name in dashbaord: POST /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_search =
      { "data": { "filter": {} } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'wrong name' }, 'post', virtual_Booth_search)
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Search Virtual Booth by wrong email in dashbaord: POST /backend/api/v2/events/booth/list', async () => {
    const virtual_Booth_search =
      { "data": { "filter": {} } }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'testfgn@yopmail.com' }, 'post', virtual_Booth_search)
    expect(response.body.total_count).to.equal(0)
  });


  //Event Analytics

  it.only('Verify Virtual Booth stats in Event Analytics in dashbaord: GET /api/v1/analytics/booth/stats', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/booth/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.totalVirtualBooths).to.equal(2)
    expect(response.body.data.totalConnections).to.equal(1)
    expect(response.body.data.totalVisits).to.equal(1)
    expect(response.body.data.avgUserRating).to.equal(3)
    expect(response.body.data.categoryData[0].category).to.equal('category')
    expect(response.body.data.categoryData[0].count).to.equal(1)
  });

  it.only('Verify Virtual Booth wise stats in Event Analytics in dashbaord: POST /api/v1/analytics/boothwise/stats', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/boothwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.total_count).to.equal(2)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].profileViews).to.equal(1)
    expect(response.body.data[0].connectionsMade).to.equal(1)
    expect(response.body.data[1].name).to.equal('test updated 2')
  });

  it.only('Verify Virtual Booth Top Chart in Event Analytics in dashbaord: GET /api/v1/analytics/booth/topcharts', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/booth/topcharts', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
    expect(response.body.data.mostPopular.rating).to.equal(3)
    expect(response.body.data.mostVisited.count).to.equal(1)
    expect(response.body.data.mostBusinessCardsCollected.count).to.equal(1)
    expect(response.body.data.boothData[0].name).to.equal('test updated 1')
  });


  it.only('Download Virtual Booth Summary in Event Analytics in dashbaord: GET /api/v1/analytics/download/booth/summary', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/download/booth/summary', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
  });

  it.only('Download Individual Virtual Booth Summary in Event Analytics in dashbaord: POST /api/v1/analytics/boothwise/download', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/boothwise/download', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'boothid': virtualboothid1 }, 'post')
  });

  it.only('Search Virtual Booth wise stats in Event Analytics by name in dashbaord: POST /api/v1/analytics/boothwise/stats', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/boothwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'test updated 1' }, 'post')
    expect(response.body.total_count).to.equal(1)
    expect(response.body.data[0].name).to.equal('test updated 1')
    expect(response.body.data[0].profileViews).to.equal(1)
  });

  it.only('Search Virtual Booth wise stats with wrong Virtual Booth name in Event Analytics in dashbaord: POST /api/v1/analytics/boothwise/stats', async () => {

    var response = await sendRequest(environment.baseURL, '/api/v1/analytics/boothwise/stats', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion, 'search': 'wrongname' }, 'post')
    expect(response.body.total_count).to.equal(0)
  });

  it.only('Verify Virtual booth in overview in dashbaord: POST /api/v1/event/overview/analytics/numbers', async () => {
   
    var response = await sendRequest(environment.baseURL, '/api/v1/event/overview/analytics/numbers', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'post')
    expect(response.body.data.total.booth).to.equal(2)
  });

  it.only('Update Virtual booth to premium booth and Show Analytics as True: POST  /backend/api/v2/events/booth/premium/settings', async () => {
   
    const virtual_booth =
    {
      "data": {
        "is_premium": true,
        "is_manage_profile": true,
        "is_add_team_members": true,
        "team_members_limit": 10,
        "is_show_analytics": true
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/premium/settings', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid2 },'put',virtual_booth)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
  });


  it.only('Update Virtual booth to Non-premium booth and Show analytics as false : POST  /backend/api/v2/events/booth/premium/settings', async () => {
   
    const virtual_booth =
    {
      "data": {
        "is_premium": false,
        "is_manage_profile": true,
        "is_add_team_members": true,
        "team_members_limit": 10,
        "is_show_analytics": false
      }
    }

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/premium/settings', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid2 },'put',virtual_booth)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
  });


  //Custom tag cases


  it.only('Add custom tags for virtual booth : POST /backend/api/v2/events/general/customtags/add', async () => {
    const payload = {"data":{"name":"CUSTOM_TAG"}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_add_custom_tags_message)
    tag_id = response.body.data.id;
    expect(response.body.data.name).to.equal("CUSTOM_TAG");
  });

  it.only('Verify custom tags list for virtual booth : POST /backend/api/v2/events/general/customtags/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    expect(response.body.data.map(map => map.id)).to.include(tag_id)
    expect(response.body.data.map(map => map.name)).to.include("CUSTOM_TAG")
  });

  it.only('Update single booth with new tag and featured enabled: PUT /backend/api/v2/events/booth/basic', async () => {

    const virtual12 = {
      "data": {
        "booth_size": "LARGE",
        "category": "category",
        "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
        "email": "testfghanistan@yopmail.com",
        "fb_url": "https://facebook.com",
        "instagram_url": "https://instagram.com",
        "is_featured": true,
        "is_rating": true,
        "linked_url": "https://linkedin.com",
        "list_banner_image": [
          {
            "img_file_name": ""
          }
        ],
        "location": "afghnaistan adddres",
        "multiple_file": [{ filename: "process.env.VBfile_name", format: "pdf", real_filename: "sample-pdf-file.pdf" }],
        "name": "test updated 1",
        "phone": "9988776666",
        "phone_code": "+93",
        "position": 1,
        "profile_img": "",
        "spotlight_banner": [
          {
            "img_file_name": ""
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "test tag,CUSTOM_TAG",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com",
        "whatsapp_no": "12345678"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',virtual12)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
  });

  it.only('Fetch the Virtual Booth Details : POST /api/v2/exhibitors/exhibitor-details', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.data.name).to.equal('test updated 1');
    expect(response.body.success.data.tags).to.equal('test tag,CUSTOM_TAG');
  });

  it.only('Delete custom tag for virtual booth : POST /backend/api/v2/events/general/customtags/delete', async () => {
    const payload = {"data":{"id":tag_id}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/delete', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_delete_custom_tags_message)
  });

  it.only('Verify custom tags list for virtual booth : POST /backend/api/v2/events/general/customtags/list', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/general/customtags/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'get')
    expect(response.body.data.map(map => map.id)).to.not.include(tag_id)
    expect(response.body.data.map(map => map.name)).to.not.include("CUSTOM_TAG")
  });


  it.only('Verify the virtual booth id in the featured booth list on community : POST /api/v2/exhibitors', async () => {
    const virtualboothlist = {
      "payload": {
        "data": {
          "featured": true
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlist)
    expect(response.body.success.data.exhibitors.map( map => map.id)).to.have.members([virtualboothid1])
  });


  it.only('Update single booth with featured disabled : PUT /backend/api/v2/events/booth/basic', async () => {

    const virtual12 = {
      "data": {
        "booth_size": "LARGE",
        "category": "category",
        "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
        "email": "testfghanistan@yopmail.com",
        "fb_url": "https://facebook.com",
        "instagram_url": "https://instagram.com",
        "is_featured": false,
        "is_rating": true,
        "linked_url": "https://linkedin.com",
        "list_banner_image": [
          {
            "img_file_name": ""
          }
        ],
        "location": "afghnaistan adddres",
        "multiple_file": [{ filename: "process.env.VBfile_name", format: "pdf", real_filename: "sample-pdf-file.pdf" }],
        "name": "test updated 1",
        "phone": "9988776666",
        "phone_code": "+93",
        "position": 1,
        "profile_img": "",
        "spotlight_banner": [
          {
            "img_file_name": ""
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "test tag,CUSTOM_TAG",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com",
        "whatsapp_no": "12345678"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',virtual12)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
  });

  it.only('Verify the virtual booth id in the featured booth list on community : POST /api/v2/exhibitors', async () => {
    const virtualboothlist = {
      "payload": {
        "data": {
          "featured": true
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothlist)
    expect(response.body.success.data.exhibitors.map( map => map.id)).to.not.include([virtualboothid1])
  });

  //Add banner, spotlight banner and list banners

  it.only('Add booth logo : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'img')
    .field('location','booth')
    .attach('data','./booth_images/1200px-Ducati_Corse_logo.png',{ contentType: 'image/png' })
    file_name_logo = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });

  it.only('Add booth spotlight banner : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    const fs = require('fs')
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'base')
    .field('location','boothSpotlightBanner')
    .field('data', 'data:image/jpeg;base64,' + fs.readFileSync('./booth_images/Ducatibanner.jpg', 'base64'))
    file_name_soptlight_banner = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });


  it.only('Add booth reception banner : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    const fs = require('fs')
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'base')
    .field('location','boothSmallBanner')
    .field('data', 'data:image/png;base64,' + fs.readFileSync('./booth_images/DucatiSessionResecptionBanner.png', 'base64'))
    file_name_reception_banner = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });

  it.only('Add booth list banner : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    const fs = require('fs')
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'base')
    .field('location','boothListBanner')
    .field('data', 'data:image/jpeg;base64,' + fs.readFileSync('./booth_images/DucatiListBanner.jpg', 'base64'))
    file_name_boothlist_banner = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });

  it.only('Update single booth with banners and logos : PUT /backend/api/v2/events/booth/basic', async () => {

    const virtual12 = {
      "data": {
        "booth_size": "LARGE",
        "category": "category",
        "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me</span></strong></span></li>\n</ol>",
        "email": "testfghanistan@yopmail.com",
        "fb_url": "https://facebook.com",
        "instagram_url": "https://instagram.com",
        "is_featured": false,
        "is_rating": true,
        "linked_url": "https://linkedin.com",
        "list_banner_image": [
          {
            "img_file_name": file_name_boothlist_banner
          }
        ],
        "location": "afghnaistan adddres",
        "multiple_file": [{ filename: process.env.VBfile_name, format: "pdf", real_filename: "sample-pdf-file.pdf" }],
        "name": "test updated 1",
        "phone": "9988776666",
        "phone_code": "+93",
        "position": 1,
        "profile_img": file_name_logo,
        "spotlight_banner": [
          {
            "img_file_name": file_name_soptlight_banner
          }
        ],
        "small_banner_image": [
          {
            "img_file_name": file_name_reception_banner
          }
        ],
        "spotlight_banner_type": "IMAGE",
        "tags": "test tag,CUSTOM_TAG",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com",
        "whatsapp_no": "12345678"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',virtual12)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_updated_message);
  });

  

  it.only('Add a single boothmember with mandatory parameters: POST /backend/api/v2/people/single', async () => {
    var people = new People();
    var peopleId = await people.addSingleAttendeeAndVerify(organizerUserHeader(), process.env.eventid, 'newOnboardboothmember@yopmail.com', 'OnboardingUser', 'boothmember', [global.attendeegroup])
    peopleList.push(peopleId)
  });


  //Test cases by Biswajit - From previous booth

  it.only('single booth add in past event : POST /backend/api/v2/events/booth/add', async () => {
    var virtualBoothPayload = virtual10;
    virtualBoothPayload.data.name = 'test booth in past event';
    virtualBoothPayload.data.category = 'category from past'
    virtualBoothPayload.data.booth_size = 'LARGE'
    virtualBoothPayload.data.tags = 'OldEventTag1,OldEventTag1'
    virtualBoothPayload.data.position = 1
    virtualBoothPayload.data.productLabel = "OldEventProduct"
    virtualBoothPayload.data.is_rating = 1
    virtualBoothPayload.data.is_featured = 1
    console.log(virtualBoothPayload)
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/add',{'organiserId': environment.HOrganiserId, 'eventId' : global.endedEventId, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',virtualBoothPayload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_post_message);
    pastEventBoothId=(response.body.data.ids.exhibitor_id)
  });



  it.only('Verify booth list in previous event booth list : GET /api/v1/events/previousevents/booths', async () => {
    var response = await sendRequest(environment.baseURL, '/api/v1/events/previousevents/booths', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'page': '1', 'limit': 20, 'search': ''},'get')
    expect(response.body.data.map(map => map.id)).to.include(pastEventBoothId)
  });

  it.only('Create a booth from previous event : POST  /api/v1/events/previousevents/booths', async () => {
    const payload = {"data":{"boothList":[pastEventBoothId]}}
    var response = await sendRequest(environment.baseURL, '/api/v1/events/previousevents/booths', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken},'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_add_from_previous_event_message)
  });

  it.only('Verify booth details : POST  /backend/api/v2/events/booth/list', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'page': '1', 'limit': 5, 'search': ''},'post',payload)
    console.log(response.body.data)
  });

  it.only('Get single virtual booth: POST /backend/api/v2/events/booth/list', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/list',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'page' : environment.HPage, 'limit' : environment.HLimit},'post')
    console.log(response.body.data)
    expect(response.body.data[2].booth_size).to.equal('SMALL');
    expect(response.body.data[2].name).to.equal('test booth in past event');
    expect(response.body.data[2].category).to.equal('')
    ticketid3 = (response.body.data[2].exhibitor_id)
    virtualboothid3 = ticketid3
  });

  it.only('Verify booth created from previous event : GET /backend/api/v2/events/booth/basic', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/basic',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid3},'get')
    expect(response.body.data.name).to.equal('test booth in past event');
    expect(response.body.data.booth_size).to.equal('SMALL');
    expect(response.body.data.category).to.equal('');
    expect(response.body.data.tags).to.equal('');
    expect(response.body.data.id).to.equal(virtualboothid3);
    expect(response.body.data.is_featured).to.equal(0);
    expect(response.body.data.is_rating).to.equal(0);
    console.log(response.body.data)
  });


  //Verify adding Product images and videos

  it.only('Verify default image section in booth settings : GET /backend/api/v2/events/booth/product/images', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_images).to.be.empty
    expect(response.body.virtual_booth_name).to.equal('test updated 1');
  });

  it.only('Add product image for virtual booth : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'img')
    .field('location','boothProductImage')
    .attach('data','./images_branding/ferriswheel.png',{ contentType: 'image/png' })
    file_name = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });

  it.only('Save image upload and add to settings : PUT /backend/api/v2/events/booth/product/images', async () => {
    const payload = {
      "data": {
        "action": "add",
        "product_images": [
          {
            "img_file_name": file_name,
            "description": "",
            "button_label": "",
            "link": "",
            "title": ""
          }
        ]
      }
    }
    console.log(payload)
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_image_add_success_message)
    expect(response.body.data.product_images[0].img_file_name).to.equal(file_name)
    expect(response.body.data.product_images[0].id).to.equal(1)
  });

  it.only('Edit and save product image details and add to settings : PUT /backend/api/v2/events/booth/product/images', async () => {
    const payload = {
      "data": {
        "action": "add",
        "product_images": [
          {
            "img_file_name": file_name,
            "description": "<p>TestImageDescription</p>",
            "button_label": "TestLabel",
            "link": "https://hubilo.com/",
            "title": "TestImage",
            "id": 1
          }
        ]
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_image_add_success_message)
    expect(response.body.data.product_images[0].img_file_name).to.equal(file_name)
    expect(response.body.data.product_images[0].id).to.equal(1)
    expect(response.body.data.product_images[0].description).to.equal('<p>TestImageDescription</p>')
    expect(response.body.data.product_images[0].button_label).to.equal('TestLabel')
    expect(response.body.data.product_images[0].title).to.equal('TestImage')
    expect(response.body.data.product_images[0].link).to.equal('https://hubilo.com/')
  });

  it.only('Add another product image for virtual booth : POST /backend/api/v2/events/uploads', async () => {
    const request = require('supertest');
    var response = await request(environment.baseURL1)
    .post('/backend/api/v2/events/uploads')
    .set({'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1})
    .field('type', 'img')
    .field('location','boothProductImage')
    .attach('data','./images_branding/ferriswheel.png',{ contentType: 'image/png' })
    file_name2 = response.body.data.file_name
    expect(response.status).to.equal(200) 
    expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message) 
  });

  it.only('Save image upload and add to settings : PUT /backend/api/v2/events/booth/product/images', async () => {
    const payload = {
      "data": {
        "action": "add",
        "product_images": [
          {
            "img_file_name": file_name,
            "description": "<p>TestImageDescription</p>",
            "button_label": "TestLabel",
            "link": "https://hubilo.com/",
            "title": "TestImage",
            "id": 1
          },
          {
            "img_file_name": file_name2,
            "description": "",
            "button_label": "",
            "link": "",
            "title": ""
          }
        ]
      }
    }
    console.log(payload)
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_image_add_success_message)
    expect(response.body.data.product_images[1].id).to.equal(2)
    expect(response.body.data.product_images[1].img_file_name).to.equal(file_name2)
  });

  it.only('Edit and save product image details : PUT /backend/api/v2/events/booth/product/images', async () => {
    const payload = {
      "data": {
        "action": "add",
        "product_images": [
          {
            "img_file_name": file_name,
            "description": "<p>TestImageDescription</p>",
            "button_label": "TestLabel",
            "link": "https://hubilo.com/",
            "title": "TestImage",
            "id": 1
          },
          {
            "img_file_name": file_name2,
            "description": "<p>TestImageDescription2</p>",
            "button_label": "TestLabel2",
            "link": "https://hubilo.com/",
            "title": "TestImage2",
            "id": 2
          }
        ]
      }
    }
    console.log(payload)
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_image_add_success_message)
    expect(response.body.data.product_images[1].img_file_name).to.equal(file_name2)
    expect(response.body.data.product_images[1].id).to.equal(2)
    expect(response.body.data.product_images[1].description).to.equal('<p>TestImageDescription2</p>')
    expect(response.body.data.product_images[1].button_label).to.equal('TestLabel2')
    expect(response.body.data.product_images[1].title).to.equal('TestImage2')
    expect(response.body.data.product_images[1].link).to.equal('https://hubilo.com/')
  });

  it.only('Get the images list : GET /backend/api/v2/events/booth/product/images', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_images.length).to.equal(2)
    expect(response.body.data.product_images.map(map=>map.img_file_name)).to.have.members([file_name,file_name2])
    expect(response.body.data.product_images.map(map=>map.id)).to.have.members([1,2])
    expect(response.body.data.product_images.map(map=>map.description)).to.have.members(['<p>TestImageDescription</p>','<p>TestImageDescription2</p>'])
    expect(response.body.data.product_images.map(map=>map.button_label)).to.have.members(['TestLabel','TestLabel2'])
    expect(response.body.data.product_images.map(map=>map.title)).to.have.members(['TestImage','TestImage2'])
  });

  it.only('Fetch the Virtual Booth Details verify product images : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productImage = JSON.parse(response.body.success.data.productImages)
    expect(productImage.map(map => map.img_file_name)).to.have.members([file_name,file_name2])
    expect(productImage.map(map => map.button_label)).to.have.members(['TestLabel','TestLabel2'])
    expect(productImage.map(map => map.description)).to.have.members(['<p>TestImageDescription</p>','<p>TestImageDescription2</p>'])
    expect(productImage.map(map => map.title)).to.have.members(['TestImage','TestImage2'])
  });

  it.only('Delete an product image : PUT /backend/api/v2/events/booth/product/images', async () => {
    const payload = {
      "data": {
        "action": "delete",
        "product_images": [
          {
            "img_file_name": file_name,
            "description": "<p>TestImageDescription</p>",
            "button_label": "TestLabel",
            "link": "https://hubilo.com/",
            "title": "TestImage",
            "id": 1
          }
        ]
      }
    }
    console.log(payload)
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_image_delete_success_message)
    expect(response.body.data.product_images.length).to.equal(1)
    expect(response.body.data.product_images[0].img_file_name).to.equal(file_name)
    expect(response.body.data.product_images[0].id).to.equal(1)
    expect(response.body.data.product_images[0].description).to.equal('<p>TestImageDescription</p>')
    expect(response.body.data.product_images[0].button_label).to.equal('TestLabel')
    expect(response.body.data.product_images[0].title).to.equal('TestImage')
    expect(response.body.data.product_images[0].link).to.equal('https://hubilo.com/')
  });

  it.only('Verify the images list post delete of an image : GET /backend/api/v2/events/booth/product/images', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/images',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_images.length).to.equal(1)
    expect(response.body.data.product_images[0].img_file_name).to.equal(file_name)
    expect(response.body.data.product_images[0].id).to.equal(1)
  });

  it.only('Fetch the Virtual Booth Details verify product images post delete : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productImage = JSON.parse(response.body.success.data.productImages)
    expect(productImage.map(map => map.img_file_name)).to.have.members([file_name])
    expect(productImage.map(map => map.button_label)).to.have.members(['TestLabel'])
  });

  it.only('Verify default videos section in booth settings : GET /backend/api/v2/events/booth/product/videos', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_videos).to.be.empty
    expect(response.body.virtual_booth_name).to.equal('test updated 1');
  });



  it.only('Add youtube video add to settings : PUT /backend/api/v2/events/booth/product/videos', async () => {
    const payload = {
      "data": {
        "product_videos": [
          {
            "type": "YOUTUBE",
            "youtube_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
            "caption": "YoutubeTestVideo",
            "thumb": ""
          }
        ],
        "action": "add"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_video_add_success_message)
  });

  it.only('Add Vimeo video to product video section : PUT /backend/api/v2/events/booth/product/videos', async () => {
    const payload = {
      "data": {
        "product_videos": [
          {
            "type": "YOUTUBE",
            "youtube_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
            "caption": "YoutubeTestVideo",
            "thumb": ""
          },
          {
            "type": "VIMEO",
            "youtube_link": "https://vimeo.com/253989945",
            "caption": "VimeoTestVideo",
            "thumb": ""
          }
        ],
        "action": "add"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_video_add_success_message)
  });

  it.only('Verify booth videos list : GET /backend/api/v2/events/booth/product/videos', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_videos.length).to.equal(2)
    expect(response.body.data.product_videos.map(map => map.type)).to.have.members(['YOUTUBE','VIMEO'])
    expect(response.body.data.product_videos.map(map => map.youtube_link)).to.have.members(['https://www.youtube.com/watch?v=RpxiptFOg5k','https://vimeo.com/253989945'])
    expect(response.body.data.product_videos.map(map => map.caption)).to.have.members(['YoutubeTestVideo','VimeoTestVideo'])
  });

  it.only('Fetch the Virtual Booth Details verify product videos : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productVideos = JSON.parse(response.body.success.data.productVideos)
    expect(productVideos.map(map => map.type)).to.have.members(['YOUTUBE','VIMEO'])
    expect(productVideos.map(map => map.caption)).to.have.members(['YoutubeTestVideo','VimeoTestVideo'])
  });

  it.only('Delete Vimeo video to product video section : POST /backend/api/v2/events/booth/product/videos', async () => {
    const payload = {
      "data": {
        "product_videos": [
          {
            "type": "YOUTUBE",
            "youtube_link": "https://www.youtube.com/watch?v=RpxiptFOg5k",
            "caption": "YoutubeTestVideo",
            "thumb": ""
          }
        ],
        "action": "delete"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_vidoe_delete_success_message)
  });

  it.only('Verify booth videos list post delete : GET /backend/api/v2/events/booth/product/videos', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/product/videos',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    console.log(response.body)
    expect(response.body.data.product_videos.length).to.equal(1)
    expect(response.body.data.product_videos.map(map => map.type)).to.have.members(['YOUTUBE'])
    expect(response.body.data.product_videos.map(map => map.youtube_link)).to.have.members(['https://www.youtube.com/watch?v=RpxiptFOg5k'])
    expect(response.body.data.product_videos.map(map => map.caption)).to.have.members(['YoutubeTestVideo'])
  });

  //CTA Button details

  it.only('Add CTA button details : PUT /backend/api/v2/events/booth/cta', async () => {
    const payload = {
      "data": {
        "cta_description": "<p>CTA description</p>",
        "cta_title": "TestCTALabel",
        "cta_button_label": "CTAButton",
        "cta_link": "https://hubilo.com/"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/cta',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_CTA_button_add_message)
  });

  it.only('Verify CTA button details on dashboard : GET /backend/api/v2/events/booth/cta', async () => {
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/cta',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'get')
    expect(response.body.virtual_booth_name).to.equal('test updated 1')
    expect(response.body.data.cta_title).to.equal('TestCTALabel')
    expect(response.body.data.cta_description).to.equal('<p>CTA description<\/p>')
    expect(response.body.data.cta_button_label).to.equal('CTAButton')
    expect(response.body.data.cta_link).to.equal('https:\/\/hubilo.com\/')
  });

  it.only('Verify the Virtual Booth CTA label details : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.data.ctaTitle).to.equal('TestCTALabel')
    expect(response.body.success.data.ctaDescription).to.equal('<p>CTA description<\/p>')
    expect(response.body.success.data.ctaButtonLabel).to.equal('CTAButton')
    expect(response.body.success.data.ctaLink).to.equal('https:\/\/hubilo.com\/')
  });

  it.only('Update CTA button details user 20 char label and 1000 char description : PUT /backend/api/v2/events/booth/cta', async () => {
    const payload = {
      "data": {
        "cta_description": "thisisgood".repeat(100),
        "cta_title": "TestCTALabel",
        "cta_button_label": "thisisgood".repeat(2),
        "cta_link": "https://hubilo.com/"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/cta',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtual_booth_CTA_button_add_message)
  });

  it.only('Update CTA button details user 24 char label and 1004 char description and verify error : PUT /backend/api/v2/events/booth/cta', async () => {
    const payload = {
      "data": {
        "cta_description": "thisisgood".repeat(100) + 'good',
        "cta_title": "TestCTALabel",
        "cta_button_label": "thisisgood".repeat(2) + 'good',
        "cta_link": "https://hubilo.com/"
      }
    }
    var response = await sendRequest(environment.baseURL1,'/backend/api/v2/events/booth/cta',{'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid': virtualboothid1},'put',payload)
    //expect(response.body.message).to.not.equal(Responsemessages.Parameter_virtual_booth_CTA_button_add_message)
  });

  //team member cases 

  it.only('Verify add team member attendee list search action  : GET /backend/api/v2/events/booth/attendees', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/attendees', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1, 'page': 1, 'search':'OnboardingUser' },'get')
    console.log(response.body)
    expect(response.body.data.length).to.equal(1)
    expect(response.body.data[0].userId).to.equal(peopleList[0])
    expect(response.body.data[0].email).to.equal('newonboardboothmember@yopmail.com')
  });

  it.only('Add  team member : POST /backend/api/v2/events/booth/members/add', async () => {
    const payload = {"data":{"userId":[peopleList[0]],"role":"MEMBER"}}
    console.log(payload)
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/members/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1 },'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_team_member_Add)
  });

  it.only('Verify team member : POST  /backend/api/v2/events/booth/members/list', async () => {
    const payload = {"data":{"filter":{}}}
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/members/list', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1, 'page': 1 },'post',payload)
    expect(response.body.virtual_booth_name).to.equal('test updated 1')
    expect(response.body.data[0]._id).to.equal(peopleList[0])
    expect(response.body.data[0].firstName).to.equal('OnboardingUser')
    expect(response.body.data[0].lastName).to.equal('Boothmember')
    expect(response.body.data[0].email).to.equal('newonboardboothmember@yopmail.com')
    expect(response.body.data[0].userId).to.equal(peopleList[0])
  });

  it.only('Verify add team member attendee list  : GET /backend/api/v2/events/booth/attendees', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/attendees', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1, 'page': 1, 'search':'' },'get')
    expect(response.body.data.map(map => map._id)).to.not.include(peopleList[0])
    expect(response.body.data.map(map => map.email)).to.not.include('newonboardboothmember@yopmail.com')
  });

  it.only('Verify add team member attendee list for another booth : GET /backend/api/v2/events/booth/attendees', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/attendees', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid2, 'page': 1, 'search':'' },'get')
    expect(response.body.data.map(map => map._id)).to.not.include(peopleList[0])
    expect(response.body.data.map(map => map.email)).to.not.include('newonboardboothmember@yopmail.com')
  });

  it.only('Add another team member : POST /backend/api/v2/events/booth/members/add', async () => {
    const payload = {"data":{"userId":[process.env.clown26userid],"role":"MEMBER"}}
    console.log(payload)
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/members/add', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1 },'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_team_member_Add)
  });

  it.only('Delete team member : POST /backend/api/v2/events/booth/members/delete', async () => {
    const payload = {"data":{"userId":[process.env.clown26userid],"role":"MEMBER"}}
    console.log(payload)
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/members/delete', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1 },'post',payload)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_team_member_delete)
  });

  it.only('Login to community using otp for the new user (attendee2@yopmail.com): POST /api/v2/users/login', async () => {
    var signup = new ComunitySignupLogin();
    var accessTokenLoginPage = await signup.getNewWebstate(process.env.eventurl)
    global.accessTokenLoginTeammamber= await signup.loginWithOtp(accessTokenLoginPage, 'newonboardboothmember@yopmail.com', '1234')
  })

  //View product images and videos 

  it.only('View product video : POST /api/v2/analytics/record', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "typeId": String(virtualboothid1),
          "productVideo": "https://www.youtube.com/watch?v=RpxiptFOg5k",
          "action": "PRODUCT_VIDEO_VIEW",
          "type": "EXHIBITOR"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/analytics/record',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
  });

  it.only('View product video : POST /api/v2/analytics/record', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "typeId": String(virtualboothid1),
          "productImage": file_name,
          "type": "EXHIBITOR",
          "action": "PRODUCT_VIEW"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/analytics/record',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
  });

  it.only('Click on CTA button : POST /api/v2/analytics/record', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "typeId": String(virtualboothid1),
          "type": "EXHIBITOR",
          "action": "CTA_CLICK"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/analytics/record',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
  });

  it.only('Download sample file : POST /api/v2/analytics/record', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "typeId": String(virtualboothid1),
          "type": "EXHIBITOR",
          "action": "PDFDOWNLOAD",
          "downloadFile": "sample-pdf-file.pdf"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/analytics/record',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
  });


  //Enable premium settings

  it.only('Update Virtual booth to premium booth and Show Analytics as True: POST  /backend/api/v2/events/booth/premium/settings', async () => {
    const virtual_booth =
    {
      "data": {
        "is_premium": true,
        "is_manage_profile": true,
        "is_add_team_members": true,
        "team_members_limit": 10,
        "is_show_analytics": true
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/premium/settings', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1 },'put',virtual_booth)
    expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_Premium_Message)
  });

  it.only('Verify Virtual booth premium booth and Show Analytics as True: GET /backend/api/v2/events/booth/premium/settings', async () => {
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/booth/premium/settings', {'organiserId': environment.HOrganiserId, 'eventId' : process.env.eventid, 'buildversion': process.env.buildversion, 'Authorization' : 'Bearer ' + process.env.eToken, 'boothid':virtualboothid1 },'get')
    expect(response.body.data.is_premium).to.equal(1)
    expect(response.body.data.is_manage_profile).to.equal(1)
    expect(response.body.data.is_add_team_members).to.equal(1)
    expect(response.body.data.is_show_analytics).to.equal(1)
    expect(response.body.data.team_members_limit).to.equal(10)
  });

  it.only('Verify exhbitor premium settings on community : POST /api/v2/platformNew/navigate-new', async () => {
    const virtualboothdetails = {"payload":{"data":null}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/platformNew/navigate-new',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    console.log(response.body.success.data)
    expect(response.body.success.data.partnerDetails.e_id).to.equal(virtualboothid1)
    expect(response.body.success.data.partnerDetails.e_name).to.equal('test updated 1')
    expect(response.body.success.data.partnerDetails.isShowAnalytics).to.equal(1)
    expect(response.body.success.data.partnerDetails.isPremium).to.equal(1)
    expect(response.body.success.data.partnerDetails.isManageProfile).to.equal(1)
    expect(response.body.success.data.partnerDetails.staticType).to.equal('EXHIBITOR')
  });

  it.only('Verify exhbitor data on exhibitor dashboard : POST /api/v2/exhibitors/get-exhibitor-data', async () => {
    const virtualboothdetails = {"payload":{}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/get-exhibitor-data',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    console.log(response.body)
    expect(response.body.success.data.id).to.equal(virtualboothid1)
    expect(response.body.success.data.name).to.equal('test updated 1')
    expect(response.body.success.data.phone).to.equal('9988776666')
    expect(response.body.success.data.email).to.equal('testfghanistan@yopmail.com')
    expect(response.body.success.data.productLabel).to.equal('')
    var productImage = JSON.parse(response.body.success.data.productImages)
    expect(productImage.map(map => map.img_file_name)).to.have.members([file_name])
    expect(productImage.map(map => map.button_label)).to.have.members(['TestLabel'])
    expect(productImage.map(map => map.description)).to.have.members(['<p>TestImageDescription</p>'])
    expect(productImage.map(map => map.title)).to.have.members(['TestImage'])
    var productVideos = JSON.parse(response.body.success.data.productVideos)
    expect(productVideos.map(map => map.type)).to.have.members(['YOUTUBE'])
    expect(productVideos.map(map => map.caption)).to.have.members(['YoutubeTestVideo'])
  });

  it.only('Verify team member data on exhibitor dashboard : POST /api/v2/exhibitors/team-members', async () => {
    const virtualboothdetails = {"payload":{"data":{"exhibitorId":virtualboothid1,"currentPage":0,"limit":12}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/team-members',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.data.members.length).to.equal(1)
    //expect(response.body.success.data.members[0]._id).to.equal(peopleList[0])
    expect(response.body.success.data.members[0].userId).to.equal(peopleList[0])
    expect(response.body.success.data.members[0].accessType).to.equal(2)
    //expect(response.body.success.data.members[0].email).to.equal('newonboardboothmember@yopmail.com')
  });

  it.only('Update booth profile info from exhibitor dashboard : POST /api/v2/exhibitors/save-exhibitor-info', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "id": virtualboothid1,
          "organiserId": environment.HOrganiserId,
          "name": "test updated exhibitor dashboard",
          "phone": "9988776666",
          "email": "testfghanistan@yopmail.com",
          "phoneCode": "+91",
          "profileImg": file_name_logo,
          "description": "<ol>\n<li><span style=\"font-size: 12pt;\"><strong><span style=\"text-decoration: underline;\">about me updated</span></strong></span></li>\n</ol>",
          "brochureFile": "3199_9131_681885001639994003.pdf",
          "multipleFile": "[{\"filename\":\" " + process.env.VBfile_name + " \",\"format\":\"pdf\",\"real_filename\":\"sample-pdf-file.pdf\"}]",
          "brochureFileName": "sample-pdf-file.pdf",
          "websiteUrl": "https://google.com",
          "location": "afghnaistan adddres",
          "fbUrl": "https://facebook.com",
          "linkedUrl": "https://linkedin.com",
          "twitterUrl": "https://twitter.com",
          "eventCount": 0,
          "productImages": "[{\"img_file_name\":\"" + file_name + "\",\"description\":\"<p>TestImageDescription<\\/p>\",\"button_label\":\"TestLabel\",\"link\":\"https:\\/\\/hubilo.com\\/\",\"title\":\"TestImage\",\"id\":1}]",
          "productVideos": "[{\"type\":\"YOUTUBE\",\"thumb\":\"youtube_4001_9954_561704001639994116.jpg\",\"youtube_link\":\"https:\\/\\/www.youtube.com\\/watch?v=RpxiptFOg5k\",\"caption\":\"YoutubeTestVideo\"}]",
          "productLabel": "",
          "spotlightBannerType": "IMAGE",
          "spotlightBanner": "[{\"img_file_name\":\"" + file_name_soptlight_banner + "\"}]",
          "instagramUrl": "https://instagram.com",
          "whatsappNo": "+919988776666",
          "ctaDescription": "thisisgood",
          "ctaButtonLabel": "thisisgood",
          "ctaLink": "https://hubilo.com/",
          "listBannerImage": "[{\"img_file_name\":\"" + file_name_boothlist_banner + "\"}]",
          "boothSize": "LARGE",
          "ctaTitle": "TestCTALabelUpdatedFromExhibitorDashboard",
          "liveChat": 1,
          "qna": 1,
          "qnaModeration": 1,
          "livePolls": 1,
          "smallBannerImage": "[{\"img_file_name\":\"" + file_name_reception_banner + "\"}]"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/save-exhibitor-info',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtual_booth_exhibitor_dashboard_update_profile)
  });

  it.only('Update product and service label: POST /api/v2/exhibitors/update/product', async () => {
    const get_signed_url = {
      "payload": {
        "data": {
          "updateType": "LABEL",
          "productVideos": "",
          "productImages": "",
          "productLabel": "ProductAndService"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/exhibitors/update/product', {'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtual_booth_exhibitor_central_update_product_label)
    expect(response.body.success.data.updated).to.equal('ProductAndService')
  });

  it.only('Fetch the Virtual Booth Details verify product videos : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productVideos = JSON.parse(response.body.success.data.productVideos)
    console.log(response.body.success)
    expect(response.body.success.data.name).to.equal('test updated exhibitor dashboard')
    expect(response.body.success.data.whatsappNo).to.equal('+919988776666')
    expect(response.body.success.data.productLabel).to.equal('ProductAndService')
    expect(response.body.success.data.ctaTitle).to.equal('TestCTALabelUpdatedFromExhibitorDashboard')
    expect(response.body.success.data.ctaDescription).to.equal('thisisgood')
    expect(response.body.success.data.ctaButtonLabel).to.equal('thisisgood')
    expect(response.body.success.data.ctaLink).to.equal('https://hubilo.com/')
  });

  it.only('Upload image in product section: POST /api/v2/get-signed-url', async () => {
    const get_signed_url = {
        "payload": {
            "data": {
                "extension": "png",
                "contentType": "image/png",
                "uploadType": "EXHIBITOR_PRODUCT",
                "options":{}
            }
        }
    }
    var response = await sendRequest(environment.baseURL3, '/api/v2/get-signed-url', {'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'languageid' : 34, 'Content-Type' : 'application/json'}, 'post', get_signed_url);
    global.productImageFile = (response.body.success.data.urlLists[0].fileName);
    global.productImageFileUploadUrl = (response.body.success.data.urlLists[0].uploadURL)
  });

  it.only('Upload image to aws upload url', function(done){
      const req = require('supertest')
      var awsHost = 'https://' + global.productImageFileUploadUrl.split('/')[2]
      console.log(awsHost)
      var awsUploadUrl = global.productImageFileUploadUrl.substr(awsHost.length)
      console.log(awsUploadUrl)
      const fs = require('fs')
      let testImage = './images_branding/event_LOGO.png'
      console.log(awsUploadUrl.split('?')[0])
      req(awsHost).put(awsUploadUrl)
      .set('Content-Type','image/png')
      .send(fs.readFileSync(testImage))
      .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
      });
  });



  it.only('Add product images from exhibitor dashboard : POST /api/v2/exhibitors/update/product', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "updateType": "IMAGE",
          "productVideos": "",
          "productImages": "[{\"img_file_name\":\"" + file_name + "\",\"description\":\"<p>TestImageDescription</p>\",\"button_label\":\"TestLabel\",\"link\":\"https://hubilo.com/\",\"title\":\"TestImage\",\"id\":1},{\"title\":\"TestProduct\",\"img_file_name\":\"" + global.productImageFile + "\",\"button_label\":\"TestButton\",\"description\":\"<p>thisisgood</p>\",\"link\":\"https://hubilo.com/\"}]"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/update/product',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtual_booth_exhibitor_central_update_product_label)
  });

  it.only('Fetch the Virtual Booth Details verify product images : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productImage = JSON.parse(response.body.success.data.productImages)
    console.log(productImage)
    expect(productImage.map(map => map.img_file_name)).to.have.members([file_name,global.productImageFile])
    expect(productImage.map(map => map.button_label)).to.have.members(['TestLabel','TestButton'])
    expect(productImage.map(map => map.description)).to.have.members(['<p>TestImageDescription</p>','<p>thisisgood</p>'])
    expect(productImage.map(map => map.title)).to.have.members(['TestImage','TestProduct'])
  });

  it.only('Add product images from exhibitor dashboard : POST /api/v2/exhibitors/update/product', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "updateType": "VIDEO",
          "productVideos": "[{\"type\":\"YOUTUBE\",\"thumb\":\"youtube_3126_9589_075627001640007486.jpg\",\"youtube_link\":\"https://www.youtube.com/watch?v=RpxiptFOg5k\",\"caption\":\"YoutubeTestVideo\"},{\"caption\":\"YoutubeTestVideo2\",\"thumb\":\"\",\"link\":\"https://www.youtube.com/watch?v=RpxiptFOg5k\",\"youtube_link\":\"https://www.youtube.com/watch?v=RpxiptFOg5k\",\"type\":\"YouTube\"}]",
          "productImages": ""
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/update/product',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_virtual_booth_exhibitor_central_update_product_label)
  });

  it.only('Fetch the Virtual Booth Details verify product videos : POST /api/v2/exhibitors/exhibitor-details', async () => {
    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": virtualboothid1
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-details',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    var productVideos = JSON.parse(response.body.success.data.productVideos)
    expect(productVideos.map(map => map.type)).to.have.members(['YOUTUBE','YouTube'])
    expect(productVideos.map(map => map.caption)).to.have.members(['YoutubeTestVideo','YoutubeTestVideo2'])
  });

  it.only('Fetch the Virtual Booth Details verify product videos : POST /api/v2/exhibitors/exhibitor-analytics', async () => {
    const virtualboothdetails = {"payload":{"data":{"page":0,"limit":10,"sortOn":"ENGAGEMENT"}}}
    var response = await sendRequest(environment.baseURL3,'/api/v2/exhibitors/exhibitor-analytics',{'Authorization' : global.accessTokenLoginTeammamber, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    expect(response.body.success.data.profileViewCount).to.equal(9)
    expect(response.body.success.data.ctaCount).to.equal(1)
    expect(response.body.success.data.profileDownloadCount).to.equal(1)
    expect(response.body.success.data.imageViewCount).to.equal(1)
    expect(response.body.success.data.videoViewCount).to.equal(1)
    expect(response.body.success.data.businessCount).to.equal(1)
    expect(response.body.success.data.chatCount).to.equal(0)
    expect(response.body.success.data.meetingCount).to.equal(0)
    expect(response.body.success.data.leadsScanned).to.equal(0)
    expect(response.body.success.data.loungeMeetingCount).to.equal(0)
    expect(response.body.success.data.analytics[0].Id).to.equal(process.env.clown26userid)
    expect(response.body.success.data.analytics[0].user.email).to.equal('clown26@yopmail.com')
    expect(response.body.success.data.analytics[0].actionCount).to.equal(14)
    expect(response.body.success.data.analytics[0].status).to.equal('HOT')
  });
  
  /* Iframe Booth Cases */
  it.only('Verify Loading of Preview for Virtual Booth Embedded Iframe: GET api/v2/events/iframe-slug', async () => {

    const iframeslug = 
    {
      "status": 200,
      "data": {
       "iframe_slug":todayDate 
    }
    }
       
    var response = await sendRequest(environment.baseURL ,'/api/v2/events/iframe-slug',{'authority':"newdashboard-api.v2qat1.demohubilo.com",'content-type':"application/json", 'Authorization': process.env.eToken, 'organiserId': environment.HOrganiserId, 'eventid':process.env.eventid },'get', iframeslug)
    
    eventname = response.body.data.iframe_slug
    expect(response.body.status).to.equal(200) 
   
  });
  
  it.only('Verify Fetching of Token in iframe : POST api/v2/platformNew/web-state-iframe', async () => {
  
    const iframe = 
    {
      "payload": {
       "data": {
        "source": "COMMUNITY",
        "url": "events.v2qat1.demohubilo.com/" + eventname  ,
        "app_version": "1.0.0",
        "device_type": "WEB",
        "language": 34
        }
      }
    }
    var response = await sendRequest(environment.baseURL6, '/api/v2/platformNew/web-state-iframe',{'content-type':"application/json"},'post', iframe)
    global.eTokenembed = (response.body.success.data.access_token)
  });
      
  it.only('Verify Loading of  Exbhitor List in Iframe : POST api/v2/embed/exhibitor-list', async () => {
  
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.status).to.equal(true)
      expect(response.body.success.message).to.equal(Responsemessages.Parameter_exhibitors_list_message)
      global.boothid = (response.body.success.data.exhibitors[0].id)
   
    
      
  });
  
  it.only('Verify Booth from Previous event in Iframe : POST api/v2/embed/exhibitor-list', async () => {
    var virtualBoothPayload = virtual10;
    virtualBoothPayload.data.name = 'test booth in past event';
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
       expect(response.body.success.data.exhibitors[2].name).to.equal(virtualBoothPayload.data.name)
    
      
  });

  it.only('Verify Small Booths getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
    
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[1].boothSize).to.equal('SMALL');
      
  });

  it.only('Verify Large Booths getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
   
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[0].boothSize).to.equal('LARGE');
      
  });

  it.only('Verify Small Booths correct Name getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
   
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[1].name).to.equal('test updated 2')
      
  });

  it.only('Verify Large Booths correct Name getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
   
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[0].name).to.equal('test updated exhibitor dashboard')
      
  });

  it.only('Verify Large Booths correct Category getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
   
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[0].category).to.equal('category')
      
  });

  it.only('Verify  Booths correct Custom Tags getting displayed in Iframe : POST api/v2/embed/exhibitor-list', async () => {
   
    const iframe = 
      {
        "payload": {
        "data": {
        "currentPage": 0,
         "limit": 10,
         "featured": false,
        "categoryList": [],
        "customTag": ""
         }
        }
      }
               
      var response = await sendRequest(environment.baseURL6, '/api/v2/embed/exhibitor-list',{'authority':"embed-api.v2qat1.demohubilo.com",'content-type':"application/json",'Authorization':global.eTokenembed  ,},'post', iframe)
      expect(response.body.success.data.exhibitors[0].tags).to.equal('test tag,CUSTOM_TAG');
      
  });
  it.only('Verify Large Booth Details : POST /api/v2/exhibitors/exhibitor-details', async () => {

    const virtualboothdetails = {
      "payload": {
        "data": {
          "categoryList": [],
          "exhibitorId": global.boothid
        }
      }
    }
    var response = await sendRequest(environment.baseURL6,'/api/v2/embed/exhibitor-details',{'Authorization' : global.eTokenembed, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',virtualboothdetails)
    
    expect(response.body.success.message).to.equal('Exhibitor detail fetched successfully');
    expect(response.body.success.data.phone).to.equal('9988776666');
    expect(response.body.success.data.brochureFileName).to.equal('sample-pdf-file.pdf');
    expect(response.body.success.data.linkedUrl).to.equal('https://linkedin.com');
    expect(response.body.success.data.location).to.equal('afghnaistan adddres');
    expect(response.body.success.data.fbUrl).to.equal('https://facebook.com');
    expect(response.body.success.data.websiteUrl).to.equal('https://google.com');
    expect(response.body.success.data.twitterUrl).to.equal('https://twitter.com');
    expect(response.body.success.data.productLabel).to.equal('ProductAndService');
    expect(response.body.success.data.twitterUrl).to.equal('https://twitter.com');
    expect(response.body.success.data.twitterUrl).to.equal('https://twitter.com');
    expect(response.body.success.data.instagramUrl).to.equal('https://instagram.com');
    expect(response.body.success.data.ctaDescription).to.equal('thisisgood');
    expect(response.body.success.data.ctaButtonLabel).to.equal('thisisgood');
    expect(response.body.success.data.ctaLink).to.equal('https://hubilo.com/');
    expect(response.body.success.data.ctaTitle).to.equal('TestCTALabelUpdatedFromExhibitorDashboard');


     
  });   
  
  // DELETE VIRTUALBOOTHS
  
  it.only('delete all added users', async() => {
      var people = new People();
      people.deleteAddedAttendee(organizerUserHeader(), process.env.eventid, peopleList)
  })

  it.only('Delete all virtuabooths : POST /backend/api/v2/events/booth/delete', (done) => {
    const delete1 =
    {
      "data": {

        "booth_ids": [ticketid1, ticketid2, virtualboothid3],
        "is_all": 0

      }
    }
    request1
      .post('/backend/api/v2/events/booth/delete')
      .set('organiserId', environment.HOrganiserId)
      .set('eventId', process.env.eventid)
      .set('buildversion', process.env.buildversion)
      .set('Authorization', 'Bearer ' + process.env.eToken)
      .send(delete1)
      .end((err, response) => {
        consolelog(response);
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal(Responsemessages.Parameter_virtualbooth_deleted_message);
        done();
      });
  });
  
  


});
