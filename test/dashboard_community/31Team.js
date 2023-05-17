/*
Author: Pranjal Shah
Description: This Script will add/update/search/filter/export/delete Team Member.
Timestamp: 21th Sept 2021 07:00 PM
Modified: Gaurav Thapar 24th Sept 2021 03:09 PM
Modified: Pranjal Shah 29th Sept 2021 14:45 PM
Description: Added verification cases for user permission after login.
Description : Changed sentences to start from capital letters. Also removed addTime 
from import since its not being used.Did a format to whole file
*/
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { sendRequest, addDays } from '../../helper/CommonUtil'
require('dotenv').config();

var team_member_userid
var team_member_userid1
var team_member_userid2
var team_member_userid3
var team_member_userid4
var team_member_userid5
var team_member_userid6
var team_member_userid7
var team_eventid
var team_eventid1
var team_member_userid_mail


describe('Team Member Test Cases', () => {

  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, environment.HTestDelay);
  });


  it.only('Get team member list : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(0);

  });

  it.only('Add team member as an admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "apitest@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": true,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });


  it.only('Verify team member list : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    team_member_userid_mail = (response.body.data[0].user_id)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].email).to.equal('apitest@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('SUPER_ADMIN');

  });

  it.only('Add team member with permission of manage payout, manage team member, and as event admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "tt@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": true,
        "canManagePayout": true,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });

  it.only('Verify team member list with permission of manage payout, manage team member, and as event admin : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(2);
    expect(response.body.data[0].email).to.equal('tt@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('EVENT_ADMIN');
    expect(response.body.data[0].roles[1]).to.equal('PAYOUT_MANAGER');
    expect(response.body.data[0].roles[2]).to.equal('TEAM_MANAGER');

  });


  it.only('Add team member with permission as event admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "john@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });

  it.only('Verify team member list with permission as event admin : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(3);
    expect(response.body.data[0].email).to.equal('john@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('EVENT_ADMIN');

  });


  it.only('Add team member with permission as manage payout, event admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "nikita@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": true,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });


  it.only('Verify team member list with manage payout, event admin permission : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(4);
    expect(response.body.data[0].email).to.equal('nikita@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('EVENT_ADMIN');
    expect(response.body.data[0].roles[1]).to.equal('PAYOUT_MANAGER');
  });


  it.only('Add team member with permission as manage team member, event admin : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "ajay@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": true,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });


  it.only('Verify ajay@yopmail.com user permission by login in dashboard: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "email": "ajay@yopmail.com",
        "password": "hubilomasterpassword",
        "captchaToken": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.data.userData.userPermission.canManageTeamMembers).to.equal(1)
    expect(response.body.data.userData.userPermission.isEventAdmin).to.equal(1)
    expect(response.body.data.userData.userPermission.isSuperAdmin).to.equal(0)
  })


  it.only('Verify team member list with manage team member, event admin permission : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(5);
    expect(response.body.data[0].email).to.equal('ajay@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('EVENT_ADMIN');
    expect(response.body.data[0].roles[1]).to.equal('TEAM_MANAGER');
  });


  it.only('Export team member list : POST /api/v1/team-member/export', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [],
          "events": [],
          "sections": [],
          "status": [],
          "sectionList": null,
          "eventList": null
        }
      }
    }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/export', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)

  });

  it.only('Search team member by email id : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'search': 'apitest@yopmail.com' }, 'post', team_member)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].email).to.equal('apitest@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('SUPER_ADMIN');
  });

  it.only('Filter team member by access as Super Admin : POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "isSuperAdmin"
          ],
          "events": [],
          "sections": [],
          "status": [
            "INVITED"
          ]
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(1);
    expect(response.body.data[0].email).to.equal('apitest@yopmail.com');
    expect(response.body.data[0].status).to.equal('INVITED');
    expect(response.body.data[0].roles[0]).to.equal('SUPER_ADMIN');
  });


  it.only('Filter team member by access as event Admin : POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "isEventAdmin"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(4);
  });

  it.only('Filter team member by access as manage payout: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canManagePayout"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(2);
  });

  it.only('Filter team member by access as manage team member: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canManageTeamMembers"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(2);
  });

  it.only('Get team member list : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    team_member_userid = (response.body.data[0].user_id)
    team_member_userid1 = (response.body.data[1].user_id)
    team_member_userid2 = (response.body.data[2].user_id)
    team_member_userid3 = (response.body.data[3].user_id)
    team_member_userid4 = (response.body.data[4].user_id)
    expect(response.body.total_count).to.equal(5);
  });


  it.only('Edit team member from admin to event admin : POST /api/v1/team-member/edit', async () => {
    const team_member =
    {
      "data": {
        "email": "apitest@yopmail.com",
        "emails": [
          "apitest@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "role_id": "1",
        "roles": "SUPER_ADMIN",
        "first_name": "Firstname",
        "last_name": "Lastname",
        "img_profile": "",
        "user_id": team_member_userid4,
        "access": {
          "canManageAllEvents": false,
          "canManageTeamMembers": false,
          "canManagePayout": false,
          "canExport": false,
          "isEventAdmin": false,
          "isSuperAdmin": true,
          "canManageAllSections": false,
          "canManageSelectedEvents": false
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/edit', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_update_message);

  });


  it.only('Try to Add team member who already exist : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "ajay@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": true,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": true,
        "selectedEvents": [],
        "canManageSelectedEvents": false,
        "selectedEventSections": [],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_exist_message);
  });


  it.only('Create an event for team member permission check : POST /backend/api/v2/events', async () => {

    const event9 = {
      "data": {
        "description": "new first event",
        "end_time_milli": (addDays(new Date(), 3)).getTime(),
        "name": 'Team Event 1',
        "start_time_milli": new Date().getTime(),
        "timezone_id": 94,
        "instagram_url": "https://instagram.com",
        "linkedin_url": "https://linkedin.com",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com"


      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event9)
    team_eventid = (response.body.data.event_id)
  });


  it.only('Create a second event for team member permission check : POST /backend/api/v2/events', async () => {

    const event9 = {
      "data": {
        "description": "new second event",
        "end_time_milli": (addDays(new Date(), 3)).getTime(),
        "name": 'Team Event 2',
        "start_time_milli": new Date().getTime(),
        "timezone_id": 94,
        "instagram_url": "https://instagram.com",
        "linkedin_url": "https://linkedin.com",
        "twitter_url": "https://twitter.com",
        "website_url": "https://google.com"


      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', event9)
    team_eventid1 = (response.body.data.event_id)
  });


  it.only('Add team member with permission as Manage All Events, Manage All Sections, Export : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "devteam@yopmail.com"
        ],
        "canExport": true,
        "canManageAllEvents": true,
        "canManageAllSections": true,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": false,
        "selectedEvents": [
          team_eventid, team_eventid1
        ],
        "canManageSelectedEvents": false,
        "selectedEventSections": [
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          12,
          13,
          14,
          15
        ],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });

  it.only('Verify devteam@yopmail.com user permission by login in dashboard: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "email": "devteam@yopmail.com",
        "password": "hubilomasterpassword",
        "captchaToken": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.data.userData.userPermission.canManageAllEvents).to.equal(1)
    expect(response.body.data.userData.userPermission.canExport).to.equal(1)
    expect(response.body.data.userData.userPermission.canManageAllSections).to.equal(1)
  })


  it.only('Add team member with permission as manage events: POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "juiteam@yopmail.com"
        ],
        "canExport": false,
        "canManageAllEvents": false,
        "canManageAllSections": false,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": false,
        "selectedEvents": [
          team_eventid
        ],
        "canManageSelectedEvents": true,
        "selectedEventSections": [
          2,
          3,
          4,
          5,
          6
        ],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });

  it.only('Verify juiteam@yopmail.com user permission by login in dashboard: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "email": "juiteam@yopmail.com",
        "password": "hubilomasterpassword",
        "captchaToken": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.data.userData.email).to.equal('juiteam@yopmail.com')
  })


  it.only('Add team member with permission as manage events,export,Manage All Sections : POST /api/v1/team-member/create', async () => {
    const team_member =
    {
      "data": {
        "email": "",
        "emails": [
          "niraliteam@yopmail.com"
        ],
        "canExport": true,
        "canManageAllEvents": false,
        "canManageAllSections": true,
        "canManageTeamMembers": false,
        "canManagePayout": false,
        "isSuperAdmin": false,
        "isEventAdmin": false,
        "selectedEvents": [
          team_eventid1
        ],
        "canManageSelectedEvents": true,
        "selectedEventSections": [
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          12,
          13,
          14,
          15
        ],
        "selectedEventList": null,
        "selectedSectionList": null,
        "errors": {
          "eventError": false,
          "sectionError": false
        },
        "eventList": null,
        "sectionList": null,
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/create', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_add_message);

  });

  it.only('Filter team member by access as export: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canExport"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(2);
    expect(response.body.data[0].email).to.equal('niraliteam@yopmail.com');
    expect(response.body.data[1].email).to.equal('devteam@yopmail.com');
  });

  it.only('Filter team member by access as manage some events: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canManageSelectedEvents"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(2);
    expect(response.body.data[0].email).to.equal('niraliteam@yopmail.com');
    expect(response.body.data[1].email).to.equal('juiteam@yopmail.com');
  });

  it.only('Filter team member by access as manage all sections,manage export and can manage selected events: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canExport",
            "canManageAllSections",
            "canManageSelectedEvents"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(3);
    expect(response.body.data[0].email).to.equal('niraliteam@yopmail.com');
    expect(response.body.data[1].email).to.equal('juiteam@yopmail.com');
    expect(response.body.data[2].email).to.equal('devteam@yopmail.com');
  });

  it.only('Filter team member by access as manage export and can manage selected events: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canManageSelectedEvents",
            "canExport"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(3);
    expect(response.body.data[0].email).to.equal('niraliteam@yopmail.com');
    expect(response.body.data[1].email).to.equal('juiteam@yopmail.com');
    expect(response.body.data[2].email).to.equal('devteam@yopmail.com');
  });


  it.only('Filter team member by all access: POST /api/v1/team-member/list', async () => {
    const team_member =
    {
      "data": {
        "filter": {
          "accesses": [
            "canManageSelectedEvents",
            "canExport",
            "canManageTeamMembers",
            "canManagePayout",
            "canManageAllEvents",
            "isEventAdmin",
            "isSuperAdmin",
            "canManageAllSections"
          ],
          "events": [],
          "sections": [],
          "status": []
        }
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.total_count).to.equal(8);
    expect(response.body.data[0].email).to.equal('niraliteam@yopmail.com');
    expect(response.body.data[1].email).to.equal('juiteam@yopmail.com');
    expect(response.body.data[2].email).to.equal('devteam@yopmail.com');
    expect(response.body.data[2].email).to.equal('devteam@yopmail.com');
  });

  it.only('Verify nirali user permission by login in dashboard: POST /backend/api/v2/auth/login', async () => {
    const login1 =

    {
      "data": {
        "email": "niraliteam@yopmail.com",
        "password": "hubilomasterpassword",
        "captchaToken": ""
      }
    }
    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/auth/login', { 'Content-Type': 'application/json' }, 'post', login1)
    expect(response.body.data.userData.userPermission.canExport).to.equal(1)
    expect(response.body.data.userData.userPermission.canManageAllSections).to.equal(1)
  })


  it.only('Resend Invite Email: POST /api/v1/team-member/resend-email', async () => {
    const team_member =
    {
      "data": {
        "user_id": team_member_userid_mail,
        "email": "apitest@yopmail.com"
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/resend-email', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_resend_message);
  });

  it.only('Get team member list : POST /api/v1/team-member/list', async () => {
    const team_member =
      { "data": { "filter": {} } }

    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/list', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    team_member_userid = (response.body.data[0].user_id)
    team_member_userid1 = (response.body.data[1].user_id)
    team_member_userid2 = (response.body.data[2].user_id)
    team_member_userid3 = (response.body.data[3].user_id)
    team_member_userid4 = (response.body.data[4].user_id)
    team_member_userid5 = (response.body.data[5].user_id)
    team_member_userid6 = (response.body.data[6].user_id)
    team_member_userid7 = (response.body.data[7].user_id)
  });

  it.only('Delete team member: POST /api/v1/team-member/delete', async () => {
    const team_member =
    {
      "data": {
        "is_all": 0,
        "ids": [
          team_member_userid, team_member_userid1, team_member_userid2, team_member_userid3, team_member_userid4, team_member_userid5, team_member_userid6, team_member_userid7
        ],
        "subscription_meta_id": 4
      }
    }
    var response = await sendRequest(environment.baseURL, '/api/v1/team-member/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', team_member)
    expect(response.body.message).to.equal(Responsemessages.Parameter_team_member_delete_message);
  });


  it.only('Delete first team event : POST /backend/api/v2/events/delete', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventid': team_eventid }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
  });

  it.only('Delete second team event : POST /backend/api/v2/events/delete', async () => {

    var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserId': environment.HOrganiserId, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'eventid': team_eventid1 }, 'post')
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
    expect(response.body.message).to.equal(Responsemessages.Parameter_events_deleted_message);
  });

})