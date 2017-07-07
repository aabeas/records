const express = require("express");
const router = express.Router();
const Album = require("../models/Album");

function buildYears(currentlySelectedYear){
  const years = [];
  for(let i=1940; i<=1990; i++){
    const yearObject = {
      year: i,
      selected: (i === currentlySelectedYear)
    }
    years.push(yearObject)
  }
  return years;
}

router.get("/albums/new", function(req, res){
  res.render("albums/new", {
    years: buildYears()
  })
})

router.post("/albums", function(req, res){

  const album = new Album()
  album.title = req.body.title;
  album.artist = req.body.artist;
  album.coverImgUrl = req.body.coverImgUrl;
  album.year = req.body.year;
  album.link = req.body.link;
  album.save()
    .then(function(album){
      res.json(album)
    })
  .catch(function(validationError){
    res.render("albums/new", {
      album: album,
      validationError: validationError,
      years: buildYears(album.year)
    })
  })
})

router.get("/albums/:id/edit", function(req, res){

  Album.findOne({"_id": req.params.id})
  .then(function(album){
    res.render("albums/edit", {
      album: album,
      years: buildYears(album.year)
    })
  })
})

router.post("/albums/:id", function(req, res){

  Album.findOne({"_id": req.params.id})
  .then(function(album){
    album.title = req.body.title;
    album.artist = req.body.artist;
    album.coverImgUrl = req.body.coverImgUrl;
    album.year = req.body.year;
    album.link = req.body.link;
    album.save()
    .then(function(album){
      res.redirect("/")
    })
    .catch(function(validationError){
      res.render("albums/edit", {
        album: album,
        validationError: validationError,
        years: buildYears(album.year)
      })
    })
  })
})

module.exports = router;
