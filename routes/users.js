var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const auth = require('./auth');
const Users = mongoose.model('User');


router.get('/', (req,res,next) =>  {
  res.render('register')
})



/* GET users listing. */
router.post('/signup', auth.optional,  function(req, res, next) {
  const  user  = req.body
console.log(user)
  if(!user.email){ 
    return res.status(422).json({ 
      errors: { 
        email: 'is required'
    }, 
    })
  }

  if(!user.password){ 
    return res.status(422).json({ 
      errors: { 
        password: 'is required'
    }, 
    })
  }

  const finalUser = new Users(user)

  finalUser.setPassword(user.password)

  return finalUser.save()
    .then(()=> res.json({user: finalUser.toAuthJSON() }))
    .catch((err)=>{ 
      console.log(err)
    })
});


router.post('/login', auth.optional, (req,res,next) => { 
  const  user = req.body

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {session: false} , (err, passportUser, info) => { 
    if(err) { 
      return next(err)
    }

    if(passportUser){ 
      const user = passportUser
      user.token = passportUser.generateJWT() 

      return res.json({user: user.toAuthJSON() })
    }

    return res.status(400).info
  })(req,res,next)


})

router.get('/current', auth.required, (req,res,next) => { 
  const { payload: {id} } = req; 

  return Users.findById(id)
    .then((user) => { if(!user) { 
      return res.sendStatus(400)
    }
    return res.json({user : user.toAuthJSON() })
  }) 
})

module.exports = router;
