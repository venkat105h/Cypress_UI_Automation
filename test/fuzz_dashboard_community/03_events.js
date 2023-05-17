import { Fuzzer, fuzzDict } from '../../helper/fuzz';
const fuzz = new Fuzzer();
var fuzzball = require('fuzzball');
var faker = require('faker');

import  environment from '../../config/environment';
import { sendRequest, emailaddress } from '../../helper/CommonUtil';
import Responsemessages from '../../config/Responsemessages';
require('dotenv').config();

function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}

function addTime(dateObj, numTime) {
    dateObj.setTime(dateObj.getTime() + (numTime * 60 * 60 * 1000));
    return dateObj;
}


describe('Fuzz: Create Event.', () => {

    // var list_length = 10;
    var list_length = fuzzDict.SQL_INJECTION_DECTECTION_FUZZ.length;

    it.skip('[Dashboard]: FUZZ: Creating event with fuzz event name and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i], // sending all fuzz mentioned text.
                    "description": faker.lorem.sentence(),
                    "start_time_milli": new Date().getTime(),
                    "end_time_milli": (addDays(new Date(), 3)).getTime(),
                    "timezone_id": 94,
                    "linkedin_url": "https://www.linkedin.com/",
                    "website_url": "https://www.whatsapp.com/",
                    "instagram_url": "https://www.instagram.com/",
                    "fb_url": "https://www.facebook.com/",
                    "twitter_url": "https://twitter.com/"
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("The fuzz event with invalid name got created.")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid event got created is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_other_message = fuzzball.token_set_ratio(response.body.message, "Event cannot be created.");
                console.log("The message ratio for other issue is: ", ratio_other_message);
            }
        }
    });

    it.skip('[Dashboard]: FUZZ: Creating event with fuzz timezone id and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": faker.address.streetName(), // sending all fuzz mentioned text.
                    "description": faker.lorem.sentence(),
                    "start_time_milli": new Date().getTime(),
                    "end_time_milli": (addDays(new Date(), 3)).getTime(),
                    "timezone_id": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "linkedin_url": "https://www.linkedin.com/",
                    "website_url": "https://www.whatsapp.com/",
                    "instagram_url": "https://www.instagram.com/",
                    "fb_url": "https://www.facebook.com/",
                    "twitter_url": "https://twitter.com/"
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body)

                console.log("The fuzz event with invalid timezone got created.")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid timezone event name is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_timezone_message = fuzzball.token_set_ratio(response.body.message, "Wrong timezone sent");
                console.log("The message ratio for timezone is: ", ratio_timezone_message);
            }
        }
    });

    it.skip('[Dashboard]: FUZZ: Creating event with fuzz start time and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": faker.address.streetName(), // sending all fuzz mentioned text.
                    "description": faker.lorem.sentence(),
                    "start_time_milli": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "end_time_milli": (addDays(new Date(), 3)).getTime(),
                    "timezone_id": 94,
                    "linkedin_url": "https://www.linkedin.com/",
                    "website_url": "https://www.whatsapp.com/",
                    "instagram_url": "https://www.instagram.com/",
                    "fb_url": "https://www.facebook.com/",
                    "twitter_url": "https://twitter.com/"
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body)

                console.log("The fuzz event with invalid start time got created.")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid start time event name is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_timezone_message = fuzzball.token_set_ratio(response.body.message, "Wrong timezone sent");
                console.log("The message ratio for timezone is: ", ratio_timezone_message);
            }
        }
    });

    it.skip('[Dashboard]: FUZZ: Creating event with fuzz end time and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": faker.address.streetName(), // sending all fuzz mentioned text.
                    "description": faker.lorem.sentence(),
                    "start_time_milli": new Date().getTime(),
                    "end_time_milli": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "timezone_id": 94,
                    "linkedin_url": "https://www.linkedin.com/",
                    "website_url": "https://www.whatsapp.com/",
                    "instagram_url": "https://www.instagram.com/",
                    "fb_url": "https://www.facebook.com/",
                    "twitter_url": "https://twitter.com/"
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response for invalid end time is: ", response_body)

                console.log("The fuzz event with invalid end time got created.")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid end time event name is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_timezone_message = fuzzball.token_set_ratio(response.body.message, "Wrong timezone sent");
                console.log("The message ratio for timezone is: ", ratio_timezone_message);
            }
        }
    });

    it.skip('[Dashboard]: FUZZ: Creating event with fuzz urls and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": faker.address.streetName(), // sending all fuzz mentioned text.
                    "description": faker.lorem.sentence(),
                    "start_time_milli": new Date().getTime(),
                    "end_time_milli": (addDays(new Date(), 3)).getTime(),
                    "timezone_id": 94,
                    "linkedin_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "website_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "instagram_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "fb_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "twitter_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response for invalid url is: ", response_body)

                console.log("The fuzz event with invalid links url got created.")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid event name is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_timezone_message = fuzzball.token_set_ratio(response.body.message, "Wrong timezone sent");
                console.log("The message ratio for timezone is: ", ratio_timezone_message);
            }
        }
    });

    it.skip('[Dashboard]: FUZZ: Creating event with every value as fuzz words and delete the same created fuzzy events. : POST /backend/api/v2/events && /backend/api/v2/events/delete ', async() => 
    {
        for (var i=0; i<list_length; i++)
        {   
            const eventFuzz = 
            {
                "data": {
                    "name": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i], // sending all fuzz mentioned text.
                    "description": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "start_time_milli": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "end_time_milli": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "timezone_id": 94,
                    "linkedin_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "website_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "instagram_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "fb_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i],
                    "twitter_url": fuzzDict.SQL_INJECTION_DECTECTION_FUZZ[i]
                }
            }
            console.log("The payload with invalid event name is:", eventFuzz);
            var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', {'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
            if (response.body.status == 200)
            {
                console.log("The fuzz event with invalid all keys with value got created.")

                var response_body = JSON.stringify(response.body);
                console.log("The stringify response for invalid all keys with value is: ", response_body)

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
                console.log("The ration for the invalid all keys with value event name is: ", ratio_status);

                // process.env.fuzz_eventid = response.body.data.event_id;
                // var delresponse = await sendRequest(environment.baseURL1, '/backend/api/v2/events/delete', { 'organiserid': process.env.fuzz_org_id , 'authorization': 'Bearer ' + process.env.fuzz_etoken, 'buildversion': process.env.buildversion, 'eventid': process.env.fuzz_eventid}, 'post')
                // console.log("The deleting response is: ", delresponse.body);

                // var ratio_delete_status = fuzzball.ratio(JSON.stringify(delresponse.body.status), "200");
                // console.log("The status ratio for deleting the invalid event name is: ", ratio_delete_status);

                // var ratio_delete_message = fuzzball.token_set_ratio(delresponse.body.message, "Event has been deleted");
                // console.log("The message ratio for deleting the invalid event name is: ", ratio_delete_message);
            }
            else
            {
                var response_body = JSON.stringify(response.body);
                console.log("The stringify response is: ", response_body);

                console.log("Couldn't create the event, so sad to have no event id !!!")

                var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
                console.log("The status ratio for event not created is: ", ratio_status);

                var ratio_timezone_message = fuzzball.token_set_ratio(response.body.message, "Wrong timezone sent");
                console.log("The message ratio for timezone is: ", ratio_timezone_message);
            }
        }
    });

    it.only('[Dashboard]: Fuzz: create a valid new event: POST /backend/api/v2/events', async() => 
    {
        const eventFuzz = 
        {
            "data": {
                "name": faker.address.streetName(), // sending all fuzz mentioned text.
                "description": faker.lorem.sentence(),
                "start_time_milli": new Date().getTime(),
                "end_time_milli": (addDays(new Date(), 3)).getTime(),
                "timezone_id": 94,
                "linkedin_url": "https://www.linkedin.com/",
                "website_url": "https://www.whatsapp.com/",
                "instagram_url": "https://www.instagram.com/",
                "fb_url": "https://www.facebook.com/",
                "twitter_url": "https://twitter.com/"
            }
        }
        var response = await sendRequest(environment.baseURL1, '/backend/api/v2/events', { 'Content-Type': 'application/json', 'organiserId': process.env.fuzz_org_id , 'Authorization': 'Bearer ' + process.env.fuzz_etoken}, 'post', eventFuzz)
        if (response.body.status == 200)
        {
            console.log("The valid event with valid all keys with value got created.");

            console.log(JSON.stringify(response.body));

            process.env.fuzz_eventid = response.body.data.event_id;

            var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "200");
            console.log("The ration for the valid all keys with value event name is: ", ratio_status);
        }
        else
        {
            var response_body = JSON.stringify(response.body);
            console.log("The stringify response is: ", response_body);

            console.log("Couldn't create the event, so sad to have no event id !!!")

            var ratio_status = fuzzball.ratio(JSON.stringify(response.body.status), "400");
            console.log("The status ratio for event not created is: ", ratio_status);

            var ratio_message = fuzzball.token_set_ratio(response.body.message, "Could not create the event");
            console.log("The message ratio is: ", ratio_message);
        }
    });
});