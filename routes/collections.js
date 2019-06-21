var express = require('express');
var router = express.Router();
var Request = require('request')
//var articles = require('../config/articleRequest')
var articles = [] 
 
console.log(articles)
/* GET users listing. */
router.get('/', async function(req, res, next) {
 await Request.get("http://localhost:1337/Articles", (err, _res ,body) => { 
    if(err){ 
        return console.log(err); 
    }
    console.log("articles Fetched Succesfully")
  
    articles = JSON.parse(body)
})  
  res.render('collections', {title: 'MHCM' , articles} );
});


//search quiry 

module.exports = router;