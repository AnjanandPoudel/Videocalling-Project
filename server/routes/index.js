var express = require('express');
var router = express.Router();
let cors=require('./cors')
/* GET home page. */
router.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get( function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
