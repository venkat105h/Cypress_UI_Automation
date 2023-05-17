/*
Author: Gaurav Thapar
Description: This Script will add/verify/get/delete group in settings
Timestamp: 17th Sept 2021 11:30 AM
*/
import supertest from 'supertest';
import environment from '../../config/environment';
import { expect } from 'chai'
import Responsemessages from '../../config/Responsemessages';
import { consolelog, sendRequest } from '../../helper/CommonUtil'
require('dotenv').config();

var setting_attendeegroup
var setting_boothmembergroup
var setting_speakergroup
var created_group_id
var meeting_settings_id
var meeting_settings_receiver_member_group_id
var meeting_settings_id1
var meeting_settings_receiver_member_group_id1
var meeting_settings_id2
var meeting_settings_receiver_member_group_id2
var meeting_settings_id3
var meeting_settings_receiver_member_group_id3


describe('Update Setting for Profile fields And Verify', () => {
    beforeEach(function (done) {
      setTimeout(function(){
        done();
      }, environment.HTestDelay);
    });


    it.only('Fatch group id : POST /backend/api/v2/events/settings/groups', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        setting_attendeegroup = (response.body.data.groupsList[0]._id)
        setting_boothmembergroup = (response.body.data.groupsList[1]._id)
        setting_speakergroup = (response.body.data.groupsList[2]._id)
      })
    
  
      it.only('Add new group : POST /backend/api/v2/events/groups', async () => {
        const newgroup =
        {
          "data": {
            "name": "Test Group",
            "group_id": setting_attendeegroup 
          }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'post', newgroup)
        created_group_id = (response.body.data.group_id)
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_add_message)  
      })

      it.only('Verify new group in setting  : POST /backend/api/v2/events/settings/groups', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/settings/groups', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data.groupsList[3].name).to.equal('Test Group')
        expect(response.body.data.groupsList[3].type).to.equal('ATTENDEE')
        expect(response.body.data.groupsList[3].isCustom).to.equal('YES')
      })


      it.only('Verify new group in people  : POST /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.data[3].name).to.equal('Test Group')
        expect(response.body.data[3].isMain).to.equal('NO')
        expect(response.body.data[3].type).to.equal('ATTENDEE')
        expect(response.body.total_count).to.equal(4)
      })

      it.only('Get group details of new group in setting  : POST /backend/api/v2/events/groups/details', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/details', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': created_group_id }, 'get')
        meeting_settings_id = (response.body.data.meeting_settings[0].id)
        meeting_settings_receiver_member_group_id = (response.body.data.meeting_settings[0].receiver_member_group_id)
        meeting_settings_id1 = (response.body.data.meeting_settings[0].id)
        meeting_settings_receiver_member_group_id1 = (response.body.data.meeting_settings[0].receiver_member_group_id)
        meeting_settings_id2 = (response.body.data.meeting_settings[0].id)
        meeting_settings_receiver_member_group_id2 = (response.body.data.meeting_settings[0].receiver_member_group_id)
        meeting_settings_id3 = (response.body.data.meeting_settings[0].id)
        meeting_settings_receiver_member_group_id3 = (response.body.data.meeting_settings[0].receiver_member_group_id)
      })

      it.only('Delete new group in setting  : POST /backend/api/v2/events/groups/delete', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events/groups/delete', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion, 'groupid': created_group_id  }, 'post')
        expect(response.body.message).to.equal(Responsemessages.Parameter_settings_group_delete_message)  
      })

      it.only('Verify new group in people after delete  : POST /backend/api/v2/people/groups/list', async () => {
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/people/groups/list', { 'organiserId': environment.HOrganiserId, 'eventId': process.env.eventid, 'Authorization': 'Bearer ' + process.env.eToken, 'buildversion': process.env.buildversion }, 'get')
        expect(response.body.total_count).to.equal(3)
      })
    
    })    