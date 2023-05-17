/*
Author: Gaurav Thapar
Description: This Script will add/edit/update briefcase. Also verify/delete notes.
Timestamp: 17th Sept 2021 11:30 AM
*/

// Importing SUPERTEST
import supertest from 'supertest';

// Importing the environment module
import environment from '../../config/environment';

// Importing CHAI's assert, should & expect function.
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
// import { commerce } from 'faker';
import { consolelog, sendRequest } from '../../helper/CommonUtil'
import { send } from 'process';
// Creating an ALIAS for the service URL.

const request = supertest(environment.baseURL);

const request1 = supertest(environment.baseURL1);
const request3 = supertest(environment.baseURL3);

// Requiring faker module
// const faker = require('faker');



var settingid1
var agendaNote_id
var delegate_noteid
var speaker_noteid


//My Brifecase

//<-------------------------------------Verify Files in My Brifecase------------------------->
//Request Brifcase
describe('Add, delete, update file to Briefcase', () => {

  //200: Positive: Verify Files in Brifcase : POST api/v2/briefcase/files

  it.only('Verify Files in Brifcase : POST api/v2/briefcase/files', async () => {
    const verifyfiles =

    {
      "payload": {
        "data": {
          "page": 0,
          "showHidden": "NO",
          "skip": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verifyfiles)
    expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
    expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
    expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  });

  // it.only('Verify Files in Brifcase : POST api/v2/briefcase/files', (done) => {
  //   const verifyfiles =

  //   {
  //     "payload": {
  //       "data": {
  //         "page": 0,
  //         "showHidden": "NO",
  //         "skip": 0
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verifyfiles)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
  //       expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
  //       expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  //       done();
  //     });
  // });


  //<-------------------- Verify notes in Agenda Community v2--------------------->

  it.only('Verify notes in Agenda : POST /api/v2/briefcase/notes', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "current_page": 0,
          "limit": 10,
          "noteSource": "AGENDA"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/notes',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.data.list[0].notes).to.equal('Test Session')
    expect(response.body.success.data.list[0].note_type).to.equal('AGENDA')
    agendaNote_id = (response.body.success.data.list[0].noted_id)
  });

  // it.only('Verify notes in Agenda : POST /api/v2/briefcase/notes', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "current_page": 0,
  //         "limit": 10,
  //         "noteSource": "AGENDA"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/notes')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       //consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.data.list[0].notes).to.equal('Test Session')
  //       expect(response.body.success.data.list[0].note_type).to.equal('AGENDA')
  //       agendaNote_id = (response.body.success.data.list[0].noted_id)
  //       done();
  //     });
  // });

  it.only('Delete notes in Agenda : POST /api/v2/notes/add', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "isdelete": true,
          "note": "",
          "note_type": "AGENDA",
          "noted_id": agendaNote_id,
          "target": ""
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/notes/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  });

  // it.only('Delete notes in Agenda : POST /api/v2/notes/add', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "isdelete": true,
  //         "note": "",
  //         "note_type": "AGENDA",
  //         "noted_id": agendaNote_id,
  //         "target": ""
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/notes/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  //       done();
  //     });
  // });

  //<-------------------- Verify notes in Delegates Community v2--------------------->

  it.only('Verify notes in Delegates : POST /api/v2/briefcase/notes', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "current_page": 0,
          "limit": 10,
          "noteSource": "ATTENDEE"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/notes',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.data.list[0].notes).to.equal('testing gaurav')
    expect(response.body.success.data.list[0].note_type).to.equal('ATTENDEE')
    delegate_noteid = (response.body.success.data.list[0].noted_id)
  });

  // it.only('Verify notes in Delegates : POST /api/v2/briefcase/notes', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "current_page": 0,
  //         "limit": 10,
  //         "noteSource": "ATTENDEE"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/notes')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       //consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.data.list[0].notes).to.equal('testing gaurav')
  //       expect(response.body.success.data.list[0].note_type).to.equal('ATTENDEE')
  //       delegate_noteid = (response.body.success.data.list[0].noted_id)
  //       done();
  //     });
  // });

  it.only('Delete notes in Delegates : POST /api/v2/notes/add', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "isdelete": true,
          "note": "",
          "note_type": "ATTENDEE",
          "noted_id": "",
          "target": delegate_noteid
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/notes/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  });

  // it.only('Delete notes in Delegates : POST /api/v2/notes/add', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "isdelete": true,
  //         "note": "",
  //         "note_type": "ATTENDEE",
  //         "noted_id": "",
  //         "target": delegate_noteid
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/notes/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  //       done();
  //     });
  // });

  //<-------------------- Verify notes in Delegates Community v2--------------------->

  it.only('Verify notes in Speakers : POST /api/v2/briefcase/notes', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "current_page": 0,
          "limit": 10,
          "noteSource": "SPEAKER"
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/notes',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.data.list[0].notes).to.equal('testing again')
    expect(response.body.success.data.list[0].note_type).to.equal('SPEAKER')
    speaker_noteid = (response.body.success.data.list[0].noted_id)
  });

  // it.only('Verify notes in Speakers : POST /api/v2/briefcase/notes', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "current_page": 0,
  //         "limit": 10,
  //         "noteSource": "SPEAKER"
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/notes')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       //consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.data.list[0].notes).to.equal('testing again')
  //       expect(response.body.success.data.list[0].note_type).to.equal('SPEAKER')
  //       speaker_noteid = (response.body.success.data.list[0].noted_id)
  //       done();
  //     });
  // });

  it.only('Delete notes in Speakers : POST /api/v2/notes/add', async () => {
    const verify_session_notes =

    {
      "payload": {
        "data": {
          "isdelete": true,
          "note": "",
          "note_type": "SPEAKER",
          "noted_id": speaker_noteid,
          "target": ""
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/notes/add',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',verify_session_notes)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  });

  // it.only('Delete notes in Speakers : POST /api/v2/notes/add', (done) => {
  //   const verify_session_notes =

  //   {
  //     "payload": {
  //       "data": {
  //         "isdelete": true,
  //         "note": "",
  //         "note_type": "SPEAKER",
  //         "noted_id": speaker_noteid,
  //         "target": ""
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/notes/add')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(verify_session_notes)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       //console.log(response.body.success.data.list)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_notes_delete_succesfull_message)
  //       done();
  //     });
  // });

  //Download Brifcase Note

  it.only('Downlaod Brifcase Note : POST /api/v2/briefcase/notes/download', async () => {
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/notes/download',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post')
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_Notes_Downlaod_Briefcase)
  });

  // it.only('Downlaod Brifcase Note : POST /api/v2/briefcase/notes/download', (done) => {
  //   request3
  //     .post('/api/v2/briefcase/notes/download')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       // console.log(response.body.success.data.list)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_Notes_Downlaod_Briefcase)
  //       done();
  //     });
  // });

  //<---------------Hide File from Brifecase-------------------->


  //200: Positive: Verify Hide File from  From Mybriefcase : POST /api/v2/briefcase/files/action'

  it.only('Hide File from from Mybriefcase : POST /api/v2/briefcase/files/action', async () => {
    const hide_file =

    {
      "payload": {
        "data": {
          "action": "HIDE",
          "briefcase_type": "FILE",
          "filename": "process.env.VBfile_name",
          "real_filename": "sample-pdf-file.pdf",
          "type": "EXHIBITOR",
          "type_id": process.env.virtualboothidcommunity
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files/action',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',hide_file)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_Hide_File_Briefcase)
    expect(response.body.success.code).to.equal('HIDE_FILE_BRIEFCASE')
  });

  // it.only('Hide File from from Mybriefcase : POST /api/v2/briefcase/files/action', (done) => {
  //   const hide_file =

  //   {
  //     "payload": {
  //       "data": {
  //         "action": "HIDE",
  //         "briefcase_type": "FILE",
  //         "filename": "process.env.VBfile_name",
  //         "real_filename": "sample-pdf-file.pdf",
  //         "type": "EXHIBITOR",
  //         "type_id": process.env.virtualboothidcommunity
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files/action')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(hide_file)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_Hide_File_Briefcase)
  //       expect(response.body.success.code).to.equal('HIDE_FILE_BRIEFCASE')
  //       done();
  //     });
  // });


  //<---------------Show hidden File from Brifecase-------------------->
  //200: Positive: Verify Show hidden File from Mybriefcase : POST /api/v2/briefcase/files

  it.only('Show hidden File from Mybriefcase : POST /api/v2/briefcase/files', async () => {
    const ShoW_hide_file =

    {
      "payload": {
        "data": {
          "page": 0,
          "showHidden": "YES",
          "skip": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',ShoW_hide_file)
    expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
    expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
    expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  });

  // it.only('Show hidden File from Mybriefcase : POST /api/v2/briefcase/files', (done) => {
  //   const ShoW_hide_file =

  //   {
  //     "payload": {
  //       "data": {
  //         "page": 0,
  //         "showHidden": "YES",
  //         "skip": 0
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(ShoW_hide_file)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
  //       expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
  //       expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  //       done();
  //     });
  // });


  //<---------------UnHide File from Brifecase-------------------->
  //200: Positive: Verify UnHide File from  From Mybriefcase : POST /api/v2/briefcase/files/action

  it.only('UnHide File from Mybriefcase : POST /api/v2/briefcase/files/action', async () => {
    const Unhide_file =

    {
      "payload": {
        "data": {
          "action": "UNHIDDEN",
          "briefcase_type": "FILE",
          "filename": "process.env.VBfile_name",
          "real_filename": "sample-pdf-file.pdf",
          "type": "EXHIBITOR",
          "type_id": process.env.virtualboothidcommunity
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files/action',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',Unhide_file)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_UnHide_File_Briefcase)
    expect(response.body.success.code).to.equal('UNHIDDEN_FILE_BRIEFCASE')
  });

  // it.only('UnHide File from Mybriefcase : POST /api/v2/briefcase/files/action', (done) => {
  //   const Unhide_file =

  //   {
  //     "payload": {
  //       "data": {
  //         "action": "UNHIDDEN",
  //         "briefcase_type": "FILE",
  //         "filename": "process.env.VBfile_name",
  //         "real_filename": "sample-pdf-file.pdf",
  //         "type": "EXHIBITOR",
  //         "type_id": process.env.virtualboothidcommunity
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files/action')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(Unhide_file)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_UnHide_File_Briefcase)
  //       expect(response.body.success.code).to.equal('UNHIDDEN_FILE_BRIEFCASE')
  //       done();
  //     });
  // });



  //<---------------Show hidden Switch off from Brifecase-------------------->
  //200: Positive: Verify Show hidden File from Mybriefcase : POST /api/v2/briefcase/files

  it.only('Show hidden File from Mybriefcase : POST /api/v2/briefcase/files', async () => {
    const ShoW_hide_file =

    {
      "payload": {
        "data": {
          "page": 0,
          "showHidden": "NO",
          "skip": 0
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',ShoW_hide_file)
    expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
    expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
    expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  });

  // it.only('Show hidden File from Mybriefcase : POST /api/v2/briefcase/files', (done) => {
  //   const ShoW_hide_file =

  //   {
  //     "payload": {
  //       "data": {
  //         "page": 0,
  //         "showHidden": "NO",
  //         "skip": 0
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(ShoW_hide_file)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.data.list[0].real_filename).to.equal('sample-pdf-file.pdf')
  //       expect(response.body.success.data.list[0].type).to.equal('EXHIBITOR')
  //       expect(response.body.success.data.list[0].briefcase_type).to.equal('FILE')
  //       done();
  //     });
  // });


  //Delete File from Brifecase
  //'200: Positive: Verify Delete File  From Mybriefcase : POST /api/v2/briefcase/files/action

  it.only('Delete File from Mybriefcase : POST /api/v2/briefcase/files/action', async () => {
    const delete_file =

    {
      "payload": {
        "data": {
          "action": "REMOVE",
          "briefcase_type": "FILE",
          "filename": "process.env.VBfile_name",
          "real_filename": "sample-pdf-file.pdf",
          "type": "EXHIBITOR",
          "type_id": process.env.virtualboothidcommunity
        }
      }
    }
    var response = await sendRequest(environment.baseURL3,'/api/v2/briefcase/files/action',{'Authorization' : process.env.accesstokenloginuser, 'source' : environment.HSource, 'Content-Type' : 'application/json'},'post',delete_file)
    expect(response.body.success.message).to.equal(Responsemessages.Parameter_Delete_File_Briefcase)
    expect(response.body.success.code).to.equal('REMOVE_FILE_BRIEFCASE')
  });

  // it.only('Delete File from Mybriefcase : POST /api/v2/briefcase/files/action', (done) => {
  //   const delete_file =

  //   {
  //     "payload": {
  //       "data": {
  //         "action": "REMOVE",
  //         "briefcase_type": "FILE",
  //         "filename": "process.env.VBfile_name",
  //         "real_filename": "sample-pdf-file.pdf",
  //         "type": "EXHIBITOR",
  //         "type_id": process.env.virtualboothidcommunity
  //       }
  //     }
  //   }
  //   request3
  //     .post('/api/v2/briefcase/files/action')
  //     .set('Authorization', process.env.accesstokenloginuser)
  //     .set('Content-Type', 'application/json')
  //     .set('source', 'COMMUNITY')
  //     .send(delete_file)
  //     .end((err, response) => {
  //       consolelog(response)
  //       expect(response.status).to.equal(200)
  //       expect(response.body.success.message).to.equal(Responsemessages.Parameter_Delete_File_Briefcase)
  //       expect(response.body.success.code).to.equal('REMOVE_FILE_BRIEFCASE')
  //       done();
  //     });
  // });

});

