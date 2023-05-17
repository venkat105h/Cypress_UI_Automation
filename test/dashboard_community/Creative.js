import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
//const testdata = require('../config/testdata.js')
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();
var fs = require('fs');
var imageAsBase64 = fs.readFileSync('./config/Designationblank.PNG', 'base64');
var creativedelete1
var creativedelete2
var creativedelete3
var creativedelete4
var imageid1
var creativeid1
var creativeid2
var creativeid3
var creativeid4




describe('Add a creative with mandatory paramters only', () => {

    //POST IMAGES

    it('200: POSITIVE Image creative upload : POST /backend/api/v2/events/uploads', (done) => {
        console.log(process.env.eToken, 'imagetoken')
        request1
            .post('/backend/api/v2/events/uploads')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            //.set('Authorization', environment.eToken)
            .field('Content-Type', 'multipart/form-data')
            .field(testdata.creative1)
            .field('data', 'data:image/png;base64,' + imageAsBase64)
            .end((err, response) => {
                console.log(response.body)
                expect(response.status).to.equal(200)
                imageid1 = (response.body.data.file_name)
                testdata.creative2.data.imageUrl = imageid1
                testdata.creative3.data.imageUrl = imageid1
                testdata.creative4.data.imageUrl = imageid1
                testdata.creative5.data.imageUrl = imageid1
                testdata.creative6.data.imageUrl = imageid1
                testdata.creative7.data.imageUrl = imageid1
                testdata.creative8.data.imageUrl = imageid1
                testdata.creative9.data.imageUrl = imageid1

                console.log(imageid1)
                expect(response.body.message).to.equal(Responsemessages.Parameter_file_upload_successfully_message);
                done();
            });
    });


    it('200: POSITIVE main creative : POST /api/v1/sponsored-ads/create', (done) => {
        console.log(process.env.eToken, 'creativetoken')
        request
            .post('/api/v1/sponsored-ads/create')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            .set('Authorization', 'Bearer ' + process.env.eToken)
            //.set('Authorization', environment.eToken)
            .send(testdata.creative2)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                creativeid1 = (response.body.createdAd.adId)
                testdata.creative6.data.id = creativeid1
                console.log(creativeid1)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_post_successfully_message);
                done();
            });
    });
    it('200: POSITIVE main creative : POST /api/v1/sponsored-ads/create', (done) => {

        request
            .post('/api/v1/sponsored-ads/create')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative3)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                creativeid2 = (response.body.createdAd.adId)
                testdata.creative7.data.id = creativeid2
                console.log(creativeid2)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_post_successfully_message);
                done();
            });
    });
    it('200: POSITIVE side creative : POST /api/v1/sponsored-ads/create', (done) => {

        request
            .post('/api/v1/sponsored-ads/create')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            //.set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative4)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                creativeid3 = (response.body.createdAd.adId)
                testdata.creative8.data.id = creativeid3
                console.log(creativeid3)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_post_successfully_message);
                done();
            });
    });
    it('200: POSITIVE side creative : POST /api/v1/sponsored-ads/create', (done) => {

        request
            .post('/api/v1/sponsored-ads/create')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative5)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                creativeid4 = (response.body.createdAd.adId)
                testdata.creative9.data.id = creativeid4
                console.log(creativeid4)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_post_successfully_message);
                done();
            });
    });

    // UPDATE CREATIVES


    it('200: POSITIVE: POST /api/v1/sponsored-ads/edit', (done) => {
        request
            .post('/api/v1/sponsored-ads/edit')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative6)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_updated_successfully_message);
                done();
            });
    });
    it('200: POSITIVE: POST /api/v1/sponsored-ads/edit', (done) => {
        request
            .post('/api/v1/sponsored-ads/edit')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative7)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_updated_successfully_message);
                done();
            });
    });
    it('200: POSITIVE: POST /api/v1/sponsored-ads/edit', (done) => {
        request
            .post('/api/v1/sponsored-ads/edit')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative8)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_updated_successfully_message);
                done();
            });
    });
    it('200: POSITIVE: POST /api/v1/sponsored-ads/edit', (done) => {
        request
            .post('/api/v1/sponsored-ads/edit')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative9)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_updated_successfully_message);
                done();
            });
    });

    // GET CREATIVES

    it('200: Get main creatives : POST /api/v1/sponsored-ads/list', (done) => {
        request
            .post('/api/v1/sponsored-ads/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .set('page', environment.HPage)
            .set('limit', environment.HLimit)
            .send(testdata.creative10)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.data[0].isHidden).to.equal(1);
                expect(response.body.data[0].title).to.equal('main creative updated');
                expect(response.body.data[0].webAppTabIds).to.equal("38402,38403");
                expect(response.body.data[1].isHidden).to.equal(0);
                expect(response.body.data[1].title).to.equal('main creative 1 updated');
                expect(response.body.data[1].webAppTabIds).to.equal("38402");
                creativedelete1 = (response.body.data[0].adId)
                testdata.creative12.data.id = creativedelete1
                console.log(creativedelete1)
                creativedelete2 = (response.body.data[1].adId)
                testdata.creative13.data.id = creativedelete2
                console.log(creativedelete2)
                done();
            });
    });

    it('200: Get side creatives : POST /api/v1/sponsored-ads/list', (done) => {
        request
            .post('/api/v1/sponsored-ads/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .set('page', environment.HPage)
            .set('limit', environment.HLimit)
            .send(testdata.creative11)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.data[0].isHidden).to.equal(1);
                expect(response.body.data[0].title).to.equal('side creative updated');
                expect(response.body.data[0].webAppTabIds).to.equal("38402,38403,38404,38405,38406,38407,38408,38409,38410,38438");
                expect(response.body.data[1].isHidden).to.equal(0);
                expect(response.body.data[1].title).to.equal('side creative 1 updated');
                expect(response.body.data[1].webAppTabIds).to.equal("38403");
                creativedelete3 = (response.body.data[0].adId)
                testdata.creative14.data.id = creativedelete3
                console.log(creativedelete3)
                creativedelete4 = (response.body.data[1].adId)
                testdata.creative15.data.id = creativedelete4
                console.log(creativedelete4)
                done();
            });
    });


    // DELETE CREATIVE


    it('200: Delete event :- Delete 1st contest : POST /api/v1/sponsored-ads/delete', (done) => {
        request
            .post('/api/v1/sponsored-ads/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative12)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_deleted_successfully_message);
                done();
            });
    });
    it('200: Delete event :- Delete 1st contest : POST /api/v1/sponsored-ads/delete', (done) => {
        request
            .post('/api/v1/sponsored-ads/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative13)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_deleted_successfully_message);
                done();
            });
    });
    it('200: Delete event :- Delete 1st contest : POST /api/v1/sponsored-ads/delete', (done) => {
        request
            .post('/api/v1/sponsored-ads/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative14)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_deleted_successfully_message);
                done();
            });
    });
    it('200: Delete event :- Delete 1st contest : POST /api/v1/sponsored-ads/delete', (done) => {
        request
            .post('/api/v1/sponsored-ads/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', environment.HEventId)
            // .set('Authorization','Bearer ' + process.env.eToken)
            .set('Authorization', environment.eToken)
            .send(testdata.creative15)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_creative_deleted_successfully_message);
                done();
            });
    });


});
