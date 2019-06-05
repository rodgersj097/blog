var express = require('express');
var router = express.Router();

/* GET home page. */

//!!!!!!*****hardcoded array needs to pull from database 
const articles = [
  {
    img: "images/mental-health.png",
    title: "Article Title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed ipsum molestie, auctor velit non, consectetur diam. Nam a nunc mattis libero vulputate tempus id. ",
    authImg: "/images/author.jpg",
    auth: "Author Name",
    date: "Date"
  },
  {
    img: "images/mental-health.png",
    title: "Article Title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed ipsum molestie, auctor velit non, consectetur diam. Nam a nunc mattis libero vulputate tempus id. ",
    authImg: "/images/author.jpg",
    auth: "Author Name",
    date: "Date"
  },
  {
    img: "images/mental-health.png",
    title: "Article Title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed ipsum molestie, auctor velit non, consectetur diam. Nam a nunc mattis libero vulputate tempus id. ",
    authImg: "/images/author.jpg",
    auth: "Author Name",
    date: "Date"
  },
]


router.get('/', function(req, res, next) {

  res.render('index', { title: 'Krista and Megan`s Blog' , articles});
});

module.exports = router;
