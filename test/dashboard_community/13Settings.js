/*
Author: Pranjal Shah
Description: This Script will update/verify settings on community. Also few negative 
cases have been asserted.
Timestamp: 17th Sept 2021 11:30 AM
Modified : Biswajit Pattanaik 28th Sept 2021 04:00 PM
Description: Commented old supertest calls and using the new sendRequest function
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { assert, should, expect } from 'chai'
const request = supertest(environment.baseURL);
const request1 = supertest(environment.baseURL1);
import Responsemessages from '../../config/Responsemessages';
import { consolelog,sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();
var request3 = supertest(environment.baseURL3);


//This script will update/remove settings on community
describe('Update Profile settings', () => {
  beforeEach(function (done) {
    setTimeout(function(){
      done();
    }, environment.HTestDelay);
  });

  //UPDATE SETTINGS
  it('Update settings: POST /api/v2/settings/update-my-privacy', async () => {
    const settingsupdate =
    {
      "payload": {
        "data": {
          "is_opt_out_attendee": true,
          "is_opt_out_chat": true,
          "is_opt_out_meeting": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',settingsupdate)
  });
  // it('Update settings: POST /api/v2/settings/update-my-privacy', (done) => {
  //   const settingsupdate =
  //   {
  //     "payload": {
  //       "data": {
  //         "is_opt_out_attendee": true,
  //         "is_opt_out_chat": true,
  //         "is_opt_out_meeting": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-my-privacy')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(settingsupdate)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  //REMOVE SETTINGS

  it('Remove settings : POST /api/v2/settings/update-my-privacy', async () => {
    const settingsremove =
    {
      "payload": {
        "data": {
          "is_opt_out_attendee": false,
          "is_opt_out_chat": false,
          "is_opt_out_meeting": false

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-my-privacy',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',settingsremove)
  });


  // it('Remove settings : POST /api/v2/settings/update-my-privacy', (done) => {
  //   const settingsremove =
  //   {
  //     "payload": {
  //       "data": {
  //         "is_opt_out_attendee": false,
  //         "is_opt_out_chat": false,
  //         "is_opt_out_meeting": false

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-my-privacy')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(settingsremove)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  //LOGIN WITH PASSWORD
  // it.only('Sign in with password : POST /api/v2/users/login', (done) => {

  //   const passwordsignin = {

  //     "payload": {
  //       "data": {
  //         "email": "clown26@yopmail.com",
  //         "mode": "PASSWORD",
  //         "password": "Test@1234"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/login')
  //     .set('Authorization', process.env.accessTokenLoginPage)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(passwordsignin)
  //     .end((err, response) => {
  //       console.log(response.body)
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.code).to.equal('LOGIN_SUCCESS')
  //       expect(response.body.success.data.firstName).to.equal('joker')
  //       expect(response.body.success.data.lastName).to.equal('clown')
  //       expect(response.body.success.data.userRole).to.equal('ATTENDEE')
  //       expect(response.body.success.data.onboardingDone).to.equal('YES')
  //       process.env.passwordaccesstokenloginuser = (response.body.success.data.accessToken)
  //       console.log(process.env.passwordaccesstokenloginuser)
  //       done();
  //     });
  // });

  //CHANGE PASSWORD(INVALID CURRENT PASSWORD)
  it.only('Invalid current password under change password : POST /api/v2/users/set-password', async () => {
    const invalidcurrentpassword =
    {
      "payload": {
        "data": {
          "confirmPassword": "Test@123",
          "currentPassword": "Test@12345",
          "password": "Test@123"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/set-password',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',invalidcurrentpassword)
    expect(response.body.error.message).to.be.oneOf(Responsemessages.Parameter_incorrectpassword_message)
    expect(response.body.error.code).to.equal('INCORRECT_PASSWORD')
  });

  // it.only('Invalid current password under change password : POST /api/v2/users/set-password', (done) => {
  //   const invalidcurrentpassword =
  //   {
  //     "payload": {
  //       "data": {
  //         "confirmPassword": "Test@123",
  //         "currentPassword": "Test@12345",
  //         "password": "Test@123"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/set-password')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(invalidcurrentpassword)
  //     .end((err, response) => {
  //      consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.error.message).to.equal(Responsemessages.Parameter_incorrectpassword_message)
  //       expect(response.body.error.code).to.equal('INCORRECT_PASSWORD')
  //       done();
  //     });
  // });

  //CHANGE PASSWORD(CHANGE CURRENT PASSWORD TO Test@12345)
  it.only('Change current password to Test@12345 under change password : POST /api/v2/users/set-password', async () => {
    const changecurrentpassword =
    {"payload":{"data":{"currentPassword":"Test@1234","password":"Test@12345","confirmPassword":"Test@12345"}}}
  //  console.log(changecurrentpassword)
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/set-password',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',changecurrentpassword)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_updatedsuccessfully_message)
  });

  // it.only('Change current password to Test@12345 under change password : POST /api/v2/users/set-password', (done) => {
  //   const changecurrentpassword =
  //   {"payload":{"data":{"currentPassword":"Test@1234","password":"Test@12345","confirmPassword":"Test@12345"}}}
  // //  console.log(changecurrentpassword)
  //   request3
  //     .post('/api/v2/users/set-password')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(changecurrentpassword)
  //     .end((err, response) => {
  //       consolelog(response)
  //       // console.log(response.body.success)
  //       // console.log(response.body.success.message)
  //       // console.log(response.statusCode)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_updatedsuccessfully_message)
  //       done();
  //     });
  // });

  //LOGOUT USER
  it.only('Logout current user : POST /api/v2/users/logout', async () => {
    const logoutuser =
    {
      "payload": {
        "data": null
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/logout',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',logoutuser)
  });

  // it.only('Logout current user : POST /api/v2/users/logout', (done) => {
  //   const logoutuser =
  //   {
  //     "payload": {
  //       "data": null
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/logout')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(logoutuser)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       done();
  //     });
  // });

  // THIS WILL LOGIN WITH EARLIER PASSWORD
  it.only('Login with earlier password (Test@1234) : POST /api/v2/users/login', async () => {

    const earlierpasswordlogin = {

      "payload": {
        "data": {
          "email": "clown26@yopmail.com",
          "mode": "PASSWORD",
          "password": "Test@1234"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/login',{'Authorization' : process.env.accessTokenLoginPage, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',earlierpasswordlogin)
    expect(response.body.error.message).to.be.oneOf(Responsemessages.Parameter_incorrectpassword_message)
  });

  // it.only('Login with earlier password (Test@1234) : POST /api/v2/users/login', (done) => {

  //   const earlierpasswordlogin = {

  //     "payload": {
  //       "data": {
  //         "email": "clown26@yopmail.com",
  //         "mode": "PASSWORD",
  //         "password": "Test@1234"

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/users/login')
  //     .set('Authorization', process.env.accessTokenLoginPage)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(earlierpasswordlogin)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //     //  expect(response.body.error.code).to.equal('INCORRECT_PASSWORD')
  //       expect(response.body.error.message).to.equal(Responsemessages.Parameter_incorrectpassword_message)
  //       done();
  //     });
  // });

  // THIS WILL LOGIN WITH UPDATED PASSWORD

  it.only('Login with updated password (Test@12345) : POST /api/v2/users/login', async () => {

    const updatedpasswordlogin = {

      "payload": {
        "data": {
          "email": "clown26@yopmail.com",
          "mode": "PASSWORD",
          "password": "Test@12345"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/login',{'Authorization' : process.env.accessTokenLoginPage, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatedpasswordlogin)
    process.env.accesstokenloginuser = (response.body.success.data.accessToken)
    expect(response.body.success.data.lastName).to.equal('clown')
    expect(response.body.success.data.userRole).to.equal('ATTENDEE')
  });

  // it.only('Login with updated password (Test@12345) : POST /api/v2/users/login', (done) => {

  //   const updatedpasswordlogin = {

  //     "payload": {
  //       "data": {
  //         "email": "clown26@yopmail.com",
  //         "mode": "PASSWORD",
  //         "password": "Test@12345"

  //       }
  //     }
  //   }

  //   request3
  //     .post('/api/v2/users/login')
  //     .set('Authorization', process.env.accessTokenLoginPage)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(updatedpasswordlogin)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       process.env.accesstokenloginuser = (response.body.success.data.accessToken)
  //       expect(response.body.success.data.lastName).to.equal('clown')
  //       expect(response.body.success.data.userRole).to.equal('ATTENDEE')
  //       done();
  //     });
  // });

  //CHANGE PASSWORD(CHANGE UPDATED PASSWORD TO  EARLIER Test@1234)

  it.only('Change updated password to  earlier (Test@1234) under change password : POST /api/v2/users/set-password', async () => {
    const updatetoeaerlierpassword =
    {
      "payload": {
        "data": {
          "confirmPassword": "Test@1234",
          "currentPassword": "Test@12345",
          "password": "Test@1234"

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/users/set-password',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',updatetoeaerlierpassword)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_updatedsuccessfully_message)
  });

  // it.only('Change updated password to  earlier (Test@1234) under change password : POST /api/v2/users/set-password', (done) => {
  //   const updatetoeaerlierpassword =
  //   {
  //     "payload": {
  //       "data": {
  //         "confirmPassword": "Test@1234",
  //         "currentPassword": "Test@12345",
  //         "password": "Test@1234"

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/users/set-password')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(updatetoeaerlierpassword)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_updatedsuccessfully_message)
  //       done();
  //     });
  // });

  //NEW ACTIVITY ON MY POST NOTIFICATION TO FALSE
  it.only('Change new activity on my post notification to false : POST /api/v2/settings/update-settings-web', async () => {
    const newactivitynot =
    {
      "payload": {
        "data": {
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newPoll": true,
          "newPost": true,
          "newPostActivity": false,
          "newProfileView": true,
          "notificationType": "DESKTOP",
          "pushFromOrganiser": true,
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',newactivitynot)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Change new activity on my post notification to false : POST /api/v2/settings/update-settings-web', (done) => {
  //   const newactivitynot =
  //   {
  //     "payload": {
  //       "data": {
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newPoll": true,
  //         "newPost": true,
  //         "newPostActivity": false,
  //         "newProfileView": true,
  //         "notificationType": "DESKTOP",
  //         "pushFromOrganiser": true,
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(newactivitynot)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  //ORGANISER NOTIFICATIONS TO FALSE

  it.only('Change organiser notification to false : POST /api/v2/settings/update-settings-web', async () => {
    const organisernotification =
    {
      "payload": {
        "data": {
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newPoll": true,
          "newPost": true,
          "newPostActivity": false,
          "newProfileView": true,
          "notificationType": "DESKTOP",
          "pushFromOrganiser": false,
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',organisernotification)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });


  // it.only('Change organiser notification to false : POST /api/v2/settings/update-settings-web', (done) => {
  //   const organisernotification =
  //   {
  //     "payload": {
  //       "data": {
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newPoll": true,
  //         "newPost": true,
  //         "newPostActivity": false,
  //         "newProfileView": true,
  //         "notificationType": "DESKTOP",
  //         "pushFromOrganiser": false,
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(organisernotification)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  //ORGANISER NOTIFICATIONS & NEW ACTIVITY TO TRUE

  it.only('Change organiser notification & new activity to true : POST /api/v2/settings/update-settings-web', async () => {
    const changebothnot =
    {
      "payload": {
        "data": {
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newPoll": true,
          "newPost": true,
          "newPostActivity": true,
          "newProfileView": true,
          "notificationType": "DESKTOP",
          "pushFromOrganiser": true,
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',changebothnot)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Change organiser notification & new activity to true : POST /api/v2/settings/update-settings-web', (done) => {
  //   const changebothnot =
  //   {
  //     "payload": {
  //       "data": {
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newPoll": true,
  //         "newPost": true,
  //         "newPostActivity": true,
  //         "newProfileView": true,
  //         "notificationType": "DESKTOP",
  //         "pushFromOrganiser": true,
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(changebothnot)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  //DISBALE BOTH ORGANISER NOTIFICATIONS & NEW ACTIVITY TO TRUE

  it.only('Disable both organiser notification & new activity : POST /api/v2/settings/update-settings-web', async () => {
    const changebothnot =
    {
      "payload": {
        "data": {
          "isDisabled": true,
          "meetingReminder": false,
          "newChat": false,
          "newMeeting": false,
          "newPoll": false,
          "newPost": false,
          "newPostActivity": false,
          "newProfileView": false,
          "notificationType": "DESKTOP",
          "pushFromOrganiser": false,
          "scheduleReminder": false

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',changebothnot)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Disable both organiser notification & new activity : POST /api/v2/settings/update-settings-web', (done) => {
  //   const changebothnot =
  //   {
  //     "payload": {
  //       "data": {
  //         "isDisabled": true,
  //         "meetingReminder": false,
  //         "newChat": false,
  //         "newMeeting": false,
  //         "newPoll": false,
  //         "newPost": false,
  //         "newPostActivity": false,
  //         "newProfileView": false,
  //         "notificationType": "DESKTOP",
  //         "pushFromOrganiser": false,
  //         "scheduleReminder": false

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(changebothnot)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  //ENABLE ALL ORGANISER NOTIFICATIONS & NEW ACTIVITY

  it.only('Enable all organiser notification & new activity : POST /api/v2/settings/update-settings-web', async () => {
    const enableallnot =
    {
      "payload": {
        "data": {
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newPoll": true,
          "newPost": true,
          "newPostActivity": true,
          "newProfileView": true,
          "notificationType": "DESKTOP",
          "pushFromOrganiser": true,
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',enableallnot)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Enable all organiser notification & new activity : POST /api/v2/settings/update-settings-web', (done) => {
  //   const enableallnot =
  //   {
  //     "payload": {
  //       "data": {
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newPoll": true,
  //         "newPost": true,
  //         "newPostActivity": true,
  //         "newProfileView": true,
  //         "notificationType": "DESKTOP",
  //         "pushFromOrganiser": true,
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(enableallnot)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  

  //PROFILE VIEWS NOTIFICATION TO FALSE

  it.only('Change profile view notification to false : POST /api/v2/settings/update-settings-web', async () => {
    const profileviewfalse =
    {
      "payload": {
        "data": {
          "dailyMailer": false,
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newProfileView": false,
          "notificationType": "EMAIL",
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',profileviewfalse)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Change profile view notification to false : POST /api/v2/settings/update-settings-web', (done) => {
  //   const profileviewfalse =
  //   {
  //     "payload": {
  //       "data": {
  //         "dailyMailer": false,
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newProfileView": false,
  //         "notificationType": "EMAIL",
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(profileviewfalse)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

  //ENABLE ALL EMAIL NOTIFICATION

  it.only('Enable all email notification : POST /api/v2/settings/update-settings-web', async () => {
    const enableallemailnotification =
    {
      "payload": {
        "data": {
          "dailyMailer": true,
          "isDisabled": false,
          "meetingReminder": true,
          "newChat": true,
          "newMeeting": true,
          "newProfileView": true,
          "notificationType": "EMAIL",
          "scheduleReminder": true

        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/settings/update-settings-web',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'languageid': 34,'Content-Type' : 'application/json'},'post',enableallemailnotification)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  });

  // it.only('Enable all email notification : POST /api/v2/settings/update-settings-web', (done) => {
  //   const enableallemailnotification =
  //   {
  //     "payload": {
  //       "data": {
  //         "dailyMailer": true,
  //         "isDisabled": false,
  //         "meetingReminder": true,
  //         "newChat": true,
  //         "newMeeting": true,
  //         "newProfileView": true,
  //         "notificationType": "EMAIL",
  //         "scheduleReminder": true

  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/settings/update-settings-web')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('source', environment.HSource)
  //     .set('languageid', 34)
  //     .set('Content-Type', 'application/json')
  //     .send(enableallemailnotification)
  //     .end((err, response) => {
  //        consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notifications_settings_updated_message)
  //       done();
  //     });
  // });

});
