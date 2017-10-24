const express = require('express');
const router = new express.Router();
var unirest = require('unirest');
var myip = require('quick-local-ip');
var where = require('node-where');

var location = {};
var ip = myip.getLocalIP6();

where.is(ip, function(err, result) {
	console.log(ip)
  if (result) {
    console.log('City: ' + result.get('city'));
    console.log('State / Region: ' + result.get('region'));
    console.log('State / Region Code: ' + result.get('regionCode'));
    console.log('Zip: ' + result.get('postalCode'));
    console.log('Country: ' + result.get('country'));
    console.log('Country Code: ' + result.get('countryCode'));
    console.log('Lat: ' + result.get('lat'));
    console.log('Lng: ' + result.get('lng'));
    location.lat = result.get('lat');
    location.lng = result.get('lng');
  }
});

router.get('/', function(req, res)
{

	var url = 'https://trailapi-trailapi.p.mashape.com/?lat=' + location.lat + 
	'&limit=25&lon=' + location.lng + '&q[activities_activity_type_name_eq]=hiking&radius=50';

	unirest.get(url)
	.header("X-Mashape-Key", "hOkRc76SJAmshN9SZOyT3raU7QpGp1uQqprjsnczSazK2uuEQK")
	.header("Accept", "text/plain")
	.end(function (trails) {
		  var trails = trails.body;
		  res.render('index', {
		  	trails : trails,
		  	location : location
		  }); 
	});
  
});

module.exports = router;