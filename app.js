const express = require ("express");
const mustache = require ("mustache-express");
const bodyParser = require ("body-parser");
const app = express();

const homeRoutes = require("./routes/home");
const albumsRoutes = require("./routes/albums")
const mongoose = require ("mongoose");

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set("layout", 'layout');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/records');

app.use(homeRoutes);
app.use(albumsRoutes);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
