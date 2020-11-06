var index = require('./routes/index');

router.get('/', function(req, res, next) {
    res.render('index', {page:'Home', menuId:'home'});
  });