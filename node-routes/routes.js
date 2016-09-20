/* jshint esnext: true*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res) {
  res.render('index', { 
     title: 'Express App', 
  });
});

// Get New page
router.get('/about', function(req, res) {
  res.render('angular', { 
    title: 'Sandeep Kumar'
  });
});

// // Get New page
// router.get('/test', function(req, res) {
//   res.render('testing');
// });

module.exports = router;















