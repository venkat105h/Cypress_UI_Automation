import supertest from 'supertest';
import environment from '../../config/environment';
//import { User } from "../config/Login";
import { assert, should, expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
require('dotenv').config();


const request3 = supertest(environment.baseURL3);



describe('1:1 chat', () => {

    //<------------------------------Get User Chat on Community v2 -------------->

    it('Get User Chat: POST /api/v2/chat/getChatUsers', (done) => {

        const GetuserChat = {
            "payload": {
                "data": {
                    "pageNumber": 2,
                    "pageSize": 5
                }
            }
        }

        request3
            .post('/api/v2/chat/getChatUsers')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(GetuserChat)
            .end((err, response) => {
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });


    //<------------------------------Get Users for chat on Community v2 -------------->

    it('Get Users for Chat: POST /api/v2/chat/get-users', (done) => {

        const GetusersforChat = {
            "payload": {
                "data": {
                    "currentPage": 0,
                    "input": "",
                    "limit": 15,
                    "sorting": 1
                }
            }
        }

        request3
            .post('/api/v2/chat/get-users')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(GetusersforChat)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });



    //<------------------------------Get Chat message -------------->

    it('Get Chat message : POST /api/v2/chat/getChatMessages', (done) => {

        const GetChatMessage = {
            "payload": {
                "data": {
                    "chatId": "",
                    "currentPage": 0,
                    "limit": 10,
                    "target": "60c1c23defc0ec23d50d11b4"
                }
            }
        }

        request3
            .post('/api/v2/chat/getChatMessages')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(GetChatMessage)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });


    //<------------------------------Mark read all message -------------->

    it('Mark read all messages : POST /api/v2/chat/mark-read-chat', (done) => {

        const markreadllchat = {
            "payload": {
                "data": {
                    "type": "ALL"
                }
            }
        }

        request3
            .post('/api/v2/chat/mark-read-chat')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(markreadllchat)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                done();
            });
    });



    //<------------------------------Search User Chat on Community v2 -------------->

    it('Search User Chat: POST /api/v2/chat/getChatUsers', (done) => {

        const SearchuserChat = {
            "payload": {
                "data": {
                    "pageNumber": 2,
                    "pageSize": 5,
                    "searchInput": "joker"
                }
            }
        }

        request3
            .post('/api/v2/chat/getChatUsers')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(SearchuserChat)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });



    //<------------------------------Mark as read Chat on Community v2 -------------->

    it('MArk as read User Chat: POST /api/v2/chat/mark-read-chat', (done) => {

        const MarkAsReaduserChat = {
            "payload": {
                "data": {
                    "chatId": "60c1e9346ea737bcb51dce14",
                    "type": "ONE"
                }
            }
        }

        request3
            .post('/api/v2/chat/mark-read-chat')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(MarkAsReaduserChat)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });



    //<------------------------------Delete Chat message -------------->

    it('Delete Chat message : POST /api/v2/chat/delete-chat-data', (done) => {

        const GetChatMessage = {
            "payload": {
                "data": {
                    "chatId": "60c1e9346ea737bcb51dce14"
                }
            }
        }

        request3
            .post('/api/v2/chat/delete-chat-data')
            .set('Authorization', process.env.accesstokenloginuser)
            .set('Content-Type', 'application/json')
            .set('source', 'COMMUNITY')
            .send(GetChatMessage)
            .end((err, response) => {
                console.log(response.body)
                console.log(response.status)
                expect(response.status).to.equal(200)
                //     var gaurav1231 = response.body.success.data.exhibitors.some(function(e) {
                //       return e.name == "test updated" ;
                //     });
                //    console.log(gaurav1231, 'verify thius is true')
                //     expect(gaurav1231).to.equal(true)
                done();
            });
    });



});
