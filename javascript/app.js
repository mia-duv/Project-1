var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-nba-v1.p.rapidapi.com/games/league/standard/2019",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"x-rapidapi-key": "743c363af9msh8937f184c8dcec0p1bf377jsn68ba5af98b0c"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
