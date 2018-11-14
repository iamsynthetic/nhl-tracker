import Api from './Api'

export default {
    getAllTeams(){
        return Api().get('teams')
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
        return Api().get('schedule?teamId=' + id + '&startDate=' + date + '&endDate=' + date);
    },
    getMatchupBoxScore(gamepk){
        console.log('getmatchupBoxScore gamepk is: ' + gamepk);
        return Api().get('game/' + gamepk + '/boxscore');
    },
    getTeamSeasonStats(id){
        console.log('getTeamSeasonStats id is: ' + id);
        return Api().get('teams/' + id + '/stats')
    }
}