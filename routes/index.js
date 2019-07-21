var express = require("express");
var router = express.Router();
var Request = require("request");
var axios = require("axios");
var articles;
//GET home page.

router.get(
  "/.well-known/acme-challenge/hqNxy7qQFgZ8E3QAg5eVeznIgmOPFXT13G9q2aI-Ty4",
  function(req, res, next) {
    res.send(
      "hqNxy7qQFgZ8E3QAg5eVeznIgmOPFXT13G9q2aI-Ty4.j7zGztBzaGx1tjaoOi3Y2bcT2uvZj0lpRWm83cMp4Hs"
    );
  }
);
//!!!!!!*****hardcoded array needs to pull from database
router.get("/", async function(req, res, next) {
  await axios({
    url: "http://72.141.30.148/graphql",
    method: "POST",
    data: {
      query: `
            query{
                articles
                {
                  
                id
                url
                articleTitle
                articleImage{ 
                      url 
                    }
                  articleHeroAltText
                articleDescription
                articleContents
                  metaKeywords
                  metaDescription
                author{ 
                 authorName
                 authorImage{
                  url 
                }
                }
                Date
                }
              }
            `
    }
  })
    .then(result => {
      articles = result.data.data.articles;
    })
    .catch(err => {
      console.log(err);
    });
  res.render("index", { title: "Mental Health Conscious Moms", articles });
});
module.exports = router;
