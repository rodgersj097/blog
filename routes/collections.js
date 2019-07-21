var express = require("express");
var router = express.Router();
var Request = require("request");
var rp = require("request-promise");
//var articles = require('../config/articleRequest')
var articles = [];

console.log(articles);
/* GET users listing. */
router.get("/", async function(req, res, next) {
  await rp({ url: "http://72.141.30.148/articles", json: true })
    .then(function(body) {
      console.log("articles Fetched Succesfully");
      articles = body;
    })
    .catch(err => {
      console.log(err);
    });

  res.render("collections", { title: "MHCM", articles });
});

//search quiry

module.exports = router;
