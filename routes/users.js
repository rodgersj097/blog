const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log(req.body)
    if (err) { return next(err) }
    if (!user) {
      console.log(info)
      return res.redirect('/login')
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/')// res.redirect('/users' + user.username)
    })
  })(req, res, next)
})

router.post('/', (req, res, next) => {
  console.log('starting register')
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function (err, account) {
      if (err) {
        console.log(err)
        return res.render('index', { account: account })
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/blog/collections')
      })
    })
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/')
  })
})

function getImage() {
  var image1 = '/images/4k-wallpaper-conifers-desktop-wallpaper-1367192.jpg'
  var image2 = '/images/arch-bridge-clouds-814499.jpg'
  var image3 = '/images/fog-foggy-forest-4827.jpg'
  var image4 = '/images/abandoned-forest-hd-wallpaper-34950.jpg'
  var imageArray = [image1, image2, image3, image4]
  var rand = Math.floor((Math.random() * 3) + 1)
  var image = imageArray[rand]

  return image
}

router.get('/account', (req, res, next) => {
  var image = getImage()
  console.log(image)
  res.render('account', { image, })
})


router.post('/update', async (req, res, next) => {
  let { username, email, bio, id } = req.query
  console.log(id)
  await User.findByIdAndUpdate(id, {
    $set: {
      username: username,
      email: email,
      bio: bio
    },
    runValidators: true,
    useFindandModify: false,
    new: true
  })
    .then(() => {
      console.log(`account: ${id} has been updated`)
    })
    .catch((err) => {
      console.log(err)
    })
})
module.exports = router; 