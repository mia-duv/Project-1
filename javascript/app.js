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
var selectedTeamId;
var selectedTeamStanding = {}
var standings = [];
$.ajax(settings).done(function (response) {
  console.log(response);



  teams = response.api.teams;
  console.log(teams);

  // console.log(response.api.teams[0].nickname);
  // for ( var i = 0; i < response.api.teams.length; i++) {
  //   teamNickNames = response.api.teams[i].nickname;
  //   // console.log(teamNickNames);



  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#selected-team").empty();

    //   var teamNickNames = [];
    //   for ( var i = 0; i < response.api.teams.length; i++) {
    //     teamNickNames = response.api.teams[i].nickname;
    // console.log(teamNickNames);
    // }
    searchBarInput = $("#searchBar").val().trim();
    var selectedTeam = teams.filter(
      team => {
        return team.nickname.toLowerCase() == searchBarInput.toLowerCase()
      })[0];
    console.log(selectedTeam);
    selectedTeamId = selectedTeam.teamId;

    $.ajax(record).then(function (response) {
      console.log(response.api.standings);

      standings = response.api.standings;
      selectedTeamStanding = standings.filter(
        standing => {
          return standing.teamId == selectedTeamId
        })[0];
      console.log("ST Standing", selectedTeamStanding)

    console.log("ST Standing WINS", selectedTeamStanding.win)
    var selection = $("<div>")
    var selectedTeamName = $("<h1>").text(selectedTeam.nickname)
    var selectedTeamLogo = $("<img>").attr("src", selectedTeam.logo)
    var selectedTeamRecord = $("<h2>").text("Wins: " + selectedTeamStanding.win + " Loss: " + selectedTeamStanding.loss);
    selection.append(selectedTeamName, selectedTeamLogo, selectedTeamRecord);
    $("#selected-team").append(selection);
  });
  });
    //  console.log(selectedTeamId);
})

  // Get game records 
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

