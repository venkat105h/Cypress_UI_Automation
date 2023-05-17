/*
Author: Gaurav Thapar
Description: This Script will update/verify seo settings
Timestamp: 17th Sept 2021 11:30 AM
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();
var fs = require('fs');
var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');
var banner1

const request1 = supertest(environment.baseURL1);

describe('Setting SEO', () => {
    beforeEach(function (done) {
        setTimeout(function () {
            done();
        }, environment.HTestDelay);
    });

    it.only('Update SEO details in dashbaord: PUT /backend/api/v2/events/settings/seo', async () => {
        const seo_details =
        {
            "data": {
                "meta_keyword": "HTML, CSS, JavaScript",
                "description": "HTML, CSS, JavaScript",
                "title": "The AI Summit", 
                "image": ""
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/seo', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_seo_details_update_message)
    });

    it.only('Get seo details after update in dashbaord: GET /backend/api/v2/events/settings/seo', async () => {
    
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/seo', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.seoSettings.meta_keyword).to.equal('HTML, CSS, JavaScript')
        expect(response.body.data.seoSettings.description).to.equal('HTML, CSS, JavaScript')
        expect(response.body.data.seoSettings.title).to.equal('The AI Summit')
    });


    it.only('Update seo title with upto 100 character length in dashbaord: PUT /backend/api/v2/events/settings/seo', async () => {
        var title = 'This is Good'.repeat(10)
        const seo_details =
        {
            "data": {
                "meta_keyword": "HTML, CSS, JavaScript",
                "description": "HTML, CSS, JavaScript",
                "title": title, 
                "image": ""
            }
        }
    
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/seo', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put',seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_seo_details_update_message)
    });

    it.only('Update seo title,meta keyword,description with its character limit in dashbaord: PUT /backend/api/v2/events/settings/seo', async () => {
        var meta_keyword = 'HTML, CSS, JavaScript, Java, C'.repeat(10)
        var title = 'This is Good'.repeat(10)
        var description = 'HTML, Java'.repeat(50)
        const seo_details =
        {
            "data": {
                "meta_keyword": meta_keyword,
                "description": description,
                "title": title, 
                "image": ""
            }
        }
    
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/seo', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_seo_details_update_message)
    });

    it.only('Upload FB/Twitter Share Banner in dashbaord: POST /backend/api/v2/events/uploads',  (done) => {
        
        request1
        .post('/backend/api/v2/events/uploads')
        .set('organiserId', environment.HOrganiserId)
        .set('eventId', process.env.eventid)
        .set('Authorization', 'Bearer ' + process.env.eToken)
        .field('Content-Type', 'multipart/form-data')
        .field('location', 'contestImage')
        .field('type', 'base')
        .field('data', 'data:image/png;base64,' + imageAsBase64)
        .end((err, response) => {
            banner1 = (response.body.data.file_name)
            expect(response.body.message).to.equal(Responsemessages.Parameter_image_upload_successfull_message)
            done();
});

       
    });

    it.only('Update Seo details in dashbaord: PUT /backend/api/v2/events/settings/seo', async () => {
        const seo_details =
        {
            "data": {
                "meta_keyword": "HTML, CSS, JavaScript",
                "description": "HTML, CSS, JavaScript",
                "title": "The AI Summit", 
                "image": banner1
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/seo', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'content-type': 'application/json', 'buildversion': process.env.buildversion }, 'put', seo_details)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_seo_details_update_message)
    });



    
});
