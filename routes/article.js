var express = require("express");
var router = express.Router();
var Request = require("request");
var articles = [];
var rp = require("request-promise");
//= require('../config/articleRequest')

console.log("Starting to fetch articles");

/* GET users listing. */
router.get("/:route", async function(req, res, next) {
  await rp({ url: "http://72.141.30.148/articles", json: true })
    .then(function(body) {
      console.log("articles Fetched Succesfully");
      articles = body;
      console.log(articles);
    })
    .catch(err => {
      console.log(err);
    });

  const article = articles.find(art => art.url === req.params.route);
  console.log(req.params.route);
  res.render("article", article);
});
module.exports = router;
