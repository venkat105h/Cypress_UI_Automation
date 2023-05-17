import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
import Responsemessages from '../../config/Responsemessages';
import { consolelog } from '../../helper/CommonUtil'
require ('dotenv').config();
var ticketfetchid1
var ticketfetchid2
var ticketid1
var ticketid2
var ticketid3
var id1
var id2
var id3
const data10 =
{
    "data": {
        "currency_id": 2,
        "description": "",
        "groups": [
            process.env.attendeegroup2
        ],
        "is_free": 1,
        "is_status_open": 1,
        "is_visible": 1,
        "name": "free ticket",
        "price": "",
        "quantity": "11",
        "ticket_fee_type_id": 1
    }
}
const data11 =
{
    "data": {
        "currency_id": 2,
        "description": "Test description",
        "groups": [
            process.env.attendeegroup2
        ],
        "is_free": 1,
        "is_status_open": 1,
        "is_visible": 1,
        "name": "free ticket 1",
        "price": "",
        "quantity": "50",
        "ticket_fee_type_id": 1
    }
}

const data12 =
{
    "data": {
        "currency_id": 129,
        "description": "Test description",
        "groups": [
            process.env.attendeegroup2
        ],
        "is_free": 0,
        "is_status_open": 1,
        "is_visible": 1,
        "name": "paid ticket",
        "price": "10",
        "quantity": "20",
        "ticket_fee_type_id": 1
    }
}
describe('This script will add/update/delete free tickets & make the user register using community', () => {

    //POST TICKETS

    it('200: POSITIVE This will add a free ticket in dashboard: POST /api/v1/tickets/add', (done) => {

        request
            .post('/api/v1/tickets/add')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data10)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                id1 = (response.body.id)
                console.log(id1)
                expect(response.body.message).to.equal(Responsemessages.Parameter_successfull_message);
                done();
            });
    });
    it('200: This will add a free Ticket with all parameters & quantity as 500 : POST /api/v1/tickets/add', (done) => {
        request
            .post('/api/v1/tickets/add')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data11)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                id2 = (response.body.id)
                expect(response.body.message).to.equal(Responsemessages.Parameter_successfull_message);
                done();
            });
    });
    it('200:This will add a free ticket with Flags changed :- free,status,visible,price : POST /api/v1/tickets/add', (done) => {
        request
            .post('/api/v1/tickets/add')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data12)
            .end((err, response) => {
                console.log(response.body);
                id3 = (response.body.id)
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_successfull_message);
                done();
            });
    });

    //Verify tickets

    it('200: POSITIVE This will verify tickets landing page  on community: POST /api/v1/app/new_landing_page', (done) => {
        const request2 = supertest((process.env.eventurl.replace("http", "https")));
    
        const community338 = {
           
            "app_version": "1.0.0",
            "device_type": environment.Hdevicetype,
            "source": environment.HSource,
            "url": ((process.env.eventurl.split("http://")[1]))
           
          }
        
        
        console.log(community338, 'tickets body')
    
        request2
            .post('/api/v1/app/new_landing_page')
            .set('Content-Type', 'application/json')
            .send(community338)
            .end((err, response) => {
                console.log('tickets landing page');
                console.log(response.status)
                console.log(response.body,'landing page body')
                expect(response.status).to.equal(200)
                const buffer =  (response.body)
                const decoder = new TextDecoder('utf8');
                const text = decoder.decode(buffer);
                console.log(JSON.parse(text));
                expect(JSON.parse(text).data.tickets[0].name).to.equal('free ticket')
                expect(JSON.parse(text).data.tickets[1].name).to.equal('free ticket 1')
                ticketfetchid1 = (JSON.parse(text).data.tickets[0].id)
                console.log(ticketfetchid1)
                ticketfetchid2 = (JSON.parse(text).data.tickets[1].id)
                console.log(ticketfetchid2)
                done();
            });
    });
    
    //Verify tickets registration

    it('200: POSITIVE This will verify tickets registration on community: POST /api/v1/app/stripe_checkout', (done) => {
        const request2 = supertest((process.env.eventurl.replace("http", "https")));
    
        const community339 = {
           
            "change": "phone",
            "device_type": environment.Hdevicetype,
            "email": "joker2@yopmail.com",
            "event_id": process.env.eventid,
            "firstName": "new",
            "lastName": "user",
            "organiser_id": environment.HOrganiserId,
            "phone": "7208889888",
            "phone_code": "+355",
            "ticket_id": ticketfetchid1,
            "url": (process.env.eventurl.replace("http", "https"))
           
          }
        
        
        console.log(community339, 'tickets registration body')
    
        request2
            .post('/api/v1/app/stripe_checkout')
            .set('Content-Type', 'application/json')
            .send(community339)
            .end((err, response) => {
                console.log('tickets registration done');
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                expect(response.body.data.isTicketFree).to.equal(1)
                done();
            });
    });
    

    // UPDATE TICKETS


    it('200: POSITIVE This will update a ticket on dashbaord: POST /api/v1/tickets/update', (done) => {
        const data1 =
        {
            "data": {
                "currency_id": 2,
                "description": "",
                "groups": [
                    process.env.attendeegroup2
                ],
                "id": [id1],
                "is_free": 1,
                "is_status_open": 1,
                "is_visible": 1,
                "name": "Ticket name 1",
                "price": "",
                "quantity": "100",
                "ticket_fee_type_id": 1
            }
        }
        request
            .post('/api/v1/tickets/update')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data1)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_updated_message);
                done();
            });
    });
    it('200: This will update a Ticket with all parameters & quantity as 500 : POST /api/v1/tickets/update', (done) => {
        const data2 =
        {
            "data": {
                "currency_id": 2,
                "description": "Test description",
                "groups": [
                    process.env.attendeegroup2
                ],
                "id": [id2],
                "is_free": 1,
                "is_status_open": 1,
                "is_visible": 1,
                "name": "Ticket name 2",
                "price": "",
                "quantity": "500",
                "ticket_fee_type_id": 1
            }
        }
        request
            .post('/api/v1/tickets/update')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data2)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_updated_message);
                done();
            });
    });

    it('200:This wil udpate a ticket with Flags changed :- free,status,visible,price : POST /api/v1/tickets/update', (done) => {
        const data3 =
        {
            "data": {
                "currency_id": 125,
                "description": "Test description",
                "groups": [
                    process.env.attendeegroup2
                ],
                "id": [id3],
                "is_free": 0,
                "is_status_open": 0,
                "is_visible": 0,
                "name": "Ticket name 3",
                "price": "100",
                "quantity": "200",
                "ticket_fee_type_id": 1
            }
        }
        request
            .post('/api/v1/tickets/update')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data3)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_updated_message);
                done();
            });
    });



    // GET TICKETS

    it('200: This will Get tickets list which are created in dashboard : POST /api/v1/tickets/list', (done) => {
        request
            .post('/api/v1/tickets/list')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.data[0].name).to.equal('Ticket name 1');
                expect(response.body.data[0].available).to.equal(99);
                expect(response.body.data[1].name).to.equal('Ticket name 2');
                expect(response.body.data[1].available).to.equal(500);
                expect(response.body.data[2].name).to.equal('Ticket name 3');
                expect(response.body.data[2].available).to.equal(200);
                expect(response.body.data[2].price).to.equal(100);
                expect(response.body.data[2].currency_id).to.equal(125);
                expect(response.body.data[2].type).to.equal('PAID');
                expect(response.body.data[2].status).to.equal('CLOSED');
                expect(response.body.data[2].visibility).to.equal('HIDDEN');
                ticketid1 = (response.body.data[0].id)
                ticketid2 = (response.body.data[1].id)
                ticketid3 = (response.body.data[2].id)
                console.log(ticketid1)
                console.log(ticketid2)
                console.log(ticketid3)
                done();
            });
    });

     //Verify tickets again

     it('200: POSITIVE This will verify updated tickets landing page on community : POST /api/v1/app/new_landing_page', (done) => {
        const request2 = supertest((process.env.eventurl.replace("http", "https")));
    
        const community340 = {
           
            "app_version": "1.0.0",
            "device_type": environment.Hdevicetype,
            "source": environment.HSource,
            "url": ((process.env.eventurl.split("http://")[1]))
           
          }
        
        
        console.log(community340, 'tickets body')
    
        request2
            .post('/api/v1/app/new_landing_page')
            .set('Content-Type', 'application/json')
            .send(community340)
            .end((err, response) => {
                console.log('tickets landing page');
                console.log(response.status)
                console.log(response.body,'landing page body')
                expect(response.status).to.equal(200)
                const buffer =  (response.body)
                const decoder = new TextDecoder('utf8');
                const text = decoder.decode(buffer);
                console.log(JSON.parse(text));
                expect(JSON.parse(text).data.tickets[0].name).to.equal('Ticket name 1')
                expect(JSON.parse(text).data.tickets[1].name).to.equal('Ticket name 2')
                expect(JSON.parse(text).data.tickets[0].quantity).to.equal(100)
                expect(JSON.parse(text).data.tickets[1].quantity).to.equal(500)
                done();
            });
    });

    // DELETE TICKETS


    it('200: Delete tickets :- This will Delete all tickets on dashbaord : POST /api/v1/tickets/delete', (done) => {

        const data4 =
        {
            "data": {
                "is_all": 0,
                "ticket_ids": [ticketid1, ticketid2, ticketid3]
            }
        }
        request
            .post('/api/v1/tickets/delete')
            .set('organiserId', environment.HOrganiserId)
            .set('eventId', process.env.eventid)
            .set('Authorization','Bearer ' + process.env.eToken)
            .send(data4)
            .end((err, response) => {
                console.log(response.body);
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal(Responsemessages.Parameter_delelte_message);
                done();
            });
    });
});
