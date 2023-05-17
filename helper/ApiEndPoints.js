var adminloginurl
if(process.env.releaseenv == 'qat' || process.env.releaseenv == 'release'){
    adminloginurl = ('/api/v1/users/login')
}
else{
    adminloginurl = ('/backend/api/v1/auth/login')
}
 export const Adminloginurl = adminloginurl

export const VerifyFiles = ('api/v2/briefcase/files')
export const DownlaodBriefcaseNotes = ('/api/v2/briefcase/notes/download')
export const BrifcaseActions = ('/api/v2/briefcase/files/action')
export const ShowhiddenFile = ('/api/v2/briefcase/files')
export const UnhideFile = ('/api/v2/briefcase/files/action')
export const DeleteFiles = ('/api/v2/briefcase/files/action')

//Login
export const Login = ('/backend/api/v2/auth/login')

//Events
export const CreateEvent = ('/backend/api/v2/events')
export const ChangeSettings = ('/backend/api/v2/events/settings/login')
export const EventLive = ('/api/v1/event/livestatus/update')
export const EventBasicInfo = ('/backend/api/v2/events/basicinfo')
export const DeleteEvent = ('/backend/api/v2/events/delete')
export const ListEvents = ('/backend/api/v2/events/list')


//CommunityLogin
export const CommunityLoginPage = ('/api/v2/platformNew/web-state-new')
export const SignupUser = ('/api/v2/users/signup')
export const OnBoarding = ('/api/v2/users/on-board')
export const ComunityLogin = ('/api/v2/users/login')
export const CheckRegistration = ('/api/v2/users/check-email')


//Dashboard People
export const AddPeople = ('/backend/api/v2/people/single')
export const GetPeople = ('/api/v1/people/list')
export const UpdatePeople = ('/backend/api/v2/people/single/edit')
export const DeletePeople = ('/backend/api/v2/people/delete')


//Dashboard Session
export const CreateSession = ('/backend/api/v2/events/agendas')
export const UpdateSessionStremSettings = ('/backend/api/v2/agendas/stream')
export const DeleteSession = ('/backend/api/v2/agendas/delete')
export const GetSessions = ('/backend/api/v2/events/agendas')

//Dashboard notifications
export const UpdateBackendNotification = ('/backend/api/v2/events/settings/notification')

//Rooms
export const CreateRooms = ('/api/v1/rooms/add')
export const ListRooms = ('/api/v1/rooms/list')

