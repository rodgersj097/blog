var express = require('express');
var router = express.Router();
var Request = require('request')
//var articles = require('../config/articleRequest')
var articles = [] 
  Request.get("http://localhost:1337/Articles", (err, _res ,body) => { 
      if(err){ 
          return console.log(err); 
      }
      console.log("articles Fetched Succesfully")
    
      articles = JSON.parse(body)
  })  
console.log(articles)
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render('collections', {title: 'Krista and Megan`s Blog' , articles} );
});

module.exports = router;