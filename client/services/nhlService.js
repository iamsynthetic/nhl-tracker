import Api from './Api'

export default {
    getAllTeams(){
        return Api().get('teams/')
    },
    getATeam(id){
        return Api().get('teams/' + id)
    },
    getTeamSchedule(id){
        console.log('getteamschedule id is: ' + id);
        return Api().get('schedule?teamId=' + id + '&startDate=2018-10-03&endDate=2019-04-06')
    },
    getMatchup(id, date){
        console.log('getMatchup id is: ' + id);
        console.log('getMatchup date is: ' + date);
        //https://statsapi.web.nhl.com/api/v1/schedule?teamId=10&startDate=2018-10-03&endDate=2018-10-03
        return Api().get('schedule?teamId=' + id + '&startDate=' + date + '&endDate=' + date);
    }
}