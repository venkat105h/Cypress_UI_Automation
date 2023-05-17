/*
Author: Rajeev Pramanik
Description: This Script will make inactive/active of added roles with verification as an super admin in dashboard.
Timestamp: 20th Jan 2022 11:30 AM
Modified: Rajeev Pramanik 17th Jan 2022 10:30 AM
Description: Added Test Cases according to review points.
*/

import {sendRequest} from '../../helper/CommonUtil';
import environment from '../../config/environment';
import { assert, expect } from 'chai';
import Responsemessages from '../../config/Responsemessages';
import casual from 'casual';
require('dotenv').config();

describe('Search the added roles/users from the records.', () => {

    it.only('Search the added admin dash user by latitude, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=    ', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+casual.latitude, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.totalCount).to.equal(0);
            expect(response.body.data.totalPages).to.equal(0);
            expect(response.body.data.currentPage).to.equal(0);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by url, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=    ', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+casual.url, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.totalCount).to.equal(0);
            expect(response.body.data.totalPages).to.equal(0);
            expect(response.body.data.currentPage).to.equal(0);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by first name, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.updated_user_first_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by last name, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.user_last_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by email id, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.user_email_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by admin role, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.updated_role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].roles[0].id, global.updated_role_id);
            assert.exists(response.body.data.items[0].roles[0].name, global.updated_role_name)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added org dash user by first name, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.org_user_first_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            assert.exists(response.body.data.items[0].email, global.org_user_email_id)
            assert.exists(response.body.data.items[0].id, global.org_user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added org dash user by last name, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.org_user_last_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            assert.exists(response.body.data.items[0].email, global.org_user_email_id)
            assert.exists(response.body.data.items[0].id, global.org_user_id)

        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added org dash user by email id, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.org_user_email_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.org_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.org_user_last_name);
            assert.exists(response.body.data.items[0].email, global.org_user_email_id)
            assert.exists(response.body.data.items[0].id, global.org_user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added org dash user by admin role, by the super admin and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.org_updated_role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].roles[0].id, global.org_updated_role_id)
            assert.exists(response.body.data.items[0].roles[0].name, global.org_updated_role_name)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash roles by latitude, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=    ', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+casual.latitude, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.totalCount).to.equal(0);
            expect(response.body.data.totalPages).to.equal(0);
            expect(response.body.data.currentPage).to.equal(0);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash roles by url, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=    ', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+casual.url, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.totalCount).to.equal(0);
            expect(response.body.data.totalPages).to.equal(0);
            expect(response.body.data.currentPage).to.equal(0);
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash roles by role name, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.role_id)
            assert.exists(response.body.data.items[0].name, global.role_name)
            assert.exists(response.body.data.items[0].description, global.role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash description by role description, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.role_description, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.role_id)
            assert.exists(response.body.data.items[0].name, global.role_name)
            assert.exists(response.body.data.items[0].description, global.role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added org dash roles by role name, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async() =>
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.updated_org_role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.updated_org_role_id)
            assert.exists(response.body.data.items[0].name, global.updated_org_role_name)
            assert.exists(response.body.data.items[0].description, global.updated_org_role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }

    })

    it.only('Search the added org dash description by role description, by the super admin and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.updated_org_role_description, {'Content-Type':'application/json', 'authorization':'Bearer '+global.super_admin_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.updated_org_role_id)
            assert.exists(response.body.data.items[0].name, global.updated_org_role_name)
            assert.exists(response.body.data.items[0].description, global.updated_org_role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by first name, by the admin dash user and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.updated_user_first_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by last name, by the admin dash user and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.user_last_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by email id, by the admin dash user and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.user_email_id, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            expect(response.body.data.items[0].firstName).to.equal(global.updated_user_first_name);
            expect(response.body.data.items[0].lastName).to.equal(global.user_last_name);
            assert.exists(response.body.data.items[0].email, global.user_email_id)
            assert.exists(response.body.data.items[0].id, global.user_id)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash user by admin role, by the admin dash user and verify the response: GET /api/v1/users?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/users?page=0&limit=10&searchTerm='+global.updated_role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].roles[0].id, global.updated_role_id);
            assert.exists(response.body.data.items[0].roles[0].name, global.updated_role_name)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash roles by role name, by the admin dash user and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.role_name, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.role_id)
            assert.exists(response.body.data.items[0].name, global.role_name)
            assert.exists(response.body.data.items[0].description, global.role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

    it.only('Search the added admin dash description by role description, by the admin dash user and verify the response: GET /api/v1/roles?page=0&limit=10&searchTerm=', async () => 
    {
        var response = await sendRequest(environment.superadmin_baseURL_1, '/api/v1/roles?page=0&limit=10&searchTerm='+global.role_description, {'Content-Type':'application/json', 'authorization':'Bearer '+global.admin_dashboard_user_etoken},'get')
        if (response.status == 200)
        {
            expect(response.body.message).to.equal(Responsemessages.parameter_ok_message);
            assert.exists(response.body.data.items[0].id, global.role_id)
            assert.exists(response.body.data.items[0].name, global.role_name)
            assert.exists(response.body.data.items[0].description, global.role_description)
        }
        else
        {
            console.log("The failed response is:", response.body)
        }
    })

})