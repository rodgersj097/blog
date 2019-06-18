var express = require('express');
var router = express.Router();
var Request = require('request')
var axios = require('axios')
var articles 
/* GET home page. */

//!!!!!!*****hardcoded array needs to pull from database 
/* Request.get("http://localhost:1337/articles", (err, _res ,body) => { 
    if(err){ 
        return console.log(err); 
    }
    console.log("articles Fetched Succesfully")
   
    articles = JSON.parse(body)
})
 */

router.get('/', function(req, res, next) {

    axios({
        url: 'http://localhost:1337/graphql',
        method: 'post', 
        data: { 
            query:`
                articles{
                  URL
                  articleTitle
                  articleContent
                  articleDescription
                  author{
                    authorName
                    authorImage{url}
                  }
                }
               ` 
        }
    }).then((result) => { 
        articles = result.data
    }).catch((err)=>{
        console.log(err)
    }).finally(function(){ 
        console.log('Articles Fetched')
    })

console.log(articles)
  res.render('index', { title: 'Krista and Megan`s Blog' , articles});
});
module.exports = router;
