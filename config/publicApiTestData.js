//This file is to store the 

const now = new Date().getTime()

var EnterPrisePlanUser
var ProPlanUser
var AdvancedPlanUser
var BasicPlanUser
var CommonPassword

if (process.env.releaseenv == 'release'){
    EnterPrisePlanUser = 'hubilo_api@yopmail.com'
    ProPlanUser = 'deepika+105@hubilo.com'
    AdvancedPlanUser = 'deepika+103@hubilo.com'
    BasicPlanUser = 'deepika+88@hubilo.com'
    CommonPassword = 'hubilomasterpassword'
}

else if (process.env.releaseenv == 'qat') {
    EnterPrisePlanUser = 'hubilo_api@yopmail.com'
    ProPlanUser = 'deepika+123@hubilo.com'
    AdvancedPlanUser = 'deepika+098@hubilo.com'
    BasicPlanUser = 'deepika+12@hubilo.com'
    CommonPassword = 'hubilomasterpassword'
}

else {
    EnterPrisePlanUser = 'mihir.jain@hubilo.com'
    CommonPassword = 'Hubilo@123'
}

var faker = require("faker");

//Data for User scenarios

//User With all params
var ApiUserEmailWithAllParams = 'apiuseremailallparams1-' + now + '@yopmail.com'
var ApiUserFnameWithAllParams = faker.name.firstName()
var ApiUserLnameWithAllParams = faker.name.lastName()

//User With all params2
var ApiUserEmailWithAllParams2 = 'apiuseremailallparams2-' + now + '@yopmail.com'
var ApiUserFnameWithAllParams2 = faker.name.firstName()
var ApiUserLnameWithAllParams2 = faker.name.lastName()




//User With mandatory params
var ApiUserEmailWithMandatoryParams = 'apiuseremailmandatoryparams1-' + now + '@yopmail.com'
var ApiUserFnameWithMandatoryParams = faker.name.firstName()
var ApiUserLnameWithMandatoryParams = faker.name.lastName()


//Speaker With mandatory params 2
var ApiUserEmailWithMandatoryParams2 = 'apiuseremailmandatoryparams2-' + now + '@yopmail.com'
var ApiUserFnameWithMandatoryParams2 = faker.name.firstName()
var ApiUserLnameWithMandatoryParams2 = faker.name.lastName()

//User With mandatory params
var ApiUserEmailWithMandatoryParams = 'apiuseremailmandatoryparams1-' + now + '@yopmail.com'
var ApiUserFnameWithMandatoryParams = faker.name.firstName()
var ApiUserLnameWithMandatoryParams = faker.name.lastName()


//User With mandatory params 2
var ApiUserEmailWithMandatoryParams2 = 'apiuseremailmandatoryparams2-' + now + '@yopmail.com'
var ApiUserFnameWithMandatoryParams2 = faker.name.firstName()
var ApiUserLnameWithMandatoryParams2 = faker.name.lastName()


//User With invalid params 1
var ApiUserEmailWithInvalidParams = 'apiuseremailminvalidparams1-' + now + '@yopmail.com'
var ApiUserFnameWithInvalidParams = faker.name.firstName()
var ApiUserLnameWithInvalidParams = faker.name.lastName()

//User With invalid params 2
var ApiUserEmailWithInvalidParams2= 'apiuseremailminvalidparams2-' + now + '@yopmail.com'
var ApiUserFnameWithInvalidParams2 = faker.name.firstName()
var ApiUserLnameWithInvalidParams2 = faker.name.lastName()

//User With invalid params 3
var ApiUserEmailWithInvalidParams3 = 'apiuseremailminvalidparams3-' + now + '@yopmail.com'
var ApiUserFnameWithInvalidParams3 = faker.name.firstName()
var ApiUserLnameWithInvalidParams3 = faker.name.lastName()

//Updated params data
//All params users updated data
var ApiUserFnameWithAllParamsUpdated = faker.name.firstName()
var ApiUserLnameWithAllParamsUpdated = faker.name.lastName()

//All params users updated data
var ApiUserFnameWithAllParamsUpdated2 = faker.name.firstName()
var ApiUserLnameWithAllParamsUpdated2 = faker.name.lastName()

//Mandatory params updated data 1
var ApiUserFnameWithMandatoryParamsUpdated = faker.name.firstName()
var ApiUserLnameWithMandatoryParamsUpdated = faker.name.lastName()

//Mandatory params updated data 2
var ApiUserFnameWithMandatoryParamsUpdated2 = faker.name.firstName()
var ApiUserLnameWithMandatoryParamsUpdated2 = faker.name.lastName()


//Speaker With all params
var ApiSpeakerEmailWithAllParams = 'apispeakeremailallparams1-' + now + '@yopmail.com'
var ApiSpeakerFnameWithAllParams = faker.name.firstName()
var ApiSpeakerLnameWithAllParams = faker.name.lastName()

//Speaker With all params2
var ApiSpeakerEmailWithAllParams2 = 'apispeakeremailallparams2-' + now + '@yopmail.com'
var ApiSpeakerFnameWithAllParams2 = faker.name.firstName()
var ApiSpeakerLnameWithAllParams2 = faker.name.lastName()


//Speaker With all params3
var ApiSpeakerEmailWithAllParams3 = 'apispeakeremailallparams3-' + now + '@yopmail.com'
var ApiSpeakerFnameWithAllParams3 = faker.name.firstName()
var ApiSpeakerLnameWithAllParams3 = faker.name.lastName()

//BoothMember user with all params1
var ApiBoothmemberUserEmailWithAllParams = 'apiboothmemberuseremailallparams1-' + now + '@yopmail.com'
var ApiBoothmemberUserFnameWithAllParams = faker.name.firstName()
var ApiBoothmemberUserLnameWithAllParams = faker.name.lastName()

//BoothMember user with all params2
var ApiBoothmemberUserEmailWithAllParams2 = 'apiboothmemberuseremailallparams2-' + now + '@yopmail.com'
var ApiBoothmemberUserFnameWithAllParams2 = faker.name.firstName()
var ApiBoothmemberUserLnameWithAllParams2 = faker.name.lastName()

//BoothMember user with all params3
var ApiBoothmemberUserEmailWithAllParams3 = 'apiboothmemberuseremailallparams3-' + now + '@yopmail.com'
var ApiBoothmemberUserFnameWithAllParams3 = faker.name.firstName()
var ApiBoothmemberUserLnameWithAllParams3 = faker.name.lastName()




//Speaker With mandatory params
var ApiSpeakerEmailWithMandatoryParams = 'apispeakeremailmandatoryparams1-' + now + '@yopmail.com'
var ApiSpeakerFnameWithMandatoryParams = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParams = faker.name.lastName()


//Speaker With mandatory params 2
var ApiSpeakerEmailWithMandatoryParams2 = 'apispeakeremailmandatoryparams2-' + now + '@yopmail.com'
var ApiSpeakerFnameWithMandatoryParams2 = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParams2 = faker.name.lastName()

//Speaker With mandatory params
var ApiSpeakerEmailWithMandatoryParams = 'apispeakeremailmandatoryparams1-' + now + '@yopmail.com'
var ApiSpeakerFnameWithMandatoryParams = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParams = faker.name.lastName()


//Speaker With mandatory params 2
var ApiSpeakerEmailWithMandatoryParams2 = 'apispeakeremailmandatoryparams2-' + now + '@yopmail.com'
var ApiSpeakerFnameWithMandatoryParams2 = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParams2 = faker.name.lastName()


//Speaker With invalid params 1
var ApiSpeakerEmailWithInvalidParams = 'apispeakeremailminvalidparams1-' + now + '@yopmail.com'
var ApiSpeakerFnameWithInvalidParams = faker.name.firstName()
var ApiSpeakerLnameWithInvalidParams = faker.name.lastName()

//Speaker With invalid params 2
var ApiSpeakerEmailWithInvalidParams2= 'apispeakeremailminvalidparams2-' + now + '@yopmail.com'
var ApiSpeakerFnameWithInvalidParams2 = faker.name.firstName()
var ApiSpeakerLnameWithInvalidParams2 = faker.name.lastName()

//Speaker With invalid params 3
var ApiSpeakerEmailWithInvalidParams3 = 'apispeakeremailminvalidparams3-' + now + '@yopmail.com'
var ApiSpeakerFnameWithInvalidParams3 = faker.name.firstName()
var ApiSpeakerLnameWithInvalidParams3 = faker.name.lastName()

var ApiSpeakerEmailWithInvalidParams4 = 'apispeakeremailminvalidparams4-' + now + '@yopmail.com'
var ApiSpeakerFnameWithInvalidParams4 = faker.name.firstName()
var ApiSpeakerLnameWithInvalidParams4 = faker.name.lastName()


//Updated params data
//All params speakers updated data
var ApiSpeakerFnameWithAllParamsUpdated = faker.name.firstName()
var ApiSpeakerLnameWithAllParamsUpdated = faker.name.lastName()

//All params speakers updated data
var ApiSpeakerFnameWithAllParamsUpdated2 = faker.name.firstName()
var ApiSpeakerLnameWithAllParamsUpdated2 = faker.name.lastName()

var ApiSpeakerFnameWithAllParamsUpdated3 = faker.name.firstName()
var ApiSpeakerLnameWithAllParamsUpdated3 = faker.name.lastName()

//Mandatory params updated data 1
var ApiSpeakerFnameWithMandatoryParamsUpdated = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParamsUpdated = faker.name.lastName()

//Mandatory params updated data 2
var ApiSpeakerFnameWithMandatoryParamsUpdated2 = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParamsUpdated2 = faker.name.lastName()

//Mandatory params updated data 3
var ApiSpeakerFnameWithMandatoryParamsUpdated3 = faker.name.firstName()
var ApiSpeakerLnameWithMandatoryParamsUpdated3 = faker.name.lastName()

//CustomGroupUser With all params
var ApiCustomGroupUserEmailWithAllParams = 'apicustomgroupuseremailallparams1-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithAllParams = faker.name.firstName()
var ApiCustomGroupUserLnameWithAllParams = faker.name.lastName()

//CustomGroupUser With all params2
var ApiCustomGroupUserEmailWithAllParams2 = 'apicustomgroupuseremailallparams2-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithAllParams2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithAllParams2 = faker.name.lastName()



//CustomGroupUser With mandatory params
var ApiCustomGroupUserEmailWithMandatoryParams = 'apicustomgroupuseremailmandatoryparams1-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithMandatoryParams = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParams = faker.name.lastName()


//CustomGroupUser With mandatory params 2
var ApiCustomGroupUserEmailWithMandatoryParams2 = 'apicustomgroupuseremailmandatoryparams2-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithMandatoryParams2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParams2 = faker.name.lastName()

//CustomGroupUser With mandatory params
var ApiCustomGroupUserEmailWithMandatoryParams = 'apicustomgroupuseremailmandatoryparams1-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithMandatoryParams = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParams = faker.name.lastName()


//CustomGroupUser With mandatory params 2
var ApiCustomGroupUserEmailWithMandatoryParams2 = 'apicustomgroupuseremailmandatoryparams2-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithMandatoryParams2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParams2 = faker.name.lastName()


//CustomGroupUser With invalid params 1
var ApiCustomGroupUserEmailWithInvalidParams = 'apicustomgroupuseremailminvalidparams1-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithInvalidParams = faker.name.firstName()
var ApiCustomGroupUserLnameWithInvalidParams = faker.name.lastName()

//CustomGroupUser With invalid params 2
var ApiCustomGroupUserEmailWithInvalidParams2= 'apicustomgroupuseremailminvalidparams2-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithInvalidParams2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithInvalidParams2 = faker.name.lastName()

//CustomGroupUser With invalid params 3
var ApiCustomGroupUserEmailWithInvalidParams3 = 'apicustomgroupuseremailminvalidparams3-' + now + '@yopmail.com'
var ApiCustomGroupUserFnameWithInvalidParams3 = faker.name.firstName()
var ApiCustomGroupUserLnameWithInvalidParams3 = faker.name.lastName()

//Updated params data
//All params customgroupusers updated data
var ApiCustomGroupUserFnameWithAllParamsUpdated = faker.name.firstName()
var ApiCustomGroupUserLnameWithAllParamsUpdated = faker.name.lastName()

//All params customgroupusers updated data
var ApiCustomGroupUserFnameWithAllParamsUpdated2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithAllParamsUpdated2 = faker.name.lastName()

//Mandatory params updated data 1
var ApiCustomGroupUserFnameWithMandatoryParamsUpdated = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParamsUpdated = faker.name.lastName()

//Mandatory params updated data 2
var ApiCustomGroupUserFnameWithMandatoryParamsUpdated2 = faker.name.firstName()
var ApiCustomGroupUserLnameWithMandatoryParamsUpdated2 = faker.name.lastName()

//MultipleGroupUser With all params
var ApiMultipleGroupUserEmailWithAllParams = 'apimultiplegroupuseremailallparams1-' + now + '@yopmail.com'
var ApiMultipleGroupUserFnameWithAllParams = faker.name.firstName()
var ApiMultipleGroupUserLnameWithAllParams = faker.name.lastName()

//MultipleGroupUser With all params2
var ApiMultipleGroupUserEmailWithAllParams2 = 'apimultiplegroupuseremailallparams2-' + now + '@yopmail.com'
var ApiMultipleGroupUserFnameWithAllParams2 = faker.name.firstName()
var ApiMultipleGroupUserLnameWithAllParams2 = faker.name.lastName()




//phoneNumber Data

var testPhoneNumber = faker.phone.phoneNumber('!##########')
var testPhoneNumber2 = faker.phone.phoneNumber('!##########')
var testPhoneNumber3 = faker.phone.phoneNumber('!##########')

//phoneCode data
var phoneCode = '+91'
var phoneCode2 = '+92'
var phoneCode3 = '+93'

//Address data

var address = faker.address.city() + ',' + faker.address.state() + ',' + faker.address.country()
var address2 = faker.address.city() + ',' + faker.address.state() + ',' + faker.address.country()
var address3 = faker.address.city() + ',' + faker.address.state() + ',' + faker.address.country()

//City data

var city = faker.address.city()
var city2 = faker.address.city()
var city3 = faker.address.city()

//State
var state = faker.address.state()
var state2 = faker.address.state()
var state3 = faker.address.state()

//Country
var country = faker.address.country()
var country2 = faker.address.country()
var country3 = faker.address.country()

//website data
var webSite = faker.internet.url()
var webSite2 = faker.internet.url()
var webSite3 = faker.internet.url()

//whatsAppNumberData
var whatsAppNumber = faker.phone.phoneNumber()
var whatsAppNumber2 = faker.phone.phoneNumber()
var whatsAppNumber3 = faker.phone.phoneNumber()
var whatsAppNumber4 = faker.phone.phoneNumber()

//About details

var about = faker.random.words(faker.datatype.number({min:10,max:15}))
var about2 = faker.random.words(faker.datatype.number({min:10,max:15}))
var about3 = faker.random.words(faker.datatype.number({min:10,max:15}))
var about4 = faker.random.words(faker.datatype.number({min:10,max:15}))
var about5 = faker.random.words(faker.datatype.number({min:10,max:15}))

//Social links

var facebookUrl = "www.facebook.com/" + faker.name.firstName()
var linkedinUrl = "www.linkedin.com/" + faker.name.firstName()
var instagramUrl = "www.instagram.com/" + faker.name.firstName()
var twitterUrl = "www.twitter.com/" + faker.name.firstName()


export default{
    apiUserEmailWithAllParams : ApiUserEmailWithAllParams,
    apiUserFnameWithAllParams : ApiUserFnameWithAllParams,
    apiUserLnameWithAllParams : ApiUserLnameWithAllParams,
    apiUserEmailWithAllParams2 : ApiUserEmailWithAllParams2,
    apiUserFnameWithAllParams2 : ApiUserFnameWithAllParams2,
    apiUserLnameWithAllParams2 : ApiUserLnameWithAllParams2,
    apiUserEmailWithMandatoryParams : ApiUserEmailWithMandatoryParams,
    apiUserFnameWithMandatoryParams : ApiUserFnameWithMandatoryParams,
    apiUserLnameWithMandatoryParams : ApiUserLnameWithMandatoryParams,
    apiUserEmailWithMandatoryParams2 : ApiUserEmailWithMandatoryParams2,
    apiUserFnameWithMandatoryParams2 : ApiUserFnameWithMandatoryParams2,
    apiUserLnameWithMandatoryParams2 : ApiUserLnameWithMandatoryParams2,
    apiUserEmailWithMandatoryParams : ApiUserEmailWithMandatoryParams,
    apiUserFnameWithMandatoryParams : ApiUserFnameWithMandatoryParams,
    apiUserLnameWithMandatoryParams : ApiUserLnameWithMandatoryParams,
    apiUserEmailWithMandatoryParams2 : ApiUserEmailWithMandatoryParams2,
    apiUserFnameWithMandatoryParams2 : ApiUserFnameWithMandatoryParams2,
    apiUserLnameWithMandatoryParams2 : ApiUserLnameWithMandatoryParams2,
    apiUserEmailWithInvalidParams : ApiUserEmailWithInvalidParams,
    apiUserFnameWithInvalidParams : ApiUserFnameWithInvalidParams,
    apiUserLnameWithInvalidParams : ApiUserLnameWithInvalidParams,
    apiUserEmailWithInvalidParams2 : ApiUserEmailWithInvalidParams2,
    apiUserFnameWithInvalidParams2 : ApiUserFnameWithInvalidParams2,
    apiUserLnameWithInvalidParams2 : ApiUserLnameWithInvalidParams2,
    apiUserEmailWithInvalidParams3 : ApiUserEmailWithInvalidParams3,
    apiUserFnameWithInvalidParams3 : ApiUserFnameWithInvalidParams3,
    apiUserLnameWithInvalidParams3 : ApiUserLnameWithInvalidParams3,
    apiUserFnameWithAllParamsUpdated : ApiUserFnameWithAllParamsUpdated,
    apiUserLnameWithAllParamsUpdated : ApiUserLnameWithAllParamsUpdated,
    apiUserFnameWithAllParamsUpdated2 : ApiUserFnameWithAllParamsUpdated2,
    apiUserLnameWithAllParamsUpdated2 : ApiUserLnameWithAllParamsUpdated2,
    apiUserFnameWithMandatoryParamsUpdated : ApiUserFnameWithMandatoryParamsUpdated,
    apiUserLnameWithMandatoryParamsUpdated : ApiUserLnameWithMandatoryParamsUpdated,
    apiUserFnameWithMandatoryParamsUpdated2 : ApiUserFnameWithMandatoryParamsUpdated2,
    apiUserLnameWithMandatoryParamsUpdated2 : ApiUserLnameWithMandatoryParamsUpdated2,
    apiSpeakerEmailWithAllParams : ApiSpeakerEmailWithAllParams,
    apiSpeakerFnameWithAllParams : ApiSpeakerFnameWithAllParams,
    apiSpeakerLnameWithAllParams : ApiSpeakerLnameWithAllParams,
    apiSpeakerEmailWithAllParams2 : ApiSpeakerEmailWithAllParams2,
    apiSpeakerFnameWithAllParams2 : ApiSpeakerFnameWithAllParams2,
    apiSpeakerLnameWithAllParams2 : ApiSpeakerLnameWithAllParams2,
    apiSpeakerEmailWithAllParams3 : ApiSpeakerEmailWithAllParams3,
    apiSpeakerFnameWithAllParams3 : ApiSpeakerFnameWithAllParams3,
    apiSpeakerLnameWithAllParams3 : ApiSpeakerLnameWithAllParams3,
    apiSpeakerEmailWithMandatoryParams : ApiSpeakerEmailWithMandatoryParams,
    apiSpeakerFnameWithMandatoryParams : ApiSpeakerFnameWithMandatoryParams,
    apiSpeakerLnameWithMandatoryParams : ApiSpeakerLnameWithMandatoryParams,
    apiSpeakerEmailWithMandatoryParams2 : ApiSpeakerEmailWithMandatoryParams2,
    apiSpeakerFnameWithMandatoryParams2 : ApiSpeakerFnameWithMandatoryParams2,
    apiSpeakerLnameWithMandatoryParams2 : ApiSpeakerLnameWithMandatoryParams2,
    apiSpeakerEmailWithMandatoryParams : ApiSpeakerEmailWithMandatoryParams,
    apiSpeakerFnameWithMandatoryParams : ApiSpeakerFnameWithMandatoryParams,
    apiSpeakerLnameWithMandatoryParams : ApiSpeakerLnameWithMandatoryParams,
    apiSpeakerEmailWithMandatoryParams2 : ApiSpeakerEmailWithMandatoryParams2,
    apiSpeakerFnameWithMandatoryParams2 : ApiSpeakerFnameWithMandatoryParams2,
    apiSpeakerLnameWithMandatoryParams2 : ApiSpeakerLnameWithMandatoryParams2,
    apiSpeakerEmailWithInvalidParams : ApiSpeakerEmailWithInvalidParams,
    apiSpeakerFnameWithInvalidParams : ApiSpeakerFnameWithInvalidParams,
    apiSpeakerLnameWithInvalidParams : ApiSpeakerLnameWithInvalidParams,
    apiSpeakerEmailWithInvalidParams2 : ApiSpeakerEmailWithInvalidParams2,
    apiSpeakerFnameWithInvalidParams2 : ApiSpeakerFnameWithInvalidParams2,
    apiSpeakerLnameWithInvalidParams2 : ApiSpeakerLnameWithInvalidParams2,
    apiSpeakerEmailWithInvalidParams3 : ApiSpeakerEmailWithInvalidParams3,
    apiSpeakerFnameWithInvalidParams3 : ApiSpeakerFnameWithInvalidParams3,
    apiSpeakerLnameWithInvalidParams3 : ApiSpeakerLnameWithInvalidParams3,
    apiSpeakerFnameWithAllParamsUpdated : ApiSpeakerFnameWithAllParamsUpdated,
    apiSpeakerLnameWithAllParamsUpdated : ApiSpeakerLnameWithAllParamsUpdated,
    apiSpeakerFnameWithAllParamsUpdated2 : ApiSpeakerFnameWithAllParamsUpdated2,
    apiSpeakerLnameWithAllParamsUpdated2 : ApiSpeakerLnameWithAllParamsUpdated2,
    apiSpeakerFnameWithAllParamsUpdated3 : ApiSpeakerFnameWithAllParamsUpdated3,
    apiSpeakerLnameWithAllParamsUpdated3 : ApiSpeakerLnameWithAllParamsUpdated3,
    apiSpeakerFnameWithMandatoryParamsUpdated : ApiSpeakerFnameWithMandatoryParamsUpdated,
    apiSpeakerLnameWithMandatoryParamsUpdated : ApiSpeakerLnameWithMandatoryParamsUpdated,
    apiSpeakerFnameWithMandatoryParamsUpdated2 : ApiSpeakerFnameWithMandatoryParamsUpdated2,
    apiSpeakerLnameWithMandatoryParamsUpdated2 : ApiSpeakerLnameWithMandatoryParamsUpdated2,
    apiSpeakerFnameWithMandatoryParamsUpdated3 : ApiSpeakerFnameWithMandatoryParamsUpdated3,
    apiSpeakerLnameWithMandatoryParamsUpdated3 : ApiSpeakerLnameWithMandatoryParamsUpdated3,
    apiCustomGroupUserEmailWithAllParams : ApiCustomGroupUserEmailWithAllParams,
    apiCustomGroupUserFnameWithAllParams : ApiCustomGroupUserFnameWithAllParams,
    apiCustomGroupUserLnameWithAllParams : ApiCustomGroupUserLnameWithAllParams,
    apiCustomGroupUserEmailWithAllParams2 : ApiCustomGroupUserEmailWithAllParams2,
    apiCustomGroupUserFnameWithAllParams2 : ApiCustomGroupUserFnameWithAllParams2,
    apiCustomGroupUserLnameWithAllParams2 : ApiCustomGroupUserLnameWithAllParams2,
    apiCustomGroupUserEmailWithMandatoryParams : ApiCustomGroupUserEmailWithMandatoryParams,
    apiCustomGroupUserFnameWithMandatoryParams : ApiCustomGroupUserFnameWithMandatoryParams,
    apiCustomGroupUserLnameWithMandatoryParams : ApiCustomGroupUserLnameWithMandatoryParams,
    apiCustomGroupUserEmailWithMandatoryParams2 : ApiCustomGroupUserEmailWithMandatoryParams2,
    apiCustomGroupUserFnameWithMandatoryParams2 : ApiCustomGroupUserFnameWithMandatoryParams2,
    apiCustomGroupUserLnameWithMandatoryParams2 : ApiCustomGroupUserLnameWithMandatoryParams2,
    apiCustomGroupUserEmailWithMandatoryParams : ApiCustomGroupUserEmailWithMandatoryParams,
    apiCustomGroupUserFnameWithMandatoryParams : ApiCustomGroupUserFnameWithMandatoryParams,
    apiCustomGroupUserLnameWithMandatoryParams : ApiCustomGroupUserLnameWithMandatoryParams,
    apiCustomGroupUserEmailWithMandatoryParams2 : ApiCustomGroupUserEmailWithMandatoryParams2,
    apiCustomGroupUserFnameWithMandatoryParams2 : ApiCustomGroupUserFnameWithMandatoryParams2,
    apiCustomGroupUserLnameWithMandatoryParams2 : ApiCustomGroupUserLnameWithMandatoryParams2,
    apiCustomGroupUserEmailWithInvalidParams : ApiCustomGroupUserEmailWithInvalidParams,
    apiCustomGroupUserFnameWithInvalidParams : ApiCustomGroupUserFnameWithInvalidParams,
    apiCustomGroupUserLnameWithInvalidParams : ApiCustomGroupUserLnameWithInvalidParams,
    apiCustomGroupUserEmailWithInvalidParams2 : ApiCustomGroupUserEmailWithInvalidParams2,
    apiCustomGroupUserFnameWithInvalidParams2 : ApiCustomGroupUserFnameWithInvalidParams2,
    apiCustomGroupUserLnameWithInvalidParams2 : ApiCustomGroupUserLnameWithInvalidParams2,
    apiCustomGroupUserEmailWithInvalidParams3 : ApiCustomGroupUserEmailWithInvalidParams3,
    apiCustomGroupUserFnameWithInvalidParams3 : ApiCustomGroupUserFnameWithInvalidParams3,
    apiCustomGroupUserLnameWithInvalidParams3 : ApiCustomGroupUserLnameWithInvalidParams3,
    apiCustomGroupUserFnameWithAllParamsUpdated : ApiCustomGroupUserFnameWithAllParamsUpdated,
    apiCustomGroupUserLnameWithAllParamsUpdated : ApiCustomGroupUserLnameWithAllParamsUpdated,
    apiCustomGroupUserFnameWithAllParamsUpdated2 : ApiCustomGroupUserFnameWithAllParamsUpdated2,
    apiCustomGroupUserLnameWithAllParamsUpdated2 : ApiCustomGroupUserLnameWithAllParamsUpdated2,
    apiCustomGroupUserFnameWithMandatoryParamsUpdated : ApiCustomGroupUserFnameWithMandatoryParamsUpdated,
    apiCustomGroupUserLnameWithMandatoryParamsUpdated : ApiCustomGroupUserLnameWithMandatoryParamsUpdated,
    apiCustomGroupUserFnameWithMandatoryParamsUpdated2 : ApiCustomGroupUserFnameWithMandatoryParamsUpdated2,
    apiCustomGroupUserLnameWithMandatoryParamsUpdated2 : ApiCustomGroupUserLnameWithMandatoryParamsUpdated2,
    apiMultipleGroupUserEmailWithAllParams : ApiMultipleGroupUserEmailWithAllParams,
    apiMultipleGroupUserFnameWithAllParams : ApiMultipleGroupUserFnameWithAllParams,
    apiMultipleGroupUserLnameWithAllParams : ApiMultipleGroupUserLnameWithAllParams,
    apiMultipleGroupUserEmailWithAllParams2 : ApiMultipleGroupUserEmailWithAllParams2,
    apiMultipleGroupUserFnameWithAllParams2 : ApiMultipleGroupUserFnameWithAllParams2,
    apiMultipleGroupUserLnameWithAllParams2 : ApiMultipleGroupUserLnameWithAllParams2,
    apiBoothmemberUserEmailWithAllParams : ApiBoothmemberUserEmailWithAllParams,
    apiBoothmemberUserFnameWithAllParams : ApiBoothmemberUserFnameWithAllParams,
    apiBoothmemberUserLnameWithAllParams : ApiBoothmemberUserLnameWithAllParams,
    apiBoothmemberUserEmailWithAllParams2 : ApiBoothmemberUserEmailWithAllParams2,
    apiBoothmemberUserFnameWithAllParams2 : ApiBoothmemberUserFnameWithAllParams2,
    apiBoothmemberUserLnameWithAllParams2 : ApiBoothmemberUserLnameWithAllParams2,
    apiBoothmemberUserEmailWithAllParams3 : ApiBoothmemberUserEmailWithAllParams3,
    apiBoothmemberUserFnameWithAllParams3 : ApiBoothmemberUserFnameWithAllParams3,
    apiBoothmemberUserLnameWithAllParams3 : ApiBoothmemberUserLnameWithAllParams3,
    testPhoneNumber : testPhoneNumber,
    testPhoneNumber2 : testPhoneNumber2,
    testPhoneNumber3 : testPhoneNumber3,
    phoneCode : phoneCode,
    phoneCode2 : phoneCode2,
    phoneCode3 : phoneCode3,
    address : address,
    address2 : address2,
    address3 : address3,
    city : city,
    city2 : city2,
    city3 : city3,
    state : state,
    state2 : state2,
    state3 : state3,
    country : country,
    country2 : country2,
    country3 : country3,
    webSite : webSite,
    webSite2 : webSite2,
    webSite3 : webSite3,
    whatsAppNumber : whatsAppNumber,
    whatsAppNumber2 : whatsAppNumber2,
    whatsAppNumber3 : whatsAppNumber3,
    whatsAppNumber4 : whatsAppNumber4,
    about : about,
    about2 : about2,
    about3 : about3,
    about4 : about4,
    about5 : about5,
    facebookUrl : facebookUrl,
    twitterUrl : twitterUrl,
    linkedinUrl : linkedinUrl,
    instagramUrl : instagramUrl,
    enterPrisePlanUser : EnterPrisePlanUser,
    proPlanUser : ProPlanUser,
    advancedPlanUser : AdvancedPlanUser,
    basicPlanUser : BasicPlanUser,
    commonPassword : CommonPassword
}
