const express = require('express');
const router = new express.Router();
var unirest = require('unirest');

var loc = {};

// router.post('/location', function(req,res){

// });

router.get('/', function(req, res)
{
	res.render('index');
  
});





module.exports = router;