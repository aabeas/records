const mongoose = require ("mongoose");

const albumSchema = new mongoose.Schema({
  title: {type: String, required:true},
  artist: {type: String, required:true},
  coverImgUrl: {type: String, required:true},
  genre: {type: String, required:false},
  year: {type: Number, required:true},
  link: {type: String, required:false},
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
