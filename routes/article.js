var express = require("express");
var router = express.Router();
var Request = require("request");
var articles = [];
//= require('../config/articleRequest')

console.log("Starting to fetch articles");

/* GET users listing. */
router.get("/:route", async function (req, res, next) {
  await Request.get("http://72.141.30.148/articles", (err, _res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("articles Fetched Succesfully");

    articles = JSON.parse(body);
  });

  const article = articles.find(art => art.url === req.params.route);
  console.log(req.params.route);
  res.render("article", article);
});
module.exports = router;
