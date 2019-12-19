var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api-nba-v1.p.rapidapi.com/teams/league/standard",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    "x-rapidapi-key": "743c363af9msh8937f184c8dcec0p1bf377jsn68ba5af98b0c"
  }
}
//Global variables
var searchBarInput;
var teams = [];
var selectedTeam;
var selectedTeamId;
var selectedTeamStanding = {};
var standings = [];
var selectedGame = [];
let currentDate = new Date
// console.log(date.toISOString())

//Getting Team information 
$.ajax(settings).done(function (response) {

  teams = response.api.teams;

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $(".table1").empty();
    $("#column2").empty();
  
    // Created filter to search teams by nick name and team id. 
    searchBarInput = $("#searchBar").val().trim();
    selectedTeam = teams.filter(
      team => {
        return team.nickname.toLowerCase() == searchBarInput.toLowerCase()
      })[0];
    // console.log(selectedTeam);
    selectedTeamId = selectedTeam.teamId;

    $.ajax(record).then(function (response) {
      standings = response.api.standings;
      selectedTeamStanding = standings.filter(
        standing => {
          return standing.teamId === selectedTeamId
        })[0];

      $.ajax(games).then(function (response) {
        var myTeamsGames = response.api.games.filter(game => game.hTeam.teamId === selectedTeamId);
        var upcomingGames = myTeamsGames.filter(game => new Date(game.startTimeUTC) >= currentDate);
        console.log(upcomingGames[0]);
      
           

        // console.log("ST Standing WINS", selectedTeamStanding.win)
        var selection = $("<div>")
        var selectedTeamName = $("<h1>").text(selectedTeam.nickname)
        var selectedTeamLogo = $("<img>").attr({
          src: selectedTeam.logo,
          width: "380px"
        })
        var selectedTeamRecord = $("<h2>").text("Wins: " + selectedTeamStanding.win + " Loss: " + selectedTeamStanding.loss);
        selection.append(selectedTeamName, selectedTeamLogo, selectedTeamRecord);
        // console.log(selection);
        $(".table1").append(selection);

        // Game info for column 2 
        var currentGame = $("<h3>").text(upcomingGames[0].hTeam.fullName + " vs. " + upcomingGames[0].vTeam.fullName);
        var currentGameDate = $("<h3>").text((new Date(upcomingGames[0].startTimeUTC).toLocaleDateString()) + " at " + new Date(upcomingGames[0].startTimeUTC).toLocaleTimeString())
        $("#column2").append(currentGame, currentGameDate);

      });
    });
  })

  // Get team records 
  var record = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-nba-v1.p.rapidapi.com/standings/standard/2019",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "743c363af9msh8937f184c8dcec0p1bf377jsn68ba5af98b0c"
    }
  }

  //Column 2 - Game Information 
  var games = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-nba-v1.p.rapidapi.com/games/seasonYear/2019",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "32f3549c71mshfad8e66e3e3891dp11a5b4jsn37e2605ac94b"
    }
  }
});
