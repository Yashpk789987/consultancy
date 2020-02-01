var multer = require('multer');
var upload = multer({ dest: 'public/banners/' });

module.exports = upload;
