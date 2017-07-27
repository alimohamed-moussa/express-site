const express = require ('express');
const router = express.Router();

router.get('/', (req, res) => {

  var data = req.app.get('appData');
  var pagePhotos = [];
  var pageSpeakers = data.speakers;

  data.speakers.forEach(function(item) {
    pagePhotos = pagePhotos.concat(item.artwork);
  });

    res.render('index', {
      pageTitle: 'Home',
      artwork: pagePhotos,
      speakers: pageSpeakers,
      pageID: 'home'
    });

});

module.exports = router;
