var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
     title: 'Express App', 
  });
});

// // Get New page
// router.get('/contact', function(req, res) {
//   res.render('contact', { 
//   });
// });
// router.get('/mywork', function(req, res) {
//   res.render('mywork', { 
//   });
// });


module.exports = router;