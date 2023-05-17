require('dotenv').config();
var dashboardbaseurl
var dashboardbaseurl1
var dashboardbaseur3
var dashboardbaseurl4
var dashboardbaseurl5
var dashboardApiURL
var dash_super_admin_base_url_1
var HOrganiserId1
var agendatrackid
var retryDelay=2000
var testDelay=300
var secret
var dashboardbaseurl6
var iframebaseurl
var third_Party_Zoom_Integration  /** Srinivas Kantipudi Token */


if (process.env.releaseenv == 'qat') {
    dashboardbaseurl = 'https://newdashboard-api.v2qat.demohubilo.com'
    dashboardbaseurl1 = 'https://newdashboard.v2qat.demohubilo.com'
    dashboardbaseur3 = 'https://api.v2qat.demohubilo.com'
    dashboardbaseurl4 = 'https://cdn.v2qat.demohubilo.com'
    dashboardbaseurl5 = 'https://admin.v2qat.demohubilo.com'
    dash_super_admin_base_url_1 = "https://users.v2qat.demohubilo.com"
    dashboardApiURL = 'https://e28537.v2qat.demohubilo.com'
    dashboardbaseurl6 = 'https://users.v2qat.demohubilo.com'
    HOrganiserId1 = '376745'
    secret = "Kd+ACqqWuRig"
    third_Party_Zoom_Integration = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q"
    // HOrganiserId1 = '345139'
    // agendatrackid = 2931
}
else if (process.env.releaseenv == 'qat1') {
    dashboardbaseurl = 'https://newdashboard-api.v2qat1.demohubilo.com'
    dashboardbaseurl1 = 'https://newdashboard.v2qat1.demohubilo.com'
    dashboardbaseur3 = 'https://api.v2qat1.demohubilo.com'
    dashboardbaseurl4 = 'https://cdn.v2qat1.demohubilo.com'
    dashboardbaseurl5 = 'https://admin.v2qat1.demohubilo.com'
    dash_super_admin_base_url_1 = "https://users.v2qat1.demohubilo.com"
    dashboardbaseurl6 = 'https://admin.v2qat1.demohubilo.com'
    iframebaseurl = 'https://embed-api.v2qat1.demohubilo.com'
    HOrganiserId1 = '376745'
    secret = "Kd+ACqqWuRig"
    third_Party_Zoom_Integration = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q"
    // HOrganiserId1 = '345139'
    // agendatrackid = 2931
}
else if (process.env.releaseenv == 'swat'){
    dashboardbaseurl = 'https://newdashboard-api.v2swat.demohubilo.com'
    dashboardbaseurl1 = 'https://newdashboard.v2swat.demohubilo.com'
    dashboardbaseur3 = 'https://api.v2swat.demohubilo.com'
    dashboardbaseurl4 = 'https://cdn.v2swat.demohubilo.com'
    dashboardbaseurl5 = 'https://admin.v2swat.demohubilo.com'
    dash_super_admin_base_url_1 = "https://users.v2swat.demohubilo.com"
    dashboardbaseurl6 = 'https://admin.v2swat.demohubilo.com'
    HOrganiserId1 = '350112'
    secret = "cRbXbr;<3'213"
    third_Party_Zoom_Integration = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q"
}

else if (process.env.releaseenv == 'dev'){
    dashboardbaseurl = 'https://newdashboard-api.v2dev.demohubilo.com'
    dashboardbaseurl1 = 'https://newdashboard.v2dev.demohubilo.com'
    dashboardbaseur3 = 'https://api.v2dev.demohubilo.com'
    dashboardbaseurl4 = 'https://cdn.v2dev.demohubilo.com'
    dashboardbaseurl5 = 'https://admin.v2dev.demohubilo.com'
    dash_super_admin_base_url_1 = "https://users.v2dev.demohubilo.com"
    dashboardbaseurl6 = 'https://admin.v2dev.demohubilo.com'
    dashboardApiURL = 'https://e11951.v2dev.demohubilo.com'
    HOrganiserId1 = '345575'
    retryDelay=500
    testDelay=100
    third_Party_Zoom_Integration = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q"

}

else {

    dashboardbaseurl = 'https://newdashboard-api.v2release.demohubilo.com'
    dashboardbaseurl1 = 'https://newdashboard.v2release.demohubilo.com'
    dashboardbaseur3 = 'https://api.v2release.demohubilo.com'
    dashboardbaseurl4 = 'https://cdn.v2release.demohubilo.com'
    dashboardbaseurl5 = 'https://admin.v2release.demohubilo.com'
    dashboardApiURL = 'https://E28570.v2release.demohubilo.com'
    dash_super_admin_base_url_1 = "https://users.v2release.demohubilo.com"
    dashboardbaseurl6 = 'https://users.v2release.demohubilo.com'
    
    // HOrganiserId1 = '345136'
    HOrganiserId1 = '350112'
    // agendatrackid = 2935
    secret = "jfoylsoBo!Z231"
    third_Party_Zoom_Integration = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJSSjc5cjJUUWMyRUd6UjdFZ1ZlbkEiLCJleHAiOjE2NzI0MjQ5NDAsImlhdCI6MTY0MTAxODc5N30.hhVq_dVNML7wdEu2JJ3f0BUUmrQ9TpXs-7sVAEgai1Q"

}
export default
    {
        baseURL2: process.env.eventurl,
        baseURL: dashboardbaseurl,
        baseURL1: dashboardbaseurl1,
        baseURL3: dashboardbaseur3,
        baseURL4: dashboardbaseurl4,
        baseURL5: dashboardbaseurl5,
        baseURL7: dashboardbaseurl6,
        ApiURL: dashboardApiURL,
        baseURL6: iframebaseurl,
        agenda_track_id: agendatrackid,
        HLimit: '5',
        HLimitZero: '0',
        HOrganiserId: HOrganiserId1,
        HEventId: '10195',
        HSource: "COMMUNITY",
        HPage: '1',
        Hdevicetype: 'WEB',
        HContenttype: 'multipart/form-data',
        HRetryDelay: retryDelay,
        HTestDelay: testDelay,
        superadmin_baseURL_1: dash_super_admin_base_url_1,
        secretkey: secret,
        third_Party_Zoom_Integration_key : third_Party_Zoom_Integration
    };