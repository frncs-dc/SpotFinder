const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Review = require('../models/Review');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

current_user = null;
data = null;
let reviews = null;
let postList = null;
let userProfile = null;

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
      const { username, lastname, firstname, mobileNo, bio, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, lastname, firstname, mobileNo, bio, email, password:hashedPassword});
      res.redirect('/LogInPage')

    } catch (error) {
      console.log("error");
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
  
  router.post('/HostForm', async (req, res) => {
    let flat__amount = 0;
    let flat__hours = 0;
    let hour__amount = 0;
    let hour__hours = 0;
    let parking_capacity = [];
    let usernamePost = current_user.username;

  if (req.body.total_capacity > 0) {
    for (let i = 0; i < req.body.total_capacity; i++) {
      parking_capacity.push({ available: 1 });
    }
  }

    if (req.body.flat__amount !== '') {
      flat__amount = req.body.flat__amount;
    }
    if (req.body.flat__hours !== '') {
      flat__hours = req.body.flat__hours;
    }
    if (req.body.hour__amount !== '') {
      hour__amount = req.body.hour__amount;
    }
    if (req.body.hour__hours !== '') {
      hour__hours = req.body.hour__hours;
    }

    try {
      let newPost = new Post({
        username: usernamePost,
        name: req.body.name,
        address__region: req.body.address__region,
        address__city: req.body.address__city,
        address: req.body.address,
        post__description: req.body.post__description,
        post__picture: req.body.post__picture,
        // isAssignedParking: req.body.isAssignedParking,
        total_capacity: req.body.total_capacity,
        floors: req.body.floors,
        // isCarSupported: req.body.isCarSupported,
        // isMotorSupported: req.body.isMotorSupported,
        // isBikeSupported: req.body.isBikeSupported,
        flat__amount: flat__amount,
        flat__hours: flat__hours,
        hour__amount: hour__amount,
        hour__hours: hour__hours,
        parking_capacity: parking_capacity
      });
    
      newPost.save();
      // Handle successful creation of the Post document
      res.redirect(`/Profile/${usernamePost}`);
    } catch (error) {
      console.log("error");
    }
  });

  router.get('/logout', async (req, res) => {
    current_user = null;
    res.redirect('/LogInPage');
  });

  router.post('/reserveslots', async (req, res) => {
    const selectedSlotId = req.body.selectedSlot; // Get the selected slotId from the request body
  
    try {
      // Find the post by its ID and the selected slot by its _id
      const post = await Post.findById(data);
      const selectedSlot = post.parking_capacity.id(selectedSlotId);
  
      if (!selectedSlot) {
        return res.status(404).json({ error: 'Selected slot not found.' });
      }
  
      // Update the selected slot's availability to 0
      selectedSlot.available = 0;
  
      // Save the updated post document to the database
      await post.save();
      // res.render('Profile', {
      //   current_user: current_user,
      //   postList
      // });
      // #TODO: i tried to redirect to the current_user profile but reservations wont reflect
      res.redirect(`/Profile/${current_user.username}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating parking slot.' });
    }
  });


  router.post('/search', async (req, res) => {
    try{
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
      
      const searching = await Post.find({
        name: { $regex: new RegExp(searchNoSpecialChar, 'i') },
      })
      res.render("search", {
        searching
      });
    } catch(error){
      console.log(error);
    }
  });


  router.get('/park', async (req, res) => {
    const postList = await Post.find();
    res.render('park', {
        current_user: current_user,
        postList: postList,
    })
  });

  router.get('/Profile/:username', async (req, res) => {
      postList = await Post.find();
      let usernameProfile = req.params.username
      userProfile = await User.findOne({username: usernameProfile});
      res.render('Profile', {
          current_user: current_user,
          postList: postList,
          userProfile: userProfile,
      })
  });

  router.get('/Host-Posting/:id', async (req, res) => {
    try {
      let slug = req.params.id;
      data = await Post.findById({ _id: slug });
      reviews = await Review.find({ post_id: slug });
  
      if (!data) {
        // If the post is not found, return a 404 response
        return res.status(404).send('Post not found');
      }
      
      if (!reviews) {
        reviews = [];
      }
      // Assuming `current_user` is defined before this route handler
      // TODO: ADD REVIEWS IN THE RENDER
      res.render('Host-Posting', {
        current_user: current_user,
        data,
        reviews: reviews,
      });
    } catch (error) {
      // Log the actual error message and send a 500 response
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/Host-Posting/:id/reviewProcessing', async (req, res) => {
    try {
      let slug = req.params.id;
      data = await Post.findById({ _id: slug });
  
      if (!data) {
        // If the post is not found, return a 404 response
        return res.status(404).send('Post not found');
      }
      let newReview = new Review({
        username: current_user.username,
        post_id: slug,
        rating: req.body.rating,
        date: Date.now(),
        reviewBody: req.body.reviewBody
      });
    
      await newReview.save();
      // Handle successful creation of the Post document
      res.redirect(`/Host-Posting/${slug}`);
      // Assuming `current_user` is defined before this route handler
    } catch (error) {
      // Log the actual error message and send a 500 response
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/reserveslots/:id', async (req, res) => {
    try {
      if (!data) {
        // If the post is not found, return a 404 response
        return res.status(404).send('Post not found');
      }
      let available = 0;
      parking_capacity.

      // Assuming `current_user` is defined before this route handler
      res.render('reserveslots', {
        current_user: current_user,
        data,
      });

    } catch (error) {
      // Log the actual error message and send a 500 response
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


router.get('/LogInPage', (req, res) => {
  res.render('LogInPage', {
    currentRoute: '/LogInPage'
  });
});

router.get('/HostForm', (req, res) => {
  res.render('HostForm', {
    currentRoute: '/HostForm'
  });
});

router.get('/Customer-Support', (req, res) => {
  res.render('Customer-Support', {
    currentRoute: '/Customer-Support'
  });
});

router.get('', (req, res) => {
  res.render('index', {
    current_user: current_user,
    currentRoute: '/index'
  });
});

router.get('reserveslots', (req, res) => {
  res.render('reserveslots', {
    currentRoute: '/reserveslots'
  });
});

router.get('/Host-Posting', (req, res) => {
  res.render('Host-Posting', {
    currentRoute: '/Host-Posting'
  });
});

router.render

module.exports = router;