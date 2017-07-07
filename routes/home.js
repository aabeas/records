const express = require("express");
const router = express.Router();
const Album = require("../models/Album")

router.get('/', function(req, res){
  Album.find()
  .sort("year")
  .then( function(albums){
    res.render("index", {
      albums: albums
    })
  })
})

module.exports = router;
