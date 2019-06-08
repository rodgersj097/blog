var express = require('express');
var router = express.Router();
var Request = require('request')  
var articles = [] 
//= require('../config/articleRequest')

console.log("Starting to fetch articles")


Request.get("http://localhost:1337/Articles", (err, _res ,body) => { 
    if(err){ 
        return console.log(err); 
    }
    console.log("articles Fetched Succesfully")
   
    articles = JSON.parse(body)
})




/* GET users listing. */
router.get('/:route', function(req, res, next) {
 
  const article = articles.find(art => art.url === req.params.route)
  article.Date = article.Date.substr(0,10)
  console.log(req.params.route)
    res.render('article',  article );
  });
  
  module.exports = router;
  