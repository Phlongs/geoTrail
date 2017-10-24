const express = require('express');
const router = new express.Router();
var unirest = require('unirest');

var loc = {};

router.post('/location', function(req,res){
	loc.lat = req.body.lat;
	loc.lng = req.body.lng;

	console.log(loc.lat)
});

router.get('/', function(req, res)
{
	console.log(loc)
	console.log(req.body)
	var url = 'https://trailapi-trailapi.p.mashape.com/?lat=' + loc.lat + 
	'&limit=25&lon=' + loc.lng + '&q[activities_activity_type_name_eq]=hiking&radius=50';

	unirest.get(url)
	.header("X-Mashape-Key", "hOkRc76SJAmshN9SZOyT3raU7QpGp1uQqprjsnczSazK2uuEQK")
	.header("Accept", "text/plain")
	.end(function (trails) {
		  var trails = trails.body;
		  res.render('index', {
		  	trails : trails,
		  	location: loc.lat
		  }); 
	});
  
});





module.exports = router;