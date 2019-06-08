var express = require('express');
var router = express.Router();
var Request = require('request')
var articles 
/* GET home page. */

//!!!!!!*****hardcoded array needs to pull from database 
Request.get("http://localhost:1337/Articles", (err, _res ,body) => { 
    if(err){ 
        return console.log(err); 
    }
    console.log("articles Fetched Succesfully")
   
    articles = JSON.parse(body)
})




router.get('/', function(req, res, next) {

  res.render('index', { title: 'Krista and Megan`s Blog' , articles});
});

module.exports = router;
