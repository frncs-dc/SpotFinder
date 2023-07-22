const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

current_user = null;

/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}

/**
 * POST /
 * Admin - Register
*/
  router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const user = await User.create({ username, email, password:hashedPassword});
        res.redirect('/park');
      } catch (error) {
        if(error.code === 11000) {
          res.redirect('/LogInPage')
        }
       
      }

    } catch (error) {
      console.log(error);
    }
  });

  router.post('/LogInPage', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne( { email } );
  
      if(!user) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if(!isPasswordValid) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      } 
      current_user = user;
      const token = jwt.sign({ userId: user._id}, jwtSecret );
      res.cookie('token', token, { httpOnly: true });
      
      res.redirect('/park');
  
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/HostForm', async (req, res) => {
    res.render('HostForm', {
      current_user: current_user
    });
  });

  router.get('/park', async (req, res) => {
    res.render('park',{
        current_user: current_user
      });
  });

  router.get('/Profile', async (req, res) => {
    res.render('Profile', {
      current_user: current_user
    });
  });
/**
 * DELETE /
 * Admin - Delete Post
*/
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});

router.render

module.exports = router;